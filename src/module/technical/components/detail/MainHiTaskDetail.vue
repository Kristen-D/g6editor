<template>
<div class="whitebackground Whitespace">
  <div class="top-title">任务详情</div>
  <el-row style="margin-top:10px;">
    <el-col :span="18" :offset="1">
      <el-row>
        <mainDetail ref="taskHiDetail" style="margin-bottom:20px;" >
        </mainDetail>

      </el-row>
      <el-row>
        <technicalInfo></technicalInfo>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="18" :offset="2">
      <br/>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-col>
  </el-row>

</div>
</template>

<script>
import technicalInfo from '../TechnicalInfo'
import mainDetail from './MainDetail'
export default {
  components: {
    technicalInfo,
    mainDetail

  },
  data() {
    return {
      tkey: "",
      detailMap:{
        technicalTask:"technicalDetail",
        assistTzTask:"technicalDetail",
        assistSpTask:"technicalAduitDetail",
        assistFKTask:"technicalFeedbackDetail",
        assistEndTask:"technicalCheckDetail"
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted: async function() {
    if (this.$route.params.tkey != null) {
      var params = {};
      this.tkey = this.$route.params.tkey;
      params.taskId = this.$route.params.taskId;
      params.processInstanceId = this.$route.params.processInstanceId;
      params.assist_code = this.$route.params.assist_code;
      //params.orgName = this.$route.params.orgName;
      var detail = this.$refs["taskHiDetail"];
      detail.currentDetail = this.detailMap[this.tkey];
      params.tkey = this.tkey;
      detail.params = params;
    }
  }
}
</script>

<style>

</style>
