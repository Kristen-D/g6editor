<!--新增服务链-->
<template>
  <div>
    <section>
      <div class="container-fluid">
        <div class="el-panel">
          <div class="el-panel-heading">
            <div class="el-panel-title">添加服务链</div>
          </div>
          <div class="el-panel-body">
            <div style="margin:20px;">
              <div class="el-subpanel-heading  no-bottom">
                <h4 class="el-subpanel-title">基本配置</h4>
              </div>
            </div>
            <el-form :model="serviceChainBase" :rules="rules" ref="serviceChainBase" label-width="140px">
              <el-form-item label="选择租户账号：" prop="tenantId">
                <el-row>
                  <el-col style="width: 12%; height: 32px">
                <el-select v-model="serviceChainBase.tenantId" clearable placeholder="请选择" @change="tenantDataChange">
                  <el-option
                    v-for="item in tenantData"
                    :label="item.tenantId"
                    :value="item.fullName">
                  </el-option>
                </el-select>
                  </el-col>
                  <el-col style="width: 13%;" >
                  <el-card v-model="tenantDataSelection" style="background-color: lightgrey"><span>{{this.tenantDataSelection}}</span></el-card>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="服务链名称：" prop="name">
                <el-input v-model="serviceChainBase.name" clearable placeholder="请输入" class="setwidth-per25"></el-input>
              </el-form-item>
            </el-form>
            <div style="margin:20px;">
            <div class="el-subpanel-heading  no-bottom">
              <h4 class="el-subpanel-title">串联配置</h4>
            </div>
          </div>
            <el-form :model="serviceChainBase" :rules="rules" ref="serviceChainBase" label-width="140px">
              <el-form-item label="源安全域：">
                <el-select clearable placeholder="内网办公区域" class="setwidth-per25"></el-select>
              </el-form-item>
              <el-form-item label="目的安全域：">
                <el-select clearable placeholder="Web服务集群" class="setwidth-per25"></el-select>
              </el-form-item>
            </el-form>

              <el-form :model="serviceChainBase" :rules="rules" label-width="140px">
              <el-form-item label="服务顺序：">
                <el-row v-for="(item, index) in serviceChainBase.seriesOrder" :key="index">
                  <el-col :span="2">
                    <el-select v-model="item.seriesComponentTypeSelection" placeholder="请选择" @change="TypeSelectionChange">
                      <el-option
                        v-for="item in options"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>

                <el-col :span="0.5" style="margin: 2px">
                  <el-row type="flex" align="top">
                    <i @click="moveUpRow(index)" v-if="index !== 0">
                      <img
                      src="/static/sdsec/image/upArrow.png"
                      class="image"></i>
                  </el-row>
                  <el-row type="flex" align="bottom">
                    <i @click="moveDownRow(index)" v-if="index !== serviceChainBase.seriesOrder.length-1">
                      <img
                      src="/static/sdsec/image/downArrow.png"
                      class="image"></i>
                  </el-row>
                </el-col>
                <el-col :span="3">
                  <el-select v-model="item.id" placeholder="请选择" @change=handleSeriesSelectChange>
                    <el-option v-for="(val,key) in securityService" v-show="isSelect(val.id,item.id)" :value="val.id" :key="key" :label="val.name"></el-option>
                  </el-select>

                </el-col>
                <el-col :span="0.5">
                  <el-button type="text" size="small" style="color:red" @click="deleteSeriesRow(index)">删除</el-button>
                </el-col>
                </el-row>


                <el-row>
                  <el-button type="text" size="small" @click="addSeriesRow"><i><img
                    src="/static/sdsec/image/addIcon.png"
                    class="image"></i>增加</el-button>
                </el-row>
              </el-form-item>
              </el-form>



            <div style="margin:20px;">
              <div class="el-subpanel-heading  no-bottom">
                <h4 class="el-subpanel-title">旁路配置</h4>
              </div>
            </div>

            <el-form :model="serviceChainBase" :rules="rules" label-width="140px">
              <el-form-item label="服务顺序：">
                <el-row v-for="(item, index) in serviceChainBase.branchOrder" :key="index">
                  <el-col :span="2">
                    <el-select v-model="item.branchComponentTypeSelection" placeholder="请选择" @change="TypeSelectionChange">
                      <el-option
                        v-for="item in options"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="0.5" style="margin: 2px">
                    <i class="el-icon-minus" style="margin: 4px"></i>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="item.id" placeholder="请选择" @change=handleBranchSelectChange>
                      <el-option
                        v-for="(val,key) in securityService"
                        v-show="isSelect(val.id,item.id)"
                        :value="val.id"
                        :key="key"
                        :label="val.name"></el-option>
                    </el-select>

                  </el-col>
                  <el-col :span="0.5">
                    <el-button type="text" size="small" style="color:red" @click="deleteBranchRow(index)">删除</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-button type="text" size="small" @click="addBranchRow"><i><img
                    src="/static/sdsec/image/addIcon.png"
                    class="image"></i>增加</el-button>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="saveServiceChain">提交</el-button>
                <el-button type="gray" size="medium" @click="goBack">取消</el-button>
              </el-form-item>
            </el-form>
        </div>
      </div>
      </div>
    </section>
  </div>

</template>

<script>
    import DataView from "../../../module/blackVulnerability/components/DataView";
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'
    // const serviceOptions = ['亚信安全提供的服务链', '云防火墙', 'WAF', '安全管理服务'];
    export default {
        components: {DataView},
        props: ['tableId'],
        data() {
            return {
                loginUser: null,
                tenantData:[],
                tenantDataSelection:'',
                seriesComponentTypeSelection:[],
                branchComponentTypeSelection:[],
                securityServiceData:[],
                securityService:[],
                seriesServiceSelection:[],
                branchServiceSelection:[],
                options: [{
                    //WAF、IPS、SCAN、ANTIVIRUS、FIREWALL
                    //web应用防火墙、入侵防御系统、漏洞扫描系统、防病毒系统、防火墙
                    value: 'WAF',
                    label: 'web应用防火墙'
                }, {
                    value: 'IPS',
                    label: '入侵防御系统'
                }, {
                    value: 'SCAN',
                    label: '漏洞扫描系统'
                }, {
                    value: 'ANTIVIRUS',
                    label: '防病毒系统'
                }, {
                    value: 'FIREWALL',
                    label: '防火墙'
                }],
                serviceChainBase: {
                    seriesOrder:[],
                    branchOrder:[],
                    name: '',
                    tenantId: '',

                    createrId: '',
                    updaterId: '',
                    state: '',
                },

                seriesSelection:'',
                branchSelection:'',


                // title: '新增服务链',

                rules: {
                    // name: [{required: true, message: '请输入服务链名称', trigger: 'blur'}],
                },
                handle: '',
            }
        },

        methods: {
            //选择租户
            tenantDataChange:async function(val){
                this.tenantDataSelection = val;
                console.log('this.tenantDataSelection',this.tenantDataSelection)

            },
            // 安全组件类型与安全服务选项 二级联动
            TypeSelectionChange:async function(val) {
                this.securityService = [];
                console.log(val)
                for(let i in this.securityServiceData) {
                    // 如果选择的类型val 属于安全服务类型types数组, 则展示选项
                    if (this.securityServiceData[i].types.indexOf(val) !== -1) {
                        this.securityService.push(this.securityServiceData[i])
                    }
                }
                    console.log('this.securityService', this.securityService)

                },
            //控制选项是否显示
            isSelect(id,currentId){
                if(currentId === id){
                    return true
                }
                for(let i in this.serviceChainBase.seriesOrder){
                    if(this.serviceChainBase.seriesOrder[i].id === id){
                        return false
                    }
                }
                for(let i in this.serviceChainBase.branchOrder){
                    if(this.serviceChainBase.branchOrder[i].id === id){
                        return false
                    }
                }
                return true
            },
            //增加串联配置选项
            addSeriesRow(){
                this.serviceChainBase.seriesOrder.push({

                });
                console.log('add',this.serviceChainBase.seriesOrder)
            },
            moveUpRow(index) {
                var that = this;
                if (index > 0) {
                    let updata = that.serviceChainBase.seriesOrder[index - 1];
                    that.serviceChainBase.seriesOrder.splice(index - 1, 1);
                    that.serviceChainBase.seriesOrder.splice(index, 0, updata);
                } else {
                    this.$message({
                        type: 'info',
                        message: '已是第一条，不可上移！'
                    });
                }
                console.log('up',this.serviceChainBase.seriesOrder)
            },
            moveDownRow(index) {
                var that = this;
                if ((index + 1) === that.serviceChainBase.seriesOrder.length) {
                    this.$message({
                        type: 'info',
                        message: '已是最后一条，不可下移！'
                    });
                } else {
                    let downdata = that.serviceChainBase.seriesOrder[index + 1];
                    that.serviceChainBase.seriesOrder.splice(index + 1, 1);
                    that.serviceChainBase.seriesOrder.splice(index, 0, downdata);
                }
                console.log('down',this.serviceChainBase.seriesOrder)
            },
            //删除串联配置选项
            deleteSeriesRow(index) {
                this.$confirm('此操作将删除本条，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.serviceChainBase.seriesOrder.splice(index, 1);
                })
                console.log('delete',this.serviceChainBase.seriesOrder)
            },
            //增加旁路配置选项
            addBranchRow(){
                this.serviceChainBase.branchOrder.push({

                });
            },
            //删除旁路配置选项
            deleteBranchRow(index){
                this.$confirm('此操作将删除本条，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.serviceChainBase.branchOrder.splice(index, 1);
                })
                console.log('delete', this.serviceChainBase.branchOrder)
            },

            //串联服务选择
            handleSeriesSelectChange(val){
                this.seriesSelection = val;
                console.log("选择的串联数据", this.seriesSelection);

            },
            //旁路服务选择
            handleBranchSelectChange(val){
                this.branchSelection = val;
                console.log("选择的旁路数据", this.branchSelection);
            },



            dateTimeFormat(time){
                return TimeFormat(time);
            },
            saveServiceChain: async function () {
                if (!this.checkForm("serviceChainBase")) return;
                var resources = [];
                for (let j = 0, len = this.serviceChainBase.seriesOrder.length; j < len; j++) {
                    var seriesOrderData = {};
                    seriesOrderData = this.serviceChainBase.seriesOrder[j].id;
                    var resource = {'resourceId': seriesOrderData};
                    console.log('resource',resource)
                    resources.push(resource);
                }
                this.serviceChainBase.seriesOrder = resources;
                console.log('this.serviceChainBase.seriesOrder', this.serviceChainBase.seriesOrder)

                var branchResources = [];
                for (let j = 0, len = this.serviceChainBase.branchOrder.length; j < len; j++) {
                    var branchOrderData = {};
                    branchOrderData = this.serviceChainBase.branchOrder[j].id;
                    var branchResource = {'resourceId': branchOrderData};
                    console.log('branchResource',branchResource)
                    branchResources.push(branchResource);
                }
                this.serviceChainBase.branchOrder = branchResources;

                console.log(' this.serviceChainBase.branchOrder', this.serviceChainBase.branchOrder);

                var params = {
                    "sourceSecDomainId": "12345678",
                    "destSecDomainId": "1010101010",
                    "name": this.serviceChainBase.name,
                    "cascadeNodeList": this.serviceChainBase.seriesOrder,
                    "bypassNodeList": this.serviceChainBase.branchOrder,
                    "tenantId": this.serviceChainBase.tenantId
                };

                var result = await this.utils.reqObjBackState('/sdsec/web/serchain/servicechain/deployServiceChain', params);

                if (result) {
                    this.$message({message: "Success", type: 'success'});
                    this.$router.go(-1);
                    // this.$router.push({
                    //     name: "serviceChainTable",
                    // })
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
            // initialLoginUser: async function () {
            //     await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
            //         this.loginUser = currentLoginUser.data;
            //     });
            // }
        },

        created: async function() {
            //获取租户数据
            let tenantData =await this.utils.reqObjBackState("/ssa/tenant/getTenantList.do",{});
            this.tenantData = tenantData.data;
            console.log('this.tenantData',this.tenantData)
            //获取安全服务选项数据
            let securityServiceData=await this.utils.reqObjBackState("/sdsec/web/securitypool/securityservice/querySecurityService", {})
            this.securityServiceData = securityServiceData.data;
            console.log('securityServiceData', securityServiceData)
            console.log('this.securityServiceData', this.securityServiceData)
            console.log('this.securityServiceData[0].type', this.securityServiceData[0].types)

            },

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

  .el-dialog__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
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
  .el-form-item__content {
    line-height: 10px;
    position: relative;
    font-size: 14px;
  }
  .el-row {
    margin-bottom: 10px;
  }

  .el-col {
    border-radius: 4px;
  }

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
