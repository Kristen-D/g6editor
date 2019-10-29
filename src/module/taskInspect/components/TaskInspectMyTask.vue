<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column v-if="this.id == 'myTaskTable'" type="selection" >
    </el-table-column>
    <el-table-column  prop="orgName" label="被检查单位" align="center">
    </el-table-column>
    <el-table-column prop="inspection_address" label="检查地点" align="center">
    </el-table-column>
    <el-table-column prop="inspectorName" label="检查人员" align="center">
    </el-table-column>
    <el-table-column prop="inspection_time_start" label="检查日期" sortable  align="center">
    </el-table-column>
    <el-table-column prop="send_time" label="填发时间" sortable align="center">
    </el-table-column>
    <el-table-column prop="state"  v-if="this.id != 'companyTable'" label="状态" align="center">
    </el-table-column>
    <el-table-column prop="type"  v-if="this.id == 'companyTable'" label="通知类型" align="center" :formatter="formatter">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button  type="text" @click="handleView(scope.row)" class="operate-left">查看</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
        <el-button type="text" v-if="scope.row.status == 0 && !isCompany && scope.row.handle =='permitted'" @click="handleEdit(scope.row)" class="operate-center">编辑</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0">|</span>
        <el-button type="text" v-if="scope.row.status == 0 && !isCompany && scope.row.handle =='permitted'" @click="handleAduit(scope.row)" class="operate-right">人工检查</el-button>
      </template>
     </el-table-column>
   </el-table>
   <el-pagination class="float-r page-location"
    @current-change="handleCurrentChange"
   :page-size="defConf.pageSize"
   :current-page="defConf.pageIndex"
   layout="total, prev, pager, next, jumper"
   :total="defConf.total">
  </el-pagination>
    </div>
 </template>

 <script>
import {mapState}from 'vuex'
export default {
  props: ["id"],
  data() {
    return {
      defConf: {}
    }
  },
  computed: {
    ...mapState({
      isCompany :state => state.process.isCompany
    })
  },
  methods: {
    formatter(row, column){
      if(row.isBulletin != null){
        return "通报";
      }else {
        return "检查通知";
      }
    },
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
      return;
    },
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleView(row) {
      row.handle = "view";
      var processInstance = {};
      processInstance.processInstanceId = row.processInstanceId;
      row.processInstance = processInstance;
      this.$router.push({
        name: 'taskInspectHandle',
        params: row
      });

    },
    handleEdit(row) {
      row.handle = "update";
      row.checkeItems = row.inspection_item.split(",");
      this.$router.push({
        name: 'mainForm',
        params: row
      });

    },
    async handleAduit(row) {
      var result = await this.utils.req("/ssa/taskInspect/startProcess.do", row, this);
      this.$message({
        type: "success",
        message: result
      });
      this.$store.dispatch('reloadTable', this.id);
      this.$store.dispatch('reloadTable', "todoTaskTable");

    }
  },
  created: async function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      //默认ajax属性
      tableUrl: "/ssa/taskInspect/getTaskInspect.do",
      params: {},
    };


    if (this.id == "myTaskHiTable") {
      defConf.params = {
        finished: "finished"
      };
    }else if(this.id == "myTaskTable"){
      defConf.params = {
        running: "running"
      };
    }

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
