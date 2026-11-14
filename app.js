/* ============================================================
   启能力ERP系统 · 全链路协同中枢 —— 前端逻辑
   纯原生 JS，hash 路由，零依赖。数据全部来自 data.js 的 window.ERP_DATA。
   ============================================================ */
(function () {
  "use strict";

  var D = window.ERP_DATA;
  var mainEl = document.getElementById("main");
  if (!D) {
    mainEl.innerHTML = '<div class="page"><section class="panel"><div class="empty-state">' +
      '<div class="empty-title">数据未加载</div><p>未找到 window.ERP_DATA，请确认 data.js 与 index.html 位于同一目录。</p>' +
      '</div></section></div>';
    return;
  }

  /* ---------- 内联 SVG 图标库（全部手写路径，无任何外部资源） ---------- */
  var ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    activity: '<polyline points="2 12 6 12 10 4 14 20 18 12 22 12"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    layers: '<polygon points="12 2 22 8 12 14 2 8 12 2"/><polyline points="2 12 12 18 22 12"/>',
    search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    chevron: '<polyline points="9 18 15 12 9 6"/>',
    arrow: '<line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 5v14c0 1.7-4 3-9 3s-9-1.3-9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
    kanban: '<rect x="3" y="4" width="5" height="16" rx="1.2"/><rect x="9.5" y="4" width="5" height="11" rx="1.2"/><rect x="16" y="4" width="5" height="7" rx="1.2"/>',
    gantt: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><rect x="6" y="4.4" width="9" height="3.2" rx="1"/><rect x="10" y="10.4" width="8" height="3.2" rx="1"/><rect x="4" y="16.4" width="6" height="3.2" rx="1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
    gallery: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    form: '<rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="9" y1="4" x2="9" y2="20"/>',
    ai: '<path d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.6l-1.7-4.6L6 9.3l4.3-1.7L12 3z"/><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/>',
    attach: '<path d="M21 11.5l-8.4 8.4a5 5 0 0 1-7.1-7.1l8.5-8.5a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-2.8-2.8l7.8-7.8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    chart: '<line x1="3" y1="3" x2="3" y2="21"/><line x1="3" y1="21" x2="21" y2="21"/><rect x="6" y="12" width="3" height="6" rx="0.6"/><rect x="11" y="8" width="3" height="10" rx="0.6"/><rect x="16" y="5" width="3" height="13" rx="0.6"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    filter: '<polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    alert: '<path d="M10.3 3.7L2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
  };

  function svg(name, size) {
    var s = size || 16;
    return '<svg class="ic" viewBox="0 0 24 24" width="' + s + '" height="' + s +
      '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[name] || ICONS.info) + '</svg>';
  }

  /* ---------- 常量配置 ---------- */
  // 8 个业务域的装饰色（按 DOMAINS 顺序）
  var DOMAIN_COLORS = ["#64748B", "#0EA5A4", "#7C5CFC", "#2E5BFF", "#EC4899", "#10B981", "#F59E0B", "#F97316"];

  // 6 大流程环节，分别对应一个业务域；节点表由该域动态取出，不手抄
  var STAGES = [
    { name: "供应商准入", domainId: "02", color: "#2E5BFF" },
    { name: "需求寻源", domainId: "03", color: "#5B6EF0" },
    { name: "合同订单", domainId: "04", color: "#7C5CFC" },
    { name: "仓储交付", domainId: "05", color: "#0EA5A4" },
    { name: "财务结算", domainId: "06", color: "#10B981" },
    { name: "装柜留痕", domainId: "07", color: "#F59E0B" }
  ];

  // 视图类型对应的图标与配色
  var VIEW_META = {
    K: { icon: "kanban", color: "#2E5BFF" },
    G: { icon: "gantt", color: "#7C5CFC" },
    C: { icon: "calendar", color: "#0EA5A4" },
    A: { icon: "gallery", color: "#EC4899" },
    F: { icon: "form", color: "#F59E0B" },
    R: { icon: "table", color: "#10B981" }
  };

  // 字段类型说明（用于「选项或说明」列）
  var TYPE_NOTE = {
    t: "单行文本输入", n: "数值，可参与汇总", d: "日期字段", c: "金额，单位 CNY",
    a: "附件 / 图片文件", u: "钉钉组织成员", l: "URL 链接", r: "多行富文本",
    p: "手机号码", e: "邮箱地址", b: "布尔勾选（是 / 否）", g: "0–100% 进度", q: "1–5 星评分"
  };

  // 状态标签配色关键词（正常绿 / 预警橙 / 严重红）
  var TONE_DANGER = ["严重", "缺货", "不合格", "黑名单", "异常", "作废", "不通过", "已拒绝", "驳回", "流标", "已过期", "失效", "停用", "冻结", "已取消", "需重拍", "不一致"];
  var TONE_SUCCESS = ["正常", "合格", "通过", "已生效", "生效中", "已上线", "一致", "已批准", "已确认", "已完成", "已归档", "启用", "全部通过", "已收货", "已付款", "已执行", "已公示", "已授标", "中标", "已关闭", "已过账", "已入库", "已发布", "已定标"];
  var TONE_WARN = ["预警", "偏低", "超储", "待", "审批中", "审核中", "进行中", "装柜中", "调试中", "部分", "处理中", "征集中", "报价中", "草稿", "潜在", "规划中", "待核验", "待复核", "待审批", "待处理", "待确认", "协商中"];

  var state = { dictQuery: "", dictDomain: "__all__" };
  var STATS;

  /* ---------- 通用工具 ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function uniq(arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); }
  function domainById(id) { return D.domains.find(function (d) { return d.id === id; }); }
  function domainColor(id) {
    var i = D.domains.findIndex(function (d) { return d.id === id; });
    return DOMAIN_COLORS[(i < 0 ? 0 : i) % DOMAIN_COLORS.length];
  }
  function tablesByDomain(name) { return D.tables.filter(function (t) { return t.domain === name; }); }
  function viewTypeName(tp) { return D.viewTypeNames[tp] || tp; }

  // 从 data.js 实时统计 KPI（不写死任何数字）
  function buildStats(data) {
    var t = data.tables;
    return {
      tableCount: t.length,
      domainCount: data.domains.length,
      fieldCount: t.reduce(function (s, x) { return s + x.fields.length; }, 0),
      viewCount: t.reduce(function (s, x) { return s + x.views.length; }, 0),
      formCount: t.filter(function (x) { return x.hasForm; }).length,
      aiFieldCount: t.reduce(function (s, x) { return s + x.ai.length; }, 0),
      attachmentFieldCount: t.reduce(function (s, x) { return s + x.fields.filter(function (f) { return f.type === "a"; }).length; }, 0),
      attachmentTableCount: t.filter(function (x) { return x.hasAttachment; }).length,
      linkCount: t.reduce(function (s, x) { return s + x.links.length; }, 0),
      seedRowCount: t.reduce(function (s, x) { return s + x.seeds.length; }, 0),
      automationCount: data.automations.length
    };
  }

  function tone(v) {
    var s = String(v == null ? "" : v);
    if (s === "严重") return "danger";
    if (s === "预警") return "warn";
    if (s === "正常") return "success";
    var i;
    for (i = 0; i < TONE_DANGER.length; i++) if (s.indexOf(TONE_DANGER[i]) >= 0) return "danger";
    for (i = 0; i < TONE_SUCCESS.length; i++) if (s.indexOf(TONE_SUCCESS[i]) >= 0) return "success";
    for (i = 0; i < TONE_WARN.length; i++) if (s.indexOf(TONE_WARN[i]) >= 0) return "warn";
    return "neutral";
  }

  function fmtNum(v) {
    if (v === "" || v == null) return esc(String(v == null ? "" : v));
    var n = Number(v);
    if (isNaN(n)) return esc(String(v));
    return n.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
  }

  // 字段「选项或说明」列
  function fieldNote(f) {
    if (f.options && f.options.length) {
      return f.options.map(function (o) { return '<span class="opt-chip">' + esc(o) + "</span>"; }).join("");
    }
    return '<span class="muted">' + esc(TYPE_NOTE[f.type] || f.typeName) + "</span>";
  }

  // 演示数据单元格格式化（结合字段类型）
  function fmtCell(v, tcode) {
    if (v == null || v === "") return '<span class="cell-empty">—</span>';
    if (Array.isArray(v)) return v.map(function (x) { return '<span class="opt-chip">' + esc(String(x)) + "</span>"; }).join("");
    if (typeof v === "boolean") return v ? "是" : "否";
    if (tcode === "c") return '<span class="cell-money">¥ ' + fmtNum(v) + "</span>";
    if (tcode === "n") return fmtNum(v);
    if (tcode === "q") return '<span class="tag tag-warn">' + esc(String(v)) + " / 5 星</span>";
    if (tcode === "s") return '<span class="tag tag-' + tone(v) + '">' + esc(String(v)) + "</span>";
    return esc(String(v));
  }

  // 表名 / 字段名 / 业务域 / 视图名 / AI 字段名 的全局模糊匹配
  function matchTable(t, q) {
    if (!q) return true;
    var s = q.toLowerCase();
    var parts = [t.name, t.shortName, t.key, t.domain, t.seq];
    t.fields.forEach(function (f) { parts.push(f.name); });
    t.views.forEach(function (v) { parts.push(v.name); });
    t.ai.forEach(function (a) { parts.push(a.name); });
    return parts.join(" ").toLowerCase().indexOf(s) >= 0;
  }

  /* ---------- 路由 ---------- */
  function parseRoute() {
    var raw = (location.hash || "#/overview").replace(/^#\/?/, "");
    var parts = raw.split("/").filter(Boolean);
    var head = parts[0], id = parts[1];
    if (head === "flow") return { page: "flow" };
    if (head === "dictionary") return { page: "dictionary" };
    if (head === "domain") return { page: "domain", id: id || "" };
    if (head === "table") return { page: "table", key: id || "" };
    return { page: "overview" };
  }

  /* ---------- 侧边栏导航 ---------- */
  function renderNav(route) {
    function act(c) { return c ? "active" : ""; }
    function domActive(d) {
      if (route.page === "domain" && route.id === d.id) return true;
      if (route.page === "table") {
        var t = D.tables.find(function (x) { return x.key === route.key; });
        return !!(t && t.domainId === d.id);
      }
      return false;
    }
    document.getElementById("nav").innerHTML =
      '<div class="nav-group"><div class="nav-group-title">工作台</div>' +
      '<a class="nav-item ' + act(route.page === "overview") + '" href="#/overview">' + svg("grid", 17) + '<span class="nav-item-label">总览</span></a>' +
      '<a class="nav-item ' + act(route.page === "flow") + '" href="#/flow">' + svg("activity", 17) + '<span class="nav-item-label">全链路流程</span></a>' +
      '<a class="nav-item ' + act(route.page === "dictionary") + '" href="#/dictionary">' + svg("list", 17) + '<span class="nav-item-label">数据表字典</span></a>' +
      '</div>' +
      '<div class="nav-group"><div class="nav-group-title">业务域 · ' + D.domains.length + '</div>' +
      D.domains.map(function (d) {
        return '<a class="nav-item ' + act(domActive(d)) + '" href="#/domain/' + d.id + '">' +
          '<span class="nav-domain-dot" style="--dot:' + domainColor(d.id) + '"></span>' +
          '<span class="nav-item-label">' + esc(d.name) + '</span>' +
          '<span class="nav-count">' + tablesByDomain(d.name).length + '</span></a>';
      }).join("") + '</div>';
  }

  /* ---------- 面包屑 ---------- */
  function renderCrumb(route) {
    var sep = '<span class="crumb-sep">' + svg("chevron", 13) + '</span>';
    var html = '<a href="#/overview">' + svg("grid", 15) + '<span>总览</span></a>';
    if (route.page === "flow") html += sep + '<span class="crumb-current">全链路流程</span>';
    else if (route.page === "dictionary") html += sep + '<span class="crumb-current">数据表字典</span>';
    else if (route.page === "domain") {
      var d = domainById(route.id);
      html += sep + '<a href="#/dictionary">业务域</a>' + sep + '<span class="crumb-current">' + esc(d ? d.name : route.id) + '</span>';
    } else if (route.page === "table") {
      var t = D.tables.find(function (x) { return x.key === route.key; });
      if (t) html += sep + '<a href="#/domain/' + t.domainId + '">' + esc(t.domain) + '</a>' + sep + '<span class="crumb-current">' + esc(t.shortName) + '</span>';
      else html += sep + '<span class="crumb-current">' + esc(route.key) + '</span>';
    }
    document.getElementById("crumb").innerHTML = html;
  }

  /* ---------- 总览页 ---------- */
  function renderOverview() {
    var S = STATS;
    var portalHtml = (D.portalLinks || []).map(function (p) {
      return '<a class="portal-link" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
        '<span class="portal-name">' + esc(p.name) + '</span>' +
        '<span class="portal-desc">' + esc(p.desc) + '</span>' + svg("external", 14) + '</a>';
    }).join('');
    var kpis = [
      { label: "数据表", value: S.tableCount, unit: "张", icon: "database", color: "#2E5BFF", bg: "#EEF2FF", note: "覆盖全链路业务对象" },
      { label: "业务域", value: S.domainCount, unit: "个", icon: "layers", color: "#7C5CFC", bg: "#F2ECFF", note: "从系统底座到装柜留痕" },
      { label: "视图总数", value: S.viewCount, unit: "个", icon: "grid", color: "#0EA5A4", bg: "#E4F6F2", note: "看板/甘特/日历/画册/表格" },
      { label: "表单", value: S.formCount, unit: "张", icon: "form", color: "#F59E0B", bg: "#FEF3E2", note: "业务在线填报入口" },
      { label: "AI 字段", value: S.aiFieldCount, unit: "个", icon: "ai", color: "#EC4899", bg: "#FCE9F1", note: "智能解读与自动核验" },
      { label: "自动化", value: S.automationCount, unit: "条", icon: "zap", color: "#10B981", bg: "#E9F7EE", note: "提交流转 / AI / 跨表同步" }
    ];
    var kpiHtml = kpis.map(function (k) {
      return '<div class="kpi-card" style="--kpi:' + k.color + ';--kpi-bg:' + k.bg + '">' +
        '<div class="kpi-top"><span class="kpi-icon">' + svg(k.icon, 18) + '</span><span class="kpi-unit">' + k.unit + '</span></div>' +
        '<div class="kpi-value">' + k.value + '</div>' +
        '<div class="kpi-label">' + k.label + '</div>' +
        '<div class="kpi-note">' + k.note + '</div></div>';
    }).join("");

    var stageHtml = STAGES.map(function (s, i) {
      var d = domainById(s.domainId);
      var n = tablesByDomain(d.name).length;
      var arrow = i > 0 ? '<span class="fs-arrow">' + svg("arrow", 17) + '</span>' : "";
      return arrow + '<a class="fs-node" href="#/flow" style="--stage:' + s.color + '">' +
        '<span class="fs-idx">0' + (i + 1) + '</span>' +
        '<span class="fs-name">' + esc(s.name) + '</span>' +
        '<span class="fs-sub">' + esc(d.name) + ' · ' + n + ' 张表</span></a>';
    }).join("");

    var domainHtml = D.domains.map(function (d) {
      var list = tablesByDomain(d.name);
      var fc = list.reduce(function (s, x) { return s + x.fields.length; }, 0);
      return '<a class="domain-card" href="#/domain/' + d.id + '" style="--dc:' + domainColor(d.id) + '">' +
        '<div class="dc-top"><span class="dc-id">' + d.id + '</span><span class="dc-dot" style="background:' + domainColor(d.id) + '"></span></div>' +
        '<h3>' + esc(d.name) + '</h3><p>' + esc(d.desc) + '</p>' +
        '<div class="dc-foot"><span>' + list.length + ' 张数据表</span><span>' + fc + ' 个字段</span>' + svg("arrow", 15) + '</div></a>';
    }).join("");

    var t39 = D.tables.find(function (x) { return x.key === "t39"; });
    var alertRows = (t39 ? t39.seeds : []).map(function (r) {
      return '<div class="alert-row"><span class="tag tag-' + tone(r["触发状态"]) + '">' + esc(r["触发状态"]) + '</span>' +
        '<div class="alert-main"><div class="alert-title">' + esc(r["名称"]) + '</div>' +
        '<div class="alert-sub">' + esc(r["指标"]) + ' · 阈值 ' + fmtNum(r["阈值"]) + ' · 当前 ' + fmtNum(r["当前值"]) +
        ' · 推送 ' + esc(r["推送渠道"]) + ' · ' + esc(r["发生日期"]) + '</div>' +
        (r["处理说明"] ? '<div class="alert-note">' + esc(r["处理说明"]) + '</div>' : "") + '</div></div>';
    }).join("");

    var caps = [
      { title: "多维视图", icon: "grid", color: "#2E5BFF", desc: "看板、甘特、日历、画册、表单与表格等多种视图", value: S.viewCount + " 个视图" },
      { title: "表单", icon: "form", color: "#F59E0B", desc: "供应商 / 采购 / 仓管 / 装柜在线填报入口", value: S.formCount + " 张表单" },
      { title: "附件", icon: "attach", color: "#0EA5A4", desc: "资质、合同、报价、照片与证据包在线留存", value: S.attachmentTableCount + " 张表支持" },
      { title: "AI 字段", icon: "ai", color: "#EC4899", desc: "画像、核验、根因分析、风险提示等智能字段", value: S.aiFieldCount + " 个字段" },
      { title: "自动化", icon: "zap", color: "#10B981", desc: "表单提交流转、AI 自动处理、跨表关联同步", value: S.automationCount + " 条能力" },
      { title: "应用", icon: "layout", color: "#7C5CFC", desc: "按业务域组织的统一协同应用与导航", value: S.domainCount + " 个业务域" },
      { title: "仪表盘", icon: "chart", color: "#3B82F6", desc: "经营看板与预警事件集中呈现", value: (t39 ? t39.seeds.length : 0) + " 条预警示例" }
    ];
    var capHtml = caps.map(function (c) {
      return '<div class="cap-card" style="--cap:' + c.color + '"><span class="cap-icon">' + svg(c.icon, 18) + '</span>' +
        '<div class="cap-title">' + c.title + '</div><div class="cap-desc">' + c.desc + '</div>' +
        '<div class="cap-value">' + c.value + '</div></div>';
    }).join("");

    return '<div class="page-head"><div>' +
      '<div class="eyebrow">钉钉 AI 多维表格 · 架构总览</div>' +
      '<h1>' + esc(D.meta.baseName) + '</h1>' +
      '<p class="lead">覆盖 ' + S.domainCount + ' 个业务域、' + S.tableCount + ' 张数据表的全链路协同中枢；从供应商准入到装柜留痕，端到端业务对象可追溯、可协同。</p>' +
      '</div><div class="head-actions"><a class="btn btn-soft" href="#/dictionary">' + svg("list", 16) + ' 浏览 ' + S.tableCount + ' 张数据表</a></div></div>' +
      '<div class="kpi-grid">' + kpiHtml + '</div>' +
      '<section class="panel"><div class="panel-head"><h2>全链路流程</h2><a class="link-more" href="#/flow">查看完整流程 ' + svg("arrow", 14) + '</a></div><div class="flow-strip">' + stageHtml + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h2>业务域覆盖</h2><span class="panel-sub">' + S.domainCount + ' 个业务域 · ' + S.tableCount + ' 张数据表</span></div><div class="domain-grid">' + domainHtml + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h2>最新预警</h2><span class="panel-sub">来自「39 经营看板与预警」演示数据</span></div><div class="alert-list">' + (alertRows || '<div class="empty-line">暂无预警数据</div>') + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h2>钉钉能力矩阵</h2><span class="panel-sub">AI 多维表格能力在本系统的落地</span></div><div class="cap-grid">' + capHtml + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h2>钉钉直达入口</h2>' +
      '<span class="panel-sub">在钉钉中打开真实系统与在线填报表单</span></div>' +
      '<div class="portal-grid">' + (portalHtml || '<div class="empty-line">暂无可用入口</div>') + '</div></section>';
  }

  /* ---------- 业务域页 ---------- */
  function renderDomain(id) {
    var d = domainById(id);
    if (!d) return renderNotFound("未找到该业务域", "请从左侧业务域导航重新选择。");
    var list = tablesByDomain(d.name);
    var fc = list.reduce(function (s, x) { return s + x.fields.length; }, 0);
    var vc = list.reduce(function (s, x) { return s + x.views.length; }, 0);

    var cards = list.map(function (t) {
      var tags = uniq(t.views.map(function (v) { return v.type; }))
        .map(function (tp) { return '<span class="mini-badge vt">' + esc(viewTypeName(tp)) + '</span>'; }).join("");
      var badges =
        (t.hasForm ? '<span class="mini-badge form">表单</span>' : "") +
        (t.hasAI ? '<span class="mini-badge ai">AI 字段</span>' : "") +
        (t.hasAttachment ? '<span class="mini-badge attach">附件</span>' : "") +
        (t.hasLink ? '<span class="mini-badge link">关联</span>' : "");
      return '<a class="table-card" href="#/table/' + t.key + '">' +
        '<div class="tc-top"><span class="tc-seq">' + t.seq + '</span><span class="tc-domain-chip">' + esc(d.name) + '</span></div>' +
        '<div class="tc-name">' + esc(t.shortName) + '</div>' +
        '<div class="tc-meta">' + t.fields.length + ' 个字段 · ' + t.views.length + ' 个视图</div>' +
        '<div class="tc-tags">' + tags + badges + '</div>' +
        '<span class="tc-arrow">' + svg("chevron", 16) + '</span></a>';
    }).join("");

    return '<div class="page-head"><div><div class="eyebrow">业务域 ' + d.id + '</div>' +
      '<h1>' + esc(d.name) + '</h1><p class="lead">' + esc(d.desc) + '</p></div>' +
      '<div class="head-actions"><a class="btn btn-soft" href="#/flow">' + svg("activity", 16) + ' 全链路流程</a></div></div>' +
      '<div class="desc-bar">' + svg("info", 20) +
      '<p>本业务域共 ' + list.length + ' 张数据表、' + fc + ' 个字段、' + vc + ' 个视图，覆盖该环节从登记、审批到归档的全部业务对象。</p>' +
      '<div class="desc-stats"><span class="desc-stat"><strong>' + list.length + '</strong>数据表</span>' +
      '<span class="desc-stat"><strong>' + fc + '</strong>字段</span>' +
      '<span class="desc-stat"><strong>' + vc + '</strong>视图</span></div></div>' +
      '<div class="table-grid">' + cards + '</div>';
  }

  /* ---------- 表详情页 ---------- */
  function renderSeedTable(t) {
    if (!t.seeds.length) {
      var preview = t.fields.slice(0, 3).map(function (f, i) {
        return '<tr><td class="col-idx">' + (i + 1) + '</td><td>' + esc(f.name) + '</td><td>' + esc(f.typeName) +
          '</td><td><span class="cell-empty">—</span></td></tr>';
      }).join("");
      return '<div class="empty-state"><span class="empty-ic">' + svg("database", 24) + '</span>' +
        '<div class="empty-title">本表暂无定制演示数据</div>' +
        '<p>该表已定义 ' + t.fields.length + ' 个字段与 ' + t.views.length + ' 个视图。下方列出前 3 个字段作为结构示意；实际业务记录可在钉钉 AI 表格中查看，或点击右上角「在钉钉中打开」。</p>' +
        '<div class="tbl-wrap empty-preview"><table class="data-table"><thead><tr><th class="col-idx">序号</th><th>字段名</th><th>类型</th><th>示意值</th></tr></thead><tbody>' + preview + '</tbody></table></div></div>';
    }
    var typeMap = {};
    t.fields.forEach(function (f) { typeMap[f.name] = f.type; });
    var cols = [];
    t.seeds.forEach(function (row) {
      Object.keys(row).forEach(function (k) { if (cols.indexOf(k) < 0) cols.push(k); });
    });
    var head = cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join("");
    var body = t.seeds.map(function (row) {
      return '<tr>' + cols.map(function (c) { return '<td>' + fmtCell(row[c], typeMap[c]) + '</td>'; }).join("") + '</tr>';
    }).join("");
    return '<div class="tbl-wrap"><table class="data-table"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';
  }

  function renderTable(key) {
    var t = D.tables.find(function (x) { return x.key === key; });
    if (!t) return renderNotFound("未找到该数据表", "请通过数据表字典重新检索。");
    var d = domainById(t.domainId);

    var fieldRows = t.fields.map(function (f, i) {
      return '<tr><td class="col-idx">' + (i + 1) + '</td><td><strong>' + esc(f.name) + '</strong></td>' +
        '<td class="col-type"><span class="type-pill t-' + f.type + '">' + esc(f.typeName) + '</span></td>' +
        '<td>' + fieldNote(f) + '</td></tr>';
    }).join("");

    var views = t.views.map(function (v) {
      var m = VIEW_META[v.type] || { icon: "grid", color: "#2E5BFF" };
      var sub = [esc(v.typeName)].concat(v.params.map(function (p) { return esc(p); })).join(" · ");
      return '<div class="view-item" style="--vt:' + m.color + '"><span class="view-ic">' + svg(m.icon, 17) + '</span>' +
        '<div><div class="view-name">' + esc(v.name) + '</div><div class="view-sub">' + sub + '</div></div>' +
        '<span class="spacer"></span><span class="view-type-badge">' + esc(v.typeName) + '</span></div>';
    }).join("");

    var aiCard = '<div class="mini-card"><div class="mini-head">' + svg("ai", 16) + '<h4>AI 字段说明</h4></div>' +
      (t.ai.length ? t.ai.map(function (a) {
        return '<div class="ai-item"><div class="ai-name">' + esc(a.name) + '</div>' +
          '<div class="ai-fields">引用字段：' + a.fields.map(function (f) { return '<span class="opt-chip">' + esc(f) + '</span>'; }).join("") + '</div>' +
          '<p class="ai-prompt">' + esc(a.prompt) + '</p></div>';
      }).join("") : '<div class="empty-line">本表未配置 AI 字段。</div>') + '</div>';

    var formCard = '<div class="mini-card"><div class="mini-head">' + svg("form", 16) + '<h4>表单入口</h4></div>' +
      (t.form ? '<div class="form-name">' + esc(t.form.name) + '</div>' +
        '<div class="form-title">' + esc(t.form.title) + '</div><p>' + esc(t.form.desc) + '</p>' +
        '<a class="btn btn-ghost" href="https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv" target="_blank" rel="noopener">' + svg("external", 16) + ' 打开表单</a>'
        : '<div class="empty-line">本表未配置业务表单。</div>') + '</div>';

    var linkCard = "";
    if (t.links.length) {
      linkCard = '<div class="mini-card"><div class="mini-head">' + svg("link", 16) + '<h4>跨表关联</h4></div>' +
        t.links.map(function (l) {
          var target = D.tables.find(function (x) { return x.key === l.target; });
          return '<div class="link-line">' + svg("link", 14) + '<span>' + esc(l.name) + ' → </span>' +
            '<a href="#/table/' + esc(l.target) + '">' + esc(target ? target.shortName : l.target) + '</a></div>';
        }).join("") + '</div>';
    }

    var desc = esc(t.shortName) + ' 隶属「' + esc(t.domain) + '」业务域，承载' + esc(d ? d.desc : "") +
      '相关业务，共定义 ' + t.fields.length + ' 个字段、' + t.views.length + ' 个视图' +
      (t.hasForm ? '，并配有业务填报表单' : "") + (t.hasAI ? '、AI 智能字段' : "") + '。';

    return '<div class="page-head"><div><div class="eyebrow">数据表 ' + t.key + ' · ' + esc(t.domain) + '</div>' +
      '<h1><span class="tc-seq" style="margin-right:10px;vertical-align:middle">' + t.seq + '</span>' + esc(t.shortName) + '</h1>' +
      '<p class="lead">' + esc(t.name) + '</p></div>' +
      '<div class="head-actions"><a class="btn btn-primary" href="https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv" target="_blank" rel="noopener">' + svg("external", 16) + ' 在钉钉中打开</a></div></div>' +
      '<div class="desc-bar">' + svg("info", 20) + '<p>' + desc + '</p>' +
      '<div class="desc-stats"><span class="desc-stat"><strong>' + t.fields.length + '</strong>字段</span>' +
      '<span class="desc-stat"><strong>' + t.views.length + '</strong>视图</span>' +
      '<span class="desc-stat"><strong>' + t.ai.length + '</strong>AI 字段</span>' +
      '<span class="desc-stat"><strong>' + t.seeds.length + '</strong>演示数据</span></div></div>' +
      '<section class="panel"><div class="subhead">' + svg("list", 16) + ' 字段结构 · ' + t.fields.length + ' 个字段</div>' +
      '<div class="tbl-wrap"><table class="data-table"><thead><tr><th class="col-idx">序号</th><th>字段名</th><th class="col-type">类型</th><th>选项或说明</th></tr></thead><tbody>' + fieldRows + '</tbody></table></div></section>' +
      '<div class="detail-grid"><section class="panel"><div class="subhead">' + svg("grid", 16) + ' 视图清单 · ' + t.views.length + ' 个视图</div><div class="view-list">' + views + '</div></section>' +
      '<div>' + aiCard + formCard + linkCard + '</div></div>' +
      '<section class="panel section-gap"><div class="panel-head"><h2>演示数据</h2><span class="panel-sub">来自 schema.py 的 SEEDS 定制演示数据</span></div>' + renderSeedTable(t) + '</section>' +
      '<div style="text-align:center;margin-top:8px"><a class="btn btn-soft" href="#/domain/' + esc(t.domainId) + '">' + svg("chevron", 16) + ' 返回「' + esc(t.domain) + '」业务域</a></div>';
  }

  /* ---------- 全链路流程页 ---------- */
  function renderFlow() {
    var S = STATS;
    // 纯 SVG 绘制的端到端流程图：6 个环节节点 + 渐变连线 + 箭头
    var X = [70, 282, 494, 706, 918, 1130];
    var circles = STAGES.map(function (s, i) {
      var dm = domainById(s.domainId);
      return '<g><circle cx="' + X[i] + '" cy="48" r="19" fill="' + s.color + '"/>' +
        '<text x="' + X[i] + '" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="700" fill="#fff">0' + (i + 1) + '</text>' +
        '<text x="' + X[i] + '" y="92" text-anchor="middle" font-size="15" font-weight="700" fill="#1E2A45">' + esc(s.name) + '</text>' +
        '<text x="' + X[i] + '" y="112" text-anchor="middle" font-size="11.5" fill="#8B96AE">' + esc(dm.name) + '</text></g>';
    }).join("");
    var chevrons = X.slice(0, -1).map(function (x, i) {
      var mx = (x + X[i + 1]) / 2;
      return '<path d="M' + (mx - 5) + ' 43 L' + (mx + 3) + ' 48 L' + (mx - 5) + ' 53" fill="none" stroke="#C7D0E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    }).join("");
    var flowmap = '<svg class="flowmap" viewBox="0 0 1200 132" role="img" aria-label="端到端全链路流程">' +
      '<defs><linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0%" stop-color="#2E5BFF"/><stop offset="100%" stop-color="#10B981"/></linearGradient></defs>' +
      '<line x1="70" y1="48" x2="1130" y2="48" stroke="url(#flowGrad)" stroke-width="3" stroke-linecap="round"/>' +
      chevrons + circles + '</svg>';

    var spine = STAGES.map(function (s, i) {
      var dm = domainById(s.domainId);
      var list = tablesByDomain(dm.name);
      var fc = list.reduce(function (a, x) { return a + x.fields.length; }, 0);
      var arrow = i > 0 ? '<span class="spine-arrow">' + svg("arrow", 18) + '</span>' : "";
      return arrow + '<a class="spine-card" href="#/domain/' + s.domainId + '" style="--stage:' + s.color + '">' +
        '<div class="spine-idx">0' + (i + 1) + '</div><div class="spine-name">' + esc(s.name) + '</div>' +
        '<div class="spine-domain">' + esc(dm.name) + '</div>' +
        '<div class="spine-count">' + list.length + ' 张表 · ' + fc + ' 字段</div></a>';
    }).join("");

    var columns = STAGES.map(function (s, i) {
      var dm = domainById(s.domainId);
      var list = tablesByDomain(dm.name);
      return '<div class="stage-col" style="--stage:' + s.color + '"><div class="stage-col-head">' +
        '<span class="sc-num">0' + (i + 1) + '</span><div><div class="sc-name">' + esc(s.name) + '</div>' +
        '<div class="sc-domain">' + esc(dm.name) + ' · ' + list.length + ' 张表</div></div></div><div class="stage-nodes">' +
        list.map(function (t) {
          return '<a class="stage-node" href="#/table/' + t.key + '"><span class="sn-seq">' + t.seq + '</span>' +
            '<span class="sn-name">' + esc(t.shortName) + '</span><span class="sn-go">' + svg("chevron", 13) + '</span></a>';
        }).join("") + '</div></div>';
    }).join("");

    var foundation = D.domains.slice(0, 2).map(function (dm) {
      var list = tablesByDomain(dm.name);
      return '<div class="stage-col" style="--stage:' + domainColor(dm.id) + '"><div class="stage-col-head">' +
        '<span class="sc-num">' + dm.id + '</span><div><div class="sc-name">' + esc(dm.name) + '</div>' +
        '<div class="sc-domain">' + list.length + ' 张表 · 基础支撑</div></div></div><div class="stage-nodes">' +
        list.map(function (t) {
          return '<a class="stage-node" href="#/table/' + t.key + '"><span class="sn-seq">' + t.seq + '</span>' +
            '<span class="sn-name">' + esc(t.shortName) + '</span><span class="sn-go">' + svg("chevron", 13) + '</span></a>';
        }).join("") + '</div></div>';
    }).join("");

    return '<div class="page-head"><div><div class="eyebrow">全链路流程</div>' +
      '<h1>端到端业务协同流程</h1>' +
      '<p class="lead">6 大环节 · ' + S.tableCount + ' 张数据表 · ' + S.domainCount + ' 个业务域。节点按业务域分组并标注表编号，点击任意节点可跳转到该表详情。</p></div>' +
      '<div class="head-actions"><a class="btn btn-soft" href="#/dictionary">' + svg("list", 16) + ' 数据表字典</a></div></div>' +
      '<section class="panel"><div class="flow-summary">' +
      '<span class="summary-pill">' + svg("activity", 15) + ' 流程环节 <strong>6</strong></span>' +
      '<span class="summary-pill">' + svg("database", 15) + ' 数据表 <strong>' + S.tableCount + '</strong></span>' +
      '<span class="summary-pill">' + svg("layers", 15) + ' 业务域 <strong>' + S.domainCount + '</strong></span>' +
      '<span class="summary-pill">' + svg("zap", 15) + ' 自动化能力 <strong>' + S.automationCount + '</strong></span></div>' +
      flowmap + '<div class="stage-spine">' + spine + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h2>环节节点 · 按业务域分组</h2>' +
      '<span class="panel-sub">供应商准入 → 需求寻源 → 合同订单 → 仓储交付 → 财务结算 → 装柜留痕</span></div>' +
      '<div class="stage-columns">' + columns + '</div></section>' +
      '<section class="panel"><div class="panel-head"><h2>基础支撑层</h2>' +
      '<span class="panel-sub">系统底座 / 主数据，为全链路提供身份、配置、字典与主数据能力</span></div>' +
      '<div class="foundation-cols">' + foundation + '</div></section>';
  }

  /* ---------- 数据表字典页 ---------- */
  function renderDictionary() {
    var chips = ['<button class="chip active js-filter-chip" data-domain="__all__" type="button">全部 <span>' + D.tables.length + '</span></button>']
      .concat(D.domains.map(function (d) {
        return '<button class="chip js-filter-chip" data-domain="' + esc(d.name) + '" type="button">' + esc(d.name) +
          ' <span>' + tablesByDomain(d.name).length + '</span></button>';
      })).join("");
    return '<div class="page-head"><div><div class="eyebrow">数据表字典</div>' +
      '<h1>全部 ' + D.tables.length + ' 张数据表</h1>' +
      '<p class="lead">支持按表名、字段名、业务域检索；可按业务域筛选，点击任意一行查看字段、视图与演示数据。</p></div>' +
      '<div class="head-actions"><a class="btn btn-soft" href="#/flow">' + svg("activity", 16) + ' 全链路流程</a></div></div>' +
      '<section class="panel"><div class="dict-toolbar"><div class="dict-search">' + svg("search", 16) +
      '<input id="dictSearch" type="search" placeholder="搜索表名 / 字段名 / 业务域" autocomplete="off" aria-label="字典检索"></div>' +
      '<div class="filter-chips" id="dictFilters">' + chips + '</div></div>' +
      '<div class="dict-meta" id="dictMeta"></div><div class="dict-table" id="dictTable"></div></section>';
  }

  function updateDictList() {
    var box = document.getElementById("dictTable");
    var meta = document.getElementById("dictMeta");
    if (!box || !meta) return;
    var q = (state.dictQuery || "").trim();
    var list = D.tables.filter(function (t) { return matchTable(t, q); });
    if (state.dictDomain !== "__all__") list = list.filter(function (t) { return t.domain === state.dictDomain; });
    meta.innerHTML = '共 <strong>' + list.length + '</strong> 张数据表' +
      (q ? ' · 关键词「' + esc(q) + '」' : "") +
      (state.dictDomain !== "__all__" ? ' · 业务域「' + esc(state.dictDomain) + '」' : "");
    if (!list.length) {
      box.innerHTML = '<div class="empty-state" style="border:none;background:transparent"><span class="empty-ic">' + svg("search", 24) + '</span>' +
        '<div class="empty-title">没有匹配的数据表</div><p>试试更换关键词，或把业务域筛选切回「全部」。</p></div>';
      return;
    }
    var rows = list.map(function (t) {
      var badges = [];
      if (t.hasForm) badges.push('<span class="mini-badge form">表单</span>');
      if (t.hasAI) badges.push('<span class="mini-badge ai">AI</span>');
      if (t.hasAttachment) badges.push('<span class="mini-badge attach">附件</span>');
      if (t.hasLink) badges.push('<span class="mini-badge link">关联</span>');
      if (!badges.length) badges.push('<span class="muted" style="font-size:11px">—</span>');
      return '<a class="dict-row" href="#/table/' + t.key + '">' +
        '<span class="dr-seq">' + t.seq + '</span>' +
        '<span class="dr-name"><strong>' + esc(t.shortName) + '</strong><small>' + esc(t.key) + ' · ' + esc(t.name) + '</small></span>' +
        '<span class="dr-domain"><span class="dc-dot" style="background:' + domainColor(t.domainId) + '"></span>' + esc(t.domain) + '</span>' +
        '<span class="dr-num">' + t.fields.length + '</span><span class="dr-num">' + t.views.length + '</span>' +
        '<span class="dr-tags">' + badges.join("") + '</span><span class="dr-go">' + svg("chevron", 15) + '</span></a>';
    }).join("");
    box.innerHTML = '<div class="dict-thead"><span>编号</span><span>数据表</span><span>业务域</span><span>字段</span><span>视图</span><span>能力</span><span></span></div>' + rows;
  }

  /* ---------- 空态 / 未找到 ---------- */
  function renderNotFound(title, hint) {
    return '<div class="page-head"><div><div class="eyebrow">提示</div><h1>' + esc(title) + '</h1>' +
      '<p class="lead">' + esc(hint) + '</p></div></div><section class="panel"><div class="empty-state">' +
      '<span class="empty-ic">' + svg("alert", 24) + '</span><div class="empty-title">' + esc(title) + '</div>' +
      '<p>' + esc(hint) + '</p><a class="btn btn-primary" href="#/overview">' + svg("grid", 16) + ' 返回总览</a></div></section>';
  }

  /* ---------- 全局搜索 ---------- */
  function hideGs() {
    var r = document.getElementById("gsResults");
    if (r) { r.classList.remove("show"); r.innerHTML = ""; }
  }
  function renderGs(q) {
    var box = document.getElementById("gsResults");
    var s = (q || "").trim();
    if (!s) { hideGs(); return; }
    var list = D.tables.filter(function (t) { return matchTable(t, s); }).slice(0, 8);
    if (!list.length) {
      box.innerHTML = '<div class="gs-empty">未找到匹配的数据表 / 字段 / 业务域</div>';
      box.classList.add("show");
      return;
    }
    box.innerHTML = list.map(function (t) {
      return '<a class="gs-item" href="#/table/' + t.key + '">' +
        '<span class="gs-seq" style="--dc:' + domainColor(t.domainId) + '">' + t.seq + '</span>' +
        '<span class="gs-body"><span class="gs-name">' + esc(t.shortName) + '</span>' +
        '<span class="gs-meta">' + esc(t.domain) + ' · ' + t.fields.length + ' 字段 · ' + t.views.length + ' 视图</span></span>' +
        '<span class="gs-go">' + svg("chevron", 14) + '</span></a>';
    }).join("") + '<a class="gs-all" href="#/dictionary">查看全部 ' + D.tables.length + ' 张数据表 ' + svg("arrow", 14) + '</a>';
    box.classList.add("show");
  }

  /* ---------- 侧栏收起 ---------- */
  function closeSidebar() { document.body.classList.remove("sidebar-open"); }
  function toggleSidebar() { document.body.classList.toggle("sidebar-open"); }

  /* ---------- 主渲染 ---------- */
  function render() {
    var route = parseRoute();
    renderNav(route);
    renderCrumb(route);
    var html;
    switch (route.page) {
      case "flow": html = renderFlow(); break;
      case "dictionary": html = renderDictionary(); break;
      case "domain": html = renderDomain(route.id); break;
      case "table": html = renderTable(route.key); break;
      default: html = renderOverview();
    }
    mainEl.innerHTML = '<div class="page fade-in">' + html + '</div>';
    mainEl.scrollTop = 0;
    if (route.page === "dictionary") {
      state.dictQuery = "";
      state.dictDomain = "__all__";
      updateDictList();
    }
    hideGs();
    var gi = document.getElementById("globalSearch");
    if (gi) gi.value = "";
    closeSidebar();
  }

  /* ---------- 事件绑定 ---------- */
  function initEvents() {
    // 全局搜索
    var gi = document.getElementById("globalSearch");
    var wrap = document.getElementById("globalSearchWrap");
    gi.addEventListener("input", function () { renderGs(gi.value); });
    gi.addEventListener("focus", function () { if (gi.value.trim()) renderGs(gi.value); });
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) hideGs(); });

    // 字典页：输入即过滤 + 业务域筛选（事件委托，随内容重渲染依然有效）
    mainEl.addEventListener("input", function (e) {
      if (e.target && e.target.id === "dictSearch") { state.dictQuery = e.target.value; updateDictList(); }
    });
    mainEl.addEventListener("click", function (e) {
      var chip = e.target.closest ? e.target.closest(".js-filter-chip") : null;
      if (chip) {
        state.dictDomain = chip.getAttribute("data-domain") || "__all__";
        var chips = mainEl.querySelectorAll(".js-filter-chip");
        Array.prototype.forEach.call(chips, function (c) { c.classList.toggle("active", c === chip); });
        updateDictList();
      }
    });

    // 侧栏
    document.getElementById("menuToggle").addEventListener("click", toggleSidebar);
    document.getElementById("sidebarClose").addEventListener("click", closeSidebar);
    document.getElementById("backdrop").addEventListener("click", closeSidebar);
    document.getElementById("nav").addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) closeSidebar();
    });

    // 快捷键：/ 聚焦搜索，Esc 关闭
    document.addEventListener("keydown", function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        gi.focus();
      }
      if (e.key === "Escape") { hideGs(); gi.blur(); closeSidebar(); }
    });

    window.addEventListener("hashchange", render);
  }

  /* ---------- 启动 ---------- */
  STATS = buildStats(D);
  initEvents();
  render();
})();
