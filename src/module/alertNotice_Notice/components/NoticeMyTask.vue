<template>
<div>
  <el-table :data="defConf.tableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" v-if="this.id == 'myTaskTable'">
    </el-table-column>
    <el-table-column :prop="key" :label="value" v-for="(value, key) in columnList" :show-overflow-tooltip="key=='notice_desc' || key=='notice_name'"   align="center">
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
    </el-table-column>
    <el-table-column prop="attachment_filename" label="附件" align="center" show-overflow-tooltip>
      <template scope="scope">
        <el-button type="text" @click="downloadFile(scope.row.notice_code)" v-if="scope.row.attachment_filepath != null&& scope.row.attachment_filepath != '' ">{{scope.row.attachment_filename}}</el-button>
        <el-button type="text" v-else>{{scope.row.attachment_filename}}</el-button>
      </template>
    </el-table-column>
    <div slot="empty" >
      <div class="" v-if="(!defConf.tableData || defConf.tableData.length === 0) && 'loaded' === defConf.loading">
        <i class="el-icon-document"></i> 没有相关数据！
      </div>

      <div class="" v-if="'wrong' === defConf.loading">
        <i class="el-icon-warning"></i> 数据加载错误！ 点击 <a @click="refresh">刷新</a>
      </div>

      <div class="" v-if="'load' === defConf.loading">
        <i class="el-icon-loading"></i> 正在读取数据，请稍后...
      </div>
    </div>

    <el-table-column label="操作" align="center">
      <template scope="scope">
       <el-button  @click="handleView(scope.row)" type="text" class="operate-left">查看</el-button>
       <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
       <!--<el-button  v-if="scope.row.status =='2'" @click="exportView(scope.row)" type="text" class="operate-right">导出表单</el-button>-->
       <el-button  v-if="scope.row.status =='0' && scope.row.handle =='permitted'" type="text" class="operate-left" @click="handleEdit(scope.$index,scope.row)" >编辑</el-button>
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
      defConf: {},
      multipleSelection: []
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
      row.tkey = "addInfoForm";
      row.tableId = this.id;
      this.$router.push({
        name: 'noticeInfoForm',
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
        name: 'noticeHandle',
        params: row
      });
    },
    //提交审核
    handleSelectionChange(selectedRow) {

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
      tableUrl: "/ssa/alertNotice/getMySendNoticeInfo.do",
      params: {}
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
