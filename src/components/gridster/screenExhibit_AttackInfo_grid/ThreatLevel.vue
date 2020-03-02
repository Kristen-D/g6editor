<template>
  <div class="chart-container">
    <e-charts :options="option" auto-resize></e-charts>
  </div>
</template>

<script>

  import ECharts from "../../vue-echarts/ECharts";
  import {fmtEventThreatList, eventRiskList} from "../../js/functionUtil";
  import {threatLevel} from "./ChartOptions";

  export default {
    components: {ECharts},
    data() {
      return {
        seriesData2: [],
        seriesData: [],
        lenData: [],
        option: threatLevel
      }
    },
    methods: {
      async getInitData() {
        this.seriesData2 = [];
        this.seriesData = [];
        this.lenData = [];
        let data = await this.common.req('/ssa/screenExhibit/getPieByRiskTypeNetAttack.do', {dateRange: 'month'}, this);
        for (let i = 0; i < data.length; i++) {
          let childData2 = {
            value: 0, name: '高危',
            itemStyle: {
              normal: {
                color: '#f3ce21'
              }
            }
          };
          childData2.value = data[i].count;
          let level = data[i].event_risk_level;
          childData2.name = eventRiskList[level];
          if (data[i].event_risk_level === 1) {
            childData2.itemStyle.normal.color = '#f3ce21';
          } else if (data[i].event_risk_level === 2) {
            childData2.itemStyle.normal.color = '#ff7348';
          } else {
            childData2.itemStyle.normal.color = '#f53c61';
          }
          this.seriesData2.push(childData2);
        }
        this.getInitData2();
      },
      async getInitData2() {
        let data = await this.common.req('/ssa/netAttack/getCountEventThreatTypeTop5.do', {dateRange: 'month'}, this);
        let eventThreatList = await fmtEventThreatList(this);
        for (let i = 0; i < data.length; i++) {
          let dataUnit = data[i];
          let child = {
            name: 'NSEI',
            value: 24
          };
          child.value = dataUnit.count;
          child.name = eventThreatList[dataUnit.event_threat_type];
          this.seriesData.push(child);
        }
        for (let i = 0; i < data.length; i++) {
          let dataUnit = data[i];
          this.lenData.push(eventThreatList[dataUnit.event_threat_type]);
        }
        this.loadMapChart();
      },
      loadMapChart() {
        console.log()
        this.option.yAxis.data = this.lenData;
        this.option.series[0].data = this.seriesData2;
        this.option.series[1].data = this.seriesData;
      }
    },
    created() {
      this.getInitData();
    }
  }
</script>

<style scoped>
  .chart-container {
    margin-top: 50px;
  }
</style>
