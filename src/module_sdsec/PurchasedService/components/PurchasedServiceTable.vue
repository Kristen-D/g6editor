<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">已购服务</label>
      <div>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="服务编号" align="center" prop="name">
      </el-table-column>
      <el-table-column label="服务类型" align="center" prop="deliverableType">
        <template slot-scope="scope">
          {{typeStateFmt(scope.row.deliverableType)}}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="description">
      </el-table-column>
      <el-table-column label="状态" align="center" prop="deliverableStatus">
        <template slot-scope="scope">
          {{statusStateFmt(scope.row.deliverableStatus)}}
        </template>
      </el-table-column>
      <el-table-column label="合同周期" align="center" prop="deliverablePeriod">
      </el-table-column>
      <el-table-column label="购买时间" align="center" prop="purchaseTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.purchaseTime)}}
        </template>
      </el-table-column>
      <el-table-column label="购买者" align="center" prop="purchaseId">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button  type="text">
            <a  target = "_blank" href="http://10.1.198.106/ "><div style="cursor: pointer;">登录</div></a>
          </el-button>
          <el-button type="text" @click="showPurchasedServiceDetail(scope.row)" style="cursor: pointer;">查看详情</el-button>
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
        props: ['tableId'],
        data() {
            return {
                pageIndex: 1,
                pageSize: 10,
                total: 30,
                tableConf: {},
                purchasedServiceBase: {
                    name: '',
                    deliverableType: '',
                    description: '',
                    orderContractPeriod: '',
                    purchaseId: '',
                    purchaseTime: '',
                },
            }
        },
        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            // addPurchasedService: function () {
            //     var params = {};
            //     params.handle = 'add';
            //     this.$router.push({
            //         name: "purchasedServiceForm",
            //     })
            // },
            // updateOrder: function (row) {
            //     // console.log(id)
            //     var params = {id: row.id};
            //     params.handle = 'update';
            //     this.$router.push({
            //         name: 'purchasedServiceForm',
            //         params: params
            //     })
            // },
            // deleteOrder: function (row) {
            //     // console.log('点击每行的删除按钮')
            //     this.$confirm('此操作将 取消选中的订单，是否继续？', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '返回',
            //         type: 'warning'
            //     }).then(async () => {
            //         var id = row.id;
            //         var param = {'id': id, 'orderStatus': 'cancel'};
            //         var msg = await this.utils.reqObjBackState("/sdsec/web/order/purchasedservice/saveOrUpdate", param);
            //
            //         this.$message({
            //             // message: msg,
            //             message: '成功',
            //             type: 'success'
            //         });
            //         this.$store.dispatch('reloadTable', this.tableId);
            //     });
            // },
            showPurchasedServiceDetail: function (row) {
                // this.$router.push({path: 'purchasedServiceDetail/' + row.id})
                this.$router.push({path: 'purchasedServiceBaseInfo/' + row.id})
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
            typeStateFmt: function (purchasedServiceType) {
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
            statusStateFmt: function (deliverableStatus) {
                var str = '';
                if (deliverableStatus) {
                    if ('Deployed-not-yet' === deliverableStatus) {
                        str = '未部署';
                    } else if ('Deployed-preparing' === deliverableStatus) {
                        str = '准备部署';
                    } else if ('Deploying' === deliverableStatus) {
                        str = '部署中';
                    } else if ('Deployed-success' === deliverableStatus) {
                        str = '部署成功';
                    } else if ('Deployed-fail' === deliverableStatus) {
                        str = '部署失败';
                    } else if ('Destroyed-success' === deliverableStatus) {
                        str = '已被销毁';
                    } else {
                        str = '未知';
                    }
                }
                return str;
            },
            refreshTable:async function(){
                var loginUser;
                await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
                    loginUser = currentLoginUser.data
                });
                var tableConf = {
                    total: 0,
                    tableData: [],
                    pageSize: 10,
                    pageIndex: 1,
                    load: true,
                    tableUrl: "/sdsec/web/order/purchasedservice/pageQuery",
                    params: {
                        "orderBy": ["create_time"],
                        "orderType": "desc",
                        "filters": {
                            "createrId": loginUser.userId,
                            "tenantId": loginUser.tenantId
                        }
                    },
                    multipleSelection: [],
                };
                this.$store.commit('registerConf', [this.tableId, tableConf]);
                this.tableConf = this.$store.state.context[this.tableId];
                this.$store.dispatch('reloadTable', this.tableId);
            }
        },
        created: async function () {
            this.refreshTable();
        }

    }
</script>
<style scoped>
</style>
