<template>
  <div class="whitebackground Whitespace" >
    <div class="top-title"> </div>
    <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
      <el-form :model="queryForm" ref="queryForm" label-width="100px">
        <el-form-item style="display:inline-block; margin-left: -100px;" label="" v-if="!advancedFlag">
          <el-select v-model="queryForm.alarm_type" clearable placeholder="告警类型">
            <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block;" v-if="!advancedFlag">
          <el-button type="primary" class="button-p-2" @click="qryData(0)">搜索</el-button>
        </el-form-item>
        <div class="" v-if="advancedFlag" style="display:inline-block;">
          <el-form-item style="display:inline-block;" label="告警类型" v-if="advancedFlag">
            <el-select v-model="queryForm.alarm_type" clearable placeholder="告警类型">
              <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风险级别" style="display:inline-block;">
            <el-select v-model="queryForm.alarm_grade" clearable style="width:204px;" placeholder="告警等级">
              <el-option v-for="item in alarmGradeList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="源IP" style="display:inline-block;">
            <el-input placeholder="源IP" v-model="queryForm.src_ip"> </el-input>
          </el-form-item>

          <el-form-item label="目标IP" style="display:inline-block;">
            <el-input placeholder="目标IP" v-model="queryForm.dst_ip"> </el-input>
          </el-form-item>

          <!-- <el-form-item label="状态" style="display:inline-block;">
          <el-select v-model="queryForm.flow_status"  placeholder="状态">
             <el-option   label="未处理" value="1">
            </el-option>
            <el-option   label="待审核" value="1">
            </el-option>
            <el-option   label="待处理" value="2">
            </el-option>
            <el-option   label="已完成" value="3">
            </el-option>
          </el-select>
        </el-form-item> -->

          <el-form-item label="告警时间" style="display:inline-block;">
            <el-datePicker v-model="queryForm.alarm_time" placeholder="告警时间">
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
    </div>


    <el-tabs v-model="queryForm.task_status" @tab-click="tabsClick">
      <div class="operate float-r" style="margin-bottom:5px;" v-show="queryForm.task_status==0">
        <el-button type="primary" size="small" @click="clCheckedRows">归档</el-button>

      </div>
      <el-tab-pane label="待处理" name="0">
      </el-tab-pane>

      <el-tab-pane label="已处理" name="1">
      </el-tab-pane>
    </el-tabs>
    <alarmInfoListTable :id="tableId"></alarmInfoListTable>
  </div>

</template>

<script>
  import commonAjax from 'components/js/common.js'
  import {
    mapState
  } from 'vuex'
  import alarmInfoListTable from './AlarmInfoListTable.vue'
  export default {
    components: {
      alarmInfoListTable
      //selectOrganization
    },
    data() {
      return {

        //自定义属性
        tableId: 'alarmInfoTable',
        advancedFlag: false,
        queryForm: {
          alarm_type: "",
          alarm_grade: "",
          src_ip: "",
          dst_ip: "",
          user_id: "",
          task_status: "0",
          status: "",
          org_id: "",
          alarm_time: "",
          product_type: ""
        },

      }
    },
    computed: {
      ...mapState({
        //  orgList:state=>state.context.orgList,
        //  userList:state=>state.context.userList,
        alarmTypeList: state => state.context.alarmTypeList,
        alarmGradeList: state => state.context.alarmGradeList,
        //  productTypeList:state=>state.context.productTypeList,
      })
    },
    methods: {
      tabsClick() {
        this.qryData();
      },
      showAdvanced() {
        this.advancedFlag = true;
      },
      hideAdvanced() {
        this.advancedFlag = false;
      },
      qryData(val) {
        this.queryForm.alarm_time = commonAjax.formatDate(this.queryForm.alarm_time, "yyyy-MM-dd");
        var tableId = this.tableId;
        var params = this.queryForm;
        this.$store.commit('setParams', [tableId, params]);
        this.$store.dispatch('reloadTable', tableId);
      },
      async clCheckedRows() {
        var rows = this.$store.state.editTable[this.tableId].multipleSelection;

        if (rows.length <= 0) {
          this.$alert("请先选中要操作的记录!");
          return;
        }

        this.$confirm('此操作将归档选中条目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var idArr = [];
          rows.forEach(r => {
            idArr.push(r.alarm_id)
          })
          let ids = idArr.join(",");
          let result = await this.common.reqDef("/ssa/alarmProcess/cleanAlarms.do", {
            alarm_ids: ids
          });
          this.$alert("清除成功!");
          this.qryData();
        })
      },

      //methods end
    },
    created: function () {
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
