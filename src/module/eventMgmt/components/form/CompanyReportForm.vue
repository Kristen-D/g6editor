<template>
  <!-- 单位报告表单-->

  <div class="whitebackground Whitespace">
    <div class="top-title">单位调查报告</div>

    <el-form class="form-contral"  ref="companyReportTaskForm" :model="companyReportTaskForm" :rules="companyReportRules" label-width="85px">
      <el-form-item label="事件名称">
        {{this.params.event_handling_header}}
      </el-form-item>

      <el-form-item label="事件概况">
        <el-input placeholder="备注内容" v-model="companyReportTaskForm.comment"></el-input>
      </el-form-item>

      <el-form-item label="事发单位现场处置" prop="unit_handle_info">
        <el-input type="textarea" rows="5" v-model="companyReportTaskForm.unit_handle_info" placeholder="事发单位现场处置情况"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="companyReportTaskSubmit">提交</el-button>
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
      companyReportTaskForm: {
        event_handling_id: null,
        unit_handle_info: "",
        comment: ""
      },
      companyReportRules: {
        unit_handle_info: [{
          required: true,
          message: '请输入事发单位现场处置情况',
          trigger: 'blur'
        }]
      },
    }
  },
  methods:{

    //一般事件调查报告提交
    async companyReportTaskSubmit() {
      if (!this.utils.checkForm("companyReportTaskForm",this)) return;
      var params = {};
      params = this.companyReportTaskForm;

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

    this.companyReportTaskForm.event_handling_id = this.params.event_handling_id;
  }
}
</script>
