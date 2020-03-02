<!--租户登录--产品规格/安全市场 页面-->
<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">购买服务</label>
    </div>
    <section>
      <div class="container-fluid">
        <div class="el-panel">
          <div class="el-panel-title2">防护类</div>
          <div class="el-panel-body">
            <el-row  type="flex" class="rowpanelbody">
              <el-col :span="4"
                      v-if="descArray[index].productStatus=='on'&&descArray[index].classification=='protect'"
                      v-for="(o, index) in cardSize" :key="o" :offset="index > 0 ? 1 : 0">
                <el-row type="flex" justify="center" class="serviceicondiv">
                  <img :src=descArray[index].serviceIcon class="image" @click="goProductBaseInfo(descArray[index].id)">
                </el-row>
                <el-row type="flex" justify="center">
                  <el-button type="text" class="productnamebtn" @click="goProductBaseInfo(descArray[index].id)">{{descArray[index].name}}
                  </el-button>
                </el-row>
                <el-row type="flex" justify="center">
                  <!--                  之后可以加tooltip，固定描述大小-->
                  <div style="text-align:center;" class="productdescdiv">
                    {{descArray[index].description}}
                  </div>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-button type="primary" class="clickbuy" @click="buy(descArray[index].id)">点击购买</el-button>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-button type="text" class="productdescbtn" @click="detail(descArray[index].id)">产品介绍&gt;&gt;</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div class="el-panel-title2">审计类</div>
          <div class="el-panel-body">
            <el-row  type="flex" class="rowpanelbody">
              <el-col :span="4"
                      v-if="descArray[index].productStatus=='on'&&descArray[index].classification=='audit'"
                      v-for="(o, index) in cardSize" :key="o" :offset="index > 0 ? 1 : 0">
                <el-row type="flex" justify="center" class="serviceicondiv">
                  <img :src=descArray[index].serviceIcon class="image" @click="goProductBaseInfo(descArray[index].id)">
                </el-row>
                <el-row type="flex" justify="center">
                  <el-button type="text" class="productnamebtn" @click="goProductBaseInfo(descArray[index].id)">{{descArray[index].name}}
                  </el-button>
                </el-row>
                <el-row type="flex" justify="center">
                  <!--                  之后可以加tooltip，固定描述大小-->
                  <div style="text-align:center;" class="productdescdiv">
                    {{descArray[index].description}}
                  </div>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-button type="primary" class="clickbuy" @click="buy(descArray[index].id)">点击购买</el-button>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-button type="text" class="productdescbtn" @click="detail(descArray[index].id)">产品介绍&gt;&gt;</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <el-row>
<!--            <el-dialog title="新订单" :visible.sync="dialogFormVisible">-->
<!--              <el-form :model="orderForm">-->
<!--                &lt;!&ndash;产品基础信息-简介&ndash;&gt;-->
<!--                <el-form-item v-model="product" class="card">-->
<!--                  <div class="cardLocation">-->
<!--                    <h2>产品介绍</h2>-->
<!--                    <label>产品名称：<span>{{product.name}}</span></label><br>-->
<!--                    <label>产品简介：<span>{{product.description}}</span></label><br>-->
<!--                    <label>计费标准：<span>{{product.billingRules}}</span></label><br>-->
<!--                    <div v-if="'' != product.serviceCategory && product.serviceCategory != null && image != null">-->
<!--                      <label>所选安全组件名：<span>{{image.name}}</span></label><br>-->
<!--                      <label>所选安全组件类型：<span>{{purchasedServiceTypeFormat(image.componentType)}}</span></label><br>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </el-form-item>-->
<!--                &lt;!&ndash;产品定制信息-用户填写&ndash;&gt;-->
<!--                <el-form-item :proSpecIds="proSpecIds" v-model="multiPurchasedServiceProps" class="card">-->
<!--                  <div class="cardLocation">-->
<!--                    <h2>参数选择</h2>-->
<!--                    <div v-for="(itemDiv, indexDiv) in multipleGroups" :key="indexDiv">-->
<!--                      <label>{{multipleGroups[indexDiv][0].multipleGroupName}}</label>-->
<!--                      <el-checkbox v-for="(item, index) in multipleGroups[indexDiv]" :key="index" border-->
<!--                                   :id=item.id-->
<!--                                   :true-label=item.id :false-label=item.id+removeFlag-->
<!--                                   size="medium" style="margin: 15px;"-->
<!--                                   @change=bindValueWhenChoosed>-->
<!--                        <div>{{item.label}}</div>-->
<!--                      </el-checkbox>-->
<!--                    </div>-->
<!--                    <div v-for="(item, index) in unvisiblePropList">-->
<!--                      <el-form :model="singleProSpecProperties">-->
<!--                        <el-form-item :id="generateId(item.id)">{{item.label}}:-->
<!--                          <el-input v-model="singleProSpecProperties[index].propertyValue" clearable-->
<!--                                    placeholder="请填写"-->
<!--                                    @input="singleProSpecProperties[index].prospecPropId= item.id"-->
<!--                          ></el-input>-->
<!--                        </el-form-item>-->
<!--                      </el-form>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </el-form-item>-->
<!--              </el-form>-->
<!--              <el-form>-->
<!--                <el-form-item label="备注:" prop="description">-->
<!--                  <el-input v-model="remarks" clearable placeholder="请填写"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-form>-->

<!--              <div slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                &lt;!&ndash;                      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>&ndash;&gt;-->
<!--                <el-button type="primary" @click="saveOrder()">确 定</el-button>-->
<!--              </div>-->
<!--            </el-dialog>-->
          </el-row>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import ProductDetail from "./ProductDetail";
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        components: {ProductDetail},
        data() {
            return {
                loginUser: null,
                singleProSpecProperties: [],
                unvisiblePropValue: [],
                remarks: '',
                unvisiblePropId: [],
                removeFlag: "_remove",
                multiPurchasedServiceProps: [],
                proSpecIds: [],
                productSpecificationDesc: '',
                descArray: [
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/serChain.png", id: 1001, name: "北京亚信安全服务器", description: "全方位云主机安全加固解决方案"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/vFirewall.png", id: 1002, name: "虚拟防火墙(vFirewall)", description: "专门针对虚拟化云环境所面临的威胁环境的防护设备"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/vBH.png", id: 1003, name: "堡垒机(vBH)", description: "租户上云后管理云上资源的安全工具"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/WAF.png", id: 1004, name: "网站防护(WAF)", description: "必备的网站应用安全的防护类产品"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/WGuard.png", id: 1005, name: "Web防篡改(WGuard)", description: "文件型防护类安全产品"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/web.png", id: 1006, name: "Web应用防火墙(vWAF)", description: "Web应用攻击防护"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/vLogAudit.png", id: 1007, name: "日志审计", description: "虚拟化安全日志审计(vlogAudit)"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/vDBAudit.png", id: 1008, name: "数据库审计(vDBAudit)", description: "监控数据库活动，保障数据库安全"},
                    // {productStatus: "on", serviceType: "protect", serviceIcon: "/static/sdsec/image/DCS-SCAN.png", id: 1009, name: "综合漏洞扫描(DCS-SCAN)", description: "全生命周期漏洞管理系统"},
                    // {productStatus: "on", serviceType: "audit", serviceIcon: "/static/sdsec/image/vLogAudit.png", id: 1010, name: "日志审计", description: "虚拟化安全日志审计(vlogAudit)"},
                    // {productStatus: "on", serviceType: "audit", serviceIcon: "/static/sdsec/image/vDBAudit.png", id: 1011, name: "数据库审计(vDBAudit)", description: "监控数据库活动，保障数据库安全"},
                    // {productStatus: "on", serviceType: "audit", serviceIcon: "/static/sdsec/image/DCS-SCAN.png", id: 1012, name: "综合漏洞扫描(DCS-SCAN)", description: "全生命周期漏洞管理系统"}
                ],
                serviceIcon: '',
                cardSize: 0,
                dialogFormVisible: false,
                unvisiblePropList: [],
                multipleGroups: [],
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
                formLabelWidth: '120px',
                product: '',
                image: '',
                imageSafeComponentType: "",
                // pageIndex: 1,
                // pageSize: 10,
                // total: 30,
                // cardConf: {},
                // tableData: [],
            };
        },

        methods: {
            buy: async function (id) {
                this.$router.push({path: 'purchaseFirewall/' + id});


            },

            // buy: async function (id) {
            //     this.image = "";
            //     this.product = "";
            //     this.multipleGroups = "";
            //     var result = await this.utils.reqObjBackState('/sdsec/web/secsermarket/productspecification/getProductSpecificationAndPropertyById', {id: id});
            //     this.product = result.data;
            //     //1.如果当前购买的产品是安全组件，则查询安全组件的信息(即镜像的信息)。
            //     if ("" != this.product.serviceCategory
            //         && this.product.serviceCategory != null
            //         && typeof (this.product.serviceCategory) != undefined) {
            //         var that = this;
            //         await $.ajax({
            //             type: "post",
            //             url: '/sdsec/web/respool/image/get',
            //             data: JSON.stringify({id: this.product.serviceCategory}),
            //             contentType: "application/json",
            //             success: function (result) {
            //                 that.image = result.data;
            //                 that.imageSafeComponentType = result.data.componentType;
            //             }
            //         })
            //     }
            //     //2.加载产品规格的定制信息如：复选组
            //     var propList = result.data.propertiesList;
            //     if (propList != null && propList.length != 0) {
            //         var allMultipleGroupsList = this.groupBy(propList, function (item) {
            //             return [item.multipleGroupName];
            //         });
            //         var unvisiblePropList = [];
            //         var multipleGroups = [];
            //         for (var i in allMultipleGroupsList) {
            //             var currentMultipleGroup = allMultipleGroupsList[i];
            //             if ("" === currentMultipleGroup[0].multipleGroupName || null == currentMultipleGroup[0].multipleGroupName) {
            //                 unvisiblePropList.push(currentMultipleGroup[0]);
            //             } else {
            //                 currentMultipleGroup = currentMultipleGroup.sort(function (a, b) {
            //                     a = a.label.toString();
            //                     b = b.label.toString();
            //                     a = a.substring(0, a.length - 1);
            //                     b = b.substring(0, b.length - 1);
            //                     a = parseInt(a);
            //                     b = parseInt(b);
            //                     //todo 后期必改，改为判断是否为数字，提取完数字再比大小
            //                     if (a < b) {
            //                         return -1;
            //                     } else if (a == b) {
            //                         return 0;
            //                     } else {
            //                         return 1;
            //                     }
            //                 });
            //                 multipleGroups.push(currentMultipleGroup);
            //             }
            //         }
            //         this.unvisiblePropList = unvisiblePropList;
            //         this.multipleGroups = multipleGroups;
            //
            //         //当得知了单选产品规格list共有多少条后，给singleProSpecProperties初始化成一样的大小。
            //         for (var i in unvisiblePropList) {
            //             var obj = {
            //                 prospecPropId: "",
            //                 propertyValue: ""
            //             };
            //             this.singleProSpecProperties.push(obj);
            //         }
            //     }
            //     this.dialogFormVisible = true;
            // },
            groupBy: function (array, f) {
                let groups = {};
                array.forEach(function (o) {
                    let group = JSON.stringify(f(o));
                    groups[group] = groups[group] || [];
                    groups[group].push(o);
                });
                return Object.keys(groups).map(function (group) {
                    return groups[group];
                });
            },
            generateId(unvisiblePropId) {
                console.log('id', unvisiblePropId)
                return unvisiblePropId;
            },
            saveOrder: async function () {
                this.orderForm.description = this.remarks;
                this.orderForm.purchasedserviceList[0].description = this.remarks;
                this.orderForm.purchasedserviceList[0].prospecId = this.product.id;
                this.orderForm.purchasedserviceList[0].deliverableType = this.imageSafeComponentType;
                var totalProperties = this.multiPurchasedServiceProps.concat(this.singleProSpecProperties);
                this.orderForm.purchasedserviceList[0].purchasedservicePropertys = totalProperties;
                this.orderForm.submitterId = this.loginUser.userId;
                this.orderForm.createrId = this.loginUser.userId;
                this.orderForm.tenantId = this.loginUser.tenantId;
                var params = this.orderForm;
                var result = await this.utils.reqObjBackState('/sdsec/web/order/order/saveOrderAndPurchasedServiceWithProperties', params);
                if (result) {
                    this.$message({message: "Success", type: 'success'});
                    this.$router.push({
                        name: "orderTable"
                    });
                } else {
                    this.$message({message: "Fail", type: 'error'});
                }

            },
            goProductBaseInfo: function (id) {
                // 跳转到商品详情页面
                // this.$router.push({name: "productDetail"})
                this.$router.push({path: 'productDetail/' + id});

            },
            async getProductSpecificationDesc(descArray) {
                await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
                    this.loginUser = currentLoginUser.data;
                });
                var params = {
                    "orderBy": ["create_time"],
                    "orderType": "desc"
                };
                var url = "/sdsec/web/secsermarket/productspecification/query";
                var desc;
                var that = this;

                $.ajax({
                    type: "post",
                    url: url,
                    data: JSON.stringify(params),
                    // dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        this.desc = result.data[0].description;
                        that.productSpecificationDesc = this.desc;
                        that.descArray = result.data;
                        that.cardSize = result.data.length;
                    },
                    error: function (msg) {
                        console.log(2)
                    }
                })

            },
            bindValueWhenChoosed(id) {
                if (id.toString().endsWith(this.removeFlag)) {
                    var realId = id.toString().substr(0, id.toString().length - this.removeFlag.toString().length);
                    for (var i in this.multiPurchasedServiceProps) {
                        if (realId == this.multiPurchasedServiceProps[i]["prospecPropId"]) {
                            delete this.multiPurchasedServiceProps[i];
                        }
                    }
                    var newArr = [];
                    for (var i in this.multiPurchasedServiceProps) {
                        if (this.multiPurchasedServiceProps[i] != null) {
                            newArr.push(this.multiPurchasedServiceProps[i]);
                        }
                    }
                    this.multiPurchasedServiceProps = newArr;
                    return;
                } else {
                    for (var i in this.multiPurchasedServiceProps) {
                        if (id == this.multiPurchasedServiceProps[i]["prospecPropId"]) return;
                    }
                    this.multiPurchasedServiceProps.push(
                        {
                            "prospecPropId": id,
                            "propertyValue": 1
                        }
                    );
                }
            },
            purchasedServiceTypeFormat: function (purchasedServiceType) {
                if (purchasedServiceType) {
                    if (purchasedServiceType.toLowerCase() === 'servicechain') {
                        return '服务链';//todo 已购服务的类型和产品规格的类型的区别未体现在业务员逻辑中
                    } else if (purchasedServiceType.toLowerCase() === 'waf') {
                        return "Web应用防火墙";
                    } else if (purchasedServiceType.toLowerCase() === 'firewall') {
                        return "防火墙";
                    } else if (purchasedServiceType.toLowerCase() === 'ips') {
                        return "入侵防御系统";
                    } else {
                        return purchasedServiceType;
                    }
                }
            },
        },

        created: async function () {
            this.getProductSpecificationDesc();
        },
        mounted: function () {
        },
        watch: {
            productSpecificationDesc(val) {
                // console.log("值变化为：" + val)
            }
            ,
            proSpecIds: function (oldVal, curVal) {
                console.log(curVal);
            }
            ,
            multiPurchasedServiceProps: function (oldVal, curVal) {
                console.log(JSON.stringify(curVal));
            },
            singleProSpecProperties: {
                handler: function (val) {
                    console.log("singleProSpecProperties:" + JSON.stringify(val));
                },
                deep: true
            }
        }
    }
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 23px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }


  .serviceicondiv {
    height: 60px;
  }

  .serviceicondiv .image {
    position: relative;
    height: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
    clear: both
  }

  .el-col-offset-1 {
    margin-left: 0px
  }

  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* 定位 */
    position: absolute;
    z-index: 1;
  }

  .card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    color: #303133;
  }

  .cardLocation {
    margin-top: 1%;
    margin-left: 3%;
  }

  .rowpanelbody {
    flex-wrap: wrap;
  }

  .rowpanelbody > div {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .productnamebtn {
    margin-top: 18px;
    padding-bottom: 8px;
  }
  .productnamebtn span {
    width:166px;
    height:19px;
    font-size:18px;
    font-family:Microsoft YaHei UI;
    font-weight:bold;
    color:rgba(62,73,86,1);
  }

  @media screen and (max-width: 1480px) {
    .productnamebtn span {
      font-size:16px;
    }
  }
  @media screen and (max-width: 1366px) {
    .productnamebtn span {
      font-size:14px;
    }
  }

  .productdescdiv {
    width:148px;
    height:27px;
    font-size:12px;
    font-family:Microsoft YaHei UI;
    font-weight:bold;
    color:rgba(157,161,167,1);
  }
  .clickbuy {
    background-color: #22AC38;
    border-color: #22AC38;
    width: 92px;
    height: 30px;
    margin-top: 30px;
    padding: 8px 22px;
  }
  .clickbuy span {
    width:50px;
    height:13px;
    font-size:12px;
    font-family:Microsoft YaHei UI;
    font-weight:bold;
    color:#FFFFFD;
  }
  .productdescbtn {
    width:68px;
    height:13px;
    font-size:12px;
    font-family:Microsoft YaHei UI;
    font-weight:bold;
    text-decoration:underline;
    color:#007BE8;
    padding-top: 9px;
  }
</style>
