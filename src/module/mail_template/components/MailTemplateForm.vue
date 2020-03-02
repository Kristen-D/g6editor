<template>
<div class="">


       <div class="whitebackground Whitespace">
         <div class="top-title" v-if="!this.$route.params.id">新增邮件模版</div>
         <div class="top-title" v-if="this.$route.params.id">编辑邮件模版</div>

         <el-form :model="mailTemplateForm" :rules="rules" ref="mailTemplateForm" label-width="100px">
           <el-form-item label="邮件主题" prop="title" required>
             <el-input v-model="mailTemplateForm.title" style="width:300px;"></el-input>
           </el-form-item>
           <el-form-item label="邮件内容" prop="content" required>
             <el-input type="textarea" v-model="mailTemplateForm.content" style="width:300px;" :autosize="{ minRows:5, maxRows:10}"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" class="button-p-3" @click="submitForm('mailTemplateForm')">提交</el-button>
             <el-button type="gray" class="button-p-3" @click="resetForm('mailTemplateForm')">取消</el-button>
             <!-- <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button> -->
           </el-form-item>
         </el-form>
       </div>

</div>
</template>

<script>
export default {
  data() {
    let validateVendorName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z]{2,30})$")
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error("2-30个字符，支持中文、大小写英文的组合"))
      }
    };
    return {
      mailTemplateForm: {
        title: '',
        content: ''
      },
      tableId: this.$route.params.tableId,
      rules: {
        title: [
          { required: true, min: 2, max: 30, message: '请输入2到30个以内的字符', trigger: 'blur' }
        ],
        content: [
          { required: true, min: 2, max: 200, message: '请输入0到200个以内的字符', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await this.common.reqBackState('/ssa/email/addOrModifyMailTemplate.do', this.mailTemplateForm, this);
          if(data.state) {
            this.clearSessionStorage();
            this.$message({type: 'success', message: data.message});
            this.$store.dispatch('reloadTable', this.tableId);
          }else{
            this.$message({type: 'error', message: data.message});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearSessionStorage() {
      // sessionStorage.clear();
      sessionStorage.removeItem('mailTemplateForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    }
  },
  created: function() {
    if (this.$route.params.id) {
      this.mailTemplateForm = this.$route.params;
      let mailTemplate = JSON.stringify(this.$route.params);
      sessionStorage.mailTemplateForm = mailTemplate;
    }else if (sessionStorage.mailTemplateForm) {
      this.mailTemplateForm = JSON.parse(sessionStorage.mailTemplateForm);
      this.$route.params.id = this.mailTemplateForm.id;
    }

  },
  destroyed: function() {
    sessionStorage.removeItem('mailTemplateForm');
  }
}
</script>

<style>

</style>
