<template>
<!-- <div class=""> -->
<!-- <el-col :span="24"> -->
<div id="enterSituation" class="echartdatabox1"> </div>
<!-- </el-col> -->
<!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import echarts from 'echarts'
export default {
  data() {
    return {
      mapData: [],
      barData: [],
      categories:[]

    }
  },
  computed:{
    ...mapState({
      drillDialog:state=>state.context.drillDialog
   })
 },
  methods: {

    loadMapChart() {
      let myChart = echarts.init(document.getElementById("enterSituation"));

      let total = this.mapData.total / 10000;
      this.getBarData(this.mapData.data);
      var option = {
        title: {
          text:  '入库总量'+this.mapData.total,
          bottom: '6%',
          left: '7%',
          textStyle: { //主标题
            color: '#3E4956',
            fontWeight: 'bold',
            fontSize: 16,
          },
        },
        tooltip: {

        },
        grid: [{
          top: '10%',
          bottom: '10%',
          left: '30%',
          right: '2%',
          containLabel: true
        }],
        yAxis: [{
          type: 'category',
          data: this.categories,
          splitLine: { //坐标轴在 grid 区域中的分隔线。
            show: false,
            lineStyle: {
              color: '#E1E3E4'
            }
          },
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: '#E1E3E4'
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
              color: '#3E4956',
            },
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false,
          },
        }],
        xAxis: [{
          type: 'value',
          show: false,
          splitLine: { //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: '#E1E3E4'
            }
          },
          axisLine: { //坐标轴轴线相关设置。数学上的y轴
            show: false,
            lineStyle: {
              color: '#E1E3E4'
            },
          },
          axisLabel: {
            textStyle: {
              color: '#3E4956'
            },
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false,
          },
        }, ],
        series: [{
            type: 'bar',
            color: ['#0065BA'],
            stack: 'chart',
            z: 3,
            barWidth: '25%',
            itemStyle: {
              normal: {
                color: '#0065ba'
              }
            },
            label: {
              normal: {
                position: 'right',
                show: false
              }
            },
            data: this.barData
          },
          {
            type: 'pie',
            color: ['#9FE060', '#8F69C7', '#0065BA', '#028BFF', '#12CBF6', '#50E3C2'],
            radius: ['42%', '62%'],
            center: ['15%', '40%'],
            itemStyle: { //图形样式
              normal: {
                borderWidth: 2,
                borderColor: '#ffffff',
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.mapData.data
          }
        ]
      };



      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm = this;
      myChart.on('click', function (params) {
        vm.drillDialog.pageIndex = 1;
        vm.drillDialog.params.product_type= params.data.product_type;
        vm.drillDialog.params.chartType = "dataPick";
        vm.drillDialog.params.old_total = params.value;
        vm.$store.dispatch('getDrillData');
      });
    },

    getBarData(arr) {
      var i;
        for (i in arr) {
        var data =  {value:arr[i].value,product_type:arr[i].product_type};
        this.categories.push(arr[i].name);
        this.barData.push(data);
      }
    }
  },
  mounted: async function() {
  this.mapData = await this.common.req("/ssa/dataCenter/getTotalDataList.do");
  this.loadMapChart();
  },
}
</script>
