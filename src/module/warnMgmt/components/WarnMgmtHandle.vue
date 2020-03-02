<template>
<div>
  <el-row>
    <el-col :span="18" :offset="1">
      <mainForm ref="mainForm" v-show="this.$route.params.handle != 'view'"></mainForm>
       <warnMgmtInfo></warnMgmtInfo>
    </el-col>
  </el-row>

  <el-row v-show="this.$route.params.handle == 'view'">
    <br/>
    <el-col :span="18" :offset="2">
      <el-button type="gray" @click="goBack()">返回</el-button>
      <el-button   @click="exportView" type="primary">导出表单</el-button>
    </el-col>
  </el-row>
</div>
</template>
<script>
import warnMgmtInfo from './WarnMgmtInfo'
import mainForm from './form/MainForm'
export default {
  data(){
    return{
      formMap:{
        warnhandleInfoTask:"warnMgmtForm",
        alertTztask:"warnMgmtForm",
        alertFbtask:"warnMgmtFbForm",
        alertSptask:"warnMgmtAuditForm",
        alertFktask:"warnMgmtFeedBackForm",
        alertYztask:"warnMgmtYzForm",
        alertYzSptask:"warnMgmtYzSpForm",
        alertJctask:"warnMgmtJcForm"
      }
    }

  },
  components: {
    mainForm,
    warnMgmtInfo
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    exportView() {
      var alert_id = this.$route.params.alert_id;
      var param = "reportType=pdfForm&exportFileName=预警信息表单&alert_id="+alert_id;
    //  window.location.href = "/ssa/warnMgmt/exportReport.do?" + params;
      window.location.href = "/ssa/warnMgmt/downloadWord.do?" + param;
    },
    initForm(key){
      this.$refs["mainForm"].currentForm = this.formMap[key];
    }
  },
  mounted: function() {
    this.initForm(this.$route.params.tkey);
  }
}
</script>
