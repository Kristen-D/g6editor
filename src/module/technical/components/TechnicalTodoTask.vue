<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">

    <el-table-column prop="technical_desc" label="协查内容" align="center" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="technical_limit_time" label="协查期限" align="center">
    </el-table-column>
    <el-table-column prop="technical_source" label="协查任务来源" align="center">
    </el-table-column>
    <!-- <el-table-column prop="feedback_unit" label="协查单位" align="center">
    </el-table-column> -->
    <el-table-column prop="create_time" label="建立时间" align="center" sortable>
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
        </el-table-column>
    <el-table-column label="操作" align="center">
      <template scope="scope">
         <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)" >签收</el-button>
         <div  v-if="scope.row.assignee != null">
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='assistTjTask'" @click="handleTask(scope.row)" >协查提交</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='assistSpTask'" @click="handleTask(scope.row)" >协查审批</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='assistTzTask'" @click="handleTask(scope.row)" >协查调整</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='assistFKTask'" @click="handleTask(scope.row)" >处理反馈</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='assistEndTask'" @click="handleTask(scope.row)" >协查归档</el-button>
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
        assistTjTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "assistTjTask";
            //alert(params.tkey );
            vm.$router.push({ name: 'technicalHandle', params: params})
          }
        },
        assistTzTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "assistTzTask";
            params.handle = "update";
            //alert(params.tkey );
            vm.$router.push({ name: 'technicalHandle', params: params})
          }
        },
        assistSpTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "assistSpTask";
            //alert(params.tkey );
            vm.$router.push({ name: 'technicalHandle', params: params})
          }
        },
        assistFKTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "assistFKTask";
            vm.$router.push({ name: 'technicalHandle', params: params})
          }
        },
        assistEndTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "assistEndTask";
            vm.$router.push({ name: 'technicalHandle', params: params})
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
        var result = await this.common.req("/ssa/processMgmt/claimTask.do", {
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
    }
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
      tableUrl: "/ssa/technical/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
