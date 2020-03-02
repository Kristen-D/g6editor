<template>
  <div class="el-panel-white mygrid-def">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">资产数据接入</h3>
    </div>
    <div class="el-panel-white-body">
      <div class="chart-container">
        <e-charts @chartclick="chartClick" :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
  import {DATA_CENTER_GET_DETAIL_DATA} from '../../../module/viewPlugins/store/mutation-types';
  import ECharts from "../../vue-echarts/ECharts";
  import {assetData} from "./ChartOptions";

  export default {
    components: {ECharts},
    data() {
      return {
        option: assetData
      }
    },
    methods: {
      chartClick (params) {
        this.$store.dispatch(DATA_CENTER_GET_DETAIL_DATA, {
          pageIndex: 1,
          product_type: params.data.product_type,
          chartType: 'assetInfo',
          old_total: params.value,
          pageSize: 5,
          dialogTitle: '设备详细信息'
        });
      },
      loadMapChart(data) {
        this.option.title.text = data.total;
        this.option.series[0].data = data.data;
      }
    },
    async created () {
      let data = await this.common.req("/ssa/dataCenter/getAllDataSource.do");
      this.loadMapChart(data);
    }
  }
</script>
