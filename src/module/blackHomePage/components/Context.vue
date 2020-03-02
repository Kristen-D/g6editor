<template>
<div  class="container">
              <div class="container-fluid">
                  <el-row :gutter="10">
                    <el-col :span="6">
                        <threatTop ref="threatTop"></threatTop>
                        <threatNew ref="threatNew"></threatNew>
                    </el-col>
                    <el-col :span="18">
                      <!-- <div class="" style="height: 1080px;" id="TIC"></div> -->
                        <threatMap ref="threatMap"></threatMap>
                    </el-col>
                  </el-row>

             </div>
</div>

</template>

<script>
import threatTop from './ThreatTop.vue'
import threatNew from './ThreatNew.vue'
import threatMap from './ThreatMap.vue'


export default {
  components: {
    threatTop,threatNew,threatMap
  },
  data() {
    return {
      activeIndex:'',
    }
  },
  methods: {

  },
  created: function() {

  },
  mounted: async function() {
    //  this.$refs.threatTop.getInitData();
    //  this.$refs.threatNew.getInitData();
    //  this.$refs.threatMap.loadChart();
}
}
</script>
<style>


</style>
