<template >
<div class="el-panel">
  <div class="el-panel-heading">
    <h4 class="el-panel-title">阻拦趋势</h4>
    <el-tabs v-model="dateRange" class="float-r day-tabs">
      <el-tab-pane label="今天" name="day"></el-tab-pane>
      <el-tab-pane label="近7天" name="week"></el-tab-pane>
      <el-tab-pane label="近30天" name="month"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="el-panel-body">
    <div style="height:260px;" id="actionTendency"></div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      dateRange: "month",
      tendencyType: "action",
      xAxis: [],
      data: [],
      value:null,
      total:null

    }
  },
  watch: {
    dateRange: async function(val, old) {
      var params = {
        tendencyType: this.tendencyType,
        dateRange: val
      }

      await this.loadAssociativeTendency();
    }
  },
  methods: {
    async loadAssociativeTendency() {
      var xMax = 100;
      var params = {
        tendencyType: this.tendencyType,
        dateRange: this.dateRange
      }
      var res = await this.common.req("/ssa/associativeAnalysis/getAssociativeAnalysisGroupByDateAndParams.do", params);
      this.xAxis = res.xAxis;
      this.data = res.data;
      this.total = res.total;
      this.value = res.value;


      var option = {
        title: [{
            text: this.value,
            top: '25%',
            left: '7%',
            textStyle: {
              fontSize: '72',
              fontFamily: 'HATTEN'
            }
          },
          {
            text: '阻拦总数',
            top: '57%',
            left: '8%',
            textStyle: {
              color: '#9ea3b4',
              fontSize: '14',
            }
          }
        ],
        tooltip: {
          trigger: 'item'
        },
        grid: [{
          left: '28%',
          right: '3%',
          top: '7%',
          bottom: '7%',
          containLabel: true
        }, {
          left: '1%',
          right: '80%',
          top: '77%',
          //			bottom: '7%',
          containLabel: true
        }],
        calculable: true,
        xAxis: [{
          gridIndex: 0,
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
          },
          splitLine: { //网格线
            show: false,
            lineStyle: {
              color: '#e1e3e4',
              type: 'solid'
            }
          },
          data: this.xAxis
        }, {
          gridIndex: 1,
          type: 'value',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgb(135,135,135)',
              width: 1.5,
            }
          },
          axisLabel: {
            show: false
          },
        }],
        yAxis: [{
          gridIndex: 0,

          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: '#e1e3e4',
              type: 'solid'
            }
          }
        }, {
          gridIndex: 1,
          type: 'category',
          boundaryGap: true,
          data: ['阻拦率'],
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
        }],
        series: [{
          name: '关联数',
          type: 'line',
          smooth: true, //是否平滑曲线显示
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          symbolSize: 6,
          itemStyle: {
            normal: {
              color: "#2980b9",
            }
          },
          lineStyle: {
            normal: {
              color: '#007be8'
            }
          },
          areaStyle: {
            normal: {
              color: '#a7cbf9'
            }
          },
          data: this.data
        }, {
          name: ' ',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          barWidth: 20,
          silent: true,
          itemStyle: {
            normal: {
              color: '#ccc',
            }
          },
          barGap: '-100%',
          barCategoryGap: '20%',
          data:[this.value],
        }, {
          name: '阻拦率',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{c}%'
            }
          },
          data: [{
            value: (this.value/this.total*100).toFixed(2),
            itemStyle: {
              normal: {
                color: '#007be8'
              }
            }
          }]
        }]
      };
      var myChart = echarts.init(document.getElementById('actionTendency'));
      myChart.setOption(option);
      window.addEventListener("resize",myChart.resize);
    }
  },
  mounted: async function() {

    await this.loadAssociativeTendency();
  }



}
</script>

<style lang="css">
</style>
