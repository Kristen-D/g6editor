<template>
  <white-gird-header title="告警类别分布">
    <e-charts :options="option" auto-resize></e-charts>
  </white-gird-header>
</template>

<script>
  import WhiteGirdHeader from "../WhiteGirdHeader";
  import {alarmCategory} from "./ChartOptions";
  import ECharts from "../../vue-echarts/ECharts";

  export default {
    components: {
      ECharts,
      WhiteGirdHeader},
    name: "alarm-category",
    data() {
      return {
        option: alarmCategory
      }
    },
    methods: {
      loadChart(data) {
        let indicator = [];
        let seriesValue = [];
        let max = 0;
        data.map((item) => {
          indicator.push({
            name: item.alarm_type_name,
          });
          seriesValue.push(item["count"]);
          item["count"] > max ? max = item["count"] : '';
        });
        indicator = indicator.map((item) => {
          item.max = max;
          return item;
        });
        this.option.radar.indicator = indicator;
        this.option.series[0].data[0].value = seriesValue;
      }
    },
    async created () {
      let data = await this.common.req('/ssa/alarmView/getRelationData.do', {}, this);
      // let data = [{"alarm_type":1,"count":12,"alarm_type_name":"告警类型1"},{"alarm_type":2,"count":1,"alarm_type_name":"告警类型2"},{"alarm_type":3,"count":1,"alarm_type_name":"告警类型3"}]

      this.loadChart(data);
    }
  }
</script>

<style scoped>

</style>