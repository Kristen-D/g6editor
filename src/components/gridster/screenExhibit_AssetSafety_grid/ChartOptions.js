// series[0].data
const assetProportion = {
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c}"
  },
  calculable: true,
  color: ['#2ecc71', '#1abc9c', '#309562', '#309562', '#3bbf7c'],
  series: [{
    name: '资产占比',
    type: 'treemap',
    width: '100%',
    height: '90%',
    roam: false, //是否开启拖拽漫游（移动和缩放）
    nodeClick: false, //点击节点后的行为,false无反应
    breadcrumb: { //关闭面包屑路径
      show: false
    },
    silent: false, //关闭鼠标事件
    label: {
      normal: {
        textStyle: {
          // fontWeight: 'bold',
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
        //   borderWidth: 0.51,
        borderColor: '#0b1724',
        gapWidth: 5
      },
    },
    data: []
  }]
};
// legend.data, xAxis.data, series
const threatedTrend = {
  color: ['#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#546e7a'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  legend: {
    left: 5,
    //top: 5,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      //fontSize: 14,
      color: '#dededf'
    },
    data: []
  },
  grid: {
    left: 5,
    top: 60,
    bottom: 0,
    right: 5,
    //   height:200,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false,
      lineStyle: {
        type: 'solid',
        color: '#dededf'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      margin: 20,
      textStyle: {
        fontSize: 14,
        color: '#dededf'
      }
    },
    data: []
  },
  yAxis: {
    splitNumber: 5,
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        type: 'solid',
      }
    },
    axisLabel: {
      show: true,
      rotate: 0,
      margin: 20,
      textStyle: {
        fontSize: 14,
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
  series: []
};
// legend.data, xAxis.data, series
const safetyTrend = {
  //backgroundColor:'#091323',
  color: ['#38b4ee', '#303f9f', '#4caf50'],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: '0%',
    left: '0',
    padding: [10, 20, 0, 20],
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    data: [],
    textStyle: {
      color: '#dededf'
    }
  },
  grid: {
    left: '0',
    right: '3%',
    bottom: '3%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#dededf'
      }
    },
    splitLine: { //网格线
      show: true,
      lineStyle: {
        color: ['#23303f'],
        type: 'solid'
      }
    },
    data: []
  },
  yAxis: {
    interval: 20,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      //    onZero:false
    },
    axisLabel: {
      textStyle: {
        color: '#dededf'
      }
    },
    splitLine: { //网格线
      show: true,
      lineStyle: {
        color: ['#23303f'],
        type: 'solid'
      }
    }
  },
  series: []
};
// legend.data, xAxis.data, series
const activeAttack = {
  //backgroundColor:'#091323',
  color: ['#ffdd3f', '#ff8400', '#ff2a00',],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: '0%',
    left: '0',
    padding: [10, 20, 0, 20],
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    data: [],
    textStyle: {
      color: '#dededf'
    }
  },
  grid: {
    left: '0',
    right: '3%',
    bottom: '3%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#dededf'
      }
    },
    splitLine: { //网格线
      show: true,
      lineStyle: {
        color: ['#23303f'],
        type: 'solid'
      }
    },
    data: []
  },
  yAxis: {
    boundaryGap: false,
    splitNumber: 5,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      //    onZero:false
    },
    axisLabel: {
      margin: 20,
      textStyle: {
        color: '#dededf'
      }
    },
    splitLine: { //网格线
      show: true,
      lineStyle: {
        color: ['#23303f'],
        type: 'solid'
      }
    }
  },
  series: []
};
// legend.data, xAxis.data, series
const keyAssetThreatedTop = {
  color: ['#f53c61', '#2196f3', '#50fca8'],
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  legend: {
    left: 5,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: '#dededf'
    },
    data: []
  },
  grid: {
    left: 5,
    top: 60,
    bottom: 0,
    right: 5,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    //  position: 'top',
    splitLine: {
      show: false,
      lineStyle: {
        type: 'solid',
        color: '#dededf'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      margin: 20,
      textStyle: {
        fontSize: 14,
        color: '#dededf'
      }
    },
    data: []
  },
  yAxis: {
    splitNumber: 5,
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        type: 'solid',
      }
    },
    axisLabel: {
      show: true,
      rotate: 0,
      margin: 15,
      textStyle: {
        fontSize: 14,
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
  series: []
};
// legend.data, xAxis.data, series
const assetThreatedTop = {
  color: ['#f53c61', '#2196f3', '#50fca8'],
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  legend: {
    left: 5,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: '#dededf'
    },
    data: []
  },
  grid: {
    left: 5,
    top: 60,
    bottom: 0,
    right: 5,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    //  position: 'top',
    splitLine: {
      show: false,
      lineStyle: {
        type: 'solid',
        color: '#dededf'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      margin: 20,
      textStyle: {
        fontSize: 14,
        color: '#dededf'
      }
    },
    data: []
  },
  yAxis: {
    splitNumber: 5,
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        type: 'solid',
      }
    },
    axisLabel: {
      show: true,
      rotate: 0,
      margin: 15,
      textStyle: {
        fontSize: 14,
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
  series: []
};
export {
  assetProportion,
  threatedTrend,
  safetyTrend,
  activeAttack,
  keyAssetThreatedTop,
  assetThreatedTop
}