<template>

</template>

<script>
import echarts from 'echarts'
export default {
  methods: {
    loadMapChart() {
      window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
