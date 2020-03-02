<template>
  <big-screen-header
    title="网站区域访问量">
    <div class="echartsbox1">
      <e-charts auto-resize :options="option"></e-charts>
    </div>
  </big-screen-header>
</template>

<script>
  import BigScreenHeader from "./BigScreenHeader";
  import {access} from "./chartOptions";
  import ECharts from "../../../components/vue-echarts/ECharts";

  export default {
    components: {
      ECharts,
      BigScreenHeader},
    name: "access-amount",
    data() {
      return {
        option: access
      }
    },
    computed: {
      visited() {
        return this.$store.state.visited;
      }
    },
    watch: {
      visited(value) {
        let max = 0, total = 0;
        value.number.map(v => {
          if (v > max) max = v;
          total += v;
        });
        this.option.series[1].data = value.number.map(v => {
          return max + 10;
        });
        this.option.yAxis[0].data = value.area;
        this.option.series[0].data = value.number;
        this.option.title.text = String(total);
      }
    }
  }
</script>

<style scoped>

</style>
