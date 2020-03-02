<template>
  <!-- 我收到的流程-->
<div>
  <toolbar :id="toolBarId"></toolbar>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待审批" name="evaluationOrganTodoTable">
      <evaluationOrganTodoTask :id="evaluationOrganTodoTable"></evaluationOrganTodoTask>
    </el-tab-pane>
    <el-tab-pane label="已审批" name="evaluationOrganHiTable">
      <evaluationOrganHiTask :id="evaluationOrganHiTable"></evaluationOrganHiTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import evaluationOrganTodoTask from './EvaluationOrganTodoTask'
import evaluationOrganHiTask from './EvaluationOrganHiTask'
import toolbar from './Toolbar'
export default {
  components: {
    toolbar,
    evaluationOrganTodoTask,
    evaluationOrganHiTask
  },
  data() {
    return {
      currentView: 'evaluationOrganProcess',
      activeName: 'evaluationOrganTodoTable',
      toolBarId:"evaluationOrganTodoTable",
      evaluationOrganTodoTable:"evaluationOrganTodoTable",
      evaluationOrganHiTable:"evaluationOrganHiTable"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.toolBarId = tab.name;
    }
  },
};
</script>
