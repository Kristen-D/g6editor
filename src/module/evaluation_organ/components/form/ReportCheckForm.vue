<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">报告核查</div>
  <el-form class="form-contral" ref="reportCheckForm" :model="reportCheckForm" label-width="85px">
    <el-form-item label="是否合规">
      <el-radio-group v-model="reportCheckForm.compliancePass">
      <el-radio :label="true">合规</el-radio>
      <el-radio :label="false">不合规</el-radio>
    </el-radio-group>
    </el-form-item>
    <el-row>
      <h4 class="sub-title" v-show="reportCheckForm.compliancePass == true">审批意见</h4>
      <h4 class="sub-title" v-show="reportCheckForm.compliancePass == false">不合规内容</h4>
    </el-row>
    <br>
    <el-form-item label="">
      <el-input type="textarea" rows="5" v-model="reportCheckForm.explaination"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reportCheckTaskSubmit">提交</el-button>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>


  </el-form>
</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      reportCheckForm: {
        id: null,
        explaination: "",
        compliancePass:true
      }
    }
  },
  methods: {
    async reportCheckTaskSubmit() {
      var taskId = this.params.taskId;
      var params = {};
      params = this.reportCheckForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/evaluationOrgan/completeReportCheckTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: function() {
    this.reportCheckForm.id = this.params.id;
  }
}
</script>
