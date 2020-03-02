<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title">
        <i class="el-icon-caret-right title-symbol"></i>
        <template v-if="title">{{title}}</template>
        <span class="el-panel-bigscreen-small" v-if="subtitle">{{subtitle}}</span></h3>
        <div v-if="title=='全球攻击态势'|| title=='全球和中国攻击态势'||title=='中国攻击态势'"class="day_time">
          <span>告警：{{alarmAllTotal}}条，</span>
          <span>阻断：{{blockTotal}}条，</span>
          <span>阻断率：{{blockCenter}}%</span>
        </div>
    </div>
    <div class="el-panel-bigscreen-body">
      <slot></slot>
    </div>

  </div>
</template>

<script>
import * as types from '../store/mutation-types';
import {mapState,mapActions } from 'vuex'
  export default {
    name: "big-screen-grid-header",
    props: ['title', 'subtitle'],
    computed:{
      ...mapState({
          alarmAllTotal:state=>state.context.alarmAllTotal,
          blockTotal:state=>state.context.blockTotal,
          blockCenter:state=>state.context.blockCenter,
     })},

}
</script>

<style scoped>
  .el-panel-bigscreen {
    margin-bottom: 16px;
    background-color: transparent;
    height: 100%;
    position: relative;
    padding-top: 42px;
  }

  .el-panel-bigscreen-heading {
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .el-panel-bigscreen-title {
    font-family: "Microsoft YaHei UI";
    font-weight: 400;
    line-height: 22px;
    color: inherit;
    font-size: 22px;
  }

  .el-panel-bigscreen-small {
    color: #999;
    font-size: 16px;
    margin-left: 0;
  }

  .el-panel-bigscreen-body {
    padding: 10px;
    height: 100%;
  }

  .title-symbol {
    font-size: 12px;
    margin-right: 10px;
    vertical-align: top;
    margin-top: 4px;
  }

</style>
