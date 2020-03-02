<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>资产占比</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsmapbox2" id="assetproportion"></div>
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
      this.common.req('/ssa/dataCenter/getAllDataSource.do', {dateRange: 'week'}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    async loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('assetproportion'));
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c}"
        },

        calculable: true,
        color: ['#2ecc71','#1abc9c','#309562','#309562','#3bbf7c'],
        series:[{
          name: '资产占比',
         type: 'treemap',
         width: '100%',
         height: '90%',
         roam: false, //是否开启拖拽漫游（移动和缩放）
         nodeClick: false, //点击节点后的行为,false无反应
         breadcrumb: { //关闭面包屑路径
           show: false
         },
         silent: false, //关闭鼠标事件
         label: {
           normal: {
             textStyle: {
               // fontWeight: 'bold',
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
          data:data.data
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
