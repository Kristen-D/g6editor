<template>
<div>

  <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%">

    <el-table-column prop="orgName" label="被检查单位" align="center">
    </el-table-column>
    <el-table-column prop="inspection_address" label="检查地点" align="center">
    </el-table-column>
    <el-table-column prop="inspectorName" label="检查人员" align="center">
    </el-table-column>
    <el-table-column prop="inspection_time_start" label="检查日期" sortable align="center">
    </el-table-column>
    <el-table-column prop="send_time" label="填发时间" sortable align="center">
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template scope="scope">
        <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='inspectAduitTask' " @click="handleTask(scope.row)">督查审批</el-button>
        <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='superviseInspectTask' " @click="handleTask(scope.row)">监督检查</el-button>
        <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='rectificationNoticeTask' " @click="handleTask(scope.row)">整改通知</el-button>
        <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='rectificationFeedbackTask' " @click="handleTask(scope.row)">整改反馈</el-button>
        <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='bulletinTask' " @click="handleTask(scope.row)">下发通报</el-button>
        <el-button  type="text"  v-if="scope.row.taskDefinitionKey =='rectificationCheckTask' " @click="handleTask(scope.row)">反馈核查</el-button>


        <!-- <el-button  type="text" @click="handleView(scope.row)" class="operate-left">查看</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0">|</span>
        <el-button type="text" v-if="scope.row.status == 0" @click="handleEdit(scope.row)" class="operate-center">编辑</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0">|</span>
        <el-button type="text" v-if="scope.row.status == 0" @click="handleAduit(scope.row)" class="operate-right">人工检查</el-button> -->
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
        //督查审核
        inspectAduitTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "inspectAduitTask";
            vm.$router.push({
              name: 'taskInspectHandle',
              params: params
            })
          }
        },

        superviseInspectTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "superviseInspectTask";
            vm.$router.push({
              name: 'taskInspectHandle',
              params: params
            })
          }
        },

        rectificationNoticeTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "rectificationNoticeTask";
            vm.$router.push({
              name: 'taskInspectHandle',
              params: params
            })
          }
        },

        rectificationFeedbackTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "rectificationFeedbackTask";
            vm.$router.push({
              name: 'taskInspectHandle',
              params: params
            })
          }
        },

        rectificationCheckTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "rectificationCheckTask";
            vm.$router.push({
              name: 'taskInspectHandle',
              params: params
            })
          }

        },

        bulletinTask:{
          handle: function(vm, row) {
            var params = row;
            params.tkey = "bulletinTask";
            vm.$router.push({
              name: 'taskInspectHandle',
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
      tableUrl: "/ssa/taskInspect/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
