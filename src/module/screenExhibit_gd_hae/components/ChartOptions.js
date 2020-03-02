const highAlarmTrend = {
  color: ["#99ff14", '#ff2a00'],
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  legend: {
    right: '10%',
    top: 0,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {color: '#dededf', fontSize: 16},
    data: [{name: '已处置', icon: 'circle'},
      {name: '未处置', icon: 'circle'}]
  },
  grid: {
    left: '0',
    right: '4%',
    bottom: '0%',
    top: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false,
      lineStyle: {type: 'solid', color: '#dededf'}
    },
    axisTick: {show: false},
    axisLabel: {
      textStyle: {color: '#dededf'}
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
      name: '已处置',
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

const middleAlarmTrend = {
  color: ["#99ff14", '#ff8400'],
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  legend: {
    right: '10%',
    top: 0,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {color: '#dededf', fontSize: 16},
    data: [{name: '已处置', icon: 'circle'},
      {name: '未处置', icon: 'circle'}]
  },
  grid: {
    left: '0',
    right: '4%',
    bottom: '0%',
    top: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false,
      lineStyle: {type: 'solid', color: '#dededf'}
    },
    axisTick: {show: false},
    axisLabel: {
      textStyle: {color: '#dededf'}
    },
    data: ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00']
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        type: 'solid',
      }
    },
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
      name: '已处置',
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
  geo: {
    map: 'world',
    label: {
      emphasis: {
        show: false
      }
    },
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
    label: {
      emphasis: {
        show: true,
        position: 'right',
        formatter: '{b}'
      }
    },
    symbolSize: 10,
    showEffectOn: 'render',
    itemStyle: {
      normal: {
        color: '#46bee9'
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
  title: {
    text: '处置情况',
    top: '20%',
    left: '37%',
    textStyle: {color: '#fff', fontSize: '20'}
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {type: 'shadow'}
  },
  grid: {
    left: 20,
    right: 30,
    top: 240,
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
      name: '危险程度',
      type: 'pie',
      radius: ['26%', '40%'],
      center: ['50%', '22%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: '{b}\n{c}({d}%)',
            textStyle: {fontSize: '16', color: '#fff'}
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 20,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          },
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      data: []
    },
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
    right: '4%',
    bottom: '0%',
    top: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {show: false},
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
    right: '4%',
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
      textStyle:{color:'#dededf'}
    },
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
      textStyle: {color: '#dededf',}
    },
    axisTick: {show: false},
    splitLine: {
      show:true,
      lineStyle: {type: 'solid',color: '#363e4c'}
    }
  },
  series: [
    {
      name: '受威胁趋势',
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
