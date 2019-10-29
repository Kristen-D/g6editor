<template>
  <div>
    <div class="search" style="height:54px">
      <div class="float-r button-toolbar">
        <el-button type="primary" size="small" @click="addRow()"><i class="icon-add m-r-8"></i>新增</el-button>
        <el-button type="primary" size="small" @click="delCheckedRows()"><i class="icon-delet m-r-8"></i>删除</el-button>
        <el-button type="primary" size="small" @click="batchExport()">导出</el-button>
      </div>
    </div>
    <div>
      <el-table v-loading="defConf.loading" :data="defConf.tableData" class="white-table" style="width: 100%" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column v-for="(value,key) in columnList" :prop="key" :label="value"></el-table-column>
        <el-table-column label="操作" align="center" min-width="180">
          <template scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)" class="p-0 text-primary text-xs">编辑</el-button>
            <span style="color: #F3F3F3">|</span>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)" class="p-0 text-primary text-xs">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagelocation">
        <el-pagination class="pagination" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="defConf.pageSize" :current-page.sync="defConf.pageIndex" background layout="total,sizes, prev, pager, next, jumper" :total="defConf.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="exportVisible" width="450px">
      <div class="dialog-confirm">
        <p>确认<span style="color: #2500ae;">导出所有黑名单，</span>以Excel格式存入本地?</p>
        <!-- <p>(不超过50000条)</p> -->
        <div class="flexCenter p-32-button el-button--purple">
          <el-button type="primary" @click="exportReport">确认</el-button>
          <el-button type="gray" @click="closeDialog()">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import commonAjax from 'components/js/common.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      exportVisible:false,
      defConf: {},
      fieldNameList: {},
      idList: {},
      columnList:{},
      delSelected: "/ssa/blackWhiteList/deleteCheckedRows.do",
    }
  },
  props: ['id'],
  computed: {
    ...mapState({
      listTypeList: state => state.context.listTypeList
    })
  },
  // watch:{
  //   id(val){
  //     this.qryData();
  //   }
  // },
  methods: {
    //默认的方法,基本无需修改
    handleEdit(i, row) {
      var params = row;
      params.handle = "update";
      params.testList = this.columnList;
      this.$router.push({ name: "blackForm", params: params });

      // this.$store.dispatch('handleEdit',[this.id,i,row]);
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
    },
    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleSizeChange(pageSize){
      this.$store.dispatch('handleSizeChange', [this.id, pageSize]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    },
    //默认方法结束

    //自定义方法
    fmtType(val) {

      for (var item in this.listTypeList) {
        if (val == this.listTypeList[item].id) {
          return this.listTypeList[item].text;
        }
      }

    },
    checkNoNull(row) {

      if (row.list_type_id == null || row.list_type_id == '') {
        this.$message.error({ message: '名单类型不能为空', duration: 1000, showClose: true });
        return false;
      }
      if (row.list_value == null || row.list_value == '') {
        this.$message.error({ message: '内容不能为空', duration: 1000, showClose: true });
        return false;
      }


      return true;
    },
    //请求当前类型的列表
    qryData() {
      this.listTypeList.map(val => {
        this.fieldNameList[val.text] = val.remark;
        this.idList[val.text] = val.id;
      });
      var fieldName = this.fieldNameList[this.id];
      this.columnList = this.getColumnList(fieldName);
      var params = {
        list_type_id: this.idList[this.id],
        list_value: this.id,
      };
      this.$store.commit('setParams', [this.id, params]);
      this.$store.dispatch('reloadTable', this.id);
    },
    getColumnList(fieldName) {
      var dataArr = fieldName.split(",");
      var columnList = {};
      dataArr.map((value, key) => {

        var listKey = "value" + (key + 1);
        columnList[listKey] = value;
      })
      // console.log(columnList)
      return columnList
    },
    //添加功能
    addRow(val) {
      var params = {};
      params.handle = "add";
      params.bw_type = "0";
      params.list_type_id = this.idList[this.id];
      params.testList = this.columnList

      this.$router.push({
        name: "blackForm",
        params: params
      })
    },
    //列表上方删除功能
    delCheckedRows() {
      var rows = this.$store.state.editTable[this.id].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请先选中数据");
        return;
      }

      this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        var data_ids = [];
        rows.forEach(row => {
          data_ids.push(row.listId);
        })
        var ids = data_ids.join(",");
        var msg = await commonAjax.reqBackState(this.delSelected, {
          ids: ids
        });
        await this.$store.dispatch('reloadTable', this.id);
        if(msg){
          this.$message({
            type: 'success',
            message: msg.data
          });
        }else{
          this.$message({
            type: 'error',
            message: msg.data
          });
        }

      })
    },
    batchExport() {
      if(this.defConf.total < 50000){
        this.exportVisible = true;
      }else{
        this.$message({
          type:'warning',
          message:'导出黑名单数量不能超过50000条！'
        })
      }
    },

    //导出
    exportReport() {
      var fieldName = this.fieldNameList[this.id];//字符串的形式
      this.exportVisible = false;
      var param = "bw_type=0&exportFileName=" + "黑名单表&fieldName=" + fieldName + "&list_type_id="+this.idList[this.id] + "&list_value=" + this.id;
      window.location.href = "/ssa/blackWhiteList/exportReport.do?" + param;
    },
    closeDialog(){
      this.exportVisible = false;
    }
    //methods end
  },
  created: function() {
    // console.log(id)
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
      tableUrl: "/ssa/blackWhiteList/getDataList.do",
      params: { bw_type: "0" }, //初始化设置黑白名单类型,黑名单为0，白名单为1
      saveUrl: "/ssa/blackWhiteList/saveData.do",
      delUrl: "/ssa/blackWhiteList/deleteData.do",
    };
    // console.log(defConf.params)
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    // this.$store.dispatch('reloadTable', this.id);
    this.qryData();
  }
}

</script>
