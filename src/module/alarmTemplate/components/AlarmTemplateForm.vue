<template >
<div class="whitebackground Whitespace">
  <div class="top-title" v-if="!this.$route.params.template_id">新增模板</div>
  <div class="top-title" v-if="this.$route.params.template_id">编辑模板</div>

  <el-form label-width="90px" :rules="rules" :model="alarmTemplateForm" ref="alarmTemplateForm">

    <el-form-item label="模板类型" prop="template_type">
      <el-select v-model="alarmTemplateForm.template_type" placeholder="模板类型" style="width:300px;">
        <el-option v-for="item in templateList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="模板名称" prop="template_name">
      <el-input v-model="alarmTemplateForm.template_name" placeholder="模板名称" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="模板内容" prop="content" required>
      <el-input type="textarea" rows="6" v-model="alarmTemplateForm.content" placeholder="变量格式:${code}" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="模板说明" prop="memo" required>
      <el-input type="textarea" rows="4" v-model="alarmTemplateForm.memo" placeholder="模板说明" style="width:500px;"></el-input>
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
    return {
      templateList:[{id:"1",text:"邮件模板"},{id:"2",text:"短信模板"}],
      alarmTemplateForm: {
        template_id: '',
        template_name: null,
        template_type:null,
        content:'',
        memo: '',
        insert_time:null,
      },
      rules: {
        memo: [{
          required: true,
          message: '请输入模板说明',
          trigger: 'blur'
        }],
        template_name: [{
          required: true,
          message: '请输入模板名称',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入模板内容',
          trigger: 'blur'
        }],
        template_type: [{
          required: true,
          message: '请选择模板类型',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState({
    //   alarmTypeList: state => state.context.alarmTypeList,
    //   //alarmGradeList: state => state.context.alarmGradeList,
    // //  emailTemplateList: state => state.context.emailTemplateList,
    //   userList: state => state.context.userList
    })
  },
  methods: {
    getCronHelp() {
      window.open('/static/cronboot/web/cronb/cron.htm');
    },
    checkForm() {
      var flag = false;
      this.$refs["alarmTemplateForm"].validate((valid) => {
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
        var result = await utils.reqBackState("/ssa/alarm_template/saveData.do", this.alarmTemplateForm, this);
        if(result.state){
          this.$message({ type: 'success',   message: result.message });
        }else {
          this.$message({ type: 'error',   message: result.message });
        }
          this.goBack();
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: async function() {
    //await this.$store.dispatch('loadListTypeList');
    if (this.$route.params.handle == "update") {
      this.alarmTemplateForm.template_id = this.$route.params.template_id;
      //alert(  this.alarmTemplateForm.alarm_type_id);
      this.alarmTemplateForm.template_name = this.$route.params.template_name;
      this.alarmTemplateForm.template_type = this.$route.params.template_type.toString();
      this.alarmTemplateForm.content = this.$route.params.content;
      this.alarmTemplateForm.memo = this.$route.params.memo;
    }
  }


}
</script>
<style>
.cron-help {
  padding: 3px;
  margin-left: 5px;
  color: #4db3ff;
  font-size: 18px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
