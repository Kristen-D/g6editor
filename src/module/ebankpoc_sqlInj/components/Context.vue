<template>
<div>
  <drillDialog></drillDialog>
  <el-row>
      <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>攻击分布</h3>
      </div>
      <div class="el-panel-white-body clearfloat">
        <el-col :span="8">
            <!-- <div class="echartsbox1" id="attackbox"></div> -->
            <sqlInjSpread></sqlInjSpread>
          </el-col>
          <el-col :span="16">
            <!-- <div class="echartsbox1" id="linebox2"></div> -->
            <sqlInjLine></sqlInjLine>
          </el-col>
      </div>
    </div>
  </el-row>
  <el-row>
    <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>攻击趋势<span class="subhead">(近30天)</span></h3>
    </div>
    <div class="el-panel-white-body">
        <!-- <div class="echartsbox1" id="linebox1"></div> -->
        <sqlInjTrend></sqlInjTrend>
    </div>
  </div>
</el-row>
<el-row>
    <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>注入记录</h3>
    </div>
    <div class="el-panel-white-body">
        <!-- <div class="echartsbox1" id="barbox1"></div> -->
        <sqlInjRecord></sqlInjRecord>
    </div>
  </div>
</el-row>

</div>
</template>

<script>
import sqlInjTrend from './charts/SqlInjTrend.vue'
import sqlInjRecord from  './charts/SqlInjRecord.vue'
import sqlInjLine from './charts/SqlInjLine.vue'
import sqlInjSpread from './charts/SqlInjSpread.vue'
import drillDialog from './DrillDialogTable.vue'

export default {
  components: {
    sqlInjTrend, sqlInjRecord, sqlInjLine, sqlInjSpread,
    drillDialog
  }
}
</script>

<style lang="css">
</style>
