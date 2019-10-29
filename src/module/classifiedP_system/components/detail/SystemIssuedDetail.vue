<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>备案材料上传:</div>
    </el-col>
    <el-col :span="16">
      <div><a class="file m-r-18" v-show="systemIssuedDetail.attachment_filepath != null " >{{systemIssuedDetail.attachment_filename}}</a>
          <a v-show="systemIssuedDetail.attachment_filepath != null " @click="downloadFile(systemIssuedDetail.attachment_filename,systemIssuedDetail.attachment_filepath)" class="download m-r-18">下载</a>
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
      systemIssuedDetail: {}
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

    this.systemIssuedDetail = await this.$store.dispatch('getSystemIssuedDetail', [this.params]);
  }
}
</script>
