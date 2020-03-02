<template>
<div>
  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">



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

    <el-table-column prop="taskName" label="任务名称" align="center">

    </el-table-column>

    <el-table-column prop="endTime" label="任务完成时间" align="center" sortable>

    </el-table-column>

    <el-table-column prop="event_time" label="发生时间" align="center" sortable>

    </el-table-column>


    <el-table-column label="操作" width="100px;" align="center">

      <template scope="scope">
       <el-button  type="text" @click="handleView(scope.row)">查看</el-button>
     </template>
   </el-table-column>
  </el-table>

  <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
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
        name: 'mainHiTaskDetail',
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
      tableUrl: "/ssa/eventMgmt/listCompleteTask.do",
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
