<template>
  <big-screen-header
    title="被攻击省公司排行">
    <div class="clearfix">
      <div class="echartsbox2 float-l" style="width: 40%;">
        <e-charts :options="leftOption" auto-resize></e-charts>
      </div>
      <div class="echartsbox2 float-l" style="width: 60%;">
        <e-charts :options="rightOption" auto-resize></e-charts>
      </div>
    </div>
  </big-screen-header>
</template>

<script>
  import BigScreenHeader from "./BigScreenHeader";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {radar, pictorial} from "./chartOptions";
  import {GET_TREND_LIST} from '../store/const';

  export default {
    components: {
      ECharts,
      BigScreenHeader},
    name: "company-attack",
    data() {
      return {
        leftOption: radar,
        rightOption: pictorial
      }
    },
    computed: {
      company() {
        return this.$store.state.company;
      }
    },
    watch: {
      company(value) {
        let max = 0;
        value.map(v => { if (v.count > max) max = v.count; });
        let values = [];

        this.leftOption.radar.indicator = value.map(v => {
          values.push(v.count);
          return { name: v.name, max: max }
        });
        this.leftOption.series[0].data = values;
        this.getProvinceList(value);
      }
    },
    methods: {
      async getProvinceList(company) {
        let rightXAix = [];
        let dataArr = [];
        company.map(async v => {
          let temp = await this.$store.dispatch(GET_TREND_LIST, v.name);
          if (temp) {
            let a = [];
            if (rightXAix.length === 0) {
              temp.map(v => {
                rightXAix.push(v.time);
                a.push(v.count);
              });
            } else {
              temp.map(v => { a.push(v.count); });
            }
            dataArr.push(a);
          }
        });
        for (let i = 0; i < company.length; i++) {
          let temp = await this.$store.dispatch(GET_TREND_LIST, company[i].name);
          if (temp) {
            let a = [];
            if (rightXAix.length === 0) {
              temp.map(v => {
                rightXAix.push(v.time);
                a.push(v.count);
              });
            } else {
              temp.map(v => { a.push(v.count); });
            }
            dataArr.push(a);
          }
        }
        let ser = {...this.rightOption.series[0]};
        let series = [];
        dataArr.map(v => {
          let temp = {...ser};
          temp.data = v;
          series.push(temp);
        });
        this.rightOption.xAxis.data = rightXAix;
        this.rightOption.series = series;
      }
    }
  }
</script>

<style scoped>

</style>
