<template>
<div class="whitebackground Whitespace">
  <div class="top-title">{{title}}</div>


  <el-form ref="technicalForm" :model="technicalForm" :rules="technicalFormRules" label-width="110px">

    <el-row>
      <el-col :span="9" :offset="1">
        <el-form-item label="协查单位" prop="feedback_unit" required>
          <el-select v-model="technicalForm.feedback_unit" filterable multiple  placeholder="协查单位">
            <el-option v-for="item in orgList" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="text" @click="selectAll">全选</el-button>
        </el-form-item>
        <el-form-item label="协查内容" prop="technical_desc" required>
          <el-input type="textarea" v-model="technicalForm.technical_desc"></el-input>
        </el-form-item>
        <el-form-item label="协查期限" required>
            <el-date-picker type="datetime" placeholder="选择协查期限" style="width:215px;" v-model="technicalForm.technical_limit_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="审批领导："  v-bind:disabled="disabledInput" v-show="this.params.tkey !='assistTzTask'">
          <el-select v-model="technicalForm.approver" placeholder="选择审批领导">
            <el-option v-for="item in leaderList" :key="item.user_id" :label="item.realname" :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协查任务来源" prop="technical_source" required>
          <el-input v-model="technicalForm.technical_source"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-show="this.params.tkey !='assistTzTask'" @click="formSubmit('save')">保存</el-button>
          <el-button type="primary" @click="formSubmit('approver')">提交审批</el-button>
          <!-- <el-button type="primary" @click="formSubmit('NoApprover')">不要审批</el-button> -->
          <el-button v-if="this.$route.params.tkey =='assistTzTask'" type="primary"
          @click="assistTzTaskSubmit(false)">作废</el-button>
          <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  props: ["params"],
  computed: {
    ...mapState({
      leaderList: state => state.context.leaderList,
      leaderMap: state => state.context.leaderMap,
      orgList: state => state.context.orgList,
      orgMap: state => state.context.orgMap
    })
  },
  data() {
    return {
      title:"新建任务",
      //检查事项
      radioValue: 1,
      disabledInput: false,
      required: true,
      technicalForm: {
        assist_code: null,
        org_id:"",
        feedback_unit: [],
        //协查内容
        technical_desc: "",
        //协查期限
        technical_limit_time:"",
        //协查任务来源
        technical_source: "",
        //审批人
        approver: null,
        tkey:""
      },
      technicalFormRules: {
        feedback_unit: [{
          type: 'array',
          required: true,
          message: '请选择协查单位',
          trigger: 'change'
        }],
        technical_desc: [{
          required: true,
          message: '请输入协查内容',
          trigger: 'blur'
        }],
        approver: [{
          type: 'number',
          required: false,
          message: '请选择审批人',
          trigger: 'change'
        }],
        technical_source: [{
          required: true,
          message: '请输入协查任务来源',
          trigger: 'blur'
        }]

      }
    }
  },
  methods: {
    checkForm(formName) {
      var flag = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    changeEvent() {
      if (this.radioValue == 1) {
        this.disabledInput = false;
        this.required = true;
      } else {
        this.disabledInput = true
        this.required = false;
      }
    },
    selectAll() {
      var tmpUnit = [];
      for (var i = 0; i < this.orgList.length; i++) {
        var j = parseInt(this.orgList[i].value);
        tmpUnit.push(j);
      }
        this.technicalForm.feedback_unit = tmpUnit;
    },
    async assistTzTaskSubmit(isPass) {
      var taskId = this.$route.params.taskId;
      var params = {};
      params = this.technicalForm;
      params.assist_code = this.$route.params.assist_code;
      params.type = "assistTzPass";
      params.isPass = isPass;
      params.spReason = "";
      params.taskId = taskId;
      var msg = await this.common.req("/ssa/technical/completealertNTzTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });

      this.$router.go(-1);
    },
    goBack() {
      this.$router.go(-1);
    },
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
    async formSubmit(type) {
        this.technicalForm.technical_limit_time = this.common.formatDate(new Date(this.technicalForm.technical_limit_time), "yyyy-MM-dd hh:mm:ss");
      if (!this.common.checkForm("technicalForm", this)) return;
      if(type=='save'){
          if (this.technicalForm.assist_code == null) {
            var msg = await this.common.req("/ssa/technical/saveTaskTechnical.do", this.technicalForm, this);
            this.$message({
              type: "success",
              message: msg
            });
          }else{
            var msg = await this.common.req("/ssa/technical/updatetechnicalInfo.do", this.technicalForm, this);
            this.$message({
              type: "success",
              message: msg
            });
          }
          this.$router.go(-1);
      }else{
        if (this.technicalForm.assist_code == null) {
          var msg = await this.common.req("/ssa/technical/addstartProcess.do", this.technicalForm, this);
          this.$message({
            type: "success",
            message: msg
          });
        }else{
            if (this.params.tkey =='assistTzTask'){
                var taskId = this.params.taskId;
                var params = {};
                params = this.technicalForm;
                params.assist_code = this.params.assist_code;
                params.type = "assistTzPass";
                params.isPass = true;
                params.spReason = "";
                params.taskId = taskId;
                var msg = await this.common.req("/ssa/technical/completealertTzTask.do", params, this);
                this.$message({
                  type: "success",
                  message: msg
                });
            }else{
              var msg = await this.common.req("/ssa/technical/addstartProcess.do", this.technicalForm, this);
              this.$message({
                type: "success",
                message: msg
              });
            }
        }
        this.$router.go(-1);
      }
    },
    downloadFile() {
      var params = {};
      params.tkey = "taskInspectTask";
      params.task_inspect_id = this.technicalForm.task_inspect_id;
      this.$store.dispatch('downloadFile', [params]);
    },
    async deleteFile() {
      var msg = await this.common.req("/ssa/taskInspect/deleteFile.do", {
        task_inspect_id: this.technicalForm.task_inspect_id
      }, this);
      this.$message({
        message: msg,
        type: 'success'
      });
      this.params.attachment_filepath = "";
    }
  },
  created: function() {
    //获取审批人
    if (this.params.handle == 'update') {
      this.title = "编辑任务";
      this.technicalForm.technical_desc = this.params.technical_desc;
      this.technicalForm.technical_source = this.params.technical_source;
      this.technicalForm.assist_code = this.params.assist_code;
      if (this.params.feedback_unit){
          var objOrg= this.params.feedback_unit.split(",");
          var tmporg =[];
          for (var i=0;i<objOrg.length;i++){
             var j=parseInt(objOrg[i]);
             tmporg.push(j);
          }
          //事发单位
          this.technicalForm.feedback_unit= tmporg;
        }
      this.technicalForm.tkey = this.params.tkey;
      this.technicalForm.technical_limit_time =this.params.technical_limit_time;
      this.technicalForm.org_id =this.params.org_id;
      this.technicalForm.approver =this.params.approver;
      //this.checkeItems = this.params.checkeItems;
    }

    this.common.req("/ssa/alertNotice/getLoginUserInfo.do", null, this).then(data => {
      this.technicalForm.org_id = data.org_id;
    });


  }
}
</script>
