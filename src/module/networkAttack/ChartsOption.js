const bar1Category = {
  tooltip: {
    textStyle: {
      fontSize: 12,
    },
    formatter: '攻击类型:{b}<br/>归属类别:{a}<br/>攻击次数:{c}'
  },
  grid: {
    top: '10%',
    left: '2%',
    right: '6%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [{
    type: 'category',
    data: [],
    // ['SQL注入', '命令注入', '漏洞扫描', 'DNS探测', 'FTP服务'],
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
    min: 0,
    // max: 100,
    splitNumber: 5,
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
    type: 'bar',
    stack: 'chart',
    //barGap: "10%",//柱间距离，
    barWidth: '26%',
    itemStyle: {
      normal: {
        color: '#2ecc71'
      }
    },
    label: {
      normal: {
        position: 'right',
        show: false
      }
    },
    data: []
    // [40, 72, 51, 64, 70],
  }]
}

var datav = [28, 37, 39, 23, 34];
var maxdata = [50, 50, 50, 50, 50];
const bar2Category = {
  tooltip: {
    trigger: 'item',
    textStyle: {
      fontSize: 12,
    },
    formatter: "攻击源:{b} <br/>攻击数量：{c}"
  },
  grid: {
    top: '10%',
    left: '3%',
    right: '12%',
    bottom: '10',
    containLabel: false
  },
  xAxis: [{
    type: 'value',
    // position: 'top',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false,
    },
  }],
  yAxis: [{
      type: 'category',
      data: [],
      // ['俄罗斯', '葡萄牙', '印度', '日本', '美国'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#747a82',
        fontSize: '12',
        formatter: function (val) {
          return (val.length > 15 ? (val.slice(0, 14) + "...") : val);
        },
        inside: true,
        padding: [-30, 0, 0, -5]
      }
    },
    {
      type: 'category', //辅助x轴
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      },
      data: ['1', '2', '3', '4', '5'],
    }
  ],
  series: [
    {
    name: '辅助',
    type: 'bar',
    barWidth: 8,
    yAxisIndex: 1,
    itemStyle: {
      normal: {
        color: 'rgba(229, 242, 253,0.9)',
      },
      emphasis: {
        color: 'rgba(229, 242, 253,0.9)',
      }
    },
    label: {
      normal: {
        show: true,
        color: '#747a82',
        fontSize: '12',
        position: 'insideRight',
        offset: [0, -20],
        formatter: function (d) {
          // return datav[d.dataIndex];
        }
      }
    },
    tooltip: {
      show: false
    },
    data: []
    // maxdata //背景值

  },
  {
    name: '访问数',
    type: 'bar',
    color: ['#35a2ff'],
    barWidth: 8,
    data: [],
    // datav,
    z: 10,
  },
]
}



const pieThree = {
  title: [],
//   [
//     {
//     text: '安全设备',
//     top: '10%',
//     left: '10%',
//     itemGap: 20,
//     textStyle: {
//       color: " #3e4956 ",
//       fontSize: 14,
//     },
//   },
//   {
//     text: '\t\t{a|9}\n{b|受攻击}',
//     top: '70%',
//     left: '5%',
//     itemGap: 20,
//     textStyle: {
//       rich: {
//         a: {
//           color: '#3e4956 ',
//           fontSize: 26,
//           fontWeight: 600,
//           fontFamily: "HATTEN"
//         },
//         b: {
//           color: 'rgba(62,73,86,0.6)',
//           fontSize: 12
//         },
//       }
//     },
//   },
//   {
//     text: '\t\t{a|1}\n{b|资产数}',
//     top: '70%',
//     left: '19%',
//     itemGap: 20,
//     textStyle: {
//       rich: {
//         a: {
//           color: '#3e4956 ',
//           fontSize: 26,
//           fontWeight: 600,
//           fontFamily: "HATTEN"
//         },
//         b: {
//           color: 'rgba(62,73,86,0.6)',
//           fontSize: 12
//         },
//       }
//     },
//   },
//   {
//     text: '主机/虚拟机',
//     top: '10%',
//     left: '40%',
//     itemGap: 20,
//     textStyle: {
//       color: " #3e4956 ",
//       fontSize: 14,
//     },
//   },
//   {
//     text: '\t\t{a|9}\n{b|受攻击}',
//     top: '70%',
//     left: '38%',
//     itemGap: 20,
//     textStyle: {
//       rich: {
//         a: {
//           color: '#3e4956 ',
//           fontSize: 26,
//           fontWeight: 600,
//           fontFamily: "HATTEN"
//         },
//         b: {
//           color: 'rgba(62,73,86,0.6)',
//           fontSize: 12
//         },
//       }
//     },
//   },
//   {
//     text: '\t\t{a|1}\n{b|资产数}',
//     top: '70%',
//     left: '52%',
//     itemGap: 20,
//     textStyle: {
//       rich: {
//         a: {
//           color: '#3e4956 ',
//           fontSize: 26,
//           fontWeight: 600,
//           fontFamily: "HATTEN"
//         },
//         b: {
//           color: 'rgba(62,73,86,0.6)',
//           fontSize: 12
//         },
//       }
//     },
//   },
//   {
//     text: 'Web漏洞',
//     top: '10%',
//     left: '75%',
//     itemGap: 20,
//     textStyle: {
//       color: " #3e4956 ",
//       fontSize: 14,
//     },
//   },
//   {
//     text: '\t\t{a|9}\n{b|受攻击}',
//     top: '70%',
//     left: '71%',
//     itemGap: 20,
//     textStyle: {
//       rich: {
//         a: {
//           color: '#3e4956 ',
//           fontSize: 26,
//           fontWeight: 600,
//           fontFamily: "HATTEN"
//         },
//         b: {
//           color: 'rgba(62,73,86,0.6)',
//           fontSize: 12
//         },
//       }
//     },
//   },
//   {
//     text: '\t\t{a|1}\n{b|资产数}',
//     top: '70%',
//     left: '85%',
//     itemGap: 20,
//     textStyle: {
//       rich: {
//         a: {
//           color: '#3e4956 ',
//           fontSize: 26,
//           fontWeight: 600,
//           fontFamily: "HATTEN"
//         },
//         b: {
//           color: 'rgba(62,73,86,0.6)',
//           fontSize: 12
//         },
//       }
//     },
//   },
// ],
  color: ['#f72e00', '#2ecc71', '#007be8'],
  tooltip: {
    textStyle: {
      fontSize: 12,
    },
    formatter: function(params) {
      if(params.color === '#eef1f6' && params.percent === 100) {
        return '资产类型:N/A<br/>受攻击数:N/A';
      }
      if(params.color === '#eef1f6') {
        return '资产类型:'+params.seriesName+'<br/>未受攻击数:'+params.value;
      }else {
        return '资产类型:'+params.seriesName+'<br/>受攻击数:'+params.value;
      }
    }
    // '资产类型:{a}<br/>受攻击数:{c}'
  },
  series: []
//   [
//     {
//     name: '安全设备',
//     type: 'pie',
//     radius: ['28%', '40%'],
//     center: ['17%', '50%'],
//     labelLine: {
//       normal: {
//         show: false
//       }
//     },
//     data: [
//       {
//       value: 28,
//       hoverAnimation: false,
//       label: {
//         normal: {
//           formatter: '{d} %',
//           textStyle: {
//             fontSize: 20,
//             color: "rgba(62,73,86,0.6)",
//             fontWeight: 600,
//             fontFamily: "HATTEN",
//           },
//           position: "center",
//         }
//       },
//     },
//     {
//       value: 72,
//       itemStyle: {
//         normal: {
//           color: '#eef1f6',
//         },
//       },
//       hoverAnimation: false
//     }
//   ]
//   },
//   {
//     name: '主机/虚拟机',
//     type: 'pie',
//     radius: ['28%', '40%'],
//     center: ['50%', '50%'],
//     labelLine: {
//       normal: {
//         show: false
//       }
//     },
//     data: [
//       {
//       value: 28,
//       hoverAnimation: false,
//       label: {
//         normal: {
//           formatter: '{d} %',
//           textStyle: {
//             fontSize: 20,
//             color: "rgba(62,73,86,0.6)",
//             fontWeight: 600,
//             fontFamily: "HATTEN",
//           },
//           position: "center",
//         }
//       },
//     },
//     {
//       value: 72,
//       itemStyle: {
//         normal: {
//           color: "#eef1f6 "
//         },
//       },
//       hoverAnimation: false
//     }
//   ]
//   },
//   {
//     name: 'Web漏洞',
//     type: 'pie',
//     radius: ['28%', '40%'],
//     center: ['83%', '50%'],
//     labelLine: {
//       normal: {
//         show: false
//       }
//     },
//     data: [
//       {
//       value: 28,
//       hoverAnimation: false,
//       label: {
//         normal: {
//           formatter: '{d} %',
//           textStyle: {
//             fontSize: 20,
//             color: "rgba(62,73,86,0.6)",
//             fontWeight: 600,
//             fontFamily: "HATTEN",
//           },
//           position: "center",
//         }
//       },
//     },
//     {
//       value: 72,
//       itemStyle: {
//         normal: {
//           color: '#eef1f6',
//         },
//       },
//       hoverAnimation: false
//     }
//   ]
//   }
// ]
}



const mapbar = {
  color: ['#6c87ed', '#12cbf6', '#3498db', '#2ecc71'],
  tooltip: {
    trigger: 'item',
    textStyle: {
      fontSize: 12,
    },
    position: 'right',
    formatter: "攻击类型：{a} <br/>攻击数量：{c}"
  },
  grid: {
    left: '5%',
    right: '85%',
    top: '5%',
    bottom: '15%',
    containLabel: false
  },
  xAxis: [{
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false,
    },
    data: []
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false,
    },
  }],
  label: {
    normal: {
      show: true,
      color: '#3e4956',
      fontSize: '12',
      position: 'right',
      offset: [0, 10],
      formatter: [
        '{a}',
        // '{b|{c}}'
      ].join('\n'),
      rich: {
        a: {
          color: '#3e4956',
          fontSize: '12',
          lineHeight: 20,
        }
      }
    }
  },
  series: []
  // [
  //   {
  //     name: '漏洞攻击',
  //     type: 'bar',
  //     stack: '安全概况',
  //     data: [20]
  //   },
  //   {
  //     name: '暴力破解',
  //     type: 'bar',
  //     stack: '安全概况',
  //     data: [35]
  //   },
  //   {
  //     name: 'Web攻击',
  //     type: 'bar',
  //     stack: '安全概况',
  //     data: [25]
  //   },
  //   {
  //     name: 'APT事件',
  //     type: 'bar',
  //     stack: '安全概况',
  //     label: {
  //       normal: {
  //         offset: [0, -20],
  //       }
  //     },
  //     data: [25]
  //   },
  // ]
}




var lineData1 = [];
var lineData2 = [];
var lineData3 = [];
var lineData4 = [];

for (var i = 0; i < 8; i++) {
  var a = Math.random() * 10;
  var b = Math.random() * 20;
  var c = Math.random() * 20;
  var sum = a + b + c;
  lineData1.push(a.toFixed(0));
  lineData2.push(b.toFixed(0));
  lineData3.push(c.toFixed(0));
  lineData4.push(sum.toFixed(0));
}

const lineCategory = {
  color: ['#12cbf6', '#3498db', '#2ecc71', '#4d71f7', '#ef4836', '#eddc4e', '#33d9b2', '#7460ee'],
  backgroundColor: '#ffffff',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    bottom: '0',
    left: 'center',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 20,
    textStyle: {
      color: '#3E4956',
      fontSize: 12,
    },
    data: []
    // [
    //   {
    //     name: '漏洞攻击',
    //     icon: 'circle'
    //   },
    //   {
    //     name: '暴力破解',
    //     icon: 'circle'
    //   },
    //   {
    //     name: 'Web攻击',
    //     icon: 'circle'
    //   },
    //   {
    //     name: 'APT事件',
    //     icon: 'circle'
    //   },
    //   {
    //     name: '总数',
    //     icon: 'circle'
    //   }
    // ]
  },
  grid: {
    top: '10%',
    left: '3%',
    right: '5%',
    bottom: '20%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
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
    // ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27']
  }],
  yAxis: [{
    type: 'value',
    // min: 0,
    // max:100,
    splitNumber: 5,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#E1E3E4'
      }
    },
    axisLine: {
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
    axisTick: {
      show: false,
    },
  }],
  series: []
  // [
  //   {
  //     name: '漏洞攻击',
  //     type: 'line',
  //     stack: '总量',
  //     smooth: false,
  //     symbol: 'none',
  //     symbolSize: 6,
  //     itemStyle: {
  //       normal: {
  //         color: "#6c87ed",
  //         borderColor: "#fff"
  //       }
  //     },
  //     areaStyle: {
  //       normal: {
  //         color: "#6c87ed",
  //         opacity: 1,
  //       }
  //     },
  //     data: lineData1
  //   },
  //   {
  //     name: '暴力破解',
  //     type: 'line',
  //     stack: '总量',
  //     smooth: false,
  //     symbol: 'none',
  //     symbolSize: 6,
  //     itemStyle: {
  //       normal: {
  //         color: "#12cbf6",
  //         borderColor: "#fff"
  //       }
  //     },
  //     areaStyle: {
  //       normal: {
  //         color: "#12cbf6",
  //         opacity: 1,
  //       }
  //     },
  //     data: lineData2
  //   },
  //   {
  //     name: 'Web攻击',
  //     type: 'line',
  //     stack: '总量',
  //     smooth: false,
  //     symbol: 'none',
  //     symbolSize: 6,
  //     itemStyle: {
  //       normal: {
  //         color: "#3498db",
  //         borderColor: "#fff"
  //       }
  //     },
  //     areaStyle: {
  //       normal: {
  //         color: "#3498db",
  //         opacity: 1,
  //       }
  //     },
  //     data: lineData3
  //   },
  //   {
  //     name: 'APT事件',
  //     type: 'line',
  //     stack: '总量',
  //     smooth: false,
  //     symbol: 'none',
  //     symbolSize: 6,
  //     itemStyle: {
  //       normal: {
  //         color: "#2ecc71",
  //         borderColor: "#fff"
  //       }
  //     },
  //     areaStyle: {
  //       normal: {
  //         color: "#2ecc71",
  //         opacity: 1,
  //       }
  //     },
  //     data: lineData3
  //   },
  //   {
  //     name: '总数',
  //     type: 'line',
  //     stack: '总量',
  //     smooth: false, //是否平滑曲线显示
  //     symbol: 'none', // 线条无圆点
  //     symbolSize: 6,
  //     itemStyle: {
  //       normal: {
  //         color: "#1875f0",
  //         borderColor: "#fff"
  //       }
  //     },
  //     data: lineData4
  //
  //   },
  // ]
}






// 仪表盘
var rate = 180;
var total = 200;
var none = total - rate;
var processed = rate / total * 100;
var unprocessed = (total - rate) / total * 100;


const halfPie = {
  backgroundColor: 'white',
  tooltip: {
    formatter: '',
    // '已处理:' + processed + '%(' + rate + ')<br/>待处理:' + unprocessed + '%(' + none + ')',
  },
  title: {
    text: "警告已处理",
    textStyle: {
      color: '#3e4956',
      fontSize: 12,
      fontWeight: 'bold'
    },
    left: 'center',
    bottom: '18%'
  },
  series: [
    {
    name: '辅助', //建立环形图辅助界面
    type: 'pie',
    hoverAnimation: false,
    startAngle: 180,
    center: ["50%", '60%'],
    radius: ['60%', '80%'],
    itemStyle: {
      normal: {
        labelLine: {
          show: false
        },
      },
    },
    data: [
      {
      value: 100,
      itemStyle: {
        normal: {
          color: "#00a8ff",
          borderColor: "#00a8ff",
          borderWidth: 0,

        },
        emphasis: {
          color: "#00a8ff"
        }
      },
    },
    {
      value: 80,
      itemStyle: {
        normal: {
          color: '#eef1f6',
          borderColor: '#eef1f6',
          borderWidth: 0,

        },
        emphasis: {
          color: "#eef1f6"
        }
      }
    },
    {
      value: 1800000,
      // total,
      itemStyle: {
        normal: {
          color: 'rgba(0,0,0,0)'
        }
      }
    }
  ]
  },
  //   {
  //   name: '辅助', //建立环形图辅助界面
  //   type: 'pie',
  //   hoverAnimation: false,
  //   startAngle: 180,
  //   center: ["50%", '60%'],
  //   radius: ['60%', '80%'],
  //   itemStyle: {
  //     normal: {
  //       labelLine: {
  //         show: false
  //       },
  //     },
  //   },
  //   data: [
  //     {
  //       value: 25,
  //       itemStyle: {
  //           normal: {
  //             color: '#eef1f6',
  //           }
  //         },
  //         label: {
  //           show: false
  //         }
  //     },
  //     {
  //       value: 25,
  //       itemStyle: {
  //         normal: {
  //               label: {
  //                   show: false
  //               },
  //               labelLine: {
  //                   show: false
  //               },
  //               color: "rgba(0,0,0,0)",
  //               borderWidth: 0
  //           },
  //           emphasis: {
  //               color: "rgba(0,0,0,0)",
  //               borderWidth: 0
  //           }
  //         }
  //     }
  //   ]
  // },
  {
    name: '转化率',
    type: 'gauge',
    hoverAnimation: false,
    min: 0,
    max: 100,
    splitNumber: 0,
    startAngle: 180,
    endAngle: 0,
    center: ["50%", '70%'],
    radius: '90%',
    splitLine: {
      length: 0,
      lineStyle: {
        width: 3,
      }
    },
    axisLine: {
      lineStyle: {
        width: 0,
      }
    },
    axisTick: {
      length: 0,
      lineStyle: {
        width: 3,
      }
    },
    axisLabel: {
      show: false,
      distance: 20,
      color: 'red',
      fontSize: 20,
      fontWeight: 'bold'
    },
    detail: {
      formatter: '',
      // (rate / total * 100) + '%',
      color: '#3e4956',
      fontSize: 32,
      fontFamily: "HATTEN",
      offsetCenter: [0, '-30%'],
    }
  }
]
}






const bar3Category = {
  color: ['#ff2a00', '#ff8400', '#ffdd3f'],
  title: [{
    text: '',
    left: '49%',
    top: '40%',
    textAlign: 'center',
    textBaseline: 'middle',
    textStyle: {
      // fontWeight:'800',
      fontFamily: "Haettenschweiler",
      fontSize: 20
    }
  }, {
    text: '累计威胁',
    left: '49%',
    top: '50%',
    textAlign: 'center',
    textBaseline: 'middle',
    textStyle: {
      color: '#3e4956',
      fontWeight: 'normal',
      fontSize: 12
    }
  }],
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [{
    name: '等级分布',
    type: 'pie',
    center: ['50%', '46%'],
    radius: ['35%', '50%'],
    startAngle: 0, //起始角度，支持范围[0, 360]。
    itemStyle: { //图形样式
      normal: {
        borderWidth: 4,
        borderColor: '#fff',
      }
    },
    labelLine: {
      normal: {
        show: true,
        length: 10,
        lineStyle: {
          color: '#e1e3e4'
        }

      },
      emphasis: {
        lineStyle: {
          color: '#3e4956'
        }
      }
    },
    label: {
      normal: {
        textStyle: {
          fontSize: 12,
          color: '#3E4956',
        }

      },
    },
    data: []
    // [
    //   {
    //     value: 15,
    //     name: '高危'
    //   },
    //   {
    //     value: 30,
    //     name: '中危'
    //   },
    //   {
    //     value: 24,
    //     name: '低危'
    //   },
    // ]
  }]
}

const liquidFillCategory =
{
      series: [
      {
        type: 'liquidFill',
        data: '',
        // [0.52,0.45],
        color:['rgba(152,208,255,0.8)','rgba(152,208,255,0.6)'],
        radius: '80%',
        outline: {
            show: false
        },
        backgroundStyle: {
            color:'#2096ff',
            borderColor: '#2096ff',
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.01)',
            shadowBlur: 1
        },
        shape: 'path://M101.5,163.5c-37.6,0-68-30.4-68-68c0-37.6,30.4-68,68-68c37.6,0,68,30.4,68,68C169.5,133.1,139.1,163.5,101.5,163.5z M78.1,62.7l-9-9c-0.7-0.7-1.9-0.7-2.7,0L66.2,54c-0.7,0.7-0.7,1.9,0,2.7l9,9c0.7,0.7,1.9,0.7,2.7,0l0.2-0.2C78.8,64.7,78.8,63.5,78.1,62.7z M103.4,43.4c0-1-0.8-1.9-1.9-1.9h-0.3c-1,0-1.9,0.8-1.9,1.9v12.8c0,1,0.8,1.9,1.9,1.9h0.3c1,0,1.9-0.8,1.9-1.9V43.4z M101.5,64.5c-16.6,0-30,13.8-30,30.9v32.1h60V95.4C131.5,78.3,118.1,64.5,101.5,64.5z M136.8,54l-0.2-0.2c-0.7-0.7-1.9-0.7-2.7,0l-9,9c-0.7,0.7-0.7,1.9,0,2.7l0.2,0.2c0.7,0.7,1.9,0.7,2.7,0l9-9C137.6,55.9,137.6,54.7,136.8,54z M139.5,133.6c0-1.1-0.9-2-2-2h-72c-1.1,0-2,0.9-2,2v0.9c0,1.1,0.9,2,2,2h72c1.1,0,2-0.9,2-2V133.6z M75.6,95.5c0-14.9,11.7-26.9,26.1-26.9s26.1,12.1,26.1,26.9v27.3H75.6V95.5z',
        label: {
          show: true,
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold',
    },
    }]
}


export {
  bar1Category,
  bar2Category,
  bar3Category,
  lineCategory,
  mapbar,
  pieThree,
  halfPie,
  liquidFillCategory,

}
