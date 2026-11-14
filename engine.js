/* 启能力 ERP · 本地运行引擎
 * 职责：localStorage 持久化、单据 CRUD、状态机、跨单据联动、权限与行级隔离、
 *       操作日志、通知、附件、导入导出、统计聚合。
 * 与后端解耦：接入真实服务时只需替换 load/save 与 CRUD 的持久化部分。
 */
(function (global) {
  'use strict';

  var CFG = global.ERP_CONFIG;
  var META = global.ERP_DATA.tables;
  var KEY = 'qnl_erp_runtime_v2';
  var VERSION = 2;

  var MOD = {};
  CFG.modules.forEach(function (m) { MOD[m.key] = m; });
  var ROLE = {};
  CFG.roles.forEach(function (r) { ROLE[r.id] = r; });

  // ------------------------------------------------------------ 工具
  function uid(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + '-' +
      Math.random().toString(36).slice(2, 8);
  }
  function now() { return new Date().toISOString(); }
  function today() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function ym() { return today().slice(0, 7).replace('-', ''); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function text(v) {
    if (v === null || v === undefined) return '';
    if (Array.isArray(v)) return v.join('、');
    if (typeof v === 'object') return v.name || v.id || '';
    return String(v);
  }

  // ------------------------------------------------------------ 初始数据
  function inferStatus(mod, value) {
    var s = mod.states, v = text(value);
    if (!v) return 'draft';
    if (v === s.reject) return 'reject';
    if (v === s.done) return 'done';
    if (v === s.running) return 'running';
    if (v === s.draft) return 'draft';
    if (/驳回|拒绝|不通过|不合格|流标|过期|黑名单|冻结|异常|预警|偏低|偏高|取消/.test(v)) return 'reject';
    if (/已批准|已生效|已通过|已关闭|已完成|已授标|已过账|已入库|已付款|已归档|已上线|已确认|合格|通过|已定标|已收|已到货|生效中|正常/.test(v)) return 'done';
    if (/审批中|审核中|进行中|报价中|开标中|评标中|授标中|部分收货|征集中|处理中|已发布|报名中|投标中|比价中|已开标|已提交|质检中|整改中|待复核|复核|待收货|待检验|待过审|差异审核/.test(v)) return 'running';
    return 'draft';
  }

  function blankState() {
    return {
      v: VERSION, session: null, records: {}, logs: [], notifications: [],
      attachments: {}, seq: {}, createdAt: now()
    };
  }

  // 数据对齐钩子：本地写操作成功后通知同步层入队（同步层未加载时静默跳过）
  function emitSync(moduleKey, rec, action) {
    try {
      var s = global.ERP_SYNC;
      if (s && s.onRecordSaved) s.onRecordSaved(moduleKey, rec, action);
    } catch (e) { /* 同步失败不得影响本地业务操作 */ }
  }

  function makeRecord(mod, data, opts) {
    opts = opts || {};
    var st = blankRecordStatus(mod, data);
    var d = clone(data || {});
    if (mod.noField && !text(d[mod.noField])) d[mod.noField] = nextNo(mod);
    if (mod.statusField) {
      var desired = mod.states[st];
      if (!text(d[mod.statusField])) d[mod.statusField] = desired;
    }
    return {
      id: uid('rec'), no: text(d[mod.noField]) || nextNo(mod),
      moduleKey: mod.key, data: d, status: st,
      createdBy: opts.createdBy || 'system', createdRole: opts.createdRole || '',
      createdAt: opts.createdAt || now(), updatedAt: opts.updatedAt || now(),
      source: opts.source || null, chain: opts.chain || 0,
      timeline: [{
        ts: opts.createdAt || now(), action: opts.seed ? '演示数据初始化' : '创建单据',
        person: opts.person || '系统', role: opts.createdRole || '',
        from: '', to: st, note: opts.note || ''
      }],
      seed: !!opts.seed
    };
  }

  function blankRecordStatus(mod, data) {
    if (!mod.statusField) return 'draft';
    return inferStatus(mod, data[mod.statusField]);
  }

  function nextNo(mod) {
    var k = mod.noPrefix + '-' + ym();
    DB.state.seq[k] = (DB.state.seq[k] || 0) + 1;
    return k + '-' + String(DB.state.seq[k]).padStart(3, '0');
  }

  function buildInitialState() {
    var s = blankState();
    DB.state = s; // makeRecord 的编号生成器需要访问 seq 计数器
    // 1) data.js 中 44 表自带演示数据
    META.forEach(function (t) {
      var mod = MOD[t.key];
      if (!mod) return;
      s.records[t.key] = (t.seeds || []).map(function (row) {
        return makeRecord(mod, row, { seed: true, createdBy: 'system', person: '系统预置', createdRole: 'admin' });
      });
    });
    // 2) 扩充的跨链路业务单据
    CFG.seedExtra.forEach(function (pair) {
      var mod = MOD[pair[0]];
      if (!mod) return;
      if (!s.records[mod.key]) s.records[mod.key] = [];
      s.records[mod.key].push(makeRecord(mod, pair[1], {
        seed: true, createdBy: 'system', person: '业务演示', createdRole: 'admin'
      }));
    });
    // 3) 空模块也建立数组，保证列表可新建
    CFG.modules.forEach(function (m) { if (!s.records[m.key]) s.records[m.key] = []; });
    // 4) 初始日志与通知
    s.logs.push({
      id: uid('log'), ts: now(), role: 'admin', person: '系统',
      action: '初始化', moduleKey: '', recId: '',
      title: '演示环境已就绪', detail: '载入 44 个业务模块与全链路演示单据，数据保存在本地浏览器。'
    });
    CFG.flow.slice(0, 3).forEach(function (f) {
      s.notifications.push({
        id: uid('ntf'), ts: now(), to: ['admin', 'buyer'],
        type: '待办', title: '环节待处理 · ' + f.name,
        text: f.desc + '，请进入对应模块查看单据。',
        moduleKey: f.module, recId: '', read: {}
      });
    });
    return s;
  }

  // ------------------------------------------------------------ 存取
  var DB = {
    state: null,

    load: function () {
      try {
        var raw = global.localStorage.getItem(KEY);
        if (raw) {
          var s = JSON.parse(raw);
          if (s && s.v === VERSION && s.records) { this.state = s; return this.state; }
        }
      } catch (e) { /* 存储被禁用时退化为内存态 */ }
      this.state = buildInitialState();
      this.save();
      return this.state;
    },

    save: function () {
      try { global.localStorage.setItem(KEY, JSON.stringify(this.state)); }
      catch (e) { console.warn('本地存储写入失败，数据仅在本次会话有效', e); }
      return this.state;
    },

    reset: function () {
      this.assertSystem('reset');
      var session = this.state.session;
      this.state = buildInitialState();
      this.state.session = session; // 重置数据不应改变当前登录身份
      this.save();
      return this.state;
    },

    exportJSON: function () {
      this.assertSystem('backup');
      return JSON.stringify(this.state, null, 2);
    },

    importJSON: function (raw) {
      this.assertSystem('backup');
      var s = JSON.parse(raw);
      if (!s || !s.records || !s.v) throw new Error('文件格式不正确');
      s.v = VERSION;
      s.session = this.state.session; // 导入备份不得提权到其它角色
      this.state = s;
      this.save();
      return this.state;
    },

    // -------------------------------------------------------- 会话与权限
    session: function () { return this.state.session; },
    login: function (roleId) {
      var r = ROLE[roleId];
      if (!r) throw new Error('未知角色');
      this.state.session = { roleId: roleId, loginAt: now() };
      this.log('登录', '切换为「' + r.name + '」', '', '', { person: r.person, role: roleId });
      this.save();
      return r;
    },
    logout: function () { this.state.session = null; this.save(); },
    role: function () { return this.state.session ? ROLE[this.state.session.roleId] : null; },

    // v3 权限内核：所有能力判定只有一个入口，默认拒绝。
    // 能力来自 config.js 中程序化展开的「角色 × 模块」矩阵，
    // 系统级功能单独由 policy.system 白名单控制，不再有角色级扁平 caps 的越权空间。
    can: function (roleId, moduleKey, action) {
      var r = ROLE[roleId];
      if (!r || !r.policy) return false;
      if (action === 'config') return this.canSystem(roleId, 'settings');
      return (r.policy.modules[moduleKey] || []).indexOf(action) >= 0;
    },
    canSystem: function (roleId, feature) {
      var r = ROLE[roleId];
      return !!(r && r.policy && r.policy.system.indexOf(feature) >= 0);
    },
    capsOf: function (roleId, moduleKey) {
      var r = ROLE[roleId];
      return r && r.policy ? (r.policy.modules[moduleKey] || []).slice() : [];
    },
    assertCap: function (moduleKey, action) {
      var role = this.role();
      if (!role) throw new Error('登录状态已失效，请重新选择角色');
      if (!this.can(role.id, moduleKey, action)) {
        var m = MOD[moduleKey];
        throw new Error('「' + role.name + '」无权在「' + (m ? m.name : moduleKey) + '」执行' +
          ((CFG.capLabels || {})[action] || action) +
          '；该模块对当前角色为只读或不可见');
      }
      return role;
    },
    assertSystem: function (feature) {
      var role = this.role();
      if (!role || !this.canSystem(role.id, feature)) {
        throw new Error('「' + (role ? role.name : '当前会话') + '」无权使用' +
          ((CFG.systemLabels || {})[feature] || feature) + '；该功能仅对授权角色开放');
      }
      return role;
    },
    assertRecord: function (moduleKey, rec) {
      var role = this.role();
      if (!role) throw new Error('登录状态已失效，请重新选择角色');
      if (!rec) throw new Error('单据不存在或已删除');
      var self = this, visible = this.visibleRecords(role.id, moduleKey).some(function (x) {
        return x.id === rec.id;
      });
      if (!visible) throw new Error('该单据不在当前角色的数据范围内');
      // 门户角色只能操作自己创建的单据；内部角色在其主责模块内可协作处理
      if (role.policy.rowScope === 'supplier' && rec.createdRole !== role.id) {
        throw new Error('门户角色只能操作本公司自己提交的单据');
      }
      return role;
    },

    visibleModules: function (roleId) {
      var r = ROLE[roleId];
      return r && r.policy ? r.policy.visible.slice() : [];
    },

    visibleDomains: function (roleId) {
      var keys = this.visibleModules(roleId), out = [];
      CFG.domains.forEach(function (d) {
        var n = keys.filter(function (k) { return MOD[k].domainId === d.id; }).length;
        if (n) out.push({ id: d.id, name: d.name, desc: d.desc, count: n });
      });
      return out;
    },

    groupsFor: function (roleId, domainId) {
      var vis = this.visibleModules(roleId);
      return (CFG.groups[domainId] || []).map(function (g, i) {
        return {
          name: g[0], desc: g[2], index: i,
          modules: g[1].filter(function (k) { return vis.indexOf(k) >= 0; })
        };
      }).filter(function (g) { return g.modules.length > 0; });
    },

    // 行级数据隔离：默认拒绝未授权模块；门户角色严格只看本公司相关 / 自己提交的单据
    visibleRecords: function (roleId, moduleKey) {
      var r = ROLE[roleId];
      if (!r || !r.policy || !this.can(roleId, moduleKey, 'view')) return [];
      var list = (this.state.records[moduleKey] || []).slice();
      if (r.policy.rowScope !== 'supplier') return list;
      var company = CFG.supplierCompany;
      return list.filter(function (rec) {
        if (rec.createdRole === roleId) return true;
        return Object.keys(rec.data).some(function (k) {
          return text(rec.data[k]).indexOf(company) >= 0;
        });
      });
    },

    records: function (moduleKey) {
      var role = this.role();
      return role ? this.visibleRecords(role.id, moduleKey) : [];
    },
    allRecords: function (moduleKey) {
      // 仅供引擎内部与管理员审计使用，UI 不得直接调用
      return (this.state.records[moduleKey] || []).slice();
    },
    _raw: function (moduleKey, id) {
      return (this.state.records[moduleKey] || []).filter(function (r) { return r.id === id; })[0] || null;
    },
    get: function (moduleKey, id) {
      var role = this.role();
      if (!role || !this.can(role.id, moduleKey, 'view')) return null;
      var rec = this._raw(moduleKey, id);
      if (!rec) return null;
      var visible = this.visibleRecords(role.id, moduleKey).some(function (x) { return x.id === id; });
      return visible ? rec : null; // 禁止凭 id 越权读取详情
    },

    // -------------------------------------------------------- 日志与通知
    log: function (action, title, moduleKey, recId, opts) {
      opts = opts || {};
      var role = opts.role || (this.role() ? this.role().id : 'system');
      var person = opts.person || (this.role() ? this.role().person : '系统');
      this.state.logs.unshift({
        id: uid('log'), ts: now(), role: role, person: person, action: action,
        moduleKey: moduleKey || '', recId: recId || '', title: title,
        detail: opts.detail || ''
      });
      if (this.state.logs.length > 500) this.state.logs.length = 500;
    },

    notify: function (to, type, title, text, moduleKey, recId) {
      this.state.notifications.unshift({
        id: uid('ntf'), ts: now(), to: to, type: type, title: title,
        text: text, moduleKey: moduleKey || '', recId: recId || '', read: {}
      });
      if (this.state.notifications.length > 300) this.state.notifications.length = 300;
    },

    notificationsFor: function (roleId) {
      var self = this;
      return this.state.notifications.filter(function (n) {
        if (!(n.to.indexOf(roleId) >= 0 || n.to.indexOf('all') >= 0)) return false;
        // 通知不得泄露当前角色不可见模块的信息
        if (n.moduleKey && !self.can(roleId, n.moduleKey, 'view')) return false;
        return true;
      });
    },
    markRead: function (id, roleId) {
      var n = this.state.notifications.filter(function (x) { return x.id === id; })[0];
      if (n) { n.read[roleId] = true; this.save(); }
    },
    markAllRead: function (roleId) {
      this.notificationsFor(roleId).forEach(function (n) { n.read[roleId] = true; });
      this.save();
    },
    unread: function (roleId) {
      return this.notificationsFor(roleId).filter(function (n) { return !n.read[roleId]; }).length;
    },

    // -------------------------------------------------------- 校验
    validate: function (mod, data) {
      var errs = [];
      (mod.required || []).forEach(function (f) {
        if (f === mod.noField) return; // 编号由系统自动生成，不参与必填校验
        if (!text(data[f]).trim()) errs.push('「' + f + '」为必填项');
      });
      mod.fields.forEach(function (f) {
        var v = data[f.name];
        if (v === '' || v === undefined || v === null) return;
        if ((f.type === 'n' || f.type === 'c' || f.type === 'g') && isNaN(Number(v))) {
          errs.push('「' + f.name + '」必须为数字');
        }
        if (f.type === 'e' && text(v) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(v))) {
          errs.push('「' + f.name + '」邮箱格式不正确');
        }
        if (f.type === 'p' && text(v) && !/^[0-9+\-() ]{6,20}$/.test(text(v))) {
          errs.push('「' + f.name + '」电话格式不正确');
        }
        if (f.type === 'l' && text(v) && !/^https?:\/\//.test(text(v))) {
          errs.push('「' + f.name + '」需以 http:// 或 https:// 开头');
        }
      });
      // 业务级校验：检验数量、日期先后
      if (mod.key === 't14') {
        var a = Number(data['送检数量'] || 0), b = Number(data['抽检数量'] || 0), c = Number(data['合格数量'] || 0);
        if (b > a) errs.push('抽检数量不得大于送检数量');
        if (c > b) errs.push('合格数量不得大于抽检数量');
      }
      if (mod.key === 't18' || mod.key === 't21' || mod.key === 't24') {
        var exp = data['期望到货日'] || data['报价截止'] || data['报名截止'];
        var start = data['申请日期'] || data['发布日期'];
        if (exp && start && String(exp) < String(start)) errs.push('截止/到货日期不得早于起始日期');
      }
      return errs;
    },

    // -------------------------------------------------------- 单据动作
    create: function (moduleKey, data, opts) {
      var mod = MOD[moduleKey];
      opts = opts || {};
      if (!mod) throw new Error('未知模块');
      var role = this.assertCap(moduleKey, 'create');
      var rec = makeRecord(mod, data, {
        createdBy: role.id, createdRole: role.id, person: role.person,
        note: opts.note || ''
      });
      if (!this.state.records[moduleKey]) this.state.records[moduleKey] = [];
      this.state.records[moduleKey].unshift(rec);
      this.log('新建单据', rec.no + ' · ' + text(rec.data[mod.titleField]), moduleKey, rec.id,
        { detail: '来源：手工新建' });
      this.notify(mod.approvers.concat([role.id]), '流转', '新建单据 · ' + mod.name,
        rec.no + ' 已创建，等待提交审批。', moduleKey, rec.id);
      this.save();
      emitSync(moduleKey, rec, 'create');
      return rec;
    },

    // 同步网关专用：把钉钉表单/表格的数据落地到本地库。
    // 这是系统行为，不受当前登录角色的写权限约束；不触发回推送，避免同步回环。
    systemUpsert: function (moduleKey, data, meta) {
      var mod = MOD[moduleKey];
      if (!mod) throw new Error('未知模块');
      meta = meta || {};
      var remoteId = text(meta.remoteId);
      var list = this.state.records[moduleKey] || (this.state.records[moduleKey] = []);
      var hit = null;
      if (remoteId) {
        hit = list.filter(function (r) { return r.remoteId === remoteId; })[0];
      }
      if (!hit && mod.noField && text(data[mod.noField])) {
        var no = text(data[mod.noField]);
        hit = list.filter(function (r) { return r.no === no; })[0];
      }
      if (hit) {
        // 本地有人工修改且晚于上次同步 -> 不静默覆盖，交由冲突裁决
        if (hit.updatedAt && hit.lastSyncAt && hit.updatedAt > hit.lastSyncAt &&
            !meta.force) return { rec: hit, action: 'conflict' };
        var d = clone(data);
        if (mod.noField) d[mod.noField] = hit.no;
        hit.data = d;
        hit.updatedAt = now(); hit.lastSyncAt = now();
        hit.remoteId = remoteId || hit.remoteId;
        hit.origin = meta.origin || hit.origin || 'dingtalk-form';
        hit.timeline.push({ ts: now(), action: '同步更新', person: '同步网关', role: 'system',
          from: hit.status, to: hit.status, note: meta.note || '' });
        this.save();
        return { rec: hit, action: 'updated' };
      }
      var rec = makeRecord(mod, data, {
        createdBy: 'system', createdRole: '', person: meta.person || '钉钉表单',
        note: meta.note || '来源：钉钉表单提交'
      });
      rec.origin = meta.origin || 'dingtalk-form';
      rec.remoteId = remoteId || uid('remote');
      rec.lastSyncAt = now();
      rec.syncState = 'pulled';
      list.unshift(rec);
      this.log('同步拉取', rec.no + ' · ' + mod.name, moduleKey, rec.id,
        { detail: meta.note || '钉钉表单 → 前端单据', person: '同步网关', role: 'system' });
      this.save();
      return { rec: rec, action: 'created' };
    },

    update: function (moduleKey, id, data) {
      var mod = MOD[moduleKey];
      var role = this.assertCap(moduleKey, 'edit');
      var rec = this._raw(moduleKey, id);
      this.assertRecord(moduleKey, rec);
      if (rec.status === 'done') throw new Error('已完成的单据不可编辑，请先撤销');
      var d = clone(data);
      if (mod.noField) d[mod.noField] = rec.no;
      rec.data = d;
      rec.updatedAt = now();
      rec.timeline.push({ ts: now(), action: '编辑单据', person: role.person, role: role.id,
        from: rec.status, to: rec.status, note: '' });
      this.log('编辑单据', rec.no + ' · ' + text(rec.data[mod.titleField]), moduleKey, id);
      this.save();
      emitSync(moduleKey, rec, 'update');
      return rec;
    },

    transition: function (moduleKey, id, action, note) {
      var mod = MOD[moduleKey];
      if (!mod) throw new Error('未知模块');
      var need = action === 'approve' ? 'approve' : action === 'reject' ? 'reject' :
        action === 'remove' ? 'delete' : 'submit';
      var role = this.assertCap(moduleKey, need);
      var rec = this._raw(moduleKey, id);
      this.assertRecord(moduleKey, rec);
      if (action === 'approve' && mod.approvers.indexOf(role.id) < 0 && role.id !== 'admin') {
        throw new Error('该单据由「' + mod.approvers.map(function (a) { return ROLE[a].name; }).join('/') + '」审批');
      }
      // 职责分离：创建人不得审批 / 驳回自己的单据（超级管理员除外）
      if ((action === 'approve' || action === 'reject') && rec.createdRole === role.id && role.id !== 'admin') {
        throw new Error('职责分离：不能审批自己创建的单据，请由「' +
          mod.approvers.map(function (a) { return ROLE[a].name; }).join('/') + '」处理');
      }
      var from = rec.status, to = from;
      var label = '';
      if (action === 'submit') {
        if (from !== 'draft' && from !== 'reject') throw new Error('只有草稿或已驳回的单据可以提交');
        var errs = this.validate(mod, rec.data);
        if (errs.length) { var e = new Error(errs.join('；')); e.validation = errs; throw e; }
        to = 'running'; label = '提交审批';
      } else if (action === 'approve') {
        if (from !== 'running') throw new Error('只有在途单据可以审批通过');
        to = 'done'; label = '审批通过';
      } else if (action === 'reject') {
        if (from !== 'running') throw new Error('只有在途单据可以驳回');
        to = 'reject'; label = '审批驳回';
      } else if (action === 'withdraw') {
        if (from !== 'running') throw new Error('只有在途单据可以撤销');
        to = 'draft'; label = '撤销提交';
      } else if (action === 'remove') {
        this.state.records[moduleKey] = this.state.records[moduleKey].filter(function (r) { return r.id !== id; });
        this.log('删除单据', rec.no, moduleKey, id, { detail: note || '' });
        this.save();
        return { removed: true };
      } else {
        throw new Error('未知动作');
      }
      rec.status = to;
      rec.updatedAt = now();
      if (mod.statusField) rec.data[mod.statusField] = mod.states[to];
      rec.timeline.push({ ts: now(), action: label, person: role.person, role: role.id,
        from: from, to: to, note: note || '' });
      this.log(label, rec.no + ' · ' + mod.name, moduleKey, id,
        { detail: (note || '') + (to === 'done' ? '（状态 → ' + mod.states.done + '）' : '') });

      var created = [];
      if (to === 'done') created = this.runLinks(mod, rec, role);
      var targets = mod.approvers.concat([rec.createdRole]).filter(function (x, i, a) {
        return x && a.indexOf(x) === i;
      });
      this.notify(targets, to === 'done' ? '完成' : to === 'reject' ? '驳回' : '待办',
        label + ' · ' + mod.name, rec.no + (note ? '：' + note : '') +
        (created.length ? '；已自动派生 ' + created.length + ' 张下游单据' : ''),
        moduleKey, id);
      this.save();
      emitSync(moduleKey, rec, action);
      return { rec: rec, created: created };
    },

    // 上游通过 -> 下游自动建单
    runLinks: function (mod, rec, role) {
      var self = this, created = [];
      CFG.links.filter(function (l) { return l.from_ === mod.key; }).forEach(function (l) {
        var target = MOD[l.to];
        if (!target) return;
        if (rec.chain > 6) return; // 防止循环联动
        var data = {};
        Object.keys(l.map).forEach(function (src) {
          var val = rec.data[src];
          if (val === undefined || val === null || val === '') {
            // 尝试用上游标题兜底
            if (src === '项目名称' || src === '询价标题' || src === '申请标题' || src === '合同名称') {
              val = rec.data[mod.titleField];
            }
          }
          if (val !== undefined && val !== null && val !== '') data[l.map[src]] = val;
        });
        if (target.noField) data[target.noField] = ''; // 由 makeRecord 自动生成
        if (target.titleField && !text(data[target.titleField])) {
          data[target.titleField] = text(rec.data[mod.titleField]).slice(0, 40) + ' · 自动派生';
        }
        if (target.statusField) data[target.statusField] = target.states.draft;
        // 只保留目标模块真实存在的字段，避免脏数据
        var allowed = {};
        target.fields.forEach(function (f) { allowed[f.name] = true; });
        Object.keys(data).forEach(function (k) { if (!allowed[k]) delete data[k]; });
        var child = makeRecord(target, data, {
          createdBy: role.id, createdRole: role.id, person: role.person,
          source: { moduleKey: mod.key, id: rec.id, no: rec.no },
          chain: (rec.chain || 0) + 1,
          note: '由 ' + rec.no + ' 审批通过自动派生'
        });
        if (!self.state.records[target.key]) self.state.records[target.key] = [];
        self.state.records[target.key].unshift(child);
        created.push({ moduleKey: target.key, id: child.id, no: child.no, name: target.name });
        self.log('自动派生', child.no + ' · ' + target.name, target.key, child.id,
          { detail: l.title + '，来源 ' + rec.no, person: '自动化', role: role.id });
        self.notify(target.approvers.concat([role.id]), '联动', '下游单据已生成 · ' + target.name,
          child.no + '（' + l.title + '），请补充信息后提交。', target.key, child.id);
      });
      return created;
    },

    // -------------------------------------------------------- 附件
    addAttachment: function (file, done) {
      var self = this;
      if (file.size > 2 * 1024 * 1024) { done({ error: '演示模式下单个附件不超过 2MB' }); return; }
      var reader = new global.FileReader();
      reader.onload = function () {
        var id = uid('att');
        self.state.attachments[id] = {
          id: id, name: file.name, size: file.size, type: file.type || 'application/octet-stream',
          dataUrl: reader.result, ts: now()
        };
        self.save();
        done({ id: id, name: file.name, size: file.size, type: file.type });
      };
      reader.onerror = function () { done({ error: '文件读取失败' }); };
      reader.readAsDataURL(file);
    },
    attachment: function (id) { return this.state.attachments[id] || null; },

    // -------------------------------------------------------- 统计
    statsFor: function (roleId) {
      var self = this, vis = this.visibleModules(roleId), mod = {};
      var total = 0, running = 0, done = 0, draft = 0, reject = 0, amount = 0;
      var byDomain = {}, byStatus = { draft: 0, running: 0, done: 0, reject: 0 };
      vis.forEach(function (k) {
        var list = self.visibleRecords(roleId, k);
        total += list.length;
        list.forEach(function (r) {
          byStatus[r.status] = (byStatus[r.status] || 0) + 1;
          if (r.status === 'running') running++;
          else if (r.status === 'done') done++;
          else if (r.status === 'reject') reject++;
          else draft++;
          var m = MOD[k];
          byDomain[m.domainId] = (byDomain[m.domainId] || 0) + 1;
          m.fields.forEach(function (f) {
            if (f.type === 'c' && !isNaN(Number(r.data[f.name]))) amount += Number(r.data[f.name]);
          });
        });
      });
      return { total: total, running: running, done: done, draft: draft, reject: reject,
        amount: amount, byDomain: byDomain, byStatus: byStatus, moduleCount: vis.length };
    },

    todoList: function (roleId, limit) {
      var self = this, out = [];
      this.visibleModules(roleId).forEach(function (k) {
        var m = MOD[k];
        self.visibleRecords(roleId, k).forEach(function (r) {
          if (r.status !== 'running') return;
          var approveOK = self.can(roleId, k, 'approve') &&
            (m.approvers.indexOf(roleId) >= 0 || roleId === 'admin') &&
            !(r.createdRole === roleId && roleId !== 'admin');
          out.push({ rec: r, module: m, canApprove: approveOK,
            isMine: r.createdRole === roleId });
        });
      });
      out.sort(function (a, b) { return String(b.rec.updatedAt).localeCompare(String(a.rec.updatedAt)); });
      return limit ? out.slice(0, limit) : out;
    },

    alerts: function (roleId) {
      var self = this, out = [];
      this.visibleModules(roleId).forEach(function (k) {
        var m = MOD[k];
        if (!m.statusField) return;
        self.visibleRecords(roleId, k).forEach(function (r) {
          var v = text(r.data[m.statusField]);
          if (/预警|偏低|偏高|异常|严重|不合格|驳回|超期|风险/.test(v) || r.status === 'reject') {
            out.push({ rec: r, module: m, label: v || m.states.reject,
              level: /严重|不合格|异常|偏高/.test(v) ? 'danger' : 'warn' });
          }
        });
      });
      return out.slice(0, 12);
    },

    recentLogs: function (n, roleId) {
      var self = this, rid = roleId || (this.role() ? this.role().id : '');
      var logs = this.state.logs.filter(function (l) {
        if (!l.moduleKey) return self.canSystem(rid, 'audit') || l.role === rid;
        return self.can(rid, l.moduleKey, 'view');
      });
      return logs.slice(0, n || 12);
    },

    // -------------------------------------------------------- 导出
    exportCSV: function (moduleKey, roleId) {
      var rid = roleId || (this.role() ? this.role().id : '');
      if (!this.can(rid, moduleKey, 'export')) throw new Error('当前角色无导出权限');
      var mod = MOD[moduleKey];
      var cols = mod.fields.map(function (f) { return f.name; });
      var rows = this.visibleRecords(roleId, moduleKey).map(function (r) {
        return cols.map(function (c) { return '"' + text(r.data[c]).replace(/"/g, '""') + '"'; }).join(',');
      });
      return '\ufeff' + cols.join(',') + '\n' + rows.join('\n');
    }
  };

  // ------------------------------------------------------------ 暴露
  DB.MOD = MOD;
  DB.ROLE = ROLE;
  DB.util = { uid: uid, now: now, today: today, text: text, clone: clone, inferStatus: inferStatus };
  global.ERP_DB = DB;
})(window);
