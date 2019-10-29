<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import taskInspectDetail from './TaskInspectDetail'
import inspectAduitDetail from './InspectAduitDetail'
import superviseInspectDetail from './SuperviseInspectDetail'
import rectificationNoticeDetail from './RectificationNoticeDetail'
//整改反馈详细信息
import rectificationFeedbackDetail from './RectificationFeedbackDetail'
import rectificationCheckDetail from './RectificationCheckDetail'
import bulletinDetail  from  './BulletinDetail'
export default {
  components: {
    taskInspectDetail,
    inspectAduitDetail,
    superviseInspectDetail,
    rectificationNoticeDetail,
    rectificationFeedbackDetail,
    rectificationCheckDetail,
    bulletinDetail
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
