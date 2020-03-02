<!--产品规格详情-基本信息页-->
<template>
  <div>
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2">基本属性</h4>
          </div>
        </template>
        <div class="el-panel-body" id="detail">
          <el-form :model="productBase" label-width="120px" label-position="right" class="flexStart custom-form">
            <el-form-item label="产品名称：" prop="name">
              <label>{{productBase.name}}</label>
            </el-form-item>
<!--            <el-form-item label="服务类型： ">-->
<!--              <label v-if="productBase.serviceType =='protect'">防护类</label>-->
<!--              <label v-if="productBase.serviceType =='audit'">审计类</label>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="服务类别：">-->
<!--              <label>{{productBase.serviceCategory}}</label>-->
<!--            </el-form-item>-->
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
            <el-form-item label="售卖状态：">
              <label>{{statusFmt(productBase.status)}}</label>
            </el-form-item>
          </el-form>
          <el-form label-width="120px" label-position="right">
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2">产品属性</h4>
          </div>
        </template>

        <div class="el-panel-body" id="service">
          <!--           <el-form :model="productBase.propertiesList" label-width="120px" label-position="right" class="flexStart custom-form">-->

          <!--             <el-form-item   label="服务名称：" >-->

          <!--            <label>{{productBase.propertiesList.label}}</label>-->


          <!--           </el-form-item>-->

          <!--             <el-form-item label="服务描述：" >-->
          <!--&lt;!&ndash;               <label>{{productBase.propertiesList[$foreach].description}}</label>&ndash;&gt;-->
          <!--             </el-form-item>-->
          <!--            </el-form>-->
          <el-table :data="productBase.propertiesList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    highlight-current-row
                    element-loading-spinner="el-icon-loading" stripe>


            <el-table-column label="属性组" align="center" prop="multipleGroupName">

              <template  slot-scope="scope">

                  {{scope.row.multipleGroupName}}

              </template>
            </el-table-column>

            <el-table-column label="属性名称" align="center" prop="name">

              <template  slot-scope="scope">

                {{scope.row.label}}

              </template>
            </el-table-column>
            <!--              <el-table-column label="所属租户" align="center" prop="tenantId">-->
            <!--              </el-table-column>-->
            <!--              <el-table-column label="服务类型" align="center" prop="serviceType">-->
            <!--                <template slot-scope="scope">-->
            <!--                  {{typeStateFmt(scope.row.serviceType)}}-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <el-table-column label="类别详情" align="center" prop="description">
              <template slot-scope="scope">

                  {{scope.row.description}}

              </template>
            </el-table-column>
            <!--              <el-table-column label="计费规则" align="center" prop="billingRules">-->
            <!--              </el-table-column>-->
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

    import {sellingStateFmt} from "../../../../static/sdsec/js/sdsec/myCommonMethods";

    export default {
        props: ["detail"],
        data() {
            return {
                id: this.$route.params.id,
                // activeNames : ["1","2","3"],
                activeNames: ["1"],
                productBase: {},

            }
        },
        methods: {
            statusFmt(status){
                return sellingStateFmt(status);
            }

        },
        created: async function () {
            // console.log('InfoId：', id)
            var productBase = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/getProductSpecificationAndPropertyById', {'id': this.id});
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

</style>
