<!--安全域列表-->
<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">安全域列表</label>
      <div>
        <el-button type="primary" size="small" @click="addDomain">添加安全域</el-button>
<!--        <el-button type="primary" size="small" @click="deleteDomainBatch">批量删除</el-button>-->
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
<!--      <el-table-column label="安全域ID" align="center" prop="id">-->
<!--      </el-table-column>-->
      <el-table-column label="安全域名称" align="center" prop="name">
      </el-table-column>
      <el-table-column label="IP" align="center" prop="ipSet">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.ipSet">
            {{ item}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="cidr" align="center" prop="cidr">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.cidr">
<!--            {{ convertType(item)}}-->
            {{ item}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="description">
      </el-table-column>
<!--      <el-table-column label="创建时间" align="center" prop="createTime">-->
<!--        <template slot-scope="scope">-->
<!--          {{dateTimeFormat(scope.row.createTime)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="更新时间" align="center" prop="updateTime">-->
<!--        <template slot-scope="scope">-->
<!--          {{dateTimeFormat(scope.row.updateTime)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="updateDomain(scope.row)" style="cursor: pointer;" >编辑</el-button>
          <el-button type="text" @click="deleteRow(scope.row)" style="cursor: pointer; color: #F72E00" >删除</el-button>
<!--          <el-button type="text" @click="showDomainDetail(scope.row)" style="cursor: pointer;" >详情</el-button>-->
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
                securityDomainIds: []
            }
        },

        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            addDomain: function () {
                var params = {};
                params.handle = 'add';
                this.$router.push({
                    name: "securityDomainForm",
                })
            },
            updateDomain: function (row) {
                var params = {id: row.id};
                // console.log(params)
                params.handle = 'update';
                this.$router.push({
                    name: 'securityDomainForm',
                    params: params
                })
            },
            deleteRow: function(row){
                this.$confirm('此操作将删除本条目，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // var ids = [];
                    // ids.push(row.id);
                    // let param = {
                    //     'ids': ids,
                    //     "deleted":1};
                    var msg = await this.utils.reqObjBackState("/sdsec/web/serchain/securitydomain/deleteSecurityDomain", {'id':row.id});
                    this.$message({
                        type: 'success',
                        message: "Success"
                    });
                    this.$store.dispatch('reloadTable', this.tableId);
                })
            },
            // deleteDomainBatch: async function () {
            //     // console.log('点击批量删除按钮')
            //     var rows = this.$store.state.context[this.tableId].multipleSelection;
            //     if (rows.length <= 0) {
            //         this.$alert("请选中删除数据!", {
            //             type: 'warning'
            //         });
            //         return;
            //     }
            //     this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(async () => {
            //         var ids = [];
            //         rows.forEach(row => {
            //             ids.push(row.id);
            //         });
            //         let param = {
            //             'ids': ids,
            //             "deleted":1};
            //         var msg = await this.utils.reqObjBackState("/sdsec/web/serchain/securitydomain/deleteSecurityDomain", param);
            //         this.$message({
            //             type: 'success',
            //             message: "Success"
            //         });
            //         this.$store.dispatch('reloadTable', this.tableId);
            //     })
            // },
            showDomainDetail: function (row) {
                this.$router.push({path: 'securityDomainDetail/' + row.id})
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
            refreshTable() {
            var tableConf = {
                total: 0,
                tableData: [],
                pageSize: 10,
                pageIndex: 1,
                load: true,
                tableUrl: "/sdsec/web/serchain/securitydomain/querySecurityDomain",
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

        created: function () {
            this.refreshTable();
        }
    }
</script>

<style scoped>

</style>
