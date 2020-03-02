<template>
  <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">漏洞趋势<label class="subhead">（近6月）</label></h3>
    </div>
    <div class="el-panel-white-body">
      <div class="chart-container" id="trendtopline">
        <e-charts :options="option" @click="chartClick" auto-resize></e-charts>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ECharts from 'components/vue-echarts/ECharts.vue'
export default {
  components: {
    ECharts,
  },
  computed: {
    ...mapState({
      status:state=>state.context_sz.params.status,
      roleState: state=>state.context_sz.RoleState,
    })
  },
  watch: {
    status: function() {
      this.getInitData();
    },
  },
  methods: {
    chartClick(param) {
      let vm = this;
      if(!vm.roleState) {
        return;
      }
      let parameters = { vulType: params.seriesName, scanTime:'2018-01-01', status: vm.status, title: '漏洞趋势' };
      vm.$store.commit('openDrillDialogTable', parameters);
      vm.$store.dispatch('loadDrillTableData', {});
    },
    async getInitData() {
      this.common.req('/ssa/overall/getVulTrender.do', {status: this.status}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let lens = [];
      let nowDate = new Date();
      nowDate.setMonth(nowDate.getMonth()+1)
      let ms = [];
      for(let i=6; i>0; i--) {
        nowDate.setMonth(nowDate.getMonth()-1)
        ms.push(this.common.formatDate(nowDate,"yyyyMM"))
      }
      ms.sort((a, b) => {
        return a-b;
      })
      let dataObj = {};
      Object.keys(data).forEach((key) => {
        lens.push({name: key, icon: 'circle'});
        let list = data[key];
        let newList = [];
        ms.forEach((m) => {
          let n = list.find((u) => {
            return m === u.scanTime;
          })
          if(typeof n === 'undefined') {
            newList.push(0);
          }else {
            newList.push(n.value);
          }
        })
        dataObj[key] = newList;
      })
      let keys = Object.keys(data);
      // console.log(dataObj[keys[0]]);
      //let myChart = echarts.init(document.getElementById('trendtopline'));
      this.option = {
        color: ['#35a2ff', '#0065ba', '#12cbf6', '#007be8', '#50e3c2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          //    backgroundColor: 'rgba(255,255,255,1)',
          padding: [5, 10],
          formatter: function(params) {
            let res = '<div><p>时间：' + params[0].name + '</p></div>'
            for (let i = 0; i < params.length; i++) {
              res += '<p>' + params[i].seriesName + '：' + params[i].data + '</p>'
            }
            return res;
          },
          //   formatter: '时间：{b}<br />类型：{a}，漏洞数: {c}'
        },
        legend: {
          left: '3%',
          //  orient: 'vertical',
          itemGap: 20,
          itemWidth: 10,
          itemHeight: 10,
          data: lens
          // [{
          //   name: '信息泄漏',
          //   icon: 'circle'
          // }, {
          //   name: '木马上传',
          //   icon: 'circle'
          // }, {
          //   name: '跨站脚本',
          //   icon: 'circle'
          // }, {
          //   name: 'SQL注入',
          //   icon: 'circle'
          // }, {
          //   name: '代码执行',
          //   icon: 'circle'
          // }]
        },
        grid: {
          left:'4%',
        	right:'4%',
        	bottom:10,
        	containLabel:true
        },
        xAxis: {
          type: 'category',
          data: ms,
          // ['05月', '06月', '07月', '08月', '09月', '10月'],
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#D4DFF5'
            }
          },
          axisLabel: {
            margin: 15,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 3,
          splitLine: {
            lineStyle: {
              color: '#D4DFF5'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 10
          }
        },
        series: [{
          name: keys[0],
          // '信息泄漏',
          type: 'line',
          // smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 3,
          data: dataObj[keys[0]],
          // ['9', '4', '7', '2', '5', '13'],

          lineStyle: {
            normal: {
              width: 2
            }
          }
        }, {
          name: keys[1],
          // '木马上传',
          type: 'line',
          //    smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 3,
          data:  dataObj[keys[1]],
          // ['4', '8', '12', '3', '9', '11'],

          lineStyle: {
            normal: {
              width: 2
            }
          }
        }, {
          name: keys[2],
          // '跨站脚本',
          type: 'line',
          //    smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 3,
          data:  dataObj[keys[2]],
          // ['7', '3', '14', '13', '6', '5'],

          lineStyle: {
            normal: {
              width: 2
            }
          }
        }, {
          name: keys[3],
          // 'SQL注入',
          type: 'line',
          //    smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 3,
          data:  dataObj[keys[3]],
          // ['11', '15', '12', '1', '8', '2'],

          lineStyle: {
            normal: {
              width: 2
            }
          }
        }, {
          name: keys[4],
          // '代码执行',
          type: 'line',
          //    smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 3,
          data:  dataObj[keys[4]],
          // ['14', '8', '2', '13', '6', '1'],

          lineStyle: {
            normal: {
              width: 2
            }
          }
        }]
      };
      // myChart.setOption(option);
      // window.onresize = myChart.resize;
      //
      // let vm=this;
  		// myChart.on('click', function(params) {
      //   if(!vm.roleState) {
      //     return;
      //   }
  		// 	let parameters = { vulType: params.seriesName, scanTime:'2018-01-01', status: vm.status, title: '漏洞趋势' };
  		// 	vm.$store.commit('openDrillDialogTable', parameters);
  		// 	vm.$store.dispatch('loadDrillTableData', {});
  		// });
    },
  },
  mounted: function() {
    this.$nextTick(()=>{
      this.getInitData();
    })
  }
}
</script>

<style scoped>
.el-panel-white-body{
  padding-top: 50px;
  /*position: relative;*/
}
</style>
