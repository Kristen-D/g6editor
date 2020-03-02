
<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>审核意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{eventAduitDetail.reason}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="eventAduitDetail.isPass ==1 ">通过</div>
      <div v-if="eventAduitDetail.isPass ==0 ">不通过</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
props:["params"],
  data() {
    return {
      eventAduitDetail: {}
    }
  },
  created: async function() {
      this.eventAduitDetail = await this.$store.dispatch('getEventAduitDetail', [this.params]);
  }
}
</script>
