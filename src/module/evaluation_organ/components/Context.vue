<template>
<component v-bind:is="currentView">
</component>
</template>
<script>
import toolbar from './Toolbar'

//我收到的流程
import evaluationOrganRcvProcess from './EvaluationOrganRcvProcess'
//我发布的流程
import evaluationOrganPubProcess from './EvaluationOrganPubProcess'
// 我发布 + 我收到
import evaluationOrganProcess from './EvaluationOrganProcess'
import {mapState}from 'vuex'
export default {
  components: {
    toolbar,
    evaluationOrganProcess,
    evaluationOrganRcvProcess,
    evaluationOrganPubProcess

  },
  computed: {
    ...mapState({
      roles: state => state.process.roles
    })
  },
  data() {
    return {
      currentView: '',
      activeName: 'second',
      activeName1: 'aaa'

    };
  },
  methods: {

  },

  created: async function() {
    await this.$store.dispatch('getUserRoles');
    if(this.utils.hasRole(this.roles,[6,7])){
      this.currentView = "evaluationOrganRcvProcess";
    }
    if(this.utils.hasRole(this.roles,[4,5])){
      this.currentView = "evaluationOrganProcess";
    }
    //this.currentView = "evaluationOrganProcess";
    // this.$store.dispatch('loadOrgList');
    //this.$store.dispatch('getLeaderRoleUser');
    // this.$store.dispatch('getHandleRoleUser');
    // this.$store.dispatch('getSuperviseRoleUser');
    // this.$store.dispatch('getInspectionItems');


  }
};
</script>
