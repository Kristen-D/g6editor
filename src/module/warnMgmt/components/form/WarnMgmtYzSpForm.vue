<template>
    <div>
<el-form  ref="alertYzSpTaskForm" :rules="rules" :model="alertYzSpTaskForm" >
  <!--  验证审批审核表单开始  -->
  <el-form-item label="预警名称:" >
    {{alertYzSpTaskForm.alert_header}}
  </el-form-item>

  <el-form-item label="核查结论:" >
    <el-radio-group v-model="alertYzSpTaskForm.alertYzPass"  >
      <el-radio   :label="true">通过</el-radio>
      <el-radio   :label="false">不通过</el-radio>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="检查验证:" prop="alertYzreason" required>
    <el-input type="textarea" v-model="alertYzSpTaskForm.alertYzreason" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="alertYzSpTaskSubmit('alertYzSpTaskForm')" >提交</el-button>
    <el-button type="gray" @click="goback">返回</el-button>
  </el-form-item>
  <!--  验证审批审核表单结束  -->
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
      alertYzSpTaskForm:{
        alert_id:"",
        alert_header:"",
        alertYzPass:true,
        alertYzreason:""
      },
      rules: {
        alertYzreason: [{
          required: true,
          message: '请输入审核意见',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
  async  alertYzSpTaskSubmit(formName){
        var params = this.alertYzSpTaskForm;
        var taskId = this.params.taskId;
        params.taskId = taskId;
        params.alert_id = this.params.alert_id;
        params.alert_header = this.params.alert_header;
        params.processInstanceId = this.params.processInstanceId;
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            params.type = "alertYzPass";
            params.spReason = this.alertYzSpTaskForm.alertYzreason
            var msg = await this.utils.req("/ssa/warnMgmt/completeSpYzTask.do", params, this);
            this.$message({
                type: "success",
                message: msg
            });
            this.goback();
            this.$store.dispatch('reloadTable', this.tableId);
          }
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },

  created: async function() {
      this.alertYzSpTaskForm.alert_header = this.params.alert_header;
      this.alertYzSpTaskForm.alert_id = this.params.alert_id;
  }
}
</script>
