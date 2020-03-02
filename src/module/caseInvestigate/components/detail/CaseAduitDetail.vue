<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>审核意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{caseAduitDetail.reason}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="caseAduitDetail.isPass ==1 ">通过</div>
      <div v-if="caseAduitDetail.isPass ==0 ">不通过</div>
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
      caseAduitDetail: {}
    }
  },
  created: async function() {

    this.caseAduitDetail = await this.$store.dispatch('getCaseAduitDetail', [this.params]);
  }
}
</script>
