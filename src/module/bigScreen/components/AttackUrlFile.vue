<template>
  <big-screen-header
    title="被攻击URL/文件排行">
    <ul class="list list-patch1">
      <li v-for="item in urlFile">
        <span class="">{{item.name}}</span>
        <!--<span class="">URL</span>-->
        <span class="float-r">{{item.count}}</span>
      </li>
    </ul>
    <div class="echartsbox4">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
  </big-screen-header>
</template>

<script>
  import BigScreenHeader from "./BigScreenHeader";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {url} from "./chartOptions";

  export default {
    components: {
      ECharts,
      BigScreenHeader},
    name: "attack-url-file",
    data() {
      return {
        option: url
      }
    },
    computed: {
      urlFile() {
        return this.$store.state.urlFile.slice(0, 3);
      },
      trendList() {
        return this.$store.state.trendList;
      }
    },
    watch: {
      trendList(value) {
        this.option.xAxis.data = value[0];
        this.option.series[0].data = value[1];
      }
    }
  }
</script>

<style scoped>

</style>
