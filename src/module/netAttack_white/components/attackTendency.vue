<template>
    <div class="echartbox2" id="line2">
        <e-charts :options="option" auto-resize></e-charts>
    </div>
</template>
<script>
import { attackTendency } from "../CharOptions";
import ECharts from "components/vue-echarts/ECharts";

export default {
  components: {
    ECharts
  },
  data(){
      return{
          option:attackTendency
      }
  }
};
</script>