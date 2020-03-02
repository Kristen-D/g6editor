<template>
<component v-bind:is="currentView">
</component>
</template>
<script>

 //我收到的流程
 import myReceProcess from './TechnicalRcvProcess'
 //我发布的流程
 import mySendProcess from './TechnicalPubProcess'
 // 我发布 + 我收到
 import technicalProcess from './TechnicalProcess'

import {mapState}from 'vuex'
export default {
  components: {
     myReceProcess,
     mySendProcess,
     technicalProcess
  },
  computed: {
    ...mapState({
      roles: state => state.context.roles
    })
  },
  data() {
    return {
      currentView: ''
    };
  },
  created: async function() {
    await this.$store.dispatch('getUserRoles');
    // if(this.common.hasRole(this.roles,[6])){
    //   this.currentView = "myReceProcess";
    // }
    if(this.common.hasRole(this.roles,[4,5,6])){
      this.currentView = "technicalProcess";
    }

  //  this.$store.state.context.isCompany = this.common.hasRole(this.roles,[5,7])
    this.$store.dispatch('loadOrgList');
    this.$store.dispatch('getLeaderRoleUser');
  }
};
</script>
