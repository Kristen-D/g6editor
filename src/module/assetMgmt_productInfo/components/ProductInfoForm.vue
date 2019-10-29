<template>
<div class="">


       <div class="whitebackground Whitespace">
         <div class="top-title" v-if="!this.$route.params.productId">新增产品信息</div>
         <div class="top-title" v-if="this.$route.params.productId">编辑产品信息</div>

         <el-form :model="productInfoForm" :rules="rules" ref="productInfoForm" label-width="100px" class="form-contral">
           <el-form-item label="产品名称" prop="productName" required>
             <el-input v-model="productInfoForm.productName" style="width:300px;"></el-input>
           </el-form-item>
           <el-form-item label="产品型号" prop="productModel" required>
             <el-input v-model="productInfoForm.productModel" style="width:300px;"></el-input>
           </el-form-item>
           <el-form-item label="产品供应商" prop="vendorId" required>
             <el-select v-model="productInfoForm.vendorId" placeholder="请选择产品供应商" style="width:300px;">
               <el-option :label="v.vendorName" :value="v.vendorId" v-for=" v in vendors"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="产品类型" prop="productType" required>
             <el-select v-model="productInfoForm.productType" placeholder="请选择产品类型" style="width:300px;">
               <el-option :label="pt.typeName" :value="pt.productType" v-for="pt in productTypes"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="产品描述" prop="productDesc">
             <el-input type="textarea" v-model="productInfoForm.productDesc" style="width:300px;" :autosize="{ minRows:6, maxRows:12}"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" class="button-p-3" @click="submitForm('productInfoForm')">提交</el-button>
             <el-button type="gray" class="button-p-3" @click="resetForm('productInfoForm')">取消</el-button>
             <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button>
           </el-form-item>
         </el-form>
       </div>

</div>
</template>

<script>
export default {
  data() {
    let validateProductName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9]{2,16})$")
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error("2-16个字符，支持中文、大小写英文、数字的组合"))
      }
    };
    let validateProductModel = (rule, value, callback) => {
      let pat = new RegExp("^[a-zA-Z0-9_]{2,20}$")
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error('2-20个字符，支持大小写英文、数字、"_"的组合'))
      }
    };
    return {
      productInfoForm: {
        productName: '',
        vendorId: '',
        productType: '',
        productModel: '',
        productDesc: ''
      },
      productTypes: [],
      vendors: [],
      tableId: this.$route.params.tableId,
      rules: {
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { validator: validateProductName, trigger: 'blur' }
        ],
        vendorId: [{
          type: 'number',
          required: true,
          message: '请选择产品供应商',
          trigger: 'change'
        }],
        productType: [{
          type: 'number',
          required: true,
          message: '请选择产品类型',
          trigger: 'change'
        }],
        productModel: [
          { required: true, message: '请输入产品型号', trigger: 'blur' },
          { validator: validateProductModel, trigger: 'blur' }
        ],
        productDesc: [{
          required: false,
          min: 0,
          max: 200,
          message: '请输入产品描述',
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
          let data = await this.common.reqBackState('/ssa/assetMgmt/addOrModifyProductInfo.do', this.productInfoForm, this);
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
      sessionStorage.removeItem('productInfoForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    }
  },
  created: async function() {
    if (this.$route.params.productId) {
      this.productInfoForm = this.$route.params;
      let productInfo = JSON.stringify(this.$route.params);
      sessionStorage.productInfoForm = productInfo;
    }else if (sessionStorage.productInfoForm) {
      this.productInfoForm = JSON.parse(sessionStorage.productInfoForm);
      this.$route.params.productId = this.productInfoForm.productId;
    }
    let pts = await this.common.req('/ssa/assetMgmt/getParentProductTypes.do', {}, this);
    this.productTypes = pts;
    let vs = await this.common.req('/ssa/assetMgmt/getVendors.do', {}, this);
    this.vendors = vs;
  },
  destroyed: function() {
    sessionStorage.removeItem('productInfoForm');
  }
}
</script>

<style>

</style>
