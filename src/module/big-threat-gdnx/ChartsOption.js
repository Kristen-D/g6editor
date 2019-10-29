

//受攻击top
const assetCategory = {
  tooltip: { trigger: 'item' },
  grid: {
    top: '10%',
    left: '6%',
    right: '0%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisLine: { show: false },
    axisLabel: {
      interval: '0',
      textStyle: {
        color: '#9fa6c6',
      },
    },
    axisTick: { show: false },
  }],
  yAxis: [{
    type: 'value',
    min: 0,
    max: 80,
    splitNumber: 5,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#27377f'
      }
    },
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
  }],
  series: [
    {
      type: 'bar',
      barGap: "10%",//柱间距离，
      barWidth: '26%',
      itemStyle: {
        normal: {
          color: '#2196f3'
        }
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#9fa6c6',
          },
        }
      },
      data: [72, 70, 64, 51, 40,],
    }
  ]
}


//僵木蠕攻击源top
var datav = [28, 37, 39];
var maxdata = [50, 50, 50];
const countryCategory = {
  tooltip: {
    trigger: 'item',
    textStyle: {
      fontSize: 12,
    },
    formatter: "攻击源:{b} <br/>攻击数量：{c}"
  },
  grid: {
    top: '10%',
    left: '8%',
    right: '0%',
    bottom: '30',
    containLabel: false
  },
  xAxis: [{
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false, },
  }],
  yAxis: [
    {
      type: 'category',
      data: ['德国 196.32.20.11', '英国 192.32.20.12', '美国 192.32.20.13'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#9fa6c6',
        fontSize: '14',
        formatter: function (val) {
          return (val.length > 15 ? (val.slice(0, 14) + "...") : val);
        },
        inside: true,
        padding: [-50, 0, 10, -5]
      }
    },
    {
      type: 'category', //辅助x轴
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitArea: { show: false },
      splitLine: { show: false },
      data: ['50', '50', '50']
    }
  ],
  series: [
    {
      name: '辅助',
      type: 'bar',
      barWidth: '20%',
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: 'rgba(255, 255, 255,0.1)',
        },
        emphasis: {
          color: 'rgba(255, 255, 255,0.1)',
        }
      },
      label: {
        normal: {
          show: true,
          color: '#fff',
          fontSize: '14',
          position: 'insideRight',
          offset: [-5, -25],
          formatter: function (d) {
            return datav[d.dataIndex];
          }
        }
      },
      tooltip: { show: false },
      data: maxdata //背景值

    }, {
      name: '访问数',
      type: 'bar',
      color: ['#2281d9'],
      barWidth: '20%',
      data: datav,
      z: 10,
    }]
}




//趋势
var lineData1 = [];
var lineData2 = [];
var lineData3 = [];
var lineData4 = [];
var lineData5 = [];

for (var i = 0; i < 8; i++) {
  var a = Math.random() * 10;
  var b = Math.random() * 17;
  var c = Math.random() * 20;
  var d = Math.random() * 15;
  var sum = a + b + c + d;
  lineData1.push(a.toFixed(0));
  lineData2.push(b.toFixed(0));
  lineData3.push(c.toFixed(0));
  lineData4.push(d.toFixed(0));
  lineData5.push(sum.toFixed(0));
}

const lineCategory = {
  // color: ['#6c87ed', '#12cbf6', '#0652dd', '#2ecc71','#ffdd3f'],
  color: ['rgba(108,135,237,0.8)', 'rgba(18,203,246,0.8)', 'rgba(6,82,221,0.8)', 'rgba(46,204,113,0.8)', '#ffdd3f'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    bottom: '7%',
    left: 'center',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: '#9fa6c6',
      fontSize: 14,
    },
    data: [
      { name: '总数', icon: 'rec' },
      { name: '僵尸网络', icon: 'rec' },
      { name: '木马', icon: 'rec' },
      { name: '蠕虫', icon: 'rec' },
      { name: '病毒', icon: 'rec' },
    ]
  },
  grid: {
    top: '10%',
    left: '3%',
    right: '0%',
    bottom: '20%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        color: '#9fa6c6',
      },
    },
    axisTick: { show: false, },
    data: ['08.01', '08.02', '08.03', '08.04', '08.05', '08.06', '08.07']
  }],
  yAxis: [{
    type: 'value',
    splitNumber: 5,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#27377f'
      }
    },
    axisLine: { show: false, },
    axisLabel: {
      textStyle: {
        color: '#9fa6c6'
      },
    },
    axisTick: { show: false, },
  }],
  series: [
    {
      name: '僵尸网络',
      type: 'line',
      stack: '总量',
      symbol: 'none',
      areaStyle: {
        normal: {
          // color: "#6c87ed",
          color: 'rgba(108,135,237,0.8)'
          // opacity: 1,
        }
      },
      data: lineData1
    },
    {
      name: '木马',
      type: 'line',
      stack: '总量',
      smooth: false,
      symbol: 'none',
      symbolSize: 6,
      areaStyle: {
        normal: {
          // color: "#12cbf6",
          color: 'rgba(18,203,246,0.8)'
          // opacity: 1,
        }
      },
      data: lineData2
    },
    {
      name: '蠕虫',
      type: 'line',
      stack: '总量',
      smooth: false,
      symbol: 'none',
      symbolSize: 6,
      areaStyle: {
        normal: {
          // color: "#0652dd",
          color: 'rgba(6,82,221,0.8)'
          // opacity: 1,
        }
      },
      data: lineData3
    },
    {
      name: '病毒',
      type: 'line',
      stack: '总量',
      smooth: false,
      symbol: 'none',
      symbolSize: 6,
      areaStyle: {
        normal: {
          // color: "#2ecc71",
          color: 'rgba(46,204,113,0.8)'
          // opacity: 1,
        }
      },
      data: lineData4
    },
    {
      name: '总数',
      type: 'line',
      stack: '总量',
      smooth: false, //是否平滑曲线显示
      symbol: 'none', // 线条无圆点
      symbolSize: 6,
      data: lineData5

    },
  ]
}




// 颜色
var darkBlue = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: 'rgba(255, 255, 255, 0.8)' // 0% 处的颜色
  },
  {
    offset: 0.5,
    color: 'rgba(255, 255, 255, 0.5)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: 'rgba(0, 192, 255, 0.1)' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
}
var lightBlue = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: 'rgba(255, 255, 255, 1)' // 0% 处的颜色
  },
  {
    offset: 0.5,
    color: 'rgba(255, 255, 255, 0.8)' // 0% 处的颜色
  },
  {
    offset: 1,
    color: 'rgba(0, 192, 255, 0.7)' // 100% 处的颜色
  }
  ],
  globalCoord: false // 缺省为 false
}

//serice中的数据
var data = [];
function randomData() {
  var value = Math.random() * 50;
  return {
    value: Math.round(value)
  }
}
for (var i = 0; i < 5; i++) {
  data.unshift(randomData());
}
// 指定图表的配置项和数据
const typeCategory = {
  color: ['#ff2a00', '#ffdd3f', '#ff8400'],
  backgroundColor: "#0c2170",
  title: [{
    left: 10,
    top: "4%",
    text: [],
    textStyle: {
      rich: {
        c: {
          color: '#2196f3',
          fontSize: 20,
          fontWeight: 'bold',
          width: 4,
          height: 15,
          backgroundColor: '#2196f3',

        },
        d: {
          color: '#fff',
          fontSize: 15,
          padding: [0, 0, 0, 10],
        },
      }
    },
  },
  {
    left: '6%',
    bottom: '4%',
    text: ['{a|威胁总数}' + '{b|38}\n' + '{c|涉及资产}' + '{d|20}'],
    textStyle: {
      rich: {
        a: {
          color: '#eff0f5',
          fontSize: 14,
          width: 70,
          lineHeight: 35
        },
        b: {
          color: '#fff',
          fontSize: 20,
        },
        c: {
          color: '#eff0f5',
          fontSize: 14,
          fontWeight: 500,
          width: 70,
        },
        d: {
          color: '#fff',
          fontSize: 20,
          fontWeight: 500,
        },
      }
    },
  },
  ],
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  xAxis: {
    type: 'category',
    // interval:0,
    boundaryGap: false,
    min: -1,
    max: 5,

    axisLine: {
      show: false,
      lineStyle: {
        color: '#4bbbf8',
        shadowColor: 'rgba(75, 211, 255, 0.5)',
        shadowBlur: 5
      }
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#9fa6c6',
      fontSize: 14,
      interval: 0,
    },
    splitLine: {
      show: false
    },
    // data: ['Agobot', 'Phatbot', 'GT-Bots', 'XtremBot', 'SDBot'],
    data: []
  },
  yAxis: [{
    min: 0,
    max: 50,

    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#9fa6c6',
      fontSize: 14,
    },
    splitLine: {
      lineStyle: {
        color: "#27377f"
      }
    },
  }],
  grid: {
    top: '18%',
    bottom: '3%',
    left: '30%',
    right: 40,
    containLabel: true
  },
  series: [
    {
      name: '风险等级',
      type: 'pie',
      radius: ['26%', '44%'],
      center: ['15%', '45%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false
        }
      },
      lableLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: 5,
        name: '高'
      },
      {
        value: 10,
        name: '中'
      },
      {
        value: 15,
        name: '低'
      },
      ]
    },
    {
      name: '数量',
      type: 'pictorialBar',
      barCategoryGap: '-60%',
      symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 14
      },
      itemStyle: {
        color: function (params) {
          console.log(params)
          return params.dataIndex % 2 ? lightBlue : darkBlue;
        }
      },
      data: data
    }
  ],

};

export {
  typeCategory,
  assetCategory,
  countryCategory,
  lineCategory,
  lightBlue,
  darkBlue
}
