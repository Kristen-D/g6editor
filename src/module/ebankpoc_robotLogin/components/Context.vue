<template>
<div>
  <drillDialog></drillDialog>
  <el-row>
    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>登录分布</h3>
      </div>
      <div class="el-panel-white-body clearfloat">
        <el-col :span="8">
          <!-- <div class="echartsbox1" id="attackbox2"></div> -->
          <loginSpread></loginSpread>
        </el-col>
        <el-col :span="8">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>国外登录量TOP5</h3>
          <!-- <div class="echartsbox1" id="barbox5"></div> -->
          <internationalLoginTop5></internationalLoginTop5>
        </el-col>
        <el-col :span="8">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>国内登录量TOP5</h3>
          <!-- <div class="echartsbox1" id="barbox6"></div> -->
          <nationalLoginTop5></nationalLoginTop5>
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
        <!-- <div class="echartsbox1" id="linebox2"></div> -->
        <quantityTrend></quantityTrend>
      </div>
    </div>
  </el-row>
  <el-row :gutter="15">
    <el-col :span="12">
      <div class="el-panel-white">
        <div class="el-panel-white-heading">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>登录时长TOP10</h3>
        </div>
        <div class="el-panel-white-body">
          <!-- <div class="echartsbox1" id="barbox2"></div> -->
          <loginTimeTop10></loginTimeTop10>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="el-panel-white">
        <div class="el-panel-white-heading">
          <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>登录次数TOP10</h3>
        </div>
        <div class="el-panel-white-body">
          <!-- <div class="echartsbox1" id="barbox3"></div> -->
          <loginFrequencyTop10></loginFrequencyTop10>
        </div>
      </div>
    </el-col>
  </el-row>

  <!-- <el-row>
    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>登录记录</h3>
      </div>
      <div class="el-panel-white-body">
        <div class="echartsbox1" id="barbox4"></div>
      </div>
    </div>
  </el-row> -->
</div>
</template>

<script>
import quantityTrend from './charts/QuantityTrend.vue'
import loginTimeTop10 from  './charts/LoginTimeTop10.vue'
import loginFrequencyTop10 from './charts/LoginFrequencyTop10.vue'
import loginSpread from './charts/LoginSpread.vue'
import internationalLoginTop5 from './charts/InternationalLoginTop5.vue'
import nationalLoginTop5 from './charts/NationalLoginTop5.vue'
import drillDialog from './DrillDialogTable.vue'
export default {
  components: {
    quantityTrend, loginTimeTop10, loginFrequencyTop10,
    loginSpread, internationalLoginTop5, nationalLoginTop5,
    drillDialog
  }
}
</script>

<style lang="css">
</style>
