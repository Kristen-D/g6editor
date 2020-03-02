<template>
<div>
  <el-row class="process-content" :gutter="20">


    <el-col :span="8" :offset="16">
      <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="exportDoc('superviseInspectTask',superviseInspectDetail.task_inspect_id)">信息安全等级保护监督检查记录单</a>

      <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload"
          :data="uploadParams">
        <el-button size="small" type="text">+扫描文件上传</el-button>
      </el-upload>

      <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadAttachment()">扫描文件</a>
      <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>检查内容:</div>
    </el-col>
    <el-col :span="16">


      <el-checkbox-group v-model="superviseInspectDetail.checkedRecords">
        <div v-for="(item,index) in inspectionRecords">
          <div v-if="item.value %100 ==0">
            {{item.name}}
          </div>
          <el-checkbox v-else :label="item.value">{{item.name}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>情况说明:</div>
    </el-col>
    <el-col :span="16">
      {{superviseInspectDetail.explaination}}
    </el-col>
  </el-row>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  props: ["params"],
  data() {
    return {
      inspectionRecords: [],
      superviseInspectDetail: {},
      uploadParams:{},
      file:{}
    }
  },

  methods: {

    beforeUpload(file) {
      this.uploadParams.bussiness_id = this.params.taskId;
      this.uploadParams.bussiness_type = "TASKINSPECT";

    },
    async deleteFile() {
      var param = {};
      param.id = this.file.id;
      var msg = await this.utils.req("/ssa/processMgmt/deleteAttachment.do", param, this);
      this.$message({
        message: msg,
        type: 'success'
      });
      this.file.attachment_filepath = "";

    },
    getAttachment() {
      var param = {};
      param.bussiness_id = this.params.taskId;
      param.bussiness_type = "TASKINSPECT";
      this.utils.req("/ssa/processMgmt/getAttachment.do", param, this).then(result => {
        if (result != null) {
          this.file = result;
        }
      });
    },
    handleSuccess(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.getAttachment();


      }
    },

    downloadFile() {
      var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.params.taskId + "&bussiness_type=" + "TASKINSPECT";
      window.location.href = fileUrl;
    },

    exportDoc(type, id) {
      window.location.href = "/ssa/taskInspect/downloadWord.do?type=" + type + "&id=" + id;
    }
  },
  created: async function() {
    this.inspectionRecords = await this.utils.req("/ssa/taskInspect/getInspectionRecords.do", null, this);
    this.superviseInspectDetail = await this.$store.dispatch('getSuperviseInspectDetail', [this.params, this.params.tkey]);
    if (this.superviseInspectDetail.inspection_records != null) {
      this.superviseInspectDetail.checkedRecords = this.superviseInspectDetail.inspection_records.split(",");
    }
    this.getAttachment();
  }
}
</script>
