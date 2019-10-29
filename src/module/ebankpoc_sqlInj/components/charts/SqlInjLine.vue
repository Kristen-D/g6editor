<template>
<div class="echartsbox1" id="linebox2"></div>
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
      this.common.req('/ssa/ebankpoc/getSqlInjLine.do', {}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let all = [];
      if(data.national.length>0||data.international.length > 0) {
        if(data.national.length > 0) {
          all = data.national.concat(data.international);
        }else if(data.international.length > 0) {
          all = data.international.concat(data.national);
        }
      }else {
        all = [{value: 10}];
      }
      all.sort((a, b) => {
        return a.value - b.value;
      })
      let myChart = echarts.init(document.getElementById('linebox2'));
      let option = {
        color: ['#007be8', '#ff0000'],
        legend: {
          top: 10,
          left: 40,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 30,
          data: [{
            name: '国外攻击源',
            icon: 'circle'
          }, {
            name: '国内攻击源',
            icon: 'circle'
          }]
        },
        grid: {
          containLabel: true,
          top: 55,
          left: 20,
          right: 20,
          bottom: 15,
        },
        tooltip: {
          trigger: 'axis',
          padding: 10,
        },
        xAxis: {
          //  boundaryGap: false,
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
            interval: 0
          },
          data: []
          // ['TOP1', 'TOP2', 'TOP3', 'TOP4', 'TOP5']
        },
        yAxis: {
          max: all[0].value,
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

        },

        series: [{
          name: '国外攻击源',
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          label: {
            show: true,
            formatter: function(params) {
              return params.data.name;
            }
          },
          data: data.international
          // [{
          //   name: '美国',
          //   value: 80
          // }, {
          //   name: '日本',
          //   value: 70
          // }, {
          //   name: '印度',
          //   value: 60
          // }, {
          //   name: '俄罗斯',
          //   value: 50
          // }, {
          //   name: '新加坡',
          //   value: 40
          // }]
        }, {
          name: '国内攻击源',
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          label: {
            show: true,
            formatter: function(params) {
              return params.data.name;
            }
          },
          data: data.national
          // [{
          //   name: '新疆',
          //   value: 30
          // }, {
          //   name: '浙江',
          //   value: 25
          // }, {
          //   name: '山西',
          //   value: 20
          // }, {
          //   name: '山东',
          //   value: 15
          // }, {
          //   name: '江西',
          //   value: 10
          // }]
        }]
      };

      myChart.setOption(option);
      window.onresize = myChart.resize;

      let vm = this;
      myChart.on('click', function(params) {
        // console.log(params);
        if(params.value === 0) {
          return;
        }
        let parameters = { srcIp: params.data.srcIp, title: 'sql注入详情' };
        // console.log(parameters);
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
