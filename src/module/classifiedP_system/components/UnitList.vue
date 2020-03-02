<template lang="html">
  <div>
    <el-table :data="defConf.tableData" @row-dblclick="dialogUnit">
      <el-table-column prop="unit_name" label="备案单位">
      </el-table-column>
      <el-table-column prop="affiliation" label="隶属关系">
      </el-table-column>
      <el-table-column prop="unit_type" label="单位类型">
      </el-table-column>
      <el-table-column prop="industry_category" label="行业类型">
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
      this.$emit('dialogUnit',row);
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
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/classifiedP/getUnitList.do",
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
