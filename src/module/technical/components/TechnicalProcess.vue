<template>
<el-tabs  v-model="activeName" type="card">
  <el-tab-pane label="我收到的" name="first">
    <myReceProcess></myReceProcess>
  </el-tab-pane>
  <el-tab-pane label="我发布的" name="second">
    <mySendProcess></mySendProcess>
  </el-tab-pane>
</el-tabs>
</template>
<script>
//我收到的流程
import myReceProcess from './TechnicalRcvProcess'
//我发布的流程
import mySendProcess from './TechnicalPubProcess'

export default {
  components: {
    myReceProcess,
    mySendProcess
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    
  }
};
</script>
