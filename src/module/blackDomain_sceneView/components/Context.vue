<template>
  <section class="content">
  <div id="domainSceneView" class="container-fluid">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
		  	<el-breadcrumb-item >恶意Domain</el-breadcrumb-item>
		  	<el-breadcrumb-item>场景视图 </el-breadcrumb-item>
		</el-breadcrumb>
    <el-row :gutter="18">
              <el-col :span="6">
                      <domainTypeTop></domainTypeTop>
                      <domainlevel></domainlevel>
                      <domainService></domainService>
              </el-col>
              <el-col :span="18">
                        <div class="el-panel">
                                <span class="left-top"></span><span class="left-bottom"></span>
                                <span class="right-top"></span><span class="right-bottom"></span>
                                <div class="el-panel-body-map">
                                  <h4 class="el-panel-title">Domain分布</h4>
                                  <el-row>
                                      <el-col :span="18">
                                        <domainMap></domainMap>
                                      </el-col>
                                      <el-col :span="6">
                                        <domainMapTop></domainMapTop>
                                      </el-col>
                                  </el-row>

                                </div>
                        </div>
                        <div class="el-panel">
                            <span class="left-top"></span><span class="left-bottom"></span>
                            <span class="right-top"></span><span class="right-bottom"></span>
                            <domainTrend></domainTrend>

                        </div>
              </el-col>
</el-row>
  </div>
</section>
</template>

<script>
import domainTypeTop from './DomainTypeTop.vue'
import domainlevel from './DomainLevel.vue'
import domainService from './DomainService.vue'
import domainTrend from './DomainTrend.vue'
import domainMap from './DomainMap.vue'
import domainMapTop from './DomainMapTop.vue'

export default {
  components: {
    domainTypeTop,domainlevel,domainService,domainTrend,domainMap,domainMapTop
  },
  data() {
    return {

    }
  },
  methods: {

  },
  created: function() {

  }
}
</script>
<style>


</style>
