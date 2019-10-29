<template>
<div >
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData"  style="width: 100%" @sort-change="handleSortChange" class="dark-table"  >
    <el-table-column prop="id" label="" width="64" align="center" >
<template   scope="scope">
      <div >
        <span  class="number-style">{{ scope.$index+1 }}</span>
      </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="user"  show-overflow-tooltip label="暴破账户" min-width="120">
<template   scope="scope">
      <div >
        <span  >{{ scope.row.user }}</span>
      </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="starttime"  show-overflow-tooltip label="暴破时间" min-width="120">
<template   scope="scope">
      <div >
        <span  >{{ scope.row.starttime }}</span>
      </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="endtime"  show-overflow-tooltip label="结束时间" min-width="120">
<template   scope="scope">
      <div >
        <span  >{{ scope.row.endtime }}</span>
      </div>
      </template>
</el-table-column>
      <el-table-column align="center" prop="count"  show-overflow-tooltip label="暴破次数" min-width="120">
<template   scope="scope">
      <div >
        <span  >{{ scope.row.count }}</span>
      </div>
      </template>
</el-table-column>

</el-table>

</div>
</template>

<script>

import commonAjax from 'components/js/common.js'
import {mapState} from 'vuex'
export default {
  components: {
  },
    data(){
        return {
          defConf:{},
          //自定义属性
            myShow: false,
            rowData:"",
        }
    },
   props:['id'],
   computed:{
     ...mapState({
        params:state=>state.context.params,

    })},
   watch:{
		 params:function(params){
        this.$store.commit('setParams',[this.id,params]);
        this.$store.dispatch('reloadTable',this.id);
		 }
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
   mounted :function() {
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
    tableUrl:"/ssa/forceCrack/getHighRiskAccount.do",
    params:{}
   };
    defConf.params = this.params;
    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
