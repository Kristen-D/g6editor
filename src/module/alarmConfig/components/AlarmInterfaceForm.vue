<template >
<div class="whitebackground Whitespace">
  <div class="top-title" v-if="!this.$route.params.alarm_type_id">新增告警设置</div>
  <div class="top-title" v-if="this.$route.params.alarm_type_id">编辑告警设置</div>

  <el-form label-width="90px" :rules="rules" :model="alarmInterfaceForm" ref="alarmInterfaceForm">

    <el-form-item label="告警类型" prop="alarm_type">
      <el-select v-model="alarmInterfaceForm.alarm_type" placeholder="告警类型" style="width:300px;">
        <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="风险级别" prop="alarm_grade">
      <el-radio-group v-model="alarmInterfaceForm.alarm_grade">
        <el-radio-button label="1">低危</el-radio-button>
        <el-radio-button label="2">中危</el-radio-button>
        <el-radio-button label="3">高危</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否审核"  required>
      <el-radio-group v-model="alarmInterfaceForm.is_approve" @change="changeEvent">
        <el-radio  label="0">不需要</el-radio>
        <el-radio  label="1">需要</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="告警方式" prop="type" required>
      <el-radio-group v-model="alarmInterfaceForm.type" @change="changeEvent">
        <el-radio  label="1">邮件</el-radio>
        <el-radio  label="2">短信</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="发送模板" prop="template_id">
      <el-select v-model="alarmInterfaceForm.template_id" placeholder="请选择模板" style="width:300px;">
        <el-option v-for="item in templateList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="告警对象" prop="send_object">
      <el-select v-model="alarmInterfaceForm.send_object" multiple  clearable  filterable  placeholder="请选择告警对象" style="width:300px;">
        <el-option v-for="item in userList" :label="item.username" :value="item.user_id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="抄送对象" >
      <el-select v-model="alarmInterfaceForm.card_copy_object" multiple  clearable  filterable placeholder="请选择抄送对象" style="width:300px;">
        <el-option v-for="item in userList" :label="item.username" :value="item.user_id">
        </el-option>
      </el-select>
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
    let validateEmail = (rule, value, callback) => {
      let pat = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      // if (reg.test(value)) callback();
      // else callback(new Error('告警对象必须为邮箱'));
      if (value.includes(',')) {
        let arra = value.split(',');
        if (arra.length > 10) {
          return callback(new Error("电子邮件总数不得超过10个！"));
        }
        let flag = false;
        for (let i = 0; i < arra.length; i++) {
          if (!pat.test(arra[i])) {
            flag = true;
            break;
          }
        }
        if (flag) {
          callback(new Error("电子邮件格式错误，请重新输入！"));
        } else {
          callback();
        }
      } else {
        if (pat.test(value)) {
          callback();
        } else {
          callback(new Error("电子邮件格式错误，请重新输入！"));
        }
      }
    };
    let validatePers = (rule, value, callback) => {
      if (value != null) {
        let pat = new RegExp("^\\d+$")
        if (pat.test(value)) {
          if (value < 1) {
            callback(new Error('发送次数必须大于0'))
          }
          callback();
        } else {
          callback(new Error('只能为数字'))
        }
      }
    };
    let validateSms = (rule, value, callback) => {
      let pat = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
      // if (reg.test(value)) callback();
      // else callback(new Error('告警对象必须为邮箱'));
      if (value.includes(',')) {
        let arra = value.split(',');
        if (arra.length > 500) {
          return callback(new Error("手机号码不得超过500个！"));
        }
        let flag = false;
        let flag1 = false;
        for (let i = 0; i < arra.length; i++) {
          if (arra[i].length != 11) {
            flag1 = true;
            break;
          }
          if (!pat.test(arra[i])) {
            flag = true;
            break;
          }
        }
        if (flag1) {
          callback(new Error("手机号码位数错误，请重新输入！"));
        }
        if (flag) {
          callback(new Error("手机号码格式错误，请重新输入！"));
        } else {
          callback();
        }
      } else {
        if (value.length != 11) {
          callback(new Error("手机号码位数错误，请重新输入！"));
        }
        if (pat.test(value)) {

          callback();
        } else {
          callback(new Error("手机号码格式错误，请重新输入！"));
        }
      }
    };
    return {
      templateList:[],
      alarmInterfaceForm: {
        alerm_type_id: '',
        alarm_grade: null,
        is_approve:'0',
        type:'1',
        send_object: [],
        send_object_s:'',
        card_copy_object_s:'',
        alarm_type: '',
        card_copy_object: [],
        template_id:null,
        update_time:null,
      },
      rules: {
        send_object: [{
          type: 'array',
          required: true,
            message: '请选择告警对象',
          trigger: 'blur'
        }],
        alarm_grade: [{
          required: true,
          message: '请选择风险级别',
          trigger: 'change'
        }],
        template_id: [{
          type: 'number',
          required: true,
          message: '请选择模板',
          trigger: 'change'
        }],
        // type: [{
        //   required: true,
        //   message: '请选择告警方式',
        //   trigger: 'change'
        // }],
        alarm_type: [{
          type: 'number',
          required: true,
          message: '请选择告警类型',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      alarmTypeList: state => state.context.alarmTypeList,
      //alarmGradeList: state => state.context.alarmGradeList,
    //  emailTemplateList: state => state.context.emailTemplateList,
      userList: state => state.context.userList
    })
  },
  methods: {
    getCronHelp() {
      window.open('/static/cronboot/web/cronb/cron.htm');
    },
    async changeEvent() {
      var params = {};
      //alert(this.alarmInterfaceForm.type);
      params.template_type=this.alarmInterfaceForm.type;
      this.templateList = await utils.req("/ssa/alarm_config/getTemplateList.do", params, this);
    },
    checkForm() {
      var flag = false;
      this.$refs["alarmInterfaceForm"].validate((valid) => {
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
        var arrreveUnit = this.alarmInterfaceForm.send_object;
        var strreveUnit = "";
        for (var i = 0; i < arrreveUnit.length; i++) {
          strreveUnit = strreveUnit + arrreveUnit[i] + ","
        }
        this.alarmInterfaceForm.send_object_s = strreveUnit.substr(0, strreveUnit.length - 1);

          if (this.alarmInterfaceForm.card_copy_object!=''){
          var card_copy_object = this.alarmInterfaceForm.card_copy_object;
          var card_copyUnit = "";
          for (var i = 0; i < card_copy_object.length; i++) {
            card_copyUnit = card_copyUnit + card_copy_object[i] + ","
          }
          this.alarmInterfaceForm.card_copy_object_s = card_copyUnit.substr(0, card_copyUnit.length - 1);
      }else{
          this.alarmInterfaceForm.card_copy_object_s = '';
      }
        var result = await utils.reqBackState("/ssa/alarm_config/saveData.do", this.alarmInterfaceForm, this);
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
    var params = {};
    params.template_type=this.alarmInterfaceForm.type;
    this.templateList = await utils.req("/ssa/alarm_config/getTemplateList.do", params, this);
    await this.$store.dispatch('loadListTypeList');
    if (this.$route.params.handle == "update") {
      this.alarmInterfaceForm.alarm_type_id = this.$route.params.alarm_type_id;
      //alert(  this.alarmInterfaceForm.alarm_type_id);
      this.alarmInterfaceForm.alarm_grade = this.$route.params.alarm_grade.toString();
      this.alarmInterfaceForm.is_approve = this.$route.params.is_approve.toString();
      this.alarmInterfaceForm.type = this.$route.params.type.toString();
      this.alarmInterfaceForm.alarm_type = this.$route.params.alarm_type;
      this.alarmInterfaceForm.template_id = this.$route.params.template_id;
      this.alarmInterfaceForm.update_time = this.$route.params.update_time;
      if (this.$route.params.send_object){
          var objOrg= this.$route.params.send_object.split(",");
          var tmporg =[];
          for (var i=0;i<objOrg.length;i++){
             var j=parseInt(objOrg[i]);
             tmporg.push(j);
          }
          this.alarmInterfaceForm.send_object= tmporg;//this.$route.params.alert_object_user.split(",");
      }
      if (this.$route.params.card_copy_object){
          var objOrg= this.$route.params.card_copy_object.split(",");
          var tmporg =[];
          for (var i=0;i<objOrg.length;i++){
             var j=parseInt(objOrg[i]);
             tmporg.push(j);
          }
          this.alarmInterfaceForm.card_copy_object= tmporg;//this.$route.params.alert_object_user.split(",");
      }
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
