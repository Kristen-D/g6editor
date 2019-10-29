<template>
<el-row :gutter="30" class="container-wrap">
  <el-col :span="7">
    <el-row>
      <div class="el-panel-bigscreen">
        <div class="el-panel-bigscreen-heading">
          <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>攻击趋势</h3>
        </div>
        <div class="el-panel-bigscreen-body">
          <attacktrend></attacktrend>
          <!-- <div class="echartsbox4" id="Line"></div> -->
        </div>
      </div>
    </el-row>

    <el-row>
      <div class="el-panel-bigscreen">
        <div class="el-panel-bigscreen-heading">
          <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>重要单位受攻击</h3>
        </div>
        <div class="el-panel-bigscreen-body" style="padding-bottom: 0;">
          <keyinstattacked></keyinstattacked>
          <!-- <div class="echartsbox6" id="Bar1"></div> -->
        </div>
      </div>
    </el-row>

    <el-row>
      <div class="el-panel-bigscreen">
        <div class="el-panel-bigscreen-heading">
          <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>重要资产受攻击</h3>
        </div>
        <div class="el-panel-bigscreen-body" style="padding-bottom: 0">
          <keyassetattacked></keyassetattacked>
          <!-- <div class="echartsbox4" id="Bar2"></div> -->
        </div>
      </div>
    </el-row>

    <el-row>
      <div class="el-panel-bigscreen">
        <div class="el-panel-bigscreen-heading">
          <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>攻击源占比</h3>
        </div>
        <div class="el-panel-bigscreen-body">
          <attacksourcepro></attacksourcepro>
          <!-- <div class="echartsbox7" id="Treemap"></div> -->
        </div>
      </div>
    </el-row>
  </el-col>

  <el-col :span="17">
    <el-row>
      <div class="el-panel-bigscreen">
        <div class="el-panel-bigscreen-heading">
          <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>网络攻击态势</h3>
        </div>
        <div class="el-panel-bigscreen-body">
          <div class="box">
            <span class="box-tl"></span>
            <span class="box-br"></span>
            <div class="echartsmapbox2">
              <el-col :span="16">
                <attackmap></attackmap>
                <!-- <div class="echartsmapbox2" id="WorldMapbox"></div> -->
              </el-col>
              <el-col :span="8">
                <attackpiebar></attackpiebar>
                <!-- <div class="echartsmapbox2" id="PieBarbox"></div> -->
              </el-col>
            </div>

          </div>

        </div>
      </div>
    </el-row>

    <el-row>
      <div class="el-panel-bigscreen">
        <div class="el-panel-bigscreen-heading">
          <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>安全攻击TOP</h3>
        </div>
        <div class="el-panel-bigscreen-body">
          <el-row :gutter="20">
            <el-col :span="6">
              <subtypetop5></subtypetop5>
              <!-- <h4 class="el-panel-bigscreen-subtitle2">攻击类型</h4>
              <ul class="safe-mark">
                <li>
                  <div>1</div><label>DDOS攻击</label><span>80个</span></li>
                <li>
                  <div>2</div><label>蠕虫病毒</label><span>65个</span></li>
                <li>
                  <div>3</div><label>低速扫描</label><span>55个</span></li>
                <li>
                  <div>4</div><label>木马攻击</label><span>43个</span></li>
                <li>
                  <div>5</div><label>暴力破解</label><span>37个</span></li>
              </ul> -->
            </el-col>
            <el-col :span="6">
              <assettop5></assettop5>
              <!-- <h4 class="el-panel-bigscreen-subtitle2">资产名称</h4>
              <ul class="safe-mark">
                <li>
                  <div>1</div><label>10.23.32.71服务器</label><span>96个</span></li>
                <li>
                  <div>2</div><label>11.15.22.53服务器</label><span>87个</span></li>
                <li>
                  <div>3</div><label>10.23.32.71服务器</label><span>82个</span></li>
                <li>
                  <div>4</div><label>192.168.2.5域名</label><span>78个</span></li>
                <li>
                  <div>5</div><label>192.168.5.7域名</label><span>68个</span></li>
              </ul> -->
            </el-col>
            <el-col :span="6">
              <attackedinsttop5></attackedinsttop5>
              <!-- <h4 class="el-panel-bigscreen-subtitle2">事发单位</h4>
              <ul class="safe-mark">
                <li>
                  <div>1</div><label>太原市国资委</label><span>77个</span></li>
                <li>
                  <div>2</div><label>太原市财政局</label><span>72个</span></li>
                <li>
                  <div>3</div><label>太原市国家税务局</label><span>64个</span></li>
                <li>
                  <div>4</div><label>山西省国资委</label><span>46个</span></li>
                <li>
                  <div>5</div><label>山西省财政厅</label><span>33个</span></li>
              </ul> -->
            </el-col>
            <el-col :span="6">
              <attackedareatop5></attackedareatop5>
              <!-- <h4 class="el-panel-bigscreen-subtitle2">事发地域</h4>
              <ul class="safe-mark">
                <li>
                  <div>1</div><label>杏花岭区</label><span>89个</span></li>
                <li>
                  <div>2</div><label>迎泽区</label><span>76个</span></li>
                <li>
                  <div>3</div><label>万柏林区</label><span>54个</span></li>
                <li>
                  <div>4</div><label>尖草坪区</label><span>38个</span></li>
                <li>
                  <div>5</div><label>晋源区</label><span>23个</span></li>
              </ul> -->
            </el-col>
          </el-row>
        </div>
      </div>
    </el-row>
  </el-col>

</el-row>
</template>

<script>
import attacktrend from './AttackTrend.vue'
import keyinstattacked from './KeyInstAttacked.vue'
import keyassetattacked from './KeyAssetAttacked.vue'
import attacksourcepro from './AttackSourcePro.vue'
import attackmap from './AttackMap.vue'
import attackpiebar from './AttackPieBar.vue'
import subtypetop5 from './SubEventTypeTop5.vue'
import assettop5 from './AssetTop5.vue'
import attackedinsttop5 from './AttackedInstTop5.vue'
import attackedareatop5 from './AttackedAreaTop5.vue'
export default {
  components: {
    attacktrend, keyinstattacked, keyassetattacked, attacksourcepro,
    attackmap, attackpiebar, subtypetop5, assettop5,
    attackedinsttop5, attackedareatop5
  }
}
</script>

<style>

</style>
