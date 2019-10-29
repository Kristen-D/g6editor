<template>
  <!--核查反馈详细内容 -->
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>反馈单位:</div>
    </el-col>
    <el-col :span="16">
      <div>{{this.orgName}}</div>
    </el-col>
  </el-row>
  
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>核查意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{rectificationCheckDetail.checkOpinion}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="rectificationCheckDetail.isPass ==1 ">通过</div>
      <div v-if="rectificationCheckDetail.isPass ==0 ">不通过</div>
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
      rectificationCheckDetail: {}
    }
  },
  created: async function() {
    this.orgName = this.params.orgName;
    this.rectificationCheckDetail = await this.$store.dispatch('getRectificationCheckDetail', [this.params]);

  }
}
</script>
