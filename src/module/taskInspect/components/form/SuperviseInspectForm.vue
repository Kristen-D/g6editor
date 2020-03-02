<template>
<!-- 审批表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">监督检查</div>
  <el-form class="form-contral" ref="superviseInspectForm" :model="superviseInspectForm" label-width="85px">
    <el-row>
      <h4 class="sub-title">检查内容</h4>
    </el-row>
    <br>
    <el-form-item label="">

      <el-checkbox-group v-model="checked_records" @change="handleCheckedCitiesChange">
        <div v-for="(item,index) in inspectionRecords">
          <div v-if="item.value %100 == 0">{{item.name}}</div>
          <el-checkbox v-else :label="item.value">{{item.name}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-form-item>
    <el-row>
      <h4 class="sub-title">情况说明</h4>
    </el-row>
    <br>
    <el-form-item label="">
      <el-input type="textarea" rows="5" v-model="superviseInspectForm.explaination"></el-input>
    </el-form-item>
  <el-form-item label="需要整改">
    <el-radio-group v-model="superviseInspectForm.rectificationPass">
    <el-radio :label="true">是</el-radio>
    <el-radio :label="false">否</el-radio>
  </el-radio-group>
  </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="superviseInspectTaskSubmit">提交</el-button>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      inspectionRecords: [],
      checked_records:[],
      superviseInspectForm: {
        task_inspect_id: null,
        inspection_records:"",
        explaination: "",
        rectificationPass:false
      }
    }
  },
  methods: {
    async superviseInspectTaskSubmit() {
      var taskId = this.params.taskId;
      var params = {};
      this.superviseInspectForm.inspection_records = this.checked_records.join(",");
      params = this.superviseInspectForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/taskInspect/completeSuperviseInspectTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: function() {
    this.superviseInspectForm.task_inspect_id = this.params.task_inspect_id;
    this.utils.req("/ssa/taskInspect/getInspectionRecords.do", null, this).then(result => {
      this.inspectionRecords = result;
    });
  }
}
</script>
