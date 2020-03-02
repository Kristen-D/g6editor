<template>
<div>
  <el-row>
    <el-col :span="18" :offset="1">
      <mainForm ref="mainForm" v-show="this.$route.params.handle != 'view'"></mainForm>
       <evaluationOrganInfo></evaluationOrganInfo>
    </el-col>
  </el-row>

  <el-row v-show="this.$route.params.handle == 'view'">
    <br/>
    <el-col :span="18" :offset="2">
      <el-button type="gray" @click="goBack()">返回</el-button>
    </el-col>
  </el-row>
</div>
</template>
<script>
import evaluationOrganInfo from './EvaluationOrganInfo'
import mainForm from './form/MainForm'
export default {
  data(){
    return{
      formMap:{
        disposalOpinionTask:"disposalOpinionForm",
        disposalApprovalTask:"disposalApprovalForm",
        fileTask:"fileForm",
        reportCheckTask:"reportCheckForm",
      }
    }
  },
  components: {
    evaluationOrganInfo,
    mainForm
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    initForm(key){
      this.$refs["mainForm"].currentForm = this.formMap[key];
    }
  },
  mounted: function() {
      this.initForm(this.$route.params.tkey);
    }
}
</script>
