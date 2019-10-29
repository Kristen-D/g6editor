<template>
<component v-bind:is="currentForm" v-bind:params="this.$route.params">
</component>
</template>

<script>
import taskInspectForm from './TaskInspectForm'
import inspectAduitForm from './InspectAduitForm'
import superviseInspectForm from './SuperviseInspectForm'
//整改通知
import rectificationNoticeForm from './RectificationNoticeForm'
//整改反馈
import rectificationFeedbackForm from './RectificationFeedbackForm'
// 反馈核查
import rectificationCheckForm from './RectificationCheckForm'
import bulletinForm from './BulletinForm'
export default {
  components: {
    taskInspectForm,
    inspectAduitForm,
    superviseInspectForm,
    rectificationNoticeForm,
    rectificationFeedbackForm,
    rectificationCheckForm,
    bulletinForm
  },
  data() {
    return {
      currentForm: "",
      params: {}
    }
  },
  created: function() {
    if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {
      this.currentForm = "taskInspectForm";
    }
  }
}
</script>
