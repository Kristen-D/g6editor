<template>
<!-- 提交审批表单-->
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">提交审批</div>

  <el-form class="form-contral" ref="submissionTaskForm" :model="submissionTaskForm" :rules="submissionRules" label-width="85px">
    <el-form-item label="事件名称">
      {{this.params.event_handling_header}}
    </el-form-item>
    <el-form-item label="审批领导" prop="approver">
      <el-select v-model="submissionTaskForm.approver" filterable placeholder="审批领导">
        <el-option v-for="item in approvers" :label="item.realname" :value="item.user_id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submissionTaskSubmit()">提交审批</el-button>
      <el-button type="primary" :disabled="nextDisabled" @click="nextTaskSubmit()">进行下一任务</el-button>
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
      //下一环节按钮能否使用
      nextDisabled: true,
      //提交审批表单
      submissionTaskForm: {
        approver: null
      },
      approvers: [],
      submissionRules: {
        approver: [{
          required: true,
          message: '请选择审批领导',
          trigger: 'change',
          type: 'number'
        }]
      }
    }
  },
  methods: {

    nextTaskSubmit(){  this.$confirm('该表单确定已审批完成执行下一步骤?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async() => {
        var taskId = this.$route.params.taskId;
        var params = {};
        params = this.submissionTaskForm;
        params.isApproval = false;
        params.taskId = taskId;
        var msg = await this.utils.req("/ssa/eventMgmt/completeSubmissionTask.do", params, this);
        this.$message({
          type: "success",
          message: msg
        });
        this.goBack();});

    },
    async submissionTaskSubmit() {
      if (!this.utils.checkForm("submissionTaskForm", this)) return;
      var taskId = this.$route.params.taskId;
      var params = {};
      params = this.submissionTaskForm;
      params.isApproval = true;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/eventMgmt/completeSubmissionTask.do", params, this);
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
  created: async function() {
    this.approvers = await this.utils.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this);
    //判断是否启动进入下一环节按钮
    this.utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", {
      varName: "approvalFlag",
      processInstanceId: this.$route.params.processInstanceId
    }, this).then(data => {
      if (data.length != 0) {
        this.nextDisabled = false;
      }
    });

  }
}
</script>
