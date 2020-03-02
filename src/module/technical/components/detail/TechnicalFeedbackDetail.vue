<template>
  <!-- 整改通知详细信息-->
  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>协查单位:</div>
      </el-col>
      <el-col :span="16">
        <div>{{technicalFeedbackDetail.org_Name}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>标题:</div>
      </el-col>
      <el-col :span="16">
      <div>{{technicalFeedbackDetail.feedback_title}}</div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>内容:</div>
      </el-col>
      <el-col :span="16">
      <div>{{technicalFeedbackDetail.feedback_content}}</div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>附件：</div>
      </el-col>
      <el-col :span="16">
        <a class="file m-r-18" v-show="technicalFeedbackDetail.attachment_filepath != null " >{{technicalFeedbackDetail.attachment_filename}}</a>
        <a v-show="technicalFeedbackDetail.attachment_filepath != null " @click="downloadFile()" class="download m-r-18">下载</a>
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
      technicalFeedbackDetail: {}
    }
  },
  methods:{
    downloadFile(){
      this.$store.dispatch('downloadFile', [this.params]);
    }
  },
  created: async function() {
      this.technicalFeedbackDetail = await this.$store.dispatch('gettechnicalFeedbackDetail', [this.params]);
      console.log(this.technicalFeedbackDetail);
  }
}
</script>
