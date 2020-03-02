<template>
<div>
  <el-row :gutter="16">
    <el-col :span="12">
        <pup-statistics></pup-statistics>


    </el-col>
    <el-col :span="6">
      <pup-type :puptype="pups[0]"></pup-type>

      <pup-type :puptype="pups[1]"></pup-type>

    </el-col>
    <el-col :span="6">
      <pup-type :puptype="pups[2]"></pup-type>

      <pup-type :puptype="pups[3]"></pup-type>

    </el-col>
  </el-row>
  <el-row :gutter="16">
    <el-col :span="12">
      <pup-trend></pup-trend>
      <!-- <pup-warnings></pup-warnings> -->
    </el-col>
    <el-col :span="6">

      <affected-things :pupaffected="pupAffected[0]"></affected-things>
    </el-col>
    <el-col :span="6">
      <affected-things :pupaffected="pupAffected[1]"></affected-things>
    </el-col>
  </el-row>
  <el-row :gutter="16">
    <el-col :span="18">
      <pup-warnings></pup-warnings>
        <!-- <pup-trend></pup-trend> -->
    </el-col>
    <el-col :span="6">

        <pup-attack-top></pup-attack-top>
    </el-col>
  </el-row>

</div>
</template>

<script>
import PupStatistics from './top/PupStatistics.vue'
import PupType from './top/PupType.vue'
import PupWarnings from './middle/PupWarnings.vue'
import AffectedThings from './middle/AffectedThings.vue'
import PupTrend from './bottom/PupTrend.vue'
import PupAttackTop from './bottom/PupAttackTop.vue'
import DrillDialog from './DrillDialogTable.vue'
export default {
  components: {
    PupStatistics,
    PupType,
    PupWarnings,
    AffectedThings,
    PupTrend,
    PupAttackTop,
    DrillDialog
  },
  data() {
    return {
      pups:[
        {title:'僵尸网络', eid:'puptypepiebar1', dataUrl:'', name:'网站', malwareSubtype:'Bot'},
        {title:'蠕虫', eid:'puptypepiebar2', dataUrl:'', name:'资产', malwareType:'Network Virus'},
        {title:'木马', eid:'puptypepiebar3', dataUrl:'', name:'单位', malwareSubtype:'Trojan'},
        {title:'病毒', eid:'puptypepiebar4', dataUrl:'', name:'单位', malwareType:'Virus'},
      ],
      pupAffected: [
        {title:'受害资产TOP', eid:'pupaffectedbar1', dataUrl:'', type:'asset'},
        {title:'受害单位TOP', eid:'pupaffectedbar2', dataUrl:'', type:'department'}
      ]

    }
  },
  created() {
    // this.$store.dispatch('loadUserRoleState');
  }

}
</script>

<style>

</style>
