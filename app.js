/* ==========================================================================
   启能力 ERP · 工作台 UI (v5)
   面向使用者：一个角色一条路，一屏一件事，界面上不出现任何后端实现细节。
   - 侧栏只渲染当前角色被授权的环节，其余功能完全没有入口
   - 路由 / 数据 / 按钮 / 搜索结果四层都走 engine.js 的统一鉴权
   - 后端已有在线表单的业务，默认给链接 + 手机扫码，不重复填；也可切换本页填写
   纯静态、零外部依赖、hash 路由，数据由 engine.js 存于 localStorage。
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.ERP_CONFIG, DB = window.ERP_DB, SYNC = window.ERP_SYNC, QR = window.ERP_QR || {};
  var MOD = DB.MOD, ROLE = DB.ROLE, U = DB.util;
  var $ = function (id) { return document.getElementById(id); };
  var STAGES = CFG.stages, STAGE_BY_ID = {}, MODULE_STAGE = {};
  STAGES.forEach(function (s, i) { STAGE_BY_ID[s.id] = s; s.index = i; s.modules.forEach(function (k) { MODULE_STAGE[k] = s.id; }); });
  var FORM = CFG.formLinks || {};

  var UI = {
    q: '', st: 'all', page: 1, size: 10,
    docQ: '', docSt: 'all', docPage: 1, docSize: 12,
    form: { key: '', id: '', atts: {} },
    detail: { key: '', id: '' },
    syncTab: 'flows'
  };

  /* ------------------------------------------------------------ 小工具 */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function txt(v) { return U.text(v); }
  function money(n) { return '¥' + (Number(n) || 0).toLocaleString('zh-CN', { maximumFractionDigits: 2 }); }
  function moneyShort(n) {
    n = Number(n) || 0;
    if (Math.abs(n) >= 100000000) return '¥' + (n / 100000000).toFixed(2) + '亿';
    if (Math.abs(n) >= 10000) return '¥' + (n / 10000).toFixed(1) + '万';
    return money(n);
  }
  function d10(s) { return String(s || '').slice(0, 10); }
  function dt(s) { return String(s || '').replace('T', ' ').slice(0, 16); }
  var NAME_ALIAS = {
    '系统导航与流程说明': '流程说明', '数据字典与审批流': '审批流程',
    '用户与角色': '成员与权限', '通知与操作日志': '消息记录',
    '经营看板与预警': '经营预警', '购物车与商城公告': '商城公告',
    '装柜柜次与核对闸门': '装柜柜次', '装柜拍照标准与槽位': '装柜拍照标准',
    '库存余额与预警': '库存预警', '扣款与付款执行': '付款执行'
  };
  function pretty(n) {
    var s = String(n || '').replace(/^\d+\s+/, '')
      .replace(/\s+(PR|PO|RFQ|ASN|BI|AI|ERP)\b/g, '')
      .replace(/\s*与\s*(ASN|RFQ|BI|AI)\b/g, '').trim();
    return NAME_ALIAS[s] || s;
  }
  function clean(s) {
    return String(s || '').replace(/AI\s*自动辅助判断/g, '自动辅助判断')
      .replace(/钉钉\s*AI\s*表格/g, '在线表格').replace(/AI\s*表格/g, '在线表格')
      .replace(/本地演示模式[：:·]?\s*文件仅保存在当前浏览器[，,]?\s*/g, '')
      .replace(/支持多文件/g, '支持上传多个文件')
      .replace(/请填写对应数据表/g, '请填写名称')
      .replace(/钉钉/g, '在线');
  }
  function stInfo(s) {
    return ({ draft: ['草稿', 'pill-draft'], running: ['办理中', 'pill-running'],
      done: ['已完成', 'pill-done'], reject: ['已退回', 'pill-reject'] })[s] || ['草稿', 'pill-draft'];
  }
  function pill(s) { var i = stInfo(s); return '<span class="pill ' + i[1] + '">' + i[0] + '</span>'; }
  function toast(title, detail, kind) {
    var w = $('toastWrap'), d = document.createElement('div');
    d.className = 'toast ' + (kind || '');
    d.innerHTML = '<b>' + esc(title) + '</b>' + (detail ? '<small>' + esc(detail) + '</small>' : '');
    w.appendChild(d);
    setTimeout(function () { d.style.opacity = '0'; setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 220); }, 3400);
  }
  var ICONS = {
    home: '<path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    inbox: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5A7 7 0 0 0 19 12z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    sync: '<path d="M20 11a8 8 0 0 0-14-5L4 8M4 4v4h4M4 13a8 8 0 0 0 14 5l2-2M20 20v-4h-4"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM19 19h2v2h-2zM14 19h2v2h-2zM19 14h2v3h-2z"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function svg(n, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 17) + '" height="' + (size || 17) +
      '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[n] || ICONS.file) + '</svg>';
  }

  /* ------------------------------------------------------------ 权限助手（唯一入口） */
  function cur() { return DB.role(); }
  function rid() { return cur().id; }
  function can(key, action) { return DB.can(rid(), key, action); }
  function canSys(f) { return DB.canSystem(rid(), f); }
  function vis(key) { return can(key, 'view'); }
  function writable(key) {
    return ['create', 'edit', 'submit', 'approve', 'reject'].some(function (a) { return can(key, a); });
  }
  function isAdmin() { return canSys('board') && canSys('settings'); }
  function stageOf(key) { return STAGE_BY_ID[MODULE_STAGE[key]] || null; }
  function stageAllowed(s) {
    if (!s) return false;
    // 环节按职责分工开放：只有被列为负责人的角色才会在导航里看到入口
    if (rid() !== 'admin' && (s.owners || []).indexOf(rid()) < 0) return false;
    return s.modules.some(function (k) { return vis(k) && writable(k); });
  }
  function myStages() { return STAGES.filter(stageAllowed); }
  function stageModules(s) { return s.modules.filter(vis); }
  function myModules() { return DB.visibleModules(rid()); }
  function primaryStage() { return STAGE_BY_ID[CFG.roleStage[rid()]] || myStages()[0] || STAGES[0]; }
  function formOf(key) { return FORM[key] || null; }
  function qrOf(key) { return QR[key] || null; }
  function backendFirst(key) { return !!(formOf(key) && SYNC.modeOf(key) === 'backend'); }

  /* ------------------------------------------------------------ 路由 */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, ''), seg = h.split('?'), parts = seg[0].split('/'), q = {};
    (seg[1] || '').split('&').forEach(function (kv) {
      if (!kv) return; var p = kv.split('='); q[p[0]] = decodeURIComponent(p[1] || '');
    });
    return { page: parts[0] || 'home', a: parts[1] || '', q: q };
  }
  function go(path, q) {
    var s = '#/' + path, kv = q ? Object.keys(q).filter(function (k) { return q[k] !== '' && q[k] != null; })
      .map(function (k) { return k + '=' + encodeURIComponent(q[k]); }).join('&') : '';
    if (kv) s += '?' + kv;
    location.hash = s;
  }
  function replaceHash(path) {
    try { history.replaceState(null, '', '#/' + path); } catch (e) { location.hash = '#/' + path; }
  }
  function backOf(route) {
    if (route.page === 'stage') return 'home';
    if (route.page === 'm') { var s = stageOf(route.a); return s ? 'stage/' + s.id : 'docs'; }
    if (route.page === 'docs') return 'home';
    return 'home';
  }

  /* ------------------------------------------------------------ 登录 */
  function initLogin() {
    $('loginRoles').innerHTML = CFG.roles.map(function (r) {
      return '<button class="role-quick" data-act="login-role" data-role="' + r.id + '" title="' + esc(shortRole(r)) + '">' +
        '<i style="background:' + r.color + '"></i>' + esc(r.name) + '<small>' + esc(shortRole(r)) + '</small></button>';
    }).join('');
  }
  function shortRole(r) {
    return ({ admin: '全部环节与经营总览', buyer: '需求 · 寻源 · 合同订单',
      supplier: '准入 · 报价 · 送货', warehouse: '收货 · 入库 · 装柜',
      finance: '对账 · 发票 · 付款', quality: '来料检验 · 整改' })[r.id] || r.person;
  }
  function doLogin(roleId) {
    DB.login(roleId);
    UI.form = { key: '', id: '', atts: {} }; UI.detail = { key: '', id: '' };
    UI.q = ''; UI.st = 'all'; UI.page = 1; UI.docQ = ''; UI.docSt = 'all'; UI.docPage = 1;
    closeDrawer(); closeModal();
    $('roleMenu').classList.add('hidden'); $('gsResults').classList.add('hidden');
    $('globalSearch').value = '';
    $('loginView').classList.add('hidden'); $('appView').classList.remove('hidden');
    go('home'); render();
    toast('已进入「' + ROLE[roleId].name + '」工作台', shortRole(ROLE[roleId]), 'ok');
  }
  function logout() {
    DB.logout(); $('appView').classList.add('hidden'); $('loginView').classList.remove('hidden');
    $('roleMenu').classList.add('hidden'); closeDrawer();
  }

  /* ------------------------------------------------------------ 框架 */
  function navItem(page, icon, label, count, active) {
    return '<button class="sb-item ' + (active ? 'active' : '') + '" data-act="nav" data-href="' + page + '">' +
      '<span class="sb-ico">' + svg(icon) + '</span><span class="sb-label">' + esc(label) + '</span>' +
      (count ? '<span class="sb-count">' + esc(count) + '</span>' : '') + '</button>';
  }
  function shell(route) {
    var r = cur(), n = DB.unread(r.id);
    $('sbSlogan').textContent = shortRole(r);
    $('topRole').textContent = r.name; $('sbRole').textContent = r.name; $('sbPerson').textContent = r.person;
    $('topAvatar').textContent = r.person.slice(0, 1); $('sbAvatar').textContent = r.person.slice(0, 1);
    $('topAvatar').style.background = r.color; $('sbAvatar').style.background = r.color;
    $('bellBadge').textContent = n > 99 ? '99+' : n;
    $('bellBadge').classList.toggle('hidden', n === 0);

    var nav = '<div class="sb-group-label">工作台</div>' +
      navItem('home', 'home', '我的工作', '', route.page === 'home') +
      navItem('docs', 'inbox', '我的单据', '', route.page === 'docs') +
      navItem('notify', 'bell', '通知', n || '', route.page === 'notify');

    var stages = myStages();
    if (stages.length) {
      nav += '<div class="sb-group-label">我负责的环节</div>';
      stages.forEach(function (s) {
        nav += navItem('stage/' + s.id, 'file', s.name, '', route.page === 'stage' && route.a === s.id);
      });
    }
    if (isAdmin()) {
      nav += '<div class="sb-group-label">管理</div>' +
        navItem('board', 'chart', '经营总览', '', route.page === 'board') +
        navItem('sync', 'sync', '数据同步', '', route.page === 'sync') +
        navItem('settings', 'gear', '系统设置', '', route.page === 'settings');
    }
    nav += '<div class="sb-group-label">账户</div>' +
      navItem('permissions', 'shield', '我的权限', '', route.page === 'permissions');
    $('sbNav').innerHTML = nav;

    var crumbs = crumbOf(route);
    $('crumb').innerHTML = crumbs.map(function (c, i) {
      var last = i === crumbs.length - 1;
      return (i ? '<span class="sep">/</span>' : '') +
        (last ? '<b>' + esc(c[0]) + '</b>' : '<button data-act="nav" data-href="' + esc(c[1]) + '">' + esc(c[0]) + '</button>');
    }).join('');
  }
  function crumbOf(route) {
    if (route.page === 'home') return [['我的工作', 'home']];
    if (route.page === 'docs') return [['我的工作', 'home'], ['我的单据', 'docs']];
    if (route.page === 'notify') return [['我的工作', 'home'], ['通知', 'notify']];
    if (route.page === 'permissions') return [['我的工作', 'home'], ['我的权限', 'permissions']];
    if (route.page === 'stage') {
      var s = STAGE_BY_ID[route.a];
      return [['我的工作', 'home'], [s ? s.name : '环节', 'stage/' + (s ? s.id : '')]];
    }
    if (route.page === 'm') {
      var m = MOD[route.a], st = stageOf(route.a);
      return [['我的工作', 'home'], [st ? st.name : '我的单据', st ? 'stage/' + st.id : 'docs'],
        [m ? pretty(m.name) : '单据', 'm/' + route.a]];
    }
    return [['我的工作', 'home'], [({ board: '经营总览', sync: '数据同步', settings: '系统设置' })[route.page] || '工作台', route.page]];
  }
  function head(title, desc, back, actions) {
    return '<div class="page-head">' +
      (back ? '<button class="back-btn" data-act="nav" data-href="' + esc(back) + '">' + svg('back', 15) + '返回</button>' : '') +
      '<div class="head-text"><h2>' + esc(title) + '</h2><p>' + esc(desc) + '</p></div>' +
      (actions ? '<div class="head-actions">' + actions + '</div>' : '') + '</div>';
  }
  function emptyBox(title, desc) {
    return '<div class="empty"><div class="ico">' + svg('inbox', 20) + '</div><h4>' + esc(title) + '</h4><p>' + esc(desc) + '</p></div>';
  }
  function denyPage() {
    return head('暂时无法访问', '这个功能不属于你当前的身份', 'home') +
      '<div class="deny-box"><div class="lock">' + svg('lock', 22) + '</div>' +
      '<h3>此入口已对当前角色关闭</h3>' +
      '<p>你正在使用「' + esc(cur().name) + '」身份。系统按角色开放功能，未授权的功能不会出现在导航里。</p>' +
      '<button class="btn btn-primary" data-act="nav" data-href="home">回到我的工作</button></div>';
  }

  /* ------------------------------------------------------------ 渲染入口 */
  function render() {
    var s = DB.session();
    if (!s || !ROLE[s.roleId]) {
      $('loginView').classList.remove('hidden'); $('appView').classList.add('hidden');
      return;
    }
    $('loginView').classList.add('hidden'); $('appView').classList.remove('hidden');
    var route = parseHash(), denied = false;
    if (route.page === 'board' || route.page === 'sync' || route.page === 'settings') {
      if (!isAdmin()) denied = true;
    } else if (route.page === 'stage') {
      if (!stageAllowed(STAGE_BY_ID[route.a])) denied = true;
    } else if (route.page === 'm') {
      if (!vis(route.a)) denied = true;
    } else if (['home', 'docs', 'notify', 'permissions'].indexOf(route.page) < 0) {
      denied = true;
    }
    if (denied) { replaceHash('home'); route = { page: 'home', a: '', q: {} }; }
    shell(route);
    var html = '';
    switch (route.page) {
      case 'docs': html = pageDocs(); break;
      case 'stage': html = pageStage(route.a); break;
      case 'm': html = pageModule(route.a); break;
      case 'notify': html = pageNotify(); break;
      case 'permissions': html = pagePermissions(); break;
      case 'board': html = pageBoard(); break;
      case 'sync': html = pageSync(); break;
      case 'settings': html = pageSettings(); break;
      default: html = pageHome();
    }
    $('content').innerHTML = '<div class="page">' + html + '</div>';
    $('content').scrollTop = 0;
  }

  /* ------------------------------------------------------------ 我的工作 */
  function pageHome() {
    var r = cur(), st = DB.statsFor(r.id), todos = DB.todoList(r.id, 5);
    var ps = primaryStage(), nextIdx = Math.min(ps.index + 1, STAGES.length - 1);
    var h = new Date().getHours();
    var greet = h < 11 ? '早上好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好';
    var d = new Date();
    var dateStr = d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日';

    // 主卡片聚焦在当前环节最需要的一件事；已提交过的角色优先看进度，不再被推去重复填表
    var entry = MOD[ps.entry] ? ps.entry : (stageModules(ps)[0] || '');
    var em = MOD[entry], f = formOf(entry);
    var mineN = em && vis(entry) ? DB.records(entry).length : 0;
    var stageN = 0;
    stageModules(ps).forEach(function (k) { stageN += DB.records(k).length; });
    var already = !!(em && f && backendFirst(entry) && (mineN > 0 || stageN > 0));
    var intro = already
      ? (mineN > 0 ? '你已经提交过 ' + mineN + ' 张相关单据，这里可以直接看办理进度，不需要重复填写。'
                   : '这个环节已有单据在流转，点下面查看办理进度，不需要重复填写。')
      : ps.desc;

    var html = '<div class="hero"><div><h2>' + greet + '，' + esc(r.person) + '</h2>' +
      '<p>' + (already ? '你负责「' + esc(ps.name) + '」环节，这里可以跟进办理进度。'
                       : '你负责「' + esc(ps.name) + '」环节。把这一步办完，流程会自动交给下一位同事。') + '</p></div>' +
      '<div class="hero-side"><div class="date">' + dateStr + '</div>' +
      '<div class="role-tag">' + esc(r.name) + '</div></div></div>';

    html += '<div class="stat-row">' +
      '<div class="stat warn"><div class="lb"><i></i>待我处理</div><div class="num">' + todos.length + '</div><div class="foot">需要你提交或审批的单据</div></div>' +
      '<div class="stat"><div class="lb"><i></i>我的单据</div><div class="num">' + st.total + '</div><div class="foot">当前身份可见的全部单据</div></div>' +
      '<div class="stat ok"><div class="lb"><i></i>已完成</div><div class="num">' + st.done + '</div><div class="foot">流程已办结</div></div></div>';

    // 下一步：单一焦点
    html += '<div class="next-card"><div class="nc-top"><span class="nc-step">第 ' + (ps.index + 1) + ' 步</span>' +
      '<h3>' + esc(ps.name) + '</h3></div>' +
      '<p>' + esc(intro) + '</p><div class="nc-actions">';
    if (already) {
      html += '<button class="btn btn-primary btn-lg" data-act="nav" data-href="' +
        (mineN > 0 ? 'm/' + entry : 'stage/' + ps.id) + '">' + svg('file', 15) +
        (mineN > 0 ? '查看我提交的单据' : '查看本环节单据') + '</button>' +
        (qrOf(entry) ? '<button class="btn btn-lg" data-act="qr" data-mod="' + entry + '">' + svg('qr', 15) + '扫码补填一张</button>' : '') +
        '<button class="link" data-act="switch-mode" data-mod="' + entry + '" data-v="both">想在本页填写？</button>' +
        '<button class="link small" data-act="open-link" data-url="' + esc(f.url) + '">打开在线表单 ↗</button>';
    } else if (em && f && backendFirst(entry)) {
      html += '<button class="btn btn-primary btn-lg" data-act="open-link" data-url="' + esc(f.url) + '">' + svg('external', 15) + '打开在线表单</button>' +
        (qrOf(entry) ? '<button class="btn btn-lg" data-act="qr" data-mod="' + entry + '">' + svg('qr', 15) + '手机扫码填写</button>' : '') +
        '<button class="link" data-act="switch-mode" data-mod="' + entry + '" data-v="both">想直接在本页填写？</button>';
    } else if (em) {
      html += (can(entry, 'create') ? '<button class="btn btn-primary btn-lg" data-act="open-form" data-mod="' + entry + '">' + svg('plus', 15) + '新建' + esc(pretty(em.name)) + '</button>' : '') +
        '<button class="btn btn-lg" data-act="nav" data-href="m/' + entry + '">查看我的单据</button>' +
        (f && qrOf(entry) ? '<button class="btn btn-lg" data-act="qr" data-mod="' + entry + '">' + svg('qr', 15) + '手机扫码填写</button>' : '');
    }
    html += '</div><div class="nc-note"><i></i>办结后进入「' + esc(STAGES[nextIdx].name) + '」，由对应同事继续处理</div></div>';

    // 待办 + 通知
    html += '<div class="section-title"><h3>待我处理</h3><span class="hint">只显示与你有关、且你有权限办理的单据</span></div>';
    html += '<div class="two-col"><div class="list-card">';
    if (!todos.length) html += emptyBox('暂时没有待办', '有新单据流转到你这里时会出现在这里');
    else todos.forEach(function (t) {
      html += '<div class="list-row" data-act="open-detail" data-mod="' + t.module.key + '" data-id="' + t.rec.id + '">' +
        '<div class="lr-main"><b>' + esc(txt(t.rec.data[t.module.titleField]) || t.rec.no) + '</b>' +
        '<small>' + esc(pretty(t.module.name)) + ' · ' + esc(t.rec.no) + '</small></div>' +
        '<span class="pill pill-running">办理中</span><span class="lr-time">' + esc(d10(t.rec.updatedAt)) + '</span></div>';
    });
    html += '</div><div class="list-card"><div class="card-head"><h3>最近消息</h3>' +
      '<button class="link small" data-act="nav" data-href="notify">查看全部</button></div>';
    var ntfs = DB.notificationsFor(r.id).slice(0, 4);
    if (!ntfs.length) html += emptyBox('暂无消息', '流程状态变化时会自动通知你');
    else ntfs.forEach(function (n) {
      html += '<div class="list-row" data-act="open-notice" data-id="' + n.id + '"><div class="lr-main">' +
        '<b>' + esc(n.title) + '</b><small>' + esc(n.text) + '</small></div>' +
        '<span class="lr-time">' + esc(d10(n.ts)) + '</span></div>';
    });
    html += '</div></div>';

    // 全流程进度（只读，非授权环节不可点）
    html += '<div class="section-title"><h3>全流程</h3><span class="hint">灰色环节由其他角色负责，你无法进入</span></div>' +
      '<div class="list-card"><div class="flow-rail">';
    STAGES.forEach(function (s, i) {
      var allowed = stageAllowed(s), isPrimary = s.id === ps.id;
      html += '<div class="flow-node ' + (isPrimary ? 'mine ' : '') + (allowed ? 'clickable' : 'locked') + '"' +
        (allowed ? ' data-act="nav" data-href="stage/' + s.id + '"' : '') + '>' +
        '<div class="fn-dot">' + (isPrimary ? '当前' : (i + 1)) + '</div><b>' + esc(s.name) + '</b>' +
        '<small>' + (allowed ? (isPrimary ? '我的环节' : '可进入') : '其他角色') + '</small></div>';
    });
    html += '</div></div>';
    return html;
  }

  /* ------------------------------------------------------------ 环节页 */
  function pageStage(sid) {
    var s = STAGE_BY_ID[sid], mods = stageModules(s);
    var next = STAGES[Math.min(s.index + 1, STAGES.length - 1)];
    var html = head(s.name, '第 ' + (s.index + 1) + ' 步 · 这一步要做的事都在这里', 'home');
    html += '<div class="stage-intro"><h3>' + esc(s.output) + '</h3><p>' + esc(s.desc) + '</p>' +
      '<div class="io-row"><div>来自 <b>' + esc(s.input) + '</b></div>' +
      '<div>完成后交给 <b>' + esc(next.name) + '</b></div>' +
      '<div>负责角色 <b>' + s.owners.map(function (o) { return ROLE[o] ? ROLE[o].name : o; }).join('、') + '</b></div></div></div>';
    html += '<div class="section-title"><h3>本环节业务</h3><span class="hint">共 ' + mods.length + ' 项 · 只显示你有权限的内容</span></div>';
    if (!mods.length) return html + '<div class="list-card">' + emptyBox('暂无可查看的业务', '该环节对当前角色没有开放的条目') + '</div>';
    html += '<div class="tile-grid">';
    mods.forEach(function (k) { html += tile(k); });
    html += '</div>';
    // 本环节单据
    var rows = [];
    mods.forEach(function (k) {
      DB.records(k).forEach(function (rec) { rows.push({ k: k, rec: rec }); });
    });
    rows.sort(function (a, b) { return String(b.rec.updatedAt).localeCompare(String(a.rec.updatedAt)); });
    html += '<div class="section-title"><h3>本环节单据</h3><span class="hint">最近 ' + Math.min(rows.length, 6) + ' 条</span></div>' +
      '<div class="list-card">';
    if (!rows.length) html += emptyBox('还没有单据', '用上面的入口发起第一张单据');
    else rows.slice(0, 6).forEach(function (x) {
      html += '<div class="list-row" data-act="open-detail" data-mod="' + x.k + '" data-id="' + x.rec.id + '">' +
        '<div class="lr-main"><b>' + esc(txt(x.rec.data[MOD[x.k].titleField]) || x.rec.no) + '</b>' +
        '<small>' + esc(pretty(MOD[x.k].name)) + ' · ' + esc(x.rec.no) + '</small></div>' +
        pill(x.rec.status) + '<span class="lr-time">' + esc(d10(x.rec.updatedAt)) + '</span></div>';
    });
    html += '</div>';
    return html;
  }
  function tile(k) {
    var m = MOD[k], f = formOf(k), n = DB.records(k).length;
    var desc = clean(m.form && m.form.desc ? m.form.desc : '在这里登记与跟进' + pretty(m.name) + '，提交后自动流转到下一环节。');
    var html = '<div class="tile"><div class="tile-top"><h4>' + esc(pretty(m.name)) + '</h4>' +
      (f ? '<span class="tile-badge">在线表单</span>' : '<span class="tile-badge gray">本页填写</span>') + '</div>' +
      '<p>' + esc(desc.slice(0, 46)) + '</p><div class="tile-actions">';
    if (f && backendFirst(k)) {
      html += '<button class="btn btn-primary btn-sm" data-act="open-link" data-url="' + esc(f.url) + '">' + svg('external', 14) + '打开表单</button>';
      if (qrOf(k)) html += '<button class="btn btn-sm" data-act="qr" data-mod="' + k + '">' + svg('qr', 14) + '扫码填写</button>';
      html += '<button class="btn btn-sm" data-act="nav" data-href="m/' + k + '">查看单据 ' + n + '</button>';
    } else {
      if (can(k, 'create')) html += '<button class="btn btn-primary btn-sm" data-act="open-form" data-mod="' + k + '">' + svg('plus', 14) + '新建</button>';
      html += '<button class="btn btn-sm" data-act="nav" data-href="m/' + k + '">查看单据 ' + n + '</button>';
      if (f && qrOf(k)) html += '<button class="btn btn-sm" data-act="qr" data-mod="' + k + '">' + svg('qr', 14) + '扫码填写</button>';
    }
    html += '</div>';
    if (f) {
      html += '<div class="tile-hint">' + (backendFirst(k) ?
        '钉钉已收集这类单据，无需在本页重复填写。' :
        '本页填写的内容会自动进入同步队列。') +
        ' <button class="link" data-act="switch-mode" data-mod="' + k + '" data-v="' +
        (backendFirst(k) ? 'both' : 'backend') + '">' + (backendFirst(k) ? '改在本页填写' : '恢复在线表单优先') + '</button></div>';
    }
    return html + '</div>';
  }

  /* ------------------------------------------------------------ 单据列表 */
  function allVisibleRows(query, status) {
    var out = [];
    myModules().forEach(function (k) {
      DB.records(k).forEach(function (rec) { out.push({ k: k, rec: rec }); });
    });
    if (status && status !== 'all') out = out.filter(function (x) { return x.rec.status === status; });
    if (query) {
      var q = query.toLowerCase();
      out = out.filter(function (x) {
        return (x.rec.no + ' ' + pretty(MOD[x.k].name) + ' ' + txt(x.rec.data[MOD[x.k].titleField])).toLowerCase().indexOf(q) >= 0;
      });
    }
    out.sort(function (a, b) { return String(b.rec.updatedAt).localeCompare(String(a.rec.updatedAt)); });
    return out;
  }
  function segBar(st) {
    return '<div class="seg">' + [['all', '全部'], ['draft', '草稿'], ['running', '办理中'], ['done', '已完成'], ['reject', '已退回']]
      .map(function (x) { return '<button data-act="filter" data-st="' + x[0] + '" class="' + (st === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div>';
  }
  function tableOf(rows, page, size, withModule) {
    var total = rows.length, pages = Math.max(1, Math.ceil(total / size));
    page = Math.min(Math.max(1, page), pages);
    var part = rows.slice((page - 1) * size, page * size);
    var h = '<div class="tbl-wrap"><table class="tbl"><thead><tr>' +
      '<th style="width:150px">单据编号</th><th>' + (withModule ? '所属业务' : '名称') + '</th>' +
      (withModule ? '<th>名称</th>' : '') + '<th style="width:90px">状态</th>' +
      '<th style="width:110px">更新时间</th><th style="width:70px" class="right">操作</th></tr></thead><tbody>';
    if (!part.length) return '<div class="tbl-wrap">' + emptyBox('没有找到单据', '换个关键词或筛选条件试试') + '</div>';
    part.forEach(function (x) {
      var m = MOD[x.k], t = txt(x.rec.data[m.titleField]) || '—';
      h += '<tr data-act="open-detail" data-mod="' + x.k + '" data-id="' + x.rec.id + '">' +
        '<td class="num-cell">' + esc(x.rec.no) + '</td>' +
        '<td>' + (withModule ? esc(pretty(m.name)) : '<b>' + esc(t) + '</b>') + '</td>' +
        (withModule ? '<td><b>' + esc(t) + '</b></td>' : '') +
        '<td>' + pill(x.rec.status) + '</td><td class="num-cell">' + esc(d10(x.rec.updatedAt)) + '</td>' +
        '<td class="right"><button class="mini-btn" data-act="open-detail" data-mod="' + x.k + '" data-id="' + x.rec.id + '">查看</button></td></tr>';
    });
    h += '</tbody></table><div class="pager"><span>共 ' + total + ' 条 · 第 ' + page + ' / ' + pages + ' 页</span>' +
      '<span><button class="btn btn-sm" data-act="page" data-p="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + '>上一页</button> ' +
      '<button class="btn btn-sm" data-act="page" data-p="' + (page + 1) + '"' + (page >= pages ? ' disabled' : '') + '>下一页</button></span></div></div>';
    return h;
  }
  function pageDocs() {
    var rows = allVisibleRows(UI.docQ, UI.docSt);
    var html = head('我的单据', '这里只汇总你有权查看的单据', 'home');
    html += '<div class="toolbar"><input class="search-input" id="listSearch" placeholder="搜索单据编号或名称" value="' + esc(UI.docQ) + '">' +
      segBar(UI.docSt) + '</div>' + tableOf(rows, UI.docPage, UI.docSize, true);
    return html;
  }
  function pageModule(k) {
    var m = MOD[k], f = formOf(k), st = stageOf(k);
    var rows = DB.records(k).filter(function (rec) {
      if (UI.st !== 'all' && rec.status !== UI.st) return false;
      if (UI.q) {
        var q = UI.q.toLowerCase();
        return (rec.no + ' ' + txt(rec.data[m.titleField])).toLowerCase().indexOf(q) >= 0;
      }
      return true;
    }).map(function (rec) { return { k: k, rec: rec }; })
      .sort(function (a, b) { return String(b.rec.updatedAt).localeCompare(String(a.rec.updatedAt)); });
    var acts = '';
    if (f) acts += '<button class="btn" data-act="open-link" data-url="' + esc(f.url) + '">' + svg('external', 15) + '打开在线表单</button>';
    if (f && qrOf(k)) acts += '<button class="btn" data-act="qr" data-mod="' + k + '">' + svg('qr', 15) + '扫码填写</button>';
    if (!backendFirst(k) && can(k, 'create')) acts += '<button class="btn btn-primary" data-act="open-form" data-mod="' + k + '">' + svg('plus', 15) + '新建单据</button>';
    if (can(k, 'export') && isAdmin()) acts += '<button class="btn" data-act="export" data-mod="' + k + '">导出</button>';
    var html = head(pretty(m.name), (st ? '第 ' + (st.index + 1) + ' 步 · ' + st.name + ' · ' : '') + '共 ' + rows.length + ' 张单据',
      st ? 'stage/' + st.id : 'docs', acts);
    if (f && backendFirst(k)) {
      html += '<div class="mode-strip"><div class="ms-text"><b>这类单据由在线表单收集</b>' +
        '<small>在钉钉表单里填过就无需重复录入；同步后会自动出现在这里。</small></div>' +
        '<button class="link" data-act="switch-mode" data-mod="' + k + '" data-v="both">改在本页填写</button></div>';
    } else if (f) {
      html += '<div class="mode-strip"><div class="ms-text"><b>本页填写已开启</b>' +
        '<small>保存后自动进入同步队列，与在线表单收集的数据保持一致。</small></div>' +
        '<button class="link" data-act="switch-mode" data-mod="' + k + '" data-v="backend">恢复在线表单优先</button></div>';
    }
    html += '<div class="toolbar"><input class="search-input" id="listSearch" placeholder="搜索单据编号或名称" value="' + esc(UI.q) + '">' +
      segBar(UI.st) + '</div>' + tableOf(rows, UI.page, UI.size, false);
    return html;
  }

  /* ------------------------------------------------------------ 通知 / 权限 / 设置 */
  function pageNotify() {
    var list = DB.notificationsFor(rid());
    var html = head('通知', '与你相关的流程变化都会出现在这里', 'home',
      '<button class="btn" data-act="read-all">全部标为已读</button>');
    html += '<div class="list-card">';
    if (!list.length) html += emptyBox('暂无通知', '单据提交、通过或退回时会自动提醒');
    else list.forEach(function (n) {
      html += '<div class="notice-row ' + (n.read[rid()] ? '' : 'unread') + '" data-act="open-notice" data-id="' + n.id + '">' +
        '<span class="nr-dot"></span><div class="nr-body"><b>' + esc(n.title) + '</b><p>' + esc(n.text) + '</p>' +
        '<small>' + esc(dt(n.ts)) + '</small></div></div>';
    });
    return html + '</div>';
  }
  function pagePermissions() {
    var r = cur(), stages = myStages(), mods = myModules();
    var html = head('我的权限', '系统按身份开放功能，未授权的内容不会出现在导航里', 'home');
    html += '<div class="perm-head"><span class="avatar" style="background:' + r.color + '">' + esc(r.person.slice(0, 1)) + '</span>' +
      '<div><h3>' + esc(r.name) + ' · ' + esc(r.person) + '</h3><p>' + esc(shortRole(r)) + '</p></div></div>';
    html += '<div class="section-title"><h3>我能进入的环节</h3></div><div class="list-card"><div class="chips" style="padding:18px 20px">' +
      (stages.length ? stages.map(function (s) { return '<span class="chip on">' + esc(s.name) + '</span>'; }).join('') : '<span class="chip">暂无</span>') +
      '</div></div>';
    var locked = STAGES.filter(function (s) { return !stageAllowed(s); });
    if (locked.length) {
      html += '<div class="section-title"><h3>已屏蔽的环节</h3><span class="hint">导航里没有入口，直接输地址也进不去</span></div>' +
        '<div class="list-card"><div class="chips" style="padding:18px 20px">' +
        locked.map(function (s) {
          return '<span class="chip off">' + svg('lock', 12) + esc(s.name) + '</span>';
        }).join('') + '</div></div>';
    }
    html += '<div class="section-title"><h3>我能看到的业务</h3><span class="hint">' + mods.length + ' 项</span></div>' +
      '<div class="list-card"><div class="chips" style="padding:18px 20px">' +
      mods.map(function (k) { return '<span class="chip">' + esc(pretty(MOD[k].name)) + '</span>'; }).join('') + '</div></div>';
    html += '<div class="section-title"><h3>说明</h3></div><div class="card card-pad small muted">' +
      '不同身份看到的功能、单据范围与可办理的操作都不同。未授权的功能在整个系统中都没有入口；' +
      '直接输入地址也会被挡回工作台。需要开通其他权限，请联系管理员调整身份。</div>';
    return html;
  }
  function pageSettings() {
    var html = head('系统设置', '演示数据的备份与恢复', 'home');
    html += '<div class="settings-grid">' +
      '<div class="card set-card"><h4>导出备份</h4><p>把当前浏览器里的全部单据下载成一个备份文件。</p>' +
      '<button class="btn btn-primary" data-act="backup">下载备份</button></div>' +
      '<div class="card set-card"><h4>导入备份</h4><p>用之前下载的备份文件恢复单据与办理记录。</p>' +
      '<button class="btn" data-act="restore">选择备份文件</button><input type="file" id="restoreFile" accept=".json" class="hidden"></div>' +
      '<div class="card set-card"><h4>恢复演示数据</h4><p>清空这段时间的改动，回到初次打开时的演示状态。</p>' +
      '<button class="btn btn-danger" data-act="reset-demo">恢复初始状态</button></div>' +
      '<div class="card set-card"><h4>切换身份</h4><p>用其他角色登录，查看不同身份下的工作台。</p>' +
      '<button class="btn" data-act="logout">退出并重新选择身份</button></div></div>';
    return html;
  }

  /* ------------------------------------------------------------ 经营总览（管理员） */
  function pageBoard() {
    var st = DB.statsFor(rid());
    var total = st.total || 1;
    var parts = [['draft', '草稿', '#B6C0D0'], ['running', '办理中', '#3459E6'],
      ['done', '已完成', '#12A277'], ['reject', '已退回', '#DC5B5B']];
    var acc = 0, grad = [];
    parts.forEach(function (p) {
      var from = acc / total * 100; acc += st.byStatus[p[0]] || 0;
      grad.push(p[2] + ' ' + from.toFixed(2) + '% ' + (acc / total * 100).toFixed(2) + '%');
    });
    var html = head('经营总览', '全链路业务概况 · 仅管理员可见', 'home');
    html += '<div class="board-hero"><h3>启能力 ERP · 业务全景</h3>' +
      '<p>八个环节、一条主线；单据状态实时反映流程进度。</p></div>';
    html += '<div class="board-nums">' +
      '<div class="board-num"><span>单据总数</span><b class="hl">' + st.total + '</b></div>' +
      '<div class="board-num"><span>办理中</span><b>' + st.running + '</b></div>' +
      '<div class="board-num"><span>已完成</span><b>' + st.done + '</b></div>' +
      '<div class="board-num"><span>涉及金额</span><b style="font-size:22px">' + esc(moneyShort(st.amount)) + '</b></div></div>';
    html += '<div class="two-col"><div class="list-card"><div class="card-head"><h3>单据状态分布</h3></div>' +
      '<div class="donut-wrap"><div class="donut" style="background:conic-gradient(' + grad.join(',') + ')">' +
      '<div class="donut-center"><b>' + st.total + '</b><small>全部单据</small></div></div><div class="legend">' +
      parts.map(function (p) { return '<div><i style="background:' + p[2] + '"></i>' + p[1] + '<b>' + (st.byStatus[p[0]] || 0) + '</b></div>'; }).join('') +
      '</div></div></div>';
    var stageCounts = STAGES.map(function (s) {
      var n = 0; s.modules.forEach(function (k) { n += DB.records(k).length; });
      return { name: s.name, n: n };
    });
    var max = Math.max.apply(null, stageCounts.map(function (x) { return x.n; }).concat([1]));
    html += '<div class="list-card"><div class="card-head"><h3>各环节单据量</h3></div><div style="padding:14px 22px 20px">' +
      stageCounts.map(function (x) {
        return '<div class="bar-row"><span class="bl">' + esc(x.name) + '</span>' +
          '<span class="bar-track"><span class="bar-fill" style="width:' + (x.n / max * 100).toFixed(1) + '%"></span></span>' +
          '<span class="bv">' + x.n + '</span></div>';
      }).join('') + '</div></div></div>';
    var logs = DB.recentLogs(30, rid()).filter(function (l) {
      return l.action !== '登录' && l.title.indexOf('切换为') < 0;
    }).slice(0, 6);
    html += '<div class="section-title"><h3>最近动态</h3></div><div class="list-card">';
    if (!logs.length) html += emptyBox('暂无动态', '单据发生变化后会显示在这里');
    else logs.forEach(function (l) {
      html += '<div class="list-row"><div class="lr-main"><b>' + esc(l.title) + '</b><small>' + esc(l.person) + ' · ' + esc(l.action) + '</small></div>' +
        '<span class="lr-time">' + esc(dt(l.ts)) + '</span></div>';
    });
    return html + '</div>';
  }

  /* ------------------------------------------------------------ 数据同步（管理员） */
  var FLOW_COPY = {
    F01: ['在线表单收集', '在线表单提交后，对应角色登录即可看到单据，无需二次录入。'],
    F02: ['本页填写回写', '在本页填的单据保存即进入队列，自动同步到在线表格。'],
    F03: ['审批自动派生', '审批通过后自动生成下游单据，两边保持同源。'],
    F04: ['状态与通知', '状态一变，相关同事的通知与总览同步刷新。'],
    F05: ['定时数据对齐', '每天定时做增量对齐，保证两边最终一致。'],
    F06: ['冲突人工裁决', '两边都改过时不静默覆盖，交给人来裁决。'],
    F07: ['附件与智能识别', '附件与智能识别结果只引用、不重复造。'],
    F08: ['提交前校验', '提交前先做校验，避免不完整的数据进入流程。']
  };
  function pageSync() {
    var s = SYNC.status(), flows = CFG.flows || [];
    var html = head('数据同步', '在线表单与本页单据之间的自动化衔接', 'home',
      '<button class="btn btn-primary" data-act="sync-all">' + svg('sync', 15) + '立即同步</button>');
    html += '<div class="mode-strip"><div class="ms-text"><b>' +
      (s.mode === 'live' ? '已开启实时同步' : '演示模式') + '</b><small>' +
      (s.mode === 'live' ? '在线表格与本页的数据将保持一致。' : '所有动作在本机模拟，页面形态与接入后完全一致。') +
      '</small></div><button class="btn btn-sm" data-act="mode-switch" data-v="' + (s.mode === 'live' ? 'demo' : 'live') + '">' +
      (s.mode === 'live' ? '切回演示' : '切到实时') + '</button></div>';
    html += '<div class="board-nums">' +
      '<div class="board-num"><span>待同步</span><b>' + s.pending + '</b></div>' +
      '<div class="board-num"><span>已同步</span><b>' + s.synced + '</b></div>' +
      '<div class="board-num"><span>已拉取</span><b>' + s.inbox + '</b></div>' +
      '<div class="board-num"><span>待裁决</span><b>' + s.conflicts + '</b></div></div>';
    html += '<div class="section-title"><h3>自动化流程</h3><span class="hint">开关与立即运行都在本页完成</span></div><div class="flow-grid">';
    flows.forEach(function (f) {
      var on = !!(SYNC.state.flows[f.id] && SYNC.state.flows[f.id].enabled);
      var copy = FLOW_COPY[f.id] || [f.name, f.desc];
      html += '<div class="flow-card ' + (on ? '' : 'off') + '"><div class="fc-top"><b>' + esc(copy[0]) + '</b>' +
        '<button class="switch ' + (on ? 'on' : '') + '" data-act="flow-toggle" data-id="' + f.id + '" title="启用 / 停用"></button></div>' +
        '<p>' + esc(copy[1]) + '</p>' +
        '<button class="btn btn-sm" data-act="flow-run" data-id="' + f.id + '"' + (on ? '' : ' disabled') + '>立即运行</button></div>';
    });
    html += '</div>';
    var outbox = SYNC.state.outbox.slice(0, 5);
    html += '<div class="section-title"><h3>最近的同步记录</h3><span class="hint">' + SYNC.state.outbox.length + ' 条队列记录</span></div><div class="list-card">';
    if (!outbox.length) html += emptyBox('队列为空', '在本页新建或编辑单据后，会自动出现在这里');
    else outbox.forEach(function (x) {
      var label = (CFG.queueStates || {})[x.state] || x.state;
      html += '<div class="list-row"><div class="lr-main"><b>' + esc(x.title || (MOD[x.moduleKey] ? pretty(MOD[x.moduleKey].name) : '单据')) + '</b>' +
        '<small>' + esc(MOD[x.moduleKey] ? pretty(MOD[x.moduleKey].name) : '') + ' · ' + esc(label) + '</small></div>' +
        '<span class="lr-time">' + esc(d10(x.ts)) + '</span></div>';
    });
    html += '</div>';
    var conflicts = (SYNC.state.conflicts || []).filter(function (c) { return c.state === 'open'; }).slice(0, 3);
    if (conflicts.length) {
      html += '<div class="section-title"><h3>需要裁决</h3></div><div class="list-card">';
      conflicts.forEach(function (c) {
        html += '<div class="list-row"><div class="lr-main"><b>' + esc(c.moduleName || '单据') + '</b>' +
          '<small>两边都修改过这条记录，请选择保留哪一边</small></div>' +
          '<button class="mini-btn" data-act="conflict" data-id="' + c.id + '" data-v="remote">保留在线表格</button>' +
          '<button class="mini-btn" data-act="conflict" data-id="' + c.id + '" data-v="local">保留本页</button></div>';
      });
      html += '</div>';
    }
    html += '<div class="section-title"><h3>运行状态</h3></div>' +
      '<div class="card card-pad small muted">服务地址 erp.nexduo.xyz · 最近同步 ' +
      esc(s.lastSync ? dt(s.lastSync) : '尚未执行') + '。当前为演示环境，数据在本机模拟流转；' +
      '接入企业服务并切换到实时模式后，以上自动化会真实运行。</div>';
    return html;
  }

  /* ------------------------------------------------------------ 抽屉 */
  function openDrawer(title, sub, body, foot) {
    $('drawerTitle').textContent = title; $('drawerSub').textContent = sub || '';
    $('drawerBody').innerHTML = body; $('drawerFoot').innerHTML = foot || '';
    $('drawer').classList.remove('hidden'); $('drawerOverlay').classList.remove('hidden');
    $('drawerBody').scrollTop = 0;
  }
  function closeDrawer() {
    $('drawer').classList.add('hidden'); $('drawerOverlay').classList.add('hidden');
    UI.form = { key: '', id: '', atts: {} };
  }
  function closeModal() { $('modalLayer').classList.add('hidden'); }

  /* ------------------------------------------------------------ 表单 */
  function fieldCtrl(m, f, val) {
    var name = esc(f.name), req = (m.required || []).indexOf(f.name) >= 0 && f.name !== m.noField;
    var v = txt(val), t = f.type;
    var inner = '';
    if (t === 's' || t === 'q') {
      var opts = (f.options || []).length ? f.options : ['1', '2', '3', '4', '5'];
      inner = '<select>' + '<option value="">请选择</option>' + opts.map(function (o) {
        return '<option value="' + esc(o) + '"' + (String(o) === v ? ' selected' : '') + '>' + esc(o) + '</option>';
      }).join('') + '</select>';
    } else if (t === 'r') {
      inner = '<textarea placeholder="请输入' + name + '">' + esc(v) + '</textarea>';
    } else if (t === 'a') {
      var atts = UI.form.atts[f.name] || [];
      inner = '<div class="att-box">' + atts.map(function (a, i) {
        return '<span class="att-chip">' + esc(a.name) +
          '<button data-act="att-remove" data-field="' + esc(f.name) + '" data-i="' + i + '">×</button></span>';
      }).join('') + '<label class="att-add">+ 添加文件<input type="file" class="hidden" data-att="' + esc(f.name) + '"></label></div>';
    } else if (t === 'b') {
      inner = '<label class="small"><input type="checkbox" style="width:auto;margin-right:6px"' + (v === '是' || v === 'true' ? ' checked' : '') + '> 是</label>';
    } else if (t === 'm') {
      var picked = Array.isArray(val) ? val : String(v).split(/[、,，]/).filter(Boolean);
      inner = '<div class="att-box">' + (f.options || []).map(function (o) {
        return '<label class="att-chip" style="cursor:pointer"><input type="checkbox" style="width:auto;margin-right:5px" value="' + esc(o) + '"' +
          (picked.indexOf(o) >= 0 ? ' checked' : '') + '>' + esc(o) + '</label>';
      }).join('') + '</div>';
    } else {
      var itype = t === 'd' ? 'date' : (t === 'n' || t === 'c' || t === 'g') ? 'number' : t === 'e' ? 'email' : t === 'p' ? 'tel' : t === 'l' ? 'url' : 'text';
      inner = '<input type="' + itype + '"' + (t === 'n' || t === 'c' || t === 'g' ? ' step="any"' : '') +
        ' value="' + esc(v) + '" placeholder="请输入' + name + '">';
    }
    var hint = (m.hints || {})[f.name] && f.name !== m.noField ? '<span class="help">' + esc(clean(m.hints[f.name])) + '</span>' : '';
    var full = (t === 'r' || t === 'a' || t === 'm') ? ' full' : '';
    return '<div class="form-item' + full + '" data-f="' + esc(f.name) + '" data-ft="' + t + '">' +
      '<label>' + name + (req ? '<em>*</em>' : '') + '</label>' + inner + hint + '</div>';
  }
  function formHTML(m, rec) {
    var d = rec ? rec.data : {};
    var parts = m.fields.filter(function (f) { return f.name !== m.noField && f.name !== m.statusField; });
    var body = '<div class="form-grid">' + parts.map(function (f) { return fieldCtrl(m, f, d[f.name]); }).join('') + '</div>';
    if (m.statusField) body += '<div class="form-section">保存后状态</div><div class="small muted">新建默认为「草稿」，提交后进入「办理中」，由对应角色审批。</div>';
    return body;
  }
  function openForm(k, id) {
    if (!vis(k)) { toast('无权访问', '该功能未对当前角色开放', 'err'); return; }
    var m = MOD[k], rec = id ? DB.get(k, id) : null;
    UI.form = { key: k, id: id || '', atts: {} };
    if (rec && rec.data) {
      m.fields.forEach(function (f) {
        if (f.type !== 'a') return;
        var v = rec.data[f.name];
        UI.form.atts[f.name] = (Array.isArray(v) ? v : (v ? [v] : [])).map(function (x) {
          return { id: String(x), name: txt(x) };
        });
      });
    }
    var canSubmit = can(k, 'submit');
    var foot = '<span class="foot-left">' + (id ? '编辑后保存' : '保存后可在单据里继续办理') + '</span><div class="foot-right">' +
      '<button class="btn" data-act="close-drawer">取消</button>' +
      '<button class="btn btn-primary" data-act="save-form" data-submit="0">保存草稿</button>' +
      (canSubmit ? '<button class="btn btn-primary" data-act="save-form" data-submit="1">保存并提交</button>' : '') + '</div>';
    openDrawer((id ? '编辑 · ' : '新建 · ') + pretty(m.name), rec ? rec.no : '填写内容后保存', formHTML(m, rec), foot);
  }
  function collectForm() {
    var m = MOD[UI.form.key], data = {}, body = $('drawerBody');
    Array.prototype.forEach.call(body.querySelectorAll('.form-item[data-f]'), function (item) {
      var name = item.getAttribute('data-f'), t = item.getAttribute('data-ft');
      if (t === 'a') { data[name] = (UI.form.atts[name] || []).map(function (a) { return a.name; }); return; }
      if (t === 'm') { data[name] = Array.prototype.map.call(item.querySelectorAll('input:checked'), function (x) { return x.value; }); return; }
      if (t === 'b') { var cb = item.querySelector('input[type=checkbox]'); data[name] = cb && cb.checked ? '是' : '否'; return; }
      var el = item.querySelector('input:not([type=file]),select,textarea');
      data[name] = el ? el.value : '';
    });
    if (UI.form.id) {
      var rec = DB.get(UI.form.key, UI.form.id);
      if (rec && m.noField) data[m.noField] = rec.no;
      if (rec && m.statusField) data[m.statusField] = rec.data[m.statusField];
    }
    return data;
  }
  function saveForm(submit) {
    var k = UI.form.key, id = UI.form.id, m = MOD[k], data = collectForm();
    try {
      var rec;
      if (id) { DB.update(k, id, data); rec = DB.get(k, id); }
      else { rec = DB.create(k, data); }
      if (submit && rec) {
        if (rec.status === 'done') throw new Error('已完成的单据不能再次提交');
        DB.transition(k, rec.id, 'submit');
      }
      closeDrawer(); render();
      toast(submit ? '已提交，等待办理' : '已保存', pretty(m.name) + ' · ' + rec.no + (submit ? ' 已进入办理中' : ' 保存为草稿'), 'ok');
    } catch (e) { toast('未能保存', e.message || String(e), 'err'); }
  }

  /* ------------------------------------------------------------ 单据详情 */
  function openDetail(k, id) {
    if (!vis(k)) { toast('无权访问', '该功能未对当前角色开放', 'err'); return; }
    var rec = DB.get(k, id);
    if (!rec) { toast('单据不可见', '这条单据不在你当前身份的数据范围内', 'err'); return; }
    UI.detail = { key: k, id: id };
    var m = MOD[k], caps = DB.capsOf(rid(), k);
    var body = '<div class="detail-hero"><div><span class="dh-no">' + esc(rec.no) + '</span>' +
      '<h4>' + esc(txt(rec.data[m.titleField]) || pretty(m.name)) + '</h4></div>' + pill(rec.status) + '</div>';
    body += '<div class="form-section">单据内容</div><div class="kv-grid">';
    var shown = 0;
    m.fields.forEach(function (f) {
      var v = txt(rec.data[f.name]);
      if (!v || shown >= 16) return;
      shown++;
      body += '<div class="kv"><span>' + esc(f.name) + '</span><b>' + esc(f.type === 'c' ? money(rec.data[f.name]) : v) + '</b></div>';
    });
    if (!shown) body += '<div class="small muted">这张单据还没有填写内容。</div>';
    body += '</div>';
    body += '<div class="form-section">办理记录</div><div class="timeline">';
    (rec.timeline || []).slice().reverse().forEach(function (t) {
      body += '<div class="tl-item"><span class="tl-dot"></span><div><b>' + esc(t.action) + '</b>' +
        '<small>' + esc(dt(t.ts)) + ' · ' + esc(t.person || '系统') + '</small>' +
        (t.note ? '<p>' + esc(t.note) + '</p>' : '') + '</div></div>';
    });
    body += '</div>';
    var canApprove = caps.indexOf('approve') >= 0 &&
      (m.approvers.indexOf(rid()) >= 0 || rid() === 'admin') &&
      !(rec.createdRole === rid() && rid() !== 'admin');
    var foot = '<span class="foot-left">' + esc(dt(rec.updatedAt)) + ' 更新</span><div class="foot-right">';
    if ((rec.status === 'draft' || rec.status === 'reject') && caps.indexOf('edit') >= 0)
      foot += '<button class="btn" data-act="open-form" data-mod="' + k + '" data-id="' + id + '">编辑</button>';
    if ((rec.status === 'draft' || rec.status === 'reject') && caps.indexOf('submit') >= 0)
      foot += '<button class="btn btn-primary" data-act="act" data-do="submit" data-mod="' + k + '" data-id="' + id + '">提交办理</button>';
    if (rec.status === 'running' && canApprove) {
      foot += '<button class="btn" data-act="act" data-do="reject" data-mod="' + k + '" data-id="' + id + '">退回</button>' +
        '<button class="btn btn-primary" data-act="act" data-do="approve" data-mod="' + k + '" data-id="' + id + '">通过</button>';
    }
    if (rec.status === 'running' && rec.createdRole === rid() && caps.indexOf('submit') >= 0)
      foot += '<button class="btn" data-act="act" data-do="withdraw" data-mod="' + k + '" data-id="' + id + '">撤销</button>';
    if (isAdmin() && caps.indexOf('delete') >= 0)
      foot += '<button class="btn btn-danger" data-act="act" data-do="remove" data-mod="' + k + '" data-id="' + id + '">删除</button>';
    foot += '</div>';
    openDrawer('单据详情 · ' + pretty(m.name), '查看内容与办理记录', body, foot);
  }
  function doAction(k, id, action) {
    try {
      if (action === 'remove') {
        confirmModal('删除这张单据？', '删除后无法恢复。', function () {
          try { DB.transition(k, id, 'remove'); closeModal(); closeDrawer(); render(); toast('已删除', '', 'ok'); }
          catch (e) { toast('未能删除', e.message, 'err'); }
        });
        return;
      }
      var res = DB.transition(k, id, action);
      closeDrawer(); render();
      var titles = { submit: '已提交', approve: '已通过', reject: '已退回', withdraw: '已撤销' };
      toast(titles[action] || '已完成', (res.created && res.created.length ? '已自动生成 ' + res.created.length + ' 张下游单据' : '流程状态已更新'), 'ok');
    } catch (e) { toast('操作未完成', e.message || String(e), 'err'); }
  }

  /* ------------------------------------------------------------ 二维码 / 弹层 */
  function qrSVG(k) {
    var q = qrOf(k);
    if (!q) return '';
    var s = q.s, b = q.b, d = '';
    for (var y = 0; y < s; y++) for (var x = 0; x < s; x++) {
      if (b.charAt(y * s + x) === '1') d += 'M' + x + ' ' + y + 'h1v1h-1z';
    }
    return '<svg viewBox="0 0 ' + s + ' ' + s + '" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="' + s + '" height="' + s + '" fill="#fff"/><path d="' + d + '" fill="#1B2434"/></svg>';
  }
  function showQR(k) {
    var f = formOf(k), q = qrOf(k);
    if (!f || !q) { toast('暂无在线表单', '该业务请在本页填写', 'warn'); return; }
    $('modal').innerHTML = '<button class="m-close" data-act="modal-close">×</button>' +
      '<h3>' + esc(f.name) + '</h3><p class="m-sub">用手机扫一扫，在手机上填写</p>' +
      '<div class="qr-frame">' + qrSVG(k) + '</div>' +
      '<div class="qr-tip">打开手机相机或钉钉「扫一扫」<br>填写提交后，单据会自动同步到你的工作台</div>' +
      '<div class="m-actions"><button class="btn" data-act="copy-url" data-mod="' + k + '">复制链接</button>' +
      '<button class="btn btn-primary" data-act="open-link" data-url="' + esc(f.url) + '">在电脑打开</button></div>';
    $('modalLayer').classList.remove('hidden');
  }
  function confirmModal(title, desc, onOK) {
    $('modal').innerHTML = '<h3>' + esc(title) + '</h3><p class="m-sub">' + esc(desc) + '</p>' +
      '<div class="m-actions"><button class="btn" data-act="modal-close">取消</button>' +
      '<button class="btn btn-primary" data-act="confirm-ok">确定</button></div>';
    $('modalLayer').classList.remove('hidden');
    UI.confirm = onOK;
  }
  function copyText(t) {
    try {
      var ta = document.createElement('textarea'); ta.value = t;
      ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      toast('链接已复制', '可以发到手机上打开', 'ok');
    } catch (e) { toast('复制失败', '请手动复制表单链接', 'warn'); }
  }
  function download(name, content, mime) {
    var blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); document.body.removeChild(a); }, 300);
  }

  /* ------------------------------------------------------------ 全局搜索 */
  function globalSearch(kw) {
    var box = $('gsResults');
    if (!kw || !kw.trim()) { box.classList.add('hidden'); return; }
    var rows = allVisibleRows(kw.trim(), 'all').slice(0, 8);
    box.innerHTML = rows.length ? rows.map(function (x) {
      return '<div class="gs-row" data-act="open-detail" data-mod="' + x.k + '" data-id="' + x.rec.id + '">' +
        '<div class="t"><b>' + esc(txt(x.rec.data[MOD[x.k].titleField]) || x.rec.no) + '</b>' +
        '<small>' + esc(pretty(MOD[x.k].name)) + ' · ' + esc(x.rec.no) + '</small></div>' + pill(x.rec.status) + '</div>';
    }).join('') : '<div class="gs-row"><div class="t"><b>没有找到相关单据</b><small>只搜索你有权查看的内容</small></div></div>';
    box.classList.remove('hidden');
  }

  /* ------------------------------------------------------------ 事件 */
  function closestAct(el) {
    while (el && el !== document) {
      if (el.getAttribute && el.getAttribute('data-act')) return el;
      el = el.parentNode;
    }
    return null;
  }
  function onClick(e) {
    var t = closestAct(e.target);
    if (!t) {
      if (!$('roleMenu').classList.contains('hidden')) $('roleMenu').classList.add('hidden');
      if (!$('gsResults').classList.contains('hidden')) $('gsResults').classList.add('hidden');
      return;
    }
    var a = t.getAttribute('data-act'), k = t.getAttribute('data-mod'), id = t.getAttribute('data-id');
    var v = t.getAttribute('data-v');
    switch (a) {
      case 'login-role': doLogin(t.getAttribute('data-role')); break;
      case 'logout': logout(); break;
      case 'nav': go(t.getAttribute('data-href')); break;
      case 'open-link': window.open(t.getAttribute('data-url'), '_blank', 'noopener'); break;
      case 'qr': showQR(k); break;
      case 'copy-url': copyText(formOf(k) ? formOf(k).url : ''); break;
      case 'modal-close': closeModal(); break;
      case 'confirm-ok': if (UI.confirm) { var fn = UI.confirm; UI.confirm = null; fn(); } break;
      case 'switch-mode':
        SYNC.setMode(k, v); render();
        toast(v === 'both' ? '已开启本页填写' : '已恢复在线表单优先',
          v === 'both' ? '保存的内容会自动进入同步队列' : '已有在线表单的业务不再重复填写', 'ok');
        break;
      case 'open-form': openForm(k, id); break;
      case 'open-detail': openDetail(k, id); break;
      case 'close-drawer': closeDrawer(); break;
      case 'save-form': saveForm(t.getAttribute('data-submit') === '1'); break;
      case 'act': doAction(k, id, t.getAttribute('data-do')); break;
      case 'att-remove':
        e.preventDefault();
        var f = t.getAttribute('data-field'), i = Number(t.getAttribute('data-i'));
        if (UI.form.atts[f]) { UI.form.atts[f].splice(i, 1); refreshFormKeep(); }
        break;
      case 'filter':
        UI.st = t.getAttribute('data-st'); UI.page = 1; UI.docSt = UI.st; UI.docPage = 1; render(); break;
      case 'page':
        var p = Number(t.getAttribute('data-p'));
        if (parseHash().page === 'docs') UI.docPage = p; else UI.page = p;
        render(); break;
      case 'export':
        try { download(pretty(MOD[k].name) + '.csv', DB.exportCSV(k, rid()), 'text/csv;charset=utf-8'); toast('已导出', '', 'ok'); }
        catch (er) { toast('导出失败', er.message, 'err'); }
        break;
      case 'read-all': DB.markAllRead(rid()); render(); toast('已全部标为已读', '', 'ok'); break;
      case 'open-notice':
        var n = DB.notificationsFor(rid()).filter(function (x) { return x.id === id; })[0];
        if (n) {
          DB.markRead(id, rid());
          if (n.moduleKey && n.recId && vis(n.moduleKey) && DB.get(n.moduleKey, n.recId)) openDetail(n.moduleKey, n.recId);
          render();
        }
        break;
      case 'backup':
        try { download('启能力ERP-备份-' + d10(new Date().toISOString()) + '.json', DB.exportJSON(), 'application/json'); toast('备份已下载', '', 'ok'); }
        catch (er) { toast('导出失败', er.message, 'err'); }
        break;
      case 'restore': $('restoreFile').click(); break;
      case 'reset-demo':
        confirmModal('恢复初始状态？', '这段时间的改动会被清除，回到初次打开时的演示数据。', function () {
          DB.reset(); closeModal(); render(); toast('已恢复演示数据', '', 'ok');
        });
        break;
      case 'flow-toggle': SYNC.toggleFlow(id); render(); break;
      case 'flow-run': syncThen(SYNC.runFlow(id)); break;
      case 'sync-all': syncThen(SYNC.runAll()); break;
      case 'conflict': SYNC.resolveConflict(id, v); render(); toast('已裁决', '队列将继续同步', 'ok'); break;
      case 'mode-switch':
        SYNC.setConfig({ mode: v }); render();
        toast(v === 'live' ? '已切到实时模式' : '已切回演示模式',
          v === 'live' ? '接入企业服务后才会真正生效' : '不会对外发送数据', v === 'live' ? 'warn' : 'ok');
        break;
      case 'sb-toggle': $('appView').classList.toggle('nav-open'); break;
    }
    if (a !== 'nav' && a !== 'qr' && a !== 'open-form' && a !== 'open-detail') e.preventDefault();
  }
  function syncThen(p) {
    Promise.resolve(p).then(function (r) {
      render();
      toast((r && r.title) || '已完成', (r && r.detail) || '', r && r.ok === false ? 'warn' : 'ok');
    }).catch(function (er) { toast('同步未完成', er.message || String(er), 'err'); });
  }
  function refreshFormKeep() {
    // 附件变更后重绘表单，保留用户已输入的内容
    var m = MOD[UI.form.key], data = collectForm();
    var rec = UI.form.id ? DB.get(UI.form.key, UI.form.id) : null;
    var fake = { data: data };
    $('drawerBody').innerHTML = formHTML(m, fake);
  }

  function onInput(e) {
    var el = e.target;
    if (el.id === 'globalSearch') { globalSearch(el.value); return; }
    if (el.id === 'listSearch') {
      var val = el.value;
      if (parseHash().page === 'docs') { UI.docQ = val; UI.docPage = 1; } else { UI.q = val; UI.page = 1; }
      clearTimeout(UI.searchTimer);
      UI.searchTimer = setTimeout(function () {
        render();
        var box = $('listSearch');
        if (box) { box.focus(); box.setSelectionRange(val.length, val.length); }
      }, 220);
    }
  }
  function onChange(e) {
    var el = e.target;
    if (el.getAttribute('data-att')) {
      var f = el.getAttribute('data-att'), file = el.files && el.files[0];
      if (!file) return;
      DB.addAttachment(file, function (res) {
        if (res.error) { toast('附件未添加', res.error, 'warn'); return; }
        if (!UI.form.atts[f]) UI.form.atts[f] = [];
        UI.form.atts[f].push({ id: res.id, name: res.name });
        refreshFormKeep();
      });
    }
    if (el.id === 'restoreFile') {
      var file = el.files && el.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try { DB.importJSON(reader.result); render(); toast('备份已恢复', '', 'ok'); }
        catch (er) { toast('恢复失败', er.message, 'err'); }
      };
      reader.readAsText(file);
      el.value = '';
    }
  }
  function bindTop() {
    $('logoutBtn').addEventListener('click', logout);
    $('sbToggle').addEventListener('click', function () { $('appView').classList.toggle('nav-open'); });
    $('bellBtn').addEventListener('click', function () { go('notify'); });
    $('drawerClose').addEventListener('click', closeDrawer);
    $('drawerBack').addEventListener('click', closeDrawer);
    $('drawerOverlay').addEventListener('click', closeDrawer);
    $('modalLayer').addEventListener('click', function (e) { if (e.target === $('modalLayer')) closeModal(); });
    $('roleChip').addEventListener('click', function (e) {
      e.stopPropagation();
      var menu = $('roleMenu');
      menu.innerHTML = '<div class="rm-head">切换身份（查看不同权限）</div>' + CFG.roles.map(function (r) {
        return '<button data-act="switch-role" data-role="' + r.id + '" class="' + (r.id === (cur() && rid()) ? 'cur' : '') + '">' +
          '<span class="avatar" style="background:' + r.color + '">' + esc(r.person.slice(0, 1)) + '</span>' +
          '<span><b>' + esc(r.name) + '</b><small>' + esc(shortRole(r)) + '</small></span></button>';
      }).join('') + '<div style="border-top:1px solid var(--line);margin:5px 0"></div>' +
        '<button data-act="logout">退出登录</button>';
      menu.classList.toggle('hidden');
    });
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('change', onChange);
    window.addEventListener('hashchange', render);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDrawer(); closeModal(); $('roleMenu').classList.add('hidden'); }
    });
    // 角色菜单里的「切换身份」与「退出」走同一个委托
    document.addEventListener('click', function (e) {
      var t = closestAct(e.target);
      if (t && t.getAttribute('data-act') === 'switch-role') {
        $('roleMenu').classList.add('hidden'); doLogin(t.getAttribute('data-role'));
      }
    });
  }

  /* ------------------------------------------------------------ 启动 */
  DB.load();
  initLogin();
  bindTop();
  render();
})();
