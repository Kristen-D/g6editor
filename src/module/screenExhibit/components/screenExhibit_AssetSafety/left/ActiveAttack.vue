<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>活跃攻击类型</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox9" id="activeattack"></div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
      EventTypeList:state=>state.context.list.EventTypeList,
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen==3) {
        this.getInitData();
      }
    }
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/screenExhibit/getLineByRiskLevel.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('activeattack'));


      var lenData = [];
      var seriesData=[];
      var xAxis = [];

      for(var i = 0; i < data.xAxis.length; i++){
          xAxis.push(data.xAxis[i].toString().substring(4,8));
      };

      for(var i = 0; i < data.RiskLevelId.length; i++){
        var dataUnit = data.RiskLevelId[i];
          lenData.push(this.fmtEventRiskList(dataUnit.id));
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
                      type: 'scatter',
                      data:[]
                    };



      for(var j = 0; j < dataUnit.length; j++){
          var list=[];
          list.push(dataUnit[j].days.toString().substring(4,8));
          list.push(dataUnit[j].count);
          childData.data.push(list);
          childData.name=this.fmtEventRiskList(dataUnit[j].event_risk_level);
      };
      // console.log(childData.data);
      seriesData.push(childData);
      };



      let option = {
        //backgroundColor:'#091323',
        color: ['#ffdd3f', '#ff8400','#ff2a00',],
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
          boundaryGap: false,
    			splitNumber: 5,
    			axisTick: {
    				show: false
    			},
    			axisLine: {
    				show: false,
    				//    onZero:false
    			},
    			axisLabel: {
    				margin: 20,
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
    fmtEventRiskList(val){
      if(val==1){
        return "低危";
      }else if(val==2){
        return "中危";
      }else if(val==3){
        return "高危";
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
