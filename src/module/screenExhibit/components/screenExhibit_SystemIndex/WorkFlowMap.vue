<template>
<div class="echartsbox5" :id="id"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['id', 'todo', 'done'],
  methods: {
    loadMapChart() {
      var myChart = echarts.init(document.getElementById(this.id));
      let c = ((this.todo/(this.done+this.todo)).toFixed(2))*100;
      var option = {
        series: [{
          name: '待办',
          type: 'pie',
          radius: ['60%', '70%'],
          center: ['50%', '45%'],
          data: [{
            value: this.done,
            name: '占比',
            label: {
              normal: {
                formatter: c+'%',
                position: 'center',
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#ffdd3f'
              }
            },
            hoverAnimation: false
          }, {
            value: this.todo,
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
          }]
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
