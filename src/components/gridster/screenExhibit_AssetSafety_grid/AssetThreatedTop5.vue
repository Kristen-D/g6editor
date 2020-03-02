<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>普通资产受威胁TOP5</h3>
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
  import {fmtEventTypeList} from "../../js/functionUtil";
  import {assetThreatedTop} from "./ChartOptions";

  export default {
    components: {ECharts},
    data () {
      return {
        option: assetThreatedTop
      }
    },
    methods: {
      getInitData() {
        this.common.req('/ssa/screenExhibit/getEventTypeTop5ByNoKey.do', {dateRange: 'week'}, this).then((data) => {
          this.loadMapChart(data);
        })
      },
      async loadMapChart(data) {
        let lenData = [];
        let seriesData = [];
        let xAxis = [];
        let MyXAxis = [];

        for (let i = 0; i < data[0].length; i++) {
          let dataUnit = data[0][i];
          xAxis.push(dataUnit.event_dest_ip);
        }

        for (let i = 0; i < data[0].length; i++) {
          let dataUnit = data[0][i];
          MyXAxis.push(dataUnit.assert_name + "\n" + dataUnit.event_dest_ip);
        }

        for (let i = 0; i < data[1].length; i++) {
          let dataUnit = data[1][i];
          lenData.push(dataUnit.event_type);
        }

        for (let i = 0; i < lenData.length; i++) {
          let childData = {
            name: '1',
            type: 'bar',
            stack: '总数',
            barWidth: 15,
            data: []
          };
          childData.name = (await fmtEventTypeList(this))[lenData[i]];
          for (let j = 0; j < xAxis.length; j++) {
            let isOk = 0;
            for (let k = 0; k < data[2].length; k++) {
              let dataUnit = data[2][k];
              if (dataUnit.event_type == lenData[i] && dataUnit.event_dest_ip == xAxis[j]) {
                childData.data.push(dataUnit.count);
                isOk = 1;
              }
            }
            if (isOk == 0) {
              childData.data.push(0);
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
          // console.log(childData);
        }
        this.option.series = seriesData;
        this.option.legend.data = myLenData;
        this.option.xAxis.data = MyXAxis;
      }
    },
    created() {
      this.getInitData();
    }
  }
</script>

