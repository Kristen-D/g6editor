<template>
  <div >
  <span class="left-top"></span><span class="left-bottom"></span>
		<span class="right-top"></span><span class="right-bottom"></span>
		<div class="el-panel-heading">
			<h4 class="el-panel-title">URL反查</h4>
		</div>
		<div class="el-panel-body shine m-b-20 " >
      <el-row :gutter="50">
				<el-col :span="24"><div class="echartsbox3" id="Graph1"><e-charts :options="option" auto-resize></e-charts></div></el-col>
			</el-row>

			<!-- <el-row :gutter="50">
				<el-col :span="8"><div class="echartsbox3" id="Graph1"></div></el-col>
				<el-col :span="8"><div class="echartsbox3" id="Graph2"></div></el-col>
				<el-col :span="8"><div class="echartsbox3" id="Graph3"></div></el-col>
			</el-row> -->
		</div>
  </div>
</template>

<script>
  import {UrlRelation} from "../ChartOptions";
  import ECharts from "components/vue-echarts/ECharts";

  export default {
    components: {
      ECharts},
    name: "url-relation",
    data () {
      return {
        option: UrlRelation,
        lookupData:{},
      }
    },
    methods: {
      loadChart(data) {
        let option = UrlRelation;
        let seriesData = [];
        let series = {};
        let IpData={};
        data.map(item => {
          if (!series[item['ip']]) {
            series[item['ip']] = [];
          }
          series[item['ip']].push(item['lookup']);
        });

        data.forEach(item => {
          this.lookupData[item['lookup']] = item;
        });

        for (let dstIp in series) {
          let childData = {};
          childData.data = [{
            name: `${dstIp}`,
          }];
          // console.log(childData.data);
          childData.links = [];
          series[dstIp].map((srcIp, index) => {
            childData.data.push({name: `${series[dstIp][index]}`});
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
          this.option.series[i].IpData =IpData;
          // console.log(this.option.series[i].IpData);
          for (let j = 0; j < seriesData[i].data.length; j++) {
            this.option.series[i].data.push(seriesData[i].data[j]);
            if(j < seriesData[i].links.length) {
              this.option.series[i].links.push(seriesData[i].links[j]);
            }
          }
        }
        this.option.tooltip.formatter = this.formatter;
        // console.log(this.option.series);
          // console.log(this.option.tooltip.formatter);
      },
     formatter(param){
      var data=this.lookupData[param.name];
      if(this.lookupData[param.name]){
        return  "来源："+param.name+"<br/>最新时间："+data['collect_date']+"";
      }
        return "来源："+param.name+"";
      }
    },
    async created () {
    let data = await this.common.req('/ssa/blackURL/UrlRelation.do', {}, this);
    this.loadChart(data);
    }
  }
</script>

<style scoped>

</style>
