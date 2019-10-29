<template>
<div class="">
  <!-- {{checkList}} {{tableId}} -->
  <el-table :data="defConf.tableData" style="width: 100%" @selection-change="handleSelectionChange">

    <el-table-column :prop="key" :label="value" v-for="(value, key) in columnList" :show-overflow-tooltip="key=='notice_desc' || key=='notice_name'"  :sortable="key=='assetCode'" align="center">
    </el-table-column>
    <el-table-column prop="attachment_filename" label="附件" align="center" show-overflow-tooltip>
      <template scope="scope">
        <el-button type="text" @click="downloadFile(scope.row.notice_code)" v-if="scope.row.attachment_filepath != null&& scope.row.attachment_filepath != '' ">{{scope.row.attachment_filename}}</el-button>
        <el-button type="text" v-else>{{scope.row.attachment_filename}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作"  align="center" width="180">
      <template scope="scope">
        <el-button  type="text" size="small" @click="handleView(scope.row)">查看</el-button>
        <el-button type="text" v-if="scope.row.status =='0'"  @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
        <span v-if="scope.row.status =='0'"  style="color: #F3F3F3">|</span>
        <el-button type="text" v-if="scope.row.status =='0'"  @click="handleDelete(scope.$index, scope.row)" style="color:#00a0fe; margin-left:17px;">删除</el-button>

      </template>
    </el-table-column>
    <div slot="empty" >
      <div class="" v-if="(!defConf.tableData || defConf.tableData.length == 0) && 'loaded' == defConf.loading">
        <i class="el-icon-document"></i> 没有相关数据！
      </div>

      <div class="" v-if="'wrong' == defConf.loading">
        <i class="el-icon-warning"></i> 数据加载错误！ 点击 <a @click="refresh">刷新</a>
      </div>

      <div class="" v-if="'load' == defConf.loading">
        <i class="el-icon-loading"></i> 正在读取数据，请稍后...
      </div>
    </div>

  </el-table>


  <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>
</div>
</template>

<script>
export default {
  components: {},
  props: ['checkList', 'id'],
  computed: {
    columnList: function() {
      if (this.checkList.length > 0) {
        let ob = "{";
        for (let x in this.checkList) {
          ob = ob + this.checkList[x] + ",";
        }
        let nob = ob.substring(0, ob.length - 1) + "}";
        return JSON.parse(nob);
      } else {
        return {};
      }

    }
  },
  data() {
    return {
      defConf: {},
    }
  },
  methods: {
    downloadFile(id) {
      var fileUrl = "/ssa/alertNotice/downloadFile.do?notice_code=" + id;
      window.location.href = fileUrl;
    },
    refresh() {
      this.$store.dispatch('reloadTable', this.id);
    },
    filterType(value, row) {
      return row.type == value;
    },
    //默认的方法,基本无需修改
    handleEdit(i, row) {
      row.tableId = this.id;
      this.$router.push({
          name:'noticeInfoForm',
          params: row
        })
      // this.$store.dispatch('handleEdit', [this.id, i, row]);
    },
    //查看
    handleView(row){
      row.handle = "view";
      var processInstance ={};
      processInstance.processInstanceId = row.processInstanceId;
      row.processInstance = processInstance;
      this.$router.push({
        name: 'noticeHandle',
        params: row
      });
    },
    handleDelete(i, row) {
      this.$store.dispatch('handleDelete', [this, i, {"noticeIds":[row.notice_code]}]);
    },
    saveEdit(i, row) {
      if (this.objCheckNull(row, ["name", "mail|phone"]) && this.objCheck(row, ["mail", "phone"])) {
        this.$store.dispatch('saveEdit', [this, i, row]);
      }
    },
    cancelEdit() {
      this.$store.commit('cancelEdit', this.id);
    },
    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      // var i = selectedRow.length;
      // while (i--) {
      //   if (selectedRow[i].status != 0 && selectedRow[i].status != 2) {
      //     selectedRow.splice(i, 1);
      //     this.$alert("流程进行中无法删除数据", "警告", {
      //       type: 'warning'
      //     });
      //   } else if (selectedRow[i].status == 2) {
      //     selectedRow.splice(i, 1);
      //     this.$alert("流程归档无法删除数据", "警告", {
      //       type: 'warning'
      //     });
      //   }
      // }

      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
      return;
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    }
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
      tableUrl: "/ssa/alertNotice/queryNoticeInfo.do",
      params: {},
      saveUrl: "/ssa/alertNotice/saveNoticeInfo.do",
      delUrl: "/ssa/alertNotice/delNoticeInfo.do",
    };
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>

<style>

</style>
