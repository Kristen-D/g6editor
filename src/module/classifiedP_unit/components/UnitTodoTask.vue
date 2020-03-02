<template>
<div>


  <el-table  :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">


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

         <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)" size="small">签收</el-button>


         <div  v-if="scope.row.assignee != null">

           <!----------------------------------------------    一般事件审核开结束   -------------------------------------------------->

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='Unit_Rectification'" @click="handleTask(scope.row)"  size="small">整改</el-button>

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='Unit_Check'" @click="handleTask(scope.row)"  size="small">审核</el-button>

          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='Unit_Issued'" @click="handleTask(scope.row)"  size="small">材料下发</el-button>

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
      eventReason: "",
      //工作流操作按钮触发事件

      handleOpts: {
        Unit_Rectification: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "Unit_Rectification";
            vm.$router.push({
              name: 'unitHandle',
              params: params
            })
          }
        },

        Unit_Check: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "Unit_Check";
            vm.$router.push({
              name: 'unitHandle',
              params: params
            })
          }
        },

        Unit_Issued: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "Unit_Issued";
            vm.$router.push({
              name: 'unitHandle',
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
      this.handleOpts[tkey].handle(this, row);
    },

    //较大事件上报 调用方法

  },
  created: async function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      //默认ajax属性
      tableUrl: "/ssa/classifiedP/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
