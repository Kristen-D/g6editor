<!--链路表格布局，包括新增、删除、修改按钮-->
<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">服务链路列表</label>
      <div>
        <el-button type="primary" size="small" @click="addResource">添加牵引策略</el-button>
        <el-button type="primary" size="small" @click="deleteResourceBatch">批量删除</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="链路名称" align="center" prop="linkName">
<!--        <template slot-scope="scope">-->
<!--          <div style="cursor: pointer;color: #409eff" @click="showResourceDetail(scope.row)">-->
<!--            {{scope.row.linkName}}-->
<!--          </div>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="资源池类型" align="center" prop="poolType">
        <template slot-scope="scope">
          {{typeStateFmt(scope.row.resourcePoolType)}}
        </template>
      </el-table-column>
      <el-table-column label="资源池名称" align="center" prop="resourcePoolName">
      </el-table-column>
      <el-table-column label="防护CIDR" align="center" prop="cidr">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="updateResource(scope.row)" style="cursor: pointer;">编辑</el-button>
          <el-button type="text" @click="deleteResourceBatch" style="cursor: pointer;">删除</el-button>
          <el-button type="text" @click="showResourceDetail(scope.row)" style="cursor: pointer;">查看详情</el-button>
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
            }
        },

        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            addResource: function () {
                var params = {};
                params.handle = 'add';
                this.$router.push({
                    name: "uplinkForm",
                })
            },
            updateResource: function (row) {
                // console.log(id)
                var params = {id: row.id};
                // console.log(params)
                params.handle = 'update';
                this.$router.push({
                    name: 'uplinkForm',
                    params: params
                })
                // console.log('up:', params)

            },
            deleteResourceBatch: function () {
                // console.log('点击批量删除按钮')
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
                    var msg = await this.utils.reqObjBackState("/sdsec/web/serchain/uplink/batchUpdate", param);
                    this.$message({
                        type: 'success',
                        message: "Success"
                    });
                    this.$store.dispatch('reloadTable', this.tableId);
                })
            },
            showResourceDetail: function (row) {
                this.$router.push({path: 'uplinkDetail/' + row.id})
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
            typeStateFmt: function (poolType) {
                var str = '';
                if (poolType) {
                    if (poolType == 'physical') {
                        str = '物理资源池';
                    } else if (poolType == 'virtual') {
                        str = '虚拟资源池';
                    }
                }
                return str;
            },
            refreshTable(){
                var tableConf = {
                    total: 0,
                    tableData: [],
                    pageSize: 10,
                    pageIndex: 1,
                    load: true,
                    tableUrl: "/sdsec/web/serchain/uplink/pageQueryUpLinks",
                    params: {},
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
