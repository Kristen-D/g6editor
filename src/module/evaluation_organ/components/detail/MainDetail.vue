<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import evaluationOrganDetail from './EvaluationOrganDetail.vue'
import disposalOpinionDetail from './DisposalOpinionDetail.vue'
import disposalApprovalDetail from './DisposalApprovalDetail.vue'
import fileDetail from './FileDetail.vue'
import reportCheckDetail from './ReportCheckDetail.vue'
export default {
  components: {
    evaluationOrganDetail,
    disposalOpinionDetail,
    disposalApprovalDetail,
    fileDetail,
    reportCheckDetail,
  },
  data() {
    return {
      currentDetail: "",
      params: {}
    }
  },
  created: function() {

  }
}
</script>
