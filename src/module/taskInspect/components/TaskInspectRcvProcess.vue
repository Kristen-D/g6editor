<template>
  <!-- 我收到的流程-->
<div>
    <toolbar :id="toolBarId"></toolbar>
  <el-tabs v-model="activeTable" @tab-click="handleClick">
    <el-tab-pane v-if="isCompany" label="通知" name="companyTable">
      <taskInspectMyTask :id="taskInspectMyTable"></taskInspectMyTask>
    </el-tab-pane>
    <el-tab-pane :label="todoLabel" name="taskInspectTodoTable">
      <taskInspectTodoTask :id="taskInspectTodoTable"></taskInspectTodoTask>
    </el-tab-pane>
    <el-tab-pane :label="hiLabel" name="taskInspectHiTable">
      <taskInspectHiTask :id="taskInspectHiTable"></taskInspectHiTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
//网络运营单位收到信息
import taskInspectMyTask from './TaskInspectMyTask'
import taskInspectTodoTask from './TaskInspectTodoTask'
import taskInspectHiTask from './TaskInspectHiTask'
import toolbar from './Toolbar'
import {mapState}from 'vuex'
export default {
  components: {
    toolbar,
    taskInspectTodoTask,
    taskInspectHiTask,
    taskInspectMyTask
  },
  computed: {
    ...mapState({
      roles: state => state.process.roles,
      isCompany :state => state.process.isCompany
    })
  },
  data() {
    return {
      //是否网络运营单位
      activeTable: 'taskInspectTodoTable',
      taskInspectTodoTable:"taskInspectTodoTable",
      taskInspectHiTable:"taskInspectHiTable",
      taskInspectMyTable:"companyTable",
      toolBarId:"taskInspectTodoTable",
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
    if(this.isCompany){
      this.todoLabel = "待反馈";
      this.hiLabel= "已反馈";
    }
  }
};
</script>
