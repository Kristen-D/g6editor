<template>
  <div>
    <el-table :data="page.data" stripe border style="width: 100%">
      <slot></slot>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageIndex"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'custom-table',
  props: {
    page: {
      type: Object
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('sizeChange', val);
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    }
  }
}
</script>

