<template>
<div >
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border style="width: 100%" @sort-change="handleSortChange"  >

 <el-table-column prop="id" label="编号" width="100"> </el-table-column>

 <el-table-column  prop="event_grade"  show-overflow-tooltip label="等级" min-width="120">
<template   scope="scope">
 <div >
   <span  style="margin-left: 10px">{{ fmtEventGradeList(scope.row.event_grade) }}</span>
 </div>
</template>
</el-table-column>
<el-table-column  prop="event_type"  show-overflow-tooltip label="事件类型" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ fmtEventTypeList(scope.row.event_type) }}</span>
</div>
</template>
</el-table-column>
  <el-table-column  prop="event_subtype"  show-overflow-tooltip label="事件子类型" min-width="120">
<template   scope="scope">
  <div >
    <span  style="margin-left: 10px">{{ fmtEventTypeList(scope.row.event_subtype) }}</span>
  </div>
</template>
</el-table-column>

 <el-table-column prop="create_time" label="日志时间" min-width="100"> </el-table-column>


<el-table-column  prop="status"  show-overflow-tooltip label="状态" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ fmtStatus(scope.row.status) }}</span>
</div>
</template>
</el-table-column>
<el-table-column  label="操作" min-width="60">
<template   scope="scope">
  <div style="text-align:left">
    <div v-show="!scope.row.edit&&!scope.row.create" class="tab-czbox">
      <a title="查看" class="ipset" @click="showDetail(scope.$index, scope.row)">查看</a>
    </div>
  </div>
</template>
</el-table-column>
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
<el-dialog title="事件详情" :visible.sync="myShow" width="85%" @close="onCloseIp()">
  <div style="height:300px">
    <dataTotalTable :tableData="rowData"></dataTotalTable>
  </div>
</el-dialog>
</div>
</template>

<script>

import commonAjax from 'components/js/common.js'
import dataTotalTable from './DataTotalTable.vue'
import {mapState} from 'vuex'
export default {
  components: {
    dataTotalTable
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
        eventTypeList:state=>state.context.eventTypeList,
        ProductTypeList:state=>state.context.ProductTypeList,
        EventThreatList:state=>state.context.EventThreatList,
        EventGradeList:state=>state.context.EventGradeList,
        EventRiskList:state=>state.context.EventRiskList,
    })},
   watch:{
		 params:function(params){
        this.$store.commit('setParams',[this.id,params]);
        this.$store.dispatch('reloadTable',this.id);
		 }
	 },
   methods:{
     onCloseIp() {

     },
     fmtEventTypeList(val){
      // console.log(val);
        for(var item in this.eventTypeList) {
            if (val==this.eventTypeList[item].id){
              return this.eventTypeList[item].text;
            }
        }

     },
     fmtProductTypeList(val){
      // console.log(val);
        for(var item in this.ProductTypeList) {
            if (val==this.ProductTypeList[item].id){
              return this.ProductTypeList[item].text;
            }
        }

     },
     fmtEventThreatList(val){
      // console.log(val);
        for(var item in this.EventThreatList) {
            if (val==this.EventThreatList[item].id){
              return this.EventThreatList[item].text;
            }
        }

     },
     fmtEventGradeList(val){
      //  console.log(this.EventGradeList);
        for(var item in this.EventGradeList) {
            if (val==this.EventGradeList[item].id){
              return this.EventGradeList[item].text;
            }
        }

     },
    fmtEventRiskList(val){
         // console.log(val);
           for(var item in this.EventRiskList) {
               if (val==this.EventRiskList[item].id){
                 return this.EventRiskList[item].text;
               }
           }

        },
      fmtStatus(val){
           // console.log(val);
             if (val=="0"){
               return "待提交";
             }else if (val=="1") {
                return "流程进行中";
             }else if (val=="2") {
                return "已完成";
             }else{
                return "尚未处理";
             }

      },
      fmtPacketDirection(val){//数据来源
           // console.log(val);
             if (val=="0"){
               return "内部";
             }else if (val=="1") {
                return "外部";
             }

      },

     showDetail(i,row){
       console.log(row.id);
       this.rowData=row;
       this.myShow=true;
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
   mounted :function() {
    var defConf = {
    total:0,
    loading: false,
    tableData:[],
    pageSize:10,
    pageIndex:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableUrl:"/ssa/netAttack/getDataList.do",
    params:{}
   };
    defConf.params = this.params;
    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    // this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
