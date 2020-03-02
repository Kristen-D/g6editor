<!--任务管理列表-->
<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">任务管理列表</label>
      <div>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
<!--      <el-table-column label="任务编号" align="center" prop="jobId">-->
<!--      </el-table-column>-->
      <el-table-column label="任务行为" align="center" prop="jobAction">
      </el-table-column>
<!--      <el-table-column label="任务类型" align="center" prop="type">-->
<!--        <template slot-scope="scope">-->
<!--          {{typeFmt(scope.row.type)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="子任务数" align="center" prop="subJobCount">
      </el-table-column>
      <el-table-column label="任务状态" align="center" prop="status">
        <template slot-scope="scope">
          {{statusFmt(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column label="任务开始时间" align="center" prop="startTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.startTime)}}
        </template>
      </el-table-column>
      <el-table-column label="任务完成时间" align="center" prop="finishTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.finishTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="showJobDetail(scope.row)" style="cursor: pointer;" >详情</el-button>
        </template>
      </el-table-column>
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
    import {TimeFormat, traceJobStatusFormat, jobTypeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        props: ['tableId'],
        data() {

            return {
                pageIndex: 1,
                pageSize: 10,
                total: 30,
                tableConf: {},
            }
        },

        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            statusFmt(status){
                return traceJobStatusFormat(status);
            },
            typeFmt: function (type) {
                return  jobTypeFormat(type);
            },

            showJobDetail: function (row) {
                this.$router.push({path: 'jobBaseInfo/' + row.id})
            },
            handleSelectionChange(selectedRow) {
                this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
                return;
            },
            handleSizeChange(pageSize) {
                this.$store.dispatch('handleSizeChange', [this.tableId, pageSize]);
            },
            handleCurrentChange(pageIndex) {
                this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
            },


            refreshTable() {
            var tableConf = {
                total: 0,
                tableData: [],
                pageSize: 10,
                pageIndex: 1,
                load: true,
                tableUrl: "/sdsec/web/pub/job/pageQueryTraceJobs",
                params: {
                    "orderBy": ["create_time"],
                    "orderType": "desc",
                    "filters":{
                        "type":"TraceJob"
                    }
                },
                multipleSelection: [],
            };
            this.$store.commit('registerConf', [this.tableId, tableConf]);
            this.tableConf = this.$store.state.context[this.tableId];
            this.$store.dispatch('reloadTable', this.tableId);

        }
        },

        created: function () {
            this.refreshTable();
        }
    }
</script>

<style scoped>

</style>
