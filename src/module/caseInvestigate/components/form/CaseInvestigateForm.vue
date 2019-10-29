<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">案件调查</div>
  <el-form class="form-contral" ref="caseIvestigateForm" :model="caseIvestigateForm" :rules="caseIvestigateRules" label-width="85px">


    <el-form-item label="调查内容" prop="ivestigate_content">
      <el-input type="textarea" rows="5" v-model="caseIvestigateForm.investigate_content"></el-input>
    </el-form-item>

    <el-form-item  label="技术协查">
      <el-button type="text" @click="goTechnical()">+新建</el-button>
      <el-card id="card" v-show="technicalList.length>0">
        <div v-for="item in technicalList" v-shwo="technicalList.length >0">
        <div @click="showTechnicalDetail(item)" style="color:#20A0FF;width:80%;line-height:24px;white-space:nowrap;text-overflow:ellipsis;word-break:break-all;overflow:hidden;display:inline-block;">{{item.technical_desc}} </div>
        <div style="line-height:24px;float:right;color:#8492A6">{{item.create_time}}</div>
        </div>
</el-card>
</el-form-item>

    <el-form-item label="上传附件">
      <el-upload ref="caseIvestigateUpload" action="/ssa/caseInvestigate/completeCaseIvestigateTask.do" :on-success="handleSuccess" :data="caseIvestigateForm" :auto-upload="false">
        <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
         <div slot="tip" class="el-upload__tip">多文件请打包上传</div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="caseIvestigateTaskSubmit">提交</el-button>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>


  </el-form>
  <technicalForm v-on:reloadTechnical="getTechnicalByBussiness" :taskName="'CASEINVESTIGATE_CASEINVESTIGATE'" :src="this.params.case_name+'技术协查'" :id="this.params.case_id"></technicalForm>

</div>
</template>

<script>

import {mapState} from 'vuex'
import technicalForm from './TechnicalForm'
export default {

  components: {
    technicalForm
  },
  props:["params"],
  computed: {
    ...mapState({
      technicalVisible: state => state.process.technicalVisible,
    })
  },
  data() {
    return {
      technicalList: [],
      caseIvestigateForm: {
        case_id: null,
        investigate_content: ""
      },
      caseIvestigateRules: {
      investigate_content:[{ required: true, message: '请输入调查内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async caseIvestigateTaskSubmit() {

      if (!this.utils.checkForm("caseIvestigateForm",this)) return;
      var params = {};
      params = this.caseIvestigateForm;
      params.bussiness_id = this.caseIvestigateForm.event_handling_id;
      params.taskId =  this.params.taskId;


     if (this.$refs["caseIvestigateUpload"].uploadFiles.length == 0) {
       var msg = await this.utils.req("/ssa/caseInvestigate/completeCaseIvestigateTask.do",params, this);
       this.$message({message: msg,type: 'success' });
       this.goBack();
     } else if (this.$refs["caseIvestigateUpload"].uploadFiles.length == 1) {
       this.$refs["caseIvestigateUpload"].submit();
     } else {
       this.$alert('多文件请打包上传', '警告', {type: "warning"});
     }


    },
    goBack() {
      this.$router.go(-1);
    },
    goTechnical() {
      this.$store.state.process.technicalVisible = true;
    },

    //获取协查信息
    getTechnicalByBussiness() {
      var param = {};
      param.bussiness_type = "CASEINVESTIGATE_CASEINVESTIGATE";
      param.bussiness_id = this.params.case_id;
      this.utils.req("/ssa/technical/getTechnicalByBussiness.do", param, this).then(data => {
        this.technicalList = data;
      });
    },
    handleSuccess(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.goBack();
      }
    }
  },
  created: function() {
    this.caseIvestigateForm.case_id = this.params.case_id;
    this.getTechnicalByBussiness();
  }
}
</script>
