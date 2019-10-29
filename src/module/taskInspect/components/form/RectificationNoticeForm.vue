<template>
<!--通知整改表单 -->
<div>
  <el-form class="form-contral" ref="rectificationNoticeForm" :model="rectificationNoticeForm" :rules="rectificationNoticeRules" label-width="85px">
    <el-form-item label="被检查单位">
      {{this.orgName}}
    </el-form-item>
    <!-- <el-form-item label="文号" required>
      <el-col :span="5">
        <el-form-item prop="word">
          并公信安 限字【
          <el-input style="width:30%;" v-model.number="rectificationNoticeForm.word"></el-input>】
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item prop="num">
          第<el-input style="width:30%;" v-model.number="rectificationNoticeForm.num"></el-input> 号
        </el-form-item>
      </el-col>
    </el-form-item> -->
    <el-form-item label="督查时间" prop="check_time">
      <el-date-picker type="date" placeholder="选择日期" v-model="rectificationNoticeForm.check_time"></el-date-picker>
    </el-form-item>
    <el-form-item label="违规行为" prop="checkedList">
      <el-checkbox-group v-model="rectificationNoticeForm.checkedList">
        <div v-for="item in checkList">
          <el-checkbox :label="item.value" >{{item.name}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="违规描述" >
      <el-input placeholder="具体的不符合行为描述" v-model="rectificationNoticeForm.illgal_desc"></el-input>
    </el-form-item>
    <el-form-item label="依照条例" prop="evidence">
      <el-input placeholder="输入相关法规" v-model="rectificationNoticeForm.evidence"></el-input>
    </el-form-item>
    <el-form-item label="整改期限" prop="reform_time">
      <el-date-picker type="date" placeholder="选择日期" v-model="rectificationNoticeForm.reform_time"></el-date-picker>（前）
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="rectificationNoticeTaskSubmit">提交</el-button>
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
      orgName:"",
      checkList: [],
      rectificationNoticeForm: {
        task_inspect_id: null,
        companyRcv:null,
        checkedList: [],
        illegal_action: "",
        // word: null,
        // num: null,
        check_time: null,
        illgal_desc: "",
        evidence: "",
        reform_time: null
      },
      rectificationNoticeRules:{
        // word: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        // num: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        check_time: [{
          type: 'date',
          required: true,
          message: '请选择督查时间',
          trigger: 'change'
        }],
        checkedList: [{
          type: 'array',
          required: true,
          message: '请至少选择一个违规行为',
          trigger: 'change'
        }],
        evidence: [{
          required: true,
          message: '请输入依照条例',
          trigger: 'blur'
        }],
        reform_time: [{
          type: 'date',
          required: true,
          message: '请选择整改期限',
          trigger: 'change'
        }]

      }
    }
  },
  methods: {
    async rectificationNoticeTaskSubmit() {
      if(!this.utils.checkForm("rectificationNoticeForm",this))return;
      var taskId = this.params.taskId;
      var params = {};
      this.rectificationNoticeForm.illegal_action =  this.rectificationNoticeForm.checkedList.join(",");

      if (this.rectificationNoticeForm.reform_time != null && this.rectificationNoticeForm.reform_time != "") {
        this.rectificationNoticeForm.reform_time = this.utils.formatDate(new Date(this.rectificationNoticeForm.reform_time), "yyyy-MM-dd hh:mm:ss")
      }

      if (this.rectificationNoticeForm.check_time != null && this.rectificationNoticeForm.check_time != "") {
        this.rectificationNoticeForm.check_time = this.utils.formatDate(new Date(this.rectificationNoticeForm.check_time), "yyyy-MM-dd hh:mm:ss")
      }

      params = this.rectificationNoticeForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/taskInspect/completeRectificationNoticeTask.do", params, this);
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
  created: async function() {
    this.orgName =  this.params.orgName;
    this.rectificationNoticeForm.task_inspect_id = this.params.task_inspect_id;
    //单位联系人
    this.rectificationNoticeForm.companyRcv = this.params.companyRcv;
    this.checkList = await this.$store.dispatch('getIllegalaction');
  }
}
</script>
