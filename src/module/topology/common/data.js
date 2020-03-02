// const imgUrlPre = "/static/topoImages/";
// const servicerUrl = "/ssa/netJtopo/getEventTypeTop5.do";
export const data = {
  "node": [
    {"id": "user", "name": "运营商互联网", "location": {"x": 1785, "y": 850}, "image": "televisionline"},

    {"id": "sb-1", "name": "交换机", "location": {"x": 1430, "y": 780}, "image": "switchboard"},
    {"id": "sb-2", "name": "交换机", "location": {"x": 1430, "y": 930}, "image": "switchboard"},
    {"id": "ba-1", "name": "链路负载均衡", "location": {"x": 1580, "y": 776.5}, "image": "balancing"},
    {"id": "ba-2", "name": "链路负载均衡", "location": {"x": 1580, "y": 926.5}, "image": "balancing"},
    {"id": "fw-1", "name": "防火墙", "location": {"x": 1290, "y": 761.5}, "image": "firewall"},
    {"id": "fw-2", "name": "防火墙", "location": {"x": 1290, "y": 911.5}, "image": "firewall"},
    {"id": "gw-1", "name": "病毒过滤网关", "location": {"x": 1145, "y": 766}, "image": "gateway"},
    {"id": "gw-2", "name": "病毒过滤网关", "location": {"x": 1145, "y": 916}, "image": "gateway"},
    {"id": "clean", "name": "抗 DDOS（清洗）", "location": {"x": 1580, "y": 1050}, "image": "clean"},
    {"id": "detection", "name": "抗 DDOS（检测）", "location": {"x": 1420, "y": 1050}, "image": "detection"},
    {"id": "ddos", "name": "", "location": {"x": 1510, "y": 1075}, "image": "ddos"},

    {"id": "sb-3", "name": "交换机", "location": {"x": 870, "y": 830}, "image": "switchboard"},
    {"id": "sb-4", "name": "交换机", "location": {"x": 685, "y": 830}, "image": "switchboard"},
    {"id": "sb-10", "name": "交换机", "location": {"x": 685, "y": 920}, "image": "switchboard"},
    {"id": "sb-11", "name": "交换机", "location": {"x": 870, "y": 920}, "image": "switchboard"},
    {"id": "fw-3", "name": "防火墙", "location": {"x": 870, "y": 690}, "image": "firewall"},
    {"id": "fw-4", "name": "防火墙", "location": {"x": 685, "y": 690}, "image": "firewall"},
    {"id": "dp-1", "name": "网络数据防泄露", "location": {"x": 514, "y": 690}, "image": "dataPrevention"},
    {"id": "ba-3", "name": "应用负载均衡", "location": {"x": 800, "y": 1050}, "image": "balancing"},
    {"id": "ba-4", "name": "应用负载均衡", "location": {"x": 900, "y": 1050}, "image": "balancing"},
    {"id": "patch", "name": "补丁服务器", "location": {"x": 480, "y": 1050}, "image": "patch"},
    {"id": "waf-1", "name": "WAF", "location": {"x": 975, "y": 766}, "image": "waf"},
    {"id": "waf-2", "name": "WAF", "location": {"x": 975, "y": 916}, "image": "waf"},
    {"id": "sv-1", "name": "云主机", "location": {"x": 500, "y": 900}, "image": "servicer"},

    {"id": "fw-7", "name": "防火墙", "location": {"x": 350, "y": 652}, "image": "firewall"},
    {"id": "dp-2", "name": "入侵防御", "location": {"x": 250, "y": 660}, "image": "dataPrevention"},
    {"id": "bug", "name": "病毒过滤", "location": {"x": 150, "y": 660}, "image": "bug"},
    {"id": "router", "name": "接入路由器", "location": {"x": 50, "y": 675}, "image": "router"},

    {"id": "fw-8", "name": "防火墙", "location": {"x": 500, "y": 400}, "image": "firewall"},
    {"id": "sb-12", "name": "交换机", "location": {"x": 400, "y": 405}, "image": "switchboard"},
    {"id": "om-1", "name": "网管平台", "location": {"x": 300, "y": 350}, "image": "networkplatform"},
    {"id": "om-2", "name": "备份系统", "location": {"x": 300, "y": 460}, "image": "backsystem"},
    {"id": "om-3", "name": "代码审计", "location": {"x": 220, "y": 350}, "image": "code"},
    {"id": "om-4", "name": "终端数据防泄漏", "location": {"x": 220, "y": 460}, "image": "dataPrevention"},
    {"id": "om-5", "name": "WEB扫描", "location": {"x": 140, "y": 350}, "image": "webscan"},
    {"id": "om-6", "name": "漏洞扫描", "location": {"x": 140, "y": 460}, "image": "bug"},
    {"id": "om-7", "name": "4A平台", "location": {"x": 60, "y": 350}, "image": "4as"},
    {"id": "om-8", "name": "云管平台", "location": {"x": 60, "y": 460}, "image": "cloudplatform"},
    // {"id": "develop", "name": "开发测试区", "location": {"x": 635, "y": 390}, "image": "develop"},
    // {"id": "tradition", "name": "传统数据库区", "location": {"x": 500, "y": 390}, "image": "tradition"},
    // {"id": "terminal", "name": "运维终端区", "location": {"x": 360, "y": 390}, "image": "terminal"},
    // {"id": "manage", "name": "运维管理区", "location": {"x": 220, "y": 390}, "image": "manage"},
    // {"id": "government", "name": "电子政务外网", "location": {"x": 75, "y": 424}, "image": "government"},
    // {"id": "specialLine", "name": "专线", "location": {"x": 76, "y": 720}, "image": "specialLine"},
    // {"id": "dataLead", "name": "数据前置区", "location": {"x": 180, "y": 700}, "image": "dataLead"},
    {"id": "core", "name": "核心交换机", "location": {"x": 850, "y": 550}, "image": "core"},
    // {"id": "bug", "name": "Web漏洞扫描系统", "location": {"x": 360, "y": 120}, "image": "bug"},
    // {"id": "dp-2", "name": "终端数据防泄露", "location": {"x": 360, "y": 250}, "image": "dataPrevention"},

    {"id": "sb-6", "name": "接入交换机", "location": {"x": 1342, "y": 232}, "image": "switchboard"},
    {"id": "sb-5", "name": "接入交换机", "location": {"x": 1195, "y": 232}, "image": "switchboard"},
    {"id": "ba-5", "name": "应用负载均衡", "location": {"x": 1490, "y": 268}, "image": "balancing"},
    {"id": "sb-8", "name": "汇聚交换机", "location": {"x": 1342, "y": 315}, "image": "switchboard"},
    {"id": "sb-7", "name": "汇聚交换机", "location": {"x": 1195, "y": 315}, "image": "switchboard"},
    {"id": "fw-6", "name": "防火墙", "location": {"x": 1342, "y": 415}, "image": "firewall"},
    {"id": "fw-5", "name": "防火墙", "location": {"x": 1195, "y": 415}, "image": "firewall"},
    {"id": "sv-2", "name": "云主机服务器", "location": {"x": 1250, "y": 100}, "image": "servicer"},
    {"id": "invade", "name": "入侵检测", "location": {"x": 1490, "y": 401}, "image": "invade"}
  ],
  "link": [
    {"id": "link-5", "type": "dashed", "from": "sb-1", "to": "ba-1"},
    {"id": "link-6", "type": "dashed", "from": "sb-2", "to": "ba-2"},
    // {"id": "link-7", "type": "dashed", "from": "sb-1", "to": "ba-2"},
    // {"id": "link-8", "type": "dashed", "from": "sb-2", "to": "ba-1"},
    {"id": "link-9", "type": "dashed", "from": "sb-1", "to": "fw-1"},
    {"id": "link-10", "type": "dashed", "from": "sb-2", "to": "fw-2"},
    // {"id": "link-2", "type": "dashed", "from": "sb-1", "to": "fw-2"},
    // {"id": "link-3", "type": "dashed", "from": "sb-2", "to": "fw-1"},
    {"id": "link-11", "type": "dashed", "from": "fw-1", "to": "gw-1"},
    {"id": "link-12", "type": "dashed", "from": "fw-2", "to": "gw-2"},
    {"id": "link-13", "type": "dashed", "from": "sb-2", "to": "clean"},
    // {"id": "link-1", "type": "dashed", "from": "sb-1", "to": "clean"},

    {"id": "link-14", "type": "dashed", "from": "gw-1", "to": "waf-1"},
    {"id": "link-15", "type": "dashed", "from": "gw-2", "to": "waf-2"},
    // {"id": "link-16", "type": "dashed", "from": "detection", "to": "sb-11"},
    {"id": "link-17", "type": "dashed", "from": "waf-1", "to": "sb-3"},
    {"id": "link-18", "type": "dashed", "from": "waf-2", "to": "sb-11"},
    {"id": "link-19", "type": "dashed", "from": "fw-3", "to": "fw-4"},
    {"id": "link-20", "type": "dashed", "from": "sb-3", "to": "sb-4"},
    // {"id": "link-21", "type": "dashed", "from": "sb-4", "to": "sb-11"},
    {"id": "link-22", "type": "dashed", "from": "sb-10", "to": "sb-11"},
    {"id": "link-23", "type": "dashed", "from": "sb-3", "to": "sb-11"},
    // {"id": "link-24", "type": "dashed", "from": "sb-3", "to": "sb-10"},
    // {"id": "link-25", "type": "dashed", "from": "sb-4", "to": "sb-10"},
    {"id": "link-26", "type": "dashed", "from": "fw-3", "to": "sb-3"},
    // {"id": "link-27", "type": "dashed", "from": "fw-4", "to": "sb-11"},
    {"id": "link-28", "type": "dashed", "from": "ba-3", "to": "ba-4"},
    {"id": "link-29", "type": "dashed", "from": "ba-3", "to": "sb-11"},
    {"id": "link-30", "type": "dashed", "from": "ba-4", "to": "sb-3"},
    {"id": "link-31", "type": "dashed", "from": "patch", "to": "sb-11"},
    {"id": "link-32", "type": "dashed", "from": "sb-4", "to": "sv-1"},
    {"id": "link-33", "type": "dashed", "from": "sb-10", "to": "sv-1"},
    {"id": "link-34", "type": "dashed", "from": "dp-1", "to": "sb-3"},
    // {"id": "link-35", "type": "dashed", "from": "dp-1", "to": "sb-11"},

    {"id": "link-36", "type": "dashed", "from": "fw-5", "to": "sb-7"},
    {"id": "link-37", "type": "dashed", "from": "fw-6", "to": "sb-8"},
    {"id": "link-38", "type": "dashed", "from": "sb-5", "to": "sb-7"},
    {"id": "link-39", "type": "dashed", "from": "sb-6", "to": "sb-8"},
    // {"id": "link-40", "type": "dashed", "from": "sb-5", "to": "sb-8"},
    // {"id": "link-41", "type": "dashed", "from": "sb-6", "to": "sb-7"},
    // {"id": "link-42", "type": "dashed", "from": "sb-5", "to": "sb-6"},
    // {"id": "link-43", "type": "dashed", "from": "sb-7", "to": "sb-8"},
    {"id": "link-44", "type": "dashed", "from": "sb-5", "to": "sv-2"},
    {"id": "link-45", "type": "dashed", "from": "sb-6", "to": "sv-2"},
    {"id": "link-46", "type": "dashed", "from": "sb-6", "to": "ba-5"},
    // {"id": "link-47", "type": "dashed", "from": "sb-8", "to": "ba-5"},
    {"id": "link-48", "type": "dashed", "from": "invade", "to": "sb-8"},
    {"id": "link-49", "type": "dashed", "from": "core", "to": "fw-5", "style": "H.V"},

    {"id": "link-50", "type": "dashed", "from": "core", "to": "fw-6", "style": "H.V"},
    {"id": "link-51", "type": "dashed", "from": "core", "to": "fw-4", "style": "H.V"},
    {"id": "link-52", "type": "dashed", "from": "core", "to": "fw-3", "style": "H.V"},
    {"id": "link-53", "type": "dashed", "from": "core", "to": "fw-7", "style": "H.V"},
    {"id": "link-54", "type": "dashed", "from": "fw-7", "to": "dp-2"},
    {"id": "link-55", "type": "dashed", "from": "dp-2", "to": "bug"},
    {"id": "link-56", "type": "dashed", "from": "bug", "to": "router"},
    {"id": "link-57", "type": "dashed", "from": "core", "to": "fw-8", "style": "H.V"},
    {"id": "link-58", "type": "dashed", "from": "fw-8", "to": "sb-12"},
    {"id": "link-59", "type": "dashed", "from": "ba-2", "to": "user"},
    {"id": "link-60", "type": "dashed", "from": "ba-1", "to": "user"}
    // {"id": "link-59", "type": "dashed", "from": "sb-7", "to": "sb-8"},
    // {"id": "link-60", "type": "dashed", "from": "sb-7", "to": "sb-8"},
    // {"id": "link-61", "type": "dashed", "from": "sb-5", "to": "sb-7"},
    // {"id": "link-62", "type": "dashed", "from": "sb-8", "to": "sb-6"},
    // {"id": "link-63", "type": "dashed", "from": "sb-5", "to": "sb-6"},
    // {"id": "link-64", "type": "dashed", "from": "sb-5", "to": "sb-6"},
    // {"id": "link-65", "type": "dashed", "from": "sb-5", "to": "share"},
    // {"id": "link-66", "type": "dashed", "from": "sb-6", "to": "share"}
  ],
  "group": [
    {
      "id": "internetAccessArea",
      "name": "互联网接入区",
      "image": "internetGroup",
      "paddingVertical": 30,
      "paddingHorizontal": 40,
      "ids": ["telecom_router", "unicom_router", "sb-1", "sb-2", "ba-1", "ba-2",
        "fw-1", "fw-2", "gw-1", "gw-2", "clean", "detection", "ddos"]
    },
    {
      "id": "dmzArea",
      "name": "互联网业务区",
      "image": "serviceGroup",
      "paddingVertical": -10,
      "paddingHorizontal": 0,
      "ids": ["sv-1", "sb-3", "sb-4", "fw-3", "fw-4", "dp-1", "sv-4", "ba-3",
        "ba-4", "patch", "waf-1", "waf-2", "sb-10", "sb-11"]
    },
    {
      "id": "urbanOperation",
      "name": "运营区",
      "paddingHorizontal": 50,
      "ids": ["sv-5", "sb-5", "sb-6", "sb-7", "sb-8", "ba-5", "ba-6",
        "invade", "sv-2", "fw-5", "fw-6"]
    },
    {
      "id": "accessArea",
      "name": "专网接入区",
      "paddingHorizontal": 10,
      "ids": ["fw-7", "dp-2", "bug", "router"]
    },
    {
      "id": "operationManager",
      "name": "运维管理区",
      "paddingHorizontal": 10,
      "ids": ["fw-8", "sb-12", "om-1", "om-2", "om-3",
        "om-4", "om-5", "om-6", "om-7", "om-8"]
    }
  ]
};

export const newData = {
  "link1": [
    {"id": "link-5", "type": "solid"},
    {"id": "link-9", "type": "solid"},
    {"id": "link-11", "type": "solid"},
    {"id": "link-14", "type": "solid"},
    {"id": "link-17", "type": "solid"},
    {"id": "link-26", "type": "solid"},
    {"id": "link-52", "type": "solid"},
    {"id": "link-50", "type": "solid"},
    {"id": "link-37", "type": "solid"},
    {"id": "link-39", "type": "solid"},
    {"id": "link-45", "type": "solid"},
    {"id": "link-60", "type": "solid"}
  ],
  "link0": [
    {"id": "link-5", "type": "solid"},
    {"id": "link-9", "type": "solid"},
    {"id": "link-11", "type": "solid"},
    {"id": "link-14", "type": "solid"},
    {"id": "link-17", "type": "solid"},
    {"id": "link-20", "type": "solid"},
    {"id": "link-32", "type": "solid"},
    {"id": "link-60", "type": "solid"}
  ]
};

export const moreServicer = [{
  "group": {
    "id": "servicers",
    "name": "云主机服务器",
    "image": "serviceGroup",
    "root": "sv-1",
    "expand": false
  },
  "node":
    [{
      "event_type": 200,
      "name": "测试设备5",
      "alarm": {
        "attack": [{
          key: 1, value: 30, status: 1
        }, {
          key: 2, value: 21, status: 2
        }],
        "virus": [{
          key: 1, value: 22
        }, {
          key: 2, value: 23
        }],
        "leak": [{
          key: 1, value: 22
        }, {
          key: 2, value: 55
        }, {
          key: 3, value: 111
        }, {
          key: 4, value: 33
        }]
      },
      "ip": "10.10.11.5"
    }, {
      "event_type": 300,
      "name": "测试设备1",
      "alarm": {
        "attack": [],
        "virus": [{
          key: 2, value: 23
        }],
        "leak": [{
          key: 3, value: 111
        }, {
          key: 4, value: 33
        }]
      },
      ip: "10.11.22.11"
    }, {
      "event_type": 200,
      "name": "测试设备4",
      "alarm": {
        "attack": [{
          key: 1, value: 30, status: 1
        }],
        "virus": [{
          key: 1, value: 22
        }],
        "leak": [{
          key: 1, value: 22
        }, {
          key: 2, value: 55
        }, {
          key: 4, value: 33
        }]
      },
      "ip": "10.10.11.10"
    }, {
      "event_type": 300,
      "name": "测试设备3",
      "alarm": {
        "attack": [],
        "virus": [],
        "leak": []
      },
      "ip": "10.10.11.9"
    }, {
      "event_type": 300,
      "name": "测试设备2",
      "alarm": {
        "attack": [],
        "virus": [{
          key: 1, value: 22
        }, {
          key: 2, value: 23
        }],
        "leak": [{
          key: 1, value: 22
        }, {
          key: 2, value: 55
        }, {
          key: 3, value: 111
        }]
      },
      "ip": "10.10.11.8"
    }],
  "direction": "down",
  "location": {x: 10, y: 1000}
}, {
  "group": {
    "id": "servicers-2",
    "name": "云主机服务器",
    "image": "serviceGroup",
    "root": "sv-2",
    "expand": false
  },
  "node": [{
    "event_type": 200,
    "name": "测试设备5",
    "alarm": {
      "attack": [{
        key: 1, value: 30, status: 1
      }],
      "virus": [{
        key: 1, value: 22
      }, {
        key: 2, value: 23
      }],
      "leak": [{
        key: 2, value: 55
      }, {
        key: 3, value: 111
      }, {
        key: 4, value: 33
      }]
    },
    "ip": "10.10.11.5"
  }, {
    "event_type": 300,
    "name": "测试设备1",
    "alarm": {
      "attack": [],
      "virus": [{
        key: 1, value: 22
      }, {
        key: 2, value: 23
      }],
      "leak": [{
        key: 1, value: 22
      }, {
        key: 4, value: 33
      }]
    },
    ip: "10.11.22.11"
  }, {
    "event_type": 200,
    "name": "测试设备4",
    "alarm": {
      "attack": [{
        key: 1, value: 30, status: 1
      }, {
        key: 2, value: 21, status: 2
      }],
      "virus": [{
        key: 1, value: 22
      }],
      "leak": [{
        key: 3, value: 111
      }, {
        key: 4, value: 33
      }]
    },
    "ip": "10.10.11.10"
  }, {
    "event_type": 300,
    "name": "测试设备3",
    "alarm": {
      "attack": [{
        key: 1, value: 30, status: 1
      }],
      "virus": [{
        key: 1, value: 22
      }],
      "leak": [{
        key: 1, value: 22
      }, {
        key: 4, value: 33
      }]
    },
    "ip": "10.10.11.9"
  }, {
    "event_type": 300,
    "name": "测试设备2",
    "ip": "10.10.11.8"
  }],
  "direction": "down",
  "location": {x: 680, y: 150}
}];

export const popupData = [
  {
    label: '漏洞扫描',
    action: function () {
      location.href = '/ssa/taskMgmt/begin.do';
    }
  }
];
