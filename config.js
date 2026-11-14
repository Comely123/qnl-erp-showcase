// 由 gen_config.py 程序化生成，请勿手工改写
window.ERP_CONFIG = {
  "meta": {
    "baseId": "0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv",
    "baseName": "启能力ERP系统 · 全链路协同中枢",
    "version": "3.0",
    "mode": "local",
    "modeLabel": "本地演示模式 · 未连接后端",
    "note": "所有单据、日志、通知与附件保存在浏览器 localStorage，刷新不丢失；换浏览器或清缓存不会同步。"
  },
  "domains": [
    {
      "id": "00",
      "name": "系统底座",
      "desc": "组织、权限、字典、审批、通知、附件"
    },
    {
      "id": "01",
      "name": "主数据",
      "desc": "物料、仓库、单位币种与汇率"
    },
    {
      "id": "02",
      "name": "供应商与质量",
      "desc": "准入、资质、评审、来料检验、整改、记分卡"
    },
    {
      "id": "03",
      "name": "需求与寻源",
      "desc": "采购项目、申请、需求池、RFQ、竞价、招投标"
    },
    {
      "id": "04",
      "name": "合同与订单",
      "desc": "合同台账、用印归档、采购订单、交付、收货"
    },
    {
      "id": "05",
      "name": "仓储与商城",
      "desc": "库存、出入库、调拨盘点、商城、价格协议"
    },
    {
      "id": "06",
      "name": "财务与BI",
      "desc": "付款、对账、发票、扣款、看板与预警"
    },
    {
      "id": "07",
      "name": "装柜留痕",
      "desc": "柜次、闸门、拍照槽位、照片证据、重量核查"
    }
  ],
  "groups": {
    "00": [
      [
        "组织与权限",
        [
          "t01",
          "t02"
        ],
        "组织、部门、账号与角色是权限隔离的地基"
      ],
      [
        "配置与审计",
        [
          "t00",
          "t03",
          "t04",
          "t05"
        ],
        "流程字典、审批流、通知日志与附件中心"
      ]
    ],
    "01": [
      [
        "基础档案",
        [
          "t06",
          "t07",
          "t08"
        ],
        "物料、仓库、单位币种，全系统共享的主数据"
      ]
    ],
    "02": [
      [
        "供应商准入",
        [
          "t09",
          "t10",
          "t11",
          "t12"
        ],
        "从自助登记、资质核验到合格供应商档案"
      ],
      [
        "评审与考核",
        [
          "t13",
          "t16"
        ],
        "定期评审、记分卡与现场考察"
      ],
      [
        "来料质量",
        [
          "t14",
          "t15"
        ],
        "送检、判定、不合格整改闭环"
      ]
    ],
    "03": [
      [
        "采购需求",
        [
          "t17",
          "t18",
          "t19"
        ],
        "立项、PR 提报、需求归集与寻源派发"
      ],
      [
        "询比价",
        [
          "t21",
          "t22"
        ],
        "发布 RFQ、收集并比价供应商报价"
      ],
      [
        "竞价与招标",
        [
          "t23",
          "t24",
          "t25"
        ],
        "竞价场次、招标评标、中标公示"
      ],
      [
        "定标决策",
        [
          "t20"
        ],
        "意见征集与最终定标结果"
      ]
    ],
    "04": [
      [
        "合同管理",
        [
          "t26",
          "t27"
        ],
        "合同台账、模板用印与归档"
      ],
      [
        "采购订单",
        [
          "t28",
          "t29"
        ],
        "PO 下达、交期计划与变更"
      ],
      [
        "交付收货",
        [
          "t30",
          "t31"
        ],
        "送货预约 ASN、收货登记与退货"
      ]
    ],
    "05": [
      [
        "库存与仓储",
        [
          "t32",
          "t33"
        ],
        "库存水位预警、出入库、调拨与盘点"
      ],
      [
        "商城运营",
        [
          "t34",
          "t35"
        ],
        "价格协议、商品上架与商城公告"
      ]
    ],
    "06": [
      [
        "付款管理",
        [
          "t36"
        ],
        "付款计划与付款申请审批"
      ],
      [
        "对账结算",
        [
          "t37",
          "t38"
        ],
        "对账、发票校验、扣款与付款执行"
      ],
      [
        "经营看板",
        [
          "t39"
        ],
        "指标阈值与经营预警规则"
      ]
    ],
    "07": [
      [
        "柜次与闸门",
        [
          "t40"
        ],
        "五要素核对闸门、柜次状态"
      ],
      [
        "拍照留痕",
        [
          "t41",
          "t42"
        ],
        "标准槽位、现场照片与 AI 核验"
      ],
      [
        "核查归档",
        [
          "t43"
        ],
        "重量核查、差异审核与证据归档"
      ]
    ]
  },
  "roles": [
    {
      "id": "admin",
      "name": "超级管理员",
      "person": "张账号",
      "account": "admin",
      "color": "#2E5BFF",
      "brand": "启能力 ERP",
      "slogan": "企业采购协同平台 · 全域运营",
      "desc": "全域可见，44 个业务模块均可操作；负责主数据、审批流与系统配置。",
      "domains": [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07"
      ],
      "extra": [],
      "deny": [],
      "caps": [
        "view",
        "create",
        "edit",
        "submit",
        "approve",
        "reject",
        "delete",
        "export",
        "config"
      ],
      "rowFilter": null,
      "scope": "全域可见 · 44 个模块可操作",
      "wbTitle": "超级管理后台",
      "wbSub": "全链路进程总控 · 五大业务线一站式协同",
      "policy": {
        "ownDomains": [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07"
        ],
        "ownModules": [],
        "approveDomains": [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07"
        ],
        "visible": [
          "t00",
          "t01",
          "t02",
          "t03",
          "t04",
          "t05",
          "t06",
          "t07",
          "t08",
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16",
          "t17",
          "t18",
          "t19",
          "t20",
          "t21",
          "t22",
          "t23",
          "t24",
          "t25",
          "t26",
          "t27",
          "t28",
          "t29",
          "t30",
          "t31",
          "t32",
          "t33",
          "t34",
          "t35",
          "t36",
          "t37",
          "t38",
          "t39",
          "t40",
          "t41",
          "t42",
          "t43"
        ],
        "modules": {
          "t00": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t01": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t02": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t03": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t04": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t05": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t06": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t07": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t08": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t09": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t10": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t11": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t12": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t13": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t14": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t15": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t16": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t17": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t18": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t19": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t20": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t21": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t22": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t23": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t24": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t25": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t26": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t27": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t28": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t29": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t30": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t31": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t32": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t33": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t34": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t35": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t36": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t37": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t38": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t39": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t40": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t41": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t42": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ],
          "t43": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "delete",
            "export"
          ]
        },
        "export": true,
        "boardExport": true,
        "system": [
          "guide",
          "dict",
          "board",
          "flow",
          "notify",
          "permissions",
          "identity",
          "settings",
          "backup",
          "reset",
          "portal",
          "audit",
          "contract",
          "sync"
        ],
        "rowScope": "all",
        "writable": [
          "t00",
          "t01",
          "t02",
          "t03",
          "t04",
          "t05",
          "t06",
          "t07",
          "t08",
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16",
          "t17",
          "t18",
          "t19",
          "t20",
          "t21",
          "t22",
          "t23",
          "t24",
          "t25",
          "t26",
          "t27",
          "t28",
          "t29",
          "t30",
          "t31",
          "t32",
          "t33",
          "t34",
          "t35",
          "t36",
          "t37",
          "t38",
          "t39",
          "t40",
          "t41",
          "t42",
          "t43"
        ],
        "readonly": [],
        "approvable": [
          "t00",
          "t01",
          "t02",
          "t03",
          "t04",
          "t05",
          "t06",
          "t07",
          "t08",
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16",
          "t17",
          "t18",
          "t19",
          "t20",
          "t21",
          "t22",
          "t23",
          "t24",
          "t25",
          "t26",
          "t27",
          "t28",
          "t29",
          "t30",
          "t31",
          "t32",
          "t33",
          "t34",
          "t35",
          "t36",
          "t37",
          "t38",
          "t39",
          "t40",
          "t41",
          "t42",
          "t43"
        ]
      }
    },
    {
      "id": "buyer",
      "name": "采购经理",
      "person": "李承泽",
      "account": "buyer",
      "color": "#0BA5A5",
      "brand": "启能力 · 寻源协同",
      "slogan": "采购方工作台",
      "desc": "负责立项、PR 审批、寻源定标、合同与订单；不可操作财务付款与系统配置。",
      "domains": [
        "01",
        "02",
        "03",
        "04"
      ],
      "extra": [
        "t32"
      ],
      "deny": [
        "t02",
        "t03"
      ],
      "caps": [
        "view",
        "create",
        "edit",
        "submit",
        "approve",
        "reject",
        "export"
      ],
      "rowFilter": null,
      "scope": "授权模块：需求与寻源 / 合同与订单 / 供应商 / 主数据",
      "wbTitle": "采购方工作台",
      "wbSub": "寻源到履约 · 采购方运营台",
      "policy": {
        "ownDomains": [
          "01",
          "03",
          "04"
        ],
        "ownModules": [],
        "approveDomains": [
          "01",
          "03",
          "04"
        ],
        "visible": [
          "t06",
          "t07",
          "t08",
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16",
          "t17",
          "t18",
          "t19",
          "t20",
          "t21",
          "t22",
          "t23",
          "t24",
          "t25",
          "t26",
          "t27",
          "t28",
          "t29",
          "t30",
          "t31",
          "t32"
        ],
        "modules": {
          "t00": [],
          "t01": [],
          "t02": [],
          "t03": [],
          "t04": [],
          "t05": [],
          "t06": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t07": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t08": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t09": [
            "view"
          ],
          "t10": [
            "view"
          ],
          "t11": [
            "view"
          ],
          "t12": [
            "view"
          ],
          "t13": [
            "view"
          ],
          "t14": [
            "view"
          ],
          "t15": [
            "view"
          ],
          "t16": [
            "view"
          ],
          "t17": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t18": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t19": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t20": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t21": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t22": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t23": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t24": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t25": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t26": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t27": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t28": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t29": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t30": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t31": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t32": [
            "view"
          ],
          "t33": [],
          "t34": [],
          "t35": [],
          "t36": [],
          "t37": [],
          "t38": [],
          "t39": [],
          "t40": [],
          "t41": [],
          "t42": [],
          "t43": []
        },
        "export": true,
        "boardExport": false,
        "system": [
          "notify",
          "permissions",
          "identity",
          "sync"
        ],
        "rowScope": "all",
        "writable": [
          "t06",
          "t07",
          "t08",
          "t17",
          "t18",
          "t19",
          "t20",
          "t21",
          "t22",
          "t23",
          "t24",
          "t25",
          "t26",
          "t27",
          "t28",
          "t29",
          "t30",
          "t31"
        ],
        "readonly": [
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16",
          "t32"
        ],
        "approvable": [
          "t06",
          "t07",
          "t08",
          "t17",
          "t18",
          "t19",
          "t20",
          "t21",
          "t22",
          "t23",
          "t24",
          "t25",
          "t26",
          "t27",
          "t28",
          "t29",
          "t30",
          "t31"
        ]
      }
    },
    {
      "id": "warehouse",
      "name": "仓管员",
      "person": "周仓管",
      "account": "warehouse",
      "color": "#7A5AF8",
      "brand": "启能力 · 入库",
      "slogan": "仓存域协同台",
      "desc": "负责 ASN 收货、来料登记、出入库、盘点与装柜现场；不可审批采购与财务单据。",
      "domains": [
        "05",
        "07"
      ],
      "extra": [
        "t30",
        "t31",
        "t07",
        "t06"
      ],
      "deny": [],
      "caps": [
        "view",
        "create",
        "edit",
        "submit",
        "approve",
        "export"
      ],
      "rowFilter": null,
      "scope": "授权模块：仓存与商城 / 装柜留痕 / 交付收货",
      "wbTitle": "仓存工作台",
      "wbSub": "收货 · 入库 · 盘点 · 装柜留痕",
      "policy": {
        "ownDomains": [
          "05",
          "07"
        ],
        "ownModules": [],
        "approveDomains": [
          "05",
          "07"
        ],
        "visible": [
          "t06",
          "t07",
          "t30",
          "t31",
          "t32",
          "t33",
          "t34",
          "t35",
          "t40",
          "t41",
          "t42",
          "t43"
        ],
        "modules": {
          "t00": [],
          "t01": [],
          "t02": [],
          "t03": [],
          "t04": [],
          "t05": [],
          "t06": [
            "view"
          ],
          "t07": [
            "view"
          ],
          "t08": [],
          "t09": [],
          "t10": [],
          "t11": [],
          "t12": [],
          "t13": [],
          "t14": [],
          "t15": [],
          "t16": [],
          "t17": [],
          "t18": [],
          "t19": [],
          "t20": [],
          "t21": [],
          "t22": [],
          "t23": [],
          "t24": [],
          "t25": [],
          "t26": [],
          "t27": [],
          "t28": [],
          "t29": [],
          "t30": [
            "view"
          ],
          "t31": [
            "view"
          ],
          "t32": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ],
          "t33": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ],
          "t34": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ],
          "t35": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ],
          "t36": [],
          "t37": [],
          "t38": [],
          "t39": [],
          "t40": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ],
          "t41": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ],
          "t42": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ],
          "t43": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "export"
          ]
        },
        "export": true,
        "boardExport": false,
        "system": [
          "notify",
          "permissions",
          "identity",
          "sync"
        ],
        "rowScope": "all",
        "writable": [
          "t32",
          "t33",
          "t34",
          "t35",
          "t40",
          "t41",
          "t42",
          "t43"
        ],
        "readonly": [
          "t06",
          "t07",
          "t30",
          "t31"
        ],
        "approvable": [
          "t32",
          "t33",
          "t34",
          "t35",
          "t40",
          "t41",
          "t42",
          "t43"
        ]
      }
    },
    {
      "id": "finance",
      "name": "财务经理",
      "person": "钱财务",
      "account": "finance",
      "color": "#F79009",
      "brand": "启能力 · 财务协同",
      "slogan": "企业采购协同平台",
      "desc": "负责对账、发票校验、付款计划与付款执行审批；业务单据只读。",
      "domains": [
        "06"
      ],
      "extra": [
        "t26",
        "t28",
        "t31",
        "t39"
      ],
      "deny": [],
      "caps": [
        "view",
        "create",
        "edit",
        "submit",
        "approve",
        "reject",
        "export"
      ],
      "rowFilter": null,
      "scope": "授权模块：财务与 BI / 合同订单只读 / 收货只读",
      "wbTitle": "财务后台",
      "wbSub": "应付 · 对账 · 发票 · 付款执行",
      "policy": {
        "ownDomains": [
          "06"
        ],
        "ownModules": [],
        "approveDomains": [
          "06"
        ],
        "visible": [
          "t26",
          "t28",
          "t31",
          "t36",
          "t37",
          "t38",
          "t39"
        ],
        "modules": {
          "t00": [],
          "t01": [],
          "t02": [],
          "t03": [],
          "t04": [],
          "t05": [],
          "t06": [],
          "t07": [],
          "t08": [],
          "t09": [],
          "t10": [],
          "t11": [],
          "t12": [],
          "t13": [],
          "t14": [],
          "t15": [],
          "t16": [],
          "t17": [],
          "t18": [],
          "t19": [],
          "t20": [],
          "t21": [],
          "t22": [],
          "t23": [],
          "t24": [],
          "t25": [],
          "t26": [
            "view"
          ],
          "t27": [],
          "t28": [
            "view"
          ],
          "t29": [],
          "t30": [],
          "t31": [
            "view"
          ],
          "t32": [],
          "t33": [],
          "t34": [],
          "t35": [],
          "t36": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t37": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t38": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t39": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t40": [],
          "t41": [],
          "t42": [],
          "t43": []
        },
        "export": true,
        "boardExport": false,
        "system": [
          "notify",
          "permissions",
          "identity",
          "sync"
        ],
        "rowScope": "all",
        "writable": [
          "t36",
          "t37",
          "t38",
          "t39"
        ],
        "readonly": [
          "t26",
          "t28",
          "t31"
        ],
        "approvable": [
          "t36",
          "t37",
          "t38",
          "t39"
        ]
      }
    },
    {
      "id": "quality",
      "name": "质量工程师",
      "person": "许质检",
      "account": "quality",
      "color": "#12B76A",
      "brand": "启能力 · 质量协同",
      "slogan": "来料与整改闭环",
      "desc": "负责来料检验判定、不合格整改、供应商评审与记分卡。",
      "domains": [
        "02"
      ],
      "extra": [
        "t31",
        "t06"
      ],
      "deny": [],
      "caps": [
        "view",
        "create",
        "edit",
        "submit",
        "approve",
        "reject",
        "export"
      ],
      "rowFilter": null,
      "scope": "授权模块：供应商与质量 / 收货只读 / 物料主数据",
      "wbTitle": "质量工作台",
      "wbSub": "来料检验 · 不合格整改 · 供应商评审",
      "policy": {
        "ownDomains": [
          "02"
        ],
        "ownModules": [],
        "approveDomains": [
          "02"
        ],
        "visible": [
          "t06",
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16",
          "t31"
        ],
        "modules": {
          "t00": [],
          "t01": [],
          "t02": [],
          "t03": [],
          "t04": [],
          "t05": [],
          "t06": [
            "view"
          ],
          "t07": [],
          "t08": [],
          "t09": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t10": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t11": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t12": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t13": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t14": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t15": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t16": [
            "view",
            "create",
            "edit",
            "submit",
            "approve",
            "reject",
            "export"
          ],
          "t17": [],
          "t18": [],
          "t19": [],
          "t20": [],
          "t21": [],
          "t22": [],
          "t23": [],
          "t24": [],
          "t25": [],
          "t26": [],
          "t27": [],
          "t28": [],
          "t29": [],
          "t30": [],
          "t31": [
            "view"
          ],
          "t32": [],
          "t33": [],
          "t34": [],
          "t35": [],
          "t36": [],
          "t37": [],
          "t38": [],
          "t39": [],
          "t40": [],
          "t41": [],
          "t42": [],
          "t43": []
        },
        "export": true,
        "boardExport": false,
        "system": [
          "notify",
          "permissions",
          "identity",
          "sync"
        ],
        "rowScope": "all",
        "writable": [
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16"
        ],
        "readonly": [
          "t06",
          "t31"
        ],
        "approvable": [
          "t09",
          "t10",
          "t11",
          "t12",
          "t13",
          "t14",
          "t15",
          "t16"
        ]
      }
    },
    {
      "id": "supplier",
      "name": "供应商",
      "person": "陈经理",
      "account": "supplier",
      "color": "#EC4899",
      "brand": "启能力 · 供应商门户",
      "slogan": "苏州启能力精密制造有限公司",
      "desc": "外部协同角色：仅可见与本公司相关的单据，可登记准入、报价、预约送货，不能审批。",
      "domains": [],
      "extra": [
        "t09",
        "t10",
        "t11",
        "t13",
        "t21",
        "t22",
        "t24",
        "t25",
        "t26",
        "t28",
        "t30",
        "t31",
        "t37"
      ],
      "deny": [],
      "caps": [
        "view",
        "create",
        "edit",
        "submit",
        "export"
      ],
      "rowFilter": "supplier",
      "scope": "门户隔离：仅可见本公司相关单据，无审批权限",
      "wbTitle": "供应商协同门户",
      "wbSub": "准入 · 报价 · 订单 · 送货 · 对账",
      "policy": {
        "ownDomains": [],
        "ownModules": [
          "t10",
          "t11",
          "t22",
          "t24",
          "t30",
          "t37"
        ],
        "approveDomains": [],
        "visible": [
          "t09",
          "t10",
          "t11",
          "t13",
          "t21",
          "t22",
          "t24",
          "t25",
          "t26",
          "t28",
          "t30",
          "t31",
          "t37"
        ],
        "modules": {
          "t00": [],
          "t01": [],
          "t02": [],
          "t03": [],
          "t04": [],
          "t05": [],
          "t06": [],
          "t07": [],
          "t08": [],
          "t09": [
            "view"
          ],
          "t10": [
            "view",
            "create",
            "edit",
            "submit"
          ],
          "t11": [
            "view",
            "create",
            "edit",
            "submit"
          ],
          "t12": [],
          "t13": [
            "view"
          ],
          "t14": [],
          "t15": [],
          "t16": [],
          "t17": [],
          "t18": [],
          "t19": [],
          "t20": [],
          "t21": [
            "view"
          ],
          "t22": [
            "view",
            "create",
            "edit",
            "submit"
          ],
          "t23": [],
          "t24": [
            "view",
            "create",
            "edit",
            "submit"
          ],
          "t25": [
            "view"
          ],
          "t26": [
            "view"
          ],
          "t27": [],
          "t28": [
            "view"
          ],
          "t29": [],
          "t30": [
            "view",
            "create",
            "edit",
            "submit"
          ],
          "t31": [
            "view"
          ],
          "t32": [],
          "t33": [],
          "t34": [],
          "t35": [],
          "t36": [],
          "t37": [
            "view",
            "create",
            "edit",
            "submit"
          ],
          "t38": [],
          "t39": [],
          "t40": [],
          "t41": [],
          "t42": [],
          "t43": []
        },
        "export": false,
        "boardExport": false,
        "system": [
          "notify",
          "permissions",
          "identity",
          "sync"
        ],
        "rowScope": "supplier",
        "writable": [
          "t10",
          "t11",
          "t22",
          "t24",
          "t30",
          "t37"
        ],
        "readonly": [
          "t09",
          "t13",
          "t21",
          "t25",
          "t26",
          "t28",
          "t31"
        ],
        "approvable": []
      }
    }
  ],
  "modules": [
    {
      "key": "t00",
      "name": "系统导航与流程说明",
      "fullName": "00 系统导航与流程说明",
      "domain": "系统底座",
      "domainId": "00",
      "fields": [
        {
          "name": "模块名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "业务域",
          "type": "s",
          "typeName": "单选",
          "options": [
            "系统底座",
            "主数据",
            "供应商与质量",
            "需求与寻源",
            "合同与订单",
            "仓储与商城",
            "财务与BI",
            "装柜留痕"
          ]
        },
        {
          "name": "对应数据表",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "流程说明",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "负责人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "上线状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "已上线",
            "调试中",
            "规划中"
          ]
        },
        {
          "name": "入口链接",
          "type": "l",
          "typeName": "链接",
          "options": []
        },
        {
          "name": "更新日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "模块上线看板",
          "params": [
            "上线状态"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "模块导览画册",
          "params": [
            "入口链接"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "模块总览",
          "params": []
        }
      ],
      "ai": [
        {
          "name": "AI 流程解读",
          "fields": [
            "流程说明",
            "模块名称"
          ],
          "prompt": "请用不超过 80 字概述该模块的业务目标、上游输入与下游输出，并点出最关键的一个风控点："
        }
      ],
      "form": null,
      "hasAttachment": false,
      "hasAI": true,
      "statusField": "上线状态",
      "statusOptions": [
        "已上线",
        "调试中",
        "规划中"
      ],
      "states": {
        "draft": "已上线",
        "running": "调试中",
        "done": "已上线",
        "reject": "调试中"
      },
      "noField": null,
      "noPrefix": "MOD",
      "titleField": "模块名称",
      "listFields": [
        "模块名称",
        "业务域",
        "对应数据表",
        "负责人",
        "上线状态",
        "入口链接"
      ],
      "required": [
        "模块名称"
      ],
      "hints": {
        "模块名称": "请填写模块名称",
        "业务域": "请填写业务域",
        "对应数据表": "请填写对应数据表",
        "流程说明": "请填写流程说明",
        "负责人": "选择系统内的经办人或审核人",
        "上线状态": "由流程动作自动推进，请勿手工改写；当前选项：已上线 / 调试中 / 规划中",
        "入口链接": "请填写入口链接",
        "更新日期": "格式 YYYY-MM-DD"
      },
      "approvers": [
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「00 系统导航与流程说明」，共 8 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t01",
      "name": "组织与部门",
      "fullName": "01 组织与部门",
      "domain": "系统底座",
      "domainId": "00",
      "fields": [
        {
          "name": "组织/部门名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "组织",
            "部门"
          ]
        },
        {
          "name": "上级部门",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "负责人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "排序",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "启用",
            "停用"
          ]
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "组织类型看板",
          "params": [
            "类型"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "组织清单",
          "params": []
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "启用",
        "停用"
      ],
      "states": {
        "draft": "启用",
        "running": "停用",
        "done": "启用",
        "reject": "启用"
      },
      "noField": "编码",
      "noPrefix": "ORG",
      "titleField": "组织/部门名称",
      "listFields": [
        "组织/部门名称",
        "类型",
        "上级部门",
        "负责人",
        "排序",
        "状态"
      ],
      "required": [
        "组织/部门名称",
        "编码"
      ],
      "hints": {
        "组织/部门名称": "请填写组织/部门名称",
        "编码": "留空自动生成，编号规则：ORG-年月-序号",
        "类型": "请填写类型",
        "上级部门": "请填写上级部门",
        "负责人": "选择系统内的经办人或审核人",
        "排序": "只填数字",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：启用 / 停用",
        "备注": "请填写备注"
      },
      "approvers": [
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「01 组织与部门」，共 8 个字段、2 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t02",
      "name": "用户与角色",
      "fullName": "02 用户与角色",
      "domain": "系统底座",
      "domainId": "00",
      "fields": [
        {
          "name": "姓名",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "登录账号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "所属部门",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "角色",
          "type": "s",
          "typeName": "单选",
          "options": [
            "超级管理员",
            "采购员",
            "仓管员",
            "财务",
            "质量员",
            "装柜订单员",
            "装柜出库员",
            "装柜审核员",
            "供应商"
          ]
        },
        {
          "name": "手机",
          "type": "p",
          "typeName": "电话",
          "options": []
        },
        {
          "name": "邮箱",
          "type": "e",
          "typeName": "邮箱",
          "options": []
        },
        {
          "name": "用户类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "采购端",
            "供应商端"
          ]
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "启用",
            "停用"
          ]
        },
        {
          "name": "最后登录",
          "type": "d",
          "typeName": "日期",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "角色看板",
          "params": [
            "角色"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "人员卡片",
          "params": [
            "姓名"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "用户清单",
          "params": []
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "启用",
        "停用"
      ],
      "states": {
        "draft": "启用",
        "running": "停用",
        "done": "启用",
        "reject": "启用"
      },
      "noField": null,
      "noPrefix": "USR",
      "titleField": "姓名",
      "listFields": [
        "姓名",
        "登录账号",
        "所属部门",
        "角色",
        "手机",
        "状态"
      ],
      "required": [
        "姓名"
      ],
      "hints": {
        "姓名": "请填写姓名",
        "登录账号": "请填写登录账号",
        "所属部门": "请填写所属部门",
        "角色": "请填写角色",
        "手机": "请填写手机",
        "邮箱": "请填写邮箱",
        "用户类型": "请填写用户类型",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：启用 / 停用",
        "最后登录": "格式 YYYY-MM-DD"
      },
      "approvers": [
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「02 用户与角色」，共 9 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t03",
      "name": "数据字典与审批流",
      "fullName": "03 数据字典与审批流",
      "domain": "系统底座",
      "domainId": "00",
      "fields": [
        {
          "name": "配置名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "字典类型",
            "字典项",
            "审批流定义",
            "审批节点"
          ]
        },
        {
          "name": "编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "值或标签",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "排序",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "适用业务",
          "type": "s",
          "typeName": "单选",
          "options": [
            "供应商准入",
            "采购申请",
            "询价",
            "竞价",
            "招标",
            "合同",
            "订单",
            "入库",
            "出库",
            "付款"
          ]
        },
        {
          "name": "是否启用",
          "type": "b",
          "typeName": "复选框",
          "options": []
        },
        {
          "name": "说明",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "配置分类看板",
          "params": [
            "类型"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "配置清单",
          "params": []
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": null,
      "statusOptions": [],
      "states": {
        "draft": "草稿",
        "running": "草稿",
        "done": "草稿",
        "reject": "草稿"
      },
      "noField": "编码",
      "noPrefix": "CFG",
      "titleField": "配置名称",
      "listFields": [
        "配置名称",
        "类型",
        "值或标签",
        "排序",
        "适用业务",
        "是否启用"
      ],
      "required": [
        "配置名称",
        "编码"
      ],
      "hints": {
        "配置名称": "请填写配置名称",
        "类型": "请填写类型",
        "编码": "留空自动生成，编号规则：CFG-年月-序号",
        "值或标签": "请填写值或标签",
        "排序": "只填数字",
        "适用业务": "请填写适用业务",
        "是否启用": "勾选表示确认",
        "说明": "请填写说明"
      },
      "approvers": [
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「03 数据字典与审批流」，共 8 个字段、2 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t04",
      "name": "通知与操作日志",
      "fullName": "04 通知与操作日志",
      "domain": "系统底座",
      "domainId": "00",
      "fields": [
        {
          "name": "事件标题",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "事件类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "站内通知",
            "审批待办",
            "操作审计",
            "异常告警"
          ]
        },
        {
          "name": "业务对象",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "操作人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "发生时间",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "内容",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "处理状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待处理",
            "已读",
            "已处理",
            "已归档"
          ]
        },
        {
          "name": "关联链接",
          "type": "l",
          "typeName": "链接",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "待办处理看板",
          "params": [
            "处理状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "事件日历",
          "params": [
            "发生时间"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "事件流水",
          "params": []
        }
      ],
      "ai": [
        {
          "name": "AI 事件摘要",
          "fields": [
            "内容",
            "事件标题"
          ],
          "prompt": "请把该事件压缩成 40 字以内的一句话摘要，并判断是否需要人工介入："
        }
      ],
      "form": null,
      "hasAttachment": false,
      "hasAI": true,
      "statusField": "处理状态",
      "statusOptions": [
        "待处理",
        "已读",
        "已处理",
        "已归档"
      ],
      "states": {
        "draft": "待处理",
        "running": "已读",
        "done": "已归档",
        "reject": "已处理"
      },
      "noField": null,
      "noPrefix": "LOG",
      "titleField": "事件标题",
      "listFields": [
        "事件标题",
        "事件类型",
        "业务对象",
        "操作人",
        "发生时间",
        "处理状态"
      ],
      "required": [
        "事件标题"
      ],
      "hints": {
        "事件标题": "请填写事件标题",
        "事件类型": "请填写事件类型",
        "业务对象": "请填写业务对象",
        "操作人": "选择系统内的经办人或审核人",
        "发生时间": "格式 YYYY-MM-DD",
        "内容": "请填写内容",
        "处理状态": "由流程动作自动推进，请勿手工改写；当前选项：待处理 / 已读 / 已处理 / 已归档",
        "关联链接": "请填写关联链接"
      },
      "approvers": [
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「04 通知与操作日志」，共 8 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t05",
      "name": "附件中心",
      "fullName": "05 附件中心",
      "domain": "系统底座",
      "domainId": "00",
      "fields": [
        {
          "name": "附件名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "业务类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "资质证照",
            "合同",
            "报价",
            "投标",
            "检验报告",
            "发票",
            "装柜照片",
            "证据包",
            "其他"
          ]
        },
        {
          "name": "关联单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "附件文件",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "上传人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "上传日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "版本",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "A",
          "typeName": "画册",
          "name": "附件预览画册",
          "params": [
            "附件文件"
          ]
        },
        {
          "type": "K",
          "typeName": "看板",
          "name": "附件类型看板",
          "params": [
            "业务类型"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "上传日历",
          "params": [
            "上传日期"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 附件内容识别",
          "fields": [
            "附件名称",
            "备注"
          ],
          "prompt": "根据附件名称与备注，判断该材料属于哪类业务凭证，并列出还缺少的配套材料："
        }
      ],
      "form": null,
      "hasAttachment": true,
      "hasAI": true,
      "statusField": null,
      "statusOptions": [],
      "states": {
        "draft": "草稿",
        "running": "草稿",
        "done": "草稿",
        "reject": "草稿"
      },
      "noField": "关联单号",
      "noPrefix": "ATT",
      "titleField": "附件名称",
      "listFields": [
        "附件名称",
        "业务类型",
        "上传人",
        "上传日期",
        "版本"
      ],
      "required": [
        "附件名称",
        "关联单号"
      ],
      "hints": {
        "附件名称": "请填写附件名称",
        "业务类型": "请填写业务类型",
        "关联单号": "留空自动生成，编号规则：ATT-年月-序号",
        "附件文件": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "上传人": "选择系统内的经办人或审核人",
        "上传日期": "格式 YYYY-MM-DD",
        "版本": "请填写版本",
        "备注": "请填写备注"
      },
      "approvers": [
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「05 附件中心」，共 8 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t06",
      "name": "物料主数据",
      "fullName": "06 物料主数据",
      "domain": "主数据",
      "domainId": "01",
      "fields": [
        {
          "name": "物料名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "物料编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "品类",
          "type": "s",
          "typeName": "单选",
          "options": [
            "机械件",
            "电子件",
            "MRO耗材",
            "成品",
            "包装材料"
          ]
        },
        {
          "name": "规格型号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "计量单位",
          "type": "s",
          "typeName": "单选",
          "options": [
            "件",
            "套",
            "千克",
            "米",
            "箱"
          ]
        },
        {
          "name": "参考单价",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "启用",
            "停用"
          ]
        },
        {
          "name": "图片",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "创建日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "品类看板",
          "params": [
            "品类"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "物料图册",
          "params": [
            "图片"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "价格汇总",
          "params": [
            "参考单价"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 物料归类建议",
          "fields": [
            "物料名称",
            "规格型号"
          ],
          "prompt": "根据物料名称与规格型号，给出建议品类、常用计量单位及采购时注意的验收要点，60 字以内："
        }
      ],
      "form": null,
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "状态",
      "statusOptions": [
        "启用",
        "停用"
      ],
      "states": {
        "draft": "启用",
        "running": "停用",
        "done": "启用",
        "reject": "启用"
      },
      "noField": "物料编码",
      "noPrefix": "MAT",
      "titleField": "物料名称",
      "listFields": [
        "物料名称",
        "品类",
        "规格型号",
        "计量单位",
        "参考单价",
        "状态"
      ],
      "required": [
        "物料名称",
        "物料编码"
      ],
      "hints": {
        "物料名称": "请填写物料名称",
        "物料编码": "留空自动生成，编号规则：MAT-年月-序号",
        "品类": "请填写品类",
        "规格型号": "请填写规格型号",
        "计量单位": "请填写计量单位",
        "参考单价": "单位：人民币元（CNY），只填数字",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：启用 / 停用",
        "图片": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "创建日期": "格式 YYYY-MM-DD",
        "备注": "请填写备注"
      },
      "approvers": [
        "admin",
        "buyer"
      ],
      "guide": "本模块对应钉钉 AI 表格「06 物料主数据」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t07",
      "name": "仓库与库位",
      "fullName": "07 仓库与库位",
      "domain": "主数据",
      "domainId": "01",
      "fields": [
        {
          "name": "仓库名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "仓库编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "仓库类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "普通仓",
            "VMI仓",
            "保税仓",
            "暂存区"
          ]
        },
        {
          "name": "库位",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "负责人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "地址",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "容量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "启用",
            "停用"
          ]
        },
        {
          "name": "平面示意图",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "仓库类型看板",
          "params": [
            "仓库类型"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "仓库示意图册",
          "params": [
            "平面示意图"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "启用",
        "停用"
      ],
      "states": {
        "draft": "启用",
        "running": "停用",
        "done": "启用",
        "reject": "启用"
      },
      "noField": "仓库编码",
      "noPrefix": "WH",
      "titleField": "仓库名称",
      "listFields": [
        "仓库名称",
        "仓库类型",
        "库位",
        "负责人",
        "地址",
        "状态"
      ],
      "required": [
        "仓库名称",
        "仓库编码"
      ],
      "hints": {
        "仓库名称": "请填写仓库名称",
        "仓库编码": "留空自动生成，编号规则：WH-年月-序号",
        "仓库类型": "请填写仓库类型",
        "库位": "请填写库位",
        "负责人": "选择系统内的经办人或审核人",
        "地址": "请填写地址",
        "容量": "只填数字",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：启用 / 停用",
        "平面示意图": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "admin",
        "buyer"
      ],
      "guide": "本模块对应钉钉 AI 表格「07 仓库与库位」，共 9 个字段、2 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t08",
      "name": "单位币种与汇率",
      "fullName": "08 单位币种与汇率",
      "domain": "主数据",
      "domainId": "01",
      "fields": [
        {
          "name": "名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "计量单位",
            "币种",
            "汇率"
          ]
        },
        {
          "name": "编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "符号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "汇率",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "生效日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "生效",
            "失效"
          ]
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "配置类型看板",
          "params": [
            "类型"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "汇率生效日历",
          "params": [
            "生效日期"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "生效",
        "失效"
      ],
      "states": {
        "draft": "生效",
        "running": "生效",
        "done": "生效",
        "reject": "生效"
      },
      "noField": "编码",
      "noPrefix": "UNIT",
      "titleField": "名称",
      "listFields": [
        "名称",
        "类型",
        "符号",
        "汇率",
        "生效日期",
        "状态"
      ],
      "required": [
        "名称",
        "编码"
      ],
      "hints": {
        "名称": "请填写名称",
        "类型": "请填写类型",
        "编码": "留空自动生成，编号规则：UNIT-年月-序号",
        "符号": "请填写符号",
        "汇率": "只填数字",
        "生效日期": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：生效 / 失效"
      },
      "approvers": [
        "admin",
        "buyer"
      ],
      "guide": "本模块对应钉钉 AI 表格「08 单位币种与汇率」，共 7 个字段、2 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t09",
      "name": "供应商档案",
      "fullName": "09 供应商档案",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "供应商名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "统一社会信用代码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "待审核",
            "待补充",
            "审核中",
            "潜在",
            "合格",
            "冻结",
            "黑名单"
          ]
        },
        {
          "name": "供货品类",
          "type": "m",
          "typeName": "多选",
          "options": [
            "机械件",
            "电子件",
            "MRO耗材",
            "成品",
            "包装材料"
          ]
        },
        {
          "name": "联系人",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "联系电话",
          "type": "p",
          "typeName": "电话",
          "options": []
        },
        {
          "name": "邮箱",
          "type": "e",
          "typeName": "邮箱",
          "options": []
        },
        {
          "name": "合作起始日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "评级",
          "type": "q",
          "typeName": "评分",
          "options": []
        },
        {
          "name": "收款账户",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "资质附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "供应商状态看板",
          "params": [
            "供应商状态"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "供应商资质画册",
          "params": [
            "资质附件"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "供应商总览",
          "params": []
        }
      ],
      "ai": [
        {
          "name": "AI 供应商画像",
          "fields": [
            "供应商名称",
            "供货品类"
          ],
          "prompt": "请基于供应商名称与供货品类，生成 60 字以内的供应商画像，并提示尽调时应重点核验的资质："
        }
      ],
      "form": {
        "name": "供应商自助登记",
        "title": "供应商自助登记表",
        "desc": "请填写企业基本信息并上传营业执照，提交后进入准入审核流程"
      },
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "供应商状态",
      "statusOptions": [
        "草稿",
        "待审核",
        "待补充",
        "审核中",
        "潜在",
        "合格",
        "冻结",
        "黑名单"
      ],
      "states": {
        "draft": "潜在",
        "running": "审核中",
        "done": "合格",
        "reject": "黑名单"
      },
      "noField": "供应商编码",
      "noPrefix": "SUP",
      "titleField": "供应商名称",
      "listFields": [
        "供应商名称",
        "统一社会信用代码",
        "供应商状态",
        "供货品类",
        "联系人",
        "联系电话"
      ],
      "required": [
        "供应商名称",
        "供应商编码"
      ],
      "hints": {
        "供应商名称": "请填写供应商名称",
        "供应商编码": "留空自动生成，编号规则：SUP-年月-序号",
        "统一社会信用代码": "请填写统一社会信用代码",
        "供应商状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 待审核 / 待补充 / 审核中 / 潜在 / 合格",
        "供货品类": "可多选，点击选项切换选中状态",
        "联系人": "请填写联系人",
        "联系电话": "请填写联系电话",
        "邮箱": "请填写邮箱",
        "合作起始日": "格式 YYYY-MM-DD",
        "评级": "1-5 分，点击星标评分",
        "收款账户": "请填写收款账户",
        "资质附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「09 供应商档案」，共 12 个字段、3 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_UbiNWwS_NsmUd81",
      "backendFormName": "供应商自助登记",
      "entryModeDefault": "backend"
    },
    {
      "key": "t10",
      "name": "供应商准入申请",
      "fullName": "10 供应商准入申请",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "申请单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "邀请方式",
          "type": "s",
          "typeName": "单选",
          "options": [
            "公开链接",
            "定向邀请",
            "批量导入"
          ]
        },
        {
          "name": "申请状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "待审核",
            "待补充",
            "审核中",
            "已批准",
            "已拒绝"
          ]
        },
        {
          "name": "提交日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "审核人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "审核意见",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "营业执照",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "补充材料",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "准入进度看板",
          "params": [
            "申请状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "提交日历",
          "params": [
            "提交日期"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "准入周期甘特",
          "params": [
            "提交日期"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 准入材料核验",
          "fields": [
            "供应商名称",
            "审核意见"
          ],
          "prompt": "请根据供应商名称与审核意见，列出准入审核还缺哪些材料，并给出 40 字以内的审核建议："
        }
      ],
      "form": {
        "name": "供应商准入申请",
        "title": "供应商准入申请",
        "desc": "供应商入口：填写企业信息、上传营业执照与资质材料"
      },
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "申请状态",
      "statusOptions": [
        "草稿",
        "待审核",
        "待补充",
        "审核中",
        "已批准",
        "已拒绝"
      ],
      "states": {
        "draft": "草稿",
        "running": "审核中",
        "done": "已批准",
        "reject": "已拒绝"
      },
      "noField": "申请单号",
      "noPrefix": "SUI",
      "titleField": "供应商名称",
      "listFields": [
        "供应商名称",
        "邀请方式",
        "申请状态",
        "提交日期",
        "审核人"
      ],
      "required": [
        "申请单号",
        "供应商名称"
      ],
      "hints": {
        "申请单号": "留空自动生成，编号规则：SUI-年月-序号",
        "供应商名称": "请填写供应商名称",
        "邀请方式": "请填写邀请方式",
        "申请状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 待审核 / 待补充 / 审核中 / 已批准 / 已拒绝",
        "提交日期": "格式 YYYY-MM-DD",
        "审核人": "选择系统内的经办人或审核人",
        "审核意见": "请填写审核意见",
        "营业执照": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "补充材料": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「10 供应商准入申请」，共 9 个字段、3 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_csKJkCD_UDvWWsF",
      "backendFormName": "供应商准入申请",
      "entryModeDefault": "backend"
    },
    {
      "key": "t11",
      "name": "供应商资质证照",
      "fullName": "11 供应商资质证照",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "证照名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "证照类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "营业执照",
            "ISO9001",
            "行业特殊资质",
            "税务登记",
            "银行开户许可",
            "其他"
          ]
        },
        {
          "name": "证照编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "有效期至",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "证照文件",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "核验状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待核验",
            "已通过",
            "已过期",
            "不通过"
          ]
        },
        {
          "name": "核验人",
          "type": "u",
          "typeName": "人员",
          "options": []
        }
      ],
      "views": [
        {
          "type": "A",
          "typeName": "画册",
          "name": "证照预览画册",
          "params": [
            "证照文件"
          ]
        },
        {
          "type": "K",
          "typeName": "看板",
          "name": "核验状态看板",
          "params": [
            "核验状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "证照到期日历",
          "params": [
            "有效期至"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 证照要点提取",
          "fields": [
            "证照名称",
            "证照类型"
          ],
          "prompt": "请说明该类证照在供应商准入中需要核对的三项关键要素，60 字以内："
        }
      ],
      "form": null,
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "核验状态",
      "statusOptions": [
        "待核验",
        "已通过",
        "已过期",
        "不通过"
      ],
      "states": {
        "draft": "待核验",
        "running": "已通过",
        "done": "已通过",
        "reject": "不通过"
      },
      "noField": "证照编号",
      "noPrefix": "LIC",
      "titleField": "证照名称",
      "listFields": [
        "证照名称",
        "供应商",
        "证照类型",
        "有效期至",
        "核验状态",
        "核验人"
      ],
      "required": [
        "证照名称",
        "证照编号"
      ],
      "hints": {
        "证照名称": "请填写证照名称",
        "供应商": "请填写供应商",
        "证照类型": "请填写证照类型",
        "证照编号": "留空自动生成，编号规则：LIC-年月-序号",
        "有效期至": "格式 YYYY-MM-DD",
        "证照文件": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "核验状态": "由流程动作自动推进，请勿手工改写；当前选项：待核验 / 已通过 / 已过期 / 不通过",
        "核验人": "选择系统内的经办人或审核人"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「11 供应商资质证照」，共 8 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t12",
      "name": "供应商变更与品类",
      "fullName": "12 供应商变更与品类",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "变更单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "变更类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "资料变更",
            "再认证",
            "冻结",
            "加入黑名单",
            "供货品类调整"
          ]
        },
        {
          "name": "变更内容",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "提交日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "审批状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待审批",
            "已批准",
            "已拒绝"
          ]
        },
        {
          "name": "生效日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "变更审批看板",
          "params": [
            "审批状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "生效日历",
          "params": [
            "生效日期"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "审批状态",
      "statusOptions": [
        "待审批",
        "已批准",
        "已拒绝"
      ],
      "states": {
        "draft": "待审批",
        "running": "待审批",
        "done": "已批准",
        "reject": "已拒绝"
      },
      "noField": "变更单号",
      "noPrefix": "CHG",
      "titleField": "变更单号",
      "listFields": [
        "供应商",
        "变更类型",
        "提交日期",
        "审批状态",
        "生效日期"
      ],
      "required": [
        "变更单号"
      ],
      "hints": {
        "变更单号": "留空自动生成，编号规则：CHG-年月-序号",
        "供应商": "请填写供应商",
        "变更类型": "请填写变更类型",
        "变更内容": "请填写变更内容",
        "提交日期": "格式 YYYY-MM-DD",
        "审批状态": "由流程动作自动推进，请勿手工改写；当前选项：待审批 / 已批准 / 已拒绝",
        "生效日期": "格式 YYYY-MM-DD",
        "附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「12 供应商变更与品类」，共 8 个字段、2 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t13",
      "name": "供应商评审",
      "fullName": "13 供应商评审",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "评审单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "评审模板",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "评审日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "评审人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "综合得分",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "评审等级",
          "type": "s",
          "typeName": "单选",
          "options": [
            "A",
            "B",
            "C",
            "D"
          ]
        },
        {
          "name": "评审结论",
          "type": "s",
          "typeName": "单选",
          "options": [
            "通过",
            "有条件通过",
            "不通过"
          ]
        },
        {
          "name": "评审报告",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "评审结论看板",
          "params": [
            "评审结论"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "评审日历",
          "params": [
            "评审日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "得分汇总",
          "params": [
            "综合得分"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 评审建议",
          "fields": [
            "供应商",
            "综合得分"
          ],
          "prompt": "请结合供应商与综合得分，给出一句 50 字以内的定级建议及后续辅导重点："
        }
      ],
      "form": null,
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "评审结论",
      "statusOptions": [
        "通过",
        "有条件通过",
        "不通过"
      ],
      "states": {
        "draft": "通过",
        "running": "有条件通过",
        "done": "通过",
        "reject": "不通过"
      },
      "noField": "评审单号",
      "noPrefix": "REV",
      "titleField": "评审单号",
      "listFields": [
        "供应商",
        "评审模板",
        "评审日期",
        "评审人",
        "综合得分",
        "评审结论"
      ],
      "required": [
        "评审单号"
      ],
      "hints": {
        "评审单号": "留空自动生成，编号规则：REV-年月-序号",
        "供应商": "请填写供应商",
        "评审模板": "请填写评审模板",
        "评审日期": "格式 YYYY-MM-DD",
        "评审人": "选择系统内的经办人或审核人",
        "综合得分": "只填数字",
        "评审等级": "请填写评审等级",
        "评审结论": "由流程动作自动推进，请勿手工改写；当前选项：通过 / 有条件通过 / 不通过",
        "评审报告": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「13 供应商评审」，共 9 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t14",
      "name": "来料检验",
      "fullName": "14 来料检验",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "检验单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "关联订单",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "物料",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "送检数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "抽检数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "合格数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "检验结果",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待检",
            "合格",
            "不合格",
            "让步接收"
          ]
        },
        {
          "name": "检验日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "检验员",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "检验报告",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "检验结果看板",
          "params": [
            "检验结果"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "检验日历",
          "params": [
            "检验日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "数量汇总",
          "params": [
            "送检数量"
          ]
        }
      ],
      "ai": [],
      "form": {
        "name": "来料检验登记",
        "title": "来料检验登记",
        "desc": "仓管/IQC 入口：登记到货批次、抽检数量与检验结论并上传报告"
      },
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "检验结果",
      "statusOptions": [
        "待检",
        "合格",
        "不合格",
        "让步接收"
      ],
      "states": {
        "draft": "待检",
        "running": "待检",
        "done": "合格",
        "reject": "不合格"
      },
      "noField": "检验单号",
      "noPrefix": "IQC",
      "titleField": "物料",
      "listFields": [
        "关联订单",
        "供应商",
        "物料",
        "送检数量",
        "抽检数量",
        "检验结果"
      ],
      "required": [
        "检验单号",
        "物料"
      ],
      "hints": {
        "检验单号": "留空自动生成，编号规则：IQC-年月-序号",
        "关联订单": "请填写关联订单",
        "供应商": "请填写供应商",
        "物料": "请填写物料",
        "送检数量": "只填数字",
        "抽检数量": "只填数字",
        "合格数量": "只填数字",
        "检验结果": "由流程动作自动推进，请勿手工改写；当前选项：待检 / 合格 / 不合格 / 让步接收",
        "检验日期": "格式 YYYY-MM-DD",
        "检验员": "选择系统内的经办人或审核人",
        "检验报告": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「14 来料检验」，共 11 个字段、3 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_Q7qB42B_L5JL3PL",
      "backendFormName": "来料检验登记",
      "entryModeDefault": "backend"
    },
    {
      "key": "t15",
      "name": "不合格与整改",
      "fullName": "15 不合格与整改",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "NCR不合格品",
            "8D整改",
            "SCAR供应商纠正"
          ]
        },
        {
          "name": "关联检验单",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "问题描述",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "处置方式",
          "type": "s",
          "typeName": "单选",
          "options": [
            "退货",
            "返工",
            "让步接收",
            "报废"
          ]
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待处理",
            "供应商填写中",
            "审核中",
            "索赔中",
            "已关闭"
          ]
        },
        {
          "name": "责任方",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "截止日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "整改附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "整改状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "整改周期甘特",
          "params": [
            "截止日期"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "整改截止日历",
          "params": [
            "截止日期"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 根因分析",
          "fields": [
            "问题描述",
            "处置方式"
          ],
          "prompt": "请基于问题描述与处置方式，推测最可能的三条根因，并给出一条纠正措施，80 字以内："
        }
      ],
      "form": null,
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "状态",
      "statusOptions": [
        "待处理",
        "供应商填写中",
        "审核中",
        "索赔中",
        "已关闭"
      ],
      "states": {
        "draft": "待处理",
        "running": "审核中",
        "done": "已关闭",
        "reject": "待处理"
      },
      "noField": "单号",
      "noPrefix": "NCR",
      "titleField": "单号",
      "listFields": [
        "类型",
        "关联检验单",
        "供应商",
        "处置方式",
        "状态",
        "责任方"
      ],
      "required": [
        "单号"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：NCR-年月-序号",
        "类型": "请填写类型",
        "关联检验单": "请填写关联检验单",
        "供应商": "请填写供应商",
        "问题描述": "请填写问题描述",
        "处置方式": "请填写处置方式",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：待处理 / 供应商填写中 / 审核中 / 索赔中 / 已关闭",
        "责任方": "请填写责任方",
        "截止日期": "格式 YYYY-MM-DD",
        "整改附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「15 不合格与整改」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t16",
      "name": "质量记分卡与考察",
      "fullName": "16 质量记分卡与考察",
      "domain": "供应商与质量",
      "domainId": "02",
      "fields": [
        {
          "name": "名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "周期",
          "type": "s",
          "typeName": "单选",
          "options": [
            "月度",
            "季度",
            "年度"
          ]
        },
        {
          "name": "交付得分",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "质量得分",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "响应得分",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "综合得分",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "等级",
          "type": "s",
          "typeName": "单选",
          "options": [
            "A",
            "B",
            "C",
            "D"
          ]
        },
        {
          "name": "考察计划",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "考察日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "考察报告",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "评级看板",
          "params": [
            "等级"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "考察日历",
          "params": [
            "考察日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "得分汇总",
          "params": [
            "综合得分"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": null,
      "statusOptions": [],
      "states": {
        "draft": "草稿",
        "running": "草稿",
        "done": "草稿",
        "reject": "草稿"
      },
      "noField": null,
      "noPrefix": "SCORE",
      "titleField": "名称",
      "listFields": [
        "名称",
        "供应商",
        "周期",
        "交付得分",
        "质量得分",
        "响应得分"
      ],
      "required": [
        "名称"
      ],
      "hints": {
        "名称": "请填写名称",
        "供应商": "请填写供应商",
        "周期": "请填写周期",
        "交付得分": "只填数字",
        "质量得分": "只填数字",
        "响应得分": "只填数字",
        "综合得分": "只填数字",
        "等级": "请填写等级",
        "考察计划": "请填写考察计划",
        "考察日期": "格式 YYYY-MM-DD",
        "考察报告": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "quality",
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「16 质量记分卡与考察」，共 11 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t17",
      "name": "采购项目",
      "fullName": "17 采购项目",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "项目名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "项目编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "项目类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "常规采购",
            "战略采购",
            "框架采购",
            "紧急采购"
          ]
        },
        {
          "name": "预算金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "负责人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "开始日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "结束日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "进行中",
            "已关闭",
            "已驳回"
          ]
        },
        {
          "name": "目标说明",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "立项附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "项目状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "项目甘特",
          "params": [
            "开始日期",
            "结束日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "预算汇总",
          "params": [
            "预算金额"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "进行中",
        "已关闭",
        "已驳回"
      ],
      "states": {
        "draft": "草稿",
        "running": "审批中",
        "done": "已关闭",
        "reject": "已驳回"
      },
      "noField": "项目编号",
      "noPrefix": "PRJ",
      "titleField": "项目名称",
      "listFields": [
        "项目名称",
        "项目类型",
        "预算金额",
        "负责人",
        "开始日期",
        "状态"
      ],
      "required": [
        "项目名称",
        "项目编号"
      ],
      "hints": {
        "项目名称": "请填写项目名称",
        "项目编号": "留空自动生成，编号规则：PRJ-年月-序号",
        "项目类型": "请填写项目类型",
        "预算金额": "单位：人民币元（CNY），只填数字",
        "负责人": "选择系统内的经办人或审核人",
        "开始日期": "格式 YYYY-MM-DD",
        "结束日期": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 进行中 / 已关闭 / 已驳回",
        "目标说明": "请填写目标说明",
        "立项附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「17 采购项目」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t18",
      "name": "采购申请 PR",
      "fullName": "18 采购申请 PR",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "申请单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "申请标题",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "申请部门",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "申请人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "物料或服务",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "预算金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "期望到货日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "紧急程度",
          "type": "s",
          "typeName": "单选",
          "options": [
            "紧急",
            "高",
            "中",
            "低"
          ]
        },
        {
          "name": "审批状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "已生效",
            "已驳回",
            "已撤回"
          ]
        },
        {
          "name": "关联项目",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "审批进度看板",
          "params": [
            "审批状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "到货日历",
          "params": [
            "期望到货日"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "申请交付甘特",
          "params": [
            "期望到货日"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "预算汇总",
          "params": [
            "预算金额"
          ]
        }
      ],
      "ai": [],
      "form": {
        "name": "采购申请提报",
        "title": "采购申请提报",
        "desc": "业务部门入口：填写需求、预算与期望到货日，提交后自动流转审批"
      },
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "审批状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "已生效",
        "已驳回",
        "已撤回"
      ],
      "states": {
        "draft": "草稿",
        "running": "审批中",
        "done": "已生效",
        "reject": "已驳回"
      },
      "noField": "申请单号",
      "noPrefix": "PR",
      "titleField": "申请标题",
      "listFields": [
        "申请标题",
        "申请部门",
        "申请人",
        "物料或服务",
        "数量",
        "审批状态"
      ],
      "required": [
        "申请单号",
        "申请标题"
      ],
      "hints": {
        "申请单号": "留空自动生成，编号规则：PR-年月-序号",
        "申请标题": "请填写申请标题",
        "申请部门": "请填写申请部门",
        "申请人": "选择系统内的经办人或审核人",
        "物料或服务": "请填写物料或服务",
        "数量": "只填数字",
        "预算金额": "单位：人民币元（CNY），只填数字",
        "期望到货日": "格式 YYYY-MM-DD",
        "紧急程度": "请填写紧急程度",
        "审批状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 已生效 / 已驳回 / 已撤回",
        "关联项目": "请填写关联项目",
        "附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「18 采购申请 PR」，共 12 个字段、4 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_s1IYdZt_EFEBSSz",
      "backendFormName": "采购申请提报",
      "entryModeDefault": "backend"
    },
    {
      "key": "t19",
      "name": "需求池与寻源派发",
      "fullName": "19 需求池与寻源派发",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "需求编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "需求内容",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "来源",
          "type": "s",
          "typeName": "单选",
          "options": [
            "采购申请",
            "商城下单",
            "库存预警",
            "手工录入"
          ]
        },
        {
          "name": "数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "需求状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待处理",
            "处理中",
            "已拆分",
            "已合并",
            "已完成",
            "已取消"
          ]
        },
        {
          "name": "寻源方式",
          "type": "s",
          "typeName": "单选",
          "options": [
            "询比价",
            "竞价",
            "招投标",
            "单一来源",
            "配额",
            "协议采购",
            "意见征集"
          ]
        },
        {
          "name": "派发人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "派发日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "期望完成日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "需求状态看板",
          "params": [
            "需求状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "寻源排期甘特",
          "params": [
            "派发日期",
            "期望完成日"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "派发日历",
          "params": [
            "派发日期"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": "需求状态",
      "statusOptions": [
        "待处理",
        "处理中",
        "已拆分",
        "已合并",
        "已完成",
        "已取消"
      ],
      "states": {
        "draft": "待处理",
        "running": "处理中",
        "done": "已完成",
        "reject": "已取消"
      },
      "noField": "需求编号",
      "noPrefix": "DEM",
      "titleField": "需求内容",
      "listFields": [
        "需求内容",
        "来源",
        "数量",
        "需求状态",
        "寻源方式",
        "派发人"
      ],
      "required": [
        "需求编号",
        "需求内容"
      ],
      "hints": {
        "需求编号": "留空自动生成，编号规则：DEM-年月-序号",
        "需求内容": "请填写需求内容",
        "来源": "请填写来源",
        "数量": "只填数字",
        "需求状态": "由流程动作自动推进，请勿手工改写；当前选项：待处理 / 处理中 / 已拆分 / 已合并 / 已完成 / 已取消",
        "寻源方式": "请填写寻源方式",
        "派发人": "选择系统内的经办人或审核人",
        "派发日期": "格式 YYYY-MM-DD",
        "期望完成日": "格式 YYYY-MM-DD",
        "备注": "请填写备注"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「19 需求池与寻源派发」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t20",
      "name": "意见征集与定标",
      "fullName": "20 意见征集与定标",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "主题",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "征集状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "征集中",
            "评审中",
            "已定标",
            "已关闭"
          ]
        },
        {
          "name": "参与供应商数",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "收到方案数",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "定标结果",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "转出对象",
          "type": "s",
          "typeName": "单选",
          "options": [
            "转合同",
            "转订单",
            "关闭"
          ]
        },
        {
          "name": "定标日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "负责人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "方案附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "征集进度看板",
          "params": [
            "征集状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "定标日历",
          "params": [
            "定标日期"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "征集状态",
      "statusOptions": [
        "征集中",
        "评审中",
        "已定标",
        "已关闭"
      ],
      "states": {
        "draft": "征集中",
        "running": "评审中",
        "done": "已定标",
        "reject": "已关闭"
      },
      "noField": "单号",
      "noPrefix": "AWD",
      "titleField": "主题",
      "listFields": [
        "主题",
        "征集状态",
        "参与供应商数",
        "收到方案数",
        "定标结果",
        "转出对象"
      ],
      "required": [
        "单号",
        "主题"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：AWD-年月-序号",
        "主题": "请填写主题",
        "征集状态": "由流程动作自动推进，请勿手工改写；当前选项：征集中 / 评审中 / 已定标 / 已关闭",
        "参与供应商数": "只填数字",
        "收到方案数": "只填数字",
        "定标结果": "请填写定标结果",
        "转出对象": "请填写转出对象",
        "定标日期": "格式 YYYY-MM-DD",
        "负责人": "选择系统内的经办人或审核人",
        "方案附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「20 意见征集与定标」，共 10 个字段、2 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t21",
      "name": "询价单 RFQ",
      "fullName": "21 询价单 RFQ",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "询价单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "询价标题",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "寻源方式",
          "type": "s",
          "typeName": "单选",
          "options": [
            "询比价",
            "竞价",
            "招投标",
            "单一来源"
          ]
        },
        {
          "name": "采购员",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "发布日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "报价截止",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "开标日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "已发布",
            "报价中",
            "已开标",
            "比价中",
            "授标中",
            "已授标",
            "流标",
            "已关闭"
          ]
        },
        {
          "name": "预算金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "邀请供应商数",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "询价文件",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "询价进度看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "询价周期甘特",
          "params": [
            "发布日期",
            "报价截止"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "开标日历",
          "params": [
            "开标日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "预算汇总",
          "params": [
            "预算金额"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "已发布",
        "报价中",
        "已开标",
        "比价中",
        "授标中",
        "已授标",
        "流标",
        "已关闭"
      ],
      "states": {
        "draft": "草稿",
        "running": "报价中",
        "done": "已授标",
        "reject": "流标"
      },
      "noField": "询价单号",
      "noPrefix": "RFQ",
      "titleField": "询价标题",
      "listFields": [
        "询价标题",
        "寻源方式",
        "采购员",
        "发布日期",
        "报价截止",
        "状态"
      ],
      "required": [
        "询价单号",
        "询价标题"
      ],
      "hints": {
        "询价单号": "留空自动生成，编号规则：RFQ-年月-序号",
        "询价标题": "请填写询价标题",
        "寻源方式": "请填写寻源方式",
        "采购员": "选择系统内的经办人或审核人",
        "发布日期": "格式 YYYY-MM-DD",
        "报价截止": "格式 YYYY-MM-DD",
        "开标日期": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 已发布 / 报价中 / 已开标 / 比价中",
        "预算金额": "单位：人民币元（CNY），只填数字",
        "邀请供应商数": "只填数字",
        "询价文件": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "备注": "请填写备注"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「21 询价单 RFQ」，共 12 个字段、4 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t22",
      "name": "供应商报价",
      "fullName": "22 供应商报价",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "报价单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "关联询价单",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "报价总额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "币种",
          "type": "s",
          "typeName": "单选",
          "options": [
            "CNY",
            "USD",
            "EUR"
          ]
        },
        {
          "name": "报价日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "有效期至",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "已提交",
            "已撤回",
            "无效"
          ]
        },
        {
          "name": "报价附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "报价状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "报价附件画册",
          "params": [
            "报价附件"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "报价汇总",
          "params": [
            "报价总额"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 报价分析",
          "fields": [
            "供应商",
            "报价总额"
          ],
          "prompt": "请结合供应商与报价总额，用 50 字以内点评该报价的竞争力与需要澄清的商务条款："
        }
      ],
      "form": {
        "name": "供应商报价提交",
        "title": "供应商报价提交",
        "desc": "供应商入口：选择询价单、填写报价金额并上传盖章报价单"
      },
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "已提交",
        "已撤回",
        "无效"
      ],
      "states": {
        "draft": "草稿",
        "running": "已提交",
        "done": "已提交",
        "reject": "已撤回"
      },
      "noField": "报价单号",
      "noPrefix": "QUO",
      "titleField": "报价单号",
      "listFields": [
        "关联询价单",
        "供应商",
        "报价总额",
        "币种",
        "报价日期",
        "状态"
      ],
      "required": [
        "报价单号"
      ],
      "hints": {
        "报价单号": "留空自动生成，编号规则：QUO-年月-序号",
        "关联询价单": "请填写关联询价单",
        "供应商": "请填写供应商",
        "报价总额": "单位：人民币元（CNY），只填数字",
        "币种": "请填写币种",
        "报价日期": "格式 YYYY-MM-DD",
        "有效期至": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 已提交 / 已撤回 / 无效",
        "报价附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「22 供应商报价」，共 9 个字段、3 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_SeRdd62_sHsnOfj",
      "backendFormName": "供应商报价提交",
      "entryModeDefault": "backend"
    },
    {
      "key": "t23",
      "name": "竞价场次与出价",
      "fullName": "23 竞价场次与出价",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "场次或出价编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "竞价场次",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "轮次",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "出价金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "出价时间",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "是否领先",
          "type": "b",
          "typeName": "复选框",
          "options": []
        },
        {
          "name": "场次状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "已发布",
            "进行中",
            "已结束",
            "授标中",
            "已授标",
            "流标",
            "已关闭"
          ]
        },
        {
          "name": "规则说明",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "结果",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待定",
            "中标",
            "未中标"
          ]
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "场次状态看板",
          "params": [
            "场次状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "出价日历",
          "params": [
            "出价时间"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "出价汇总",
          "params": [
            "出价金额"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": "场次状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "已发布",
        "进行中",
        "已结束",
        "授标中",
        "已授标",
        "流标",
        "已关闭"
      ],
      "states": {
        "draft": "草稿",
        "running": "审批中",
        "done": "已关闭",
        "reject": "流标"
      },
      "noField": "场次或出价编号",
      "noPrefix": "BID",
      "titleField": "场次或出价编号",
      "listFields": [
        "竞价场次",
        "供应商",
        "轮次",
        "出价金额",
        "出价时间",
        "场次状态"
      ],
      "required": [
        "场次或出价编号"
      ],
      "hints": {
        "场次或出价编号": "留空自动生成，编号规则：BID-年月-序号",
        "竞价场次": "请填写竞价场次",
        "供应商": "请填写供应商",
        "轮次": "只填数字",
        "出价金额": "单位：人民币元（CNY），只填数字",
        "出价时间": "格式 YYYY-MM-DD",
        "是否领先": "勾选表示确认",
        "场次状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 已发布 / 进行中 / 已结束 / 授标中",
        "规则说明": "请填写规则说明",
        "结果": "请填写结果"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「23 竞价场次与出价」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t24",
      "name": "招标计划与投标评标",
      "fullName": "24 招标计划与投标评标",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "招标编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "项目名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "招标方式",
          "type": "s",
          "typeName": "单选",
          "options": [
            "公开招标",
            "邀请招标"
          ]
        },
        {
          "name": "发布日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "报名截止",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "开标日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "已发布",
            "报名中",
            "投标中",
            "开标中",
            "评标中",
            "授标中",
            "已授标",
            "流标",
            "已关闭"
          ]
        },
        {
          "name": "评标规则",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "保证金",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "投标文件",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "技术得分",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "商务得分",
          "type": "n",
          "typeName": "数字",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "招标进度看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "招标周期甘特",
          "params": [
            "发布日期",
            "开标日期"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "开标日历",
          "params": [
            "开标日期"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "已发布",
        "报名中",
        "投标中",
        "开标中",
        "评标中",
        "授标中",
        "已授标",
        "流标",
        "已关闭"
      ],
      "states": {
        "draft": "草稿",
        "running": "开标中",
        "done": "已授标",
        "reject": "流标"
      },
      "noField": "招标编号",
      "noPrefix": "TEN",
      "titleField": "项目名称",
      "listFields": [
        "项目名称",
        "招标方式",
        "发布日期",
        "报名截止",
        "开标日期",
        "状态"
      ],
      "required": [
        "招标编号",
        "项目名称"
      ],
      "hints": {
        "招标编号": "留空自动生成，编号规则：TEN-年月-序号",
        "项目名称": "请填写项目名称",
        "招标方式": "请填写招标方式",
        "发布日期": "格式 YYYY-MM-DD",
        "报名截止": "格式 YYYY-MM-DD",
        "开标日期": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 已发布 / 报名中 / 投标中 / 开标中",
        "评标规则": "请填写评标规则",
        "保证金": "单位：人民币元（CNY），只填数字",
        "投标文件": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "技术得分": "只填数字",
        "商务得分": "只填数字"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「24 招标计划与投标评标」，共 12 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t25",
      "name": "中标公示与授标",
      "fullName": "25 中标公示与授标",
      "domain": "需求与寻源",
      "domainId": "03",
      "fields": [
        {
          "name": "公示编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "项目名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "中标供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "中标金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "公示开始日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "公示结束日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待审批",
            "已批准",
            "已公示",
            "已转出"
          ]
        },
        {
          "name": "转出对象",
          "type": "s",
          "typeName": "单选",
          "options": [
            "转合同",
            "转订单"
          ]
        },
        {
          "name": "附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "公示状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "公示周期甘特",
          "params": [
            "公示开始日",
            "公示结束日"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "金额汇总",
          "params": [
            "中标金额"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "待审批",
        "已批准",
        "已公示",
        "已转出"
      ],
      "states": {
        "draft": "待审批",
        "running": "已批准",
        "done": "已批准",
        "reject": "已公示"
      },
      "noField": "公示编号",
      "noPrefix": "WIN",
      "titleField": "项目名称",
      "listFields": [
        "项目名称",
        "中标供应商",
        "中标金额",
        "公示开始日",
        "公示结束日",
        "状态"
      ],
      "required": [
        "公示编号",
        "项目名称"
      ],
      "hints": {
        "公示编号": "留空自动生成，编号规则：WIN-年月-序号",
        "项目名称": "请填写项目名称",
        "中标供应商": "请填写中标供应商",
        "中标金额": "单位：人民币元（CNY），只填数字",
        "公示开始日": "格式 YYYY-MM-DD",
        "公示结束日": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：待审批 / 已批准 / 已公示 / 已转出",
        "转出对象": "请填写转出对象",
        "附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「25 中标公示与授标」，共 9 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t26",
      "name": "合同台账",
      "fullName": "26 合同台账",
      "domain": "合同与订单",
      "domainId": "04",
      "fields": [
        {
          "name": "合同名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "合同编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "签约相对方",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "合同类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "采购合同",
            "框架协议",
            "补充协议",
            "服务合同"
          ]
        },
        {
          "name": "合同金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "签订日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "生效日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "到期日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "合同状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "评审中",
            "审批中",
            "待修订",
            "待签署",
            "签署中",
            "生效中",
            "变更中",
            "已到期",
            "已终止",
            "已归档",
            "作废"
          ]
        },
        {
          "name": "负责人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "合同正文",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "风险条款",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "付款条件",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "合同状态看板",
          "params": [
            "合同状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "合同周期甘特",
          "params": [
            "生效日期",
            "到期日期"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "到期日历",
          "params": [
            "到期日期"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "合同文本画册",
          "params": [
            "合同正文"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "金额汇总",
          "params": [
            "合同金额"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 合同风险提示",
          "fields": [
            "合同名称",
            "风险条款"
          ],
          "prompt": "请结合合同名称与风险条款，指出最需要关注的三项履约或付款风险，80 字以内："
        }
      ],
      "form": {
        "name": "合同起草登记",
        "title": "合同起草登记",
        "desc": "法务/采购入口：登记合同主体、金额、期限与正文，提交后触发评审"
      },
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "合同状态",
      "statusOptions": [
        "草稿",
        "评审中",
        "审批中",
        "待修订",
        "待签署",
        "签署中",
        "生效中",
        "变更中",
        "已到期",
        "已终止",
        "已归档",
        "作废",
        "草拟",
        "已驳回"
      ],
      "states": {
        "draft": "草拟",
        "running": "审批中",
        "done": "生效中",
        "reject": "已驳回"
      },
      "noField": "合同编号",
      "noPrefix": "CT",
      "titleField": "合同名称",
      "listFields": [
        "合同名称",
        "签约相对方",
        "合同类型",
        "合同金额",
        "签订日期",
        "合同状态"
      ],
      "required": [
        "合同名称",
        "合同编号"
      ],
      "hints": {
        "合同名称": "请填写合同名称",
        "合同编号": "留空自动生成，编号规则：CT-年月-序号",
        "签约相对方": "请填写签约相对方",
        "合同类型": "请填写合同类型",
        "合同金额": "单位：人民币元（CNY），只填数字",
        "签订日期": "格式 YYYY-MM-DD",
        "生效日期": "格式 YYYY-MM-DD",
        "到期日期": "格式 YYYY-MM-DD",
        "合同状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 评审中 / 审批中 / 待修订 / 待签署 / 签署中",
        "负责人": "选择系统内的经办人或审核人",
        "合同正文": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "风险条款": "请填写风险条款",
        "付款条件": "请填写付款条件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「26 合同台账」，共 13 个字段、5 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_1zALym4_DqwoTNO",
      "backendFormName": "合同起草登记",
      "entryModeDefault": "backend"
    },
    {
      "key": "t27",
      "name": "合同模板与用印归档",
      "fullName": "27 合同模板与用印归档",
      "domain": "合同与订单",
      "domainId": "04",
      "fields": [
        {
          "name": "名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "合同模板",
            "风险条款",
            "印章信息",
            "用印记录",
            "合同版本",
            "归档记录"
          ]
        },
        {
          "name": "关联合同",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "版本",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "用印方式",
          "type": "s",
          "typeName": "单选",
          "options": [
            "电子签",
            "实体印章",
            "两者"
          ]
        },
        {
          "name": "经办人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "办理日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "归档状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待归档",
            "已归档",
            "已作废"
          ]
        },
        {
          "name": "文件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "A",
          "typeName": "画册",
          "name": "文件预览画册",
          "params": [
            "文件"
          ]
        },
        {
          "type": "K",
          "typeName": "看板",
          "name": "归档状态看板",
          "params": [
            "归档状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "办理日历",
          "params": [
            "办理日期"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "归档状态",
      "statusOptions": [
        "待归档",
        "已归档",
        "已作废"
      ],
      "states": {
        "draft": "待归档",
        "running": "待归档",
        "done": "已归档",
        "reject": "已归档"
      },
      "noField": null,
      "noPrefix": "ARC",
      "titleField": "名称",
      "listFields": [
        "名称",
        "类型",
        "关联合同",
        "版本",
        "用印方式",
        "归档状态"
      ],
      "required": [
        "名称"
      ],
      "hints": {
        "名称": "请填写名称",
        "类型": "请填写类型",
        "关联合同": "请填写关联合同",
        "版本": "请填写版本",
        "用印方式": "请填写用印方式",
        "经办人": "选择系统内的经办人或审核人",
        "办理日期": "格式 YYYY-MM-DD",
        "归档状态": "由流程动作自动推进，请勿手工改写；当前选项：待归档 / 已归档 / 已作废",
        "文件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「27 合同模板与用印归档」，共 9 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t28",
      "name": "采购订单 PO",
      "fullName": "28 采购订单 PO",
      "domain": "合同与订单",
      "domainId": "04",
      "fields": [
        {
          "name": "订单名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "采购订单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "关联合同",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "订单金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "下单日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "期望交付日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "订单状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "待确认",
            "协商中",
            "生效中",
            "部分发货",
            "部分收货",
            "变更中",
            "已完成",
            "已关闭",
            "作废"
          ]
        },
        {
          "name": "采购员",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "物料明细",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "已收数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "订单附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "订单状态看板",
          "params": [
            "订单状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "交付排程甘特",
          "params": [
            "下单日期",
            "期望交付日"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "交付日历",
          "params": [
            "期望交付日"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "金额汇总",
          "params": [
            "订单金额"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "订单状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "待确认",
        "协商中",
        "生效中",
        "部分发货",
        "部分收货",
        "变更中",
        "已完成",
        "已关闭",
        "作废",
        "待收货",
        "已取消"
      ],
      "states": {
        "draft": "草稿",
        "running": "待收货",
        "done": "已完成",
        "reject": "已取消"
      },
      "noField": "采购订单号",
      "noPrefix": "PO",
      "titleField": "订单名称",
      "listFields": [
        "订单名称",
        "供应商",
        "关联合同",
        "订单金额",
        "下单日期",
        "订单状态"
      ],
      "required": [
        "订单名称",
        "采购订单号"
      ],
      "hints": {
        "订单名称": "请填写订单名称",
        "采购订单号": "留空自动生成，编号规则：PO-年月-序号",
        "供应商": "请填写供应商",
        "关联合同": "请填写关联合同",
        "订单金额": "单位：人民币元（CNY），只填数字",
        "下单日期": "格式 YYYY-MM-DD",
        "期望交付日": "格式 YYYY-MM-DD",
        "订单状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 待确认 / 协商中 / 生效中 / 部分发货",
        "采购员": "选择系统内的经办人或审核人",
        "物料明细": "请填写物料明细",
        "数量": "只填数字",
        "已收数量": "只填数字",
        "订单附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「28 采购订单 PO」，共 13 个字段、4 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t29",
      "name": "交货计划与变更",
      "fullName": "29 交货计划与变更",
      "domain": "合同与订单",
      "domainId": "04",
      "fields": [
        {
          "name": "计划编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "关联订单",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "批次",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "计划交货日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "计划数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "变更类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "无变更",
            "交期变更",
            "数量变更"
          ]
        },
        {
          "name": "确认状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待确认",
            "已确认",
            "已拒绝"
          ]
        },
        {
          "name": "变更原因",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "确认日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "确认状态看板",
          "params": [
            "确认状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "交货计划甘特",
          "params": [
            "计划交货日"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "交货日历",
          "params": [
            "计划交货日"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "确认状态",
      "statusOptions": [
        "待确认",
        "已确认",
        "已拒绝"
      ],
      "states": {
        "draft": "待确认",
        "running": "已确认",
        "done": "已确认",
        "reject": "已拒绝"
      },
      "noField": "计划编号",
      "noPrefix": "DLV",
      "titleField": "计划编号",
      "listFields": [
        "关联订单",
        "批次",
        "计划交货日",
        "计划数量",
        "变更类型",
        "确认状态"
      ],
      "required": [
        "计划编号"
      ],
      "hints": {
        "计划编号": "留空自动生成，编号规则：DLV-年月-序号",
        "关联订单": "请填写关联订单",
        "批次": "只填数字",
        "计划交货日": "格式 YYYY-MM-DD",
        "计划数量": "只填数字",
        "变更类型": "请填写变更类型",
        "确认状态": "由流程动作自动推进，请勿手工改写；当前选项：待确认 / 已确认 / 已拒绝",
        "变更原因": "请填写变更原因",
        "确认日期": "格式 YYYY-MM-DD",
        "附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「29 交货计划与变更」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t30",
      "name": "送货预约与 ASN",
      "fullName": "30 送货预约与 ASN",
      "domain": "合同与订单",
      "domainId": "04",
      "fields": [
        {
          "name": "预约或ASN单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "关联订单",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "送货日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "预约时段",
          "type": "s",
          "typeName": "单选",
          "options": [
            "上午",
            "下午",
            "夜间"
          ]
        },
        {
          "name": "车辆或物流",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "已发货",
            "运输中",
            "已到达",
            "已收货",
            "已取消"
          ]
        },
        {
          "name": "箱数",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "仓库",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "到货状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "到货预约日历",
          "params": [
            "送货日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "箱数汇总",
          "params": [
            "箱数"
          ]
        }
      ],
      "ai": [],
      "form": {
        "name": "供应商送货预约",
        "title": "供应商送货预约",
        "desc": "供应商入口：预约送货时间、填写车辆与箱数，仓库据此安排收货月台"
      },
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "已发货",
        "运输中",
        "已到达",
        "已收货",
        "已取消",
        "已预约",
        "已到货"
      ],
      "states": {
        "draft": "草稿",
        "running": "已预约",
        "done": "已到货",
        "reject": "已取消"
      },
      "noField": "预约或ASN单号",
      "noPrefix": "ASN",
      "titleField": "预约或ASN单号",
      "listFields": [
        "关联订单",
        "供应商",
        "送货日期",
        "预约时段",
        "车辆或物流",
        "状态"
      ],
      "required": [
        "预约或ASN单号"
      ],
      "hints": {
        "预约或ASN单号": "留空自动生成，编号规则：ASN-年月-序号",
        "关联订单": "请填写关联订单",
        "供应商": "请填写供应商",
        "送货日期": "格式 YYYY-MM-DD",
        "预约时段": "请填写预约时段",
        "车辆或物流": "请填写车辆或物流",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 已发货 / 运输中 / 已到达 / 已收货 / 已取消",
        "箱数": "只填数字",
        "仓库": "请填写仓库",
        "附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「30 送货预约与 ASN」，共 10 个字段、3 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_1kJCtgI_xtoau1F",
      "backendFormName": "供应商送货预约",
      "entryModeDefault": "backend"
    },
    {
      "key": "t31",
      "name": "收货与退货",
      "fullName": "31 收货与退货",
      "domain": "合同与订单",
      "domainId": "04",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "收货确认",
            "采购退货"
          ]
        },
        {
          "name": "关联订单",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "物料",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "收货日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "检验结果",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待检",
            "合格",
            "不合格",
            "让步接收"
          ]
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "已收货",
            "质检中",
            "已入库",
            "审批中",
            "已退货",
            "已关闭"
          ]
        },
        {
          "name": "退货原因",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "凭证",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "收货状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "收货日历",
          "params": [
            "收货日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "数量汇总",
          "params": [
            "数量"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "已收货",
        "质检中",
        "已入库",
        "审批中",
        "已退货",
        "已关闭",
        "待收货",
        "待检验"
      ],
      "states": {
        "draft": "待收货",
        "running": "待检验",
        "done": "已入库",
        "reject": "已退货"
      },
      "noField": "单号",
      "noPrefix": "RCV",
      "titleField": "物料",
      "listFields": [
        "类型",
        "关联订单",
        "供应商",
        "物料",
        "数量",
        "状态"
      ],
      "required": [
        "单号",
        "物料"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：RCV-年月-序号",
        "类型": "请填写类型",
        "关联订单": "请填写关联订单",
        "供应商": "请填写供应商",
        "物料": "请填写物料",
        "数量": "只填数字",
        "收货日期": "格式 YYYY-MM-DD",
        "检验结果": "请填写检验结果",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 已收货 / 质检中 / 已入库 / 审批中 / 已退货",
        "退货原因": "请填写退货原因",
        "凭证": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "buyer",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「31 收货与退货」，共 11 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t32",
      "name": "库存余额与预警",
      "fullName": "32 库存余额与预警",
      "domain": "仓储与商城",
      "domainId": "05",
      "fields": [
        {
          "name": "物料",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "仓库",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "库位",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "现有库存",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "可用库存",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "安全库存",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "单位",
          "type": "s",
          "typeName": "单选",
          "options": [
            "件",
            "套",
            "千克",
            "米",
            "箱"
          ]
        },
        {
          "name": "预警状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "正常",
            "偏低",
            "超储",
            "缺货"
          ]
        },
        {
          "name": "VMI水位",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "最近更新时间",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "库存预警看板",
          "params": [
            "预警状态"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "库位卡片",
          "params": [
            "物料"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "库存汇总",
          "params": [
            "现有库存"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 补货建议",
          "fields": [
            "物料",
            "现有库存"
          ],
          "prompt": "请结合物料与库存量，用 50 字以内给出是否补货及建议补货量的判断："
        }
      ],
      "form": null,
      "hasAttachment": false,
      "hasAI": true,
      "statusField": "预警状态",
      "statusOptions": [
        "正常",
        "偏低",
        "超储",
        "缺货"
      ],
      "states": {
        "draft": "正常",
        "running": "偏低",
        "done": "正常",
        "reject": "偏低"
      },
      "noField": null,
      "noPrefix": "STK",
      "titleField": "物料",
      "listFields": [
        "物料",
        "仓库",
        "库位",
        "现有库存",
        "可用库存",
        "预警状态"
      ],
      "required": [
        "物料"
      ],
      "hints": {
        "物料": "请填写物料",
        "仓库": "请填写仓库",
        "库位": "请填写库位",
        "现有库存": "只填数字",
        "可用库存": "只填数字",
        "安全库存": "只填数字",
        "单位": "请填写单位",
        "预警状态": "由流程动作自动推进，请勿手工改写；当前选项：正常 / 偏低 / 超储 / 缺货",
        "VMI水位": "只填数字",
        "最近更新时间": "格式 YYYY-MM-DD",
        "备注": "请填写备注"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「32 库存余额与预警」，共 11 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t33",
      "name": "出入库与调拨盘点",
      "fullName": "33 出入库与调拨盘点",
      "domain": "仓储与商城",
      "domainId": "05",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "单据类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "入库",
            "出库",
            "调拨",
            "盘点",
            "领用",
            "采购退货"
          ]
        },
        {
          "name": "仓库",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "物料",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "经办人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "单据日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "已过账",
            "审批驳回",
            "已作废"
          ]
        },
        {
          "name": "关联单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "凭证",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "单据状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "单据日历",
          "params": [
            "单据日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "数量汇总",
          "params": [
            "数量"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "已过账",
        "审批驳回",
        "已作废",
        "待过审",
        "已驳回"
      ],
      "states": {
        "draft": "草稿",
        "running": "待过审",
        "done": "已过账",
        "reject": "已驳回"
      },
      "noField": "单号",
      "noPrefix": "RK",
      "titleField": "物料",
      "listFields": [
        "单据类型",
        "仓库",
        "物料",
        "数量",
        "经办人",
        "状态"
      ],
      "required": [
        "单号",
        "物料"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：RK-年月-序号",
        "单据类型": "请填写单据类型",
        "仓库": "请填写仓库",
        "物料": "请填写物料",
        "数量": "只填数字",
        "经办人": "选择系统内的经办人或审核人",
        "单据日期": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 已过账 / 审批驳回 / 已作废 / 待过审",
        "关联单号": "请填写关联单号",
        "凭证": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「33 出入库与调拨盘点」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t34",
      "name": "商城商品与价格协议",
      "fullName": "34 商城商品与价格协议",
      "domain": "仓储与商城",
      "domainId": "05",
      "fields": [
        {
          "name": "名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "上架商品",
            "价格协议",
            "协议明细"
          ]
        },
        {
          "name": "商品编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "协议价",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "市场价",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "生效日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "失效日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "审批中",
            "生效中",
            "已过期",
            "已停用"
          ]
        },
        {
          "name": "商品图片",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "协议附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "可见范围",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "A",
          "typeName": "画册",
          "name": "商品画册",
          "params": [
            "商品图片"
          ]
        },
        {
          "type": "K",
          "typeName": "看板",
          "name": "协议状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "协议生效日历",
          "params": [
            "生效日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "价格汇总",
          "params": [
            "协议价"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "审批中",
        "生效中",
        "已过期",
        "已停用"
      ],
      "states": {
        "draft": "草稿",
        "running": "审批中",
        "done": "生效中",
        "reject": "已过期"
      },
      "noField": "商品编码",
      "noPrefix": "MALL",
      "titleField": "名称",
      "listFields": [
        "名称",
        "类型",
        "供应商",
        "协议价",
        "市场价",
        "状态"
      ],
      "required": [
        "名称",
        "商品编码"
      ],
      "hints": {
        "名称": "请填写名称",
        "类型": "请填写类型",
        "商品编码": "留空自动生成，编号规则：MALL-年月-序号",
        "供应商": "请填写供应商",
        "协议价": "单位：人民币元（CNY），只填数字",
        "市场价": "单位：人民币元（CNY），只填数字",
        "生效日期": "格式 YYYY-MM-DD",
        "失效日期": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 审批中 / 生效中 / 已过期 / 已停用",
        "商品图片": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "协议附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "可见范围": "请填写可见范围"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「34 商城商品与价格协议」，共 12 个字段、4 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t35",
      "name": "购物车与商城公告",
      "fullName": "35 购物车与商城公告",
      "domain": "仓储与商城",
      "domainId": "05",
      "fields": [
        {
          "name": "名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "购物车",
            "购物车明细",
            "必看公告"
          ]
        },
        {
          "name": "用户",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "商品",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "数量",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "加入日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "公告内容",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "有效",
            "已提交",
            "已失效"
          ]
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "类型看板",
          "params": [
            "类型"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "加入日历",
          "params": [
            "加入日期"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "有效",
        "已提交",
        "已失效"
      ],
      "states": {
        "draft": "有效",
        "running": "已提交",
        "done": "已失效",
        "reject": "已提交"
      },
      "noField": null,
      "noPrefix": "CART",
      "titleField": "名称",
      "listFields": [
        "名称",
        "类型",
        "用户",
        "商品",
        "数量",
        "状态"
      ],
      "required": [
        "名称"
      ],
      "hints": {
        "名称": "请填写名称",
        "类型": "请填写类型",
        "用户": "请填写用户",
        "商品": "请填写商品",
        "数量": "只填数字",
        "加入日期": "格式 YYYY-MM-DD",
        "公告内容": "请填写公告内容",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：有效 / 已提交 / 已失效"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「35 购物车与商城公告」，共 8 个字段、2 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t36",
      "name": "付款计划与付款申请",
      "fullName": "36 付款计划与付款申请",
      "domain": "财务与BI",
      "domainId": "06",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "付款计划",
            "付款申请"
          ]
        },
        {
          "name": "关联合同",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "计划付款日",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "付款节点",
          "type": "s",
          "typeName": "单选",
          "options": [
            "预付款",
            "到货款",
            "验收款",
            "质保金",
            "尾款"
          ]
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待处理",
            "部分付款",
            "已完成",
            "已变更",
            "审批中",
            "已驳回",
            "待付款",
            "付款中",
            "已付款",
            "作废"
          ]
        },
        {
          "name": "申请人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "付款状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "付款日历",
          "params": [
            "计划付款日"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "付款排程甘特",
          "params": [
            "计划付款日"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "金额汇总",
          "params": [
            "金额"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "待处理",
        "部分付款",
        "已完成",
        "已变更",
        "审批中",
        "已驳回",
        "待付款",
        "付款中",
        "已付款",
        "作废"
      ],
      "states": {
        "draft": "待处理",
        "running": "审批中",
        "done": "已付款",
        "reject": "已驳回"
      },
      "noField": "单号",
      "noPrefix": "PAY",
      "titleField": "单号",
      "listFields": [
        "类型",
        "关联合同",
        "供应商",
        "金额",
        "计划付款日",
        "状态"
      ],
      "required": [
        "单号"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：PAY-年月-序号",
        "类型": "请填写类型",
        "关联合同": "请填写关联合同",
        "供应商": "请填写供应商",
        "金额": "单位：人民币元（CNY），只填数字",
        "计划付款日": "格式 YYYY-MM-DD",
        "付款节点": "请填写付款节点",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：待处理 / 部分付款 / 已完成 / 已变更 / 审批中 / 已驳回",
        "申请人": "选择系统内的经办人或审核人",
        "附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "finance",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「36 付款计划与付款申请」，共 10 个字段、4 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t37",
      "name": "对账与发票",
      "fullName": "37 对账与发票",
      "domain": "财务与BI",
      "domainId": "06",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "对账单",
            "对账明细",
            "发票"
          ]
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "对账周期",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "对账金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "发票号码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "发票金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "开票日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "待供应商确认",
            "有争议",
            "待买方确认",
            "已确认",
            "已作废"
          ]
        },
        {
          "name": "发票附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "对账状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "开票日历",
          "params": [
            "开票日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "金额汇总",
          "params": [
            "对账金额"
          ]
        }
      ],
      "ai": [
        {
          "name": "AI 票据核验",
          "fields": [
            "对账金额",
            "发票金额"
          ],
          "prompt": "请对比对账金额与发票金额，用一句话说明是否一致及可能原因，40 字以内："
        }
      ],
      "form": null,
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "待供应商确认",
        "有争议",
        "待买方确认",
        "已确认",
        "已作废",
        "待对账",
        "差异审核",
        "已驳回"
      ],
      "states": {
        "draft": "待对账",
        "running": "差异审核",
        "done": "已确认",
        "reject": "已驳回"
      },
      "noField": "单号",
      "noPrefix": "REC",
      "titleField": "单号",
      "listFields": [
        "类型",
        "供应商",
        "对账周期",
        "对账金额",
        "发票号码",
        "状态"
      ],
      "required": [
        "单号"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：REC-年月-序号",
        "类型": "请填写类型",
        "供应商": "请填写供应商",
        "对账周期": "请填写对账周期",
        "对账金额": "单位：人民币元（CNY），只填数字",
        "发票号码": "请填写发票号码",
        "发票金额": "单位：人民币元（CNY），只填数字",
        "开票日期": "格式 YYYY-MM-DD",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 待供应商确认 / 有争议 / 待买方确认 / 已确认 / 已作废",
        "发票附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "finance",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「37 对账与发票」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t38",
      "name": "扣款与付款执行",
      "fullName": "38 扣款与付款执行",
      "domain": "财务与BI",
      "domainId": "06",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "供应商扣款",
            "付款执行"
          ]
        },
        {
          "name": "供应商",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "扣款原因",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "金额",
          "type": "c",
          "typeName": "货币",
          "options": []
        },
        {
          "name": "执行日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "付款方式",
          "type": "s",
          "typeName": "单选",
          "options": [
            "电汇",
            "银行承兑",
            "信用证",
            "其他"
          ]
        },
        {
          "name": "银行流水号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待执行",
            "已执行",
            "已冲销"
          ]
        },
        {
          "name": "凭证",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "执行状态看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "执行日历",
          "params": [
            "执行日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "金额汇总",
          "params": [
            "金额"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "待执行",
        "已执行",
        "已冲销"
      ],
      "states": {
        "draft": "待执行",
        "running": "待执行",
        "done": "已冲销",
        "reject": "已执行"
      },
      "noField": "单号",
      "noPrefix": "DED",
      "titleField": "单号",
      "listFields": [
        "类型",
        "供应商",
        "金额",
        "执行日期",
        "付款方式",
        "状态"
      ],
      "required": [
        "单号"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：DED-年月-序号",
        "类型": "请填写类型",
        "供应商": "请填写供应商",
        "扣款原因": "请填写扣款原因",
        "金额": "单位：人民币元（CNY），只填数字",
        "执行日期": "格式 YYYY-MM-DD",
        "付款方式": "请填写付款方式",
        "银行流水号": "请填写银行流水号",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：待执行 / 已执行 / 已冲销",
        "凭证": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "finance",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「38 扣款与付款执行」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t39",
      "name": "经营看板与预警",
      "fullName": "39 经营看板与预警",
      "domain": "财务与BI",
      "domainId": "06",
      "fields": [
        {
          "name": "名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "看板",
            "看板组件",
            "预警规则",
            "预警事件",
            "订阅推送"
          ]
        },
        {
          "name": "指标",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "阈值",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "当前值",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "触发状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "正常",
            "预警",
            "严重"
          ]
        },
        {
          "name": "推送渠道",
          "type": "s",
          "typeName": "单选",
          "options": [
            "邮件",
            "钉钉",
            "站内"
          ]
        },
        {
          "name": "负责人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "发生日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "处理说明",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "预警等级看板",
          "params": [
            "触发状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "预警日历",
          "params": [
            "发生日期"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "指标汇总",
          "params": [
            "当前值"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": false,
      "hasAI": false,
      "statusField": "触发状态",
      "statusOptions": [
        "正常",
        "预警",
        "严重"
      ],
      "states": {
        "draft": "正常",
        "running": "正常",
        "done": "正常",
        "reject": "预警"
      },
      "noField": null,
      "noPrefix": "BI",
      "titleField": "名称",
      "listFields": [
        "名称",
        "类型",
        "指标",
        "阈值",
        "当前值",
        "触发状态"
      ],
      "required": [
        "名称"
      ],
      "hints": {
        "名称": "请填写名称",
        "类型": "请填写类型",
        "指标": "请填写指标",
        "阈值": "只填数字",
        "当前值": "只填数字",
        "触发状态": "由流程动作自动推进，请勿手工改写；当前选项：正常 / 预警 / 严重",
        "推送渠道": "请填写推送渠道",
        "负责人": "选择系统内的经办人或审核人",
        "发生日期": "格式 YYYY-MM-DD",
        "处理说明": "请填写处理说明"
      },
      "approvers": [
        "finance",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「39 经营看板与预警」，共 10 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t40",
      "name": "装柜柜次与核对闸门",
      "fullName": "40 装柜柜次与核对闸门",
      "domain": "装柜留痕",
      "domainId": "07",
      "fields": [
        {
          "name": "柜次编号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "采购订单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "集装箱号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "封条号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "车牌号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "司机",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "装柜日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "起运港",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "目的港",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "草稿",
            "待核对",
            "装柜中",
            "拍照完成",
            "审核中",
            "已归档",
            "异常"
          ]
        },
        {
          "name": "五要素核对",
          "type": "s",
          "typeName": "单选",
          "options": [
            "全部通过",
            "待核对",
            "不通过"
          ]
        },
        {
          "name": "箱数",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "毛重kg",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "净重kg",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "异常说明",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "审核员",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "附件",
          "type": "a",
          "typeName": "附件",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "柜次进度看板",
          "params": [
            "状态"
          ]
        },
        {
          "type": "G",
          "typeName": "甘特图",
          "name": "装柜排程甘特",
          "params": [
            "装柜日期"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "装柜日历",
          "params": [
            "装柜日期"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "柜次资料画册",
          "params": [
            "附件"
          ]
        }
      ],
      "ai": [],
      "form": {
        "name": "装柜柜次登记",
        "title": "装柜柜次登记",
        "desc": "装柜订单员入口：登记柜号、封条号、船期与五要素核对结果"
      },
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "草稿",
        "待核对",
        "装柜中",
        "拍照完成",
        "审核中",
        "已归档",
        "异常",
        "已驳回"
      ],
      "states": {
        "draft": "草稿",
        "running": "审核中",
        "done": "已归档",
        "reject": "已驳回"
      },
      "noField": "柜次编号",
      "noPrefix": "SHIP",
      "titleField": "柜次编号",
      "listFields": [
        "采购订单号",
        "集装箱号",
        "封条号",
        "车牌号",
        "司机",
        "状态"
      ],
      "required": [
        "柜次编号"
      ],
      "hints": {
        "柜次编号": "留空自动生成，编号规则：SHIP-年月-序号",
        "采购订单号": "请填写采购订单号",
        "集装箱号": "请填写集装箱号",
        "封条号": "请填写封条号",
        "车牌号": "请填写车牌号",
        "司机": "请填写司机",
        "装柜日期": "格式 YYYY-MM-DD",
        "起运港": "请填写起运港",
        "目的港": "请填写目的港",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：草稿 / 待核对 / 装柜中 / 拍照完成 / 审核中 / 已归档",
        "五要素核对": "请填写五要素核对",
        "箱数": "只填数字",
        "毛重kg": "只填数字",
        "净重kg": "只填数字",
        "异常说明": "请填写异常说明",
        "审核员": "选择系统内的经办人或审核人",
        "附件": "本地演示模式：文件仅保存在当前浏览器，支持多文件"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「40 装柜柜次与核对闸门」，共 17 个字段、4 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_wvVO47C_UkYzwjQ",
      "backendFormName": "装柜柜次登记",
      "entryModeDefault": "backend"
    },
    {
      "key": "t41",
      "name": "装柜拍照标准与槽位",
      "fullName": "41 装柜拍照标准与槽位",
      "domain": "装柜留痕",
      "domainId": "07",
      "fields": [
        {
          "name": "槽位名称",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "槽位编码",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "照片类别",
          "type": "s",
          "typeName": "单选",
          "options": [
            "标准照",
            "海关核查"
          ]
        },
        {
          "name": "序号",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "是否必拍",
          "type": "b",
          "typeName": "复选框",
          "options": []
        },
        {
          "name": "拍摄要求",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "对应海关字段",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "标准示例图",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "启用",
            "停用"
          ]
        }
      ],
      "views": [
        {
          "type": "A",
          "typeName": "画册",
          "name": "标准示例画册",
          "params": [
            "标准示例图"
          ]
        },
        {
          "type": "K",
          "typeName": "看板",
          "name": "照片类别看板",
          "params": [
            "照片类别"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "槽位清单",
          "params": []
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "状态",
      "statusOptions": [
        "启用",
        "停用"
      ],
      "states": {
        "draft": "启用",
        "running": "停用",
        "done": "启用",
        "reject": "启用"
      },
      "noField": "槽位编码",
      "noPrefix": "SLOT",
      "titleField": "槽位名称",
      "listFields": [
        "槽位名称",
        "照片类别",
        "序号",
        "是否必拍",
        "对应海关字段",
        "状态"
      ],
      "required": [
        "槽位名称",
        "槽位编码"
      ],
      "hints": {
        "槽位名称": "请填写槽位名称",
        "槽位编码": "留空自动生成，编号规则：SLOT-年月-序号",
        "照片类别": "请填写照片类别",
        "序号": "只填数字",
        "是否必拍": "勾选表示确认",
        "拍摄要求": "请填写拍摄要求",
        "对应海关字段": "请填写对应海关字段",
        "标准示例图": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "状态": "由流程动作自动推进，请勿手工改写；当前选项：启用 / 停用"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「41 装柜拍照标准与槽位」，共 9 个字段、3 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    },
    {
      "key": "t42",
      "name": "装柜留痕照片",
      "fullName": "42 装柜留痕照片",
      "domain": "装柜留痕",
      "domainId": "07",
      "fields": [
        {
          "name": "照片记录",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "关联柜次",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "槽位",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "拍摄时间",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "拍摄人",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "现场照片",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "照片说明",
          "type": "r",
          "typeName": "富文本",
          "options": []
        },
        {
          "name": "核验状态",
          "type": "s",
          "typeName": "单选",
          "options": [
            "待核验",
            "通过",
            "需重拍",
            "异常"
          ]
        },
        {
          "name": "柜号识别",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "A",
          "typeName": "画册",
          "name": "现场证据画册",
          "params": [
            "现场照片"
          ]
        },
        {
          "type": "K",
          "typeName": "看板",
          "name": "核验状态看板",
          "params": [
            "核验状态"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "拍摄日历",
          "params": [
            "拍摄时间"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "照片清单",
          "params": []
        }
      ],
      "ai": [
        {
          "name": "AI 照片合规判断",
          "fields": [
            "槽位",
            "照片说明"
          ],
          "prompt": "请依据槽位与照片说明，判断这张装柜留痕照片是否满足取证要求，并指出可能的缺失点，60 字以内："
        }
      ],
      "form": {
        "name": "现场拍照上传",
        "title": "装柜现场拍照上传",
        "desc": "出库员入口：按槽位逐一上传现场照片，AI 自动辅助判断是否合规"
      },
      "hasAttachment": true,
      "hasAI": true,
      "statusField": "核验状态",
      "statusOptions": [
        "待核验",
        "通过",
        "需重拍",
        "异常",
        "不通过"
      ],
      "states": {
        "draft": "待核验",
        "running": "待核验",
        "done": "通过",
        "reject": "不通过"
      },
      "noField": null,
      "noPrefix": "PHOTO",
      "titleField": "照片记录",
      "listFields": [
        "照片记录",
        "关联柜次",
        "槽位",
        "拍摄时间",
        "拍摄人",
        "核验状态"
      ],
      "required": [
        "照片记录"
      ],
      "hints": {
        "照片记录": "请填写照片记录",
        "关联柜次": "请填写关联柜次",
        "槽位": "请填写槽位",
        "拍摄时间": "格式 YYYY-MM-DD",
        "拍摄人": "选择系统内的经办人或审核人",
        "现场照片": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "照片说明": "请填写照片说明",
        "核验状态": "由流程动作自动推进，请勿手工改写；当前选项：待核验 / 通过 / 需重拍 / 异常 / 不通过",
        "柜号识别": "请填写柜号识别",
        "备注": "请填写备注"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「42 装柜留痕照片」，共 10 个字段、4 个视图。",
      "hasBackendForm": true,
      "formUrl": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_QX5wonu_z70MqKP",
      "backendFormName": "现场拍照上传",
      "entryModeDefault": "backend"
    },
    {
      "key": "t43",
      "name": "重量核查与审核归档",
      "fullName": "43 重量核查与审核归档",
      "domain": "装柜留痕",
      "domainId": "07",
      "fields": [
        {
          "name": "单号",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "类型",
          "type": "s",
          "typeName": "单选",
          "options": [
            "净重核查",
            "毛重核查",
            "海关映射",
            "审核裁定",
            "证据包导出"
          ]
        },
        {
          "name": "关联柜次",
          "type": "t",
          "typeName": "单行文本",
          "options": []
        },
        {
          "name": "单件净重",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "每箱毛重",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "箱数",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "总毛重",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "申报值",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "偏差",
          "type": "n",
          "typeName": "数字",
          "options": []
        },
        {
          "name": "核验结论",
          "type": "s",
          "typeName": "单选",
          "options": [
            "一致",
            "不一致",
            "待复核"
          ]
        },
        {
          "name": "审核员",
          "type": "u",
          "typeName": "人员",
          "options": []
        },
        {
          "name": "归档日期",
          "type": "d",
          "typeName": "日期",
          "options": []
        },
        {
          "name": "证据包",
          "type": "a",
          "typeName": "附件",
          "options": []
        },
        {
          "name": "备注",
          "type": "r",
          "typeName": "富文本",
          "options": []
        }
      ],
      "views": [
        {
          "type": "K",
          "typeName": "看板",
          "name": "核验结论看板",
          "params": [
            "核验结论"
          ]
        },
        {
          "type": "C",
          "typeName": "日历",
          "name": "归档日历",
          "params": [
            "归档日期"
          ]
        },
        {
          "type": "A",
          "typeName": "画册",
          "name": "证据包画册",
          "params": [
            "证据包"
          ]
        },
        {
          "type": "R",
          "typeName": "表格",
          "name": "重量汇总",
          "params": [
            "总毛重"
          ]
        }
      ],
      "ai": [],
      "form": null,
      "hasAttachment": true,
      "hasAI": false,
      "statusField": "核验结论",
      "statusOptions": [
        "一致",
        "不一致",
        "待复核",
        "待核查",
        "审核中",
        "已归档",
        "已驳回"
      ],
      "states": {
        "draft": "待核查",
        "running": "审核中",
        "done": "已归档",
        "reject": "已驳回"
      },
      "noField": "单号",
      "noPrefix": "WEIGHT",
      "titleField": "单号",
      "listFields": [
        "类型",
        "关联柜次",
        "单件净重",
        "每箱毛重",
        "箱数",
        "核验结论"
      ],
      "required": [
        "单号"
      ],
      "hints": {
        "单号": "留空自动生成，编号规则：WEIGHT-年月-序号",
        "类型": "请填写类型",
        "关联柜次": "请填写关联柜次",
        "单件净重": "只填数字",
        "每箱毛重": "只填数字",
        "箱数": "只填数字",
        "总毛重": "只填数字",
        "申报值": "只填数字",
        "偏差": "只填数字",
        "核验结论": "由流程动作自动推进，请勿手工改写；当前选项：一致 / 不一致 / 待复核 / 待核查 / 审核中 / 已归档",
        "审核员": "选择系统内的经办人或审核人",
        "归档日期": "格式 YYYY-MM-DD",
        "证据包": "本地演示模式：文件仅保存在当前浏览器，支持多文件",
        "备注": "请填写备注"
      },
      "approvers": [
        "warehouse",
        "admin"
      ],
      "guide": "本模块对应钉钉 AI 表格「43 重量核查与审核归档」，共 14 个字段、4 个视图。",
      "hasBackendForm": false,
      "formUrl": "",
      "backendFormName": "",
      "entryModeDefault": "frontend"
    }
  ],
  "capLabels": {
    "view": "查看",
    "create": "新建",
    "edit": "编辑",
    "submit": "提交",
    "approve": "审批",
    "reject": "驳回",
    "delete": "删除",
    "export": "导出"
  },
  "systemLabels": {
    "guide": "系统搭建指南",
    "dict": "架构字典",
    "board": "经营看板",
    "flow": "全链路流程",
    "notify": "通知中心",
    "permissions": "我的权限",
    "identity": "演示身份切换",
    "settings": "系统设置",
    "backup": "全量数据备份",
    "reset": "重置演示数据",
    "portal": "钉钉全量入口",
    "audit": "全局审计与权限矩阵",
    "contract": "后端字段契约",
    "sync": "数据对齐与自动化流"
  },
  "flow": [
    {
      "step": "01",
      "name": "供应商准入",
      "domain": "02",
      "module": "t10",
      "desc": "自助登记 → 资质核验 → 合格档案"
    },
    {
      "step": "02",
      "name": "需求提报",
      "domain": "03",
      "module": "t18",
      "desc": "PR 提报 → 预算审批 → 需求归集"
    },
    {
      "step": "03",
      "name": "寻源定标",
      "domain": "03",
      "module": "t21",
      "desc": "RFQ 发布 → 报价比价 → 授标公示"
    },
    {
      "step": "04",
      "name": "合同订单",
      "domain": "04",
      "module": "t26",
      "desc": "合同起草 → 用印归档 → PO 下达"
    },
    {
      "step": "05",
      "name": "交付收货",
      "domain": "04",
      "module": "t30",
      "desc": "ASN 预约 → 收货登记 → 来料检验"
    },
    {
      "step": "06",
      "name": "仓储入库",
      "domain": "05",
      "module": "t33",
      "desc": "入库过账 → 库存更新 → 水位预警"
    },
    {
      "step": "07",
      "name": "财务结算",
      "domain": "06",
      "module": "t37",
      "desc": "对账开票 → 付款计划 → 付款执行"
    },
    {
      "step": "08",
      "name": "装柜留痕",
      "domain": "07",
      "module": "t40",
      "desc": "五要素闸门 → 拍照证据 → 重量归档"
    }
  ],
  "links": [
    {
      "from_": "t10",
      "to": "t09",
      "title": "准入通过 → 生成合格供应商档案",
      "map": {
        "供应商名称": "供应商名称",
        "申请单号": "来源单号"
      }
    },
    {
      "from_": "t18",
      "to": "t19",
      "title": "PR 生效 → 需求池自动派发",
      "map": {
        "申请标题": "需求内容",
        "申请单号": "需求编号",
        "数量": "数量"
      }
    },
    {
      "from_": "t19",
      "to": "t21",
      "title": "需求派发 → 生成询价单 RFQ",
      "map": {
        "需求编号": "来源需求",
        "需求内容": "询价标题"
      }
    },
    {
      "from_": "t21",
      "to": "t25",
      "title": "RFQ 授标 → 生成中标公示",
      "map": {
        "询价单号": "来源单号",
        "询价标题": "项目名称"
      }
    },
    {
      "from_": "t25",
      "to": "t26",
      "title": "中标公示 → 起草采购合同",
      "map": {
        "项目名称": "合同名称",
        "中标供应商": "签约相对方"
      }
    },
    {
      "from_": "t26",
      "to": "t28",
      "title": "合同生效 → 下达采购订单",
      "map": {
        "合同编号": "关联合同",
        "合同名称": "订单名称",
        "合同金额": "订单金额",
        "签约相对方": "供应商"
      }
    },
    {
      "from_": "t28",
      "to": "t30",
      "title": "订单下达 → 生成送货预约 ASN",
      "map": {
        "采购订单号": "采购订单号",
        "供应商": "供应商"
      }
    },
    {
      "from_": "t30",
      "to": "t31",
      "title": "ASN 到货 → 生成收货登记",
      "map": {
        "预约单号": "来源单号",
        "供应商": "供应商"
      }
    },
    {
      "from_": "t31",
      "to": "t14",
      "title": "收货登记 → 触发来料检验",
      "map": {
        "关联订单": "关联订单",
        "供应商": "供应商",
        "物料": "物料"
      }
    },
    {
      "from_": "t14",
      "to": "t33",
      "title": "检验合格 → 生成入库单",
      "map": {
        "检验单号": "来源单号",
        "供应商": "供应商",
        "合格数量": "数量"
      }
    },
    {
      "from_": "t33",
      "to": "t37",
      "title": "入库过账 → 生成对账单",
      "map": {
        "单号": "来源单号",
        "供应商": "供应商"
      }
    },
    {
      "from_": "t37",
      "to": "t36",
      "title": "对账确认 → 生成付款计划",
      "map": {
        "单号": "关联单据",
        "供应商": "供应商"
      }
    },
    {
      "from_": "t36",
      "to": "t38",
      "title": "付款审批 → 生成付款执行",
      "map": {
        "单号": "关联付款计划",
        "供应商": "供应商",
        "金额": "金额"
      }
    },
    {
      "from_": "t40",
      "to": "t43",
      "title": "柜次归档 → 生成重量核查",
      "map": {
        "柜次编号": "柜次编号",
        "毛重kg": "申报毛重kg"
      }
    }
  ],
  "guide": {
    "layers": [
      {
        "no": "01",
        "title": "先定角色，再定权限",
        "text": "6 个角色对应 6 套可见模块与操作权限。超级管理员全域可见；采购管需求、寻源、合同、订单；仓管管收货、库存、装柜；财务管对账付款；质量管检验整改；供应商只能看到与本公司相关的单据，且没有审批权限。",
        "action": "在「系统设置 → 角色与权限」里查看完整矩阵，用顶部角色切换器逐个登录验证。"
      },
      {
        "no": "02",
        "title": "把 144 张 SQL 表收敛成 44 个业务模块",
        "text": "按「业务对象合并、主子表合一」把数据库表映射为可操作的多维表模块，8 个业务域、两级 Tab 导航。每个模块既是一张数据表，也是一套单据的录入与审批入口。",
        "action": "进入任一业务域，一级 Tab 是业务分组，二级 Tab 是具体单据模块。"
      },
      {
        "no": "03",
        "title": "字段即表单，类型即控件",
        "text": "444 个字段按类型自动渲染成输入框、下拉、日期、金额、人员、复选、评分、进度和附件上传；编号字段自动生成，状态字段由流程推进，必填项提交时校验。",
        "action": "点「新建单据」看右侧填写指引；每个字段都有示例与说明，附件支持本地上传。"
      },
      {
        "no": "04",
        "title": "给每张单据装一台状态机",
        "text": "草稿 → 在途（待审批/审核中/进行中）→ 通过（已生效/已入库/已付款）或驳回。提交、通过、驳回、撤销四个动作都会写操作日志并推送通知。",
        "action": "在列表行操作里依次点「提交」「通过」，观察状态、日志与待办数量变化。"
      },
      {
        "no": "05",
        "title": "用联动规则串起全链路",
        "text": "上游单据审批通过时，系统按 14 条联动规则自动在下游模块生成一张草稿单据，并继承供应商、金额、单号等关键字段，形成来源可追溯的单据链。",
        "action": "打开「全链路流程」页，或直接把一张采购申请推到已生效，看需求池是否自动多出一张单。"
      },
      {
        "no": "06",
        "title": "工作台按角色实时算数",
        "text": "KPI、今日待办、风险预警都从本地单据实时聚合，不同角色看到不同口径：采购看寻源与订单，财务看应付与差异，仓管看待入库与装柜。",
        "action": "切换角色回到工作台，对比卡片内容与待办清单。"
      },
      {
        "no": "07",
        "title": "看板与通知闭环",
        "text": "经营看板用纯 SVG 画单据分布、金额趋势、链路漏斗与角色待办；通知中心汇集审批待办、联动生成、异常告警，可一键跳转对应单据。",
        "action": "点顶部铃铛，或进入「经营看板」。"
      },
      {
        "no": "08",
        "title": "演示态与生产态的边界",
        "text": "当前不连后端：所有单据、日志、通知和附件存在浏览器 localStorage，刷新不丢、换浏览器不共享。要接真实后端时，只需把 engine.js 的存储层换成 REST 调用，UI 与权限内核不用改。",
        "action": "在「系统设置」里导出 JSON 备份、导入还原或重置演示数据。"
      }
    ],
    "fill": [
      {
        "role": "采购经理",
        "flow": "新建采购申请 PR → 提交审批 → 通过后自动生成需求池单据 → 派发 RFQ → 授标 → 起草合同 → 下达订单",
        "tips": [
          "编号字段留空即可，提交时系统按 PR-YYYYMM-序号 自动生成",
          "预算金额填数字，单位人民币元，超过 50 万会进入大额审批提示",
          "期望到货日不要早于当天，附件可上传需求说明或图纸"
        ]
      },
      {
        "role": "仓管员",
        "flow": "按 ASN 登记收货 → 触发来料检验 → 检验合格后生成入库单 → 过账更新库存 → 装柜拍照留痕",
        "tips": [
          "收货数量与订单数量不一致时，在备注写明差异原因",
          "入库单需选择仓库，状态由「待过审」推进到「已过账」",
          "装柜柜次必须完成五要素核对与必拍槽位才能归档"
        ]
      },
      {
        "role": "财务经理",
        "flow": "对账单确认 → 生成付款计划 → 审批 → 生成付款执行 → 核销",
        "tips": [
          "对账差异金额大于 0 时须先处理差异再确认",
          "付款计划要关联合同与付款节点",
          "发票号与对账期间是后续稽核的关键字段"
        ]
      },
      {
        "role": "质量工程师",
        "flow": "来料检验判定 → 不合格生成 8D 整改 → 供应商填写 → 复核关闭",
        "tips": [
          "抽检数量不得大于送检数量，合格数量不得大于抽检数量",
          "判定为不合格时，系统会自动生成整改单据",
          "检验报告建议上传 PDF 或现场照片"
        ]
      },
      {
        "role": "供应商",
        "flow": "自助登记准入 → 查看发给自己的 RFQ → 提交报价 → 查看订单 → 预约送货 → 查看对账",
        "tips": [
          "门户内看不到其他供应商的报价与订单，这是行级隔离",
          "报价需上传盖章报价单，报价有效期不得早于报价日期",
          "没有审批按钮，任何单据只能提交，由采购方处理"
        ]
      },
      {
        "role": "超级管理员",
        "flow": "维护组织/用户/物料/仓库 → 配置字典与审批流 → 查看审计日志与全链路进程总控",
        "tips": [
          "主数据先建，业务单据里的下拉选项才有值",
          "可以重置演示数据，但会清空本地所有新增单据",
          "导出 JSON 备份后再做批量操作更稳妥"
        ]
      }
    ]
  },
  "stages": [
    {
      "id": "01",
      "name": "供应商准入",
      "domain": "02",
      "owners": [
        "supplier",
        "buyer",
        "admin"
      ],
      "input": "供应商自助登记、采购邀请",
      "output": "合格供应商档案与供货品类",
      "desc": "外部供应商提交准入与资质，采购方核验后生成合格档案；这是全链路的起点。",
      "modules": [
        "t09",
        "t10",
        "t11",
        "t12",
        "t13"
      ],
      "entry": "t10",
      "forms": [
        "t09",
        "t10",
        "t11"
      ]
    },
    {
      "id": "02",
      "name": "需求提报",
      "domain": "03",
      "owners": [
        "buyer",
        "admin"
      ],
      "input": "业务部门采购需求、年度采购项目",
      "output": "已生效 PR 与需求池派发",
      "desc": "立项与 PR 提报、预算审批，通过后自动归集到需求池并派发寻源方式。",
      "modules": [
        "t17",
        "t18",
        "t19"
      ],
      "entry": "t18",
      "forms": [
        "t17",
        "t18",
        "t19"
      ]
    },
    {
      "id": "03",
      "name": "寻源定标",
      "domain": "03",
      "owners": [
        "buyer",
        "supplier",
        "admin"
      ],
      "input": "需求池派发结果",
      "output": "授标结果与中标公示",
      "desc": "RFQ / 竞价 / 招标三条寻源路径并行，供应商报价投标，采购方比价定标。",
      "modules": [
        "t20",
        "t21",
        "t22",
        "t23",
        "t24",
        "t25"
      ],
      "entry": "t21",
      "forms": [
        "t20",
        "t21",
        "t22",
        "t23",
        "t24",
        "t25"
      ]
    },
    {
      "id": "04",
      "name": "合同订单",
      "domain": "04",
      "owners": [
        "buyer",
        "admin"
      ],
      "input": "授标结果",
      "output": "已生效合同与下达的采购订单",
      "desc": "合同起草、风险条款与用印归档，随后下达 PO 并生成交货计划。",
      "modules": [
        "t26",
        "t27",
        "t28",
        "t29"
      ],
      "entry": "t26",
      "forms": [
        "t26",
        "t27",
        "t28",
        "t29"
      ]
    },
    {
      "id": "05",
      "name": "交付收货",
      "domain": "04",
      "owners": [
        "supplier",
        "warehouse",
        "quality",
        "admin"
      ],
      "input": "采购订单与交货计划",
      "output": "收货确认与来料检验结论",
      "desc": "供应商预约送货、仓库收货登记、质量来料检验与不合格整改闭环。",
      "modules": [
        "t30",
        "t31",
        "t14",
        "t15"
      ],
      "entry": "t30",
      "forms": [
        "t30",
        "t31",
        "t14",
        "t15"
      ]
    },
    {
      "id": "06",
      "name": "仓储入库",
      "domain": "05",
      "owners": [
        "warehouse",
        "quality",
        "admin"
      ],
      "input": "合格收货单",
      "output": "入库过账后的可用库存",
      "desc": "入库过账、库存余额与水位预警、调拨盘点、商城价格协议与质量记分卡。",
      "modules": [
        "t32",
        "t33",
        "t34",
        "t35",
        "t16"
      ],
      "entry": "t33",
      "forms": [
        "t32",
        "t33",
        "t34",
        "t35",
        "t16"
      ]
    },
    {
      "id": "07",
      "name": "财务结算",
      "domain": "06",
      "owners": [
        "finance",
        "supplier",
        "admin"
      ],
      "input": "入库与收货记录、供应商发票",
      "output": "付款执行凭证与对账闭环",
      "desc": "对账开票、付款计划与申请、扣款与付款执行，供应商可查看本公司对账结果。",
      "modules": [
        "t36",
        "t37",
        "t38",
        "t39"
      ],
      "entry": "t37",
      "forms": [
        "t36",
        "t37",
        "t38",
        "t39"
      ]
    },
    {
      "id": "08",
      "name": "装柜留痕",
      "domain": "07",
      "owners": [
        "warehouse",
        "admin"
      ],
      "input": "出库柜次与出货计划",
      "output": "可导出的证据包与归档裁定",
      "desc": "五要素核对闸门、标准槽位拍照留痕、重量核查与审核归档。",
      "modules": [
        "t40",
        "t41",
        "t42",
        "t43"
      ],
      "entry": "t40",
      "forms": [
        "t40",
        "t41",
        "t42",
        "t43"
      ]
    }
  ],
  "baseGroup": {
    "id": "00",
    "name": "基础资料",
    "domain": "00/01",
    "owners": [
      "admin"
    ],
    "input": "企业组织、用户、字典与主数据",
    "output": "全链路共用的基础配置",
    "desc": "组织、用户角色、审批流、附件中心、物料与仓库主数据。配置一次，全链路复用。",
    "modules": [
      "t00",
      "t01",
      "t02",
      "t03",
      "t04",
      "t05",
      "t06",
      "t07",
      "t08"
    ],
    "entry": "t06",
    "forms": []
  },
  "allGroups": [
    {
      "id": "00",
      "name": "基础资料",
      "domain": "00/01",
      "owners": [
        "admin"
      ],
      "input": "企业组织、用户、字典与主数据",
      "output": "全链路共用的基础配置",
      "desc": "组织、用户角色、审批流、附件中心、物料与仓库主数据。配置一次，全链路复用。",
      "modules": [
        "t00",
        "t01",
        "t02",
        "t03",
        "t04",
        "t05",
        "t06",
        "t07",
        "t08"
      ],
      "entry": "t06",
      "forms": []
    },
    {
      "id": "01",
      "name": "供应商准入",
      "domain": "02",
      "owners": [
        "supplier",
        "buyer",
        "admin"
      ],
      "input": "供应商自助登记、采购邀请",
      "output": "合格供应商档案与供货品类",
      "desc": "外部供应商提交准入与资质，采购方核验后生成合格档案；这是全链路的起点。",
      "modules": [
        "t09",
        "t10",
        "t11",
        "t12",
        "t13"
      ],
      "entry": "t10",
      "forms": [
        "t09",
        "t10",
        "t11"
      ]
    },
    {
      "id": "02",
      "name": "需求提报",
      "domain": "03",
      "owners": [
        "buyer",
        "admin"
      ],
      "input": "业务部门采购需求、年度采购项目",
      "output": "已生效 PR 与需求池派发",
      "desc": "立项与 PR 提报、预算审批，通过后自动归集到需求池并派发寻源方式。",
      "modules": [
        "t17",
        "t18",
        "t19"
      ],
      "entry": "t18",
      "forms": [
        "t17",
        "t18",
        "t19"
      ]
    },
    {
      "id": "03",
      "name": "寻源定标",
      "domain": "03",
      "owners": [
        "buyer",
        "supplier",
        "admin"
      ],
      "input": "需求池派发结果",
      "output": "授标结果与中标公示",
      "desc": "RFQ / 竞价 / 招标三条寻源路径并行，供应商报价投标，采购方比价定标。",
      "modules": [
        "t20",
        "t21",
        "t22",
        "t23",
        "t24",
        "t25"
      ],
      "entry": "t21",
      "forms": [
        "t20",
        "t21",
        "t22",
        "t23",
        "t24",
        "t25"
      ]
    },
    {
      "id": "04",
      "name": "合同订单",
      "domain": "04",
      "owners": [
        "buyer",
        "admin"
      ],
      "input": "授标结果",
      "output": "已生效合同与下达的采购订单",
      "desc": "合同起草、风险条款与用印归档，随后下达 PO 并生成交货计划。",
      "modules": [
        "t26",
        "t27",
        "t28",
        "t29"
      ],
      "entry": "t26",
      "forms": [
        "t26",
        "t27",
        "t28",
        "t29"
      ]
    },
    {
      "id": "05",
      "name": "交付收货",
      "domain": "04",
      "owners": [
        "supplier",
        "warehouse",
        "quality",
        "admin"
      ],
      "input": "采购订单与交货计划",
      "output": "收货确认与来料检验结论",
      "desc": "供应商预约送货、仓库收货登记、质量来料检验与不合格整改闭环。",
      "modules": [
        "t30",
        "t31",
        "t14",
        "t15"
      ],
      "entry": "t30",
      "forms": [
        "t30",
        "t31",
        "t14",
        "t15"
      ]
    },
    {
      "id": "06",
      "name": "仓储入库",
      "domain": "05",
      "owners": [
        "warehouse",
        "quality",
        "admin"
      ],
      "input": "合格收货单",
      "output": "入库过账后的可用库存",
      "desc": "入库过账、库存余额与水位预警、调拨盘点、商城价格协议与质量记分卡。",
      "modules": [
        "t32",
        "t33",
        "t34",
        "t35",
        "t16"
      ],
      "entry": "t33",
      "forms": [
        "t32",
        "t33",
        "t34",
        "t35",
        "t16"
      ]
    },
    {
      "id": "07",
      "name": "财务结算",
      "domain": "06",
      "owners": [
        "finance",
        "supplier",
        "admin"
      ],
      "input": "入库与收货记录、供应商发票",
      "output": "付款执行凭证与对账闭环",
      "desc": "对账开票、付款计划与申请、扣款与付款执行，供应商可查看本公司对账结果。",
      "modules": [
        "t36",
        "t37",
        "t38",
        "t39"
      ],
      "entry": "t37",
      "forms": [
        "t36",
        "t37",
        "t38",
        "t39"
      ]
    },
    {
      "id": "08",
      "name": "装柜留痕",
      "domain": "07",
      "owners": [
        "warehouse",
        "admin"
      ],
      "input": "出库柜次与出货计划",
      "output": "可导出的证据包与归档裁定",
      "desc": "五要素核对闸门、标准槽位拍照留痕、重量核查与审核归档。",
      "modules": [
        "t40",
        "t41",
        "t42",
        "t43"
      ],
      "entry": "t40",
      "forms": [
        "t40",
        "t41",
        "t42",
        "t43"
      ]
    }
  ],
  "roleStage": {
    "admin": "02",
    "buyer": "02",
    "supplier": "01",
    "warehouse": "06",
    "finance": "07",
    "quality": "05"
  },
  "moduleCode": {
    "t00": "system-navigation",
    "t01": "organizations",
    "t02": "users-roles",
    "t03": "dict-approval",
    "t04": "notifications",
    "t05": "attachments",
    "t06": "materials",
    "t07": "warehouses",
    "t08": "uom-currency",
    "t09": "suppliers",
    "t10": "supplier-admission",
    "t11": "supplier-licenses",
    "t12": "supplier-changes",
    "t13": "supplier-reviews",
    "t14": "incoming-inspection",
    "t15": "ncr-corrective",
    "t16": "quality-scorecard",
    "t17": "purchase-projects",
    "t18": "purchase-requisitions",
    "t19": "demand-pool",
    "t20": "opinion-award",
    "t21": "rfq-requests",
    "t22": "rfq-quotes",
    "t23": "auctions",
    "t24": "tenders",
    "t25": "award-publicity",
    "t26": "contracts",
    "t27": "contract-archive",
    "t28": "purchase-orders",
    "t29": "delivery-plans",
    "t30": "asn-bookings",
    "t31": "receipts-returns",
    "t32": "inventory-balance",
    "t33": "inventory-transactions",
    "t34": "mall-products",
    "t35": "mall-cart",
    "t36": "payment-plans",
    "t37": "reconciliation-invoices",
    "t38": "payment-execution",
    "t39": "bi-alerts",
    "t40": "loading-shipments",
    "t41": "photo-standards",
    "t42": "loading-photos",
    "t43": "weight-audit"
  },
  "moduleSql": {
    "t00": [
      "sys_permission",
      "sys_approval_flow",
      "sys_approval_node"
    ],
    "t01": [
      "sys_org",
      "sys_dept"
    ],
    "t02": [
      "sys_user",
      "sys_role",
      "sys_user_role",
      "sys_role_permission"
    ],
    "t03": [
      "sys_dict_type",
      "sys_dict_item",
      "sys_approval_flow",
      "sys_approval_node"
    ],
    "t04": [
      "sys_notification",
      "sys_operation_log",
      "sys_approval_task",
      "sys_approval_instance"
    ],
    "t05": [
      "sys_attachment"
    ],
    "t06": [
      "md_material",
      "md_material_category"
    ],
    "t07": [
      "md_warehouse",
      "md_warehouse_location"
    ],
    "t08": [
      "md_uom",
      "md_currency",
      "md_exchange_rate"
    ],
    "t09": [
      "sp_supplier",
      "sp_supplier_contact",
      "sp_supplier_bank",
      "sp_supplier_tax"
    ],
    "t10": [
      "sp_admit_application",
      "sp_invite"
    ],
    "t11": [
      "sp_supplier_license"
    ],
    "t12": [
      "sp_change_request",
      "sp_status_log",
      "sp_supplier_category"
    ],
    "t13": [
      "qa_supplier_review",
      "qa_supplier_review_score",
      "qa_review_template",
      "qa_review_template_item"
    ],
    "t14": [
      "qa_incoming_inspection"
    ],
    "t15": [
      "qa_ncr",
      "qa_corrective_action"
    ],
    "t16": [
      "qa_scorecard",
      "qa_audit_standard",
      "qa_audit_plan"
    ],
    "t17": [
      "pur_project"
    ],
    "t18": [
      "pur_requisition",
      "pur_requisition_item"
    ],
    "t19": [
      "pur_demand_pool",
      "pur_sourcing_dispatch"
    ],
    "t20": [
      "pur_opinion_collect",
      "pur_opinion_proposal",
      "pur_award_result"
    ],
    "t21": [
      "rfq_request",
      "rfq_item",
      "rfq_invite",
      "rfq_quote_template"
    ],
    "t22": [
      "rfq_quote",
      "rfq_quote_item",
      "rfq_award",
      "rfq_exception"
    ],
    "t23": [
      "auc_rule_config",
      "auc_invitation",
      "auc_item",
      "auc_participant",
      "auc_bid",
      "auc_award"
    ],
    "t24": [
      "td_eval_rule",
      "td_plan",
      "td_registration",
      "td_deposit",
      "td_bid_document",
      "td_eval_score"
    ],
    "t25": [
      "td_award",
      "td_second_quote"
    ],
    "t26": [
      "ct_contract",
      "ct_contract_item",
      "ct_payment_schedule",
      "ct_contract_version"
    ],
    "t27": [
      "ct_template",
      "ct_seal",
      "ct_risk_clause",
      "ct_contract_risk_link",
      "ct_sign_record",
      "ct_archive"
    ],
    "t28": [
      "po_order",
      "po_order_item"
    ],
    "t29": [
      "po_delivery_plan",
      "po_delivery_change"
    ],
    "t30": [
      "po_delivery_booking",
      "po_asn",
      "po_asn_item"
    ],
    "t31": [
      "po_receipt",
      "po_receipt_item",
      "po_return",
      "po_return_item"
    ],
    "t32": [
      "inv_stock",
      "inv_stock_txn",
      "inv_vmi_setting",
      "inv_alert"
    ],
    "t33": [
      "wh_inbound",
      "wh_inbound_item",
      "wh_outbound",
      "wh_outbound_item",
      "wh_transfer",
      "wh_count",
      "wh_requisition"
    ],
    "t34": [
      "mall_category",
      "mall_price_agreement",
      "mall_price_agreement_item",
      "mall_agreement_scope",
      "mall_product"
    ],
    "t35": [
      "mall_cart",
      "mall_cart_item",
      "mall_notice"
    ],
    "t36": [
      "fin_payment_plan",
      "fin_payment_plan_item",
      "fin_payment_request",
      "fin_payment_request_item"
    ],
    "t37": [
      "fin_reconciliation",
      "fin_reconciliation_item",
      "fin_invoice",
      "fin_recon_setting"
    ],
    "t38": [
      "fin_deduction",
      "fin_payment_execution"
    ],
    "t39": [
      "bi_dashboard",
      "bi_widget",
      "bi_alert_rule",
      "bi_alert_event",
      "bi_subscription",
      "bi_access_log"
    ],
    "t40": [
      "lt_shipment",
      "lt_shipment_fba",
      "lt_gate_check"
    ],
    "t41": [
      "lt_photo_standard",
      "lt_slot_template"
    ],
    "t42": [
      "lt_shipment_slot",
      "lt_customs_field_map"
    ],
    "t43": [
      "lt_weight_record",
      "lt_audit",
      "lt_export_package"
    ]
  },
  "sync": {
    "host": "erp.nexduo.xyz",
    "site": "https://erp.nexduo.xyz",
    "gateway": {
      "base": "https://erp.nexduo.xyz/api/sync",
      "pull": "GET  /api/sync/pull?since={ts}&module={code}",
      "push": "POST /api/sync/push",
      "status": "GET  /api/sync/status",
      "resolve": "POST /api/sync/resolve",
      "webhook": "POST /api/sync/webhook"
    },
    "mode": "demo",
    "autoSync": true,
    "interval": "5m",
    "defaultEntryMode": "backend",
    "modeNote": "钉钉 AI 表格已开启 9 张在线表单在收集数据。前端默认不重复建表单：有钉钉表单的模块走「钉钉录入 → 同步拉取 → 前端推进」；其余模块走「前端填写 → 自动同步回写」。可在下方逐模块切换。",
    "liveNote": "静态页面无法直连钉钉开放平台（跨域与应用鉴权）。把 worker/sync-gateway.js 部署到 erp.nexduo.xyz 后切到「实时」模式，前端即按 GATEWAY 契约发起真实请求；未部署时全部行为由本地队列模拟。"
  },
  "flows": [
    {
      "id": "F01",
      "name": "钉钉表单提交 → 同步生成前端单据",
      "source": "dingtalk",
      "trigger": "钉钉表单新增提交 / 每 5 分钟增量拉取",
      "condition": "表单所属模块在当前角色可见范围内，且 remoteId 未存在",
      "actions": [
        "拉取 /api/sync/pull",
        "按字段契约映射 DTO",
        "幂等 upsert 到本地单据",
        "标记 origin=dingtalk-form"
      ],
      "fieldMap": "contract.js 的 fields[].key ↔ 钉钉表字段",
      "desc": "供应商在钉钉填完准入/报价/送货预约后，前端对应角色登录即可看到单据，无需二次录入。",
      "modules": [
        "t09",
        "t10",
        "t14",
        "t18",
        "t22",
        "t26",
        "t30",
        "t40",
        "t42"
      ]
    },
    {
      "id": "F02",
      "name": "前端填单 → 自动回写钉钉数据表",
      "source": "frontend",
      "trigger": "前端新建 / 编辑 / 提交单据",
      "condition": "模块录入模式为 frontend 或 both，且 autoSync 开启",
      "actions": [
        "写入 outbox 队列",
        "POST /api/sync/push",
        "回写 remoteId",
        "标记 sync=synced"
      ],
      "fieldMap": "中文显示名 → DTO 列名 → 钉钉 AI 表格字段",
      "desc": "不想用钉钉表单时，直接在前端填；保存即入队，网关把记录写回钉钉数据表。",
      "modules": []
    },
    {
      "id": "F03",
      "name": "审批通过 → 派生下游单据",
      "source": "both",
      "trigger": "单据状态 running → done",
      "condition": "config.links 中存在该模块的联动规则",
      "actions": [
        "按 map 复制字段",
        "生成下游草稿单",
        "写入 source 来源链",
        "派生单入同步队列",
        "通知下一环节角色"
      ],
      "fieldMap": "14 条 LINK_RULES 的 map",
      "desc": "PR 生效派发需求池、授标生成合同、收货派生入库等，前后端生成结果保持同源。",
      "modules": []
    },
    {
      "id": "F04",
      "name": "状态流转 → 通知与看板刷新",
      "source": "both",
      "trigger": "提交 / 通过 / 驳回 / 撤销",
      "condition": "动作合法且通过权限校验",
      "actions": [
        "写操作日志",
        "按审批角色推送通知",
        "刷新工作台与驾驶舱聚合",
        "同步状态字段到钉钉"
      ],
      "fieldMap": "statusField + states",
      "desc": "状态是单一事实来源，任何一侧变更都要让另一侧与看板同步。",
      "modules": []
    },
    {
      "id": "F05",
      "name": "定时增量对齐（09:00 / 18:00）",
      "source": "scheduled",
      "trigger": "每日 09:00、18:00（GMT+08:00）",
      "condition": "存在 since 之后的变更",
      "actions": [
        "拉取增量",
        "推送 outbox",
        "冲突检测",
        "生成同步简报通知"
      ],
      "fieldMap": "since 时间戳增量游标",
      "desc": "与钉钉侧已建的定时自动化对齐，保证最终一致。",
      "modules": []
    },
    {
      "id": "F06",
      "name": "冲突检测与人工裁决",
      "source": "both",
      "trigger": "同一 remoteId 在前后端都被修改",
      "condition": "本地 updatedAt 与远端 updatedAt 均晚于 lastSync",
      "actions": [
        "标记 conflict",
        "冻结自动覆盖",
        "展示双版本差异",
        "人工选择保留哪一侧"
      ],
      "fieldMap": "remoteId + updatedAt + lastSync",
      "desc": "不静默覆盖数据；冲突必须显式裁决后才能继续自动同步。",
      "modules": []
    },
    {
      "id": "F07",
      "name": "附件与 AI 字段对齐",
      "source": "both",
      "trigger": "上传附件 / 钉钉 AI 字段产出结果",
      "condition": "模块含附件字段或 AI 字段",
      "actions": [
        "附件转存网关",
        "回写附件 URL 数组",
        "拉取 AI 字段结果",
        "更新单据并标记来源"
      ],
      "fieldMap": "type=a 附件 / type=ai 智能字段",
      "desc": "钉钉的附件与 AI 字段是后端能力，前端只做展示与引用，不重复造一套。",
      "modules": []
    },
    {
      "id": "F08",
      "name": "链路闸门校验",
      "source": "frontend",
      "trigger": "提交单据前",
      "condition": "必填字段完整 / 装柜五要素齐备 / 上游单据已生效",
      "actions": [
        "字段级校验",
        "上游来源链校验",
        "不通过则阻断并提示缺失项",
        "通过后放行入队"
      ],
      "fieldMap": "required + source + gate_check",
      "desc": "把风控前置到填单环节，避免脏数据同步到后端。",
      "modules": []
    }
  ],
  "formModules": [
    "t09",
    "t10",
    "t14",
    "t18",
    "t22",
    "t26",
    "t30",
    "t40",
    "t42"
  ],
  "formLinks": {
    "t09": {
      "name": "供应商自助登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_UbiNWwS_NsmUd81"
    },
    "t10": {
      "name": "供应商准入申请",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_csKJkCD_UDvWWsF"
    },
    "t14": {
      "name": "来料检验登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_Q7qB42B_L5JL3PL"
    },
    "t18": {
      "name": "采购申请提报",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_s1IYdZt_EFEBSSz"
    },
    "t22": {
      "name": "供应商报价提交",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_SeRdd62_sHsnOfj"
    },
    "t26": {
      "name": "合同起草登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_1zALym4_DqwoTNO"
    },
    "t30": {
      "name": "供应商送货预约",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_1kJCtgI_xtoau1F"
    },
    "t40": {
      "name": "装柜柜次登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_wvVO47C_UkYzwjQ"
    },
    "t42": {
      "name": "现场拍照上传",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_QX5wonu_z70MqKP"
    }
  },
  "queueStates": {
    "pending": "待推送",
    "synced": "已同步",
    "conflict": "冲突待裁决",
    "pulled": "已拉取",
    "failed": "失败待重试",
    "skipped": "已跳过"
  },
  "siteHost": "erp.nexduo.xyz",
  "supplierCompany": "苏州启能力精密制造有限公司",
  "automations": [
    {
      "table": "t00",
      "kind": "AI 字段自动处理",
      "name": "AI 流程解读"
    },
    {
      "table": "t04",
      "kind": "AI 字段自动处理",
      "name": "AI 事件摘要"
    },
    {
      "table": "t05",
      "kind": "AI 字段自动处理",
      "name": "AI 附件内容识别"
    },
    {
      "table": "t06",
      "kind": "AI 字段自动处理",
      "name": "AI 物料归类建议"
    },
    {
      "table": "t09",
      "kind": "表单提交自动化",
      "name": "供应商自助登记 · 提交后自动流转"
    },
    {
      "table": "t09",
      "kind": "AI 字段自动处理",
      "name": "AI 供应商画像"
    },
    {
      "table": "t09",
      "kind": "跨表关联同步",
      "name": "关联准入申请 → t10"
    },
    {
      "table": "t10",
      "kind": "表单提交自动化",
      "name": "供应商准入申请 · 提交后自动流转"
    },
    {
      "table": "t10",
      "kind": "AI 字段自动处理",
      "name": "AI 准入材料核验"
    },
    {
      "table": "t11",
      "kind": "AI 字段自动处理",
      "name": "AI 证照要点提取"
    },
    {
      "table": "t13",
      "kind": "AI 字段自动处理",
      "name": "AI 评审建议"
    },
    {
      "table": "t14",
      "kind": "表单提交自动化",
      "name": "来料检验登记 · 提交后自动流转"
    },
    {
      "table": "t15",
      "kind": "AI 字段自动处理",
      "name": "AI 根因分析"
    },
    {
      "table": "t18",
      "kind": "表单提交自动化",
      "name": "采购申请提报 · 提交后自动流转"
    },
    {
      "table": "t22",
      "kind": "表单提交自动化",
      "name": "供应商报价提交 · 提交后自动流转"
    },
    {
      "table": "t22",
      "kind": "AI 字段自动处理",
      "name": "AI 报价分析"
    },
    {
      "table": "t26",
      "kind": "表单提交自动化",
      "name": "合同起草登记 · 提交后自动流转"
    },
    {
      "table": "t26",
      "kind": "AI 字段自动处理",
      "name": "AI 合同风险提示"
    },
    {
      "table": "t30",
      "kind": "表单提交自动化",
      "name": "供应商送货预约 · 提交后自动流转"
    },
    {
      "table": "t32",
      "kind": "AI 字段自动处理",
      "name": "AI 补货建议"
    },
    {
      "table": "t37",
      "kind": "AI 字段自动处理",
      "name": "AI 票据核验"
    },
    {
      "table": "t40",
      "kind": "表单提交自动化",
      "name": "装柜柜次登记 · 提交后自动流转"
    },
    {
      "table": "t42",
      "kind": "表单提交自动化",
      "name": "现场拍照上传 · 提交后自动流转"
    },
    {
      "table": "t42",
      "kind": "AI 字段自动处理",
      "name": "AI 照片合规判断"
    }
  ],
  "portalLinks": [
    {
      "name": "AI 多维表格 · 总入口",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv",
      "desc": "44 张数据表 / 全链路业务对象"
    },
    {
      "name": "协同应用（8 个业务域页面）",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g",
      "desc": "按业务域组织的统一工作台"
    },
    {
      "name": "经营总览仪表盘",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Ddata%26applicationId%3Ddashboard-562cae15-fb82-4e3f-bece-24d1056daa40",
      "desc": "金额指标 / 状态分布 / AI 经营分析"
    },
    {
      "name": "表单 · 供应商自助登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_UbiNWwS_NsmUd81",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 供应商准入申请",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_csKJkCD_UDvWWsF",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 来料检验登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_Q7qB42B_L5JL3PL",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 采购申请提报",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_s1IYdZt_EFEBSSz",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 供应商报价提交",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_SeRdd62_sHsnOfj",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 合同起草登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_1zALym4_DqwoTNO",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 供应商送货预约",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_1kJCtgI_xtoau1F",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 装柜柜次登记",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_wvVO47C_UkYzwjQ",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "表单 · 现场拍照上传",
      "url": "https://alidocs.dingtalk.com/notable/share/form/v01Jdl6m36j9rGr7Oke_QX5wonu_z70MqKP",
      "desc": "在线填报入口（分享已开启）"
    },
    {
      "name": "应用页 · 00 系统底座",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-f3d39ae0-349d-4dff-975e-0e30ae782d7c",
      "desc": "业务域协同页面"
    },
    {
      "name": "应用页 · 01 主数据",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-23d6d1d3-1f12-4d56-ae3e-3d8c1a2a8efa",
      "desc": "业务域协同页面"
    },
    {
      "name": "应用页 · 02 供应商与质量",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-b925c037-25dd-4def-b6d8-12568813a8be",
      "desc": "业务域协同页面"
    },
    {
      "name": "应用页 · 03 需求与寻源",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-b8bc33fe-ef31-42ba-9448-03ca625502d3",
      "desc": "业务域协同页面"
    },
    {
      "name": "应用页 · 04 合同与订单",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-e68f0005-8420-45a7-b160-1c4e819844a3",
      "desc": "业务域协同页面"
    },
    {
      "name": "应用页 · 05 仓储与商城",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-a9917b63-6156-4e3f-91cd-6f60d29d8690",
      "desc": "业务域协同页面"
    },
    {
      "name": "应用页 · 06 财务与BI",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-cfa9c112-c923-4859-b7ad-01a4b1f0249f",
      "desc": "业务域协同页面"
    },
    {
      "name": "应用页 · 07 装柜留痕",
      "url": "https://alidocs.dingtalk.com/i/nodes/0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv?iframeQuery=entrance%3Dapps%26appId%3DLvBPlNzXA3VldG8g%26pageId%3Ddashboard-e6e0026c-7ee4-4d1b-9052-7b7a18def16c",
      "desc": "业务域协同页面"
    }
  ],
  "stats": {
    "tableCount": 44,
    "domainCount": 8,
    "fieldCount": 444,
    "viewCount": 135,
    "formCount": 9,
    "aiFieldCount": 14,
    "attachmentFieldCount": 35,
    "attachmentTableCount": 33,
    "linkCount": 1,
    "seedTableCount": 11,
    "seedRowCount": 40,
    "automationCount": 24
  },
  "seedExtra": [
    [
      "t10",
      {
        "申请单号": "SUI-2026-0031",
        "供应商名称": "宁波恒力传动科技有限公司",
        "邀请方式": "定向邀请",
        "申请状态": "审核中",
        "提交日期": "2026-11-11",
        "审核人": "李承泽",
        "审核意见": "营业执照与 ISO9001 已上传，待现场考察。"
      }
    ],
    [
      "t10",
      {
        "申请单号": "SUI-2026-0028",
        "供应商名称": "东莞华菱精密组件有限公司",
        "邀请方式": "公开链接",
        "申请状态": "待补充",
        "提交日期": "2026-11-08",
        "审核人": "许质检",
        "审核意见": "缺少银行开户许可，已退回补充。"
      }
    ],
    [
      "t11",
      {
        "证照名称": "营业执照 · 苏州启能力",
        "供应商": "苏州启能力精密制造有限公司",
        "证照类型": "营业执照",
        "证照编号": "91320500MA1QNL001X",
        "有效期至": "2035-03-11",
        "核验状态": "已通过",
        "核验人": "许质检"
      }
    ],
    [
      "t14",
      {
        "检验单号": "IQC-2609-014",
        "关联订单": "PO260429001-9",
        "供应商": "苏州启能力精密制造有限公司",
        "物料": "无刷电机 KP121-M",
        "送检数量": 3000,
        "抽检数量": 300,
        "合格数量": 279,
        "检验结果": "不合格",
        "检验日期": "2026-09-05",
        "检验员": "许质检"
      }
    ],
    [
      "t15",
      {
        "单号": "NCR-2609-007",
        "类型": "8D整改",
        "关联检验单": "IQC-2609-014",
        "供应商": "苏州启能力精密制造有限公司",
        "问题描述": "抽检 300 件中 21 件端盖同轴度超差。",
        "处置方式": "返工",
        "状态": "供应商填写中",
        "责任方": "苏州启能力精密制造有限公司",
        "截止日期": "2026-11-20"
      }
    ],
    [
      "t17",
      {
        "项目名称": "KP121 年度框架采购",
        "项目编号": "PRJ-2026-004",
        "项目类型": "框架采购",
        "预算金额": 3200000,
        "负责人": "李承泽",
        "开始日期": "2026-01-05",
        "结束日期": "2026-12-31",
        "状态": "进行中",
        "目标说明": "覆盖全年吸尘器电机需求，锁价并保障交期。"
      }
    ],
    [
      "t18",
      {
        "申请单号": "PR-2025-0312",
        "申请标题": "冲压机床主轴替换 · 进口替代",
        "申请部门": "制造部",
        "申请人": "李承泽",
        "物料或服务": "高速主轴总成 HSK-63",
        "数量": 12,
        "预算金额": 876000,
        "期望到货日": "2026-12-20",
        "紧急程度": "紧急",
        "审批状态": "审批中",
        "关联项目": "设备升级专项"
      }
    ],
    [
      "t18",
      {
        "申请单号": "PR-2026-0418",
        "申请标题": "厂区空压机系统改造配套件",
        "申请部门": "设备部",
        "申请人": "赵履约",
        "物料或服务": "螺杆空压机及管路",
        "数量": 3,
        "预算金额": 428000,
        "期望到货日": "2026-12-28",
        "紧急程度": "中",
        "审批状态": "草稿"
      }
    ],
    [
      "t19",
      {
        "需求编号": "DEM-2604-009",
        "需求内容": "无刷电机 KP121-M 补货 3000 PCS",
        "来源": "采购申请",
        "数量": 3000,
        "需求状态": "已完成",
        "寻源方式": "询比价",
        "派发人": "李承泽",
        "派发日期": "2026-04-16",
        "期望完成日": "2026-04-26"
      }
    ],
    [
      "t21",
      {
        "询价单号": "RFQ-8821",
        "询价标题": "KP121 无刷电机年度锁价询价",
        "寻源方式": "询比价",
        "采购员": "李承泽",
        "发布日期": "2026-04-18",
        "报价截止": "2026-04-26",
        "开标日期": "2026-04-28",
        "状态": "已授标",
        "预算金额": 490000,
        "邀请供应商数": 5
      }
    ],
    [
      "t22",
      {
        "报价单号": "QUO-8821-01",
        "关联询价单": "RFQ-8821",
        "供应商": "苏州启能力精密制造有限公司",
        "报价总额": 486000,
        "币种": "CNY",
        "报价日期": "2026-04-24",
        "有效期至": "2026-05-24",
        "状态": "已提交"
      }
    ],
    [
      "t22",
      {
        "报价单号": "QUO-8821-02",
        "关联询价单": "RFQ-8821",
        "供应商": "宁波恒力传动科技有限公司",
        "报价总额": 512400,
        "币种": "CNY",
        "报价日期": "2026-04-25",
        "有效期至": "2026-05-25",
        "状态": "已提交"
      }
    ],
    [
      "t24",
      {
        "招标编号": "TB-1207",
        "项目名称": "厂区空压机系统改造招标",
        "招标方式": "邀请招标",
        "发布日期": "2026-10-20",
        "报名截止": "2026-11-05",
        "开标日期": "2026-11-12",
        "状态": "评标中",
        "评标规则": "技术 60% / 商务 40%",
        "保证金": 50000
      }
    ],
    [
      "t25",
      {
        "公示单号": "WIN-8821",
        "项目名称": "KP121 无刷电机年度锁价",
        "中标供应商": "苏州启能力精密制造有限公司",
        "中标金额": 486000,
        "公示日期": "2026-04-29",
        "状态": "已授标"
      }
    ],
    [
      "t27",
      {
        "归档编号": "ARC-CT-0088",
        "合同编号": "CT-2026-0088",
        "用印类型": "合同专用章",
        "用印日期": "2026-01-15",
        "归档状态": "已归档",
        "保管人": "钱财务"
      }
    ],
    [
      "t29",
      {
        "计划单号": "DLV-260429-9",
        "采购订单号": "PO260429001-9",
        "批次": "第九批",
        "计划交付日": "2026-09-04",
        "计划数量": 3000,
        "确认状态": "已确认"
      }
    ],
    [
      "t30",
      {
        "预约单号": "ASN-2609-04",
        "采购订单号": "PO260429001-9",
        "供应商": "苏州启能力精密制造有限公司",
        "预约到货日": "2026-09-04",
        "车牌号": "浙B7L015",
        "状态": "已到货"
      }
    ],
    [
      "t31",
      {
        "收货单号": "RCV-2609-04",
        "关联订单": "PO260429001-9",
        "供应商": "苏州启能力精密制造有限公司",
        "物料": "无刷电机 KP121-M",
        "应收数量": 3000,
        "实收数量": 2790,
        "检验结果": "不合格",
        "状态": "已入库",
        "仓库": "WH-MAIN 主仓",
        "收货日期": "2026-09-04"
      }
    ],
    [
      "t33",
      {
        "单号": "RK-0326",
        "类型": "采购入库",
        "物料": "冷轧板 Q235B 200吨",
        "仓库": "原料仓",
        "负责人": "周仓管",
        "日期": "2026-03-26",
        "数量": 200,
        "状态": "待过审"
      }
    ],
    [
      "t33",
      {
        "单号": "RK-0318",
        "类型": "其他入库",
        "物料": "密封圈 300件",
        "仓库": "备件仓",
        "负责人": "刘仓管",
        "日期": "2026-03-18",
        "数量": 300,
        "状态": "已驳回"
      }
    ],
    [
      "t34",
      {
        "协议编号": "DOC-2026-0313",
        "商品名称": "SM-200 无刷电机 / 380V",
        "供应商": "苏州启能力精密制造有限公司",
        "协议价": 162,
        "生效日期": "2026-04-01",
        "失效日期": "2027-03-31",
        "状态": "生效中"
      }
    ],
    [
      "t37",
      {
        "单号": "REC-2609-04",
        "供应商": "苏州启能力精密制造有限公司",
        "关联订单": "PO260429001-9",
        "对账期间": "2026-09",
        "对账金额": 452340,
        "发票号": "INV-2609-118",
        "状态": "差异审核",
        "差异金额": 12480
      }
    ],
    [
      "t38",
      {
        "执行单号": "DED-2608-02",
        "关联付款计划": "PAY-PLAN-2026-088",
        "供应商": "苏州启能力精密制造有限公司",
        "金额": 145800,
        "执行日期": "2026-08-22",
        "付款方式": "银行转账",
        "状态": "已完成"
      }
    ],
    [
      "t43",
      {
        "核查单号": "WEIGHT-2604-09",
        "柜次编号": "SHIP-2604-09",
        "申报毛重kg": 11771,
        "实测毛重kg": 11784,
        "差异kg": 13,
        "核验结论": "待核查",
        "审核人": "周仓管"
      }
    ]
  ]
};
