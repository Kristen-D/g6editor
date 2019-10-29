<template >

   <div class="el-panel">
     <div class="el-panel-heading">
       <h3 class="el-panel-title">资产视图</h3>
       <el-tabs class="float-r day-tabs" v-model="params.dateRange" @tab-click="changeTime">
          <el-tab-pane label="今天" name="1"></el-tab-pane>
          <el-tab-pane label="近7天" name="7"></el-tab-pane>
          <el-tab-pane label="全部" name="month"></el-tab-pane>
       </el-tabs>
     </div>
     <div class="el-panel-body">
        <el-row :gutter="20">
        <iskeyAsset  ref="iskeyAsset"></iskeyAsset>
        <attackMonthLine  ref="attackMonthLine"></attackMonthLine>
       <!-- <keyAssetTop5 :day = "day" ref="keyAssetTop5"></keyAssetTop5> -->
      </el-row>
     </div>
   </div>
</template>

<script>
import keyAssetTop5 from './KeyAssetTop5.vue'
import iskeyAsset from './IsKeyAsset.vue'
import attackMonthLine from './AttackMonthLine.vue'
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  components: {keyAssetTop5,iskeyAsset,attackMonthLine},
  computed:{
    ...mapState({
   })},

   data(){
   				 return {
              activeName:"3",
              params:{dateRange:'month'},
              day:''
   				 }
  },

    methods: {
      changeTime(value){
        this.day = value.name;
        var dataRange = value.name;
        // this.$refs.keyAssetTop5.loadMapChart(dataRange);
        this.$refs.attackMonthLine.loadMapChart(dataRange);
      },

    },
  created :function() {

  },
  mounted:  function() {
    // console.log(1111);
    this.$refs.attackMonthLine.loadMapChart("month");
    // this.$refs.keyAssetTop5.loadMapChart("month");
    this.$refs.iskeyAsset.loadMapChart();
  }

}
</script>
