<template>


<div>
  <div class="el-panel-bigscreen-heading">
    <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>安全态势</h3>
  </div>
  <div class="el-panel-bigscreen-body">
    <div class="box">
      <span class="box-tl"></span>
      <span class="box-br"></span>
      <el-select v-model="optionValue" filterable style="width:90px;background-color:#1286fd;!important" @change="changeProcess">
        <el-option label="预警" value="1"> </el-option>
        <el-option label="事件" value="2"> </el-option>
        <el-option label="智监" value="3"> </el-option>
        <el-option label="案件" value="4"> </el-option>
      </el-select>
      <div class="echartsmapbox1" id="taiyuan"></div>
      <!-- <div class="echartsmapbox1" id="map1"></div> -->
    </div>
  </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===0) {
        this.getInitData();
      }
    }
  },
  data() {
    return {


      todoData: {},
      hiData: {},
      optionValue: "1"
    }
  },
  methods: {
    changeProcess() {
      if (this.optionValue == "1") {
        this.getWarnMgmtProcess();
      }else if (this.optionValue == "2") {
        this.getEventMgmtProcess();
      }else if (this.optionValue == "3") {
        this.getClassifiedP_UnitProcess();
      }else if(this.optionValue == "4"){
        this.getCaseInvestigate();
      }

    },
    async getWarnMgmtProcess() {
      var params = {};
      params.myType = "warnMgmtProcess";
      params.isMap = "true";
      var data = await this.common.req("/ssa/workBench/getTodoTasksByType.do", params, this);
      var data1 = await this.common.req("/ssa/workBench/getHiTasksByType.do", params, this);
      this.todoData = data;
      this.hiData = data1;
      this.loadMapChart();
    },
    async getEventMgmtProcess() {
      var params = {};
      params.myType = "eventMgmtProcess";
      params.isMap = "true";
      var data = await this.common.req("/ssa/workBench/getTodoTasksByType.do", params, this);
      var data1 = await this.common.req("/ssa/workBench/getHiTasksByType.do", params, this);
      this.todoData = data;
      this.hiData = data1;
      this.loadMapChart();
    },
    async getClassifiedP_UnitProcess() {
      var params = {};
      params.myType = "classifiedP_UnitProcess";
      params.isMap = "true";
      var data = await this.common.req("/ssa/workBench/getTodoTasksByType.do", params, this);
      var data1 = await this.common.req("/ssa/workBench/getHiTasksByType.do", params, this);
      this.todoData = data;
      this.hiData = data1;
      this.loadMapChart();
    },
    async getTaskInspectProcess() {
      var params = {};
      params.myType = "taskInspectProcess";
      params.isMap = "true";
      var data = await this.common.req("/ssa/workBench/getTodoTasksByType.do", params, this);
      var data1 = await this.common.req("/ssa/workBench/getHiTasksByType.do", params, this);
      this.todoData = data;
      this.hiData = data1;
      this.loadMapChart();
    },
    async getCaseInvestigate(){
      var params = {};
      params.myType = "caseInvestigate";
      params.isMap = "true";
      var data = await this.common.req("/ssa/workBench/getTodoTasksByType.do", params, this);
      var data1 = await this.common.req("/ssa/workBench/getHiTasksByType.do", params, this);
      this.todoData = data;
      this.hiData = data1;
      this.loadMapChart();
    },
    getInitData() {
       this.getWarnMgmtProcess();
    },
    loadMapChart() {
      let myChart = echarts.init(document.getElementById('taiyuan'));　
      var geoCoordMap = {
        '225': [112.487122, 37.939893], //尖草坪区
        '226': [112.522258, 37.862653], //万柏林区
        '223': [112.558851, 37.855804], // 迎泽区
        '222': [112.564273, 37.817974], //小店区
        '224': [112.560743, 37.879291], //杏花岭
        '227': [112.477849, 37.715619], //晋源区
        '228': [112.357961, 37.60729], //清徐县
        '231': [112.174353, 37.908534], //古交市
        '230': [111.793798, 38.066035], //娄烦县
        '229': [112.673818, 38.058797] //阳曲县
      };


      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].areaId];
          if (geoCoord) {
            res.push(geoCoord.concat(data[i].value));
          }
        }

        return res;
      };


      var itemStyle = {
        normal: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      };
      var option = {

        color: [
          '#dd4444', '#13CE66'
        ],
        legend: {
          y: 'top',
          selectedMode: 'single',
          data: [{
              name: '待处理',
              icon: 'rect'
            },
            {
              name: '已处理',
              icon: 'rect'
            }
          ],
          textStyle: {
            color: '#3E4956',
          },
        },
        grid: {
          left: '10%',
          right: 200,
          top: '15%',
          bottom: '10%'
        },
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function(obj) {
            var value = obj.value;
            return value;
          }
        },

        visualMap: {
          type: 'piecewise',
          right: 0,
          splitNumber: 4,
          orient: 'vertical',
          color:['#ff0000','#d94e5d','#eac736','#50a3ba'],
          pieces: [{
              gt: 10
            },
            {
              gt: 5,
              lte: 10
            },
            {
              lt: 5
            }
          ],
          controller: {
            inRange: {
              symbol: 'circle',
              color: ['#50a3ba', '#eac736', '#d94e5d', '#ff0000'],
            }
          },
          textStyle: {
            color: '#3E4956'
          }
        },
        geo: {
          map: 'taiyuan',
          width: '60%',
          roam: true,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff',
                fontWeight: 500
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#3E4956',
                fontWeight: 500
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#bbbec2',
              borderColor: 'rgba(0,0,0,0.3)',
              borderWidth: 1.5,
            },
            emphasis: {
              areaColor: 'rgba(235,203,30,0.8)'
            }
          }
        },
        series: [{
            name: '待处理',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(this.todoData),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
          },
          {
            name: '已处理',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(this.hiData),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    // this.getInitData();
  }
}
</script>

<style lang="css">
</style>
