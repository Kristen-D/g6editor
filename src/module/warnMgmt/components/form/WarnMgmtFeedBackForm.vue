<template>
    <div>
<el-form   ref="alertFkTaskForm" :rules="rules" :model="alertFkTaskForm" label-width="100px">
  <!--  预警反馈表单开始  -->
  <el-row>
    <el-col :span="12">
      <el-form-item label="预警名称：">
        {{alertFkTaskForm.alert_header}}
      </el-form-item>

      <el-form-item label="处置反馈：" prop="check_result" required>
        <el-input type="textarea" v-model="alertFkTaskForm.check_result"></el-input>
      </el-form-item>

      <el-form-item label="上传附件">
        <el-upload ref="alertFeedbackUpload" action="/ssa/warnMgmt/completeAlertFeedbackTask.do" :on-success="handleSuccess" :data="alertFkTaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">

      <el-form-item>
        <el-button type="primary" @click="alertFeedbackTask">提交</el-button>
      <el-button type="gray" @click="goback">返回</el-button>
      </el-form-item>

    </el-col>
  </el-row>
  <!--  预警反馈表单结束  -->
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
      loginUser:null,
      alertFkTaskForm:{
        alert_header:"",
        check_result:""
      },
      rules: {
        check_result: [{
          required: true,
          message: '请输入处置反馈',
          trigger: 'blur'
        }]
    }
  }
},
  methods:{
    async alertFeedbackTask() {
      this.$refs["alertFkTaskForm"].validate(async(valid) => {
        if (valid){
        var params = {};
        this.alertFkTaskForm.bussiness_id = this.params.alert_id;
        this.alertFkTaskForm.taskId =  this.params.taskId;
        this.alertFkTaskForm.feedback_unit = this.loginUser.org_id ;
        this.alertFkTaskForm.processInstanceId = this.params.processInstanceId;
        params = this.alertFkTaskForm;
        if (this.$refs["alertFeedbackUpload"].uploadFiles.length == 0) {
          var msg = await this.utils.req("/ssa/warnMgmt/completeAlertFeedbackTask.do",params, this);
          this.$message({message: msg,type: 'success' });
          this.goback();
        } else if (this.$refs["alertFeedbackUpload"].uploadFiles.length == 1) {
          this.$refs["alertFeedbackUpload"].submit();
        } else {
          this.$alert('多文件请打包上传', '警告', {type: "warning"});
        }
      }
    });
    },
    goback() {
      this.$router.go(-1);
    },
    handleSuccess(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.result.result, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.goback();
      }
    }
  },
  mounted: function() {
    this.utils.req("/ssa/alertNotice/getLoginUserInfo.do", null, this).then(data => {
      this.loginUser = data;
    });
  },
  created: async function() {
      this.alertFkTaskForm.alert_header = this.params.alert_header;
      this.alertFkTaskForm.alert_id = this.params.alert_id;
  }
}
</script>
