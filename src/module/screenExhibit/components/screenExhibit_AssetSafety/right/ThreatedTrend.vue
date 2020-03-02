<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>受威胁趋势</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox10" id="threatedtrend"></div>
  </div>
</div>
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
      if(this.activeScreen===3) {
        this.getInitData();
      }
    }
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/screenExhibit/getLineProductName.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('threatedtrend'));



      var lenData = [];
      var seriesData=[];
      var xAxis = [];

      for(var i = 0; i < data.xAxis.length; i++){
          xAxis.push(data.xAxis[i].toString().substring(4,6)+"月");
      };

      for(var i = 0; i < data.productNameList.length; i++){
        var dataUnit = data.productNameList[i];
          lenData.push(dataUnit.product_name);
      };


      var myLenData=[];
      for(var i = 0; i < lenData.length; i++){
        var childData =  {
                    name: '登出',
                    icon:'circle'
        };
          childData.name=lenData[i];
          myLenData.push(childData);
      };


      for(var i = 0; i < data.lineData.length; i++){
        var dataUnit = data.lineData[i];
        var childData={
          name: '1',
          type: 'bar',
          barWidth: 5,
          barGap: 1,
          barCategoryGap: 30,
          data: []
                    };



      for(var j = 0; j < dataUnit.length; j++){
          var list=[];
          list.push(dataUnit[j].days.toString().substring(4,6)+"月");
          list.push(dataUnit[j].count);
          childData.data.push(list);
          childData.name=dataUnit[j].product_name;
      };
      // console.log(childData.data);
      seriesData.push(childData);
      };




      let option = {
        color: ['#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#546e7a'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          }
        },
        legend: {
          left: 5,
          //top: 5,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            //fontSize: 14,
            color: '#dededf'
          },
          data: myLenData
        },
        grid: {
          left: 5,
          top: 60,
          bottom: 0,
          right: 5,
          //   height:200,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false,
            lineStyle: {
              type: 'solid',
              color: '#dededf'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 20,
            textStyle: {
              fontSize: 14,
              color: '#dededf'
            }
          },
          data: xAxis
        },
        yAxis: {
          splitNumber: 5,
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
            }
          },
          axisLabel: {
            show: true,
            rotate: 0,
            margin: 20,
            textStyle: {
              fontSize: 14,
              color: '#dededf',
              //    align:'left'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: '#363e4c'
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
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
