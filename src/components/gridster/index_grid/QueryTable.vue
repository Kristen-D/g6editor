<template>
<div >
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border style="width: 100%" @sort-change="handleSortChange" class="dark-table"  >

 <!-- <el-table-column prop="id" label="编号" width="100"> </el-table-column> -->
 <el-table-column  align="center" prop="threatType_s"  show-overflow-tooltip label="威胁类型" min-width="100">
<template   scope="scope">
 <div >
   <span  style="margin-left: 10px">{{ fmtEventThreatList(scope.row.threatType_s) }}</span>
 </div>
</template>
</el-table-column>
<el-table-column align="center" prop="logTime_dt" label="发生时间" show-overflow-tooltip min-width="170"> </el-table-column>
<el-table-column align="center" prop="pattackPhase_s"  show-overflow-tooltip label="阶段" min-width="100">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.pattackPhase_s }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="riskLevel_s"  show-overflow-tooltip label="级别" min-width="70">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ fmtEventRiskList(scope.row.riskLevel_s) }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="srcIp_s"  show-overflow-tooltip label="攻击IP" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.srcIp_s }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="srcPort_s" label="攻击端口" show-overflow-tooltip min-width="100"> </el-table-column>
<el-table-column align="center" prop="event_src_ip_area"  show-overflow-tooltip label="攻击地点" min-width="100">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.event_src_ip_area }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="dstIp_s"  show-overflow-tooltip label="目标IP" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.dstIp_s }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="dstPort_s" label="目标端口" show-overflow-tooltip min-width="100"> </el-table-column>
<el-table-column align="center" prop="event_dest_ip_area"  show-overflow-tooltip label="目标地点" min-width="100">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.event_dest_ip_area }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="protocol_s" label="协议" show-overflow-tooltip min-width="100"> </el-table-column>
<!-- <el-table-column  align="center" prop="event_msg" label="具体内容" show-overflow-tooltip min-width="100"> </el-table-column> -->

<el-table-column  label="详情"  min-width="100" align="center">
<template   scope="scope">
    <div v-show="!scope.row.edit&&!scope.row.create" class="tab-czbox">
      <a title="查看" class="ipset" style="cursor: pointer;" @click="showDetail(scope.$index, scope.row)">查看</a>
      <a title="攻击溯源" class="ipset" style="cursor: pointer;" @click="showPic(scope.$index, scope.row)">攻击溯源</a>
    </div>
</template>
</el-table-column>

</el-table>

<!-- </br> -->
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
            myPicShow:false,
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
     showDetail(i, row) {
       let config =  { component:"dataDetail",
         data:row,
         i:"dataDetail",
         title:"基础信息",
         dialogTableVisible:true
       }
       this.$store.commit('setConfig',config);
     },
     showPic(i, row) {

       let config =   {component:"showPic",
         data:row,
         i:"showPic",
         title:"攻击溯源",
         dialogTableVisible:true
       }
       this.$store.commit('setConfig',config);

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
      // console.log(this.eventTypeList);
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
          if(val==1){
            return "低";
          }else if(val==2){
            return "中";
          }else if(val==3){
            return "高";
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
    tableUrl:"/ssa/situationAnaly/getLogTop5BySolr.do",
    params:{}
   };
    defConf.params = this.params;
    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
     this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
