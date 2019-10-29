<template >
<div class="el-panel">
  <div class="el-panel-heading">
    <h4 class="el-panel-title">关联趋势</h4>
    <el-tabs v-model="dateRange" class="float-r day-tabs">
      <el-tab-pane label="今天" name="day"></el-tab-pane>
      <el-tab-pane label="近7天" name="week"></el-tab-pane>
      <el-tab-pane label="近30天" name="month"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="el-panel-body">
    <div style="height:260px;" id="associativeTendency"></div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      dateRange: "month",
      tendencyType: "correlation",
      xAxis: [],
      data: [],
      value: null

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

      var params = {
        tendencyType: this.tendencyType,
        dateRange: this.dateRange
      }
      var res = await this.common.req("/ssa/associativeAnalysis/getAssociativeAnalysisGroupByDateAndParams.do", params);
      this.xAxis = res.xAxis;
      this.data = res.data;
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
            text: '关联总数',
            top: '57%',
            left: '8%',
            textStyle: {
              color: '#9ea3b4',
              fontSize: '14',
            }
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '28%',
          right: '3%',
          top: '7%',
          bottom: '7%',
          containLabel: true
        },
        calculable: true,
        xAxis: [{
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
        }],
        yAxis: [{

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
        }]
      };
      var myChart = echarts.init(document.getElementById('associativeTendency'));
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
