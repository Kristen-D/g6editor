<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>攻击源占比
      </h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="chart-container">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
  import {attackSourcePro} from "./ChartOptions";
  import ECharts from "../../vue-echarts/ECharts";

  export default {
    components: {ECharts},
    id: 'attackSourcePro',
    data() {
      return {
        option: attackSourcePro
      }
    },
    methods: {
      loadMapChart(data) {
        let seriesData = [];
        let Mapdata = data.result;
        let dataSize = 10;
        if (Mapdata.length < 10) {
          dataSize = Mapdata.length;
        }
        for (let i = 0; i < dataSize; i++) {
          let dataUnit = Mapdata[i];
          let child = {
            value: 19,
            name: '中国',
          };
          child.name = dataUnit.ipSourceName;
          child.value = dataUnit.total;
          seriesData.push(child);
        }
        console.log('s', seriesData)
        this.option.series[0].data = seriesData;
      },
      getColor() {
        return "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16);
      },
    },
    created () {
      this.common.req('/ssa/netAttack/getEventSrcIpOnMap.do', {dateRange: 'month'}, this).then((data) => {
        console.log(data)
        this.loadMapChart(data);
      })
    }
  }
</script>
