<template>
<div class="echartsbox2" id="barbox10"></div>
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
      this.common.req('/ssa/ebankpoc/getExternalEmailTop5.do', {}, this).then((data) => {
        this.loadMapChart(data);
        // console.log(data);
      })
    },
    loadMapChart(data) {
      let len = data.length;
      let newData = [];
      if(len < 5) {
        for(let i = 0; i < 5-len; i++) {
          data.push({name: 'null', value: 0})
        }
      }
      newData = data;

      newData = newData.sort((a, b) => {
        return a.value - b.value;
      })
      let datax = [];
      let datav = [];
      newData.forEach((obj) => {
        datax.push(obj.name);
        datav.push(obj.value);
      });
      let baseBottom = [];
      if(len === 0) {
        baseBottom = ["100", "100", "100", "100", "100"];
      } else {
        for(let i = 0; i < 5; i++) {
          baseBottom.push(datav[datav.length-1]*1.5);
        }
      }
      // console.log(datax);
      // console.log(datav);
      // console.log(baseBottom);
      let myChart = echarts.init(document.getElementById('barbox10'));
      // let datav = [65, 72, 80, 88, 91];
      let option = {
        //   color: ['#00B6A4'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '接收邮箱：{b}<br />外发次数：{c}'
        },

        grid: {
          top: 0,
          left: '5%',
          right: '5%',
          bottom: 5,
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
            // ['TOMI9778@163.COM', 'JPMhont0009@factbook.COM', 'TOMIxxx78@163.COM', 'JFIERIJR@factbook.COM', 'ELAE08JJK@factbook.COM'],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              //color:'red',
              formatter: function(val) {
                return (val.length > 15 ? (val.slice(0, 14) + "...") : val);
              },
              inside: true,
              padding: [45, 0, 0, -5]
            }
          },
          //辅助x轴
          {
            type: 'category',
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
            data: datax
            // ['TOMI9778@163.COM', 'JPMhont0009@factbook.COM', 'TOMIxxx78@163.COM', 'JFIERIJR@factbook.COM', 'ELAE08JJK@factbook.COM'],

          }
        ],
        series: [{
            name: 'OWASP',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#007be8',
              }

            },
            data: datav

          },
          //背景
          {
            name: '辅助',
            type: 'bar',
            barWidth: 20,
            yAxisIndex: 1,
            //颜色透明度
            itemStyle: {
              normal: {
                color: 'rgba(101, 101, 101,0.1)'
              }
            },
            label: {
              normal: {
                show: true,
                color: '#000000',
                position: 'insideRight',
                offset: [0, 25],
                formatter: function(d) {
                  return datav[d.dataIndex]
                }
              }
            },
            tooltip: {
              show: false
            },
            //背景值
            data: baseBottom
            // ["100", "100", "100", "100", "100"]
          },
        ]

      };

      myChart.setOption(option);
      window.onresize = myChart.resize;
      let vm = this;
      myChart.on('click', function(params) {
        if(params.seriesName === '辅助') {
          return;
        }
        let parameters = { receiver: params.name, title: '邮件发送详情' };
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
