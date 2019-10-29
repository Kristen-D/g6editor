<template>
  <el-row :gutter="40" class="container-wrap">
    <el-col :span="17">
      <el-row>
        <assetproportion></assetproportion>
        <!-- <div class="el-panel-bigscreen">
          <div class="el-panel-bigscreen-heading">
            <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>资产占比</h3>
          </div>
          <div class="el-panel-bigscreen-body">
            <div class="echartsmapbox2" id="treemapbox"></div>
          </div>
        </div> -->
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <safetytrend></safetytrend>
          <!-- <div class="el-panel-bigscreen">
            <div class="el-panel-bigscreen-heading">
              <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>安全趋势</h3>
            </div>
            <div class="el-panel-bigscreen-body">
              <div class="echartsbox9" id="Linebox"></div>
            </div>
          </div> -->
        </el-col>
        <el-col :span="8">
          <activeattack></activeattack>
          <!-- <div class="el-panel-bigscreen">
            <div class="el-panel-bigscreen-heading">
              <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>活跃攻击类型</h3>
            </div>
            <div class="el-panel-bigscreen-body">
              <div class="echartsbox9" id="scatterbox"></div>
            </div>
          </div> -->
        </el-col>
        <el-col :span="8">
          <threatedassetowner></threatedassetowner>
          <!-- <div class="el-panel-bigscreen">
            <div class="el-panel-bigscreen-heading">
              <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>被威胁资产负责人</h3>
            </div>
            <div class="el-panel-bigscreen-body">
              <ul class="safe-mark addattr">
                <li><p>林冬冬</p><label>太原市国资委</label><p>98</p></li>
                <li><p>吴亚卿</p><label>太原市财政局</label><p>87</p></li>
                <li><p>杨建民</p><label>太原市国家税务局</label><p>46</p></li>
                <li><p>何登平</p><label>山西省国资委</label><p>38</p></li>
                <li><p>黄杰</p><label>山西省财政厅</label><p>24</p></li>
              </ul>
            </div>
          </div> -->
        </el-col>
      </el-row>
    </el-col>

    <el-col :span="7">
      <el-row>
        <threatedtrend></threatedtrend>
        <!-- <div class="el-panel-bigscreen">
          <div class="el-panel-bigscreen-heading">
            <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>受威胁趋势</h3>
          </div>
          <div class="el-panel-bigscreen-body">
            <div class="echartsbox10" id="BarA"></div>
          </div>
        </div> -->
      </el-row>
      <el-row>
        <keyassettop5></keyassettop5>
        <!-- <div class="el-panel-bigscreen">
          <div class="el-panel-bigscreen-heading">
            <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>重要资产受威胁TOP5</h3>
          </div>
          <div class="el-panel-bigscreen-body">
            <div class="echartsbox10" id="BarB"></div>
          </div>
        </div> -->
      </el-row>
      <el-row>
        <assettop5></assettop5>
        <!-- <div class="el-panel-bigscreen">
          <div class="el-panel-bigscreen-heading">
            <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>普通资产受威胁TOP5</h3>
          </div>
          <div class="el-panel-bigscreen-body">
            <div class="echartsbox10" id="BarC"></div>
          </div>
        </div> -->
      </el-row>
    </el-col>

  </el-row>
</template>

<script>
import assetproportion from './left/AssetProportion.vue'
import safetytrend from './left/SafetyTrend.vue'
import activeattack from './left/ActiveAttack.vue'
import threatedassetowner from './left/ThreatedAssetOwner.vue'
import threatedtrend from './right/ThreatedTrend.vue'
import keyassettop5 from './right/KeyAssetThreatedTop5.vue'
import assettop5 from './right/AssetThreatedTop5.vue'
export default {
  components: {
    assetproportion, safetytrend, activeattack, threatedassetowner,
    threatedtrend, keyassettop5, assettop5
  }
}
</script>

<style>
</style>
