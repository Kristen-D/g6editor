<template>
  <div class="whitebackground Whitespace alter-el-form" v-if="this.tkey == 'Unit_Check' || this.tkey == 'Unit_Issued' || this.$route.params.tkey== 'Unit_Check' || this.$route.params.tkey == 'Unit_Issued' || this.$route.params.handle == 'view'">
    <div class="top-title">备案单位信息</div>
    <div class="el-sub-panel">
        <div class="el-sub-panel-heading">
          <h4 class="sub-title">备案单位</h4>
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
        <div>信息用途：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.info_usage}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>备案编号：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.record_code}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>备案时间：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.filing_date}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>受理时间：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.accept_date}}</div>
      </el-col>
    </el-row>
    </div>
    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">基本信息</h4>
    </div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>单位名称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>单位简称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.unit_abbr}}</div>
      </el-col>
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
        <div>邮编：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.zip_code}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>行政区划：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.admin_divisions_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>单位ip：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.unit_ip}}</div>
      </el-col>
    </el-row>
  </div>
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
    <h4 class="sub-title">单位负责人</h4>
    </div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>姓名：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.leader_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>职务/职称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.leadership_position}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>单位电话：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.leader_office_phone}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>电子邮箱：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.leader_email}}</div>
      </el-col>
    </el-row>
  </div>
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
    <h4 class="sub-title">责任部门</h4>
    </div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>责任部门：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.responsible_department}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>责任人：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.charger}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>职务/职称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.charger_duty}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>单位电话：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.charge_office_phone}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>移动电话：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.charge_person_phone}}</div>
      </el-col>
    </el-row>
  </div>
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
    <h4 class="sub-title">其他信息</h4>
    </div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>隶属关系：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.affiliation}}</div>
      </el-col>
      <span v-if="unitDetail.affiliation=='其他'">-{{unitDetail.other_affiliation}}</span>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>单位类型：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.unit_type}}</div>
      </el-col>
      <span v-if="unitDetail.unit_type=='其他'">-{{unitDetail.other_unit_type}}</span>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>行业类别：</div>
      </el-col>
      <el-col :span="16">
        <div>{{unitDetail.industry_category_name}}</div>
      </el-col>
      <span v-if="unitDetail.industry_category_name=='其他'">-{{unitDetail.other_category}}</span>
    </el-row>
    </div>
    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">信息系统提交材料</h4>
      </div>
      <el-row class="process-content" :gutter="20">
      <el-col :span="10">
        <div><a v-show="unitDetail.attachment_filepath != null && unitDetail.attachment_filepath != ''" class="file m-r-18">{{unitDetail.attachment_filename}}</a>
        <a v-show="unitDetail.attachment_filepath != null && unitDetail.attachment_filepath != ''" @click="downloadFile(unitDetail.attachment_filename,unitDetail.attachment_filepath)" class="download m-r-18">下载</a>
      </div>
      </el-col>
      </el-row>
    </div>
    </div>

</template>

<script>
export default {

  data() {
    return {
      illegal_actions: [],
      unitDetail: {},
    }
  },
  props: ["tkey"],

  methods: {
    downloadFile(fileName,filePath){
      var params={};
      params.fileName=fileName;
      params.filePath=filePath;
      this.$store.dispatch('downloadFile', [params]);
    },
  },
  watch: {},
  created: function() {
    var unit_id = this.$route.params.unit_id;
    var params = {};
    params.unit_id = unit_id;
    this.utils.req("/ssa/classifiedP/getUintForm.do", params, this).then(data => {
      this.unitDetail = data;
    });
  }
}
</script>

<style>

</style>
b
