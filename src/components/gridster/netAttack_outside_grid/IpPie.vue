<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title">攻击来源TOP5</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
  </div>
</template>

<script>
  import ECharts from "../../vue-echarts/ECharts";
  import {lpPie} from "./ChartOptions";

  export default {
    components: {ECharts},
    data() {
      return {
        params: {dateRange: 'month'},
        option: lpPie
      }
    },
    methods: {
      loadMapChart() {
        let seriesData = [];
        this.commonAjax.req('/ssa/netAttack/getEventSrcIpOnPie.do', this.params).then((data) => {
          data = data.result;

          for (let i = 0; i < data.length; i++) {
            let dataUnit = data[i];
            let childData = {value: 15, name: '其他'};
            childData.value = dataUnit.total;
            childData.name = dataUnit.ipSourceName;
            seriesData.push(childData);
          }

          this.option.series[0].data = seriesData;
        })
      }
    },
    mounted() {
      this.loadMapChart();
    }
  }
</script>
