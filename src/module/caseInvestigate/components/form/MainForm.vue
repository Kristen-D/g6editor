<template>
<component v-bind:is="currentForm" v-bind:params="this.$route.params">
</component>
</template>

<script>
import investigateForm from './InvestigateForm'
import caseAduitForm from './CaseAduitForm'
import submissionForm from './SubmissionForm'
import caseInvestigateForm  from './CaseInvestigateForm'
import caseFileForm from './CaseFileForm'
export default {
components: {
investigateForm,caseAduitForm,submissionForm,caseInvestigateForm,caseFileForm
},
data() {
  return {
    currentForm: "",
    params: {}
  }
},
created: function() {
  
  if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {
    this.currentForm = "investigateForm";
  }
}
}
</script>
