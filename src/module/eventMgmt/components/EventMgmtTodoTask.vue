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

    <el-table-column prop="event_time" label="发生时间" align="center" sortable>
    </el-table-column>

    <el-table-column prop="state" label="状态">
    </el-table-column>



    <el-table-column label="操作" align="center">

      <template scope="scope">
         <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)">签收</el-button>
         <div  v-if="scope.row.assignee != null">
          <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='eventReportTask' " @click="handleTask(scope.row)"  >事件上报</el-button>
          <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='submissionTask' " @click="handleTask(scope.row)"  >提交审核</el-button>
          <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='eventAdjustTask' " @click="handleTask(scope.row)"  >事件调整</el-button>
           <!----------------------------------------------    一般事件审核开结束   -------------------------------------------------->
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='eventAduitTask'  " @click="handleTask(scope.row)" >处置审批</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='companyReportTask' || scope.row.taskDefinitionKey =='investigateReportTask' ||scope.row.taskDefinitionKey =='superviseTaskReportTask'   " @click="handleTask(scope.row)">调查报告</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='feedbackTask'" @click="handleTask(scope.row)">整改反馈</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='feedbackCheckTask'" @click="handleTask(scope.row)">反馈核查</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='eventtaskAssessmentTask'" @click="handleTask(scope.row)">事件归档</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='inquisitionTask'" @click="handleTask(scope.row)">现场勘验</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='superviseRectifyTask'" @click="handleTask(scope.row)">督办整改</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='administrativePenaltyTask'" @click="handleTask(scope.row)">行政处罚</el-button>
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
      eventReason: "",
      //工作流操作按钮触发事件

      handleOpts: {
        eventReportTask: {
          handle: async function(vm, row) {
            var params = row;
            var msg = await vm.utils.req("/ssa/eventMgmt/completeEventReportTask.do", params, vm);
            vm.$message({
              type: "success",
              message: msg
            });
            vm.$store.dispatch('reloadTable', vm.id);
            vm.$store.dispatch('reloadTable', "eventMgmtHiTable");
          }
        },

        submissionTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "submissionTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        companyReportTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "companyReportTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        eventAdjustTask: {
          handle: function(vm, row) {
            row.orgidsArr = row.event_unit_id.toString().split(",");
            var params = row;
            params.tkey = "eventAdjustTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        eventAduitTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "eventAduitTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },

        //单位调查报告
        companyReportTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "companyReportTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },

        superviseTaskReportTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "superviseTaskReportTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },

        investigateReportTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "investigateReportTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },



        inquisitionTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "inquisitionTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        superviseRectifyTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "superviseRectifyTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        administrativePenaltyTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "administrativePenaltyTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        eventtaskAssessmentTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "eventtaskAssessmentTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        //反馈任务
        feedbackTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "feedbackTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        },
        //反馈核查
        feedbackCheckTask: {
          handle: function(vm, row) {
            var params = row;
            params.tkey = "feedbackCheckTask";
            vm.$router.push({
              name: 'eventMgmtHandle',
              params: params
            })
          }
        }
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
      tableUrl: "/ssa/eventMgmt/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
