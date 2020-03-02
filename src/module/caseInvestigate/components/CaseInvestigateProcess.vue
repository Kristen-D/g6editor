<template>
<el-tabs  v-model="activeName" @tab-click="handleClick" type="card">
  <el-tab-pane label="我收到的" name="first">
    <caseInvestigateRcvProcess></caseInvestigateRcvProcess>
  </el-tab-pane>
  <el-tab-pane label="我发布的" name="second">
    <caseInvestigatePubProcess></caseInvestigatePubProcess>
  </el-tab-pane>
</el-tabs>
</template>
<script>
//我收到的流程
import caseInvestigateRcvProcess from './CaseInvestigateRcvProcess'
//我发布的流程
import caseInvestigatePubProcess from './CaseInvestigatePubProcess'
import toolbar from './ToolBar'
export default {
  components: {
    toolbar,
    caseInvestigateRcvProcess,
    caseInvestigatePubProcess
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
  }
};
</script>
