<template>
<div class="echartsbox6" id="keyinst"></div>
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
  watch: {
    activeScreen: function() {
      if(this.activeScreen===1) {
        this.getInitData();
      }
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/screenExhibit/getOrgEventType.do', {dateRange: 'month'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('keyinst'));

      var lenData = [];
      var seriesData=[];
      var yAxis = [];
      var colorData=[];




      for(var i = 0; i < data[0].length; i++){
        var dataUnit = data[0][i];
          yAxis.push(dataUnit.org_name);
      };

      for(var i = 0; i < data[1].length; i++){
        var dataUnit = data[1][i];
          lenData.push(dataUnit.event_subtype);
      };

      for(var i = 0; i < lenData.length; i++){
        var yLength=0;
        var childData =  {
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
         childData.name=this.fmtEventTypeList(lenData[i]);
           for(var j = 0; j < yAxis.length; j++){
               var isOk=0;
                 for(var k = 0; k< data[2].length; k++){
                   var dataUnit = data[2][k];
                   if(dataUnit.event_subtype==lenData[i]&&dataUnit.org_name==yAxis[j]){
                       isOk=1;
                         if(yLength<5){
                         childData.data.push(dataUnit.count);
                         yLength=yLength+1;
                        }
                   }
                 };

           if(isOk==0){
              if(yLength<5){
              childData.data.push(0);
              yLength=yLength+1;
             }
           }

           };

      // console.log(childData.data);

          seriesData.push(childData);



      };



      // console.log(lenData);
      // console.log(yAxis);
      // console.log(seriesData);


      var myLenData=[];
      for(var i = 0; i < lenData.length; i++){
        var childData =  {
                    name: '登出',
                    icon:'circle'
        };
          childData.name=this.fmtEventTypeList(lenData[i]).toString();
          myLenData.push(childData);
          colorData.push(this.getColor());
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
          top: 2,
          left: 0,
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
          top: 30,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          //  position: 'top',
          show:false,
          splitLine: {
            show: false,
            lineStyle: {
              type: 'solid',
              color: '#23303f'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          }
        },
        yAxis: {
          splitNumber: 25,
          type: 'category',
          axisLine: {
            show: false,
            lineStyle: {
              type: 'solid',
            }
          },
          axisLabel: {
            show: true,
            rotate: 0,
            textStyle: {
              color: '#dededf',
              fontSize: '14'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'solid',
              color: '#cfc3bd'
            }
          },
          data: yAxis
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
    getColor(){
      return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);
    },
  },
  mounted: function() {
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
