<template >
<div class="el-panel-white">
  <div class="el-panel-white-heading">
    <h3 class="el-panel-white-title">任务量趋势</h3>
    <el-tabs class="float-r day-tabs m-r--30" v-model="daytabs" @tab-click="changeTime">
      <el-tab-pane label="今天" name="1"></el-tab-pane>
      <el-tab-pane label="近7天" name="2"></el-tab-pane>
      <el-tab-pane label="近30天" name="3"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="el-panel-white-body">
    <div class="echartbox1" id="taskCountMap"></div>
  </div>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import echarts from 'echarts'
export default {


  data() {
    return {
      isOpen: false,
      currentIndex: -1,
      cacheData: [],
      params: {
        dateRange: 'month'
      },
      daytabs: "3"
    }
  },


  methods: {
    changeTime(value) {
      if (value.name == 1) {
        this.params.dateRange = "day";
      } else if (value.name == 2) {
        this.params.dateRange = "week";
      } else if (value.name == 3) {
        this.params.dateRange = "month";
      }
      this.loadMapChart();
    },

    async loadMapChart() {
      var data = await this.utils.req("/ssa/workBench/getLine.do", this.params);

      var myChart = echarts.init(document.getElementById("taskCountMap"));
      var seriesData = [];
      var xAxis = data.xAxis;


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
        list.push(data1[j].days.toString());
        list.push(data1[j].count);
        childData1.data.push(list);
        childData1.name = "事件处置";
      };
      seriesData.push(childData1);

      var data2 = data.caseInvestigate;

      for (var j = 0; j < data2.length; j++) {
        var list = [];
        list.push(data2[j].days.toString());
        list.push(data2[j].count);
        childData2.data.push(list);
        childData2.name = "案件调查";
      };
      seriesData.push(childData2);




      var dataUnit = data.warnMgmtProcess;
      for (var j = 0; j < dataUnit.length; j++) {
        var list = [];
        list.push(dataUnit[j].days.toString());
        list.push(dataUnit[j].count);
        childData4.data.push(list);
        childData4.name = "威胁预警";
      };
      seriesData.push(childData4);


      var data5 = data.classifiedP_UnitProcess;
      for (var j = 0; j < data5.length; j++) {
        var list = [];
        list.push(data5[j].days.toString());
        list.push(data5[j].count);
        childData5.data.push(list);
        childData5.name = "智能监管";
      };
      seriesData.push(childData5);




      var option = {
        legend: {
          left: '10',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 25,
          textStyle: {
            color: '#3E4956',
            fontSize: 12,
          },
          data: [

            {
              name: '威胁预警',
              icon: 'circle'
            }, {
              name: '事件处置',
              icon: 'circle'
            },

            {
              name: '智能监管',
              icon: 'circle'
            }, {
              name: '案件调查',
              icon: 'circle'
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          top: '15%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: '#E1E3E4'
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
              color: '#3E4956',
            },
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false,
          },
          data: xAxis
        }],
        yAxis: [{
          type: 'value',
          min: 0,
          splitNumber: 5,
          splitLine: { //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: '#E1E3E4'
            }
          },
          axisLine: { //坐标轴轴线相关设置。数学上的y轴
            show: true,
            lineStyle: {
              color: '#E1E3E4'
            },
          },
          axisLabel: {
            textStyle: {
              color: '#3E4956'
            },
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false,
          },
        }],
        series: seriesData
      }; // option结束

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.onresize = myChart.resize;
    }

  },

  mounted: async function() {
    this.loadMapChart();
  }

}
</script>
