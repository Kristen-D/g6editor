<template>
  <div>
    <div>
      <el-table ref="userTable" v-loading="defConf.loading" :data="defConf.tableData" border style="width: 100%"
        @sort-change="handleSortChange" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="50"> </el-table-column>

        <el-table-column sortable="'custom'" prop="userId" label="ID" width="100" align="center">
          <template scope="scope">
            <div>
              <span v-show="!scope.row.create" style="margin-left: 10px">{{ scope.row.userId }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="用户姓名" prop="realname" min-width="100" align="center">
        </el-table-column>

        <el-table-column label="登录名" prop="username" min-width="100" align="center">
        </el-table-column>

        <el-table-column label="手机" prop="phone" min-width="100" align="center"> 
        </el-table-column>
        
        <el-table-column show-overflow-tooltip label="电子邮件" prop="email" min-width="100" align="center">
        </el-table-column>

        <el-table-column label="操作" min-width="120" align="center">
          <template scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)" class="operate-left">编辑</el-button>
            <span class="vert-bar-color">|</span>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)" class="operate-center">删除</el-button>
            <span class="vert-bar-color">|</span>
            <el-button v-if="scope.row.locked==0" type="text" @click="setLocked( scope.row,1)" class="operate-right">锁定</el-button>
            <el-button v-else type="text" @click="setLocked(scope.row,0)" class="operate-right">解锁</el-button>
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
  </div>

</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        defConf: {},
        filedMap: {
          name: "用户姓名",
          mail: "电子邮件",
          phone: "电话"
        },
        //自定义属性
      }

    },
    props: ['id'],
    computed: {
      ...mapState({
        roleList: state => state.context.roleList,
        roleMap: state => state.context.roleMap,
        orgList: state => state.context.orgList,
        orgMap: state => state.context.orgMap,
      })
    },
    methods: {
      //默认的方法,基本无需修改
      handleEdit(i, row) {
        row.tableId = this.id;
        row.orgidsArr = [];
        row.roleidsArr = [];
        if (row.orgids) row.orgidsArr = row.orgids.split(",");

        if (row.roleids) {
          row.roleidsArr = row.roleids.split(",");
          for (var i = 0; i < row.roleidsArr.length; i++) {
            row.roleidsArr[i] = parseInt(row.roleidsArr[i])
          }
        }

        this.$router.push({
          name: 'userForm',
          params: row
        });
      },
      handleDelete(i, row) {
        this.$store.dispatch('handleDelete', [this, i, row]);
      },
      saveEdit(i, row) {
        if (this.objCheckNull(row, ["name", "mail|phone"]) && this.objCheck(row, ["mail", "phone"])) {
          this.$store.dispatch('saveEdit', [this, i, row]);
        }
      },
      async setLocked(row, locked) {

        let result = await this.common.reqDef("/ssa/authority/userCfg/updateUserLocked.do", {
          locked: locked,
          userId: row.userId
        });
        this.$store.dispatch('reloadTable', this.id);
        let msg = locked == 0 ? '解锁用户' : '锁定用户';
        if (result.state) {
          msg = msg + "成功!";
        } else {
          msg = msg + "失败!";
        }

        this.$message({
          type: 'success',
          message: msg
        });
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
      }
      //methods end
    },
    mounted: function () {

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
        tableUrl: "/ssa/authority/userCfg/getUserListToGrid.do",
        params: {},
        saveUrl: "/ssa/authority/userCfg/saveUser.do",
        delUrl: "/ssa/authority/userCfg/delUser.do",
      };

      this.$store.commit('registerConf', [this.id, defConf]);
      this.defConf = this.$store.state.editTable[this.id];
      this.$store.dispatch('reloadTable', this.id);

    }
  }

</script>
