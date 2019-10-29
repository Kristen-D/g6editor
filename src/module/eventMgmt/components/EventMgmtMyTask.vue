<template>
<div>



  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">

    <el-table-column type="selection" v-if="this.id == 'myTaskTable'">
    </el-table-column>

    <el-table-column prop="event_handling_header" label="事件名称" align="center">

    </el-table-column>
    <el-table-column prop="unit_name" label="事发单位" align="center">
    </el-table-column>

    <el-table-column prop="eventLevel" label="等级" align="center">

    </el-table-column>


    <el-table-column prop="event_type_name" label="类型" width="250" align="center">

    </el-table-column>

    <el-table-column prop="state" label="状态" align="center">

    </el-table-column>


    <el-table-column prop="event_time" label="发生时间" align="center" sortable>

    </el-table-column>


    <el-table-column label="操作" min-width="100" align="center">

      <template scope="scope">
       <el-button  type="text" @click="handleView(scope.row)" class="operate-left">查看</el-button>
       <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
       <el-button type="text" v-if="scope.row.status == 0 && scope.row.handle =='permitted'" @click="handleEdit(scope.row)" class="operate-center">编辑</el-button>
       <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
       <el-button type="text" v-if="scope.row.status == 0 && scope.row.handle =='permitted'" @click="handleAduit(scope.row)" class="operate-right">提交</el-button>
     </template>
   </el-table-column>
 </el-table>

 <el-pagination
  @current-change="handleCurrentChange"
  class="float-r page-location"
 :page-size="defConf.pageSize"
 :current-page="defConf.pageIndex"
 layout="total, prev, pager, next, jumper"
 :total="defConf.total">
</el-pagination>



</div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      defConf: {},
      multipleSelection: []
    }

  },
  methods: {
    //分页方法
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleEdit(row) {
      row.handle = "update";
      this.$router.push({
        name: 'mainForm',
        params: row
      });
    },
    handleView(row) {
      row.handle = "view";
      var processInstance = {};
      processInstance.processInstanceId = row.processInstanceId;
      row.processInstance = processInstance;
      this.$router.push({
        name: 'eventMgmtHandle',
        params: row
      });
    },
    onSubmit() {},
    handleClick() {},

    //提交审核
    async handleAduit(row) {
      var result = await this.utils.req("/ssa/eventMgmt/startProcess.do", row, this);
      this.$message({
        type: "success",
        message: result
      });
      this.$store.dispatch('reloadTable', this.id);
      this.$store.dispatch('reloadTable', "todoTaskTable");
    },

    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
      return;
    }

  },
  mounted: function() {},
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/eventMgmt/getEventHandleInfo.do",
      params: {},
      saveUrl: "/ssa/eventMgmt/saveEventHandleInfo.do",
      delUrl: "/systemMgmt_userCfg/delUser.do",
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
<style>
.toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
}
</style>
