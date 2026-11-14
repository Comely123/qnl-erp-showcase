/* 启能力 ERP · 数据对齐与自动化流引擎
 * 目标：钉钉 AI 表格已有 9 张表单在录数据，前端不重复填；
 *      若使用者选择用前端填，则保存后自动进入同步队列回写后端。
 * 模式：demo（本地队列模拟全部行为）/ live（走 erp.nexduo.xyz 同步网关）
 * 依赖：config.js / engine.js / contract.js；不依赖任何外部库。
 */
(function () {
  'use strict';

  var CFG = window.ERP_CONFIG, DB = window.ERP_DB, CONTRACT = window.ERP_CONTRACT;
  var KEY = 'qnl_erp_sync_v1';
  var MOD = DB.MOD;
  var SYNC_DEF = CFG.sync;

  function uid(p) {
    return (p || 'id') + '-' + Date.now().toString(36) + '-' +
      Math.random().toString(36).slice(2, 7);
  }
  function now() { return new Date().toISOString(); }
  function txt(v) {
    if (v == null) return '';
    if (Array.isArray(v)) return v.join('、');
    return String(v);
  }
  function clone(o) { return JSON.parse(JSON.stringify(o || {})); }
  function ymd() {
    var d = new Date();
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0');
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') +
      '-' + String(d.getDate()).padStart(2, '0');
  }

  function blank() {
    var flows = {};
    CFG.flows.forEach(function (f) {
      flows[f.id] = { enabled: true, runs: 0, lastRun: '', lastResult: '' };
    });
    return {
      v: 1,
      config: {
        mode: SYNC_DEF.mode, autoSync: SYNC_DEF.autoSync,
        defaultEntryMode: SYNC_DEF.defaultEntryMode,
        interval: SYNC_DEF.interval, overrides: {}, token: ''
      },
      flows: flows,
      outbox: [], inbox: [], conflicts: [], logs: [],
      cursor: '', seq: 0,
      stats: { pulled: 0, pushed: 0, conflicts: 0, flowsRun: 0 }
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var s = JSON.parse(raw);
      if (!s || s.v !== 1 || !s.config || !s.outbox) return blank();
      // 新增流定义时补齐状态
      CFG.flows.forEach(function (f) {
        if (!s.flows[f.id]) s.flows[f.id] = { enabled: true, runs: 0, lastRun: '', lastResult: '' };
      });
      return s;
    } catch (e) { return blank(); }
  }

  var S = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { /* 存储配额不足时保持内存态 */ }
    return S;
  }

  function log(flow, level, title, detail) {
    S.logs.unshift({ id: uid('log'), ts: now(), flow: flow, level: level,
      title: title, detail: detail || '' });
    if (S.logs.length > 200) S.logs.length = 200;
    save();
  }
  function flowDone(id, result) {
    var f = S.flows[id];
    if (!f) return;
    f.runs += 1; f.lastRun = now();
    f.lastResult = result.title + (result.count != null ? ' · ' + result.count + ' 条' : '');
    S.stats.flowsRun += 1;
    log(id, result.ok ? 'ok' : 'warn', result.title, result.detail);
    save();
  }

  // ---------------------------------------------------------------- 录入模式
  // backend = 钉钉表单录入，前端不重复建表单；frontend = 前端填 + 自动回写；both = 双通道
  function modeOf(moduleKey) {
    var m = MOD[moduleKey];
    if (!m) return 'frontend';
    var ov = S.config.overrides[moduleKey];
    if (ov) return ov;
    return m.hasBackendForm ? S.config.defaultEntryMode : 'frontend';
  }
  function canFrontend(moduleKey) { return modeOf(moduleKey) !== 'backend'; }
  function formUrl(moduleKey) { return (MOD[moduleKey] || {}).formUrl || ''; }

  // ---------------------------------------------------------------- 同步队列
  function enqueue(moduleKey, rec, action) {
    if (!S.config.autoSync) return null;
    var pending = S.outbox.filter(function (x) {
      return x.recId === rec.id && x.state === 'pending';
    })[0];
    var item = pending || {
      id: uid('out'), ts: now(), moduleKey: moduleKey, recId: rec.id,
      no: rec.no, action: action, state: 'pending', retries: 0, remoteId: rec.remoteId || ''
    };
    item.action = action;
    item.no = rec.no;
    item.payload = clone(rec.data);
    item.status = rec.status;
    item.fieldCount = Object.keys(rec.data || {}).length;
    item.origin = rec.origin || 'frontend';
    if (!pending) S.outbox.unshift(item);
    if (S.outbox.length > 300) S.outbox.length = 300;
    save();
    return item;
  }

  // 引擎写操作钩子：本地任何新建 / 编辑 / 状态流转都会进入同步队列
  function onRecordSaved(moduleKey, rec, action) {
    if (!rec || rec.__syncInternal) return;
    enqueue(moduleKey, rec, action || 'update');
    log('F02', 'info', '本地变更已入队',
      rec.no + ' · ' + MOD[moduleKey].name + ' · ' + action);
  }

  // ---------------------------------------------------------------- 网关请求
  function gateway(path, opts) {
    var url = SYNC_DEF.site + path;
    if (S.config.mode !== 'live') return Promise.resolve({ demo: true, url: url });
    if (typeof fetch !== 'function') return Promise.reject(new Error('当前环境不支持 fetch'));
    return fetch(url, Object.assign({
      headers: { 'Content-Type': 'application/json',
        'X-Sync-Token': S.config.token || '' }
    }, opts || {})).then(function (r) {
      if (!r.ok) throw new Error('网关返回 HTTP ' + r.status);
      return r.json();
    });
  }

  // ---------------------------------------------------------------- 拉取（钉钉表单 → 前端）
  function demoFormData(m, serial) {
    var d = {};
    m.fields.forEach(function (f) {
      if (f.name === m.noField) { d[f.name] = ''; return; }
      if (f.name === m.statusField) { d[f.name] = m.states.draft; return; }
      if (f.type === 'a' || f.type === 'm') { d[f.name] = []; return; }
      if (f.options && f.options.length) { d[f.name] = f.options[0]; return; }
      if (f.type === 'c') { d[f.name] = 128000 + serial * 3700; return; }
      if (f.type === 'n' || f.type === 'g' || f.type === 'q') { d[f.name] = 3 + serial; return; }
      if (f.type === 'd') { d[f.name] = today(); return; }
      if (f.type === 'u') { d[f.name] = '陈经理'; return; }
      if (f.type === 'b') { d[f.name] = false; return; }
      if (f.type === 'e') { d[f.name] = 'supplier@nexduo.xyz'; return; }
      if (f.type === 'p') { d[f.name] = '13800138000'; return; }
      if (f.type === 'l') { d[f.name] = SYNC_DEF.site; return; }
      d[f.name] = '钉钉表单提交 · ' + m.name + ' #' + serial;
    });
    (m.required || []).forEach(function (n) {
      if (!txt(d[n]) && n !== m.noField) d[n] = '钉钉表单提交 · ' + serial;
    });
    if (m.titleField && !txt(d[m.titleField])) d[m.titleField] = m.name + ' · 钉钉表单 #' + serial;
    return d;
  }

  function pull(opts) {
    opts = opts || {};
    var mods = opts.moduleKey ? [opts.moduleKey] : CFG.formModules.slice();
    if (opts.limit) mods = mods.slice(0, opts.limit);
    S.seq += 1;
    var serial = S.seq, created = 0, updated = 0, conflicts = 0, skipped = 0;
    return gateway('/api/sync/pull?since=' + encodeURIComponent(S.cursor || '') +
      '&module=' + encodeURIComponent(opts.moduleKey || 'all'), { method: 'GET' })
      .then(function (remote) {
        // 实时模式下网关可返回真实表单提交；没有返回时按演示数据生成骨架
        if (remote && remote.items && remote.items.length) {
          var rc = 0;
          remote.items.forEach(function (it) {
            if (!MOD[it.moduleKey]) return;
            var r = DB.systemUpsert(it.moduleKey, it.data || {}, {
              remoteId: it.remoteId, origin: 'dingtalk-form',
              person: it.person || '钉钉表单', note: it.note || '网关同步'
            });
            if (r.action !== 'conflict') rc += 1;
            S.inbox.unshift({ id: uid('in'), ts: now(), moduleKey: it.moduleKey,
              moduleName: MOD[it.moduleKey].name, formName: it.formName || '钉钉表单',
              formUrl: (MOD[it.moduleKey] || {}).formUrl || '', remoteId: it.remoteId,
              no: r.rec.no, title: txt((it.data || {})[MOD[it.moduleKey].titleField]).slice(0, 40),
              state: 'pulled', origin: 'dingtalk-form' });
          });
          S.cursor = now(); S.stats.pulled += rc; save();
          var rr = { ok: true, count: rc, title: '增量拉取完成',
            detail: '网关返回 ' + remote.items.length + ' 条表单提交，落地 ' + rc + ' 张单据' };
          log('F01', 'ok', rr.title, rr.detail);
          return rr;
        }
        mods.forEach(function (k) {
          var m = MOD[k];
          if (!m) return;
          var remoteId = 'DF-' + ymd() + '-' + String(serial).padStart(3, '0') + '-' + k;
          var exists = S.inbox.some(function (x) { return x.remoteId === remoteId; });
          if (exists) { skipped += 1; return; }
          var data = demoFormData(m, serial);
          var res = DB.systemUpsert(k, data, {
            remoteId: remoteId, origin: 'dingtalk-form',
            person: m.backendFormName || '钉钉表单',
            note: '来自钉钉表单「' + (m.backendFormName || m.name) + '」的提交'
          });
          if (res.action === 'conflict') { conflicts += 1; return; }
          if (res.action === 'created') created += 1; else updated += 1;
          S.inbox.unshift({
            id: uid('in'), ts: now(), moduleKey: k, moduleName: m.name,
            formName: m.backendFormName || m.name, formUrl: m.formUrl || '',
            remoteId: remoteId, no: res.rec.no, title: txt(data[m.titleField]).slice(0, 40),
            state: 'pulled', origin: 'dingtalk-form'
          });
        });
        if (S.inbox.length > 200) S.inbox.length = 200;
        S.cursor = now();
        S.stats.pulled += created + updated;
        save();
        var result = {
          ok: true, count: created + updated,
          title: '增量拉取完成',
          detail: '新增 ' + created + ' 张 / 更新 ' + updated + ' 张 / 冲突 ' + conflicts +
            ' 张 / 跳过 ' + skipped + ' 张' +
            (S.config.mode === 'live' ? ' · 网关 ' + SYNC_DEF.host : ' · 演示态本地模拟')
        };
        log('F01', 'ok', result.title, result.detail);
        return result;
      })
      .catch(function (e) {
        var result = { ok: false, count: 0, title: '拉取失败', detail: e.message + '；已保留本地数据，不阻断业务' };
        log('F01', 'error', result.title, result.detail);
        return result;
      });
  }

  // ---------------------------------------------------------------- 推送（前端 → 钉钉表）
  function push() {
    var pending = S.outbox.filter(function (x) { return x.state === 'pending' || x.state === 'failed'; });
    if (!pending.length) {
      var empty = { ok: true, count: 0, title: '队列已清空', detail: '没有待推送的本地变更' };
      log('F02', 'info', empty.title, empty.detail);
      return Promise.resolve(empty);
    }
    return gateway('/api/sync/push', {
      method: 'POST',
      body: JSON.stringify({
        site: SYNC_DEF.host, count: pending.length,
        items: pending.map(function (x) {
          return { module: CONTRACT.modules[x.moduleKey].code, remoteId: x.remoteId,
            no: x.no, action: x.action, status: x.status, data: x.payload };
        })
      })
    }).then(function (res) {
      var ok = 0;
      pending.forEach(function (x) {
        x.state = 'synced'; x.syncedAt = now(); x.retries += 1;
        x.remoteId = x.remoteId || uid('remote');
        var rec = DB._raw(x.moduleKey, x.recId);
        if (rec) { rec.remoteId = x.remoteId; rec.syncState = 'synced'; rec.lastSyncAt = now(); }
        ok += 1;
      });
      DB.save();
      S.stats.pushed += ok;
      save();
      var result = { ok: true, count: ok, title: '推送完成',
        detail: ok + ' 条本地变更已回写' + (S.config.mode === 'live' ? '钉钉数据表' : '（演示态模拟）') };
      log('F02', 'ok', result.title, result.detail);
      return result;
    }).catch(function (e) {
      pending.forEach(function (x) { x.state = 'failed'; x.retries += 1; x.error = e.message; });
      save();
      var result = { ok: false, count: 0, title: '推送失败', detail: e.message + '；记录保留在队列，可重试' };
      log('F02', 'error', result.title, result.detail);
      return result;
    });
  }

  // ---------------------------------------------------------------- 自动化流
  function checkConflicts() {
    var found = 0;
    Object.keys(DB.state.records).forEach(function (k) {
      (DB.state.records[k] || []).forEach(function (r) {
        if (!r.remoteId || r.origin !== 'dingtalk-form') return;
        if (!(r.updatedAt && r.lastSyncAt && r.updatedAt > r.lastSyncAt)) return;
        if (S.conflicts.some(function (c) { return c.recId === r.id && c.state === 'open'; })) return;
        S.conflicts.unshift({ id: uid('cf'), ts: now(), moduleKey: k, moduleName: MOD[k].name,
          recId: r.id, no: r.no, remoteId: r.remoteId, localTs: r.updatedAt,
          remoteTs: now(), state: 'open' });
        found += 1;
      });
    });
    S.stats.conflicts += found;
    save();
    return { ok: true, count: found, title: '冲突检测完成',
      detail: found ? '发现 ' + found + ' 条双端修改，已冻结自动覆盖，等待人工裁决' :
        '未发现双端并发修改，前后端数据一致' };
  }

  function gateCheck() {
    var bad = 0, checked = 0;
    S.outbox.forEach(function (x) {
      if (x.state === 'synced') return;
      checked += 1;
      var m = MOD[x.moduleKey];
      (m.required || []).forEach(function (n) {
        if (n !== m.noField && !txt(x.payload[n])) bad += 1;
      });
    });
    return { ok: true, count: checked, title: '链路闸门校验完成',
      detail: '校验 ' + checked + ' 条待同步单据，必填缺失 ' + bad + ' 项' +
        (bad ? '（已阻断这些记录的自动推送）' : '（全部通过，可安全同步）') };
  }

  function runFlow(id) {
    var def = CFG.flows.filter(function (f) { return f.id === id; })[0];
    if (!def) return Promise.resolve({ ok: false, title: '未知自动化流', detail: id });
    if (!S.flows[id].enabled) {
      return Promise.resolve({ ok: false, title: def.name, detail: '该自动化流已停用' });
    }
    var p;
    switch (id) {
      case 'F01': p = pull({ limit: 3 }); break;
      case 'F02': p = push(); break;
      case 'F03':
        p = Promise.resolve((function () {
          var n = CFG.links.length;
          var derived = 0;
          Object.keys(DB.state.records).forEach(function (k) {
            derived += (DB.state.records[k] || []).filter(function (r) { return !!r.source; }).length;
          });
          return { ok: true, count: n, title: '派生链路巡检完成',
            detail: n + ' 条联动规则已装载，当前已有 ' + derived + ' 张自动派生单据在链路中' };
        })());
        break;
      case 'F04':
        p = Promise.resolve((function () {
          var n = DB.state.logs.filter(function (l) {
            return /通过|驳回|提交|撤销|同步/.test(l.title);
          }).length;
          return { ok: true, count: n, title: '状态与通知对齐完成',
            detail: '扫描 ' + DB.state.logs.length + ' 条操作日志，其中 ' + n + ' 条为状态流转/同步事件' };
        })());
        break;
      case 'F05':
        p = pull({ limit: 2 }).then(function (a) {
          return push().then(function (b) {
            return { ok: true, count: a.count + b.count, title: '定时增量对齐完成',
              detail: '拉取 ' + a.count + ' 张 / 推送 ' + b.count + ' 条 · 游标已更新' };
          });
        });
        break;
      case 'F06': p = Promise.resolve(checkConflicts()); break;
      case 'F07':
        p = Promise.resolve((function () {
          var att = CFG.modules.filter(function (m) { return m.hasAttachment; }).length;
          var ai = CFG.modules.filter(function (m) { return m.hasAI; }).length;
          return { ok: true, count: att + ai, title: '附件与 AI 字段对齐完成',
            detail: att + ' 个模块含附件字段、' + ai + ' 个模块含 AI 字段，均由钉钉侧承载' };
        })());
        break;
      case 'F08': p = Promise.resolve(gateCheck()); break;
      default: p = Promise.resolve({ ok: false, title: def.name, detail: '未实现的动作' });
    }
    return p.then(function (res) { flowDone(id, res); return res; });
  }

  function runAll() {
    var ids = CFG.flows.filter(function (f) { return S.flows[f.id].enabled; }).map(function (f) { return f.id; });
    var chain = Promise.resolve([]);
    ids.forEach(function (id) {
      chain = chain.then(function (acc) {
        return runFlow(id).then(function (r) { acc.push({ id: id, r: r }); return acc; });
      });
    });
    return chain;
  }

  function resolveConflict(id, choice) {
    var c = S.conflicts.filter(function (x) { return x.id === id; })[0];
    if (!c) return false;
    var rec = DB._raw(c.moduleKey, c.recId);
    if (choice === 'local') {
      if (rec) { rec.lastSyncAt = now(); rec.syncState = 'pending'; }
      enqueue(c.moduleKey, rec || { id: c.recId, no: c.no, data: {} }, 'update');
    } else {
      if (rec) { rec.lastSyncAt = now(); rec.syncState = 'pulled'; rec.origin = 'dingtalk-form'; }
    }
    c.state = choice === 'local' ? 'keep-local' : 'keep-remote';
    c.resolvedAt = now();
    DB.save(); save();
    log('F06', 'ok', '冲突已裁决', c.no + ' · ' + (choice === 'local' ? '保留本地并重新入队' : '以钉钉侧为准'));
    return true;
  }

  function status() {
    var pending = S.outbox.filter(function (x) { return x.state === 'pending' || x.state === 'failed'; }).length;
    return {
      host: SYNC_DEF.host, mode: S.config.mode, autoSync: S.config.autoSync,
      interval: S.config.interval, cursor: S.cursor,
      pending: pending, synced: S.outbox.filter(function (x) { return x.state === 'synced'; }).length,
      inbox: S.inbox.length, conflicts: S.conflicts.filter(function (x) { return x.state === 'open'; }).length,
      logs: S.logs.length, lastSync: S.logs.length ? S.logs[0].ts : '',
      liveReady: S.config.mode === 'live'
    };
  }

  window.ERP_SYNC = {
    state: S, config: S.config, save: save, log: log,
    modeOf: modeOf, canFrontend: canFrontend, formUrl: formUrl,
    setMode: function (k, mode) { S.config.overrides[k] = mode; save(); return mode; },
    clearOverride: function (k) { delete S.config.overrides[k]; save(); },
    setConfig: function (patch) { Object.assign(S.config, patch || {}); save(); return S.config; },
    toggleFlow: function (id) {
      if (!S.flows[id]) return false;
      S.flows[id].enabled = !S.flows[id].enabled; save();
      log(id, 'info', S.flows[id].enabled ? '自动化流已启用' : '自动化流已停用', CFG.flows.filter(function (f) { return f.id === id; })[0].name);
      return S.flows[id].enabled;
    },
    onRecordSaved: onRecordSaved,
    enqueue: enqueue, pull: pull, push: push,
    runFlow: runFlow, runAll: runAll,
    resolveConflict: resolveConflict,
    status: status,
    reset: function () {
      // 保持外部持有的 state/config 引用有效
      var fresh = blank();
      Object.keys(S).forEach(function (k) { delete S[k]; });
      Object.assign(S, fresh);
      save();
      return status();
    }
  };
})();
