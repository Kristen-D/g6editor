<template>
<div class="el-panel">
  <div class="el-panel-heading">
    <h4 class="el-panel-title">{{configuration.name}}</h4>
  </div>
  <div class="el-panel-body">
    <div class="echartbox4">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
  </div>
</div>
</template>

<script>
import ECharts from 'components/vue-echarts/ECharts.vue'
export default {
  props: ['data'],
  components: {
    ECharts,
  },
  data() {
    return {
      option : {},
      configuration: this.data.json
    }
  },
  methods: {
    getInitData() {
      this.common.req(this.configuration.dataUrl, this.configuration, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let datax = [];
      let datav = [];
      for(let d of data) {
        datax.push(d.name);
        datav.push(d.value);
      }
      // let myChart = echarts.init(document.getElementById('pupaffected_department'));
      this.option = {
        color: ['#ff7d27'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          }
        },
        grid: {
          top: '10%',
          left: '-10',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisTick: {
            inside: true,
            alignWithLabel: true, //在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#e1e3e4',
              type: 'solid'
            }
          },
          data:datax,
           // ['单位1', '单位2', '单位3', '单位4', '单位5'],
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e1e3e4',
              type: 'solid'
            },
          },
        }],
        series: [{

          name: '直接访问',
          type: 'bar',
          barWidth: '26%',
          data: datav
          // [56, 42, 38, 36, 20]
        }]
      };

      // myChart.setOption(option);
      // window.onresize = myChart.resize;
    }
  },
  created: function() {
    // this.getInitData();
  },
  mounted: function() {
    this.getInitData();
  }
}
</script>

<style>
</style>
