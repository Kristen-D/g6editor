<template>
<div>
  <div>
    <el-table v-loading="defConf.loading" :border="true"  :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="50"> </el-table-column>

      <el-table-column  sortable="'custom'" prop="alarm_name" label="名称" align="center">
      </el-table-column>

      <el-table-column  sortable="'custom'" prop="alarm_type" label="类型" align="center" :formatter="fmtalarmTypeList">
      </el-table-column>
      <el-table-column  sortable="'custom'" prop="alarm_level" label="级别" align="center" :formatter="fmtalarmGradeList">
      </el-table-column>
      <el-table-column prop="alarm_desc" label="描述" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column sortable="'custom'" prop="propose" label="处置建议" :show-overflow-tooltip="true" align="center">
      </el-table-column>
      <el-table-column sortable="'custom'" prop="rel_references" label="相关引用" :show-overflow-tooltip="true" align="center" >
      </el-table-column>
      <el-table-column sortable="'custom'" prop="system" label="影响系统"  align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column sortable="'custom'" prop="cveid" label="漏洞编号" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column sortable="'custom'" prop="username" label="增加人"  align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column sortable="'custom'" prop="create_time" label="更新时间" :show-overflow-tooltip="true"  align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="150" align="center">
        <template scope="scope">
          <el-button type="text" @click="handleEdit($index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
          <span style="color: #F3F3F3">|</span>
          <el-button @click="handleDelete($index, scope.row)" type="text" style="color:#00a0fe; margin-left:17px;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="float-r page-location">
             <el-pagination  @current-change="handleCurrentChange"  @size-change="handleSizeChange" background  layout="sizes, prev, pager, next" :total="defConf.total" class="pagination" :page-size="defConf.pageSize" :current-page.sync="defConf.pageIndex">
              </el-pagination>
  </div>

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
      alarmTypeList:state=>state.context.alarmTypeList,
      alarmGradeList:state=>state.context.alarmGradeList,
      userList:state=>state.context.userList
    })
  },
  methods: {
    fmtalarmTypeList(row){
       for(var item in this.alarmTypeList) {
           if (row.alarm_type==this.alarmTypeList[item].id){
             return this.alarmTypeList[item].text;
           }
       }
    },
    fmtalarmGradeList(row){
       for(var item in this.alarmGradeList) {
           if (row.alarm_level==this.alarmGradeList[item].id){
             return this.alarmGradeList[item].text;
           }
       }
    },
    //默认的方法,基本无需修改
    handleEdit(i, row) {
      var params = {};
      params.alarmRepositoryForm = row;
      // if(row.pid=="-1"){
      //   console.log(row.pid);
      //   params.alarmRepositoryForm.alarm_typeArr = row.alarm_type.toString().split(",");
      // }else{
      //     var arr=[];
      //     arr[0]=row.pid.toString();
      //     arr[1]=row.alarm_type.toString();
      //   params.alarmRepositoryForm.alarm_typeArr=arr;
      // }
      //params.alarmRepositoryForm.alarm_typeArr = row.alarm_type.toString().split(",");
      params.handle = "update";
      this.$router.push({
        name: "alarmRepositoryForm",
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

    handleSizeChange(val) {
      this.$store.dispatch('handleSizeChange', [this.id, val]);
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
      tableUrl: "/ssa/alarmRepository/getDataList.do",
      params: {},
      saveUrl: "/ssa/alarmRepository/saveData.do",
      delUrl: "/ssa/alarmRepository/deleteData.do",
    };

    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);

  }
}
</script>
