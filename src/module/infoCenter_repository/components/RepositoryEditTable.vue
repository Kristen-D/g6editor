<template>
  <el-row>
   <div class="col-lg-13"  >

     <el-table  v-loading="defConf.loading"   :data="defConf.tableData" border style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">

      <el-table-column   type="selection"    width="50">   </el-table-column>

      <!--prop属性对应row里要显示的值,inline-template可以自定义显示的值的格式,可以不用设prop属性,但是需要排序的列必须要设置prop属性 -->
      <el-table-column  prop="sequence"  label="ID" min-width="80">
      </el-table-column>


      <el-table-column  label="标题" min-width="150">
<template   scope="scope">
       <div>
         <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ scope.row.title }}</span>
         <el-input v-show="scope.row.edit||scope.row.create"   placeholder="标题" v-model="scope.row.title"> </el-input>
       </div>
     </template>
</el-table-column>


     <el-table-column  label="内容" show-overflow-tooltip min-width="150">
<template   scope="scope">
       <div>
         <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ scope.row.content }}</span>
         <el-input v-show="scope.row.edit||scope.row.create"  type="textarea" scope.rows="3" placeholder="内容" v-model="scope.row.content"> </el-input>
       </div>
     </template>
</el-table-column>



     <el-table-column  label="备注" show-overflow-tooltip min-width="180">
<template   scope="scope">
       <div>
         <span v-show="!scope.row.edit&&!scope.row.create" style="margin-left: 10px">{{ scope.row.comment }}</span>
         <el-input v-show="scope.row.edit||scope.row.create"   placeholder="备注" v-model="scope.row.comment"> </el-input>
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


           <el-button  v-show="scope.row.existFile" size="small" type="primary" @click="downloadFile(scope.$index,scope.row)">
             文件下载
           </el-button>

         </div>

         <div v-show="scope.row.edit||scope.row.create">
           <el-button size="small" @click="saveEdit(scope.$index, scope.row)">
             保存
           </el-button>
           <el-button size="small" type="danger" @click="cancelEdit(scope.$index, scope.row)">
             取消
           </el-button>


           <el-upload action="/ssa/infoCenter_repository/uploadFile.do"
           :on-success="handleSuccess" 
           :show-upload-list="false" 
           style="display:inline"
           :data="scope.row">
           <el-button  size="small" type="primary" >文件上传</el-button>
         </el-upload>
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

</el-rpw>
</template>

<script>

  import common from 'components/js/common.js'
  export default {

    data(){
      return {
        defConf:{}

      }

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
      this.$store.dispatch('saveEdit',[this,i,row]);
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
    downloadFile(i,row){
      var fileUrl = "/ssa/infoCenter_repository/downloadFile.do?sequence="+row.sequence;
      window.location.href = fileUrl;
    },
    handleSuccess(response,file,fileList){
      if(!response.result.state){
         this.$alert(response.result.result,"消息");
     }else{

     var data = this.$store.state.editTable[this.id].tableData;
     var obj = data[data.length-1];
     obj.sequence = response.result.sequence;
     obj.title = response.result.title;  
     this.$message({
        message: response.result.result,
        type: 'success'
      });

     
     }
   

   }
 },

 props:['id'],
 created:function(){
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
    tableUrl:"/ssa/infoCenter_repository/getDataList.do",
    params:{},
    saveUrl:"/ssa/infoCenter_repository/saveData.do",
    delUrl:"/ssa/infoCenter_repository/delData.do",
  };


  this.$store.commit('registerConf',[this.id,defConf]);
  this.defConf = this.$store.state.editTable[this.id];
  this.$store.dispatch('reloadTable',this.id);



}

}


</script>
