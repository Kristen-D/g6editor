<template>
<!-- 整改核查-->
<div class="whitebackground Whitespace">
  <div class="top-title">整改核查</div>
  <el-form class="form-contral" ref="rectificationCheckForm" :model="rectificationCheckForm" :rules="rectificationCheckRules" label-width="85px">
    <el-form-item label="核查结果" prop="checkPass">
      <el-radio-group v-model="rectificationCheckForm.checkPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="核查意见">
      <el-input type="textarea" v-model="rectificationCheckForm.checkOpinion"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="rectificationCheckTaskSubmit">提交</el-button>
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
      rectificationCheckForm: {
        task_inspect_id:null,
        //是否通过核查
        checkPass:false,
        //核查建议
        checkOpinion: ""
      },
      rectificationCheckRules:{
        checkPass:[{ required: true, message: '请选是否通过', trigger: 'change',type:'boolean' }]
      }
    }
  },
  methods:{
    async rectificationCheckTaskSubmit(){
      if (!this.utils.checkForm("rectificationCheckForm",this)) return;
      var taskId = this.params.taskId;
      var params = {};
      params = this.rectificationCheckForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/taskInspect/completeRectificationCheckTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
     },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
    this.rectificationCheckForm.task_inspect_id = this.params.task_inspect_id;
  }
}
</script>
