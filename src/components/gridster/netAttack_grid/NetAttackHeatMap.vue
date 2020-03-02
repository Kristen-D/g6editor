<template>
  <div class="el-panel-bigscreen mygrid-def">
    <div class="el-panel-bigscreen-body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane :label="m.name" :name="m.value" v-for="m in seriesData"></el-tab-pane>
      </el-tabs>
      <div class="chart-container">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>

  import ECharts from "../../vue-echarts/ECharts";
  import {netAttackHeatMap} from "./ChartOptions";

  export default {
    components: {ECharts},
    data() {
      return {
        isOpen: false,
        seriesData: [],
        activeName: 'all',
        option: netAttackHeatMap,
        params: {event_type:null}
      }
    },
    methods: {
      async loadMapChart() {
        let data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnLine.do", this.params);
        let seriesData = this.fmtData(data);
        
        this.option.xAxis[0].data = seriesData.lenData;
        this.option.series[0].data = seriesData.d;
        this.option.series[1].data = seriesData.h;
        this.option.series[2].data = seriesData.m;
      },
      fmtData(data) {
        let lData0 = [];
        let lData1 = [];
        let lData2 = [];
        let dMap = new Map();
        let mMap = new Map();
        let hMap = new Map();
        data.dRisk.forEach((d) => {
          lData0.push(d.days);
          dMap.set(d.days, d.total);
        });
        data.mRisk.forEach((m) => {
          lData1.push(m.days);
          mMap.set(m.days, m.total);
        });
        data.hRisk.forEach((h) => {
          lData2.push(h.days);
          hMap.set(h.days, h.total);
        });
        let lenData = this.getArray(lData1.concat(lData2).concat(lData0));
        let d = [];
        let m = [];
        let h = [];
        lenData.sort().forEach((l) => {
          if (dMap.get(l)) {
            d.push(dMap.get(l));
          } else {
            d.push(0);
          }
          if (mMap.get(l)) {
            m.push(mMap.get(l));
          } else {
            m.push(0);
          }
          if (hMap.get(l)) {
            h.push(hMap.get(l));
          } else {
            h.push(0);
          }
        });
        return {
          lenData, d, m, h
        };
      },
      getArray(a) {
        let hash = {},
            len = a.length,
            result = [];
        for (let i = 0; i < len; i++) {
          if (!hash[a[i]]) {
            hash[a[i]] = true;
            result.push(a[i]);
          }
        }
        return result;
      },
      handleClick(tab, event) {
        this.params.event_subtype = tab.name;
        this.loadMapChart();
      },
    },
    async created () {
      let params = [];
      let data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnTab.do", params);

      let seriesData = [];
      for (let i = 0; i < data.length; i++) {
        let dataUnit = data[i];
        let childData = {};
        childData.value = (dataUnit.event_subtype).toString();
        childData.name = dataUnit.name;
        seriesData.push(childData);
      }
      this.seriesData = seriesData;
    },
    async mounted () {
      this.loadMapChart();
    }
  }
</script>

<style scoped>
  .chart-container {
    height: 90%;
  }
</style>
