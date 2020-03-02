<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">用户列表</label>
      <div>
        <el-button type="primary" size="small" @click="addRow()">新增</el-button>
        <el-button type="primary" size="small" @click="delCheckedRows()">删除</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" label="用户姓名" prop="name"></el-table-column>
      <el-table-column align="center" label="登录名" prop="username"></el-table-column>
      <el-table-column align="center" label="手机" prop="phone"></el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="电子邮件" prop="email"></el-table-column>

      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)" style="cursor: pointer;">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="cursor: pointer;">删除</el-button>
          <el-button v-if="scope.row.status===1" type="text" @click="setLocked( scope.row,-1)" style="cursor: pointer;">锁定</el-button>
          <el-button v-else type="text" @click="setLocked(scope.row,1)" style="cursor: pointer;">解锁</el-button>
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
    import {mapState} from 'vuex'
    export default {
        components: {},
        props: ['tableId'],
        data() {
            return {
                tableConf: {},
                // filedMap: {
                //     name: "用户姓名",
                //     mail: "电子邮件",
                //     phone: "电话"
                // },
            }

        },
        computed: {
            ...mapState({
                roleList: state => state.context.roleList,
                roleMap: state => state.context.roleMap,
                orgList: state => state.context.orgList,
                orgMap: state => state.context.orgMap,
            })
        },
        methods: {
            // 新增
            addRow() {
                let row = {
                    userId: -1
                };
                row.tableId = this.tableId;
                row.roleList = this.roleList;
                // row.orgList = this.orgList;
                // window.top.setCrumb({name:"添加"});
                this.$router.push({
                    name: 'userManagementForm',
                    params: row
                });
                //  var newRow = {user_id:-1,role_id:null};
                //this.$store.dispatch('addRow',[this.tableId,newRow]);
            },
            // 批量删除
            async delCheckedRows() {
                var rows = this.$store.state.editTable[this.tableId].multipleSelection;
                if (rows.length <= 0) {
                    this.$alert("请先选中用户");
                    return;
                }
                this.$confirm('此操作将删除该行, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var user_ids = [];
                    rows.forEach(row => {
                        user_ids.push(row.userId);
                    })
                    var ids = user_ids.join(",");
                    var result = await this.common.reqBackState(this.delSelectedUser, {
                        ids: ids
                    });
                    if(result.state) {
                        await this.$store.dispatch('reloadTableForDelete', this.tableId);
                        this.$message({
                            type: 'success',
                            message: result.message
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: result.message
                        });
                    }
                })
            },
            //编辑
            handleEdit(i, row) {
                row.orgidsArr = [];
                row.roleidsArr = [];
                if (row.orgId) {
                    // row.newOrgId = parseInt(row.orgids.split(",")[0])
                    row.orgidsArr = row.orgId.toString().split(",")
                }

                if (row.roleids) {
                    let roleidsArrTmp = row.roleids.split(",");
                    for (var i = 0; i < roleidsArrTmp.length; i++) {
                        let roleId = roleidsArrTmp[i]
                        let role = roleId == -1 ? parseInt(roleId) : roleId;
                        row.roleidsArr.push(role)
                    }
                }

                this.$router.push({
                    name: 'userManagementForm',
                    params: {
                        row: row,
                        param: this.$store.state.editTable[this.tableId]
                    }
                });
            },
            //删除
            handleDelete(i, row) {
                this.$store.dispatch('handleDelete', [this, i, row]);
            },

            //锁定/解锁/激活
            async setLocked(row, locked) {
                let result = await this.common.reqBackState("/ssa/authority/userCfg/updateUserLocked.do", {
                    status: locked,
                    userId: row.userId
                });
                if (result.state) {
                    this.$message({ type: 'success', message: result.message });
                    this.$store.dispatch('loadTableData', [this.tableId]);
                } else {
                    this.$message({ type: 'error', message: result.message });
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

            saveEdit(i, row) {
                if (this.objCheckNull(row, ["name", "mail|phone"]) && this.objCheck(row, ["mail", "phone"])) {
                    this.$store.dispatch('saveEdit', [this, i, row]);
                }
            },
            cancelEdit() {
                this.$store.commit('cancelEdit', this.id);
            },

            //自定义方法
            fmtRole(val) {
                var role = this.roleMap[val];
                if (role) {
                    return role.text;
                }
                return null;
            },
            emailCheck(e) {
                var val = e.target.value;
                this.fmtCheck(val, "mail");
            },
            phoneCheck(e) {
                var val = e.target.value;
                this.fmtCheck(val, "phone");
            },
            objCheck(obj, fieldArray) {
                for (var i = 0; i < fieldArray.length; i++) {
                    var field = fieldArray[i];
                    var val = obj[field];
                    if (!this.fmtCheck(val, field)) {
                        return false;
                    }
                }
                return true;
            },
            fmtCheck(val, field) {
                if (this.isNull(val)) return true;
                var reg, msg;
                if (field.indexOf("mail") >= 0) {
                    reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                    msg = '错误的邮件格式,请重新输入';
                } else if (field.indexOf("phone") >= 0) {
                    reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/;
                    msg = '错误的电话格式,请重新输入';
                }
                if (!reg.test(val)) {
                    this.$message.error({
                        message: msg,
                        showClose: true
                    });
                }
                return reg.test(val);
            },
            objCheckNull(obj, fieldArray) {
                for (var i = 0; i < fieldArray.length; i++) {
                    var field = fieldArray[i];
                    if (!this.fmtCheckNull(obj, field)) {
                        return false;
                    }
                }
                return true;
            },
            fmtCheckNull(obj, field) {
                var fArr = field.split("|");
                var flag = false;
                var msg = "";
                if (fArr.length > 1) {
                    for (var i = 0; i < fArr.length; i++) {
                        if (i != 0) msg = msg + ",";
                        var f = fArr[i];
                        flag = flag || !this.isNull(obj[f]);
                        msg = msg + this.filedMap[f];
                    }
                    msg = msg + "至少一个不可为空";
                } else {
                    flag = !this.isNull(obj[field])
                    msg = this.filedMap[field] + "不可为空";
                }
                if (!flag) {
                    this.$message.error({
                        message: msg,
                        showClose: true
                    });
                }
                return flag;
            },
            isNull(val) {
                return val == null || val == "";
            },
            getTableColunms() {
                let poi_columns = this.common.getTableColunms(this.$refs.userTable);
                return poi_columns;
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
                    tableUrl: "/ssa/authority/userCfg/getUserListToGrid.do",
                    params: {},
                    saveUrl: "/ssa/authority/userCfg/saveUser.do",
                    delUrl: "/ssa/authority/userCfg/delUser.do",
                };
                let params = this.$store.state.editTable[this.tableId];
                if (params) {
                    for (let p in params) {
                        tableConf[p] = params[p];
                    }
                }
                this.$store.commit('registerConf', [this.tableId, tableConf]);
                this.tableConf = this.$store.state.editTable[this.tableId];
                this.$store.dispatch('reloadTable',this.tableId);
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
