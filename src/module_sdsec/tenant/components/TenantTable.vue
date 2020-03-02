<template>
<!--  <div>-->
  <div class="whitebackground Whitespace">
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">租户列表</label>
      <div>
        <el-button type="primary" size="small" @click="addRow">新增</el-button>
        <el-button type="primary" size="small" @click="delCheckedRows">删除</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="租户编号" prop="code" align="center"></el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="全称" prop="fullName" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template scope="scope">
          {{scope.row.status ==1? '正常':(scope.row.status == -1?'锁定':'删除')}}
        </template>
      </el-table-column>
      <el-table-column label="所在地" prop="areaName" align="center"></el-table-column>
      <el-table-column label="行业分类" prop="industry" align="center"></el-table-column>
      <el-table-column label="描述" prop="description" show-overflow-tooltip align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index,scope.row)" style="cursor: pointer;" >编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="cursor: pointer;" >删除</el-button>
          <el-button type="text" @click="handleStatus(scope.row)" style="cursor: pointer;">
            {{scope.row.status == 1 ? '锁定':(scope.row.status == -1?'解锁':'激活')}}
          </el-button>
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
        components: {},
        props: ['tableId'],
        data() {
            return {
                pageIndex: 1,
                pageSize: 10,
                total: 30,
                tableConf: {
                    // tableData: [{
                        // code: '123',
                        // name: 'test',
                    // }],
                },
                tableData:[],
                industry: '运营商',
                index: ''
            }
        },
        methods: {
            // 新增
            addRow() {
                this.$router.push({
                    name: 'tenantForm',
                    params: {
                        "tableId": this.tableId
                    }
                });
            },
            // 删除
            async delCheckedRows() {
                var rows = this.$store.state.editTable[this.tableId].multipleSelection;
                if (rows.length <= 0) {
                    this.$alert("请先选中!");
                    return;
                }
                this.$confirm('此操作将删除选中条目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var ids = [];
                    rows.forEach(row => {
                        ids.push(row.tenantId);
                    })
                    var result = await this.common.reqBackState("/ssa/tenant/delete.do", {"ids": ids}, this);
                    if (result.state) {
                        this.$store.dispatch('reloadTableForDelete', this.tableId);
                        this.$message({type: 'success', message: result.message});
                    } else {
                        this.$message({type: 'error', message: result.message});
                    }
                })
            },
            //编辑
            handleEdit(i, row) {
                // row.tableId = this.id;
                row.tableId = this.tableId;
                if (row.areaId && row.areaId !== '') {
                    row.areaIdArr = row.areaId.toString().split(",");
                }
                if (row.devices && row.devices !== '') {
                    row.deviceList = row.devices.split(",").map(x => parseInt(x))
                }
                this.$router.push({
                    name: 'tenantForm',
                    params: row
                })
                // this.$store.dispatch('handleEdit', [this.id, i, row]);
            },
            //锁定/解锁/激活
            async handleStatus(row) {
                let key = row.status == 1 ? 'lock' : (row.status == -1 ? 'unlock' : 'active')
                let data = await this.common.reqBackState('/ssa/tenant/' + key + '.do', row, this);
                if (data.state) {
                    this.$message({type: 'success', message: data.message});
                    this.$store.dispatch('loadTableData', [this.tableId]);
                } else {
                    this.$message({type: 'error', message: data.message});
                }
            },

            //处理选中多选的row
            handleSelectionChange(selectedRow) {
                this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
            },
            //处理翻页时候的事件
            handleCurrentChange(pageIndex) {
                this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
            },
            //处理排序时候的事件
            handleSortChange(val) {
                this.$store.dispatch('handleSortChange', [this.tableId, val]);
            },

            //刷新列表
            refreshTable() {
                var tableConf = {
                    total: 0,
                    loading: false,
                    tableData: [],
                    pageSize: 10,
                    pageIndex: 1,
                    editRowIndex: -1,
                    editRowTemp: {},
                    multipleSelection: [],
                    //默认ajax属性
                    tableUrl: "/ssa/tenant/query.do",
                    params: {},
                    saveUrl: "/ssa/tenant/add.do",
                    delUrl: "/ssa/tenant/delete.do",
                };
                this.$store.commit('registerConf', [this.tableId, tableConf]);
                this.tableConf = this.$store.state.editTable[this.tableId];
                this.$store.dispatch('reloadTable', this.tableId);
                console.log('tableConf',tableConf)
                console.log('tableData',tableConf.tableData)
            }
        },
        created(){
            this.refreshTable();
    }


    }
</script>

<style scoped>

</style>
