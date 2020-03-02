<!--订单列表-->
<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">订单列表</label>
      <div>
        <el-button type="primary" size="small" @click="addOrder" v-if="isOrdinaryUser">新增</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :loginUser="loginUser" :highRightsUserArray="highRightsUserArray" :isHighRightsUser ="isHighRightsUser" :isOrdinaryUser="isOrdinaryUser" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="订单编号" align="center" prop="orderNumber">
<!--        <template slot-scope="scope">-->
<!--          <div style="cursor: pointer;color: #409eff" @click="showOrderDetail(scope.row)">-->
<!--            {{scope.row.orderNumber}}-->
<!--          </div>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="orderStatus">
        <template slot-scope="scope">
          {{recStateFmt(scope.row.orderStatus)}}
        </template>
      </el-table-column>
      <el-table-column label="订单备注" align="center" prop="description">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column  label="申请人" align="center" prop="submitterId" v-if="isHighRightsUser">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
<!--          上线-->
          <el-button v-if="isHighRightsUser && 'Handled' != scope.row.orderStatus" type="text" @click="updateOrder(scope.row)" style="cursor: pointer;">部署</el-button>
<!--          本地-->
<!--          <el-button v-if=" 'Handled' != scope.row.orderStatus" type="text" @click="updateOrder(scope.row)" style="cursor: pointer;">部署</el-button>-->
          <el-button type="text" @click="showOrderDetail(scope.row)" style="cursor: pointer;">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <div class="pagelocation m-b-30">
      <el-pagination :current-page.sync="tableConf.pageIndex" background
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total,sizes, prev, pager, next, jumper"
                     :total="tableConf.total" :page-size="tableConf.pageSize" class="pagination"></el-pagination>
    </div>

  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        props: ['tableId','highRightsUserArray','isHighRightsUser','isOrdinaryUser','loginUser'],
        data() {

            return {
                pageIndex: 1,
                pageSize: 10,
                total: 30,
                tableConf: {},
                tableData: [],
                load: true,
                multipleSelection: [],
                orderBase: {
                    orderNumber: '',
                    orderStatus: '',
                    orderPrice: '',
                    description: '',
                    tenantId: '',
                    submitterId: '',
                    createTime: '',
                    purchasedserviceList:[
                        {
                            deliverableType:'',
                            id:'',
                            purchasedservicePropertys:[],
                            prodSpecSubject:'',
                        }
                    ],

                    properties: [{
                        servicename: ''
                    }]
                },
            }
        },

        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            addOrder: function () {
                var params = {};
                params.handle = 'add';
                this.$router.push({
                    name: "productTable",
                })
            },
            updateOrder: async function (row) {
                var params = {id: row.id};
                var id = row.id;
                var param = {
                    'filters': {
                        'id': params.id,
                    }
                };

                var orderBase = await this.utils.reqObjBackState("/sdsec/web/order/order/getOrderAndPurchasedServiceWithPropertiesById", params);
                console.log("2212", orderBase);
                this.orderBase = orderBase.data;
                console.log("222", this.orderBase);
                // var x = this.purchasedBase.deliverableType;
                console.log("333", this.orderBase.purchasedserviceList[0].deliverableType);
                if (this.orderBase.purchasedserviceList[0].deliverableType !== 'servicechain') {
                    this.$notify({
                        title: '部署中 ...',
                        iconClass: 'el-icon-refresh',
                        duration: 4000
                    });

                    //todo 循环取值将取出最后一组内存和核心数
                    // for(let i = 0, len = this.orderBase.purchasedserviceList[0].purchasedservicePropertys.length; i< len;i++ ){
                    //     this.orderBase.purchasedserviceList[0].purchasedservicePropertys[i].multipleGroupName
                    //     if (this.orderBase.purchasedserviceList[0].purchasedservicePropertys[i].multipleGroupName == '内存容量'){
                    //         this.ram = this.orderBase.purchasedserviceList[0].purchasedservicePropertys[i].label
                    //     } else if(this.orderBase.purchasedserviceList[0].purchasedservicePropertys[i].multipleGroupName == '虚拟核心'){
                    //         this.core = this.orderBase.purchasedserviceList[0].purchasedservicePropertys[i].label
                    //     }
                    // }
                    // console.log("ram",this.ram);
                    //
                    // console.log("core",this.core);
                    var map = {
                        // "cpu": this.core[0],
                        // "memory": this.ram[0],
                        // "resourceType": this.orderBase.purchasedserviceList[0].deliverableType,
                        // "purchasedServiceId": this.orderBase.purchasedserviceList[0].id,
                        // 'orderId': params.id

                        "purchasedServiceId":this.orderBase.purchasedserviceList[0].id,
                        // "name":this.orderBase.purchasedserviceList[0].name,
                        // "description":this.orderBase.purchasedserviceList[0].description,
                        "secComponentId":this.orderBase.purchasedserviceList[0].prodSpecSubject,
                        // "secComponentId":"b4551110eda34bcd92248bd7f027c487",
                    };
                    console.log("555", map);
                    var msg = await this.utils.reqObjBackState("/sdsec/web/securitypool/securityservice/deploySecurityService", map);
                    this.$notify({
                        title: '部署完成',
                        iconClass: 'el-icon-refresh',
                        duration: 4000
                    });
                } else {
                    params.handle = 'add';
                    this.$router.push({
                        name: 'serviceChainForm',
                        params: params
                    })
                }
            },
            deleteOrder: function (row) {
                // console.log('点击每行的删除按钮')
                this.$confirm('此操作将 取消选中的订单，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    var id = row.id;
                    var param = {'id': id, 'orderStatus': 'deployed'};
                    var msg = await this.utils.reqObjBackState("/sdsec/web/order/order/saveOrUpdate", param);

                    this.$message({
                        // message: msg,
                        message: '成功',
                        type: 'success'
                    });
                    this.$store.dispatch('reloadTable', this.tableId);
                });
            },

            showOrderDetail: function (row) {
                // this.$router.push({path: 'orderDetail/' + row.id})
                this.$router.push({path: 'orderBaseInfo/' + row.id})
            },
            handleSelectionChange(selectedRow) {
                this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
                return;
            },
            handleSizeChange(pageSize) {
                this.$store.dispatch('handleSizeChange', [this.tableId, pageSize]);
            },
            handleCurrentChange(pageIndex) {
                this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
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
            //上线
            refreshTable:async function() {
                let loginUser;
                await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
                    loginUser = currentLoginUser.data;
                    console.log('this.isHighRightsUser', this.isHighRightsUser)
                    if (this.highRightsUserArray.indexOf(loginUser.userId)!== -1) {
                        let tableConf = {
                            total: 0,
                            tableData: [],
                            pageSize: 10,
                            pageIndex: 1,
                            load: true,
                            tableUrl: "/sdsec/web/order/order/pageQuery",
                            params: {
                                "orderBy": ["create_time"],
                                "orderType": "desc",
                            },
                            multipleSelection: [],
                        }
                        this.$store.commit('registerConf', [this.tableId, tableConf]);
                        this.tableConf = this.$store.state.context[this.tableId];
                        this.$store.dispatch('reloadTable', this.tableId);
                        console.log('is')
                    } else {
                        var tableConf = {
                            total: 0,
                            tableData: [],
                            pageSize: 10,
                            pageIndex: 1,
                            load: true,
                            tableUrl: "/sdsec/web/order/order/pageQuery",
                            params: {
                                "orderBy": ["create_time"],
                                "orderType": "desc",
                                "filters": {
                                    "createrId": loginUser.userId,
                                    "tenantId": loginUser.tenantId
                                },
                            },
                            multipleSelection: [],
                        }
                        this.$store.commit('registerConf', [this.tableId, tableConf]);
                        this.tableConf = this.$store.state.context[this.tableId];
                        this.$store.dispatch('reloadTable', this.tableId);
                        console.log('isNot')
                    }
                });
            }
            //本地
            // refreshTable:async function() {
            //     let tableConf = {
            //         total: 0,
            //         tableData: [],
            //         pageSize: 10,
            //         pageIndex: 1,
            //         load: true,
            //         tableUrl: "/sdsec/web/order/order/pageQuery",
            //         params: {
            //             "orderBy": ["create_time"],
            //             "orderType": "desc",
            //         },
            //         multipleSelection: [],
            //     }
            //     this.$store.commit('registerConf', [this.tableId, tableConf]);
            //     this.tableConf = this.$store.state.context[this.tableId];
            //     this.$store.dispatch('reloadTable', this.tableId);
            // }

    },

        created: async function () {

            this.refreshTable();

            // let highRightsUserArray=['1148046988160331778','1196702921603014658'];
            // let isHighRightsUser;
            // let isOrdinaryUser;
            // if(highRightsUserArray.indexOf('1148046988160331779')!== -1){
            //     console.log('高权限用户')
            //     this.isHighRightsUser = true;
            //     this.isOrdinaryUser = false;
            //     console.log('isHighRightsUser',this.isHighRightsUser)
            //
            //
            // }else{
            //     console.log('普通用户')
            //     this.isOrdinaryUser = true;
            //     this.isHighRightsUser = false;
            //     console.log('isOrdinaryUser',this.isOrdinaryUser)
            // }
            // console.log('quanxian',this.isHighRightsUser)
            // console.log('quanxian',this.isOrdinaryUser)
            // return this.isHighRightsUser;
            // return this.isOrdinaryUser;




        }

    }
</script>

<style scoped>

</style>
