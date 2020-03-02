<template>
    <div>

<el-form  ref="alertYzTaskForm" :rules="rules" :model="alertYzTaskForm" label-width="100px">
  <!--  预警验证表单开始  -->
  <el-row>
    <el-col :span="12">
      <el-form-item label="预警名称：">
      {{alertYzTaskForm.alert_header}}
      </el-form-item>
      <el-form-item label="检查验证：" prop="validation" required>
        <el-input type="text" v-model="alertYzTaskForm.validation"></el-input>
      </el-form-item>
      <el-form-item label="核查结论：" prop="validate_result" required>
        <el-input type="textarea" v-model="alertYzTaskForm.validate_result"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <el-form-item>
        <el-button type="primary" @click="alertYzTaskSubmit('alertYzTaskForm')">提交</el-button>
      <el-button type="gray" @click="goback">返回</el-button>
      </el-form-item>
    </el-col>
  </el-row>
  <!-- 预警验证表单结束   -->
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
      alertYzTaskForm:{
        alert_id:"",
        alert_header:"",
        validate:"",
        validate_result:""
      },
      rules: {
        validation: [{
          required: true,
          message: '请输入检查验证',
          trigger: 'blur'
        }],
        validate_result: [{
          required: true,
          message: '请输入检查结论',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
async  alertYzTaskSubmit(formName){
  this.$refs[formName].validate(async(valid) => {
    if (valid){
      var params = this.alertYzTaskForm;
      var taskId = this.$route.params.taskId;
      var alertId = this.$route.params.alert_id;
    //  alert(taskId);
      params.taskId = taskId;
      params.alert_id = alertId;
      var msg = await this.utils.req("/ssa/warnMgmt/completeHcTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
        });
       this.$router.go(-1);
       this.$store.dispatch('reloadTable', this.tableId);
      }
    });
  },
    goback() {
      this.$router.go(-1);
    }
  },
  created: async function() {
      this.alertYzTaskForm.alert_header = this.params.alert_header;
      this.alertYzTaskForm.alert_id =   this.params.alert_id;
  }
}
</script>
