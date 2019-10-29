<template>
  <white-gird-header title="URL反查图">
    <e-charts :options="option" auto-resize></e-charts>
  </white-gird-header>
</template>

<script>
  import WhiteGirdHeader from "../../WhiteGirdHeader";
  import {UrlRelation} from "./ChartOptions";
  import ECharts from "components/vue-echarts/ECharts";

  export default {
    components: {
      ECharts,
      WhiteGirdHeader},
    name: "url-relation",
    data () {
      return {
        option: UrlRelation
      }
    },
    methods: {
      loadChart(data) {
        let option = UrlRelation;
        let seriesData = [];
        let series = {};
        data.map(item => {
          if (!series[item['ip']]) {
            series[item['ip']] = [];
          }
          series[item['ip']].push(item['lookup']);
        });

        for (let dstIp in series) {
          let childData = {};
          childData.data = [{
            name: `目的IP\n{a|${dstIp}}`,
            symbolSize: 50,
          }];
          childData.links = [];
          series[dstIp].map((srcIp, index) => {
            childData.data.push({name: `源\n{a|${series[dstIp][index]}}`});
            childData.links.push({
              source: 0,
              target: index + 1
            });
          });
          seriesData.push(childData);
        }
        for (let i = 0; i < seriesData.length; i++) {
          this.option.series[i].data = [];
          this.option.series[i].links = [];
          for (let j = 0; j < seriesData[i].data.length; j++) {
            this.option.series[i].data.push(seriesData[i].data[j]);
            if(j < seriesData[i].links.length) {
              this.option.series[i].links.push(seriesData[i].links[j]);
            }
          }
        }

        console.log(  this.option.series);
      }
    },
    async created () {
    let data = await this.common.req('/ssa/blackURL/UrlRelation.do', {}, this);
  //    let data = [{"lookup":"12.40.234.41","ip":"192.168.2.33"},{"lookup":"121.40.234.41","ip":"192.168.2.225"},{"lookup":"121.40.234.46","ip":"192.168.2.225"},{"lookup":"121.40.234.43","ip":"192.168.2.225"},{"lookup":"121.40.234.44","ip":"192.168.2.225"},{"lookup":"121.40.234.45","ip":"192.168.2.225"},{"lookup":"121.40.234.47","ip":"192.168.2.225"},{"lookup":"121.40.190.14","ip":"111.32.129.30"},{"lookup":"121.40.190.19","ip":"111.32.129.30"},{"lookup":"121.40.190.20","ip":"111.32.129.30"},{"lookup":"121.40.190.21","ip":"111.32.129.30"},{"lookup":"121.40.190.22","ip":"111.32.129.30"},{"lookup":"121.40.190.23","ip":"111.32.129.30"}];
   this.loadChart(data);
    }
  }
</script>

<style scoped>

</style>
