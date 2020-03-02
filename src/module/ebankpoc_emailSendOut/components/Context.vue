<template>
<div>
  <drillDialog></drillDialog>
  <el-row  :gutter="15">
    <el-col :span="8">
      <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>邮箱外发关系图</h3>
      </div>
      <div class="el-panel-white-body">
          <!-- <div class="echartsbox2" id="Graphbox"></div> -->
          <emailSendOutTraffic></emailSendOutTraffic>
      </div>
    </div>
    </el-col>
    <el-col :span="8">
      <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>内网外发TOP5</h3>
      </div>
      <div class="el-panel-white-body">
          <!-- <div class="echartsbox2" id="barbox9"></div> -->
          <internalEmailTop5></internalEmailTop5>
      </div>
    </div>
    </el-col>
    <el-col :span="8">
      <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>外网接收邮箱TOP5</h3>
      </div>
      <div class="el-panel-white-body">
          <!-- <div class="echartsbox2" id="barbox10"></div> -->
          <externalEmailTop5></externalEmailTop5>
      </div>
    </div>
    </el-col>
</el-row>
<el-row>
  <div class="el-panel-white">
  <div class="el-panel-white-heading">
    <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>外发趋势<span class="subhead">(近30天)</span></h3>
  </div>
  <div class="el-panel-white-body">
      <!-- <div class="echartsbox1" id="linebox4"></div> -->
      <emailSendTrend></emailSendTrend>
  </div>
</div>
</el-row>
<!-- <el-row  :gutter="15">
    <el-col :span="16">
      <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>外发趋势<span class="subhead">(近30天)</span></h3>
      </div>
      <div class="el-panel-white-body">
          <div class="echartsbox1" id="linebox4"></div>
      </div>
    </div>
  </el-col>
  <el-col :span="8">
    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>等级占比</h3>
      </div>
      <div class="el-panel-white-body">
          <div class="echartsbox1" id="piebox3"></div>
      </div>
    </div>
  </el-col>
</el-row> -->
<!-- <el-row>
    <div class="el-panel-white">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title"><i class="el-icon-caret-right nav-title"></i>外发记录</h3>
    </div>
    <div class="el-panel-white-body">
        <div class="echartsbox1" id="barbox8"></div>
    </div>
  </div>
</el-row> -->
</div>
</template>

<script>
import emailSendOutTraffic from './charts/EmailSendOutTraffic.vue'
import internalEmailTop5 from  './charts/InternalEmailTop5.vue'
import externalEmailTop5 from './charts/ExternalEmailTop5.vue'
import emailSendTrend from './charts/EmailSendTrend.vue'
import drillDialog from './DrillDialogTable.vue'
export default {
  components: {
    emailSendOutTraffic, internalEmailTop5, externalEmailTop5,
    emailSendTrend, drillDialog
  },
  created: function() {
    // this.common.req('/ssa/ebankpoc/calucateAccountStolen.do', {}, this);
  }
}

</script>

<style lang="css">
</style>
