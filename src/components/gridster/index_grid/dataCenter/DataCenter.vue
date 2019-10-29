<template >

   <div class="el-panel">
     <div class="el-panel-heading">
       <h3 class="el-panel-title">数据中心</h3>
       <el-tabs class="float-r day-tabs" v-model="params.dateRange" @tab-click="changeTime">
          <el-tab-pane label="今天" name="1"></el-tab-pane>
          <el-tab-pane label="近7天" name="7"></el-tab-pane>
          <el-tab-pane label="近30天" name="month"></el-tab-pane>
       </el-tabs>
     </div>
     <div class="el-panel-body">
        <el-row :gutter="20">
       <keyAssetTop5 :day = "day" ref="keyAssetTop5"></keyAssetTop5>
      </el-row>
     </div>
   </div>
</template>

<script>
import keyAssetTop5 from './KeyAssetTop5.vue'
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  components: {keyAssetTop5},
  computed:{
    ...mapState({
   })},

   data(){
   				 return {
              activeName:"3",
              params:{dateRange:'7'},
              day:''
   				 }
  },

    methods: {
      changeTime(value){
        this.day = value.name;
        var dataRange = value.name;
        // this.$refs.keyAssetTop5.loadMapChart(dataRange);

      },

    },
  created :function() {

  },
  mounted:  function() {

  }

}
</script>
