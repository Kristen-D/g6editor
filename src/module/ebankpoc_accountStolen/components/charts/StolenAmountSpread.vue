<template>
<div class="echartsbox1" id="radarbox" style="height:350px;"></div>
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
      this.common.req('/ssa/ebankpoc/getStolenAmountSpread.do', {}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let myChart = echarts.init(document.getElementById('radarbox'));
      let newArray = [data[0],data[1],data[2],data[3],data[4]];
      newArray.sort((a, b) => {
        return b-a;
      })
      let maxValue = newArray[0]*3;
      let option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: '#2d3031',
          padding: 10,
        },
        radar: {
          // shape: 'circle',
          center: ['50%', '50%'],
          radius: '75%',
          indicator: [{
              name: '100-1000',
              max: maxValue
            },
            {
              name: '1001-3000',
              max: maxValue
            },
            {
              name: '3001-5000',
              max: maxValue
            },
            {
              name: '5001-10000',
              max: maxValue
            },
            {
              name: '10000及以上',
              max: maxValue
            },

          ],
          splitLine: {
            lineStyle: {
              color: '#e1e3e4',
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            show: false
          },
          name: {
            color: 'rgba(0,0,0,1'
          }

        },
        series: [{
          name: '被盗金额',
          type: 'radar',
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: {
            normal: {
              color: '#e1e3e4',
              opacity: 0.0
            }
          },
          itemStyle: {
            normal: {
              color: '#409cee'
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.6
            }
          },
          data: [{
            value: data,
            // [12, 8, 9, 2, 6],
            name: '',
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.value;
                },
                // position:'top',
                textStyle: {
                  fontSize: 12,
                  color: 'rgba(0,0,0,1)'
                }
              }
            }
          }, ],
        }]
      };

      myChart.setOption(option);
      window.onresize = myChart.resize;

      let vm = this;
      myChart.on('click', function(params) {
        return;
        let parameters = { name: params.name, title: '账号盗用详情' };
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
