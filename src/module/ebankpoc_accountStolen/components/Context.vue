<template>
<div>
  <drillDialog></drillDialog>
  <el-row :gutter="15">
    <el-col :span="8">
      <div class="el-panel-white">
        <div class="el-panel-white-heading">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>交易占比</h3>
        </div>
        <div class="el-panel-white-body">
          <!-- <div class="echartsbox1" id="piebox3"></div> -->
          <accountOperationPie></accountOperationPie>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="el-panel-white">
        <div class="el-panel-white-heading">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>被盗账号交易Top5</h3>
        </div>
        <div class="el-panel-white-body">
          <!-- <div class="echartsbox2" id="barbox9"></div> -->
            <accountStolenTop5></accountStolenTop5>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="el-panel-white">
        <div class="el-panel-white-heading">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>单笔被盗金额Top5</h3>
        </div>
        <div class="el-panel-white-body">
          <!-- <div class="echartsbox2" id="barbox10"></div> -->
          <stolenAmountTop5></stolenAmountTop5>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="15">
    <el-col :span="16">
      <div class="el-panel-white">
        <div class="el-panel-white-heading">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>账号盗用趋势<span class="subhead">(近30天)</span></h3>
        </div>
        <div class="el-panel-white-body">
          <!-- <div class="echartsbox1" id="linebox3"></div> -->
          <accountStolenTrend></accountStolenTrend>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="el-panel-white">
        <div class="el-panel-white-heading">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>被盗金额</h3>
        </div>
        <div class="el-panel-white-body">
          <!-- <div class="echartsbox1" id="radarbox"></div> -->
          <stolenAmountSpread></stolenAmountSpread>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import accountOperationPie from './charts/AccountOperationPie.vue'
import stolenAmountTop5 from './charts/StolenAmountTop5.vue'
import accountStolenTop5 from './charts/AccountStolenTop5.vue'
import accountStolenTrend from './charts/AccountStolenTrend.vue'
import stolenAmountSpread from './charts/StolenAmountSpread.vue'
import drillDialog from './DrillDialogTable.vue'
export default {
  components: {
    accountOperationPie, stolenAmountTop5, accountStolenTop5,
    accountStolenTrend, stolenAmountSpread, drillDialog
  }
}
</script>

<style lang="css">
</style>
