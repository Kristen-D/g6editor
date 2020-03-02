// title.text, series[0].data, series[1].data
// xAxis[0]
const dataPick = {
  title: {
    text: '',
    bottom: '6%',
    left: '7%',
    textStyle: { //主标题
      color: '#3E4956',
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
  tooltip: {},
  grid: [{
    top: '10%',
    bottom: '10%',
    left: '30%',
    right: '2%',
    containLabel: true
  }],
  xAxis: [{
    type: 'category',
    data: [],
    splitLine: { //坐标轴在 grid 区域中的分隔线。
      show: false,
      lineStyle: {
        color: '#E1E3E4'
      }
    },
    axisLine: { //坐标轴轴线相关设置。数学上的x轴
      show: true,
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
    show: false,
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
  },],
  series: [{
    type: 'bar',
    color: ['#0065BA'],
    stack: 'chart',
    z: 3,
    barWidth: '25%',
    itemStyle: {
      normal: {
        color: '#0065ba'
      }
    },
    label: {
      normal: {
        position: 'right',
        show: false
      }
    },
    data: []
  },
    {
      type: 'pie',
      color: ['#9FE060', '#8F69C7', '#0065BA', '#028BFF', '#12CBF6', '#50E3C2'],
      radius: ['42%', '62%'],
      center: ['15%', '40%'],
      itemStyle: { //图形样式
        normal: {
          borderWidth: 2,
          borderColor: '#ffffff',
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
};
// title.text, yAxis[0].data, series[0].data, series[1].data
const enterSituation = {
  title: {
    text: '',
    bottom: '6%',
    left: '7%',
    textStyle: { //主标题
      color: '#3E4956',
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
  tooltip: {},
  grid: [{
    top: '10%',
    bottom: '10%',
    left: '30%',
    right: '2%',
    containLabel: true
  }],
  yAxis: [{
    type: 'category',
    data: [],
    splitLine: { //坐标轴在 grid 区域中的分隔线。
      show: false,
      lineStyle: {
        color: '#E1E3E4'
      }
    },
    axisLine: { //坐标轴轴线相关设置。数学上的x轴
      show: true,
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
  xAxis: [{
    type: 'value',
    show: false,
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
  },],
  series: [{
    type: 'bar',
    color: ['#0065BA'],
    stack: 'chart',
    z: 3,
    barWidth: '25%',
    itemStyle: {
      normal: {
        color: '#0065ba'
      }
    },
    label: {
      normal: {
        position: 'right',
        show: false
      }
    },
    data: []
  },
    {
      type: 'pie',
      color: ['#9FE060', '#8F69C7', '#0065BA', '#028BFF', '#12CBF6', '#50E3C2'],
      radius: ['42%', '62%'],
      center: ['15%', '40%'],
      itemStyle: { //图形样式
        normal: {
          borderWidth: 2,
          borderColor: '#ffffff',
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
};
// title.text, series[0].data
const assetData = {
  title: {
    text: '',
    subtext: '资产总量',
    textStyle: { //主标题
      color: '#3E4956',
      fontWeight: 'bold',
      fontSize: 35,
      fontFamily: 'Haettenschweiler',
    },
    subtextStyle: { //副标题
      color: '#3E4956',
      fontSize: 12,
    },
    itemGap: 12, //主副标题之间的距离
    top: '36%',
    left: '1%',
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c}"
  },
  calculable: true,
  color: ['#2ecc71', '#1abc9c', '#309562', '#309562', '#3bbf7c'],
  series: [{
    name: '资产接入',
    type: 'treemap',
    width: '88%',
    height: '70%',
    left: '10%',
    //right:'30%',
    roam: false, //是否开启拖拽漫游（移动和缩放）
    nodeClick: false, //点击节点后的行为,false无反应
    label: {
      normal: {
        textStyle: {
          fontWeight: 'bold',
          fontSize: '14',
        }
      }
    },
    itemStyle: {
      normal: {
        label: {
          show: true,
          formatter: "{b}"
        },
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    },
    data: []
  }]
};

// timeline.data, options[0].xAxis[0].data,
//
const dataFlow = {
  timeline: {
    data: [],
    axisType: 'category',
    show: true,
    autoPlay: false,
    controlStyle: { //『控制按钮』的样式。
      position: 'left',
      showPrevBtn: false, //显示【后退按钮】
      showNextBtn: false, //显示【前进按钮】
      itemGap: 28, //[控制按钮]的间隔
    }
  },
  options: [{
    grid: {
      left: '5%',
      right: '6%',
      top: '4%',
      bottom: '32%',
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      name: '时间',
      data: [],
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '单位：次',
    },
    series: [{
      type: 'line',
      label: {
        normal: {
          show: true,
          position: 'top',
        }
      },
      itemStyle: {
        normal: {
          color: '#2C7BE0'
        }
      },
      lineStyle: {
        normal: {
          color: '#3583E2',
        }
      },
      data: []
    }]},{
      series: [{
        'data': []
      }]},{
      series: [{
        'data': []
      }]},{
      series: [{
        'data': []
      }]},{
      series: [{
        'data': []
      }]},{
      series: [{
        'data': []
      }]},{
      series: [{
        'data': []
      }]
    },
  ]
};

export {
  dataPick, enterSituation, assetData,
  dataFlow
}