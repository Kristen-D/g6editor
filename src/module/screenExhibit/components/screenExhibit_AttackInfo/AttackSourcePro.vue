<template>
<div class="echartsbox7" id="attacksource"></div>
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
      if(this.activeScreen===1) {
        this.getInitData();
      }
    }
  },
  methods: {
    getInitData() {
     this.common.req('/ssa/netAttack/getEventSrcIpOnMap.do', {dateRange: 'month'}, this).then((data) => {
       this.loadMapChart(data);
     })
   },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('attacksource'));
      var seriesData=[];
      var Mapdata=data.result;
      var dataSize=10;
      if(Mapdata.length<10){
        dataSize=Mapdata.length;
      }
      for (var i = 0; i < dataSize; i++) {
           var dataUnit = Mapdata[i];
           var child={
               value: 19,
               name: '中国',
              //  itemStyle: {
              //    normal: {
              //      color: '#42a5f5',
              //    }
              //  }
             };
           child.name=dataUnit.ipSourceName;
           child.value=dataUnit.total;
          //  child.itemStyle.normal.color=this.getColor();
           seriesData.push(child);
      }


      let option = {
        //backgroundColor:'#091323',
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c}"
        },
        calculable: true,
        series: [{
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          name: '攻击源占比',
          type: 'treemap',
          roam: false, //是否开启拖拽漫游（移动和缩放）
          nodeClick: false, //点击节点后的行为,false无反应
          breadcrumb: { //关闭面包屑路径
            show: false
          },
          silent: false, //关闭鼠标事件
          label: {
            normal: {
              textStyle: {
                fontSize: '14',
              }

            }

          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b}"
              },
              //   borderWidth: 0.51,
              borderColor: '#0b1724',
              gapWidth: 5
            },
          },
          data: seriesData
        }] //series end
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
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
