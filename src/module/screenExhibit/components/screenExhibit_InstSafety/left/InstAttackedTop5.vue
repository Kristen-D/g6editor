<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>受攻击单位TOP5</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox4" id="instattacktop5"></div>
  </div>
</div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===5) {
        this.loadMapChart();
      }
    }
  },
  methods: {
    loadMapChart() {
      let myChart = echarts.init(document.getElementById('instattacktop5'));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '20%',
          //	height: 250,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          //	tickInterval:1,
          data: ['太原教育学院', '太原人民医院', '太原中心医院', '外国语学院', '太原市交通学院'],
          axisLine: {
            show: true
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            margin: 10,
            rotate: 25,
            interval: 0, //强制显示所有类目，否则默认为auto
            textStyle: {
              color: 'rgba(255,255,255,0.7)',
              fontSize: 14
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 20,
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: '#23303f'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.7)',
            }
          }
        },

        series: [{
          name: '受攻击单位TOP',
          type: 'bar',
          data: [{
            name: '太原教育学院',
            value: 19
          }, {
            name: '太原人民医院',
            value: 16
          }, {
            name: '太原中心医院',
            value: 11
          }, {
            name: '外国语学院',
            value: 8
          }, {
            name: '太原市交通学院',
            value: 5
          }],
          // barCategoryGap: '35%',
          barWidth: 15,
          barGap: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#e2e2e3' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#e02b09' // 100% 处的颜色
              }], false)
            }
          }

        }]
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
