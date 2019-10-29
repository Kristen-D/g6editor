<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>网络攻击态势</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="box">
        <span class="box-tl"></span>
        <span class="box-br"></span>
        <el-row>
          <el-col :span="16">
            <div class="chart-container">
              <e-charts :options="option" auto-resize></e-charts>
            </div>
          </el-col>
          <el-col :span="8">
            <threat-level></threat-level>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {geoCoordMap, netAttackSituation} from "./ChartOptions";
  import ECharts from "../../vue-echarts/ECharts";
  import ThreatLevel from "./ThreatLevel";

  export default {
    components: {
      ThreatLevel,
      ECharts},
    data() {
      return {
        Geodata: [],
        Mapdata:[],
        ipList:[],
        myData:[],
        option: netAttackSituation
      }
    },
    methods: {
      getInitData() {
        this.Geodata=[];
        this.Mapdata=[];
        this.ipList=[];
        this.myData=[];
        this.common.req('/ssa/hitLibrary/getGeoCoordMap.do', {dateRange: 'month'}, this).then((data) => {
          this.Geodata = data;
          this.getInitData2();
        })
      },
      getInitData2() {
        this.common.req('/ssa/netAttack/getEventSrcIpOnMap.do', {dateRange: 'month'}, this).then((data) => {
          this.Mapdata = data.result;
          this.loadMapChart();
        })
      },
      loadMapChart() {
        for (let i = 0; i < this.Geodata.length; i++) {
          let dataUnit = this.Geodata[i];
          let list=[];
          let strs; //定义一数组
          strs = dataUnit.mycode.split(","); //字符分割
          list.push(strs[0]);
          list.push(strs[1]);
          geoCoordMap[dataUnit.name]=list;
        }

        for (let i = 0; i < this.Mapdata.length; i++) {
          let dataUnit = this.Mapdata[i];
          let child={
            name: '1',
            value: 0
          };
          child.name=dataUnit.ipSourceName;
          child.value=dataUnit.total;
          this.myData.push(child);
        }


        let taiyuanCoord=[111.549248, 36.857014];
        let srcNam='太原市';

        function formtGCData(geoData, data, dest) {
          let tGeoDt = [];
          if (dest) {
            for (let i = 0, len = data.length; i < len; i++) {
              if (srcNam != data[i].name&&geoData[data[i].name]!=undefined) {
                tGeoDt.push({
                  coords: [taiyuanCoord, geoData[data[i].name]]
                });
              }
            }
          } else {
            for (let i = 0, len = data.length; i < len; i++) {
              if (srcNam != data[i].name&&geoData[data[i].name]!=undefined) {
                tGeoDt.push({
                  coords: [geoData[data[i].name], taiyuanCoord]
                });
              }
            }
          }
          return tGeoDt;
        }

        function formtVData(geoData, data) {
          let tGeoDt = [];
          for (let i = 0, len = data.length; i < len; i++) {
            let tNam = data[i].name
            if (srcNam != tNam&&geoData[tNam]!=undefined) {
              tGeoDt.push({
                name: tNam,
                value: geoData[tNam],
                symbolSize: 10,
                fromName: tNam,
                toName: srcNam,
                total:data[i].value,
              });
            }

          }
          tGeoDt.push({
            name: srcNam,
            value: taiyuanCoord,
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#1800ff',
                borderColor: '#fff'
              }
            }
          });
          return tGeoDt;
        }

        this.option.series[0].data = formtGCData(geoCoordMap, this.myData, false);
        this.option.series[1].data = formtVData(geoCoordMap, this.myData);
      }
    },
    created () {
      this.getInitData();
    }
  }
</script>

<style scoped>
  .box {
    height: 100%;
  }
  .box .el-row,
  .box .el-row .el-col {
    height: 100%;
  }
</style>
