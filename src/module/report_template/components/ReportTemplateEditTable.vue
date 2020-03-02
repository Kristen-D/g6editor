<template>
<div class="">
  <el-table :data="defConf.tableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="templateName" label="模版名称" align="center">
    </el-table-column>
    <!-- <el-table-column label="Excel模版" align="center">
      <template scope="scope">
        <a :href="'/ssa/reportTemplateManage/downloadTemplate.do?id='+scope.row.id+'&templateName='+scope.row.excelTemplate">点击下载</a>
      </template>
    </el-table-column>
    <el-table-column label="Word模版" align="center">
      <template scope="scope">
        <a :href="'/ssa/reportTemplateManage/downloadTemplate.do?id='+scope.row.id+'&templateName='+scope.row.wordTemplate">点击下载</a>
      </template>
    </el-table-column>
    <el-table-column prop="reportSql" label="统计语句" align="center" show-overflow-tooltip>
    </el-table-column> -->
    <el-table-column label="报表链接" align="center">
      <template scope="scope">
        <el-button type="text" @click="showReportUrl(scope.$index, scope.row)" >点击查看报表链接</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="description" label="描述" align="center">
    </el-table-column>
    <!-- <el-table-column :prop="key" :label="value" v-for="(value, key) in columnList" :sortable="key==='assetCode'" align="center">
    </el-table-column> -->
    <el-table-column label="操作" align="center" width="200">
      <template scope="scope">
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
        <span style="color: #F3F3F3">|</span>
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="color:#00a0fe; margin-left:17px;">删除</el-button>


      </template>
    </el-table-column>
    <div slot="empty" >
      <div class="" v-if="(!defConf.tableData || defConf.tableData.length === 0) && 'loaded' === defConf.loading">
        <i class="el-icon-document"></i> 没有相关数据！
      </div>

      <div class="" v-if="'wrong' === defConf.loading">
        <i class="el-icon-warning"></i> 数据加载错误！ 点击 <a @click="refresh">刷新</a>
      </div>

      <div class="" v-if="'load' === defConf.loading">
        <i class="el-icon-loading"></i> 正在读取数据，请稍后...
      </div>
    </div>

  </el-table>


  <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>

  <el-dialog title="报表链接详情" :visible.sync="reportUrlFlag">
    <el-table :data="reportUrlData" border>
    <el-table-column property="tabName" label="Tab名称" align="center" width="150px"></el-table-column>
    <el-table-column property="reportUrl" label="报表链接" align="center"></el-table-column>
    <!-- <el-table-column property="address" label="地址"></el-table-column> -->
  </el-table>
  </el-dialog>
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
      reportUrlFlag: false,
      reportUrlData: []
    }
  },
  methods: {
    showReportUrl(i, row) {
      this.reportUrlData = row.urls;
      this.reportUrlFlag = true;
    },
    refresh() {
      this.$store.dispatch('reloadTable', this.id);
    },
    filterType(value, row) {
      return row.type === value;
    },
    //默认的方法,基本无需修改
    handleEdit(i, row) {
      row.tableId = this.id;
      this.$router.push({name:'reportTemplateForm', params:row })
      // this.$store.dispatch('handleEdit', [this.id, i, row]);
    },
    handleDelete(i, row) {
      this.$store.dispatch('handleDelete', [this, i, {"ids":[row.id]}]);
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
      tableUrl: "/ssa/reportTemplateManage/searchTemplate.do",
      params: {},
      saveUrl: "/ssa/reportTemplateManage/addOrModifyVendorInfo.do",
      delUrl: "/ssa/reportTemplateManage/deleteTemplate.do",
    };
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>

<style>
a:link {
  color: #337ab7;
}
</style>
