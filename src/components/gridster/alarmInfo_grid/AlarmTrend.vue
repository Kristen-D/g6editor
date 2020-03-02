<template>
  <white-gird-header title="趋势">
    <e-charts :options="option" auto-resize></e-charts>
  </white-gird-header>
</template>

<script>
  import WhiteGirdHeader from "../WhiteGirdHeader";
  import {alarmTrend} from "./ChartOptions";
  import ECharts from "../../vue-echarts/ECharts";

  export default {
    components: {
      ECharts,
      WhiteGirdHeader},
    name: "alarm-trend",
    data() {
      return {
        option: alarmTrend
      }
    }
  }
</script>

<style scoped>

</style>