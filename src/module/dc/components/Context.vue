<template>
<div class="">
  <!-- <div class="top-breadcrumb">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item><span class="title"></span>数据中心</el-breadcrumb-item>
    <el-breadcrumb-item>数据总览</el-breadcrumb-item>
  </el-breadcrumb>
  </div> -->

  <el-row :gutter="20">
     <el-col :span="12">
     <div class="el-panel-white">
     <div class="el-panel-white-heading"><h3 class="el-panel-white-title">数据采集</h3></div>
     <div class="el-panel-white-body">
       <datapick></datapick>
     </div>
   </div>
   </el-col>
   <el-col :span="12">
     <div class="el-panel-white">
     <div class="el-panel-white-heading"><h3 class="el-panel-white-title">入库分析</h3></div>
     <div class="el-panel-white-body">
          <entersituation></entersituation>
     </div>
   </div>
   </el-col>
  </el-row>

 <el-row>
   <div class="el-panel-white">
     <div class="el-panel-white-heading"><h3 class="el-panel-white-title">资产数据接入</h3></div>
     <div class="el-panel-white-body">
         <assetdata ></assetdata>
     </div>
   </div>
 </el-row>

  <el-row>
   <div class="el-panel-white">
     <div class="el-panel-white-heading"><h3 class="el-panel-white-title">数据流量监控</h3></div>
     <div class="el-panel-white-body">
          <dataflow></dataflow>
     </div>
   </div>
 </el-row>
 <drillDialog></drillDialog>
</div>

</template>

<script>
import datapick from "./DataPick.vue"
import entersituation from "./EnterSituation.vue"
import dataflow from "./DataFlow.vue"
import assetdata from "./AssetData.vue"
import drillDialog from './DrillDialog.vue'
export default {
  components: {
    datapick, entersituation, dataflow, assetdata,drillDialog
  }
}
</script>
<style>

</style>
