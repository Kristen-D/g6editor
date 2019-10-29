<template>
  <!-- 我收到的流程-->
<div>
  <toolbar :id="toolBarId"></toolbar>
  <el-tabs v-model="activeTable" @tab-click="handleClick">
    <el-tab-pane :label="todoLabel" name="eventMgmtTodoTable">
      <eventMgmtTodoTask :id="eventMgmtTodoTable"></eventMgmtTodoTask>
    </el-tab-pane>
    <el-tab-pane :label="hiLabel" name="eventMgmtHiTable">
      <eventMgmtHiTask :id="eventMgmtHiTable"></eventMgmtHiTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
//网络运营单位收到信息

import eventMgmtTodoTask from './EventMgmtTodoTask'
import eventMgmtHiTask from './EventMgmtHiTask'
import toolbar from './Toolbar'
import {mapState}from 'vuex'
export default {
  components: {
    toolbar,
    eventMgmtTodoTask,
    eventMgmtHiTask
  },
  computed: {
    // ...mapState({
    //   roles: state => state.process.roles,
    //   isCompany :state => state.process.isCompany
    // })
  },
  data() {
    return {
      //是否网络运营单位
      activeTable: 'eventMgmtTodoTable',
      eventMgmtTodoTable:"eventMgmtTodoTable",
      eventMgmtHiTable:"eventMgmtHiTable",
      toolBarId:"eventMgmtTodoTable",
      todoLabel:"待处理",
      hiLabel:"已处理"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.toolBarId = tab.name;
    }
  },
  created:function(){
    //判断是否为网络运营单位
    // if(this.isCompany){
    //   this.todoLabel = "待反馈";
    //   this.hiLabel= "已反馈";
    // }
  }
};
</script>
