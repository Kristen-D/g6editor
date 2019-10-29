<template>
  <div>
    <div class="top-title">{{formRule.title}}</div>
    <EditRuleDesc ref="formRule1"></EditRuleDesc>

    <EditRuleCondition ref="formRule2"></EditRuleCondition>
    <EditRuleGroupWindow ref="formRule3" v-if="formRule.configTemplate==3"></EditRuleGroupWindow>
    <EditRuleTimeWindow ref="formRule4" v-if="formRule.configTemplate==2"></EditRuleTimeWindow>
    <EditRuleOutput ref="formRule5"></EditRuleOutput>
    <EditRuleAlarm></EditRuleAlarm>
    <EditRuleSave @saveCheck="saveCheck"></EditRuleSave>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import EditRuleDesc from './EditRuleDesc.vue'
import EditRuleCondition from './EditRuleCondition.vue'
import EditRuleAlarm from './EditRuleAlarm.vue'
import EditRuleOutput from './EditRuleOutput.vue'
import EditRuleSave from './EditRuleSave.vue'
import EditRuleGroupWindow from './EditRuleGroupWindow.vue'
import EditRuleTimeWindow from './EditRuleTimeWindow.vue'
import EditRuleFlow from './EditRuleFlow.vue'

export default {
  components: {
    EditRuleDesc, EditRuleCondition, EditRuleAlarm, EditRuleOutput, EditRuleSave, EditRuleTimeWindow, EditRuleGroupWindow, EditRuleFlow
  },
  computed: {
    ...mapState({
      formRule: state => state.context.formRule
    })
  },
  methods: {
    saveCheck() {
      this.$refs.formRule1.checkValidateForm();
       this.$refs.formRule2.checkValidateForm();

      if (this.formRule.configTemplate == 3) {
        this.$refs.formRule3.checkValidateForm();
      }
      if (this.formRule.configTemplate == 2) {
        this.$refs.formRule4.checkValidateForm();
      }

      this.$refs.formRule5.checkValidateForm();
    }
  }
}
</script>
