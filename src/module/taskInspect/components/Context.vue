<template>
<component v-bind:is="currentView">
</component>
</template>
<script>

//我收到的流程
import taskInspectRcvProcess from './TaskInspectRcvProcess'
//我发布的流程
import taskInspectPubProcess from './TaskInspectPubProcess'
// 我发布 + 我收到
import taskInspectProcess from './TaskInspectProcess'
import {mapState}from 'vuex'
export default {
  components: {
    taskInspectProcess,
    taskInspectRcvProcess,
    taskInspectPubProcess

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

  methods: {},

  created: async function() {
    await this.$store.dispatch('getUserRoles');

    var page = "";
    if(this.utils.hasRole(this.roles,[6,7])){
      page="taskInspectRcvProcess";

    }

    if(this.utils.hasRole(this.roles,[4,5])){
      page ="taskInspectProcess";
    }
    this.currentView = page;
    this.$store.state.process.isCompany = this.utils.hasRole(this.roles,[7])
    
    this.$store.dispatch('getLeaderRoleUser');
    this.$store.dispatch('getHandleRoleUser');
    this.$store.dispatch('getSuperviseRoleUser');
    this.$store.dispatch('getInspectionItems');


  }
};
</script>
