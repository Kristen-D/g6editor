<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>下发地市:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="detail.isPass == 1">是</div>
      <div v-if="detail.isPass == 0">否</div>
    </el-col>
  </el-row>

  <el-row  v-if="detail.isPass == 1" class="process-content" :gutter="20">
    <el-col :span="4">
      <div>处置地市:</div>
    </el-col>
    <el-col :span="16">
      <div>{{detail.roleName}}</div>
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
        role: null,
        remark: "",
        roleName: ""
      },
      file: {
        attachment_filename: "",
        attachment_filepath: ""
      }
    }
  },
  methods: {
    downloadFile() {
      var fileUrl = "/ssa/processMgmt/downloadAttachment.do?bussiness_id=" + this.params.taskId + "&bussiness_type=" + "alarmMgmtJsProcess_pNotifyTask";
      window.location.href = fileUrl;
    },
  },
  created: async function() {
    var vm = this;
    var attachment = await this.common.req("/ssa/alarmManagerJs/getAttachment.do", {
      bussiness_type: "alarmMgmtJsProcess_pNotifyTask",
      bussiness_id: vm.params.taskId
    })

    if (attachment != null) {
      this.file = attachment;
    }

    this.common.req("/ssa/processMgmt/getHiVarsByTaskId.do", {
      taskId: this.params.taskId
    }).then(function(data) {

      vm.detail.role = data[0].textValue;
      vm.detail.isPass = data[1].longValue;
      vm.detail.remark = data[2].textValue;

      vm.common.req("/ssa/alarmManagerJs/getSystemRoles.do", {
        role_id: vm.detail.role
      }).then(function(data) {
        vm.detail.roleName = data[0].title;
      });

    })


  }
}
</script>
<style media="screen">
.process-content.el-row {
  margin-bottom: 0px;
}
</style>
