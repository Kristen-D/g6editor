<template>
  <div class="whitebackground Whitespace" style="background-color: #fff; padding-bottom: 120px;">
    <div class="top-title" > </div>
    <toolbar :id="toolbarId"></toolbar>
    <el-tabs  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未处理" name="notDotableId">
          <div class="top-title-1 float-l">告警列表</div>
        <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
          <el-button type="primary" size="small" @click="clCheckedRows">处置</el-button>
          <!-- <el-button type="primary" size="small" @click="exportReport">导出</el-button> -->
          <!-- <el-button type="primary" size="small" @click="spCheckedRows">审核</el-button> -->
        </div>
        <alarmInfoListTable :id="notDotableId"></alarmInfoListTable>

      </el-tab-pane>

      <el-tab-pane label="已处理" name="dotableId">
          <div class="top-title-1 float-l">告警列表</div>
            <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;"></div>
        <alarmInfoListTable :id="dotableId"></alarmInfoListTable>
        <!-- <vulnerabilitychart :dateRange="dateRange"></vulnerabilitychart> -->
      </el-tab-pane>

      <el-tab-pane label="历史已处理" name="hisdotableId">
          <div class="top-title-1 float-l">告警列表</div>
            <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;"></div>
        <alarmInfoListTable :id="hisdotableId"></alarmInfoListTable>
        <!-- <vulnerabilitychart :dateRange="dateRange"></vulnerabilitychart> -->
      </el-tab-pane>
    </el-tabs>


</div>

</template>

<script>
import commonAjax from 'components/js/common.js'
import {
mapState
} from 'vuex'
import toolbar from './Toolbar.vue'
import alarmInfoListTable from './AlarmInfoListTable.vue'
// import selectOrganization from "components/selectOrganization/selectOrganization.vue"
export default {
components: {
  toolbar,
  alarmInfoListTable
  //selectOrganization
},
  data() {
    return {
      //自定义属性
      activeName: 'notDotableId',
      toolbarId:'notDotableId',
      notDotableId:'notDotableId',
      dotableId: 'dotableId',
      hisdotableId: 'hisdotableId'
    }
  },
  computed: {
    ...mapState({
    //  orgList:state=>state.context.orgList,
    //  userList:state=>state.context.userList,
      // alarmTypeList:state=>state.context.alarmTypeList,
      // alarmGradeList:state=>state.context.alarmGradeList,
    //  productTypeList:state=>state.context.productTypeList,
    })
  },
  methods: {
    handleClick(tab){
      this.toolbarId = tab.name;
    },
    exportReport() {
      var param = "exportFileName=" + "资产信息表";
      //var params = this.queryForm;
      if (this.params.assetName != null && this.params.assetName != "") {
        param = param + "&assetName=" + this.params.assetName;
      }
      if (this.params.assetCode != null && this.params.assetCode != "") {
        param = param + "&assetCode=" + this.params.assetCode;
      }

      if (this.params.assetIp != null && this.params.assetIp != "") {
        param = param + "&assetIp=" + this.params.assetIp;
      }

      if (this.params.assetOrg != null && this.params.assetOrg != "") {
        param = param + "&assetOrg=" + this.params.assetOrg;
      }

      if (this.params.assetOwner != null && this.params.assetOwner != "") {
        param = param + "&assetOwner=" + this.params.assetOwner;
      }
      //alert(params);
      window.location.href = "/ssa/alarmInfoList/exportReport.do?" + param;
    },
    async clCheckedRows() {
      var rows = this.$store.state.editTable[this.activeName].multipleSelection;
      var i;
      for (i in rows) {
        if ((rows[i].flow_status == 1 && rows[i].is_approve== 1) || rows[i].flow_status == 1 || rows[i].flow_status == 3) {
          this.$alert('选择的数据中存在不能操作的数据', '警告', {
            type: "warning"
          });
          return;
        }
      }
      if (rows.length <= 0) {
        this.$alert("请先选中要操作的记录!");
        return;
      }

      this.$confirm('此操作将处置选中条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var alarmIds = [];
        var alarmIdStr='';
        rows.forEach(row => {
          alarmIdStr=alarmIdStr+row.alarm_id+",";
        })
        var params = {};
        params.tkey = "clInfoForm";
        params.alarmIds = alarmIdStr.substr(0,alarmIdStr.length-1);
        this.$router.push({name:"alarmInfoForm",params:params});
      })
    },
    async spCheckedRows() {
      //alert(this.tableId);
      var rows = this.$store.state.editTable[this.tableId].multipleSelection;
      var i;
      for (i in rows) {
        if ((rows[i].status == 0 && rows[i].is_approve== 0) || rows[i].status == 1 || rows[i].status == 2) {
          this.$alert('选择的数据中存在不能操作的数据', '警告', {
            type: "warning"
          });
          return;
        }
      }
      if (rows.length <= 0) {
        this.$alert("请先选中要操作的记录!");
        return;
      }

      this.$confirm('此操作将审核选中条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var alarmIds = [];
        var alarmIdStr='';
        rows.forEach(row => {
          alarmIdStr=alarmIdStr+row.alarm_id+",";
        })
        var params = {};
        params.tkey = "spInfoForm";
        params.alarmIds = alarmIdStr.substr(0,alarmIdStr.length-1);
        this.$router.push({name:"alarmInfoForm",params:params});
      })
    }
    //methods end
  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
    this.$store.dispatch('loadListNewTypeList');
  }
}
</script>
<style>
.top-title-1 {
    padding-left: 20px;
    margin-bottom: 20px;
    /* margin-top: 10px; */
    /* border-bottom: 1px solid #e1e3e4; */
    font-size: 16px;
    /* line-height: 40px; */
    color: #000;
    font-weight: 500;
}
</style>
