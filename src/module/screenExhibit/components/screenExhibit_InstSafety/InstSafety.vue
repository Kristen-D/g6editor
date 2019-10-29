<template>

  <el-row :gutter="30" class="container-wrap">
    <el-col :span="6">
      <instattackedtop5></instattackedtop5>
     <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>受攻击单位TOP5</h3>
       </div>
       <div class="el-panel-bigscreen-body">
         <div class="echartsbox4" id="BarBox1"></div>
       </div>
     </div> -->
      <div class="divider"></div>
      <attackeventsort></attackeventsort>
      <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h4 class="el-panel-bigscreen-subtitle2">攻击事件量排行</h4>
       </div>
       <div class="el-panel-bigscreen-body">
         <div class="echartsbox12" id="funnelBox1"></div>
       </div>
     </div> -->
      <div class="divider"></div>
      <attacklevelsort></attacklevelsort>
      <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h4 class="el-panel-bigscreen-subtitle2">攻击等级分布</h4>
       </div>
       <div class="el-panel-bigscreen-body">
          <div class="echartsbox6" id="PieBox1"></div>
       </div>
     </div> -->
      <div class="divider" style="margin: 10px auto;"></div>
      <attacktypesort></attacktypesort>
      <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h4 class="el-panel-bigscreen-subtitle2">攻击类别</h4>
       </div>
       <div class="el-panel-bigscreen-body">
         <div class="attacktype clearfloat">
           <div class="attacktype-bar">
             <p><span>1</span>18496</p>
             <div class="linebar">
               <div class="line-bar" style="width: 100%"></div>
             </div>
           </div>
           <div class="attacktype-txt">
             <p>类型：内部网络扩散格式不符</p><p>单位：太原第三中学</p>
           </div>
         </div>
         <div class="attacktype clearfloat">
           <div class="attacktype-bar">
             <p><span>2</span>13196</p>
             <div class="linebar">
               <div class="line-bar" style="width: 72%"></div>
             </div>
           </div>
           <div class="attacktype-txt">
             <p>类型：其他高危病毒</p><p>单位：太原武警医院</p>
           </div>
         </div>
         <div class="attacktype clearfloat">
           <div class="attacktype-bar">
             <p><span>3</span>3964</p>
             <div class="linebar">
               <div class="line-bar" style="width: 22%"></div>
             </div>
           </div>
           <div class="attacktype-txt">
             <p>类型：ZEUS</p><p>单位：太原中心医院</p>
           </div>
         </div>
       </div>
     </div> -->

    </el-col>
    <el-col :span="12">
      <div class="el-panel-bigscreen">
         <div class="el-panel-bigscreen-heading">
           <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>单位区域分布</h3>
         </div>
         <div class="el-panel-bigscreen-body box">
            <span class="box-tl"></span><span class="box-br"></span>
            <instspreadmap></instspreadmap>
            <!-- <div class="echartsmapbox1" id="mapbox1"></div> -->
              <el-row :gutter="20">
               <el-col :span="12">
                 <instspreadbar></instspreadbar>
                 <!-- <div class="echartsbox11" id="BarBox3"></div> -->
               </el-col>
               <el-col :span="12">
                 <instspreadpie></instspreadpie>
                 <!-- <div class="echartsbox11" id="PieBox3"></div> -->
               </el-col>
            </el-row>
         </div>
       </div>
    </el-col>

    <el-col :span="6">
      <instthreatedtop5></instthreatedtop5>
     <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>受威胁单位TOP</h3>
       </div>
       <div class="el-panel-bigscreen-body">
         <div class="echartsbox4" id="BarBox2"></div>
       </div>
     </div> -->
      <div class="divider"></div>
      <threateventsort></threateventsort>
      <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h4 class="el-panel-bigscreen-subtitle2">威胁事件量排行</h4>
       </div>
       <div class="el-panel-bigscreen-body">
         <div class="echartsbox12" id="funnelBox2"></div>
       </div>
     </div> -->
      <div class="divider"></div>
      <threatleveldistribution></threatleveldistribution>

      <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h4 class="el-panel-bigscreen-subtitle2">威胁等级分布</h4>
       </div>
       <div class="el-panel-bigscreen-body">
          <div class="echartsbox6" id="PieBox2"></div>
       </div>
     </div> -->
      <div class="divider" style="margin: 10px auto;"></div>
      <threattypesort></threattypesort>
      <!-- <div class="el-panel-bigscreen">
       <div class="el-panel-bigscreen-heading">
         <h4 class="el-panel-bigscreen-subtitle2">威胁类别</h4>
       </div>
       <div class="el-panel-bigscreen-body">
           <div class="attacktype clearfloat">
           <div class="attacktype-bar">
             <p><span>1</span>18496</p>
             <div class="linebar">
               <div class="line-bar" style="width: 100%"></div>
             </div>
           </div>
           <div class="attacktype-txt">
             <p>类型：内部网络扩散格式不符</p><p>单位：太原第三中学</p>
           </div>
         </div>
         <div class="attacktype clearfloat">
           <div class="attacktype-bar">
             <p><span>2</span>13196</p>
             <div class="linebar">
               <div class="line-bar" style="width: 72%"></div>
             </div>
           </div>
           <div class="attacktype-txt">
             <p>类型：其他高危病毒</p><p>单位：太原武警医院</p>
           </div>
         </div>
         <div class="attacktype clearfloat">
           <div class="attacktype-bar">
             <p><span>3</span>3964</p>
             <div class="linebar">
               <div class="line-bar" style="width: 22%"></div>
             </div>
           </div>
           <div class="attacktype-txt">
             <p>类型：ZEUS</p><p>单位：太原中心医院</p>
           </div>
         </div>
       </div>
     </div> -->

    </el-col>
  </el-row>
</template>

<script>
import instattackedtop5 from './left/InstAttackedTop5.vue'
import attackeventsort from './left/AttackEventSort.vue'
import attacklevelsort from './left/AttackLevelSort.vue'
import attacktypesort from './left/AttackTypeSort.vue'
import instspreadmap from './middle/InstSpreadMap.vue'
import instspreadbar from './middle/InstSpreadBar.vue'
import instspreadpie from './middle/InstSpreadPie.vue'
import instthreatedtop5 from './right/InstThreatedTop5.vue'
import threateventsort from './right/ThreatedEventSort.vue'
import threatleveldistribution from './right/ThreatLevelDistribution.vue'
import threattypesort from './right/ThreatTypeSort.vue'
export default {
  components: {
    instattackedtop5, attackeventsort, attacklevelsort, attacktypesort,
    instspreadmap, instspreadbar, instspreadpie,
    instthreatedtop5, threateventsort, threatleveldistribution, threattypesort
  }

}
</script>

<style>
</style>
