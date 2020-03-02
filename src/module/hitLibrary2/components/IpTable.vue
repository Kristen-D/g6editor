<template>
<div class="">
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border width="170" @sort-change="handleSortChange" class="dark-table"  >


  <el-table-column prop="id" label="ID" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="src_ip" label="源IP" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="src_ip_attribution" label="IP归属地" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="hit_time_start" label="撞库时间" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="hit_num" label="撞库数量" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="suc_num" label="成功撞库数量" show-overflow-tooltip  align="center"></el-table-column>
  <el-table-column prop="fail_num" label="失败撞库数量" show-overflow-tooltip  align="center"></el-table-column>


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
.el-dialog__body {
    padding: 10px 10px;
}
</style>
