<template>
<component v-bind:is="currentView">
</component>
</template>
<script>

//我收到的流程
import myReceProcess from './MyReceProcess'
//我发布的流程
import mySendProcess from './NoticePubProcess'
// 我发布 + 我收到
import noticeProcess from './NoticeProcess'

import {mapState}from 'vuex'
export default {
  components: {
    myReceProcess,
    mySendProcess,
    noticeProcess
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
    if(this.common.hasRole(this.roles,[1,2,5,6,7,12])){
      this.currentView = "myReceProcess";
    }
    //this.currentView = "myReceProcess";
    if(this.common.hasRole(this.roles,[1,2,3,4,5])){
      this.currentView = "noticeProcess";
    }

    this.$store.state.context.isCompany = this.common.hasRole(this.roles,[5,6,7,12])
    // this.$store.dispatch('loadOrgList');
  }
};
</script>
