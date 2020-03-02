<template>
  <!--核查反馈详细内容 -->
<div>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>归档结果:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="technicalCheckDetail.isPass ==1 ">通过</div>
      <div v-if="technicalCheckDetail.isPass ==0 ">不通过</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>归档意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{technicalCheckDetail.technical_place}}</div>
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
      technicalCheckDetail: {}
    }
  },
  created: async function() {
    //this.orgName = this.params.orgName;
    this.technicalCheckDetail = await this.$store.dispatch('gettechnicalCheckDetail', [this.params]);
    console.log(this.technicalCheckDetail);
  }
}
</script>
