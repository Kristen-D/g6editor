<template>
<div class="">


       <div class="whitebackground Whitespace">
         <div class="top-title" v-if="!this.$route.params.id">新增发送规则</div>
         <div class="top-title" v-if="this.$route.params.id">编辑发送规则</div>

         <el-form :model="mailnotifyForm" :rules="rules" ref="mailnotifyForm" label-width="100px">
           <el-form-item label="名称" prop="name" required>
             <el-input v-model="mailnotifyForm.name" placeholder="" style="width:300px;"></el-input>
           </el-form-item>
           <el-form-item label="收件人" prop="recipients">
             <el-input type="textarea" v-model="mailnotifyForm.recipients" style="width:300px;"
               placeholder="可发送至多人（最多10人），用“,”分隔"
             :autosize="{ minRows:2, maxRows:10}"></el-input>
           </el-form-item>
           <el-form-item label="抄送" prop="cc">
             <el-input type="textarea" v-model="mailnotifyForm.cc" style="width:300px;"
               placeholder="可抄送至多人（最多10人），用“,”分隔"
             :autosize="{ minRows:2, maxRows:10}"></el-input>
           </el-form-item>
           <el-form-item label="密送" prop="bcc">
             <el-input type="textarea" v-model="mailnotifyForm.bcc" style="width:300px;"
               placeholder="可密送至多人（最多10人），用“,”分隔"
             :autosize="{ minRows:2, maxRows:10}"></el-input>
           </el-form-item>
           <el-form-item label="邮件主题" prop="template" required>
             <el-select v-model="mailnotifyForm.template" placeholder="请选择邮件主题" style="width:300px;">
               <el-option :label="mt.name" :value="mt.id" v-for=" mt in mailTemplate"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="报表附件" prop="attachments" required>
             <el-select v-model="mailnotifyForm.attachments" multiple multiple-limit="5" placeholder="请选择附件（可多选）" style="width:300px;">
               <el-option :label="rt.name" :value="rt.id" v-for=" rt in reportTemplate"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="发送频率" prop="frequency" required>
             <el-input v-model="mailnotifyForm.frequency" placeholder="请输入cron表达式来确定发送频率" style="width:300px;"></el-input>
             <i class="el-icon-information cron-help" title="点击获取帮助" @click="getCronHelp"></i>
           </el-form-item>
           <el-form-item label="立即启动" prop="isLaunch" required>
             <el-radio-group v-model="mailnotifyForm.isLaunch">
               <el-radio :label="1">是</el-radio>
               <el-radio :label="0">否</el-radio>
             </el-radio-group>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" class="button-p-3" @click="submitForm('mailnotifyForm')">提交</el-button>
             <el-button type="gray" class="button-p-3" @click="resetForm('mailnotifyForm')">取消</el-button>
           </el-form-item>
         </el-form>
       </div>

</div>
</template>

<script>
export default {
  data() {
    let validateEmailAddress = (rule, value, callback) => {
      if(!rule.required && value==='') {
        return callback();
      }
      let pat = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")
      if(value.includes(',')){
        let arra = value.split(',');
        if(arra.length>10) {
          return callback(new Error("电子邮件总数不得超过10个！"));
        }
        let flag = false;
        for(let i=0; i<arra.length; i++) {
          if(!pat.test(arra[i])) {
            flag = true;
            break;
          }
        }
        if(flag) {
          callback(new Error("电子邮件格式错误，请重新输入！"));
        }else {
          callback();
        }
      }else {
        if(pat.test(value)){
          callback();
        }else {
          callback(new Error("电子邮件格式错误，请重新输入！"));
        }
      }
    };
    let validateFrequency =  (rule, value, callback) => {
      // if(value<1||value>31) {
      //   return callback(new Error("日期格式错误！"));
      // }
      // let date_ = new Date();
      // let year = date_.getFullYear();
      // let month = date_.getMonth() + 1;
      // let new_year = year;  //取当前的年份
      // let new_month = month++
      // if(month>12)      //如果当前大于12月，则年份转到下一年
      // {
      //  new_month -=12;    //月份减
      //  new_year++;      //年份增
      // }
      // let new_date = new Date(new_year,new_month,1);        //取当年当月中的第一天
      // let day = new Date(new_date.getTime()-1000*60*60*24).getDate();
      // if(value>day) {
      //   return callback(new Error("日期大于当月最后一天！"));
      // }else {
      //   return callback();
      // }
    };
    return {
      mailnotifyForm: {
        id:'',
        name: '',
        recipients: '',
        cc: '',
        bcc: '',
        template: '',
        attachments: [],
        frequency: '',
        isLaunch: 0,
      },
      tableId: this.$route.params.tableId,
      reportTemplate: [],
      mailTemplate: [],
      rules: {
        name: [
          { required: true, min: 2, max: 30, message: '请输入2到30个以内的字符', trigger: 'blur' }
        ],
        recipients: [
          { required: true, message: '请输入收件人电子邮箱', trigger: 'blur'},
          { required: true, validator: validateEmailAddress, trigger: 'blur' }
        ],
        cc: [
          { required: false, message: '请输入抄送电子邮箱', trigger: 'blur'},
          { required: false, validator: validateEmailAddress, trigger: 'blur' }
        ],
        bcc: [
          { required: false, message: '请输入密送电子邮箱', trigger: 'blur'},
          { required: false, validator: validateEmailAddress, trigger: 'blur' }
        ],
        template: [
          { type: 'number', required: true, message: '请选择邮件模版',trigger: 'change' }
        ],
        attachments: [
          { type: 'array', required: true, message: '请选择报表附件',trigger: 'change' }
        ],
        frequency: [
          { required: true, message: '请输入发送频率',trigger: 'blur' },
          // { required: false, validator: validateFrequency, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {

  },
  methods: {
    getCronHelp() {
      window.open('/static/cronboot/web/cronb/cron.htm');
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await this.common.reqBackState('/ssa/email/addOrModifyMailnotify.do', this.mailnotifyForm, this);
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
      sessionStorage.removeItem('mailnotifyForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },
    async initData() {
      let result = await this.common.req("/ssa/email/getSelectionsOfMailnotify.do", null, this);
      this.reportTemplate = result.reportTemplate;
      this.mailTemplate = result.mailTemplate;
    }
  },
  created: function() {
    if (this.$route.params.id) {
      this.mailnotifyForm = this.$route.params;
      let mailnotify = JSON.stringify(this.$route.params);
      sessionStorage.mailnotifyForm = mailnotify;
    }else if (sessionStorage.mailnotifyForm) {
      this.mailnotifyForm = JSON.parse(sessionStorage.mailnotifyForm);
      this.$route.params.id = this.mailnotifyForm.id;
    }
    this.initData();

  },
  destroyed: function() {
    sessionStorage.removeItem('mailnotifyForm');
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
