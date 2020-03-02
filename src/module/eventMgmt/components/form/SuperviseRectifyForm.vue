<template>
  <!--督办整改表单 -->
  <div class="whitebackground Whitespace">
    <div class="top-title">督办整改</div>
    <el-form class="form-contral"  ref="superviseRectifyTaskForm" :model="superviseRectifyTaskForm" :rules="superviseRectifyRules" label-width="85px">
      <el-form-item label="事件名称">
        {{this.params.event_handling_header}}
      </el-form-item>
      <!-- <el-form-item label="文号" >
        <el-col :span="6">
          <el-form-item prop="word">
            公信安 限字【
            <el-input style="width:30%;" v-model.number="superviseRectifyTaskForm.word"  ></el-input>】
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="num">
            第
            <el-input style="width:30%;" v-model.number="superviseRectifyTaskForm.num"></el-input> 号
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item label="督查时间" prop="check_time">
        <el-date-picker type="date" placeholder="选择日期" v-model="superviseRectifyTaskForm.check_time"></el-date-picker>
      </el-form-item>
      <el-form-item label="违规行为" prop="illegal_actions">
        <el-checkbox-group v-model="superviseRectifyTaskForm.illegal_actions">
          <div v-for="item in superviseRectifyTaskForm.checkList">
            <el-checkbox :label="item.value" :key="item.value">{{item.name}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="违规描述" prop="illgal_desc">
        <el-input placeholder="具体的不符合行为描述" v-model="superviseRectifyTaskForm.illegal_desc"></el-input>
      </el-form-item>
      <el-form-item label="依照条例" prop="evidence">
        <el-input placeholder="选择或输入相关法规" v-model="superviseRectifyTaskForm.evidence"></el-input>
      </el-form-item>
      <el-form-item label="整改期限" prop="reform_time">
        <el-date-picker type="date" placeholder="选择日期" v-model="superviseRectifyTaskForm.reform_time"></el-date-picker>（前）
      </el-form-item>
      <el-form-item label="整改报告">
        <el-upload ref="superviseRectifyUpload" action="/ssa/eventMgmt/completeSuperviseRectifyTask.do" :on-success="handleSuccess" :data="superviseRectifyTaskForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="superviseRectifyTaskSubmit">提交</el-button>
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
      superviseRectifyTaskForm: {
        taskId: null,
        event_handling_id: null,
        // //字
        // word: "",
        // //号
        // num: "",
        //督查事件
        check_time: null,
        //督查时间
        //违规行为
        illegal_action: "",
        //违规描述
        illegal_desc: "",
        //依照条例
        evidence: "",
        //整改期限
        reform_time: null,
        checkList: [],
        illegal_actions: []
        //administrativePenaltyPass: false
      },
      superviseRectifyRules: {
        // word: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        // num: [{required: true,message: '请输入文号'},{ type: 'number', message: '请输入数字'}],
        check_time: [{
          type: 'date',
          required: true,
          message: '请选择督查时间',
          trigger: 'change'
        }],
        illegal_actions: [{
          type: 'array',
          required: true,
          message: '请至少选择一个违规行为',
          trigger: 'change'
        }],
        illegal_desc: [{
          required: true,
          message: '请输入违规描述',
          trigger: 'blur'
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
  methods:{

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
    //提交督办整改

    async superviseRectifyTaskSubmit() {
      if (!this.utils.checkForm("superviseRectifyTaskForm",this)) return;
      this.superviseRectifyTaskForm.check_time = this.utils.formatDate(new Date(this.superviseRectifyTaskForm.check_time), "yyyy-MM-dd hh:mm:ss");
      this.superviseRectifyTaskForm.reform_time = this.utils.formatDate(new Date(this.superviseRectifyTaskForm.reform_time), "yyyy-MM-dd hh:mm:ss");
      this.superviseRectifyTaskForm.illegal_action = this.superviseRectifyTaskForm.illegal_actions.join(",");

      var params = {};
      var taskId = this.$route.params.taskId;
      params = this.superviseRectifyTaskForm;
      params.taskId = taskId;
      params.bussiness_id = this.superviseRectifyTaskForm.event_handling_id;
      if (this.$refs["superviseRectifyUpload"].uploadFiles.length == 0) {
        var msg = await this.utils.req("/ssa/eventMgmt/completeSuperviseRectifyTask.do", params, this);
        this.$message({message: msg, type: 'success'});
        this.goBack();
      } else if (this.$refs["superviseRectifyUpload"].uploadFiles.length == 1) {
        this.$refs["superviseRectifyUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {type: "warning"});
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created:function(){
      this.superviseRectifyTaskForm.event_handling_id = this.params.event_handling_id;
      this.utils.req("/ssa/eventMgmt/getIllegalactoin.do").then(result => {
        this.superviseRectifyTaskForm.checkList = result;
      });
    }
}
</script>
