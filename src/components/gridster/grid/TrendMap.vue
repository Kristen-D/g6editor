<template >
<div class="panel panel-default bg-panel" style="height:100%;">

  <div class="panel-body" style="height:100%;">
    <el-select v-model="dateType" @change="oncg" placeholder="请选择">
      <el-option v-for="item in options" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <div :id="chartId" style="height:100%;"></div>
  </div>
</div>



</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import echarts from 'echarts'
export default {
  data() {
    var chartId = "grid_echart_" + this.data.i;
    return {
      resultData: [],
      total: "",
      dateType: "day",
      chartId: chartId,
      option: {},
      options: [{
        value: 'day',
        label: '本日'
      }, {
        value: 'week',
        label: '7天'
      }, {
        value: 'month',
        label: '30天'
      }]
    }
  },
  props: ['data'],
  computed: {
    ...mapState({
      //  topData:state=>state.context.topData
    })
  },
  methods: {
    resize() {
      let vm = this;
      this.$nextTick(() => {
        vm.myChart = echarts.init(document.getElementById(this.chartId));
        vm.myChart.setOption(vm.option);
      });
    },
    async oncg(val) {
      this.resultData = await this.commonAjax.req("/ssa/home/getTrend.do", {
        dateType: val
      });
      this.loadMapChart();
    },
    loadMapChart() {
      var myChart = echarts.init(document.getElementById(this.chartId));
      var high = this.resultData.high;
      var mid = this.resultData.mid;
      var low = this.resultData.low;
      var xData = this.resultData.xData;
      var highAvg = this.resultData.highAvg;
      var midAvg = this.resultData.midAvg;
      var lowAvg = this.resultData.lowAvg;
      this.option = {
        color: ['#1ceaea', '#13d68f', '#cdc42f'],
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 15,
            color: "#fff",
          }
        },
        legend: {
          orient: 'horizontal',
          right: "4%",
          itemGap: 20,
          //itemWidth:16,
          //itemHeight:12,
          data: ['高危', '中危', '低危'],
          textStyle: {
            color: '#fff',
          }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          right: 'right',
          top: '20%',
          itemGap: 20,
          feature: {
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          },
          iconStyle: {
            normal: {
              color: '#0390e9'
            }
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: true,
          left: 60,
          top: 34,
          right: 44,
          bottom: 42,
          borderWidth: 1,
          borderColor: 'rgba(170,172,178,0.33)',
          backgroundColor: 'rgba(17, 34, 69, 0.24)'
        },
        calculable: true,
        yAxis: {
          type: 'value',

          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(170,172,178,0.33)'
            }
          },
          axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
            show: true,
            lineStyle: {
              color: 'rgba(170,172,178,0.53)'
            },
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.83)',
              fontSize: 12,
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#112245', 'rgba(34,50,82,0.4)']
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: { //坐标轴在 grid 区域中的分隔线；
            show: true,
            lineStyle: { //分割线颜色，可设单个，也可以设置数组。
              color: 'rgba(170,172,178,0.33)'
            }
          },
          axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
            show: true,
            lineStyle: {
              color: 'rgba(170,172,178,0.53)'
            },
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.83)',
              fontSize: 15,
            },
          },
          data: xData
        },
        series: [{
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
                  color: 'rgba(0, 255, 255, 0.9)'
                }, {
                  offset: 0.7,
                  color: 'rgba(0, 255, 255, 0.6)'
                }], false),

                shadowColor: 'rgba(0, 0, 0, 0.9)', //阴影颜色
                shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            markLine: {
                silent: true,
                lineStyle: {
                  normal: {
                    color: 'rgba(0, 255, 255, 0.9)'
                  }
                },
                label:{
                    normal:{
                        show:true,
                        position : 'middle',
                        formatter: '{b}: {c}'
                    }
                },
                data: [{
                    name: '高危平均',
                    yAxis: highAvg,
                    // type: 'average'
                }]
            },
            itemStyle: { //折现拐点标志的样式
              normal: {
                color: 'rgb(0,255,255)'
              }
            },
            data: high
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
                  color: 'rgba(240, 231, 80, 0.9)'
                }, {
                  offset: 0.8,
                  color: 'rgba(240, 231, 80, 0.4)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.9)',
                shadowBlur: 10
              }
            },
            markLine: {
                silent: true,
                lineStyle: {
                  normal: {
                    color: 'rgba(240, 231, 80, 0.9)'
                  }
                },
                label:{
                    normal:{
                        show:true,
                        position : 'middle',
                        formatter: '{b}: {c}'
                    }
                },
                data: [{
                    name: '中危平均',
                    yAxis: midAvg,
                    // type: 'average'
                }]
            },
            itemStyle: {
              normal: {
                color: 'rgb(240,231,80)'

              }
            },
            data: mid
          },
          {
            name: '低危',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,255,162)'
              }
            },
            markLine: {
                silent: true,
                lineStyle: {
                  normal: {
                    color: 'rgb(0,255,162)'
                  }
                },
                label:{
                    normal:{
                        show:true,
                        position : 'middle',
                        formatter: '{b}: {c}'
                    }
                },
                data: [
                  {
                    name: '低危平均',
                    yAxis: lowAvg
                  }
              ]
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,255,162, 0.8)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0,255,162, 0.4)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.9)',
                shadowBlur: 10
              }
            },
            data: low
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    //  window.onresize = myChart.resize;

    }
  },
  created: function() {

  },
  mounted: function() {
    this.commonAjax.req("/ssa/home/getTrend.do", {
      dateType: this.dateType
    }).then(data => {
      this.resultData = data
      this.loadMapChart();
    });
  }

}
</script>
