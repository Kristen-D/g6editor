<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">{{title}}</div>

  <el-form class="form-contral" ref="investigateForm" :model="investigateForm" :rules="investigateRules" label-width="85px">
    <el-row>
      <h4 class="sub-title">基础信息</h4>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="1">
        <el-form-item label="案件名称" prop="case_name">
          <el-input v-model="investigateForm.case_name"></el-input>
        </el-form-item>



        <el-form-item label="案发单位" prop="case_orgId">
          <selectOrganization v-model="investigateForm.case_orgId" :orgType="2" :size="25" placeholder="请选择"></selectOrganization>


        </el-form-item>

        <el-form-item label="案件类型" prop="case_type">
          <el-select v-model="investigateForm.case_type" clearable placeholder="请选择案件类型">
            <el-option v-for="item in caseTypes" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="案件等级" prop="case_level">
          <el-select v-model="investigateForm.case_level" clearable placeholder="请选择案件等级">
            <el-option label="一级" :value="1"></el-option>
            <el-option label="二级" :value="2"></el-option>
            <el-option label="三级" :value="3"></el-option>
          </el-select>
        </el-form-item>





        <el-form-item label="来源">
          <el-input v-model="investigateForm.case_source" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row v-if="investigateForm.event_handling_id != null">
      <h4 class="sub-title">关联事件</h4>
    </el-row>

    <el-row v-if="investigateForm.event_handling_id != null">
      <el-col :span="8" :offset="1">

        <el-form-item label="事件名称">
          <el-button type="text" @click="showEvent()">{{this.event_info.event_handling_header}}</el-button>

        </el-form-item>
        <el-form-item label="事件类型">
          {{this.event_info.event_type_name}}
        </el-form-item>


        <el-form-item label="事件等级">
          {{this.event_info.eventLevel}}
        </el-form-item>

      </el-col>
    </el-row>


    <el-row>
      <h4 class="sub-title">攻击信息</h4>
    </el-row>

    <el-row>
      <el-col :span="8" :offset="1">
        <el-form-item label="源IP">
          <el-input v-model="investigateForm.srcIp"></el-input>
        </el-form-item>

        <el-form-item label="源端口">
          <el-input v-model="investigateForm.srcPort"></el-input>
        </el-form-item>

        <el-form-item label="目的IP">
          <el-input v-model="investigateForm.destIp"></el-input>
        </el-form-item>

        <el-form-item label="目的端口">
          <el-input v-model="investigateForm.destPort"></el-input>
        </el-form-item>

        <el-form-item label="协议">
          <el-select v-model="investigateForm.protocols" multiple placeholder="协议">
            <el-option v-for="item in protocols" :label="item.name" :key="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备名">
          <el-input v-model="investigateForm.device_name"></el-input>
        </el-form-item>

        <el-form-item label="设备类型">
          <el-select v-model="investigateForm.device_types" multiple placeholder="设备类型">
            <el-option v-for="item in deviceTypes" :label="item.name" :key="item.value" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>


      </el-col>
    </el-row>
    <el-row v-show="this.params.tkey != 'caseAdjustTask'" >
      <h4 class="sub-title">审批人</h4>
    </el-row>

    <el-row>
      <el-col :span="8" :offset="1">
        <el-form-item label="审批人" prop="approver" v-show="this.params.tkey != 'caseAdjustTask'" >
          <el-select v-model="investigateForm.approver" clearable filterable placeholder="请选择审批人">
            <el-option v-for="item in leaderList" :label="item.realname" :value="item.user_id"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button v-show="this.params.tkey != 'caseAdjustTask'" type="primary" @click="investigateFormSubmit('save')">{{handleText}}</el-button>
          <el-button v-show="this.params.tkey != 'caseAdjustTask'" type="primary" @click="investigateFormSubmit('approve')">提交审核</el-button>
          <el-button v-show="this.params.tkey == 'caseAdjustTask'" type="primary" @click="caseAdjustTaskSubmit(false)">修改</el-button>
          <el-button v-show="this.params.tkey == 'caseAdjustTask'" type="gray" @click="caseAdjustTaskSubmit(true)">作废</el-button>
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
import selectOrganization from 'components/selectOrganization/selectOrganization.vue'
export default {
  components: {
    selectOrganization
  },
  props: ["params"],
  data() {
    return {
      title: "新建案件",
      handleText: "保存",
      event_info: {},
      investigateForm: {
        event_handling_id: null,
        approver: null,
        case_name: "",
        case_orgId: null,
        case_level: null,
        case_type: "",
        case_source: "",
        srcIp: "",
        srcPort: "",
        destIp: "",
        destPort: "",
        protocol: "",
        protocols: [],
        device_name: "",
        device_type: "",
        device_types: []
      },
      investigateRules: {
        case_name: [{
          required: true,
          message: '请输入案件名称',
          trigger: 'blur'
        }],
        case_type: [{
          required: true,
          message: '请选择案件类型',
          trigger: 'change'
        }],
        approver: [{
          type: 'number',
          required: true,
          message: '请选择审批人',
          trigger: 'change'
        }],
        case_orgId: [{
          type: 'number',
          required: true,
          message: '请选择案发单位',
          trigger: 'change'
        }],
        case_level: [{
          type: 'number',
          required: true,
          message: '请选择案件等级',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      leaderList: state => state.process.leaderList,
      protocols: state => state.process.protocols,
      deviceTypes: state => state.process.deviceTypes,
      orgList: state => state.process.orgList,
      caseTypes: state => state.process.caseTypes
    })
  },
  methods: {


    //调整表单
    async caseAdjustTaskSubmit(cancelPass) {
      if (!this.utils.checkForm("investigateForm", this)) return;
      this.investigateForm.protocol = this.investigateForm.protocols.join(",");
      this.investigateForm.device_type = this.investigateForm.device_types.join(",");
      var taskId = this.params.taskId;
      var params = {};
      params = this.investigateForm;
      params.taskId = taskId;
      params.cancelPass = cancelPass;
      var msg = await this.utils.req("/ssa/caseInvestigate/completeCaseAdjustTask.do", params, this);
      this.$message({type: "success",message: msg});
      this.goBack();
    },

    async investigateFormSubmit(type) {
      if (!this.utils.checkForm("investigateForm", this)) return;
      this.investigateForm.protocol = this.investigateForm.protocols.join(",");
      this.investigateForm.device_type = this.investigateForm.device_types.join(",");
      var taskId = this.params.taskId;
      var params = {};
      params = this.investigateForm;
      params.taskId = taskId;

      var msg;
      if (type == 'save') {
        //进行保存
        msg = await this.utils.req("/ssa/caseInvestigate/saveCaseInvestigate.do", params, this);
      } else if (type == 'approve') {
        //保存并发起流程
        msg = await this.utils.req("/ssa/caseInvestigate/startProcess.do", params, this);
      }
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    showEvent() {

      this.$router.push({
        name: "eventMgmtHandle",
        params: this.event_info
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: function() {
    this.investigateForm.case_source = "手动填写";
    if (this.params.handle == 'update' || this.params.tkey == 'caseAdjustTask') {
      this.title = "编辑案件";
      this.handleText = "修改";
      this.investigateForm = { ...this.params
      };
      if (this.investigateForm.event_handling_id != null) {
        this.utils.req("/ssa/caseInvestigate/getEventHandleInfoById.do", {
          event_handling_id: this.investigateForm.event_handling_id
        }, this).then(data => {
          this.event_info = data;
        })
      }
    }
  }

}
</script>
