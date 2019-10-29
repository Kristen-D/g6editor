<template>
<div class="echartsbox4" id="attacktrend"></div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
      eventTypeList:state=>state.context.list.EventTypeList,
    })
  },
  data() {
    return {
      dateX: [],
      valueY: []
    }
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen==1) {
        this.getInitData();
      }
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/situationAnaly/getLineByEventType.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('attacktrend'));


      var lenData = [];
      var seriesData=[];
      var xAxis = [];

      for(var i = 0; i < data.xAxis.length; i++){
          xAxis.push(data.xAxis[i].toString().substring(4,8));
      };

      for(var i = 0; i < data.EventTypePid.length; i++){
        var dataUnit = data.EventTypePid[i];
          lenData.push(dataUnit.name);
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



      for(var j = 0; j < dataUnit.length; j++){
        if(dataUnit[j].event_type==300){
          var list=[];
          list.push(dataUnit[j].days.toString().substring(4,8));
          list.push(dataUnit[j].count);
          childData.data.push(list);
          // childData.name=this.fmtEventTypeList(dataUnit[j].event_type);
        }
      };
      // console.log(childData.data);
      if(dataUnit[0].event_type==300){
         seriesData.push(childData);
      }

      };

      let option = {
        //	backgroundColor:'#091323',
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '0',
          right: '3%',
          bottom: '3%',
          top: '4%',
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
              color: '#23303f',
              type: 'solid'
            }
          },
          data: xAxis
          // ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27']
        },
        yAxis: {
          min: 0,
          // max: 30,
          // interval: 5,
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
              color: '#23303f',
              type: 'solid'
            }
          }
        },
        series: seriesData
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    fmtEventTypeList(val){

       for(var item in this.eventTypeList) {
           if (val==this.eventTypeList[item].id){
             return this.eventTypeList[item].text;
           }
       }

    },

  },
  mounted: function() {

  }
}
</script>

<style lang="css">
</style>
