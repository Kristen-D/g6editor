<template>

  <section class="content">
  <div id="ipSceneView" class="container-fluid">
                  <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
                        <el-breadcrumb-item >恶意URL</el-breadcrumb-item>
                        <el-breadcrumb-item>场景视图</el-breadcrumb-item>
                  </el-breadcrumb>
                  <el-row :gutter="18">
                           <el-col :span="18">
                                    <urlDistribution></urlDistribution>
                                  <div class="el-panel">
                                     <urlRelation></urlRelation>

                                     <urlCategory></urlCategory>
                                  </div>
                           </el-col>


                          <el-col :span="6">
                                     <urlTypeTOP></urlTypeTOP>

                                     <urlRegistrant></urlRegistrant>
                           </el-col>
                   </el-row>
  </div>
</section>

</template>

<script>
import urlDistribution from './UrlDistribution.vue'
import urlRelation from './UrlRelation.vue'
import urlCategory from './UrlCategory.vue'
import urlTypeTOP from './UrlTypeTOP.vue'
import urlRegistrant from './UrlRegistrant.vue'

export default {
  components: {
    urlDistribution,urlRelation,urlCategory,urlTypeTOP,urlRegistrant
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted: function() {

  }
}
</script>
<style>


</style>
