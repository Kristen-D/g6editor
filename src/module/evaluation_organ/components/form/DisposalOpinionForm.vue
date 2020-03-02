<template>
  <!-- 处置意见表单-->
  <!-- 审批表单-->
  <div class="whitebackground Whitespace">
    <div class="top-title">事件审批</div>

    <el-form class="form-contral" ref="disposalOpinionTaskForm" :model="disposalOpinionTaskForm" :rules="disposalOpinionRules" label-width="85px">
      <el-form-item label="处置意见" prop="disposal_opinion">
          <el-radio-group v-model="disposalOpinionTaskForm.disposal_opinion" >
            <el-radio label="1">通报批评</el-radio>
            <el-radio label="2">暂停测评业务</el-radio>
            <el-radio label="3">取消测评资质</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="审批领导" prop="approver">
        <el-select v-model="disposalOpinionTaskForm.approver" filterable placeholder="审批领导">
          <el-option v-for="item in approvers" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="disposalOpinionTaskSubmit(true)">提交审批</el-button>
        <el-button type="primary" :disabled="nextDisabled" @click="disposalOpinionTaskSubmit(false)">提交归档</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:["params"],
  data(){
    return {
      //下一环节按钮能否使用
      nextDisabled:true,
      //提交审批表单
      disposalOpinionTaskForm: {
        approver: null,
        disposal_opinion:null,
      },
      approvers: [],
      disposalOpinionRules: {
        approver: [{
          required: true,
          message: '请选择审批领导',
          trigger: 'change',
          type: 'number'
        }],
        disposal_opinion: [{
          required: true,
          message: '请选处置意见',
          trigger: 'change'
        }],
      }
    }
  },
  methods:{
    async disposalOpinionTaskSubmit(isApproval) {

      if (isApproval && !this.utils.checkForm("disposalOpinionTaskForm",this)  ) return;
      var taskId = this.$route.params.taskId;
      var id = this.$route.params.id;
      var params = {};
      params = this.disposalOpinionTaskForm;
      params.isApproval = isApproval;
      params.taskId = taskId;
      params.id = id;
      var msg = await this.utils.req("/ssa/evaluationOrgan/completeDisposalOpinionTask.do", params, this);
      this.$message({type: "success", message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: async function(){
    this.approvers = await this.utils.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this);
    //判断是否启动进入下一环节按钮
    this.utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do",
    {varName:"disposal_opinion",processInstanceId:this.$route.params.processInstanceId}, this).then(data =>{
       if(data.length != 0){
       this.nextDisabled =false;
       var params = {};
       params.id = this.$route.params.id;
       this.utils.req("/ssa/evaluationOrgan/getOpinionById.do", params, this).then(data =>{
        this.disposalOpinionTaskForm.disposal_opinion = data.disposal_opinion;
        });
     }
    });

  }
}
</script>
