<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">处置审批</div>

  <el-form class="form-contral" ref="eventAduitTaskForm" :model="eventAduitTaskForm" label-width="85px">
    <el-form-item label="事件名称">
      {{this.params.event_handling_header}}
    </el-form-item>
    <el-form-item label="是否通过" required>
      <el-radio-group v-model="eventAduitTaskForm.eventAduitPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="审核意见">
      <el-input type="textarea" rows="5" v-model="eventAduitTaskForm.reason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="eventAduitTaskSubmit">提交</el-button>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props:["params"],
  data() {
    return {
      eventAduitTaskForm: {
        event_handling_id: null,
        eventAduitPass: false,
        reason: ""
      }
    }
  },
  methods:{
    //事件审核表单提交
    async eventAduitTaskSubmit() {
      var taskId = this.params.taskId;
      var params = {};
      params = this.eventAduitTaskForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/eventMgmt/completeEventAduitTask.do", params, this);
      this.$message({ type: "success",   message: msg });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>
