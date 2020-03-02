<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import caseAduitDetail from './CaseAduitDetail'
import investigateDetail from './InvestigateDetail'
import caseFileDetail from './CaseFileDetail'
import casePublishDetail from './CasePublishDetail'
import caseInvestigateDetail from './CaseInvestigateDetail'
export default {
  components: {
    caseFileDetail,
    investigateDetail,
    caseAduitDetail,
    casePublishDetail,
    caseInvestigateDetail
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
