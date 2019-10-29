<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>审核意见:</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitCheckDetail.reason}}</div>
    </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否通过:</div>
    </el-col>
    <el-col :span="16">
      <div v-if="unitCheckDetail.isPass ==1 ">通过</div>
      <div v-if="unitCheckDetail.isPass ==0 ">不通过</div>
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
      unitCheckDetail: {}
    }
  },
  methods:{
  },
  created: async function() {

    this.unitCheckDetail = await this.$store.dispatch('getUnitCheckDetail', [this.params]);
  }
}
</script>
