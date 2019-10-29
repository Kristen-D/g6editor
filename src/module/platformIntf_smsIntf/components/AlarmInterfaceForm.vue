<template >
<div class="whitebackground Whitespace">
  <div class="top-title" v-if="!this.$route.params.alarm_type_id">新增告警设置</div>
  <div class="top-title" v-if="this.$route.params.alarm_type_id">编辑告警设置</div>

  <el-form label-width="90px" :rules="rules" :model="alarmInterfaceForm" ref="alarmInterfaceForm">



    <el-form-item label="告警等级" prop="alarm_grade">
      <el-select v-model="alarmInterfaceForm.alarm_grade" placeholder="告警等级" style="width:300px;">
        <el-option v-for="item in alarmGradeList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="告警类型" prop="alarm_type">
      <el-select v-model="alarmInterfaceForm.alarm_type" placeholder="告警类型" style="width:300px;">
        <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="短信告警对象" prop="sms_object">
      <el-input v-model="alarmInterfaceForm.sms_object" placeholder="可支持多个手机号码，用,分隔" style="width:300px;"></el-input>

    </el-form-item>

    <el-form-item label="发送失败次数" prop="sms_send_freq">
      <el-input v-model="alarmInterfaceForm.sms_send_freq" placeholder="请输入发送失败次数" style="width:300px;"></el-input>
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
    let validatePers = (rule, value, callback) => {
      if (value != null) {
        let pat = new RegExp("^\\d+$")
        if (pat.test(value)) {
          if(value<1){
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
      if(value.includes(',')){
        let arra = value.split(',');
        if(arra.length>500) {
          return callback(new Error("手机号码不得超过500个！"));
        }
        let flag = false;
        let flag1 = false;
        for(let i=0; i<arra.length; i++) {
          if(arra[i].length!=11){
              flag1 = true;
              break;
          }
          if(!pat.test(arra[i])) {
            flag = true;
            break;
          }
        }
        if (flag1){
          callback(new Error("手机号码位数错误，请重新输入！"));
        }
        if(flag) {
          callback(new Error("手机号码格式错误，请重新输入！"));
        }else {
          callback();
        }
      }else {
        if(value.length!=11){
            callback(new Error("手机号码位数错误，请重新输入！"));
        }
        if(pat.test(value)){

          callback();
        }else {
          callback(new Error("手机号码格式错误，请重新输入！"));
        }
      }
    };
    return {
      alarmInterfaceForm: {
        alerm_type_id: '',
        alarm_grade: null,
        sms_object: '',
        alarm_type: '',
        sms_send_freq:null
      },
      rules: {
        sms_object: [{
            required: true,
            validator: validateSms,
            trigger: 'blur'
          }
        ],
        alarm_grade: [{
          type: 'number',
          required: true,
          message: '请选择告警等级',
          trigger: 'change'
        }],
        alarm_type: [{
          type: 'number',
          required: true,
          message: '请选择告警类型',
          trigger: 'change'
        }],
        sms_send_freq: [{
          required: true,
          validator: validatePers,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      alarmTypeList: state => state.context.alarmTypeList,
      alarmGradeList: state => state.context.alarmGradeList
      //emailTemplateList: state => state.context.emailTemplateList
    })
  },
  methods: {
    getCronHelp() {
      window.open('/static/cronboot/web/cronb/cron.htm');
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
        var result = await utils.reqBackState("/ssa/platformIntf_alarmIntf/saveSmsData.do", this.alarmInterfaceForm, this);
        if(result.state) {
          this.$message({
            type: "success",
            message: result.message
          });
          this.goBack();
        }else {
          this.$message({
            type: "error",
            message: result.message
          });
        }

      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: async function() {
    await this.$store.dispatch('loadListTypeList');
    if (this.$route.params.handle == "update") {
      this.alarmInterfaceForm = this.$route.params;
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
