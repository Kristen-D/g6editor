<template>
  <div class="whitebackground Whitespace">
<div v-if="this.$route.params.handle =='update' || this.$route.params.handle =='change' || this.$route.params.handle =='add'"class="top-title">新建备案单位</div>
<el-form v-if="this.$route.params.handle =='update' || this.$route.params.handle =='change' || this.$route.params.handle =='add' || this.$route.params.tkey =='Unit_Rectification'" ref="unitHandleForm" :model="unitHandleForm" :rules="rules" label-width="180px" style="width:98%">
  <!--  事件处置表单开始  -->
  <el-row>
    <el-col :span="20">
      <h4 class="sub-title">备案信息</h4>
      <el-form-item label="受理单位：" style="width:50%">
        <el-input disabled="true" v-model="unitHandleForm.accept_unit" placeholder="受理单位"></el-input>
      </el-form-item>
      <el-form-item label="信息用途：" style="width:50%" prop="info_usage">
        <el-radio-group v-model="unitHandleForm.info_usage" >
          <el-radio label="信息备案"></el-radio>
          <el-radio label="信息采集"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备案编号：" style="width:50%">
        <el-radio-group v-if="this.$route.params.handle =='add'" v-model="unitHandleForm.isAuto">
          <el-radio :label="1">自动生成</el-radio>
          <el-radio :label="0">手动填写<el-input v-if="unitHandleForm.isAuto=='0'" v-model="unitHandleForm.record_code" style="width:50%"></el-input></el-radio>
        </el-radio-group>
        <el-input disabled="true" v-if="this.$route.params.handle !='add'" v-model="unitHandleForm.record_code"></el-input>
      </el-form-item>
      <el-form-item label="备案时间：" style="width:50%" prop="filing_date">
        <el-date-picker v-model="unitHandleForm.filing_date" type="date" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="受理时间：" style="width:50%" prop="accept_date">
        <el-date-picker v-model="unitHandleForm.accept_date" type="date" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <h4 class="sub-title">基本信息</h4>
      <el-form-item label="单位名称：" style="width:50%" prop="unit_name">
        <el-input v-model="unitHandleForm.unit_name" placeholder="单位名称"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="单位简称：" style="width:50%" prop="unit_abbr">
        <el-input v-model="unitHandleForm.unit_abbr" placeholder="单位简称"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="单位地址：" style="width:50%" prop="unit_addr">
        <el-input v-model="unitHandleForm.unit_addr" placeholder="单位地址"></el-input>
      </el-form-item>
      <el-form-item label="邮编：" style="width:50%" prop="zip_code">
        <el-input v-model="unitHandleForm.zip_code" placeholder="邮编"></el-input>
      </el-form-item>
      <el-form-item label="行政区划：" style="width:50%" prop="admin_divisions">
        <el-select v-model="unitHandleForm.admin_divisions" placeholder="行政区划" style="width:100%">
          <el-option v-for="item in getDivisionsOptions" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行政区划代码：" style="width:50%">
        <el-select v-model="unitHandleForm.admin_divisions" placeholder="行政区划代码" style="width:100%">
          <el-option v-for="item in getDivisionsOptions" :label="item.code" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位ip：" style="width:50%" prop="unit_ip">
        <el-input v-model="unitHandleForm.unit_ip" placeholder="单位ip(注：多个ip请用“;”分割)"></el-input>
      </el-form-item>
      <h4 class="sub-title">单位负责人</h4>
      <el-form-item label="姓名：" style="width:50%" prop="leader_name">
        <el-input v-model="unitHandleForm.leader_name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="职务/职称：" style="width:50%" prop="leadership_position">
        <el-input v-model="unitHandleForm.leadership_position" placeholder="职务/职称"></el-input>
      </el-form-item>
      <el-form-item label="单位电话：" style="width:50%" prop="leader_office_phone">
        <el-input v-model="unitHandleForm.leader_office_phone" placeholder="单位电话"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" style="width:50%">
        <el-input v-model="unitHandleForm.leader_email" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <h4 class="sub-title">责任部门</h4>
      <el-form-item label="责任部门：" style="width:50%" prop="responsible_department">
        <el-input v-model="unitHandleForm.responsible_department" placeholder="责任部门"></el-input>
      </el-form-item>
      <el-form-item label="责任人：" style="width:50%" prop="charger">
        <el-input v-model="unitHandleForm.charger" placeholder="单位负责人"></el-input>
      </el-form-item>
      <el-form-item label="职务/职称：" style="width:50%" prop="charger_duty">
        <el-input v-model="unitHandleForm.charger_duty" placeholder="职务/职称"></el-input>
      </el-form-item>
      <el-form-item label="办公室电话：" style="width:50%" prop="charge_office_phone">
        <el-input v-model="unitHandleForm.charge_office_phone" placeholder="办公室电话"></el-input>
      </el-form-item>
      <el-form-item label="移动电话：" style="width:50%" prop="charge_person_phone">
        <el-input v-model="unitHandleForm.charge_person_phone" placeholder="移动电话"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" style="width:50%">
        <el-input v-model="unitHandleForm.charge_person_email" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <h4 class="sub-title">其他信息</h4>
      <el-form-item label="隶属关系：" prop="affiliation">
        <el-radio-group v-model="unitHandleForm.affiliation" style="display:inline-block; width:90%">
          <el-radio label="中央" name="affiliation" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="省(自治区、直辖市)" name="affiliation" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="地区(区、市、州、盟)" name="affiliation" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="县(区、市、旗)" name="affiliation" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="其他" name="affiliation" style="width:8%;margin-left: 5px;"></el-radio>
          <el-input v-if="unitHandleForm.affiliation=='其他'" size="mini" v-model="unitHandleForm.other_affiliation" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="单位类型：" prop="unit_type">
        <el-radio-group v-model="unitHandleForm.unit_type" style="display:inline-block; width:90%">
          <el-radio label="党委机关" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="政府机关" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="事业单位" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="企业" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="其他" name="unit_type" style="width:8%;margin-left: 5px;"></el-radio>
          <el-input v-if="unitHandleForm.unit_type=='其他'" size="mini" v-model="unitHandleForm.other_unit_type" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="行业类别：" prop="industry_category">
        <el-radio-group v-model="unitHandleForm.industry_category" style="display:inline-block; width:90%">
          <el-radio v-for="item in categoryCheckbox" :label="item.value" style="width:18%;margin-left: 5px;">{{item.name}}
          </el-radio>
          <el-radio label="99" name="industry_category" style="width:8%;margin-left: 5px;"  @change="otherChange('category_other')">其他</el-radio>
          <el-input v-if="unitHandleForm.industry_category=='99'" size="mini" v-model="unitHandleForm.other_category" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>
          <!-- <el-input v-bind:disabled="unitHandleForm.category_other" v-model="unitHandleForm.other_category" style="display:inline-block; width:20%"></el-input> -->
      </el-form-item>
      <h4 class="sub-title">附件上传</h4>
      <el-form-item label="文件列表：" style="width:70%">
      <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath&name=attachment_filename" :on-success="handleSuccessFile" :file-list="fileList" :on-remove="handleRemove">
        <el-button slot="trigger" size="small" type="text" v-show="unitHandleForm.attachment_filepath == '' || unitHandleForm.attachment_filepath == null">+添加附件</el-button>
      </el-upload>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">


      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm('unitHandleForm')">提交</el-button> -->
        <el-button v-show="this.$route.params.handle =='add' ||this.$route.params.handle =='change'" type="primary" @click="unitHandleFormSubmit('save')">保存</el-button>
        <el-button v-show="this.$route.params.handle =='add'||this.$route.params.handle =='change'" type="primary" @click="unitHandleFormSubmit('approve')">提交审批</el-button>
        <el-button v-if="this.$route.params.handle =='update'" type="primary" @click="save('unitHandleForm')">确认修改</el-button>
        <el-button v-if="this.$route.params.tkey =='Unit_Rectification' " type="primary" @click="SubmitTask('unitHandleForm')">提交审批</el-button>
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-form-item>


    </el-col>
  </el-row>

</el-form>
<!---------------------------------------------------提交审批 -------------------------------------------------->
<el-form v-if="this.$route.params.tkey =='Unit_Check' || this.$route.params.tkey =='Unit_Issued'" ref="unitProcessOpinion" :model="unitProcessOpinion" label-width="85px">
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
      <h4 v-if="this.$route.params.tkey =='Unit_Check'" class="sub-title">系统备案核查</h4>
      <h4 v-if="this.$route.params.tkey =='Unit_Issued' " class="sub-title">系统备案材料下发</h4>
    </div>
  <el-form-item label="审核意见：">
    <el-input type="textarea" v-model="unitProcessOpinion.reason"></el-input>
  </el-form-item>


  <el-form-item  >
    <el-button v-if="this.$route.params.tkey =='Unit_Check'" type="primary" @click="Submit(true)">通过</el-button>
    <el-button v-if="this.$route.params.tkey =='Unit_Check'" type="primary" @click="Submit(false)">驳回</el-button>
    <el-button v-if="this.$route.params.tkey =='Unit_Issued' " type="primary" @click="SubmitEnd()">材料下发</el-button>
    <!-- <el-button v-if="this.$route.params.tkey =='Unit_Rectification' " type="primary" @click="SubmitTask()">提交审批</el-button> -->
    <el-button @click="goBack">返回</el-button>
  </el-form-item>
  </div>
</el-form>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      unitHandleForm: {
        unit_id:null,
        //受理单位
        accept_unit: "太原市公安局",
        //受理单位区号
        area_id:null,
        //受理日期
        accept_date: null,
        //信息用途
        info_usage: "",
        //备案日期
        filing_date: null,
        //备案表编号
        isAuto:1,
        record_code: "",
        //单位名称
        unit_name: "",
        //单位简称
        unit_abbr: "",
        //单位地址
        unit_addr: "",
        //邮编
        zip_code: "",
        //行政区划
        admin_divisions: null,
        //行政区划代码
        admin_division_code: "",
        //单位ip
        unit_ip:"",
        //单位领导姓名
        leader_name: "",
        //单位领导办公电话
        leader_office_phone: "",
        //单位领导职务
        leadership_position: "",
        //单位领导电子邮件
        leader_email: "",
        //责任部门
        responsible_department:"",
        //负责人姓名
        charger: "",
        //负责人部门职务
        charger_duty: "",
        //负责人办公电话
        charge_office_phone: "",
        //负责人移动电话
        charge_person_phone: "",
        //负责人电子邮件
        charge_person_email: "",
        //隶属关系
        affiliation:"",
        //隶属关系其他关系
        other_affiliation: "",

        //单位类型
        unit_type: "",
        //单位类型其他类型
        other_unit_type: "",

        //行业类别
        industry_category:"",
        //行业类别其他类别
        other_category: "",
        //用户id
        user_id:null,
        status:null,
	      processInstanceId:null,
        attachment_filename: "",
        attachment_filepath: "",
        change:0,
        old_id:null,
        type:"",
      },
      fileList: [],
      configData:{
        //手动自动填写
        isAuto:true,
        //是否选择隶属关系其他
        affiliation_other:true,
        //是否选择单位类型其他
        Unit_other:true,
        //是否选择行业类别其他
        category_other:true,
        //隶属关系
        affiliation: [],
        //单位类型
        Unit_type: [],
        //行业类别
        industry_category: [],
      },
      //==========核查意见==========
      unitProcessOpinion: {
        unit_id: null,
        isPass: true,
        reason: ""
      },
      categoryCheckbox: [],
      getDivisionsOptions: [],
      rules: {
        // accept_unit: [{
        //   required: true,
        //   message: '请输入受理单位名称',
        //   trigger: 'blur'
        // }],
        accept_date: [{
          type: 'date',
          required: true,
          message: '请选择受理日期',
          trigger: 'change',
        }],
        //备案日期
        filing_date: [{
            type: 'date',
            required: true,
            message: '请选择备案日期',
            trigger: 'change',
        }],
        //信息用途
        info_usage: [{
          required: true,
          message: '请选择信息用途',
          trigger: 'change'
        }],
        //单位名称
        unit_name:[{
           required: true,
           message: '请输入单位名称',
           trigger: 'blur'
         }],
        //单位简称
        unit_abbr:[{
           required: true,
           message: '请输入单位简称',
           trigger: 'blur'
         }],
        //单位地址
        unit_addr:[{
           required: true,
           message: '请输入单位地址',
           trigger: 'blur'
         }],
        //邮编
        zip_code:[{
           required: true,
           message: '请输入邮编',
           trigger: 'blur'
         }],
        //行政区划
        admin_divisions:[{
           type: 'number',
           required: true,
           message: '请选择行政区划',
           trigger: 'change'
        }],
        //单位ip
        unit_ip:[{
           required: true,
           message: '请输入单位ip',
           trigger: 'blur'
         }],
        //单位领导姓名
        leader_name: [{
           required: true,
           message: '请输入单位ip',
           trigger: 'blur'
         }],
        //单位领导办公电话
        leader_office_phone: [{
           required: true,
           message: '请输入办公电话',
           trigger: 'blur'
         }],
        //单位领导职务
        leadership_position:[{
           required: true,
           message: '请输入职务',
           trigger: 'blur'
         }],
        //责任部门
          responsible_department:[{
             required: true,
             message: '请输入责任部门',
             trigger: 'blur'
           }],
        //负责人姓名
        charger:[{
           required: true,
           message: '请输入姓名',
           trigger: 'blur'
         }],
        //负责人部门职务
        charger_duty:[{
           required: true,
           message: '请输入部门职务',
           trigger: 'blur'
         }],
        //负责人办公电话
        charge_office_phone:[{
           required: true,
           message: '请输入办公电话',
           trigger: 'blur'
         }],
        //负责人移动电话
        charge_person_phone:[{
           required: true,
           message: '请输入移动电话',
           trigger: 'blur'
         }],
        //隶属关系
        affiliation:[{
           required: true,
           message: '请选择隶属关系',
           trigger: 'change'
         }],
        //单位类型
        unit_type:[{
           required: true,
           message: '请选择单位类型',
           trigger: 'change'
         }],
        //行业类别
        industry_category:[{
           required: true,
           message: '请选择行业类别',
           trigger: 'change'
         }],

      },
    }

  },

  methods: {

    save(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            if (this.unitHandleForm.accept_date != null && this.unitHandleForm.accept_date != "") {
            this.unitHandleForm.accept_date = this.utils.formatDate(new Date(this.unitHandleForm.accept_date), "yyyy-MM-dd")
            }
            if (this.unitHandleForm.filing_date != null && this.unitHandleForm.filing_date != "") {
            this.unitHandleForm.filing_date = this.utils.formatDate(new Date(this.unitHandleForm.filing_date), "yyyy-MM-dd")
            }
            let data = await this.utils.reqBackState("/ssa/classifiedP/saveUnitInfo.do", this.unitHandleForm, this);
            console.log(data);
            if(data.state) {
              this.$message({type: 'success', message: data.message});
              this.$router.go(-1);
            }else{
              this.$message({type: 'error', message: data.message});
            }
          } else {
            console.log('error submit!!');
            return false;
          }
       });
    },
    //流程提交
    async Submit(isPass) {
      var taskId = this.$route.params.taskId;
      var unit_id = this.$route.params.unit_id;
      var params = {};
      params = this.unitProcessOpinion;
      params.unit_id = unit_id;
      params.taskId = taskId;
      if (this.$route.params.tkey == 'Unit_Check') {
        params.type = "checkPass";
      }
      params.isPass = isPass;
      var msg = await this.utils.req("/ssa/classifiedP/completeUnitAddTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    async SubmitEnd() {
      var taskId = this.$route.params.taskId;
      var unit_id = this.$route.params.unit_id;
      var params = {};
      params = this.unitProcessOpinion;
      params.unit_id = unit_id;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/classifiedP/completeEndTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    async SubmitTask(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.unitHandleForm.accept_date != null && this.unitHandleForm.accept_date != "") {
            this.unitHandleForm.accept_date = this.utils.formatDate(new Date(this.unitHandleForm.accept_date), "yyyy-MM-dd")
          }
          if(this.unitHandleForm.filing_date != null && this.unitHandleForm.filing_date != "") {
            this.unitHandleForm.filing_date = this.utils.formatDate(new Date(this.unitHandleForm.filing_date), "yyyy-MM-dd")
          }
          var taskId = this.$route.params.taskId;
          var params = {};
          params = this.unitHandleForm;
          params.taskId = taskId;
          let data = await this.utils.reqBackState("/ssa/classifiedP/completeUnitTask.do", params, this);
          if(data.state) {
            this.$message({type: 'success', message: data.message});
            this.$router.go(-1);
          }else{
            this.$message({type: 'error', message: data.message});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
     });
    },
    checkForm(formName) {
      var flag = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    async unitHandleFormSubmit(type) {
      if (!this.checkForm("unitHandleForm")) return;
      if (this.unitHandleForm.accept_date != null && this.unitHandleForm.accept_date != "") {
        this.unitHandleForm.accept_date = this.utils.formatDate(new Date(this.unitHandleForm.accept_date), "yyyy-MM-dd")
      }
      if(this.unitHandleForm.filing_date != null && this.unitHandleForm.filing_date != "") {
        this.unitHandleForm.filing_date = this.utils.formatDate(new Date(this.unitHandleForm.filing_date), "yyyy-MM-dd")
      }
      if(this.unitHandleForm.isAuto==0 &&this.$route.params.handle !='change'){
      let numExists=await this.utils.req("/ssa/classifiedP/getNumberExists.do", this.unitHandleForm, this);
      if(numExists){alert("编号重复，请重新输入");return}
      }
      var msg;
      if (type == 'save') {
        //进行保存
        msg = await this.utils.req("/ssa/classifiedP/saveUnitInfo.do", this.unitHandleForm, this);
      }else if(type == 'approve'){
        //保存并发起流程

          msg = await this.utils.req("/ssa/classifiedP/startProcess.do", this.unitHandleForm, this);
      }

      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();

    },
    goBack() {
      this.$router.go(-1);
    },
    handleSuccessFile(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.unitHandleForm[response.data.formPath] = response.data.filepath;
        this.unitHandleForm[response.data.formName] = response.data.filename;
      }
    },
    handleRemove(file, fileList) {
      this.unitHandleForm.attachment_filepath = "";
      this.unitHandleForm.attachment_filename = "";
    },
    otherChange(value){
        if(this.configData[value]){
            this.configData[value]=false;
        }else{
            this.configData[value]=true;
        }
    },
  },
  mounted: function() {
    //获取
    this.utils.req("/ssa/classifiedP/getCategory.do", null, this).then(data => {
      this.categoryCheckbox = data;
    });
    //获取地区
    this.utils.req("/ssa/classifiedP/getDivisions.do", null, this).then(data => {
      this.getDivisionsOptions = data;
    });

  },created:function(){
    if(this.$route.params.handle =='update'|| this.$route.params.tkey =='Unit_Rectification' || this.$route.params.handle =='change'){
      var unit_id = this.$route.params.unit_id;
      var params = {};
      params.unit_id = unit_id;
      this.utils.req("/ssa/classifiedP/getUintForm.do", params, this).then(data => {
        this.unitHandleForm = data;
        this.unitHandleForm.accept_date= new Date(data.accept_date);
        this.unitHandleForm.filing_date= new Date(data.filing_date);
      if (this.unitHandleForm.attachment_filename != null && this.unitHandleForm.attachment_filename != "") {
        this.fileList = [{
          name: this.unitHandleForm.attachment_filename,
          url: this.unitHandleForm.attachment_filepath,
        }];
      }
      if(this.$route.params.handle =='change'){
        this.unitHandleForm.old_id=unit_id;
        this.unitHandleForm.unit_id=null;
        this.unitHandleForm.change=parseInt(this.unitHandleForm.change)+1;
        this.unitHandleForm.type="change";
        this.unitHandleForm.isAuto=0;//不生成编号，使用原来编号
      }
      });
    }
  }
}
</script>
