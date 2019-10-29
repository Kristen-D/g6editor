<template>
    <div class="echartbox2" id="flowDayPieA">
        <e-charts :options="option" auto-resize></e-charts>
    </div>
</template>
<script>
import { attackType } from "../CharOptions";
import ECharts from "components/vue-echarts/ECharts";

export default {
  components: {
    ECharts
  },
  data() {
    return {
      option: attackType
    };
  }
};
</script>