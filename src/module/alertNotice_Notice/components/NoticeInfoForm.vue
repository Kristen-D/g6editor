<template>
<div >

    <div class="top-title" v-if="!this.$route.params.notice_code && this.$route.params.tkey =='addInfoForm'">新建通知</div>
    <div class="top-title" v-if="this.$route.params.notice_code && this.$route.params.tkey =='addInfoForm'">编辑通知</div>
    <div class="top-title" v-if="this.$route.params.notice_code && this.$route.params.tkey =='noticeTzTask'">调整通知</div>

    <el-form v-if="this.$route.params.tkey =='addInfoForm' || this.$route.params.tkey =='noticeTzTask'" :model="noticeInfoForm" :rules="rules" ref="noticeInfoForm" label-width="100px" class="form-contral">
      <el-form-item label="通知表头：" prop="header_type" v-if="this.$route.params.tkey =='addInfoForm' && this.$route.params.handle=='add'" required>
          <!--<el-select v-model="noticeInfoForm.header_type"  placeholder="选择表头" @change="changeSele">-->
        <el-select v-model="noticeInfoForm.header_type"  placeholder="选择表头" @change="headSel">
          <el-option v-for="item in headerOptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知标题：" prop="notice_name" required>
        <el-input v-model="noticeInfoForm.notice_name" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="审批人：" prop="assignee_id" v-bind:required="required" v-if="this.$route.params.tkey =='addInfoForm'">
        <el-select v-model="noticeInfoForm.assignee_id" placeholder="选择审批人">
          <el-option v-for="item in approvalOptions" :key="item.user_id" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接收单位：" prop="receive_unit" required >
        <selectOrganization v-model="noticeInfoForm.receive_unit" style="width:300px" orgType="2" orgstring="请选择接收单位" multiple >
          <!-- <el-option value="-1" label='全 选'></el-option> -->
          <!-- <el-option v-for="item in orgList" :label="item.name" :value="item.value">
          </el-option> -->
        </selectOrganization>
          <!-- <el-button type="text" @click="selectAll">全选</el-button> -->
      </el-form-item>
      <el-form-item label="是否反馈：" v-show="this.$route.params.tkey !='noticeTzTask'">
        <el-radio-group v-model="noticeInfoForm.issign">
          <el-radio :label="true">需要</el-radio>
          <el-radio :label="false">不需要</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="通知内容：" prop="notice_desc" required>
        <el-input type="textarea"  rows="6" v-model="noticeInfoForm.notice_desc" style="width:500px;"></el-input>
      </el-form-item>
      <el-form-item label="上传附件：" prop="notice_attachment" style="width:300px;">
        <el-upload ref="alertNoticeUpload" action="/ssa/alertNotice/startProcess.do" :on-success="handleSuccess" :data="noticeInfoForm" :auto-upload="false">
          <el-button slot="trigger" size="small" v-if="noticeInfoForm.attachment_filepath == null || noticeInfoForm.attachment_filepath ==''" type="text">+添加附件</el-button>
        </el-upload>
        <el-col :span="16">
          <a @click="downloadFile(noticeInfoForm.notice_code)" v-show="noticeInfoForm.attachment_filepath != null ">{{noticeInfoForm.attachment_filename}}</a>
        </el-col>
        <el-button type="text" v-if="noticeInfoForm.attachment_filepath != null && noticeInfoForm.attachment_filepath != ''" @click="deleteAttrFile('noticeInfoForm')">删除附件</el-button>
      </el-form-item>
      <el-row>
        <h4 class="sub-title">页头</h4>
      </el-row>
      <el-form-item label="下发单位：" required>
        <el-input v-model="noticeInfoForm.send_unit" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="下发人员：" required>
        <el-input v-model="noticeInfoForm.create_name" style="width:300px;" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="文号：" required>
        <el-input v-model="noticeInfoForm.approval_number" style="width:300px;" disabled></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="文号：" required>
        <el-col :span="8">
          <el-form-item>
            并公发 【
            <el-input style="width:30%;" v-model="noticeInfoForm.create_year"></el-input>】
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="create_num">
            第
            <el-input style="width:30%;" v-model="noticeInfoForm.create_num"></el-input> 号
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" v-show="this.$route.params.tkey =='addInfoForm'" class="button-p-3" @click="submitForm('noticeInfoForm','save')">保存</el-button>
        <el-button type="primary" class="button-p-3" @click="submitForm('noticeInfoForm','approve')">提交</el-button>
        <!--<el-button type="gray" class="button-p-3" @click="printView">打印预览</el-button>-->
        <el-button v-if="this.$route.params.tkey =='noticeTzTask'" type="primary" @click="noticeTzTaskSubmit(false)">作废</el-button>
        <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="this.$route.params.tkey =='noticeFbTask' " :rules="rules" ref="noticeFbTaskForm" :model="noticeFbTaskForm" label-width="110px">

      <el-form-item label="通知标题：">
        {{noticeFbTaskForm.notice_name}}
      </el-form-item>

      <!--<el-form-item label="审批意见">
        <el-input type="textarea" v-model="alertFbTaskForm.reason"></el-input>
      </el-form-item>


      <el-form-item label="是否继续审批">
        <el-radio-group v-model="radioValue" @change="changeEvent">
          <el-radio :label="1">需要</el-radio>
          <el-radio :label="2">不需要</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="选择审批人：" prop="assignee_id" required>
        <el-select v-model.number="noticeFbTaskForm.assignee_id" placeholder="选择审批人" v-bind:disabled="disabledInput">
          <el-option v-for="item in approvalOptions" :key="item.user_id" :label="item.realname" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitFbForm('noticeFbTaskForm')">提交</el-button>
              <el-button type="primary" @click="noticeFbTaskSubmit(false)">进行下一任务</el-button>
              <!-- <el-button type="gray" @click="goback">返回</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-form v-if="this.$route.params.tkey =='noticeSpTask'" ref="noticeSpTaskForm" :rules="rules" :model="noticeSpTaskForm">
      <!--  预警审核表单开始  -->
      <el-form-item label="通知标题：">
        {{noticeSpTaskForm.notice_name}}
      </el-form-item>

      <el-form-item label="是否通过：">
        <el-radio-group v-model="noticeSpTaskForm.noticeSpPass">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="审批意见：" prop="spreason" required>
        <el-input type="textarea" v-model="noticeSpTaskForm.spreason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="noticeSpTaskSubmit('noticeSpTaskForm')">提交</el-button>
        <!-- <el-button type="gray" @click="goback">返回</el-button> -->
      </el-form-item>
      <!--  预警审核表单结束  -->
    </el-form>

    <el-form v-if="this.$route.params.tkey =='noticeFkTask'" ref="noticeFkTaskForm" :rules="rules" :model="noticeFkTaskForm">
      <!--  预警审核表单开始  -->
      <el-form-item label="通知标题：">
        {{noticeFkTaskForm.notice_name}}
      </el-form-item>

      <el-form-item label="反馈结果：" prop="feedBackcontext" required>
        <el-input type="textarea" v-model="noticeFkTaskForm.feedBackcontext"></el-input>
      </el-form-item>
      <el-form-item label="上传附件：" prop="notice_attachment" style="width:300px;">
        <el-upload ref="alertNoticeFkUpload" action="/ssa/alertNotice/completeFeedbackTask.do" :on-success="handleSuccess2" :data="noticeFkTaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" v-if="noticeFkTaskForm.attachment_filepath == null || noticeFkTaskForm.attachment_filepath ==''" type="text">+添加附件</el-button>
        </el-upload>
        <!-- <el-col :span="16">
          <a @click="downloadFile(noticeFkTaskForm.notice_code)" v-show="noticeFkTaskForm.attachment_filepath != null ">{{noticeFkTaskForm.attachment_filename}}</a>
        </el-col> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="noticeFeedbackTask('noticeFkTaskForm')">提交</el-button>
        <!-- <el-button type="gray" @click="goback">返回</el-button> -->
      </el-form-item>
      <!--  预警审核表单结束  -->
    </el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import selectOrganization from "components/selectOrganization/selectOrganization.vue"
export default {
    components: {
      selectOrganization
    },
  computed: {
    ...mapState({
      // orgList: state => state.context.orgList,
      // orgMap:state => state.context.orgMap
    })
  },
  data() {
    let validateDevName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA50-9A-Z-_\\s]{2,30})$")
      if (pat.test(value)) {
        callback();
      } else {
        callback(new Error('2-30个字符，支持中文、大写英文、"‘-’"、"_"以及空格的组合'))
      }
    };
    let validateDevVersion = (rule, value, callback) => {
      let pat = new RegExp("^([0-9]{1,5})$")
      if (pat.test(value)) {
        callback();
      } else {
        callback(new Error('只能为[1-5]个数字'))
      }
    };
    let validatePers = (rule, value, callback) => {
      if (value != null) {
        let pat = new RegExp("^([0-9]{1,5})$")
        if (pat.test(value)) {
          callback();
        } else {
          callback(new Error('只能为[1-5]个数字'))
        }
      } else {
        callback();
      }
    };
    let validateYearVersion = (rule, value, callback) => {
      let pat = new RegExp("^([0-9]{1,4})$")
      if (pat.test(value)) {
        callback();
      } else {
        callback(new Error('只能为[1-4]个数字'))
      }
    };
    return {
      noticeInfoForm: {
        //通知表头
        notice_header:'',
        //表头类型
        header_type:'',
        //通知标题
        notice_name: '',
        //接收单位
        receive_unit: [],
        receive_unit_s: '',
        //通知内容
        notice_desc: '',
        //建立时间
        create_time: '',
        //审批人
        assignee_id: '',

        //是否需要反馈
        issign: false,

        //下发单位
        org_id: '',

        send_unit: '',
        //下发人员
        create_name: '',
        //文号年
        create_year: new Date().getFullYear(),
        //文号数字
        create_num: '',
        //文号
        approval_number: '',
        //附件
        notice_attachment: '',
        attachment_filepath:null,
        attachment_filename:'',
        //流程用
        type:'',
      //  notice_code:null,
        isPass:true,
        spReason:'',
        taskId:'',
        handle:'',
        processInstanceId:'',
        savetype:''
      },
      approvalOptions: [],
      headerOptions:[],
      // headerOptions:[
      // {name:"太原市公安局",value:"01"},
      // {name:"太原市网络与信息安全事件应急指挥部办公室",value:"02"},
      // {name:"太原市信息安全等级保护工作领导协调指挥办公室",value:"03"},
      // {name:"太原市网络与信息安全通报中心",value:"04"}],
      orgList:[],
      orgInfos: [],
      loginUser: null,
      radioValue: 1,
      submitParams:[],
      disabledInput: false,
      required: true,
      tableId: this.$route.params.tableId,
      rules: {
        header_type:[{
          type: 'string',
          required: true,
          message: '请选择表头',
          trigger: 'change'
        }],
        notice_name: [{
          required: true,
          message: '请输入通知标题',
          trigger: 'blur'
        }],
        notice_desc: [{
          required: true,
          message: '请输入通知内容',
          trigger: 'blur'
        }],
        assignee_id: [{
          type: 'number',
          required: true,
          message: '请选择审批人',
          trigger: 'change'
        }],
        receive_unit: [{
          type: 'array',
          required: true,
          message: '请选择接收单位',
          trigger: 'change'
        }],
        create_year: [{
          required: true,
          message: '请输入4位年份',
          trigger: 'blur'
        },
        { validator:
          validateYearVersion,
           trigger: 'blur'
         }],
         spreason:[{
           required: true,
           message: '请输入审批意见!',
           trigger: 'blur'
         }],
        create_num: [
        { validator:
          validatePers,
           trigger: 'blur'
         }],
         feedBackcontext:[{
           required: true,
           message: '请输入反馈结果!',
           trigger: 'blur'
         }]
      },
      noticeFbTaskForm: {
        notice_name: "",
        isPass: "",
        //审批人
        assignee_id: ""
      },
      noticeSpTaskForm: {
        notice_name: "",
        noticeSpPass: true,
        spreason: ""
      },
      noticeFkTaskForm: {
        notice_name: "",
        feedBackcontext: ""
      },
    };
  },
  methods: {
    headSel(){
      // this.noticeInfoForm.send_unit = this.noticeInfoForm.notice_header;
    },
    async changeSele(){
      var headerType = this.noticeInfoForm.header_type;
      //alert(headerType);
      var param={};
      param.header_type =headerType;
      param.create_year = this.noticeInfoForm.create_year;
      param.notice_type = "1";
      var data = await this.common.req("/ssa/alertNotice/getCreateNum.do", param,this);
      this.noticeInfoForm.create_num = data.num;
      if(headerType=="01"){
        this.noticeInfoForm.notice_header="太原市公安局";
        this.noticeInfoForm.approval_number = "并公发【" + this.noticeInfoForm.create_year + "】 第" +headerType+this.noticeInfoForm.create_num + "号";
      }else if(headerType=="02") {
        this.noticeInfoForm.notice_header="太原市网络与信息安全事件应急指挥部办公室";
        this.noticeInfoForm.approval_number = "并网应急【" + this.noticeInfoForm.create_year + "】 第" + headerType + this.noticeInfoForm.create_num + "号";
      }else if(headerType=="03") {
        this.noticeInfoForm.notice_header="太原市信息安全等级保护工作领导协调指挥办公室";
        this.noticeInfoForm.approval_number = "并等保办【" + this.noticeInfoForm.create_year + "】 第" + headerType + this.noticeInfoForm.create_num + "号";
      }else{
        this.noticeInfoForm.notice_header="太原市网络与信息安全通报中心";
        this.noticeInfoForm.approval_number = "并网安通报【" + this.noticeInfoForm.create_year + "】 第" + this.noticeInfoForm.create_num + "号";
      }
      this.noticeInfoForm.send_unit = this.noticeInfoForm.notice_header
      // this.noticeInfoForm.header_type="0"+headerType;

    },
    selectAll() {
      var tmpUser = [];
      for (var i = 0; i < this.orgList.length; i++) {
        var j = parseInt(this.orgList[i].value);
        tmpUser.push(j);
      }
        this.noticeInfoForm.receive_unit = tmpUser;
    },
    changeEvent() {
      if (this.radioValue == 1) {
        this.disabledInput = false;
        this.required = true;
      } else {
        this.disabledInput = true
        this.required = false;
      }
    },
    downloadFile(id) {
      var fileUrl = "/ssa/alertNotice/downloadFile.do?notice_code=" + id;
      window.location.href = fileUrl;
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
        this.$refs.alertNoticeUpload.clearFiles();
      }
    },
    handleSuccess2(response, file, fileList){
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
        this.$refs.alertNoticeFkUpload.clearFiles();
      }
    },
    async deleteAttrFile(forName){
      var result = await this.common.req("/ssa/alertNotice/deleteAttrFile.do", this.noticeInfoForm,this);
      this.$message({
        type: "success",
        message: result
      });
      this.noticeInfoForm.attachment_filepath ="";
      this.noticeInfoForm.attachment_filename ="";
      // this.$router.go(-1);
      // this.$store.dispatch('reloadTable', this.id);
    },
    async submitForm(formName,type) {
      //this.noticeInfoForm.header_type ="0"+ this.noticeInfoForm.header_type;
      this.noticeInfoForm.savetype = type;
      var arrreveUnit = this.noticeInfoForm.receive_unit;
      var strreveUnit = "";
      for (var i = 0; i < arrreveUnit.length; i++) {
        strreveUnit = strreveUnit + arrreveUnit[i] + ","
      }
      this.noticeInfoForm.receive_unit_s = strreveUnit.substr(0, strreveUnit.length - 1);

      var params = {};

      if (this.noticeInfoForm.notice_code == null) {
        this.required = true;
        this.$refs[formName].validate(async(valid) => {
            if (valid) {
              params = this.noticeInfoForm;
            } else {
              console.log('error submit!!');
              return false;
            }
            });
      }else {
          this.required = false;
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              this.noticeInfoForm.handle = 'addstaprocess';
              if (this.$route.params.tkey=='noticeTzTask'){
                  //this.noticeInfoForm.issign = null;
                  this.noticeInfoForm.handle = 'updatestaprocess';
                  this.noticeInfoForm.processInstanceId = this.$route.params.processInstanceId;
                  var taskId = this.$route.params.taskId;
                  this.noticeInfoForm.notice_code = this.$route.params.notice_code;
                  this.noticeInfoForm.type = "noticeTzPass";
                  this.noticeInfoForm.isPass = true;
                  this.noticeInfoForm.spReason = "";
                  this.noticeInfoForm.taskId = taskId;
                }
                  params = this.noticeInfoForm;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            if (this.$refs["alertNoticeUpload"].uploadFiles.length == 0) {
                var msg = await this.common.req("/ssa/alertNotice/startProcess.do", params, this);
                this.$message({
                  message: msg,
                  type: 'success'
                });
                this.$router.go(-1);
              } else if (this.$refs["alertNoticeUpload"].uploadFiles.length == 1){
                 this.$refs["alertNoticeUpload"].submit();
              } else {
                this.$alert('多文件请打包上传', '警告', {
                  type: "warning"
                });

             }
        }
        });
      //  this.$store.dispatch('reloadTable', this.tableId);
        //this.$store.dispatch('reloadTable', 'recvTodoTask');
      },
      async submitFbForm(formName) {
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              var taskId = this.$route.params.taskId;
              var params = {};
              params = this.noticeFbTaskForm;
              params.notice_code = this.$route.params.notice_code;
              params.type = "noticeRSpPass";
              if (this.radioValue == 1) {
                params.isPass = true;
              } else {
                params.isPass = false;
              }
              params.taskId = taskId;
              var msg = await this.common.req("/ssa/alertNotice/completealertFbTask.do", params, this);
              this.$message({
                type: "success",
                message: msg
              });

              this.$router.go(-1);
            }
          });
        },
        async noticeFbTaskSubmit(isPass) {
          this.$confirm('该表单确定已审批完成执行下一步骤?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
          var taskId = this.$route.params.taskId;
          var params = {};
          params = this.noticeFbTaskForm;
          params.notice_code = this.$route.params.notice_code;
          params.type = "noticeRSpPass";
          params.isPass = isPass;
          params.spReason = this.noticeFbTaskForm.reason;
          params.taskId = taskId;
          var msg = await this.common.req("/ssa/alertNotice/completealertFbTask.do", params, this);
          this.$message({
            type: "success",
            message: msg
          });

          this.$router.go(-1);
          })
        },
        async noticeTzTaskSubmit(isPass) {
          this.$confirm('该表单确定作废?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            var taskId = this.$route.params.taskId;
            var params = {};
            params = this.noticeInfoForm;
            params.notice_code = this.$route.params.notice_code;
            params.type = "noticeTzPass";
            params.isPass = isPass;
            params.spReason = "";
            params.taskId = taskId;
            var msg = await this.common.req("/ssa/alertNotice/completealertNTzTask.do", params, this);
            this.$message({
              type: "success",
              message: msg
            });
            this.$router.go(-1);
            })
        },
        async noticeSpTaskSubmit(formName) {
          var params = this.noticeSpTaskForm;
          var taskId = this.$route.params.taskId;
          params.taskId = taskId;
          params.notice_code = this.$route.params.notice_code;
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              params.type = "noticeSpPass";
              params.spReason = this.noticeSpTaskForm.spreason
              var msg = await this.common.req("/ssa/alertNotice/completeSpTask.do", params, this);
              this.$message({
                type: "success",
                message: msg
              });
              this.$router.go(-1);
              //this.$store.dispatch('reloadTable', this.tableId);
            }
          });
        },
        async noticeFeedbackTask() {
          this.$refs["noticeFkTaskForm"].validate(async(valid) => {
            if (valid){
            var params = {};
            params = this.noticeFkTaskForm;
            params.bussiness_id =  this.$route.params.notice_code;
            params.taskId =   this.$route.params.taskId;
            params.feedback_unit = this.loginUser.org_id ;
            params.notice_code = this.$route.params.notice_code;
            if (this.$refs["alertNoticeFkUpload"].uploadFiles.length == 0) {
              var msg = await this.common.req("/ssa/alertNotice/completeFeedbackTask.do",params, this);
              this.$message({message: msg,type: 'success' });
              this.goback();
            } else if (this.$refs["alertNoticeFkUpload"].uploadFiles.length == 1) {
              this.$refs["alertNoticeFkUpload"].submit();
            } else {
              this.$alert('多文件请打包上传', '警告', {type: "warning"});
            }
            // var msg = await this.common.req("/ssa/alertNotice/completeFeedbackTask.do",params, this);
            // this.$message({message: msg,type: 'success' });
            // this.goback();
          }
        });
        },
        clearSessionStorage() {
          // sessionStorage.clear();
          sessionStorage.removeItem('noticeInfoForm');
          this.$router.go(-1);
        },
        goback(){
            this.$router.go(-1);
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
          this.clearSessionStorage();
        }
    },
    mounted: function() {
        // this.common.req("/ssa/organization/getCompanyOrg.do", null, this).then(data => {
      // this.common.req("/ssa/alertNotice/getReceOrgInfos.do", null, this).then(data => {
      //   this.orgList = data;
      // });
    },
    created: async function() {
      //获取表头
      this.common.req("/ssa/alertNotice/getHeaderType.do", null, this).then(data => {
      this.headerOptions = data;
      });
      //获取审批人
      this.common.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this).then(data => {
      this.approvalOptions = data;
      });
      //获取接收单位
      // this.common.req("/ssa/alertNotice/getOrgInfos.do", null, this).then(data => {
      //   this.orgInfos = data;
      // });

      // this.common.req("/ssa/warnMgmt/getAllUser.do", null, this).then(data => {
      //   this.orgInfos = data;
      // });
      //获取登录用户的信息
      this.common.req("/ssa/alertNotice/getLoginUserInfo.do", null, this).then(data => {
        this.loginUser = data;
        this.noticeInfoForm.create_name = this.loginUser.userName;
        this.noticeInfoForm.send_unit = this.loginUser.orgName;
        this.noticeInfoForm.org_id = this.loginUser.org_id;
      });

      if (this.$route.params.notice_code) {
        if(this.$route.params.handle=='update' || this.$route.params.tkey =='noticeTzTask'){
          var param = {};
          param.notice_code = this.$route.params.notice_code;
          var formData = await this.$store.dispatch('getNoticeHandleInfoById', [param]);
          this.noticeInfoForm.notice_name = formData.notice_name;
          this.noticeInfoForm.notice_desc = formData.notice_desc;
          //this.noticeInfoForm.create_time = formData.create_time
          this.noticeInfoForm.org_id = formData.org_id;
          this.noticeInfoForm.send_unit = formData.org_name;
          this.noticeInfoForm.create_name = formData.create_name;
          this.noticeInfoForm.create_year = formData.create_year;
          this.noticeInfoForm.create_num = parseInt(formData.create_num);
          this.noticeInfoForm.notice_code = formData.notice_code;
          this.noticeInfoForm.notice_header = formData.notice_header;
          this.noticeInfoForm.header_type = formData.header_type;
          this.noticeInfoForm.approval_number = formData.approval_number;
          this.noticeInfoForm.attachment_filepath = formData.attachment_filepath;
          this.noticeInfoForm.attachment_filename = formData.attachment_filename;
          var issign =  parseInt(formData.issign);

          if (issign==1){
             this.noticeInfoForm.issign = true;
          }else{
             this.noticeInfoForm.issign = false;
          }
          //alert(this.noticeInfoForm.issign);
          if (this.$route.params.handle=='update'){
            this.noticeInfoForm.assignee_id = parseInt(formData.assignee_id);
          }else{
            this.noticeInfoForm.assignee_id = null;
          }

          var orgs = this.$route.params.receive_unit.split(",");
          var tmpUser = [];
          for (var i = 0; i < orgs.length; i++) {
            var j = parseInt(orgs[i]);
            tmpUser.push(j);
          }
          this.noticeInfoForm.receive_unit = tmpUser;
          if (this.$route.params.tkey == 'noticeTzTask') {
            this.noticeInfoForm.type = this.$route.params.type;
            this.noticeInfoForm.isPass = true;
            this.noticeInfoForm.spReason = '';
            this.noticeInfoForm.taskId = this.$route.params.taskId;
            this.noticeInfoForm.processInstanceId = formData.processInstanceId;
          }
       }
        //this.noticeInfoForm = this.$route.params;
        // alert(this.noticeInfoForm.alert_level);
        console.log(this.noticeInfoForm);
        //alert(this.noticeInfoForm.receive_unit);
        //this.noticeInfoForm.alert_time = this.utils.formatDate(new Date(this.$route.params.alert_time), "yyyy-MM-dd hh:mm:ss");
         //this.$route.params.alert_object_user.split(",");
        this.noticeSpTaskForm.notice_name = this.$route.params.notice_name;
        this.noticeFbTaskForm.notice_name = this.$route.params.notice_name;
        this.noticeFkTaskForm.notice_name = this.$route.params.notice_name;
      }
    },
    destroyed: function() {
      sessionStorage.removeItem('noticeInfoForm');
    }
  }
</script>

<style>

</style>
