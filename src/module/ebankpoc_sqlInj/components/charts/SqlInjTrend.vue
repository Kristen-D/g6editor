<template>
<div class="echartsbox1" id="linebox1"></div>
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
      // status: state=>state.context.params.status,
      // roleState: state=>state.context.RoleState,
    })
  },
  watch: {
    // areaId: function() {
    //   this.getInitData();
    // },
    // appraisalCycle: function() {
    //   this.getInitData();
    // },
    // status: function() {
    //   this.getInitData();
    // },
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/ebankpoc/getSqlInjTrend.do', {}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let len = data.length;
      let newData = [];
      let nowDate = new Date();
      nowDate.setDate(nowDate.getDate() + 1);
      // console.log(nowDate);
      let ms = [];
      for (let i = 30; i > 0; i--) {
        nowDate.setDate(nowDate.getDate() - 1)
        ms.push(this.common.formatDate(nowDate, "MMdd"))
      }
      // ms.sort((a, b) => {
      //   return a-b;
      // })
      if (len < 30) {
        let tempArray1 = [];
        let tempArray2 = [];
        for (let i = 0; i < len; i++) {
          tempArray1[data[i].name] = true;
        }
        for (let i = 0; i < ms.length; i++) {
          if (!tempArray1[ms[i]]) {
            tempArray2.push({
              name: ms[i],
              value: 0
            })
          }
        }
        newData = data.concat(tempArray2.slice(0, 30 - len));
      } else {
        newData = data;
      }

      newData = newData.sort((a, b) => {
        return a.name - b.name;
      })
      // console.log(ms);
      let datax = [];
      let datav = [];
      newData.forEach((obj) => {
        datax.push(obj.name);
        datav.push(obj.value);
      });

      let generateData = function() {
        return Array.apply(null, {
          length: 30
        }).map(function(item, index) {
          return Math.round(Math.random() * 50);
        });
      };
      let myChart = echarts.init(document.getElementById('linebox1'));
      let option = {

        grid: {
          containLabel: true,
          top: 25,
          left: 20,
          right: 20,
          bottom: 15,
        },
        tooltip: {
          trigger: 'axis',
          padding: 10,
        },
        xAxis: {
          boundaryGap: false,
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
          data: datax
          // ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
        },
        yAxis: {
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
          name: 'SQL注入数',
          type: 'line',
          // symbol: 'none',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#1875f0'
            }
          },
          areaStyle: {
            normal: {
              color: '#a7cbf9'
            }
          },
          data: datav
          // generateData()
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
        let parameters = { time: params.name, title: 'sql注入详情' };
        // console.log(parameters);
        vm.$store.commit('openDrillDialogTable', parameters);
        vm.$store.dispatch('loadDrillTableData', {});
      });
    },

  },
  mounted: async function() {
    this.getInitData();
    // this.loadMapChart({});
  }
}
</script>

<style>
</style>
