<template>
<div class="whitebackground Whitespace">
  <div class="top-title">角色管理</div>

  <div :class="['ordinary-search', 'clearfloat']">

    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-input placeholder="角色ID" v-model="params.roleId"> </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input placeholder="角色名" v-model="params.title"> </el-input>
      </el-form-item>

      <el-form-item label="">
        <el-button @click="qryRole()" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>




    <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
    <el-button type="primary" size="small" @click="addRow()"><i class="icon-add m-r-8"></i>添加</el-button>
    <el-button type="primary" size="small" @click="delCheckedRows()"><i class="icon-delet m-r-8"></i>删除</el-button>
  </div>
  <div>
    <editTable :id="tableId"></editTable>
  </div>
  <el-dialog title="权限管理" :visible.sync="addShow" style="overflow:inherit" @close="closeDialog">
    <treeMenu ref="tree" @close="closeDialog"></treeMenu>
  </el-dialog>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import editTable from './RoleEditTable.vue'
import treeMenu from './TreeMenu.vue'
export default {
  components: {
    editTable,
    treeMenu
  },
  data() {

    return {
      //自定义属性
      tableId: "roleCfg",
      params: {
        roleId:null,
        name: null,
        remark: ""
      },
      delSelectedUser: "/ssa/authority/roleCfg/delRole.do",
      addShow: false,
    }
  },
  computed: {
    ...mapState({
      roleList: state => state.context.roleList,
      menuName: state => state.context.menuName,
    })
  },
  methods: {
    closeDialog() {
      this.addShow = false;
      this.$refs.tree.getTree().resetFields();
    },
    qryRole() {
      //  alert(this.$refs["time"].visualValue)
      // this.params.create_time = common.formatDate(this.params.create_time,"yyyy-MM-dd");
      this.$store.commit('setParams', [this.tableId, this.params]);
      this.$store.dispatch('reloadTable', this.tableId);
    },
    addRow() {
      //  this.$store.commit('changeParams', {});
      this.$store.commit('changeEditStatus', true);
      this.addShow = true;
      this.$nextTick(() => {
        this.$refs.tree.initRoleForm();
      });
      // var newRow = {user_id:-1,roleId:null};
      // this.$store.dispatch('addRow',[this.tableId,newRow]);
    },
    async delCheckedRows() {
      var rows = this.$store.state.editTable[this.tableId].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请先选中用户");
        return;
      }

      this.$confirm('此操作将删除选中用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var roleIds = [];
        rows.forEach(row => {
          roleIds.push(row.roleId);
        })
        var ids = roleIds.join(",");
        var data = await this.common.reqDef(this.delSelectedUser, {
          ids: ids
        }, this);
        if (data.state) {
          await this.$store.dispatch('reloadTable', this.tableId);
          this.$message({
            type: 'success',
            message: data.message
          });
        }
        // else {
        //   this.$message({ type: 'error',   message: msg });
        // }
        return data;
      })
    },

    //methods end
  },
  created: async function() {
    this.$store.dispatch('loadTreeMenu');
    //  this.$store.dispatch('loadRoleList');
    // await this.common.req('/authority/roleCfg/getTreeMenu.do');
  }
}
</script>
