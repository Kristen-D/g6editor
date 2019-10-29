<template>
<div>
  <el-table :data="defConf.tableData" v-loading="defConf.loading"  style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="unit_name" label="单位名称">
    </el-table-column>
    <el-table-column prop="unit_code" label="备案表编号">
    </el-table-column>
    <el-table-column prop="affiliation" label="隶属关系">
    </el-table-column>
    <el-table-column prop="unit_type" label="单位类型">
    </el-table-column>
    <el-table-column prop="industry_category" label="行业类型">
    </el-table-column>
    <el-table-column prop="leader_name" label="单位负责人">
    </el-table-column>
    <el-table-column prop="unit_time" label="备案时间">
    </el-table-column>
    <el-table-column label="操作">
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
  props:["id"],
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
      params.tkey = row.taskDefinitionKey;
        this.$router.push({
        name: 'unitHiTaskDetail',
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
      tableUrl: "/ssa/classifiedP/listCompleteTask.do",
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
