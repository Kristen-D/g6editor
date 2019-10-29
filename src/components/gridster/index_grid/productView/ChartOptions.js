const attackMonthLine = {
  color: ['#1B55A5', '#00B8FF', '#FDB502', '#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
  legend: {
    top: '18',
    left: '10',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 25,
    textStyle: {
      color: '#3E4956',
      fontSize: 12,
    },
    data: [],
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: 14,
      color: "#fff",
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    top: '20%',
    bottom: '10%',
    containLabel: true,
  },
  calculable: true,
  xAxis: [{
    type: "category",
    boundaryGap: true, //坐标轴两边留白策略（类目轴）
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
    data: []
  }],
  yAxis: [{
    type: "value",
    min: 0,
    splitNumber: 4,
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
  series: []
};

const pieAsset = {
  color: ['#1B55A5', '#00B8FF', '#FDB502', '#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
  title: {
    // text:'重要资产占比',
    textStyle: {
      color: '#9ea3b4',
      fontSize: 14,
      fontweight: 100,
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [{
    name: '数量',
    type: 'pie',
    center: ['60%', '60%'],
    radius: ['50%', '65%'],
    label: {
      normal: {
        show: false,
        position: 'center'
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: '12',
        }
      }
    },
    data: []
  }]
};

const pieAssetTop5 = {
  color: ['#1B55A5', '#00B8FF', '#FDB502', '#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
  legend: {
        orient: 'vertical',
        x: 'left',
        top:'10',
        width:'5',
        data:[]
    },
  title: {
    // text:'重要资产占比',
    textStyle: {
      color: '#9ea3b4',
      fontSize: 14,
      fontweight: 100,
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [{
    name: '数量',
    type: 'pie',
    center: ['60%', '60%'],
    radius: ['50%', '65%'],
    labelLine:{
      normal:{
         show:true,
       length:16,
       length2:2,

     }

  },

    label: {
      normal: {

        show: true,
        formatter: '{b}:\n{c}'
        // position: 'center'
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: '12',
        }
      }
    },
    data: [{value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}]
  }]
};

const lineIskeyAsset = {
  tooltip: {
    show: true,
    formatter: "{b} {c}"
  },
  grid: {
    left: 50,
    top: 10,
    bottom: '20',
    right: '0'
  },
  xAxis: [{
    max: 100,
    type: 'value',
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false }
  }],
  yAxis: [{
    type: 'category',
    data: ['重要占比'],
    nameTextStyle: { color: '#b7ce9e', fontSize: '10px' },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisLine: { show: false }
  }],
  graphic: [{
    type: 'text',
    z: -10,
    left: 46,
    top: '60',
    style: {
      fill: '#9ca1b2',
      text: '',
      font: 'bold 12px Microsoft YaHei'
    }
  }],
  series: [{
      name: ' ',
      type: 'bar',
      barWidth: 16,
      silent: true,
      itemStyle: { normal: { color: '#ccc' } },
      barGap: '-100%',
      barCategoryGap: '50%',
      data: [],
    },
    {
      name: ' ',
      type: 'bar',
      barWidth: 16,
      label: {
        normal: {
          show: false,
          position: 'right',
          formatter: '{c}%'
        }
      },
      data: [{
        value: 0,
        itemStyle: { normal: { color: '#f80' } }
      }]
    }
  ]
};

const keyAssetTop5 = {
  color: ['#1B55A5', '#00B8FF', '#FDB502', '#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
  title: {
    // text: "重要资产Top5",
    left: '20',
    textStyle: {
      color: '#9ea3b4',
      fontSize: 14,
      fontweight: 100,
    },
  },
  legend: {
    top: '30',
    left: '20',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 25,
    textStyle: { color: '#9ea3b4', fontSize: 14, },
    data: []
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      textStyle: {
        color: "#fff"
      }
    },
  },
  grid: {
    top: '24%',
    left: '3%',
    right: '10%',
    bottom: '10%',
    containLabel: true, //grid 区域是否包含坐标轴的刻度标签。
  },
  calculable: true,
  xAxis: [{
    type: "category",
    boundaryGap: true, //坐标轴两边留白策略（类目轴）
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

    data: [],
  }],
  yAxis: [{
    type: "value",
    min: 0,
    splitNumber: 4,
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
  series: []
};

export {
  attackMonthLine,
  pieAsset,
  pieAssetTop5,
  lineIskeyAsset,
  keyAssetTop5
}
