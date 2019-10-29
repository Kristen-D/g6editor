  <template>
  <component v-bind:is="currentForm" v-bind:params="this.$route.params">
  </component>
  </template>

<script>
import evaluationOrganForm from './EvaluationOrganForm'
import disposalOpinionForm from './DisposalOpinionForm.vue'
import disposalApprovalForm from './DisposalApprovalForm.vue'
import fileForm from './FileForm.vue'
import reportCheckForm from './ReportCheckForm.vue'
export default {
  components:{
    evaluationOrganForm,
    disposalOpinionForm,
    disposalApprovalForm,
    fileForm,
    reportCheckForm
  },
  data(){
    return {
      currentForm:"",
      params:{}
    }
  },
  created:function(){
    if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {
      this.currentForm = "evaluationOrganForm";
    }

  }
}
</script>
