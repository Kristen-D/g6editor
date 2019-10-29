<template>
  <div class="cus-container">
    <div class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <el-table @expand-change="expand" :data="page.data" stripe border style="width: 100%">
      <slot name="table"></slot>
    </el-table>
    <el-pagination
      class="cus-pagination"
      background
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="page.pageIndex"
      :total="page.total">
    </el-pagination>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['page'],
  methods: {
    handleCurrentChange (pageIndex) {
      this.$emit('currentChange', pageIndex);
    },
    expand (row, expandedRows) {
      this.$emit('expand', row);
    }
  }
}
</script>

<style scope>
.cus-container {
  padding: 10px 10px 25px 10px;
  overflow: hidden;
}
.cus-container .toolbar {
  margin-bottom: 10px;
}
.cus-container .cus-pagination {
  float: right;
  margin-top: 5px;
}
</style>

<style>
  .cus-container .el-form-item {
    margin-bottom: 0;
  }
</style>
