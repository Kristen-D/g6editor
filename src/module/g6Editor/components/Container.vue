<template>
  <div class="cus-container">
    <div class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <el-table :data="page.data" stripe border style="width: 100%">
      <slot name="table"></slot>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="page.number"
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
    }
  }
}
</script>

<style scope>
.cus-container {
  padding: 15px;
}
.cus-container .toolbar {
  margin-bottom: 10px;
}
</style>
