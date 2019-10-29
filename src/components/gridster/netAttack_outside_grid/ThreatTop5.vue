<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title">攻击类型Top5</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
  </div>
</template>

<script>
  import ECharts from "../../vue-echarts/ECharts";
  import {threatTop} from "./ChartOptions";
  import {fmtEventThreatList} from "../../js/functionUtil";

  export default {
    components: {ECharts},
    data() {
      return {
        params: {dateRange: 'month'},
        eventThreatList: null,
        option: threatTop
      }
    },
    methods: {
      loadMapChart(data) {
        let seriesData = [];
        let yAxis = [];
        for (let i = 0; i < data.length; i++) {
          let dataUnit = data[i];
          seriesData.push(dataUnit.count);
        }
        for (let i = 0; i < data.length; i++) {
          let dataUnit = data[i];
          yAxis.push(this.eventThreatList[dataUnit.event_threat_type]);
        }
        this.option.yAxis[0].data = yAxis;
        this.option.series[0].data = seriesData;
      }
    },
    async created() {
      this.eventThreatList = await fmtEventThreatList(this);
      let data = await this.commonAjax.req('/ssa/netAttack/getCountEventThreatTypeTop5.do', this.params);
      this.loadMapChart(data);
    }

  }
</script>
