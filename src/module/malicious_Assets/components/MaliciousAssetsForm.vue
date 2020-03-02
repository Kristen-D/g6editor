<template>
<div class="whitebackground Whitespace">
  <div class="top-title">{{title}}</div>


  <el-form ref="maliciousAssetsForm" :model="maliciousAssetsForm" :rules="maliciousAssetsFormRules" label-width="100px">

    <el-row>
      <el-col :span="9" :offset="1">

        <el-form-item label="IP地址" prop="ip_addr" required>
          <el-input v-model="maliciousAssetsForm.ip_addr"></el-input>
        </el-form-item>

        <el-form-item label="资产名称">
          <el-input v-model="maliciousAssetsForm.ip_name"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" rows="3" v-model="maliciousAssetsForm.malicious_memo" style="width:500px;"></el-input>
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
      title:"新建恶意资产",
      //检查事项
      checkeItems: [],
      maliciousAssetsForm: {
        malicious_id: null,
        malicious_type: '2',
        //IP地址
        ip_addr: "",
        //资产名称
        ip_name: "",
        //备注
        malicious_memo: ""
      },
      maliciousAssetsFormRules: {
        ip_addr: [
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
      if (!this.utils.checkForm("maliciousAssetsForm", this)) return;
      if (this.maliciousAssetsForm.malicious_id==null || this.maliciousAssetsForm.malicious_id ==''){
        this.maliciousAssetsForm.type ="2";
        var msg = await this.utils.req("/ssa/maliciousAssets/saveRecord.do", this.maliciousAssetsForm, this);
        this.$message({
          message: msg,
          type: 'success'
        });
      }else{
        this.maliciousAssetsForm.malicious_type = this.params.malicious_type;
        var msg = await this.utils.req("/ssa/maliciousAssets/updateRecord.do", this.maliciousAssetsForm, this);
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
      this.title = "编辑恶意资产";
      this.maliciousAssetsForm = this.params;
    }else{
        this.maliciousAssetsForm.type='2';
    }
  }
}
</script>
