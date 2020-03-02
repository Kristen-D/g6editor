<template>
  <div>
    <div>
      <el-table v-loading="defConf.loading" :data="defConf.tableData" border @sort-change="handleSortChange"
        @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="50"> </el-table-column>

        <!--prop属性对应row里要显示的值,inline-template可以自定义显示的值的格式,可以不用设prop属性,但是需要排序的列必须要设置prop属性 -->
        <el-table-column sortable="'custom'" prop="roleId" label="ID" width="100" align="center">
        </el-table-column>

        <el-table-column label="角色名" prop="title" width="300" align="center">
        </el-table-column>

        <el-table-column label="备注" prop="description" min-width="200" align="center">
        </el-table-column>

        <el-table-column label="操作" width="300" align="center">
          <template scope="scope">
              <div v-show="!scope.row.edit&&!scope.row.create" class="tab-czbox">
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)" class="operate-left">编辑</el-button>
                <span class="vert-bar-color">|</span>
                <el-button type="text" @click="handleDelete(scope.$index, scope.row)" class="operate-center">删除</el-button>
                <span class="vert-bar-color">|</span>
                <el-button type="text" @click="showDetail(scope.$index, scope.row)" class="operate-right">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br>
    <div class="col-lg-13 pull-right">
      <el-pagination @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex"
        layout="total, prev, pager, next, jumper" :total="defConf.total">
      </el-pagination>
    </div>
    <el-dialog title="权限管理" :visible.sync="detail" style="overflow:inherit" @close="closeDialog">
      <treeMenu ref="tree" @close="closeDialog" :row="row"></treeMenu>
    </el-dialog>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import treeMenu from './TreeMenu.vue'
  export default {
    components: {
      treeMenu
    },
    data() {
      return {
        defConf: {},
        //自定义属性
        detail: false,
        row: {},
      }

    },
    props: ['id'],
    computed: {
      ...mapState({
        roleList: state => state.context.roleList,
        roleMap: state => state.context.roleMap,
      })
    },
    methods: {
      //默认的方法,基本无需修改
      closeDialog() {
        this.detail = false;
        this.$nextTick(() => {
          this.$refs.tree.getTree().resetFields();
        });
      },
      showDetail(i, row) {
        //  this.$store.commit('changeParams', row);
        this.row = row;
        this.$nextTick(() => {
          this.$refs.tree.loadTreeMenu();
        });
        this.$store.commit('changeEditStatus', false);
        this.detail = true;
      },
      handleEdit(i, row) {
        //  this.$store.dispatch('handleEdit',[this.id,i,row]);
        // this.$store.commit('changeParams', row);
        this.row = row;
        this.$store.commit('changeEditStatus', true);
        this.detail = true;
        this.$nextTick(() => {
          this.$refs.tree.loadTreeMenu();
        });
      },
      //  async loadTreeMenu(row){
      //    var data = await this.common.req("/authority/roleCfg/getRoleMenus.do", row.role_id, this);
      //    this.$refs.tree.getTree().setCheckedKeys(data,true);
      //  },
      handleDelete(i, row) {
        this.$store.dispatch('handleDelete', [this, i, row]);
      },
      saveEdit(i, row) {
        if (this.objCheck(row, ["mail", "phone"])) {
          this.$store.dispatch('saveEdit', [this, i, row]);
        }
      },
      cancelEdit() {
        this.$store.commit('cancelEdit', this.id);
      },
      //处理选中多选的row
      handleSelectionChange(selectedRow) {
        this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
      },
      //处理翻页时候的事件
      handleCurrentChange(pageIndex) {
        this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
      },
      //处理排序时候的事件
      handleSortChange(val) {
        this.$store.dispatch('handleSortChange', [this.id, val]);
      },
      //默认方法结束

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
        var reg, msg;
        if (field.indexOf("mail") >= 0) {
          reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
          msg = '错误的邮件格式,请重新输入';
        } else if (field.indexOf("phone") >= 0) {
          reg = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/;
          msg = '错误的电话格式,请重新输入';
        }
        if (!reg.test(val)) {
          this.$message.error({
            message: msg,
            showClose: true
          });
        }
        return reg.test(val);
      }

      //methods end
    },
    created: function () {
      var defConf = {
        total: 0,
        loading: false,
        tableData: [],
        pageSize: 9,
        pageIndex: 1,
        editRowIndex: -1,
        editRowTemp: {},
        multipleSelection: [],
        //默认ajax属性
        tableUrl: "/ssa/authority/roleCfg/getRoleListToGrid.do",
        params: {},
        saveUrl: "/ssa/authority/roleCfg/saveRole.do",
        delUrl: "/ssa/authority/roleCfg/delRole.do",
      };

      this.$store.commit('registerConf', [this.id, defConf]);
      this.defConf = this.$store.state.editTable[this.id];
      this.$store.dispatch('reloadTable', this.id);
    }
  }

</script>
