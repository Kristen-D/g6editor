<template>
<!-- 任务评价表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">事件归档</div>

  <el-form class="form-contral"  ref="eventtaskAssessmentTaskForm" :model="eventtaskAssessmentTaskForm" label-with="80px;">
    <el-form-item label="事件名称">
      {{this.params.event_handling_header}}
    </el-form-item>

    <el-form-item label="是否案件" required>
      <el-radio-group v-model="eventtaskAssessmentTaskForm.is_alarm">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="是否立案" required>
      <el-radio-group v-model="eventtaskAssessmentTaskForm.is_registration">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>



    <el-form-item label="处置评价">
      <el-input type="textarea" rows="5" v-model="eventtaskAssessmentTaskForm.assessment"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="eventtaskAssessmentTaskSubmit">提交</el-button>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
props:["params"],
data(){
  return{
    eventtaskAssessmentTaskForm: {
      event_handling_id: null,
      //是否立案
      is_alarm: false,
      //是否立案
      is_registration: false,
      //处置评价
      assessment: ""
    }
  }
},
methods:{
  async eventtaskAssessmentTaskSubmit() {
    var params = this.eventtaskAssessmentTaskForm;
    var taskId = this.params.taskId;
    params.taskId = taskId;
    var msg = await this.utils.req("/ssa/eventMgmt/completeEventTaskAssessment.do", params, this);
    this.$message({ type: "success", message: msg });
    this.goBack();
  },
  goBack() {
    this.$router.go(-1);
  },

},
created:function(){
  this.eventtaskAssessmentTaskForm.event_handling_id = this.params.event_handling_id;
}


}
</script>
