<template>

<div>
  <div >
  <el-table  v-loading="defConf.loading" :border="true"  :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">


    <!-- <el-table-column sortable="'custom'" prop="alarm_id"  label="ID" width="70"  align="center">
    </el-table-column> -->
    <el-table-column  prop="id"  label="id" min-width="80"  align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column  prop="name"  label="名称" min-width="150"  align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column  prop="type"  label="任务类型"  min-width="80"  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtType(scope.row.type) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column  prop="status"  label="任务状态"  min-width="80"  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtStatus(scope.row.status) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column  prop="process"  label="任务扫描进度" min-width="80"  align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column  prop="time_start_scan"  label="开始时间" min-width="120"  align="center" show-overflow-tooltip>
    </el-table-column>

    <el-table-column  prop="time_end_scan"  label="结束时间" min-width="120"  align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column  prop="user_account"  label="用户名" min-width="80"  align="center" show-overflow-tooltip>
    </el-table-column>

    <el-table-column label="操作" align="center" min-width="150">
      <template scope="scope">
       <el-button  round    @click="startTask(scope.row)" type="text" class="operate-right">启动</el-button>
       <el-button round    type="text" class="operate-left" @click="pauseTask(scope.row)" >暂停</el-button>
       <el-button round    type="text" class="operate-left" @click="stopTask(scope.row)" >停止</el-button>
       <el-button round   @click="deleteTask(scope.row)" type="text" class="operate-left" >删除</el-button>
      </template>
    </el-table-column>

</el-table>
</div>

<el-pagination class="float-r page-location"
  @current-change="handleCurrentChange"
 :page-size="defConf.pageSize"
 :current-page="defConf.pageIndex"
 layout="total, prev, pager, next, jumper"
 :total="defConf.total">
</el-pagination>

</div>
</div>
</div>
</template>

<script>

import common from 'components/js/common.js'
import {mapState} from 'vuex'
export default {
  components: {
    common
    //selectOrganization
  },
    data(){
        return {
          defConf:{},
          rowData:{},
          myShow: false,
          pageIndex:1
        }
    },
  props:['id'],
  computed:{
    ...mapState({
      // orgList:state=>state.context.orgList,
       //userList:state=>state.context.userList,
   })
  },
   methods:{
     //默认的方法,基本无需修改
     spClick(row){
       row.tkey = "spInfoForm";
       row.alarmIds = row.alarm_id;
       this.$router.push({name:"alarmInfoForm",params:row});
     },
     onCloseIp() {
       // console.log(this.myShow);
       // this.myShow = false;
     },

     clClick(row){
       row.tkey = "clInfoForm";
        row.alarmIds = row.alarm_id;
       this.$router.push({name:"alarmInfoForm",params:row});
     },
     async startTask(row){
       this.$confirm('此操作将启动该任务, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() => {
         var params={};
         params.username="admin";
         params.password="nsfocus@2012";
         var msg = await common.req("/rsas/api/task/resume/"+row.id,params);
         if(msg.ret_msg=="success"){
           this.$message({message:"操作成功",type: 'success' });
           this.$store.dispatch('handleCurrentChange',[this.id,this.pageIndex]);
         }else{
           this.$message({message: msg.ret_msg,type: 'error'});
         }
       });
     },
     async pauseTask(row){
       this.$confirm('此操作将暂停该任务, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() => {
         var params={};
         params.username="admin";
         params.password="nsfocus@2012";
         var msg = await common.req("/rsas/api/task/pause/"+row.id,params);
         if(msg.ret_msg=="success"){
           this.$message({message:"操作成功",type: 'success' });
           this.$store.dispatch('handleCurrentChange',[this.id,this.pageIndex]);
         }else{
           this.$message({message: msg.ret_msg,type: 'error'});
         }
       });
     },
     async stopTask(row){
       this.$confirm('此操作将停止该任务, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() => {
         var params={};
         params.username="admin";
         params.password="nsfocus@2012";
         var msg = await common.req("/rsas/api/task/stop/"+row.id,params);
         if(msg.ret_msg=="success"){
           this.$message({message:"操作成功",type: 'success' });
           this.$store.dispatch('handleCurrentChange',[this.id,this.pageIndex]);
         }else{
           this.$message({message: msg.ret_msg,type: 'error'});
         }
       });
     },
     async deleteTask(row){
       this.$confirm('此操作将删除该任务, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() => {
         var params={};
         params.username="admin";
         params.password="nsfocus@2012";
         var msg = await common.req("/rsas/api/task/delete/"+row.id,params);
         if(msg.ret_msg=="success"){
           this.$message({message:"操作成功",type: 'success' });
           this.$store.dispatch('handleCurrentChange',[this.id,this.pageIndex]);
         }else{
           this.$message({message: msg.ret_msg,type: 'error'});
         }
       });
     },
     handleView(row){
       //alert(row.alarm_id);
       row.tkey = "alarmView";
       this.$router.push({
         name: 'AlarmHiTaskDetail',
         params: row
       });
     },
     handleDelete(i,row){
       this.$store.dispatch('handleDelete',[this,i,row]);
     },
     saveEdit(i,row){
       if (this.checkNoNull(row)){
       this.$store.dispatch('saveEdit',[this,i,row]);
     }
     },
     cancelEdit(){
       this.$store.commit('cancelEdit',this.id);
      //  this.$store.dispatch('reloadTable',this.id);
     },
     //处理选中多选的row
     handleSelectionChange(selectedRow){
      this.$store.commit('handleSelectionChange',[this.id,selectedRow]);
     },
     //处理翻页时候的事件
     handleCurrentChange(pageIndex){
       this.pageIndex=pageIndex;
       this.$store.dispatch('handleCurrentChange',[this.id,pageIndex]);
     },
     //处理排序时候的事件
     handleSortChange(val){
       this.$store.dispatch('handleSortChange',[this.id,val]);
     },
//默认方法结束

//自定义方法

     fmtType(val){
       let s = '';
       switch (parseInt(val)) {
          case 1:
            s = '漏洞扫描任务';
            break;
          case 2:
            s = '系统配置核查任务';
            break;
          case 3:
          s = '系统评估任务+系统配置核查任务';
          break;
          case 4:
          s = '口令猜测任务';
          break;
          case 8:
          s = 'web应用扫描任务';
          break;
          default:
            s='--';
        }
        return s;
     },
     fmtStatus(val){
       let s = '';
       switch (parseInt(val)) {
          case 0:
            s = '等待扫描';
            break;
          case 2:
            s = '正在扫描';
            break;
          case 4:
          s = '扫描完成';
          break;
          case 5:
          s = '扫描暂停';
          break;
          case 8:
          s = '异常停止';
          break;
          default:
            s='--';
        }
        return s;
     },

//methods end
   },
   created :function() {
    var defConf = {
    total:0,
    loading: false,
    tableData:[],
    page_size:10,
    page:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableUrl:"/rsas/api/task/list?username=admin&password=nsfocus@2012",
    params:{},
   };

   if (this.id == "dotableId") {
     defConf.tableUrl = "/rsas/api/task/active_list?username=admin&password=nsfocus@2012";
   }else if(this.id == "notDotableId"){
     defConf.tableUrl = "/rsas/api/task/list?username=admin&password=nsfocus@2012";
   }

   this.$store.commit('registerConf', [this.id, defConf]);
   this.defConf = this.$store.state.editTable[this.id];
   this.$store.dispatch('reloadTable', this.id);

  }
}
</script>
