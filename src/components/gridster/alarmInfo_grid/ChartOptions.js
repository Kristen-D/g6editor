// radar.indicator, series[0].data[0].value
const alarmCategory = {
  tooltip: {},
  grid: {
    left: '25%',
    right: '25%',
    bottom: '2%',
    // containLabel: true
  },
  radar: {
    name: {
      textStyle: {
        color: '#fff',
        backgroundColor: '#999',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    indicator: []
  },
  series: [{
    name: '告警类别',
    type: 'radar',
    data: [{
      value: [],
      label: {normal: {show: true, color: 'black'}}
    }]
  }]
};
// series[0].data, .links
const alarmRelation = {
  // tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [{
    type: 'graph',
    layout: 'force',
    symbolSize: 40,
    roam: true,
    left: '-70%',
    label: {
      normal: {
        show: true,
        color: '#ccc',
        fontSize: 14,
        align: 'center',
        offset: [0, 30],
        rich: {
          a: {
            color: 'black',
            fontSize: 14,
            align: 'center',
            padding: [20, 10]
          }
        }
      }
    },
    force: {
      initLayout: 'circular',
      repulsion: 500,
      edgeLength: 70
    },
    data: [],
    links: [],
    itemStyle: {
      normal: {
        color: 'white',
        borderColor: '#ccc'
      }
    }
  },
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 40,
      roam: true,
      left: '-10%',
      label: {
        normal: {
          show: true,
          color: '#ccc',
          fontSize: 14,
          align: 'center',
          offset: [0, 30],
          rich: {
            a: {
              color: 'black',
              fontSize: 14,
              align: 'center',
              padding: [20, 10]
            }
          }
        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 500,
        edgeLength: 70
      },
      data: [],
      links: [],
      itemStyle: {
        normal: {
          color: 'white',
          borderColor: '#ccc'
        }
      }
    },
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 40,
      roam: true,
      left: '60%',
      label: {
        normal: {
          show: true,
          color: '#ccc',
          fontSize: 14,
          align: 'center',
          offset: [0, 27],
          rich: {
            a: {
              color: 'black',
              fontSize: 14,
              align: 'center',
              padding: [20, 10]
            }
          }
        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 500,
        edgeLength: 70
      },
      data: [],
      links: [],
      itemStyle: {
        normal: {
          color: 'white',
          borderColor: '#ccc'
        }
      }
    }
  ]
};

const alarmTrend = {
  color: ['#eb2332', '#f29d39', '#fffd54'],
  legend: {
    top: 0,
    right: 20,
    itemGap: 10,
    itemWidth: 15,
    itemHeight: 15,
    data: [
      {name: '高危', icon: 'rect'},
      {name: '中危', icon: 'rect'},
      {name: '低危', icon: 'rect'}
    ]
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: 10,
    right: 10,
    bottom: 10,
    containLabel: true
  },
  xAxis: {
    boundaryGap: false,
    axisTick: {show: false},
    axisLine: {show: false},
    data: ['周一','周二','周三','周四','周五','周六','周日']
  },
  yAxis: {
    type: 'value',
    show: true,
    splitLine: {lineStyle: {color: '#dededf'}},
    axisLine: {show: false},
    axisTick: {show: false},
  },
  series: [{
    name: '高危',
    type: 'line',
    stack: '总量',
    showSymbol: false,
    data: [120, 132, 101, 134, 90, 230, 210],
    smooth: true,
    areaStyle: {normal: {color: '#eb2332'}}
  }, {
    name: '中危',
    type: 'line',
    stack: '总量',
    showSymbol: false,
    smooth: true,
    data: [150, 232, 201, 154, 190, 330, 410],
    areaStyle: {normal: {color: '#f29d39'}}
  }, {
    name: '低危',
    type: 'line',
    stack: '总量',
    showSymbol: false,
    smooth: true,
    data: [320, 332, 301, 334, 390, 330, 320],
    areaStyle: {normal: {color: '#fffd54'}}
  }]
};

const alarmProportion = {
  color: ['#5cc73b', '#d7d7d7', '#a1a1a1'],
  grid: {
    left: 10,
    right: 10,
    bottom: 10,
    containLabel: true
  },
  series: [{
    name: '占比',
    type: 'pie',
    radius: ['50%', '70%'],
    center: ['50%', '60%'],
    // roseType: 'radius',
    avoidLabelOverlap: false,
    itemStyle: {
      normal: {
        label: {
          show: true,
          formatter: '{b}: \n{d}%',
          textStyle: {fontSize: '12', color: '#a1a1a1'}
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 20,
          lineStyle: {
            color: '#a1a1a1'
          }
        },
      },
    },
    data: [{
      name: '已完成', value: 50
    }, {
      name: '待处理', value: 10
    }, {
      name: '待审批', value: 10
    }]
  }]
};

export {
  alarmCategory,
  alarmRelation,
  alarmTrend,
  alarmProportion
}