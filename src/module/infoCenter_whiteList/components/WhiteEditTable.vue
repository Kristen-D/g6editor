<template>
<div>
  <div >
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">

    <el-table-column   type="selection"    width="50">   </el-table-column>

    <!--prop属性对应row里要显示的值,inline-template可以自定义显示的值的格式,可以不用设prop属性,但是需要排序的列必须要设置prop属性 -->
 <el-table-column sortable="'custom'" prop="list_id"  label="ID" align="center">
<template   scope="scope">
   <div >
     <span v-show="!scope.row.create" style="margin-left: 10px">{{ scope.row.list_id }}</span>
   </div>
 </template>
</el-table-column>






 <el-table-column    label="名单类型" align="center">
<template   scope="scope">
   <div>
     <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ fmtType(scope.row.list_type_id) }}</span>
     <el-select v-model="scope.row.list_type_id" v-show="scope.row.edit||scope.row.create"  placeholder="请选择">
       <el-option
         v-for="item in listTypeList"
         :label="item.text"
         :value="item.id">
       </el-option>
     </el-select>
   </div>
 </template>
</el-table-column>




 <el-table-column  label="内容" align="center" >
<template   scope="scope">
   <div>
     <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ scope.row.list_value }}</span>
     <el-input v-show="scope.row.edit||scope.row.create"   placeholder="内容" v-model="scope.row.list_value"> </el-input>
   </div>
 </template>
</el-table-column>

 <el-table-column label="操作" align="center" min-width="180">
   <template scope="scope">

     <el-button type="text" @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
     <span style="color: #F3F3F3">|</span>
     <el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="color:#00a0fe; margin-left:17px;">删除</el-button>

   </template>
 </el-table-column>

 <!-- <el-table-column  label="操作" min-width="120" >
<template   scope="scope">
   <div style="text-align:left">
     <div v-show="!scope.row.edit&&!scope.row.create" class="tab-czbox" >
       <el-button   @click="handleEdit(scope.$index, scope.row)" type="text">编辑</el-button> |<el-button   @click="handleDelete(scope.$index, scope.row)" type="text">删除</el-button>
     </div>

     <div v-show="scope.row.edit||scope.row.create" style="text-align:left" class="tab-czbox" >
       <a title="保存" class="save"   @click="saveEdit(scope.$index, scope.row)" ><i class="fa fa-save"></i></a> |
       <a title="取消" class="remove"  @click="cancelEdit(scope.$index, scope.row)" ><i class="glyphicon glyphicon-remove"></i></a>

     </div>
   </div>
 </template>
</el-table-column> -->
</el-table>
</div>

<el-pagination class=" float-r page-location"
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
          defConf:{}
        }
    },
  props:['id'],
  computed:{
    ...mapState({
       listTypeList:state=>state.context.listTypeList
   })
  },
   methods:{
     //默认的方法,基本无需修改
     handleEdit(i,row){
        var params = row;
        params.handle = "update";
       this.$router.push({name:"blackWhiteForm",params:params});

      // this.$store.dispatch('handleEdit',[this.id,i,row]);
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
     fmtType(val){

        for(var item in this.listTypeList) {
            if (val==this.listTypeList[item].id){
              return this.listTypeList[item].text;
            }
        }

     },
     checkNoNull(row) {

       if(row.list_type_id==null||row.list_type_id==''){
         this.$message.error({message:'名单类型不能为空',duration:1000,showClose:true});
         //e.target.focus();
         return false;
       }
       if(row.list_value==null||row.list_value==''){
         this.$message.error({message:'内容不能为空',duration:1000,showClose:true});
         //e.target.focus();
         return false;
       }


       return true;
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
    tableUrl:"/ssa/infoCenter_blackWhiteList/getDataList.do",
    params:{bw_type:"1"},//初始化设置黑白名单类型,黑名单为0，白名单为1
    saveUrl:"/ssa/infoCenter_blackWhiteList/saveData.do",
    delUrl:"/ssa/infoCenter_blackWhiteList/deleteData.do",
   };

    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
