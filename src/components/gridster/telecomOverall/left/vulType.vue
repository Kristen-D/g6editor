<template >
  <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">漏洞类型</h3>
    </div>
    <div class="el-panel-white-body">
      <div class="chart-container" id="cvetypepiebox">
        <e-charts :options="option" @click="chartClick" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import echarts from 'echarts'
import ECharts from 'components/vue-echarts/ECharts.vue'
export default {
  components: {
    ECharts,
  },
  computed: {
    ...mapState({
      areaId: state => state.context_sz.params.areaId,
      appraisalCycle:state=>state.context_sz.params.appraisalCycle,
      status:state=>state.context_sz.params.status,
      roleState: state=>state.context_sz.RoleState,
    })
  },
  watch: {
    areaId: function() {
      this.getInitData();
    },
    appraisalCycle: function() {
      this.getInitData();
    },
    status: function() {
      this.getInitData();
    }
  },
  data() {
    return {
      option: {},
    }
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/overall/getVulTypeStatistics.do', {'areaId': this.areaId, 'appraisalCycle': this.appraisalCycle, status: this.status}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    chartClick(param) {
      let vm = this;
      if(!vm.roleState) {
        return;
      }
      let parameters = { areaId: vm.areaId, appraisalCycle: vm.appraisalCycle, vulType: params.name, status: vm.status, title: '漏洞类型' };
      vm.$store.commit('openDrillDialogTable', parameters);
      vm.$store.dispatch('loadDrillTableData', {});
    },
    loadMapChart(data) {
      //let myChart = echarts.init(document.getElementById('cvetypepiebox'));
      this.option = {
        color: ['#35a2ff', '#0065ba', '#12cbf6', '#007be8', '#50e3c2'],
        tooltip: {
          trigger: 'item',
          //	 			formatter: "{a} <br/>{b}: {c} ({d}%)"
          formatter: '时间：'+this.appraisalCycle+'<br />漏洞类型：{b}<br />漏洞数：{d}%({c})'
        },
        series: [
          {//当所有数据为0时，则画一个底色饼图。不画第二个图。否则反之
    	 			name:'输助底色',
    	 			type:'pie',
            center: ['48%', '50%'],
    	 			radius: ['40%', '60%'],
    	 			//roseType: 'radius',
    	 			startAngle: 0,
    	 			hoverOffset:0,
    	 			itemStyle:{
    	 				normal:{color: "#e1e3e4"},
    	 				emphasis:{color:"#e1e3e4"}
    	 			},
    	 			labelLine:{normal:{show:false}},
    	 			data:[{value:1,name:'',tooltip: {show:false}}]
    	 		},
          {
          name: '漏洞类型',
          type: 'pie',
          center: ['48%', '50%'],
          radius: ['40%', '60%'],
          startAngle: 0, //起始角度，支持范围[0, 360]。
          itemStyle: { //图形样式
            normal: {
              //	borderWidth: 4,
              //	borderColor: '#fff',
              //	font
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 5,
              length2: 5,
              lineStyle: {
                color: '#e1e3e4'
              }

            },
            emphasis: {
              lineStyle: {
                color: '#3e4956'
              }
            }
          },
          label: {
            normal: {
  	 					fontSize:10,
  	 					formatter: '{b}\n({c})',
  	 					textStyle: {
  	 						color: '#3E4956',
  	 					}

            },
          },
          data: data
        }]
      };
      // myChart.setOption(option);
      // window.onresize = myChart.resize;
      // let vm=this;
      // myChart.on('click', function(params) {
      //   if(!vm.roleState) {
      //     return;
      //   }
      //   let parameters = { areaId: vm.areaId, appraisalCycle: vm.appraisalCycle, vulType: params.name, status: vm.status, title: '漏洞类型' };
      //   vm.$store.commit('openDrillDialogTable', parameters);
      //   vm.$store.dispatch('loadDrillTableData', {});
      // });
    },
  },
  mounted: function() {
    this.$nextTick(()=>{
      this.getInitData();
    })
  }
}
</script>

<style scoped>
.el-panel-white-body{
  padding-top: 50px;
  /*position: relative;*/
}
</style>
