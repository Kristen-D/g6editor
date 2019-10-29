<template>

  <div class="wraper container-fluid">
    
    <template v-if="editPanel==0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>规则场景</el-breadcrumb-item>
        <el-breadcrumb-item>场景列表</el-breadcrumb-item>
      </el-breadcrumb>
      <SimpleSearch></SimpleSearch>
      <EditToolbar></EditToolbar>
      <ResultTable></ResultTable>
    </template>
    <template v-if='editPanel==1'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>规则场景</el-breadcrumb-item>
        <el-breadcrumb-item>场景展示</el-breadcrumb-item>
      </el-breadcrumb>
      <SceneView></SceneView>
    </template>
  </div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import SimpleSearch from './SimpleSearch.vue'
import EditToolbar from './EditToolbar.vue'
import ResultTable from './ResultTable.vue'
import SceneView from './SceneView.vue'
export default {
  components:{ SimpleSearch,EditToolbar,ResultTable,SceneView
  },
  data(){
      return {
         
      }
  },
  computed:{
    ...mapState({
       searchPanel:state=>state.content.searchPanel,
       editPanel:state=>state.content.editPanel,
       queryCondition:state=>state.content.queryCondition,
   })
   },
   mounted:function(){
      this.getRuleSceneList(this.queryCondition);
      this.getReportContext();
   },
  created:function() {

  },
  methods:{
      ...mapActions({
			     getRuleSceneList:'getRuleSceneList',
           getReportContext:'getReportContext'
      }),
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