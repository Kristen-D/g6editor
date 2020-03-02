<template lang="html">
  <div>
    <el-table :data="defConf.tableData" @row-dblclick="dialogUnit">
      <el-table-column prop="organization_name" label="单位名称">
      </el-table-column>
      <el-table-column prop="unit_code" label="单位代码">
      </el-table-column>
      <el-table-column prop="mailing_addr" label="通信地址">
      </el-table-column>
      <el-table-column prop="contact_name" label="联系人">
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
    dialogUnit(row){
      //alert(JSON.stringify(row));
      this.$emit('dialogEvaluatiomUnit',row);
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
      tableUrl: "/ssa/evaluationOrgan/getEvaluationList.do",
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
