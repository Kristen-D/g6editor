<template>
<div class="">
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border style="width: 100%;!important"   @selection-change="handleSelectionChange" class="blue-table" >

    <el-table-column type="selection">
      </el-table-column>
  <!-- <el-table-column prop="alarm_id" label="ID" show-overflow-tooltip min-width="80" align="center"></el-table-column> -->
  <el-table-column  prop="alarm_desc"  label="告警内容" min-width="80"  align="center" :show-overflow-tooltip="true">
  </el-table-column>
  <el-table-column  prop="alarm_grade"  label="风险级别"  min-width="80" show-overflow-tooltip="true"  align="center">
<template   scope="scope">
    <div>
      <span style="margin-left: 10px">{{ fmtalarmGradeList(scope.row.alarm_grade) }}</span>
    </div>
  </template>
</el-table-column>
  <el-table-column  prop="src_ip"  label="源IP" min-width="80" show-overflow-tooltip  align="center">
  </el-table-column>

  <el-table-column  prop="event_src_ip_area"  label="源IP区域" min-width="80" show-overflow-tooltip  align="center">
  </el-table-column>

  <el-table-column  prop="dst_ip"  label="目标IP" min-width="80" show-overflow-tooltip  align="center">
  </el-table-column>

  <el-table-column   prop="event_dest_ip_area"  label="目标区域" min-width="80" show-overflow-tooltip  align="center">
  </el-table-column>

  <el-table-column  prop="create_time"  label="告警时间" min-width="120" show-overflow-tooltip  align="center">
  </el-table-column>
  <el-table-column  prop="device_ip"  label="设备IP"  show-overflow-tooltip="true"  min-width="80"  align="center">
  </el-table-column>
  <el-table-column  prop="externalIp_s"  label="事件类别"  min-width="80" show-overflow-tooltip="true"  align="center">
<template   scope="scope">
    <div>
      <span style="margin-left: 10px">{{ fmtexternalIp_s(scope.row.externalIp_s) }}</span>
    </div>
  </template>
</el-table-column>
  <!-- <el-table-column label="详情" align="center" min-width="100">
    <template scope="scope">
    <el-button     @click="showDetail(scope.row)" type="text" class="operate-left">查看</el-button>
    </template>
  </el-table-column> -->

  <el-table-column label="操作" align="center" min-width="150">
    <template scope="scope">
     <el-button   v-if="scope.row.flow_status=='1' || scope.row.flow_status=='2'"  type="text" class="operate-left" @click="showHandleEvent(scope.row)" >处置</el-button>
     <el-button     @click="showDetail(scope.row)" type="text" class="operate-left">事件详情</el-button>
    </template>
  </el-table-column>
</el-table>

<br>
<div class="col-lg-13 pull-right" >
<el-pagination
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
  :page-sizes="[5, 10, 20, 30, 50, 100]"
 :page-size="defConf.pageSize"
 :current-page="defConf.pageIndex"
 layout="total,sizes,prev, pager, next, jumper"
 :total="defConf.total">
</el-pagination>
</div>




</div>
</template>

<script>

import commonAjax from 'components/js/common.js'
import {mapState} from 'vuex'

export default {
  components: {
    // singleDataTable
    //selectOrganization
  },
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
       publicShow:state=>state.context.publicShow,
       publicRowData:state=>state.context.publicRowData,
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
     showHandleEvent(row){
       this.$root.$children[0].dialogFormVisible=true;
       this.$root.$children[0].form.rowData=row;
       this.$root.$children[0].form.tableId=this.id;
       this.$root.$children[0].form.pageIndex=this.defConf.pageIndex;
     },
     async showDetail(row){
       if(row.event_id==null || row.event_id==""){
         this.$alert('数据异常，不能查solr的数据!', '警告', {
           type: "warning"
         });
         return ;
       }else{
         var param={};
         if (row.flow_status== 3) {
           param.timeflag="month";
         }else{
           param.timeflag="week";
         }
         param.event_id=row.event_id;

          // console.log(this.$parent.$parent);
          // console.log(this.$parent.$parent.woshitest);
          // console.log(this.$parent.$parent.$parent.woshitest);
          // console.log(this.$parent.$parent.$parent.$parent.woshitest);
          // console.log(this.$parent.$parent.$parent.$parent.$parent.woshitest);
          // console.log(this.$root.$children[0].woshitest);
        var result = await this.common.req("/ssa/alarmInfoList/getSolrQuery.do", param, this);
        if(this.$root.$children[0].publicShow!== undefined){
          this.$root.$children[0].publicShow=true;
          this.$root.$children[0].publicRowData = result.rowData[0];
        }


       }

     },
     fmtexternalIp_s(val){
       if(val==0){
         return "内部安全事件";
       }else{
         return "外部安全事件";
       }
     },
     fmtalarmGradeList(val){
       if(val==2){
         return "中危";
       }else{
         return "高危";
       }
     },
     fmtflowStatus(val){
       if(val==2){
         return "未处置";
       }else{
         return "已处置";
       }
     },

     handleSizeChange(pageSize) {
        this.$store.dispatch('handleSizeChange',[this.id,pageSize]);
     },
     //处理翻页时候的事件
     handleCurrentChange(pageIndex){
       this.$store.dispatch('handleCurrentChange',[this.id,pageIndex]);
     },
     //处理排序时候的事件
     handleSortChange(val){
       this.$store.dispatch('handleSortChange',[this.id,val]);
     },
     //处理选中多选的row
     handleSelectionChange(selectedRow){
      this.$store.commit('handleSelectionChange',[this.id,selectedRow]);
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
    params: {
          externalIp_s: 1, // 1全球,0广东,2全部
          dateRange: 'month',
          timeValue: 1,
          timeType: 2,
          dataTime:null,
          dataType:null,
          dataType2:null,
          dataType3:null
          }
   };
    defConf.tableUrl=this.tableUrl;
    defConf.params=this.params;
    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
<style media="screen">


/***********************覆盖 element dialog************************/
.el-dialog{
  background-color: #172d57;
  border-color: rgba(17, 34, 69, 0.54);
}
.el-dialog__header {
  padding: 15px 20px 15px;
  border-color: #172d57;
  border-bottom-color: rgba(54, 58, 71, 0.68);
}

.el-dialog__title {
  color: #fff;
}

.el-dialog__body{
  background-color: rgba(17, 34, 69, 0.54)!important;
  border-color: rgba(17, 34, 69, 0.54);
  padding: 10px 20px;
}

/********** 9. Table **********/
.blue-table{color: #fff; background-color:inherit; border: 1px solid transparent;}
.blue-table::after, .blue-table::before {background-color: transparent;}
.blue-table thead {color: #afafaf;}
.blue-table tr{background-color: #0a111e;}
.blue-table td {padding: 2px 0; border-bottom: 1px solid #2d6a98;}
.blue-table .el-table__header-wrapper tr th{  border-bottom:1px solid #2d6a98;  border-top:1px solid #2d6a98;}
.blue-table .el-table__row:nth-child(odd){background-color: #0a1c33;}
.blue-table .el-table__body tr:hover td{background-color: #0e2748;}
</style>
