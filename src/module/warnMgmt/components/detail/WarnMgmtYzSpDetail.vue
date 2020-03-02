
<template>
<div>

    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>检查验证:</div>
      </el-col>
      <el-col :span="16">
        <div>{{eventYzSpDetail.reason}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>核查结论:</div>
      </el-col>
      <el-col :span="16">
        <div v-if="eventYzSpDetail.isPass ==1 ">通过</div>
        <div v-if="eventYzSpDetail.isPass ==0 ">不通过</div>
      </el-col>
    </el-row>
</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      eventYzSpDetail:[]
    }
  },
  //props: ["tkey","warnHandleInfoDetail", "eventTzDetail","eventTzDetailparams","eventReportDetail", "eventFkDetail", "eventYzDetail", "eventYzSpDetail", "eventJcDetail"],

  methods: {
    downloadFile(id) {
      var fileUrl = "/ssa/eventMgmt/downloadFile.do?event_handling_id=" + id;
      window.location.href = fileUrl;
    }
  },
  created: async function() {
    this.eventYzSpDetail = await this.$store.dispatch('getEventYzSpDetail', [this.params]);
  }
}
</script>

<style>

</style>
