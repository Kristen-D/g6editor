<template>
  <!--核查反馈详细内容 -->
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
      <div>核查意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{feedBackCheckDetailDetail.checkOpinion}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="feedBackCheckDetailDetail.isPass ==1 ">通过</div>
      <div v-if="feedBackCheckDetailDetail.isPass ==0 ">不通过</div>
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
      feedBackCheckDetailDetail: {}
    }
  },
  created: async function() {
    this.feedBackCheckDetailDetail = await this.$store.dispatch('getFeedBackCheckDetailDetail', [this.params]);

  }
}
</script>
