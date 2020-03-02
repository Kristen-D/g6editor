// const imgUrlPre = "/static/topoImages/";
// const servicerUrl = "/ssa/netJtopo/getEventTypeTop5.do";
export const data = {
  "node": [
    {"id": "1", "name": "电信", "location": {"x": 760, "y": 30}, "image": "internet"},
    {"id": "2", "name": "联通", "location": {"x": 1160, "y": 30}, "image": "internet"},
    {"id": "fw-1", "name": "FW", "location": {"x": 760, "y": 150}, "image": "firewall"},
    {"id": "fw-2", "name": "FW", "location": {"x": 1160, "y": 150}, "image": "firewall"},
    {"id": "gw-1", "name": "深度安全网关", "location": {"x": 900, "y": 200}, "image": "gateway"},
    {"id": "gw-2", "name": "深度安全网关", "location": {"x": 1020, "y": 200}, "image": "gateway"},
    {"id": "sw-1", "name": "核心交换机", "location": {"x": 960, "y": 300}, "image": "switchboard"},
    {"id": "ba-1", "name": "F5负载均衡", "location": {"x": 760, "y": 380}, "image": "balancing"},
    {"id": "ba-2", "name": "F5负载均衡", "location": {"x": 1160, "y": 380}, "image": "balancing"},
    {"id": "gw-3", "name": "深度安全网关", "location": {"x": 660, "y": 220}, "image": "gateway"},
    {"id": "gw-4", "name": "深度安全网关", "location": {"x": 660, "y": 300}, "image": "gateway"},
    {"id": "r-1", "name": "Router", "location": {"x": 540, "y": 300}, "image": "router"},
    {"id": "r-2", "name": "Router", "location": {"x": 540, "y": 380}, "image": "router"},
    {"id": "gw-5", "name": "深度安全网关", "location": {"x": 500, "y": 480}, "image": "gateway"},
    {"id": "gw-6", "name": "深度安全网关", "location": {"x": 620, "y": 480}, "image": "gateway"},
    {"id": "sg-1", "name": "成都数据中心", "location": {"x": 300, "y": 200}, "image": "serviceGroup"},
    {"id": "sg-2", "name": "三峡数据中心", "location": {"x": 300, "y": 300}, "image": "serviceGroup"},
    {"id": "sg-3", "name": "其他分支机构", "location": {"x": 300, "y": 400}, "image": "serviceGroup"},
    {"id": "fw-3", "name": "策略防火墙", "location": {"x": 960, "y": 400}, "image": "firewall"},
    {"id": "fw-4", "name": "策略防火墙", "location": {"x": 960, "y": 500}, "image": "firewall"},
    {"id": "ws-1", "name": "行为审计", "location": {"x": 960, "y": 600}, "image": "webscan"},
    {"id": "gw-7", "name": "深度安全网关", "location": {"x": 900, "y": 700}, "image": "gateway"},
    {"id": "gw-8", "name": "深度安全网关", "location": {"x": 1020, "y": 700}, "image": "gateway"},
    {"id": "gw-9", "name": "威胁发现设备", "location": {"x": 1100, "y": 500}, "image": "gateway"},
    {"id": "sw-2", "name": "核心交换机", "location": {"x": 960, "y": 800}, "image": "switchboard"},
    {"id": "sw-3", "name": "核心交换机", "location": {"x": 960, "y": 900}, "image": "switchboard"},
    {"id": "user", "name": "用户", "location": {"x": 500, "y": 750}, "image": "user"},
    {"id": "fw-5", "name": "IPS", "location": {"x": 1100, "y": 800}, "image": "firewall"},
    {"id": "fw-6", "name": "FW", "location": {"x": 1300, "y": 800}, "image": "firewall"},
    {"id": "gw-10", "name": "深度安全网关", "location": {"x": 1380, "y": 900}, "image": "gateway"},
    {"id": "sw-4", "name": "核心交换机", "location": {"x": 1450, "y": 800}, "image": "switchboard"},
    {"id": "sw-5", "name": "核心交换机", "location": {"x": 1450, "y": 700}, "image": "switchboard"},
    // {"id": "sv-1", "name": "服务器", "location": {"x": 1550, "y": 700}, "image": "serviceGroup"},
    {"id": "gw-11", "name": "深度安全网关", "location": {"x": 1300, "y": 600}, "image": "gateway"},
    {"id": "gw-12", "name": "深度安全网关", "location": {"x": 1500, "y": 600}, "image": "gateway"},
    {"id": "gw-13", "name": "深度安全网关", "location": {"x": 1300, "y": 250}, "image": "gateway"},
    {"id": "gw-14", "name": "深度安全网关", "location": {"x": 1500, "y": 250}, "image": "gateway"},
    {"id": "fw-7", "name": "DMZFW", "location": {"x": 1300, "y": 350}, "image": "firewall"},
    {"id": "sw-6", "name": "DMZ核心交换机", "location": {"x": 1450, "y": 350}, "image": "switchboard"},

  ],
  "link": [
    {"id": "link-1", "type": "dashed", "from": "1", "to": "fw-1"},
    {"id": "link-2", "type": "dashed", "from": "2", "to": "fw-2"},
    {"id": "link-3", "type": "dashed", "from": "fw-1", "to": "gw-1"},
    {"id": "link-4", "type": "dashed", "from": "fw-2", "to": "gw-2"},
    {"id": "link-5", "type": "dashed", "from": "gw-1", "to": "sw-1"},
    {"id": "link-6", "type": "dashed", "from": "gw-2", "to": "sw-1"},
    {"id": "link-7", "type": "dashed", "from": "ba-1", "to": "sw-1"},
    {"id": "link-8", "type": "dashed", "from": "ba-2", "to": "sw-1"},
    {"id": "link-9", "type": "dashed", "from": "gw-3", "to": "r-1"},
    {"id": "link-10", "type": "dashed", "from": "gw-4", "to": "r-1"},
    {"id": "link-11", "type": "dashed", "from": "sg-1", "to": "r-1"},
    {"id": "link-12", "type": "dashed", "from": "sg-2", "to": "r-1"},
    {"id": "link-13", "type": "dashed", "from": "sg-3", "to": "r-1"},
    {"id": "link-14", "type": "dashed", "from": "r-2", "to": "r-1"},
    {"id": "link-15", "type": "dashed", "from": "r-2", "to": "gw-5"},
    {"id": "link-16", "type": "dashed", "from": "r-2", "to": "gw-6"},
    {"id": "link-17", "type": "dashed", "from": "sw-3", "to": "gw-5"},
    {"id": "link-18", "type": "dashed", "from": "sw-2", "to": "gw-6"},
    {"id": "link-19", "type": "dashed", "from": "sw-2", "to": "user"},
    {"id": "link-20", "type": "dashed", "from": "sw-3", "to": "user"},
    {"id": "link-21", "type": "dashed", "from": "sw-2", "to": "gw-7"},
    {"id": "link-22", "type": "dashed", "from": "sw-2", "to": "gw-8"},
    {"id": "link-23", "type": "dashed", "from": "sw-2", "to": "fw-5"},
    {"id": "link-24", "type": "dashed", "from": "sw-3", "to": "fw-5"},
    {"id": "link-25", "type": "dashed", "from": "gw-7", "to": "ws-1"},
    {"id": "link-26", "type": "dashed", "from": "gw-8", "to": "ws-1"},
    {"id": "link-27", "type": "dashed", "from": "fw-4", "to": "ws-1"},
    {"id": "link-28", "type": "dashed", "from": "fw-4", "to": "fw-3"},
    {"id": "link-29", "type": "dashed", "from": "sw-1", "to": "fw-3"},
    {"id": "link-30", "type": "dashed", "from": "sw-1", "to": "gw-3"},
    {"id": "link-31", "type": "dashed", "from": "sw-1", "to": "gw-4"},
    {"id": "link-32", "type": "dashed", "from": "sw-2", "to": "gw-9"},
    {"id": "link-33", "type": "dashed", "from": "fw-5", "to": "fw-6"},
    {"id": "link-34", "type": "dashed", "from": "fw-6", "to": "gw-10"},
    {"id": "link-35", "type": "dashed", "from": "sw-4", "to": "gw-10"},
    {"id": "link-36", "type": "dashed", "from": "sw-4", "to": "sw-5"},
    {"id": "link-37", "type": "dashed", "from": "gw-11", "to": "sw-5"},
    {"id": "link-38", "type": "dashed", "from": "gw-12", "to": "sw-5"},
    {"id": "link-39", "type": "dashed", "from": "fw-6", "to": "gw-11"},
    {"id": "link-40", "type": "dashed", "from": "sw-3", "to": "fw-7"},
    {"id": "link-41", "type": "dashed", "from": "gw-13", "to": "fw-7"},
    {"id": "link-42", "type": "dashed", "from": "gw-13", "to": "sw-6"},
    {"id": "link-43", "type": "dashed", "from": "gw-14", "to": "sw-6"},
    {"id": "link-44", "type": "dashed", "from": "sw-1", "to": "gw-13"},

  ],
  "group": [
    {
      "id": "internetAccessArea",
      "name": "DMZ区",
      "image": "internetGroup",
      "paddingVertical": 30,
      "paddingHorizontal": 40,
      "ids": ["gw-13", "gw-14", "sw-6", "fw-7", "servicers-2"]
    },
    // {
    //   "id": "dmzArea",
    //   "name": "互联网业务区",
    //   "image": "serviceGroup",
    //   "paddingVertical": -10,
    //   "paddingHorizontal": 0,
    //   // "ids": ["sv-1", "sb-3", "sb-4", "fw-3", "fw-4", "dp-1", "sv-4", "ba-3",
    //   //   "ba-4", "patch", "waf-1", "waf-2", "sb-10", "sb-11"]
    // },
    // {
    //   "id": "urbanOperation",
    //   "name": "运营区",
    //   "paddingHorizontal": 50,
    //   // "ids": ["sv-5", "sb-5", "sb-6", "sb-7", "sb-8", "ba-5", "ba-6",
    //   //   "invade", "sv-2", "fw-5", "fw-6"]
    // },
    // {
    //   "id": "accessArea",
    //   "name": "专网接入区",
    //   "paddingHorizontal": 10,
    //   // "ids": ["fw-7", "dp-2", "bug", "router"]
    // },
    // {
    //   "id": "operationManager",
    //   "name": "运维管理区",
    //   "paddingHorizontal": 10,
    //   // "ids": ["fw-8", "sb-12", "om-1", "om-2", "om-3",
    //   //   "om-4", "om-5", "om-6", "om-7", "om-8"]
    // }
  ]
};

export const newData = {
  "link1": [
    // {"id": "link-5", "type": "solid"},
    // {"id": "link-9", "type": "solid"},
    // {"id": "link-11", "type": "solid"},
    // {"id": "link-14", "type": "solid"},
    // {"id": "link-17", "type": "solid"},
    // {"id": "link-26", "type": "solid"},
    // {"id": "link-52", "type": "solid"},
    // {"id": "link-50", "type": "solid"},
    // {"id": "link-37", "type": "solid"},
    // {"id": "link-39", "type": "solid"},
    // {"id": "link-45", "type": "solid"},
    // {"id": "link-60", "type": "solid"}
  ],
  "link0": [
    // {"id": "link-5", "type": "solid"},
    // {"id": "link-9", "type": "solid"},
    // {"id": "link-11", "type": "solid"},
    // {"id": "link-14", "type": "solid"},
    // {"id": "link-17", "type": "solid"},
    // {"id": "link-20", "type": "solid"},
    // {"id": "link-32", "type": "solid"},
    // {"id": "link-60", "type": "solid"}
  ]
};

export const moreServicer = [{
  "group": {
    "id": "servicers",
    "name": "服务器",
    "image": "serviceGroup",
    "root": "sw-5",
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
  "location": {x: 1550, y: 750}
}, {
  "group": {
    "id": "servicers-2",
    "name": "服务器",
    "image": "serviceGroup",
    "root": "sw-6",
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
  "location": {x: 1550, y: 350}
}];

export const popupData = [
  {
    label: '漏洞扫描',
    action: function () {
      location.href = '/ssa/taskMgmt/begin.do';
    }
  }
];
