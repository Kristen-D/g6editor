<template>
<div class="whitebackground Whitespace">
  <div class="top-title">新建测评机构</div>


  <el-form ref="evaluatiomOrganForm" :model="evaluatiomOrganForm" :rules="evaluatiomOrganFormRules" label-width="120px">
    <el-row>
      <h4 class="sub-title">信息系统</h4>
    </el-row>
    <el-row>
      <el-col :span="9" :offset="1">

        <el-form-item label="系统名称：" prop="sys_name">
          <el-input v-model="evaluatiomOrganForm.sys_name" :disabled="true"></el-input>
          <el-button type="text" @click="dialog_system = true">选择</el-button>
          <el-dialog title="已备案系统" :visible.sync="dialog_system">
           <systemList :id="tableId1" @dialogSystem="dialogSystem"></systemList>
          </el-dialog>
        </el-form-item>
        <el-form-item label="安全保护等级：">
          <el-input v-model="evaluatiomOrganForm.info_sys_protec_level" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备案证明编号：">
          <el-input v-model="evaluatiomOrganForm.record_approval_code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="测评结论：" prop="evaluation_conclusion">
          <el-radio-group v-model="evaluatiomOrganForm.evaluation_conclusion" >
            <el-radio label="1">符合</el-radio>
            <el-radio label="0">不符合</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <h4 class="sub-title">被测评单位</h4>
    </el-row>

    <el-row>
      <el-col :span="9" :offset="1">

        <el-form-item label="单位名称：">
          <el-input v-model="evaluatiomOrganForm.unit_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位地址：">
          <el-input v-model="evaluatiomOrganForm.unit_addr" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <el-input v-model="evaluatiomOrganForm.zip_code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.leader_name" placeholder="姓名" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.leadership_position" placeholder="职务" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.leader_office_phone" placeholder="办公室电话" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.leader_email" placeholder="电子邮箱" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>


    <el-row>
      <h4 class="sub-title">测评单位</h4>
    </el-row>

    <el-row>
      <el-col :span="9" :offset="1">
        <el-form-item label="单位名称：" prop="organization_name">
          <el-input v-model="evaluatiomOrganForm.organization_name" :disabled="true"></el-input>
          <el-button type="text" @click="dialog_evaluatiomunit = true">选择</el-button>
          <el-dialog title="评测机构" :visible.sync="dialog_evaluatiomunit">
           <evaluatiomUnitList :id="tableId" @dialogEvaluatiomUnit="dialogEvaluatiomUnit"></evaluatiomUnitList>
          </el-dialog>
        </el-form-item>
        <el-form-item label="通信地址：">
          <el-input v-model="evaluatiomOrganForm.mailing_addr" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位代码：">
          <el-input v-model="evaluatiomOrganForm.unit_code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <el-input v-model="evaluatiomOrganForm.postcode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.contact_name" placeholder="姓名" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.contact_position" placeholder="职务" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.contact_department" placeholder="所属部门" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.contact_office_phone" placeholder="办公室电话" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.contact_phone" placeholder="移动电话" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11">
              <el-input v-model="evaluatiomOrganForm.contact_mail" placeholder="电子邮箱" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
    <el-form-item label="上传附件">
      <a class="file m-r-18"   v-show="this.evaluatiomOrganForm.attachment_filepath != null && this.evaluatiomOrganForm.attachment_filepath != ''" >{{this.evaluatiomOrganForm.attachment_filename}}</a>
      <el-button v-show="this.evaluatiomOrganForm.attachment_filepath != null && this.evaluatiomOrganForm.attachment_filepath != ''"  @click="deleteFile()"  size="small" type="text">删除</el-button>
      <el-upload  v-show="this.evaluatiomOrganForm.attachment_filepath == null || this.evaluatiomOrganForm.attachment_filepath == ''"  ref="EvaluationUpload" action="/ssa/evaluationOrgan/saveEvaluationInfo.do" :on-success="handleSuccess" :data="evaluatiomOrganForm" :auto-upload="false">
        <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
      </el-upload>
    </el-form-item>
  </el-col>
  </el-row>
  <el-row>
    <el-col>
  <el-form-item>
    <el-button type="primary" @click="saveFrom">保存</el-button>
    <el-button type="gray" @click="goBack">返回</el-button>
  </el-form-item>
</el-col>
</el-row>
  </el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import cap from 'components/Cascader/CascaderPlus'
import evaluatiomUnitList from "./EvaluationUnitList.vue"
import systemList from "./SystemList.vue"

export default {
  props:["params"],
  components: {
    cap,
    evaluatiomUnitList,
    systemList
  },
  computed: {
    ...mapState({
      leaderList: state => state.process.leaderList,
      handleList: state => state.process.handleList,
      superviseList: state =>state.process.superviseList,
      orgList: state => state.process.orgList,
      orgMap: state => state.process.orgMap,
      inspectionItems: state => state.process.inspectionItems
    })
  },
  data() {
    return {
      //检查事项
      checkeItems: [],
      evaluatiomOrganForm: {
        id: null,
      	code: "",
      	unit_id: null,
      	evaluation_conclusion: "",
      	system_id: null,
      	evaluate_id: null,
      	evaluation_time:null,
      	status: "",
        unit_name: "",
      	sys_name: "",
      	record_approval_code: "",
      	info_sys_protec_level: "",
      	unit_addr: "",
      	zip_code: "",
      	leader_name: "",
      	leadership_position: "",
      	leader_email: "",
      	leader_office_phone: "",
        organization_name: "",
        unit_code: "",
        mailing_addr: "",
        postcode: "",
        contact_name: "",
        contact_position: "",
        contact_department: "",
        contact_office_phone: "",
        contact_phone: "",
        contact_mail: "",
        attachment_filepath: "",
        attachment_filename: "",
      },
      dialog_system:false,
      dialog_systemList:{
      	unit_name: "",
      	sys_name: "",
      	record_approval_code: "",
      	info_sys_protec_level: "",
      	unit_addr: "",
      	zip_code: "",
      	leader_name: "",
      	leadership_position: "",
      	leader_email: "",
      	leader_office_phone: "",
      },
      dialog_evaluatiomunit:false,
      dialog_evaluatiomUnitList:{
        organization_name: "",
        unit_code: "",
        unit_addr: "",
        postcode: "",
        contact_name: "",
        contact_position: "",
        contact_department: "",
        contact_office_phone: "",
        contact_phone: "",
        contact_mail: "",
      },
      evaluatiomOrganFormRules: {
        sys_name:[{
          required: true,
          message: '请选择系统',
          trigger: 'blur'
        }],
        organization_name:[{
          required: true,
          message: '请选择测评机构',
          trigger: 'blur'
        }],
        evaluation_conclusion: [{
          required: true,
          message: '请选择测评结论',
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
    dialogSystem(row) {
      this.dialog_system = false;
      this.evaluatiomOrganForm.unit_id = row.unit_id;
      this.evaluatiomOrganForm.system_id = row.system_id;
      this.evaluatiomOrganForm.unit_name = row.unit_name;
      this.evaluatiomOrganForm.sys_name = row.sys_name;
      this.evaluatiomOrganForm.record_approval_code = row.record_approval_code;
      this.evaluatiomOrganForm.info_sys_protec_level = row.info_sys_protec_level;
      this.evaluatiomOrganForm.unit_addr = row.unit_addr;
      this.evaluatiomOrganForm.zip_code = row.zip_code;
      this.evaluatiomOrganForm.leader_name = row.leader_name;
      this.evaluatiomOrganForm.leadership_position = row.leadership_position;
      this.evaluatiomOrganForm.leader_email = row.leader_email;
      this.evaluatiomOrganForm.leader_office_phone = row.leader_office_phone;
    },
    dialogEvaluatiomUnit(row) {
      this.dialog_evaluatiomunit = false;
      this.evaluatiomOrganForm.evaluate_id = row.id;
      this.evaluatiomOrganForm.organization_name = row.organization_name;
      this.evaluatiomOrganForm.unit_code = row.unit_code;
      this.evaluatiomOrganForm.mailing_addr = row.mailing_addr;
      this.evaluatiomOrganForm.postcode = row.postcode;
      this.evaluatiomOrganForm.contact_name = row.contact_name;
      this.evaluatiomOrganForm.contact_position = row.contact_position;
      this.evaluatiomOrganForm.contact_department = row.contact_department;
      this.evaluatiomOrganForm.contact_office_phone = row.contact_office_phone;
      this.evaluatiomOrganForm.contact_phone = row.contact_phone;
      this.evaluatiomOrganForm.contact_mail = row.contact_mail;
    },
    goBack() {
      this.$router.go(-1);
    },
    async saveFrom() {
     if (!this.utils.checkForm("evaluatiomOrganForm",this)) return;
      if (this.$refs["EvaluationUpload"].uploadFiles.length == 0) {
        if(this.evaluatiomOrganForm.attachment_filepath!=""){
            var msg =await this.utils.req("/ssa/evaluationOrgan/saveEvaluationInfo.do", this.evaluatiomOrganForm, this);
            this.$message({message: msg,type: 'success'});
            this.goBack();
        }else{
          this.$alert('请上传附件', '警告', {type: "warning"});
        }
    } else if (this.$refs["EvaluationUpload"].uploadFiles.length == 1) {
       this.$refs["EvaluationUpload"].submit();
       //this.goBack();
     } else {
       this.$alert('多文件请打包上传', '警告', {type: "warning"});
     }

   },
   handleSuccess(response, file, fileList) {
     if (!response.state) {
       this.$alert(response.result.result, "消息");
     } else {
       this.$message({
         message: response.data,
         type: 'success'
       });
       this.goBack();
     }
   },
   async  deleteFile(){
     var msg =  await this.utils.req("/ssa/evaluationOrgan/deleteFile.do", {id:this.evaluatiomOrganForm.id}, this);
     this.$message({message: msg,type: 'success'});
     this.evaluatiomOrganForm.attachment_filepath ="";
   }
  },
  mounted:function(){


  },
  created: async function() {

    if (this.$route.params.handle == 'update') {
        this.evaluatiomOrganForm = await this.$store.dispatch('getEvaluationFormById', [this.params, this.params.tkey]);
        console.log(this.evaluatiomOrganForm);
    }
  }
}
</script>
