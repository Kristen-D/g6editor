<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import superviseRectifyDetail from './SuperviseRectifyDetail'
import inquisitionDetail from './InquisitionDetail'
import superviseTaskReportDetail from './SuperviseTaskReportDetail'
import investigateReportDetail from './InvestigateReportDetail'
import companyReportDetail from './CompanyReportDetail'
import eventHandleInfoDetail from './EventHandleInfoDetail'
import eventAduitDetail from './EventAduitDetail'
import eventReportDetail from './EventReportDetail'
import eventtaskAssessmentDetail from './EventtaskAssessmentDetail'
import administrativePenaltyDetail from './AdministrativePenaltyDetail'
import feedbackDetail from './FeedbackDetail'
import feedbackCheckDetail from './FeedBackCheckDetail'
export default {
  components: {
    eventHandleInfoDetail,
    eventReportDetail,
    companyReportDetail,
    eventAduitDetail,
    investigateReportDetail,
    superviseTaskReportDetail,
    inquisitionDetail,
    superviseRectifyDetail,
    eventtaskAssessmentDetail,
    administrativePenaltyDetail,
    feedbackDetail,
    feedbackCheckDetail
  },
  data() {
    return {
      currentDetail: "",
      params: {}
    }
  }
}
</script>
