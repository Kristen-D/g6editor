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
                <el-form :model="orderBase" :rules="rules" ref="orderBase" label-position="right"
                         class="flexStart custom-form">

                  <el-form-item label="用户名" prop="tenantId">
                    <el-input v-model="orderBase.tenantId" clearable placeholder="用户名" class="custom-width"></el-input>
                  </el-form-item>

                </el-form>
              </div>
            </el-collapse-item>

            <el-collapse-item name="2">
              <template slot="title">
                <div class="el-collapse-heading">
                  <h4 class="el-panel-title2">可选服务</h4>
                </div>
              </template>
              <div class="el-panel-body">

                <template>
<!--                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedServices" @change="handleCheckedServicesChange">
                    <!--            <el-checkbox-group v-model="checkedServices" >-->
                    <el-checkbox label="waf" border size="medium">waf</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox label="firewall" border size="medium">防火墙</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox label="IPS" border size="medium">IPS</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox label="IDS" border size="medium">IDS</el-checkbox>
                  </el-checkbox-group>

                </template>


              </div>
            </el-collapse-item>

            <el-collapse-item name="3">
              <template slot="title">
                <div class="el-collapse-heading">
                  <h4 class="el-panel-title2">防护IP</h4>
                </div>
              </template>
                <div class="el-panel-body">
                    <el-form label-position="right" class="flexStart custom-form">
                      <el-input clearable placeholder="请输入防护IP" class="custom-width"></el-input>
                  </el-form>
                </div>
            </el-collapse-item>
          <div class="fix-bottom-button">
            <el-button type="primary" size="medium" @click="saveOrder">下单</el-button>
            <el-button type="gray" size="medium" @click="goBack">返回</el-button>
          </div>
          </el-collapse>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    export default {
        props: ['tableId'],
        data() {
            return {
                title: '新增订单',
                rules: {
                    orderNumber: [{required: true, message: '请输入订单编号', trigger: 'blur'}],
                    orderStatus: [{required: true, message: '请选择订单状态'}],
                    // poolSupplier:[{required: true, message: '请选择厂商'}],
                },
                activeNames: ['1', '2','3'],
                orderBase: {
                    orderNumber: '',
                    orderStatus: '',
                    orderPrice: '',
                    description: '',
                    tenantId: '',
                    submitterId: '',
                    createTime: ''
                },
                checkAll: false,
                checkedServices: [],
                isIndeterminate: true,
                serviceOptions: [],

                defaultProps: {
                    children: 'childs',
                    label: 'name',
                    value: 'id'
                },
                orgProps: {
                    label: 'name',
                    value: 'id'
                },
                fileList: [],
                handle: ''
            }
        },

        methods: {
            saveOrder: async function () {
                if (!this.checkForm("orderBase")) return;
                var params = {};
                params = this.orderBase;
                var result = await this.utils.reqObjBackState('/sdsec/web/order/order/saveOrUpdate', params);
                if (result) {
                    this.$message({message: "Success", type: 'success'});
                    // this.goBack();
                    this.$router.push({
                        name: "orderTable"
                    });
                } else {
                    this.$message({message: "Fail", type: 'error'});
                }
            },
            goBack: function () {
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

            handleCheckAllChange(val) {
                this.checkedServices = val ? serviceOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedServicesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.Services.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.Services.length;
            }
        },

        computed: {
        },

        created: async function () {
            var handle = this.$route.params.handle;
            this.handle = handle;
            if (handle == 'update') {
                this.title = '修改订单';
                var id = this.$route.params.id;
                var orderBase = await this.utils.reqObjBackState('/sdsec/web/order/order/get', {'id': id});
                this.orderBase = orderBase.data;
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
