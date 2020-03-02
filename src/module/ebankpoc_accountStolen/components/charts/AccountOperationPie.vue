<template>
<div class="echartsbox1" id="piebox3" style="height: 360px;"></div>
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
    })
  },
  watch: {
    // areaId: function() {
    //   this.getInitData();
    // },
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/ebankpoc/getAccountOperationPie.do', {}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      // if(data.length === 0) {
      //   return;
      // }
      let myChart = echarts.init(document.getElementById('piebox3'));
      let option = {
        color: ['#ff8400', '#ff2a00', '#ffdd3f'],
        tooltip: {
          trigger: 'item',
          //	 			formatter: "{a} <br/>{b}: {c} ({d}%)"
          formatter: '时间：2017-10<br />{b}：{c}'
          //formatter: '<div class="ec-formatter"><p>时间：2017-10</p><p>漏洞数：357</p></div>'
        },
        series: [{
          name: '交易占比',
          type: 'pie',
          roseType: 'radius',
          startAngle: 0,
          center: ['50%', '50%'],
          radius: ['55%', '75%'],
          label: {
            normal: {
              formatter: '{b}：{c}%',
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
          //     value: 28,
          //     name: '高危'
          //   },
          //   {
          //     value: 183,
          //     name: '中危'
          //   },
          //   {
          //     value: 31,
          //     name: '低危'
          //   },
          // ]
        }]
      };

      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm = this;
      myChart.on('click', function(params) {
        let parameters = { operation: params.name, title: '账号盗用详情' };
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
