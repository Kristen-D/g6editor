<template>
  <white-gird-header title="URL分布图">
    <e-charts :options="option" auto-resize></e-charts>
  </white-gird-header>
</template>

<script>
  import WhiteGirdHeader from "../../WhiteGirdHeader";
  import {UrlDistribution} from "./ChartOptions";
  import ECharts from "components/vue-echarts/ECharts";

  export default {
    components: {
      ECharts,
      WhiteGirdHeader},
    name: "url-relation",
    data () {
      return {
        option: UrlDistribution
      }
    },
    methods: {
      loadChart(data) {
        console.log(data);
this.option.series[0].data =data;
      }
    },
    async created () {
       let data = await this.common.req('/ssa/blackURL/UrlDistribution.do', {}, this);
  this.loadChart(data);
    }
  }
</script>
