<template>
<div class="echartsbox4" id="keyasset"></div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
      eventTypeList:state=>state.context.list.EventTypeList
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===1) {
        this.getInitData();
      }
    }
  },
  methods: {
     getInitData() {
      this.common.req('/ssa/screenExhibit/getEventSubTypeTop5NetAttack.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('keyasset'));


      var lenData = [];
      var seriesData=[];
      var xAxis = [];
      var MyXAxis = [];




      for(var i = 0; i < data[0].length; i++){
        var dataUnit = data[0][i];
          xAxis.push(dataUnit.event_dest_ip);

      };
      for(var i = 0; i < data[0].length; i++){
        var dataUnit = data[0][i];
          MyXAxis.push(dataUnit.assert_name+"\n"+dataUnit.event_dest_ip);
          // console.log(dataUnit.event_dest_ip);
      };


      for(var i = 0; i < data[1].length; i++){
        var dataUnit = data[1][i];
          lenData.push(dataUnit.event_subtype);
      };

      for(var i = 0; i < lenData.length; i++){
        var childData = {
          name: '1',
          type: 'bar',
          stack: '总数',
          barWidth: 14,
          data: []
        };
         childData.name=this.fmtEventTypeList(lenData[i]);
           for(var j = 0; j < xAxis.length; j++){
              var isOk=0;
                 for(var k = 0; k< data[2].length; k++){
                   var dataUnit = data[2][k];
                   if(dataUnit.event_subtype==lenData[i]&&dataUnit.event_dest_ip==xAxis[j]){
                       childData.data.push(dataUnit.count);
                       isOk=1;
                   }
                 };

                 if(isOk==0){
                    childData.data.push(0);
                 }


           };

      // console.log(childData.data);
     seriesData.push(childData);
      };






      var myLenData=[];
      for(var i = 0; i < lenData.length; i++){
        var childData =  {
                    name: '登出',
                    icon:'circle'
        };
          childData.name=this.fmtEventTypeList(lenData[i]).toString();
          myLenData.push(childData);
          // console.log(childData);
      };

      let option = {
        // backgroundColor:'#091323',
        color: ['#f53c61', '#2196f3', '#50fca8'],
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          }
        },
        legend: {
          left: 0,
          top: 0,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: '#dededf'
          },
          data: myLenData
        },
        grid: {
          left: 0,
          top: 32,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          //  position: 'top',
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
            textStyle: {
              color: '#dededf'
            }
          },
          data: MyXAxis
          // ['中间件', '数据库', '路由器', '服务器', '交换机']
        },
        yAxis: {
          min: 0,
          // max: 100,
          // splitNumber: 5,
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              type: 'solid',
            }
          },
          axisLabel: {
            show: true,
            rotate: 0,
            //   margin:120,
            textStyle: {
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
    this.getInitData();
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
