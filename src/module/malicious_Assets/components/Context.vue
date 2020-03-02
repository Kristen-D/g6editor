<template>
<div class="whitebackground Whitespace">
  <div class="top-title">恶意资产库</div>
  <div :class="['ordinary-search', 'clearfloat']">

    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-select v-model="queryForm.malicious_type" clearable  placeholder="选择类型">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="queryForm.ip_addr" placeholder="IP地址"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.startTime" placeholder="选择起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.endTime" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <!-- <el-button type="primary" @click="importEvent">导入</el-button> -->
      </el-form-item>
    </el-form>

  </div>
    <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
      <el-button type="primary" size="small" @click="exportTDA">发送给TDA</el-button>
      <el-button size="small" @click="eventClick" type="primary"><i class="icon-add m-r-8"></i>新建</el-button>
      <el-button type="primary" size="small" @click="importEvent"><i class="icon-import m-r-8"></i>导入</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
      <el-button type="primary" size="small" @click="exportReport">导出</el-button>
    </div>
  <el-table :id="tableId" :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="malicious_typeName" label="类型" show-overflow-tooltip="true" sortable>
    </el-table-column>
    <el-table-column prop="ip_addr" label="IP地址" show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="ip_name" label="资产名称" show-overflow-tooltip="true">
    </el-table-column>
    <!-- <el-table-column prop="option" label="可选项">
    </el-table-column> -->
    <el-table-column prop="malicious_memo" label="备注" show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="insert_time" label="增加时间">
    </el-table-column>
     </el-table-column>
    <el-table-column label="操作" min-width="150" align="center">
      <template scope="scope">
       <el-button type="text" @click="handleEdit(scope.row)" class="operate-left">编辑</el-button>
       <span class="vert-bar-color" >|</span>
       <el-button type="text"  @click="handleDelete(scope.$index,scope.row)" class="operate-center">删除</el-button>
       <span class="vert-bar-color" v-if="scope.row.status == 1">|</span>
       <el-button type="text" v-if="scope.row.status == 1"  @click="handleTdaEdit(scope.row)" class="operate-left">编辑TDA</el-button>
       <span class="vert-bar-color" v-if="scope.row.status == 1" >|</span>
       <el-button type="text" v-if="scope.row.status == 1"  @click="deleteTda(scope.row)" class="operate-left">删除TDA</el-button>
     </template>
   </el-table-column>
  </el-table>

  <el-pagination class="float-r page-location"
   @current-change="handleCurrentChange"
  :page-size="defConf.pageSize"
  :current-page="defConf.pageIndex"
  layout="total, prev, pager, next, jumper"
  :total="defConf.total">
 </el-pagination>

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
  </div>

</template>

<script>
export default {
  data() {
    return {
      typeOptions:[{name:'系统自增',value:1},{name:'人工添加',value:2}],
      exportDialogShow:false,
      queryForm: {
        malicious_type: "",
        ip_addr:''
      },
      multipleSelection: [],
      defConf: {},
      tableId: "Table1"
    }
  },
  methods: {
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
      return;
    },
    importEvent() {
      this.exportDialogShow = true;
    },
    exportReport() {
      var params = "exportFileName=" + "恶意资产IP表";
      //var params = this.queryForm;
      if (this.queryForm.malicious_type != null && this.queryForm.malicious_type != "") {
        params = params + "&malicious_type=" + this.queryForm.malicious_type;
      }
      if (this.queryForm.ip_addr != null && this.queryForm.ip_addr != "") {
        params = params + "&ip_addr=" + this.queryForm.ip_addr;
      }
      //alert(params);
      window.location.href = "/ssa/maliciousAssets/exportReport.do?" + params;
    },
    handleDelete(i, row) {
      this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var maliciousIds = [];
        maliciousIds.push(row.malicious_id);
        var msg = await this.utils.req("/ssa/maliciousAssets/deletemaliciousAssets.do", {
          maliciousIds: maliciousIds
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.tableId);
      })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    queryData() {
      var params = this.queryForm;
      this.$store.commit('setParams', [this.tableId, params]);
      this.$store.dispatch('reloadTable', this.tableId);
    },
    handleSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      if (response.state) {
        this.exportDialogShow = false;
        this.$store.dispatch('reloadTable', this.tableId);
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
    async deleteTda(row) {
      var param={};
      param.ip_addr =row.ip_addr;
      param.ip =row.ip_addr;
      param.malicious_id =row.malicious_id;
      var msg = await this.utils.req("/ssa/maliciousAssets/deleteblacks.do", param, this);
      this.$message({
        type: 'success',
        message: msg
      });
      this.$store.dispatch('reloadTable', this.tableId);
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
    handleTdaEdit(row) {
      var param={};
      //param.malicious_id =row.malicious_id;
      param.ip_addr =row.ip_addr;
      this.utils.req("/ssa/maliciousAssets/getTableDataByIpAddr.do", param, this).then(data => {
      row.tda_ips = data.tda_ips;
      });
      var maliciousIds = [];
      var maliciousIps = [];
      maliciousIps.push(row.ip_addr);
      maliciousIds.push(row.malicious_id);
      row.maliciousIds=maliciousIds;
      row.maliciousIps=maliciousIps;
      //row.tdaDatas=row.tda_ips.split(",");
      var params = {};
      row.handle = "update";
      //row.tkey = "addInfoForm";
      this.$router.push({
        name: 'tdaForm',
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
      this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
    },
    async delCheckedRows() {
      var rows = this.$store.state.table[this.tableId].multipleSelection;

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
        var maliciousIds = [];
        rows.forEach(row => {
          maliciousIds.push(row.malicious_id);
        });
        var msg = await this.utils.req("/ssa/maliciousAssets/deletemaliciousAssets.do", {
          maliciousIds: maliciousIds
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.tableId);
      })
    },
    async exportTDA() {
      var rows = this.$store.state.table[this.tableId].multipleSelection;

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
      tableUrl: "/ssa/maliciousAssets/getTableData.do",
      params: {},
      saveUrl: "/ssa/maliciousAssets/saveRecord.do",
      delUrl: "/ssa/maliciousAssets/deletemaliciousAssets.do"

    };
    this.$store.commit('registerConf', [this.tableId, defConf]);
    this.defConf = this.$store.state.table[this.tableId];
    this.$store.dispatch('reloadTable', this.tableId);
  }

}
</script>
