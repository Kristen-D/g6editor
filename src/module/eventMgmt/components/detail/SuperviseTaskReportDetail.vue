<template>
  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>事件名称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{enteringReportDetail.event_handling_header}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>监管部门现场处置：</div>
      </el-col>
      <el-col :span="16">
        <div>{{enteringReportDetail.supervise_hanle_info}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props:["params"],
  data() {
    return {
      enteringReportDetail:{}
    }
  },
  created: async function() {
    this.enteringReportDetail = await this.$store.dispatch('getEnteringReportDetail', [this.params,this.params.tkey]);
  }
}
</script>
