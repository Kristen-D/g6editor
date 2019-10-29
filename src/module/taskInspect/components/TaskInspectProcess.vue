<template>
<el-tabs  v-model="activeName" type="card">
  <el-tab-pane label="我收到的" name="first">
    <taskInspectRcvProcess></taskInspectRcvProcess>
  </el-tab-pane>
  <el-tab-pane label="我发布的" name="second">
    <taskInspectPubProcess></taskInspectPubProcess>
  </el-tab-pane>
</el-tabs>
</template>
<script>
//我收到的流程
import taskInspectRcvProcess from './TaskInspectRcvProcess'
//我发布的流程
import taskInspectPubProcess from './TaskInspectPubProcess'
import toolbar from './Toolbar'
export default {
  components: {
    toolbar,
    taskInspectRcvProcess,
    taskInspectPubProcess
  },
  data() {
    return {
      activeName: 'first'
    };
  }
};
</script>
