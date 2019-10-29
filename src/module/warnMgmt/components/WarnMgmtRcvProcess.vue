<template>
  <!-- 我收到的流程-->
<div>
  <!--<toolbar :id="toolBarId"></toolbar>-->
  <div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-input v-model="queryForm.alert_header" placeholder="预警名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-select v-model="queryForm.org_id" clearable filterable placeholder="处置单位">
          <el-option v-for="item in orgList" :label="item.name" :value="item.value">
          </el-option>
        </el-select>

      </el-form-item> -->
      <el-form-item  label="">
        <selectOrganization v-model="queryForm.org_id" style="width:160px" orgType="2" orgstring="事发单位">
        </selectOrganization>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="queryForm.alert_level" placeholder="预警等级" clearable>
          <el-option label="低" value="1"></el-option>
          <el-option label="中" value="2"></el-option>
          <el-option label="高" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" required>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.startTime" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.endTime" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-tabs v-model="activeTable" @tab-click="handleClick">
    <el-tab-pane :label="todoLabel" name="warnMgmtTodoTable">
      <warnMgmtTodoTask :id="warnMgmtTodoTable"></warnMgmtTodoTask>
    </el-tab-pane>
    <el-tab-pane :label="hiLabel" name="warnMgmtHiTable">
      <warnMgmtHiTask :id="warnMgmtHiTable"></warnMgmtHiTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
//网络运营单位收到信息

import warnMgmtTodoTask from './WarnMgmtTodoTask'
import warnMgmtHiTask from './WarnMgmtHisTask'
import selectOrganization from "components/selectOrganization/selectOrganization.vue"
//import toolbar from './Toolbar'
import {mapState}from 'vuex'
export default {
  components: {
    //toolbar,
    selectOrganization,
    warnMgmtTodoTask,
    warnMgmtHiTask
  },
  computed: {
    ...mapState({
        // orgList: state => state.process.orgList,
      //isCompany :state => state.process.isCompany
    })
  },
  data() {
    return {
      //是否网络运营单位
      activeTable: 'warnMgmtTodoTable',
      warnMgmtTodoTable:"warnMgmtTodoTable",
      warnMgmtHiTable:"warnMgmtHiTable",
      orgList:[],
    //  toolBarId:"warnMgmtTodoTable",
      queryForm: {
        org_id: null,
        alert_level: null,
        alert_header: "",
        startTime: null,
        endTime: null
      },
      todoLabel:"待处理",
      hiLabel:"已处理"
    };
  },
  mounted: function() {
      this.utils.req("/ssa/organization/getCompanyOrg.do", null, this).then(data => {
      this.orgList = data;
    });
  },
  methods: {
    queryData() {

      if (this.queryForm.startTime != null && this.queryForm.startTime != "") {
        this.queryForm.startTime = this.utils.formatDate(new Date(this.queryForm.startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.queryForm.endTime != null && this.queryForm.endTime != "") {
        this.queryForm.endTime = this.utils.formatDate(new Date(this.queryForm.endTime), "yyyy-MM-dd hh:mm:ss");
      }
      var params = this.queryForm;
      this.$store.commit('setParams', [this.activeTable, params]);
      this.$store.dispatch('reloadTable', this.activeTable);
    },
    handleClick(tab, event) {
      this.activeTable = tab.name;
      this.queryData();
    }
  },
  created:function(){
    //判断是否为网络运营单位
    // if(this.isCompany){
    //   this.todoLabel = "待反馈";
    //   this.hiLabel= "已反馈";
    // }
  }
};
</script>
