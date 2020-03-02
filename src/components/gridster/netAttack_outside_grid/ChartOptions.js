// series[0].data
const lpPie = {
  color: ["#bdc3c7", "#95a5a6", "#6d7e88", "#ffffff", "#2e363d", "#7d7f81",],
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
    {
      name: '攻击来源',
      type: 'pie',
      radius: ['40%', '55%'],
      center: ['50%', '50%'],
      label: {
        normal: {
          textStyle: {fontSize: 14, color: '#fff',},
        }
      },
      labelLine: {//标签的视觉引导线样式
        normal: {
          length: 10,
          length2: 20,
          lineStyle: {color: '#fff'}
        }
      },
      data: []
    }
  ]
};

// yAxis[0].data series[0].data
const threatTop = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {fontSize: 13,}
  },
  grid: {
    left: '30%',
    top: 10,
    right: 20,
    bottom: 20,
  },
  calculable: true,
  xAxis: [{
    type: 'value',
    splitNumber: 5,
    show: false,
    axisLine: {show: true, lineStyle: {color: 'rgba(53,66,94,0.4)'}},
    axisLabel: {
      show: true,
      textStyle: {color: "#9ea3b4", fontSize: 14,},
    },
    splitLine: {
      show: true,
      lineStyle: {color: 'rgba(53,66,94,0.4)',}
    }
  }],
  yAxis: [
    {
      type: 'category',
      inverse: true,
      data: [],
      axisLine: {show: true, lineStyle: {color: 'rgba(53,66,94,0.4)'}},
      splitNumber: 5,
      axisLabel: {
        textStyle: {color: "#9ea3b4", fontSize: 14,},
      },
    }
  ],
  series: [
    {
      name: '数量',
      type: 'bar',
      barWidth: 12,//柱图宽度
      data: [],
      itemStyle: {
        normal: {
          barBorderWidth: 0,
          barBorderColor: '#82cbfc',
          barBorderRadius: [1, 1, 1, 1],
          color: function (params) {
            // build a color map as your need.
            let colorList = [
              '#868889', '#868889', '#868889', '#868889', '#fff'
            ];
            return colorList[params.dataIndex];
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}'
          }
        }
      },
    }
  ]
};
// series[0].data
const chinaMap = {
  //  backgroundColor: '#404a59',
  tooltip: {
    trigger: 'item',
  },
  legend: {
    show: true,
    orient: 'vertical',
    top: 'bottom',
    left: 'right',
    data: ['地点', '线路'],
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'world',
    top: '15%',
    label: {
      emphasis: {
        show: false
      }
    },
    roam: true,
    silent: true,
    itemStyle: {
      normal: {
        areaColor: '#4a86e8',
        borderColor: '#fff'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    },
  },
  series: [{
    name: '攻击路径',
    type: 'lines',
    tooltip: {
      trigger: 'item',
      formatter: function (params, ticket, callback) {
        let str = "攻击来源：";
        str += params.data.fromName;
        str += ",被攻击地点：";
        str += params.data.toName;
        str += ",攻击数量：";
        str += params.data.total;
        return str;
      }
    },
    coordinateSystem: 'geo',
    zlevel: 2,
    large: true,
    effect: {
      show: true,
      constantSpeed: 30,
      symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      symbolSize: 8,
      trailLength: 0,
    },
    lineStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'yellow'
        }, {
          offset: 1,
          color: 'red'
        }], false),
        width: 3,
        opacity: 0.6,
        curveness: 0.2
      }
    },
    data: []
  }]
};
export {
  lpPie, threatTop, chinaMap
}