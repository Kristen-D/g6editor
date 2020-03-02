<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>重要单位受攻击</h3>
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
  import {keyInstAttacked} from "./ChartOptions";
  import {fmtEventTypeList} from "../../js/functionUtil";

  export default {
    id: 'keyInstAttacked',
    components: {ECharts},
    data() {
      return {
        option: keyInstAttacked
      }
    },
    methods: {
      async loadMapChart(data) {
        let lenData = [];
        let seriesData = [];
        let yAxis = [];
        let colorData = [];

        for (let i = 0; i < data[0].length; i++) {
          let dataUnit = data[0][i];
          yAxis.push(dataUnit.org_name);
        }

        for (let i = 0; i < data[1].length; i++) {
          let dataUnit = data[1][i];
          lenData.push(dataUnit.event_subtype);
        }

        for (let i = 0; i < lenData.length; i++) {
          let yLength = 0;
          let childData = {
            name: '1',
            type: 'bar',
            stack: '总数',
            barWidth: 12,
            barGap: 10,
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            data: []
          };
          childData.name = (await fmtEventTypeList(this))[lenData[i]];
          for (let j = 0; j < yAxis.length; j++) {
            let isOk = 0;
            for (let k = 0; k < data[2].length; k++) {
              let dataUnit = data[2][k];
              if (dataUnit.event_subtype == lenData[i] && dataUnit.org_name == yAxis[j]) {
                isOk = 1;
                if (yLength < 5) {
                  childData.data.push(dataUnit.count);
                  yLength = yLength + 1;
                }
              }
            }

            if (isOk == 0) {
              if (yLength < 5) {
                childData.data.push(0);
                yLength = yLength + 1;
              }
            }
          }
          seriesData.push(childData);
        }
        let myLenData = [];
        for (let i = 0; i < lenData.length; i++) {
          let childData = {
            name: '登出',
            icon: 'circle'
          };
          childData.name = (await fmtEventTypeList(this))[lenData[i]];
          myLenData.push(childData);
          colorData.push(this.getColor());
          // console.log(childData);
        }
        this.option.series = seriesData;
        this.option.yAxis.data = yAxis;
        this.option.legend.data = myLenData;
      },
      getColor() {
        return "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16);
      },
    },
    created() {
      this.common.req('/ssa/screenExhibit/getOrgEventType.do', {dateRange: 'month'}, this).then((data) => {
        this.loadMapChart(data);
      })
    }
  }
</script>

