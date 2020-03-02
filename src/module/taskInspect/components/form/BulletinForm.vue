<template>
<!-- 下发通报表单-->
<div class="whitebackground Whitespace">
  <div class="top-title">下发通报</div>
  <el-form class="form-contral" ref="bulletinForm" :model="bulletinForm" :rules="bulletinRules" label-width="85px">

    <el-form-item label="通报单位">
      {{this.orgName}}
    </el-form-item>

    <!-- <el-form-item label="文号" required>
      <el-col :span="5">
        <el-form-item prop="word">
          公信安 通字【
          <el-input style="width:30%;" v-model="bulletinForm.word"></el-input>】
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item prop="num">
          第
          <el-input style="width:30%;" v-model="bulletinForm.num"></el-input> 号
        </el-form-item>
      </el-col>
    </el-form-item> -->


    <el-form-item label="通报依据" required>
      <el-col :span="11">
        <el-form-item prop="zg_word">
          《信息系统安全等级保护限期整改通知书》并公信安 限字【
          <el-input style="width:15%;" v-model="bulletinForm.zg_word"></el-input>】
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="zg_num">
          第<el-input style="width:15%;" v-model="bulletinForm.zg_num"></el-input> 号
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="通报事由">
      <el-input rows="5" type="textarea" v-model="bulletinForm.reason"></el-input>
    </el-form-item>


    <el-form-item label="通报时间">
      <el-date-picker type="date" placeholder="选择通报时间" v-model="bulletinForm.create_time"></el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="bulletinTaskSubmit">提交</el-button>
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
      orgName: "",
      bulletinForm: {
        task_inspect_id: null,
        // word: "",
        // num: "",
        zg_word: "",
        zg_num: "",
        reason: "",
        create_time: null
      },
      bulletinRules: {
        // word: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        // num: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        zg_word: [{required: true,message: '请输入文号'}],
        zg_num: [{required: true,message: '请输入文号'}]
      }
    }
  },
  methods: {

    async bulletinTaskSubmit() {
      if (!this.utils.checkForm("bulletinForm", this)) return;
    
      if (this.bulletinForm.create_time != null && this.bulletinForm.create_time != "") {
        this.bulletinForm.create_time = this.utils.formatDate(new Date(this.bulletinForm.create_time), "yyyy-MM-dd hh:mm:ss")
      }

      var taskId = this.params.taskId;
      var params = {};
      params = this.bulletinForm;
      params.taskId = taskId;
      var msg = await this.utils.req("/ssa/taskInspect/completeBulletinTask.do", params, this);
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
    this.orgName = this.params.orgName;
    this.bulletinForm.task_inspect_id = this.params.task_inspect_id;
  }
}
</script>
