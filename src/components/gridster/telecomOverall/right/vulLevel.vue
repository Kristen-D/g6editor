<template>
  <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">漏洞等级</h3>
    </div>
    <div class="el-panel-white-body">
      <div class="chart-container" id="cvelevelpiebox">
        <e-charts :options="option" @click="chartClick" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
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
    },
  },
  data() {
    return {
      option: {},
    }
  },
  methods: {
    async getInitData() {
      let totalColor = ['#ba1f00', '#ff2a00', '#ff8400', '#ffdd3f'];
      let customColor = [];
      this.common.req('/ssa/overall/getRiskTypeStatistics.do', {'areaId': this.areaId, 'appraisalCycle': this.appraisalCycle, status: this.status}, this).then((data) => {
        data.forEach((u) => {
          customColor.push(totalColor[4-u.risk_level])
        });
        this.loadMapChart(data, customColor);
      })
    },
    loadMapChart(data, customColor) {
      let myChart = echarts.init(document.getElementById('cvelevelpiebox'));
      let option = {
        color: customColor,
        // ['#ba1f00', '#ff2a00', '#ff8400', '#ffdd3f'],
        tooltip: {
          trigger: 'item',
          //	 			formatter: "{a} <br/>{b}: {c} ({d}%)"
          formatter: '时间：'+this.appraisalCycle+'<br />{b}：{c}'
          //formatter: '<div class="ec-formatter"><p>时间：2017-10</p><p>漏洞数：357</p></div>'
        },
        series: [
          {//当所有数据为0时，则画一个底色饼图。不画第二个图。否则反之
    	 			name:'输助底色',
    	 			type:'pie',
            center: ['50%', '60%'],
    	 			radius: ['32%', '62%'],
    	 			roseType: 'radius',

    	 			hoverOffset:0,
    	 			itemStyle:{
    	 				normal:{color: "#e1e3e4"},
    	 				emphasis:{color:"#e1e3e4"}
    	 			},
    	 			labelLine:{normal:{show:false}},
    	 			data:[{value:1,name:'',tooltip: {show:false}}]
    	 		},
          {
          type: 'pie',
          startAngle:0,
          center: ['50%', '60%'],
          radius: ['32%', '62%'],
          label: {
            normal: {
              textStyle: {
                fontSize: 12,
                color: '#3E4956',
              }

            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#3E4956',
                fontSize: '12',
                formatter: "{b} <br/>{a}: {c} ({d}%)"
                //  fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 10,
              lineStyle: {
                color: '#e1e3e4'
              }

            },
            emphasis: {
              lineStyle: {
                //width:1,
                color: '#3e4956'
              }
            }
          },
          data: data
          // [{
          //     value: 33,
          //     name: '超危'
          //   },
          //   {
          //     value: 28,
          //     name: '高危'
          //   },
          //   {
          //     value: 268,
          //     name: '中危'
          //   },
          //   {
          //     value: 28,
          //     name: '低危'
          //   },
          // ]
        }]
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm=this;
      myChart.on('click', function(params) {
        if(!vm.roleState) {
          return;
        }
        let parameters = { areaId: vm.areaId, appraisalCycle: vm.appraisalCycle, riskLevel: params.data.risk_level, status: vm.status, title: '漏洞等级' };
        vm.$store.commit('openDrillDialogTable', parameters);
        vm.$store.dispatch('loadDrillTableData', {});
      });
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
