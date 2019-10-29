<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">整改反馈</div>
  <el-form class="form-contral" ref="rectificationFeedbackForm" :model="rectificationFeedbackForm" :rules="rectificationFeedbackRules" label-width="85px">

    <el-form-item label="反馈标题" prop="feedback_title">
      <el-input v-model="rectificationFeedbackForm.feedback_title"></el-input>
    </el-form-item>
    <el-form-item label="反馈内容">
      <el-input type="textarea" row="5" v-model="rectificationFeedbackForm.feedback_content"></el-input>
    </el-form-item>

    <el-form-item label="上传附件">
      <el-upload ref="rectificationFeedbackUpload" action="/ssa/taskInspect/completeRectificationFeedbackTask.do" :on-success="handleSuccess" :data="rectificationFeedbackForm" :auto-upload="false">
        <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="rectificationFeedbackTaskSubmit">提交</el-button>
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
      rectificationFeedbackForm: {
        task_inspect_id: null,
        feedback_title: "",
        feedback_content: ""
      },
      rectificationFeedbackRules: {
      feedback_title:[{ required: true, message: '请输入反馈标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async rectificationFeedbackTaskSubmit() {

      if (!this.utils.checkForm("rectificationFeedbackForm",this)) return;
      var params = {};
      params = this.rectificationFeedbackForm;
      params.bussiness_id = this.rectificationFeedbackForm.task_inspect_id;
      params.taskId =  this.params.taskId;


     if (this.$refs["rectificationFeedbackUpload"].uploadFiles.length == 0) {
       var msg = await this.utils.req("/ssa/taskInspect/completeRectificationFeedbackTask.do",params, this);
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
    this.rectificationFeedbackForm.task_inspect_id = this.params.task_inspect_id;
  }
}
</script>
