<template>
<div class="echartsbox11" id="instspreadbar"></div>
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
      let myChart = echarts.init(document.getElementById('instspreadbar'));
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        //    calculable : true,
        grid: {
          containLabel: true,
          left: '5%',
          top: 10,
          bottom: 10
        },
        xAxis: [{
          type: 'value',
          show: false
        }],
        yAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.7)'
            }
          },
          axisTick: {
            length: 10,
            alignWithLabel: true, //label与axistick在同一位置，默认label在2个刻度之间。
            lineStyle: {
              color: 'rgba(255,255,255,0.7)'
            }
          },
          axisLabel: {
            margin: 30,
            textStyle: {
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16
            }
          },
          data: ['古交市', '娄烦县', '阳曲县', '清徐县', '小店区', '晋源区', '尖草坪区', '万柏林区', '杏花岭区', '迎泽区']
        }],
        series: [{
          name: '单位总数',
          type: 'bar',
          barWidth: 10,
          data: [313, 366, 402, 458, 511, 569, 615, 663, 735, 777],
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'rgba(255,255,255,0.7)',
                fontSize: 16
              }
            }
          },
          itemStyle: {
            normal: {
              color: function(params) {
                // build a color map as your need.
                let colorList = ['#673ab6', '#3f51b4', '#c0392b', '#fec007', '#16a085', '#e67e22', '#2980b9', '#1abc9c', '#2ecc71', '#3498db'];
                return colorList[params.dataIndex];
              }
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
