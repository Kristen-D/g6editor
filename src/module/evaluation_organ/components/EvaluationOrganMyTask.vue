<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" v-show="this.id == 'myTaskTable'">
    </el-table-column>
    <el-table-column prop="organization_name" label="测评单位名称">
    </el-table-column>
    <el-table-column prop="record_approval_code" label="备案证明编号">
    </el-table-column>
    <el-table-column prop="sys_name" label="系统名称">
    </el-table-column>
    <el-table-column prop="info_sys_protec_level" label="安全保护等级">
    </el-table-column>
    <el-table-column prop="evaluation_conclusion" label="测评结论">
    </el-table-column>
    <el-table-column prop="evaluation_time" label="测评时间">
    </el-table-column>
    <el-table-column label="操作" >
      <template scope="scope">
        <el-button  type="text" @click="handleView(scope.row)" class="operate-left">查看</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
        <el-button type="text" v-if="scope.row.status == 0 && scope.row.handle =='permitted'" @click="handleEdit(scope.row)" class="operate-center">编辑</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
        <el-button type="text" v-if="scope.row.status == 0 && scope.row.handle =='permitted'" @click="handleAduit(scope.row)" class="operate-right">提交审核</el-button>
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
        name: 'evaluationOrganHandle',
        params: row
      });
    },
    handleEdit(row) {
      row.handle = "update";
      this.$router.push({
        name: 'mainForm',
        params: row
      });

    },
    async handleAduit(row) {
      var result = await this.utils.req("/ssa/evaluationOrgan/startProcess.do", row, this);
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
      tableUrl: "/ssa/evaluationOrgan/getEvaluationInfo.do",
      params: {},
    };
    if (this.id == "myTaskHiTable") {
      defConf.params = {
        status: 2
      };
    }
    if (this.id == "myTaskTable") {
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
