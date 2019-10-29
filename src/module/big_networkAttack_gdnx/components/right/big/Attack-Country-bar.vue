<template>
<div class="echartsbox1">
  <e-charts :options="option" @chartclick="chartClick" auto-resize></e-charts>
</div>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { mapState } from 'vuex'
export default {
  props: ['attackSource'],
  components: {
    ECharts,
  },
  data() {
    return {
      option: {}
    }
  },
  computed: {
    ...mapState({
      params: state => state.context.params,
    })
  },
  watch: {
    params: function() {
      this.getInitData();
    },
    attackSource: function() {
      this.getInitData();
    },
  },
  methods: {
    getInitData() {
      let ps = { rangeType: this.attackSource,  ...this.params }
      this.common.req('/ssa/netattack_gdnx/getNetAttackCountryTop.do', ps, this).then((data) => {
        this.loadMapChart(data)
      })
    },
    loadMapChart(data) {
      let dataLength = data.length;
      if (dataLength < 10) {
        for (let i = 0; i < 10 - dataLength; i++) {
            data.push({
              location: 'N/A',
              value: 0
            })

        }
      }
      data.sort((a, b) => {
        return a.value - b.value;
      })
      let datax = [];
      let datav = [];
      for (let du of data) {
        datax.push(du.location);
        datav.push(du.value);
      }
      let maxValue = datav[datav.length - 1] === 0 ? 3 : datav[datav.length - 1] * 1.3;
      let maxdata = [maxValue, maxValue, maxValue, maxValue, maxValue]


      this.option = {
        //		color: ["#ffe54d", '#0f263d'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '7%',
          top: '10%',
          bottom: '5%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          data: datax,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: '14',
              color: '#dededf'
            }
          }
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 100,
          splitNumber: 5,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#25347b'
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: '14',
              color: '#dededf'
            }
          }
        },
        series: [

          {
            name: '攻击数',
            type: 'bar',
            barWidth: 10,
            barGap: 10,
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var color1 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#e02b09'
                  }, {
                    offset: 1,
                    color: '#e2e2e3'
                  }], false);
                  var color2 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#2188e2'
                  }, {
                    offset: 1,
                    color: '#e2e2e3'
                  }], false);
                  return (params.dataIndex > 6) ? color1 : color2;

                }
              }
            },
            data: data
          }
        ]

      };
    },
    chartClick(params) {
      let ps = { ...this.params, belong: this.attackSource==='icon_gd'?params.data.id:params.name, rangeType: this.attackSource }
      this.$store.commit('openDrillDialogTable', ps);
      this.$store.dispatch('loadDrillTableData');
    }
  },
  created() {

  },
  mounted() {
    // this.loadMapChart();
    // this.getInitData();
    window.fetchData.push(this.getInitData)
  }
}
</script>
