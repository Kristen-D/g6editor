<template>

<div>
  <div >
  <el-table  v-loading="defConf.loading" :border="true"  :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">

    <el-table-column sortable="'custom'" prop="src_ip"  label="源IP"  min-width="80"  align="center">
    </el-table-column>
    <el-table-column   sortable="'custom'" prop="src_ip_attribution"  label="源IP归属地" min-width="180"  align="center">
    </el-table-column>
    <el-table-column sortable="'custom'" prop="login_num"  label="窗口内登录次数" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>
    <el-table-column   sortable="'custom'" prop="login_success_num"  label="登录成功次数"  show-overflow-tooltip  align="center">
    </el-table-column>
    <el-table-column  sortable="'custom'" prop="login_fail_num"  label="'登录失败次数"  show-overflow-tooltip  align="center">
    </el-table-column>
    <el-table-column sortable="'custom'" prop="hit_time_start"  label="攻击开始时间" show-overflow-tooltip min-width="80"  align="center">
    </el-table-column>
    <!-- <el-table-column sortable="'custom'" prop="insert_time"  label="入库时间"  align="center">
    </el-table-column> -->
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
       // orgList:state=>state.context.orgList,
       // userList:state=>state.context.userList,
       // alarmTypeList:state=>state.context.alarmTypeList,
       // alarmGradeList:state=>state.context.alarmGradeList,
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
     fmtRequestNum(val){
        if (val==null || val==''){
          return "1";
        }else{
          return val;
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
     fmtStatus(val){
       let s = '';
       switch (val) {
          case -1:
            s = '发送失败';
            break;
          case 0:
            s = '未处理';
            break;
          case 1:
            s = '已发送';
            break;
          case 2:
            s='处理中';
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
    pageSize:10,
    pageIndex:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableUrl:"/ssa/ebankpoc/getHighIpDataList.do",
    params:{bw_type:"0"},//初始化设置黑白名单类型,黑名单为0，白名单为1
   };

    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);

  }
}
</script>
