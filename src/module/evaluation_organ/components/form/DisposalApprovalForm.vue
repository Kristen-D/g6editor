<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">处置审批</div>

  <el-form class="form-contral" ref="disposalApprovalForm" :model="disposalApprovalForm" label-width="85px">
    <el-form-item label="审核意见">
      <el-input type="textarea" rows="5" v-model="disposalApprovalForm.reason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="disposalApprovalTaskSubmit">提交</el-button>
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
      disposalApprovalForm: {
        id: null,
        reason: ""
      }
    }
  },
  methods:{
    //事件审核表单提交
    async disposalApprovalTaskSubmit() {
      var taskId = this.params.taskId;
      var params = {};
      params = this.disposalApprovalForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/evaluationOrgan/completeDisposalApprovalTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>
