<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>攻击阶段图</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <div class="box">
        <span class="box-tl"></span>
        <span class="box-br"></span>
        <div class="topbox1" id="topgraph">
          <img src="/static/images/bigscreen/attack-top2.png" alt="">
        </div>
        <div class="attack-top-step" id="attack-step">
          <p :class="[activePhase==='情报刺探'?'active':'', 'step1']">1&nbsp;情报刺探</p>
          <p :class="[activePhase==='弱点攻击'?'active':'', 'step2']">2&nbsp;弱点攻击</p>
          <p :class="[activePhase==='命令控制'?'active':'', 'step3']">3&nbsp;命令控制</p>
          <p :class="[activePhase==='渗透感染'?'active':'', 'step4']">4&nbsp;渗透感染</p>
          <p :class="[activePhase==='资料发掘'?'active':'', 'step5']">5&nbsp;资料发掘</p>
          <p :class="[activePhase==='攻击窃取'?'active':'', 'step6']">6&nbsp;攻击窃取</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['activePhase'],
  methods: {
    loadMapChart() {
      // window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
