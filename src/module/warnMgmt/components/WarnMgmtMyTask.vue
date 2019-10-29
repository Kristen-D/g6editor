<template>
<div>
  <el-table  :data="defConf.tableData" v-loading="defConf.loading" style="width: 110%" @selection-change="handleSelectionChange">

    <el-table-column type="selection" v-if="this.id == 'myTaskTable'">
    </el-table-column>
    <el-table-column prop="alert_header" label="预警名称" align="center" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="unit_name" label="处置单位" align="center">
    </el-table-column>
    <el-table-column prop="levelName" label="等级" align="center">
    </el-table-column>
    <el-table-column prop="alert_typeName" label="类型" align="center">
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
    </el-table-column>
    <el-table-column prop="alert_time" label="发生时间" align="center" sortable>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template scope="scope">
       <el-button   @click="handleView(scope.row)" type="text" class="operate-left">查看</el-button>
       <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
       <!--<el-button  v-if="scope.row.status =='2'" @click="exportView(scope.row)" type="text" class="operate-right">导出表单</el-button>-->
       <el-button  v-if="scope.row.status =='0' && scope.row.handle =='permitted' " type="text" class="operate-left" @click="handleEdit(scope.$index,scope.row)" >编辑</el-button>
      <!-- <el-button  v-if="scope.row.status =='0'" type="text" class="operate-right" @click="handleAduit(scope.row)">提交审核</el-button>-->
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
  props: ['id'],
  data() {
    return {
      defConf: {},
      multipleSelection: []
    }

  },
  methods: {
    //分页方法
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleSuccess(response, file, fileList) {
      this.importDialogVisible = false;
      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        //this.geBack();
      }
    },
    //导出表单
    exportView(row) {
      var alert_id = row.alert_id;
      var params = "reportType=pdfForm&exportFileName=预警信息表单&alert_id="+alert_id;
    //  window.location.href = "/ssa/warnMgmt/exportReport.do?" + params;
      window.location.href = "/ssa/warnMgmt/downloadWord.do?" + params;
    },
    //编辑
    handleEdit(i,row) {
      row.handle = "update";
      console.log(row);
      row.tkey = "warnhandleInfoTask";
      //row.tableId = this.id;
      this.$router.push({
        name: 'mainForm',
        params:row
      });
    },
    //查看
    handleView(row){
      row.handle = "view";
      var processInstance ={};
      processInstance.processInstanceId = row.processInstanceId;
      row.processInstance = processInstance;
      this.$router.push({
        name: 'warnMgmtHandle',
        params: row
      });
    },
    //提交审核
    async handleAduit(row) {
      var result = await this.utils.req("/ssa/warnMgmt/startProcess.do", row, this);
      this.$message({
        type: "success",
        message: result
      });
      this.$store.dispatch('reloadTable', this.id);
      //this.$store.dispatch('reloadTable', "todoTaskTable");
    },
    handleSelectionChange(selectedRow) {
      // var i = selectedRow.length;
      // while (i--) {
      //   if (selectedRow[i].status == 1) {
      //     selectedRow.splice(i, 1);
      //     this.$alert("流程进行中无法删除数据", "警告", {
      //       type: 'warning'
      //     });
      //   } else if (selectedRow[i].status == 2) {
      //     selectedRow.splice(i, 1);
      //     this.$alert("流程归档无法删除数据", "警告", {
      //       type: 'warning'
      //     });
      //   }
      // }

      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
      return;
    }
  },
  mounted: function() {},
  created: function() {
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
      tableUrl: "/ssa/warnMgmt/getwarnHandleInfo.do",
      params: {},
      saveUrl: "/ssa/warnMgmt/savewarHandleInfo.do",
      delUrl: "/ssa/warnMgmt/delwarHandleInfo.do",
    };

    if (this.id == "myTaskHiTable") {
      defConf.params = {
        finished: "finished"
      };
    }else   if (this.id == "myTaskTable") {
      defConf.params = {
        running: "running"
      };
    }
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }
}
</script>
