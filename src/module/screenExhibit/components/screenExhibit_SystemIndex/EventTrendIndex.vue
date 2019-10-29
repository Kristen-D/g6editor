<template>
<div class="echartsbox3" id="eventtrend"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
      eventTypeList:state=>state.context.list.EventTypeList,
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
      this.common.req('/ssa/situationAnaly/getLineByEventType.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('eventtrend'));


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
                      name:'1',
                      type:'line',
                      smooth:true,
                      lineStyle: { //线条样式
                           normal: {
                             width: 1
                           }
                         },
                      itemStyle: {normal: {areaStyle: {type: 'default'}}},
                      data:[]
                    };



      for(var j = 0; j < dataUnit.length; j++){
          var list=[];
          list.push(dataUnit[j].days.toString().substring(4,8));
          list.push(dataUnit[j].count);
          childData.data.push(list);
          childData.name=this.fmtEventTypeList(dataUnit[j].event_type);
      };
      // console.log(childData.data);
      seriesData.push(childData);
      };



      let option = {
        //backgroundColor:'#091323',
        color: ['#38b4ee', '#303f9f', '#4caf50'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
            top: '0%',
            left: '0',
            padding: [10, 20, 0, 20],
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            data: myLenData,
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
          interval: 20,
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
        series:seriesData
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
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
