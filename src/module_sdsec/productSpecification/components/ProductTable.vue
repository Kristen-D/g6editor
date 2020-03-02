<!--产品规格列表-->
<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">产品规格列表</label>
      <div>
        <el-button type="primary" size="small" @click="addProduct">添加售卖产品</el-button>
        <el-button type="primary" size="small" @click="deleteProductBatch">批量删除</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="产品名称" align="center" prop="name">
      </el-table-column>
<!--      <el-table-column label="服务类型" align="center" prop="classification">-->
<!--        <template slot-scope="scope">-->
<!--          {{typeStateFmt(scope.row.classification)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="产品介绍" align="center" prop="description">-->
<!--    </el-table-column>-->
      <el-table-column label="售卖单价" align="center" prop="billingRules">
      </el-table-column>
      <el-table-column label="售卖折扣" align="center" prop="discount">
      </el-table-column>
      <el-table-column label="售卖状态" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='on'" style="color: #3CB670">已上架</span>
          <span v-else-if="scope.row.status==='off'" style="color: #C0C4CC">已下架</span>
          <span v-else-if="scope.row.status==='draft'">草稿</span>
<!--          <el-button type="text" :disabled="scope.row.status =='off'?true:false" :style="{'color': (scope.row.status =='off' ? disabled:'#3CB670')} " >{{recStateFmt(scope.row.status)}}</el-button>-->
        </template>
      </el-table-column>
      <el-table-column label="售卖数量" align="center" prop="quota">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
<!--      <el-table-column label="所属租户" align="center" prop="tenantId">-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="updateProduct(scope.row)" :disabled="scope.row.status =='off'?true:false" style="cursor: pointer;" >编辑</el-button>
          <el-button type="text" @click="deleteRow(scope.row)" style="cursor: pointer;" >删除</el-button>
          <el-button type="text" v-if ="scope.row.status =='off' " @click="onProduct(scope.row)">上架</el-button>
          <el-button type="text"  v-if ="scope.row.status =='on' " @click="dropProduct(scope.row)">下架</el-button>
          <el-button type="text" @click="showProductDetail(scope.row)" style="cursor: pointer;" >详情</el-button>
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
    import {TimeFormat,marketTypeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        props: ['tableId'],
        data() {

            return {
                pageIndex: 1,
                pageSize: 10,
                total: 30,
                tableConf: {},
            }
        },

        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            addProduct: function () {
                let params = {};
                params.handle = 'add';
                this.$router.push({
                    name: "productForm",
                })
            },
            onProduct: function (rows) {
                this.$confirm('此操作将上架本产品，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var ids = [];
                    // rows.forEach(row => {
                        ids.push(rows.id);
                    // });
                    var param = {
                        "ids": ids,
                        "status": 'on',
                    };
                    console.log('rows.id', rows.id)

                    var msg = await this.utils.reqObjBackState("/sdsec/web/secsermarket/productspecification/batchUpdate", param, this);
                    this.$message({
                        type: 'success',
                        message: "Success"
                    });
                    this.$store.dispatch('reloadTable', this.tableId);
                })
            },
            dropProduct: function (rows) {
                this.$confirm('此操作将下架本产品，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var ids = [];
                    // rows.forEach(row => {
                        ids.push(rows.id);
                    // });
                    // console.log("ids",ids);
                    var param = {
                        "ids": ids,
                        "status": 'off',
                    };
                    console.log('rows.id', rows.id)

                    var msg = await this.utils.reqObjBackState("/sdsec/web/secsermarket/productspecification/batchUpdate", param, this);
                    this.$message({
                        type: 'success',
                        message: "Success"
                    });
                    this.$store.dispatch('reloadTable', this.tableId);
                })
            },
            updateProduct: function (row) {
                var params = {id: row.id};
                params.handle = 'update';
                this.$router.push({
                    name: 'productForm',
                    params: params
                })
            },
            deleteRow: function(row){
                this.$confirm('此操作将删除本条目，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var ids = [];
                    ids.push(row.id);
                    let param = {
                        'ids': ids,
                        "deleted":1};
                    var msg = await this.utils.reqObjBackState("/sdsec/web/secsermarket/productspecification/batchUpdate", param);
                    this.$message({
                        type: 'success',
                        message: "Success"
                    });
                    this.$store.dispatch('reloadTable', this.tableId);
                })
            },
            deleteProductBatch: function () {
                var rows = this.$store.state.context[this.tableId].multipleSelection;
                if (rows.length <= 0) {
                    this.$alert("请选中删除数据!", {
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var ids = [];
                    rows.forEach(row => {
                        ids.push(row.id);
                    });
                    let param = {
                        'ids': ids,
                        "deleted":1};
                    var msg = await this.utils.reqObjBackState("/sdsec/web/secsermarket/productspecification/batchUpdate", param);
                    this.$message({
                        type: 'success',
                        message: "Success"
                    });
                    this.$store.dispatch('reloadTable', this.tableId);
                })
          },
            showProductDetail: function (row) {
                this.$router.push({path: 'productDetail/' + row.id})
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
            typeStateFmt: function (classification) {
                return marketTypeFormat(classification);

            },

            refreshTable(){
                var tableConf = {
                    total: 0,
                    tableData: [],
                    pageSize: 10,
                    pageIndex: 1,
                    load: true,
                    tableUrl: "/sdsec/web/secsermarket/productspecification/pageQuery",
                    params: {
                        "orderBy": ["create_time"],
                        "orderType": "desc"
                    },
                    multipleSelection: [],
                }
                this.$store.commit('registerConf', [this.tableId, tableConf]);
                this.tableConf = this.$store.state.context[this.tableId];
                this.$store.dispatch('reloadTable', this.tableId);
            }
        },

    created:function () {
        this.refreshTable();
    }
    }
</script>

<style scoped>

</style>
