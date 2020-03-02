<template>
<div class="echartsmapbox2" id="attackpiebar"></div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen,
      EventThreatList:state=>state.context.list.EventThreatList,
    })
  },
  data(){
          return {
          seriesData2:[],
          seriesData:[],
          lenData:[]

          }
      },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===1) {
        this.getInitData();
      }
    }
  },
  methods: {
    fmtEventThreatList(val){
     // console.log(this.eventTypeList);
       for(var item in this.EventThreatList) {
           if (val==this.EventThreatList[item].id){
             return this.EventThreatList[item].text;
           }
       }

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
    getInitData() {


      this.seriesData2=[];
      this.seriesData=[];
      this.lenData=[];
     this.common.req('/ssa/screenExhibit/getPieByRiskTypeNetAttack.do', {dateRange: 'month'}, this).then((data) => {


       for(var i = 0; i < data.length; i++){
        var childData2=	{value: 0, name: '高危',
        itemStyle: {
        normal: {
            color: '#f3ce21'
        }
      }
      };
         childData2.value=data[i].count;
         childData2.name=this.fmtEventRiskList(data[i].event_risk_level);
         if(data[i].event_risk_level==1){
           childData2.itemStyle.normal.color='#f3ce21';
         }else if(data[i].event_risk_level==2){
           childData2.itemStyle.normal.color='#ff7348';
         }else{
           childData2.itemStyle.normal.color='#f53c61';
         }
         this.seriesData2.push(childData2);
       }

       this.getInitData2();
     })
   },
   getInitData2() {
    this.common.req('/ssa/netAttack/getCountEventThreatTypeTop5.do', {dateRange: 'month'}, this).then((data) => {



      for(var i = 0; i < data.length; i++){
        var dataUnit = data[i];
        var child={
            name: 'NSEI',
            value: 24
          };
          child.value=dataUnit.count;
          child.name=this.fmtEventThreatList(dataUnit.event_threat_type).toString();
          this.seriesData.push(child);
      };
      for(var i = 0; i < data.length; i++){
        var dataUnit = data[i];
        this.lenData.push(this.fmtEventThreatList(dataUnit.event_threat_type).toString());
      };



      this.loadMapChart();
    })
  },
    loadMapChart() {
      let myChart = echarts.init(document.getElementById('attackpiebar'));
      let option = {
        // color: ["#ff8400", '#ff2a00', '#ffdd3f'],
        title: {
          text: '威胁等级',
          top: '22%',
          left: '34%',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 20,
          right: 30,
          top: 240,
          bottom: 40,
          //height: 225,
          containLabel: true
        },
        yAxis: {
          type: 'category',
          data: this.lenData,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: '14',
              color: '#dededf'
            }
          }
        },
        xAxis: {
          type: 'value',
          show:false,
          splitNumber: 5,
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
              fontSize: '14',
              color: '#dededf'
            }
          }
        },
        series: [{
          //color: ["#ff8400", '#ff2a00', '#ffdd3f'],
          name: '危险程度',
          type: 'pie',
          radius: ['30%', '40%'],
          center: ['45%', '25%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: '16',
                color: '#fff'
              }
              // position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              //smooth: 0.2,
              length: 10,
              length2: 20,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          data: this.seriesData2
        }, {
          name: '攻击数',
          type: 'bar',
          data:this.seriesData,
          // barCategoryGap: '35%',
          barWidth: 10,
          barGap: 10,
          itemStyle: {
            normal: {
              color: '#cfd1d4'
            }
          }
        }]

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
