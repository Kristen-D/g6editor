<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import systemSignDetail from './SystemSignDetail.vue'
import systemCheckDetail from './SystemCheckDetail.vue'
import systemIssuedDetail from './SystemIssuedDetail.vue'
import systemFileCheckDetail from './SystemFileCheckDetail.vue'
import systemRectificationDetail from './SystemRectificationDetail.vue'
export default {
  components: {
    systemSignDetail,
    systemCheckDetail,
    systemIssuedDetail,
    systemFileCheckDetail,
    systemRectificationDetail,
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
