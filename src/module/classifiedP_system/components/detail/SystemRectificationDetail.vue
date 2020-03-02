<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>处理结果:</div>
    </el-col>
    <el-col :span="16">
      <div>{{systemRectificationDetail.reason}}</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  props:["params"],
  data() {
    return {
      systemRectificationDetail: {}
    }
  },
  created: async function() {

    this.systemRectificationDetail = await this.$store.dispatch('getSystemRectificationDetail', [this.params]);
  }
}
</script>
