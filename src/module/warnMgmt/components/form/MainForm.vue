<template>
<component v-bind:is="currentForm" v-bind:params="this.$route.params">
</component>
</template>

<script>
//协查表单
import warnMgmtForm from './WarnMgmtForm'

import warnMgmtFbForm from './WarnMgmtFbForm'
//审批
import warnMgmtAuditForm from './WarnMgmtAuditForm'
//反馈
import warnMgmtFeedBackForm from './WarnMgmtFeedBackForm'
// 验证
import warnMgmtYzForm from './WarnMgmtYzForm'
// 验证审批
import warnMgmtYzSpForm from './WarnMgmtYzSpForm'
//解除
import warnMgmtJcForm from './WarnMgmtJcForm'
export default {
  components: {
    warnMgmtForm,
    warnMgmtFbForm,
    warnMgmtAuditForm,
    warnMgmtFeedBackForm,
    warnMgmtYzForm,
    warnMgmtYzSpForm,
    warnMgmtJcForm
  },
  data() {
    return {
      currentForm: "",
      params: {}
    }
  },
  created: function() {
    if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {
      this.currentForm = "warnMgmtForm";
    }
  }
}
</script>
