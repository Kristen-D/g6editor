<template>
<div>

  <el-table :data="defConf.tableData" style="width: 100%" @selection-change="handleSelectionChange">

    <el-table-column :prop="key" :label="value" v-for="(value, key) in columnList" :show-overflow-tooltip="key=='notice_desc'"  :sortable="key==='assetCode'" align="center">
    </el-table-column>
    <el-table-column prop="taskName" label="任务名称" align="center">
    </el-table-column>
    <el-table-column prop="endTime" label="任务完成时间" align="center">
    </el-table-column>
    <el-table-column prop="attachment_filename" label="附件" align="center" show-overflow-tooltip>
      <template scope="scope">
        <el-button type="text" @click="downloadFile(scope.row.notice_code)" v-if="scope.row.attachment_filepath != null&& scope.row.attachment_filepath != '' ">{{scope.row.attachment_filename}}</el-button>
        <el-button type="text" v-else>{{scope.row.attachment_filename}}</el-button>
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
    <el-table-column label="操作" width="80px;">
      <template scope="scope">
       <el-button  type="text" size="small" @click="handleView(scope.row)">查看</el-button>
</template>
   </el-table-column>
    </el-table>
    <div class="pull-right">
     <el-pagination @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
     </el-pagination>
   </div>
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
         id: "hiTaskTable",
         defConf: {}
       }

     },
     methods: {
       downloadFile(id) {
         var fileUrl = "/ssa/alertNotice/downloadFile.do?notice_code=" + id;
         window.location.href = fileUrl;
       },
       handleCurrentChange(pageIndex) {
         this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
       },
       handleSelectionChange(selectedRow) {
         this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
         return;
       },
       handleView(row) {
         var params = row;
         params.tkey = row.taskDefinitionKey;
           this.$router.push({
           name: 'noticeHiTaskDetail',
           params: params
         })

       }
     },
     created: function() {

       var defConf = {
         total: 0,
         loading: false,
         tableData: [],
         pageSize: 10,
         pageIndex: 1,
         multipleSelection: [],
         //默认ajax属性
         tableUrl: "/ssa/alertNoticeBulletn/listCompleteTask.do",
         params: {},
       };

       this.$store.commit('registerConf', [this.id, defConf]);
       this.defConf = this.$store.state.table[this.id];

       this.$store.dispatch('reloadTable', this.id);

     }



   }
   </script>
