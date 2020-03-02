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
    <el-table-column label="操作">
      <template scope="scope">
        <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)" >签收</el-button>
        <div  v-if="scope.row.assignee != null">
          <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='reportCheckTask' " @click="handleTask(scope.row)">报告核查</el-button>
          <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='fileTask' " @click="handleTask(scope.row)">归档</el-button>
          <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='disposalOpinionTask' " @click="handleTask(scope.row)">处置意见</el-button>
          <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='disposalApprovalTask' " @click="handleTask(scope.row)">处置审批</el-button>
        </div>
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
      defConf: {},
      handleOpts: {
        //报告核查
        reportCheckTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "reportCheckTask";
            vm.$router.push({
              name: 'evaluationOrganHandle',
              params: params
            })
          }
        },
        //归档
        fileTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "fileTask";
            vm.$router.push({
              name: 'evaluationOrganHandle',
              params: params
            })
          }
        },
        //处置意见
        disposalOpinionTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "disposalOpinionTask";
            vm.$router.push({
              name: 'evaluationOrganHandle',
              params: params
            })
          }
        },
        //处置意见
        disposalApprovalTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "disposalApprovalTask";
            vm.$router.push({
              name: 'evaluationOrganHandle',
              params: params
            })
          }
        },
      }
    }
  },
  methods: {

    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //签收任务
    async handleClaim(taskId) {
      var result = await this.utils.req("/ssa/processMgmt/claimTask.do", {
        taskId: taskId
      }, this);
      this.$message({
        type: "success",
        message: result
      });
      this.$store.dispatch('reloadTable', this.id);
    },
    handleTask(row) {
      var tkey = row.taskDefinitionKey;
      this.handleOpts[tkey].handle(this, row);
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
      tableUrl: "/ssa/evaluationOrgan/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
