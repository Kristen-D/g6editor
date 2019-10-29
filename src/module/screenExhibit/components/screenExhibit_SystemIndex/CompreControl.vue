<template>
<div class="echartsbox4" id="comprehensivecontrol"></div>
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
  data() {
    return {
      workFlowAll: []
    }
  },
  methods: {
    loadMapChart() {
      var myChart = echarts.init(document.getElementById('comprehensivecontrol'));
      var option = {
        //backgroundColor:'#091323',
        color: ['#f53c61', '#ff8400', '#ffdd3f', '#50fca8'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
        },
        calculable: true,
        series: [{
          name: '综合防控',
          type: 'funnel',
          left: '10%',
          top: 2,
          bottom: 2,
          width: '50%',
          //				height:'50%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'ascending',
          gap: 0,
          label: {
            normal: {
              show: true,
              position: 'outside',
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          labelLine: {
            normal: {
              length: 50,
              lineStyle: {
                color: '#fff',
                width: 1,
                type: 'solid'
              }
            }
          },
          itemStyle: { //描边属性
            normal: {
              borderColor: '#fff',
              borderWidth: 0
            }
          },
          data: this.workFlowAll
        }]
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    getInitData() {
      this.common.req('/ssa/screenExhibit/getWrokFlowInfo.do', {
       dateRange: 'month'
     }, this).then((data) => {
       this.formatData(data);
     })
   },
   formatData(data) {
     let nameList = [
        '威胁预警',
        '事件处置',
       // {subtitle: '案件调查', subtext: '事件防控指数'},
        '智能监管'
     ];
     let list = [];
     for(let i=0; i<data.length; i++) {
       let obj = new Object();
       obj.name =  nameList[i];
       obj.value = data[i].h + data[i].t;
       list.push(obj);
     }
     this.workFlowAll = list.sort((a, b) => {
       return a.value - b.value;
     })
     this.loadMapChart();
   }
  },
  mounted: function() {
  }
}
</script>

<style lang="css">
</style>
