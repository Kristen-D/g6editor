<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>审核意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitIssuedDetail.reason}}</div>
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
      unitIssuedDetail: {}
    }
  },
  methods:{
  },
  created: async function() {

    this.unitIssuedDetail = await this.$store.dispatch('getUnitIssuedDetail', [this.params]);
  }
}
</script>
