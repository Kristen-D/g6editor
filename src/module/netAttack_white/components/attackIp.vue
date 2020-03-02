<template>
    <div class="echartbox2" id="flowDayBarA">
        <e-charts :options="option" auto-resize></e-charts>
    </div>
</template>

<script>
import { attackIp } from "../CharOptions";
import ECharts from "components/vue-echarts/ECharts";

export default {
  components: {
    ECharts
  },
  data() {
    return {
      option: attackIp
    };
  }
};
</script>