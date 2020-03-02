<template>
<div class="echartsbox11" id="instspreadpie"></div>
</template>

<script>
import echarts from 'echarts'
import {
  mapState
} from 'vuex'
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
      let myChart = echarts.init(document.getElementById('instspreadpie'));
      let option = {
        color: ['#673ab6', '#3f51b4', '#c0392b', '#fec007', '#16a085', '#e67e22', '#2980b9', '#1abc9c', '#2ecc71', '#3498db'],
        title: {
          text: '单位总数：6646',
          textStyle: {
            color: 'rgba(255,255,255,0.9)',
            fontSize: 16
          },
          left: 'center',
          top: 10
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '单位总数',
          type: 'pie',
          radius: '50%',
          center: ['50%', '52%'],
          data: [{
              value: 313,
              name: '古交市'
            },
            {
              value: 366,
              name: '娄烦县'
            },
            {
              value: 402,
              name: '阳曲县'
            },
            {
              value: 458,
              name: '清徐县'
            },
            {
              value: 511,
              name: '小店区'
            },
            {
              value: 569,
              name: '晋源区'
            },
            {
              value: 615,
              name: '尖草坪区'
            },
            {
              value: 663,
              name: '万柏林区'
            },
            {
              value: 735,
              name: '杏花岭区'
            },
            {
              value: 777,
              name: '迎泽区'
            }
          ],
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: "{d}%",
              textStyle: {
                color: 'rgba(255,255,255,0.7)',
                fontSize: 16
              }
            }
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 10,
              //					smooth:true,
              lineStyle: {
                color: 'rgba(255,255,255,0.7)'
              }
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
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
