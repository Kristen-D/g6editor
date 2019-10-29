<template>

<div>
  <div >
  <el-table  v-loading="defConf.loading"  :border="true" :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">

    <el-table-column sortable="'custom'" prop="account"  label="账号" min-width="80"  align="center">
    </el-table-column>
    <el-table-column sortable="'custom'" prop="src_ip"  label="源IP"  min-width="80"  align="center">
    </el-table-column>
    <el-table-column  sortable="'custom'" prop="src_ip_attribution"  label="源IP归属地" min-width="140"  align="center">
    </el-table-column>
    <el-table-column sortable="'custom'" prop="hit_time"  label="撞库时间" min-width="120" show-overflow-tooltip  align="center">
    </el-table-column>
    <!-- <el-table-column  sortable="'custom'" prop="is_infor_user"  label="是否通知用户"   min-width="90" show-overflow-tooltip  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmisInforUser(scope.row.is_infor_user) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column  sortable="'custom'" prop="inform_time"  label="通知用户时间" min-width="120" show-overflow-tooltip  align="center">
    </el-table-column>
    <el-table-column  sortable="'custom'"  prop="is_change_pwd"  label="是否更改密码"  min-width="90" show-overflow-tooltip  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtisChangePwd(scope.row.is_change_pwd,scope.row.is_infor_user) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column sortable="'custom'" prop="pwd_change_time"  label="密码更改时间" show-overflow-tooltip min-width="120"  align="center">
    </el-table-column> -->
    <el-table-column sortable="'custom'" prop="login_type"  label="登录类型" min-width="80"  align="center">
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
       fmtisChangePwd(val,flag){
       if (val=='0'){
         return "已更改";
       }else{
          if (flag =='1'){
            return "已挽回";
          }else{
            return "未更改";
          }
       }
     },
     fmisInforUser(val){
         if (val=='0'){
           return "未通知";
         }else{
            return "已通知";
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
    pageSize:50,
    pageIndex:1,
    editRowIndex:-1,
    editRowTemp:{},
    multipleSelection:[],
    //默认ajax属性
    tableUrl:"/ssa/hitLibrary/getHighAccountDataList.do",
    params:{bw_type:"0"},//初始化设置黑白名单类型,黑名单为0，白名单为1
   };

    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);

  }
}
</script>
