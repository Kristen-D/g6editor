<template>
<component v-bind:is="currentForm" v-bind:params="this.$route.params">
</component>
</template>

<script>
import administrativePenaltyForm from './AdministrativePenaltyForm'
import companyReportForm from './CompanyReportForm'
import eventHandleForm from './EventHandleForm'
//处置审批表单
import eventAduitTaskForm from './EventAduitTaskForm'
import eventtaskAssessmentForm from './EventtaskAssessmentForm'
import inquisitionTaskForm from './InquisitionTaskForm'
import investigateReportForm from './InvestigateReportForm'
import submissionTaskForm from './SubmissionTaskForm'
import superviseTaskReportForm from './SuperviseTaskReportForm'
import superviseRectifyForm from './SuperviseRectifyForm'
import feedbackForm from './FeedbackForm'
import feedbackCheckForm from './FeedbackCheckForm'
export default {
components: {
  administrativePenaltyForm,
  companyReportForm,
  eventHandleForm,
  eventtaskAssessmentForm,
  //现场勘验
  inquisitionTaskForm,
  investigateReportForm,
  submissionTaskForm,
  superviseTaskReportForm,
  eventAduitTaskForm,
  superviseRectifyForm,
  feedbackForm,
  feedbackCheckForm
},
data() {
  return {
    currentForm: "",
    params: {}
  }
},
created: function() {

  if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {

    this.currentForm = "eventHandleForm";

  }
}
}
</script>
