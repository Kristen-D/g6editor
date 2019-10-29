<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%">

    <el-table-column prop="case_name" label="案件名称" align="center">
    </el-table-column>
    <el-table-column prop="orgName" label="案发单位" align="center">
    </el-table-column>
    <el-table-column prop="caseType" label="案件类型" align="center">
    </el-table-column>
    <el-table-column prop="caseLevel" label="案件等级" align="center">
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
    </el-table-column>
    <el-table-column prop="create_time" label="时间" align="center">
    </el-table-column>


    <el-table-column label="操作" align="center">
      <template scope="scope">
        <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)">签收</el-button>
      <div v-if="scope.row.assignee != null">
  <el-button type="text" v-if="scope.row.taskDefinitionKey =='casePublishTask' " @click="handleTask(scope.row)">案件发布</el-button>
  <el-button type="text" v-if="scope.row.taskDefinitionKey =='caseAduitTask' " @click="handleTask(scope.row)">案件移交审批</el-button>
  <el-button type="text" v-if="scope.row.taskDefinitionKey =='caseInvestigateTask' " @click="handleTask(scope.row)">案件调查</el-button>
  <el-button type="text" v-if="scope.row.taskDefinitionKey =='caseFileTask' " @click="handleTask(scope.row)">串并归档</el-button>
  <el-button type="text" v-if="scope.row.taskDefinitionKey =='submissionTask' " @click="handleTask(scope.row)">提交审批</el-button>
  <el-button type="text" v-if="scope.row.taskDefinitionKey =='caseAdjustTask' " @click="handleTask(scope.row)">案件调整</el-button>
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
        //案件审批
        caseAduitTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "caseAduitTask";
            vm.$router.push({
              name: 'caseInvestigateHandle',
              params: params
            })
          }
        },
        submissionTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "submissionTask";
            vm.$router.push({
              name: 'caseInvestigateHandle',
              params: params
            })
          }
        },
        //案件发布
        casePublishTask: {
          handle: function(vm, row) {
            vm.completeCasePublishTask(row);
          }
        },
        //案件调查
        caseInvestigateTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "caseInvestigateTask";
            vm.$router.push({
              name: 'caseInvestigateHandle',
              params: params
            })
          }
        },
        //案件归档
        caseFileTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "caseFileTask";
            vm.$router.push({
              name: 'caseInvestigateHandle',
              params: params
            })
          }

        },

        bulletinTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "bulletinTask";
            vm.$router.push({
              name: 'caseInvestigateHandle',
              params: params
            })
          }

        },
        caseAdjustTask: {
          handle: function(vm, row) {
            if (row.protocol == null || row.protocol == "") {
              row.protocols = [];
            } else {
              row.protocols = row.protocol.split(",");
            }
            if (row.device_type == null || row.device_type == "") {
              row.device_types = [];
            } else {
              row.device_types = row.device_type.split(",");
            }

            var params = row;
            params.tkey = "caseAdjustTask";
            vm.$router.push({
              name: 'caseInvestigateHandle',
              params: params
            })
          }
        }
      }
    }
  },
  methods: {

    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleTask(row) {
      var tkey = row.taskDefinitionKey;
      this.handleOpts[tkey].handle(this, row);
    },
    completeCasePublishTask(row) {
      this.$confirm('您确定要发布案件"' + row.case_name + '"?', '发布确认', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'info'
      }).then(async() => {
        var msg = await this.utils.req("/ssa/caseInvestigate/completeCasePublishTask.do", {
          taskId: row.taskId
        }, this);
        this.$message({
          type: "success",
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },
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
      tableUrl: "/ssa/caseInvestigate/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
