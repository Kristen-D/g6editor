<template>

</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState({
      // areaId: state => state.context.params.areaId,
      // appraisalCycle: state => state.context.params.appraisalCycle,
    })
  },
  watch: {
    // areaId: function() {
    //   this.getInitData();
    // },
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/ebankpoc/getOwaspStatistics.do', {}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      myChart.setOption(option);
      window.onresize = myChart.resize;
    },
  },
  mounted: function() {
    // this.getInitData();
    this.loadMapChart({});
  }
}
</script>

<style>
</style>
