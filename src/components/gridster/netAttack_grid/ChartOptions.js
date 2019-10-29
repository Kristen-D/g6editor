// legend.data, series[0].data
const netAttackDataMap = {
  color: ['#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
  title: {
    // subtext: '漏洞总数',
    x: '36%',
    y: '35%',
    textStyle: {
      color: '#fff',
      fontSize: 20
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    bottom: '0%',
    width: '320',
    left: '20%',
    itemGap: 16,
    textStyle: {
      color: '#9ea3b4',
      fontsize: '12px',
    },
    itemWidth: 10,
    itemHeight: 10,
    data: []
  },
  series: [{
    name: '数量',
    type: 'pie',
    center: ['46%', '40%'],
    radius: ['46%', '56%'],
    data: [],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    label: {
      normal: {
        show: false,
        textStyle: {
          fontSize: 14,
          color: '#fff'
        }
      }
    },
  }]
};

// xAxis[0].data, series[0].data, series[1].data, series[2].data
const netAttackHeatMap = {
  color: ['rgba(18,134,253,0.7)', 'rgba(80,252,168,0.7)'],
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: 15,
      color: "#fff",
    }
  },
  grid: {
    show: true,
    left: 30,
    top: 34,
    right: 10,
    bottom: 42,
    borderColor: 'rgba(53,66,94,0.4)',
  },
  calculable: false,
  xAxis: [{
    type: 'category',
    boundaryGap: false, //坐标轴两边留白策略（类目轴）
    //在（type: 'category'）中设置data有效
    data: [],
    splitLine: { //坐标轴在 grid 区域中的分隔线；
      show: true,
      lineStyle: { //分割线颜色，可设单个，也可以设置数组。
        color: 'rgba(53,66,94,0.4)'
      }
    },
    axisLine: { //坐标轴轴线相关设置。数学上的x轴
      show: false,
      lineStyle: {
        color: 'rgba(53,66,94,0.4)'
      },
    },
    axisLabel: { //坐标轴刻度标签的相关设置
      textStyle: {
        color: '#9ea3b4',
      },
    },
  }],
  yAxis: [{
    type: 'value',
    show: false,
    splitLine: { //坐标轴在 grid 区域中的分隔线。
      show: true,
      lineStyle: {
        color: 'rgba(53,66,94,0.4)'
      }
    },
    axisLine: { //坐标轴轴线相关设置。数学上的y轴
      show: true,
      lineStyle: {
        color: 'rgba(53,66,94,0.4)'
      },
    },
    axisLabel: {
      textStyle: {
        color: '#9ea3b4'
      },
    }
  }],
  series: [
    {
      name: '低危',
      type: 'line',
      smooth: true, //是否平滑曲线显示
      lineStyle: { //线条样式
        normal: {
          width: 1
        }
      },
      areaStyle: { //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(	255,105,180,0.7)'
          }, {
            offset: 0.7,
            color: 'rgba(	255,105,180,0.7)'
          }], false),
          // shadowColor: 'rgba(0, 0, 0, 0.9)', //阴影颜色
          //shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        }
      },
      itemStyle: { //折现拐点标志的样式
        normal: {
          color: 'rgba(	255,105,180,0.7)'
        }
      },
      data: []
    },
    {
      name: '高危',
      type: 'line',
      smooth: true, //是否平滑曲线显示
      lineStyle: { //线条样式
        normal: {
          width: 1
        }
      },
      areaStyle: { //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(18,134,253,0.7)'
          }, {
            offset: 0.7,
            color: 'rgba(18,134,253,0.7)'
          }], false),
          // shadowColor: 'rgba(0, 0, 0, 0.9)', //阴影颜色
          //shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        }
      },
      itemStyle: { //折现拐点标志的样式
        normal: {
          color: 'rgba(18,134,253,0.7)'
        }
      },
      data: []
    },
    {
      name: '中危',
      type: 'line',
      smooth: true,
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(80,252,168,0.7)'
          }, {
            offset: 0.8,
            color: 'rgba(80,252,168,0.7)'
          }], false),
          // shadowColor: 'rgba(0, 0, 0, 0.9)', //阴影颜色。支持的格式同color。
          //shadowBlur: 10 ,//图形阴影的模糊大小。
        }
      },
      itemStyle: {
        normal: {
          color: 'rgba(80,252,168,0.7)'
        }
      },
      data: []
    },
  ] //series结束
};

export {
  netAttackDataMap, netAttackHeatMap
}