/* 启能力 ERP · 全链路协同中枢 —— 运行态前端应用
 * 纯静态、零依赖、hash 路由；所有业务数据由 engine.js 在本地持久化。
 * 页面：登录 / 工作台 / 业务域(两级Tab) / 单据模块 / 全链路流程 / 经营看板 /
 *       通知中心 / 搭建指南 / 架构字典 / 系统设置
 */
(function () {
  'use strict';

  var CFG = window.ERP_CONFIG, DB = window.ERP_DB;
  var MOD = DB.MOD, ROLE = DB.ROLE, U = DB.util;
  var $ = function (id) { return document.getElementById(id); };
  var UI = { formData: {}, listQ: '', listSt: 'all', listPage: 1, pageSize: 10,
    groupIdx: 0, drawerMode: '', formMod: '', formId: '', lastDetailMod: '', lastDetailId: '' };

  // ---------------------------------------------------------------- 基础工具
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function txt(v) { return U.text(v); }
  function money(n) { return '¥' + (Number(n) || 0).toLocaleString('zh-CN', { maximumFractionDigits: 2 }); }
  function moneyShort(n) {
    n = Number(n) || 0;
    if (Math.abs(n) >= 100000000) return '¥' + (n / 100000000).toFixed(2) + ' 亿';
    if (Math.abs(n) >= 10000) return '¥' + (n / 10000).toFixed(1) + ' 万';
    return money(n);
  }
  function d10(s) { return String(s || '').slice(0, 10); }
  function dt(s) { return String(s || '').replace('T', ' ').slice(0, 16); }
  function stInfo(s) {
    return ({ draft: ['草稿', 'pill-draft'], running: ['在途', 'pill-running'],
      done: ['完成', 'pill-done'], reject: ['驳回', 'pill-reject'] })[s] || ['未知', 'pill-draft'];
  }
  function pill(status, label) {
    var i = stInfo(status);
    return '<span class="pill ' + i[1] + '">' + esc(label || i[0]) + '</span>';
  }
  function fieldStatus(mod, rec) {
    return mod.statusField ? (txt(rec.data[mod.statusField]) || mod.states[rec.status]) : mod.states[rec.status];
  }
  function toast(title, detail, kind) {
    var w = $('toastWrap'), d = document.createElement('div');
    d.className = 'toast ' + (kind || '');
    d.innerHTML = '<b>' + esc(title) + '</b>' + (detail ? '<small>' + esc(detail) + '</small>' : '');
    w.appendChild(d);
    setTimeout(function () {
      d.style.opacity = '0'; d.style.transform = 'translateX(20px)';
      setTimeout(function () { d.remove(); }, 220);
    }, 3600);
  }
  var ICONS = {
    home: '<path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    flow: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 12h5l5-6M12 12l5 6"/>',
    book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4zM20 4h-3a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h3z"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5A7 7 0 0 0 19 12z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function ico(n, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 17) + '" height="' + (size || 17) +
      '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[n] || ICONS.box) + '</svg>';
  }
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, '');
    var seg = h.split('?'), parts = seg[0].split('/'), q = {};
    (seg[1] || '').split('&').forEach(function (kv) {
      if (!kv) return; var p = kv.split('='); q[p[0]] = decodeURIComponent(p[1] || '');
    });
    return { page: parts[0] || 'workbench', a: parts[1] || '', b: parts[2] || '', q: q };
  }
  function go(path, q) {
    var s = '#/' + path;
    if (q) {
      var kv = Object.keys(q).filter(function (k) { return q[k] !== '' && q[k] != null; })
        .map(function (k) { return k + '=' + encodeURIComponent(q[k]); }).join('&');
      if (kv) s += '?' + kv;
    }
    location.hash = s;
  }
  function replaceHash(path, q) {
    var s = '#/' + path, kv = q ? Object.keys(q).filter(function (k) { return q[k] !== '' && q[k] != null; })
      .map(function (k) { return k + '=' + encodeURIComponent(q[k]); }).join('&') : '';
    if (kv) s += '?' + kv;
    try { history.replaceState(null, '', s); } catch (e) { /* file:// 下忽略 */ }
  }

  // ---------------------------------------------------------------- 抽屉
  function openDrawer(title, sub, body, foot, wide) {
    $('drawerTitle').textContent = title;
    $('drawerSub').textContent = sub || '';
    $('drawerBody').innerHTML = body;
    $('drawerFoot').innerHTML = foot || '<span class="foot-left"></span><div class="foot-right"></div>';
    $('drawer').classList.toggle('wide', !!wide);
    $('drawer').classList.remove('hidden');
    $('drawerOverlay').classList.remove('hidden');
    $('drawerBody').scrollTop = 0;
  }
  function closeDrawer() {
    $('drawer').classList.add('hidden');
    $('drawerOverlay').classList.add('hidden');
    UI.drawerMode = '';
  }

  // ---------------------------------------------------------------- 登录
  function initLogin() {
    $('loginRoles').innerHTML = CFG.roles.map(function (r) {
      return '<button class="role-quick" data-act="login-role" data-role="' + r.id + '">' +
        '<i style="background:' + r.color + '"></i>' + esc(r.name) + '<small>' + esc(r.person) + '</small></button>';
    }).join('');
    $('loginBtn').addEventListener('click', function () {
      var acc = ($('loginAccount').value || '').trim().toLowerCase();
      var hit = CFG.roles.filter(function (r) { return acc === r.account || acc === r.name; })[0];
      doLogin(hit ? hit.id : 'admin');
    });
    $('loginPwd').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('loginBtn').click(); });
    $('forgotPwd').addEventListener('click', function () {
      toast('演示环境', '无需密码，请直接选择下方任一角色进入。', 'warn');
    });
  }
  function doLogin(roleId) {
    DB.login(roleId);
    $('loginView').classList.add('hidden');
    $('appView').classList.remove('hidden');
    go('workbench');
    render();
    var r = ROLE[roleId];
    toast('已以「' + r.name + '」身份进入', r.scope, 'ok');
  }

  // ---------------------------------------------------------------- 框架外壳
  function shell(route) {
    var r = DB.role();
    $('sbBrand').textContent = r.brand;
    $('sbSlogan').textContent = r.slogan;
    $('topRole').textContent = r.name;
    $('topPerson').textContent = r.person;
    $('topAvatar').textContent = r.person.slice(0, 1);
    $('topAvatar').style.background = r.color;
    var n = DB.unread(r.id);
    $('bellBadge').textContent = n > 99 ? '99+' : n;
    $('bellBadge').classList.toggle('hidden', n === 0);
    $('dingtalkBtn').href = 'https://alidocs.dingtalk.com/i/nodes/' + CFG.meta.baseId;

    var domains = DB.visibleDomains(r.id);
    var nav = '<div class="sb-group-label">工作台</div>' +
      navItem('workbench', '', 'home', '工作台', '', route.page === 'workbench') +
      '<div class="sb-group-label">业务域 · ' + domains.length + '</div>';
    domains.forEach(function (d) {
      nav += navItem('domain', d.id, 'box', d.name, d.count, route.page === 'domain' && route.a === d.id);
    });
    nav += '<div class="sb-group-label">协同与分析</div>' +
      navItem('flow', '', 'flow', '全链路流程', '', route.page === 'flow') +
      navItem('board', '', 'chart', '经营看板', '', route.page === 'board') +
      navItem('notify', '', 'bell', '通知中心', n || '', route.page === 'notify') +
      '<div class="sb-group-label">系统</div>' +
      navItem('guide', '', 'book', '系统搭建指南', '', route.page === 'guide') +
      navItem('dict', '', 'list', '架构字典', '', route.page === 'dict') +
      navItem('settings', '', 'gear', '系统设置', '', route.page === 'settings');
    $('sbNav').innerHTML = nav;
    var crumbs = breadcrumb(route);
    $('crumb').innerHTML = crumbs.map(function (c, i) {
      return (i ? '<span class="sep">/</span>' : '') +
        (i === crumbs.length - 1 ? '<b>' + esc(c) + '</b>' : esc(c));
    }).join(' ');
  }
  function navItem(page, a, icon, label, count, active) {
    return '<button class="sb-item ' + (active ? 'active' : '') + '" data-act="nav" data-href="' +
      page + (a ? '/' + a : '') + '" title="' + esc(label) + '">' +
      '<span class="sb-ico">' + ico(icon) + '</span><span class="sb-label">' + esc(label) + '</span>' +
      (count !== '' && count != null ? '<span class="sb-count">' + esc(count) + '</span>' : '') + '</button>';
  }
  function breadcrumb(route) {
    var p = route.page, r = DB.role();
    if (p === 'workbench') return [r.wbTitle];
    if (p === 'domain') {
      var d = CFG.domains.filter(function (x) { return x.id === route.a; })[0];
      return ['业务域', d ? d.name : route.a];
    }
    if (p === 'module') {
      var m = MOD[route.a];
      return ['业务域', m ? m.domain : '', m ? m.name : route.a];
    }
    return ({ flow: ['协同与分析', '全链路流程'], board: ['协同与分析', '经营看板'],
      notify: ['协同与分析', '通知中心'], guide: ['系统', '系统搭建指南'],
      dict: ['系统', '架构字典'], settings: ['系统', '系统设置'] })[p] || ['启能力 ERP'];
  }

  // ---------------------------------------------------------------- 渲染入口
  function render() {
    var session = DB.session();
    if (!session || !ROLE[session.roleId]) {
      $('loginView').classList.remove('hidden');
      $('appView').classList.add('hidden');
      return;
    }
    $('loginView').classList.add('hidden');
    $('appView').classList.remove('hidden');
    var route = parseHash();
    if (route.page === 'login') { go('workbench'); return; }
    shell(route);
    var html = '';
    switch (route.page) {
      case 'workbench': html = pageWorkbench(); break;
      case 'domain': html = pageDomain(route.a, route.q); break;
      case 'module': html = pageModule(route.a, route.q); break;
      case 'flow': html = pageFlow(); break;
      case 'board': html = pageBoard(); break;
      case 'notify': html = pageNotify(); break;
      case 'guide': html = pageGuide(); break;
      case 'dict': html = pageDict(route.q); break;
      case 'settings': html = pageSettings(); break;
      default: html = pageWorkbench();
    }
    $('content').innerHTML = html;
    $('content').scrollTop = 0;
    if (route.page === 'module') updateList(route.a);
  }

  function scopeBar(role) {
    return '<div class="scope-bar"><b>当前角色权限</b><span>' + esc(role.scope) +
      '</span><span class="scope-spacer"></span><span class="scope-pill">' + esc(role.name) + ' · ' +
      esc(role.person) + '</span></div>';
  }
  function emptyBox(title, desc) {
    return '<div class="empty"><div class="empty-icon">' + ico('list', 24) + '</div><h4>' + esc(title) +
      '</h4><p>' + esc(desc) + '</p></div>';
  }

  // ---------------------------------------------------------------- 工作台
  function pageWorkbench() {
    var r = DB.role(), s = DB.statsFor(r.id), todos = DB.todoList(r.id, 8), alerts = DB.alerts(r.id);
    var h = '<div class="page-head"><div><h2>' + esc(r.wbTitle) + '</h2><p>' + esc(r.wbSub) +
      ' · 数据实时来自本地单据，切换角色后口径随权限变化</p></div>' +
      '<div class="head-actions"><button class="btn" data-act="nav" data-href="guide">如何搭建与填写</button>' +
      '<button class="btn btn-primary" data-act="nav" data-href="flow">查看全链路流程</button></div></div>' +
      scopeBar(r);

    h += '<div class="flow-hero"><h3>' + esc(r.wbTitle) + ' · 全链路进程总控</h3>' +
      '<p>供应商准入 → 寻源定标 → 合同订单 → 交付收货 → 仓储入库 → 财务结算 → 装柜留痕 · 点击环节直达对应单据模块</p>' +
      '<div class="steps">' + CFG.flow.map(function (f) {
        return '<button class="step" data-act="step-go" data-mod="' + f.module + '"><b>' + f.step +
          '</b>' + esc(f.name) + '</button>';
      }).join('') + '</div></div>';

    var kpis = [
      { cls: '', label: '可见业务单据', value: s.total, foot: '覆盖 ' + s.moduleCount + ' 个授权模块' },
      { cls: 'warn', label: '在途待办', value: s.running, foot: '待提交 / 审批中 / 处理中' },
      { cls: 'ok', label: '已完成', value: s.done, foot: '完成率 ' + (s.total ? Math.round(s.done / s.total * 100) : 0) + '%' },
      { cls: 'purple', label: '涉及金额', value: moneyShort(s.amount), foot: '授权范围内金额字段合计' }
    ];
    h += '<div class="grid grid-4">' + kpis.map(function (k) {
      return '<div class="kpi ' + k.cls + '"><div class="kpi-label">' + esc(k.label) + '</div>' +
        '<div class="kpi-value">' + esc(k.value) + '</div><div class="kpi-foot">' + esc(k.foot) + '</div></div>';
    }).join('') + '</div><div class="grid grid-2 section-gap">';

    h += '<div class="card card-pad"><div class="card-title"><h3>今日待办 · 按角色收敛</h3>' +
      '<span class="sub">共 ' + DB.todoList(r.id).length + ' 条</span></div>';
    if (!todos.length) h += emptyBox('暂无在途单据', '新建一张单据并提交，这里就会出现待办');
    else {
      h += '<div class="table-wrap"><table class="data-table"><thead><tr><th>单据编号</th><th>业务模块</th><th>摘要</th><th>状态</th><th>操作</th></tr></thead><tbody>';
      todos.forEach(function (t) {
        var rec = t.rec, m = t.module;
        h += '<tr data-act="open-detail" data-mod="' + m.key + '" data-id="' + rec.id + '">' +
          '<td><span class="cell-main mono">' + esc(rec.no) + '</span></td>' +
          '<td>' + esc(m.name) + '</td>' +
          '<td><span class="cell-main">' + esc(txt(rec.data[m.titleField]).slice(0, 26)) + '</span></td>' +
          '<td>' + pill(rec.status, fieldStatus(m, rec)) + '</td>' +
          '<td><div class="row-actions">' +
          (t.canApprove && DB.can(r.id, m.key, 'approve')
            ? '<button class="link-btn" data-act="act" data-action="approve" data-mod="' + m.key + '" data-id="' + rec.id + '" data-stop="1">通过</button>' : '') +
          '<button class="link-btn" data-act="open-detail" data-mod="' + m.key + '" data-id="' + rec.id + '" data-stop="1">详情</button>' +
          '</div></td></tr>';
      });
      h += '</tbody></table></div>';
    }
    h += '</div>';

    h += '<div class="card card-pad"><div class="card-title"><h3>风险与协同预警</h3><span class="sub">来自单据状态</span></div>';
    if (!alerts.length) h += emptyBox('暂无预警', '当前授权范围内没有异常状态单据');
    else {
      h += alerts.slice(0, 7).map(function (a) {
        return '<div class="ntf-item" style="margin-bottom:7px"><span class="ntf-dot" style="background:' +
          (a.level === 'danger' ? 'var(--danger)' : 'var(--warn)') + '"></span><div class="ntf-main">' +
          '<b>' + esc(a.rec.no) + ' · ' + esc(a.module.name) + '</b>' +
          '<p>' + esc(txt(a.rec.data[a.module.titleField]).slice(0, 34)) + '</p>' +
          '<small>' + esc(a.label) + ' · ' + esc(d10(a.rec.updatedAt)) + '</small></div>' +
          '<button class="link-btn" data-act="open-detail" data-mod="' + a.module.key + '" data-id="' + a.rec.id + '">查看</button></div>';
      }).join('');
    }
    h += '</div></div>';

    var domains = DB.visibleDomains(r.id);
    h += '<div class="grid grid-2 section-gap"><div class="card card-pad"><div class="card-title"><h3>授权业务域</h3>' +
      '<span class="sub">' + domains.length + ' / ' + CFG.domains.length + ' 个域可见</span></div><div class="grid grid-2">' +
      domains.map(function (d) {
        return '<div class="module-card" data-act="nav" data-href="domain/' + d.id + '">' +
          '<div class="mc-top"><div class="module-icon">' + esc(d.id) + '</div><h4>' + esc(d.name) + '</h4></div>' +
          '<div class="mc-desc">' + esc(d.desc) + '</div><div class="mc-meta"><span class="tag">' + d.count + ' 个模块</span>' +
          '<span class="mc-count">' + (s.byDomain[d.id] || 0) + ' 张单据</span></div></div>';
      }).join('') + '</div></div>';
    h += '<div class="card card-pad"><div class="card-title"><h3>最近操作日志</h3><span class="sub">本地审计</span></div>' +
      DB.recentLogs(9).map(function (l) {
        return '<div class="kv" style="gap:8px"><span class="k" style="width:76px">' + esc(dt(l.ts).slice(5)) + '</span>' +
          '<span class="v" style="font-weight:500">' + esc(l.title) +
          ' <span class="tag" style="margin-left:5px">' + esc(l.person) + '</span></span></div>';
      }).join('') + '</div></div>';
    return h;
  }

  // ---------------------------------------------------------------- 业务域（两级 Tab）
  function pageDomain(domainId, q) {
    var r = DB.role(), groups = DB.groupsFor(r.id, domainId);
    var d = CFG.domains.filter(function (x) { return x.id === domainId; })[0];
    if (!d) return emptyBox('业务域不存在', '请从左侧导航重新选择');
    if (!groups.length) return '<div class="notice-box"><b>权限隔离生效：</b>当前角色「' + esc(r.name) +
      '」未被授权访问「' + esc(d.name) + '」。切换角色后可查看。</div>' + emptyBox('无可见模块', '请从左侧选择已授权的业务域');
    var gi = Math.min(parseInt(q.g || '0', 10) || 0, groups.length - 1);
    UI.groupIdx = gi;
    var g = groups[gi];
    var h = '<div class="page-head"><div><h2>' + esc(d.name) + '</h2><p>' + esc(d.desc) +
      ' · 一级 Tab 是业务分组，二级 Tab 是具体单据模块</p></div><div class="head-actions">' +
      '<button class="btn" data-act="nav" data-href="flow">全链路流程</button></div></div>';
    h += '<div class="tabs-primary">' + groups.map(function (x, i) {
      return '<button class="' + (i === gi ? 'active' : '') + '" data-act="group" data-domain="' + domainId +
        '" data-g="' + i + '">' + esc(x.name) + '</button>';
    }).join('') + '</div>';
    h += '<div class="notice-box"><b>' + esc(g.name) + '：</b>' + esc(g.desc) +
      ' · 该分组下 ' + g.modules.length + ' 个可操作模块，点卡片进入单据列表。</div>';
    h += '<div class="tabs-secondary">' + g.modules.map(function (k, i) {
      var m = MOD[k];
      return '<button class="' + (i === 0 ? 'active' : '') + '" data-act="tab-module" data-mod="' + k +
        '">' + esc(m.name) + '<span class="tab-count">' + DB.visibleRecords(r.id, k).length + '</span></button>';
    }).join('') + '</div>';
    h += '<div class="grid grid-3">' + g.modules.map(function (k) { return moduleCard(k, r.id); }).join('') + '</div>';
    return h;
  }
  function moduleCard(key, roleId) {
    var m = MOD[key], list = DB.visibleRecords(roleId, key);
    var running = list.filter(function (x) { return x.status === 'running'; }).length;
    return '<div class="module-card" data-act="nav" data-href="module/' + key + '">' +
      '<div class="mc-top"><div class="module-icon">' + esc(m.noPrefix.slice(0, 3)) + '</div>' +
      '<h4>' + esc(m.name) + '</h4>' + (running ? pill('running', running + ' 在途') : '') + '</div>' +
      '<div class="mc-desc">' + esc(m.guide) + '</div><div class="mc-meta">' +
      '<span class="tag">' + m.fields.length + ' 字段</span>' +
      '<span class="tag">' + m.views.length + ' 视图</span>' +
      (m.hasAI ? '<span class="tag">AI 字段</span>' : '') +
      (m.hasAttachment ? '<span class="tag">附件</span>' : '') +
      (m.form ? '<span class="tag">表单</span>' : '') +
      '<span class="mc-count">' + list.length + ' 张单据</span></div></div>';
  }

  // ---------------------------------------------------------------- 单据模块列表
  function pageModule(key, q) {
    var m = MOD[key], r = DB.role();
    if (!m || !DB.can(r.id, key, 'view')) {
      return '<div class="notice-box"><b>权限隔离生效：</b>当前角色无权访问该模块。</div>' +
        emptyBox('无权访问', '请在顶部切换为有权限的角色');
    }
    UI.listQ = q.q || ''; UI.listSt = q.st || 'all'; UI.listPage = parseInt(q.p || '1', 10) || 1;
    var groups = DB.groupsFor(r.id, m.domainId);
    var h = '<div class="page-head"><div><h2>' + esc(m.fullName) + '</h2><p>' + esc(m.guide) +
      ' · 状态字段「' + esc(m.statusField || '内置流程状态') + '」由流程动作自动推进</p></div>' +
      '<div class="head-actions">' +
      '<button class="btn" data-act="nav" data-href="domain/' + m.domainId + '">返回业务域</button>' +
      (DB.can(r.id, key, 'export') ? '<button class="btn" data-act="export-csv" data-mod="' + key + '">导出 CSV</button>' : '') +
      (DB.can(r.id, key, 'create') ? '<button class="btn btn-primary" data-act="open-form" data-mod="' + key + '">' +
        ico('plus', 15) + ' 新建单据</button>' : '<span class="tag">当前角色只读</span>') + '</div></div>';

    var grp = groups.filter(function (g) { return g.modules.indexOf(key) >= 0; })[0];
    if (grp) {
      h += '<div class="tabs-primary">' + groups.map(function (g) {
        return '<button class="' + (g.name === grp.name ? 'active' : '') + '" data-act="group" data-domain="' +
          m.domainId + '" data-g="' + g.index + '">' + esc(g.name) + '</button>';
      }).join('') + '</div><div class="tabs-secondary">' + grp.modules.map(function (k) {
        return '<button class="' + (k === key ? 'active' : '') + '" data-act="nav" data-href="module/' + k + '">' +
          esc(MOD[k].name) + '<span class="tab-count">' + DB.visibleRecords(r.id, k).length + '</span></button>';
      }).join('') + '</div>';
    }

    h += '<div class="card card-pad" style="margin-bottom:14px"><div class="grid grid-4">' +
      '<div class="kpi"><div class="kpi-label">字段数</div><div class="kpi-value">' + m.fields.length + '</div><div class="kpi-foot">含 ' +
      m.fields.filter(function (f) { return f.type === 'a'; }).length + ' 个附件字段</div></div>' +
      '<div class="kpi ok"><div class="kpi-label">钉钉视图</div><div class="kpi-value">' + m.views.length + '</div><div class="kpi-foot">' +
      esc(m.views.slice(0, 2).map(function (v) { return v.typeName; }).join(' / ')) + '</div></div>' +
      '<div class="kpi purple"><div class="kpi-label">AI 字段</div><div class="kpi-value">' + m.ai.length +
      '</div><div class="kpi-foot">' + (m.ai.length ? esc(m.ai[0].name) : '本模块未配置') + '</div></div>' +
      '<div class="kpi warn"><div class="kpi-label">审批角色</div><div class="kpi-value" style="font-size:16px;padding-top:7px">' +
      esc(m.approvers.map(function (a) { return ROLE[a].name; }).join(' / ')) + '</div><div class="kpi-foot">审批通过后自动派生下游单据</div></div>' +
      '</div></div>';

    h += '<div class="toolbar"><div class="search-box"><input id="listSearch" type="search" placeholder="搜索编号 / 标题 / 任意字段…" value="' +
      esc(UI.listQ) + '"></div>' +
      '<div class="chip-filters">' + [['all', '全部'], ['draft', '草稿'], ['running', '在途'], ['done', '完成'], ['reject', '驳回']]
        .map(function (p) { return '<button class="chip ' + (UI.listSt === p[0] ? 'active' : '') +
          '" data-act="filter-status" data-st="' + p[0] + '">' + p[1] + '</button>'; }).join('') + '</div>' +
      '<span class="muted small" id="listCount"></span></div>';
    h += '<div id="listArea"></div>';
    return h;
  }

  function filteredRecords(key) {
    var r = DB.role(), list = DB.visibleRecords(r.id, key);
    var q = UI.listQ.trim().toLowerCase();
    if (q) list = list.filter(function (rec) {
      if (rec.no.toLowerCase().indexOf(q) >= 0) return true;
      return Object.keys(rec.data).some(function (f) { return txt(rec.data[f]).toLowerCase().indexOf(q) >= 0; });
    });
    if (UI.listSt !== 'all') list = list.filter(function (rec) { return rec.status === UI.listSt; });
    return list;
  }
  function updateList(key) {
    var area = $('listArea'); if (!area) return;
    var m = MOD[key], r = DB.role(), list = filteredRecords(key);
    var cols = m.listFields.filter(function (f) { return f !== m.statusField; }).slice(0, 5);
    var total = list.length, pages = Math.max(1, Math.ceil(total / UI.pageSize));
    if (UI.listPage > pages) UI.listPage = pages;
    var slice = list.slice((UI.listPage - 1) * UI.pageSize, UI.listPage * UI.pageSize);
    var cnt = $('listCount'); if (cnt) cnt.textContent = '共 ' + total + ' 条';
    if (!slice.length) {
      area.innerHTML = '<div class="card">' + emptyBox('没有匹配的单据', '试试清空筛选条件，或新建一张单据') + '</div>';
      return;
    }
    var h = '<div class="table-wrap"><table class="data-table"><thead><tr><th>单据编号</th>';
    cols.forEach(function (f) { h += '<th>' + esc(f) + '</th>'; });
    h += '<th>状态</th><th>更新时间</th><th style="text-align:right">操作</th></tr></thead><tbody>';
    slice.forEach(function (rec) {
      h += '<tr data-act="open-detail" data-mod="' + key + '" data-id="' + rec.id + '">' +
        '<td><span class="cell-main mono">' + esc(rec.no) + '</span>' +
        (rec.source ? '<span class="cell-sub">派生自 ' + esc(rec.source.no) + '</span>' : '') + '</td>';
      cols.forEach(function (f) {
        var fd = m.fields.filter(function (x) { return x.name === f; })[0];
        var v = txt(rec.data[f]);
        if (fd && fd.type === 'c') v = v ? money(v) : '—';
        if (fd && fd.type === 'a') v = v ? '已上传' : '—';
        h += '<td><span class="cell-main" title="' + esc(v) + '">' + esc(v.slice(0, 22) || '—') + '</span></td>';
      });
      h += '<td>' + pill(rec.status, fieldStatus(m, rec)) + '</td>' +
        '<td class="small muted">' + esc(d10(rec.updatedAt)) + '</td><td><div class="row-actions">' +
        '<button class="link-btn" data-act="open-detail" data-mod="' + key + '" data-id="' + rec.id + '" data-stop="1">详情</button>' +
        (DB.can(r.id, key, 'edit') && rec.status !== 'done'
          ? '<button class="link-btn" data-act="edit-form" data-mod="' + key + '" data-id="' + rec.id + '" data-stop="1">编辑</button>' : '') +
        (rec.status === 'draft' || rec.status === 'reject'
          ? (DB.can(r.id, key, 'submit') ? '<button class="link-btn" data-act="act" data-action="submit" data-mod="' + key + '" data-id="' + rec.id + '" data-stop="1">提交</button>' : '')
          : rec.status === 'running'
            ? (DB.can(r.id, key, 'approve') && (m.approvers.indexOf(r.id) >= 0 || r.id === 'admin')
              ? '<button class="link-btn" data-act="act" data-action="approve" data-mod="' + key + '" data-id="' + rec.id + '" data-stop="1">通过</button>' : '')
            : '') +
        '</div></td></tr>';
    });
    h += '</tbody></table></div><div class="pager"><span>第 ' + UI.listPage + ' / ' + pages + ' 页 · 每页 ' +
      UI.pageSize + ' 条</span><div class="pg-btns">' +
      '<button class="btn btn-sm" data-act="page" data-p="' + (UI.listPage - 1) + '"' + (UI.listPage <= 1 ? ' disabled' : '') + '>上一页</button>' +
      '<button class="btn btn-sm" data-act="page" data-p="' + (UI.listPage + 1) + '"' + (UI.listPage >= pages ? ' disabled' : '') + '>下一页</button>' +
      '</div></div>';
    area.innerHTML = h;
  }

  // ---------------------------------------------------------------- 单据表单
  function fieldCtrl(m, f, val) {
    var n = f.name, t = f.type, v = val == null ? '' : val;
    var attr = 'data-field="' + esc(n) + '" data-ftype="' + t + '"';
    if (t === 's') {
      return '<select class="ctrl" ' + attr + '><option value="">请选择</option>' +
        (f.options || []).map(function (o) {
          return '<option value="' + esc(o) + '"' + (String(v) === String(o) ? ' selected' : '') + '>' + esc(o) + '</option>';
        }).join('') + '</select>';
    }
    if (t === 'r') return '<textarea class="ctrl" ' + attr + ' placeholder="' + esc(m.hints[n]) + '">' + esc(txt(v)) + '</textarea>';
    if (t === 'm') {
      var arr = Array.isArray(v) ? v : (txt(v) ? txt(v).split('、') : []);
      return '<div class="multi-opts" ' + attr + '>' + (f.options || []).map(function (o) {
        return '<button type="button" class="multi-opt ' + (arr.indexOf(o) >= 0 ? 'on' : '') +
          '" data-act="multi-toggle" data-field="' + esc(n) + '" data-v="' + esc(o) + '">' + esc(o) + '</button>';
      }).join('') + '</div>';
    }
    if (t === 'a') {
      var atts = Array.isArray(v) ? v : [];
      return '<div class="upload-zone" data-act="upload" data-field="' + esc(n) + '">点击上传附件（演示模式，≤2MB / 文件）</div>' +
        '<div class="att-list" data-field="' + esc(n) + '" data-ftype="a">' + renderAtts(n, atts) + '</div>';
    }
    if (t === 'b') return '<label class="switch"><input type="checkbox" ' + attr +
      (v === true || v === 'true' ? ' checked' : '') + '><span>确认 / 启用</span></label>';
    if (t === 'q') {
      var q = Number(v) || 0;
      return '<div class="stars" data-field="' + esc(n) + '" data-ftype="q">' + [1, 2, 3, 4, 5].map(function (i) {
        return '<button type="button" class="star ' + (i <= q ? 'on' : '') + '" data-act="star" data-field="' +
          esc(n) + '" data-v="' + i + '">★</button>';
      }).join('') + '</div>';
    }
    if (t === 'g') {
      var g = Number(v) || 0;
      return '<div class="range-row" data-field="' + esc(n) + '" data-ftype="g"><input type="range" min="0" max="100" value="' +
        g + '" data-act="range" data-field="' + esc(n) + '"><b class="range-val">' + g + '%</b></div>';
    }
    if (t === 'u') {
      var people = CFG.roles.map(function (x) { return x.person; })
        .concat(['王本发', '赵履约', '高仓管', '刘仓管', '吴仓管', '钱财务', '许招标']);
      return '<select class="ctrl" ' + attr + '><option value="">请选择人员</option>' +
        people.map(function (o) { return '<option' + (String(v) === o ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>';
    }
    if (t === 'c') return '<div class="input-affix"><span class="prefix">¥</span><input class="ctrl" type="number" step="0.01" ' +
      attr + ' value="' + esc(txt(v)) + '" placeholder="0.00"></div>';
    if (t === 'n' || t === 'd') return '<input class="ctrl" type="' + (t === 'n' ? 'number' : 'date') +
      '" ' + attr + ' value="' + esc(txt(v)) + '">';
    var types = { p: 'tel', e: 'email', l: 'url' };
    return '<input class="ctrl" type="' + (types[t] || 'text') + '" ' + attr + ' value="' + esc(txt(v)) +
      '" placeholder="' + esc(m.hints[n]) + '">';
  }
  function renderAtts(field, atts) {
    if (!atts.length) return '<span class="small muted">暂无附件</span>';
    return atts.map(function (a, i) {
      return '<div class="att-item"><span class="tag">文件</span><span class="att-name">' + esc(a.name) +
        '</span><span class="att-size">' + Math.round((a.size || 0) / 1024) + ' KB</span>' +
        '<button class="link-btn" data-act="att-preview" data-attid="' + esc(a.id) + '" data-stop="1">查看</button>' +
        '<button class="link-btn danger" data-act="att-remove" data-field="' + esc(field) + '" data-idx="' + i + '" data-stop="1">移除</button></div>';
    }).join('');
  }
  function formHTML(m, rec) {
    UI.formData = rec ? U.clone(rec.data) : {};
    var isEdit = !!rec;
    var basic = [], biz = [], extra = [];
    m.fields.forEach(function (f) {
      if (f.type === 'a' || f.type === 'r') extra.push(f);
      else if (f.name === m.statusField || f.name === m.noField || f.name === m.titleField ||
        /名称|标题|主题|供应商|物料|项目|单号|编号/.test(f.name)) basic.push(f);
      else biz.push(f);
    });
    function section(title, note, fields) {
      if (!fields.length) return '';
      return '<div class="form-section"><h4>' + esc(title) + ' <span>' + esc(note) + '</span></h4><div class="form-grid">' +
        fields.map(function (f) {
          var req = (m.required || []).indexOf(f.name) >= 0 && f.name !== m.noField;
          var full = (f.type === 'r' || f.type === 'a' || f.type === 'm') ? ' full' : '';
          var disabled = (f.name === m.noField && rec) || (f.name === m.statusField);
          return '<div class="field' + full + '" data-wrap="' + esc(f.name) + '">' +
            '<label>' + esc(f.name) + (req ? '<span class="req">*</span>' : '') +
            ' <span class="tag">' + esc(f.typeName) + '</span></label>' +
            (disabled
              ? '<div class="ctrl" style="background:var(--surface-2);color:var(--muted)">' +
                esc(txt(UI.formData[f.name]) || (f.name === m.noField ? '提交后自动生成' : m.states.draft)) + '</div>'
              : fieldCtrl(m, f, UI.formData[f.name])) +
            '<div class="hint">' + esc(m.hints[f.name] || '') + '</div><div class="err hidden"></div></div>';
        }).join('') + '</div></div>';
    }
    var body = '<div class="form-layout"><div class="form-main">' +
      section('① 单据头信息', '编号与状态由流程自动管理', basic) +
      section('② 业务明细', '按字段类型渲染，提交时校验', biz) +
      section('③ 附件与说明', '本地演示模式，文件仅存于当前浏览器', extra) +
      (m.ai.length ? '<div class="ai-box"><b>AI 字段 · ' + esc(m.ai[0].name) +
        '</b><p>' + esc(m.ai[0].prompt) + '<br>演示态不调用模型，接入钉钉 AI 表格后会自动生成。</p></div>' : '') +
      '</div><div class="form-guide"><h5>填写指引</h5><ol>' +
      '<li>带 <b style="color:var(--danger)">*</b> 的字段为必填</li>' +
      '<li>编号留空，提交时自动生成 ' + esc(m.noPrefix) + '-年月-序号</li>' +
      '<li>状态字段由「提交 / 通过 / 驳回」推进，不可手填</li>' +
      '<li>金额单位为人民币元，日期格式 YYYY-MM-DD</li>' +
      '<li>附件可上传多个文件，单个不超过 2MB</li></ol>' +
      '<div class="g-note"><b>审批角色：</b>' + esc(m.approvers.map(function (a) { return ROLE[a].name; }).join(' / ')) +
      '<br><br><b>下游联动：</b>' + esc((CFG.links.filter(function (l) { return l.from_ === m.key; })
        .map(function (l) { return l.title; })[0]) || '本模块无自动派生') + '</div></div></div>';
    var foot = '<span class="foot-left">' + (isEdit ? '编辑单据 ' + esc(rec.no) : '新建单据 · 保存为草稿后可在列表提交') + '</span>' +
      '<div class="foot-right"><button class="btn" data-act="drawer-close">取消</button>' +
      '<button class="btn" data-act="save-draft" data-mod="' + m.key + '"' + (isEdit ? ' data-id="' + rec.id + '"' : '') + '>保存草稿</button>' +
      '<button class="btn btn-primary" data-act="submit-record" data-mod="' + m.key + '"' +
      (isEdit ? ' data-id="' + rec.id + '"' : '') + '>保存并提交审批</button></div>';
    return { body: body, foot: foot };
  }
  function openForm(key, recId) {
    var m = MOD[key], r = DB.role(), rec = recId ? DB.get(key, recId) : null;
    if (!DB.can(r.id, key, rec ? 'edit' : 'create')) {
      toast('无权限', '当前角色不能' + (rec ? '编辑' : '新建') + '该模块单据', 'error'); return;
    }
    var f = formHTML(m, rec);
    UI.drawerMode = 'form'; UI.formMod = key; UI.formId = recId || '';
    openDrawer((rec ? '编辑单据 · ' : '新建单据 · ') + m.name,
      m.fullName + ' · ' + m.fields.length + ' 个字段 · 审批角色 ' +
      m.approvers.map(function (a) { return ROLE[a].name; }).join(' / '),
      f.body, f.foot, true);
  }
  function syncForm() {
    $('drawerBody').querySelectorAll('[data-field]').forEach(function (node) {
      var f = node.dataset.field, t = node.dataset.ftype;
      if (!t) return; // 星级按钮、滑块、上传区等辅助节点不参与取值
      if (t === 'm') {
        UI.formData[f] = Array.prototype.slice.call(node.querySelectorAll('.multi-opt.on'))
          .map(function (b) { return b.dataset.v; });
      } else if (t === 'a' || t === 'q' || t === 'g') {
        if (UI.formData[f] == null) UI.formData[f] = (t === 'g' ? 0 : (t === 'q' ? 0 : []));
      } else if (t === 'b') {
        UI.formData[f] = node.checked;
      } else {
        UI.formData[f] = node.value;
      }
    });
    var m = MOD[UI.formMod];
    if (UI.formId) {
      var rec = DB.get(m.key, UI.formId);
      if (rec) {
        if (m.noField) UI.formData[m.noField] = rec.no;
        if (m.statusField) UI.formData[m.statusField] = rec.data[m.statusField];
      }
    }
  }
  function collectAndValidate() {
    syncForm();
    var m = MOD[UI.formMod], errs = DB.validate(m, UI.formData);
    $('drawerBody').querySelectorAll('.field').forEach(function (w) {
      w.classList.remove('invalid');
      var e = w.querySelector('.err'); if (e) { e.classList.add('hidden'); e.textContent = ''; }
    });
    errs.forEach(function (msg) {
      var name = (msg.match(/「(.+?)」/) || [])[1];
      var wrap = $('drawerBody').querySelector('[data-wrap="' + (name || '').replace(/"/g, '') + '"]');
      if (wrap) {
        wrap.classList.add('invalid');
        var e = wrap.querySelector('.err');
        if (e) { e.textContent = msg; e.classList.remove('hidden'); }
      }
    });
    if (errs.length) {
      toast('请检查表单', errs[0] + (errs.length > 1 ? ' 等 ' + errs.length + ' 项' : ''), 'error');
      return false;
    }
    return true;
  }
  function saveForm(submit) {
    if (!collectAndValidate()) return;
    var key = UI.formMod, m = MOD[key];
    try {
      var rec = UI.formId ? DB.update(key, UI.formId, UI.formData) : DB.create(key, UI.formData);
      UI.formId = rec.id;
      if (submit) {
        DB.transition(key, rec.id, 'submit');
        toast('已提交审批', rec.no + ' 进入「' + m.states.running + '」，已通知审批角色', 'ok');
      } else {
        toast('草稿已保存', rec.no + ' 可在列表中继续编辑或提交', 'ok');
      }
      closeDrawer();
      render();
    } catch (e) {
      toast(submit ? '已存为草稿，提交未通过' : '保存失败', e.message, 'error');
    }
  }

  // ---------------------------------------------------------------- 单据详情
  function openDetail(key, recId) {
    var m = MOD[key], rec = DB.get(key, recId);
    if (!rec) { toast('单据不存在', '', 'error'); return; }
    UI.lastDetailMod = key; UI.lastDetailId = recId;
    var r = DB.role();
    var h = '<div class="detail-head"><div><div class="dh-title">' + esc(txt(rec.data[m.titleField]) || rec.no) +
      '</div><div class="dh-sub mono">' + esc(rec.no) + ' · ' + esc(m.fullName) + ' · 创建于 ' +
      esc(dt(rec.createdAt)) + '</div></div><div>' + pill(rec.status, fieldStatus(m, rec)) + '</div></div>';
    if (rec.source) {
      h += '<div class="source-box" style="margin-bottom:14px">本单据由上游 <b>' + esc(rec.source.no) +
        '</b> 审批通过后自动派生 · <button class="link-btn" data-act="open-detail" data-mod="' +
        esc(rec.source.moduleKey) + '" data-id="' + esc(rec.source.id) + '">查看来源单据</button></div>';
    }
    var kids = [];
    Object.keys(DB.state.records).forEach(function (k) {
      DB.state.records[k].forEach(function (x) {
        if (x.source && x.source.id === rec.id) kids.push({ k: k, r: x });
      });
    });
    if (kids.length) {
      h += '<div class="source-box" style="margin-bottom:14px;background:var(--ok-bg);border-color:#BFE9D2">已派生 <b>' +
        kids.length + '</b> 张下游单据：' + kids.map(function (x) {
          return '<button class="link-btn" data-act="open-detail" data-mod="' + esc(x.k) + '" data-id="' +
            esc(x.r.id) + '">' + esc(x.r.no) + '</button>';
        }).join(' ') + '</div>';
    }
    h += '<div id="actionBox"></div>';
    h += '<div class="grid grid-2"><div class="card card-pad"><div class="card-title"><h3>单据字段</h3>' +
      '<span class="sub">' + m.fields.length + ' 项</span></div><div class="kv-grid">' +
      m.fields.map(function (f) {
        var v = txt(rec.data[f.name]);
        if (f.type === 'c') v = v ? money(v) : '—';
        if (f.type === 'a') v = Array.isArray(rec.data[f.name]) && rec.data[f.name].length
          ? rec.data[f.name].map(function (a) { return a.name; }).join('、') : '—';
        if (f.type === 'b') v = rec.data[f.name] ? '是' : '否';
        return '<div class="kv"><span class="k">' + esc(f.name) + '</span><span class="v">' +
          (v ? esc(v) : '<span class="muted">—</span>') + '</span></div>';
      }).join('') + '</div></div>';
    h += '<div class="card card-pad"><div class="card-title"><h3>流程时间线</h3><span class="sub">本地审计</span></div>' +
      '<div class="timeline">' + rec.timeline.slice().reverse().map(function (t) {
        return '<div class="tl-item ' + (t.to === 'done' ? 'done' : t.to === 'reject' ? 'reject' : '') + '">' +
          '<b>' + esc(t.action) + '</b><span class="tl-meta">' + esc(dt(t.ts)) + ' · ' + esc(t.person || '系统') + '</span>' +
          (t.note ? '<p>' + esc(t.note) + '</p>' : '') +
          (t.from && t.from !== t.to ? '<p class="small muted">状态：' + esc(t.from) + ' → ' + esc(t.to) + '</p>' : '') +
          '</div>';
      }).join('') + '</div></div></div>';

    var foot = '<span class="foot-left">演示态数据 · 刷新不丢失</span><div class="foot-right">' +
      '<button class="btn" data-act="drawer-close">关闭</button>' +
      (DB.can(r.id, key, 'edit') && rec.status !== 'done'
        ? '<button class="btn" data-act="edit-form" data-mod="' + key + '" data-id="' + rec.id + '">编辑</button>' : '') +
      (rec.status === 'draft' || rec.status === 'reject'
        ? (DB.can(r.id, key, 'submit') ? '<button class="btn btn-primary" data-act="act" data-action="submit" data-mod="' + key + '" data-id="' + rec.id + '">提交审批</button>' : '')
        : rec.status === 'running'
          ? ((DB.can(r.id, key, 'approve') && (m.approvers.indexOf(r.id) >= 0 || r.id === 'admin'))
              ? '<button class="btn" data-act="act" data-action="reject" data-mod="' + key + '" data-id="' + rec.id + '">驳回</button>' +
                '<button class="btn btn-primary" data-act="act" data-action="approve" data-mod="' + key + '" data-id="' + rec.id + '">审批通过</button>'
              : '<span class="tag">等待 ' + esc(m.approvers.map(function (a) { return ROLE[a].name; }).join(' / ')) + ' 审批</span>')
          : '<span class="tag">流程已结束</span>') +
      '</div>';
    UI.drawerMode = 'detail';
    openDrawer('单据详情 · ' + rec.no, m.fullName, h, foot, true);
  }
  var ACTION_LABEL = { submit: '提交审批', approve: '审批通过', reject: '审批驳回', withdraw: '撤销提交', remove: '删除单据' };
  function showActionBox(key, recId, action) {
    var box = $('actionBox'); if (!box) return;
    var need = action === 'approve' || action === 'reject' || action === 'remove';
    box.innerHTML = '<div class="card card-pad" style="margin-bottom:14px;border-color:var(--brand);background:var(--brand-soft)">' +
      '<div class="card-title"><h3>' + esc(ACTION_LABEL[action] || action) + '</h3></div>' +
      '<p class="small muted" style="margin:0 0 9px">' +
      (action === 'approve' ? '通过后状态流转为「' + esc(MOD[key].states.done) + '」，并按联动规则自动派生下游单据。' :
       action === 'reject' ? '驳回后单据回到可编辑状态，创建人会收到通知。' :
       action === 'submit' ? '提交前会校验必填项与字段格式，通过后进入在途状态。' :
       action === 'withdraw' ? '撤销后回到草稿状态，可继续编辑。' : '删除后不可恢复。') + '</p>' +
      (need ? '<textarea class="ctrl" id="actionNote" rows="2" placeholder="填写审批意见 / 备注（可选）"></textarea>' : '') +
      '<div style="display:flex;gap:8px;margin-top:10px"><button class="btn btn-primary btn-sm" data-act="confirm-action" data-action="' +
      action + '" data-mod="' + key + '" data-id="' + recId + '">确认' + esc(ACTION_LABEL[action] || '') + '</button>' +
      '<button class="btn btn-sm" data-act="cancel-action">取消</button></div></div>';
  }
  function doAction(key, recId, action) {
    var note = $('actionNote') ? $('actionNote').value.trim() : '';
    try {
      var res = DB.transition(key, recId, action, note);
      if (res.removed) { toast('单据已删除', '', 'ok'); closeDrawer(); render(); return; }
      var created = res.created || [];
      toast(ACTION_LABEL[action] + '成功',
        res.rec.no + ' → ' + MOD[key].states[res.rec.status] +
        (created.length ? '；自动派生 ' + created.map(function (c) { return c.no; }).join('、') : ''), 'ok');
      render();
      openDetail(key, recId);
    } catch (e) {
      toast('操作未成功', e.message, 'error');
      var box = $('actionBox');
      if (box) box.innerHTML = '<div class="notice-box" style="margin-bottom:14px"><b>校验未通过：</b>' +
        esc(e.message) + '</div>' + box.innerHTML;
    }
  }

  // ---------------------------------------------------------------- 全链路流程
  function pageFlow() {
    var r = DB.role();
    var h = '<div class="page-head"><div><h2>全链路业务流程</h2><p>8 个环节串联 8 大业务域，节点可点击直达对应单据模块；上游审批通过会自动派生下游单据</p></div>' +
      '<div class="head-actions"><button class="btn" data-act="nav" data-href="guide">查看搭建指南</button></div></div>' +
      '<div class="notice-box"><b>如何把链路跑起来：</b>从任一环节新建单据 → 保存并提交审批 → 切换为对应审批角色 → 在待办里点「通过」，系统会自动在下一个环节生成一张草稿单据，如此层层推进即可贯通全链路。</div>';
    h += '<div class="card card-pad"><div class="card-title"><h3>端到端流程链路</h3><span class="sub">当前身份：' + esc(r.name) + '</span></div>' +
      '<div class="flow-canvas">' + CFG.flow.map(function (f, i) {
        var m = MOD[f.module], visible = DB.can(r.id, f.module, 'view');
        var cnt = DB.visibleRecords(r.id, f.module).length;
        return (i ? '<div class="flow-arrow">' + ico('arrow', 16) + '</div>' : '') +
          '<div class="flow-node ' + (visible ? '' : 'locked') + '" ' +
          (visible ? 'data-act="step-go" data-mod="' + f.module + '"' : '') + '>' +
          '<div class="fn-no">' + f.step + '</div><div class="fn-name">' + esc(f.name) + '</div>' +
          '<div class="fn-domain">' + esc(f.domain) + ' · ' + esc(m.name) + '</div>' +
          '<div class="fn-desc">' + esc(f.desc) + '</div>' +
          '<div class="fn-foot"><span class="tag">' + (visible ? cnt + ' 张单据' : '无权限') + '</span>' +
          (visible ? '<span class="link-btn">进入 →</span>' : '') + '</div></div>';
      }).join('') + '</div></div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>自动联动规则</h3><span class="sub">' +
      CFG.links.length + ' 条 · 上游通过后触发</span></div><div class="table-wrap"><table class="data-table"><thead>' +
      '<tr><th>上游模块</th><th>触发动作</th><th>下游模块</th><th>继承字段</th></tr></thead><tbody>' +
      CFG.links.map(function (l) {
        return '<tr><td><span class="cell-main">' + esc(MOD[l.from_].name) + '</span></td>' +
          '<td>' + esc(l.title) + '</td><td><span class="cell-main">' + esc(MOD[l.to].name) + '</span></td>' +
          '<td class="small muted">' + esc(Object.keys(l.map).slice(0, 4).join(' / ')) + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
    return h;
  }

  // ---------------------------------------------------------------- 经营看板
  function pageBoard() {
    var r = DB.role(), s = DB.statsFor(r.id), domains = DB.visibleDomains(r.id);
    var h = '<div class="page-head"><div><h2>经营看板</h2><p>按当前角色可见范围实时聚合 · 图表为纯 SVG 渲染，无外部依赖</p></div>' +
      '<div class="head-actions"><button class="btn" data-act="export-board">导出汇总 CSV</button></div></div>';
    h += '<div class="grid grid-4">' +
      [['单据总量', s.total, '授权范围内'], ['在途待办', s.running, '需处理'],
       ['已完成', s.done, '完成率 ' + (s.total ? Math.round(s.done / s.total * 100) : 0) + '%'],
       ['金额合计', moneyShort(s.amount), '金额字段汇总']].map(function (k, i) {
        return '<div class="kpi ' + ['', 'warn', 'ok', 'purple'][i] + '"><div class="kpi-label">' + esc(k[0]) +
          '</div><div class="kpi-value">' + esc(k[1]) + '</div><div class="kpi-foot">' + esc(k[2]) + '</div></div>';
      }).join('') + '</div>';
    h += '<div class="chart-grid section-gap">' +
      chartPie('单据状态分布', '按流程状态聚合', [
        { label: '草稿', v: s.byStatus.draft || 0, c: '#8A94AA' },
        { label: '在途', v: s.byStatus.running || 0, c: '#F79009' },
        { label: '完成', v: s.byStatus.done || 0, c: '#12B76A' },
        { label: '驳回', v: s.byStatus.reject || 0, c: '#F04438' }]) +
      chartBar('各业务域单据量', '授权范围内的模块记录数', domains.map(function (d) {
        return { label: d.name, v: s.byDomain[d.id] || 0 };
      })) + '</div>';
    h += '<div class="chart-grid section-gap"><div class="chart-box"><h4>全链路环节覆盖</h4>' +
      '<p>每个环节已录入的单据数量</p>' + CFG.flow.map(function (f) {
        var v = DB.visibleRecords(r.id, f.module).length;
        var max = Math.max.apply(null, CFG.flow.map(function (x) {
          return DB.visibleRecords(r.id, x.module).length;
        }).concat([1]));
        return '<div class="funnel-row"><span class="fl">' + esc(f.step + ' ' + f.name) + '</span>' +
          '<span class="fb"><i style="width:' + Math.max(3, v / max * 100) + '%"></i></span>' +
          '<span class="fv">' + v + '</span></div>';
      }).join('') + '</div>';
    var todoByRole = CFG.roles.map(function (x) {
      return { label: x.name, v: DB.todoList(x.id).filter(function (t) { return t.canApprove; }).length, c: x.color };
    });
    h += chartBar('各角色待办分布', '按审批归属统计在途单据', todoByRole) + '</div>';
    return h;
  }
  function chartPie(title, sub, items) {
    var total = items.reduce(function (a, b) { return a + b.v; }, 0) || 1;
    var cx = 110, cy = 110, R = 84, r = 52, acc = -Math.PI / 2, paths = '';
    items.forEach(function (it) {
      var ang = it.v / total * Math.PI * 2, end = acc + ang;
      if (it.v <= 0) return;
      var large = ang > Math.PI ? 1 : 0;
      var p = function (rad, a) { return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]; };
      var a1 = p(R, acc), a2 = p(R, end), b1 = p(r, end), b2 = p(r, acc);
      paths += '<path d="M' + a1[0] + ' ' + a1[1] + ' A' + R + ' ' + R + ' 0 ' + large + ' 1 ' + a2[0] + ' ' + a2[1] +
        ' L' + b1[0] + ' ' + b1[1] + ' A' + r + ' ' + r + ' 0 ' + large + ' 0 ' + b2[0] + ' ' + b2[1] +
        ' Z" fill="' + it.c + '" opacity=".92"/>';
      acc = end;
    });
    return '<div class="chart-box"><h4>' + esc(title) + '</h4><p>' + esc(sub) + '</p>' +
      '<div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap"><svg viewBox="0 0 220 220" style="width:200px;flex:none">' +
      '<circle cx="110" cy="110" r="84" fill="#F1F4FA"/>' + paths +
      '<text x="110" y="105" text-anchor="middle" font-size="24" font-weight="700" fill="#1B233A">' + total + '</text>' +
      '<text x="110" y="124" text-anchor="middle" font-size="11" fill="#8A94AA">单据总数</text></svg>' +
      '<div style="flex:1;min-width:130px">' + items.map(function (it) {
        return '<div style="display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid #EFF2F8;font-size:12px">' +
          '<span><i style="display:inline-block;width:9px;height:9px;border-radius:3px;background:' + it.c +
          ';margin-right:7px"></i>' + esc(it.label) + '</span><b>' + it.v + '</b></div>';
      }).join('') + '</div></div></div>';
  }
  function chartBar(title, sub, items) {
    var max = Math.max.apply(null, items.map(function (x) { return x.v; }).concat([1]));
    var h = 34;
    var rows = items.map(function (it, i) {
      var y = i * h + 8, w = Math.max(2, it.v / max * 300);
      return '<text x="0" y="' + (y + 15) + '" font-size="11" fill="#495471">' + esc(it.label.slice(0, 8)) + '</text>' +
        '<rect x="88" y="' + y + '" width="300" height="20" rx="4" fill="#F1F4FA"/>' +
        '<rect x="88" y="' + y + '" width="' + w + '" height="20" rx="4" fill="' + (it.c || '#2E5BFF') + '" opacity=".9"/>' +
        '<text x="' + (88 + w + 7) + '" y="' + (y + 15) + '" font-size="11" font-weight="700" fill="#1B233A">' + it.v + '</text>';
    }).join('');
    return '<div class="chart-box"><h4>' + esc(title) + '</h4><p>' + esc(sub) + '</p>' +
      '<svg viewBox="0 0 420 ' + (items.length * h + 12) + '">' + rows + '</svg></div>';
  }

  // ---------------------------------------------------------------- 通知中心
  function pageNotify() {
    var r = DB.role(), list = DB.notificationsFor(r.id);
    var h = '<div class="page-head"><div><h2>通知中心</h2><p>审批待办、联动派生与异常告警 · 共 ' + list.length +
      ' 条，未读 ' + DB.unread(r.id) + ' 条</p></div><div class="head-actions">' +
      '<button class="btn" data-act="mark-all">全部标为已读</button></div></div>';
    if (!list.length) return h + '<div class="card">' + emptyBox('暂无通知', '新建或审批单据后会自动生成通知') + '</div>';
    h += '<div class="card card-pad">' + list.map(function (n) {
      return '<div class="ntf-item ' + (n.read[r.id] ? '' : 'unread') + '"><span class="ntf-dot"></span>' +
        '<div class="ntf-main"><b>' + esc(n.title) + ' <span class="tag">' + esc(n.type) + '</span></b>' +
        '<p>' + esc(n.text) + '</p><small>' + esc(dt(n.ts)) + '</small></div>' +
        '<div style="display:flex;flex-direction:column;gap:5px;align-items:flex-end">' +
        (n.recId ? '<button class="link-btn" data-act="notify-open" data-mod="' + esc(n.moduleKey) +
          '" data-id="' + esc(n.recId) + '">查看单据</button>' : '') +
        (n.read[r.id] ? '' : '<button class="link-btn gray" data-act="mark-read" data-id="' + esc(n.id) + '">标为已读</button>') +
        '</div></div>';
    }).join('') + '</div>';
    return h;
  }

  // ---------------------------------------------------------------- 搭建指南
  function pageGuide() {
    var h = '<div class="page-head"><div><h2>系统该怎么搭 · 单据该怎么填</h2>' +
      '<p>从 144 张 SQL 表到 44 个可操作模块，从角色权限到端到端联动，八步搭出这套系统</p></div>' +
      '<div class="head-actions"><button class="btn btn-primary" data-act="nav" data-href="workbench">回到工作台</button></div></div>';
    h += '<div class="notice-box"><b>运行边界：</b>' + esc(CFG.meta.note) +
      ' 要接真实后端，只需替换 engine.js 的读写层；UI、权限内核与状态机无需改动。</div>';
    h += '<div class="grid grid-2"><div class="card card-pad"><div class="card-title"><h3>八步搭建法</h3>' +
      '<span class="sub">架构 → 权限 → 表单 → 流程 → 联动 → 看板</span></div>' +
      CFG.guide.layers.map(function (g) {
        return '<div class="guide-step"><div class="guide-no">' + g.no + '</div><div><h4>' + esc(g.title) +
          '</h4><p>' + esc(g.text) + '</p><span class="g-action">试一试：' + esc(g.action) + '</span></div></div>';
      }).join('') + '</div>';
    h += '<div><div class="card card-pad"><div class="card-title"><h3>角色 × 填写路径</h3><span class="sub">按角色看自己该填什么</span></div>' +
      CFG.guide.fill.map(function (f) {
        return '<div style="padding:12px 0;border-bottom:1px solid var(--line-2)"><b style="font-size:13px">' +
          esc(f.role) + '</b><p style="margin:4px 0 7px;font-size:12px;color:var(--ink-2);line-height:1.65">' +
          esc(f.flow) + '</p><ul style="margin:0;padding-left:17px;font-size:11.5px;color:var(--muted);line-height:1.8">' +
          f.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>权限矩阵</h3><span class="sub">模块可见数 / 操作权限</span></div>' +
      '<div class="table-wrap"><table class="data-table matrix"><thead><tr><th>角色</th><th>可见模块</th>' +
      ['新建', '编辑', '提交', '审批', '删除', '配置'].map(function (x) { return '<th>' + x + '</th>'; }).join('') +
      '</tr></thead><tbody>' + CFG.roles.map(function (r) {
        var caps = { '新建': 'create', '编辑': 'edit', '提交': 'submit', '审批': 'approve', '删除': 'delete', '配置': 'config' };
        return '<tr><td><span class="cell-main">' + esc(r.name) + '</span></td><td>' + DB.visibleModules(r.id).length + ' / 44</td>' +
          Object.keys(caps).map(function (k) {
            return '<td class="' + (r.caps.indexOf(caps[k]) >= 0 ? 'yes' : 'no') + '">' +
              (r.caps.indexOf(caps[k]) >= 0 ? '✓' : '—') + '</td>';
          }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></div></div></div>';
    return h;
  }

  // ---------------------------------------------------------------- 架构字典
  function pageDict(q) {
    var kw = (q.q || '').trim().toLowerCase(), r = DB.role(), vis = DB.visibleModules(r.id);
    var list = CFG.modules.filter(function (m) {
      if (!kw) return true;
      return (m.name + m.fullName + m.domain + m.fields.map(function (f) { return f.name; }).join(' '))
        .toLowerCase().indexOf(kw) >= 0;
    });
    var h = '<div class="page-head"><div><h2>架构字典</h2><p>44 个业务模块 / 444 个字段 / 135 个钉钉视图 · 这是系统的数据底座，不是业务操作入口</p></div>' +
      '<div class="head-actions"><button class="btn" data-act="nav" data-href="flow">看运行链路</button></div></div>';
    h += '<div class="toolbar"><div class="search-box"><input id="dictSearch" type="search" placeholder="搜索模块 / 字段…" value="' +
      esc(kw) + '"></div><span class="muted small">匹配 ' + list.length + ' 个模块</span></div>';
    h += '<div class="grid grid-3">' + list.map(function (m) {
      var locked = vis.indexOf(m.key) < 0;
      return '<div class="module-card" ' + (locked ? '' : 'data-act="nav" data-href="module/' + m.key + '"') +
        ' style="' + (locked ? 'opacity:.55' : '') + '"><div class="mc-top"><div class="module-icon">' +
        esc(m.domainId) + '</div><h4>' + esc(m.name) + '</h4>' +
        (locked ? '<span class="tag">无权限</span>' : '') + '</div>' +
        '<div class="mc-desc">' + esc(m.domain) + ' · ' + m.fields.length + ' 字段 · ' + m.views.length + ' 视图</div>' +
        '<div class="mc-meta">' + m.fields.slice(0, 3).map(function (f) {
          return '<span class="tag">' + esc(f.name) + '</span>';
        }).join('') + '<span class="mc-count">+ ' + (m.fields.length - 3) + '</span></div></div>';
    }).join('') + '</div>';
    return h;
  }

  // ---------------------------------------------------------------- 系统设置
  function pageSettings() {
    var r = DB.role();
    var h = '<div class="page-head"><div><h2>系统设置</h2><p>演示数据管理、自动化规则与钉钉真实入口</p></div></div>';
    h += '<div class="grid grid-2"><div class="card card-pad"><div class="card-title"><h3>本地数据管理</h3>' +
      '<span class="sub">localStorage · ' + esc(DB.state.createdAt.slice(0, 10)) + ' 初始化</span></div>' +
      '<div class="notice-box"><b>' + esc(CFG.meta.modeLabel) + '</b><br>' + esc(CFG.meta.note) + '</div>' +
      '<div class="kv"><span class="k">单据总数</span><span class="v">' +
      Object.keys(DB.state.records).reduce(function (a, k) { return a + DB.state.records[k].length; }, 0) + ' 张</span></div>' +
      '<div class="kv"><span class="k">操作日志</span><span class="v">' + DB.state.logs.length + ' 条</span></div>' +
      '<div class="kv"><span class="k">通知</span><span class="v">' + DB.state.notifications.length + ' 条</span></div>' +
      '<div class="kv"><span class="k">本地附件</span><span class="v">' + Object.keys(DB.state.attachments).length + ' 个</span></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">' +
      '<button class="btn btn-primary" data-act="settings-export">导出 JSON 备份</button>' +
      '<button class="btn" data-act="settings-import">导入备份</button>' +
      '<button class="btn btn-danger" data-act="settings-reset">重置演示数据</button></div>' +
      '<p class="small muted" style="margin:12px 0 0">重置会清空本地新增的单据、日志与附件，恢复到初始演示状态，不可撤销。</p></div>';
    h += '<div class="card card-pad"><div class="card-title"><h3>角色与权限</h3><span class="sub">切换角色以验证隔离</span></div>' +
      CFG.roles.map(function (x) {
        return '<div class="ntf-item ' + (x.id === r.id ? 'unread' : '') + '"><span class="avatar" style="background:' +
          x.color + ';width:30px;height:30px;font-size:12px">' + esc(x.person.slice(0, 1)) + '</span>' +
          '<div class="ntf-main"><b>' + esc(x.name) + ' · ' + esc(x.person) + '</b><p>' + esc(x.desc) +
          '</p><small>可见 ' + DB.visibleModules(x.id).length + ' 个模块 · ' + x.caps.length + ' 项操作权限</small></div>' +
          '<button class="link-btn" data-act="switch-role" data-role="' + x.id + '">切换</button></div>';
      }).join('') + '</div></div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>钉钉 AI 表格真实入口</h3><span class="sub">' +
      CFG.portalLinks.length + ' 个 · 表单已开启分享</span></div><div class="link-list">' +
      CFG.portalLinks.map(function (l) {
        return '<a class="link-item" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
          '<span class="module-icon" style="width:28px;height:28px;font-size:11px">钉</span>' +
          '<span class="li-main"><b>' + esc(l.name) + '</b><small>' + esc(l.desc) + '</small></span>' +
          '<span class="link-btn">打开 →</span></a>';
      }).join('') + '</div></div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>自动化规则清单</h3><span class="sub">' +
      CFG.links.length + ' 条联动 + ' + CFG.automations.length + ' 条钉钉自动化</span></div>' +
      '<div class="table-wrap"><table class="data-table"><thead><tr><th>规则</th><th>类型</th><th>说明</th></tr></thead><tbody>' +
      CFG.links.map(function (l) {
        return '<tr><td><span class="cell-main">' + esc(l.title) + '</span></td><td><span class="pill pill-brand pill-plain">本地联动</span></td>' +
          '<td>' + esc(MOD[l.from_].name) + ' → ' + esc(MOD[l.to].name) + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
    return h;
  }

  // ---------------------------------------------------------------- 全局搜索
  function globalSearch(kw) {
    var box = $('gsResults');
    kw = (kw || '').trim().toLowerCase();
    if (!kw) { box.classList.add('hidden'); return; }
    var r = DB.role(), vis = DB.visibleModules(r.id), out = [];
    vis.forEach(function (k) {
      var m = MOD[k];
      if ((m.name + m.fullName + m.domain).toLowerCase().indexOf(kw) >= 0) {
        out.push({ type: '模块', name: m.name, sub: m.domain + ' · ' + m.fields.length + ' 字段', href: 'module/' + k });
      }
      DB.visibleRecords(r.id, k).forEach(function (rec) {
        if (out.length > 26) return;
        var hay = rec.no + ' ' + Object.keys(rec.data).map(function (f) { return txt(rec.data[f]); }).join(' ');
        if (hay.toLowerCase().indexOf(kw) >= 0) {
          out.push({ type: '单据', name: rec.no + ' · ' + txt(rec.data[m.titleField]).slice(0, 20),
            sub: m.name + ' · ' + stInfo(rec.status)[0], href: 'module/' + k + '?q=' + encodeURIComponent(rec.no) });
        }
      });
    });
    if (!out.length) {
      box.innerHTML = '<div class="gs-item"><div class="gs-main"><b>没有匹配结果</b><small>试试单据编号或模块名称</small></div></div>';
    } else {
      box.innerHTML = out.slice(0, 26).map(function (o) {
        return '<div class="gs-item" data-act="gs-result" data-href="' + esc(o.href) + '">' +
          '<span class="tag">' + esc(o.type) + '</span><div class="gs-main"><b>' + esc(o.name) +
          '</b><small>' + esc(o.sub) + '</small></div></div>';
      }).join('');
    }
    box.classList.remove('hidden');
  }

  // ---------------------------------------------------------------- 导出下载
  function download(name, content, mime) {
    var blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { a.remove(); URL.revokeObjectURL(url); }, 800);
  }

  // ---------------------------------------------------------------- 事件委托
  function onClick(e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    if (t.dataset.stop) e.stopPropagation();
    var act = t.dataset.act, a = t.dataset;
    switch (act) {
      case 'login-role': doLogin(a.role); break;
      case 'switch-role': doLogin(a.role); $('roleMenu').classList.add('hidden'); break;
      case 'nav': closeDrawer(); go(a.href); break;
      case 'group': go('domain/' + a.domain, { g: a.g }); break;
      case 'tab-module': go('module/' + a.mod); break;
      case 'step-go':
        if (!DB.can(DB.role().id, a.mod, 'view')) { toast('无权限', '当前角色不可访问该环节模块，请切换角色', 'warn'); break; }
        go('module/' + a.mod); break;
      case 'open-form': openForm(a.mod); break;
      case 'edit-form': openForm(a.mod, a.id); break;
      case 'open-detail': openDetail(a.mod, a.id); break;
      case 'drawer-close': closeDrawer(); break;
      case 'save-draft': saveForm(false); break;
      case 'submit-record': saveForm(true); break;
      case 'act':
        // 列表/工作台里直接点审批时，先打开详情抽屉再显示确认区
        if (!$('actionBox')) openDetail(a.mod, a.id);
        showActionBox(a.mod, a.id, a.action);
        break;
      case 'confirm-action': doAction(a.mod, a.id, a.action); break;
      case 'cancel-action': { var ab = $('actionBox'); if (ab) ab.innerHTML = ''; break; }
      case 'filter-status': {
        UI.listSt = a.st; UI.listPage = 1;
        document.querySelectorAll('[data-act="filter-status"]').forEach(function (b) {
          b.classList.toggle('active', b.dataset.st === a.st);
        });
        var rt = parseHash();
        replaceHash('module/' + rt.a, { q: UI.listQ, st: UI.listSt, p: 1 });
        updateList(rt.a); break;
      }
      case 'page': {
        UI.listPage = parseInt(a.p, 10) || 1;
        var rt2 = parseHash();
        replaceHash('module/' + rt2.a, { q: UI.listQ, st: UI.listSt, p: UI.listPage });
        updateList(rt2.a); break;
      }
      case 'export-csv':
        download(MOD[a.mod].name + '.csv', DB.exportCSV(a.mod, DB.role().id), 'text/csv;charset=utf-8');
        toast('已导出 CSV', MOD[a.mod].name, 'ok'); break;
      case 'export-board': {
        var r = DB.role(), lines = ['业务域,模块,单据数'];
        DB.visibleDomains(r.id).forEach(function (d) {
          CFG.modules.filter(function (m) { return m.domainId === d.id && DB.can(r.id, m.key, 'view'); })
            .forEach(function (m) {
              lines.push([d.name, m.name, DB.visibleRecords(r.id, m.key).length].join(','));
            });
        });
        download('经营看板汇总.csv', '\ufeff' + lines.join('\n'), 'text/csv;charset=utf-8');
        toast('已导出汇总', '按业务域与模块统计', 'ok'); break;
      }
      case 'mark-read': DB.markRead(a.id, DB.role().id); render(); break;
      case 'mark-all': DB.markAllRead(DB.role().id); render(); toast('已全部标为已读', '', 'ok'); break;
      case 'notify-open': openDetail(a.mod, a.id); break;
      case 'gs-result':
        $('gsResults').classList.add('hidden'); $('globalSearch').value = '';
        location.hash = '#/' + a.href; break;
      case 'multi-toggle': {
        t.classList.toggle('on');
        var wrap = t.closest('.multi-opts'), f = wrap.dataset.field;
        UI.formData[f] = Array.prototype.slice.call(wrap.querySelectorAll('.multi-opt.on'))
          .map(function (b) { return b.dataset.v; });
        break;
      }
      case 'star': {
        var sw = t.closest('.stars'), f2 = sw.dataset.field, v2 = parseInt(a.v, 10);
        UI.formData[f2] = v2;
        sw.querySelectorAll('.star').forEach(function (s) {
          s.classList.toggle('on', parseInt(s.dataset.v, 10) <= v2);
        });
        break;
      }
      case 'upload': {
        var field = a.field;
        var input = document.createElement('input');
        input.type = 'file'; input.multiple = true; input.style.display = 'none';
        document.body.appendChild(input);
        input.addEventListener('change', function () {
          var files = Array.prototype.slice.call(input.files || []), pending = files.length;
          if (!pending) { input.remove(); return; }
          if (!Array.isArray(UI.formData[field])) UI.formData[field] = [];
          files.forEach(function (file) {
            DB.addAttachment(file, function (res) {
              if (!res.error) UI.formData[field].push(res);
              else toast('附件未上传', res.error, 'warn');
              pending--;
              if (pending === 0) {
                var zone = $('drawerBody').querySelector('.att-list[data-field="' + field + '"]');
                if (zone) zone.innerHTML = renderAtts(field, UI.formData[field]);
                input.remove();
              }
            });
          });
        });
        input.click();
        break;
      }
      case 'att-remove': {
        var fld = a.field, idx = parseInt(a.idx, 10);
        if (Array.isArray(UI.formData[fld])) UI.formData[fld].splice(idx, 1);
        var z = $('drawerBody').querySelector('.att-list[data-field="' + fld + '"]');
        if (z) z.innerHTML = renderAtts(fld, UI.formData[fld]);
        break;
      }
      case 'att-preview': {
        var att = DB.attachment(a.attid);
        if (!att) { toast('附件不存在', '', 'error'); break; }
        if (/^image\//.test(att.type)) {
          openDrawer('附件预览 · ' + att.name, '本地演示附件',
            '<div style="text-align:center"><img src="' + att.dataUrl + '" style="max-width:100%;border-radius:8px"></div>',
            '<span class="foot-left">' + Math.round(att.size / 1024) + ' KB</span><div class="foot-right">' +
            '<button class="btn" data-act="att-back">返回详情</button></div>', false);
        } else {
          var link = document.createElement('a');
          link.href = att.dataUrl; link.download = att.name;
          document.body.appendChild(link); link.click(); link.remove();
          toast('附件已下载', att.name, 'ok');
        }
        break;
      }
      case 'att-back': openDetail(UI.lastDetailMod, UI.lastDetailId); break;
      case 'settings-export':
        download('启能力ERP-本地数据备份.json', DB.exportJSON(), 'application/json');
        toast('备份已导出', '包含单据、日志、通知与附件', 'ok'); break;
      case 'settings-import': {
        var fi = document.createElement('input');
        fi.type = 'file'; fi.accept = '.json,application/json'; fi.style.display = 'none';
        document.body.appendChild(fi);
        fi.addEventListener('change', function () {
          var file = fi.files[0]; if (!file) { fi.remove(); return; }
          var rd = new FileReader();
          rd.onload = function () {
            try { DB.importJSON(rd.result); toast('导入成功', '本地数据已还原', 'ok'); render(); }
            catch (err) { toast('导入失败', err.message, 'error'); }
            fi.remove();
          };
          rd.readAsText(file);
        });
        fi.click(); break;
      }
      case 'settings-reset':
        if (window.confirm('确认重置演示数据？将清空本地新增的单据、日志与附件，且不可撤销。')) {
          DB.reset(); toast('已重置', '演示数据恢复到初始状态', 'ok'); render();
        }
        break;
    }
  }

  function onInput(e) {
    var el = e.target;
    if (el.id === 'globalSearch') { globalSearch(el.value); return; }
    if (el.id === 'listSearch') {
      UI.listQ = el.value; UI.listPage = 1;
      var rt = parseHash();
      replaceHash('module/' + rt.a, { q: UI.listQ, st: UI.listSt, p: 1 });
      updateList(rt.a); return;
    }
    if (el.id === 'dictSearch') {
      var q = el.value.trim();
      replaceHash('dict', { q: q });
      document.querySelectorAll('#content .grid-3 .module-card').forEach(function (c) {
        c.style.display = c.textContent.toLowerCase().indexOf(q.toLowerCase()) >= 0 ? '' : 'none';
      });
      return;
    }
    if (el.dataset && el.dataset.act === 'range') {
      UI.formData[el.dataset.field] = Number(el.value);
      var rv = el.closest('.range-row').querySelector('.range-val');
      if (rv) rv.textContent = el.value + '%';
      return;
    }
    if (el.dataset && el.dataset.field && el.dataset.ftype && el.dataset.ftype !== 'm' &&
        el.dataset.ftype !== 'a' && el.dataset.ftype !== 'q' && el.dataset.ftype !== 'g') {
      UI.formData[el.dataset.field] = el.dataset.ftype === 'b' ? el.checked : el.value;
    }
  }

  // ---------------------------------------------------------------- 顶部交互
  function bindTop() {
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('change', onInput);
    $('drawerOverlay').addEventListener('click', closeDrawer);
    $('sbToggle').addEventListener('click', function () {
      if (window.innerWidth <= 900) $('sidebar').classList.toggle('open');
      else $('sidebar').classList.toggle('collapsed');
    });
    $('logoutBtn').addEventListener('click', function () { DB.logout(); closeDrawer(); render(); });
    $('roleChip').addEventListener('click', function (e) {
      e.stopPropagation();
      var menu = $('roleMenu'), r = DB.role();
      if (!menu.classList.contains('hidden')) { menu.classList.add('hidden'); return; }
      menu.innerHTML = '<div class="role-menu-head">切换演示角色（权限实时生效）</div>' +
        CFG.roles.map(function (x) {
          return '<button class="role-menu-item ' + (x.id === r.id ? 'active' : '') +
            '" data-act="switch-role" data-role="' + x.id + '"><span class="avatar" style="background:' +
            x.color + ';width:28px;height:28px;font-size:11px">' + esc(x.person.slice(0, 1)) +
            '</span><span class="rm-info"><b>' + esc(x.name) + '</b><small>' + esc(x.person) +
            ' · 可见 ' + DB.visibleModules(x.id).length + ' 模块</small></span>' +
            (x.id === r.id ? '<span class="tag">当前</span>' : '') + '</button>';
        }).join('');
      menu.classList.remove('hidden');
    });
    $('bellBtn').addEventListener('click', function () {
      $('roleMenu').classList.add('hidden'); go('notify');
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#roleMenu') && !e.target.closest('#roleChip')) $('roleMenu').classList.add('hidden');
      if (!e.target.closest('.global-search')) $('gsResults').classList.add('hidden');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer(); $('roleMenu').classList.add('hidden'); $('gsResults').classList.add('hidden');
      }
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault(); $('globalSearch').focus();
      }
    });
    window.addEventListener('hashchange', function () { closeDrawer(); render(); });
  }

  // ---------------------------------------------------------------- 启动
  DB.load();
  initLogin();
  bindTop();
  if (DB.session() && ROLE[DB.session().roleId]) {
    $('loginView').classList.add('hidden');
    $('appView').classList.remove('hidden');
    if (!location.hash || location.hash === '#' || location.hash === '#/login') location.hash = '#/workbench';
  }
  render();
})();
