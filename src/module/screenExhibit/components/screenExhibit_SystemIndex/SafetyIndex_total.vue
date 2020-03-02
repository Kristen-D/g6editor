<template>
<div class="echartsbox1" :id="id"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: ['id', 'eventName', 'eventScore'],
  methods: {
    loadMapChart() {
      let myChart = echarts.init(document.getElementById(this.id));
      let color = "";
      let score = this.eventScore;
      if (score >= 90) {
        color = "rgba(33,150,243,1)";
      } else if (score >= 80) {
        color = "rgba(60,252,168,1)";
      } else {
        color = "rgba(245,60,97,1)";
      }

      let option = {
        title: {
          text: this.eventName,
          textStyle: { //主标题
            color: '#fff',
            fontSize: 18,
            fontWeight: '500',
          },
          top: '5%',
          left: '16%',
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            var res = params.seriesName;
            res += '<br/>' + params.name + ' : ' + params.percent + '%';
            return res;
          }
        },
        series: [{
          name: '有害程序',
          type: 'pie',
          radius: ['66%', '76%'],
          center: ['10%', '40%'],
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
