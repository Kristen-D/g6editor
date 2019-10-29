<template>
<div>

  <el-table :id="tableId" :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%">
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

         <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)" size="small">签收</el-button>

         <div  v-if="scope.row.assignee != null">

           <!----------------------------------------------    一般事件审核开结束   -------------------------------------------------->

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='System_Rectification'" @click="handleTask(scope.row)"  size="small">整改</el-button>

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='System_Sign'" @click="handleTask(scope.row)"  size="small">材料签收</el-button>

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='System_Check'" @click="handleTask(scope.row)"  size="small">系统核查</el-button>

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='System_FileCheck'" @click="handleTask(scope.row)"  size="small">材料核查</el-button>

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='System_Issued'" @click="handleTask(scope.row)"  size="small">材料上传</el-button>

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
      event3Reason: "",
      //工作流操作按钮触发事件

      handleOpts: {
        System_Rectification: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "System_Rectification";
            vm.$router.push({
              name: 'systemHandle',
              params: params
            })
          }
        },

        System_FileCheck: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "System_FileCheck";
            vm.$router.push({
              name: 'systemHandle',
              params: params
            })
          }
        },

        System_Sign: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "System_Sign";
            vm.$router.push({
              name: 'systemHandle',
              params: params
            })
          }
        },

        System_Check: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "System_Check";
            vm.$router.push({
              name: 'systemHandle',
              params: params
            })
          }
        },

        System_Issued: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "System_Issued";
            vm.$router.push({
              name: 'systemHandle',
              params: params
            })
          }
        },



      }

    }

  },



  methods: {
    handleSelectionChange() {},
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

    //办理方法

    handleTask(row) {
      var tkey = row.taskDefinitionKey;
      this.handleOpts[tkey].handle(this,row);
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
      tableUrl: "/ssa/classifiedP/listSystemTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
