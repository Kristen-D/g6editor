<template>
<component v-bind:is="currentForm" v-bind:params="this.$route.params">
</component>
</template>

<script>
import maliciousAssetsForm from './MaliciousAssetsForm'
export default {
  components: {
    maliciousAssetsForm
  },
  data() {
    return {
      currentForm: "",
      params: {}
    }
  },
  created: function() {
    if (this.$route.params.handle == 'update' || this.$route.params.handle == 'add') {
      this.currentForm = "maliciousAssetsForm";
    }
  }
}
</script>
