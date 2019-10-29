<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">督查审批</div>
  <el-form class="form-contral" ref="inspectAduitForm" :model="inspectAduitForm" :rules="inspectAduitRules" label-width="85px">

    <el-form-item label="是否通过" prop="approvalPass">
      <el-radio-group v-model="inspectAduitForm.approvalPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="审核意见">
      <el-input type="textarea" v-model="inspectAduitForm.reason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="inspectAduitTaskSubmit">提交</el-button>
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
      inspectAduitForm: {
        task_inspect_id:null,
        approvalPass:false,
        reason: ""
      },
      inspectAduitRules:{
        approvalPass:[{ required: true, message: '请选是否通过', trigger: 'change',type:'boolean' }]
      }
    }
  },
  methods:{


    async inspectAduitTaskSubmit(){
      if (!this.utils.checkForm("inspectAduitForm",this)) return;
      var taskId = this.params.taskId;
      var params = {};
      params = this.inspectAduitForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/taskInspect/completeInspectAduitTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
     },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
    this.inspectAduitForm.task_inspect_id = this.params.task_inspect_id;
  }
}
</script>
