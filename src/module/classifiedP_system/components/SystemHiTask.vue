<template>
<div>
  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%">
    <el-table-column prop="sys_name" label="系统名称" align="center">
    </el-table-column>
    <el-table-column prop="record_approval_code" label="备案证明编号" align="center">
    </el-table-column>
    <el-table-column prop="info_sys_protec_level" label="保护等级" align="center">
    </el-table-column>
    <el-table-column prop="unit_name" label="备案单位" align="center">
    </el-table-column>
    <el-table-column prop="filling_time" label="时间" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template scope="scope">
       <el-button  type="text" size="small" @click="handleView(scope.row)">查看</el-button>
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
      this.$router.push({
        name: 'systemHiTaskDetail',
        params: params
      })

    }
  },
  created: function() {

    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/classifiedP/listSystemCompleteTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];

    this.$store.dispatch('reloadTable', this.id);

  }



}
</script>

<style>

</style>
