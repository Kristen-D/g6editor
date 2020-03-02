<template>

  <section class="content">
  <div id="ipSceneView" class="container-fluid">
                  <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
                        <el-breadcrumb-item >恶意IP</el-breadcrumb-item>
                        <el-breadcrumb-item>场景视图</el-breadcrumb-item>
                  </el-breadcrumb>
                  <el-row :gutter="18">
                           <el-col :span="6">
                                       <ipType></iptype>
                           </el-col>
                           <el-col :span="12">
                                     <ipMap></ipMap>
                           </el-col>
                           <el-col :span="6">
                                     <ipLevel></ipLevel>
                           </el-col>
              </el-row>

              <el-row :gutter="18">
                     <el-col :span="6">
                             <ipService></ipService>
                     </el-col>
                     <el-col :span="18">
                             <ipTrend></ipTrend>
                     </el-col>
               </el-row>
  </div>
</section>

</template>

<script>
import ipType from './IpType.vue'
import ipLevel from './IpLevel.vue'
import ipService from './IpService.vue'
import ipTrend from './IpTrend.vue'
import ipMap from './IpMap.vue'

export default {
  components: {
    ipType,ipLevel,ipService,ipTrend,ipMap
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
