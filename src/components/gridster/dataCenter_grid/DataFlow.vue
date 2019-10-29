<template>
  <div class="el-panel-white mygrid-def">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">数据流量监控</h3>
    </div>
    <div class="el-panel-white-body">
      <div class="chart-container">
        <e-charts :options="option" auto-resize @chartclick="chartClick"></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
  import {DATA_CENTER_GET_DETAIL_DATA} from '../../../module/viewPlugins/store/mutation-types';
  import ECharts from "../../vue-echarts/ECharts";
  import {dataFlow} from "./ChartOptions";

  export default {
    components: {ECharts},
    data() {
      return {
        option: dataFlow
      }
    },
    methods: {
      loadMapChart(data) {
        let category = [];
        let lineData = [];

        category = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        lineData = [10, 13, 15, 7, 5, 6, 8, 9, 12, 13, 10, 9, 8, 9, 13, 12, 10, 8, 6, 7, 8, 9, 10, 9];

        this.option.timeline.data = data.dateTime;
        this.option.options[0].xAxis.data = lineData;
        this.option.options[0].series[0].data = category;
        for (let i = 1; i < 7; i++) {
          this.option.options[i].series[0].data = data.data[i];
        }
      },
      chartClick (params) {
        this.$store.dispatch(DATA_CENTER_GET_DETAIL_DATA, {
          pageIndex: 1,
          product_type: params.data.product_type,
          chartType: 'dataFlow',
          old_total: params.value,
          pageSize: 5,
          dialogTitle: '日志详细信息'
        });
      },
    },
    async created () {
      let data = await this.common.req("/ssa/dataCenter/getDataFlow.do");
      this.loadMapChart(data);
    }
  }
</script>
