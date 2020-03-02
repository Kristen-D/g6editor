<template>
  <div>
    <div class = "el-panel-heading flexBetween">
      <label class = "el-panel-title">日志列表</label>
      <div>
        <el-button type="primary" size="small" @click="exportLogs">导出</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>

    </div>
<!--表格布局-->
    <el-table :id = "tableId" :data = "tableConf.tableData" v-loading = "tableConf.load"
              element-loading-spinner = "el-icon-loading" stripe @selection-change = "handleSelectionChange">
      <el-table-column type = "selection"></el-table-column>
      <el-table-column label = "用户名" align = "center" prop = "username"></el-table-column>
      <el-table-column label="日志时间" align="center" prop="start_time">
        <template slot-scope="scope">{{ dateTimeFormat(scope.row.start_time) }}</template>
      </el-table-column>
      <el-table-column label="客户端IP" align="center" prop="ip"></el-table-column>
      <el-table-column label="访问地址" align="center" prop="uri"></el-table-column>
      <el-table-column label="操作类型" align="center" prop="operate_type"></el-table-column>
      <el-table-column label="模块" align="center" prop="module"></el-table-column>
      <el-table-column label="返回结果" align="center" prop="result"></el-table-column>
      <el-table-column label="客户端系统信息" align="center" prop="user_agent" show-overflow-tooltip width="180"></el-table-column>
      <el-table-column label="操作描述" align="center" prop="operate_type_desc"> </el-table-column>
    </el-table>
<!--翻页-->
    <div class="pagelocation m-b-30">
      <el-pagination :current-page.sync="tableConf.pageIndex" background
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total,sizes, prev, pager, next, jumper"
                     :total="tableConf.total" :page-size="tableConf.pageSize" class="pagination"></el-pagination>
    </div>

  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
      props : ['tableId'],
      data(){

        return{
          pageIndex : 1,
          pageSize : 10,
          total : 30,
          tableConf : {},
          tableData:[],

        }
      },

      methods:{
          exportLogs() {
              window.location.href = "/ssa/sysLog/exportLogs.do?";
              },
          handleSelectionChange(selectedRow){
              this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
              return;
          },
          handleSizeChange(pageSize){
              this.$store.dispatch('handleSizeChange',[this.tableId,pageSize]);
          },
          handleCurrentChange(pageIndex){
              this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
          },
          dateTimeFormat(time){
            return TimeFormat(time);
          },
          refreshTable(){
              var tableConf = {
                  total: 0,
                  loading: false,
                  tableData: [],
                  pageSize: 10,
                  pageIndex: 1,
                  editRowIndex: -1,
                  editRowTemp: {},
                  // load : true,

                  tableUrl: "/ssa/sysLog/listSysLog.do",
                  params:{},
                  saveUrl:'',
                  delUrl:'',
                  // params: {
                      // "orderBy":["create_time"],
                      // "orderType":"desc"
                  // },
                  multipleSelection: [],
              };
              this.$store.commit('registerConf', [this.tableId, tableConf]);
              this.tableConf = this.$store.state.context[this.tableId];
              this.$store.dispatch('reloadTable', this.tableId);
              console.log('tableConf',tableConf)
              console.log('tableData',tableConf.tableData)

          }
      },

      created:function () {
          this.refreshTable();
      }
    }
</script>

<style scoped>

</style>
