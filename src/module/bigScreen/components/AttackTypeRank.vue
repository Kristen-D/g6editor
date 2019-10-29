<template>
  <big-screen-header
    title="攻击类型排行">
    <div class="echartsbox3">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
  </big-screen-header>
</template>

<script>
  import BigScreenHeader from "./BigScreenHeader";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {attack} from "./chartOptions";

  export default {
    components: {
      ECharts,
      BigScreenHeader},
    name: "attack-type-rank",
    data () {
      return {
        option: attack
      }
    },
    computed: {
      attack() {
        return this.$store.state.attack;
      }
    },
    watch: {
      attack(value) {
        this.option.xAxis.data = value[0];
        this.option.series[0].data = value[1];
      }
    }
  }
</script>

<style scoped>

</style>
