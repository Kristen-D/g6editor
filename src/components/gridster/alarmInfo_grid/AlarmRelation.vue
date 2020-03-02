<template>
  <white-gird-header title="告警关系图">
    <e-charts :options="option" auto-resize></e-charts>
  </white-gird-header>
</template>

<script>
  import WhiteGirdHeader from "../WhiteGirdHeader";
  import {alarmRelation} from "./ChartOptions";
  import ECharts from "../../vue-echarts/ECharts";

  export default {
    components: {
      ECharts,
      WhiteGirdHeader},
    name: "alarm-relation",
    data () {
      return {
        option: alarmRelation
      }
    },
    methods: {
      loadChart(data) {
        let option = alarmRelation;
        let seriesData = [];
        let series = {};
        data.map(item => {
          if (!series[item['dst_ip']]) {
            series[item['dst_ip']] = [];
          }
          series[item['dst_ip']].push(item['src_ip']);
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
      }
    },
    async created () {
      let data = await this.common.req('/ssa/alarmView/getRelationData.do', {}, this);
      // let data = [{"src_ip":"12.40.234.41","dst_ip":"192.168.2.33"},{"src_ip":"121.40.234.41","dst_ip":"192.168.2.225"},{"src_ip":"121.40.234.46","dst_ip":"192.168.2.225"},{"src_ip":"121.40.234.43","dst_ip":"192.168.2.225"},{"src_ip":"121.40.234.44","dst_ip":"192.168.2.225"},{"src_ip":"121.40.234.45","dst_ip":"192.168.2.225"},{"src_ip":"121.40.234.47","dst_ip":"192.168.2.225"},{"src_ip":"121.40.190.14","dst_ip":"111.32.129.30"},{"src_ip":"121.40.190.19","dst_ip":"111.32.129.30"},{"src_ip":"121.40.190.20","dst_ip":"111.32.129.30"},{"src_ip":"121.40.190.21","dst_ip":"111.32.129.30"},{"src_ip":"121.40.190.22","dst_ip":"111.32.129.30"},{"src_ip":"121.40.190.23","dst_ip":"111.32.129.30"}];
      this.loadChart(data);
    }
  }
</script>

<style scoped>

</style>