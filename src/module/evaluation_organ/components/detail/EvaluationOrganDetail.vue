<template>
<div>
    <el-row>
      <h4 class="sub-title">信息系统</h4>
    </el-row>
    <br/>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>系统名称：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.sys_name}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>安全保护等级：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.info_sys_protec_level}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>备案证明编号：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.record_approval_code}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>测评结论：</div>
    </el-col>
    <el-col :span="16">
      <div v-if="evaluationDetail.evaluation_conclusion =='1'">符合</div>
      <div v-if="evaluationDetail.evaluation_conclusion =='0'">不符合</div>
    </el-col>
  </el-row>

  <el-row>
    <h4 class="sub-title">被测评单位</h4>
  </el-row>
  <br/>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>单位名称：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.unit_name}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>单位地址：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.unit_addr}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>邮政编码：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.zip_code}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>联系人：</div>
    </el-col>
    <el-col :span="16">
      <div>姓名：{{evaluationDetail.leader_name}}</div>
      <div>职务：{{evaluationDetail.leadership_position}}</div>
      <div>办公室电话：{{evaluationDetail.leader_office_phone}}</div>
      <div>电子邮箱：{{evaluationDetail.leader_email}}</div>
    </el-col>
  </el-row>

  <el-row>
    <h4 class="sub-title">测评单位</h4>
  </el-row>
  <br/>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>单位名称：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.organization_name}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>通信地址：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.mailing_addr}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>单位代码：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.unit_code}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>邮政编码：</div>
    </el-col>
    <el-col :span="16">
      <div>{{evaluationDetail.postcode}}</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>联系人：</div>
    </el-col>
    <el-col :span="16">
      <div>姓名：{{evaluationDetail.contact_name}}</div>
      <div>职务：{{evaluationDetail.contact_position}}</div>
      <div>部门：{{evaluationDetail.contact_department}}</div>
      <div>移动电话：{{evaluationDetail.contact_phone}}</div>
      <div>办公室电话：{{evaluationDetail.contact_office_phone}}</div>
      <div>电子邮箱：{{evaluationDetail.contact_mail}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>附件：</div>
    </el-col>
    <el-col :span="16">
      <a class="file m-r-18" v-show="evaluationDetail.attachment_filepath != null " >{{evaluationDetail.attachment_filename}}</a>
      <a v-show="evaluationDetail.attachment_filepath != null " @click="downloadFile()" class="download m-r-18">下载</a>
    </el-col>
  </el-row>
  <br/>

</div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  props: ["params"],
  computed: {
  },
  data() {
    return {
      evaluationDetail: {}
    }
  },
  methods:{
    downloadFile(){
      var params={};
      params.fileName=this.evaluationDetail.attachment_filename;
      params.filePath=this.evaluationDetail.attachment_filepath;
      this.$store.dispatch('downloadFile', [params]);
    }
  },
  created: async function() {
    this.evaluationDetail = await this.$store.dispatch('getEvaluationFormById', [this.params, this.params.tkey]);
  }
}
</script>
