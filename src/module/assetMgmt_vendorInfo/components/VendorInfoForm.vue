<template>
<div class="">


       <div class="whitebackground Whitespace">
         <div class="top-title" v-if="!this.$route.params.vendorId">新增设备厂商</div>
         <div class="top-title" v-if="this.$route.params.vendorId">编辑设备厂商</div>

         <el-form :model="vendorInfoForm" :rules="rules" ref="vendorInfoForm" label-width="100px" class="form-contral">
           <el-form-item label="供应商名称" prop="vendorName" required>
             <el-input v-model="vendorInfoForm.vendorName" style="width:300px;"></el-input>
           </el-form-item>
           <el-form-item label="供应商描述" prop="vendorDesc">
             <el-input type="textarea" v-model="vendorInfoForm.vendorDesc" style="width:300px;" :autosize="{ minRows:5, maxRows:10}"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" class="button-p-3" @click="submitForm('vendorInfoForm')">提交</el-button>
             <el-button type="gray" class="button-p-3" @click="resetForm('vendorInfoForm')">取消</el-button>
              <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button>
           </el-form-item>
         </el-form>
       </div>

</div>
</template>

<script>
export default {
  data() {
    let validateVendorName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z]{2,30})$")
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error("2-30个字符，支持中文、大小写英文的组合"))
      }
    };
    return {
      vendorInfoForm: {
        vendorId: '',
        vendorName: '',
        vendorDesc: ''
      },
      tableId: this.$route.params.tableId,
      rules: {
        vendorName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur'},
          { validator: validateVendorName, trigger: 'blur' }
        ],
        vendorDesc: [{
          required: false,
          min: 0,
          max: 200,
          message: '请输入200个以内的字符',
          trigger: 'blur'
        }],
      }
    };
  },
  computed: {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await this.common.reqBackState('/ssa/assetMgmt/addOrModifyVendorInfo.do', this.vendorInfoForm, this);
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
      sessionStorage.removeItem('vendorInfoForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    }
  },
  created: function() {
    if (this.$route.params.vendorId) {
      this.vendorInfoForm = this.$route.params;
      let vendorInfo = JSON.stringify(this.$route.params);
      sessionStorage.vendorInfoForm = vendorInfo;
    }else if (sessionStorage.vendorInfoForm) {
      this.vendorInfoForm = JSON.parse(sessionStorage.vendorInfoForm);
      this.$route.params.vendorId = this.vendorInfoForm.vendorId;
    }

  },
  destroyed: function() {
    sessionStorage.removeItem('vendorInfoForm');
  }
}
</script>

<style>

</style>
