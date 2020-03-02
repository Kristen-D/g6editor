<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>受威胁趋势<span class="el-panel-bigscreen-small">(近30天)</span></h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox4">
      <e-charts :options="option" @chartclick="chartClick" auto-resize></e-charts>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { mapState } from 'vuex'
export default {
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
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack_gdnx/getThreatTrend.do', this.params, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let nowDate = new Date();
      let ds = [];
      ds.push(this.common.formatDate(nowDate, "MMdd"));
      for (let i = 29; i > 0; i--) {
        nowDate.setDate(nowDate.getDate() - 1)
        ds.push(this.common.formatDate(nowDate, "MMdd"))
      }
      ds.sort((a, b) => {
        return a - b;
      })

      let datav = [];

      ds.forEach((d) => {
        let u = data.find((du) => {
          return d === du.name;
        })
        if (u === undefined) {
          datav.push(0);
        } else {
          datav.push(u.value);
        }
      })
      this.option = {
        color: ['#2196f3'],
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          }
        },
        grid: {
          left: '0',
          right: '4%',
          bottom: '0%',
          top: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false,
            lineStyle: {
              type: 'solid',
              color: '#dededf'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          data: ds
          // categoryData
        },
        yAxis: {
          min: 0,
          // max: 100,
          // splitNumber: 5,
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              type: 'solid',
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#dededf',
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: '#363e4c'
            }
          }
        },
        series: [
          {
          name: '威胁',
          type: 'bar',
          stack: '总数',
          barWidth: '35%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(17, 168,171, 1)'
              }, {
                offset: 1,
                color: 'rgba(17, 168,171, 0.5)'

              }]),
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              shadowBlur: 10
            }
          },

          data: datav
        }]
      };
    },
    chartClick(params) {
      let ps = { ...this.params, day: params.name, queryType :'month' }
      this.$store.commit('openDrillDialogTable', ps);
      this.$store.dispatch('loadDrillTableData');
    }
  },
  created() {

  },
  mounted() {
    // this.loadMapChart();
    this.getInitData();
    window.fetchData.push(this.getInitData)
  }
}
</script>
