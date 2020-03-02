<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import pNotifyTaskDetail from './PnotifyTaskDetail'
import pAudit1TaskDetail from './Paudit1TaskDetail'
import mNotifyTaskDetail from './MnotifyTaskDetail'
import mHandleTaskDetail from './MHandleTaskDetail'

import mAuditTaskDetail from './MauditTaskDetail'
import pAudit2TaskDetail from './Paudit2TaskDetail'



export default {
  components: {
    pNotifyTaskDetail,
    pAudit1TaskDetail,
    mNotifyTaskDetail,
    mHandleTaskDetail,
    mAuditTaskDetail,
    pAudit2TaskDetail
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
