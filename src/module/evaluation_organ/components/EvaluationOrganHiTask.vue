<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%">
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
      row.handle = "view";
      var params = row;
      params.tkey = row.id;
      this.$router.push({
        name: 'evaluationOrganHandle',
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
      tableUrl: "/ssa/evaluationOrgan/listCompleteTask.do",
      params: {},
    };
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
