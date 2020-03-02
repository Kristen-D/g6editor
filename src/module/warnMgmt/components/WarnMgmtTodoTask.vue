<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">

    </el-table-column>
    <el-table-column prop="alert_header" label="预警名称" align="center" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="unit_name" label="处置单位" align="center">
    </el-table-column>
    <el-table-column prop="levelName" label="等级" align="center">
    </el-table-column>
    <el-table-column prop="alert_typeName" label="类型" align="center">
    </el-table-column>
    <el-table-column prop="alert_time" label="发生时间" align="center" sortable>
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
        </el-table-column>
    <el-table-column label="操作" align="center">
      <template scope="scope">
         <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)" >签收</el-button>
         <div  v-if="scope.row.assignee != null">
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='alertFbtask'" @click="handleTask(scope.row)" >发布预警</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='alertSptask'" @click="handleTask(scope.row)" >发布审批</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='alertTztask'" @click="handleTask(scope.row)" >预警调整</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='alertFktask'" @click="handleTask(scope.row)" >处理反馈</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='alertYztask'" @click="handleTask(scope.row)" >技术核查</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='alertYzSptask'" @click="handleTask(scope.row)" >技术核查</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='alertJctask'" @click="handleTask(scope.row)" >解除预警</el-button>
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
  props:["id"],
  data() {
    return {
      defConf: {},
      spTaskVisible: false,
      spReason: "",
      //工作流操作按钮触发事件

      handleOpts: {
        alertFbtask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "alertFbtask";
            //alert(params.tkey );
            vm.$router.push({ name: 'warnMgmtHandle', params: params})
          }
        },
        alertTztask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "alertTztask";
            //alert(params.tkey );
            vm.$router.push({ name: 'warnMgmtHandle', params: params})
          }
        },
        alertSptask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "alertSptask";
            //alert(params.tkey );
            vm.$router.push({ name: 'warnMgmtHandle', params: params})
          }
        },
        alertFktask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "alertFktask";
            vm.$router.push({ name: 'warnMgmtHandle', params: params})
          }
        },
        alertYztask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "alertYztask";
            vm.$router.push({ name: 'warnMgmtHandle', params: params})
          }
        },
        alertYzSptask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "alertYzSptask";
            vm.$router.push({ name: 'warnMgmtHandle', params: params})
          }
        },
        alertJctask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "alertJctask";
            vm.$router.push({ name: 'warnMgmtHandle', params: params})
          }
        }

      }

    }

  },



  methods: {
    //分页方法
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleSelectionChange() { },

    //签收任务
    async handleClaim(taskId) {
      this.$confirm('是否签收该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(async() => {
        var result = await this.utils.req("/ssa/processMgmt/claimTask.do", {
          taskId: taskId
        }, this);
        this.$message({
          type: "success",
          message: result
        });
        this.$store.dispatch('reloadTable', this.id);
      });
    },

    //办理方法

    handleTask(row) {
      var tkey = row.taskDefinitionKey;
      this.handleOpts[tkey].handle(this,row);
    },
    //预警审批 调用方法
    spTaskhandlePass(taskId) {

      var variables = [{
          key: 'alertSpPass',
          value: true,
          type: 'B'
        },
        {
          key: 'spReason',
          value: this.spReason,
          type: 'S'
        }
      ];
    //  this.$store.dispatch('completeTask', [taskId, variables, this]);
      this.spTaskVisible = false;
      this.$store.dispatch('reloadTable', this.id);
    },
    //预警驳回 调用方法
    spTaskhandleReject() {

      var variables = [{
          key: 'alertSpPass',
          value: false,
          type: 'B'
        },
        {
          key: 'spReason',
          value: this.spReason,
          type: 'S'
        }
      ];
      //this.$store.dispatch('completeTask', [taskId, variables, this]);
      this.spTaskVisible = false;
      this.$store.dispatch('reloadTable', this.id);

    },

  },
  created: async function() {
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
      tableUrl: "/ssa/warnMgmt/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
