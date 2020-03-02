<template>
<div class="el-panel-bigscreen">
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>{{activePhase}}-攻击事件</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="echartsbox8" id="attackevent"></div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import echarts from 'echarts'
export default {
  props: ['activePhase'],
  computed: {
    ...mapState({
      EventTypeList:state=>state.context.list.EventTypeList,
    })
  },
  watch: {
    activePhase: function() {
      this.getInitData();
    }
  },
  data() {
    return {
      barData: {}
    }
  },
  methods: {

    loadMapChart() {
      let myChart = echarts.init(document.getElementById('attackevent'));
      let option = {

        color: ['#e0d55a'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '15',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.barData.lenData,
          // ['OpenSSl漏洞攻击', 'Email攻击', 'DDOS攻击', '信息泄露'],
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          }
        }],
        yAxis: [{
          splitNumber: 5,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#23303f'],
              type: 'solid'
            }
          },
        }],
        series: [{
            name: '攻击事件数',
            type: 'bar',
            barWidth: '15',
            data: this.barData.valueData
            // [10, 30, 7, 50]
          },

        ],
        //		label: {
        //			normal: {
        //				show: true,
        //				position: 'top',
        //				formatter: '{c}'
        //			}
        //		},
        itemStyle: {
          normal: {
            color: '#ced0d2'
            //				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //					offset: 0,
            //					color: 'rgba(224, 213,90, 0.1)'
            //				}, {
            //					offset: 1,
            //					color: 'rgba(224, 213,90, 0.3)'
            //				}]),
            //				shadowColor: 'rgba(0, 0, 0, 0.1)',
            //				shadowBlur: 10
          }
        }
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    getInitData() {
      this.common.req('/ssa/screenExhibit/getEventSubTypeByAttackPhase.do', {dateRange: 'month',eventAttackPhase:this.activePhase}, this).then((data) => {
        this.formatData(data);
      })
    },
    formatData(data) {
      let lenData = [];
      let valueData = [];
      data.forEach((d) => {
        lenData.push(this.fmtEventTypeList(d.id));
        valueData.push(d.value);
      })

      this.barData.lenData = lenData;
      this.barData.valueData = valueData;
      this.loadMapChart();
    },
    fmtEventTypeList(val) {

      for (var item in this.EventTypeList) {
        if (val == this.EventTypeList[item].id) {
          return this.EventTypeList[item].text;
        }
      }

    }
  },
  mounted: function() {
    this.getInitData();
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
