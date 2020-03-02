<template>
  <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">漏洞系统TOP10</h3>
    </div>
    <div class="el-panel-white-body">
      <div class="chart-container" id="cvetopline2">
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
      appraisalCycle:state=>state.context_sz.params.appraisalCycle,
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
    chartClick(param) {
      let vm = this;
      if(!vm.roleState) {
        return;
      }
      if(params.seriesName === '辅助') {
        return;
      }
      let parameters = { areaId: vm.areaId, appraisalCycle: vm.appraisalCycle, orgId: params.data.org_id, status: vm.status, title: '漏洞系统TOP' };
      vm.$store.commit('openDrillDialogTable', parameters);
      vm.$store.dispatch('loadDrillTableData', {});
    },
    async getInitData() {
      this.common.req('/ssa/overall/getVulSystemTop.do', {'areaId': this.areaId, 'appraisalCycle': this.appraisalCycle, status: this.status}, this).then((data) => {
        this.loadMapChart(data);
      })
    },
    loadMapChart(data) {
      let len = data.length;
      let subst = ['北京公司', '上海公司', '天津公司', '重庆公司', '广东公司', '广西公司', '浙江公司', '江苏公司', '河北公司', '四川公司'];
      let newData = [];
      if(len < 10) {
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
        newData = data.concat(tempArray2.slice(0, 10-len));
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
      })

      let baseBottom = [];
      if(data.length === 0) {
        baseBottom = ["150", "150", "150", "150", "150", "150", "150", "150", "150", "150"];
      }else {
        for(let i = 0; i < 10; i++) {
          baseBottom.push(datav[datav.length-1]*1.5);
        }
      }
      //let myChart = echarts.init(document.getElementById('cvetopline2'));
      let colorlist = ['#ffcc66', '#ffff00', '#ccff00', '#99ff33', '#99ff99', '#99ffff', '#00ccff', '#00cccc', '#00cc99', '#00cc33'];
      // let datav = [60, 65, 72, 80, 88, 91, 97, 103, 110, 126];
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
            // ['安徽移动客服子系统监测平台', '江苏移动客服子系统监测平台', '江西移动客服子系统监测平台', '湖南移动客服子系统监测平台', '福建移动客服子系统监测平台',
            //   '上海移动客服子系统监测平台', '云南移动客服子系统监测平台', '贵州移动客服子系统监测平台', '四川移动客服子系统监测平台', '深圳移动客服子系统监测平台'
            // ],
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
              padding: [27, 0, 0, -5]
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
            // ['安徽移动客服子系统监测平台', '江苏移动客服子系统监测平台', '江西移动客服子系统监测平台', '湖南移动客服子系统监测平台', '福建移动客服子系统监测平台',
            //   '上海移动客服子系统监测平台', '云南移动客服子系统监测平台', '贵州移动客服子系统监测平台', '四川移动客服子系统监测平台', '深圳移动客服子系统监测平台'
            // ],
          }
        ],
        series: [{
            name: 'SYSTEM',
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
                  return datav.hasOwnProperty(d.dataIndex)?datav[d.dataIndex]:0
                }
              }
            },
            tooltip: {
              show: false
            },
            //背景值
            data: baseBottom
            // ["150", "150", "150", "150", "150", "150", "150", "150", "150", "150"]
          },
        ]

      };
      // myChart.setOption(option);
      // window.onresize = myChart.resize;
      // let vm=this;
      // myChart.on('click', function(params) {
      //   if(!vm.roleState) {
      //     return;
      //   }
      //   if(params.seriesName === '辅助') {
      //     return;
      //   }
      //   let parameters = { areaId: vm.areaId, appraisalCycle: vm.appraisalCycle, orgId: params.data.org_id, status: vm.status, title: '漏洞系统TOP' };
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
