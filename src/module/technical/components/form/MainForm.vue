<template>
<component v-bind:is="currentForm" v-bind:params="this.$route.params">
</component>
</template>

<script>
//协查表单
import technicalForm from './TechnicalForm'

import technicalTjForm from './TechnicalTjForm'
//协查审批
import technicalAduitForm from './TechnicalAduitForm'
//协查反馈
import technicalFeedbackForm from './TechnicalFeedbackForm'
// 协查归档
import technicalCheckForm from './TechnicalCheckForm'
export default {
  components: {
    technicalForm,
    technicalTjForm,
    technicalAduitForm,
    technicalFeedbackForm,
    technicalCheckForm
  },
  data() {
    return {
      currentForm: "",
      params: {}
    }
  },
  created: function() {
    if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {
      this.currentForm = "technicalForm";
    }
  }
}
</script>
