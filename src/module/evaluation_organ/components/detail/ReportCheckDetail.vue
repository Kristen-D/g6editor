<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div v-if="reportCheckDetail.isPass ==1 ">审核意见:</div>
      <div v-if="reportCheckDetail.isPass ==0 ">不合规内容:</div>
    </el-col>
    <el-col :span="16">
      <div>{{reportCheckDetail.reason}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否合规:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="reportCheckDetail.isPass ==1 ">合规</div>
      <div v-if="reportCheckDetail.isPass ==0 ">不合规</div>
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
      reportCheckDetail: {}
    }
  },
  created: async function() {

    this.reportCheckDetail = await this.$store.dispatch('getReportCheckDetail', [this.params]);
  }
}
</script>
