<template>

  <div class="wraper container-fluid">
    
    <template v-if="editPanel==0">
      <el-breadcrumb separator="/" class="my-breadcrumb">
        <el-breadcrumb-item>网安民警</el-breadcrumb-item>
        <el-breadcrumb-item>民警管理列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="20">
        <el-col :span="6">
          <Department></Department>
        </el-col>
        <el-col :span="18">
          <SimpleSearch></SimpleSearch>
          <EditToolbar></EditToolbar>
          <ResultTable></ResultTable>
        </el-col>
      </el-row>
    </template>
    <template v-if='editPanel==1'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>网安民警</el-breadcrumb-item>
        <el-breadcrumb-item>人员资料维护</el-breadcrumb-item>
      </el-breadcrumb>
      <StaffEdit></StaffEdit>
    </template>
    <template v-if='editPanel==2'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>网安民警</el-breadcrumb-item>
        <el-breadcrumb-item>部门资料维护</el-breadcrumb-item>
      </el-breadcrumb>
      <DepartmentEdit></DepartmentEdit>
    </template>
  </div>
</template>

<script>
import commonAjax from 'components/js/common.js'
import {mapState,mapActions } from 'vuex'
import SimpleSearch from './SimpleSearch.vue'
import EditToolbar from './EditToolbar.vue'
import ResultTable from './ResultTable.vue'
import StaffEdit from './StaffEdit.vue'
import Department from './Department.vue'
import DepartmentEdit from './DepartmentEdit.vue'
export default {
  components:{ SimpleSearch,EditToolbar,ResultTable,StaffEdit,Department,DepartmentEdit
  },
  computed:{
    ...mapState({
      editPanel:state=>state.content.editPanel
   })},
   methods:{
      ...mapActions({
        setPoliceRank:'setPoliceRank',
        getOrgList:'getOrgList'        
   })},
  created :function() {

  },
  mounted:function(){
        commonAjax.req('/ssa/netSecurityPolice/getPoliceRank.do').then((data)=>{
            this.setPoliceRank(data)   
        })
        this.getOrgList()
  
  }
}
</script>
<style>
.my-breadcrumb{
  padding:0px 0px 10px 0px;
  font-size:18px;
}
</style>