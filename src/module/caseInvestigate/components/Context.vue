<template>
<component v-bind:is="currentView">
</component>
</template>
<script>

//我收到的流程
import caseInvestigateRcvProcess from './CaseInvestigateRcvProcess'
//我发布的流程
import caseInvestigatePubProcess from './CaseInvestigatePubProcess'
// 我发布 + 我收到
import caseInvestigateProcess from './CaseInvestigateProcess'
import {mapState}from 'vuex'
export default {
  components: {
    caseInvestigateProcess,
    caseInvestigateRcvProcess,
    caseInvestigatePubProcess

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
    this.$store.dispatch("getCaseProtocol");
    this.$store.dispatch("getCaseDeviceType");
    this.$store.dispatch("getCaseType");
    this.$store.dispatch("getLeaderRoleUser");
    await this.$store.dispatch('getUserRoles');
    var page ="";
    if(this.utils.hasRole(this.roles,[6])){
      page = "caseInvestigateRcvProcess";
    }
    if(this.utils.hasRole(this.roles,[3,4,5])){
      page = "caseInvestigateProcess";
    }
    this.currentView = page;


  }
};
</script>
