<template>
  <qinshan-component-panel title="攻击等级">
    <e-charts :options="option" auto-resize></e-charts>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {attackType} from "./ChartOptions";
  import {eventRiskList} from "../../../components/js/functionUtil";

  export default {
    components: {ECharts, QinshanComponentPanel},
    name: "attack-level",
    data () {
      return {
        option: attackType
      }
    },
    methods: {
      loadChart(data) {
        let seriesData = [];
        data.map((item) => {
          seriesData.push({
            value: item.count,
            name: eventRiskList[item.event_risk_level]
          })
        });
        this.option.series[0].data = seriesData;
      },
      async refreshData(){
        let data = await this.common.req('/ssa/situationAnaly/getPieByRiskType.do', {dataRange: 'month'}, this);
        // let data = [{"event_risk_level":1,"count":41777557},{"event_risk_level":2,"count":3104},{"event_risk_level":3,"count":74025}];

                this.loadChart(data);
              

      }
    },
      created () {
        this.refreshData();
        setInterval(() => {
          this.refreshData();
        }, 60000);
    },

  }
</script>

<style scoped>

</style>
