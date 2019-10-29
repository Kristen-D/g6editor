<template>
  <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">OWASP&nbsp;TOP5</h3>
    </div>
    <div class="el-panel-white-body">
      <div class="chart-container" id="owaspline2">
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
      areaId: state => state.context_sz.params.areaId,
      appraisalCycle: state => state.context_sz.params.appraisalCycle,
      status:state=>state.context_sz.params.status,
      roleState: state=>state.context_sz.RoleState,
    })
  },
  watch: {
    areaId: function() {
      this.getInitData();
    },
    appraisalCycle: function() {
      this.getInitData();
    },
    status: function() {
      this.getInitData();
    },
  },
  data() {
    return {
      option: {},
    }
  },
  methods: {
    async getInitData() {
      this.common.req('/ssa/overall/getOwaspStatistics.do', {'areaId': this.areaId, 'appraisalCycle': this.appraisalCycle, status: this.status}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    chartClick(param) {
      let self = this;
      if(params.seriesName === '辅助') {
        return;
      }
      if(params.seriesName === '辅助') {
        return;
      }
      let parameters = { areaId: self.areaId, appraisalCycle: self.appraisalCycle, owaspType: params.data.owasp_type, status: self.status, title: 'OWASP TOP' };
      self.$store.commit('openDrillDialogTable', parameters);
      self.$store.dispatch('loadDrillTableData', {});
    },
    loadMapChart(data) {
      let len = data.length;
      let subst = ['注入', '失效的身份认证和会话管理', '跨站脚本（xss）', '失效的访问控制', '安全配置错误'];
      let newData = [];
      if(len < 5) {
        let tempArray1 = [];
        let tempArray2 = [];
        for(let i = 0; i < len; i++) {
          tempArray1[data[i].name] = true;
        }
        for(let i = 0; i < subst.length; i++) {
          if(!tempArray1[subst[i]]){
            tempArray2.push({name: subst[i], value: 0})
          }
        }
        newData = data.concat(tempArray2.slice(0, 5-len));
      }else {
        newData = data;
      }

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


      if(data.length === 0) {
        baseBottom = ["100", "100", "100", "100", "100"];
      } else {
        for(let i = 0; i < 5; i++) {
          baseBottom.push(datav[datav.length-1]*1.5);
        }
      }
      //let myChart = echarts.init(document.getElementById('owaspline2'));
      let colorlist = ['#99ffff', '#79d9f1', '#00cccc', '#f7b352', '#f4d12e'];
      this.option = {
        //   color: ['#00B6A4'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '时间：'+this.appraisalCycle+'<br />类型：{b}<br />漏洞数：{c}'
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
            // ['未受保护的 APIs', '使用含有已知漏洞的组件', '失效的访问控制', '跨脚本 (XSS)', '失效的身份认证和会话管理'],
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
              padding: [24, 0, 0, -5]
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
            data: datax,
            // ['未受保护的 APIs', '使用含有已知漏洞的组件', '失效的访问控制', '跨脚本 (XSS)', '失效的身份认证和会话管理'],
          }
        ],
        series: [{
            name: 'OWASP',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function(d) {
                  return colorlist[d.dataIndex];
                }
              }
            },
            data: newData

          },
          //背景
          {
            name: '辅助',
            type: 'bar',
            barWidth: 10,
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
                offset: [0, 15],
                formatter: function(d) {
                  // console.log(d);
                  return datav.hasOwnProperty(d.dataIndex)?datav[d.dataIndex]:0
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
      // myChart.setOption(option);
      // window.onresize = myChart.resize;
      // let vm = this;
      // myChart.on('click', function(params) {
      //   if(params.seriesName === '辅助') {
      //     return;
      //   }
      //   if(params.seriesName === '辅助') {
      //     return;
      //   }
      //   let parameters = { areaId: vm.areaId, appraisalCycle: vm.appraisalCycle, owaspType: params.data.owasp_type, status: vm.status, title: 'OWASP TOP' };
      //   vm.$store.commit('openDrillDialogTable', parameters);
      //   vm.$store.dispatch('loadDrillTableData', {});
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
