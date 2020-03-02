<template>
  <div>
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2">订单详情</h4>
          </div>
        </template>
        <div class="el-panel-body" id="detail">
          <el-form :model="orderBase" label-width="120px" label-position="right" class="flexStart custom-form">
            <el-form-item label="订单编号：" prop="orderNumber">
              <label>{{orderBase.orderNumber}}</label>
            </el-form-item>
            <el-form-item label="状态：">
              <label v-if="orderBase.orderStatus == 'Brand-new'">新增</label>
              <label v-if="orderBase.orderStatus == 'Handled'">已处理</label>
            </el-form-item>
            <el-form-item label="创建时间：">
              <label>{{dateTimeFormat(orderBase.createTime)}}</label>
            </el-form-item>
            <el-form-item label="订单金额：">
              <label>{{orderBase.orderPrice}}</label>
            </el-form-item>
            <el-form-item label="申请人：">
              <label>{{orderBase.submitterId}}</label>
            </el-form-item>
            <el-form-item label="备注：">
              <label>{{orderBase.description}}</label>
            </el-form-item>
          </el-form>
          <el-form label-width="120px" label-position="right">
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <PurchasedServiceTable  :tableId="tableId"></PurchasedServiceTable>

  </div>
</template>

<script>
    import PurchasedServiceTable from "../../PurchasedService/components/PurchasedServiceTable";
    export default {
        components: {PurchasedServiceTable},
        props: ["detail", "tableId"],
        data() {
            return {
                id: this.$route.params.id,

                activeNames: ["1"],
                orderBase: {},
            }
        },
        methods: {
            dateTimeFormat(l) {
                var dateStr = '';
                if (l) {
                    var date = new Date(l);
                    dateStr += date.getFullYear();
                    dateStr += "-" + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                    dateStr += "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
                    dateStr += "  " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
                    dateStr += ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                    dateStr += ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                }
                return dateStr;
            },
        },
        created: async function () {
            var orderBase = await this.utils.reqObjBackState('/sdsec/web/order/order/get', {'id': this.id});
            this.orderBase = orderBase.data;
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
