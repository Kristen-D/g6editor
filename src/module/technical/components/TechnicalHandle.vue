<template>
<div>
  <el-row>
    <el-col :span="18" :offset="1">
      <mainForm ref="mainForm" v-show="this.$route.params.handle != 'view'"></mainForm>
       <technicalInfo></technicalInfo>
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
import technicalInfo from './TechnicalInfo'
import mainForm from './form/MainForm'
export default {
  data(){
    return{
      formMap:{
        technicalTask:"technicalForm",
        assistTzTask:"technicalForm",
        assistTjTask:"technicalTjForm",
        assistSpTask:"technicalAduitForm",
        assistFKTask:"technicalFeedbackForm",
        assistEndTask:"technicalCheckForm"
      }
    }

  },
  components: {
    mainForm,
    technicalInfo
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
