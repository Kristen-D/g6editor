const attackType = {
  color: ["#0065ba", "#028bff", "#12cbf6", "#50e3c2", "#9fe060", "#8f69c7", ],
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [{
    name: '受攻击类型',
    type: 'pie',
    radius: ['40%', '55%'],
    center: ['50%', '50%'],
    label: {
      normal: {
        textStyle: {
          fontSize: 14,
          color: '#3e4956',
        },
      }
    },
    labelLine: { //标签的视觉引导线样式
      normal: {
        length: 10,
        length2: 20,
        lineStyle: {
          color: '#e1e3e4'
        }
      }
    },
    itemStyle: {
      normal: {
        borderWidth: 2,
        borderColor: '#fff',
      },
      emphasis: {
        borderWidth: 0,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    data: [{
        value: 335,
        name: 'CVI'
      },
      {
        value: 310,
        name: 'BAI'
      },
      {
        value: 690,
        name: 'THI'
      },
      {
        value: 848,
        name: 'VAI'
      },
      {
        value: 188,
        name: 'BI'
      },
      {
        value: 140,
        name: 'WI'
      },
    ]
  }]

};

const attackIp = {
  color: ["#0065ba"],
  grid: {
    top: '10%',
    left: '1%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e1e3e4'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#e1e3e4'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#3e4956",
        fontSize: 12,
      },
    },
  },
  yAxis: {
    type: 'category',
    data: ['192.168.32.11', '192.168.32.08', '192.168.88.81', '192.158.66.88', '187.114.38.4'],
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#3e4956",
        fontSize: 12,
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e1e3e4'
      }
    },
  },
  series: [{
      name: '登录',
      type: 'bar',
      barWidth: 12,
      stack: '总量',
      label: {
        normal: {
          show: false,
          position: 'insideRight'
        }
      },
      data: [0, 0, 0, 0, 100]
    },
    {
      name: '登出',
      type: 'bar',
      barWidth: 12,
      stack: '总量',
      label: {
        normal: {
          show: false,
          position: 'insideRight'
        }
      },
      data: [58, 67, 72, 80, 0]
    },
  ]
}

const attackTendency = {
  tooltip: {
    trigger: 'axis',
    formatter: "日期：2017.{b} <br/> 高危：{c} <br/> 中危：0 <br/> 低危：0"

  },
  grid: {
    show: false,
    left: 30,
    top: 34,
    right: 30,
    bottom: 30,
    containLabel: true,
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    data: ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27'],
    axisLine: { //坐标轴轴线相关设置。数学上的x轴
      show: false,
      lineStyle: {
        color: '#E1E3E4'
      },
    },
    axisLabel: { //坐标轴刻度标签的相关设置
      textStyle: {
        color: '#3E4956',
      },
    },
    axisTick: { //坐标轴刻度相关设置。
      show: false,
    },

  }],
  yAxis: [{
    type: 'value',
    min: 0,
    max: 35,
    splitNumber: 7,
    splitLine: { //坐标轴在 grid 区域中的分隔线。
      show: true,
      lineStyle: {
        color: '#E1E3E4'
      }
    },
    axisLine: { //坐标轴轴线相关设置。数学上的y轴
      show: false,
      lineStyle: {
        color: '#E1E3E4'
      },
    },
    axisLabel: {
      textStyle: {
        color: '#3E4956'
      },
    },
    axisTick: { //坐标轴刻度相关设置。
      show: false,
    },
  }],
  series: [{
    name: '挽回结果',
    type: 'line',
    smooth: true, //是否平滑曲线显示
    symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
    symbolSize: 6,
    itemStyle: {
      normal: {
        color: "#2980b9", // 会设置点和线的颜色，所以需要下面定制 line
        borderColor: "#fff" // 点边线的颜色
      }
    },
    lineStyle: {
      normal: {
        color: "#2980b9" // 线条颜色
      }
    },
    areaStyle: { //区域填充样式
      normal: {
        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(53,142,215, 0.9)'
          },
          {
            offset: 0.7,
            color: 'rgba(53,142,215, 0.3)'
          }
        ], false),

        shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
        shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      }
    },
    data: [10, 14, 20, 17, 15, 10, 18]
  }]
}

const attackAssetA = {
  title: {
    text: '{hr|}{t|网络设备}',
    subtext: '{st|资产总数：}{d|100}\n\n{st|受攻击数：}{d|24}',
    top: '25%',
    left: '12%',
    itemGap: 20,
    textStyle: {
      color: "#3e4956",
      rich: {
        hr: {
          borderColor: '#f72e00',
          borderWidth: 2,
          borderRadius: 0,
          width: 0,
          height: 10,
        },
        t: {
          padding: [0, 0, 0, 10],
          fontSize: 14,
        },
      }
    },
    subtextStyle: {
      color: "#3e4956",

      rich: {
        st: {
          padding: [0, 0, 0, 12],
          fontSize: 12,
        },
        d: {
          fontFamily: "HATTEN",
          fontSize: 18,
        }
      }
    }
  },
  series: [{
    name: '网络设备',
    type: 'pie',
    radius: ['42%', '60%'],
    center: ['75%', '50%'],
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 24,
      name: '网络设备',
      itemStyle: {
        normal: {
          color: '#f72e00'
        }
      },
      label: {
        normal: {
          formatter: '{d} %',
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '16',
            fontWeight: 'bold',
            color: '#9ea3b4'
          }
        }
      }
    }, {
      value: 76,
      name: '',
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#f3f4f4'
        },
        emphasis: {
          color: '#f3f4f4'
        }
      },
      hoverAnimation: false
    }]
  }]
}

const attackAssetB = {
  title: {
    text: '{hr|}{t|安全设备}',
    subtext: '{st|资产总数：}{d|100}\n\n{st|受攻击数：}{d|32}',
    top: '25%',
    left: '12%',
    itemGap: 20,
    textStyle: {
      color: "#3e4956",
      rich: {
        hr: {
          borderColor: '#007be8',
          borderWidth: 2,
          borderRadius: 0,
          width: 0,
          height: 10,
        },
        t: {
          padding: [0, 0, 0, 10],
          fontSize: 14,
        },
      }
    },
    subtextStyle: {
      color: "#3e4956",

      rich: {
        st: {
          padding: [0, 0, 0, 12],
          fontSize: 12,
        },
        d: {
          fontFamily: "HATTEN",
          fontSize: 18,
        }
      }
    }
  },
  series: [{
    name: '安全设备',
    type: 'pie',
    radius: ['42%', '60%'],
    center: ['75%', '50%'],
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 32,
      name: '安全设备',
      itemStyle: {
        normal: {
          color: '#007be8'
        }
      },
      label: {
        normal: {
          formatter: '{d} %',
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '16',
            fontWeight: 'bold',
            color: '#9ea3b4'
          }
        }
      }
    }, {
      value: 68,
      name: '',
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#f3f4f4'
        },
        emphasis: {
          color: '#f3f4f4'
        }
      },
      hoverAnimation: false
    }]
  }]
}

const attackAssetC = {
  title: {
    text: '{hr|}{t|主机/虚拟机}',
    subtext: '{st|资产总数：}{d|100}\n\n{st|受攻击数：}{d|14}',
    top: '25%',
    left: '12%',
    itemGap: 20,
    textStyle: {
      color: "#3e4956",
      rich: {
        hr: {
          borderColor: '#2ecc71',
          borderWidth: 2,
          borderRadius: 0,
          width: 0,
          height: 10,
        },
        t: {
          padding: [0, 0, 0, 10],
          fontSize: 14,
        },
      }
    },
    subtextStyle: {
      color: "#3e4956",

      rich: {
        st: {
          padding: [0, 0, 0, 12],
          fontSize: 12,
        },
        d: {
          fontFamily: "HATTEN",
          fontSize: 18,
        }
      }
    }
  },
  series: [{
    name: '主机/虚拟机',
    type: 'pie',
    radius: ['42%', '60%'],
    center: ['75%', '50%'],
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 14,
      name: '主机/虚拟机',
      itemStyle: {
        normal: {
          color: '#2ecc71'
        }
      },
      label: {
        normal: {
          formatter: '{d} %',
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '16',
            fontWeight: 'bold',
            color: '#9ea3b4'
          }
        }
      }
    }, {
      value: 86,
      name: '',
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#f3f4f4'
        },
        emphasis: {
          color: '#f3f4f4'
        }
      },
      hoverAnimation: false
    }]
  }]
}

const attackAssetD = {
  title: {
    text: '{hr|}{t|中间件}',
    subtext: '{st|资产总数：}{d|100}\n\n{st|受攻击数：}{d|12}',
    top: '25%',
    left: '12%',
    itemGap: 20,
    textStyle: {
      color: "#3e4956",
      rich: {
        hr: {
          borderColor: '#f79100',
          borderWidth: 2,
          borderRadius: 0,
          width: 0,
          height: 10,
        },
        t: {
          padding: [0, 0, 0, 10],
          fontSize: 14,
        },
      }
    },
    subtextStyle: {
      color: "#3e4956",

      rich: {
        st: {
          padding: [0, 0, 0, 12],
          fontSize: 12,
        },
        d: {
          fontFamily: "HATTEN",
          fontSize: 18,
        }
      }
    }
  },
  series: [{
    name: '中间件',
    type: 'pie',
    radius: ['42%', '60%'],
    center: ['75%', '50%'],
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 12,
      name: '中间件',
      itemStyle: {
        normal: {
          color: '#f79100'
        }
      },
      label: {
        normal: {
          formatter: '{d} %',
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '16',
            fontWeight: 'bold',
            color: '#9ea3b4'
          }
        }
      }
    }, {
      value: 88,
      name: '',
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#f3f4f4'
        },
        emphasis: {
          color: '#f3f4f4'
        }
      },
      hoverAnimation: false
    }]
  }]
}

const attackAssetE = {
  title: {
    text: '{hr|}{t|WEB}',
    subtext: '{st|资产总数：}{d|100}\n\n{st|受攻击数：}{d|21}',
    top: '25%',
    left: '12%',
    itemGap: 20,
    textStyle: {
      color: "#3e4956",
      rich: {
        hr: {
          borderColor: '#12cbf6',
          borderWidth: 2,
          borderRadius: 0,
          width: 0,
          height: 10,
        },
        t: {
          padding: [0, 0, 0, 10],
          fontSize: 14,
        },
      }
    },
    subtextStyle: {
      color: "#3e4956",

      rich: {
        st: {
          padding: [0, 0, 0, 12],
          fontSize: 12,
        },
        d: {
          fontFamily: "HATTEN",
          fontSize: 18,
        }
      }
    }
  },
  series: [{
    name: 'WEB',
    type: 'pie',
    radius: ['42%', '60%'],
    center: ['75%', '50%'],
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 21,
      name: 'WEB',
      itemStyle: {
        normal: {
          color: '#12cbf6'
        }
      },
      label: {
        normal: {
          formatter: '{d} %',
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '16',
            fontWeight: 'bold',
            color: '#9ea3b4'
          }
        }
      }
    }, {
      value: 79,
      name: '',
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#f3f4f4'
        },
        emphasis: {
          color: '#f3f4f4'
        }
      },
      hoverAnimation: false
    }]
  }]
}

export {
  attackType,
  attackIp,
  attackTendency,
  attackAssetA,
  attackAssetB,
  attackAssetC,
  attackAssetD,
  attackAssetE
}
