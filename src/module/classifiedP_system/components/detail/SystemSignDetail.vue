<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>接收材料回执:</div>
    </el-col>
    <el-col :span="16">
      <div><a class="file m-r-18" v-show="systemSignDetail.attachment_filepath != null " >{{systemSignDetail.attachment_filename}}</a>
      <a v-show="systemSignDetail.attachment_filepath != null " @click="downloadFile(systemSignDetail.attachment_filename,systemSignDetail.attachment_filepath)" class="download m-r-18">下载</a>
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
      systemSignDetail: {}
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
    this.systemSignDetail = await this.$store.dispatch('getSystemSignDetail', [this.params]);
  }
}
</script>
