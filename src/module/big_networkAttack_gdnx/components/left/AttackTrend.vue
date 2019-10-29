<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title">
      <i class="el-icon-caret-right title-symbol"></i>
      攻击趋势
      <span class="el-panel-bigscreen-small">(近7天)</span>
    </h3>
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
      this.common.req('/ssa/netattack_gdnx/getAttackTrend.do', this.params, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let nowDate = new Date();
      let ds = [];
      ds.push(this.common.formatDate(nowDate, "MMdd"));
      for (let i = 6; i > 0; i--) {
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
        //	backgroundColor:'#091323',
        tooltip: {
          trigger: 'axis'
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
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          data: ds
        },
        yAxis: {
          min: 0,
          // max: 30,
          // interval: 6,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#23303f',
              type: 'solid'
            }
          }
        },
        series: [
          {
          name: '攻击趋势',
          type: 'line',
          smooth: true, //是否平滑曲线显示
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: "#2196f3"
            }
          },
          areaStyle: {
            normal: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [{
                  offset: 0,
                  color: "rgba(33, 150, 243, 0.3)"
                }, {
                  offset: 0.8,
                  color: "rgba(33, 150, 243, 0.1)"
                }]
              },
              "shadowColor": "rgba(0, 0, 0, 0.1)",
              "shadowBlur": 10
            }
          },
          itemStyle: {
            normal: {
              color: "#2196f3"
            }
          },
          data: datav
        }]
      };
    },
    chartClick(params) {
      let ps = { ...this.params, day: params.name, queryType: '6days' }
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
