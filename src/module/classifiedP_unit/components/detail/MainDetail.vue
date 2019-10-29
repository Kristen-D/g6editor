<template>
<component v-bind:is="currentDetail" v-bind:params="params">
</component>
</template>

<script>
import unitCheckDetail from './UnitCheckDetail.vue'
import unitIssuedDetail from './UnitIssuedDetail.vue'
import unitRectificationDetail from './UnitRectificationDetail.vue'
export default {
  components: {
    unitCheckDetail,
    unitIssuedDetail,
    unitRectificationDetail,
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
