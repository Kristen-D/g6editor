<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title">网络攻击 — 外部攻击</h3>
      <el-tabs class="float-r day-tabs text-white" v-model="params.dateRange" @tab-click="changeTime">
        <el-tab-pane label="今天" name="day"></el-tab-pane>
        <el-tab-pane label="近7天" name="week"></el-tab-pane>
        <el-tab-pane label="近30天" name="month"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="el-panel-bigscreen-body">
      <e-charts :options="option" auto-resize></e-charts>
    </div>
  </div>
</template>

<script>

  import ECharts from "../../vue-echarts/ECharts";
  import {chinaMap} from "./ChartOptions";
  import {geoCoordMap} from "../../js/geoCoordMap";

  export default {
    components: {ECharts},
    data() {
      return {
        params: {dateRange: 'month'},
        option: chinaMap
      }
    },
    methods: {
      async loadMapChart() {
        let Geodata = await this.commonAjax.req("/ssa/hitLibrary/getGeoCoordMap.do", this.params);
        let data = await this.commonAjax.req('/ssa/netAttack/getEventSrcIpOnMap.do', this.params);
        let Mapdata = data.result;

        for (let i = 0; i < Geodata.length; i++) {
          let dataUnit = Geodata[i];
          let list = [];
          let strs = []; //定义一数组
          strs = Geodata[i].mycode.split(","); //字符分割
          list.push(strs[0]);
          list.push(strs[1]);
          geoCoordMap[Geodata[i].name] = list;
        }

        let allData = {
          "moveLines": []
        };

        let mapStr = []; //定义一数组
        let toName = "";
        let tianjinCoord = [];
        mapStr = data.netAttackOutSideMap.split(","); //字符分割
        toName = mapStr[0];
        tianjinCoord.push(mapStr[1]);
        tianjinCoord.push(mapStr[2]);

        for (let i = 0; i < Mapdata.length; i++) {
          let dataUnit = Mapdata[i];
          let geoCoord = geoCoordMap[dataUnit.ipSourceName];
          let coords = [];
          coords.push(geoCoord);
          coords.push(tianjinCoord);
          if (geoCoord != null) {
            allData.moveLines.push({
              "fromName": dataUnit.ipSourceName,
              //  "toName": "太原市",
              "toName": toName,
              "total": dataUnit.total,
              "coords": coords
            });
          }
        }
        this.option.series[0].data = allData.moveLines;
      },
      changeTime () {
        this.loadMapChart();
      }
    },
    mounted() {
      this.loadMapChart();
    }
  }
</script>

<style>
  .day-tabs .el-tabs__item {
    color: white;
  }
</style>
