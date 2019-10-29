<template>
  <!-- 行政处罚-->
  <div class="whitebackground Whitespace">
    <div class="top-title">行政处罚</div>
<el-form class="form-contral" ref="administrativePenaltyForm" :model="administrativePenaltyForm" :rules="administrativePenaltyRules" label-width="85px">

  <el-form-item label="事件名称">
    {{this.params.event_handling_header}}
  </el-form-item>

  <el-form-item label="事发单位">
     {{this.params.unit_name}}
  </el-form-item>
  <!-- <el-form-item label="文号" required>
    <el-col :span="6">
      <el-form-item prop="word">
        并公行罚决字【<el-input style="width:30%;" v-model.number="administrativePenaltyForm.word"></el-input>】
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item prop="num">
        第
        <el-input style="width:30%;" v-model.number="administrativePenaltyForm.num"></el-input> 号
      </el-form-item>
    </el-col>
  </el-form-item> -->





  <el-form-item label="处罚文书" prop="attachment_desc">
    <el-upload ref="administrativePenaltyUpload" action="/ssa/eventMgmt/completeAdministrativePenaltyTask.do" :on-success="handleSuccess" :data="administrativePenaltyForm" :auto-upload="false">
      <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
    </el-upload>
    <el-input type="textarea" rows="5" v-model="administrativePenaltyForm.attachment_desc" placeholder="违法行为人（姓名、性别、年龄、出生日期、身份证种类及号码、户籍所在地、现住址、工作单位、违法经历以及被处罚单位的名称、地址和法定代表人）"></el-input>
  </el-form-item>


  <el-form-item label="依照条例">
    <el-input placeholder="选择或输入相关法规" v-model="administrativePenaltyForm.penalized_reason"></el-input>
  </el-form-item>

  <el-form-item label="处罚类型">
    <el-input placeholder="处罚类型" v-model="administrativePenaltyForm.penalized_type"></el-input>
  </el-form-item>

  <el-form-item label="执行方式">
    <el-input placeholder="执行方式" v-model="administrativePenaltyForm.execution"></el-input>
  </el-form-item>

  <el-form-item label="执行期限">
    <el-date-picker type="date" placeholder="执行期限" v-model="administrativePenaltyForm.penalized_time"></el-date-picker>
  </el-form-item>


  <el-form-item label="复议单位">
    <el-input placeholder="复议单位" v-model="administrativePenaltyForm.reconsider"></el-input>
  </el-form-item>

  <el-form-item label="诉讼法院">
    <el-input placeholder="诉讼法院" v-model="administrativePenaltyForm.court"></el-input>
  </el-form-item>



  <el-form-item>
    <el-button type="primary" @click="administrativePenaltySubmit">提交</el-button>
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
      administrativePenaltyForm: {
        event_handling_id: null,
        // //文
        // word: "",
        // //号
        // num: "",
        //处罚文书
        attachment_desc: "",
        //依据条例
        penalized_reason: "",
        //处罚类型
        penalized_type: "",
        //执行方式
        execution: "",
        //执行期限
        penalized_time: null,
        //复议单位
        reconsider: "",
        //诉讼法院
        court: ""
      },
      administrativePenaltyRules: {
        // word: [{
        //   required: true,
        //   message: '请输入文号'
        // },{ type: 'number', message: '请输入数字'}],
        // num: [{
        //   required: true,
        //   message: '请输入文号'
        // },{ type: 'number', message: '请输入数字'}],
        attachment_desc: [{
          required: true,
          message: '请输入处罚文书',
          trigger: 'blur'
        }]
      },
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.message, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.goBack();
      }
    },
    //提交行政处罚
    async administrativePenaltySubmit() {
      if (!this.utils.checkForm("administrativePenaltyForm", this)) return;
      if(this.administrativePenaltyForm.penalized_time !=null && this.administrativePenaltyForm.penalized_time !="" ){
          this.administrativePenaltyForm.penalized_time = this.utils.formatDate(new Date(this.administrativePenaltyForm.penalized_time), "yyyy-MM-dd hh:mm:ss");
      }

      var params = {};
      var taskId = this.params.taskId;

      params = this.administrativePenaltyForm;
      params.taskId = taskId;
      if (this.$refs["administrativePenaltyUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/eventMgmt/completeAdministrativePenaltyTask.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      } else if (this.$refs["administrativePenaltyUpload"].uploadFiles.length == 1) {
        this.$refs["administrativePenaltyUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
      this.administrativePenaltyForm.event_handling_id = this.params.event_handling_id;
  }

}
</script>
