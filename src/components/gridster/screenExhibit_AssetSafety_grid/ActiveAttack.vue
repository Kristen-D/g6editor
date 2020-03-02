<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>活跃攻击类型</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="chart-container">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
  import ECharts from "../../vue-echarts/ECharts";
  import {eventRiskList} from "../../js/functionUtil";
  import {activeAttack} from "./ChartOptions";

  export default {
    components: {ECharts},
    data () {
      return {
        option: activeAttack
      }
    },
    methods: {
      getInitData() {
        this.common.req('/ssa/screenExhibit/getLineByRiskLevel.do', {dateRange: 'week'}, this).then((data) => {
          this.loadMapChart(data);
        })
      },
      loadMapChart(data) {
        let lenData = [];
        let seriesData = [];
        let xAxis = [];

        for (let i = 0; i < data.xAxis.length; i++) {
          xAxis.push(data.xAxis[i].toString().substring(4, 8));
        }

        for (let i = 0; i < data.RiskLevelId.length; i++) {
          let dataUnit = data.RiskLevelId[i];
          lenData.push(eventRiskList[dataUnit.id]);
        }

        let myLenData = [];
        for (let i = 0; i < lenData.length; i++) {
          let childData = {
            name: '登出',
            icon: 'circle'
          };
          childData.name = lenData[i];
          myLenData.push(childData);
        }

        for (let i = 0; i < data.lineData.length; i++) {
          let dataUnit = data.lineData[i];
          let childData = {
            name: '1',
            type: 'scatter',
            data: []
          };
          for (let j = 0; j < dataUnit.length; j++) {
            let list = [];
            list.push(dataUnit[j].days.toString().substring(4, 8));
            list.push(dataUnit[j].count);
            childData.data.push(list);
            childData.name = eventRiskList[dataUnit[j].event_risk_level];
          }
          // console.log(childData.data);
          seriesData.push(childData);
        }
        this.option.legend.data = myLenData;
        this.option.xAxis.data = xAxis;
        this.option.series = seriesData;
      }
    },
    created () {
      this.getInitData();
    }
  }
</script>

