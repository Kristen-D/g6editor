// series[0].data
const attackType = {
  color: ['#ff2a00', '#ffdd3f', '#ff8400'],
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [{
    name: '等级',
    type: 'pie',
    radius: ['45%', '60%'],
    center: ['50%', '60%'],
    roseType: 'radius',
    label: {
      normal: {
        show: true,
        color: '#23ffff',
        fontFamily: 'ElementalEnd'
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#23ffff',
        }
      }
    },
    labelLine: {
      normal: {
        show: true,
        lineStyle: {
          color: '#23ffff'
        }
      },
      emphasis: {
        lineStyle: {
          color: '#23ffff'
        }
      }
    },
    data: []
  }]
};
// series[0].data[0].value
const terminalSecurity = {
  title: {
    text: '{x|0%}\n{a|杀毒软件安装率}',
    textStyle: {
      rich: {
        a: {
          color: 'rgba(255,255,255,.7)',
          fontSize: 14,
          verticalAlign: 'middle',
          align: 'center',
          lineHeight: 50,
        },
        x: {
          fontSize: 24,
          color: '#fff',
          fontFamily: 'ElementalEnd',
          fontWeight: 600,
          verticalAlign: 'middle',
          align: 'center',
        },
      }
    },
    left: '17%',
    top: '15%'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} : {d}%"
  },
  series: [{
    name: '杀毒软件安装率',
    type: 'pie',
    center: ['73%', '47%'],
    radius: ['55%', '75%'],
    label: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 0,
      name: '杀毒软件安装率',
      itemStyle: {
        normal: {color: '#027fd4'},
        //   emphasis:{color:'#027fd4'},
      }
    }, {
      value: 100 - 83,
      name: '占位',
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#aaa'
        },
        emphasis: {
          color: '#aaa'
        }
      },
      hoverAnimation: false
    }]
  }]
};

// title.text, series[0],data
let barcolor = ['#027fd4', '#7c2dd3', '#ce04d4'];
const mailCheck = {
  title: {
    text: ['{a|共}', '{x|0}', '{a|封}',],
    textStyle: {
      rich: {
        a: {
          color: 'rgba(255,255,255,.7)',
          fontSize: 14
        },
        x: {
          fontSize: 20,
          color: '#fff',
          fontFamily: 'ElementalEnd',
          fontWeight: 600,
          padding: [0, 10, 0, 10]
        },
      }
    },
    left: 'center',
    top: 5
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: 10,
    right: 10,
    bottom: '15%'
  },
  xAxis: [{
    type: 'category',
    data: ['正常邮件', '垃圾邮件', '病毒邮件'],
    axisTick: {show: false},
    axisLabel: {color: 'rgba(255,255,255,.7)'},
    axisLine: {lineStyle: {color: '#202838'}},
  }],
  yAxis: [{
    type: 'value',
    show: true,
    splitNumber: 5,
    splitLine: {lineStyle: {color: '#202838'}},
    axisLabel: {show: false},
    axisLine: {show: false},
    axisTick: {show: false},
  }],
  series: [{
    type: 'bar',
    barWidth: '50',
    itemStyle: {
      normal: {
        color: function (params) {
          return barcolor[params.dataIndex]
        }
      }
    },
    label: {
      normal: {
        show: true,
        position: 'top',
        color: 'rgba(255,255,255,.7)',
        fontFamily: 'ElementalEnd'
      }
    },
    data: []
  }]
};
// xAxis.data, series[0].data series[1].data
const illegalBehavior = {
  legend: {
    top: 10,
    left: 0,
    itemGap: 30,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {color: 'rgba(255,255,255,.7)'},
    data: [{name: '外联', icon: 'rect'}, {name: 'U盘', icon: 'rect'}]
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: 10,
    right: 0,
    bottom: 10
  },
  xAxis: {
    boundaryGap: false,
    axisTick: {show: false},
    axisLabel: {show: false},
    axisLine: {show: false},
    data: []
  },
  yAxis: {
    //interval:50,
    type: 'value',
    show: true,
    splitNumber: 10,
    splitLine: {lineStyle: {color: '#202838'}},
    axisLabel: {show: false},
    axisLine: {show: false},
    axisTick: {show: false},
  },
  series: [{
    name: '外联',
    type: 'line',
    stack: '总量',
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    data: [],
    areaStyle: {
      normal: {
        color: '#0ac3dc',
        opacity: 1,
      }
    },
    itemStyle: {
      normal: {
        color: '#0ac3dc'
      }
    },
    lineStyle: {
      normal: {
        width: 1,
        color: '#0ac3dc'
      }
    }
  }, {
    name: 'U盘',
    type: 'line',
    stack: '总量',
    //     smooth: true,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    data: [],
    areaStyle: {
      normal: {
        color: '#1779cd',
        opacity: 1,
      }
    },
    itemStyle: {
      normal: {
        color: '#1779cd'
      }
    },
    lineStyle: {
      normal: {
        width: 1,
        color: '#0d82e6'
      }
    }
  }]
};

// title.text xAxis[0].data, series[0].data, xAxis[0].data
const cumulative = {
  title: {
    text: ['{a|共}', '{x|23,682}', '{a|次}',],
    textStyle: {
      rich: {
        a: {
          color: 'rgba(255,255,255,.7)',
          fontSize: 14
        },
        x: {
          fontSize: 20,
          color: '#fff',
          fontFamily: 'ElementalEnd',
          fontWeight: 600,
          padding: [0, 10, 0, 10]
        },
      }
    },
    left: 'center',
    top: 5
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: 10,
    right: 10,
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisTick: {show: false},
    axisLabel: {color: 'rgba(255,255,255,.7)'},
    axisLine: {lineStyle: {color: '#202838'}},
  }],
  yAxis: [{
    type: 'value',
    show: true,
    // splitNumber: 5,
    // max: 30,
    splitLine: {lineStyle: {color: '#202838'}},
    axisLabel: {show: true, color: 'rgba(255,255,255,.7)'},
    axisLine: {show: false},
    axisTick: {show: false},
  }],
  series: [{
    type: 'line',
    itemStyle: {normal: {opacity: 0}},
    lineStyle: {normal: {color: '#0aaec6'}},
    data: []
  }]
};

export {
  attackType, terminalSecurity, mailCheck,
  illegalBehavior, cumulative
}
