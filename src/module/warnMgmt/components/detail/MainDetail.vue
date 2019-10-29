<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
//协查表单
import warnMgmtDetail from './WarnMgmtDetail'

//审批
import warnMgmtAuditDetail from './WarnMgmtAuditDetail'
//反馈
import warnMgmtFeedBackDetail from './WarnMgmtFeedBackDetail'
// 验证
import warnMgmtYzDetail from './WarnMgmtYzDetail'
// 验证审批
import warnMgmtYzSpDetail from './WarnMgmtYzSpDetail'
//解除
import warnMgmtJcDetail from './WarnMgmtJcDetail'
export default {
  components: {
    warnMgmtDetail,
    warnMgmtAuditDetail,
    warnMgmtFeedBackDetail,
    warnMgmtYzDetail,
    warnMgmtYzSpDetail,
    warnMgmtJcDetail
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
