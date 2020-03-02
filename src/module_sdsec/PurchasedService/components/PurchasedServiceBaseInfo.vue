<!--已购服务详情页-->
<template>
  <div class="el-panel">
    <div class="el-panel-body">
      <div class="fix-bottom-button">
        <el-button type ="gray" size="medium" @click="goBack">返回</el-button>
      </div>

      <div style="margin: 20px;">
        <div class="el-subpanel-heading no-bottom">
          <h4 class="el-subpanel-title">基本信息</h4>
        </div>

        <table class="info-table m-10-5" inside border="1" :model="purchasedServiceBase">
          <tr>
            <th>服务编号</th><td>{{purchasedServiceBase.name}}</td>
            <th>产品规格</th><td>{{purchasedServiceBase.prodSpecName}}</td>
            <th>服务类型</th><td>{{deliverableType(purchasedServiceBase.deliverableType)}}</td>
          </tr>
          <tr>
            <th>购买者</th><td> {{purchasedServiceBase.purchaseId}}</td>
            <th>购买时间</th><td>{{dateTimeFormat(purchasedServiceBase.purchaseTime)}}</td>
            <th>合同周期</th><td>{{purchasedServiceBase.deliverablePeriod}}</td>
          </tr>
          <tr>
            <th>备注</th><td colspan="5">{{purchasedServiceBase.description}}</td>
          </tr>
        </table>
      </div>

      <div style="margin: 20px;">
        <div class="el-subpanel-heading no-bottom">
          <h4 class="el-subpanel-title">已购服务详情</h4>
        </div>

          <table class="info-table  m-10-5" border="1" :model="purchasedServiceProperty">
            <tr>
              <th>属性名称</th><th>属性值</th><th>填写时间</th>
            </tr>
            <tr  v-for="(row,index) in purchasedServiceProperty">
              <td>{{ row.label }}</td>
              <td>
              <div v-if="!row.multipleGroupName || row.multipleGroupName.length<1">
                {{row.propertyValue}}</div>
              <div v-else>已选</div>
              </td>
              <td>{{ dateTimeFormat(row.createTime) }}</td>
            </tr>
          </table>

        </div>

      <div style="margin: 20px;"  v-if="purchasedServiceBase.deliverableType !== 'servicechain'">
        <div class="el-subpanel-heading no-bottom">
          <h4 class="el-subpanel-title">安全服务详情</h4>
        </div>
        <table class="info-table  m-10-5" border="1" :model="securityServiceInfo">
          <tr>
            <th>名称</th>
            <th>类型</th>
<!--            <th>CPU</th><th>内存容量</th><th>IP地址</th>-->
            <th>创建时间</th>
          </tr>
<!--          <tr  v-for="(row,index) in this.securityServiceInfo">-->
          <tr>
            <td>{{securityServiceInfo.name }}</td>
<!--            待优化-->
            <td><span v-for="(item, index) in securityServiceInfo.types">
              {{ convertType(item)}}</span></td>
<!--            <td>{{row.cpu}}核</td>-->
<!--            <td>{{row.memory}}G</td>-->
<!--            <td>{{row.ip}}</td>-->
            <td>{{ dateTimeFormat(this.securityServiceInfo.createTime) }}</td>
          </tr>
        </table>
      </div>

      <div style="margin: 20px;" v-if="purchasedServiceBase.deliverableType == 'servicechain'">
        <div class="el-subpanel-heading no-bottom" >
          <h4 class="el-subpanel-title">服务链详情</h4>
        </div>
        <table class="info-table  m-10-5" border="1" :model="nodeList">
          <tr>
            <th>服务链节点</th><th>安全设备标识符</th><th>安全设备名</th><th>服务链节点类型</th><th>节点访问地址</th><th>填写时间</th><th>配置策略</th>
          </tr>
          <tr  v-for="(row,index) in nodeList">
            <td>{{nodeList.indexOf(row)+1}}</td>
            <td>{{row.resourceId}}</td>
            <td>{{row.resourceName }}</td>
            <td>{{ resourceTypeFormat(row.resourceType) }}<</td>
            <td>{{row.ip}}</td>
            <td>{{ dateTimeFormat(row.createTime) }}</td>
            <td>
              <div v-if="row.resourceType == 'firewall'" class="fa fa-gear" style="font-size: 24px" @click=configureTheStrategy(row.resourceId)>
              </div>
            </td>
          </tr>
        </table>

        <!--模态框-配置策略-->
        <el-dialog title="配置策略" :visible.sync="dialogFormVisible" style="margin: auto;width: 103%">
          <div class="strategy-border">
            <el-tag>已有策略</el-tag>
            <el-table :data="currentFirewallSGs" element-loading-spinner="el-icon-loading" stripe @selection-change="">
              <el-table-column label="流量方向" align="center" prop="direction">
                <template slot-scope="scope">
                  <div style="color: #409eff">{{directionFormat(scope.row.direction)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="协议" align="center" prop="protocol"></el-table-column>
              <el-table-column label="行为" align="center" prop="action">
                <template slot-scope="scope">
                  <div style="color: #409eff">{{actionFormat(scope.row.action)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="源ip" align="center" prop="sourceIp"></el-table-column>
              <el-table-column label="源端口" align="center" prop="sourcePort"></el-table-column>
              <el-table-column label="目的ip" align="center" prop="destIp"></el-table-column>
              <el-table-column label="目的端口" align="center" prop="destPort"></el-table-column>
              <el-table-column label="删除" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="此操作将会删除本防火墙策略条目" placement="right">
                    <div style="color: #409eff" class="fa fa-minus"
                         @click="makeSureDeleteSecurityGroup(scope.row.id,scope.row.firewallId)"></div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <br>
          <el-form class="strategy-border" status-icon :rules="rules" v-model="newSecurityGroup">
            <el-tag>新建策略</el-tag>
            <el-form-item label="流量方向:" class="strategy-label">
              <el-radio v-model="newSecurityGroup.direction" label="upstream">入栈</el-radio>
              <el-radio v-model="newSecurityGroup.direction" label="downstream">出栈</el-radio>
            </el-form-item>
            <el-form-item label="协议:" class="strategy-label">
              <div>
                <el-radio-group v-model="newSecurityGroup.protocol" size="medium">
                  <el-radio-button label="TCP"></el-radio-button>
                  <el-radio-button label="UDP"></el-radio-button>
                  <el-radio-button label="ICMP"></el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="行为:" class="strategy-label">
              <div>
                <el-radio-group v-model="newSecurityGroup.action" size="medium">
                  <el-radio-button label="ACCEPT">接受</el-radio-button>
                  <el-radio-button label="REJECT">拒绝</el-radio-button>
                  <el-radio-button label="DROP">丢弃</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="源ip:" class="strategy-label">
              <el-input clearable placeholder="请填写" class="strategy-input"
                        v-model="newSecurityGroup.sourceIp"></el-input>
            </el-form-item>
            <el-form-item label="源端口:" class="strategy-label" prop="sourcePort">
              <el-input clearable placeholder="请填写" class="strategy-input"
                        v-model.number="newSecurityGroup.sourcePort"></el-input>
            </el-form-item>
            <el-form-item label="目的ip:" class="strategy-label">
              <el-input clearable placeholder="请填写" class="strategy-input"
                        v-model="newSecurityGroup.destIp"></el-input>
            </el-form-item>
            <el-form-item label="目的端口:" class="strategy-label">
              <el-input clearable placeholder="请填写" class="strategy-input"
                        v-model.number="newSecurityGroup.destPort"></el-input>
            </el-form-item>
            <el-form-item class="strategy-button">
              <el-button type="primary" @click="createNewSecurityGroup">新增策略</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关闭</el-button>
          </div>
        </el-dialog>

      </div>

    </div>
  </div>
</template>

<script>
    import {TimeFormat, serviceTypeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        // props: ["detail"],
        data() {
            /*var checkPortformat = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('端口不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 0 || value > 65535) {
                            callback(new Error('取值范围是0~65535'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            */
            return {
                dialogFormVisible: false,
                id: this.$route.params.id,
                purchasedServiceBase: {},
                purchasedServiceProperty: [],
                multipleGroup: [],
                serverChain: "",
                securityServiceInfo:[],
                nodeList: [],
                value: '',
                currentFirewallSGs: [],

                newSecurityGroup: {
                    direction: 'upstream',
                    protocol: "TCP",
                    action: "ACCEPT",
                    sourceIp: "",
                    sourcePort: "",
                    destIp: "",
                    destPort: "",
                    firewallId: ""
                },

                /*rules: {
                    newSourcePort: [
                        {validator: checkPortformat, trigger: 'blur'}
                    ],
                }*/
            }
        },
        methods: {
            convertType(type) {
                return serviceTypeFormat(type);
            },
            //1.提示确认删除安全规则组
            makeSureDeleteSecurityGroup: function (sescurityGroupId, firewallId) {
                this.$confirm('删除操作不可恢复，是否确认删除安全规则组策略？', '确认删除', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$message({
                        type: 'info',
                        message: '已删除'
                    });
                    this.deleteSecurityGroup(sescurityGroupId, firewallId);
                }).catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消删除'
                            : '停留在当前页面'
                    })
                });
            },
            //2.删除安全规则组
            deleteSecurityGroup: async function (securitygroupId, firewallId) {
                await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/deleteSecurityGroupAndReConfigureIPtables', {'id': securitygroupId});
                var securityGroups = await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/querySecurityGroupsByFirewallId', {'id': firewallId});
                this.currentFirewallSGs = securityGroups.data;
            },
            //3.流量方向格式化
            directionFormat: function (direction) {
                if ("upstream" == direction) {
                    return "入栈";
                } else if ("downstream" == direction) {
                    return "出栈";
                } else {
                    return "";
                }
            },
            actionFormat: function (action) {
                if ("ACCEPT" == action) {
                    return "接受";
                } else if ("REJECT" == action) {
                    return "拒绝";
                } else if ("DROP" == action) {
                    return "丢弃";
                } else {
                    return action;
                }
            },
            resourceTypeFormat: function (resourceType) {
                if ("firewall" == resourceType) {
                    return "防火墙";
                } else if ("WAF" == resourceType) {
                    return "web应用防火墙";
                } else {
                    return resourceType;
                }
            },
            //4.配置防火墙策略
            configureTheStrategy: async function (firewallId) {
                //1. 先查出所有已有的防火墙规则
                var securityGroups = await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/querySecurityGroupsByFirewallId', {'id': firewallId});
                this.currentFirewallSGs = securityGroups.data;
                this.newSecurityGroup.sourceIp = "";
                this.newSecurityGroup.sourcePort = "";
                this.newSecurityGroup.destIp = "";
                this.newSecurityGroup.destPort = "";
                this.newSecurityGroup.protocal = "TCP";
                this.newSecurityGroup.action = "ACCEPT";
                this.newSecurityGroup.firewallId = firewallId;
                this.dialogFormVisible = true;
            },
            //5.时间格式转换
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            //6.创建新的安全规则组
            createNewSecurityGroup: async function () {
                //创建
                await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/saveSecurityGroupAndConfigureIPtables', this.newSecurityGroup);
                //更新列表
                var securityGroups = await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/querySecurityGroupsByFirewallId', {'id': this.newSecurityGroup.firewallId});
                this.currentFirewallSGs = securityGroups.data;
            },
            //7.已购服务交付物类型转换
            deliverableType: function (purchasedServiceType) {
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
            goBack : function(){
                this.$router.go(-1);
            }
        },
        created: async function () {
            var purchasedServiceBase = await this.utils.reqObjBackState('/sdsec/web/order/purchasedservice/getPurchasedserviceAndPropertyById', {'id': this.id});
            console.log('purchasedServiceBase', purchasedServiceBase)
            this.purchasedServiceBase = purchasedServiceBase.data;
            console.log(' this.purchasedServiceBase', this.purchasedServiceBase)
            this.purchasedServiceProperty = purchasedServiceBase.data.propertyBOS;
            console.log(' this.purchasedServiceProperty', this.purchasedServiceProperty)
            var deliverableId = purchasedServiceBase.data.deliverableId;
            var deliverableType = purchasedServiceBase.data.deliverableType;
            if (deliverableId != null && "" != deliverableId) {
                // var that = this;
                switch (deliverableType) {
                    case "servicechain":
                        var serverChain = await this.utils.reqObjBackState('/sdsec/web/serchain/scservicechain/getServicechainAndNodeDetailById', {'id': deliverableId});
                        this.serverChain = serverChain.data;
                        this.nodeList = serverChain.data.nodeList;
                        break;
                    default :
                        var securityServiceInfo = await this.utils.reqObjBackState('/sdsec/web/securitypool/securityservice/getSecurityService', {'id': deliverableId});
                        console.log('securityServiceInfo',securityServiceInfo)
                        this.securityServiceInfo = securityServiceInfo.data;
                        console.log('this.securityServiceInfo',this.securityServiceInfo)
                        // break;
                }
            }
        },
        watch: {
            product: function (val) {
                console.log("product:" + val);
            },
            serverChain: function (val) {
                console.log("serverChain:" + val);
            },
            newSecurityGroup: {
                /*handler: function (val) {
                    console.log(JSON.stringify(val));
                },
                deep: true*/
            }
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

  .strategy-label {
    margin-left: 10%;
    text-align: right;
    width: 70%;
  }

  .strategy-button {
    margin-left: 10%;
    text-align: right;
  }

  .strategy-input {
    width: 70%;
    margin-left: 10%;
  }

  .strategy-border {
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

</style>
