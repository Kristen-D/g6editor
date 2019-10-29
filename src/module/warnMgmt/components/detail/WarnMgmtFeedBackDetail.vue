
<template>
<div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>预警名称:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventFkDetail.alert_header}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div>反馈单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventFkDetail.org_Name}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div>处置反馈:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventFkDetail.check_result}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>附件：</div>
      </el-col>
      <el-col :span="16">
        <a class="file m-r-18" v-show="eventFkDetail.attachment_filepath != null " >{{eventFkDetail.attachment_filename}}</a>
        <a v-show="eventFkDetail.attachment_filepath != null " @click="downloadFile2(eventFkDetail.alert_id)" class="download m-r-18">下载</a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
props: ["params"],
  data() {
    return {
      eventFkDetail:{}
    }
  },
  methods:{
    downloadFile2(alert_id) {
      var fileUrl = "/ssa/warnMgmt/downloadFile2.do?alert_id=" + alert_id+"&taskId="+this.eventFkDetail.taskId;
      window.location.href = fileUrl;
      },
  },
  //props: ["tkey","warnHandleInfoDetail", "eventTzDetail","eventTzDetailparams","eventReportDetail", "eventFkDetail", "eventYzDetail", "eventYzSpDetail", "eventJcDetail"],
  created: async function() {
    this.eventFkDetail = await this.$store.dispatch('getAlertFeedbackDetail', [this.params]);
  }
}
</script>

<style>

</style>
