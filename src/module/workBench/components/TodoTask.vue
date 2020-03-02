<template >
<div class="el-panel-white">
  <div class="el-panel-white-heading">
    <h3 class="el-panel-white-title">待办任务</h3></div>
  <div class="el-panel-white-body" style="padding: 6px;!important">
    <el-tabs v-model="activeName" class="workbench-tabs" @tab-click="changeProcess">
      <el-tab-pane name="first">
        <p slot="label">预警<span class="tabsNum">{{warnMgmtProcess.total}}</span></p>
        <div class="position_box">
          <div id="inner-content2">
            <ul class="work_tabs_cont">
              <li class="icon_r" v-for="m in warnMgmtProcess.data" style="cursor:pointer" @click="goDetail('warnMgmtProcess')">
                <p>{{m.alert_header}}</p>
                <p class="p2">{{m.alert_time}}</p>
              </li>
            </ul>
          </div>
          <div class="work_tabs_bg"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="third" class="workbench-tabs">
        <p slot="label">事件<span class="tabsNum">{{eventMgmtProcess.total}}</span></p>
        <div class="position_box">
          <div id="inner-content2">
            <ul class="work_tabs_cont">
              <li class="icon_b" v-for="m in eventMgmtProcess.data" style="cursor:pointer" @click="goDetail('eventMgmtProcess')">
                <p>{{m.title}}</p>
                <p class="p2">{{m.event_time}}</p>
              </li>
            </ul>
          </div>
          <div class="work_tabs_bg"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="fourth" class="workbench-tabs">
        <p slot="label">智监<span class="tabsNum">{{classifiedP_UnitProcess.total}}</span></p>
        <div class="position_box">
          <div id="inner-content2">
            <ul class="work_tabs_cont">
            <li class="icon_g" v-for="m in classifiedP_UnitProcess.data" style="cursor:pointer" @click="goDetail(m.module_type)" >
                <p>{{m.module_type}}-{{m.name}}</p>
                <p class="p2">{{m.time}}</p>
              </li>
            </ul>
          </div>
          <div class="work_tabs_bg"></div>
        </div>
      </el-tab-pane>



      <el-tab-pane name="fifth" class="workbench-tabs">
        <p slot="label">案件<span class="tabsNum">{{caseInvestigate.total}}</span></p>
        <div class="position_box">
          <div id="inner-content2">
            <ul class="work_tabs_cont">
              <li class="icon_g" v-for="m in caseInvestigate.data" style="cursor:pointer" @click="goDetail('caseInvestigate')">
                <p>{{m.case_name}}</p>
                <p class="p2">{{m.case_time}}</p>
              </li>
            </ul>
          </div>
          <div class="work_tabs_bg"></div>
        </div>
      </el-tab-pane>



    </el-tabs>

  </div>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import echarts from 'echarts'
export default {
  data() {
    return {
      activeName: "first",
      params: {
        myType: 'warnMgmtProcess'
      },
      eventMgmtProcess: [],
      warnMgmtProcess: [],
      classifiedP_UnitProcess: [],
      caseInvestigate: [],
      taskInspectProcess: []
    }
  },
  methods: {
    goDetail(type) {
      var _iframe = window.parent.document.getElementById("_main_iframe");
      var path = "";
      if (type == 'caseInvestigate') {
        path = "/ssa/caseInvestigate/begin.do";
      } else if (type == 'eventMgmtProcess') {
        path = "/ssa/eventMgmt/begin.do";
      } else if (type=='warnMgmtProcess'){
        path = "/ssa/warnMgmt/begin.do";
      }else if (type=='单位备案'){
       path = "/ssa/classifiedP/begin_unit.do";
     } else if (type=='系统备案'){
       path = "/ssa/classifiedP/begin_system.do";
     } else if (type=='机构测评'){
       path = "/ssa/evaluationOrgan/begin_evaluationOrgan.do";
     }else if (type=='任务督查'){
       path = "/ssa/taskInspect/begin.do";
     }
      $.hash("url", path);
      var url = $.hash("url");
      Vue.nextTick(() => {
        _iframe.contentWindow.location.replace(url);
      })
    },
    loadMapChart() {
      this.params.myType = "eventMgmtProcess";
      this.utils.req("/ssa/workBench/getTodoTasksByType.do", this.params).then(data => {
        this.eventMgmtProcess = data;
      });

      this.params.myType = "caseInvestigate";
      this.utils.req("/ssa/workBench/getTodoTasksByType.do", this.params).then(data => {
        this.caseInvestigate = data;
      });



      this.params.myType = "warnMgmtProcess";
      this.utils.req("/ssa/workBench/getTodoTasksByType.do", this.params).then(data => {
        this.warnMgmtProcess = data;
      });


      this.params.myType = "classifiedP_UnitProcess";
      this.utils.req("/ssa/workBench/getTodoTasksByType.do", this.params).then(data => {
        this.classifiedP_UnitProcess = data;
      });



    }
  },

  mounted: function() {


    this.loadMapChart();
    $("#inner-content1,#inner-content2,#inner-content3,#inner-content4").slimScroll({
          height: '290px',
   });
  }

}
</script>
