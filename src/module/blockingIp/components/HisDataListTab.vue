<template>
<div>
  <div :class="['ordinary-search', 'clearfloat']">
    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-input v-model="queryForm.ip" placeholder="IP地址"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" v-model="queryForm.startTime_date" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" v-model="queryForm.endTime_date" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button type="primary" class="button-p-2" @click="exportReport">导出</el-button>
      </el-form-item>
    </el-form>

  </div>
  <el-table  :border="true" :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
    <!-- <el-table-column type="selection">
    </el-table-column>  -->
    <!-- <el-table-column prop="shielded_flagName" label="标志" show-overflow-tooltip="true" sortable="'custom'">
    </el-table-column> -->
    <el-table-column prop="ip" label="IP地址" show-overflow-tooltip  sortable="'custom'">
        <template scope="scope">
           <el-button type="text"   @click="showDetail(scope.row)" class="operate-left">{{scope.row.ip}}</el-button>
        </template>
    </el-table-column>
    <!-- <el-table-column prop="option" label="可选项">
    </el-table-column> -->
    <el-table-column  sortable="'custom'" prop="insert_time" label="增加时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column sortable="'custom'" prop="user_name" label="增加人" >
    </el-table-column>
    <el-table-column  sortable="'custom'"  prop="update_time" label="阻断时间"show-overflow-tooltip>
    </el-table-column>
    <el-table-column sortable="'custom'" prop="is_shieldedname" label="阻断状态"  show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="shielded_memo" label="备注" show-overflow-tooltip>
    </el-table-column>
    <!-- <el-table-column label="操作" min-width="190" align="center">
      <template scope="scope">
       <el-button type="text" v-if="scope.row.is_shielded=='0'"   @click="handleEdit(scope.row)" class="operate-left">编辑</el-button>
       <span class="vert-bar-color"  v-if="scope.row.is_shielded=='0'">|</span>
       <el-button type="text" v-if="scope.row.is_shielded=='0'"    @click="handleDelete(scope.$index,scope.row)" class="operate-center">删除</el-button>
       <span class="vert-bar-color" v-if="scope.row.is_shielded=='0'">|</span>
       <el-button type="text" v-if="scope.row.is_shielded=='0'"  @click="handleBlock(scope.$index,scope.row)" class="operate-center">确认阻断</el-button>
     </template>
   </el-table-column> -->
  </el-table>

  <div class="float-r page-location">
             <el-pagination  @current-change="handleCurrentChange"  @size-change="handleSizeChange" background  layout="sizes, prev, pager, next" :total="defConf.total" class="pagination" :page-size="defConf.pageSize" :current-page.sync="defConf.pageIndex">
              </el-pagination>
  </div>
 <el-dialog title="查看账户详情" :visible.sync="myShow" width="85%" @close="onCloseIp()" class="dialog-panel" top="5%">
     <highAccountListTable :id="tableId" :params="param"></highAccountListTable>
 </el-dialog>
  </div>

</template>

<script>
import highAccountListTable from './HighAccountListTable.vue'
export default {
  components: {
    highAccountListTable
  },
  data() {
    return {
      tableId:"accountId",
      // typeOptions:[{name:'系统自增',value:"0"},{name:'人工添加',value:"1"}],
      // shieldOptions:[{name:'未阻断',value:"0"},{name:'已阻断',value:"1"}],
      exportDialogShow:false,
      param:{},
      myShow:false,
      queryForm: {
        startTime_date:null,
        startTime:"",
        endTime_date:null,
        endTime:"",
        shielded_type: "",
        is_shielded:"",
        ip:''
      },
      multipleSelection: [],
      defConf: {}
    }
  },
  props:['id'],
  methods: {
    onCloseIp() {

    },
    exportReport() {
      this.queryForm.startTime = this.utils.formatDate(this.queryForm.startTime_date,"yyyy-MM-dd");
      this.queryForm.endTime = this.utils.formatDate(this.queryForm.endTime_date,"yyyy-MM-dd");
      var param = "type=history&exportFileName=" + "历史阻断IP信息表";
      //var params = this.queryForm;
      if (this.queryForm.startTime != null && this.queryForm.startTime != "") {
        param = param + "&startTime=" + this.queryForm.startTime;
      }

      if (this.queryForm.endTime != null && this.queryForm.endTime != "") {
        param = param + "&endTime=" + this.queryForm.endTime;
      }


      if (this.queryForm.ip != null && this.queryForm.ip != "") {
        param = param + "&ip=" + this.queryForm.ip;
      }

      // if (this.queryForm.shielded_type != null && this.queryForm.shielded_type != "") {
      //   param = param + "&shielded_type=" + this.queryForm.shielded_type;
      // }
      //
      // if (this.queryForm.is_shielded != null && this.queryForm.is_shielded != "") {
      //   param = param + "&is_shielded=" + this.queryForm.is_shielded;
      // }

      //alert(params);
      window.location.href = "/ssa/blockingIp/exportReport.do?" + param;
    },
    showDetail(row) {
    // this.rowData =   this.utils.req("/ssa/blockingIp/getHighAccountData.do", row.ip, this);
    this.param.ip=row.ip;
    this.param.insert_time=row.insert_time;
    this.myShow = true;
    },
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
      return;
    },
    handleSizeChange(val) {
      this.$store.dispatch('handleSizeChange', [this.id, val]);
    },
    //处理排序时候的事件
    handleSortChange(val){
      this.$store.dispatch('handleSortChange',[this.id,val]);
    },
    importEvent() {
      this.exportDialogShow = true;
    },
    // exportReport() {
    //   var params = "exportFileName=" + "恶意资产IP表";
    //   //var params = this.queryForm;
    //   if (this.queryForm.malicious_type != null && this.queryForm.malicious_type != "") {
    //     params = params + "&malicious_type=" + this.queryForm.malicious_type;
    //   }
    //   if (this.queryForm.ip_addr != null && this.queryForm.ip_addr != "") {
    //     params = params + "&ip_addr=" + this.queryForm.ip_addr;
    //   }
    //   //alert(params);
    //   window.location.href = "/ssa/maliciousAssets/exportReport.do?" + params;
    // },
    handleDelete(i, row) {
      this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var ids = [];
        ids.push(row.id);
        var msg = await this.utils.req("/ssa/blockingIp/deleteblockingIps.do", {
          ids: ids
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },

    handleBlock(i, row) {
      if(row.shield_allow==1){
        this.$alert('选择的数据中存在不能操作的数据', '警告', {
          type: "warning"
        });
        return;
      }
      this.$confirm('此操作将联动送DE进行阻断？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {

        var ids = [];
        ids.push(row.id);
        var msg = await this.utils.req("/ssa/blockingIp/updateblockingStatus.do", {
          ids: ids
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    queryData() {
      this.queryForm.startTime = this.utils.formatDate(this.queryForm.startTime_date,"yyyy-MM-dd");
      this.queryForm.endTime = this.utils.formatDate(this.queryForm.endTime_date,"yyyy-MM-dd");
      var params = this.queryForm;
      this.$store.commit('setParams', [this.id, params]);
      this.$store.dispatch('reloadTable', this.id);
    },
    handleSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      if (response.state) {
        this.exportDialogShow = false;
        this.$store.dispatch('reloadTable', this.id);
        this.$message({
          type: 'success',
          message: '导入成功！'
        })
      } else {
        this.exportDialogShow = false;
        this.$message({
          type: 'error',
          message: response.message
        })
      }
    },
    handleEdit(row) {
      var params = {};
      row.handle = "update";
      //row.tkey = "addInfoForm";
      this.$router.push({
        name: 'mainForm',
        params: row
      })
    },
    eventClick() {
      this.$router.push({
        name: 'mainForm',
        params: {
          handle: "add",
          tkey: "addInfoForm"
        }
      })
    },
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    async delCheckedRows() {
      var rows = this.$store.state.table[this.id].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请选中删除数据!", {
          type: 'warning'
        });
        return;
      }
      this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var ids = [];
        rows.forEach(row => {
          ids.push(row.id);
        });
        var msg = await this.utils.req("/ssa/blockingIp/deleteblockingIps.do", {
          ids: ids
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },

    async updateCheckedRows() {
      var rows = this.$store.state.table[this.id].multipleSelection;
      var i=0;
      for (i in rows) {
        if (rows[i].shield_allow == 1) {
          this.$alert('选择的数据中存在不能操作的数据', '警告', {
            type: "warning"
          });
          return;
        }
      }
      if (rows.length <= 0) {
        this.$alert("请选中需要设置DE联动阻断的数据!", {
          type: 'warning'
        });
        return;
      }
      this.$confirm('此操作将选中条目设置为DE联动阻断的数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var ids = [];
        rows.forEach(row => {
          ids.push(row.id);
        });
        var msg = await this.utils.req("/ssa/blockingIp/updateblockingStatus.do", {
          ids: ids
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },
    async exportTDA() {
      var rows = this.$store.state.table[this.id].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请选中需要发送给TDA的数据!", {
          type: 'warning'
        });
        return;
      }
        var maliciousIds = [];
        var maliciousIps = [];
        rows.forEach(row => {
          maliciousIps.push(row.ip_addr);
          maliciousIds.push(row.malicious_id);
        });

        this.$router.push({
          name: 'tdaForm',
          params: {
            maliciousIds: maliciousIds,
            maliciousIps: maliciousIps,
            handle:'add'

          }
        })
    },

  },
  created: async function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/blockingIp/getHisTableData.do",
      params: {},
      saveUrl: "/ssa/blockingIp/saveRecord.do",
      delUrl: "/ssa/blockingIp/deletemaliciousAssets.do"

    };
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
