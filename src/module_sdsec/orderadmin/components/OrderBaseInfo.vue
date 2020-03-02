<template>
  <div class="el-panel">

    <div class="el-panel-body">
      <div class="fix-bottom-button">
<!--        <el-button type="primary"  size="medium" @click="goBack">返回</el-button>-->
        <el-button type="gray"  size="medium" @click="goBack">返回</el-button>
      </div>

      <div style="margin:20px;">
        <div class="el-subpanel-heading  no-bottom">
          <h4 class="el-subpanel-title">订单详情</h4>
        </div>


      <table class="info-table m-10-5" inside border="1" :model="orderBase">
        <tr>
          <th>订单编号</th><td>{{orderBase.orderNumber}}</td>
          <th>创建时间</th><td>{{dateTimeFormat(orderBase.createTime)}}</td>
          <th>审批时间</th><td>          </td>
        </tr>
        <tr>
          <th>订单状态</th><td> {{recStateFmt(orderBase.orderStatus)}}</td>
          <th>有效时间</th><td colspan="3">1年</td>
        </tr>
      </table>
      </div>

      <div style="margin:20px;">
        <div class="el-subpanel-heading  no-bottom">
          <h4 class="el-subpanel-title">产品信息</h4>
        </div>
        <table class="info-table m-10-5" inside border="1" :model="productInfo">
          <tr>
            <th>产品名称</th><td>{{productInfo.prodSpecName}}</td>
            <!--            类型对应字段待确认-->
            <th>产品类型</th><td>{{productInfo.deliverableType}}</td>
            <th>授权开始时间</th><td>   {{          }}       </td>
          </tr>
          <tr>
            <th>授权结束时间</th><td  colspan="5">     {{          }}     </td>
          </tr>
        </table>
      </div>

      <div style="margin:20px;" v-if="isHighRightsUser">
        <div class="el-subpanel-heading  no-bottom">
          <h4 class="el-subpanel-title">客户信息</h4>
        </div>
        <table class="info-table m-10-5" inside border="1" :model="customerInfo">
          <tr>
            <th>客户姓名</th><td>{{          }}</td>
            <th>联系电话</th><td>{{          }}</td>
            <th>客户分类</th><td>          </td>
          </tr>
          <tr>
            <th>关联账号</th><td  colspan="5">{{           }}</td>
          </tr>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'
    // import PurchasedServiceTable from "../../PurchasedService/components/PurchasedServiceTable";
    export default {
        // components: {PurchasedServiceTable},
        // props: ["detail", "tableId"],
        data() {
            return {
                id: this.$route.params.id,
                orderBase: {},
                productInfo:{},
                customerInfo:{},
                purchasedBase:{
                    purchasedserviceList:[]
                },
                highRightsUserArray:['1148046988160331778','1196702921603014658'],
                loginUser:null,
                isHighRightsUser:this.isHighRightsUser,
                isOrdinaryUser:this.isOrdinaryUser,
        }
        },
        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            recStateFmt: function (orderStatus) {
                var str = '';
                if (orderStatus) {
                    if (orderStatus == 'Brand-new') {
                        str = '新增';
                    } else if (orderStatus == 'Handled') {
                        str = '已处理';
                    }
                }
                return str;
            },
            goBack : function(){
                this.$router.go(-1);
            },
        },
        created: async function () {
            let loginUser;
            await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
                loginUser = currentLoginUser.data;
                let highRightsUserArray=['1148046988160331778','1196702921603014658'];
                let isHighRightsUser;
                let isOrdinaryUser;
                if(highRightsUserArray.indexOf(loginUser.userId)!== -1){
                    console.log('高权限用户')
                    this.isHighRightsUser = true;
                    this.isOrdinaryUser = false;
                    console.log('isHighRightsUser',this.isHighRightsUser)
                    console.log('isOrdinaryUser',this.isOrdinaryUser)
                    // return isHighRightsUser;
                }else{
                    console.log('普通用户')
                    this.isOrdinaryUser = true;
                    this.isHighRightsUser = false;
                    console.log('isOrdinaryUser',this.isOrdinaryUser)
                    // return isOrdinaryUser;
                }
            });
            var orderBase = await this.utils.reqObjBackState('/sdsec/web/order/order/get', {'id': this.id});
            this.orderBase = orderBase.data;
            console.log(' this.orderBase', this.orderBase)
            var purchasedBase = await this.utils.reqObjBackState('/sdsec/web/order/order/getOrderAndPurchasedServiceWithPropertiesById',{'id' : this.id});
            this.purchasedBase = purchasedBase.data;
            console.log('this.purchasedBase',this.purchasedBase)
            var productInfo = await this.utils.reqObjBackState('/sdsec/web/order/purchasedservice/getPurchasedserviceAndPropertyById', {'id': this.purchasedBase.purchasedserviceList[0].id});
            this.productInfo = productInfo.data;
            console.log(' this.productInfo', this.productInfo)
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
