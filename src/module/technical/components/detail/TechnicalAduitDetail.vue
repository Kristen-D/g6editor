<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>审核意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{technicalAduitDetail.reason}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="technicalAduitDetail.isPass ==1 ">通过</div>
      <div v-if="technicalAduitDetail.isPass ==0 ">不通过</div>
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
      technicalAduitDetail: {}
    }
  },
  created: async function() {

    this.technicalAduitDetail = await this.$store.dispatch('gettechnicalAduitDetail', [this.params]);
  }
}
</script>
