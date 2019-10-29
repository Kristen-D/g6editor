<template>
  <!-- 整改通知详细信息-->
  <div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>案件名称:</div>
      </el-col>
      <el-col :span="16">
        <div>{{this.params.case_name}}</div>
      </el-col>
    </el-row>



    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>调查内容:</div>
      </el-col>
      <el-col :span="16">
      <div>{{caseInvestigateDetail.investigate_content}}</div>
      </el-col>
    </el-row>

    <el-row class="process-content" v-if="technicalList.length >0" :gutter="20">
      <el-col :span="4">
        <div>技术协查：</div>
      </el-col>
      <el-col :span="16">
        <div v-for="item in technicalList">
          <div @click="showTechnicalDetail(item)" style="color:#20A0FF;width:80%;line-height:24px;white-space:nowrap;text-overflow:ellipsis;word-break:break-all;overflow:hidden;display:inline-block;">{{item.technical_desc}} </div>
          <div style="line-height:24px;float:right;color:#8492A6">{{item.create_time}}</div>
        </div>
      </el-col>
    </el-row>


    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>附件：</div>
      </el-col>
      <el-col :span="16">
        <a class="file m-r-18" v-show="caseInvestigateDetail.attachment_filepath != null " >{{caseInvestigateDetail.attachment_filename}}</a>
        <a v-show="caseInvestigateDetail.attachment_filepath != null " @click="downloadFile()" class="download m-r-18">下载</a>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  props:["params"],
  data() {
    return {
      orgName:"",
      caseInvestigateDetail: {},
      technicalList:[]
    }
  },
  methods:{
    downloadFile() {
      var fileUrl = "/ssa/eventMgmt/downloadFile.do?taskId=" + this.params.taskId + "&taskName=" + this.params.tkey;
      window.location.href = fileUrl;
    },
    getTechnicalByBussiness() {
      var param = {};
      param.bussiness_type = "CASEINVESTIGATE_CASEINVESTIGATE";
      param.bussiness_id = this.params.case_id;
      this.utils.req("/ssa/technical/getTechnicalByBussiness.do", param, this).then(data => {
        this.technicalList = data;
      });
    },
  },
  created: async function() {
      this.caseInvestigateDetail = await this.$store.dispatch('getCaseInvestigateDetail', [this.params]);
      this.getTechnicalByBussiness();
  }
}
</script>
