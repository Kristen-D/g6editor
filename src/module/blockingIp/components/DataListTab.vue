<template>
<div>
  <div :class="['ordinary-search', 'clearfloat']">
    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-select v-model="queryForm.shielded_type" clearable  placeholder="选择标志">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="queryForm.is_shielded" clearable  placeholder="阻断状态">
          <el-option v-for="item in shieldOptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="queryForm.shield_allow" clearable  placeholder="允许状态">
          <el-option v-for="item in allowOptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
    <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
      <el-button size="small" @click="eventClick" type="primary"><i class="icon-add m-r-8"></i>新建</el-button>
        <!-- <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button> -->
      <el-button type="primary" size="small" @click="moveCheckedRows"><i class="icon-delet m-r-8"></i>批量移除</el-button>
      <el-button type="primary" size="small" @click="updateCheckedRows">批量阻断</el-button>
      <el-button type="primary" size="small" @click="updateCheckedNRows">批量不阻断</el-button>
    </div>
  <el-table  :border="true" :data="defConf.tableData"  :height="400"  v-loading="defConf.loading" style="width: 100%" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
    <el-table-column type="selection">
    </el-table-column>
    <!-- <el-table-column prop="shielded_flagName" label="标志" show-overflow-tooltip sortable="'custom'">
    </el-table-column> -->
    <el-table-column prop="ip" label="IP地址" show-overflow-tooltip  sortable="'custom'">
        <template scope="scope">
           <el-button type="text"   @click="showDetail(scope.row)" class="operate-left">{{scope.row.ip}}</el-button>
        </template>
    </el-table-column>
    <!-- <el-table-column prop="option" label="可选项">
    </el-table-column> -->
    <el-table-column  sortable="'custom'" prop="insert_time" label="增加时间" show-overflow-tooltip >
    </el-table-column>
    <el-table-column sortable="'custom'" prop="user_name" label="增加人" >
    </el-table-column>
    <el-table-column sortable="'custom'" prop="is_shieldedname" label="阻断状态"  show-overflow-tooltip >
    </el-table-column>
    <el-table-column  sortable="'custom'"  prop="is_allowname" label="允许阻断" show-overflow-tooltip >
    </el-table-column>
    <el-table-column prop="shielded_memo" label="备注" show-overflow-tooltip >
    </el-table-column>
    <el-table-column label="操作" min-width="190" align="center">
      <template scope="scope">
       <el-button type="text" v-if="scope.row.is_shielded=='0'"   @click="handleEdit(scope.row)" class="operate-left">编辑</el-button>
       <!-- <span class="vert-bar-color"  v-if="scope.row.is_shielded=='0'">|</span>
       <el-button type="text" v-if="scope.row.is_shielded=='0'"    @click="handleDelete(scope.$index,scope.row)" class="operate-center">删除</el-button> -->
       <span class="vert-bar-color"  v-if="scope.row.is_shielded=='0'">|</span>
       <el-button type="text" v-if="scope.row.is_shielded=='0'"    @click="handleMove(scope.$index,scope.row)" class="operate-center">移除</el-button>
       <span class="vert-bar-color" v-if="scope.row.is_shielded=='0'">|</span>
       <el-button type="text" v-if="scope.row.shield_allow=='0'"  @click="handleBlock(scope.$index,scope.row)" class="operate-center">确认阻断</el-button>
        <el-button type="text" v-if="scope.row.shield_allow=='1'"  @click="handleNBlock(scope.$index,scope.row)" class="operate-center">不 阻 断</el-button>
        <span class="vert-bar-color" v-if="scope.row.is_shielded=='0'">|</span>
        <el-button type="text" v-if="scope.row.shielded_type=='0'"  @click="handleBlock1(scope.$index,scope.row)" class="operate-center">永久阻断</el-button>
        <el-button type="text" v-if="scope.row.shielded_type=='1'"  @click="handleNBlock1(scope.$index,scope.row)" class="operate-center">取消永久阻断</el-button>
     </template>
   </el-table-column>
  </el-table>
  <div class="float-r page-location">
             <el-pagination  @current-change="handleCurrentChange"  @size-change="handleSizeChange" background  layout="sizes, prev, pager, next" :total="defConf.total" class="pagination" :page-size="defConf.pageSize" :current-page.sync="defConf.pageIndex">
              </el-pagination>
  </div>
  <!-- <el-pagination class="float-r page-location"
   @current-change="handleCurrentChange"
   @size-change="handleSizeChange"
  :page-size="defConf.pageSize"
  :current-page="defConf.pageIndex"
  layout="total, prev, pager, next, jumper"
  :total="defConf.total">
 </el-pagination> -->

 <el-dialog title="导入" :visible.sync="exportDialogShow" width="30%">
   <span>请先下载Excel模板，并填写完整后，在选择上传</span><br>
   <a href="/static/template/malicious.xlsx" class="dialog-downloadtext font-color">导入模版</a>
   <el-upload ref="upload" action="/ssa/maliciousAssets/excelImport.do" :on-success="handleSuccess" :auto-upload="false" :multiple="false">
     <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
     <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
   </el-upload>
   <span slot="footer" class="dialog-footer">
   <el-button style="margin-left: 10px;" type="primary"  @click="submitUpload">导入</el-button>
   <el-button @click="exportDialogShow = false">取消</el-button>
 </span>
 </el-dialog>
 <el-dialog title="查看账户详情" :visible.sync="myShow" width="85%" @close="onCloseIp()" class="dialog-panel" top="5%">
     <highAccountListTable  :detailListData="rowData"></highAccountListTable>
 </el-dialog>
  </div>
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
      typeOptions:[{name:'系统自增',value:"0"},{name:'人工添加',value:"1"}],
      shieldOptions:[{name:'未阻断',value:"0"},{name:'已阻断',value:"1"}],
      allowOptions:[{name:'未允许',value:"0"},{name:'已允许',value:"1"}],
      exportDialogShow:false,
      param:{},
      myShow:false,
      rowData:[],
      queryForm: {
        startTime_date:null,
        startTime:"",
        endTime_date:null,
        endTime:"",
        shield_allow:"",
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
      this.myShow = false;
    },
    exportReport() {
      this.queryForm.startTime = this.utils.formatDate(this.queryForm.startTime_date,"yyyy-MM-dd");
      this.queryForm.endTime = this.utils.formatDate(this.queryForm.endTime_date,"yyyy-MM-dd");
      var param = "type=current&exportFileName=" + "阻断IP信息表";
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

      if (this.queryForm.shielded_type != null && this.queryForm.shielded_type != "") {
        param = param + "&shielded_type=" + this.queryForm.shielded_type;
      }

      if (this.queryForm.is_shielded != null && this.queryForm.is_shielded != "") {
        param = param + "&is_shielded=" + this.queryForm.is_shielded;
      }

      //alert(params);
      window.location.href = "/ssa/blockingIp/exportReport.do?" + param;
    },
    async showDetail(row) {
      var params={};
      params.src_ip= row.ip;
      params.hit_time=row.shielded_time;
      this.rowData =await  this.utils.req("/ssa/blockingIp/getHighAccountData.do", params, this);
    // this.param.ip=row.ip;
    // this.param.insert_time=row.insert_time;
      this.myShow = true;
    },
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
      return;
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
    handleMove(i, row) {
      if (row.update_time =='' || row.update_time ==null) {
        this.$alert('该数据是未阻断的数据,不能移除，请重新选择！', '警告', {
          type: "warning"
        });
        return;
      }
      this.$confirm('此操作将移除选中条目到历史表，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var ids = [];
        ids.push(row.id);
        var msg = await this.utils.req("/ssa/blockingIp/updateblockingIps.do", {
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
        this.$alert('此记录已经允许阻断过，不需要再次设置！', '警告', {
          type: "warning"
        });
        return;
      }
      this.$confirm('此操作将此记录送DE进行阻断？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {

        var ids = [];
        ids.push(row.id);
        var msg = await this.utils.req("/ssa/blockingIp/updateblockingStatus.do", {
          ids: ids,
          shield_allow:1
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },
    handleBlock1(i, row) {
      this.$confirm('此操作将此记录送DE进行永久阻断？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {

        var msg = await this.utils.req("/ssa/blockingIp/updateyjblockingStatus.do", {
          id: row.id,
          shielded_type:1
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },
    handleNBlock1(i, row) {
      this.$confirm('此操作将此记录取消永久阻断？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var msg = await this.utils.req("/ssa/blockingIp/updateyjblockingStatus.do", {
          id: row.id,
          shielded_type:0
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.id);
      })
    },
    handleNBlock(i, row) {
      if(row.shield_allow==0){
        this.$alert('此记录已经是未允许阻断，不需要再次设置！', '警告', {
          type: "warning"
        });
        return;
      }
      if(row.update_time !='' && row.update_time !=null){
        this.$alert('此记录已阻断过，不能设置为不阻断！', '警告', {
          type: "warning"
        });
        return;
      }
      this.$confirm('此操作将取消此记录送DE进行阻断？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {

        var ids = [];
        ids.push(row.id);
        var msg = await this.utils.req("/ssa/blockingIp/updateblockingNStatus.do", {
          ids: ids,
          shield_allow:0
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
    handleSizeChange(val) {
      this.$store.dispatch('handleSizeChange', [this.id, val]);
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

    async moveCheckedRows() {
      var rows = this.$store.state.table[this.id].multipleSelection;

      var i=0;
      for (i in rows) {
        if (rows[i].update_time =='' || rows[i].update_time ==null) {
          this.$alert('选择的数据中存在未阻断的数据,请重新选择！', '警告', {
            type: "warning"
          });
          return;
        }
      }

      if (rows.length <= 0) {
        this.$alert("请选中移除数据!", {
          type: 'warning'
        });
        return;
      }
      this.$confirm('此操作将移除选中条目到历史表，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var ids = [];
        rows.forEach(row => {
          ids.push(row.id);
        });
        var msg = await this.utils.req("/ssa/blockingIp/updateblockingIps.do", {
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
          this.$alert('选择的数据中存在已允许阻断的数据', '警告', {
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
      this.$confirm('此操作将选中记录设置为DE联动阻断的数据，是否继续？', '提示', {
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
    async updateCheckedNRows() {
      var rows = this.$store.state.table[this.id].multipleSelection;
      var i=0;
      for (i in rows) {
        if (rows[i].shield_allow == 0) {
          this.$alert('选择的数据中存在未允许阻断的数据', '警告', {
            type: "warning"
          });
          return;
        }
      }
      if (rows.length <= 0) {
        this.$alert("请选中需要设置取消DE联动阻断的数据!", {
          type: 'warning'
        });
        return;
      }
      this.$confirm('此操作将选中记录设置为取消DE联动阻断的数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var ids = [];
        rows.forEach(row => {
          ids.push(row.id);
        });
        var msg = await this.utils.req("/ssa/blockingIp/updateblockingNStatus.do", {
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
      tableUrl: "/ssa/blockingIp/getTableData.do",
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
