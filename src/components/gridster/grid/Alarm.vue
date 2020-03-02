<template>
  <div class="panel panel-default bg-panel">
   <el-tabs v-model="activeName" type="border-card" style="width:100%;height:100%">
     <el-tab-pane label="高危" name="first">
       <alarmGrid :tableData="gridBase.high"></alarmGrid>
     </el-tab-pane>

     <el-tab-pane label="中危" name="second">
       <alarmGrid   :tableData="gridBase.mid"></alarmGrid>
     </el-tab-pane>

     <el-tab-pane label="低危" name="third">
       <alarmGrid :tableData="gridBase.low"></alarmGrid>
     </el-tab-pane>

   </el-tabs>
 </div>
</template>



<script>
import alarmGrid from './AlarmGrid.vue'
import commonAjax from 'components/js/common.js'
import {mapState,mapActions } from 'vuex'
export default {
  components: { alarmGrid},
  data(){
    return {
      gridBase:{},
      detailedUrl:"/ssa/home/getDetailedByEventType.do",
      activeName: 'first'
    }
  },
  methods:{

  },
  mounted : function() {
   commonAjax.req(this.detailedUrl).then((gridBase) => {
     this.gridBase = gridBase;
   });

  }

}

</script>
