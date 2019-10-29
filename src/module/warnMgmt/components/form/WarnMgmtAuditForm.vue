<template>
    <div>

<el-form  ref="alertSpTaskForm" :rules="rules" :model="alertSpTaskForm" >
  <!--  预警审核表单开始  -->
  <el-form-item label="预警名称：" >
      {{alertSpTaskForm.alert_header}}
  </el-form-item>

  <el-form-item label="是否通过：" >
    <el-radio-group v-model="alertSpTaskForm.alertSpPass"  >
      <el-radio   :label="true">通过</el-radio>
      <el-radio   :label="false">不通过</el-radio>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="审批意见：" prop="spreason" required>
    <el-input type="textarea" v-model="alertSpTaskForm.spreason" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="alertSpTaskSubmit('alertSpTaskForm')">提交</el-button>
      <el-button type="gray" @click="goback">返回</el-button>
  </el-form-item>
  <!--  预警审核表单结束  -->
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
      alertSpTaskForm:{
        alert_id:"",
        alert_header:"",
        alertSpPass:true,
        spreason:""
      },
      rules: {
        spreason:[{
          required: true,
          message: '请输入审批意见!',
          trigger: 'blur'
        }]
      }
  }
},
  methods: {
  async  alertSpTaskSubmit(formName){
      var params = this.alertSpTaskForm;
      var taskId = this.params.taskId;
      params.taskId = taskId;
      params.alert_id = this.params.alert_id;
      params.alert_header = this.params.alert_header;
      params.processInstanceId = this.params.processInstanceId;
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          params.type = "alertSpPass";
          params.spReason = this.alertSpTaskForm.spreason
          var msg = await this.utils.req("/ssa/warnMgmt/completeSpTask.do", params, this);
          this.$message({
              type: "success",
              message: msg
          });
          this.goback();
          //this.$store.dispatch('reloadTable', this.tableId);
        }
      });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  created: async function() {
      this.alertSpTaskForm.alert_header = this.params.alert_header;
      this.alertSpTaskForm.alert_id = this.params.alert_id;
  }
}
</script>
