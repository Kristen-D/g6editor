<template>
  <div class="el-panel-white mygrid-def">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">{{title}}</h3>
    </div>
    <div class="el-panel-white-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "white-gird-header",
    props: ['title']
  }
</script>

<style scoped>

</style>