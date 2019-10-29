<template>
<div class="whitebackground Whitespace">
  <div class="top-title">任务详情</div>
  <el-row style="margin-top:10px;">
    <el-col :span="18" :offset="1">
      <el-row>
        <mainDetail ref="taskHiDetail" style="margin-bottom:20px;" >
        </mainDetail>
      </el-row>
      <el-row>
        <eventMgmtInfo></eventMgmtInfo>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="18" :offset="2">
      <br/>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-col>
  </el-row>

</div>
</template>

<script>
import eventMgmtInfo from '../EventMgmtInfo'
import mainDetail from './MainDetail'
export default {
  components: {
    eventMgmtInfo,
    mainDetail

  },
  data() {
    return {
      tkey: "",
      detailMap:{
        eventHandleInfoTask:"eventHandleInfoDetail",
        eventReportTask:"eventReportDetail",
        submissionTask:"submissionTaskDetail",
        eventAduitTask:"eventAduitDetail",
        eventAdjustTask:"eventHandleInfoDetail",
        inquisitionTask:"inquisitionDetail",
        companyReportTask:"companyReportDetail",
        superviseTaskReportTask:"superviseTaskReportDetail",
        investigateReportTask:"investigateReportDetail",
        superviseRectifyTask:"superviseRectifyDetail",
        feedbackTask:"feedbackDetail",
        feedBackCheckTask:"feedBackCheckDetail",
        eventtaskAssessmentTask:"eventtaskAssessmentDetail",
        administrativePenaltyTask:"administrativePenaltyDetail"
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted: async function() {
    if (this.$route.params.tkey != null) {
      var params = {};
      this.tkey = this.$route.params.tkey;
      params.taskId = this.$route.params.taskId
      params.processInstanceId = this.$route.params.processInstanceId;
      params.event_handling_id = this.$route.params.event_handling_id;
      params.event_handling_header = this.$route.params.event_handling_header;
      params.orgName = this.$route.params.unit_name;
      var detail = this.$refs["taskHiDetail"];
      detail.currentDetail = this.detailMap[this.tkey];
      params.tkey = this.tkey;
      detail.params = params;
    }
  }
}
</script>

<style>

</style>
