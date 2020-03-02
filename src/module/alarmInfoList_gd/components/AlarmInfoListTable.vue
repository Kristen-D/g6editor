<template>

<div>
  <div >
  <el-table  v-loading="defConf.loading" :border="true" :height="400" :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">


    <el-table-column type="selection">
      </el-table-column>
    <!-- <el-table-column sortable="'custom'" prop="alarm_id"  label="ID" width="70"  align="center">
    </el-table-column> -->
    <el-table-column  prop="alarm_desc"  label="告警内容" min-width="80"  align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column sortable="'custom'" prop="alarm_grade"  label="风险级别"  min-width="80"  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtalarmGradeList(scope.row.alarm_grade) }}</span>
      </div>
    </template>
</el-table-column>
    <!-- <el-table-column sortable="'custom'" prop="alarm_type"  label="告警类型"  min-width="80"  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtalarmTypeList(scope.row.alarm_type) }}</span>
      </div>
    </template>
</el-table-column> -->

    <el-table-column  sortable="'custom'"  prop="src_ip"  label="源IP" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>

    <el-table-column  sortable="'custom'"  prop="country_name"  label="源IP区域" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>

    <el-table-column  sortable="'custom'" prop="dst_ip"  label="目标IP" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>

    <el-table-column  sortable="'custom'"  prop="city_name"  label="目标区域" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>

    <el-table-column sortable="'custom'" prop="alarm_time"  label="告警时间" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>
    <el-table-column sortable="'custom'" prop="device_ip"  label="设备IP"  min-width="80"  align="center">
    </el-table-column>
     <!-- <el-table-column sortable="'custom'" prop="process_time"  label="处理时间" show-overflow-tooltip min-width="80"  align="center">
    </el-table-column>
    <el-table-column sortable="'custom'" prop="user_id"  label="操作人"  min-width="80"  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtuserList(scope.row.user_id) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column sortable="'custom'" prop="org_name"  label="事发部门" min-width="80"  align="center">
    </el-table-column>
    <el-table-column sortable="'custom'" prop="type_name"  label="资产名称" min-width="80"  align="center">
    </el-table-column> -->
    <el-table-column sortable="'custom'" prop="externalIp_s"  label="事件类别"  min-width="80" show-overflow-tooltip  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtexternalIp_s(scope.row.externalIp_s) }}</span>
      </div>
    </template>
</el-table-column>

    <el-table-column label="操作" align="center" min-width="150">
      <template scope="scope">
       <el-button   v-if="scope.row.is_approve=='1' && scope.row.flow_status=='1'"   @click="spClick(scope.row)" type="text" class="operate-right">待审核</el-button>
       <el-button   v-if="(scope.row.is_approve=='0' && scope.row.flow_status=='1') || scope.row.flow_status=='2'"  type="text" class="operate-left" @click="clClick(scope.row)" >处置</el-button>
       <el-button     @click="showDetail(scope.row)" type="text" class="operate-left">事件详情</el-button>
       <el-button   v-if="scope.row.flow_status=='3'"  @click="handleView(scope.row)" type="text" class="operate-left">查看</el-button>
      </template>
    </el-table-column>
 <!-- <el-table-column sortable="'custom'"  prop="alarm_level"    label="告警等级" min-width="120" align="center">
<template   scope="scope">
   <div>
     <span style="margin-left: 10px">{{ fmtAlarmLevel(scope.row.alarm_level) }}</span>
   </div>
 </template>
</el-table-column> -->

 <!-- <el-table-column label="邮件开关" min-width="100"  align="center" prop="email_switch" :formatter="emailSwitchFormatter">
<div>
</div>
 </el-table-column> -->



</el-table>
<el-dialog close-on-click-modal title="事件详情" :visible.sync="myShow" width="85%" @close="myShow=false" class="dialog-panel" top="15%" >
  <!-- <div style="height:300px"> -->
    <dataTotalTable :tableData="rowData"></dataTotalTable>
  <!-- </div> -->
</el-dialog>
</div>
<div class="float-r page-location">
           <el-pagination  @current-change="handleCurrentChange"  @size-change="handleSizeChange" background  layout="sizes, prev, pager, next" :total="defConf.total" class="pagination" :page-size="defConf.pageSize" :current-page.sync="defConf.pageIndex">
            </el-pagination>
</div>
<!-- <el-pagination class="float-r page-location"
  @current-change="handleCurrentChange"
 :page-size="defConf.pageSize"
 :current-page="defConf.pageIndex"
 layout="total, prev, pager, next, jumper"
 :total="defConf.total">
</el-pagination> -->

</div>
</div>
</div>
</template>

<script>

import commonAjax from 'components/js/common.js'
import {mapState} from 'vuex'
import dataTotalTable from './DataTotalTable.vue'
export default {
  components: {
    dataTotalTable
    //selectOrganization
  },
    data(){
        return {
          defConf:{},
          rowData:{},
          myShow: false
        }
    },
  props:['id'],
  computed:{
    ...mapState({
      // orgList:state=>state.context.orgList,
       //userList:state=>state.context.userList,
       alarmTypeList:state=>state.context.alarmTypeList,
       alarmGradeList:state=>state.context.alarmGradeList,
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
     async showDetail(row){
       if(row.event_id==null || row.event_id==""){
         this.$alert('数据异常，不能查solr的数据!', '警告', {
           type: "warning"
         });
         return ;
       }else{
         var param={};
         if (this.id == "dotableId") {
           param.timeflag="month";
         }else{
           param.timeflag="week";
         }
         param.event_id=row.event_id;
        var result = await this.common.req("/ssa/alarmInfoList/getSolrQuery.do", param, this);
        this.rowData = result.rowData[0];
         this.myShow = true;
         console.log(this.rowData);
       }
     },
     clClick(row){
       row.tkey = "clInfoForm";
        row.alarmIds = row.alarm_id;
       this.$router.push({name:"alarmInfoForm",params:row});
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
       this.$store.dispatch('handleCurrentChange',[this.id,pageIndex]);
     },
     handleSizeChange(val) {
       this.$store.dispatch('handleSizeChange', [this.id, val]);
     },
     //处理排序时候的事件
     handleSortChange(val){
       this.$store.dispatch('handleSortChange',[this.id,val]);
     },
//默认方法结束

//自定义方法
     fmtorgList(val){
        for(var item in this.orgList) {
            if (val==this.orgList[item].id){
              return this.orgList[item].text;
            }
        }
     },
     fmtuserList(val){
        for(var item in this.userList) {
            if (val==this.userList[item].id){
              return this.userList[item].text;
            }
        }
     },
     fmtalarmTypeList(val){
        for(var item in this.alarmTypeList) {
            if (val==this.alarmTypeList[item].id){
              return this.alarmTypeList[item].text;
            }
        }
     },
     fmtalarmGradeList(val){
        for(var item in this.alarmGradeList) {
            if (val==this.alarmGradeList[item].id){
              return this.alarmGradeList[item].text;
            }
        }
     },
     fmtexternalIp_s(val){
       let s = '';
       switch (parseInt(val)) {
          case 1:
            s = '外部安全事件';
            break;
          case 0:
            s = '内部安全事件';
            break;
          default:
            s='--';
        }
        return s;
     },
     fmtStatus(val,is_approve){
       let s = '';
       switch (val) {
          case -1:
            s = '发送失败';
            break;
          case 1:
            s = '未处理';
            if (is_approve=='0'){
              s = '待处理';
            }else{
              s = '待审核';
            }
            break;
          case 2:
            s = '待处理';
            break;
          case 3:
            s='已完成';
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
    pageSize:30,
    pageIndex:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableUrl:"/ssa/alarmInfoList/getDataList.do",
    params:{},
   };

   if (this.id == "dotableId") {
     defConf.params = {
       finished: "finished"

     };
   }else if(this.id == "hisdotableId"){
     defConf.params = {
       finished1: "finished1",
       historyed:1
     };
   }else if(this.id == "notDotableId"){
     defConf.params = {
       running: "running"
     };
   }
   this.$store.commit('registerConf', [this.id, defConf]);
   this.defConf = this.$store.state.editTable[this.id];
   this.$store.dispatch('reloadTable', this.id);

  }
}
</script>
