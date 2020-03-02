const highAlarmTrend = {
  color: ["#ff2a00"],
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  grid: {
    left: '0',
    right: '40px',
    bottom: '0%',
    top: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    show: true,
    name: '(时)',
    nameLocation: 'end',
    nameTextStyle: {color: '#dededf',lineHeight: 40},
    splitLine: {
      show: false,
      lineStyle: {type: 'solid', color: '#dededf'}
    },
    axisTick: {show: false},
    axisLabel: {
      textStyle: {color: '#dededf'},
    },
    data: []
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid',
      }
    },
    minInterval: 1,
    axisLabel: {
      show: true,
      rotate: 0,
      //   margin:120,
      textStyle: {
        color: '#dededf',
        //    align:'left'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'solid',
        color: '#363e4c'
      }
    }
  },
  series: [
    {
      type: 'bar',
      stack: '总数',
      barWidth: '25%',
      data: []
    }]
};

const middleAlarmTrend = {
  color: ["#ff8400"],
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  grid: {
    left: '0',
    right: '40px',
    bottom: '0%',
    top: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false,
      lineStyle: {type: 'solid', color: '#dededf'}
    },
    name: '(时)',
    nameLocation: 'end',
    nameTextStyle: { color: '#dededf',verticalAlign: 'bottom'},
    axisTick: {show: false},
    axisLabel: {
      textStyle: {color: '#dededf'},

    },
    data: []
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid',
      }
    },
    minInterval: 1,
    axisLabel: {
      show: true,
      rotate: 0,
      textStyle: {
        color: '#dededf'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'solid',
        color: '#363e4c'
      }
    }
  },
  series: [
    {
      type: 'bar',
      stack: '总数',
      barWidth: '25%',
      data: []
    },
    {
      name: '未处置',
      type: 'bar',
      stack: '总数',
      barWidth: '25%',
      data: []
    }]
};

const worldAttackMap = {
  tooltip: {
trigger: 'item',
},
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    containLabel: true
  },
  geo: {
    map: 'world',
    label: {
      emphasis: {
        show: false
      }
    },
    zoom: 1.1,
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#e9ebf2',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  tooltip: {},
  series: [{
    name: '地点',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 2,
    rippleEffect: {
      brushType: 'stroke',
      period: 7,
      scale: 5
    },
    tooltip: {
    trigger: 'item',
    formatter: function (params, ticket, callback) {
      // console.log(params);
      let str = "攻击来源:";
      if (params.name !== '广州市') {
        str += params.data.fromName;
        str += " ,被攻击地点:";
        str += params.data.toName;
        str += " ,攻击数量:";
        str += params.data.total;
      } else {
        str = "被攻击地点:";
        str += params.name;
      }
      return str;
    }
    },
    symbolSize: 10,
    showEffectOn: 'render',
    itemStyle: {
      normal: {
        color: '#46bee9'
      }
    },
    data: []
  }, {
    name: '线路',
    type: 'lines',
    coordinateSystem: 'geo',
    zlevel: 3,
    large: true,
    effect: {
      show: true,
      constantSpeed: 30,
      symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      symbolSize: 10,
      trailLength: 0.3,
    },
    lineStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'blue'
        }, {
          offset: 1,
          color: '#25d6f5'
        }], false),
        width: 3,
        opacity: 0.6,
        curveness: 0.1
      }
    },
    data: [],
    tooltip: {
    trigger: 'item',
    formatter: function (params, ticket, callback) {
      // console.log(params);
      let str = "攻击来源:";
      if (params.name !== '广州市') {
        str += params.data.fromName;
        str += " ,被攻击地点:";
        str += params.data.toName;
        str += " ,攻击数量:";
        str += params.data.total;
      } else {
        str = "被攻击地点:";
        str += params.name;
      }
      return str;
    }
    },
  }]
};
//series[0].data
const attackPie = {
  color: ['#dededf', "#99ff14"],
  tooltip: {
    trigger: 'axis',
    axisPointer: {type: 'shadow'}
  },
  grid: {
    left: 20,
    right: 30,
    top: 20,
    bottom: 40,
    containLabel: true
  },
  yAxis: {
    type: 'category',
    data: [],
    axisLine: {show: false},
    axisTick: {show: false},
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: '16',
        color: '#dededf'
      }
    }
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        type: 'solid',
        color: '#23303f'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        fontSize: '16',
        color: '#dededf'
      }
    },
    splitNumber: 2,
  },
  series: [
    {
      name: '攻击数',
      type: 'bar',
      barWidth: 10,
      barGap: 10,
      label: {
        normal: {
          show: true,
          position: 'right',
          color: 'white',
          fontSize: 16
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: '#e02b09' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#e2e2e3' // 100% 处的颜色
          }], false)
        }
      },
      data: []
    }]
};
// xAxis.data,  series[0].data
const attackTrend = {
  //	backgroundColor:'#091323',
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '0',
    right: '40px',
    bottom: '0%',
    top: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {show: false},
    name: '(日)',
    nameLocation: 'end',
    nameTextStyle: { color: '#dededf',verticalAlign: 'bottom'},
    axisLabel: {
      textStyle: {
        color: '#dededf'
      },
      formatter: function (value) {
        let pre = value.substring(value.length - 4, value.length - 2);
        let sub = value.substring(value.length - 2, value.length);
        return pre + '-' + sub;
      }
    },
    data: []
  },
  yAxis: {
    axisTick: {show: false},
    axisLine: {show: false,},
    axisLabel: {
      textStyle: {
        color: '#dededf'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#23303f',
        type: 'solid'
      }
    }
  },
  series: [{
    name: '攻击趋势',
    type: 'line',
    smooth: true, //是否平滑曲线显示
    symbolSize: 6,
    lineStyle: {
      normal: {
        color: "#2196f3"
      }
    },
    areaStyle: {
      normal: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: "linear",
          global: false,
          colorStops: [{
            offset: 0,
            color: "rgba(33, 150, 243, 0.3)"
          }, {
            offset: 0.8,
            color: "rgba(33, 150, 243, 0.1)"
          }]
        },
        "shadowColor": "rgba(0, 0, 0, 0.1)",
        "shadowBlur": 10
      }
    },
    itemStyle: {
      normal: {
        color: "#2196f3"
      }
    },
    data: [],
  }]
};

// xAxis.data, series[0].data
const threatedTrend = {
  color: ['#2196f3'],
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  grid: {
    left: '0',
    right: '40px',
    bottom: '0%',
    top:'4%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show:false,
      lineStyle: {type: 'solid',color: '#dededf'}
    },
    axisTick: {show: false},
    axisLabel:{
      textStyle:{color:'#dededf'},
      formatter: function (value) {
        return value.substring(value.length-2)
      }
    },
    name: '(日)',
    nameLocation: 'end',
    nameTextStyle: {color: '#dededf',verticalAlign: 'bottom'},
    data: []
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show:false,
      lineStyle: {type: 'solid',}
    },
    axisLabel: {
      show: true,
      textStyle: {color: '#dededf'}
    },
    axisTick: {show: false},
    splitLine: {
      show:true,
      lineStyle: {type: 'solid',color: '#363e4c'}
    }
  },
  series: [
    {
      type: 'bar',
      stack: '总数',
      barWidth: '35%',
      itemStyle: {
        normal: {
          color:'#1286fd',
          shadowColor: 'rgba(0, 0, 0, 0.8)',
          shadowBlur: 10
        }
      },
      data: [],
    }
  ]
};

// yAxis[0].data, yAxis[1].data,
// series[0].data, series[1].data
// xAxis[0].max
let attackBar = {
  tooltip: {},
  grid: [{
    width: '90%',
    bottom: '0%',
    top: '0%',
    left: 0,
    right: '40px',
    containLabel: true
  }],
  xAxis: [{
    position: 'top',
    type: 'value',
    max: 0,
    splitLine: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: 'white'
      },
      verticalAlign: 'top'
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false
    }
  }],
  yAxis: [{
    type: 'category',
    data: [],
    inverse: true,
    axisLabel: {
      textStyle: {
        color: 'white'
      }
    },
    splitLine: {
      show: false
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    }
  }, {
    axisTick: 'none',
    axisLine: 'none',
    inverse: true,
    axisLabel: {
      textStyle: {
        color: 'white',
        fontSize: '14',
      }
    },
    data: []
  }],
  series: [{
    type: 'bar',
    stack: 'chart',
    z: 3,
    itemStyle: {
      normal: {
        color: '#8D14E0'
      }
    },
    data: []
  },
    {
      type: 'bar',
      stack: 'chart',
      silent: true,
      itemStyle: {
        normal: {
          color: 'gray'
        }
      },
      data: []
    }
  ]
};


export {
  highAlarmTrend,
  middleAlarmTrend,
  worldAttackMap,
  attackTrend,
  threatedTrend,
  attackPie,
  attackBar
}
