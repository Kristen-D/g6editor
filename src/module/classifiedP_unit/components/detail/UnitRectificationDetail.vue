<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>处理结果:</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitRectificationDetail.reason}}</div>
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
      unitRectificationDetail: {}
    }
  },
  methods:{
  },
  created: async function() {

    this.unitRectificationDetail = await this.$store.dispatch('getUnitRectificationDetail', [this.params]);
  }
}
</script>
