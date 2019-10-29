<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title">
        <i class="el-icon-caret-right title-symbol"></i>
        {{data.name}}
        <span class="el-panel-bigscreen-small">(今日: {{num}}条)</span>
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
import {   mapState } from 'vuex'
export default {
  props: ['data'],
  components: {
    ECharts,
  },
  data() {
    return {
      option: {},
      num: '',
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
      let ps = { ...this.data,   ...this.params }
      this.common.req('/ssa/netattack_gdnx/getAlarmTrend.do', ps, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      this.num = data.num;
      let list = data.list;
      let hs = [];
      let i = this.params.timeValue;
      for (; i >= 0; i--) {
        hs.push(i < 10 ? "0" + i : "" + i);
      }
      hs.sort((a, b) => {
        return a - b;
      })

      let datav = [];
      hs.forEach((h) => {
        let u = list.find((l) => {
          return l.name === h;
        });
        if (u === undefined) {
          datav.push(0);
        } else {
          datav.push(u.value);
        }
      })

      this.option = {
        color: this.data.color,
        // ['#ff8400', '#4a331f'],
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
          top: '18%',
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
          data: hs
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
            rotate: 0,
            //   margin:120,
            textStyle: {
              color: '#dededf',
              //    align:'left'
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
            name: '',
            type: 'bar',
            stack: '总数',
            barWidth: '25%',
            data: datav
          },
        ]
      };
    },
    chartClick(params) {
      let ps = { ...this.data,   ...this.params, hour: params.name }
      this.$store.commit('openDrillDialogTable', ps);
      this.$store.dispatch('loadDrillTableData');
    }
  },
  created() {
    
  },
  mounted() {
    window.fetchData.push(this.getInitData)
    // this.loadMapChart();
    // this.getInitData();
  }
}
</script>
