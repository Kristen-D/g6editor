<template>
<!-- 整改核查-->
<div class="whitebackground Whitespace">
  <div class="top-title">整改核查</div>
  <el-form class="form-contral" ref="feedbackCheckForm" :model="feedbackCheckForm" :rules="feedbackCheckRules" label-width="85px">
    <el-form-item label="核查结果" prop="feedbackPass">
      <el-radio-group v-model="feedbackCheckForm.feedbackPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="核查意见">
      <el-input type="textarea" rows="5" v-model="feedbackCheckForm.checkOpinion"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="feedbackCheckTaskSubmit">提交</el-button>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props:["params"],
  data() {
    return {
      feedbackCheckForm: {
        event_handling_id:null,
        //是否通过核查
        feedbackPass:false,
        //核查建议
        checkOpinion: ""
      },
      feedbackCheckRules:{
        feedbackPass:[{ required: true, message: '请选是否通过', trigger: 'change',type:'boolean' }]
      }
    }
  },
  methods:{
    async feedbackCheckTaskSubmit(){
      if (!this.utils.checkForm("feedbackCheckForm",this)) return;
      var taskId = this.params.taskId;
      var params = {};
      params = this.feedbackCheckForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/eventMgmt/completefeedbackCheckTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
     },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
    this.feedbackCheckForm.event_handling_id = this.params.event_handling_id;
  }
}
</script>
