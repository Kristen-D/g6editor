<template lang="html">
  <div>
    <el-table :data="defConf.tableData" @row-dblclick="dialogSystem">
      <el-table-column prop="sys_name" label="系统名称">
      </el-table-column>
      <el-table-column prop="record_approval_code" label="备案证明编号">
      </el-table-column>
      <el-table-column prop="unit_name" label="备案单位">
      </el-table-column>
      <el-table-column prop="info_sys_protec_level" label="安全保护等级">
      </el-table-column>
  </el-table>
  <el-pagination
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
  props: ['id'],
  data() {
    return {
      defConf: {},

      //================= toolbar 查询字段 开始 ==========================//
      formInline: {
        user: '',
        region: ''
      },
      //==============toolbar 查询字段结束 =========================//



      multipleSelection: []
    }

  },
  methods: {
    //分页方法
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    dialogSystem(row){
      //alert(JSON.stringify(row));
      this.$emit('dialogSystem',row);
    },
  },
  mounted: function() {},
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      //默认ajax属性
      tableUrl: "/ssa/evaluationOrgan/getSystemList.do",
      params: {},
    };
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
