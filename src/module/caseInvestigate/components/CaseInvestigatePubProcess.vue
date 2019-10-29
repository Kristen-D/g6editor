<template>
<!-- 我发布的流程-->
<div>
  <toolbar :id="toolBarId"></toolbar>

  <el-tabs v-model="activeTable" @tab-click="handleClick">
    <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
      <el-button size="small" @click="handleAdd" type="primary"><i class="icon-add m-r-8"></i>新建</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
    </div>

    <el-tab-pane label="进行中" name="myTaskTable">
      <caseInvestigateMyTask :id="myTaskTable"></caseInvestigateMyTask>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="myTaskHiTable">
      <caseInvestigateMyTask :id="myTaskHiTable"></caseInvestigateMyTask>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import caseInvestigateMyTask from './CaseInvestigateMyTask'
import toolbar from './ToolBar'
export default {
  components: {
    caseInvestigateMyTask,
    toolbar
  },
  data() {
    return {
      activeTable: 'myTaskTable',
      myTaskHiTable: "myTaskHiTable",
      myTaskTable: "myTaskTable",
      toolBarId:"myTaskTable"
    };
  },
  methods: {
    handleAdd() {
      this.$router.push({
        name: 'mainForm',
        params: {
          handle: "add"
        }
      })
    },
    handleClick(tab){
      this.toolBarId = tab.name;
    },
    delCheckedRows() {
    var  rows = this.$store.state.table[this.activeTable].multipleSelection;
      var i;
      for (i in rows) {
        if (rows[i].status == 1) {
          this.$alert('删除数据存在进行中流程', '警告', {
            type: "warning"
          });
          return;
        }
      }
      if (rows.length ==0) {
        this.$alert("请选中删除数据!");
        return;
      }
      this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var caseInvestigateIds = [];
        rows.forEach(row => {
          caseInvestigateIds.push(row.case_id);
        });
        var msg = await this.utils.req("/ssa/caseInvestigate/deleteSelectedcaseInvestigate.do", {
          caseInvestigateIds: caseInvestigateIds
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.myTaskTable);
      })

    }
  }
}
</script>
