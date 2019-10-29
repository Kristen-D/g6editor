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

    <el-form-item label="邮件模版" prop="email_template_id">
      <el-select v-model="alarmInterfaceForm.email_template_id" placeholder="邮件模版" style="width:300px;">
        <el-option v-for="item in emailTemplateList" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="邮件告警对象" prop="alarm_email_object">
      <el-input v-model="alarmInterfaceForm.alarm_email_object" placeholder="可支持多个电子邮件，用,分隔" style="width:300px;"></el-input>

    </el-form-item>

    <el-form-item label="发送频率" prop="frequency">
      <el-input v-model="alarmInterfaceForm.frequency" :disabled="true" placeholder="请设置cron表达式以确定发送频率" style="width:300px;"></el-input>
      <i class="el-icon-information cron-help" title="点击设置频率" id="buttonSet" @click="getCronHelp">设置</i>

      <easy-cron-input id="divCron" style="display: none"></easy-cron-input>
      <p id="pCron" style="display: none">  频率解析: <span id="text"></span></p>
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
    }
    let validateCron = (rule, value, callback) => {
      if(this.cronValidate(value)){
        callback();
      }else{
        callback(new Error("频率表达式错误，请点击获取帮助！"));
      }

    }
    return {
      alarmInterfaceForm: {
        alerm_type_id: '',
        alarm_grade: null,
        alarm_email_object: '',
        alarm_type: '',
        email_template_id: '',
        frequency: ''
      },
      rules: {
        alarm_email_object: [{
            required: true,
            message: '邮件告警对象不可为空',
            trigger: 'blur'
          },
          {
            validator: validateEmail,
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
        email_template_id: [{
          type: 'number',
          required: true,
          message: '请选择邮件模版',
          trigger: 'change'
        }],
        frequency: [{
            required: true,
            message: '请输入发送频率',
            trigger: 'blur'
          },
          {
            validator: validateCron,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      alarmTypeList: state => state.context.alarmTypeList,
      alarmGradeList: state => state.context.alarmGradeList,
      emailTemplateList: state => state.context.emailTemplateList
    })
  },
  methods: {
    cronValidate(cronExpression ){
       //alert("校验函数的开始！");
       var cronParams = cronExpression.split(" ");

       if (cronParams.length < 6 || cronParams.length > 7) {
           return false;
       }

       //CronTrigger cronTrigger = new CronTrigger();
       //cronTrigger.setCronExpression( cronExpression );

       if (cronParams[3] == "?" || cronParams[5]=="?") {
           //Check seconds param
           if (!this.checkSecondsField(cronParams[0])) {
               return false;
           }

           //Check minutes param
           if (!this.checkMinutesField(cronParams[1])) {
               return false;
           }

           //Check hours param
           if (!this.checkHoursField(cronParams[2])) {
               return false;
           }

           //Check day-of-month param
           if (!this.checkDayOfMonthField(cronParams[3])) {
               return false;
           }

           //Check months param
           if (!this.checkMonthsField(cronParams[4])) {
               return false;
           }

           //Check day-of-week param
           if (!this.checkDayOfWeekField(cronParams[5])) {
               return false;
           }

           //Check year param
           if (cronParams.length == 7) {
               if (!this.checkYearField(cronParams[6])) {
                   return false;
               }
           }

           return true;
       } else {
           return false;
       }
   },

  checkSecondsField(secondsField) {
       return this.checkField(secondsField, 0, 59);
   },
   checkField(secondsField, minimal, maximal) {
       if (secondsField.indexOf("-") > -1 ) {
           var startValue = secondsField.substring(0, secondsField.indexOf( "-" ));
           var endValue = secondsField.substring(secondsField.indexOf( "-" ) + 1);

           if (!(this.checkIntValue(startValue, minimal, maximal, true) && this.checkIntValue(endValue, minimal, maximal, true))) {
               return false;
           }
           try {
               var startVal = parseInt(startValue, 10);
               var endVal = parseInt(endValue, 10);

               return endVal > startVal;
           } catch (e) {
               return false;
           }
       } else if (secondsField.indexOf(",") > -1) {
           return this.checkListField(secondsField, minimal, maximal);
       } else if (secondsField.indexOf( "/" ) > -1) {
           return this.checkIncrementField( secondsField, minimal, maximal );
       } else if (secondsField.indexOf( "*" ) != -1) {
           return true;
       } else {
           return this.checkIntValue(secondsField, minimal, maximal);
       }
   } ,

  checkIntValue(value, minimal, maximal, checkExtremity) {
       try {
           var val = parseInt(value, 10);
           //判断是否为整数
           if (value == val) {
               if (checkExtremity) {
                   if (val < minimal || val > maximal) {
                       return false;
                   }
               }

               return true;
           }

           return false;
       } catch (e) {
           return false;
       }
   } ,

   checkMinutesField(minutesField) {
       return this.checkField(minutesField, 0, 59);
   } ,

   checkHoursField(hoursField) {
       return this.checkField(hoursField, 0, 23);
   } ,

   checkDayOfMonthField(dayOfMonthField) {
       if (dayOfMonthField == "?") {
           return true;
       }

       if (dayOfMonthField.indexOf("L") >= 0) {
           return this.checkFieldWithLetter(dayOfMonthField, "L", 1, 7, -1, -1);
       } else if ( dayOfMonthField.indexOf("W") >= 0) {
           return this.checkFieldWithLetter(dayOfMonthField, "W", 1, 31, -1, -1);
       } else if (dayOfMonthField.indexOf("C") >= 0) {
           return this.checkFieldWithLetter(dayOfMonthField, "C", 1, 31, -1, -1);
       } else {
           return this.checkField( dayOfMonthField, 1, 31 );
       }
   },


    checkMonthsField(monthsField) {
/*        monthsField = StringUtils.replace( monthsField, "JAN", "1" );
       monthsField = StringUtils.replace( monthsField, "FEB", "2" );
       monthsField = StringUtils.replace( monthsField, "MAR", "3" );
       monthsField = StringUtils.replace( monthsField, "APR", "4" );
       monthsField = StringUtils.replace( monthsField, "MAY", "5" );
       monthsField = StringUtils.replace( monthsField, "JUN", "6" );
       monthsField = StringUtils.replace( monthsField, "JUL", "7" );
       monthsField = StringUtils.replace( monthsField, "AUG", "8" );
       monthsField = StringUtils.replace( monthsField, "SEP", "9" );
       monthsField = StringUtils.replace( monthsField, "OCT", "10" );
       monthsField = StringUtils.replace( monthsField, "NOV", "11" );
       monthsField = StringUtils.replace( monthsField, "DEC", "12" );*/

       monthsField.replace("JAN", "1");
       monthsField.replace("FEB", "2");
       monthsField.replace("MAR", "3");
       monthsField.replace("APR", "4");
       monthsField.replace("MAY", "5");
       monthsField.replace("JUN", "6");
       monthsField.replace("JUL", "7");
       monthsField.replace("AUG", "8");
       monthsField.replace("SEP", "9");
       monthsField.replace("OCT", "10");
       monthsField.replace("NOV", "11");
       monthsField.replace("DEC", "12");

       return this.checkField(monthsField, 1, 31);
   },

   checkDayOfWeekField(dayOfWeekField) {
/*        dayOfWeekField = StringUtils.replace( dayOfWeekField, "SUN", "1" );
       dayOfWeekField = StringUtils.replace( dayOfWeekField, "MON", "2" );
       dayOfWeekField = StringUtils.replace( dayOfWeekField, "TUE", "3" );
       dayOfWeekField = StringUtils.replace( dayOfWeekField, "WED", "4" );
       dayOfWeekField = StringUtils.replace( dayOfWeekField, "THU", "5" );
       dayOfWeekField = StringUtils.replace( dayOfWeekField, "FRI", "6" );
       dayOfWeekField = StringUtils.replace( dayOfWeekField, "SAT", "7" );*/

       dayOfWeekField.replace("SUN", "1" );
       dayOfWeekField.replace("MON", "2" );
       dayOfWeekField.replace("TUE", "3" );
       dayOfWeekField.replace("WED", "4" );
       dayOfWeekField.replace("THU", "5" );
       dayOfWeekField.replace("FRI", "6" );
       dayOfWeekField.replace("SAT", "7" );

       if (dayOfWeekField == "?") {
           return true;
       }

       if (dayOfWeekField.indexOf("L") >= 0) {
           return this.checkFieldWithLetter(dayOfWeekField, "L", 1, 7, -1, -1);
       } else if (dayOfWeekField.indexOf("C") >= 0) {
           return this.checkFieldWithLetter(dayOfWeekField, "C", 1, 7, -1, -1);
       } else if (dayOfWeekField.indexOf("#") >= 0) {
           return this.checkFieldWithLetter(dayOfWeekField, "#", 1, 7, 1, 5);
       } else {
           return this.checkField(dayOfWeekField, 1, 7);
       }
   } ,

   checkYearField(yearField) {
       return this.checkField(yearField, 1970, 2099);
   } ,


    checkFieldWithLetter(value, letter, minimalBefore, maximalBefore,
                                         minimalAfter, maximalAfter) {
       var canBeAlone = false;
       var canHaveIntBefore = false;
       var canHaveIntAfter = false;
       var mustHaveIntBefore = false;
       var mustHaveIntAfter = false;

       if (letter == "L") {
           canBeAlone = true;
           canHaveIntBefore = true;
           canHaveIntAfter = false;
           mustHaveIntBefore = false;
           mustHaveIntAfter = false;
       }
       if (letter == "W" || letter == "C") {
           canBeAlone = false;
           canHaveIntBefore = true;
           canHaveIntAfter = false;
           mustHaveIntBefore = true;
           mustHaveIntAfter = false;
       }
       if (letter == "#") {
           canBeAlone = false;
           canHaveIntBefore = true;
           canHaveIntAfter = true;
           mustHaveIntBefore = true;
           mustHaveIntAfter = true;
       }

       var beforeLetter = "";
       var afterLetter = "";

       if (value.indexOf(letter) >= 0 ) {
           beforeLetter = value.substring( 0, value.indexOf(letter));
       }

       if (!value.endsWith(letter)) {
           afterLetter = value.substring( value.indexOf( letter ) + 1 );
       }

       if (value.indexOf(letter) >= 0) {
           if (letter == value) {
               return canBeAlone;
           }

           if (canHaveIntBefore) {
               if (mustHaveIntBefore && beforeLetter.length == 0) {
                   return false;
               }

               if (!this.checkIntValue(beforeLetter, minimalBefore, maximalBefore, true)){
                   return false;
               }
           } else {
               if (beforeLetter.length > 0 ) {
                   return false;
               }
           }

           if (canHaveIntAfter) {
               if ( mustHaveIntAfter && afterLetter.length == 0 ) {
                   return false;
               }

               if (!this.checkIntValue(afterLetter, minimalAfter, maximalAfter, true)) {
                   return false;
               }
           } else {
               if (afterLetter.length > 0) {
                   return false;
               }
           }
       }

       return true;
   } ,

    checkIncrementField(value, minimal, maximal) {
       var start = value.substring(0, value.indexOf("/"));

       var increment = value.substring(value.indexOf("/") + 1);

       if (!("*" == start)) {
           return this.checkIntValue(start, minimal, maximal, true) && this.checkIntValue(increment, minimal, maximal, false);
       } else {
           return this.checkIntValue(increment, minimal, maximal, true);
       }
   }  ,



    checkListField(value, minimal, maximal ) {
       var st = value.split(",");

       var values = new Array(st.length);

       for(var j = 0; j < st.length; j++) {
           values[j] = st[j];
       }

       var previousValue = -1;

       for (var i= 0; i < values.length; i++) {
           var currentValue = values[i];

           if (!this.checkIntValue(currentValue, minimal, maximal, true)) {
               return false;
           }

           try {
               var val = parseInt(currentValue, 10);

               if (val <= previousValue) {
                   return false;
               } else {
                   previousValue = val;
               }
           } catch (e) {
               // we have always an int
           }
       }

       return true;
   },
    getCronHelp() {
      // window.open('/static/cronboot/web/cronb/cron.htm');
      document.getElementById("divCron").style.display="block";//显示
      document.getElementById("pCron").style.display="block";//显示
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
        var result = await utils.reqBackState("/ssa/platformIntf_alarmIntf/saveData.do", this.alarmInterfaceForm, this);
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


  },
  async mounted() {
    var el = document.getElementsByTagName('easy-cron-input')[0];
    var vm =this;
el.addEventListener('input', function(e) {
  if(e.detail) {
      vm.alarmInterfaceForm.frequency=e.detail[0];
      document.querySelector('#text').textContent = e.detail[1];
  }
})


    console.log(this.$route.params.frequency);
    if(this.$route.params.alarm_type_id!=undefined){
        var result = await utils.reqBackState("/ssa/platformIntf_alarmIntf/cronData.do", this.$route.params, this);
      document.getElementById("pCron").style.display="block";//显示
      document.querySelector('#text').textContent = result.data;
    }



  },



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
