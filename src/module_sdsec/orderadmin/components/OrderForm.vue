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
                <h4 class="el-panel-title2">基本属性</h4><label>(<span>*</span>必填)</label>
              </div>
            </template>
            <div class="el-panel-body">
              <el-form :model="orderBase" :rules="rules" ref="orderBase" label-position="right" class="flexStart custom-form">
<!--                <el-form-item label="订单编号" prop="orderNumber">-->
<!--                  <el-input v-model="orderBase.orderNumber" clearable placeholder="订单编号" class="custom-width"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="订单状态" prop="orderStatus">-->
<!--                  <el-select clearable placeholder="订单状态" v-model="orderBase.orderStatus">-->
<!--                    <el-option label="已保存" value="0"></el-option>-->
<!--                    <el-option label="已取消" value="1"></el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->

                <el-form-item label="用户名" prop="tenantId">
                  <el-input v-model="orderBase.tenantId" clearable placeholder="用户名" class="custom-width"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      <div class="fix-bottom-button">
        <el-button type="primary" size="medium" @click="saveOrder">保存</el-button>
        <el-button type="gray" size="medium" @click="goBack">返回</el-button>
      </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>

  import {mapState} from 'vuex'
  // import ResourcePoolBaseInfo from "./ResourcePoolBaseInfo";

    export default {
      data(){
          return{
            title: '新增订单',
            rules:{
              orderNumber: [{required: true, message: '请输入订单编号', trigger: 'blur'}],
              orderStatus: [{required: true, message: '请选择订单状态'}],
              // poolSupplier:[{required: true, message: '请选择厂商'}],
            },
            activeNames: ['1'],
            orderBase:{
              orderNumber: '',
              orderStatus: '',
              orderPrice: '',
              description: '',
              tenantId: '',
              submitterId: '',
              createTime: ''
            },
            defaultProps: {
                  children: 'childs',
                  label: 'name',
                  value : 'id'
              },
            orgProps : {
                  label : 'name',
                  value : 'id'
              },
            fileList : [],
            handle: ''
          }
      },

      methods:{
        saveOrder: async function(){
          if(!this.checkForm("orderBase")) return;
          var params= {};
          params = this.orderBase;
            // console.log('par:', params)

          var result = await this.utils.reqObjBackState('/sdsec/web/order/order/saveOrUpdate', params);
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

    //     ...mapState({
    // //  将来需要用到时参考以下形式，暂时保留
    //       assetTypeOsTree: state => state.context.assetTypeOsTree,          //操作系统
    //       assetBiz: state => state.context.assetBiz,                                       //业务系统
    //       assetOs: state => state.context.assetOs,                                       //操作系统
    //       orgTree: state => state.context.orgTree,                                       //所属机构
    //     })
      },

      created: async function(){

        var handle = this.$route.params.handle;
        // console.log('handle1:', handle)
        this.handle = handle;
          // console.log('handle2:',this.handle)
        if (handle == 'update'){
          this.title = '服务链部署';
          var id = this.$route.params.id;
          // console.log('id: ',id)
          var orderBase = await this.utils.reqObjBackState('/sdsec/web/serchain/scservicechain/get',{'id': id});
          this.orderBase = orderBase.data;
            // console.log('res1:', this.resourcePoolBase)

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
