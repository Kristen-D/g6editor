<template>
  <white-gird-header title="处置情况占比">
    <e-charts :options="option" auto-resize></e-charts>
  </white-gird-header>
</template>

<script>
  import WhiteGirdHeader from "../WhiteGirdHeader";
  import ECharts from "../../vue-echarts/ECharts";
  import {alarmProportion} from "./ChartOptions";

  export default {
    components: {
      ECharts,
      WhiteGirdHeader},
    name: "alarm-proportion",
    data () {
      return {
        option: alarmProportion
      }
    }
  }
</script>

<style scoped>

</style>