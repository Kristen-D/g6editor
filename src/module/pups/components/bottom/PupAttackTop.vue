<template>
  <div class="el-panel">
    <div class="el-panel-heading">
      <h4 class="el-panel-title">攻击源TOP</h4>
    </div>
    <div class="el-panel-body">
      <div class="echartbox6">
        <e-charts :options="option" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'components/vue-echarts/ECharts.vue'
export default {
  components: {
    ECharts,
  },
  data() {
    return {
      option : {}
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/pups/getPupsBelongs.do', this.params, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let length = data.length;
      if(length<3) {
        for(let i=0; i<3-length; i++) {
          data.push({name: 'N/A', value: 0})
        }
      }
      data = data.sort((a, b) => {
        return a.value-b.value;
      })
      let datax = [];
      let datav = [];
      for(let d of data) {
        datax.push(d.name);
        datav.push(d.value);
      }
      let maxValue = datav[datav.length-1]===0?3:datav[datav.length-1]*1.3;
      let maxdata = [maxValue, maxValue, maxValue]
      // let myChart = echarts.init(document.getElementById('pupattacktop'));
      this.option = {
        backgroundColor: '#ffffff',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c}"
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '2%',
          bottom: '10',
          containLabel: false
        },
        xAxis: [{
          type: 'value',
          position: 'top',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false,
          },
        }],
        yAxis: [{
            type: 'category',
            data: datax,
            // ['德国  12.170.128.122', '英国  196.2.10.1', '美国  196.32.20.11'],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#747a82',
              fontSize: '14',
              fontWeight: '500',
              formatter: function(val) {
                return (val.length > 18 ? (val.slice(0, 14) + "...") : val);
              },
              inside: true,
              padding: [-40, 0, 0, -5]
            }
          },
          {
            type: 'category', //辅助x轴
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['1', '2', '3'],
          }
        ],
        series: [{
            name: '辅助',
            type: 'bar',
            barWidth: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: 'rgba(229, 242, 253,0.9)',
                //borderWidth: 2,
                //borderColor: '#8ca2e3'
              }
            },
            label: {
              normal: {
                show: true,
                color: '#747a82',
                fontSize: '14',
                position: 'insideRight',
                offset: [0, -20],
                formatter: function(d) {
                  return datav[d.dataIndex];
                }
              }
            },
            tooltip: {
              show: false
            },
            data: maxdata //背景值

          },
          {
            name: '访问数',
            type: 'bar',
            color: ['#0066cc'],
            barWidth: 10,
            data: datav
          },
        ]
      };

      // myChart.setOption(option);
      // window.onresize = myChart.resize;
    }
  },
  created: function() {
    // this.getInitData();
  },
  mounted: function() {
    this.getInitData();
  }
}
</script>

<style>
</style>
