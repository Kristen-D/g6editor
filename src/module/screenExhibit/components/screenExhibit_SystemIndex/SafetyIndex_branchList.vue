<template>
<div class="echartsbox2" :id="id"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: ['id', 'branchName', 'branchScore', 'engName'],
  methods: {
    loadMapChart() {
      let myChart = echarts.init(document.getElementById(this.id));

      let color = "";
      let score = this.branchScore;
      if (score >= 90) {
        color = "rgba(33,150,243,1)";
      } else if (score >= 80) {
        color = "rgba(60,252,168,1)";
      } else {
        color = "rgba(245,60,97,1)";
      }

      let option = {
        title: {
          text: this.engName,
          subtext: this.branchName,
          textStyle: { //主标题
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14,
          },
          subtextStyle: { //副标题
            color: '#fff',
            fontSize: 12,
          },
          itemGap: 12, //主副标题之间的距离
          top: '10%',

        },
        series: [{
          name: '计算机病毒',
          type: 'pie',
          radius: ['54%', '64%'],
          center: ['80%', '45%'],
          data: [{
              value: score,
              name: '占比',
              label: {
                normal: {
                  formatter: '{c}',
                  position: 'center',
                  textStyle: {
                    color: color,
                    fontSize: 14
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: color
                }
              },
              hoverAnimation: false
            },
            {
              value: 100 - score,
              name: '',
              labelLine: {
                normal: {
                  show: false,
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(33,150,243,0.1)'
                },

              },
              hoverAnimation: false //是否开启 hover 在扇区上的放大动画效果。
            }
          ]
        }]
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
