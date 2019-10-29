<template>
  <qinshan-component-panel title="邮件检测">
    <e-charts :options="option" auto-resize></e-charts>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {mailCheck} from "./ChartOptions";

  export default {
    components: {
      ECharts,
      QinshanComponentPanel},
    name: "mail-check",
    data() {
      return {
        option: mailCheck
      }
    },
    methods: {
      loadChart(data) {
        let seriesData = [
            data[0]["mailNormal_s"], data[0]["mailSpam_s"], data[0]["mailVirus_s"]
        ];
        let total = data[0]["mailNormal_s"] + data[0]["mailVirus_s"] + data[0]["mailSpam_s"];
        this.option.series[0].data = seriesData;
        this.option.title.text[1] = `'{x|${total}}'`;
      },
        async refreshData(){
          let data = await this.common.req('/ssa/screenExhibit/getMailList.do',
              {dataRange: 'month'}, this);
          // let data = [{"mailNormal_s":4255923.0,"mailVirus_s":338.0,"mailSpam_s":416599.0}];
          if(data[0]!=undefined){
            this.loadChart(data);
          }


        }
    },
   created () {
     this.refreshData();
     setInterval(() => {
       this.refreshData();
     }, 60000);
    },

  }
</script>

<style scoped>

</style>
