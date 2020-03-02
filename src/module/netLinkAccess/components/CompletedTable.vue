<template>
<div>
  <div >
  <el-table  v-loading="defConf.loading"   :data="defConf.tableData" style="width: 100%" @sort-change="handleSortChange"  @selection-change="handleSelectionChange">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="operation_user" label="责任单位" sortable>
    </el-table-column>
    <el-table-column prop="unit_name" label="运维单位" sortable>
    </el-table-column>
    <el-table-column prop="unit_type" label="单位类型">
    </el-table-column>
    <el-table-column prop="operator" label="运营商">
    </el-table-column>
    <el-table-column prop="physical_access" label="物理位置">
    </el-table-column>
    <el-table-column prop="safety_charger" label="安全负责人">
    </el-table-column>
    <el-table-column prop="safety_charge_phone" label="联系电话">
    </el-table-column>
 <el-table-column label="操作" align="center" min-width="180">
   <template scope="scope">
     <el-button type="text" @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">编辑</el-button>
     <span style="color: #F3F3F3">|</span>
     <el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="color:#00a0fe; margin-left:17px;">删除</el-button>
   </template>
 </el-table-column>
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
          defConf:{},
          multipleSelection: [],
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
       this.$router.push({name:"netLinkAccessForm",params:params});

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
    tableUrl:"/ssa/netLinkAccess/getDataList.do",
    params:{bw_type:"1"},
    saveUrl:"/ssa/netLinkAccess/saveData.do",
    delUrl:"/ssa/netLinkAccess/deleteData.do",
   };

    this.$store.commit('registerConf',[this.id,defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable',this.id);
  }
}
</script>
