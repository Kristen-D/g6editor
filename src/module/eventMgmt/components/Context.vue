<template>
<component v-bind:is="currentView">
</component>
</template>
<script>

//我收到的流程
import eventMgmtRcvProcess from './EventMgmtRcvProcess'
//我发布的流程
import eventMgmtPubProcess from './EventMgmtPubProcess'
// 我发布 + 我收到
import eventMgmtProcess from './EventMgmtProcess'
import {mapState}from 'vuex'
export default {
  components: {
    eventMgmtRcvProcess,
    eventMgmtPubProcess,
    eventMgmtProcess
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
  

    var page ="";
    if(this.utils.hasRole(this.roles,[6,7,11])){
    page = "eventMgmtRcvProcess";
    }
    if(this.utils.hasRole(this.roles,[3,4,5])){
      page = "eventMgmtProcess";
    }
    this.currentView =page;
    //this.$store.dispatch('loadOrgList');

  }
};
</script>
