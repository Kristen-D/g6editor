<template>
<div class="whitebackground Whitespace">
  <div class="top-title">邮件系统管理</div>
  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
      <el-form :model="params" ref="params" label-width="120px">
        <div v-if="!advancedFlag" style="display:inline-block;">
          <div style="display:inline-block;">
            <el-input v-model="queryForm.q_mail_name" placeholder="邮件系统名称" ></el-input>
          </div>
          <el-button type="primary" class="button-p-2" @click="qryData" style="margin-left: 5px;">搜索</el-button>
        </div>

          <div v-if="advancedFlag" style="margin-top:20px;">
            <el-form-item label="邮件系统" style="display:inline-block;">
              <el-input placeholder="所有邮件系统" v-model="queryForm.q_mail_name"></el-input>
            </el-form-item>
            <el-form-item label="ip地址" style="display:inline-block;">
              <el-input placeholder="所有ip" v-model="queryForm.q_mail_ip"></el-input>
            </el-form-item>
            <el-form-item label="归属单位" style="display:inline-block;">
              <el-input placeholder="所有单位" v-model="queryForm.q_unit_name"></el-input>
            </el-form-item>
            <el-form-item label="单位类型" style="display:inline-block;">
              <el-select v-model="queryForm.q_unit_type" placeholder="所有" clearable style="width:89%">
                <el-option label="政府机关" value="政府机关"></el-option>
                <el-option label="事业单位" value="事业单位"></el-option>
                <el-option label="企业" value="企业"></el-option>
                <el-option label="社会团体" value="社会团体"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位负责人" style="display:inline-block;">
              <el-input placeholder="所有人" v-model="queryForm.q_charge"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" style="display:inline-block;">
              <el-input placeholder="所有电话" v-model="queryForm.q_charge_person_phone"></el-input>
            </el-form-item>
              <el-form-item label="等保定级" style="display:inline-block;">
                <el-select v-model="queryForm.q_grading" placeholder="所有" clearable style="width:89%">
                  <el-option label="二级" value="2"></el-option>
                  <el-option label="三级" value="3"></el-option>
                  <el-option label="四级" value="4"></el-option>
                  <el-option label="未定级" value="0"></el-option>
                </el-select>
              </el-form-item>
          </div>
        <!-- </transition> -->

        <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:5px;">
          <el-button type="primary" class="button-p-2" @click="qryData">搜索</el-button>
          <el-button type="gray" class="button-p-2 m-l-30" @click="resetForm('queryForm')">清空</el-button>
        </el-form-item>

        <div class="float-r">
          <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
            <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
          </p>
          <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
            <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
          </p>
          <!-- <el-button type="graypink" size="small" @click="customCol" disabled><i class="icon-set icon-size"></i></el-button> -->
          <el-button type="graypink" size="small" @click="reload"><i class="icon-refresh icon-size"></i></el-button>
        </div>
      </el-form>
  </div>
  <div :class="['ordinary-search', 'clearfloat']">
    <el-form :inline="true" :model="queryForm" ref="queryForm">

    </el-form>


  </div>
  <el-tabs v-model="activeName">
    <div class="float-r button-toolbar">
      <el-button type="primary" size="small" @click="addRow()"><i class="icon-add m-r-8"></i>添加</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows()"><i class="icon-delet m-r-8"></i>删除</el-button>
      <!-- <el-button type="primary" size="small" @click="downloadTemplate()" style="margin-left:10px;"> 模板下载</el-button>
      <el-upload style="display:inline-block;margin-left:10px;" action="/ssa/infoCenter_blackWhiteList/emBatchHandle.do?bw_type=0" :file-list="fileList" :before-upload="handleBeforeUpload" :accept="accept_type" :show-upload-list="false" :on-success="handleSuccessOnBlack">
        <el-button size="small" type="primary">批量导入</el-button>
      </el-upload> -->
      <el-button type="primary" size="small" @click="importEvent"><i class="icon-import m-r-8"></i>导入</el-button>
    </div>
    <el-tab-pane label="已完成" name="done">
      <div>
        <mailEditTable :id="doneId"></mailEditTable>
      </div>
    </el-tab-pane>
    <el-tab-pane label="草稿箱" name="draft">
      <div>
        <draftEditTable :id="draftId"></draftEditTable>
      </div>
    </el-tab-pane>
  </el-tabs>
  <!-- 导入弹框 -->
  <el-dialog title="导入" :visible.sync="exportDialogShow" width="30%" class="dialog-panel">
    <div class="dialog-import-content">
      <span>请先下载Excel模版，填写完整后，再选择上传。</span>
      <a href="/static/template/MailSystemInfo.xlsx" class="dialog-downloadtext font-color">模版下载</a>

      <el-upload ref="upload" action="/ssa/mailSystem/batchImportMailSystemInfo.do" :auto-upload="false" :multiple="false" :on-success="handleSuccess">
        <el-button type="primary" class="button-p-3" slot="trigger">选取文件</el-button>
        <el-button type="gray" class="button-p-3" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>
  </el-dialog>

</div>
</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
import draftEditTable from './DraftEditTable.vue'
import mailEditTable from './MailEditTable.vue'
export default {
  components: {
    draftEditTable,
    mailEditTable
  },
  data() {
    return {
      //自定义属性
      exportDialogShow: false,
      activeName: "done",
      doneId: "doneId",
      draftId: "draftId",
      queryForm: {
        q_mail_name: "",
        q_mail_ip: "",
        q_charge: "",
        q_charge_person_phone: "",
        q_unit_name: "",
        q_unit_type: "",
        q_grading: "",
      },
       delSelected: "/ssa/mailSystem/deleteCheckedRows.do",
      // accept_type: "xlsx/xls",
      fileList: [],
      formatError: false,
      advancedFlag: false,
      errorList: []
    }
  },
  methods: {
    // downloadTemplate() {
    //   var fileUrl = "/static/template/BlackWhiteListBatchImport.xlsx";
    //   window.location.href = fileUrl;
    // },
    // handleBeforeUpload(file) {
    //   // alert(file.name);
    //   var filename = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
    //   //  alert(nameExt);
    //   if (filename != ".xlsx") {
    //     this.$message({
    //       type: 'error',
    //       message: "只允许上传与模版相同的xlsx格式的表格文件！"
    //     });
    //     this.fileList = [];
    //     return false;
    //   } else {
    //     return true;
    //   }

    // },
    resetForm(queryForm) {
      this.queryForm = {
        q_mail_name: "",
        q_mail_ip: "",
        q_charge: "",
        q_charge_person_phone: "",
        q_unit_name: "",
        q_unit_type: "",
        q_grading: "",
      };
    },
    // 高级搜索
    showAdvanced() {
      this.advancedFlag = true;
    },
    // 普通搜索
    hideAdvanced() {
      this.resetForm('params');
      this.advancedFlag = false;
    },
    handleSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      if (response.state) {
        this.exportDialogShow = false;
        this.$store.dispatch('reloadTable', this.tableId);
        this.$message({
          type: 'success',
          message: '导入成功！'
        })
      } else {
        this.exportDialogShow = false;
        if (response.message===null) {
          this.$message({
            type: 'error',
            message: '导入失败，请检查格式后重新上传！'
          })
        }else {
          this.$message({
            type: 'error',
            message: response.message,
          })
        }

      }
    },
    // 导入
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 导入
    importEvent() {
      this.exportDialogShow = true;
    },
    // 刷新列表
    reload() {
      this.$store.dispatch('reloadTable', this.tableId);
    },
    handleSuccessOnBlack(response, file, fileList) {
      let rs = response.data;
      if (response.state) {

        this.$message({
          type: 'success',
          message: rs
        });
        this.$store.dispatch('reloadTable', this.blackId);


      } else {
        this.$message({
          type: 'error',
          message: rs
        });
      }

      this.fileList = [];
    },
    handleSuccessOnWhite(response, file, fileList) {
      if (response.state) {
        this.$message({
          type: 'success',
          message: response.data
        });
        this.$store.dispatch('reloadTable', this.whiteId);
      } else {
        this.$message({
          type: 'error',
          message: response.data
        });
      }
      this.fileList = [];
    },
    qryData() {
      if (this.activeName == "done") {
        var tableId = this.doneId;
        var params = this.queryForm;
        params.bw_type = "1";
      }else {
        var tableId = this.draftId;
        var params = this.queryForm;
        params.bw_type = "0";
      }
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
    addRow() {
      var params = {};
      params.handle = "add";
      if (this.activeName == "done") {
        params.bw_type = "1";
      } else {
        params.bw_type = "0";
      }
      this.$router.push({
        path: "/mailSystemForm",
        query: params
      })
    },
    delCheckedRows() {
      if (this.activeName == "done") {
        var tableId = this.doneId;
      } else {
        var tableId = this.draftId;
      }
      var rows = this.$store.state.editTable[tableId].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请先选中数据");
        return;
      }

      this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var data_ids = [];
        rows.forEach(row => {
          data_ids.push(row.id);
        })
        var ids = data_ids.join(",");
        var msg = await commonAjax.req(this.delSelected, {
          ids: ids
        });
        await this.$store.dispatch('reloadTable', tableId);
        this.$message({
          type: 'success',
          message: msg
        });
      })
    }
    //methods end
  },
  created: function() {
  }
}
</script>
