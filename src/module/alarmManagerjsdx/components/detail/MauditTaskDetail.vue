<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="detail.isPass == 1">通过</div>
      <div v-if="detail.isPass == 0">不通过</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>审核意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{detail.remark}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20" v-show="this.file.attachment_filename != null && this.file.attachment_filepath != ''">
    <el-col :span="4">
      <div>附件:</div>
    </el-col>
    <el-col :span="16">
      <a class="file m-r-18" style="color:#4db3ff;cursor:pointer;" @click="downloadFile()">{{file.attachment_filename}}</a>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      detail: {
        isPass: null,
        remark: ""

      },
      file: {
        attachment_filename: "",
        attachment_filepath: ""
      }
    }
  },
  methods: {
    downloadFile() {
      var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.params.taskId + "&bussiness_type=" + "alarmMgmtJsProcess_mAuditTask";
      window.location.href = fileUrl;
    },
  },
  created: async function() {
    var vm = this;
    var attachment = await this.common.req("/ssa/alarmManagerJs/getAttachment.do", {
      bussiness_type: "alarmMgmtJsProcess_mAuditTask",
      bussiness_id: vm.params.taskId
    })

    if (attachment != null) {
      this.file = attachment;
    }

    this.common.req("/ssa/processMgmt/getHiVarsByTaskId.do", {
      taskId: this.params.taskId
    }).then(function(data) {


      vm.detail.isPass = data[0].longValue;
      vm.detail.remark = data[1].textValue;



    })


  }
}
</script>
<style media="screen">
.process-content.el-row {
  margin-bottom: 0px;
}
</style>
