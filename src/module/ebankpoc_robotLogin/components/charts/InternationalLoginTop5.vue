<template>
<div class="echartsbox1" id="barbox5"></div>
</template>

<script>
import {
  mapState
} from 'vuex'
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
      this.common.req('/ssa/ebankpoc/getInternationalLoginTop5.do', {}, this).then((data) => {
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
      let myChart = echarts.init(document.getElementById('barbox5'));
      let option = {
        color: ['#007be8'],
        tooltip: {
          formatter: function(params, ticket, callback) {
            return params.name + " 调用 " + params.data + " 次";
          }
        },
        grid: {
          containLabel: true,
          top: 25,
          left: 40,
          right: 30,
          bottom: 15,
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
        },
        yAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
          },
          //      inverse: true,
          data: datax
          // ['新加坡', '俄罗斯', '印度', '日本', '美国']
        },
        series: [{
          type: 'bar',
          barMaxWidth: 30,
          label: {
            normal: {
              position: 'right',
              show: true,
              color: '#000'
            }
          },
          data: data
          // [15, 25, 35, 45, 52]
        }]
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;

      let vm = this;
      myChart.on('click', function(params) {
        if(params.value === 0) {
          return;
        }
        let parameters = { login_ip: params.data.login_ip, title: '机器人登录详情' };
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
