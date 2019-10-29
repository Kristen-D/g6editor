<template>
    <div>
<el-form  ref="alertJcTaskForm" :rules="rules" :model="alertJcTaskForm" >
  <!--  解除审批审核表单开始  -->
  <el-form-item label="预警名称" >
    {{alertJcTaskForm.alert_header}}
  </el-form-item>

  <el-form-item label="解除结果" >
    <el-radio-group v-model="alertJcTaskForm.alertJcPass" >
      <el-radio   :label="true">解除</el-radio>
    <!--  <el-radio   :label="false">不解除</el-radio>-->
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="alertJcTaskSubmit('alertJcTaskForm')">提交</el-button>
    <el-button type="gray" @click="goback">返回</el-button>
  </el-form-item>
  <!--  解除审批审核表单结束  -->
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
      rules: {
        alertJcreason: [{
          required: true,
          message: '请输入审核意见',
          trigger: 'blur'
        }]
      },
      alertJcTaskForm:{
        alert_header:"",
        alertJcPass:true,
        alertJcreason:"解除"
      }
    }
  },
  methods: {
  async  alertJcTaskSubmit(formName){
       var params = this.alertJcTaskForm;
      var taskId = this.$route.params.taskId;
      params.taskId = taskId;
      params.alert_id = this.$route.params.alert_id;
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          params.type = "alertJcPass";
          params.spReason = this.alertJcTaskForm.alertJcreason
          var msg = await this.utils.req("/ssa/warnMgmt/completeJcTask.do", params, this);
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

      this.alertJcTaskForm.alert_header = this.params.alert_header;
  }
}
</script>
