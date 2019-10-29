<template>
  <div class="whitebackground Whitespace alter-el-form">
  <div class="top-title">新建安服机构</div>
<el-form ref="unitForm" :model="unitForm" :rules="rules" label-width="180px" style="width:98%">
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
      <h4 class="sub-title">备案信息</h4>
    </div>
      <el-form-item label="受理单位：">
        <el-input disabled="true" v-model="unitForm.accept_unit" placeholder="受理单位" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="申报单位：">
        <el-input v-model="unitForm.apply_unit" placeholder="申报单位" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="申报单位法人：">
        <el-input v-model="unitForm.apply_corporation" placeholder="申报单位法人" class="set-input-width40"></el-input>
        <a title="申报单位法定代表人/被授权人" style="width:10%"><i class="el-icon-information"></i></a>
      </el-form-item>
      </div>
      <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
      <h4 class="sub-title">单位基本信息</h4>
      </div>
      <el-form-item label="安服机构名称：" >
        <el-input v-model="unitForm.unit_name" placeholder="单位名称" class="set-input-width40"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="其他名称：" >
        <el-input v-model="unitForm.unit_abbr" placeholder="单位简称" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="单位性质：">
        <el-radio-group v-model="unitForm.unit_type" style="display:inline-block;">
          <el-radio label="政府机构" name="unit_type" style="width:90px;margin-left: 5px;"></el-radio>
          <el-radio label="事业单位" name="unit_type" style="width:90px;margin-left: 5px;"></el-radio>
          <el-radio label="企业" name="unit_type" style="width:60px;margin-left: 5px;"></el-radio>
          <el-radio label="社会团体" name="unit_type" style="width:90px;margin-left: 5px;"></el-radio>
          <el-radio label="其他" name="unit_type" style="width:60px;margin-left: 5px;"></el-radio>
          <el-input v-if="unitForm.unit_type=='其他'" size="mini" v-model="unitForm.unit_type_other" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>
      </el-form-item>
      </el-form-item>
      <el-form-item label="单位地址：" >
        <el-input v-model="unitForm.unit_addr" placeholder="单位地址" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="主管部门：" >
        <el-input v-model="unitForm.competent_department" placeholder="主管部门名称" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="电话：" >
        <el-input v-model="unitForm.unit_phone" placeholder="单位电话" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="传真：" >
        <el-input v-model="unitForm.unit_fax" placeholder="单位传真" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码：" >
        <el-input v-model="unitForm.zip_code" placeholder="邮政编码：" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="网址：" >
        <el-input v-model="unitForm.website" placeholder="网址" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" >
        <el-input v-model="unitForm.email" placeholder="电子邮箱" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="负责人：" >
        <el-input v-model="unitForm.charge" placeholder="姓名" style="width:30%"></el-input>
        <el-input v-model="unitForm.charge_duty" placeholder="职务" style="width:30%"></el-input>
        <el-input v-model="unitForm.charge_person_phone" placeholder="电话" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" >
        <el-input v-model="unitForm.contacts_name" placeholder="姓名" style="width:30%"></el-input>
        <el-input v-model="unitForm.contacts_position" placeholder="职务" style="width:30%"></el-input>
        <el-input v-model="unitForm.contacts_phone" placeholder="电话" style="width:30%"></el-input>
      </el-form-item>
    </div>
    <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
      <h4 class="sub-title">从事网络信息技术情况</h4>
      </div>
      <el-form-item label="资质情况：">
        <el-input type="textarea" :rows="3" v-model="unitForm.unit_qualification" placeholder="获得相关资质的情况" class="set-input-width75"></el-input>
      </el-form-item>
      <el-form-item label="业绩情况：">
        <el-input type="textarea" :rows="3" v-model="unitForm.experience_achievements" placeholder="从事信息系统安全相关工作的经历和主要业绩" class="set-input-width75"></el-input>
      </el-form-item>
    </div>
    <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
      <h4 class="sub-title">基础设施</h4>
    </div>
      <el-form-item label="业务管理平台：">
        <el-checkbox-group v-model="configData.service_management_platform" style="display:inline-block; width:90%">
          <el-checkbox label="项目管理体系" name="service_management_platform" style="width:18%;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="设备管理体系" name="service_management_platform" style="width:18%;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="文档管理体系" name="service_management_platform" style="width:18%;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="人员管理体系" name="service_management_platform" style="width:18%;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="其他" name="service_management_platform" style="width:8%;margin-left: 5px;" @change="otherChange('other_service_management_platform')"></el-checkbox>
          <el-input v-if="configData.other_service_management_platform==true" size="mini" v-model="unitForm.service_management_platform_other" style="display:inline-block; width:10%"></el-input>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="测试实验环境：">
        <el-checkbox-group v-model="configData.test_experimental_environment" style="display:inline-block;">
          <el-checkbox label="安全功能测试平台" name="test_experimental_environment" style="width:200px;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="性能测试平台" name="test_experimental_environment" style="width:200px;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="业务仿真平台" name="test_experimental_environment" style="width:200px;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="渗透测试系统" name="test_experimental_environment" style="width:200px;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="其他" name="safety_guarantee_facilities" style="width:8%;margin-left: 5px;" @change="otherChange('other_test_experimental_environment')"></el-checkbox>
          <el-input v-if="configData.other_test_experimental_environment==true" size="mini" v-model="unitForm.test_experimental_environment_other" style="display:inline-block; width:10%"></el-input>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="安全保障设施：">
        <el-checkbox-group v-model="configData.safety_guarantee_facilities" style="display:inline-block; width:90%">
          <el-checkbox label="门禁监控系统" name="safety_guarantee_facilities" style="width:18%;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="消防灭火系统" name="safety_guarantee_facilities" style="width:18%;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="防盗报警系统" name="safety_guarantee_facilities" style="width:18%;margin-left: 5px;"></el-checkbox>
          <el-checkbox label="UPS供电系统" name="safety_guarantee_facilities" style="width:18%;margin-left: 5px;"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </div>
    <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
      <h4 class="sub-title">单位内部管理</h4>
    </div>
      <el-form-item label="内部管理制度："></br>
        <el-checkbox-group v-model="configData.management_system" style="display:inline-block">
          <div><el-checkbox label="《独立性、公正性和诚实性声明》" ></el-checkbox></div>
          <div><el-checkbox label="《保密管理制度》" ></el-checkbox></div>
          <div><el-checkbox label="《投诉、申诉和争议处理管理办法》" name="checkbox" ></el-checkbox></div>
          <div><el-checkbox label="《人员管理制度》" ></el-checkbox></div>
          <div><el-checkbox label="《项目管理制度》" ></el-checkbox></div>
          <div><el-checkbox label="《服务质量监督管理制度》" name="checkbox" ></el-checkbox></div>
          <div><el-checkbox label="《设备管理制度》" ></el-checkbox></div>
          <div><el-checkbox label="《档案管理制度》"></el-checkbox></div>
          <div><el-checkbox label="其他" @change="otherChange('other_management_system')">其他
          <el-input v-if="configData.other_management_system==true" size="mini" v-model="unitForm.management_system_other"></el-input>
          </el-checkbox></div>

        </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
      <h4 class="sub-title">申请附件表</h4>
      </div>
        <el-form-item label="附件：">
          <table>
            <tr>
              <td style="width:40%"><span>申报单位附件列表</span><a title="下载模板填写完整后，上传"><i class="el-icon-information"></i></a></td>
              <td style="width:30%"></td>
              <td style="width:350px"></td>
            </tr>
            <tr>
              <td><span>申报单位设备与设施情况表</span></td>
              <td>
                <el-upload ref="upload" action="/ssa/securityService/upLoad.do?path=filePath1&name=fileName1" :on-success="handleSuccess" :file-list="fileList1" :on-remove="handleRemove1">
                  <el-button slot="trigger" size="small" type="text"  v-show="unitForm.filePath1 == ''">+添加附件</el-button>
                </el-upload>
              </td>
              <td><span><a type="text" href="/ssa/securityService/downloadTemplate.do?fileName=securityService1.docx" class="dialog-downloadtext font-color">模板下载</a></span></td>
            </tr>
            <tr>
              <td><span>申报单位安全服务设备、工具配备情况表</span></td>
              <td>
                <el-upload ref="upload" action="/ssa/securityService/upLoad.do?path=filePath2&name=fileName2" :on-success="handleSuccess" :file-list="fileList2" :on-remove="handleRemove2">
                  <el-button slot="trigger" size="small" type="text" v-show="unitForm.filePath2 == ''">+添加附件</el-button>
                </el-upload>
              </td>
              <td><span><a type="text" href="/ssa/securityService/downloadTemplate.do?fileName=securityService2.docx" class="dialog-downloadtext font-color">模板下载</a></span></td>
            </tr>
            <tr>
              <td><span>申报单位安全服务人员汇总表（此表由等保办盖章）</span></td>
              <td>
                <el-upload ref="upload" action="/ssa/securityService/upLoad.do?path=filePath3&name=fileName3" :on-success="handleSuccess" :file-list="fileList3" :on-remove="handleRemove3">
                  <el-button slot="trigger" size="small" type="text" v-show="unitForm.filePath3 == ''">+添加附件</el-button>
                </el-upload>
              </td>
              <td><span><a type="text" href="/ssa/securityService/downloadTemplate.do?fileName=securityService3.docx" class="dialog-downloadtext font-color">模板下载</a></span></td>
            </tr>
          </table>
        </el-form-item>
          </div>
  <el-row>
    <el-col :span="12">
      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm('unittHandleForm')">提交</el-button> -->
        <el-button v-if="this.$route.params.handle =='add'" type="primary" @click="save('unitForm')">保存</el-button>
        <el-button v-if="this.$route.params.handle =='update'" type="primary" @click="save('unitForm')">修改</el-button>
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-form-item>
    </el-col>
  </el-row>

</el-form>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      unitForm: {
        unit_id:null,
        //受理单位
        accept_unit: "太原市公安局",
        //受理单位区号
        area_id:null,
        //申请单位
        apply_unit: "",
        //申请单位法人
        apply_corporation: "",
        //备案日期
        filing_date: null,
        //备案表编号
        record_code: "",
        //单位名称
        unit_name: "",
        //单位别名
        unit_abbr: "",
        //单位地址
        unit_addr: "",
        //邮编
        zip_code: "",
        unit_phone: "",
        unit_fax: "",
        website: "",
        email: "",
        //联系人姓名
        contacts_name: "",
        //联系人电话
        contacts_phone: "",
        //联系人职务
        contacts_position: "",
        //负责人姓名
        charger: "",
        //负责人部门职务
        charger_duty: "",
        //负责人办公电话
        charge_office_phone: "",
        //负责人移动电话
        charge_person_phone: "",
        //单位性质
        unit_type: "",
        //单位性质其他类型
        unit_type_other: "",
        unit_abstract: "",
        unit_qualification: "",
        experience_achievements: "",
        competent_department: "",
        service_management_platform: "",
        service_management_platform_other: "",
        safety_guarantee_facilities: "",
        safety_guarantee_facilities_other: "",
        test_experimental_environment: "",
        test_experimental_environment_other: "",
        management_system: "",
        management_system_other: "",
        infrastructure_info_attachment: "",
        equipments_and_tool_attachment: "",
        unit_persons_info_attachment: "",
        //用户id
        user_id:null,
        //附件
        filePath1:"",
        fileName1:"",
        filePath2:"",
        fileName2:"",
        filePath3:"",
        fileName3:"",
      },
      configData:{
        service_management_platform:[],
        other_service_management_platform :false,
        test_experimental_environment:[],
        other_test_experimental_environment :false,
        safety_guarantee_facilities:[],
        management_system:[],
        other_management_system:false,
      },
      categoryCheckbox: [],
      getDivisionsOptions: [],
      fileList1:[],
      fileList2:[],
      fileList3:[],
      rules: {
        // accept_unit: [{
        //   required: true,
        //   message: '请输入受理单位名称',
        //   trigger: 'blur'
        // }],
        //备案日期
        // filing_date: [{
        //     type: 'date',
        //     required: true,
        //     message: '请选择备案日期',
        //     trigger: 'change',
        // }],
      },
    }

  },

  methods: {

    save(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            // if (unitForm.filing_date != null && unitForm.filing_date != "") {
            // this.unitForm.filing_date = this.utils.formatDate(new Date(this.unitForm.filing_date), "yyyy-MM-dd")
            // }
            this.unitForm.service_management_platform = this.configData.service_management_platform.join(",");
            this.unitForm.test_experimental_environment = this.configData.test_experimental_environment.join(",");
            this.unitForm.safety_guarantee_facilities = this.configData.safety_guarantee_facilities.join(",");
            this.unitForm.management_system = this.configData.management_system.join(",");
            let data = await this.utils.reqBackState("/ssa/securityService/saveUnitInfo.do", this.unitForm, this);
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
    handleSuccess(response, file, fileList) {
       if (!response.state) {
        this.$alert(response.result.result, "消息");
       } else {
         this.unitForm[response.data.formPath]=response.data.filepath;
         this.unitForm[response.data.formName]=response.data.filename;
       }
    },
    handleRemove1(file, fileList) {
        this.unitForm.filePath1="";
        this.unitForm.fileName1="";
    },
    handleRemove2(file, fileList) {
        this.unitForm.filePath2="";
        this.unitForm.fileName2="";
    },
    handleRemove3(file, fileList) {
        this.unitForm.filePath3="";
        this.unitForm.fileName3="";
    },
    goBack() {
      this.$router.go(-1);
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



  },created:function(){
    if(this.$route.params.handle =='update'){
      var unit_id = this.$route.params.unit_id;
      var params = {};
      params.unit_id = unit_id;
      this.utils.req("/ssa/securityService/getUintForm.do", params, this).then(data => {
        this.unitForm = data;
        if(this.unitForm.service_management_platform != null && this.unitForm.service_management_platform != ""){
          if(this.unitForm.service_management_platform.indexOf("其他") >= 0)
          { this.configData.other_service_management_platform=true}
          this.configData.service_management_platform=this.unitForm.service_management_platform.split(",");}
        if(this.unitForm.test_experimental_environment != null && this.unitForm.test_experimental_environment != ""){
          if(this.unitForm.test_experimental_environment.indexOf("其他") >= 0)
          { this.configData.other_test_experimental_environment=true}
          this.configData.test_experimental_environment=this.unitForm.test_experimental_environment.split(",");}
        if(this.unitForm.safety_guarantee_facilities != null && this.unitForm.safety_guarantee_facilities != ""){
        this.configData.safety_guarantee_facilities=this.unitForm.safety_guarantee_facilities.split(",");}
        if(this.unitForm.management_system != null && this.unitForm.management_system != ""){
          if(this.unitForm.management_system.indexOf("其他") >= 0)
          { this.configData.other_management_system=true}
          this.configData.management_system=this.unitForm.management_system.split(",");}
        if(this.unitForm.fileName1 != null && this.unitForm.fileName1 != ""){
          this.fileList1=[{name:this.unitForm.fileName1,url:this.unitForm.filePath1,}];}
        if(this.unitForm.fileName2 != null && this.unitForm.fileName2 != ""){
          this.fileList1=[{name:this.unitForm.fileName2,url:this.unitForm.filePath2,}];}
        if(this.unitForm.fileName3 != null && this.unitForm.fileName3 != ""){
          this.fileList1=[{name:this.unitForm.fileName3,url:this.unitForm.filePath3,}];}
      });
    }

  }
}
</script>
