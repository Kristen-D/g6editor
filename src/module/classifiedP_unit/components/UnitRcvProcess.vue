<template>
  <!-- 我收到的流程-->
<div>
  <toolbar :id="toolBarId"></toolbar>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待审批" name="unitTodoTable">
      <unitTodoTask :id="unitTodoTable"></unitTodoTask>
    </el-tab-pane>
    <el-tab-pane label="已审批" name="unitHiTable">
      <unitHiTask :id="unitHiTable"></unitHiTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import unitTodoTask from './UnitTodoTask.vue'
import unitHiTask from './UnitHiTask.vue'
import toolbar from './Toolbar'
export default {
  components: {
    toolbar,
    unitTodoTask,
    unitHiTask
  },
  data() {
    return {
      currentView: 'unitProcess',
      activeName: 'unitTodoTable',
      toolBarId:"unitTodoTable",
      unitHiTable:"unitHiTable",
      unitTodoTable:"unitTodoTable"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
