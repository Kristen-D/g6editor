<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">协查审批</div>
  <el-form class="form-contral" ref="technicalAduitForm" :model="technicalAduitForm" :rules="inspectAduitRules" label-width="85px">

    <el-form-item label="是否通过" prop="approvalPass">
      <el-radio-group v-model="technicalAduitForm.approvalPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="审核意见" prop="reason">
      <el-input type="textarea" v-model="technicalAduitForm.reason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="assistSpTaskSubmit">提交</el-button>
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
      technicalAduitForm: {
        assist_code:null,
        approvalPass:true,
        reason: ""
      },
      inspectAduitRules:{
        approvalPass:[{
           required: true,
           message: '请选是否通过',
           trigger: 'change',
           type:'boolean'
         }],
         reason:[{
            required: true,
            message: '请输入审核意见',
            trigger: 'blur'
          }]
      }
    }
  },
  methods:{
    async assistSpTaskSubmit(){
      if (!this.common.checkForm("technicalAduitForm",this)) return;
      var taskId = this.params.taskId;
      var params = {};
      params = this.technicalAduitForm;
      params.taskId = taskId;
      var msg = await this.common.req("/ssa/technical/completeassistSpTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
     },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
    this.technicalAduitForm.assist_code = this.params.assist_code;
  }
}
</script>
