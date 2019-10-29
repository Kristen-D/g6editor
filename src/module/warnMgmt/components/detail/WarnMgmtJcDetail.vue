
<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>解除结果:</div>
    </el-col>
    <el-col :span="16">
      <div>解除</div>
    </el-col>
  </el-row>
  <!-- <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="eventJcDetail.isPass ==1 ">通过</div>
      <div v-if="eventJcDetail.isPass ==0 ">不通过</div>
    </el-col>
  </el-row> -->

</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      eventJcDetail:[]
    }
  },
  //props: ["tkey","warnHandleInfoDetail", "eventTzDetail","eventTzDetailparams","eventReportDetail", "eventFkDetail", "eventYzDetail", "eventYzSpDetail", "eventJcDetail"],
  created: async function() {
    this.eventJcDetail = await this.$store.dispatch('getEventJcDetail', [this.params]);
  }
}
</script>

<style>

</style>
