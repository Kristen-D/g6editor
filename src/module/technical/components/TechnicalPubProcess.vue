<template>
<!-- 我发布的流程-->
<div>
  <div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;">
    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-input v-model="queryForm.technical_desc" placeholder="协查内容"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="queryForm.org_id" clearable filterable placeholder="协查单位">
          <el-option v-for="item in orgList" :label="item.name" :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item label="" required>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.startTime" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.endTime" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-tabs v-model="activeTable" @tab-click="handleClick">
    <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
      <el-button size="small" @click="eventClick" type="primary"><i class="icon-add m-r-8"></i>新建</el-button>
        <!-- <el-button type="primary" size="small" @click="HandleImport"><i class="icon-import m-r-8"></i>导入</el-button> -->
      <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
    </div>

    <el-tab-pane label="进行中" name="myTaskTable">
      <technicalMyTask :id="myTaskTable"></technicalMyTask>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="myTaskHiTable">
      <technicalMyTask :id="myTaskHiTable"></technicalMyTask>
    </el-tab-pane>
  </el-tabs>

</div>
</template>
<script>
import technicalMyTask from './TechnicalMyTask'
import {
  mapState
} from 'vuex'
export default {
  components: {
    technicalMyTask//,
    //toolbar
  },
  computed: {
    ...mapState({
        orgList: state => state.context.orgList,
      //isCompany :state => state.process.isCompany
    })
  },
  data() {
    return {
      activeTable: 'myTaskTable',
      myTaskHiTable: "myTaskHiTable",
      myTaskTable: "myTaskTable",
    //  toolBarId:"myTaskTable",
      queryForm: {
      org_id: null,
      alert_level: null,
      alert_header: "",
      startTime: null,
      endTime: null
    },
      importDialogVisible:false
    };
  },
  methods: {
    queryData() {

      if (this.queryForm.startTime != null && this.queryForm.startTime != "") {
        this.queryForm.startTime = this.common.formatDate(new Date(this.queryForm.startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.queryForm.endTime != null && this.queryForm.endTime != "") {
        this.queryForm.endTime = this.common.formatDate(new Date(this.queryForm.endTime), "yyyy-MM-dd hh:mm:ss");
      }
      var params = this.queryForm;
      this.$store.commit('setParams', [this.activeTable, params]);
      this.$store.dispatch('reloadTable', this.activeTable);
    },
    HandleImport() {
      this.importDialogVisible = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      this.importDialogVisible = false;
      console.log(response);
      //alert(response.data);
      if (!response.state) {
        this.$alert(response.message, "消息");
        this.$refs.upload.clearFiles();
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.$store.dispatch('reloadTable', this.activeTable);
      }
    },
    eventClick() {
        this.$router.push({
          name: 'mainForm',
          params: {
            handle: "add"
          }
        })
      },
    handleClick(tab){
      this.activeTable = tab.name;
      this.queryData();
    },
    // 删除
    async delCheckedRows() {
      var rows = this.$store.state.table[this.activeTable].multipleSelection;
      //console.log(rows);
      var i;
      for (i in rows) {
        if (rows[i].status == 1) {
          this.$alert('删除数据存在进行中流程', '警告', {
            type: "warning"
          });
          return;
        }
      }
      if (rows.length <= 0) {
        this.$alert("请先选中要删除的记录!");
        return;
      }

      this.$confirm('此操作将删除选中条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var alertIds = [];
        rows.forEach(row => {
          alertIds.push(row.alert_id);
        })
        var msg = await this.common.req("/ssa/warnMgmt/delwarHandleInfo.do", {
          "alertIds": alertIds
        }, this);
        //alert(alertIds);
        this.$message({
          type: 'success',
          message: msg
        });
        await this.$store.dispatch('reloadTable', this.myTaskTable);
      })
    }
  }
}
</script>
