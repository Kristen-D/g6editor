<template>
<div>
<el-row>
  <el-col :span="18" :offset="1">
  <mainForm ref="mainForm" v-show="this.$route.params.handle != 'view'" ></mainForm>
  <eventMgmtInfo></eventMgmtInfo>
  </el-col>
</el-row>

<el-row v-show="this.$route.params.handle == 'view'">
  <br/>
  <el-col :span="18" :offset="2">
    <el-button type="gray" @click="goBack">返回</el-button>
  </el-col>
</el-row>




</div>
</template>

<script>
import eventMgmtInfo from './EventMgmtInfo'
import mainForm from './form/MainForm'
export default {
  components: {
    eventMgmtInfo,
    mainForm
  },
  data(){
    return {
      formMap:{
        submissionTask:"submissionTaskForm",
        eventAduitTask:"eventAduitTaskForm",
        eventAdjustTask:"eventHandleForm",
        inquisitionTask:"inquisitionTaskForm",
        companyReportTask:"companyReportForm",
        superviseTaskReportTask:"superviseTaskReportForm",
        investigateReportTask:"investigateReportForm",
        superviseRectifyTask:"superviseRectifyForm",
        feedbackTask:"feedbackForm",
        feedbackCheckTask:"feedbackCheckForm",
        eventtaskAssessmentTask:"eventtaskAssessmentForm",
        administrativePenaltyTask:"administrativePenaltyForm"
      }
    }
  },
  methods: {
    goBack() {
      //案件查询事件详情后路由返回
      if(this.$route.params.module == "caseEvent"){
        this.$router.push({
          name: "caseInvestigateHandle",
          params: this.$route.params
        });
      }else{
          this.$router.go(-1);
      }

    },
    initForm(key){
      this.$refs["mainForm"].currentForm = this.formMap[key];
    }
  },
  mounted: function() {

    this.initForm(this.$route.params.tkey);
  }
}
</script>
