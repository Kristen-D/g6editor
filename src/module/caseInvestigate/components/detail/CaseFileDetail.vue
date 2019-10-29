<template>
<div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>案件串并:</div>
    </el-col>
    <el-col :span="16">
      <div>
          <span v-for="item in this.caseRelated">
            {{item.case_name}}
          </span>
      </div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>人员信息:</div>
    </el-col>
    <el-col :span="16">
      <div>{{caseFileDetail.person_info}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>威胁目的:</div>
    </el-col>
    <el-col :span="16">
      <div>{{caseFileDetail.threat_target}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>威胁对象:</div>
    </el-col>
    <el-col :span="16">
      <div>{{caseFileDetail.threat_object}}</div>
    </el-col>
  </el-row>


  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>威胁方法:</div>
    </el-col>
    <el-col :span="16">
      <div>{{caseFileDetail.threat_method}}</div>
    </el-col>
  </el-row>

  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>有害资产:</div>
    </el-col>
    <el-col :span="16">
      <div>{{caseFileDetail.harmful_asset}}</div>
    </el-col>
  </el-row>


</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  props: ["params"],
  data() {
    return {
      caseRelated:null,
      caseFileDetail: {}
    }
  },
  created: async function() {

    this.caseFileDetail = await this.$store.dispatch('getCaseFileDetail', [this.params]);
    var param ={};
    param.case_id_related = this.caseFileDetail.case_id_related;
    this.utils.req("/ssa/caseInvestigate/getCaseInvestigateByCaseIds.do", param, this).then(data=>{
      this.caseRelated = data;
    });



  }
}
</script>
