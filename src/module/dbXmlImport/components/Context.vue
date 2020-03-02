<template>
<div class="whitebackground Whitespace">
  <div class="top-title">等级保护工具箱管理</div>
  <div :class="['ordinary-search', 'clearfloat']">

    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-select v-model="queryForm.type" clearable  placeholder="选择层面">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="queryForm.status" clearable  placeholder="选择状态">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.startTime" placeholder="选择导入起始日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="datetime" v-model="queryForm.endTime" placeholder="选择导入结束日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button type="primary" @click="importEvent">导入</el-button>
      </el-form-item>
    </el-form>

  </div>

  <el-table :id="tableId" :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%">
    <!-- <el-table-column prop="type" label="层面">
    </el-table-column> -->
    <el-table-column prop="type_point" label="层面要点" show-overflow-tooltip="true" sortable>
    </el-table-column>
    <el-table-column prop="control_point" label="控制点" show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="check_item" label="检查项" show-overflow-tooltip="true">
    </el-table-column>
    <!-- <el-table-column prop="option" label="可选项">
    </el-table-column> -->
    <el-table-column prop="check_point" label="检查要点数" show-overflow-tooltip="true">
    </el-table-column>
    <!-- <el-table-column prop="meet_num" label="符合数">
    </el-table-column> -->
    <el-table-column prop="inconformity_num" label="不符合数">
    </el-table-column>
    <!-- <el-table-column prop="incorrect_num" label="不适用数">
    </el-table-column> -->
    <el-table-column prop="import_time" label="导入时间" show-overflow-tooltip="true" sortable>
    </el-table-column>
    <el-table-column prop="import_name" label="导入人">
    </el-table-column>
      <el-table-column prop="unit_name" label="检查单位" show-overflow-tooltip="true">
      </el-table-column>
    <el-table-column label="操作" min-width="100" align="center">

      <template scope="scope">
       <el-button  v-if="scope.row.inconformity_num !=0" type="text" @click="handleEdit(scope.row)" class="operate-left">任务督查</el-button>
       <!-- <span class="vert-bar-color" >|</span>
       <el-button type="text"  @click="handleDelete(scope.row)" class="operate-center">删除</el-button> -->
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
   <el-upload ref="upload" action="/ssa/dbXmlImport/xmlImport.do" :on-success="handleSuccess" :auto-upload="false" :multiple="false">
     <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
     <div slot="tip" class="el-upload__tip">只能上传xml文件</div>
   </el-upload>
   <span slot="footer" class="dialog-footer">
   <el-button style="margin-left: 10px;" type="primary"  @click="submitUpload">导入</el-button>
   <el-button @click="exportDialogShow = false">取消</el-button>
 </span>
 </el-dialog>
  </div>

</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      typeOptions:[{name:'管理层面',value:1},{name:'技术层面',value:2},{name:'安全层面',value:3}],
      statusOptions:[{name:'不符合',value:1},{name:'符合',value:2}],
      exportDialogShow:false,
      queryForm: {
        type: "",
        status:'',
        startTime: null,
        endTime: null
      },
      defConf: {},
      tableId: "Table1"
    }



  },
  methods: {
    importEvent() {
      this.exportDialogShow = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    queryData() {

      if (this.queryForm.startTime != null && this.queryForm.startTime  != "") {
        //  alert("--------");
        this.queryForm.startTime = this.utils.formatDate(new Date(this.queryForm.startTime), "yyyy-MM-dd hh:mm:ss");
      }
      if (this.queryForm.endTime != null && this.queryForm.endTime != "") {
        this.queryForm.endTime = this.utils.formatDate(new Date(this.queryForm.endTime), "yyyy-MM-dd hh:mm:ss");
      }

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
        // if(response.data) {
        //   let list = [];
        //   response.data.forEach((d) => {
        //     if(d.errorMsg) {
        //       list.push(d.assetCode+": "+d.errorMsg);
        //     }
        //   })
        //   console.error(list);
        // }
      }
    },
    handleEdit(row) {
      var params = {};
      row.handle = "add";
      row.tkey = "addInfoForm";
      this.$router.push({
        name: 'mainForm',
        params: row
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
        var organizationIds = [];
        rows.forEach(row => {
          organizationIds.push(row.organization_id);
        });
        var msg = await this.utils.req("/ssa/organization/deleteSelectedOrganization.do", {
          organizationIds: organizationIds
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.tableId);
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
      tableUrl: "/ssa/dbXmlImport/getTableData.do",
      params: {},
    };
    this.$store.commit('registerConf', [this.tableId, defConf]);
    this.defConf = this.$store.state.table[this.tableId];
    this.$store.dispatch('reloadTable', this.tableId);

    this.$store.dispatch('getLeaderRoleUser');
    this.$store.dispatch('getHandleRoleUser');
    this.$store.dispatch('getSuperviseRoleUser');
    this.$store.dispatch('getInspectionItems');
  }

}
</script>
