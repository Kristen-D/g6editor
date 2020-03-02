
<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>预警名称:</div>
    </el-col>
    <el-col :span="16">
      <div>{{eventYzDetail.alert_header}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>核查验证:</div>
    </el-col>
    <el-col :span="16">
      <div>{{eventYzDetail.validation}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>核查结论:</div>
    </el-col>
    <el-col :span="16">
      <div>{{eventYzDetail.validation}}</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
props: ["params"],
  data() {
    return {
      eventYzDetail:[]
    }
  },
  //props: ["tkey","warnHandleInfoDetail", "eventTzDetail","eventTzDetailparams","eventReportDetail", "eventFkDetail", "eventYzDetail", "eventYzSpDetail", "eventJcDetail"],

  created: async function() {
    this.eventYzDetail = await this.$store.dispatch('getEventYzDetail', [this.params]);
  }
}
</script>

<style>

</style>
