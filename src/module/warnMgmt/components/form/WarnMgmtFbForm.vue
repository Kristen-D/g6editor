<template>
    <div>
<el-form  :rules="rules" ref="alertFbTaskForm" :model="alertFbTaskForm" label-width="110px">

  <el-form-item label="预警名称：">
    {{alertFbTaskForm.alert_header}}
  </el-form-item>
    <el-form-item label="选择审批人：" prop="assignee_id" required >
      <el-select v-model.number="alertFbTaskForm.assignee_id"   placeholder="选择审批人" v-bind:disabled="disabledInput">
        <el-option v-for="item in approvalOptions" :key="item.user_id" :label="item.realname" :value="item.user_id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item>
          <el-button type="primary" @click="submitFbForm('alertFbTaskForm')">提交</el-button>
            <el-button type="primary" @click="alertFbTaskSubmit(false)">进行下一任务</el-button>
              <el-button type="gray" @click="goback">返回</el-button>
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
  data() {
    return {
      approvalOptions:[],
      disabledInput:false,
      alertFbTaskForm: {
        alert_id:"",
        alert_header:"",
        isPass:"",
        //审批人
        assignee_id:""
      },
      rules: {
        assignee_id:[{
          type: 'number',
          required: true,
          message: '请选择审批人',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
  async submitFbForm(formName) {
    this.$refs[formName].validate(async(valid) => {
        if (valid) {
          var taskId = this.params.taskId;
          var params = {};
          params = this.alertFbTaskForm;
          params.alert_id = this.params.alert_id;
          params.type = "alertTSpPass";
          params.isPass = true;
          params.taskId = taskId;
          var msg = await this.utils.req("/ssa/warnMgmt/completealertFbTask.do", params, this);
          this.$message({
            type: "success",
            message: msg
          });

          this.goback();
          }
      });
},
    back() {
      this.$router.go(-1);
    },
    //预警审核表单提交
    async alertFbTaskSubmit(isPass) {
      this.$confirm('该表单确定已审批完成执行下一步骤?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
            var taskId = this.params.taskId;
            var params = {};
            params = this.alertFbTaskForm;
            params.alert_id = this.params.alert_id;
            params.type = "alertTSpPass";
            params.isPass = isPass;
            params.spReason = this.alertFbTaskForm.reason;
            params.taskId = taskId;
            var msg = await this.utils.req("/ssa/warnMgmt/completealertFbTask.do", params, this);
            this.$message({
              type: "success",
              message: msg
            });
            this.$router.go(-1);
      })
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    this.utils.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this).then(data => {
    this.approvalOptions = data;
  });
  },
  created: async function() {
      this.alertFbTaskForm.alert_header = this.params.alert_header;
      this.alertFbTaskForm.alert_id = this.params.alert_id;
  }
}
</script>
