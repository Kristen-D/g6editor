<template>
<el-tabs v-model="activeName" @tab-click="handleClick" type="card">
  <el-tab-pane label="我收到的" name="first">
    <systemRcvProcess></systemRcvProcess>
  </el-tab-pane>
  <el-tab-pane label="我发布的" name="second">
    <systemPubProcess></systemPubProcess>
  </el-tab-pane>
</el-tabs>
</template>
<script>
//我收到的流程
import systemRcvProcess from './SystemRcvProcess.vue'
//我发布的流程
import systemPubProcess from './SystemPubProcess.vue'
import toolbar from './Toolbar'
export default {
  components: {
    toolbar,
    systemRcvProcess,
    systemPubProcess
  },
  data() {
    return {
      currentView: 'systemPubProcess',

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
