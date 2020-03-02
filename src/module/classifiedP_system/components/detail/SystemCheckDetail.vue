<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>审核意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{systemCheckDetail.reason}}</div>
    </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="systemCheckDetail.isPass ==1 ">通过</div>
      <div v-if="systemCheckDetail.isPass ==0 ">不通过</div>
    </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20" v-if="systemCheckDetail.isPass ==0 ">
    <el-col :span="4">
      <div>审核整改通知:</div>
    </el-col>
    <el-col :span="16">
      <div><a class="file m-r-18" v-show="systemCheckDetail.attachment_filepath != null " >{{systemCheckDetail.attachment_filename}}</a>
      <a v-show="systemCheckDetail.attachment_filepath != null " @click="downloadFile(systemCheckDetail.attachment_filename,systemCheckDetail.attachment_filepath)" class="download m-r-18">下载</a>
    </div>
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
      systemCheckDetail: {}
    }
  },
  methods:{
    downloadFile(fileName,filePath){
      var params={};
      params.fileName=fileName;
      params.filePath=filePath;
      this.$store.dispatch('downloadFile', [params]);
    },
  },
  created: async function() {

    this.systemCheckDetail = await this.$store.dispatch('getSystemCheckDetail', [this.params]);
  }
}
</script>
