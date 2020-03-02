<template>
<div>

  <el-table :data="defConf.tableData" ref="myTaskTable" v-loading="defConf.loading" :highlight-current-row="isHighlight" style="width: 100%" @selection-change="handleSelectionChange" @current-change="handleSelectChange">
    <el-table-column v-if="this.id == 'myTaskTable'" type="selection">
    </el-table-column>
    <el-table-column prop="case_name" label="案件名称" align="center">
    </el-table-column>
    <el-table-column prop="orgName" label="案发单位" align="center">
    </el-table-column>
    <el-table-column prop="caseType" label="案件类型" align="center">
    </el-table-column>
    <el-table-column prop="caseLevel" label="案件等级" align="center">
    </el-table-column>
    <el-table-column prop="state" label="状态" align="center">
    </el-table-column>
    <el-table-column prop="create_time" label="时间" align="center">
    </el-table-column>
    <el-table-column label="操作" v-if="this.id != 'caseFileTable'" align="center">
      <template scope="scope">
        <el-button  type="text"  @click="handleView(scope.row)" class="operate-left">查看</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0  && scope.row.handle =='permitted'">|</span>
        <el-button type="text" v-if="scope.row.status == 0 && !isCompany  && scope.row.handle =='permitted' " @click="handleEdit(scope.row)" class="operate-center">编辑</el-button>
        <span class="vert-bar-color" v-if="scope.row.status == 0  && scope.row.handle =='permitted'">|</span>
        <el-button type="text" v-if="scope.row.status == 0 && !isCompany  && scope.row.handle =='permitted'" @click="handleAduit(scope.row)" class="operate-right">提交审批</el-button>
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
    </div>
 </template>

 <script>
import {
  mapState
} from 'vuex'
export default {
  props: ["id","isHighlight"],
  data() {
    return {
      defConf: {}
    }
  },
  computed: {
    ...mapState({
      isCompany: state => state.process.isCompany
    })
  },
  methods: {
    clearSelection() {
      this.$refs.myTaskTable.clearSelection();
    },
    formatter(row, column) {
      if (row.isBulletin != null) {
        return "通报";
      } else {
        return "检查通知";
      }
    },
    handleSelectionChange(selectedRow) {

      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //案件串并单选使用
    handleSelectChange(val) {
      if (this.id == "caseFileTable") {

        if(val != null && !this.$store.state.table.isStored[val.case_id]){
            this.$store.state.table.caseSelected.push(val);
            this.$store.state.table.isStored[val.case_id] ="in"
        }

      } else {
        return;
      }
    },
    handleView(row) {

      row.handle = "view";
      var processInstance = {};
      processInstance.processInstanceId = row.processInstanceId;
      row.processInstance = processInstance;
      this.$router.push({
        name: "caseInvestigateHandle",
        params: row
      });
    },
    handleEdit(row) {
      row.handle = "update";


      if (row.protocol == null || row.protocol == "") {
        row.protocols = [];
      } else {
        row.protocols = row.protocol.split(",");
      }
      if (row.device_type == null || row.device_type == "") {
        row.device_types = [];
      } else {
        row.device_types = row.device_type.split(",");
      }



      this.$router.push({
        name: 'mainForm',
        params: row
      });

    },
    async handleAduit(row) {
      var result = await this.utils.req("/ssa/caseInvestigate/startProcess.do", row, this);
      this.$message({
        type: "success",
        message: result
      });
      this.$store.dispatch('reloadTable', this.id);
      this.$store.dispatch('reloadTable', "todoTaskTable");

    }
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
      tableUrl: "/ssa/caseInvestigate/getCaseInvestigate.do",
      params: {},
    };


    if (this.id == "myTaskHiTable") {
      defConf.params = {
        finished: "finished"
      };
    } else if (this.id == "myTaskTable") {
      defConf.params = {
        running: "running"
      };
    }
    if (this.id == "caseFileTable") {
      defConf.params = {
        taskName: "caseFileTask"
      };
    }
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
