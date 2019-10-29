<template>
<div class="">
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border style="width: 100%;height:200px;!important" @sort-change="handleSortChange" class="dark-table"  >


  <el-table-column prop="id" label="ID" show-overflow-tooltip min-width="80" align="center"></el-table-column>
  <el-table-column prop="src_ip" label="源IP" show-overflow-tooltip min-width="120" align="center"></el-table-column>
  <el-table-column prop="src_ip_attribution" label="IP归属地" show-overflow-tooltip min-width="120" align="center"></el-table-column>
  <el-table-column prop="hit_time_start" label="撞库时间" show-overflow-tooltip min-width="170" align="center"></el-table-column>
  <el-table-column prop="hit_num" label="撞库数量" show-overflow-tooltip min-width="140" align="center"></el-table-column>
  <el-table-column prop="suc_num" label="成功撞库数量" show-overflow-tooltip min-width="140" align="center"></el-table-column>
  <el-table-column prop="fail_num" label="失败撞库数量" show-overflow-tooltip min-width="140" align="center"></el-table-column>
  <!-- <el-table-column prop="is_shielded" label="是否封堵" show-overflow-tooltip width="120"></el-table-column> -->
  <el-table-column  prop="is_shielded"  show-overflow-tooltip label="是否封堵" min-width="120" align="center">
<template   scope="scope">
  <div >
    <span  style="margin-left: 10px">{{ fmtShielded(scope.row.is_shielded) }}</span>
  </div>
  </template>
</el-table-column>
  <el-table-column prop="shielding_time" label="封堵时间" show-overflow-tooltip min-width="170" align="center"></el-table-column>
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
      //  this.$store.dispatch('reloadTable',this.id);
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
     fmtShielded(val){
       if(val==0){
         return "已封堵";
       }else{
         return "未封堵";
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
    tableUrl:"/ssa/situationAnaly/getLogTop5.do",
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
.el-dialog__body {
    padding: 10px 10px;
}
</style>
