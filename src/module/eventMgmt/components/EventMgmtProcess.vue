<template>
<el-tabs  v-model="activeName"  type="card">
  <el-tab-pane label="我收到的" name="first">
    <eventMgmtRcvProcess></eventMgmtRcvProcess>
  </el-tab-pane>
  <el-tab-pane label="我发布的" name="second">
    <eventMgmtPubProcess></eventMgmtPubProcess>
  </el-tab-pane>
</el-tabs>
</template>
<script>
//我收到的流程
import eventMgmtRcvProcess from './EventMgmtRcvProcess'
//我发布的流程
import eventMgmtPubProcess from './EventMgmtPubProcess'

export default {
  components: {
    eventMgmtRcvProcess,
    eventMgmtPubProcess
  },
  data() {
    return {
      currentView: 'taskInspectProcess',
      activeName: 'first',
    };
  }
};
</script>
