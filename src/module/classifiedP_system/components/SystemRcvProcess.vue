<template>
  <!-- 我收到的流程-->
<div>
  <toolbar :id="toolBarId"></toolbar>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待处理" name="systemTodoTable">
      <systemTodoTask :id="systemTodoTable"></systemTodoTask>
    </el-tab-pane>
    <el-tab-pane label="已处理" name="systemHiTable">
      <sytemHiTask :id="systemHiTable"></sytemHiTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import systemTodoTask from './SystemTodoTask.vue'
import sytemHiTask from './SystemHiTask.vue'
import toolbar from './Toolbar'
export default {
  components: {
    toolbar,
    systemTodoTask,
    sytemHiTask
  },
  data() {
    return {
      currentView: 'systemProcess',
      activeName: 'systemTodoTable',
      toolBarId:"systemTodoTable",
      systemHiTable:"systemHiTable",
      systemTodoTable:"systemTodoTable"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.toolBarId = tab.name;
    }
  },
};
</script>
