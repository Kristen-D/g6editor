<template>
<el-tabs v-model="activeName" @tab-click="handleClick" type="card">
  <el-tab-pane label="我收到的" name="first">
    <unitRcvProcess></unitRcvProcess>
  </el-tab-pane>
  <el-tab-pane label="我发布的" name="second">
    <unitPubProcess></unitPubProcess>
  </el-tab-pane>
</el-tabs>
</template>
<script>
//我收到的流程
import unitRcvProcess from './UnitRcvProcess.vue'
//我发布的流程
import unitPubProcess from './UnitPubProcess.vue'
import toolbar from './Toolbar'
export default {
  components: {
    toolbar,
    unitRcvProcess,
    unitPubProcess
  },
  data() {
    return {
      currentView: 'unitPubProcess',

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
