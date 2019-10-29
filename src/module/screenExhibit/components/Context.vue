<template>
  <div id="bigscreen">
    <!-- id="bigscreen" -->
    <header class="big-header">
  		<a class="logo-link" href="#">
  			<img class="logo" width="" height="36px" src="/static/images/bigscreen/logo.png" alt="logo">
  		</a>
  		<div class="announcement"><marquee direction="left" behavior="scroll" scrollamount="10" scrolldelay="200" onMouseOut="this.start()"  onMouseOver="this.stop()" >
  			最新公告:本月的微软补丁发布，以下两个严重安全漏洞需要紧急处置:震网三代lNK文件远程代码执行漏洞（CVE-2017-8464)</marquee></div>
    </header>
    <!-- <systemindex></systemindex> -->
    <!-- <attackinfo></attackinfo> -->
    <!-- <attakphase></attakphase> -->
    <!-- <vulnerability></vulnerability> -->

    <el-carousel indicator-position="none" :interval="180000" height="1010px" @change="changeActiveScreen">
      <el-carousel-item>
        <systemindex name="systemindex"></systemindex>
      </el-carousel-item>

      <el-carousel-item>
        <attackinfo name="attackinfo"></attackinfo>
      </el-carousel-item>

      <el-carousel-item>
        <attakphase name="attakphase"></attakphase>
      </el-carousel-item>
<!--
      <el-carousel-item>
        <vulnerability name="vulnerability"></vulnerability>
      </el-carousel-item> -->

      <el-carousel-item>
        <assetsafety name="assetsafety"></assetsafety>
      </el-carousel-item>

      <!-- <el-carousel-item>
        <instsafety name="instsafety"></instsafety>
      </el-carousel-item> -->

    </el-carousel>
    <!-- <footer>
  		 <ul class="footer" >
  			 <li class="active">系统指数</li>
  			 <li class="">网络攻击</li>
  			 <li class="">攻击阶段</li>
  			 <li class="">脆弱性</li>
  			 <li class="">资产安全</li>
  		 </ul>
  	</footer> -->
  </div>
</template>

<script>
import systemindex from './screenExhibit_SystemIndex/SystemIndex.vue'
import attackinfo from './screenExhibit_AttackInfo/AttackInfo.vue'
import attakphase from './screenExhibit_AttackPhase/AttackPhase.vue'
import vulnerability from './screenExhibit_Vulnerability/Vulnerability.vue'
import assetsafety from './screenExhibit_AssetSafety/AssetSafety.vue'
import instsafety from './screenExhibit_InstSafety/InstSafety.vue'
export default {
  components: {
    systemindex, attackinfo, attakphase, vulnerability, assetsafety, instsafety
  },
  data() {
    return {

    }
  },
  methods: {
    changeActiveScreen(now, old) {
      this.$store.commit('SET_ACTIVE_SCREEN', now);
      // console.log(now);
    }
  },
  created: function() {
    this.$store.dispatch('loadInfoList')
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>
