<template>
  <div>
    <div>
      <el-table
        ref="deftable"
        v-loading="loading"
        :highlight-current-row="!!highlightCurrentRow"
        :data="tableData"
        border=""
        style="width: 100%"
        @current-change="currentChange"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
      >
        <slot name="fixedColumn"></slot>
        <el-table-column
          v-for="(item,index) in customColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          show-overflow-tooltip
          min-width="100"
        ></el-table-column>
        <slot name="actionColumn"></slot>
      </el-table>
    </div>
    <br>
    <div class="col-lg-13 pull-right">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="pageIndex"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
      multipleSelection: [],
      pageIndex: 1,
      total: 0,
      loading: false,
      selectedRow: [],
      tableData: [],
      sortKey: null,
      sort: null,
      sortMap: {
        ascending: "asc",
        descending: "desc"
      },

      //默认ajax属性
    }
  },
  props: {
    highlightCurrentRow: Boolean,
    params: Object,
    delUrl: String,
    loadUrl: String,
    customColumns: Array,
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    ...mapState({
      roleList: state => state.user.roleList,
      roleMap: state => state.user.roleMap,
      orgList: state => state.user.orgList,
      orgMap: state => state.user.orgMap,
    })
  },
  methods: {
    setCurrentRow(row) {
      this.$refs.deftable.setCurrentRow(row);
    },
    getTableData() {
      return this.tableData;
    },
    async loadTableData() {
      this.loading = true;
      let params = this.params;
      params.pageSize = this.pageSize;
      params.pageIndex = this.pageIndex;
      params.sortKey = this.sortKey;
      params.sort = this.sort;
      
      let res = await this.common.reqDef(this.loadUrl, params);
      if (res.data) {
        let gridData = res.data;
        this.setTableAfterLoad(gridData);
        return gridData;
      } else {
        this.loading = false;
        return null;
      }



    },
    async reloadTable() {
      this.loadTableData();
      this.pageIndex = 1;
    },
    currentChange(currentRow, oldCurrentRow) {
      this.$emit("currentChange", currentRow, oldCurrentRow);
    },
    setTableAfterLoad(data) {
      this.tableData = data.rowData;
      this.loading = false;
      this.total = data.total;
    },
    handleSelectionChange(selectedRow) {
      this.selectedRow = selectedRow;
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.loadTableData();
    },
    handleSortChange(val) {
      this.sortKey = val.prop;
      this.sort = this.sortMap[val.order];
      this.loadTableData();
    },

    isNull(val) {
      return val == null || val == "";
    }

    //methods end
  },
  created: function () {

  }
}

</script>
