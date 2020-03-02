<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">提交归档</div>

  <el-form class="form-contral" ref="fileForm" :model="fileForm" label-width="85px">
    <el-form-item label="审核意见">
      <el-input type="textarea" rows="5" v-model="fileForm.reason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="fileTaskSubmit">归档</el-button>
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
      fileForm: {
        id: null,
        reason: ""
      }
    }
  },
  methods:{
    //事件审核表单提交
    async fileTaskSubmit() {
      var taskId = this.params.taskId;
      var id = this.params.id;
      var params = {};
      params = this.fileForm;
      params.taskId = taskId;
      params.id=id;
      var msg = await this.utils.req("/ssa/evaluationOrgan/completeFileTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>
