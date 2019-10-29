<template>
<div class="">


       <div class="whitebackground Whitespace">
         <div class="top-title" v-if="!this.$route.params.productType">新增产品类型</div>
         <div class="top-title" v-if="this.$route.params.productType">编辑产品类型</div>

         <el-form :model="productTypeForm" :rules="rules" ref="productTypeForm" label-width="110px" class="form-contral">
           <el-form-item label="产品类型名称" prop="typeName" required>
             <el-input v-model="productTypeForm.typeName" style="width:300px;"></el-input>
           </el-form-item>
           <el-form-item label="父产品类型" prop="parentId" required>
             <el-select v-model="productTypeForm.parentId" placeholder="请选择设备ID" style="width:300px;"
              @change="handleChange">
               <el-option :label="pt.typeName" :value="pt.productType" v-for="pt in parentTypes"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="产品类型级别" prop="typeLevel">
             <el-select v-model="productTypeForm.typeLevel" placeholder="请选择级别" style="width:300px;" disabled>
               <el-option label="第一级别" :value="1" ></el-option>
               <el-option label="第二级别" :value="2" ></el-option>
             </el-select>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" class="button-p-3" @click="submitForm('productTypeForm')">提交</el-button>
             <el-button type="gray" class="button-p-3" @click="resetForm('productTypeForm')">取消</el-button>
             <el-button type="gray" class="button-p-3" @click="clearSessionStorage">返回</el-button>
           </el-form-item>
         </el-form>
       </div>

</div>
</template>

<script>
export default {
  data() {
    let validateTypeName = (rule, value, callback) => {
      let pat = new RegExp("^([\\u4E00-\\u9FA5a-zA-Z0-9]{2,10})$")
      if(pat.test(value)){
        callback();
      }else {
        callback(new Error("2-10个字符，支持中文、大小写英文、数字的组合"))
      }
    };
    return {
      productTypeForm: {
        typeName: '',
        parentId: '',
        typeLevel: 2
      },
      parentTypes: [],
      tableId: this.$route.params.tableId,
      rules: {
        typeName: [
          { required: true, message: '请输入产品类型名称', trigger: 'blur' },
          { validator: validateTypeName, trigger: 'blur' }
        ],
        parentId: [{
          type: 'number',
          required: true,
          message: '请选择父产品类型',
          trigger: 'change'
        }],
        typeLevel: [
          { type: 'number', required: false, message: '请输入产品类型级别', trigger: 'change' }
        ]
      }
    };
  },
  computed: {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await this.common.reqBackState('/ssa/assetMgmt/addOrModifyProductType.do', this.productTypeForm, this);
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
      sessionStorage.removeItem('productTypeForm');
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.clearSessionStorage();
    },
    handleChange(value) {
      if(value===-1) {
        this.productTypeForm.typeLevel = 1;
      }else {
        this.productTypeForm.typeLevel = 2;
      }
    }
  },
  created: async function() {
    if (this.$route.params.productType) {
      this.productTypeForm = this.$route.params;
      let productType = JSON.stringify(this.$route.params);
      sessionStorage.productTypeForm = productType;
    }else if (sessionStorage.productTypeForm) {
      this.productTypeForm = JSON.parse(sessionStorage.productTypeForm);
      this.$route.params.productType = this.productTypeForm.productType;
    }
    let parents = await this.common.req('/ssa/assetMgmt/getParentProductTypes.do', {typeLevel: 1}, this);
    parents.push({"typeName": "第一级", "typeLevel": 0, "productType": -1, "parentId": 0});
    this.parentTypes = parents;
  },
  destroyed: function() {
    sessionStorage.removeItem('productTypeForm');
  }
}
</script>

<style>

</style>
