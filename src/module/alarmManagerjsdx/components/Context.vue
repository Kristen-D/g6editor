<template>
<div class="whitebackground Whitespace" style="background-color: #fff; padding-bottom: 100px;">

  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
    <el-form :model="queryForm" ref="queryForm" label-width="100px">

      <el-form-item style="display:inline-block;" label="告警类型" v-if="!advancedFlag">
        <el-select v-model="queryForm.alarmType" clearable placeholder="告警类型">
          <el-option v-for="item in alarmTypeList" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="display:inline-block;" v-if="!advancedFlag">
        <el-button type="primary" class="button-p-2" @click="qryData(0)">搜索</el-button>
      </el-form-item>
      <div class="" v-if="advancedFlag" style="display:inline-block;">
        <el-form-item style="display:inline-block;" label="告警类型" v-if="advancedFlag">
          <el-select v-model="queryForm.alarmType" clearable placeholder="告警类型">
            <el-option v-for="item in alarmTypeList" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风险级别" style="display:inline-block;">
          <el-select v-model="queryForm.alarmGrade" clearable style="width:204px;" placeholder="告警等级">
            <el-option v-for="item in alarmGradeList" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="源IP" style="display:inline-block;">
          <el-input placeholder="源IP" v-model="queryForm.srcIp"> </el-input>
        </el-form-item>

        <el-form-item label="目标IP" style="display:inline-block;">
          <el-input placeholder="目标IP" v-model="queryForm.dstIp"> </el-input>
        </el-form-item>

        <el-form-item label="状态" style="display:inline-block;" >
          <el-select v-model="queryForm.status" placeholder="状态" clearable>
            <el-option label="待处理" value="0">
            </el-option>
            <el-option label="进行中" value="1">
            </el-option>
            <el-option label="已完成" value="2">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="告警时间" style="display:inline-block;">
          <el-datePicker v-model="queryForm.alarmTime" placeholder="告警时间">
          </el-datePicker>
        </el-form-item>
      </div>
      <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:5px;">
        <el-button type="primary" class="button-p-2" @click="qryData(0)">搜索</el-button>
      </el-form-item>

      <div class="float-r">
        <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
          <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
        </p>
        <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
          <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
        </p>
      </div>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="告警列表" name="list"></el-tab-pane>
      <el-tab-pane label="待处理" name="todolist"></el-tab-pane>
      <el-tab-pane label="已处理" name="hilist"></el-tab-pane>
    </el-tabs>
    <alarmInfoListTable :id="tableId" :url="tableUrl" :type="activeName"></alarmInfoListTable>

  </div>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import alarmInfoListTable from './AlarmInfoListTable'
import commonAjax from 'components/js/common.js'
export default {
  components: {
    alarmInfoListTable
  },
  computed: {
    ...mapState({
      alarmTypeList: state => state.context.alarmTypeList,
      alarmGradeList: state => state.context.alarmGradeList
    })
  },
  data() {
    return {
      tableId: "alarmTable",
      tableUrl: "/ssa/alarmManagerJs/getAlarmList.do",
      activeName: 'list',
      advancedFlag: false,
      queryForm: {
        alarmType: "",
        alarmGrade: "",
        srcIp: "",
        dstIp: "",
        userId: "",
        taskStatus: "0",
        status: "",
        orgId: "",
        alarmTime: "",
        productType: ""
      },
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name == "list") {
        this.tableUrl = "/ssa/alarmManagerJs/getAlarmList.do";
      } else if (tab.name == "todolist") {
        this.tableUrl = "/ssa/alarmManagerJs/listTask.do";
      } else if (tab.name == "hilist") {
        this.tableUrl = "/ssa/alarmManagerJs/listCompleteTask.do";
      }

    },
    qryData(val) {
      this.queryForm.alarmTime = commonAjax.formatDate(this.queryForm.alarmTime, "yyyy-MM-dd");
      var tableId = this.tableId;
      var params = this.queryForm;
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
    showAdvanced() {
      this.advancedFlag = true;
    },
    hideAdvanced() {
      this.advancedFlag = false;
    }
  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
  }

}
</script>

<style>
.top-title-1 {
  padding-left: 20px;
  /* margin-bottom: 20px; */
  margin-top: 10px;
  /* border-bottom: 1px solid #e1e3e4; */
  font-size: 16px;
  line-height: 40px;
  color: #000;
  font-weight: 500;
}
</style>
