<template>
<!-- 整改核查-->
<div class="whitebackground Whitespace">
  <div class="top-title">协查归档</div>
  <el-form class="form-contral" ref="technicalCheckForm" :model="technicalCheckForm" :rules="rectificationCheckRules" label-width="85px">
    <el-form-item label="协查结果" prop="technical_result" required>
      <el-radio-group v-model="technicalCheckForm.technical_result">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="归档意见" prop="technical_place" required>
      <el-input type="textarea" v-model="technicalCheckForm.technical_place"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="technicalCheckTaskSubmit">提交</el-button>
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
      technicalCheckForm: {
        assist_code:null,
        //是否通过核查
        technical_result:true,
        //核查建议
        technical_place: ""
      },
      rectificationCheckRules:{
        technical_result:[{ required: true, message: '请选是否通过', trigger: 'change',type:'boolean' }],
        technical_place:[{ required: true, message: '请输入归档意见', trigger: 'blur'}]
      }
    }
  },
  methods:{
    async technicalCheckTaskSubmit(){
      if (!this.common.checkForm("technicalCheckForm",this)) return;
      var taskId = this.params.taskId;
      var params = {};
      params = this.technicalCheckForm;
      params.taskId = taskId;
      var msg = await this.common.req("/ssa/technical/completeTechnicalCheckTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
     },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
    this.technicalCheckForm.assist_code = this.params.assist_code;
  }
}
</script>
