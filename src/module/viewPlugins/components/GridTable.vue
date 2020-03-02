<template>
  <div>
    <el-table ref="userTable" v-loading="loading" :data="tableData" border @sort-change="handleSortChange"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="50"> </el-table-column>


      <el-table-column prop="grid_page_id" label="ID" width="100" align="center">
      </el-table-column>

      <el-table-column label="面板名称" prop="grid_page_name" min-width="100" align="center">
      </el-table-column>

      <el-table-column label="对应菜单" prop="p_name" min-width="100" align="center">
      </el-table-column>

      <el-table-column label="对应权限" prop="role_name" min-width="100" align="center">
      </el-table-column>

      <el-table-column label="主题" prop="theme_name" min-width="100" align="center">
      </el-table-column>

      <el-table-column label="操作" min-width="120" align="center">
        <template scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)" class="operate-center">编辑</el-button>
          <span class="vert-bar-color">|</span>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)" class="operate-right">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagelocation">
      <el-pagination @current-change="handleCurrentChange" :page-size="params.pageSize" :current-page="params.pageIndex"
        layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>




</template>

<script>
  import {
    mapState
  } from 'vuex'
  import tableCommon from 'components/table/tableCommon.js'
  export default {
    data() {
      return {

      }
    },
    props: ['params'],
    mixins: [tableCommon],
    computed: {
      ...mapState({

      })
    },
    methods: {
      //默认的方法,基本无需修改
      handleEdit(i, row) {
        let params = {
          gridPageId: row.grid_page_id,
          gridPageName: row.grid_page_name,
          permissionId: row.permission_id,
          roleId: row.role_id,
          themeValue: row.theme_value
        };
        this.$router.push({
          name: 'dynamicContext',
          params: params
        });
      },
      handleDelete(i, row) {
        this.$confirm('此操作将删除该行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = {
            gridPageId: row.grid_page_id
          }
          await this.common.req(this.delUrl, params);
          this.loadTable();
        })

      },
      //处理选中多选的row
      handleSelectionChange(selectedRow) {
        this.multipleSelection = selectedRow;
      },
      //处理翻页时候的事件
      handleCurrentChange(pageIndex) {
        this.params.pageIndex = pageIndex;
        this.loadTable();
      },
      //处理排序时候的事件
      handleSortChange(val) {

      },
      loadTable() {
        this.loading = true;
        this.common.req(this.tableUrl, this.params).then(data => {
          this.tableData = data.rowData;
          this.total = data.total;
          this.loading = false;
        });
      },

      //默认方法结束

    },
    mounted: function () {

    },
    created: function () {
      this.$watch('params', params => {
        this.params = params;
      }, {
        deep: true
      })

      this.tableUrl = "/ssa/viewPlugins/listGirdPage.do";
      this.delUrl = "/ssa/viewPlugins/deleteGridPage.do";
      this.loadTable();
    }
  }

</script>
