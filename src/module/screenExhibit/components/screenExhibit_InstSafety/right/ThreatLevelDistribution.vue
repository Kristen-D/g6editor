<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h4 class="el-panel-bigscreen-subtitle2">威胁等级分布</h4>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox6" id="PieBox2"></div>
  </div>
</div>
</template>

<script>
import echarts from 'echarts'
import {  mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      if (this.activeScreen === 5) {
        this.loadMapChart();
      }
    }
  },
  methods: {
    loadMapChart() {

      let myChart = echarts.init(document.getElementById('PieBox2'));
      let option = {
        color: ['#ff2a00', '#ff8400', '#ffdd3f'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        legend: {
          orient: 'vertical',
          top: '20%',
          right: '10%',
          itemGap: 15,
          itemWidth: 10,
          itemHeight: 10,
          data: [{
            name: '高危',
            icon: 'circle'
          }, {
            name: '中危',
            icon: 'circle'
          }, {
            name: '低危',
            icon: 'circle'
          }],
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14
          },
          formatter: function(name) {
            let oa = option.series[0].data;
            let num = oa[0].value + oa[1].value + oa[2].value;
            for (let i = 0; i < option.series[0].data.length; i++) {
              if (name === oa[i].name) {
                return '   ' + name + '     ' + Math.round((oa[i].value / num) * 100) + '%' + '     ' + oa[i].value;
              }
            }
          }
        },
        series: [{
          name: '攻击等级分布',
          type: 'pie',
          radius: ['60%', '85%'],
          center: ['20%', '50%'],
          data: [{
            value: 40,
            name: '高危'
          }, {
            value: 241,
            name: '中危'
          }, {
            value: 40,
            name: '低危'
          }],

          itemStyle: {
            normal: {
              borderWidth: '2',
              borderColor: '#070e31',
              label: {
                show: false,
                // position:'inside',
                formatter: '{b} : {c} ({d}%)'
              }
            },

            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            labelLine: {
              show: true
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
