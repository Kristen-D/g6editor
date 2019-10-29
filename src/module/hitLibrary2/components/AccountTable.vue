<template>
<div class="">
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border width="120" @sort-change="handleSortChange" class="dark-table"  >


  <el-table-column prop="id" label="ID" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="account" label="被撞账户" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="login_type" label="登录类型" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="src_ip" label="源IP" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="src_ip_attribution" label="IP归属地" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="hit_time" label="撞库时间" show-overflow-tooltip  align="center"></el-table-column>

  <el-table-column  prop="is_infor_user"  show-overflow-tooltip label="是否已通知"  align="center">
<template   scope="scope">
  <div >
    <span  style="margin-left: 10px">{{ fmtInforUser(scope.row.is_infor_user) }}</span>
  </div>
  </template>
</el-table-column>
  <el-table-column prop="inform_time" label="通知时间" show-overflow-tooltip ></el-table-column>

  <el-table-column  prop="is_change_pwd"  show-overflow-tooltip label="是否改密码"  align="center">
<template   scope="scope">
  <div >
    <span  style="margin-left: 10px">{{ fmtChangePwd(scope.row.is_change_pwd) }}</span>
  </div>
  </template>
</el-table-column>
  <el-table-column prop="pwd_change_time" label="改密码时间" show-overflow-tooltip  align="center"></el-table-column>
</el-table>

<br>
<div class="col-lg-13 pull-right" >
<el-pagination
  @current-change="handleCurrentChange"
 :page-size="defConf.pageSize"
 :current-page="defConf.pageIndex"
 layout="total, prev, pager, next, jumper"
 :total="defConf.total">
</el-pagination>
</div>

</div>
</template>

<script>

import commonAjax from 'components/js/common.js'
import {mapState} from 'vuex'
export default {

    data(){
        return {
          defConf:{},
          //自定义属性
            myShow: false,
            rowData:"",
        }
    },
   props:['id','tableUrl','params'],
   computed:{
     ...mapState({
    })},
   watch:{
		 tableUrl:function(tableUrl){
        // this.$store.dispatch('reloadTable',this.id);
        this.$store.commit('setTableUrl',[this.id, this.tableUrl]);
        this.$store.dispatch('reloadTable',this.id);
		 },
     params:function(params){
        //  this.$store.dispatch('reloadTable',this.id);
         this.$store.commit('setParams',[this.id, this.params]);
         this.$store.dispatch('reloadTable',this.id);
     },
	 },
   methods:{
     fmtInforUser(val){
       if(val==0){
         return "已通知";
       }else{
         return "未通知";
       }
     },
     fmtChangePwd(val){
       if(val==0){
         return "已更改";
       }else{
         return "未更改";
       }
     },
     //处理翻页时候的事件
     handleCurrentChange(pageIndex){
       this.$store.dispatch('handleCurrentChange',[this.id,pageIndex]);
     },
     //处理排序时候的事件
     handleSortChange(val){
       this.$store.dispatch('handleSortChange',[this.id,val]);
     },

   },
   created :function() {
    var defConf = {
    total:0,
    loading: false,
    tableData:[],
    pageSize:5,
    pageIndex:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableData:[],
    tableUrl:"",
    params:{dateRange:"month"}
   };
    defConf.tableUrl=this.tableUrl;
    defConf.params=this.params;
    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
<style>

</style>
