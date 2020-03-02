<template>
<el-tabs v-model="activeName" @tab-click="handleClick" type="card">
  <el-tab-pane label="我收到的" name="first">
    <evaluationOrganRcvProcess></evaluationOrganRcvProcess>
  </el-tab-pane>
  <el-tab-pane label="我发布的" name="second">
    <evaluationOrganPubProcess></evaluationOrganPubProcess>
  </el-tab-pane>
</el-tabs>
</template>
<script>
//我收到的流程
import evaluationOrganRcvProcess from './EvaluationOrganRcvProcess'
//我发布的流程
import evaluationOrganPubProcess from './EvaluationOrganPubProcess'
import toolbar from './Toolbar'
export default {
  components: {
    toolbar,
    evaluationOrganRcvProcess,
    evaluationOrganPubProcess
  },
  data() {
    return {
      currentView: 'evaluationOrganProcess',

      activeName: 'first',
      activeName1: 'aaa'

    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
