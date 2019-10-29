<template>
<div>
  <div>
    <el-table v-loading="defConf.loading" :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="50"> </el-table-column>

      <el-table-column  sortable="'custom'" prop="template_typename" label="模板类型" align="center">
      </el-table-column>

      <el-table-column  sortable="'custom'" prop="template_name" label="模板名称" align="center">
      </el-table-column>
      <el-table-column  sortable="'custom'" prop="content" label="模板内容" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="memo" label="模板说明" align="center">
      </el-table-column>
      <el-table-column sortable="'custom'" prop="insert_time" label="修改时间" min-width="150" align="center">
      </el-table-column>
      <el-table-column  label="操作" min-width="120" align="center">
<template   scope="scope">
        <div>
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
          <span style="color: #F3F3F3">|</span>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" style="color:#00a0fe; margin-left:17px;">删除</el-button>
        </div>
      </template>
</el-table-column>
    </el-table>
  </div>

  <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>

</div>
</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      defConf: {},

    }
  },
  props: ['id'],
  computed: {
    ...mapState({
      // alarmTypeList:state=>state.context.alarmTypeList,
      // alarmGradeList:state=>state.context.alarmGradeList
      //emailTemplateList:state=>state.context.emailTemplateList
    })
  },
  methods: {
    //默认的方法,基本无需修改
    handleEdit(i, row) {
      var params = {};
      params = row;
      params.handle = "update";
      this.$router.push({
        name: "alarmTemplateForm",
        params: params
      });
    },
    handleDelete(i, row) {
      this.$store.dispatch('handleDelete', [this, i, row]);
    },
    saveEdit(i, row) {
      if (this.checkNoNull(row)) {
        this.$store.dispatch('saveEdit', [this, i, row]);
      }
    },
    cancelEdit() {
      this.$store.commit('cancelEdit', this.id);
      //  this.$store.dispatch('reloadTable',this.id);
    },
    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    }
    //methods end
  },
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/alarm_template/getDataList.do",
      params: {},
      saveUrl: "/ssa/alarm_template/saveData.do",
      delUrl: "/ssa/alarm_template/deleteData.do",
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);

  }
}
</script>
