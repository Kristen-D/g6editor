<template>
<div>
    <div class="top-title">{{formRule.title}}</div>
    <EditRuleDesc></EditRuleDesc>
    <EditRuleFlow  v-if="formRule.configTemplate==4"></EditRuleFlow>
    <EditRuleCondition  v-if="formRule.configTemplate!=4"></EditRuleCondition>
    <EditRuleTimeWindow v-if="formRule.configTemplate!=4"></EditRuleTimeWindow>
    <EditRuleOutput v-if="formRule.configTemplate!=4"></EditRuleOutput>
    <EditRuleAlarm v-if="formRule.configTemplate!=4"></EditRuleAlarm>
    <EditRuleSave></EditRuleSave>
</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'    
import EditRuleDesc from './EditRuleDesc.vue'
import EditRuleCondition from './EditRuleCondition.vue'
import EditRuleAlarm from './EditRuleAlarm.vue'
import EditRuleOutput from './EditRuleOutput.vue'
import EditRuleSave from './EditRuleSave.vue'
import EditRuleTimeWindow from './EditRuleTimeWindow.vue'
import EditRuleFlow from './EditRuleFlow.vue'

export default {
  components:{ 
      EditRuleDesc,EditRuleCondition,EditRuleAlarm,EditRuleOutput,EditRuleSave,EditRuleTimeWindow,EditRuleFlow
  },
  computed:{
        ...mapState({
           formRule:state=>state.context.formRule
        })
    }
}
</script>
<style>
    
</style>