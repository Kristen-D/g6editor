<template>
<div>
        <el-table :data="defConf.tableData" v-loading="defConf.loading" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column v-if="this.id == 'myTaskTable'" type="selection">
          </el-table-column>
          <el-table-column prop="unit_name" label="单位名称">
          </el-table-column>
          <el-table-column prop="unit_code" label="备案表编号">
          </el-table-column>
          <el-table-column prop="affiliation" label="隶属关系">
          </el-table-column>
          <el-table-column prop="unit_type" label="单位类型">
          </el-table-column>
          <el-table-column prop="industry_category" label="行业类型">
          </el-table-column>
          <el-table-column prop="leader_name" label="单位负责人">
          </el-table-column>
          <el-table-column prop="unit_time" label="备案时间">
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template scope="scope">
           <el-button type="text" @click="handleView(scope.row)" class="operate-left">查看</el-button>
           <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
           <el-button type="text" v-if="scope.row.status == 0 && scope.row.handle =='permitted'" @click="handleEdit(scope.row)" class="operate-center">编辑</el-button>
           <span class="vert-bar-color" v-if="scope.row.status == 0 && scope.row.handle =='permitted'">|</span>
           <el-button type="text" v-if="scope.row.status == 0 && scope.row.status == 0" @click="handleAduit(scope.row)" class="operate-right">提交审核</el-button>
           <span class="vert-bar-color" v-if="scope.row.change_status == 0 && scope.row.status == 2">|</span>
           <el-button type="text" v-if="scope.row.change_status == 0 && scope.row.status == 2" @click="handleChange(scope.row)" class="operate-center">备案变更</el-button>
           <span class="vert-bar-color" v-if="scope.row.change_status == 1 && scope.row.status == 2">|</span>
           <el-button type="text" v-if="scope.row.change_status == 1 && scope.row.status == 2" @click="handleChange(scope.row)" class="operate-center">变更中</el-button>
           <span class="vert-bar-color" v-if="scope.row.change_status == 2 && scope.row.status == 2">|</span>
           <el-button type="text" v-if="scope.row.change_status == 2 && scope.row.status == 2" @click="handleChange(scope.row)" class="operate-center">已变更</el-button>
           <!-- <el-button type="text" size="small" @click="handleEdit(scope.row)" >编辑</el-button>
           <el-button type="text" size="small" @click="handleAduit(scope.row)">提交审核</el-button> -->
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
export default {
  props: ['id'],
  data() {
    return {
      defConf: {},
      //================= toolbar 查询字段 开始 ==========================//
      formInline: {
        user: '',
        region: ''
      },
      //==============toolbar 查询字段结束 =========================//



      multipleSelection: []
    }

  },
  methods: {
    //分页方法
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },

    handleEdit(row) {
      row.handle = "update";
      this.$router.push({
        name: 'unitForm',
        params: row
      });
    },
    handleView(row){
      row.handle = "view";
      var processInstance ={};
      processInstance.processInstanceId = row.processInstanceId;
      row.processInstance = processInstance;
      this.$router.push({
        name: 'unitHandle',
        params: row
      });
    },
    onSubmit() {},
    handleClick() {},
    handleChange(row){
      var status=row.change_status;
      if(status===0){
        row.handle = "change";
        this.$router.push({
          name: 'unitForm',
          params: row
        });
      }else if(status===1){
        alert("请前往我的任务-进行中 查看");
      }else{
        alert("请前往我的任务-已完成 查看");
      }

    },
    //提交审核
    async handleAduit(row) {
      var result = await this.utils.req("/ssa/classifiedP/startProcess.do", row, this);
      this.$message({
        type: "success",
        message: result
      });
      this.$store.dispatch('reloadTable', this.id);
    },
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    // del() {
    //   var ids = this.multipleSelection.map(item => item.unit_id).join()
    //   alert(ids);
    // }
    async del() {
      var rows = this.multipleSelection;
      if (rows.length <= 0) {
        this.$alert("请先选中要删除的记录!");
        return;
      }
      this.$confirm('此操作将删除选中条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var unitIds = [];
        rows.forEach(row => {
          unitIds.push(row.unit_id);
        })
        var msg = await this.utils.req("/ssa/classifiedP/DetleUnitInfo.do", {"unitIds":unitIds}, this);
        //alert(alertIds);
        await this.$store.dispatch('reloadTable', this.tableId1);
        this.$message({
          type: 'success',
          message: msg
        });
      })
    },
  },

  mounted: function() {},
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
      tableUrl: "/ssa/classifiedP/getUintInfo.do",
      params: {},
      saveUrl: "/ssa/classifiedP/saveEventHandleInfo.do",
      delUrl: "/systemMgmt_userCfg/delUser.do",
    };
    if (this.id == "myTaskHiTable") {
      defConf.params = {
        status: 2
      };
    }
    if (this.id == "myTaskTable") {
      defConf.params = {
        running: "running"
      };
    }
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }
}
</script>
<style>
.toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
}
</style>
