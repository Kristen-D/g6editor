<!--此页面暂不使用-->

<template>
  <div>
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2">产品详情</h4>
          </div>
        </template>
        <div class="el-panel-body" id="detail">
          <el-form :model="productBase" label-width="120px" label-position="right" class="flexStart custom-form">
            <el-form-item label="名称：" prop="name">
              <label>{{productBase.name}}</label>
            </el-form-item>
            <el-form-item label="服务类型： ">
              <label v-if="productBase.classification =='PROTECT'">防护类</label>
              <label v-if="productBase.classification =='AUDIT'">审计类</label>
            </el-form-item>
            <el-form-item label="描述：">
              <label>{{productBase.description}}</label>
            </el-form-item>
            <el-form-item label="计费规则：">
              <label>{{productBase.billingRules}}</label>
            </el-form-item>
            <el-form-item label="所属租户：">
              <label>{{productBase.tenantId}}</label>
            </el-form-item>
            <el-form-item label="创建者：">
              <label>{{productBase.createrId}}</label>
            </el-form-item>
            <el-form-item label="更新者：">
              <label>{{productBase.updaterId}}</label>
            </el-form-item>
            <el-form-item label="状态：">
              <label v-if="productBase.productStatus =='on'">上架</label>
              <label v-if="productBase.productStatus =='off'">下架</label>
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
        <div class="el-panel-body" >

          <template>
<!--            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
            <div style="margin: 15px 0;"></div>

              <el-checkbox label="waf" disabled border size="medium">waf</el-checkbox>
            <div style="margin: 15px 0;"></div>
              <el-checkbox label="firewall" disabled border size="medium">防火墙</el-checkbox>
            <div style="margin: 15px 0;"></div>
              <el-checkbox label="IPS" disabled border size="medium">IPS</el-checkbox>
            <div style="margin: 15px 0;"></div>
              <el-checkbox label="IDS" disabled border size="medium">IDS</el-checkbox>


          </template>

        </div>
      </el-collapse-item>


    </el-collapse>
  </div>
</template>

<script>

    export default {
        // props: ["detail"],
        data() {
            return {
                // tableData:[],
                id: this.$route.params.id,
                // activeNames: ["1","2"],
                // productBase: {},
                // checkAll: false,
                // checkedServices: [],
                // services: serviceOptions,
                // isIndeterminate: true
            }
        },
        methods: {
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
        created: async function () {
            // console.log('InfoId：', id)
            var productBase = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/get', {'id': this.id});
            this.productBase = productBase.data;
            // console.log('this:',this.productBase)
        }
    }
</script>

<style>
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
    width: 70%;
  }

  .addbutton {
    padding-right: 20px !important;
    line-height: 40px;
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

  #detail .el-form-item__label {
    float: left;
  }

  #attrDiv .el-form-item__label {
    float: left;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
