<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%">

    <el-table-column prop="orgName" label="被检查单位" align="center">
    </el-table-column>
    <el-table-column prop="inspection_address" label="检查地点" align="center">
    </el-table-column>
    <el-table-column prop="inspectorName" label="检查人员" align="center">
    </el-table-column>
    <el-table-column prop="inspection_time_start" label="检查日期" align="center">
    </el-table-column>
    <el-table-column prop="send_time" label="填发时间" align="center">
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
    </el-table-column>
    <el-table-column prop="taskName" label="任务名称" align="center">
    </el-table-column>
    <el-table-column prop="endTime" label="任务完成时间" align="center" sortable>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template scope="scope">
        <el-button  type="text" @click="handleView(scope.row)">查看</el-button>
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
export default {
  props: ["id"],
  data() {
    return {
      defConf: {}
    }
  },
  methods: {

    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleView(row) {
      var params = row;
      params.tkey = row.taskDefinitionKey;
      params.orgName = row.orgName;
      this.$router.push({
        name: 'mainHiTaskDetail',
        params: params
      })

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
      tableUrl: "/ssa/taskInspect/listCompleteTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
