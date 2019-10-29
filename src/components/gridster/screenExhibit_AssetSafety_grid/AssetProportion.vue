<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>资产占比</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="chart-container">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
  import ECharts from "../../vue-echarts/ECharts";
  import {assetProportion} from "./ChartOptions";

  export default {
    components: {ECharts},
    data() {
      return {
        option: assetProportion
      }
    },
    methods: {
      getInitData() {
        this.common.req('/ssa/dataCenter/getAllDataSource.do', {dateRange: 'week'}, this).then((data) => {
          this.loadMapChart(data);
        })
      },
      loadMapChart(data) {
        this.option.series[0].data = data.data;
      }
    },
    created() {
      this.getInitData();
    }
  }
</script>
