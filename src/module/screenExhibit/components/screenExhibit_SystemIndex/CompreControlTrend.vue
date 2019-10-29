<template>
<div class="echartsbox3" id="comprehensivecontroltrend"></div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===0) {
        this.getInitData();
      }
    }
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/workBench/getLine.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('comprehensivecontroltrend'));

      var seriesData = [];
      var xAxis = [];
      for(var i = 0; i < data.xAxis.length; i++){
          xAxis.push(data.xAxis[i].toString().substring(4,8));
      };


      var childData4 = {
        name: '威胁预警',
        type: 'line',
        smooth: true,
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#f72e00", // 会设置点和线的颜色，所以需要下面定制 line
            borderColor: "#fff" // 点边线的颜色
          }
        },
        lineStyle: { // 线条样式
          normal: {
            width: 3,
            color: "#f72e00"
          }
        },
        data: []
      };
      var childData1 = {
        name: '事件处置',
        type: 'line',
        smooth: true,
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#1286fd", // 会设置点和线的颜色，所以需要下面定制 line
            borderColor: "#fff" // 点边线的颜色
          }
        },
        lineStyle: { // 线条样式
          normal: {
            width: 3,
            color: "#1286fd"
          }
        },
        data: []
      };








      var childData5 = {
        name: '智能监管',
        type: 'line',
        smooth: true,
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#CCEEFF ", // 会设置点和线的颜色，所以需要下面定制 line
            borderColor: "#fff" // 点边线的颜色
          }
        },
        lineStyle: { // 线条样式
          normal: {
            width: 3,
            color: "#CCEEFF"
          }
        },
        data: []
      };

      var childData2 = {
        name: '案件调查',
        type: 'line',
        smooth: true,
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#f53c61", // 会设置点和线的颜色，所以需要下面定制 line
            borderColor: "#fff" // 点边线的颜色
          }
        },
        lineStyle: { // 线条样式
          normal: {
            width: 3,
            color: "#f53c61"
          }
        },
        data: []
      };


      var data1 = data.eventMgmtProcess;

      for (var j = 0; j < data1.length; j++) {
        var list = [];
        list.push(data1[j].days.toString().substring(4,8));
        list.push(data1[j].count);
        childData1.data.push(list);
        childData1.name = "事件处置";
      };
      seriesData.push(childData1);

      var data2 = data.caseInvestigate;

      for (var j = 0; j < data2.length; j++) {
        var list = [];
        list.push(data2[j].days.toString().substring(4,8));
        list.push(data2[j].count);
        childData2.data.push(list);
        childData2.name = "案件调查";
      };
      seriesData.push(childData2);




      var dataUnit = data.warnMgmtProcess;
      for (var j = 0; j < dataUnit.length; j++) {
        var list = [];
        list.push(dataUnit[j].days.toString().substring(4,8));
        list.push(dataUnit[j].count);
        childData4.data.push(list);
        childData4.name = "威胁预警";
      };
      seriesData.push(childData4);


      var data5 = data.classifiedP_UnitProcess;
      for (var j = 0; j < data5.length; j++) {
        var list = [];
        list.push(data5[j].days.toString().substring(4,8));
        list.push(data5[j].count);
        childData5.data.push(list);
        childData5.name = "智能监管";
      };
      seriesData.push(childData5);





      let option = {
        // backgroundColor: '#091323',
        color: ['#ffdd3f', '#ff8400', '#f53c61', '#50fca8', '#f53c61'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '0',
          left: '0',
          padding: [10, 20, 0, 20],
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          data: [{
              name: '威胁预警',
              icon: 'circle'
            },
            {
              name: '事件处置',
              icon: 'circle'
            },
            {
              name: '案件调查',
              icon: 'circle'
            },
            {
              name: '智能监管',
              icon: 'circle'
            }
          ],
          selected: {
            '威胁预警': true,
            '事件处置': true,
            '案件调查': true,
            '智能监管': true
          },
          textStyle: {
            color: '#dededf'
          }
        },
        grid: {
          left: '0',
          right: '3%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#23303f'],
              type: 'solid'
            }
          },
          data: xAxis
        },
        yAxis: {
          min: 0,
          max: 25,
          interval: 5,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            //    onZero:false
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#23303f'],
              type: 'solid'
            }
          }
        },
        series: seriesData
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    // this.getInitData();
  }
}
</script>

<style lang="css">
</style>
