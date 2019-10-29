<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>普通资产受威胁TOP5</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox10" id="assettop5"></div>
  </div>
</div>
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
      if(this.activeScreen===3) {
        this.getInitData();
      }
    }
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/screenExhibit/getEventTypeTop5ByNoKey.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('assettop5'));
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
          lenData.push(dataUnit.event_type);
      };

      for(var i = 0; i < lenData.length; i++){
        var childData = {
          name: '1',
          type: 'bar',
          stack: '总数',
          barWidth: 15,
          data: []
        };
         childData.name=this.fmtEventTypeList(lenData[i]);
           for(var j = 0; j < xAxis.length; j++){
              var isOk=0;
                 for(var k = 0; k< data[2].length; k++){
                   var dataUnit = data[2][k];
                   if(dataUnit.event_type==lenData[i]&&dataUnit.event_dest_ip==xAxis[j]){
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



      var option = {
        color: ['#f53c61', '#2196f3', '#50fca8'],
          		animation: false,
          		tooltip: {
          			trigger: 'axis',
          			axisPointer: {
          				type: 'shadow',
          			}
          		},
          		legend: {
          			left: 5,
          			itemWidth:10,
          			itemHeight:10,
          			itemGap: 20,
          			textStyle: {
          				color: '#dededf'
          			},
          			data: myLenData
          		},
          		grid: {
          			left: 5,
          			top: 60,
          			bottom: 0,
          			right:5,
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
                  interval: 0,
          				margin: 20,
          				textStyle: {
          					fontSize: 14,
          					color: '#dededf'
          				}
          			},
          			data: MyXAxis
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
          				margin: 15,
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
