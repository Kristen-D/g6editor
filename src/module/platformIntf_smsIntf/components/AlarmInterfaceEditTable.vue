<template>

<div>
  <div >
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">

    <el-table-column   type="selection"    width="50">   </el-table-column>


    <el-table-column   sortable="'custom'"  prop="alarm_type"  label="告警类型" min-width="150" align="center">
<template   scope="scope">
     <div>
       <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ fmtalarmTypeList(scope.row.alarm_type) }}</span>
       <el-select v-model="scope.row.alarm_type" v-show="scope.row.edit||scope.row.create"  placeholder="请选择">
         <el-option
           v-for="item in alarmTypeList"
           :label="item.text"
           :value="item.id">
         </el-option>
       </el-select>
     </div>
   </template>
</el-table-column>

   <el-table-column   sortable="'custom'"  prop="alarm_grade"  label="告警级别" min-width="150" align="center">
<template   scope="scope">
    <div>
      <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ fmtalarmGradeList(scope.row.alarm_grade) }}</span>
      <el-select v-model="scope.row.alarm_grade" v-show="scope.row.edit||scope.row.create"  placeholder="请选择">
        <el-option
          v-for="item in alarmGradeList"
          :label="item.text"
          :value="item.id">
        </el-option>
      </el-select>

    </div>
  </template>
</el-table-column>


  <el-table-column prop="sms_object"  label="短信告警对象" min-width="150" :show-overflow-tooltip="true" align="center">
 </el-table-column>

<el-table-column  prop="sms_send_freq"  label="发送失败次数" min-width="150" align="center">
</el-table-column>

<el-table-column  sortable="'custom'"  prop="update_time"  label="修改时间" min-width="150" align="center">
</el-table-column>



 <el-table-column  label="操作" min-width="120"  align="center">
<template   scope="scope">
   <div >

    <el-button type="text"  @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
    <span style="color: #F3F3F3">|</span>
    <el-button  @click="handleDelete(scope.$index, scope.row)"   type="text" style="color:#00a0fe; margin-left:17px;">删除</el-button>


   </div>
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

import commonAjax from 'components/js/common.js'
import {mapState} from 'vuex'
export default {
    data(){
        return {
          defConf:{},

        }
    },
  props:['id'],
  computed:{
    ...mapState({
       alarmTypeList:state=>state.context.alarmTypeList,
       alarmGradeList:state=>state.context.alarmGradeList
       //emailTemplateList:state=>state.context.emailTemplateList
   })
  },
   methods:{
     //默认的方法,基本无需修改
     handleEdit(i,row){

       var params = {};
       params = row;
       params.handle = "update";
       this.$router.push({name:"alarmInterfaceForm",params:params});
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
     //处理排序时候的事件
     handleSortChange(val){
       this.$store.dispatch('handleSortChange',[this.id,val]);
     },
//默认方法结束

//自定义方法
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
     fmtemailTemplateList(val){

        for(var item in this.emailTemplateList) {
            if (val==this.emailTemplateList[item].id){
              return this.emailTemplateList[item].text;
            }
        }

     },




//methods end
   },
   created :function() {
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
    tableUrl:"/ssa/platformIntf_alarmIntf/getDataList.do",
    params:{bw_type:"0"},//初始化设置黑白名单类型,黑名单为0，白名单为1
    saveUrl:"/ssa/platformIntf_alarmIntf/saveData.do",
    delUrl:"/ssa/platformIntf_alarmIntf/deleteData.do",
   };

    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);

  }
}
</script>
