<template>
<!--监管 部门调查报告 -->
<div class="whitebackground Whitespace">
  <div class="top-title">监管部门调查报告</div>
  <el-form class="form-contral" v-if=" this.$route.params.tkey == 'superviseTaskReportTask'" ref="superviseTaskReportForm" :model="superviseTaskReportForm"  label-width="85px">
    <el-form-item label="事件名称">
      {{this.params.event_handling_header}}
    </el-form-item>
    <el-form-item label="监管部门现场处置">
      <el-input placeholder="重要信息系统安全监管部门现场处置情况" v-model="superviseTaskReportForm.supervise_hanle_info"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="superviseTaskReportSubmit">提交</el-button>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props:["params"],
  data(){
    return {
      superviseTaskReportForm: {
        event_handling_id: null,
        supervise_hanle_info:""
      }
    }
  },
  methods:{

    //监督部门调查报告
    async superviseTaskReportSubmit() {
      if (!this.utils.checkForm("superviseTaskReportForm",this)) return;
      var params = {};
      params = this.superviseTaskReportForm;

      var taskId = this.params.taskId;
      params.tkey = this.params.tkey;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/eventMgmt/completeReportTask.do", params, this);
      this.$message({ type: "success", message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
    this.superviseTaskReportForm.event_handling_id = this.params.event_handling_id;
  }
}
</script>
