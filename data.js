window.ERP_DATA = {
  "meta": {
    "baseId": "0eMKjyp81YYeX2ZAsZE9YXLg8xAZB1Gv",
    "baseName": "启能力ERP系统 · 全链路协同中枢",
    "generator": "由 schema.py 程序化生成，请勿手工改写"
  },
  "typeNames": {
    "t": "单行文本",
    "n": "数字",
    "d": "日期",
    "c": "货币",
    "s": "单选",
    "m": "多选",
    "a": "附件",
    "u": "人员",
    "l": "链接",
    "r": "富文本",
    "p": "电话",
    "e": "邮箱",
    "b": "复选框",
    "g": "进度",
    "q": "评分"
  },
  "viewTypeNames": {
    "K": "看板",
    "G": "甘特图",
    "C": "日历",
    "A": "画册",
    "F": "表单",
    "R": "表格"
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
  "tables": [
    {
      "key": "t00",
      "name": "00 系统导航与流程说明",
      "seq": "00",
      "shortName": "系统导航与流程说明",
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
      "links": [],
      "form": null,
      "seeds": [
        {
          "模块名称": "系统底座",
          "业务域": "系统底座",
          "对应数据表": "01-05",
          "流程说明": "组织、用户、角色、字典、审批流、通知与附件中心，为全链路提供身份、配置与审计能力。",
          "上线状态": "已上线"
        },
        {
          "模块名称": "供应商全生命周期",
          "业务域": "供应商与质量",
          "对应数据表": "09-16",
          "流程说明": "邀请→准入→资质核验→评审→来料检验→NCR整改→记分卡，形成供应商闭环。",
          "上线状态": "已上线"
        },
        {
          "模块名称": "寻源到定标",
          "业务域": "需求与寻源",
          "对应数据表": "17-25",
          "流程说明": "PR→需求池→派发→RFQ/竞价/招标→报价评标→定标公示→转合同或订单。",
          "上线状态": "已上线"
        },
        {
          "模块名称": "合同到收货",
          "业务域": "合同与订单",
          "对应数据表": "26-31",
          "流程说明": "合同起草评审→用印归档→PO→交货计划→ASN预约→收货/退货。",
          "上线状态": "已上线"
        },
        {
          "模块名称": "仓储与商城",
          "业务域": "仓储与商城",
          "对应数据表": "32-35",
          "流程说明": "收货过账→库存余额与预警→出入库调拨盘点→协议价商品上架→购物车下单。",
          "上线状态": "调试中"
        },
        {
          "模块名称": "财务结算",
          "业务域": "财务与BI",
          "对应数据表": "36-39",
          "流程说明": "付款计划→对账→发票→付款申请→付款执行→扣款→经营看板与预警。",
          "上线状态": "已上线"
        },
        {
          "模块名称": "装柜留痕",
          "业务域": "装柜留痕",
          "对应数据表": "40-43",
          "流程说明": "柜次建档→五要素闸门→按槽位拍照→重量核查→审核归档→证据包导出。",
          "上线状态": "已上线"
        }
      ],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t01",
      "name": "01 组织与部门",
      "seq": "01",
      "shortName": "组织与部门",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t02",
      "name": "02 用户与角色",
      "seq": "02",
      "shortName": "用户与角色",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t03",
      "name": "03 数据字典与审批流",
      "seq": "03",
      "shortName": "数据字典与审批流",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t04",
      "name": "04 通知与操作日志",
      "seq": "04",
      "shortName": "通知与操作日志",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t05",
      "name": "05 附件中心",
      "seq": "05",
      "shortName": "附件中心",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t06",
      "name": "06 物料主数据",
      "seq": "06",
      "shortName": "物料主数据",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t07",
      "name": "07 仓库与库位",
      "seq": "07",
      "shortName": "仓库与库位",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t08",
      "name": "08 单位币种与汇率",
      "seq": "08",
      "shortName": "单位币种与汇率",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t09",
      "name": "09 供应商档案",
      "seq": "09",
      "shortName": "供应商档案",
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
      "links": [
        {
          "name": "关联准入申请",
          "target": "t10",
          "flag": "false"
        }
      ],
      "form": {
        "name": "供应商自助登记",
        "title": "供应商自助登记表",
        "desc": "请填写企业基本信息并上传营业执照，提交后进入准入审核流程"
      },
      "seeds": [
        {
          "供应商名称": "苏州启能力精密制造有限公司",
          "供应商编码": "SUP-001",
          "统一社会信用代码": "91320500MA1QNL001X",
          "供应商状态": "合格",
          "供货品类": [
            "机械件",
            "电子件"
          ],
          "联系人": "陈经理",
          "联系电话": "13800138011",
          "邮箱": "chen@qnl-supply.cn",
          "合作起始日": "2025-03-12",
          "评级": 5,
          "收款账户": "招商银行苏州分行 5129****"
        },
        {
          "供应商名称": "深圳云拓电子科技有限公司",
          "供应商编码": "SUP-002",
          "统一社会信用代码": "91440300MA5YT002K",
          "供应商状态": "合格",
          "供货品类": [
            "电子件"
          ],
          "联系人": "林女士",
          "联系电话": "13800138012",
          "邮箱": "lin@yuntuo.cn",
          "合作起始日": "2025-07-01",
          "评级": 4,
          "收款账户": "中国银行深圳分行 6217****"
        },
        {
          "供应商名称": "宁波恒益包装材料有限公司",
          "供应商编码": "SUP-003",
          "统一社会信用代码": "91330200MA2HY003M",
          "供应商状态": "潜在",
          "供货品类": [
            "包装材料"
          ],
          "联系人": "王先生",
          "联系电话": "13800138013",
          "邮箱": "wang@hengyi.cn",
          "合作起始日": "2026-10-20",
          "评级": 3,
          "收款账户": "工商银行宁波分行 6222****"
        }
      ],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": true,
      "hasLink": true
    },
    {
      "key": "t10",
      "name": "10 供应商准入申请",
      "seq": "10",
      "shortName": "供应商准入申请",
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
      "links": [],
      "form": {
        "name": "供应商准入申请",
        "title": "供应商准入申请",
        "desc": "供应商入口：填写企业信息、上传营业执照与资质材料"
      },
      "seeds": [],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t11",
      "name": "11 供应商资质证照",
      "seq": "11",
      "shortName": "供应商资质证照",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t12",
      "name": "12 供应商变更与品类",
      "seq": "12",
      "shortName": "供应商变更与品类",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t13",
      "name": "13 供应商评审",
      "seq": "13",
      "shortName": "供应商评审",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t14",
      "name": "14 来料检验",
      "seq": "14",
      "shortName": "来料检验",
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
      "links": [],
      "form": {
        "name": "来料检验登记",
        "title": "来料检验登记",
        "desc": "仓管/IQC 入口：登记到货批次、抽检数量与检验结论并上传报告"
      },
      "seeds": [],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t15",
      "name": "15 不合格与整改",
      "seq": "15",
      "shortName": "不合格与整改",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t16",
      "name": "16 质量记分卡与考察",
      "seq": "16",
      "shortName": "质量记分卡与考察",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t17",
      "name": "17 采购项目",
      "seq": "17",
      "shortName": "采购项目",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t18",
      "name": "18 采购申请 PR",
      "seq": "18",
      "shortName": "采购申请 PR",
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
      "links": [],
      "form": {
        "name": "采购申请提报",
        "title": "采购申请提报",
        "desc": "业务部门入口：填写需求、预算与期望到货日，提交后自动流转审批"
      },
      "seeds": [
        {
          "申请单号": "PR-2026-0412",
          "申请标题": "KP121 吸尘器电机批次补货",
          "申请部门": "采购部",
          "物料或服务": "无刷电机 KP121-M",
          "数量": 3000,
          "预算金额": 486000,
          "期望到货日": "2026-12-05",
          "紧急程度": "高",
          "审批状态": "已生效",
          "关联项目": "KP121 年度框架采购"
        },
        {
          "申请单号": "PR-2026-0413",
          "申请标题": "MRO 耗材季度集中采购",
          "申请部门": "仓储部",
          "物料或服务": "劳保耗材组合",
          "数量": 800,
          "预算金额": 96000,
          "期望到货日": "2026-12-18",
          "紧急程度": "中",
          "审批状态": "审批中",
          "关联项目": "MRO 季度集采"
        },
        {
          "申请单号": "PR-2026-0414",
          "申请标题": "装柜拍照终端补充",
          "申请部门": "仓储部",
          "物料或服务": "工业平板 + 支架",
          "数量": 6,
          "预算金额": 42000,
          "期望到货日": "2026-11-30",
          "紧急程度": "紧急",
          "审批状态": "草稿",
          "关联项目": "装柜留痕能力建设"
        }
      ],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t19",
      "name": "19 需求池与寻源派发",
      "seq": "19",
      "shortName": "需求池与寻源派发",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t20",
      "name": "20 意见征集与定标",
      "seq": "20",
      "shortName": "意见征集与定标",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t21",
      "name": "21 询价单 RFQ",
      "seq": "21",
      "shortName": "询价单 RFQ",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t22",
      "name": "22 供应商报价",
      "seq": "22",
      "shortName": "供应商报价",
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
      "links": [],
      "form": {
        "name": "供应商报价提交",
        "title": "供应商报价提交",
        "desc": "供应商入口：选择询价单、填写报价金额并上传盖章报价单"
      },
      "seeds": [],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t23",
      "name": "23 竞价场次与出价",
      "seq": "23",
      "shortName": "竞价场次与出价",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t24",
      "name": "24 招标计划与投标评标",
      "seq": "24",
      "shortName": "招标计划与投标评标",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t25",
      "name": "25 中标公示与授标",
      "seq": "25",
      "shortName": "中标公示与授标",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t26",
      "name": "26 合同台账",
      "seq": "26",
      "shortName": "合同台账",
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
      "links": [],
      "form": {
        "name": "合同起草登记",
        "title": "合同起草登记",
        "desc": "法务/采购入口：登记合同主体、金额、期限与正文，提交后触发评审"
      },
      "seeds": [
        {
          "合同名称": "KP121 年度框架采购合同",
          "合同编号": "CT-2026-0088",
          "签约相对方": "苏州启能力精密制造有限公司",
          "合同类型": "框架协议",
          "合同金额": 3200000,
          "签订日期": "2026-01-15",
          "生效日期": "2026-02-01",
          "到期日期": "2027-01-31",
          "合同状态": "生效中",
          "风险条款": "逾期交付按日 0.3% 计违约金；质保期 18 个月；验收合格后 30 天付款。",
          "付款条件": "预付款 30% / 到货款 60% / 质保金 10%"
        },
        {
          "合同名称": "电子元件年度供货协议",
          "合同编号": "CT-2026-0091",
          "签约相对方": "深圳云拓电子科技有限公司",
          "合同类型": "采购合同",
          "合同金额": 1580000,
          "签订日期": "2026-03-08",
          "生效日期": "2026-03-15",
          "到期日期": "2027-03-14",
          "合同状态": "生效中",
          "风险条款": "批次不良率超 0.5% 触发 8D；交期变更需提前 15 天书面确认。",
          "付款条件": "月结 60 天"
        },
        {
          "合同名称": "包装材料试采合同",
          "合同编号": "CT-2026-0102",
          "签约相对方": "宁波恒益包装材料有限公司",
          "合同类型": "采购合同",
          "合同金额": 260000,
          "签订日期": "2026-10-22",
          "生效日期": "2026-11-01",
          "到期日期": "2027-04-30",
          "合同状态": "待签署",
          "风险条款": "首批试采不合格无条件退货。",
          "付款条件": "验收合格后 45 天"
        }
      ],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t27",
      "name": "27 合同模板与用印归档",
      "seq": "27",
      "shortName": "合同模板与用印归档",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t28",
      "name": "28 采购订单 PO",
      "seq": "28",
      "shortName": "采购订单 PO",
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
      "links": [],
      "form": null,
      "seeds": [
        {
          "订单名称": "KP121 电机第九批",
          "采购订单号": "PO260429001-9",
          "供应商": "苏州启能力精密制造有限公司",
          "关联合同": "CT-2026-0088",
          "订单金额": 486000,
          "下单日期": "2026-08-26",
          "期望交付日": "2026-09-04",
          "订单状态": "部分收货",
          "物料明细": "无刷电机 KP121-M × 3000 PCS",
          "数量": 3000,
          "已收数量": 2790
        },
        {
          "订单名称": "电子元件 Q4 补货",
          "采购订单号": "PO261101002-4",
          "供应商": "深圳云拓电子科技有限公司",
          "关联合同": "CT-2026-0091",
          "订单金额": 218000,
          "下单日期": "2026-11-01",
          "期望交付日": "2026-11-28",
          "订单状态": "生效中",
          "物料明细": "控制板 × 1200 / 传感器 × 800",
          "数量": 2000,
          "已收数量": 0
        },
        {
          "订单名称": "MRO 耗材季度单",
          "采购订单号": "PO261105003-1",
          "供应商": "苏州启能力精密制造有限公司",
          "关联合同": "CT-2026-0088",
          "订单金额": 96000,
          "下单日期": "2026-11-05",
          "期望交付日": "2026-12-18",
          "订单状态": "审批中",
          "物料明细": "劳保耗材组合 × 800",
          "数量": 800,
          "已收数量": 0
        }
      ],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t29",
      "name": "29 交货计划与变更",
      "seq": "29",
      "shortName": "交货计划与变更",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t30",
      "name": "30 送货预约与 ASN",
      "seq": "30",
      "shortName": "送货预约与 ASN",
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
      "links": [],
      "form": {
        "name": "供应商送货预约",
        "title": "供应商送货预约",
        "desc": "供应商入口：预约送货时间、填写车辆与箱数，仓库据此安排收货月台"
      },
      "seeds": [],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t31",
      "name": "31 收货与退货",
      "seq": "31",
      "shortName": "收货与退货",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t32",
      "name": "32 库存余额与预警",
      "seq": "32",
      "shortName": "库存余额与预警",
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
      "links": [],
      "form": null,
      "seeds": [
        {
          "物料": "无刷电机 KP121-M",
          "仓库": "WH-MAIN 主仓",
          "库位": "A-01-03",
          "现有库存": 210,
          "可用库存": 210,
          "安全库存": 500,
          "单位": "件",
          "预警状态": "偏低",
          "VMI水位": 800,
          "最近更新时间": "2026-11-13",
          "备注": "已触发补货建议"
        },
        {
          "物料": "控制板 CB-220",
          "仓库": "WH-MAIN 主仓",
          "库位": "B-02-11",
          "现有库存": 1860,
          "可用库存": 1800,
          "安全库存": 600,
          "单位": "件",
          "预警状态": "正常",
          "VMI水位": 1200,
          "最近更新时间": "2026-11-13"
        },
        {
          "物料": "彩盒 KP121-DE",
          "仓库": "WH-VMI VMI仓",
          "库位": "C-03-02",
          "现有库存": 3200,
          "可用库存": 3200,
          "安全库存": 1000,
          "单位": "箱",
          "预警状态": "超储",
          "VMI水位": 1500,
          "最近更新时间": "2026-11-12"
        }
      ],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t33",
      "name": "33 出入库与调拨盘点",
      "seq": "33",
      "shortName": "出入库与调拨盘点",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t34",
      "name": "34 商城商品与价格协议",
      "seq": "34",
      "shortName": "商城商品与价格协议",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t35",
      "name": "35 购物车与商城公告",
      "seq": "35",
      "shortName": "购物车与商城公告",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t36",
      "name": "36 付款计划与付款申请",
      "seq": "36",
      "shortName": "付款计划与付款申请",
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
      "links": [],
      "form": null,
      "seeds": [
        {
          "单号": "PAY-PLAN-2026-088",
          "类型": "付款计划",
          "关联合同": "CT-2026-0088",
          "供应商": "苏州启能力精密制造有限公司",
          "金额": 145800,
          "计划付款日": "2026-11-20",
          "付款节点": "到货款",
          "状态": "待处理"
        },
        {
          "单号": "PAY-REQ-2026-031",
          "类型": "付款申请",
          "关联合同": "CT-2026-0091",
          "供应商": "深圳云拓电子科技有限公司",
          "金额": 218000,
          "计划付款日": "2026-12-01",
          "付款节点": "验收款",
          "状态": "审批中"
        }
      ],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t37",
      "name": "37 对账与发票",
      "seq": "37",
      "shortName": "对账与发票",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t38",
      "name": "38 扣款与付款执行",
      "seq": "38",
      "shortName": "扣款与付款执行",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t39",
      "name": "39 经营看板与预警",
      "seq": "39",
      "shortName": "经营看板与预警",
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
      "links": [],
      "form": null,
      "seeds": [
        {
          "名称": "采购金额月环比",
          "类型": "预警规则",
          "指标": "PURCHASE_AMOUNT",
          "阈值": 20,
          "当前值": 18.4,
          "触发状态": "正常",
          "推送渠道": "钉钉",
          "发生日期": "2026-11-13"
        },
        {
          "名称": "供应商准时交付率",
          "类型": "预警事件",
          "指标": "ON_TIME_DELIVERY",
          "阈值": 95,
          "当前值": 91.2,
          "触发状态": "预警",
          "推送渠道": "钉钉",
          "发生日期": "2026-11-12",
          "处理说明": "已通知采购部跟进苏州启能力第九批交期。"
        },
        {
          "名称": "装柜照片缺失率",
          "类型": "预警事件",
          "指标": "PHOTO_MISSING_RATE",
          "阈值": 2,
          "当前值": 6.7,
          "触发状态": "严重",
          "推送渠道": "站内",
          "发生日期": "2026-11-13",
          "处理说明": "SHIP-2604-10 缺少 S05/S06 槽位照片，已要求现场补拍。"
        }
      ],
      "hasAttachment": false,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t40",
      "name": "40 装柜柜次与核对闸门",
      "seq": "40",
      "shortName": "装柜柜次与核对闸门",
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
      "links": [],
      "form": {
        "name": "装柜柜次登记",
        "title": "装柜柜次登记",
        "desc": "装柜订单员入口：登记柜号、封条号、船期与五要素核对结果"
      },
      "seeds": [
        {
          "柜次编号": "SHIP-2604-09",
          "采购订单号": "PO260429001-9",
          "集装箱号": "KOCU4471113",
          "封条号": "26H0355092",
          "车牌号": "浙B7L015",
          "司机": "王奋平",
          "装柜日期": "2026-09-04",
          "起运港": "深圳盐田",
          "目的港": "香港",
          "状态": "审核中",
          "五要素核对": "全部通过",
          "箱数": 930,
          "毛重kg": 11771,
          "净重kg": 9207,
          "异常说明": "品名型号 KP121/KPI21 待确认"
        },
        {
          "柜次编号": "SHIP-2604-10",
          "采购订单号": "PO261101002-4",
          "集装箱号": "MSKU9038127",
          "封条号": "26H0355118",
          "车牌号": "浙B7L036",
          "司机": "李振国",
          "装柜日期": "2026-11-12",
          "起运港": "宁波北仑",
          "目的港": "汉堡",
          "状态": "装柜中",
          "五要素核对": "全部通过",
          "箱数": 620,
          "毛重kg": 8420,
          "净重kg": 6610,
          "异常说明": ""
        }
      ],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t41",
      "name": "41 装柜拍照标准与槽位",
      "seq": "41",
      "shortName": "装柜拍照标准与槽位",
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
      "links": [],
      "form": null,
      "seeds": [
        {
          "槽位名称": "车头",
          "槽位编码": "S01",
          "照片类别": "标准照",
          "序号": 1,
          "是否必拍": true,
          "拍摄要求": "记录运输车辆车头信息；AI 识别车号与送货单核对",
          "对应海关字段": "",
          "状态": "启用"
        },
        {
          "槽位名称": "空柜和侧面柜号",
          "槽位编码": "S02",
          "照片类别": "标准照",
          "序号": 2,
          "是否必拍": true,
          "拍摄要求": "柜内无破损/漏光/积水；柜号清晰可辨",
          "对应海关字段": "",
          "状态": "启用"
        },
        {
          "槽位名称": "满柜",
          "槽位编码": "S04",
          "照片类别": "标准照",
          "序号": 4,
          "是否必拍": true,
          "拍摄要求": "装满未关门，最终货量全景",
          "对应海关字段": "",
          "状态": "启用"
        },
        {
          "槽位名称": "封条特写",
          "槽位编码": "S07b",
          "照片类别": "标准照",
          "序号": 8,
          "是否必拍": true,
          "拍摄要求": "封号特写，与舱单核对一致",
          "对应海关字段": "",
          "状态": "启用"
        },
        {
          "槽位名称": "产品净重图片",
          "槽位编码": "CN",
          "照片类别": "海关核查",
          "序号": 100,
          "是否必拍": true,
          "拍摄要求": "展示单件产品净重，秤读数须与报关申报净重一致",
          "对应海关字段": "单件净重（申报净重）",
          "状态": "启用"
        },
        {
          "槽位名称": "一箱产品毛重图片",
          "槽位编码": "CG",
          "照片类别": "海关核查",
          "序号": 101,
          "是否必拍": true,
          "拍摄要求": "展示含彩盒包装整箱重量，用于计算总毛重",
          "对应海关字段": "每箱毛重",
          "状态": "启用"
        },
        {
          "槽位名称": "司机信息图片",
          "槽位编码": "CD",
          "照片类别": "海关核查",
          "序号": 102,
          "是否必拍": true,
          "拍摄要求": "拍摄现场司机信息；FB 码与提单码须匹配",
          "对应海关字段": "FB码/提单码/司机信息",
          "状态": "启用"
        }
      ],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    },
    {
      "key": "t42",
      "name": "42 装柜留痕照片",
      "seq": "42",
      "shortName": "装柜留痕照片",
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
      "links": [],
      "form": {
        "name": "现场拍照上传",
        "title": "装柜现场拍照上传",
        "desc": "出库员入口：按槽位逐一上传现场照片，AI 自动辅助判断是否合规"
      },
      "seeds": [
        {
          "照片记录": "SHIP-2604-09 / S01 车头",
          "关联柜次": "SHIP-2604-09",
          "槽位": "S01 车头",
          "拍摄时间": "2026-09-04",
          "拍摄人": "王奋平",
          "照片说明": "车头与车牌清晰可见，车牌浙B7L015与送货单一致。",
          "核验状态": "通过",
          "柜号识别": "浙B7L015"
        },
        {
          "照片记录": "SHIP-2604-09 / S02 空柜和侧面柜号",
          "关联柜次": "SHIP-2604-09",
          "槽位": "S02 空柜和侧面柜号",
          "拍摄时间": "2026-09-04",
          "拍摄人": "王奋平",
          "照片说明": "空柜内壁无破损、无漏光、无积水，柜号 KOCU4471113 清晰。",
          "核验状态": "通过",
          "柜号识别": "KOCU4471113"
        },
        {
          "照片记录": "SHIP-2604-09 / S07b 封条特写",
          "关联柜次": "SHIP-2604-09",
          "槽位": "S07b 封条特写",
          "拍摄时间": "2026-09-04",
          "拍摄人": "王奋平",
          "照片说明": "封条号 26H0355092 特写，与舱单一致。",
          "核验状态": "通过",
          "柜号识别": "26H0355092"
        },
        {
          "照片记录": "SHIP-2604-09 / CN 产品净重图片",
          "关联柜次": "SHIP-2604-09",
          "槽位": "CN 产品净重图片",
          "拍摄时间": "2026-09-04",
          "拍摄人": "王奋平",
          "照片说明": "电子秤读数 3.30kg，与报关单件净重申报一致。",
          "核验状态": "待核验",
          "柜号识别": ""
        }
      ],
      "hasAttachment": true,
      "hasForm": true,
      "hasAI": true,
      "hasLink": false
    },
    {
      "key": "t43",
      "name": "43 重量核查与审核归档",
      "seq": "43",
      "shortName": "重量核查与审核归档",
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
      "links": [],
      "form": null,
      "seeds": [],
      "hasAttachment": true,
      "hasForm": false,
      "hasAI": false,
      "hasLink": false
    }
  ],
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
  }
};
window.ERP_DATA.portalLinks = [
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
];
