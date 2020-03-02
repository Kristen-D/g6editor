<template>
<div>
  <div class="top-title" v-if="!this.$route.params.notice_code && this.$route.params.tkey =='addInfoForm'">新建通报</div>
  <div class="top-title" v-if="this.$route.params.notice_code && this.$route.params.tkey =='addInfoForm'">编辑通报</div>
  <div class="top-title" v-if="this.$route.params.notice_code && this.$route.params.tkey =='bulletinTzTask'">调整通报</div>

  <el-form v-if="this.$route.params.tkey =='addInfoForm' || this.$route.params.tkey =='bulletinTzTask'" :model="noticeInfoForm" :rules="rules" ref="noticeInfoForm" label-width="100px" class="form-contral">
    <el-form-item label="通报表头：" prop="header_type" v-if="this.$route.params.tkey =='addInfoForm' && this.$route.params.handle=='add'" required>
      <el-select v-model="noticeInfoForm.header_type"  placeholder="选择表头" @change="headSel">
        <el-option v-for="item in headerOptions" :key="item.value" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="通报标题：" prop="notice_name" required>
      <el-input v-model="noticeInfoForm.notice_name" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="审批人：" prop="assignee_id" v-bind:required="required" v-if="this.$route.params.tkey =='addInfoForm'">
      <el-select v-model="noticeInfoForm.assignee_id" placeholder="选择审批人">
        <el-option v-for="item in approvalOptions" :key="item.user_id" :label="item.realname" :value="item.user_id">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="接收单位：" prop="receive_unit_user" required>
      <el-select v-model="noticeInfoForm.receive_unit_user" filterable multiple placeholder="接收单位">
        <el-option v-for="item in orgList" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="text" @click="selectAll">全选</el-button>
    </el-form-item> -->
    <el-form-item label="接收单位："  prop="receive_unit" required>
      <selectOrganization v-model="noticeInfoForm.receive_unit" style="width:300px" orgType="2" orgstring="请选择接收单位"  multiple >
      </selectOrganization>
    </el-form-item>
    <el-form-item label="通报内容：" prop="notice_desc" required>
      <el-input type="textarea" rows="6" v-model="noticeInfoForm.notice_desc" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item label="是否反馈：" v-show="this.$route.params.tkey !='bulletinTzTask'">
      <el-radio-group v-model="noticeInfoForm.issign">
        <el-radio :label="true">需要</el-radio>
        <el-radio :label="false">不需要</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="上传附件：" prop="notice_attachment" style="width:300px;">
      <el-upload ref="alertNoticeUpload" action="/ssa/alertNoticeBulletn/startProcess.do" :on-success="handleSuccess" :data="noticeInfoForm" :auto-upload="false">
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
    <!-- <el-form-item label="期数：" required>
      <el-input v-model="noticeInfoForm.periods" style="width:300px;" disabled></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="期数："  required>
      <el-col :span="7">
        <el-form-item prop="periods_num">
          第
          <el-input style="width:30%;" v-model="noticeInfoForm.periods_num" disabled></el-input> 期
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-row> -->
      <h4 class="sub-title">页尾</h4>
    </el-row>
    <el-form-item label="审签人：" prop="signature_user">
      <el-input v-model="noticeInfoForm.signature_user" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="审核人：" prop="auditor_user">
      <el-input v-model="noticeInfoForm.auditor_user" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="编校人：" prop="editor_user">
      <el-input v-model="noticeInfoForm.editor_user" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="抄报单位：" prop="copy_unit">
      <el-input v-model="noticeInfoForm.copy_unit" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="主送单位：" prop="main_unit">
      <el-input v-model="noticeInfoForm.main_unit" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="抄送单位：" prop="carbon_unit">
      <el-input v-model="noticeInfoForm.carbon_unit" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item label="存份数：">
      <el-col :span="7">
        <el-form-item prop="inventory_num">
          存
          <el-input style="width:30%;" v-model="noticeInfoForm.inventory_num"></el-input> 份
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="印刷数：">
      <el-col :span="7">
        <el-form-item prop="printing_num">
          共印
          <el-input style="width:30%;" v-model="noticeInfoForm.printing_num"></el-input> 份
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-show="this.$route.params.tkey =='addInfoForm'" class="button-p-3" @click="submitForm('noticeInfoForm','save')">保存</el-button>
      <el-button type="primary" class="button-p-3" @click="submitForm('noticeInfoForm','approve')">提交</el-button>
      <!--<el-button type="gray" class="button-p-3" @click="printView">打印预览</el-button>-->
      <el-button v-if="this.$route.params.tkey =='bulletinTzTask'" type="primary" @click="bulletinTzTaskSubmit(false)">作废</el-button>
      <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button>
    </el-form-item>
  </el-form>

  <el-form v-if="this.$route.params.tkey =='bulletinTjTask' " :rules="rules" ref="bulletinTjTaskForm" :model="bulletinTjTaskForm" label-width="110px">

    <el-form-item label="通报标题：">
      {{bulletinTjTaskForm.notice_name}}
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
      <el-select v-model.number="bulletinTjTaskForm.assignee_id" placeholder="选择审批人" v-bind:disabled="disabledInput">
        <el-option v-for="item in approvalOptions" :key="item.user_id" :label="item.realname" :value="item.user_id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item>
          <el-button type="primary" @click="submitTjForm('bulletinTjTaskForm')">提交</el-button>
          <el-button type="primary" @click="noticeTjTaskSubmit(false)">进行下一任务</el-button>
          <!--<el-button type="gray" @click="goback">返回</el-button>-->
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>

  <el-form v-if="this.$route.params.tkey =='bulletinSpTask'" ref="bulletinSpTaskForm" :rules="rules" :model="bulletinSpTaskForm">
    <!--  预警审核表单开始  -->
    <el-form-item label="通报标题：">
      {{bulletinSpTaskForm.notice_name}}
    </el-form-item>

    <el-form-item label="是否通过：">
      <el-radio-group v-model="bulletinSpTaskForm.bulletinSpPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="审批意见：" prop="spreason" required>
      <el-input type="textarea" v-model="bulletinSpTaskForm.spreason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="bulletinSpTaskSubmit('bulletinSpTaskForm')">提交</el-button>
      <!--<el-button type="gray" @click="goback">返回</el-button>-->
    </el-form-item>
    <!--  预警审核表单结束  -->
  </el-form>
  <el-form v-if="this.$route.params.tkey =='bulletinFkTask'" ref="bulletinFkTaskForm" :rules="rules" :model="bulletinFkTaskForm">
    <!--  预警审核表单开始  -->
    <el-form-item label="通报标题：">
      {{bulletinFkTaskForm.notice_name}}
    </el-form-item>

    <el-form-item label="反馈结果：" prop="feedBackcontext" required>
      <el-input type="textarea" v-model="bulletinFkTaskForm.feedBackcontext"></el-input>
    </el-form-item>
    <el-form-item label="上传附件：" prop="notice_attachment" style="width:300px;">
      <el-upload ref="alertNoticeFkUpload" action="/ssa/alertNoticeBulletn/completeFeedbackTask.do" :on-success="handleSuccess2" :data="bulletinFkTaskForm" :auto-upload="false">
        <el-button slot="trigger" size="small" v-if="bulletinFkTaskForm.attachment_filepath == null || bulletinFkTaskForm.attachment_filepath ==''" type="text">+添加附件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="bulletinFeedbackTask('bulletinFkTaskForm')">提交</el-button>
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
      //orgMap: state => state.context.orgMap
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
        if (value != '') {
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
    let validatePers = (rule, value, callback) => {
      if (value != null) {
        let pat = new RegExp("^([0-9]{1,5})$")
        if (pat.test(value)) {
          callback();
        } else {
          callback(new Error('只能为[1-5]个数字'))
        }
      }
    };
    return {
      noticeInfoForm: {
        //通报表头
        notice_header:'',
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
        //编校人
        editor_user: '',
        //
        create_year:new Date().getFullYear(),
        //第几期
        periods: '',
        periods_num: '',
        //审核人
        auditor_user: '',
        //审签人
        signature_user: '',
        //打印份数
        printing_num: '',
        printing: '',
        //印发数
        inventory_num: '',
        inventory: '',
        //抄报单位
        carbon_unit: '',
        //主送单位
        main_unit: '',
        //抄送单位
        copy_unit: '',
        //附件
        notice_attachment: '',
        attachment_filepath: null,
        attachment_filename: '',
        //流程用
        type: '',
        //  notice_code:null,
        isPass: true,
        spReason: '',
        taskId: '',
        handle:'',
        savetype: ''
      },
      headerOptions:[],
      // headerOptions:[
      // {name:"太原市公安局",value:"01"},
      // {name:"太原市网络与信息安全事件应急指挥部办公室",value:"02"},
      // {name:"太原市信息安全等级保护工作领导协调指挥办公室",value:"03"},
      // {name:"太原市网络与信息安全通报中心",value:"04"}],
      approvalOptions: [],
      objectOptions: [],
      //orgList:[],
      orgInfos: [],
      loginUser: null,
      radioValue: 1,
      submitParams: [],
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
          message: '请输入通报标题',
          trigger: 'blur'
        }, ],
        notice_desc: [{
          required: true,
          message: '请输入通报内容',
          trigger: 'blur'
        }, ],
        assignee_id: [{
          type: 'number',
          required: true,
          message: '请选择审批人',
          trigger: 'change'
        }],
        receive_unit_user: [{
          type: 'array',
          required: true,
          message: '请选择接收单位',
          trigger: 'change'
        }],
        signature_user: [{
          //type: 'number',
          required: false,
          message: '请输入审签人',
          trigger: 'blur'
        }],
        auditor_user: [{
          //type: 'number',
          required: false,
          message: '请输入审核人',
          trigger: 'blur'
        }],
        editor_user: [{
          // type: 'number',
          required: false,
          message: '请输入编校人',
          trigger: 'blur'
        }],
        copy_unit: [{
          //type: 'number',
          required: false,
          message: '请输入抄报单位',
          trigger: 'blur'
        }],
        main_unit: [{
          // type: 'number',
          required: false,
          message: '请输入主送单位',
          trigger: 'blur'
        }],
        carbon_unit: [{
          // type: 'number',
          required: false,
          message: '请输入抄送单位',
          trigger: 'blur'
        }],
        spreason: [{
          required: true,
          message: '请输入审批意见!',
          trigger: 'blur'
        }],
        periods_num: [
          {
            validator: validatePers,
            trigger: 'blur'
          }
        ],
        printing_num: [{
            validator: validateDevVersion,
            trigger: 'blur'
          }
        ],
        inventory_num: [
          // {
          //   required: false,
          //   message: '只能为1-5个数字',
          //   trigger: 'blur'
          // },
          {
            validator: validateDevVersion,
            //  required: false,
            trigger: 'blur'
          }
        ]
      },
      bulletinTjTaskForm: {
        notice_name: "",
        isPass: "",
        //审批人
        assignee_id: ""
      },
      bulletinSpTaskForm: {
        notice_name: "",
        bulletinSpPass: true,
        spreason: ""
      },
      bulletinFkTaskForm: {
        notice_name: "",
        feedBackcontext: ""
      },
    };
  },
  methods: {
    headSel(){
        // this.noticeInfoForm.send_unit = this.noticeInfoForm.notice_header
    },
    async changeSele(){
      var headerType = this.noticeInfoForm.header_type;
      //alert(headerType);
      var param={};
      param.header_type =headerType;
      param.create_year = this.noticeInfoForm.create_year;
      param.notice_type = "2";
      var data = await this.common.req("/ssa/alertNotice/getbulletonCreateNum.do", param,this);
      this.noticeInfoForm.periods_num = data.num;
      if(headerType=="01"){
        this.noticeInfoForm.notice_header="太原市公安局";
        this.noticeInfoForm.periods = "第" + headerType +this.noticeInfoForm.periods_num + "期";
      }else if(headerType=="02") {
        this.noticeInfoForm.notice_header="太原市网络与信息安全事件应急指挥部办公室";
        this.noticeInfoForm.periods ="第" + headerType +this.noticeInfoForm.periods_num + "期";
      }else if(headerType=="03") {
        this.noticeInfoForm.notice_header="太原市信息安全等级保护工作领导协调指挥办公室";
        this.noticeInfoForm.periods = "第" + headerType +this.noticeInfoForm.periods_num + "期";
      }else{
        this.noticeInfoForm.notice_header="太原市网络与信息安全通报中心";
        this.noticeInfoForm.periods = "第" + headerType +this.noticeInfoForm.periods_num + "期";
      }
      this.noticeInfoForm.send_unit = this.noticeInfoForm.notice_header;
      // this.noticeInfoForm.header_type="0"+headerType;

    },
    downloadFile(id) {
      var fileUrl = "/ssa/alertNotice/downloadFile.do?notice_code=" + id;
      window.location.href = fileUrl;
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
    handleSuccess(response, file, fileList) {
      if (response.state) {
        this.$message({
          type: "success",
          message: response.data
        });
        this.$router.go(-1);
      } else {
        this.$message({
          type: "error",
          message: response.message + "重新上传附件！"
        });
        this.$refs.alertNoticeUpload.clearFiles();
      }
    },
    handleSuccess2(response, file, fileList) {
      if (response.state) {
        this.$message({
          type: "success",
          message: response.data
        });
        this.$router.go(-1);
      } else {
        this.$message({
          type: "error",
          message: response.message + "重新上传附件！"
        });
        this.$refs.alertNoticeFkUpload.clearFiles();
      }
    },
    async deleteAttrFile(forName) {
      var result = await this.common.req("/ssa/alertNotice/deleteAttrFile.do", this.noticeInfoForm, this);
      this.$message({
        type: "success",
        message: result
      });

      this.noticeInfoForm.attachment_filepath = "";
      this.noticeInfoForm.attachment_filename = "";
      // this.$router.go(-1);
      // this.$store.dispatch('reloadTable', this.id);
    },

    async submitForm(formName, type) {
      this.noticeInfoForm.savetype = type;
      if (this.noticeInfoForm.inventory_num != '') {
        var inventory_num = this.noticeInfoForm.inventory_num;
        while (inventory_num.length < 5) {
          inventory_num = "0" + inventory_num;
        }
        this.noticeInfoForm.inventory_num = inventory_num;
        this.noticeInfoForm.inventory = "存" + this.noticeInfoForm.inventory_num + "份";
      } else {
        this.noticeInfoForm.inventory_num = '';
        this.noticeInfoForm.inventory = '';
      }
      if (this.noticeInfoForm.printing_num != '') {
        var printing_num = this.noticeInfoForm.printing_num;
        while (printing_num.length < 5) {
          printing_num = "0" + printing_num;
        }
        this.noticeInfoForm.printing_num = printing_num;
        this.noticeInfoForm.printing = "共印" + this.noticeInfoForm.printing_num + "份";
      } else {
        this.noticeInfoForm.printing_num = '';
        this.noticeInfoForm.printing = '';
      }
      // this.$refs[formName].validate(async(valid) => {
      //   if (valid) {
          var arrreveUnit = this.noticeInfoForm.receive_unit;
          var strreveUnit = "";
          for (var i = 0; i < arrreveUnit.length; i++) {
            strreveUnit = strreveUnit + arrreveUnit[i] + ","
          }
          this.noticeInfoForm.receive_unit_s = strreveUnit.substr(0, strreveUnit.length - 1);
          // var createNum = this.noticeInfoForm.periods_num;
          // while (createNum.length < 5) {
          //   createNum = "0" + createNum;
          // }
          // this.noticeInfoForm.periods_num = createNum;
          // this.noticeInfoForm.periods = "第" + this.noticeInfoForm.periods_num + "期";
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
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
      } else {
        this.required = false;
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.noticeInfoForm.handle = 'addstaprocess';
            if(this.$route.params.tkey == 'bulletinTzTask'){
              this.noticeInfoForm.handle ='updatestaporcsss';
              var taskId = this.$route.params.taskId;
              this.noticeInfoForm.notice_code = this.$route.params.notice_code;
              this.noticeInfoForm.type = "bulletinTzPass";
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
            var msg = await this.common.req("/ssa/alertNoticeBulletn/startProcess.do", params, this);
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
          //this.$router.go(-1);
          //  this.$store.dispatch('reloadTable', this.tableId);
        }
      });
    },
    async submitTjForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          var taskId = this.$route.params.taskId;
          var params = {};
          params = this.bulletinTjTaskForm;
          params.notice_code = this.$route.params.notice_code;
          params.type = "bulletinRSpPass";
          if (this.radioValue == 1) {
            params.isPass = true;
          } else {
            params.isPass = false;
          }
          params.taskId = taskId;
          var msg = await this.common.req("/ssa/alertNoticeBulletn/completealertTjTask.do", params, this);
          this.$message({
            type: "success",
            message: msg
          });

          this.$router.go(-1);
        }
      });
    },
    async noticeTjTaskSubmit(isPass) {
      this.$confirm('该表单确定已审批完成执行下一步骤?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var taskId = this.$route.params.taskId;
        var params = {};
        params = this.bulletinTjTaskForm;
        params.notice_code = this.$route.params.notice_code;
        params.type = "bulletinRSpPass";
        params.isPass = isPass;
        params.spReason = this.bulletinTjTaskForm.reason;
        params.taskId = taskId;
        var msg = await this.common.req("/ssa/alertNoticeBulletn/completealertTjTask.do", params, this);
        this.$message({
          type: "success",
          message: msg
        });

        this.$router.go(-1);
        })
    },
    async bulletinTzTaskSubmit(isPass) {
      this.$confirm('该表单确定需要作废?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
            var taskId = this.$route.params.taskId;
          var params = {};
          params = this.noticeInfoForm;
          params.notice_code = this.$route.params.notice_code;
          params.type = "bulletinTzPass";
          params.isPass = isPass;
          params.spReason = "";
          params.taskId = taskId;
          var msg = await this.common.req("/ssa/alertNoticeBulletn/completealertNTzTask.do", params, this);
          this.$message({
            type: "success",
            message: msg
          });
          this.$router.go(-1);
        })
    },
    async bulletinSpTaskSubmit(formName) {
      var params = this.bulletinSpTaskForm;
      var taskId = this.$route.params.taskId;
      params.taskId = taskId;
      params.notice_code = this.$route.params.notice_code;
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          params.type = "bulletinSpPass";
          params.spReason = this.bulletinSpTaskForm.spreason
          var msg = await this.common.req("/ssa/alertNoticeBulletn/completeSpTask.do", params, this);
          this.$message({
            type: "success",
            message: msg
          });
          this.$router.go(-1);
          //  this.$store.dispatch('reloadTable', this.tableId);
        }
      });
    },
    async bulletinFeedbackTask() {
      this.$refs["bulletinFkTaskForm"].validate(async(valid) => {
        if (valid){
        var params = {};
        params = this.bulletinFkTaskForm;
        params.bussiness_id =  this.$route.params.notice_code;
        params.notice_name =  this.$route.params.notice_name;
        params.taskId =   this.$route.params.taskId;
        params.feedback_unit = this.loginUser.org_id ;
        params.notice_code = this.$route.params.notice_code;
        if (this.$refs["alertNoticeFkUpload"].uploadFiles.length == 0) {
          var msg = await this.common.req("/ssa/alertNoticeBulletn/completeFeedbackTask.do",params, this);
          this.$message({message: msg,type: 'success' });
          this.$router.go(-1);
        } else if (this.$refs["alertNoticeFkUpload"].uploadFiles.length == 1) {
          this.$refs["alertNoticeFkUpload"].submit();
        } else {
          this.$alert('多文件请打包上传', '警告', {type: "warning"});
        }
        // var msg = await this.common.req("/ssa/alertNoticeBulletn/completeFeedbackTask.do",params, this);
        // this.$message({message: msg,type: 'success' });
        // this.$router.go(-1);
      }
    });
    },
    clearSessionStorage() {
      // sessionStorage.clear();
      sessionStorage.removeItem('noticeInfoForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    }
  },
  mounted: function() {
    // this.common.req("/ssa/organization/getCompanyOrg.do", null, this).then(data => {
    this.common.req("/ssa/alertNotice/getReceOrgInfos.do", null, this).then(data => {
    this.orgList = data;

    //获取表头
    this.common.req("/ssa/alertNotice/getHeaderType.do", null, this).then(data => {
    this.headerOptions = data;
    });
  });
  },
  created: async function() {

    // 获取序号
    // var param = {};
    // param.notice_type = 2;
    // param.create_year =  this.noticeInfoForm.create_year;
    // var data =  await this.common.req("/ssa/alertNotice/getbulletonCreateNum.do", param, this);
    // this.noticeInfoForm.periods_num = data.num;
    //获取审批人
    this.common.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this).then(data => {
      this.approvalOptions = data;
    });


    //获取接收单位
    // this.common.req("/ssa/warnMgmt/getAllUser.do", null, this).then(data => {
    //   this.objectOptions = data;
    // });

    //获取组织
    this.common.req("/ssa/alertNotice/getOrgInfos.do", null, this).then(data => {
      this.orgInfos = data;
    });
    //获取登录用户的信息
    this.common.req("/ssa/alertNotice/getLoginUserInfo.do", null, this).then(data => {
      this.loginUser = data;
      this.noticeInfoForm.create_name = this.loginUser.userName;
      this.noticeInfoForm.send_unit = this.loginUser.orgName;
      this.noticeInfoForm.org_id = this.loginUser.org_id;
    });

    if (this.$route.params.notice_code) {
      if (this.$route.params.handle == 'update' || this.$route.params.tkey == 'bulletinTzTask') {
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
        this.noticeInfoForm.header_type = formData.header_type;
        this.noticeInfoForm.notice_header = formData.notice_header;
        this.noticeInfoForm.editor_user = formData.editor_user;
        this.noticeInfoForm.periods = formData.periods;
        this.noticeInfoForm.periods_num = parseInt(formData.periods_num);
        this.noticeInfoForm.auditor_user = formData.auditor_user;
        this.noticeInfoForm.signature_user = formData.signature_user;
        if(formData.printing_num){
          this.noticeInfoForm.printing_num = parseInt(formData.printing_num);
        }else{
            this.noticeInfoForm.printing_num = formData.printing_num;
        }
        if(formData.inventory_num){
          this.noticeInfoForm.inventory_num = parseInt(formData.inventory_num);
        }else{
          this.noticeInfoForm.inventory_num =formData.inventory_num;
        }
        this.noticeInfoForm.carbon_unit = formData.carbon_unit;
        this.noticeInfoForm.main_unit = formData.main_unit;
        this.noticeInfoForm.copy_unit = formData.copy_unit;
        this.noticeInfoForm.notice_code = formData.notice_code;
        this.noticeInfoForm.attachment_filepath = formData.attachment_filepath;
        this.noticeInfoForm.attachment_filename = formData.attachment_filename;
        var issign =  parseInt(formData.issign);
        if (issign==1){
           this.noticeInfoForm.issign = true;
        }else{
           this.noticeInfoForm.issign = false;
        }
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
        if (this.$route.params.tkey == 'bulletinTzTask') {
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
      this.bulletinSpTaskForm.notice_name = this.$route.params.notice_name;
      this.bulletinTjTaskForm.notice_name = this.$route.params.notice_name;
      this.bulletinFkTaskForm.notice_name = this.$route.params.notice_name;
    }
  },
  destroyed: function() {
    sessionStorage.removeItem('noticeInfoForm');
  }
}
</script>

<style>

</style>
