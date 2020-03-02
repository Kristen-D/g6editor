<template>
<div class="whitebackground Whitespace">
  <div class="top-title">{{title}}</div>

  <el-form class="form-contral" ref="eventHandleForm" :model="eventHandleForm" :rules="eventHandleRules" label-width="85px">
    <el-row>
      <el-col :span="12" :offset="1">
        <el-form-item label="事件名称" prop="event_handling_header">
          <el-input v-model="eventHandleForm.event_handling_header" style="width:415px;" placeholder="事件名称"></el-input>
        </el-form-item>

        <el-form-item label="等级" prop="event_level" clearable>
          <el-select v-model="eventHandleForm.event_level" placeholder="事件等级">
            <el-option label="一级" :value="1"></el-option>
            <el-option label="二级" :value="2"></el-option>
            <el-option label="三级" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="事件后果" prop="event_result" clearable>
          <el-select v-model="eventHandleForm.event_result" placeholder="事件后果">
            <el-option label="业务中断" :value="1"></el-option>
            <el-option label="系统破坏" :value="2"></el-option>
            <el-option label="数据丢失" :value="3"></el-option>
            <el-option label="其他" :value="4"></el-option>
          </el-select>
          <el-input v-show="eventHandleForm.event_result == 4" v-model="eventHandleForm.event_other_result" style="width:50%;" placeholder=其他></el-input>
        </el-form-item>



        <el-form-item label="影响范围" prop="affect_range" clearable>
          <el-select v-model="eventHandleForm.affect_range" placeholder="影响范围">
            <el-option label="全国" :value="1"></el-option>
            <el-option label="全行业" :value="2"></el-option>
            <el-option label="本地区" :value="3"></el-option>
            <el-option label="本单位" :value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="event_type">
          <el-select v-model="eventHandleForm.event_type1" clearable placeholder="事件类型" @change="securityEventType1Change">
            <el-option v-for="item in securityEventType1Options" :label="item.name" :value="item.id">
            </el-option>
          </el-select> ~
          <el-select v-model="eventHandleForm.event_type" placeholder="事件类型" clearable>
            <el-option v-for="item in securityEventType2Options" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处置人" prop="treat_principal">
          <el-select v-model="eventHandleForm.treat_principal" filterable  placeholder="处置人" clearable>
            <el-option v-for="item in treatPrincipalOptions" :label="item.username" :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="事发单位" prop="event_unit_id">

          <selectOrganization v-model="eventHandleForm.event_unit_id" :orgType="2" style="width:415px;" placeholder="请选择">
          </selectOrganization>


        </el-form-item>

        <el-form-item label="监管部门" prop="supervise_org_id">
          <el-select v-model="eventHandleForm.supervise_org_id" filterable filterable placeholder="监管部门" clearable>
            <el-option v-for="item in superviseOrgs" :label="item.name" :value="item.organization_id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发生时间">
          <el-date-picker v-model="eventHandleForm.event_time" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="eventHandleForm.event_desc" placeholder="（应包括事件发生时间、发生事故网络信息系统名称及运营使用管理单位、地点、原因、事件类型及性质、危害和损失程度、影响单位及业务等）" rows="5"></el-input>
        </el-form-item>




        <el-row>
          <el-col :span="16">
            <el-form-item>
              <el-button v-show="this.params.tkey != 'eventAdjustTask'" type="primary" @click="eventHandleFormSubmit('save')">保存</el-button>
              <el-button v-show="this.params.tkey != 'eventAdjustTask'" type="primary" @click="eventHandleFormSubmit('approve')">提交审批</el-button>
              <el-button v-show="this.params.tkey == 'eventAdjustTask'" type="primary" @click="eventAdjustTaskSubmit(false)">修改</el-button>
              <el-button v-show="this.params.tkey == 'eventAdjustTask'" type="gray" @click="eventAdjustTaskSubmit(true)">作废</el-button>
              <el-button type="gray" @click="goBack">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-col>
    </el-row>

  </el-form>


  <el-dialog title="单位基本信息" :visible.sync="dialogOrgVisible" width="85%">

    <el-form :inline="true" :model="eventHandleForm" label-position="right" label-width="120px">
      <el-form-item label="单位名称">
        <el-input v-model="eventHandleForm.orgName" :disabled="true" placeholder="单位名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="eventHandleForm.linkman" :disabled="true" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="eventHandleForm.phone" :disabled="true" placeholder="联系方式"></el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="eventHandleForm.email" :disabled="true" placeholder="邮箱"></el-input>
      </el-form-item>

      <el-form-item label="传真">
        <el-input v-model="eventHandleForm.fax" placeholder="传真"></el-input>
      </el-form-item>
      <el-form-item label="通讯地址">
        <el-input v-model="eventHandleForm.address" placeholder="通讯地址"></el-input>
      </el-form-item>

      <el-form-item label="系统名称">
        <el-input v-model="eventHandleForm.system_name" placeholder="信息系统（包括网站）名称"></el-input>
      </el-form-item>
      <el-form-item label="备案级别">
        <el-input v-model="eventHandleForm.record_level" placeholder="备案级别"></el-input>
      </el-form-item>

      <el-form-item label="域名">
        <el-input v-model="eventHandleForm.domain" placeholder="域名"></el-input>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="eventHandleForm.ip" placeholder="信息系统（包括网站）网络地址"></el-input>
      </el-form-item>

      <el-form-item label="用途描述">
        <el-input v-model="eventHandleForm.use_desc" placeholder="用途描述"></el-input>
      </el-form-item>
      <el-form-item label="数据库内容及数量">
        <el-input v-model="eventHandleForm.database_num" placeholder="数据库内容及数量"></el-input>
      </el-form-item>

      <el-form-item label="操作系统名称及版本">
        <el-input v-model="eventHandleForm.system_info" placeholder="操作系统名称及版本"></el-input>
      </el-form-item>
      <el-form-item label="服务器名称及版本">
        <el-input v-model="eventHandleForm.server_info" placeholder="服务器名称及版本"></el-input>
      </el-form-item>
      <el-form-item label="数据库名称及版本">
        <el-input v-model="eventHandleForm.database_version" placeholder="数据库名称及版本"></el-input>
      </el-form-item>

      <el-form-item label="第三方应用程序名称及版本">
        <el-input v-model="eventHandleForm.other_application" placeholder="第三方应用程序名称及版本"></el-input>
      </el-form-item>
      <el-form-item label="现有主要技术防护设备">
        <el-input v-model="eventHandleForm.major_equipment" placeholder="现有主要技术防护设备"></el-input>
      </el-form-item>

    </el-form>


    <div slot="footer" class="dialog-footer">
      <el-button @click="resetDetailForm()" type="gray">重置</el-button>
      <el-button type="primary" @click="dialogOrgVisible = false">确定</el-button>

    </div>
  </el-dialog>


</div>
</template>

<script>
import {mapState} from 'vuex'
import selectOrganization from 'components/selectOrganization/selectOrganization.vue'
export default {
  components:{
    selectOrganization
  },
  props:["params"],

  data() {
    return {
      title:"新建事件",
      dialogOrgVisible: false,
      //组织机构值
      handleOrg: "",
      //监管部门:
      superviseOrgs: [],
      treatPrincipalOptions: [],
      eventUnitOptions: [],
      securityEventType1Options: [],
      securityEventType2Options: [],
      treatPrincipalOptions: [],
      eventHandleForm: {
        event_handling_id: null,
        //事件名称
        event_handling_header: "",
        //事件等级
        event_level: null,
        event_type1: null,
        //事件类型
        event_type: null,
        //处置负责人
        treat_principal: "",
        //事发单位
        event_unit_id: null,
        //描述
        event_desc: "",
        //发生时间
        event_time: null,
        //事发单位负责人
        handling_owner: null,
        //监管部门负责人
        supervise_org_id: null,
        //传真
        fax: "",
        //通讯地址
        address: "",
        //系统名称
        system_name: "",
        //备案级别
        record_level: "",
        //域名
        domain: "",
        //IP地址
        ip: "",
        //用途描述
        use_desc: "",
        //数据库内容及数量
        database_num: "",
        //操作系统名称及版本
        system_info: "",
        //服务器名称及版本
        server_info: "",
        //数据库名称及版本
        database_version: "",
        //第三方应用程序名称及版本
        other_application: "",
        //现有主要技术防护设备
        major_equipment: "",

        //其他影响
        event_other_result: "",
        //影响范围
        affect_range: null,
        //事件结果
        event_result: null

      },
      eventHandleRules: {
        event_handling_header: [{
          required: true,
          message: '请输入事件名称',
          trigger: 'blur'
        }],
        event_level: [{
          type: 'number',
          required: true,
          message: '请选择等级',
          trigger: 'change'
        }],
        event_type: [{
          type: 'number',
          required: true,
          message: '请选择类型',
          trigger: 'change'
        }],
        treat_principal: [{
          type: 'number',
          required: true,
          message: '请选择处置人',
          trigger: 'change'
        }],
        supervise_org_id: [{
          type: 'number',
          required: true,
          message: '请选择监管部门',
          trigger: 'change'
        }],
        event_unit_id: [{
          required: true,
          type: 'number',
          message: '请选择事发单位',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    //获取事件类型子类型
    async securityEventType1Change(value) {
      this.eventHandleForm.event_type = null;
      var data = await this.utils.req("/ssa/eventMgmt/getSecurityEventTypeByPid.do", {
        pid: value
      }, this);
      this.securityEventType2Options = data;
    },
    //提交保存
    async eventHandleFormSubmit(type) {
      if (!this.utils.checkForm("eventHandleForm",this)) return;
      if (this.eventHandleForm.event_time != null && this.eventHandleForm.event_time != "") {
        this.eventHandleForm.event_time = this.utils.formatDate(new Date(this.eventHandleForm.event_time), "yyyy-MM-dd hh:mm:ss")
      }

      //制空其他具体事件后果
      if (this.eventHandleForm.event_result != 4) {
        this.eventHandleForm.event_other_result = "";
      }

      var msg;
      if (type == 'save') {
        //进行保存
        msg = await this.utils.req("/ssa/eventMgmt/saveEventHandleInfo.do", this.eventHandleForm, this);
      } else if (type == 'approve') {
        //保存并发起流程
        msg = await this.utils.req("/ssa/eventMgmt/startProcess.do", this.eventHandleForm, this);
      }
      this.$message({type: "success",message: msg});
      this.goBack();
    },

    //调整表单
    async eventAdjustTaskSubmit(cancelPass) {

      var taskId = this.$route.params.taskId;
      var params = {};
      params = this.eventHandleForm;
      params.taskId = taskId;
      params.cancelPass = cancelPass;
      if (!this.utils.checkForm("eventHandleForm",this)) return;
      if (this.eventHandleForm.event_time != null && this.eventHandleForm.event_time != "") {
        this.eventHandleForm.event_time = this.utils.formatDate(new Date(this.eventHandleForm.event_time), "yyyy-MM-dd hh:mm:ss")
      }


      var msg = await this.utils.req("/ssa/eventMgmt/completeEventAdjustTask.do", params, this);
      this.$message({type: "success",message: msg});
      this.goBack();
    },

    showOrgDetail() {
      // this.dialogOrgVisible = true;
      // var orgId = this.orgidsArr[this.orgidsArr.length - 1];
      // var org = this.orgMap[orgId];
      // this.eventHandleForm.orgName = org.label;
      // this.eventHandleForm.linkman = org.realname;
      // this.eventHandleForm.phone = org.phone;
      // this.eventHandleForm.email = org.email;
    },
    resetDetailForm() {
      this.eventHandleForm.fax = "",
        this.eventHandleForm.address = "",
        this.eventHandleForm.system_name = "",
        this.eventHandleForm.record_level = "",
        this.eventHandleForm.domain = "",
        this.eventHandleForm.ip = "",
        this.eventHandleForm.use_desc = "",
        this.eventHandleForm.database_num = "",
        this.eventHandleForm.system_info = "",
        this.eventHandleForm.server_info = "",
        this.eventHandleForm.database_version = "",
        this.eventHandleForm.other_application = "",
        this.eventHandleForm.major_equipment = ""
    },
    //改变组织机构后清空相关信息
    changeOrg(){
      this.resetDetailForm();
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: async function() {
    this.utils.req("/ssa/processMgmt/getPoliceUser.do", null, this).then(data =>{
        this.treatPrincipalOptions = data;
    });

    this.utils.req("/ssa/organization/getSuperviseOrganization.do").then(result => {
      this.superviseOrgs = result;
    });
    var securityEventType1 = await this.utils.req("/ssa/eventMgmt/getSecurityEventTypeByPid.do", {
      pid: -1
    }, this);
    this.securityEventType1Options = securityEventType1;
    //修改 或 调整
    if (this.params.handle == 'update' || this.params.tkey == 'eventAdjustTask' ) {
      this.title ="编辑事件";
      this.eventHandleForm = this.params;
      //this.eventHandleForm.orgidsArr =this.params.orgidsArr ;
      var event_type = this.params.event_type
      this.utils.req("/ssa/eventMgmt/getSecurityEventTypeById.do", {
        id: this.params.event_type
      }, this).then(data => {
        this.securityEventType2Options = data;
        this.eventHandleForm.event_type = event_type;
      });
    }
  }
}
</script>
