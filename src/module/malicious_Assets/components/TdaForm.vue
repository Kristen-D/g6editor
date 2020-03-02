<template>
<div class="whitebackground Whitespace">
  <div class="top-title">{{title}}</div>


  <el-form ref="tdaForm" :model="tdaForm" :rules="tdaFormRules" label-width="100px">

    <el-row>
      <el-col :span="9" :offset="1">

        <el-form-item label="TDA设备列表：" prop="tda_ip" required>
          <el-select v-model="tdaForm.tda_ip" multiple placeholder="选择TDA设备">
            <el-option v-for="item in tdaDatas" :key="item.assert_ip" :label="item.name" :value="item.assert_ip">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

  <el-row>
        <el-form-item>
          <el-button type="primary" @click="saveData">保存</el-button>
          <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      title:"选择TDA设备",
      //检查事项
      checkeItems: [],
      tdaDatas:[],
      maliciousIds:[],
      tdaForm: {
        maliciousIds:"",
        maliciousIps:"",
        tda_ip:[],
        tdaStrIp:""
      },
      tdaFormRules: {
        tda_ip: [{
          type: 'array',
          required: true,
          message: '请选择TDA设备',
          trigger: 'change'
        }],
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
    async saveData() {
      if (!this.utils.checkForm("tdaForm", this)) return;
      var maliciousIp='';
      var maliciousIps=this.$route.params.maliciousIps;
      for(var i=0;i<maliciousIps.length;i++){
        maliciousIp=maliciousIp+maliciousIps[i]+","
      }
      var maliciousId='';
      var maliciousIds=this.$route.params.maliciousIds;
      for(var i=0;i<maliciousIds.length;i++){
        maliciousId=maliciousId+maliciousIds[i]+","
      }
      var tdaIps=this.tdaForm.tda_ip;
      var strTdaips ="";
      for(var i=0;i<tdaIps.length;i++){
        strTdaips=strTdaips+tdaIps[i]+","
      }
      this.tdaForm.tdaStrIp=strTdaips.substr(0, strTdaips.length - 1);
      this.tdaForm.maliciousIps=maliciousIp.substr(0, maliciousIp.length - 1);
      this.tdaForm.maliciousIds=maliciousId.substr(0, maliciousId.length - 1);
      if(this.$route.params.handle=="add"){
        var msg = await this.utils.req("/ssa/maliciousAssets/saveTdaIPData.do", this.tdaForm, this);
        this.$message({
          message: msg,
          type: 'success'
        });
      }else{
        var msg = await this.utils.req("/ssa/maliciousAssets/updateTdaIPData.do", this.tdaForm, this);
        this.$message({
          message: msg,
          type: 'success'
        });
      }
      this.goBack();
    }
  },
  created: async function() {
    this.utils.req("/ssa/maliciousAssets/getTdaData.do", null, this).then(data => {
    //ssa/processMgmt/getPoliceUser.do
    this.tdaDatas = data;
    });
    if (this.$route.params.maliciousIds.length>0) {
      this.maliciousIds = this.$route.params.maliciousIds;
    }
    if (this.$route.params.handle=='update'){
      var tdaIps = this.$route.params.tda_ips.split(",");
      var tmpIps =[];
      for (var i = 0; i < tdaIps.length; i++) {
        tmpIps.push(tdaIps[i]);
      }
      this.tdaForm.tda_ip = tmpIps;
    }
  }
}
</script>
