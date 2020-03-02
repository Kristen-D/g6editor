<template >
  <div class="whitebackground Whitespace">
    <div class="top-title" v-if="!this.$route.params.id">新增邮件模版</div>
    <div class="top-title" v-if="this.$route.params.id">编辑邮件模版</div>

      <el-form label-width="90px" :model="mailTemplateForm" :rules="rules" ref="mailTemplateForm">

        <el-form-item label="发送周期（小时）" prop="send_time" required>
          <el-input v-model="mailTemplateForm.send_time" placeholder="发送周期（小时）" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="邮件主题" prop="title" required>
          <el-input v-model="mailTemplateForm.title" placeholder="邮件主题"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="邮件内容" prop="content" required>
          <el-input type="textarea" v-model="mailTemplateForm.content" placeholder="邮件内容"  style="width:300px;" :autosize="{ minRows:5, maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>

</div>

</template>

<script>
import {
  mapState
} from 'vuex'
import utils from 'components/js/common.js'
export default {

  data() {
    let validatesend_time = (rule, value, callback) => {
      let reg = /^[0-9]*$/;
      if (reg.test(value)) callback();
      else callback(new Error('发送周期只能为数字'));
    }

    return {
      mailTemplateForm: {
        send_time:'',
        title: '',
        content: ''
      },
      rules: {
        send_time: [
          { required: true, message: '发送周期不可为空' },
          {
            validator: validatesend_time,
            trigger: 'blur'
          }],
  title: [
    { required: true, message: '邮件主题不可为空' }],
    content: [
      { required: true, message: '邮件内容不可为空' }],
}

    }
  },
  computed: {
    ...mapState({
   emailTemplateList:state=>state.context.emailTemplateList
    })
  },
  methods: {

    checkForm() {
      var flag = false;
      this.$refs["mailTemplateForm"].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },

    async onSubmit() {
      if (this.checkForm()) {
        var msg = await utils.req("/ssa/platformIntf_mailIntf/addOrModifyMailTemplate.do", this.mailTemplateForm, this);
        this.$message({
          type: "success",
          message: msg
        });
        this.goBack();
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: function() {

    if (this.$route.params.handle == "update") {
      this.mailTemplateForm = this.$route.params;
    }
  }


}
</script>
