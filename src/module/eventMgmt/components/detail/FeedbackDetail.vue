<template>
  <!-- 整改通知详细信息-->
  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件名称:</div>
      </el-col>
      <el-col :span="16">
        <div>{{this.params.event_handling_header}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>标题:</div>
      </el-col>
      <el-col :span="16">
      <div>{{feedbackDetail.feedback_title}}</div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>内容:</div>
      </el-col>
      <el-col :span="16">
      <div>{{feedbackDetail.feedback_content}}</div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>附件：</div>
      </el-col>
      <el-col :span="16">
        <a class="file m-r-18" v-show="feedbackDetail.attachment_filepath != null " >{{feedbackDetail.attachment_filename}}</a>
        <a v-show="feedbackDetail.attachment_filepath != null " @click="downloadFile()" class="download m-r-18">下载</a>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  props:["params"],
  data() {
    return {
      orgName:"",
      feedbackDetail: {}
    }
  },
  methods:{
    downloadFile() {
      var fileUrl = "/ssa/eventMgmt/downloadFile.do?taskId=" + this.params.taskId + "&taskName=" + this.params.tkey;
      window.location.href = fileUrl;
    }
  },
  created: async function() {
      this.feedbackDetail = await this.$store.dispatch('getFeedbackDetail', [this.params]);
  }
}
</script>
