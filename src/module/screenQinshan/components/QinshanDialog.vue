<template>
  <div class="qinshan-dialog">
    <el-dialog
        :visible.sync="dialog.visible"
        @close="dialogClose"
        size="normal">
      <qinshan-component-panel :title="dialog.title">
        <slot></slot>
      </qinshan-component-panel>
    </el-dialog>
  </div>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";

  export default {
    components: {QinshanComponentPanel},
    name: "qinshan-dialog",
    props: {
      dialog: Object,
      width: String
    },
    methods: {
      dialogClose() {
        this.$emit('close');
      }
    },
    mounted () {

    }
  }
</script>

<style>
  .qinshan-dialog .el-dialog {
    background: transparent;
    box-shadow: none;
  }
  .qinshan-dialog .el-dialog__headerbtn {
    position: absolute;
    top: 65px;
    right: 40px;
    z-index: 1;
  }
  .qinshan-dialog .el-table,
  .qinshan-dialog .el-table th,
  .qinshan-dialog thead div,
  .qinshan-dialog .el-table tr,
  .qinshan-dialog .el-table td,
  .qinshan-dialog .el-table::after,
  .qinshan-dialog .el-table::before{
    background: transparent;
    border-color: #13456c;
    text-align: center;
  }
  .qinshan-dialog .el-table th>.cell {
    color: white;
  }
  .qinshan-dialog .el-table td {
    color: #3b8fcf;
  }
  .qinshan-dialog .el-table--striped .el-table__body tr.el-table__row--striped td,
  .qinshan-dialog .el-table--striped .el-table__body tr.el-table__row--striped td:hover {
    background: #0e2d46;
  }
  .qinshan-dialog .el-panel-body {
    max-height: 500px;
    overflow: auto;
  }
</style>
