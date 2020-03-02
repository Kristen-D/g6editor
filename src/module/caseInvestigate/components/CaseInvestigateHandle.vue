<template>
<div>
<el-row>
  <el-col :span="18" :offset="1">
  <mainForm ref="mainForm" v-show="this.$route.params.handle != 'view'" ></mainForm>
  <caseInvestigateInfo></caseInvestigateInfo>
  </el-col>
</el-row>

<el-row v-show="this.$route.params.handle == 'view'">
  <br/>
  <el-col :span="18" :offset="2">
    <el-button type="gray" @click="goBack">返回</el-button>
  </el-col>
</el-row>
</div>
</template>

<script>
import caseInvestigateInfo from './CaseInvestigateInfo'
import mainForm from './form/MainForm'
export default {
  components: {
    caseInvestigateInfo,
    mainForm
  },
  data(){
    return {
      formMap:{
        caseAduitTask:"caseAduitForm",
        submissionTask:"submissionForm",
        caseInvestigateTask:"caseInvestigateForm",
        caseFileTask:"caseFileForm",
        caseAdjustTask:"investigateForm"

      }
    }
  },
  methods: {
    goBack() {
      if(this.$route.params.module == "caseEvent"){
        this.$router.push({
          name: "context"
        });
      }else{
        this.$router.go(-1);
      }

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
