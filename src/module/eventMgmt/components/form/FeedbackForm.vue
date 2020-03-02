<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">整改反馈</div>
  <el-form class="form-contral" ref="feedbackForm" :model="feedbackForm" :rules="feedbackRules" label-width="85px">

    <el-form-item label="反馈标题" prop="feedback_title">
      <el-input v-model="feedbackForm.feedback_title"></el-input>
    </el-form-item>
    <el-form-item label="反馈内容">
      <el-input type="textarea" rows="5" v-model="feedbackForm.feedback_content"></el-input>
    </el-form-item>

    <el-form-item label="上传附件">
      <el-upload ref="feedbackUpload" action="/ssa/eventMgmt/completeFeedbackTask.do" :on-success="handleSuccess" :data="feedbackForm" :auto-upload="false">
        <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        <div slot="tip" class="el-upload__tip">多文件请压缩上传</div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="feedbackTaskSubmit">提交</el-button>
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
      feedbackForm: {
        event_handling_id: null,
        feedback_title: "",
        feedback_content: ""
      },
      feedbackRules: {
      feedback_title:[{ required: true, message: '请输入反馈标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async feedbackTaskSubmit() {

      if (!this.utils.checkForm("feedbackForm",this)) return;
      var params = {};
      params = this.feedbackForm;
      params.bussiness_id = this.feedbackForm.event_handling_id;
      params.taskId =  this.params.taskId;


     if (this.$refs["feedbackUpload"].uploadFiles.length == 0) {
       var msg = await this.utils.req("/ssa/eventMgmt/completeFeedbackTask.do",params, this);
       this.$message({message: msg,type: 'success' });
       this.goBack();
     } else if (this.$refs["feedbackUpload"].uploadFiles.length == 1) {
       this.$refs["feedbackUpload"].submit();
     } else {
       this.$alert('多文件请打包上传', '警告', {type: "warning"});
     }


    },
    goBack() {
      this.$router.go(-1);
    },
    handleSuccess(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.goBack();
      }
    }
  },
  created: function() {
    this.feedbackForm.event_handling_id = this.params.event_handling_id;
  }
}
</script>
