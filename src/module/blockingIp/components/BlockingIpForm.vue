<template>
<div class="whitebackground Whitespace">
  <div class="top-title">{{title}}</div>


  <el-form ref="blockingIpForm" :model="blockingIpForm" :rules="blockingIpFormRules" label-width="100px">

    <el-row>
      <el-col :span="9" :offset="1">

        <el-form-item label="IP地址" prop="ip" required>
          <el-input v-model="blockingIpForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" rows="3" v-model="blockingIpForm.shielded_memo" style="width:500px;"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

  <el-row>
        <el-form-item>
          <el-button type="primary" @click="saveTaskInspect">保存</el-button>
          <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    let validateAssetIp = (rule, value, callback) => {
      let pat = new RegExp("^((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))))$");
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('格式错误，请重新输入'));
      }
    };
    return {
      title:"新增阻断IP",
      //检查事项
      checkeItems: [],
      blockingIpForm: {
        id: null,
        shielded_type: '0',
        shielded_flag: '1',
        //IP地址
        ip: "",
        //备注
        shielded_memo: ""
      },
      blockingIpFormRules: {
        ip: [
          { required: false, message: '请输入IP', trigger: 'blur'},
          { validator: validateAssetIp, trigger: 'blur' }
        ]
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
    goBack() {
      this.$router.go(-1);
    },
    async saveTaskInspect() {
      if (!this.utils.checkForm("blockingIpForm", this)) return;
      if (this.blockingIpForm.id==null || this.blockingIpForm.id ==''){
        this.blockingIpForm.shielded_type ="0";
        this.blockingIpForm.shielded_flag ="1";
        var msg = await this.utils.req("/ssa/blockingIp/saveRecord.do", this.blockingIpForm, this);
        this.$message({
          message: msg,
          type: 'success'
        });
      }else{
        this.blockingIpForm.shielded_type = this.params.shielded_type;
        var msg = await this.utils.req("/ssa/blockingIp/updateRecord.do", this.blockingIpForm, this);
        this.$message({
          message: msg,
          type: 'success'
        });
      }
      this.goBack();
    }
  },
  created: function() {
    if (this.$route.params.handle == 'update') {
      this.title = "编辑阻断IP";
      this.blockingIpForm = this.params;
    }else{
        this.blockingIpForm.shielded_type='0';
        this.blockingIpForm.shielded_flag ='1';
    }
  }
}
</script>
