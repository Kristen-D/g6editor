<template>
  <div class="el-panel">
    <div class="el-panel-heading">
      <h4 class="el-panel-title" v-if="title">
        <i class="rectangle-icon"></i>{{title}}
      </h4>
    </div>
    <div class="el-panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "big-screen-header",
    props: ['title', 'subText']
  }
</script>

<style scoped>
  .el-panel h4 {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
