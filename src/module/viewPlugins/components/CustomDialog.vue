<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="85%" class="dialog-panel" top="5%">
    <template v-if="dialog.component === 'DataTotalTable'">
      <data-total-table :tableData="dialog.data"></data-total-table>
    </template>
  </el-dialog>
</template>

<script>
  import DataTotalTable from '../../../components/gridster/netAttack_grid/DataTotalTable';
  export default {
    components: {DataTotalTable},
    name: "dialog",
    computed: {
      dialog () {
        return this.$store.state.dialog;
      }
    }
  }
</script>

<style scoped>

</style>
