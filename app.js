/* 启能力 ERP · 全链路协同中枢 —— 运行态前端应用
 * 纯静态、零依赖、hash 路由；所有业务数据由 engine.js 在本地持久化。
 * v4 信息架构：面向使用者，全站只有一条主线 —— 八个业务环节串起来的填单链路。
 *   我的工作（链路工作台）→ 单据中心（跨模块检索）→ 单据模块（列表/详情）→ 表单抽屉
 *   管理员另有经营驾驶舱、后端契约、系统设置等管理视角入口。
 * 权限：所有入口统一走 engine.js 的 can / canSystem，越权默认拒绝。
 */
(function () {
  'use strict';

  var CFG = window.ERP_CONFIG, DB = window.ERP_DB, CONTRACT = window.ERP_CONTRACT;
  var SYNC = window.ERP_SYNC;
  var MOD = DB.MOD, ROLE = DB.ROLE, U = DB.util;
  var $ = function (id) { return document.getElementById(id); };
  var STAGES = CFG.stages, BASE_GROUP = CFG.baseGroup;
  var STAGE_BY_ID = {};
  STAGES.forEach(function (s) { STAGE_BY_ID[s.id] = s; });
  STAGE_BY_ID[BASE_GROUP.id] = BASE_GROUP;
  var MODULE_STAGE = {};
  [BASE_GROUP].concat(STAGES).forEach(function (s) {
    s.modules.forEach(function (k) { MODULE_STAGE[k] = s.id; });
  });
  var UI = { formData: {}, listQ: '', listSt: 'all', listPage: 1, pageSize: 10,
    groupIdx: 0, drawerMode: '', formMod: '', formId: '', lastDetailMod: '', lastDetailId: '',
    stage: '', docSt: 'all', docStage: 'all', docQ: '', docPage: 1, docSize: 12,
    contractMod: 't18', newMenu: false, syncTab: 'outbox' };

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
  // 审批权限 = 模块能力 + 审批角色 + 职责分离（不能审批自己创建的单据）
  function canApproveRecord(role, mod, rec) {
    return DB.can(role.id, mod.key, 'approve') &&
      (mod.approvers.indexOf(role.id) >= 0 || role.id === 'admin') &&
      !(rec.createdRole === role.id && role.id !== 'admin');
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
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
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
    // 切换身份后清空所有可能残留越权状态的临时 UI
    closeDrawer();
    UI.formData = {}; UI.listQ = ''; UI.listSt = 'all'; UI.listPage = 1; UI.groupIdx = 0;
    UI.stage = ''; UI.newMenu = false; UI.docSt = 'all'; UI.docStage = 'all'; UI.docQ = ''; UI.docPage = 1;
    UI.lastDetailMod = ''; UI.lastDetailId = '';
    $('roleMenu').classList.add('hidden');
    $('gsResults').classList.add('hidden'); $('globalSearch').value = '';
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
    // 钉钉全量入口属于系统级能力，不对业务角色开放
    $('dingtalkBtn').classList.toggle('hidden', !DB.canSystem(r.id, 'portal'));

    // v4 极简导航：业务角色只看得到「干活」的四个入口，
    // 展示型 / 管理型页面全部收进管理员分组，避免使用者不知道该点哪里。
    var todoN = DB.todoList(r.id).filter(function (t) { return t.canApprove; }).length;
    var nav = '<div class="sb-group-label">我的工作</div>' +
      navItem('workbench', '', 'home', '我的工作', '', route.page === 'workbench') +
      navItem('docs', '', 'list', '单据中心', '', route.page === 'docs') +
      navItem('notify', '', 'bell', '通知中心', n || '', route.page === 'notify');
    var mgmt = '';
    if (DB.canSystem(r.id, 'board')) mgmt += navItem('board', '', 'chart', '经营驾驶舱', '', route.page === 'board');
    if (DB.canSystem(r.id, 'contract')) mgmt += navItem('contract', '', 'shield', '后端字段契约', '', route.page === 'contract');
    if (DB.canSystem(r.id, 'flow')) mgmt += navItem('flow', '', 'flow', '全链路流程', '', route.page === 'flow');
    if (DB.canSystem(r.id, 'dict')) mgmt += navItem('dict', '', 'list', '架构字典', '', route.page === 'dict');
    if (DB.canSystem(r.id, 'guide')) mgmt += navItem('guide', '', 'book', '搭建指南', '', route.page === 'guide');
    if (DB.canSystem(r.id, 'settings')) mgmt += navItem('settings', '', 'gear', '系统设置', '', route.page === 'settings');
    if (mgmt) nav += '<div class="sb-group-label">管理视角</div>' + mgmt;
    nav += '<div class="sb-group-label">系统</div>' +
      navItem('permissions', '', 'shield', '我的权限', '', route.page === 'permissions');
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
    if (p === 'workbench') return ['我的工作'];
    if (p === 'docs') return ['我的工作', '单据中心'];
    if (p === 'domain') {
      var d = CFG.domains.filter(function (x) { return x.id === route.a; })[0];
      return ['业务域', d ? d.name : route.a];
    }
    if (p === 'module') {
      var m = MOD[route.a];
      return ['业务域', m ? m.domain : '', m ? m.name : route.a];
    }
    return ({ flow: ['管理视角', '全链路流程'], board: ['管理视角', '经营驾驶舱'],
      notify: ['我的工作', '通知中心'], guide: ['管理视角', '搭建指南'],
      dict: ['管理视角', '架构字典'], contract: ['管理视角', '后端字段契约'],
      sync: ['系统', '数据对齐与自动化流'],
      permissions: ['系统', '我的权限'], settings: ['管理视角', '系统设置'] })[p] || ['启能力 ERP'];
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
    var cur = DB.role();
    // 统一路由门禁：直接改 hash 也不能越过权限边界
    var adminOnly = { settings: 'settings', board: 'board', flow: 'flow',
      dict: 'dict', guide: 'guide', contract: 'contract' };
    if (adminOnly[route.page] && !DB.canSystem(cur.id, adminOnly[route.page])) {
      replaceHash('permissions');
      route = { page: 'permissions', a: '', b: '', q: {} };
    }
    if (route.page === 'domain' && !DB.groupsFor(cur.id, route.a).length) {
      replaceHash('workbench');
      route = { page: 'workbench', a: '', b: '', q: {} };
    }
    shell(route);
    var html = '';
    switch (route.page) {
      case 'workbench': html = pageWorkbench(); break;
      case 'docs': html = pageDocs(route.q); break;
      case 'sync': html = pageSync(); break;
      case 'contract': html = pageContract(); break;
      case 'domain': html = pageDomain(route.a, route.q); break;
      case 'module': html = pageModule(route.a, route.q); break;
      case 'flow': html = pageFlow(); break;
      case 'board': html = pageBoard(); break;
      case 'notify': html = pageNotify(); break;
      case 'guide': html = pageGuide(); break;
      case 'dict': html = pageDict(route.q); break;
      case 'permissions': html = pagePermissions(); break;
      case 'settings': html = pageSettings(); break;
      default: html = pageWorkbench();
    }
    $('content').innerHTML = html;
    $('content').scrollTop = 0;
    if (route.page === 'module') updateList(route.a);
  }

  function scopeBar(role) {
    var p = role.policy;
    return '<div class="scope-bar"><b>当前角色权限</b><span>' + esc(role.scope) +
      '</span><span class="scope-spacer"></span>' +
      '<span class="scope-pill">可见 ' + p.visible.length + ' · 可写 ' + p.writable.length +
      ' · 只读 ' + p.readonly.length + ' · 可审批 ' + p.approvable.length + '</span>' +
      '<span class="scope-pill">' + esc(role.name) + ' · ' + esc(role.person) + '</span>' +
      '<button class="link-btn" data-act="nav" data-href="permissions">权限明细</button></div>';
  }
  function emptyBox(title, desc) {
    return '<div class="empty"><div class="empty-icon">' + ico('list', 24) + '</div><h4>' + esc(title) +
      '</h4><p>' + esc(desc) + '</p></div>';
  }
  // 统一的越权提示页：路由、模块、功能入口共用
  function denyPage(title, desc, role) {
    var p = role.policy;
    return '<div class="page-head"><div><h2>' + esc(title) + '</h2>' +
      '<p>权限隔离生效 · 所有入口都经过统一鉴权，越权默认拒绝</p></div>' +
      '<div class="head-actions"><button class="btn" data-act="nav" data-href="workbench">回到工作台</button></div></div>' +
      '<div class="deny-box"><b>当前身份：' + esc(role.name) + ' · ' + esc(role.person) + '</b>' +
      '<p>' + esc(desc) + '</p><div class="perm-legend">' +
      '<span class="cap-chip on">可见 ' + p.visible.length + ' 模块</span>' +
      '<span class="cap-chip on">可写 ' + p.writable.length + ' 模块</span>' +
      '<span class="cap-chip off">系统功能 ' + p.system.length + ' 项</span></div>' +
      '<button class="btn btn-primary" data-act="nav" data-href="permissions">查看我的权限</button></div>';
  }

  // ---------------------------------------------------------------- 工作台
  // ================================================================ 主链路工作台
  // 全站唯一主线：八个环节串起来，每一步只回答三件事 ——
  // 我在第几步 / 这一步要填哪张表 / 填完交给谁、下一步去哪。
  function stageById(id) { return STAGE_BY_ID[id] || STAGES[0]; }
  function stageRecords(sid, roleId) {
    var g = stageById(sid), out = [];
    g.modules.forEach(function (k) {
      if (!DB.can(roleId, k, 'view')) return;
      DB.visibleRecords(roleId, k).forEach(function (rec) {
        out.push({ k: k, rec: rec, m: MOD[k] });
      });
    });
    return out;
  }
  function stageStats(sid, roleId) {
    var list = stageRecords(sid, roleId), g = stageById(sid);
    var forms = 0, todo = 0, running = 0, done = 0, draft = 0;
    g.modules.forEach(function (k) {
      if (DB.can(roleId, k, 'view') && SYNC.canFrontend(k) && DB.can(roleId, k, 'create')) forms += 1;
    });
    list.forEach(function (x) {
      if (x.rec.status === 'running') running += 1;
      else if (x.rec.status === 'done') done += 1;
      else if (x.rec.status === 'draft') draft += 1;
      if (x.rec.status === 'running' && canApproveRecord(ROLE[roleId], x.m, x.rec)) todo += 1;
    });
    return { total: list.length, running: running, done: done, draft: draft,
      forms: forms, todo: todo, list: list };
  }
  function defaultStage(roleId) {
    var best = '', bestN = 0;
    STAGES.forEach(function (s) {
      var n = stageStats(s.id, roleId).todo;
      if (n > bestN) { bestN = n; best = s.id; }
    });
    return bestN > 0 ? best : (CFG.roleStage[roleId] || '02');
  }
  function stageNavLinks(sid) {
    var i = STAGES.map(function (s) { return s.id; }).indexOf(sid);
    var prev = i > 0 ? STAGES[i - 1] : null, next = i >= 0 && i < STAGES.length - 1 ? STAGES[i + 1] : null;
    return '<div class="stage-nav">' +
      (prev ? '<button class="stage-nav-btn" data-act="stage" data-id="' + prev.id + '">' +
        '<small>上一步</small><b>← ' + esc(prev.id + ' ' + prev.name) + '</b></button>' :
        '<span class="stage-nav-btn muted"><small>链路起点</small><b>供应商准入</b></span>') +
      '<div class="stage-nav-mid"><span>当前环节由 ' +
        esc((stageById(sid).owners || []).map(function (o) { return ROLE[o] ? ROLE[o].name : o; }).join(' / ')) +
        ' 主责</span><span class="mode-note">状态变更后自动派生下游单据并同步到钉钉</span></div>' +
      (next ? '<button class="stage-nav-btn right" data-act="stage" data-id="' + next.id + '">' +
        '<small>下一步</small><b>' + esc(next.id + ' ' + next.name) + ' →</b></button>' :
        '<span class="stage-nav-btn right muted"><small>链路终点</small><b>证据归档</b></span>') +
      '</div>';
  }
  function formCard(k, r) {
    var m = MOD[k], mode = SYNC.modeOf(k), list = DB.visibleRecords(r.id, k);
    var canWrite = DB.can(r.id, k, 'create'), frontend = SYNC.canFrontend(k);
    var running = list.filter(function (x) { return x.status === 'running'; }).length;
    var badges = '<span class="tag">' + m.fields.length + ' 字段</span>' +
      '<span class="tag">' + (m.required || []).length + ' 必填</span>' +
      (running ? pill('running', running + ' 在途') : '');
    var actions = '';
    if (frontend && canWrite) {
      actions += '<button class="btn btn-primary btn-sm" data-act="open-form" data-mod="' + k +
        '" data-stop="1">填写表单</button>';
    }
    if (m.hasBackendForm) {
      actions += '<a class="btn btn-sm" href="' + esc(m.formUrl) +
        '" target="_blank" rel="noopener" data-stop="1">钉钉表单 ↗</a>';
    }
    actions += '<button class="link-btn" data-act="nav" data-href="module/' + k +
      '" data-stop="1">查看单据 (' + list.length + ')</button>';
    return '<div class="form-card' + (!canWrite && !frontend ? ' ro' : '') + '">' +
      '<div class="fc-top"><span class="fc-idx">' + esc((MODULE_STAGE[k] || '00')) + '</span>' +
      '<h4>' + esc(m.name) + '</h4>' +
      (m.hasBackendForm ? '<span class="fc-mode backend">钉钉已录入</span>' :
        '<span class="fc-mode frontend">前端填写</span>') + '</div>' +
      '<p class="fc-desc">' + esc(m.guide || m.fullName) + '</p>' +
      '<div class="fc-meta">' + badges + '</div>' +
      '<div class="fc-foot">' + actions + '</div></div>';
  }
  function pageWorkbench() {
    var r = DB.role();
    var sid = UI.stage && STAGE_BY_ID[UI.stage] ? UI.stage : defaultStage(r.id);
    UI.stage = sid;
    var g = stageById(sid), st = stageStats(sid, r.id);
    var allTodo = DB.todoList(r.id).filter(function (t) { return t.canApprove; }).length;
    var myDraft = 0;
    DB.visibleModules(r.id).forEach(function (k) {
      myDraft += DB.visibleRecords(r.id, k).filter(function (x) {
        return x.status === 'draft' && x.createdRole === r.id;
      }).length;
    });
    var h = '<div class="page-head"><div><h2>我的工作</h2>' +
      '<p>一条链路，八个环节 · 每一步只做一件事：填该填的单，交给下一个人</p></div>' +
      '<div class="head-actions">' +
      '<button class="btn" data-act="stage" data-id="00">基础资料</button>' +
      '<button class="btn" data-act="nav" data-href="sync">数据同步</button>' +
      '<button class="btn btn-primary" data-act="new-menu">＋ 新建单据</button></div></div>';
    h += newMenuHTML(r);

    // 身份条：只讲"我是谁、我现在要办几件事"，不再堆 KPI 卡
    h += '<div class="wb-hello"><div class="hello-main"><span class="hello-avatar" style="background:' +
      esc(r.color) + '">' + esc(r.person.slice(0, 1)) + '</span><div><b>你好，' + esc(r.person) +
      '</b><span>' + esc(r.name) + ' · ' + esc(r.scope) + '</span></div></div>' +
      '<div class="hello-nums"><div><b>' + allTodo + '</b><span>待我处理</span></div>' +
      '<div><b>' + myDraft + '</b><span>我的草稿</span></div>' +
      '<div><b>' + DB.visibleModules(r.id).length + '</b><span>可用模块</span></div></div></div>';

    // 唯一视觉主轴：链路轨道
    h += '<div class="rail-wrap"><div class="rail-head"><b>全链路主线</b>' +
      '<span>点击环节切换 · 高亮表示当前角色主责 · 数字为该环节在途单据</span></div>' +
      '<div class="rail">' + STAGES.map(function (s, i) {
        var ss = stageStats(s.id, r.id), mine = (s.owners || []).indexOf(r.id) >= 0;
        return '<button class="rail-node' + (s.id === sid ? ' active' : '') +
          (mine ? ' mine' : '') + '" data-act="stage" data-id="' + s.id + '">' +
          '<span class="rn-no">' + esc(s.id) + '</span>' +
          '<span class="rn-name">' + esc(s.name) + '</span>' +
          '<span class="rn-meta">' + (ss.running ? ss.running + ' 在途' : ss.total + ' 单据') + '</span>' +
          (ss.todo ? '<span class="rn-dot">' + ss.todo + '</span>' : '') +
          (mine ? '<span class="rn-mine">我的环节</span>' : '') +
          '</button>' + (i < STAGES.length - 1 ? '<span class="rail-arrow">→</span>' : '');
      }).join('') + '</div></div>';

    // 录入模式说明：明确告诉使用者不用重复填
    h += '<div class="mode-strip"><b>录入分工</b><span>' +
      '钉钉 AI 表格已有 9 张表单在收集数据，这些环节前端不重复建表单；' +
      '其余模块在前端填写后自动同步回写。当前默认：<b>' +
      (SYNC.config.defaultEntryMode === 'backend' ? '钉钉表单优先' : '前端填单优先') + '</b></span>' +
      '<button class="link-btn" data-act="nav" data-href="sync">调整 / 查看自动化流 →</button></div>';

    // 当前环节面板
    h += '<div class="stage-panel"><div class="stage-hero">' +
      '<div class="sh-id">' + esc(g.id) + '</div><div class="sh-main"><h3>' + esc(g.name) + '</h3>' +
      '<p>' + esc(g.desc) + '</p></div>' +
      '<div class="sh-flow"><span><small>上游输入</small>' + esc(g.input) + '</span>' +
      '<i>→</i><span><small>下游输出</small>' + esc(g.output) + '</span></div></div>';

    h += '<div class="stage-block"><div class="sb-head"><h3>本环节要办的事</h3>' +
      '<span class="sub">' + g.modules.length + ' 个模块 · ' + st.forms + ' 个可在前端填写 · ' +
      st.todo + ' 张待我处理</span></div><div class="grid grid-3">' +
      g.modules.filter(function (k) { return DB.can(r.id, k, 'view'); })
        .map(function (k) { return formCard(k, r); }).join('') + '</div>' +
      (!g.modules.filter(function (k) { return DB.can(r.id, k, 'view'); }).length
        ? emptyBox('当前角色在此环节无授权模块', '可切换到其它环节，或到「我的权限」查看授权范围') : '') +
      '</div>';

    h += '<div class="stage-block"><div class="sb-head"><h3>本环节单据</h3>' +
      '<span class="sub">共 ' + st.total + ' 张 · ' + st.running + ' 在途 · ' + st.done + ' 已完成</span>' +
      '<button class="link-btn" data-act="nav" data-href="docs">到单据中心检索 →</button></div>';
    var rows = st.list.slice().sort(function (a, b) {
      return String(b.rec.updatedAt).localeCompare(String(a.rec.updatedAt));
    }).slice(0, 8);
    if (!rows.length) h += emptyBox('本环节还没有单据', '在上方选择一张表单开始，或从钉钉表单同步');
    else {
      h += '<div class="table-wrap"><table class="data-table"><thead><tr><th>单据编号</th>' +
        '<th>业务模块</th><th>摘要</th><th>状态</th><th>来源</th><th>更新</th>' +
        '<th style="text-align:right">操作</th></tr></thead><tbody>' + rows.map(function (x) {
          return '<tr data-act="open-detail" data-mod="' + x.k + '" data-id="' + x.rec.id + '">' +
            '<td><span class="cell-main mono">' + esc(x.rec.no) + '</span></td>' +
            '<td>' + esc(x.m.name) + '</td>' +
            '<td><span class="cell-main">' + esc(txt(x.rec.data[x.m.titleField]).slice(0, 24) || '—') + '</span></td>' +
            '<td>' + pill(x.rec.status, fieldStatus(x.m, x.rec)) + '</td>' +
            '<td>' + (x.rec.origin === 'dingtalk-form' ? '<span class="tag">钉钉表单</span>' :
              x.rec.source ? '<span class="tag">自动派生</span>' : '<span class="tag">前端录入</span>') + '</td>' +
            '<td class="small muted">' + esc(d10(x.rec.updatedAt)) + '</td>' +
            '<td><div class="row-actions">' +
            (canApproveRecord(r, x.m, x.rec)
              ? '<button class="link-btn" data-act="act" data-action="approve" data-mod="' + x.k +
                '" data-id="' + x.rec.id + '" data-stop="1">通过</button>' : '') +
            '<button class="link-btn" data-act="open-detail" data-mod="' + x.k +
              '" data-id="' + x.rec.id + '" data-stop="1">详情</button></div></td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    h += '</div></div>';
    h += stageNavLinks(sid);
    return h;
  }

  function newMenuHTML(r) {
    if (!UI.newMenu) return '';
    var items = DB.visibleModules(r.id).filter(function (k) {
      return SYNC.canFrontend(k) && DB.can(r.id, k, 'create');
    });
    return '<div class="new-menu"><div class="nm-head">新建单据 · 选择模块' +
      '<button class="link-btn" data-act="new-menu">收起</button></div><div class="nm-grid">' +
      (items.length ? items.map(function (k) {
        return '<button class="nm-item" data-act="open-form" data-mod="' + k + '"><b>' +
          esc(MOD[k].name) + '</b><small>' + esc((MODULE_STAGE[k] || '') + ' ' +
            (stageById(MODULE_STAGE[k] || '00').name || '')) + '</small></button>';
      }).join('') : '<span class="muted small">当前角色没有可新建的模块</span>') + '</div></div>';
  }

  // ================================================================ 单据中心
  function pageDocs(q) {
    var r = DB.role(), vis = DB.visibleModules(r.id);
    UI.docSt = (q && q.s) || UI.docSt || 'all';
    UI.docStage = (q && q.g) || UI.docStage || 'all';
    UI.docPage = Math.max(1, parseInt((q && q.p) || UI.docPage || 1, 10) || 1);
    var all = [];
    vis.forEach(function (k) {
      DB.visibleRecords(r.id, k).forEach(function (rec) {
        all.push({ k: k, m: MOD[k], rec: rec, stage: MODULE_STAGE[k] || '00' });
      });
    });
    var tabs = [['all', '全部'], ['draft', '草稿'], ['running', '在途'],
                ['done', '已完成'], ['reject', '已驳回']];
    var tabN = { all: all.length, draft: 0, running: 0, done: 0, reject: 0 };
    all.forEach(function (x) { if (tabN[x.rec.status] != null) tabN[x.rec.status] += 1; });
    var list = all.filter(function (x) {
      if (UI.docSt !== 'all' && x.rec.status !== UI.docSt) return false;
      if (UI.docStage !== 'all' && x.stage !== UI.docStage) return false;
      if (UI.docQ) {
        var s = (x.rec.no + x.m.name + txt(x.rec.data[x.m.titleField]) + x.stage).toLowerCase();
        if (s.indexOf(UI.docQ.toLowerCase()) < 0) return false;
      }
      return true;
    }).sort(function (a, b) { return String(b.rec.updatedAt).localeCompare(String(a.rec.updatedAt)); });
    var pages = Math.max(1, Math.ceil(list.length / UI.docSize));
    if (UI.docPage > pages) UI.docPage = pages;
    var slice = list.slice((UI.docPage - 1) * UI.docSize, UI.docPage * UI.docSize);
    var h = '<div class="page-head"><div><h2>单据中心</h2>' +
      '<p>跨 ' + vis.length + ' 个授权模块统一检索 · 所有环节的单据都在这里</p></div>' +
      '<div class="head-actions"><button class="btn btn-primary" data-act="new-menu">＋ 新建单据</button></div></div>';
    h += newMenuHTML(r);
    h += '<div class="doc-toolbar"><div class="tabs-primary inline">' + tabs.map(function (t) {
      return '<button class="' + (UI.docSt === t[0] ? 'active' : '') +
        '" data-act="doc-tab" data-v="' + t[0] + '">' + t[1] + ' <span class="tab-count">' +
        tabN[t[0]] + '</span></button>';
    }).join('') + '</div><div class="doc-filters">' +
      '<select class="ctrl" id="docStageSel" data-act="doc-stage"><option value="all">全部环节</option>' +
      [BASE_GROUP].concat(STAGES).map(function (s) {
        return '<option value="' + s.id + '"' + (UI.docStage === s.id ? ' selected' : '') + '>' +
          esc(s.id + ' ' + s.name) + '</option>';
      }).join('') + '</select>' +
      '<input class="ctrl" id="docQ" placeholder="搜索单号 / 模块 / 摘要" value="' +
      esc(UI.docQ) + '" data-act="doc-q"></div></div>';
    if (!slice.length) h += '<div class="card">' + emptyBox('没有匹配的单据', '调整状态、环节或关键词试试') + '</div>';
    else {
      h += '<div class="card"><div class="table-wrap"><table class="data-table"><thead><tr>' +
        '<th>单据编号</th><th>环节</th><th>业务模块</th><th>摘要</th><th>状态</th>' +
        '<th>来源</th><th>更新</th><th style="text-align:right">操作</th></tr></thead><tbody>' +
        slice.map(function (x) {
          return '<tr data-act="open-detail" data-mod="' + x.k + '" data-id="' + x.rec.id + '">' +
            '<td><span class="cell-main mono">' + esc(x.rec.no) + '</span></td>' +
            '<td class="small">' + esc(x.stage + ' ' + (stageById(x.stage).name || '')) + '</td>' +
            '<td>' + esc(x.m.name) + '</td>' +
            '<td><span class="cell-main">' + esc(txt(x.rec.data[x.m.titleField]).slice(0, 24) || '—') + '</span></td>' +
            '<td>' + pill(x.rec.status, fieldStatus(x.m, x.rec)) + '</td>' +
            '<td>' + (x.rec.origin === 'dingtalk-form' ? '<span class="tag">钉钉表单</span>' :
              x.rec.source ? '<span class="tag">自动派生</span>' : '<span class="tag">前端录入</span>') + '</td>' +
            '<td class="small muted">' + esc(d10(x.rec.updatedAt)) + '</td>' +
            '<td><div class="row-actions">' +
            (canApproveRecord(r, x.m, x.rec)
              ? '<button class="link-btn" data-act="act" data-action="approve" data-mod="' + x.k +
                '" data-id="' + x.rec.id + '" data-stop="1">通过</button>' : '') +
            '<button class="link-btn" data-act="open-detail" data-mod="' + x.k +
              '" data-id="' + x.rec.id + '" data-stop="1">详情</button></div></td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<div class="pager"><span>共 ' + list.length + ' 条 · 第 ' + UI.docPage + ' / ' + pages + ' 页</span>' +
        '<div class="pg-btns"><button class="btn btn-sm" data-act="doc-page" data-p="' + (UI.docPage - 1) +
        '"' + (UI.docPage <= 1 ? ' disabled' : '') + '>上一页</button>' +
        '<button class="btn btn-sm" data-act="doc-page" data-p="' + (UI.docPage + 1) +
        '"' + (UI.docPage >= pages ? ' disabled' : '') + '>下一页</button></div></div></div>';
    }
    return h;
  }

  // ================================================================ 数据对齐与自动化流
  function pageSync() {
    var r = DB.role(), cfg = CFG.sync, st = SYNC.status(), S = SYNC.state;
    var admin = DB.canSystem(r.id, 'settings');
    var h = '<div class="page-head"><div><h2>数据对齐与自动化流</h2>' +
      '<p>钉钉表单 / 数据表 ↔ 前端单据引擎 · 站点 ' + esc(cfg.host) + ' · 8 条自动化流</p></div>' +
      '<div class="head-actions">' +
      '<button class="btn" data-act="sync-pull">立即拉取</button>' +
      '<button class="btn" data-act="sync-push">立即推送</button>' +
      (admin ? '<button class="btn btn-primary" data-act="sync-runall">运行全部自动化流</button>' : '') +
      '</div></div>';

    h += '<div class="sync-status"><div class="ss-item"><span>站点</span><b>' + esc(cfg.host) +
      '</b></div><div class="ss-item"><span>运行模式</span><b class="' +
      (st.mode === 'live' ? 'live' : 'demo') + '">' + (st.mode === 'live' ? '实时 · 网关已连接' : '演示 · 本地队列模拟') +
      '</b></div><div class="ss-item"><span>同步间隔</span><b>' + esc(cfg.interval) +
      '</b></div><div class="ss-item"><span>最近同步</span><b>' + esc(dt(st.lastSync) || '尚未同步') +
      '</b></div><div class="ss-item"><span>待推送</span><b>' + st.pending +
      '</b></div><div class="ss-item"><span>已拉取</span><b>' + st.inbox +
      '</b></div><div class="ss-item"><span>冲突</span><b>' + st.conflicts +
      '</b></div></div>';
    h += '<div class="sync-note">' + esc(cfg.liveNote) + '</div>';

    // 数据流全貌：把"型"画清楚
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>数据对齐链路</h3>' +
      '<span class="sub">静态页面不直连钉钉，统一经 ' + esc(cfg.host) + ' 网关</span></div>' +
      '<div class="flow-line">' +
      '<div class="fl-node"><b>钉钉 AI 表格</b><span>44 数据表 / 9 表单 / 12 自动化</span></div>' +
      '<span class="fl-arrow">⇄</span>' +
      '<div class="fl-node accent"><b>同步网关</b><span>' + esc(cfg.host) + '/api/sync/*</span></div>' +
      '<span class="fl-arrow">⇄</span>' +
      '<div class="fl-node"><b>前端单据引擎</b><span>CRUD / 状态机 / 权限 / localStorage</span></div>' +
      '<span class="fl-arrow">→</span>' +
      '<div class="fl-node"><b>自动化流</b><span>拉取 · 回写 · 派生 · 冲突 · 通知</span></div>' +
      '<span class="fl-arrow">→</span>' +
      '<div class="fl-node"><b>工作台 / 驾驶舱</b><span>按角色可见范围聚合</span></div>' +
      '</div><div class="gateway-endpoints">' + Object.keys(cfg.gateway).filter(function (k) {
        return k !== 'base';
      }).map(function (k) {
        return '<span class="ep">' + esc(cfg.gateway[k]) + '</span>';
      }).join('') + '</div>' +
      '<p class="mode-note">网关骨架已随仓库交付：<code>worker/sync-gateway.js</code> · ' +
      '<code>worker/wrangler.toml</code> · <code>worker/table-map.json</code>（44 张钉钉表的 ' +
      'tableId 与 444 个 fieldId 已精确映射）。部署后把上方模式切到「实时」即可走真实请求。</p></div>';

    // 配置区（仅管理员）
    if (admin) {
      h += '<div class="card card-pad section-gap"><div class="card-title"><h3>同步配置</h3>' +
        '<span class="sub">仅管理员可改 · 改动即时生效并持久化</span></div>' +
        '<div class="sync-config"><label>运行模式</label><div class="seg" id="syncModeSeg">' +
        '<button class="' + (st.mode === 'demo' ? 'on' : '') + '" data-act="sync-mode" data-v="demo">演示（本地模拟）</button>' +
        '<button class="' + (st.mode === 'live' ? 'on' : '') + '" data-act="sync-mode" data-v="live">实时（走网关）</button>' +
        '</div><label>自动同步</label><div class="seg">' +
        '<button class="' + (st.autoSync ? 'on' : '') + '" data-act="sync-auto" data-v="1">开启</button>' +
        '<button class="' + (!st.autoSync ? 'on' : '') + '" data-act="sync-auto" data-v="0">关闭</button>' +
        '</div><label>默认录入方式</label><div class="seg">' +
        '<button class="' + (SYNC.config.defaultEntryMode === 'backend' ? 'on' : '') +
        '" data-act="sync-default" data-v="backend">钉钉表单优先</button>' +
        '<button class="' + (SYNC.config.defaultEntryMode === 'frontend' ? 'on' : '') +
        '" data-act="sync-default" data-v="frontend">前端填单优先</button>' +
        '</div><label>同步令牌</label><input class="ctrl" id="syncToken" placeholder="X-Sync-Token（部署 Worker 后填写）" value="' +
        esc(SYNC.config.token || '') + '"></div></div>';
    }

    // 9 张钉钉表单的分工矩阵 —— 直接回答"哪些不用重复填"
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>表单分工矩阵</h3>' +
      '<span class="sub">9 张钉钉在线表单 · 逐模块决定由谁录入</span></div>' +
      '<div class="table-wrap"><table class="data-table"><thead><tr><th>环节</th><th>业务模块</th>' +
      '<th>钉钉表单</th><th>当前录入方式</th><th style="text-align:right">切换</th></tr></thead><tbody>' +
      CFG.formModules.map(function (k) {
        var m = MOD[k], mode = SYNC.modeOf(k);
        var label = mode === 'backend' ? '钉钉表单录入（前端不重复填）' :
          mode === 'frontend' ? '前端填写并自动回写' : '双通道（幂等去重）';
        return '<tr><td class="small">' + esc((MODULE_STAGE[k] || '') + ' ' +
          (stageById(MODULE_STAGE[k] || '00').name || '')) + '</td>' +
          '<td><span class="cell-main">' + esc(m.name) + '</span></td>' +
          '<td><a class="link-btn" href="' + esc(m.formUrl) + '" target="_blank" rel="noopener">' +
          esc(m.backendFormName) + ' ↗</a></td>' +
          '<td><span class="tag ' + (mode === 'backend' ? 'tag-dt' : '') + '">' + esc(label) + '</span></td>' +
          '<td><div class="row-actions">' + (admin ? ['backend', 'frontend', 'both'].map(function (v) {
            return '<button class="link-btn' + (mode === v ? ' strong' : '') +
              '" data-act="sync-mode-mod" data-mod="' + k + '" data-v="' + v + '">' +
              (v === 'backend' ? '钉钉' : v === 'frontend' ? '前端' : '双通道') + '</button>';
          }).join('') : '<span class="muted small">只读</span>') + '</div></td></tr>';
      }).join('') + '</tbody></table></div></div>';

    // 自动化流
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>自动化流</h3>' +
      '<span class="sub">触发器 → 条件 → 动作链 · 可单条运行、停用、看日志</span></div>' +
      '<div class="flow-cards">' + CFG.flows.map(function (f) {
        var s = S.flows[f.id];
        return '<div class="flow-card' + (s.enabled ? '' : ' off') + '"><div class="fc-head">' +
          '<span class="flow-id">' + esc(f.id) + '</span><b>' + esc(f.name) + '</b>' +
          '<span class="src-tag">' + esc(f.source) + '</span></div>' +
          '<div class="fc-chain"><span class="ch-trigger">' + esc(f.trigger) + '</span>' +
          '<i>→</i><span class="ch-cond">' + esc(f.condition) + '</span>' +
          '<i>→</i><span class="ch-acts">' + f.actions.map(esc).join(' · ') + '</span></div>' +
          '<p class="fc-note">' + esc(f.desc) + '</p>' +
          '<div class="fl-foot"><span class="flow-meta">运行 ' + s.runs + ' 次' +
          (s.lastRun ? ' · 最近 ' + esc(dt(s.lastRun)) : '') + '</span>' +
          '<span class="flow-meta">' + esc(s.lastResult || '尚未运行') + '</span>' +
          (admin ? '<div class="row-actions">' +
            '<button class="link-btn" data-act="flow-toggle" data-id="' + f.id + '">' +
            (s.enabled ? '停用' : '启用') + '</button>' +
            '<button class="btn btn-sm" data-act="flow-run" data-id="' + f.id + '">运行一次</button></div>' : '') +
          '</div></div>';
      }).join('') + '</div></div>';

    // 队列与冲突
    UI.syncTab = UI.syncTab || 'outbox';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>同步队列与冲突</h3>' +
      '<span class="sub">幂等键 remoteId · 失败保留可重试 · 冲突不静默覆盖</span></div>' +
      '<div class="tabs-primary inline">' + [['outbox', '待推送 ' + S.outbox.length],
        ['inbox', '已拉取 ' + S.inbox.length],
        ['conflicts', '冲突 ' + S.conflicts.length],
        ['logs', '日志 ' + S.logs.length]].map(function (t) {
        return '<button class="' + (UI.syncTab === t[0] ? 'active' : '') +
          '" data-act="sync-tab" data-v="' + t[0] + '">' + t[1] + '</button>';
      }).join('') + '</div><div class="queue-body">';
    if (UI.syncTab === 'outbox') {
      h += S.outbox.length ? '<div class="table-wrap"><table class="data-table"><thead><tr>' +
        '<th>单据</th><th>模块</th><th>动作</th><th>字段数</th><th>状态</th><th>时间</th>' +
        '</tr></thead><tbody>' + S.outbox.slice(0, 30).map(function (x) {
          return '<tr><td><span class="cell-main mono">' + esc(x.no) + '</span></td>' +
            '<td>' + esc(MOD[x.moduleKey] ? MOD[x.moduleKey].name : x.moduleKey) + '</td>' +
            '<td>' + esc(x.action) + '</td><td>' + (x.fieldCount || 0) + '</td>' +
            '<td>' + (x.state === 'synced' ? pill('done', '已同步') :
              x.state === 'failed' ? pill('reject', '失败待重试') : pill('running', '待推送')) + '</td>' +
            '<td class="small muted">' + esc(dt(x.ts)) + '</td></tr>';
        }).join('') + '</tbody></table></div>' : emptyBox('队列为空', '在前端填一张单据，或切换录入方式后即可看到待推送记录');
    } else if (UI.syncTab === 'inbox') {
      h += S.inbox.length ? S.inbox.slice(0, 30).map(function (x) {
        return '<div class="queue-row"><span class="tag tag-dt">钉钉表单</span>' +
          '<b>' + esc(x.no) + '</b><span>' + esc(x.formName) + '</span>' +
          '<span class="muted small">' + esc(x.title) + '</span>' +
          '<span class="push-right">' + esc(dt(x.ts)) + '</span></div>';
      }).join('') : emptyBox('还没有拉取记录', '点右上角「立即拉取」模拟钉钉表单提交落到前端');
    } else if (UI.syncTab === 'conflicts') {
      h += S.conflicts.length ? S.conflicts.slice(0, 30).map(function (c) {
        return '<div class="queue-row"><span class="tag">冲突</span><b>' + esc(c.no) + '</b>' +
          '<span>' + esc(c.moduleName) + '</span><span class="muted small">本地 ' +
          esc(dt(c.localTs)) + ' / 远端 ' + esc(dt(c.remoteTs)) + '</span>' +
          '<span class="push-right">' + (c.state === 'open' && admin
            ? '<button class="link-btn" data-act="conflict" data-id="' + esc(c.id) +
              '" data-v="local">保留本地</button> <button class="link-btn" data-act="conflict" data-id="' +
              esc(c.id) + '" data-v="remote">以钉钉为准</button>'
            : esc(c.state)) + '</span></div>';
      }).join('') : emptyBox('无冲突', '同一单据在前后端都被修改时会自动冻结并出现在这里');
    } else {
      h += S.logs.length ? S.logs.slice(0, 40).map(function (l) {
        return '<div class="queue-row"><span class="log-dot ' + esc(l.level) + '"></span>' +
          '<b>' + esc(l.title) + '</b><span class="tag">' + esc(l.flow) + '</span>' +
          '<span class="muted small">' + esc(l.detail) + '</span>' +
          '<span class="push-right">' + esc(dt(l.ts)) + '</span></div>';
      }).join('') : emptyBox('暂无日志', '运行一条自动化流后这里会记录每一步');
    }
    h += '</div></div>';
    return h;
  }

  // ================================================================ 后端字段契约
  function pageContract() {
    var r = DB.role();
    if (!DB.canSystem(r.id, 'contract')) {
      return denyPage('无权查看后端契约', '字段契约属于管理视角，仅超级管理员可见。', r);
    }
    var key = UI.contractMod, c = CONTRACT.modules[key] || CONTRACT.modules.t18;
    var h = '<div class="page-head"><div><h2>后端字段契约</h2>' +
      '<p>' + esc(CONTRACT.meta.source) + ' → 44 个表单模块 · 前端字段即 DTO</p></div>' +
      '<div class="head-actions"><button class="btn btn-primary" data-act="contract-download">下载 api-contract.json</button></div></div>';
    h += '<div class="sync-status"><div class="ss-item"><span>SQL 原表</span><b>' +
      CONTRACT.meta.sqlTables + '</b></div><div class="ss-item"><span>原表列</span><b>' +
      CONTRACT.meta.sqlColumns + '</b></div><div class="ss-item"><span>表单模块</span><b>' +
      CONTRACT.meta.modules + '</b></div><div class="ss-item"><span>字段映射</span><b>' +
      c.fields.length + '</b></div><div class="ss-item"><span>联动规则</span><b>' +
      CONTRACT.meta.modules + ' 模块 / 14 条</b></div></div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>选择模块</h3>' +
      '<span class="sub">按主链路环节分组</span></div>' +
      '<select class="ctrl" id="contractModSel" data-act="contract-mod">' +
      [BASE_GROUP].concat(STAGES).map(function (s) {
        return '<optgroup label="' + esc(s.id + ' ' + s.name) + '">' + s.modules.map(function (k) {
          var m = MOD[k];
          return '<option value="' + k + '"' + (k === key ? ' selected' : '') + '>' +
            esc(m.name) + '</option>';
        }).join('') + '</optgroup>';
      }).join('') + '</select></div>';
    h += '<div class="grid grid-2 section-gap"><div class="card card-pad"><div class="card-title">' +
      '<h3>接口与资源</h3><span class="sub">' + esc(c.name) + '</span></div>' +
      '<div class="kv"><span class="k">REST 资源码</span><span class="v mono">' + esc(c.code) + '</span></div>' +
      '<div class="kv"><span class="k">主端点</span><span class="v mono">' + esc(c.endpoint) + '</span></div>' +
      '<div class="kv"><span class="k">所在环节</span><span class="v">' + esc(c.stage) + ' ' +
      esc((stageById(c.stage).name || '')) + '</span></div>' +
      '<div class="kv"><span class="k">钉钉数据表</span><span class="v mono">' +
      esc(c.dingtalk.tableId || '—') + '</span></div>' +
      '<div class="kv"><span class="k">对应 SQL 表</span><span class="v">' +
      c.sqlTables.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(' ') + '</span></div>' +
      '<div class="endpoints">' + Object.keys(c.endpoints).map(function (k) {
        return '<div><span>' + esc(k) + '</span><code>' + esc(c.endpoints[k]) + '</code></div>';
      }).join('') + '</div></div>';
    h += '<div class="card card-pad"><div class="card-title"><h3>状态机与联动</h3>' +
      '<span class="sub">前端动作即后端事件</span></div>' +
      '<div class="kv"><span class="k">状态字段</span><span class="v">' + esc(c.statusField || '—') + '</span></div>' +
      '<div class="kv"><span class="k">状态枚举</span><span class="v">' +
      (c.statusOptions.length ? c.statusOptions.map(function (o) { return '<span class="tag">' + esc(o) + '</span>'; }).join(' ') : '—') +
      '</span></div><div class="kv"><span class="k">审批角色</span><span class="v">' +
      esc(c.approvers.map(function (a) { return ROLE[a] ? ROLE[a].name : a; }).join(' / ') || '—') + '</span></div>' +
      '<h4 class="sub-title">下游联动</h4>' + (c.links.length ? c.links.map(function (l) {
        return '<div class="link-row"><b>' + esc(l.title) + '</b><span class="muted small">→ ' +
          esc(MOD[l.to] ? MOD[l.to].name : l.to) + '</span><div>' +
          Object.keys(l.map).map(function (s) {
            return '<span class="tag">' + esc(s) + ' → ' + esc(l.map[s]) + '</span>';
          }).join(' ') + '</div></div>';
      }).join('') : '<p class="mode-note">本模块无自动派生</p>') +
      '<h4 class="sub-title">来源 SQL 列（节选）</h4>' +
      (c.sqlTables[0] && CONTRACT.sqlTables[c.sqlTables[0]]
        ? CONTRACT.sqlTables[c.sqlTables[0]].columns.slice(0, 10).map(function (col) {
          return '<div class="kv"><span class="k mono">' + esc(col.name) + '</span><span class="v small">' +
            esc(col.sqlType) + (col.comment ? ' · ' + esc(col.comment) : '') + '</span></div>';
        }).join('') : '<p class="mode-note">无来源表</p>') + '</div></div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>字段映射表</h3>' +
      '<span class="sub">中文显示名 → DTO 列名 → API / SQL 类型 · 共 ' + c.fields.length + ' 个字段</span></div>' +
      '<div class="table-wrap"><table class="data-table"><thead><tr><th>#</th><th>前端显示名</th>' +
      '<th>DTO 列名</th><th>API 类型</th><th>SQL 类型</th><th>钉钉字段 ID</th>' +
      '<th>必填</th><th>枚举 / 填写提示</th>' +
      '</tr></thead><tbody>' + c.fields.map(function (f, i) {
        return '<tr><td class="small muted">' + (i + 1) + '</td>' +
          '<td><span class="cell-main">' + esc(f.label) + '</span></td>' +
          '<td><code>' + esc(f.key) + '</code></td><td class="small">' + esc(f.apiType) + '</td>' +
          '<td class="small mono">' + esc(f.sqlType) + '</td>' +
          '<td class="small mono">' + esc(f.dingtalkFieldId || '—') + '</td>' +
          '<td>' + (f.required ? '<span class="tag tag-dt">必填</span>' : '<span class="muted small">—</span>') + '</td>' +
          '<td class="small">' + esc((f.options || []).join(' / ') || f.hint || '—') + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
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
      var owners = CFG.roles.filter(function (x) { return DB.can(x.id, key, 'view'); })
        .map(function (x) { return x.name; }).join(' / ');
      return denyPage('无权访问该模块',
        '「' + (m ? m.name : key) + '」不在当前角色的授权范围内。可访问角色：' + (owners || '无') +
        '。该模块的名称、字段与单据均不会出现在搜索、通知与看板中。', r);
    }
    UI.listQ = q.q || ''; UI.listSt = q.st || 'all'; UI.listPage = parseInt(q.p || '1', 10) || 1;
    var groups = DB.groupsFor(r.id, m.domainId);
    var h = '<div class="page-head"><div><h2>' + esc(m.fullName) + '</h2><p>' + esc(m.guide) +
      ' · 状态字段「' + esc(m.statusField || '内置流程状态') + '」由流程动作自动推进</p></div>' +
      '<div class="head-actions">' +
      '<button class="btn" data-act="stage" data-id="' + esc(MODULE_STAGE[key] || '00') + '">← 返回所在环节</button>' +
      (DB.can(r.id, key, 'export') ? '<button class="btn" data-act="export-csv" data-mod="' + key + '">导出 CSV</button>' : '') +
      (SYNC.canFrontend(key) && DB.can(r.id, key, 'create')
        ? '<button class="btn btn-primary" data-act="open-form" data-mod="' + key + '">' +
          ico('plus', 15) + ' 新建单据</button>'
        : m.hasBackendForm
          ? '<a class="btn btn-primary" href="' + esc(m.formUrl) + '" target="_blank" rel="noopener">在钉钉表单填写 ↗</a>'
          : '<span class="tag">当前角色只读</span>') + '</div></div>';
    if (m.hasBackendForm) {
      h += '<div class="mode-strip"><b>录入分工</b><span>该模块由钉钉表单「' +
        esc(m.backendFormName) + '」收集数据，前端默认不重复建表单；提交后由同步流拉取到此处。' +
        '当前方式：<b>' + (SYNC.modeOf(key) === 'backend' ? '钉钉表单录入' :
          SYNC.modeOf(key) === 'both' ? '双通道' : '前端填写并回写') + '</b></span>' +
        '<button class="link-btn" data-act="nav" data-href="sync">调整录入方式 →</button></div>';
    }

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
            ? (canApproveRecord(r, m, rec)
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
  function dtoOf(modKey, label) {
    var c = CONTRACT && CONTRACT.modules[modKey];
    if (!c) return '';
    var f = c.fields.filter(function (x) { return x.label === label; })[0];
    return f ? f.key : '';
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
            ' <span class="tag">' + esc(f.typeName) + '</span>' +
            '<code class="fkey" title="后端 DTO 列名">' + esc(dtoOf(m.key, f.name)) + '</code></label>' +
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
      '</div><div class="form-guide"><h5>本单据在链路中的位置</h5>' +
      '<div class="g-note"><b>环节：</b>' + esc((MODULE_STAGE[m.key] || '') + ' ' +
        (stageById(MODULE_STAGE[m.key] || '00').name || '')) + '<br>' +
      '<b>上游输入：</b>' + esc(stageById(MODULE_STAGE[m.key] || '00').input || '—') + '<br>' +
      '<b>下游输出：</b>' + esc(stageById(MODULE_STAGE[m.key] || '00').output || '—') + '</div>' +
      '<h5>提交后会发生什么</h5><ol class="g-steps">' +
      '<li>状态推进为「' + esc(m.states.running) + '」，通知审批角色</li>' +
      '<li>字段按契约映射为 DTO，进入同步队列</li>' +
      '<li>同步网关回写钉钉数据表（当前 ' + esc(SYNC.config.mode === 'live' ? '实时' : '演示模拟') + '）</li>' +
      '<li>审批通过后自动派生下游单据并继续同步</li></ol>' +
      '<h5>填写指引</h5><ol>' +
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
    if (recId && !rec) { toast('单据不存在或不在当前数据范围内', '', 'error'); return; }
    if (!DB.can(r.id, key, rec ? 'edit' : 'create')) {
      toast('无权限', '当前角色不能' + (rec ? '编辑' : '新建') + '该模块单据', 'error'); return;
    }
    if (!recId && !SYNC.canFrontend(key)) {
      toast('无需重复填写', '该模块由钉钉表单录入，请到「数据同步」切换为前端填写', 'warn'); return;
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
        toast('已提交审批', rec.no + ' 进入「' + m.states.running + '」，已通知审批角色并进入同步队列', 'ok');
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
    var m = MOD[key], r = DB.role();
    if (!m || !DB.can(r.id, key, 'view')) {
      toast('无权限', '该模块不在当前角色的可见范围内', 'error'); return;
    }
    var rec = DB.get(key, recId);
    if (!rec) { toast('单据不存在或不在当前数据范围内', '', 'error'); return; }
    UI.lastDetailMod = key; UI.lastDetailId = recId;
    var h = '<div class="detail-head"><div><div class="dh-title">' + esc(txt(rec.data[m.titleField]) || rec.no) +
      '</div><div class="dh-sub mono">' + esc(rec.no) + ' · ' + esc(m.fullName) + ' · 创建于 ' +
      esc(dt(rec.createdAt)) + '</div></div><div>' + pill(rec.status, fieldStatus(m, rec)) + '</div></div>';
    if (rec.source) {
      h += '<div class="source-box" style="margin-bottom:14px">本单据由上游 <b>' + esc(rec.source.no) +
        '</b> 审批通过后自动派生 · ' +
        (DB.can(r.id, rec.source.moduleKey, 'view')
          ? '<button class="link-btn" data-act="open-detail" data-mod="' +
            esc(rec.source.moduleKey) + '" data-id="' + esc(rec.source.id) + '">查看来源单据</button>'
          : '<span class="muted small">来源模块不在当前权限范围内</span>') + '</div>';
    }
    var kids = [];
    // 派生链也按可见模块过滤，避免泄露未授权模块的单号
    DB.visibleModules(r.id).forEach(function (k) {
      DB.visibleRecords(r.id, k).forEach(function (x) {
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
          ? (canApproveRecord(r, m, rec)
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
  // ================================================================ 经营驾驶舱（仅管理员）
  // 设计原则：一屏一个焦点（全链路漏斗），其余图表收敛为两栏辅助，不堆砌。
  function pageBoard() {
    var r = DB.role();
    if (!DB.canSystem(r.id, 'board')) {
      return denyPage('无权查看经营驾驶舱', '经营看板是管理员视角，业务角色请在「我的工作」按链路办理单据。', r);
    }
    var s = DB.statsFor(r.id), domains = DB.visibleDomains(r.id);
    var stageNums = STAGES.map(function (g) {
      return { g: g, n: stageRecords(g.id, r.id).length };
    });
    var maxStage = Math.max.apply(null, stageNums.map(function (x) { return x.n; }).concat([1]));
    var total = s.total || 1;
    var rate = Math.round(s.done / total * 100);

    var h = '<div class="page-head"><div><h2>经营驾驶舱</h2>' +
      '<p>全域单据聚合 · 一条链路看流转，不逐表翻找 · 演示数据来自本地单据引擎</p></div>' +
      '<div class="head-actions"><span class="tag">管理员视角</span>' +
      '<button class="btn" data-act="nav" data-href="contract">字段契约</button>' +
      (r.policy.boardExport ? '<button class="btn" data-act="export-board">导出汇总 CSV</button>' : '') +
      '</div></div>';

    // 指标条：一行四个，轻量，不带大色块
    var kpis = [
      { label: '单据总量', value: s.total, foot: '全域 44 个模块', tone: '' },
      { label: '在途待办', value: s.running, foot: '需推进 / 待审批', tone: 'warn' },
      { label: '已完成', value: s.done, foot: '完成率 ' + rate + '%', tone: 'ok' },
      { label: '涉及金额', value: moneyShort(s.amount), foot: '金额字段汇总', tone: 'purple' }
    ];
    h += '<div class="bi-kpis">' + kpis.map(function (k) {
      return '<div class="bi-kpi ' + k.tone + '"><span>' + esc(k.label) + '</span>' +
        '<b>' + esc(k.value) + '</b><small>' + esc(k.foot) + '</small>' +
        '<i style="width:' + (k.tone === 'ok' ? rate : Math.min(100, Math.round(
          (Number(k.value) || 0) / Math.max(1, s.total) * 100)) + '%') + '"></i></div>';
    }).join('') + '</div>';

    // 主视觉：全链路漏斗，八个环节一条线
    h += '<div class="bi-hero"><div class="bi-hero-head"><div><h3>全链路单据流转</h3>' +
      '<p>从供应商准入到装柜留痕，逐环节看单量堆积</p></div>' +
      '<div class="bi-legend"><span><i class="lg-blue"></i>单据量</span>' +
      '<span><i class="lg-line"></i>环节顺序</span></div></div>' +
      '<div class="bi-funnel">' + stageNums.map(function (x, i) {
        var pct = Math.max(6, Math.round(x.n / maxStage * 100));
        return '<button class="bf-step" data-act="stage" data-id="' + x.g.id + '" title="查看该环节">' +
          '<span class="bf-count">' + x.n + '</span>' +
          '<span class="bf-track"><i style="height:' + pct + '%"></i></span>' +
          '<span class="bf-id">' + esc(x.g.id) + '</span>' +
          '<span class="bf-name">' + esc(x.g.name) + '</span>' +
          (i < stageNums.length - 1 ? '<span class="bf-link"></span>' : '') + '</button>';
      }).join('') + '</div>' +
      '<div class="bi-hero-foot"><span>链路起点 · 供应商准入</span>' +
      '<span>共 ' + s.total + ' 张单据 / 8 个环节 / ' + CFG.links.length + ' 条自动联动</span>' +
      '<span>链路终点 · 证据归档</span></div></div>';

    // 辅助两栏
    h += '<div class="grid grid-2 section-gap">';
    h += '<div class="card card-pad bi-card"><div class="card-title"><h3>流程状态分布</h3>' +
      '<span class="sub">按单据状态聚合</span></div>' + donut([
        { label: '草稿', v: s.byStatus.draft || 0, c: '#98A2B3' },
        { label: '在途', v: s.byStatus.running || 0, c: '#F79009' },
        { label: '完成', v: s.byStatus.done || 0, c: '#12B76A' },
        { label: '驳回', v: s.byStatus.reject || 0, c: '#F04438' }
      ]) + '</div>';
    h += '<div class="card card-pad bi-card"><div class="card-title"><h3>业务域负载</h3>' +
      '<span class="sub">各域已录入单据数</span></div><div class="bi-bars">' +
      domains.map(function (d) {
        var v = s.byDomain[d.id] || 0;
        return '<div class="bi-bar"><span class="bb-label">' + esc(d.name) + '</span>' +
          '<span class="bb-track"><i style="width:' + Math.max(2, Math.round(v / Math.max(1, total) * 100 * 2)) + '%"></i></span>' +
          '<b>' + v + '</b></div>';
      }).join('') + '</div></div></div>';

    // 最近动态 + 重点预警，精简两栏
    var recent = DB.state.records && Object.keys(DB.state.records).length
      ? DB.recentLogs(7, r.id) : [];
    var alerts = DB.alerts(r.id).slice(0, 5);
    h += '<div class="grid grid-2 section-gap"><div class="card card-pad bi-card">' +
      '<div class="card-title"><h3>最近动态</h3><span class="sub">本地操作审计</span></div>' +
      (recent.length ? recent.map(function (l) {
        return '<div class="bi-row"><span class="br-time">' + esc(dt(l.ts).slice(5)) + '</span>' +
          '<span class="br-title">' + esc(l.title) + '</span>' +
          '<span class="tag">' + esc(l.person || '系统') + '</span></div>';
      }).join('') : emptyBox('暂无动态', '提交或审批一张单据后会出现在这里')) + '</div>';
    h += '<div class="card card-pad bi-card"><div class="card-title"><h3>重点预警</h3>' +
      '<span class="sub">来自异常状态单据</span></div>' +
      (alerts.length ? alerts.map(function (a) {
        return '<div class="bi-row"><span class="br-dot ' +
          (a.level === 'danger' ? 'danger' : 'warn') + '"></span>' +
          '<span class="br-title">' + esc(a.rec.no) + ' · ' + esc(a.module.name) + '</span>' +
          '<button class="link-btn" data-act="open-detail" data-mod="' + esc(a.module.key) +
          '" data-id="' + esc(a.rec.id) + '">查看</button></div>';
      }).join('') : emptyBox('暂无预警', '当前全域没有异常状态单据')) + '</div></div>';
    return h;
  }
  function donut(items) {
    var total = items.reduce(function (a, b) { return a + b.v; }, 0) || 1;
    var cx = 96, cy = 96, R = 74, r = 50, acc = -Math.PI / 2, paths = '';
    items.forEach(function (it) {
      if (it.v <= 0) return;
      var ang = it.v / total * Math.PI * 2, end = acc + ang;
      var large = ang > Math.PI ? 1 : 0;
      function pt(rad, a) { return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]; }
      var a1 = pt(R, acc), a2 = pt(R, end), b1 = pt(r, end), b2 = pt(r, acc);
      paths += '<path d="M' + a1[0].toFixed(2) + ' ' + a1[1].toFixed(2) +
        ' A' + R + ' ' + R + ' 0 ' + large + ' 1 ' + a2[0].toFixed(2) + ' ' + a2[1].toFixed(2) +
        ' L' + b1[0].toFixed(2) + ' ' + b1[1].toFixed(2) +
        ' A' + r + ' ' + r + ' 0 ' + large + ' 0 ' + b2[0].toFixed(2) + ' ' + b2[1].toFixed(2) +
        ' Z" fill="' + it.c + '"/>';
      acc = end;
    });
    return '<div class="donut-wrap"><svg viewBox="0 0 192 192" width="176" height="176">' +
      '<circle cx="96" cy="96" r="74" fill="#F1F4FA"/>' + paths +
      '<text x="96" y="92" text-anchor="middle" font-size="26" font-weight="700" fill="#1B233A">' + total + '</text>' +
      '<text x="96" y="112" text-anchor="middle" font-size="11" fill="#8A94AA">单据总数</text></svg>' +
      '<div class="donut-legend">' + items.map(function (it) {
        return '<div><i style="background:' + it.c + '"></i><span>' + esc(it.label) +
          '</span><b>' + it.v + '</b><small>' + Math.round(it.v / total * 100) + '%</small></div>';
      }).join('') + '</div></div>';
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
    var gr = DB.role(), audit = DB.canSystem(gr.id, 'audit');
    var shown = audit ? CFG.roles : CFG.roles.filter(function (x) { return x.id === gr.id; });
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>权限矩阵</h3><span class="sub">' +
      (audit ? '全局审计视图' : '仅显示当前角色 · 完整矩阵仅管理员可见') + '</span></div>' +
      '<div class="table-wrap"><table class="data-table matrix"><thead><tr><th>角色</th><th>可见模块</th>' +
      '<th>可写</th><th>只读</th><th>可审批</th><th>系统功能</th></tr></thead><tbody>' + shown.map(function (x) {
        return '<tr><td><span class="cell-main">' + esc(x.name) + '</span></td>' +
          '<td>' + x.policy.visible.length + ' / 44</td><td>' + x.policy.writable.length + '</td>' +
          '<td>' + x.policy.readonly.length + '</td><td>' + x.policy.approvable.length + '</td>' +
          '<td>' + x.policy.system.length + ' 项</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="mode-note">逐个模块的精确能力清单见「我的权限」页。' +
      '<button class="link-btn" data-act="nav" data-href="permissions">查看我的权限</button></p></div></div></div>';
    return h;
  }

  // ---------------------------------------------------------------- 架构字典
  function pageDict(q) {
    var kw = (q.q || '').trim().toLowerCase(), r = DB.role(), vis = DB.visibleModules(r.id);
    // 字典也按角色收敛：未授权模块的名称与字段一律不展示
    var list = CFG.modules.filter(function (m) {
      if (vis.indexOf(m.key) < 0) return false;
      if (!kw) return true;
      return (m.name + m.fullName + m.domain + m.fields.map(function (f) { return f.name; }).join(' '))
        .toLowerCase().indexOf(kw) >= 0;
    });
    var h = '<div class="page-head"><div><h2>架构字典</h2><p>当前角色可见 ' + vis.length +
      ' / 44 个业务模块 · 未授权模块已从字典中移除；这里是数据底座，不是业务操作入口</p></div>' +
      '<div class="head-actions"><button class="btn" data-act="nav" data-href="permissions">我的权限</button>' +
      '<button class="btn" data-act="nav" data-href="flow">看运行链路</button></div></div>';
    h += '<div class="toolbar"><div class="search-box"><input id="dictSearch" type="search" placeholder="搜索模块 / 字段…" value="' +
      esc(kw) + '"></div><span class="muted small">匹配 ' + list.length + ' 个模块</span></div>';
    h += '<div class="grid grid-3">' + list.map(function (m) {
      var readonly = DB.can(r.id, m.key, 'create') ? '' : '<span class="tag">只读</span>';
      return '<div class="module-card" data-act="nav" data-href="module/' + m.key + '">' +
        '<div class="mc-top"><div class="module-icon">' +
        esc(m.domainId) + '</div><h4>' + esc(m.name) + '</h4>' + readonly + '</div>' +
        '<div class="mc-desc">' + esc(m.domain) + ' · ' + m.fields.length + ' 字段 · ' + m.views.length + ' 视图</div>' +
        '<div class="mc-meta">' + m.fields.slice(0, 3).map(function (f) {
          return '<span class="tag">' + esc(f.name) + '</span>';
        }).join('') + '<span class="mc-count">+ ' + (m.fields.length - 3) + '</span></div></div>';
    }).join('') + '</div>';
    return h;
  }

  // ---------------------------------------------------------------- 我的权限
  function pagePermissions() {
    var r = DB.role(), p = r.policy;
    var sys = CFG.systemLabels || {}, labs = CFG.capLabels || {};
    var domains = DB.visibleDomains(r.id);
    var h = '<div class="page-head"><div><h2>我的权限</h2>' +
      '<p>当前身份的精确授权清单 · 由「角色 × 模块」能力矩阵实时计算，所有入口统一鉴权</p></div>' +
      '<div class="head-actions"><button class="btn" data-act="nav" data-href="workbench">回到工作台</button></div></div>';
    h += '<div class="perm-summary">' +
      '<div><b>' + esc(r.name) + '</b><span>' + esc(r.person) + ' · ' + esc(r.account) + '</span></div>' +
      '<div><b>' + p.visible.length + '</b><span>可见模块</span></div>' +
      '<div><b>' + p.writable.length + '</b><span>可新建/编辑</span></div>' +
      '<div><b>' + p.readonly.length + '</b><span>只读模块</span></div>' +
      '<div><b>' + p.approvable.length + '</b><span>可审批模块</span></div>' +
      '<div><b>' + p.system.length + '</b><span>系统功能</span></div></div>';
    h += '<div class="scope-card"><b>数据范围</b><p>' + esc(r.scope) + '</p><p class="mode-note">' +
      (p.rowScope === 'supplier'
        ? '行级隔离：仅可见与「' + esc(CFG.supplierCompany) + '」相关或自己提交的单据；不能审批、不能查看其它供应商数据。'
        : '按业务域授权：可见模块内的单据均可查看；写操作与审批按下方模块能力矩阵执行，创建人不能审批自己的单据。') +
      '</p></div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>系统功能白名单</h3>' +
      '<span class="sub">未列出的功能一律不可见、不可调用</span></div><div class="perm-legend">' +
      Object.keys(sys).map(function (k) {
        var on = p.system.indexOf(k) >= 0;
        return '<span class="cap-chip ' + (on ? 'on' : 'off') + '">' +
          (on ? '✓ ' : '— ') + esc(sys[k]) + '</span>';
      }).join('') + '</div><p class="mode-note">' +
      (p.system.indexOf('settings') < 0
        ? '系统设置、全量数据备份、重置演示数据、钉钉全量入口、全局审计矩阵均不可访问；直接修改地址栏 hash 也会被路由门禁拦截。'
        : '当前为全域管理员，全部系统功能可用；业务角色的系统功能由白名单收敛。') +
      '</p></div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>模块能力矩阵</h3>' +
      '<span class="sub">' + p.visible.length + ' / 44 个可见模块</span></div>' +
      '<div class="perm-legend"><span class="cap-chip on">绿色 = 可写</span>' +
      '<span class="cap-chip off">灰色 = 只读</span>' +
      '<span class="mode-note">未授权模块不显示；悬停标签可看完整能力</span></div>';
    domains.forEach(function (d) {
      h += '<div class="perm-row"><b>' + esc(d.name) + '</b><div class="perm-legend">' +
        CFG.modules.filter(function (m) {
          return m.domainId === d.id && p.modules[m.key] && p.modules[m.key].length;
        }).map(function (m) {
          var caps = p.modules[m.key], rw = caps.indexOf('create') >= 0;
          return '<span class="cap-chip ' + (rw ? 'on' : 'off') + '" title="' +
            esc(caps.map(function (c) { return labs[c] || c; }).join(' / ')) + '">' +
            esc(m.name) + ' · ' + (rw ? '可写' : '只读') +
            (caps.indexOf('approve') >= 0 ? ' · 可审批' : '') + '</span>';
        }).join('') + '</div></div>';
    });
    h += '</div>';
    h += '<div class="role-switch-banner">演示身份切换器：以下切换仅用于对比权限隔离效果，不属于业务功能；真实部署时身份由登录认证决定。每次切换都会写入审计日志、清空当前会话的临时状态并回到工作台。</div>';
    h += '<div class="card card-pad section-gap"><div class="card-title"><h3>切换演示身份</h3>' +
      '<span class="sub">切换后权限与数据口径同步变化</span></div><div class="grid grid-3">' +
      CFG.roles.map(function (x) {
        return '<div class="ntf-item ' + (x.id === r.id ? 'unread' : '') + '">' +
          '<span class="avatar" style="background:' + esc(x.color) + '">' + esc(x.person.slice(0, 1)) + '</span>' +
          '<div class="ntf-main"><b>' + esc(x.name) + '</b><p>' + esc(x.person) + ' · 可见 ' +
          x.policy.visible.length + ' 模块 / 可写 ' + x.policy.writable.length + ' 模块</p></div>' +
          (x.id === r.id ? '<span class="tag">当前</span>' :
            '<button class="link-btn" data-act="switch-role" data-role="' + esc(x.id) + '">切换</button>') +
          '</div>';
      }).join('') + '</div></div>';
    return h;
  }

  // ---------------------------------------------------------------- 系统设置
  function pageSettings() {
    var r = DB.role();
    if (!DB.canSystem(r.id, 'settings')) {
      return denyPage('无权访问系统设置', '系统设置、全量备份与重置仅对超级管理员开放。', r);
    }
    var h = '<div class="page-head"><div><h2>系统设置</h2><p>演示数据管理、自动化规则与钉钉真实入口 · 仅超级管理员可见</p></div></div>';
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
    h += '<div class="role-switch-banner">演示身份切换器：此处切换角色仅用于对比权限隔离效果，不属于业务功能；真实部署时身份由登录认证决定。</div>';
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
      case 'stage': UI.stage = a.id; UI.newMenu = false; replaceHash('workbench'); render(); break;
      case 'new-menu': UI.newMenu = !UI.newMenu; render(); break;
      case 'doc-tab': UI.docSt = a.v; UI.docPage = 1;
        replaceHash('docs', { s: UI.docSt, g: UI.docStage, p: 1 }); render(); break;
      case 'doc-page': UI.docPage = Math.max(1, parseInt(a.p, 10) || 1);
        replaceHash('docs', { s: UI.docSt, g: UI.docStage, p: UI.docPage }); render(); break;
      case 'sync-tab': UI.syncTab = a.v; render(); break;
      case 'sync-pull':
        toast('正在拉取', '从钉钉表单增量同步到前端单据', 'info');
        SYNC.pull({ limit: 3 }).then(function (res) {
          toast(res.title, res.detail, res.ok ? 'ok' : 'error'); render();
        }); break;
      case 'sync-push':
        SYNC.push().then(function (res) {
          toast(res.title, res.detail, res.ok ? 'ok' : 'warn'); render();
        }); break;
      case 'sync-runall':
        if (!DB.canSystem(DB.role().id, 'settings')) { toast('无权限', '仅管理员可运行全部自动化流', 'error'); break; }
        toast('正在运行', '按 F01 → F08 顺序执行已启用的自动化流', 'info');
        SYNC.runAll().then(function () { toast('自动化流执行完毕', '队列、日志与冲突已更新', 'ok'); render(); }); break;
      case 'sync-mode': case 'sync-auto': case 'sync-default': case 'sync-mode-mod':
      case 'flow-toggle': case 'flow-run': case 'conflict': {
        if (!DB.canSystem(DB.role().id, 'settings')) { toast('无权限', '同步配置仅管理员可修改', 'error'); break; }
        if (act === 'sync-mode') SYNC.setConfig({ mode: a.v });
        if (act === 'sync-auto') SYNC.setConfig({ autoSync: a.v === '1' });
        if (act === 'sync-default') {
          SYNC.setConfig({ defaultEntryMode: a.v, overrides: {} });
          toast('默认录入方式已更新', a.v === 'backend' ? '钉钉表单优先，前端不重复填' : '前端填单优先，自动回写', 'ok');
        }
        if (act === 'sync-mode-mod') SYNC.setMode(a.mod, a.v);
        if (act === 'flow-toggle') SYNC.toggleFlow(a.id);
        if (act === 'conflict') SYNC.resolveConflict(a.id, a.v);
        if (act === 'flow-run') {
          SYNC.runFlow(a.id).then(function (res) {
            toast(res.title, res.detail, res.ok ? 'ok' : 'warn'); render();
          });
          break;
        }
        render(); break;
      }
      case 'contract-download':
        download('api-contract.json', JSON.stringify(CONTRACT, null, 2), 'application/json');
        toast('契约已下载', '44 模块 / 144 张 SQL 原表 / 完整端点与字段映射', 'ok'); break;
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
        try {
          download(MOD[a.mod].name + '.csv', DB.exportCSV(a.mod, DB.role().id), 'text/csv;charset=utf-8');
          toast('已导出 CSV', MOD[a.mod].name, 'ok');
        } catch (err) { toast('导出被拒绝', err.message, 'error'); }
        break;
      case 'export-board': {
        var r = DB.role();
        if (!r.policy.boardExport) { toast('导出被拒绝', '当前角色无汇总导出权限', 'error'); break; }
        var lines = ['业务域,模块,单据数'];
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
        try {
          download('启能力ERP-本地数据备份.json', DB.exportJSON(), 'application/json');
          toast('备份已导出', '包含单据、日志、通知与附件', 'ok');
        } catch (err) { toast('导出被拒绝', err.message, 'error'); }
        break;
      case 'settings-import': {
        var fi = document.createElement('input');
        fi.type = 'file'; fi.accept = '.json,application/json'; fi.style.display = 'none';
        document.body.appendChild(fi);
        fi.addEventListener('change', function () {
          var file = fi.files[0]; if (!file) { fi.remove(); return; }
          var rd = new FileReader();
          rd.onload = function () {
            try { DB.importJSON(rd.result); toast('导入成功', '本地数据已还原', 'ok'); render(); }
            catch (err) { toast('导入被拒绝', err.message, 'error'); }
            fi.remove();
          };
          rd.readAsText(file);
        });
        fi.click(); break;
      }
      case 'settings-reset':
        if (window.confirm('确认重置演示数据？将清空本地新增的单据、日志与附件，且不可撤销。')) {
          try { DB.reset(); toast('已重置', '演示数据恢复到初始状态', 'ok'); render(); }
          catch (err) { toast('重置被拒绝', err.message, 'error'); }
        }
        break;
    }
  }

  function onInput(e) {
    var el = e.target;
    if (el.id === 'globalSearch') { globalSearch(el.value); return; }
    if (el.id === 'docQ') {
      UI.docQ = el.value; UI.docPage = 1;
      replaceHash('docs', { s: UI.docSt, g: UI.docStage, p: 1 });
      render();
      var dq = $('docQ');
      if (dq) { dq.focus(); try { dq.setSelectionRange(dq.value.length, dq.value.length); } catch (e) {} }
      return;
    }
    if (el.id === 'docStageSel') {
      UI.docStage = el.value; UI.docPage = 1;
      replaceHash('docs', { s: UI.docSt, g: UI.docStage, p: 1 }); render(); return;
    }
    if (el.id === 'contractModSel') { UI.contractMod = el.value; render(); return; }
    if (el.id === 'syncToken') { SYNC.setConfig({ token: el.value.trim() }); return; }
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
      menu.innerHTML = '<div class="role-menu-head">演示身份切换器 · 非业务权限，仅用于对比隔离效果</div>' +
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
