<template>
<component v-bind:is="currentView">
</component>
</template>
<script>

//我收到的流程
import warnMgmtRcvProcess from './WarnMgmtRcvProcess'
//我发布的流程
import warnMgmtPubProcess from './WarnMgmtPubProcess'
// 我发布 + 我收到
import warnMgmtProcess from './WarnMgmtProcess'
import {mapState}from 'vuex'
export default {
  components: {
    warnMgmtRcvProcess,
    warnMgmtPubProcess,
    warnMgmtProcess
  },
  computed: {
    ...mapState({
      roles: state => state.process.roles
    })
  },
  data() {
    return {
      currentView: ''
    };
  },
  created: async function() {
    await this.$store.dispatch('getUserRoles');
    if(this.utils.hasRole(this.roles,[6,7])){
      this.currentView = "warnMgmtRcvProcess";
    }
    if(this.utils.hasRole(this.roles,[3,4,5])){
      this.currentView = "warnMgmtProcess";
    }
    // this.$store.dispatch('loadOrgList');
    // this.$store.dispatch('loadPoliceOrgList');
  }
};
</script>
