<template>
<component v-bind:is="currentForm" v-bind:params="this.$route.params">
</component>
</template>

<script>
import blockingIpForm from './BlockingIpForm'
export default {
  components: {
    blockingIpForm
  },
  data() {
    return {
      currentForm: "",
      params: {}
    }
  },
  created: function() {
    if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {
      this.currentForm = "blockingIpForm";
    }
  }
}
</script>
