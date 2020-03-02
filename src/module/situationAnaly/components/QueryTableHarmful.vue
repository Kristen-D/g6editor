<template>
<div >
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border style="width: 100%" @sort-change="handleSortChange" class="dark-table"  >

    <el-table-column  align="center" prop="threatType_s"  show-overflow-tooltip label="威胁类型" min-width="100">
<template   scope="scope">
    <div >
      <span  style="margin-left: 10px">{{ fmtEventThreatList(scope.row.threatType_s) }}</span>
    </div>
   </template>
</el-table-column>
   <el-table-column align="center" prop="logTime_dt" label="发生时间" show-overflow-tooltip min-width="170"> </el-table-column>
   <el-table-column align="center" prop="riskLevel_s"  show-overflow-tooltip label="级别" min-width="70">
<template   scope="scope">
   <div >
     <span  style="margin-left: 10px">{{ fmtEventRiskList(scope.row.riskLevel_s) }}</span>
   </div>
   </template>
</el-table-column>
<el-table-column align="center" prop="infectionDstIp_s"  show-overflow-tooltip label="感染IP" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.infectionDstIp_s }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="infectionDstName_s" label="产品端点" show-overflow-tooltip min-width="100"> </el-table-column>
<el-table-column align="center" prop="virusName_s"  show-overflow-tooltip label="病毒名称" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.virusName_s }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="malwareName_s"  show-overflow-tooltip label="恶意软件" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.malwareName_s }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="deviceIp_s" label="来源主机" show-overflow-tooltip min-width="100"> </el-table-column>
<el-table-column align="center" prop="result_s"  show-overflow-tooltip label="结果" min-width="100">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">{{ scope.row.result_s }}</span>
</div>
</template>
</el-table-column>
<el-table-column align="center" prop="result_s"  show-overflow-tooltip label="入口类型" min-width="120">
<template   scope="scope">
<div >
  <span  style="margin-left: 10px">文件中发现威胁</span>
</div>
</template>
</el-table-column>

<el-table-column  label="详情"  min-width="100" align="center">
<template   scope="scope">
    <div v-show="!scope.row.edit&&!scope.row.create" class="tab-czbox">
      <a title="查看" class="ipset" style="cursor: pointer;" @click="showDetail(scope.$index, scope.row)">查看</a>
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

<el-dialog title="事件详情" :visible.sync="myShow" width="85%" @close="onCloseIp()" class="dialog-panel" top="5%">
  <!-- <div style="height:300px"> -->
    <dataDetailHarmful :tableData="rowData" ></dataDetailHarmful>
  <!-- </div> -->
</el-dialog>
</div>
</template>

<script>

import commonAjax from 'components/js/common.js'
import dataDetailHarmful from './DataDetailHarmful.vue'
import {mapState} from 'vuex'
export default {
  components: {
    dataDetailHarmful
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
     showDetail(i, row) {
       this.rowData = row;
       this.myShow = true;
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
    tableUrl:"/ssa/situationAnaly/getLogTop5HarmfulBySolr.do",
    params:{}
   };
    defConf.params = this.params;
    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    // this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
