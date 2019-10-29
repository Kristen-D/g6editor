<template>
  <!-- 我收到的流程-->
<div>
    <toolbar :id="toolBarId"></toolbar>
  <el-tabs v-model="activeTable" @tab-click="handleClick">
    <el-tab-pane :label="todoLabel" name="caseInvestigateTodoTable">
      <caseInvestigateTodoTask :id="caseInvestigateTodoTable"></caseInvestigateTodoTask>
    </el-tab-pane>
    <el-tab-pane :label="hiLabel" name="caseInvestigateHiTable">
      <caseInvestigateHiTask :id="caseInvestigateHiTable"></caseInvestigateHiTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
//网络运营单位收到信息
import caseInvestigateMyTask from './CaseInvestigateMyTask'
import caseInvestigateTodoTask from './CaseInvestigateTodoTask'
import caseInvestigateHiTask from './CaseInvestigateHiTask'
import toolbar from './ToolBar'
import {mapState}from 'vuex'
export default {
  components: {
    toolbar,
    caseInvestigateTodoTask,
    caseInvestigateHiTask,
    caseInvestigateMyTask
  },
  data() {
    return {
      //是否网络运营单位
      activeTable: 'caseInvestigateTodoTable',
      caseInvestigateTodoTable:"caseInvestigateTodoTable",
      caseInvestigateHiTable:"caseInvestigateHiTable",
      toolBarId:"caseInvestigateTodoTable",
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

  }
};
</script>
