<template>
<!-- <div class="">
  <el-col :span="24"> -->
<div id="dataflow" class="echartdatabox2"> </div>
<!-- </el-col>
</div> -->
</template>

<script>
import {mapState} from 'vuex'
import echarts from 'echarts'
export default {
  data() {
    return {
      dataMap: {}
    }
  },
  computed:{
    ...mapState({
      drillDialog:state=>state.context.drillDialog
   })
 },
  methods: {
    loadMapChart() {
      let myChart = echarts.init(document.getElementById("dataflow"));
      // Generate data
      let category = [];
      let lineData = [];

      category = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
      lineData = [10, 13, 15, 7, 5, 6, 8, 9, 12, 13, 10, 9, 8, 9, 13, 12, 10, 8, 6, 7, 8, 9, 10, 9];

      let option = option = {
        timeline: {
          data: this.dataMap.dateTime,
          axisType: 'category',
          show: true,
          autoPlay: false,
          controlStyle: { //『控制按钮』的样式。
            position: 'left',
            showPrevBtn: false, //显示【后退按钮】
            showNextBtn: false, //显示【前进按钮】
            itemGap: 28, //[控制按钮]的间隔
          }
          // playInterval: 1000
        },
        options: [{

            grid: {
              left: '5%',
              right: '6%',
              top: '4%',
              bottom: '32%',
            },

            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              name: '时间',
              data: category,
              axisTick: {
                show: false
              }
            },
            yAxis: {
              type: 'value',
              name: '单位：次',
            },
            series: [{
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                }
              },
              itemStyle: {
                normal: {
                  color: '#2C7BE0'
                }
              },
              lineStyle: {
                normal: {
                  color: '#3583E2',

                }
              },
              data: this.dataMap.data[0]
            }]
          },





          {
            series: [{
              'data': this.dataMap.data[1]
            }]
          },
          {
            series: [{
              'data': this.dataMap.data[2]
            }]
          },
          {
            series: [{
              'data': this.dataMap.data[3]
            }]
          },
          {
            series: [{
              'data': this.dataMap.data[4]
            }]
          },
          {
            series: [{
              'data': this.dataMap.data[5]
            }]
          },
          {
            series: [{
              'data': this.dataMap.data[6]
            }]
          },
        ]

      };

      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm = this;
      myChart.on('click', function(params) {
        if (params.data.datetime != '' && params.data.datetime != undefined) {
          vm.drillDialog.pageIndex = 1;
          vm.drillDialog.params.msg_time=params.data.datetime;
          vm.drillDialog.params.product_type= params.data.product_type;
          vm.drillDialog.params.chartType = "dataFlow";
          vm.drillDialog.params.old_total = params.value;
          vm.$store.dispatch('getDrillData');
        }
      });
    }
  },
  created: async function() {
    this.dataMap = await this.common.req("/ssa/dataCenter/getDataFlow.do");
    this.loadMapChart();
  }
}
</script>
