<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">协查审批</div>
  <el-form class="form-contral" ref="technicalTjForm" :model="technicalTjForm" :rules="inspectAduitRules" label-width="85px">

    <el-form-item label="选择审批人：" prop="approver" required >
      <el-select v-model.number="technicalTjForm.approver"   placeholder="选择审批人" v-bind:disabled="disabledInput">
        <el-option v-for="item in leaderList" :key="item.user_id" :label="item.realname" :value="item.user_id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item>
          <el-button type="primary" @click="submitTjForm('technicalTjForm')">提交</el-button>
            <el-button type="primary" @click="assistTjTaskSubmit(false)">进行下一任务</el-button>
            <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>
      </el-col>
    </el-row>


  </el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  props:["params"],
  computed: {
    ...mapState({
      leaderList: state => state.context.leaderList,
      leaderMap: state => state.context.leaderMap,
      orgList: state => state.context.orgList,
      orgMap: state => state.context.orgMap
    })
  },
  data() {
    return {
      technicalTjForm: {
        assist_code:null,
        approver:null
      },
      inspectAduitRules:{
        approver:[{
           required: true,
           message: '请选择审批人',
           trigger: 'change',
           type:'number'
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
    async submitTjForm(){
      if (!this.common.checkForm("technicalTjForm",this)) return;
      var taskId = this.params.taskId;
      var params = {};
      params = this.technicalTjForm;
       //params.assist_code = this.params.assist_code;
      params.taskId = taskId;
      params.type = "assistRSpPass";
      var msg = await this.common.req("/ssa/technical/completeassistTjTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
     },
     async assistTjTaskSubmit(isPass) {
       this.$confirm('该表单确定已审批完成执行下一步骤?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() => {
             var taskId = this.params.taskId;
             var params = {};
             params = this.technicalTjForm;
             //params.alert_id = this.$route.params.alert_id;
             params.type = "assistRSpPass";
             params.isPass = isPass;
             params.spReason = "";
             params.taskId = taskId;
             var msg = await this.common.req("/ssa/technical/completeassistTjTask.do", params, this);
             this.$message({
               type: "success",
               message: msg
             });
             this.$router.go(-1);
       })
     },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
    this.technicalTjForm.assist_code = this.params.assist_code;
  }
}
</script>
