
<template>
<div>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>预警名称:</div>
    </el-col>
    <el-col :span="12">
      <div>{{warnHandleInfoDetail.alert_header}}</div>
    </el-col>
    <el-col :span="8">
      <!-- <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="exportView(noticeHandleInfoDetail.notice_code)" >导出表单</a> -->
      <el-upload v-show="this.file.attachment_filepath == null || this.file.attachment_filepath == ''" style="display:inline-block" ref="feedbackUpload" action="/ssa/processMgmt/uploadAttachment.do" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload"
          :data="uploadParams">
        <el-button size="small" type="text">+扫描文件上传</el-button>
      </el-upload>

      <a class="file m-r-18" v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" style="color:#4db3ff;cursor:pointer;" @click="downloadFile1()">扫描文件</a>
      <el-button v-show="this.file.attachment_filepath != null && this.file.attachment_filepath != ''" @click="deleteFile()" size="small" type="text">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>预警等级:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.levelName}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>类型:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.alert_typeName}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>处置人:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.handlername}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>处置单位:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.unit_name}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>预警来源:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.alert_source}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>事发单位:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.alert_object_name}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>发生时间:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.alert_time}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==1">
    <el-col :span="4">
      <div>描述:</div>
    </el-col>
    <el-col :span="16">
      <div>{{warnHandleInfoDetail.alert_desc}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-show="this.eventTzDetailparams.isPass==1 && (warnHandleInfoDetail.attachment_filepath != null && warnHandleInfoDetail.attachment_filepath != '')">
    <el-col :span="4">
      <div style="color:#4db3ff;cursor:pointer;">附件：</div>
    </el-col>
    <el-col :span="16">
      <a style="color:#4db3ff;cursor:pointer;" @click="downloadFile(warnHandleInfoDetail.alert_id)" v-show="warnHandleInfoDetail.attachment_filepath != null ">{{warnHandleInfoDetail.attachment_filename}}</a>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20" v-if="this.eventTzDetailparams.isPass==0">
    <el-col :span="4">
      <div>预警表单作废：</div>
    </el-col>
    <el-col :span="16">
      <div>作废成功</div>
    </el-col>
  </el-row>
</div>

</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      warnHandleInfoDetail: {},
      eventTzDetailparams: {
        isPass: 1
      },
      uploadParams: {},
      file: {}
    }
  },
  methods: {
    beforeUpload(file) {
      //alert(this.params.taskId);
      this.uploadParams.bussiness_id = this.params.alert_id;
      this.uploadParams.bussiness_type = "WARNMGMT";

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
      param.bussiness_id = this.params.alert_id;
      param.bussiness_type = "WARNMGMT";

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

        //  this.goBack();
      }
    },
    downloadFile1() {
      var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.params.alert_id + "&bussiness_type=" + "WARNMGMT";
      window.location.href = fileUrl;
    },
    downloadFile(id) {
      var fileUrl = "/ssa/warnMgmt/downloadFile.do?alert_id=" + id;
      window.location.href = fileUrl;
    }
  },

  //props: ["tkey","warnHandleInfoDetail", "eventTzDetail","eventTzDetailparams","eventReportDetail", "eventFkDetail", "eventYzDetail", "eventYzSpDetail", "eventJcDetail"],
  created: async function() {
    this.getAttachment();
    this.warnHandleInfoDetail = await this.$store.dispatch('getWarnHandleInfoById', [this.params, this.params.tkey]);
    if (this.params.tkey == 'alertTztask') {
      this.eventTzDetailparams = await this.$store.dispatch('geteventTzDetail', [this.params, this.params.tkey]);
      console.log(this.eventTzDetailparams);
    }
  }
}
</script>

<style>

</style>
