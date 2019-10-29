<template>
    <div>
      <div class="top-title" v-if="!this.params.alert_id && this.params.tkey =='warnhandleInfoTask'">新建预警</div>
      <div class="top-title" v-if="this.params.alert_id &&  this.params.tkey =='warnhandleInfoTask'">编辑预警</div>
      <div class="top-title" v-if="this.params.alert_id &&  this.params.tkey =='alertTztask'">调整预警</div>
<el-form   ref="warnHandleForm" :model="warnHandleForm" :rules="rules" label-width="110px">
  <!--  预警表单开始  -->
  <el-row>
    <el-col :span="12">
      <el-form-item label="预警名称：" prop="alert_header"  required>
        <el-input v-model="warnHandleForm.alert_header" placeholder="预警名称"></el-input>
      </el-form-item>
      <el-form-item label="等级：" prop="alert_level" required>
        <el-radio-group v-model="warnHandleForm.alert_level">
          <el-radio-button label="1">低</el-radio-button>
          <el-radio-button label="2">中</el-radio-button>
          <el-radio-button label="3">高</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型：" prop="alert_type" required>
        <el-select v-model="warnHandleForm.alert_type" placeholder="预警类型">
          <el-option v-for="item in alertTypeOptions" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="处置人：" prop="alert_principal" required>
        <el-select v-model="warnHandleForm.alert_principal"   placeholder="处置人">
          <el-option v-for="item in treatPrincipalOptions" :key="item.user_id" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="处置单位：" prop="alert_org_id" required>
        <el-select v-model="warnHandleForm.alert_org_id" clearable  filterable placeholder="处置单位">
          <el-option v-for="item in policeorgList" :label="item.name" :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="预警来源：" prop="alert_source" required>
        <el-input v-model="warnHandleForm.alert_source" placeholder="来源描述"></el-input>
      </el-form-item>

      <!-- <el-form-item label="事发单位：" prop="alert_object_user" required>
        <el-select v-model="warnHandleForm.alert_object_user"  clearable  filterable multiple  placeholder="事发单位">
          <el-option v-for="item in orgList"  :label="item.name" :value="item.value">
          </el-option>
        </el-select>
          <el-button type="text" @click="selectAll">全选</el-button>
      </el-form-item> -->

      <el-form-item label="事发单位：" prop="alert_object_user" required>
        <selectOrganization v-model="warnHandleForm.alert_object_user" style="width:300px" orgType="2" orgstring="选择事发单位"  multiple >
        </selectOrganization>
      </el-form-item>

      <el-form-item label="发生时间：" required>
        <el-date-picker v-model="warnHandleForm.alert_time" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="选择审批人：" :width="85%"   v-bind:required="required" v-show="this.$route.params.tkey =='warnhandleInfoTask'">
        <el-select v-model="warnHandleForm.assignee_id" clearable  placeholder="选择审批人">
          <el-option v-for="item in approvalOptions" :key="item.user_id" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传附件：" style="width:300px;">
        <el-upload ref="warnMgmtUpload" action="/ssa/warnMgmt/startProcess.do" :on-success="handleSuccess" :data="warnHandleForm" :auto-upload="false">
          <el-button slot="trigger" size="small" v-if="warnHandleForm.attachment_filepath == null || warnHandleForm.attachment_filepath ==''" type="text">+添加附件</el-button>
        </el-upload>
        <el-col :span="16">
          <a @click="downloadFile(warnHandleForm.alert_id)" v-show="warnHandleForm.attachment_filepath != null ">{{warnHandleForm.attachment_filename}}</a>
        </el-col>
        <el-button type="text" v-if="warnHandleForm.attachment_filepath != null && warnHandleForm.attachment_filepath != ''" @click="deleteAttrFile('warnHandleForm')">删除附件</el-button>
      </el-form-item>

      <el-form-item label="描述：">
        <el-input type="textarea" v-model="warnHandleForm.alert_desc"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <el-form-item>
        <el-button type="primary" v-show="this.params.tkey =='warnhandleInfoTask'" class="button-p-3" @click="submitForm('warnHandleForm','save')">保存</el-button>
        <el-button type="primary" @click="submitForm('warnHandleForm','approve')">提交审批</el-button>
        <el-button v-if="this.params.tkey =='alertTztask'" type="primary"
        @click="alertTzTaskSubmit(false)">作废</el-button>
        <el-button type="gray" @click="back">返回</el-button>
      </el-form-item>
    </el-col>
  </el-row>
  <!-- 预警表单结束   -->
</el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import selectOrganization from "components/selectOrganization/selectOrganization.vue"
export default {
  props:["params"],
  components: {
    selectOrganization
  },
  // computed: {
  //   ...mapState({
  //     // orgList: state => state.process.orgList,
  //     // orgMap:state => state.process.orgMap,
  //     // policeorgList: state => state.process.policeOrgList,
  //     // policeorgMap:state => state.process.policeOrgMap,
  //   })
  // },
  data() {
    return {
      warnHandleForm: {
        alert_id:null,

        status:"0",
        //预警名称
        alert_header: "",
        //预警等级
        alert_level: "",
        //预警类型
        alert_type: null,
        //处置负责人
        alert_principal:"",
        //事发单位
        alert_object_unit:'',
        alert_object_user:[],
        //处置单位
        alert_org_id: null,
        //描述
        alert_desc: "",
        //预警时间
        alert_time: "",
        //来源描述
        alert_source: "",
        //审批人
        assignee_id:null,

        attachment_filepath:null,
        attachment_filename:'',
        //流程用
        type:'',
        isPass:true,
        spReason:'',
        taskId:'',
        handle:'',
        processInstanceId:'',
        savetype:''
      },
      alertTypeOptions: [],
      treatPrincipalOptions: [],
      objectOptions: [],
      //orgList:[],
      policeorgList:[],
      eventUnitOptions: [],
      approvalOptions:[],
      radioValue:1,
      loginUser:null,
      disabledInput:false,
      required:true,
      rules: {
        alert_header: [{
          required: true,
          message: '请输入预警名称',
          trigger: 'blur'
        }],
        alert_source: [{
          required: true,
          message: '请输入来源描述',
          trigger: 'blur'
        }],
        alert_org_id: [{
          type: 'number',
          required: true,
          message: '请选择处置单位',
          trigger: 'change'
        }],
        alert_level: [{
          required: true,
          message: '请选择预警级别',
          trigger: 'change'
        }],
        alert_type: [{
          //type: 'number',
          required: true,
          message: '请选择预警类型',
          trigger: 'change'
        }],
        assignee_id:[{
          type: 'number',
          required: true,
          message: '请选择审批人',
          trigger: 'change'
        }],
        alert_object_user: [{
          type: 'array',
          required: true,
          message: '请选择事发单位',
          trigger: 'change'
        }],
        alert_principal: [{
          type: 'number',
          required: true,
          message: '请选择处置人',
          trigger: 'change'
        }],
        date1: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    checkForm(formName) {
      var flag = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    downloadFile(id) {
      var fileUrl = "/ssa/warnMgmt/downloadFile.do?alert_id=" + id;
      window.location.href = fileUrl;
    },
    async deleteAttrFile(forName){
      var result = await this.utils.req("/ssa/warnMgmt/deleteAttrFile.do", this.warnHandleForm,this);
      this.$message({
        type: "success",
        message: result
      });
      this.warnHandleForm.attachment_filepath ="";
      this.warnHandleForm.attachment_filename ="";
      // this.$router.go(-1);
      // this.$store.dispatch('reloadTable', this.id);
    },
    selectAll() {
      var tmporg = [];
      for (var i = 0; i < this.orgList.length; i++) {
        var j = parseInt(this.orgList[i].value);
        tmporg.push(j);
      }
        this.warnHandleForm.alert_object_user = tmporg;
    },
    async submitForm(formName,type) {
      if (!this.utils.checkForm(formName, this)) return;
      this.warnHandleForm.savetype = type;
      this.warnHandleForm.alert_time = this.utils.formatDate(new Date(this.warnHandleForm.alert_time), "yyyy-MM-dd hh:mm:ss");
      var arrreveUnit = this.warnHandleForm.alert_object_user;
      var strreveUnit = "";
      for (var i = 0; i < arrreveUnit.length; i++) {
        strreveUnit = strreveUnit + arrreveUnit[i] + ","
      }
      this.warnHandleForm.alert_object_unit = strreveUnit.substr(0, strreveUnit.length - 1);
      var params = {};
      if (this.warnHandleForm.alert_id ==null){
        params = this.warnHandleForm;
      }else{
        this.warnHandleForm.handle = 'addstaprocess';
        if (this.$route.params.tkey=='alertTztask'){
            this.warnHandleForm.handle = 'updatestaprocess';
            var taskId = this.$route.params.taskId;
            this.warnHandleForm.alert_id = this.$route.params.alert_id;
            this.warnHandleForm.type = "alertTzPass";
            this.warnHandleForm.isPass = true;
            this.warnHandleForm.spReason = "";
            this.warnHandleForm.taskId = taskId;
          }
            params = this.warnHandleForm;
      }
      if (this.$refs["warnMgmtUpload"].uploadFiles.length == 0) {
          var msg = await this.utils.req("/ssa/warnMgmt/startProcess.do", params, this);
          this.$message({
            message: msg,
            type: 'success'
          });
          this.$router.go(-1);
        } else if (this.$refs["warnMgmtUpload"].uploadFiles.length == 1){
           this.$refs["warnMgmtUpload"].submit();
        } else {
          this.$alert('多文件请打包上传', '警告', {
            type: "warning"
          });

       }
    },
    handleSuccess(response, file, fileList){
      console.log(response);
      if (response.state){
        this.$message({
          type: "success",
          message: response.data
        });
        this.$router.go(-1);
      }else{
        this.$message({
          type: "error",
          message: response.message+"重新上传附件！"
        });
        this.$refs.warnMgmtUpload.clearFiles();
      }
    },
    async submitForm_bak(formName,type) {
        this.warnHandleForm.savetype = type;
        this.warnHandleForm.alert_time = this.utils.formatDate(new Date(this.warnHandleForm.alert_time), "yyyy-MM-dd hh:mm:ss");
        if(type=='save'){
          this.required = true;
            if (this.warnHandleForm.alert_id == null) {

              this.$refs[formName].validate(async(valid) => {
                if (valid) {
                  var msg = await this.utils.req("/ssa/warnMgmt/savewarnHandleInfo.do", this.warnHandleForm, this);
                  this.$message({
                    type: "success",
                    message: msg
                  });
                  this.$router.go(-1);
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }else{
            var msg = await this.utils.req("/ssa/warnMgmt/updatewarnHandleInfo.do", this.warnHandleForm, this);
            this.$message({
              type: "success",
              message: msg
            });
            this.$router.go(-1);
          }
        }else{
            if (this.warnHandleForm.alert_id == null) {
              this.required = true;
              this.$refs[formName].validate(async(valid) => {
                if (valid) {
                  var msg = await this.utils.req("/ssa/warnMgmt/addstartProcess.do", this.warnHandleForm, this);
                  this.$message({
                    type: "success",
                    message: msg
                  });
                  this.$router.go(-1);
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
          } else {
            this.required = false;
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                  if (this.$route.params.tkey =='alertTztask'){
                    var taskId = this.$route.params.taskId;
                    var params = {};
                    params = this.warnHandleForm;
                    params.alert_id = this.$route.params.alert_id;
                    params.type = "alertTzPass";
                    params.isPass = true;
                    params.spReason = "";
                    params.taskId = taskId;
                    var msg = await this.utils.req("/ssa/warnMgmt/completealertTzTask.do", params, this);
                    this.$message({
                      type: "success",
                      message: msg
                    });
                  }else{
                    this.required = true;
                    var msg = await this.utils.req("/ssa/warnMgmt/addstartProcess.do", this.warnHandleForm, this);
                    this.$message({
                      type: "success",
                      message: msg
                    });
                  }
                    this.$router.go(-1);
                  }else {
                    console.log('error submit!!');
                    return false;
                  }
              });

          }
        }
  },
    back() {
      this.$router.go(-1);
    },
    async alertTzTaskSubmit(isPass) {
      var taskId = this.params.taskId;
      var params = {};
      params = this.warnHandleForm;
      params.alert_id = this.params.alert_id;
      params.type = "alertTzPass";
      params.isPass = isPass;
      params.spReason = "";
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/warnMgmt/completealertNTzTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });

      this.$router.go(-1);
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    //初始化处置人
    this.utils.req("/ssa/warnMgmt/getItPolice.do", null, this).then(data => {
    //ssa/processMgmt/getPoliceUser.do
    this.treatPrincipalOptions = data;
    });

    this.utils.req("/ssa/alertNotice/getLoginUserInfo.do", null, this).then(data => {
      this.loginUser = data;
    });
    // this.utils.req("/ssa/warnMgmt/getAllUser.do", null, this).then(data => {
    // //this.utils.req("/ssa/warnMgmt/getItPolice.do", null, this).then(data => {
    // this.objectOptions = data;
    // });

    this.utils.req("/ssa/warnMgmt/getAllUser.do", null, this).then(data => {
    //this.utils.req("/ssa/warnMgmt/getItPolice.do", null, this).then(data => {
    this.objectOptions = data;
    });

    // this.utils.req("/ssa/organization/getCompanyOrg.do", null, this).then(data => {
    //   this.orgList = data;
    // });

    this.utils.req("/ssa/organization/getPoliceOrg.do", null, this).then(data => {
      this.policeorgList = data;
    });
    //初始化类型
    this.utils.req("/ssa/warnMgmt/getAllAlertTypes.do", null, this).then(data => {
      this.alertTypeOptions = data;
    });
    //初始化事发单位
    this.utils.req("/ssa/warnMgmt/getRecordUnitInfo.do", null, this).then(data => {
    this.eventUnitOptions = data;
    });

  //   this.utils.req("/ssa/warnMgmt/getapprovalUsers.do", null, this).then(data => {
  //   this.approvalOptions = data;
  // });
    this.utils.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this).then(data => {
    this.approvalOptions = data;
  });
    //this.approvalOptions = this.utils.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this);
  },
  created: async function() {
    //alert(this.params.alert_id);
    if (this.params.alert_id) {
      var alert_header = this.params.alert_header;
      if(this.params.handle=='update' || this.params.tkey =='alertTztask'){
        var param = {};
        this.warnHandleForm.tkey= this.params.tkey;
        param.alert_id = this.params.alert_id;
        var formData = await this.$store.dispatch('getWarnHandleInfoById', [param]);
        //预警名称
        this.warnHandleForm.alert_header=formData.alert_header;

        this.warnHandleForm.alert_id=formData.alert_id;

        //this.warnHandleForm.status=formData.status;
        //预警等级
        //this.warnHandleForm.alert_level=this.$route.params.alert_level,
        //预警类型
        this.warnHandleForm.alert_type=formData.alert_type.toString();
        //处置负责人
        this.warnHandleForm.alert_principal=formData.alert_principal;
        //处置单位
        this.warnHandleForm.alert_org_id=formData.alert_org_id;
        //描述
        this.warnHandleForm.alert_desc=formData.alert_desc;
        //预警时间
        this.warnHandleForm.alert_time=formData.alert_time;
        //来源描述
        this.warnHandleForm.alert_source=formData.alert_source;
        this.warnHandleForm.attachment_filepath=formData.attachment_filepath;
        this.warnHandleForm.attachment_filename=formData.attachment_filename;
        if(this.$route.params.handle=='update' && formData.assignee_id!=null && formData.assignee_id!=''){
          this.warnHandleForm.assignee_id=formData.assignee_id;
        }else{
          this.warnHandleForm.assignee_id=null;
        }
        if (this.params.tkey =='alertTztask'){
            this.warnHandleForm.processInstanceId=formData.processInstanceId;
        }

        var alert_level = formData.alert_level;
        this.warnHandleForm.alert_level = alert_level.toString();
        // alert(this.warnHandleForm.alert_level);
        console.log(this.warnHandleForm);
        //this.warnHandleForm.alert_time = this.utils.formatDate(new Date(this.$route.params.alert_time), "yyyy-MM-dd hh:mm:ss");
        if (formData.alert_object){
            var objOrg= formData.alert_object.split(",");
            var tmporg =[];
            for (var i=0;i<objOrg.length;i++){
               var j=parseInt(objOrg[i]);
               tmporg.push(j);
            }
            //事发单位
            this.warnHandleForm.alert_object_user= tmporg;//this.$route.params.alert_object_user.split(",");
        }
      }
    }
  }
}
</script>
