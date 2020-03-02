<template>
  <div class="el-panel" :class="{'has-title': title}">
    <span class="left-top"></span><span class="left-bottom"></span>
    <span class="right-top"></span><span class="right-bottom"></span>
    <div class="el-panel-heading" v-if="title">
      <h4 class="el-panel-title">{{title}}</h4>
    </div>
    <div class="el-panel-body shine">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "qinshan-component-panel",
    props: ['title']
  }
</script>

<style scoped>
  .el-panel {
    position: relative;
    margin-bottom: 10px;
    padding: 10px 6px 14px 6px;
    border: 2px solid #13385d;
    border-top: none;
    border-bottom: none;
    border-radius: 8px;
    background-color: transparent;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    height: 100%;
  }
  .el-panel.has-title {
    padding-top: 38px;
  }

  .el-panel-heading {
    padding: 1px 15px;
    background-color: #13395d;
    height: 28px;
    position: absolute;
    left: 0; top: 10px;
    width: 100%;
  }

  .el-panel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 200;
    line-height: 26px;
    color: #fff;
  }

  .el-panel-body {
    padding: 10px 15px;
    height: 100%;
  }

  .shine {
    margin-top: 6px;
    border: 1px solid rgba(12, 49, 60, 0.4);
    box-shadow: 0 0 8px #055177;
  }

  .el-panel > span {
    position: absolute;
    display: inline-block;
    height: 10px;
    width: 2px;
    background-color: #13385d;
  }

  .el-panel > .left-top {
    top: -4px;
    left: 2px;
    -o-transform: rotate(40deg);
    -moz-transform: rotate(40deg);
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }

  .el-panel > .left-bottom {
    bottom: -4px;
    left: 2px;
    -o-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  .el-panel > .right-top {
    right: 2px;
    top: -4px;
    -o-transform: rotate(-40deg);
    -moz-transform: rotate(-40deg);
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }

  .el-panel > .right-bottom {
    right: 2px;
    bottom: -4px;
    -o-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
</style>