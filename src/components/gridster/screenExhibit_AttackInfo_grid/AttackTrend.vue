<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>攻击趋势</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="chart-container">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
  import ECharts from 'components/vue-echarts/ECharts'
  import {attackTrendOption} from './ChartOptions';

  export default {
    id: 'attackTrend',
    components: {ECharts},
    data() {
      return {
        option: attackTrendOption
      }
    },
    methods: {
      loadMapChart(data) {
        let lenData = [];
        let seriesData = [];
        let xAxis = [];
        let dataUnit;

        for (let i = 0; i < data.xAxis.length; i++) {
          xAxis.push(data.xAxis[i].toString().substring(4, 8));
        }

        for (let i = 0; i < data.EventTypePid.length; i++) {
          dataUnit = data.EventTypePid[i];
          lenData.push(dataUnit.name);
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
          dataUnit = data.lineData[i];
          let childData = {
            name: '攻击趋势',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 12,
            data: [],
            // ['18', '16', '20', '26', '20', '9', '10'],
            label: {
              normal: {
                show: true,
                position: 'top', //值显示
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#fff'
              }
            },
            lineStyle: {
              normal: {
                color: '#38b4ee'
              }
            }
          };


          for (let j = 0; j < dataUnit.length; j++) {
            if (dataUnit[j].event_type === 300) {
              let list = [];
              list.push(dataUnit[j].days.toString().substring(4, 8));
              list.push(dataUnit[j].count);
              childData.data.push(list);
            }
          }
          // console.log(childData.data);
          if (dataUnit[0].event_type === 300) {
            seriesData.push(childData);
          }
        }
        this.option.series = seriesData;
        this.option.xAxis.data = xAxis;
      }
    },
    created() {
      this.common.req('/ssa/situationAnaly/getLineByEventType.do', {dateRange: 'month'}, this).then((data) => {
        this.loadMapChart(data);
      });
    }
  }
</script>

