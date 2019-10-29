<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import technicalDetail from './TechnicalDetail'
import technicalAduitDetail from './TechnicalAduitDetail'
//整改反馈详细信息
import technicalFeedbackDetail from './TechnicalFeedbackDetail'
import technicalCheckDetail from './TechnicalCheckDetail'
export default {
  components: {
    technicalDetail,
    technicalAduitDetail,
    technicalFeedbackDetail,
    technicalCheckDetail
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
