<template>
<div>
    <div class="top-title">{{formRule.title}}</div>
    <EditRuleDesc></EditRuleDesc>
    <EditRuleCondition ></EditRuleCondition>
    <EditRuleMergeWindow v-if="formRule.configTemplate==102" ></EditRuleMergeWindow>
    <EditRuleChangeWindow v-if="formRule.configTemplate==104"></EditRuleChangeWindow>
    <EditRuleTimeWindow v-if="formRule.configTemplate==102"></EditRuleTimeWindow>
    <EditRuleOutput  v-if="formRule.configTemplate!=101"></EditRuleOutput>
    <EditRuleSave></EditRuleSave>
</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import EditRuleDesc from './EditRuleDesc.vue'
import EditRuleCondition from './EditRuleCondition.vue'
import EditRuleMergeWindow from './EditRuleMergeWindow.vue'
import EditRuleOutput from './EditRuleOutput.vue'
import EditRuleSave from './EditRuleSave.vue'
import EditRuleChangeWindow from './EditRuleChangeWindow.vue'
import EditRuleTimeWindow from './EditRuleTimeWindow.vue'

export default {
  components:{
      EditRuleDesc,EditRuleCondition,EditRuleOutput,EditRuleSave,EditRuleTimeWindow,EditRuleChangeWindow,EditRuleMergeWindow
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
