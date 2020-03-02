<template>
<div>



  <el-table :data="defConf.tableData" v-loading="defConf.loading" border style="width: 100%" @selection-change="handleSelectionChange">

    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="unit_name" label="安服机构名称">
    </el-table-column>
    <el-table-column prop="record_code" label="备案证明编号">
    </el-table-column>
    <el-table-column prop="unit_type" label="单位性质">
    </el-table-column>
    <el-table-column prop="charge" label="单位负责人">
    </el-table-column>
    <el-table-column prop="filing_date" label="时间">
    </el-table-column>

    <el-table-column label="操作">
      <template scope="scope">
       <el-button type="text" size="small" @click="handleView(scope.row)" >查看</el-button>
       <el-button type="text" size="small" @click="handleEdit(scope.row)" >编辑</el-button>
     </template>
   </el-table-column>
 </el-table>
 <div class="pull-right">
 <el-pagination
  @current-change="handleCurrentChange"
 :page-size="defConf.pageSize"
 :current-page="defConf.pageIndex"
 layout="total, prev, pager, next, jumper"
 :total="defConf.total">
</el-pagination>
</div>





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

    handleEdit(row) {
      row.handle = "update";
      this.$router.push({
        name: 'unitForm',
        params: row
      });
    },
    handleView(row){
      row.handle = "view";
      this.$router.push({
        name: 'unitDetail',
        params: row
      });
    },
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
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
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/securityService/getUintInfo.do",
      params: {},
      saveUrl: "/ssa/securityService/saveUnitInfo.do",
      delUrl: "/systemMgmt_userCfg/delUser.do",
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
