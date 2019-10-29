<template>

  <div class="wraper container-fluid">
    
    <template v-if="editPanel==0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>规则管理</el-breadcrumb-item>
        <el-breadcrumb-item>规则列表</el-breadcrumb-item>
      </el-breadcrumb>
      <SimpleSearch v-if="searchPanel==0"></SimpleSearch>
      <ComplexSearch v-else></ComplexSearch>
      <EditToolbar></EditToolbar>
      <ResultTable></ResultTable>
    </template>
    <template v-if='editPanel==1'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>规则管理</el-breadcrumb-item>
        <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      </el-breadcrumb>
      <EditRule ></EditRule>
    </template>
    
  </div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import SimpleSearch from './SimpleSearch.vue'
import ComplexSearch from './ComplexSearch.vue'
import EditToolbar from './EditToolbar.vue'
import ResultTable from './ResultTable.vue'
import EditRule from './EditRule.vue'
export default {
  components:{ SimpleSearch,ComplexSearch,EditToolbar,ResultTable,EditRule
  },
  computed:{
    ...mapState({
       menuName:state=>state.context.menuName,
       searchPanel:state=>state.context.searchPanel,
       editPanel:state=>state.context.editPanel 
   })},
   methods:{
            ...mapActions({
            getSubSystemList:'getSubSystemList',
            getAttrData:'getAttrData',
            getFuncData:'getFuncData'
                
   })},
  created :function() {

  },
  mounted:function(){
    this.getSubSystemList();
    this.getAttrData();
    this.getFuncData();
  }
}
</script>
<style>
.el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-breadcrumb {
    font-size: 16px;
    line-height: 1;
    margin-bottom: 10px;
  }
</style>