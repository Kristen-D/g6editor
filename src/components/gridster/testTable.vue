<template>
<div style="width: 100%;height: 100%;">
  <div >
    <header>

  </header>
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange" >

    <el-table-column   type="selection"    width="50">   </el-table-column>

    <!--prop属性对应row里要显示的值,inline-template可以自定义显示的值的格式,可以不用设prop属性,但是需要排序的列必须要设置prop属性 -->
 <el-table-column sortable="'custom'" prop="userId"  label="ID" width="100">
<template   scope="scope">
   <div >
     <span v-show="!scope.row.create" style="margin-left: 10px">{{ scope.row.userId }}</span>
   </div>
 </template>
</el-table-column>

 <el-table-column  label="用户姓名" min-width="100">
<template   scope="scope">
   <div>
     <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ scope.row.name }} </span>
     <el-input v-show="scope.row.edit||scope.row.create"   placeholder="用户姓名" v-model="scope.row.name"> </el-input>
   </div>
 </template>
</el-table-column>

 <el-table-column  label="登录名" min-width="100">
<template   scope="scope">
   <div>
     <span  v-show="!scope.row.create" style="margin-left: 10px">{{ scope.row.loginName }}</span>
      <el-input v-show="scope.row.create"   placeholder="登录名" v-model=" scope.row.loginName "> </el-input>
   </div>
 </template>
</el-table-column>

 <el-table-column  label="电话" min-width="100">
<template   scope="scope">
   <div>
     <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ scope.row.phone }}</span>

     <el-input v-show="scope.row.edit||scope.row.create"   placeholder="电话" v-model="scope.row.phone" @blur= "phoneCheck"> </el-input>
   </div>
 </template>
</el-table-column>
<!--show-overflow-tooltip属性可以让列过长的时候只显示部分内容,鼠标移上去显示所有内容-->
 <el-table-column  show-overflow-tooltip label="邮件" min-width="100" >
<template   scope="scope">
   <div>
     <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ scope.row.mail }}</span>
     <el-input v-show="scope.row.edit||scope.row.create"   placeholder="邮件" v-model="scope.row.mail" @blur="emailCheck" > </el-input>

   </div>
 </template>
</el-table-column>



 <el-table-column    label="操作" min-width="200">
<template   scope="scope">
   <div>
     <div v-show="!scope.row.edit&&!scope.row.create">
     <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
       编辑
     </el-button>
     <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
       删除
     </el-button>
   </div>

   <div v-show="scope.row.edit||scope.row.create">
   <el-button size="small" @click="saveEdit(scope.$index, scope.row)">
     保存
   </el-button>
   <el-button size="small" type="danger" @click="cancelEdit(scope.$index, scope.row)">
     取消
   </el-button>
 </div>
 </div>
 </template>
</el-table-column>
</el-table>
</div>
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

import {mapState} from 'vuex'
export default {
    data(){
        return {
          defConf:{},
          filedMap:{name:"用户姓名",mail:"邮件",phone:"电话"},
          id:this.data.i,
          //自定义属性
        }

    },
    props:['data'],
  computed:{
    ...mapState({
       roleList:state=>state.context.roleList,
   })
  },
   methods:{
     //默认的方法,基本无需修改
     handleEdit(i,row){
       this.$store.dispatch('handleEdit',[this.id,i,row]);
     },
     handleDelete(i,row){
       this.$store.dispatch('handleDelete',[this,i,row]);
     },
     saveEdit(i,row){
       if(this.objCheckNull(row,["name","mail|phone"]) && this.objCheck(row,["mail","phone"])  ){
            this.$store.dispatch('saveEdit',[this,i,row]);
       }
     },
     cancelEdit(){
       this.$store.commit('cancelEdit',this.id);
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

     emailCheck(e){
        var val = e.target.value;
         this.fmtCheck(val,"mail");
     },
     phoneCheck(e){
        var val = e.target.value;
        this.fmtCheck(val,"phone");
     },
     objCheck(obj,fieldArray){
       for (var i = 0; i < fieldArray.length; i++) {
         var field = fieldArray[i];
         var val = obj[field];
         if(!this.fmtCheck(val,field)){
           return false;
         }
       }
       return true;
     },
     fmtCheck(val,field){
       if(this.isNull(val))return true;
       var reg,msg;
       if(field.indexOf("mail")>=0){
           reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
           msg = '错误的邮件格式,请重新输入';
       }else if(field.indexOf("phone")>=0){
           reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/ ;
           msg = '错误的电话格式,请重新输入';
       }
       if(!reg.test(val)){
         this.$message.error({message:msg,showClose:true});
       }
       return reg.test(val);
     },
     objCheckNull(obj,fieldArray){
       for (var i = 0; i < fieldArray.length; i++) {
         var field = fieldArray[i];
         if(!this.fmtCheckNull(obj,field)){
           return false;
         }
       }
       return true;
     },
     fmtCheckNull(obj,field){
        var fArr = field.split("|");
        var flag = false;
        var msg = "";
        if( fArr.length>1){
          for (var i = 0; i < fArr.length; i++) {
            if(i!=0)msg = msg+",";
            var f = fArr[i];
            flag = flag || !this.isNull(obj[f]);
            msg = msg+this.filedMap[f];
          }
          msg = msg+"至少一个不可为空";
        }else{
          flag = !this.isNull(obj[field])
          msg = this.filedMap[field]+"不可为空";
        }
        if(!flag){
          this.$message.error({message:msg,showClose:true});
        }
        return flag;
     },
     isNull(val){
       return val == null || val =="";
     }
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
    tableUrl:"/systemMgmt_userCfg/getUserListToGrid.do",
    params:{},
    saveUrl:"/systemMgmt_userCfg/saveUser.do",
    delUrl:"/systemMgmt_userCfg/delUser.do",
   };

    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
