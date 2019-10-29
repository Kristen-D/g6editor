<template>
<div class="">


      <div class="whitebackground Whitespace">
        <div class="top-title" v-if="!this.$route.params.productType">新增设备信息</div>
        <div class="top-title" v-if="this.$route.params.productType">编辑设备信息</div>

        <el-form :model="deviceInfoForm" :rules="rules" ref="deviceInfoForm" label-width="100px" class="form-contral">
          <el-form-item label="设备名称" prop="devName" required>
            <el-input v-model="deviceInfoForm.devName" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="设备版本" prop="devVersion" required>
            <el-input v-model="deviceInfoForm.devVersion" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="产品" prop="productId" required>
            <el-select v-model="deviceInfoForm.productId" placeholder="请选择产品" style="width:300px;">
              <el-option :label="pd.productName" :value="pd.productId" v-for="pd in productInfos"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备描述" prop="devDesc">
            <el-input v-model="deviceInfoForm.devDesc" style="width:300px;" :autosize="{ minRows:5, maxRows:10}"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" class="button-p-3" @click="submitForm('deviceInfoForm')">提交</el-button>
            <el-button type="gray" class="button-p-3" @click="resetForm('deviceInfoForm')">取消</el-button>
            <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button>
          </el-form-item>
        </el-form>
      </div>

</div>
</template>

<script>
export default {
  data() {
    let validateDevName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA50-9A-Z-_\\s]{2,30})$")
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('2-30个字符，支持中文、大写英文、"‘-’"、"_"以及空格的组合'))
      }
    };
    let validateDevVersion = (rule, value, callback) => {
      let pat = new RegExp("^([a-zA-Z0-9_\.]{1,16})$")
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('1-16个字符，支持大小写英文、数字、"_"、"."的组合'))
      }
    };
    return {
      deviceInfoForm: {
        devName: '',
        productId: '',
        devDesc: ''
      },
      productInfos: [],
      tableId: this.$route.params.tableId,
      rules: {
        devName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { validator: validateDevName, trigger: 'blur' }
        ],
        devVersion: [
          { required: true, message: '请输入设备版本', trigger: 'blur' },
          { validator: validateDevVersion, trigger: 'blur' }
        ],
        productId: [{
          type: 'number',
          required: true,
          message: '请选择产品',
          trigger: 'change'
        }],
        devDesc: [{
          required: false,
          min: 0,
          max: 200,
          message: '请输入200个以内的字符',
          trigger: 'blur'
        }]
      }
    };
  },
  computed: {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await this.common.reqBackState('/ssa/assetMgmt/addOrModifyDeviceInfo.do', this.deviceInfoForm, this);
          if(data.state) {
            this.clearSessionStorage();
            this.$message({type: 'success', message: data.message});
            this.$store.dispatch('reloadTable', this.tableId);
          }else{
            this.$message({type: 'error', message: data.message});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearSessionStorage() {
      // sessionStorage.clear();
      sessionStorage.removeItem('deviceInfoForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    }
  },
  created: async function() {
    if (this.$route.params.devId) {
      this.deviceInfoForm = this.$route.params;
      let deviceInfo = JSON.stringify(this.$route.params);
      sessionStorage.deviceInfoForm = deviceInfo;
    }else if (sessionStorage.deviceInfoForm) {
      this.deviceInfoForm = JSON.parse(sessionStorage.deviceInfoForm);
      this.$route.params.devId = this.deviceInfoForm.devId;
    }
    let pds = await this.common.req('/ssa/assetMgmt/getAllProductInfos.do', {}, this);
    this.productInfos = pds;
  },
  destroyed: function() {
    sessionStorage.removeItem('deviceInfoForm');
  }
}
</script>

<style>

</style>
