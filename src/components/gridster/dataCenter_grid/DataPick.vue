<template>
  <div class="el-panel-white mygrid-def">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">数据采集</h3>
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
  import {dataPick} from "./ChartOptions";
  import ECharts from "../../vue-echarts/ECharts";

  export default {
    components: {ECharts},
    data() {
      return {
        option: dataPick
      }
    },
    methods: {
      loadMapChart(data) {
        let total = data.total / 10000;
        let barData = [], categories = [];
        for (let i = 0; i < data.data.length; i++) {
          let bar = {
            value: data.data[i].value,
            product_type: data.data[i].product_type
          };
          categories.push(data.data[i].name);
          barData.push(bar);
        }

        this.option.title.text = '共采集' + total + '/万';
        this.option.series[0].data = barData;
        this.option.xAxis[0].data = categories;
        this.option.series[1].data = data.data;
      },
      chartClick(params) {
        this.$store.dispatch(DATA_CENTER_GET_DETAIL_DATA, {
          pageIndex: 1,
          product_type: params.data.product_type,
          chartType: 'dataPick',
          old_total: params.value,
          pageSize: 5,
          dialogTitle: '日志详细信息'
        });
      }
    },
    async created() {
      let data = await this.common.req("/ssa/dataCenter/getTotalDataList.do");
      this.loadMapChart(data);
    },
  }
</script>
