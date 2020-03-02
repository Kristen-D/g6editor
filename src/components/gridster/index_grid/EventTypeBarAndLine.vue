<template >
  <!-- <div id="mymap" style="height:358px;"></div> -->
  <div class="el-panel mygrid-def">
    <div class="el-panel-heading">
      <h3 class="el-panel-title">攻击类型趋势</h3>
      <el-tabs class="float-r day-tabs" v-model="params.dateRange" @tab-click="changeTime">
        <el-tab-pane label="今天" name="day"></el-tab-pane>
        <el-tab-pane label="近7天" name="week"></el-tab-pane>
        <el-tab-pane label="近30天" name="month"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="el-panel-body">
      <el-row :gutter="10">
        <el-col :span="8">
          <div id="ThreatypePie" class="echartbox2"></div>
        </el-col>
        <el-col :span="16">
          <!-- <div class="el-panel-white-subtitle">受攻击趋势</div> -->
          <div id="attackLine" class="echartbox2"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  computed: {
    ...mapState({
      params: state => state.context.params,
      test: state => state.context.test,
      eventTypeList: state => state.context.eventTypeList,
      ProductTypeList: state => state.context.ProductTypeList,
      EventThreatList: state => state.context.EventThreatList,
    })  },

  data() {
    return {
      isOpen: false,
      currentIndex: -1,
      cacheData: [],
      activeName: "3",
    }
  },

  watch: {
    params: function (params) {
      //  alert("111");
      this.loadMapChart();
    },
    test: function (test) {
      //  alert(test);
      //  this.loadMapChart();
    },
  },
  methods: {
    changeTime(value) {

      Vue.nextTick(() => {
        this.loadMapChart();
      })

    },
    fmtEventTypeList(val) {

      for (var item in this.eventTypeList) {
        if (val == this.eventTypeList[item].id) {
          return this.eventTypeList[item].text;
        }
      }

    },
    fmtEventRiskList(val) {

      //  for(var item in this.EventRiskList) {
      //      if (val==this.EventRiskList[item].id){
      //        return this.EventRiskList[item].text;
      //      }
      //  }

      if (val == 1) {
        return "低危";
      } else if (val == 2) {
        return "中危";
      } else if (val == 3) {
        return "高危";
      }

    },
    fmtEventThreatList(val) {
      // console.log(this.eventTypeList);
      for (var item in this.EventThreatList) {
        if (val == this.EventThreatList[item].id) {
          return this.EventThreatList[item].text;
        }
      }

    },

    loadMapChartPieByRiskType(data2) {
      var myChart2 = echarts.init(document.getElementById('ThreatypePie'));
      var seriesData2 = [];
      for (var i = 0; i < data2.length; i++) {
        var childData2 = {          value: 0, name: '高危',
          itemStyle: {
            normal: {
              color: '#f3ce21'
            }
          }
        };
        childData2.value = data2[i].count;
        childData2.name = this.fmtEventRiskList(data2[i].event_risk_level);
        if (data2[i].event_risk_level == 1) {
          childData2.itemStyle.normal.color = '#f3ce21';
        } else if (data2[i].event_risk_level == 2) {
          childData2.itemStyle.normal.color = '#ff7348';
        } else {
          childData2.itemStyle.normal.color = '#f53c61';
        }
        seriesData2.push(childData2);
      }


      var option2 = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
          name: '威胁类型',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['35%', '48%'],
          roseType: 'radius',//南丁格尔玫瑰图
          label: {
            normal: {
              textStyle: {
                fontSize: 12,
                color: '#9ea3b4',
              }

            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: '18',
                formatter: "{b} <br/>{a}: {c} ({d}%)"
                //  fontWeight: 'bold'
              }
            }
          },
          data: seriesData2
        }]
      };
      myChart2.setOption(option2z);
      myChart2.on('click', function (params) {
        let parameters = {};
        let riskMap = new Map();
        riskMap.set("低危", 1);
        riskMap.set("中危", 2);
        riskMap.set("高危", 3);
        parameters.riskLevel_s = riskMap.get(params.name);
        parameters.time = vm.params.dateRange;
        parameters.dateRange = vm.params.dateRange;
        parameters.old_total = params.value;
        parameters.module = 'threatView2_drilling';
        parameters.detailUrl = '/ssa/situationAnaly/getPieByRiskTypeDetail.do';
        vm.$store.commit('openDrillDialogTable', parameters);
        vm.$store.dispatch('getDrillColumns', [vm, params.name]);
        vm.$store.dispatch('loadDrillTableData');
        // vm.funbs(params.name,params.dataIndex);
      });
    },

    loadMapChartEventThreatType(data) {

      var myChart = echarts.init(document.getElementById("attackLine"));
      var lenData = [];
      var seriesData = [];
      var xAxis = [];




      // for(var i = 0; i < data[0].length; i++){
      //   var dataUnit = data[0][i];
      //     xAxis.push(dataUnit.event_src_ip);
      // };
      for (var i = 0; i < data.xAxis.length; i++) {
        xAxis.push(data.xAxis[i]);
      };

      for (var i = 0; i < data.eventThreatTypeList.length; i++) {
        var dataUnit = data.eventThreatTypeList[i];
        lenData.push(this.fmtEventThreatList(dataUnit.event_threat_type).toString());
      };


      var myLenData = [];
      for (var i = 0; i < lenData.length; i++) {
        var childData = {
          name: '登出',
          icon: 'circle'
        };
        childData.name = lenData[i];
        myLenData.push(childData);
      };




      for (var i = 0; i < data.lineData.length; i++) {
        var dataUnit = data.lineData[i];
        var childData = {
          name: '1',
          type: 'line',
          smooth: true,
          lineStyle: { //线条样式
            normal: {
              width: 1
            }
          },
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: []
        };



        for (var j = 0; j < dataUnit.length; j++) {
          var list = [];
          list.push(dataUnit[j].days.toString());
          list.push(dataUnit[j].count);
          childData.data.push(list);
          childData.name = this.fmtEventThreatList(dataUnit[j].event_threat_type).toString();
        };
        // console.log(childData.data);
        seriesData.push(childData);
      };

      var option = {
        color: ['#1B55A5', '#00B8FF', '#FDB502', '#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
        legend: {
          top: '18',
          left: '10',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 25,
          textStyle: {
            color: '#3E4956',
            fontSize: 12,
          },
          data: myLenData,
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 14,
            color: "#fff",
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '10%',
          containLabel: true,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: true, //坐标轴两边留白策略（类目轴）
            splitLine: { //坐标轴在 grid 区域中的分隔线。
              show: false,
              lineStyle: {
                color: '#E1E3E4'
              }
            },
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#E1E3E4'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#3E4956',
              },
            },
            axisTick: { //坐标轴刻度相关设置。
              show: false,
            },
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            splitNumber: 4,
            splitLine: { //坐标轴在 grid 区域中的分隔线。
              show: true,
              lineStyle: {
                color: '#E1E3E4'
              }
            },
            axisLine: { //坐标轴轴线相关设置。数学上的y轴
              show: false,
              lineStyle: {
                color: '#E1E3E4'
              },
            },
            axisLabel: {
              textStyle: {
                color: '#3E4956'
              },
            },
            axisTick: { //坐标轴刻度相关设置。
              show: false,
            },
          }
        ],
        series: seriesData
      }; // option结束





      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);


      let vm = this;
      myChart.on('click', function (params) {
        let parameters = {};
        let typeObj = vm.EventThreatList.find((obj) => {
          return params.seriesName === obj.text
        });
        parameters.threatType_s = typeObj.id;
        parameters.dateRange = vm.params.dateRange;
        parameters.old_total = params.value[1];
        parameters.time = vm.params.dateRange;
        parameters.module = 'threatView4_drilling';
        parameters.detailUrl = '/ssa/situationAnaly/getLineByEventThreatTypeDetail.do';
        parameters.timeValue = params.value[0];
        vm.$store.commit('openDrillDialogTable', parameters);
        vm.$store.dispatch('getDrillColumns', [vm, params.seriesName + "_" + params.value[0]]);
        vm.$store.dispatch('loadDrillTableData');
        // vm.funbs(params.name,params.dataIndex);
      });

      window.onresize = myChart.resize;




    },
    loadMapChart() {
      this.commonAjax.req("/ssa/situationAnaly/getLineByEventThreatType.do", this.params).then(data => {
        this.loadMapChartEventThreatType(data);
      });
      this.commonAjax.req("/ssa/situationAnaly/getPieByRiskType.do", this.params).then(data => {
        this.loadMapChartPieByRiskType(data);
      });
    }
  },
  created: function () {

  },
  mounted: function () {
    this.loadMapChart();

  }

}
</script>
