<!--产品规格表单, 新增产品规格，包括保存、返回按钮-->
<template>
<div>
  <section>
    <div class="container-fluid">
      <div class="el-panel">
        <div class="top-title">{{title}}</div>
        <el-collapse class="custom-collapse" v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <div class="el-collapse-heading">
                <h4 class="el-panel-title2">产品详情</h4><label>(<span>*</span>必填)</label>
              </div>
            </template>
            <div class="el-panel-body">
              <el-form :model="productBase" :rules="rules" ref="productBase" label-position="right" class="flexStart custom-form">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="productBase.name" clearable placeholder="名称" class="custom-width"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" prop="classification">
                  <el-select clearable placeholder="服务类型" v-model="productBase.classification">
                    <el-option label="防护类" value="PROTECT"></el-option>
                    <el-option label="审计类" value="AUDIT"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                  <el-input v-model="productBase.description" clearable placeholder="描述" class="custom-width"></el-input>
                </el-form-item>
                <el-form-item label="计费规则" prop="billingRules">
                  <el-input v-model="productBase.billingRules" clearable placeholder="计费规则" class="custom-width">
                  </el-input>
                </el-form-item>
                <el-form-item label="所属租户" prop="tenantId">
                  <el-input v-model="productBase.tenantId" clearable placeholder="所属租户" class="custom-width"></el-input>
                </el-form-item>
                <el-form-item label="创建者" prop="createrId">
                  <el-input v-model="productBase.createrId" clearable placeholder="创建者" class="custom-width"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      <div class="fix-bottom-button">
        <el-button type="primary" size="medium" @click="saveProduct">保存</el-button>
        <el-button type="gray" size="medium" @click="goBack">返回</el-button>
      </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>

    export default {
      data(){
          return{
            title: '新增产品规格',
            rules:{
              name: [{required: true, message: '请输入产品名称', trigger: 'blur'}],
              classification: [{required: true, message: '请选择服务类型'}],
            },
            activeNames: ['1'],
            productBase:{
              name: '',
              classification: '',
              description:'',
              billingRules: '',
              tenantId: '',
              createrId: '',
              // updaterId:'',
            },
            orgProps : {
                  label : 'name',
                  value : 'id'
              },
            // fileList : [],
            handle: ''
          }
      },

      methods:{
        saveProduct: async function(){
          if(!this.checkForm("productBase")) return;
          var params= {};
          params = this.productBase;
            // console.log('par:', params)

          var result = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/saveOrUpdate', params);
          // console.log('res2:', result)
          if(result){
            this.$message({message: "Success", type:'success'});
            this.goBack();
          }else{
            this.$message({message: "Fail", type:'error'});
          }
        },
        goBack: function(){
          this.$router.go(-1);
        },

        checkForm(formName) {
          var flag = false;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              flag = true;
            }
          });
          return flag;
        },

      },

      computed: {
      },

      created: async function(){

        var handle = this.$route.params.handle;
        // console.log('handle1:', handle)
        this.handle = handle;
          // console.log('handle2:',this.handle)
        if (handle == 'update'){
          this.title = '修改产品规格';
          var id = this.$route.params.id;
          // console.log('id: ',id)
          var productBase = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/get',{'id': id});
          this.productBase = productBase.data;
            // console.log('res1:', this.productBase)

        }
      }
    }
</script>

<style scoped>
  .el-collapse-heading {
    padding: 0 15px;
  }

  .el-collapse-heading h4 {
    display: inline-block;
  }

  .el-collapse-heading label {
    padding-left: 5px;
    color: #999;
    font-size: 12px;
    line-height: 14px;
  }

  .el-collapse-heading label span {
    color: #f00;
    padding-right: 3px;
  }

  .custom-inputwidth {
    width: 16.48% !important
  }

  .custom-width {
    width: 50%;
  }

  .addbutton {
    padding-right: 20px !important;
    line-height: 40px;
  }

  .fix-bottom-button {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, .7);
    padding: 10px;
  }

  .top-title {
    padding-left: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e1e3e4;
    font-size: 16px;
    line-height: 55px;
    color: #000;
    font-weight: 500;
    text-shadow: 0 0 black;
  }
</style>
<style>
  .custom-form .el-form-item__label {
    float: none;
  }

  .custom-collapse.el-collapse {
    border-top: none;
  }

  .custom-collapse .el-collapse-item__header, .custom-collapse .el-collapse-item__wrap {
    border-bottom: none;
  }

  .custom-collapse .el-collapse-item__content {
    padding-bottom: 0;
  }

  .custom-collapse .el-collapse-item.is-active .el-collapse-item__header {
    border-bottom: 1px solid #ebeef5;
  }

  .custom-form.el-form .el-form-item {
    width: calc(100% / 3);
  }

  .custom-form {
    flex-wrap: wrap;
  }

</style>
