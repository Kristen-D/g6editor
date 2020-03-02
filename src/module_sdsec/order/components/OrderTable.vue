<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">订单列表</label>
      <div>
        <el-button type="primary" size="small" plain @click="addOrder">新增</el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table
      :id="tableId"
      :data="tableConf.tableData"
      :default-sort="{prop: 'createTime', order: 'descending'}"
      v-loading="tableConf.load"
      element-loading-spinner="el-icon-loading" stripe
      @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="订单编号" align="center" prop="orderNumber">
        <template slot-scope="scope">
          <div style="cursor: pointer;color: #409eff" @click="showOrderDetail(scope.row)">
            {{scope.row.orderNumber}}
          </div>
        </template>
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
      <el-table-column label="更新时间" align="center" prop="updateTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.updateTime)}}
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

    export default {
        props: ['tableId'],
        data() {

            return {
                pageIndex: 1,
                pageSize: 10,
                total: 30,
                tableConf: {},
                orderBase: {
                    orderNumber: '',
                    orderStatus: '',
                    orderPrice: '',
                    description: '',
                    tenantId: '',
                    submitterId: '',
                    createTime: ''
                },

            }
        },

        methods: {
            addOrder: function () {
                var params = {};
                params.handle = 'add';
                this.$router.push({
                    name: "productTable",
                })
            },
            updateOrder: function (row) {
                var params = {id: row.id};
                params.handle = 'update';
                this.$router.push({
                    name: 'orderForm',
                    params: params
                })
            },

            deleteOrder: function (row) {
                this.$confirm('此操作将 取消选中的订单，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    var id = row.id;
                    var param = {'id': id, 'orderStatus': 'cancel'};

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
                this.$router.push({path: 'orderDetail/' + row.id})
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
                tableUrl: "/sdsec/web/order/order/pageQuery",
                params: {
                    "orderBy": ["create_time"],
                    "orderType": "desc",
                    "filters":{
                        "createrId": loginUser.userId,
                        "tenantId": loginUser.tenantId
                    },
                },
                multipleSelection: [],
            }


            this.$store.commit('registerConf', [this.tableId, tableConf]);
            this.tableConf = this.$store.state.context[this.tableId];
            this.$store.dispatch('reloadTable', this.tableId);

        }
    }
</script>

<style scoped>

</style>
