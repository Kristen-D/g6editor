<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">案件审批</div>

  <el-form class="form-contral" ref="caseAduitForm" :model="caseAduitForm" label-width="85px">
    <el-form-item label="案件名称">
      {{this.params.case_name}}
    </el-form-item>
    <el-form-item label="是否通过" required>
      <el-radio-group v-model="caseAduitForm.caseAduitPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="审核意见">
      <el-input type="textarea" rows="5" v-model="caseAduitForm.reason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="caseAduitFormSubmit">提交</el-button>
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
      caseAduitForm: {
        case_id: null,
        caseAduitPass: false,
        reason: ""
      }
    }
  },
  methods:{
    //案件审核表单提交
    async caseAduitFormSubmit() {
      var taskId = this.params.taskId;
      var params = {};
      params = this.caseAduitForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/caseInvestigate/completeCaseAduitTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>
