<template>
  <!-- 提交审批表单-->
  <!-- 审批表单-->
  <div class="whitebackground Whitespace">
    <div class="top-title">提交审批</div>

    <el-form class="form-contral" ref="submissionForm" :model="submissionForm" :rules="submissionRules" label-width="85px">
      <el-form-item label="事件名称">
        {{this.params.case_name}}
      </el-form-item>
      <el-form-item label="审批领导" prop="approver">
        <el-select v-model="submissionForm.approver" filterable placeholder="审批领导">
          <el-option v-for="item in leaderList" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submissionFormSubmit(true)">提交审批</el-button>
        <el-button type="primary"  @click="submissionFormSubmit(false)">进行下一任务</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:["params"],
  computed: {
    ...mapState({
      leaderList: state => state.process.leaderList
    })
  },
  data(){
    return {
      //提交审批表单
      submissionForm: {
        approver: null
      },
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
  methods:{
    async submissionFormSubmit(isApproval) {
      if (isApproval && !this.utils.checkForm("submissionForm",this)  ) return;
      var taskId = this.$route.params.taskId;
      var params = {};
      params = this.submissionForm;
      params.isApproval = isApproval;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/caseInvestigate/completeSubmissionTask.do", params, this);
      this.$message({type: "success", message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
