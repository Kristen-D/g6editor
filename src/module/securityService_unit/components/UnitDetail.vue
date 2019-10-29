<template>
<div class="whitebackground Whitespace alter-el-form">
  <div class="top-title">安服备案信息</div>
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
  <h4 class="sub-title">备案信息</h4>
</div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>受理单位：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.accept_unit}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>申报单位：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.apply_unit}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>申报单位法人：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.apply_corporation}}<a title="申报单位法定代表人/被授权人" style="width:10%"><i class="el-icon-information"></i></a></div>
    </el-col>
  </el-row>
  </div>
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
  <h4 class="sub-title">单位基本信息</h4>
  </div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>安服机构名称：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.unit_name}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>其他名称：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.unit_abbr}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>单位性质：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.unit_type}}</div>
    </el-col>
    <span v-if="unitDetail.unit_type=='其他'">-{{unitDetail.unit_type_other}}</span>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>单位地址：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.unit_addr}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>主管部门：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.competent_department}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>电话：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.unit_phone}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>传真：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.unit_fax}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>邮政编码：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.zip_code}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>网址：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.website}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>电子邮箱：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.email}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>负责人：</div>
    </el-col>
    <el-col :span="16">
      <div>姓名：{{unitDetail.charge}}&nbsp;职务：{{unitDetail.charge_duty}}&nbsp;电话：{{unitDetail.charge_person_phone}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>联系人：</div>
    </el-col>
    <el-col :span="16">
      <div>姓名：{{unitDetail.contacts_name}}&nbsp;职务：{{unitDetail.contacts_ship_position}}&nbsp;电话：{{unitDetail.contacts_phone}}</div>
    </el-col>
  </el-row>
</div>
<div class="el-sub-panel">
  <div class="el-sub-panel-heading">
  <h4 class="sub-title">从事网络信息技术情况：</h4>
</div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>资质情况：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.unit_qualification}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>业绩情况：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.experience_achievements}}</div>
    </el-col>
  </el-row>
</div>
<div class="el-sub-panel">
  <div class="el-sub-panel-heading">
  <h4 class="sub-title">基础设施</h4>
</div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>业务管理平台：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.service_management_platform}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>测试实验环境：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.test_experimental_environment}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>安全保障设施：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.safety_guarantee_facilities}}</div>
    </el-col>
  </el-row>
</div>
<div class="el-sub-panel">
  <div class="el-sub-panel-heading">
  <h4 class="sub-title">单位内部管理</h4>
</div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>内部管理制度：</div>
    </el-col>
    <el-col :span="16">
      <div>{{unitDetail.management_system}}</div>
    </el-col>
  </el-row>
  </div>
    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
  <h4 class="sub-title">申请附件表</h4>
  </div>
  <el-row class="process-content" :gutter="20">
    <a @click="downloadFile(unitDetail.filePath1,unitDetail.fileName1)" v-show="unitDetail.filePath1 != null && unitDetail.filePath1 !=''">{{unitDetail.fileName1}}</a>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <a @click="downloadFile(unitDetail.filePath2,unitDetail.fileName2)" v-show="unitDetail.filePath2 != null && unitDetail.filePath1 !=''">{{unitDetail.fileName2}}</a>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <a @click="downloadFile(unitDetail.filePath3,unitDetail.fileName3)" v-show="unitDetail.filePath3 != null && unitDetail.filePath1 !=''">{{unitDetail.fileName3}}</a>
  </el-row>
  </div>
  <el-form-item>
    <el-button type="gray" @click="goBack">返回</el-button>
  </el-form-item>
</div>
</template>

<script>
export default {

  data() {
    return {
      illegal_actions: [],
      unitDetail: {},
      configData: {
        biz_protect_level: [],
        sys_service_proect_level: [],
      },
    }
  },
  props: ["tkey"],

  methods: {
    downloadFile(path, name) {
      var fileUrl = "/ssa/securityService/downloadFile.do?filePath=" + path + "&fileName=" + name;
      window.location.href = fileUrl;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  watch: {},
  created: function() {
    var unit_id = this.$route.params.unit_id;
    var params = {};
    params.unit_id = unit_id;
    this.utils.req("/ssa/securityService/getUintForm.do", params, this).then(data => {
      this.unitDetail = data;
      if(this.unitDetail.management_system.IndexOf("其他") != -1){
        this.unitDetail.management_system.split("其他")[0];
        this.unitDetail.management_system.split("其他")[1];
      }
    });
  }
}
</script>

<style>

</style>
