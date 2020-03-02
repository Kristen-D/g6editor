<!--技术协查模块 -->
<template>
<el-dialog title="技术协查" :visible.sync="technicalVisible" width="85%" :before-close="closeDialog">


  <el-form ref="technicalForm" :model="technicalForm" :rules="technicalFormRules" label-width="110px">

    <el-row>
      <el-col :span="9" :offset="1">
        <el-form-item label="协查单位" prop="feedback_unit" required>
          <el-select v-model="technicalForm.feedback_unit" filterable multiple placeholder="协查单位">
            <el-option v-for="item in orgList" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="text" @click="selectAll">全选</el-button>
        </el-form-item>

        <el-form-item label="协查期限" prop="technical_limit_time">
          <el-date-picker type="datetime" placeholder="选择协查期限" style="width:215px;" v-model="technicalForm.technical_limit_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="审批领导："prop="approver">
          <el-select v-model="technicalForm.approver" placeholder="选择审批领导">
            <el-option v-for="item in leaderList" :key="item.user_id" :label="item.realname" :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协查任务来源" prop="technical_source" required>
          <el-input v-model="technicalForm.technical_source"></el-input>
        </el-form-item>

        <el-form-item label="协查内容" prop="technical_desc" required>
          <el-input type="textarea" rows="5" v-model="technicalForm.technical_desc"></el-input>
        </el-form-item>

        <el-form-item>


          <!-- <el-button  type="primary" @click="assistTzTaskSubmit(false)">作废</el-button> -->
          <!-- <el-button type="gray" @click="goBack">返回</el-button> -->
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>




  <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog()">取 消</el-button>
    <el-button type="primary" @click="formSubmit('save')">保存</el-button>
    <el-button type="primary" @click="formSubmit('approver')">提交审批</el-button>
  </span>
</el-dialog>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  props: ["taskName","id","src"],
  computed: {
    ...mapState({
      technicalVisible: state => state.process.technicalVisible,
    })
  },
  data() {
    return {
      title: "新建任务",
      //检查事项
      radioValue: 1,

      required: true,
      technicalForm: {
        orgList: [],
        assist_code: null,
        org_id: "",
        feedback_unit: [],
        //协查内容
        technical_desc: "",
        //协查期限
        technical_limit_time: "",
        //协查任务来源
        technical_source: "",
        //审批人
        approver: null,
        bussiness_id: null,
        bussiness_type: ""
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
    getTechnical(){
      this.$emit('reloadTechnical');
    },
    async formSubmit(type) {
      this.technicalForm.bussiness_type = this.taskName;
      this.technicalForm.bussiness_id = this.id;

      this.technicalForm.technical_limit_time = this.utils.formatDate(new Date(this.technicalForm.technical_limit_time), "yyyy-MM-dd hh:mm:ss");
      if (!this.utils.checkForm("technicalForm", this)) return;
      if (type == 'save') {

        var msg = await this.utils.req("/ssa/technical/saveTaskTechnical.do", this.technicalForm, this);
        this.$message({
          type: "success",
          message: msg
        });
      } else {
        var msg = await this.utils.req("/ssa/technical/addstartProcess.do", this.technicalForm, this);
        this.$message({
          type: "success",
          message: msg
        });
      }
      this.closeDialog();
      this.getTechnical();
    },

    handleClose(){

        this.closeDialog();
    },
    selectAll() {
      var tmpUnit = [];
      for (var i = 0; i < this.orgList.length; i++) {
        var j = parseInt(this.orgList[i].value);
        tmpUnit.push(j);
      }
      this.technicalForm.feedback_unit = tmpUnit;
    },
    closeDialog() {
      this.$refs["technicalForm"].resetFields();
      this.$store.state.process.technicalVisible = false;
    }
  },
  created: function() {

    this.technicalForm.technical_source = this.src;
    this.utils.req("/ssa/processMgmt/getLeaderRoleUser.do", null, this).then(data => {
      this.leaderList = data;
    });
    this.utils.req("/ssa/organization/getOtherOrg.do", null, this).then(data => {
      this.orgList = data;
    });

    this.utils.req("/ssa/alertNotice/getLoginUserInfo.do", null, this).then(data => {
      this.technicalForm.org_id = data.org_id;
    });

  }
}
</script>

<style lang="css">
</style>
