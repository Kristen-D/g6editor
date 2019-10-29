<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>网络攻击</h3>
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
  import {fmtEventTypeList} from "../../js/functionUtil";
  import {netAttackDataMap} from "./ChartOptions";

  export default {
    components: {ECharts},
    data() {
      return {
        isOpen: false,
        currentIndex: -1,
        // cacheData: [],
        option: netAttackDataMap
      }
    },
    methods: {
      async loadMapChart() {
        let params = this.params;
        let data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnPie.do", params);
        let eventTypeList = await fmtEventTypeList(this);
        let lenData = [];
        let seriesData = [];
        for (let i = 0; i < data.length; i++) {
          let dataUnit = data[i];
          let childData = {};
          childData.value = dataUnit.total;
          childData.name = eventTypeList[dataUnit.event_subtype];
          lenData.push(eventTypeList[dataUnit.event_subtype]);
          // this.cacheData.push(dataUnit.event_subtype);
          seriesData.push(childData);
        }

        this.option.legend.data = lenData;
        this.option.series[0].data = seriesData;
      }
    },
    created() {
      this.loadMapChart();
    }
  }
</script>
