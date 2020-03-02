<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">协查反馈</div>
  <el-form class="form-contral" ref="technicalFeedbackForm" :model="technicalFeedbackForm" :rules="rectificationFeedbackRules" label-width="100px">

    <el-form-item label="反馈标题" prop="feedback_title" required>
      <el-input v-model="technicalFeedbackForm.feedback_title"></el-input>
    </el-form-item>
    <el-form-item label="反馈内容" prop="feedback_content" required>
      <el-input type="textarea" row="5" v-model="technicalFeedbackForm.feedback_content"></el-input>
    </el-form-item>

    <el-form-item label="上传附件">
      <el-upload ref="rectificationFeedbackUpload" action="/ssa/technical/completeTechnicalFeedbackTask.do" :on-success="handleSuccess" :data="technicalFeedbackForm" :auto-upload="false">
        <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="technicalFeedbackTask">提交</el-button>
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
      technicalFeedbackForm: {
        assist_code: null,
        feedback_title: "",
        feedback_unit:"",
        feedback_content: ""
      },
      rectificationFeedbackRules: {
      feedback_title:[{ required: true, message: '请输入反馈标题', trigger: 'blur' }],
      feedback_content:[{ required: true, message: '请输入反馈内容', trigger: 'blur' }],
      }
    }
  },
  methods: {
    async technicalFeedbackTask() {

      if (!this.common.checkForm("technicalFeedbackForm",this)) return;
      var params = {};
      params = this.technicalFeedbackForm;
      params.bussiness_id = this.technicalFeedbackForm.assist_code;
      params.taskId =  this.params.taskId;


     if (this.$refs["rectificationFeedbackUpload"].uploadFiles.length == 0) {
       var msg = await this.common.req("/ssa/technical/completeTechnicalFeedbackTask.do",params, this);
       this.$message({message: msg,type: 'success' });
       this.goBack();
     } else if (this.$refs["rectificationFeedbackUpload"].uploadFiles.length == 1) {
       this.$refs["rectificationFeedbackUpload"].submit();
     } else {
       this.$alert('多文件请打包上传', '警告', {type: "warning"});
     }


    },
    goBack() {
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
        this.goBack();
      }
    },
  },
  created: function() {
    this.technicalFeedbackForm.assist_code = this.params.assist_code;
    this.common.req("/ssa/alertNotice/getLoginUserInfo.do", null, this).then(data => {
      this.technicalFeedbackForm.feedback_unit = data.org_id;
    });
  }
}
</script>
