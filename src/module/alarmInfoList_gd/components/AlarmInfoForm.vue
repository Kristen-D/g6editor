<template>
<div>
  <div class="top-title" v-if="this.$route.params.tkey =='spInfoForm'">审核</div>
  <div class="top-title" v-if="this.$route.params.tkey =='clInfoForm'">处理</div>
  <el-form v-if="this.$route.params.tkey =='spInfoForm'" ref="SpInfoTaskForm" :rules="rules" :model="SpInfoTaskForm">
    <el-form-item label="审核结果：">
      <el-radio-group v-model="SpInfoTaskForm.SpPass">
        <el-radio :label="true">通过</el-radio>
        <el-radio :label="false">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="审核情况：" prop="spreason" required>
      <el-input type="textarea" rows="6" v-model="SpInfoTaskForm.spreason" style="width:500px;" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="spTaskSubmit('SpInfoTaskForm')">完成</el-button>
      <el-button type="gray" @click="goback">取消</el-button>
    </el-form-item>
  </el-form>
  <el-form v-if="this.$route.params.tkey =='clInfoForm'" ref="clInfoTaskForm" :rules="rules" :model="clInfoTaskForm">
    <el-form-item label="反馈结果：" prop="feedBackcontext" required>
      <el-input type="textarea" rows="6" v-model="clInfoTaskForm.feedBackcontext" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="cltaskSubmit('clInfoTaskForm')">完成</el-button>
      <el-button type="gray" @click="goback">取消</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
// import selectOrganization from "components/selectOrganization/selectOrganization.vue"
export default {
  components: {
    //selectOrganization
  },
  computed: {
    ...mapState({
      // orgList: state => state.context.orgList,
      //orgMap: state => state.context.orgMap
    })
  },
  data() {
    let validateDevName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA50-9A-Z-_\\s]{2,30})$")
      if (pat.test(value)) {
        callback();
      } else {
        callback(new Error('2-30个字符，支持中文、大写英文、"‘-’"、"_"以及空格的组合'))
      }
    };
    let validateDevVersion = (rule, value, callback) => {
        if (value != '') {
          let pat = new RegExp("^([0-9]{1,5})$")
          if (pat.test(value)) {
            callback();
          } else {
            callback(new Error('只能为[1-5]个数字'))
          }
        } else {
          callback();
        }
    };
    let validatePers = (rule, value, callback) => {
      if (value != null) {
        let pat = new RegExp("^([0-9]{1,5})$")
        if (pat.test(value)) {
          callback();
        } else {
          callback(new Error('只能为[1-5]个数字'))
        }
      }
    };
    return {

      tableId: this.$route.params.tableId,
      rules: {
        spreason: [{
          required: true,
          message: '请输入审核情况描述!',
          trigger: 'blur'
        }],
        feedBackcontext: [{
          required: true,
          message: '请输入处理情况描述!',
          trigger: 'blur'
        }]
      },
      SpInfoTaskForm: {
        alarm_id:null,
        SpPass: true,
        spreason: ""
      },
      clInfoTaskForm: {
        alarm_id:null,
        feedBackcontext: ""
      },
    };
  },
  methods: {
    headSel(){
        // this.noticeInfoForm.send_unit = this.noticeInfoForm.notice_header
    },
    goback(){
        this.$router.go(-1);
    },
    async spTaskSubmit(formName) {
      var params = this.SpInfoTaskForm;
      params.alarmIds = this.$route.params.alarmIds;
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          params.spReason = this.SpInfoTaskForm.spreason;
          params.spPass = this.SpInfoTaskForm.SpPass;
          var msg = await this.common.req("/ssa/alarmInfoList/completespTask.do", params, this);
          this.$message({
            type: "success",
            message: msg
          });
          this.$router.go(-1);
          //  this.$store.dispatch('reloadTable', this.tableId);
        }
      });
    },
    async cltaskSubmit() {
      this.$refs["clInfoTaskForm"].validate(async(valid) => {
        if (valid){
        var params = {};
        params = this.clInfoTaskForm;
        params.alarmIds = this.$route.params.alarmIds;
          var msg = await this.common.req("/ssa/alarmInfoList/completeclTask.do",params, this);
          this.$message({message: msg,type: 'success' });
          this.$router.go(-1);
      }
    });
    },
    clearSessionStorage() {
      sessionStorage.removeItem('noticeInfoForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    }
  },
  mounted: function() {
  },
  created: async function() {
    if (this.$route.params.alarm_id) {
      this.SpInfoTaskForm.alarm_id = this.$route.params.alarm_id;
      this.clInfoTaskForm.alarm_id = this.$route.params.alarm_id;
    }
  }
}
</script>

<style>

</style>
