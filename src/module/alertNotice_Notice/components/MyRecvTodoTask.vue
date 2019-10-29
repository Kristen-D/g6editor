<template>
<div>

  <el-table :data="defConf.tableData" style="width: 100%" @selection-change="handleSelectionChange">

    <!--<el-table-column type="selection">
    </el-table-column>-->
    <el-table-column :prop="key" :label="value" v-for="(value, key) in columnList" :show-overflow-tooltip="key=='notice_desc' || key=='notice_name'" :sortable="key=='assetCode'" align="center">
    </el-table-column>
    <el-table-column prop="taskName" label="当前环节 " align="center">
    </el-table-column>
    <el-table-column prop="attachment_filename" label="附件" align="center" show-overflow-tooltip>
      <template scope="scope">
        <el-button type="text" @click="downloadFile(scope.row.notice_code)" v-if="scope.row.attachment_filepath != null&& scope.row.attachment_filepath != '' ">{{scope.row.attachment_filename}}</el-button>
        <el-button type="text" v-else>{{scope.row.attachment_filename}}</el-button>
      </template>
    </el-table-column>
    <div slot="empty" >
      <div class="" v-if="(!defConf.tableData || defConf.tableData.length == 0) && 'loaded' == defConf.loading">
        <i class="el-icon-document"></i> 没有相关数据！
      </div>

      <div class="" v-if="'wrong' == defConf.loading">
        <i class="el-icon-warning"></i> 数据加载错误！ 点击 <a @click="refresh">刷新</a>
      </div>

      <div class="" v-if="'load' == defConf.loading">
        <i class="el-icon-loading"></i> 正在读取数据，请稍后...
      </div>
    </div>

    <el-table-column label="操作">
      <template scope="scope">
         <el-button type="text" v-if="scope.row.assignee == null" @click="handleClaim(scope.row.taskId)" size="small">签收</el-button>
         <div  v-if="scope.row.assignee != null">
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='noticeFbTask'" @click="handleTask(scope.row)"  size="small">提交通知</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='noticeSpTask'" @click="handleTask(scope.row)"  size="small">通知审批</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='noticeTzTask'" @click="handleTask(scope.row)"  size="small">通知调整</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='noticeJsTask'" @click="handleJsTask(scope.row)"  size="small">发布通知</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='noticeQsTask'" @click="handleQsTask(scope.row)"  size="small">通知签收</el-button>
          <el-button  type="text" v-if="scope.row.taskDefinitionKey =='noticeFkTask'" @click="handleTask(scope.row)"  size="small">通知反馈</el-button>
         </div>
</template>
     </el-table-column>
   </el-table>
   <div class="pull-right">
   <el-pagination
    @current-change="handleCurrentChange"
   :page-size="defConf.pageSize"
   :current-page="defConf.pageIndex"
   layout="total, prev, pager, next, jumper"
   :total="defConf.total">
   </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  components: {},
  props: ['checkList', 'id'],
  computed: {
    columnList: function() {
      if (this.checkList.length > 0) {
        let ob = "{";
        for (let x in this.checkList) {
          ob = ob + this.checkList[x] + ",";
        }
        let nob = ob.substring(0, ob.length - 1) + "}";
        return JSON.parse(nob);
      } else {
        return {};
      }

    }
  },
  data() {
    return {
      tmptotal:0,
      defConf: {},
      spTaskVisible: false,
      spReason: "",
      //工作流操作按钮触发事件

      handleOpts: {
        noticeFbTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "noticeFbTask";
            //alert(params.tkey );
            vm.$router.push({ name: 'noticeHandle', params: params})
          }
        },
        noticeTzTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "noticeTzTask";
            //alert(params.tkey );
            vm.$router.push({ name: 'noticeHandle', params: params})
          }
        },
        noticeSpTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "noticeSpTask";
            //alert(params.tkey );
            vm.$router.push({ name: 'noticeHandle', params: params})
          }
        },
        noticeFkTask:{
          handle:function(vm,row){
            var params = row;
            params.tkey = "noticeFkTask";
            //alert(params.tkey );
            vm.$router.push({ name: 'noticeHandle', params: params})
          }
        }
        }

      }

    },



  methods: {
    downloadFile(id) {
      var fileUrl = "/ssa/alertNotice/downloadFile.do?notice_code=" + id;
      window.location.href = fileUrl;
    },
    //分页方法
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },

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

    async handleJsTask(row) {
      var result = await this.common.req("/ssa/alertNotice/completealertJsTask.do", row,this);
      this.$message({
        type: "success",
        message: result
      });
      this.$store.dispatch('reloadTable', this.id);
    },
    async handleQsTask(row) {
      var result = await this.common.req("/ssa/alertNotice/handleQsTask.do", row,this);
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
      tableUrl: "/ssa/alertNotice/listTask.do",
      params: {},
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    await this.$store.dispatch('reloadTable', this.id);
    // this.tmptotal = this.defConf.total;
    // var vm = this;
    // window.setInterval(function(){
    //
    //    vm.$store.dispatch('reloadTable', vm.id);
    //
    //   //alert(vm.defConf.total+" "+vm.tmptotal);
    //
    //   if (vm.defConf.total>vm.tmptotal){
    //     vm.$notify({
    //         title: '提示',
    //         message: '收到新的通知',
    //         offset: 100,
    //         duration: 0
    //       });
    //         vm.tmptotal = vm.defConf.total;
    //   }
    //   //alert(vm.defConf.total);
    // },5000)
  }

}
</script>
