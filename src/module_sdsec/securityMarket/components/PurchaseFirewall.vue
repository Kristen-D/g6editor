<template>
  <div>
    <section>
      <div class="container-fluid">
        <div class="el-panel">
          <div style="background-size:cover;  width: 100%; height: 100px; background-image: url(/static/sdsec/image/firewallBackground.png)">
            <div class="sdsec-purchase-title" >
              <div style="padding-top: 15px">{{title}}</div>
            </div>
          </div>
          <el-row>
            <el-col :span="18">
          <div style="margin: 20px;">
            <div class="el-subpanel-heading no-bottom">
              <h4 class="el-subpanel-title">产品规格</h4>
            </div>
            <div  style="padding-left: 20px;">
              <el-button class="versionButtonSize" style="background-color: #007BE8;color: #FFFFFF">标准版</el-button>
              <el-button class="versionButtonSize" style="color: #3E4956">企业版</el-button>
              <el-button class="versionButtonSize" style="color: #3E4956">旗舰版</el-button>
            </div>
              <div style="padding: 20px;">
              <el-form v-model="productProps" class="productCard">
                <el-form-item label="版本规格介绍：" class="labelStyle">
                  <span class="textStyle" > {{productDescription}}</span>
                </el-form-item>
                <el-form-item label="资源规格：" class="labelStyle">
                  <span class="textStyle" >2核8G</span>
                </el-form-item>
                <el-form-item label="吞吐量：" class="labelStyle">
                  <span class="textStyle" >2Gbps</span>
                </el-form-item>
                <el-form-item label="预留：" class="labelStyle">
                  <span class="textStyle" >           </span>
                </el-form-item>

<!--                </div>-->
              </el-form>
              </div>
          </div>

          <div style="margin: 20px;">
            <div class="el-subpanel-heading no-bottom">
              <h4 class="el-subpanel-title">购买时长</h4>
            </div>
            <div  style="padding-left: 20px;" v-model="buyMonth">
              <el-row>
                <el-button plain class="buttonSize">1个月</el-button>
                <el-button plain class="buttonSize">2个月</el-button>
                <el-button plain class="buttonSize">3个月</el-button>
                <el-button plain class="buttonSize">4个月</el-button>
                <el-button plain class="buttonSize">5个月</el-button>
                <el-button plain class="buttonSize">6个月</el-button>
                <el-button plain class="buttonSize">7个月</el-button>
                <el-button plain class="buttonSize">8个月</el-button>
                <el-button plain class="buttonSize">9个月</el-button>
                <el-button plain class="buttonSize">10个月</el-button>
                <el-button plain class="buttonSize">11个月</el-button>
              </el-row>
              <el-row>
                <el-button plain class="buttonSize">1年</el-button>
                <el-button plain class="buttonSize">2年</el-button>
                <el-button plain class="buttonSize">3年</el-button>
                <el-button plain class="buttonSize">4年</el-button>
                <el-button plain class="buttonSize">5年</el-button>
              </el-row>
            </div>
          </div>
            </el-col>

            <el-col :span="6">
              <div style="margin: 20px;">
                <div style="padding: 20px;">
                  <el-form v-model="productProps" class="productCard">
                    <div class="cardTitle">
                      <el-form-item label="配置预览"></el-form-item>
                    </div>
                  </el-form >
                  <el-form class="productCard" :model="orderForm">
                    <el-form-item class="card">
                      <div class="labelStyle">产品名称：<span class="contentStyle">{{title}}</span></div>
                      <div class="labelStyle">产品版本：<span class="contentStyle">标准版</span></div>
                      <div class="labelStyle">所需配置：<span class="contentStyle">2核8G</span></div>
                      <div class="labelStyle">吞吐规格：<span class="contentStyle">2Gbps</span></div>
                    </el-form-item>

                    <el-form-item label="预计支付" style="margin-top: 1%;
    margin-left: 4%;color:rgba(62,73,86,0.6);font-weight:bold;"><br>
                      <el-row>
<!--                      <el-col :span="16" style="border: 1px solid #E1E2E3;-->
<!--    background-color: #FFFFFF;font-size:24px;color: #007BE8;font-weight:bold;padding: 10px 200px 10px 4px">￥0.00</el-col>-->
<!--                      <el-col :span="8" style="border: 1px solid #E1E2E3;-->
<!--    background-color: #FFFFFF;font-size:12px;color: #3E4956;padding: 20px 20px 14px 20px">1个月</el-col>-->
                        <el-col :span="18" style="border: 1px solid #E1E2E3;
    background-color: #FFFFFF;font-size:24px;color: #007BE8;font-weight:bold;">￥0.00</el-col>
                        <el-col :span="5" style="border: 1px solid #E1E2E3;
    background-color: #FFFFFF;font-size:12px;color: #3E4956;text-align: center">1个月</el-col>
                      </el-row>
                      <el-form-item>
                      <span style="font-size:12px;color: #007BE8;line-height:15px;">优惠明细：0折，共节省3000元</span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item style="margin-top: 1%; margin-left: 4%;">
<!--                      <el-button type="primary" style="width:169px;height:38px;margin-top: 1%;-->
<!--    margin-left: 4%;font-size:12px;font-weight:bold;" @click="purchase">申请</el-button>-->
<!--                      <el-button style="width:169px;height:38px;margin-top: 1%;-->
<!--    margin-left: 4%;font-size:12px;font-weight:bold;background-color: #FFFFFF; border-color:#E1E3E4; color: #007BE8;" @click="goBack">取消</el-button>-->
                      <el-row>
                      <el-col :span="12">
                      <el-button type="primary" style="width:160px;height:38px;font-size:12px;font-weight:bold;" @click="purchase">申请</el-button>
                      </el-col>
                        <el-col :span="12">
                      <el-button style="width:160px;height:38px; font-size:12px;font-weight:bold;background-color: #FFFFFF; border-color:#E1E3E4; color: #007BE8;" @click="goBack">取消</el-button>
                        </el-col>
                      </el-row>
                    </el-form-item>


                  </el-form>
                </div>
              </div>



            </el-col>


          </el-row>

        </div>

      </div>
    </section>
  </div>
</template>

<script>
    export default {
        name: "PurchaseFirewall",
        data(){
            return{
                productVersion:'标准版',
                productProps:{},
                buyMonth:'1个月',
                buyYear:'',
                id: this.$route.params.id,
                title:'',
                productDescription:'',
                orderForm: {
                    tenantId: "",
                    createrId: "",
                    submitterId: "",
                    description: "",
                    purchasedserviceList: [{
                        prospecId: "",
                        deliverableType: "",
                        deliverablePeriod: "",
                        description: "",
                        purchasedservicePropertys: [],
                    }],
                },
                loginUser: null,
            }
        },
        methods:{
            purchase:async function(){
                    this.orderForm.purchasedserviceList[0].prospecId = this.productDetail.id;
                    this.orderForm.submitterId = this.loginUser.userId;
                    this.orderForm.createrId = this.loginUser.userId;
                    this.orderForm.tenantId = this.loginUser.tenantId;
                    var params = this.orderForm;
                    var result = await this.utils.reqObjBackState('/sdsec/web/order/order/saveOrderAndPurchasedServiceWithProperties', params);
                console.log('this.orderForm',this.orderForm)
                console.log(' result', result)
                    if (result) {
                        this.$message({message: "Success", type: 'success'});
                        this.$router.push({
                            name: "orderTable"
                        });
                    } else {
                        this.$message({message: "Fail", type: 'error'});
                    }


            },
            goBack(){
                this.$router.go(-1);
            }

        },
        created:async function() {
            await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
                this.loginUser = currentLoginUser.data;
            });
            var productDetail = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/getProductSpecificationAndPropertyById', {id: this.id});
            this.productDetail = productDetail.data;
            console.log('this.productDetail',this.productDetail)
            this.title = productDetail.data.name;
            this.productDescription = productDetail.data.description;
        }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .versionButtonSize{
    width:88px;
    height:35px;
    border:1px solid #E1E2E3;
    font-size:14px;
    padding: 0;

  }

  .labelStyle{
    font-size:12px;
    color:rgba(62,73,86,0.6);
    margin-top: 1%;
    margin-left: 3%;

  }

  .textStyle{
    font-size:12px;
    color: #3E4956;

  }

  .contentStyle{
    font-size:12px;
    color: #3E4956;
    font-weight:bold;

  }

  .buttonSize{
    width:69px;
    height:36px;
    font-size:14px;
    text-align: center;
    border:1px solid #E1E2E3;
    padding: 0;
    color:rgba(62,73,86,0.6);
  }



  .sdsec-purchase-title {
    /*font-size: x-large;*/
    font-size:24px;
    margin-left: 1%;
    /*margin-top:3%;*/
    padding: 1%;
    color: #3E4956;
    font-weight:bold;



  }

  .sdsec-purchase-content {
    text-align: center;
    font-size: large;
    padding: 50px;
  }

  .productCard {
    border: 1px solid #E1E2E3;
    background-color: #F8F8F8;
  }

  .cardTest{;
    font-size:12px;
    color: #3E4956;
    font-weight:bold;

    margin-top: 1%;
    margin-left: 3%;

  }
  .cardTitle{
    font-size:13px;
    font-weight:bold;
    color:#3E4956;
    /*padding: 5px;*/
    margin-top: 1%;
    margin-left: 3%;

  }
  .card {
    border: 1px solid #E1E2E3;
    background-color: #FFFFFF;
    color: #303133;
    margin: 4%;
  }
  .el-form-item__label {
    text-align: right;
  }

</style>
