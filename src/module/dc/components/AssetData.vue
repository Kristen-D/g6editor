<template>
<div>
<div id="assetdata" class="echartdatabox1"> </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
import echarts from 'echarts'

export default {
  data(){
    return {
      treeMapData:{},
      dialogVisible:false,
      productType:""
    }
  },
  computed:{
    ...mapState({
      drillDialog:state=>state.context.drillDialog
   })
 },
  methods: {
     getAssetInfo(params){
      this.productType = params.data.product_type;
      this.drillDialog.pageIndex = 1;
      this.drillDialog.params.product_type= params.data.product_type;
      this.drillDialog.params.chartType = "assetInfo"
     this.$store.dispatch('getDrillData');
    //  this.dialogVisible = true;

    },

    loadMapChart() {
      let myChart = echarts.init(document.getElementById("assetdata"));
      let option = {
        title: {
          text: this.treeMapData.total,
          subtext: '资产总量',
          textStyle: { //主标题
            color: '#3E4956',
            fontWeight: 'bold',
            fontSize: 35,
            fontFamily: 'Haettenschweiler',
          },
          subtextStyle: { //副标题
            color: '#3E4956',
            fontSize: 12,
          },
          itemGap: 12, //主副标题之间的距离
          top: '36%',
          left: '1%',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c}"
        },
        calculable: true,
        color: ['#2ecc71','#1abc9c','#309562','#309562','#3bbf7c'],
        series: [{
          name: '资产接入',
          type: 'treemap',
          width: '88%',
          height: '70%',
          left: '10%',
          //right:'30%',
          roam: false, //是否开启拖拽漫游（移动和缩放）
          nodeClick: false, //点击节点后的行为,false无反应
          label: {
            normal: {
              textStyle: {
                fontWeight: 'bold',
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
              borderWidth: 2,
              borderColor: '#ffffff'
            }
          },
          data: this.treeMapData.data
        }]
      };

      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm = this;
      myChart.on('click', this.getAssetInfo);
    }
  },
  mounted:async function() {
    this.treeMapData = await this.common.req("/ssa/dataCenter/getAllDataSource.do");
    this.loadMapChart();
  }
}
</script>
