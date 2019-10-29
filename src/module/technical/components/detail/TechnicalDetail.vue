<template>
<div>
  <el-row class="process-content" :gutter="20" v-if="this.technicalTzDetail.isPass==1">
    <el-col :span="4">
      <div>协查单位：</div>
    </el-col>
    <el-col :span="14">
      <div>{{technicalDetail.feedback_unit_name}}</div>
    </el-col>

  </el-row>

  <el-row class="process-content" :gutter="20" v-if="this.technicalTzDetail.isPass==1">
    <el-col :span="4">
      <div>协查内容：</div>
    </el-col>
    <el-col :span="16">
      <div>{{technicalDetail.technical_desc}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20" v-if="this.technicalTzDetail.isPass==1">
    <el-col :span="4">
      <div>协查期限：</div>
    </el-col>
    <el-col :span="16">
      <div>{{technicalDetail.technical_limit_time}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20" v-if="this.technicalTzDetail.isPass==1">
    <el-col :span="4">
      <div>协查任务来源：</div>
    </el-col>
    <el-col :span="16">
      <div>{{technicalDetail.technical_source}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20" v-if="this.technicalTzDetail.isPass==0">
    <el-col :span="4">
      <div>表单作废：</div>
    </el-col>
    <el-col :span="16">
      <div>作废成功</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  props: ["params"],
  data() {
    return {
      technicalDetail: {},
      technicalTzDetail: {
        isPass:1
      }
    }
  },
  methods:{
    downloadFile(){
      this.$store.dispatch('downloadFile', [this.params]);
    },
    exportDoc(type,id){
      window.location.href = "/ssa/taskInspect/downloadWord.do?type="+type+"&id="+id;
    }
  },
  created: async function() {
    this.technicalDetail = await this.$store.dispatch('getTaskTechnicalById', [this.params, this.params.tkey]);
    if(this.params.tkey=='assistTzTask'){
      this.technicalTzDetail = await this.$store.dispatch('getassistTzTaskDetail', [this.params, this.params.tkey]);
      console.log(this.technicalTzDetail);
    }
  }
}
</script>
