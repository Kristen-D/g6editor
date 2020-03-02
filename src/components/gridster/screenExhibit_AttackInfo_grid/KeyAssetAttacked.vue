<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>重要资产受攻击</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="chart-container">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
  import {keyAssetAttacked} from "./ChartOptions";
  import ECharts from 'components/vue-echarts/ECharts';
  import {fmtEventTypeList} from "../../js/functionUtil";

  export default {
    id: 'keyAssetAttacked',
    components: {ECharts},
    data () {
      return {
        option: keyAssetAttacked
      }
    },
    methods: {
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
          lenData.push(dataUnit.event_subtype);
        }

        for (let i = 0; i < lenData.length; i++) {
          let childData = {
            name: '1',
            type: 'bar',
            stack: '总数',
            barWidth: 14,
            data: []
          };
          childData.name = (await fmtEventTypeList(this))[lenData[i]];
          for (let j = 0; j < xAxis.length; j++) {
            let isOk = 0;
            for (let k = 0; k < data[2].length; k++) {
              let dataUnit = data[2][k];
              if (dataUnit.event_subtype === lenData[i] && dataUnit.event_dest_ip === xAxis[j]) {
                childData.data.push(dataUnit.count);
                isOk = 1;
              }
            }
            if (isOk === 0) {
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
        }
        console.log(MyXAxis, myLenData, seriesData);
        this.option.xAxis.data = MyXAxis;
        this.option.legend.data = myLenData;
        this.option.series = seriesData;
      }
    },
    async created () {
      let data = await this.common.req('/ssa/screenExhibit/getEventSubTypeTop5NetAttack.do', {dateRange: 'week'}, this);
      this.loadMapChart(data);
    }
  }
</script>

