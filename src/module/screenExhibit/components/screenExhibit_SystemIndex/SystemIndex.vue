<template >
<div>
  <el-row :gutter="20" class="container-wrap">
    <el-col :span="6">
      <safteyindex></safteyindex>
      <!-- <div class="el-panel-bigscreen">
  				<div class="el-panel-bigscreen-heading">
  					<h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>安全指数</h3>
  				</div>
  				<div class="el-panel-bigscreen-body">
  					 <div class="safe-indexes">
  						 <p class="numword">92.9</p>
  						 <p>状态良好</p>
  						 <i class="fa fa-dashboard"></i>
  					 </div>
  					 <el-row class="m-t46">
  						 <div class="echartsbox1" id="Pie1"></div>
  						 <ul class="pielist">
  							 <li class="echartsbox2" id="oneliPie1"></li>
  							 <li class="echartsbox2" id="oneliPie2"></li>
  							 <li class="echartsbox2" id="oneliPie3"></li>
  							 <li class="echartsbox2" id="oneliPie4"></li>
  							 <li class="echartsbox2" id="oneliPie5"></li>
  							 <li class="echartsbox2" id="oneliPie6"></li>
  						 </ul>
  					 </el-row>
  					 <div class="divider"></div>
  					 <el-row class="m-t30">
  						 <div class="echartsbox1" id="Pie2"></div>
  						 <ul class="pielist">
  							 <li class="echartsbox2" id="twoliPie1"></li>
  							 <li class="echartsbox2" id="twoliPie2"></li>
  							 <li class="echartsbox2" id="twoliPie3"></li>
  							 <li class="echartsbox2" id="twoliPie4"></li>
  							 <li class="echartsbox2" id="twoliPie5"></li>
  							 <li class="echartsbox2" id="twoliPie6"></li>
  						 </ul>
  					 </el-row>
  					 <div class="divider"></div>
  					 <el-row class="m-t30">
  						 <div class="echartsbox1" id="Pie3"></div>
  						 <ul class="pielist pielist2">
  							 <li class="echartsbox2" id="threeliPie1"></li>
  							 <li class="echartsbox2" id="threeliPie2"></li>
  							 <li class="echartsbox2" id="threeliPie3"></li>
  						 </ul>
  					 </el-row>
  				</div>
  			</div> -->
    </el-col>
    <el-col :span="12">
      <el-row>
        <div class="el-panel-bigscreen">
          <taiyuanmap></taiyuanmap>
        </div>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="el-panel-bigscreen">
            <div class="el-panel-bigscreen-heading">
              <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>事件指数趋势</h3>
            </div>
            <div class="el-panel-bigscreen-body">
              <eventtrend></eventtrend>
              <!-- <div class="echartsbox3" id="LineA"></div> -->
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="el-panel-bigscreen">
            <div class="el-panel-bigscreen-heading">
              <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>综合防控趋势</h3>
            </div>
            <div class="el-panel-bigscreen-body">
              <comprecontroltrend></comprecontroltrend>
              <!-- <div class="echartsbox3" id="LineB"></div> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <workflowindex></workflowindex>
    </el-col>
  </el-row>
</div>
</template>

<script>
import safteyindex from './SafteyIndex.vue'
import taiyuanmap from './TaiYuanMap.vue'
import eventtrend from './EventTrendIndex.vue'
import comprecontroltrend from './CompreControlTrend.vue'
import workflowindex from './WorkFlowIndex.vue'
export default {
  components: {
    safteyindex,
    taiyuanmap,
    eventtrend,
    comprecontroltrend,
    workflowindex
  }
}
</script>

<style>
</style>
