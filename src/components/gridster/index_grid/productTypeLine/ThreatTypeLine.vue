<template>
  <!-- <div id="mymap" style="height:358px;"></div> -->
  <div class="el-panel mygrid-def">
    <div class="el-panel-heading">
      <h3 class="el-panel-title">威胁视图</h3>
      <el-tabs class="float-r day-tabs" v-model="params.dateRange" @tab-click="changeTime">
        <el-tab-pane label="今天" name="day"></el-tab-pane>
        <el-tab-pane label="近7天" name="week"></el-tab-pane>
        <el-tab-pane label="近30天" name="month"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="el-panel-body">
      <el-row>
        <!-- <el-col :span="9"><div id="flowDayRadarB" class="echartbox2"></div></el-col> -->
        <el-col :span="9">
          <div style="height:230px;">
            <e-charts @chartclick="chartClick" :options="option" class="echartbox2" auto-resize></e-charts>
          </div>
        </el-col>
        <el-col :span="14">
          <el-table :data="EventThreatTypeTop5" style="width: 100%" class="nobordertable">
            <el-table-column prop="id" label="序号" show-overflow-tooltip align="center">
              <template scope="scope">
                <span style="padding: 2px 5px; color: #fff; border: 1px solid #2196f3; background-color: #2196f3;">
                  {{
                  scope.row.id }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="event_subtype" label="威胁类型" show-overflow-tooltip align="center">
              <template scope="scope">
                <div>
                  <span style="margin-left: 10px">{{ fmtEventThreatList(scope.row.event_threat_type) }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="威胁者IP数量" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="ipCount" label="威胁目标IP量" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="productCount" label="威胁数量" show-overflow-tooltip align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex';
import ECharts from "../../../vue-echarts/ECharts";
// import echarts from 'echarts';
export default {
  components: {
    ECharts
  },
  computed: {
    ...mapState({
      test: state => state.context.test,
      eventTypeList: state => state.context.eventTypeList,
      ProductTypeList: state => state.context.ProductTypeList,
      EventThreatList: state => state.context.EventThreatList,
    })
  },

  data() {
    return {
      isOpen: false,
      currentIndex: -1,
      cacheData: [],
      params: {
        dateRange: 'week'
      },
      activeName: "3",
      EventThreatTypeTop5: [],
      option: {
        backgroundColor: '#ffffff',
        color: ['#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
        tooltip: {
          trigger: 'item',
        },
        series: [{
          name: '威胁类型',
          type: 'pie',
          center: ['40%', '46%'],
          radius: ['40%', '60%'],
          startAngle: 0, //起始角度，支持范围[0, 360]。
          itemStyle: { //图形样式
            normal: {
              borderWidth: 4,
              borderColor: '#ffffff',
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 3,
            }
          },
          label: {
            normal: {
              textStyle: {
                fontSize: 12,
                color: '#3E4956',
              }

            },
          },
          data: []
        }]
      }
    }
  },


  methods: {
    changeTime(value) {
      Vue.nextTick(() => {
        this.initData();

      })
    },
    initData() {
      this.commonAjax.req("/ssa/situationAnaly/getCountEventThreatTypeTop5wx.do", this.params).then(data => {
        this.loadMapChart(data);
      })
    },
    fmtEventThreatList(val) {
      // console.log(this.eventTypeList);
      for (var item in this.EventThreatList) {
        if (val == this.EventThreatList[item].id) {
          return this.EventThreatList[item].text;
        }
      }

    },
    fmtEventTypeList(val) {

      for (var item in this.eventTypeList) {
        if (val == this.eventTypeList[item].id) {
          return this.eventTypeList[item].text;
        }
      }

    },
    fmtProductTypeList(val) {
      // console.log(val);
      for (var item in this.ProductTypeList) {
        if (val == this.ProductTypeList[item].id) {
          return this.ProductTypeList[item].text;
        }
      }

    },
    loadMapChart(data) {
      // var myChart = echarts.init(document.getElementById("flowDayRadarB"));
      var seriesData = [];

      this.EventThreatTypeTop5 = data;

      for (var i = 0; i < data.length; i++) {
        var dataUnit = data[i];
        var childData = {
          value: 15,
          name: '其他'
        };

        childData.value = dataUnit.count;
        childData.name = this.fmtEventThreatList(dataUnit.event_threat_type).toString();

        // console.log(childData.data);
        seriesData.push(childData);
      };
      this.option.series[0].data = seriesData;

      // 使用刚指定的配置项和数据显示图表。
      // myChart.setOption(option);
      // window.onresize=myChart.resize;

      // myChart.on('click', function(params) {
      //
      // });

    },
    chartClick(params) {
      let vm = this;
      let parameters = {};
      let threatObj = vm.EventThreatList.find((obj) => {
        return obj.text === params.name;
      });
      parameters.threatType_s = threatObj.id;
      parameters.module = 'attackView_drilling';
      parameters.detailUrl = '/ssa/situationAnaly/getCountEventThreatTypeTop5Detail.do';
      parameters.time = vm.params.dateRange;
      parameters.dateRange = vm.params.dateRange;
      parameters.old_total = params.value;
      vm.$store.commit('openDrillDialogTable', parameters);
      vm.$store.dispatch('getDrillColumns', [vm, params.name]);
      vm.$store.dispatch('loadDrillTableData');
      // vm.funbs(params.name,params.dataIndex);
    }

  },
  created: function () {

  },
  mounted: async function () {
    this.initData();

  }

}

</script>
