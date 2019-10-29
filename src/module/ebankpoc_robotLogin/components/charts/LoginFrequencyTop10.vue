<template>
<div class="echartsbox1" id="barbox3"></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      // areaId: state => state.context.params.areaId,
      // appraisalCycle: state => state.context.params.appraisalCycle,
      // status: state=>state.context.params.status,
      // roleState: state=>state.context.RoleState,
    })
  },
  watch: {
    // areaId: function() {
    //   this.getInitData();
    // },
    // appraisalCycle: function() {
    //   this.getInitData();
    // },
    // status: function() {
    //   this.getInitData();
    // },
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/ebankpoc/getRobotLoginFrequencyTop10.do', {}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let datax = [];
      let datav = [];
      data.forEach((d) => {
        datax.push(d.name);
        datav.push(d.value);
      })
      let myChart = echarts.init(document.getElementById('barbox3'));
      let option = {
        color: ['#0776b8'],
        grid: {
          containLabel: true,
          top: 25,
          left: 20,
          right: 20,
          bottom: 15,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#333',
            interval: 0,
            rotate: 30
          },
          data: datax
          // ['50.23.33.106', '50.93.33.132', '50.93.32.132', '50.94.33.132', '50.95.33.132', '50.93.36.132', '50.93.33.135', '50.93.33.142', '50.93.33.132', '50.93.33.132'],
        }],
        yAxis: [{
          type: 'value',
          splitNumber: 5,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#333',
            interval: 0
          },
        }],
        series: [{
          name: '登录次数TOP',
          type: 'bar',
          barWidth: '30%',
          data: datav
          // [90, 83, 78, 62, 60, 50, 40, 30, 25, 20]
        }]
      };

      myChart.setOption(option);
      window.onresize = myChart.resize;

      let vm = this;
      myChart.on('click', function(params) {
        if(params.value === 0) {
          return;
        }
        let parameters = { login_ip: params.name, title: '机器人登录详情' };
        vm.$store.commit('openDrillDialogTable', parameters);
        vm.$store.dispatch('loadDrillTableData', {});
      });
    },
  },
  mounted: function() {
    this.getInitData();
    // this.loadMapChart({});
  }
}
</script>

<style>
</style>
