<template>
<div>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>被通报单位:</div>
    </el-col>
    <el-col :span="16">
      <div>{{this.orgName}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>文号:</div>
    </el-col>
    <el-col :span="16">
      <div>并公信安 通字【{{bulletinDetail.word}}】 第【{{bulletinDetail.num}}】号</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>通报依据:</div>
    </el-col>
    <el-col :span="16">
      <div>《信息系统安全等级保护限期整改通知书》并公信安 限字【{{bulletinDetail.zg_word}}】 第【{{bulletinDetail.zg_num}}】号</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>通报事由:</div>
    </el-col>
    <el-col :span="16">
      <div>{{bulletinDetail.reason}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>通报时间:</div>
    </el-col>
    <el-col :span="16">
      <div>{{bulletinDetail.create_time}}</div>
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
      orgName:"",
      bulletinDetail: {}
    }
  },
  created: async function() {
    this.orgName = this.params.orgName;
    this.bulletinDetail = await this.$store.dispatch('getBulletinDetail', [this.params]);
  }
}
</script>
