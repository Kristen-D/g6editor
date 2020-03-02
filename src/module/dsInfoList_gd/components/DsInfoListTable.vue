<template>

<div>
  <div >
  <el-table  v-loading="defConf.loading" :border="true"   :data="defConf.tableData"   @sort-change="handleSortChange"  @selection-change="handleSelectionChange">

    <el-table-column  prop="seq_no"  label="编号" min-width="80"  align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="ip_addr"  label="机器IP"  min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>

    <el-table-column    prop="detect_name"  label="检测名称" min-width="80" show-overflow-tooltip   align="center">
    </el-table-column>

    <el-table-column   prop="app_type"  label="应用程序类型" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>

    <el-table-column  prop="priority"  label="优先级"  min-width="80" show-overflow-tooltip  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtpriority(scope.row.priority) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column  prop="risk_level"  label="级别"  min-width="80" show-overflow-tooltip  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtrisk_level(scope.row.risk_level) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column  prop="mode"  label="模式"  min-width="80" show-overflow-tooltip  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmtmode(scope.row.mode) }}</span>
      </div>
    </template>
</el-table-column>
    <el-table-column  prop="type"  label="类型"  min-width="80" show-overflow-tooltip  align="center">
<template   scope="scope">
      <div>
        <span style="margin-left: 10px">{{ fmttype(scope.row.type) }}</span>
      </div>
    </template>
</el-table-column>

    <el-table-column    prop="cve"  label="CVE编号" min-width="80" show-overflow-tooltip  align="center">
    </el-table-column>

    <el-table-column   prop="cvss"  label="CVSS版本" min-width="80" show-overflow-tooltip   align="center">
    </el-table-column>
    <el-table-column   prop="update_date"  label="更新时间" min-width="80" show-overflow-tooltip align="center">
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
          rowData:{},
          myShow: false
        }
    },
  props:['id'],
  computed:{
    ...mapState({
      // orgList:state=>state.context.orgList,
       //userList:state=>state.context.userList,
   })
  },
   methods:{
     //默认的方法,基本无需修改
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
     fmtpriority(val){
       let s = '';
       switch (parseInt(val)) {
          case 1:
            s = '低';
            break;
          case 2:
            s = '正常';
            break;
          case 3:
            s = '高';
            break;
          case 4:
            s = '最高';
            break;
          default:
            s='--';
        }
        return s;
     },
     fmtrisk_level(val){
       let s = '';
       switch (parseInt(val)) {
          case 1:
            s = '低';
            break;
          case 2:
            s = '正常';
            break;
          case 3:
            s = '高';
            break;
          case 4:
            s = '严重';
            break;
          default:
            s='--';
        }
        return s;
     },
     fmtmode(val){
       let s = '';
       switch (parseInt(val)) {
          case 1:
            s = '仅检测';
            break;
          case 2:
            s = '阻止';
            break;
          default:
            s='--';
        }
        return s;
     },
     fmttype(val){
       let s = '';
       switch (parseInt(val)) {
          case 1:
            s = '智能';
            break;
          case 2:
            s = '入侵';
            break;
          case 3:
            s = '漏洞';
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
    tableUrl:"/ssa/alarmInfoList/getDataList_ds.do",
    params:{},
   };

   this.$store.commit('registerConf', [this.id, defConf]);
   this.defConf = this.$store.state.editTable[this.id];
   this.$store.dispatch('reloadTable', this.id);

  }
}
</script>
