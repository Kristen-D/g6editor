<template >
  <div class="el-panel">
    <!-- <div class="el-panel--heading"><h3 class="el-panel-title">威胁事件</h3></div> -->
    <div class="el-panel-body">
 <el-tabs v-model="eventLogActiveNamee">
   <el-tab-pane label="网络攻击事件" name="1">
     <queryTable  id="queryTable"></queryTable>
   </el-tab-pane>
   <el-tab-pane label="有害程序事件" name="2">
     <queryTableHarmful  id="queryTableHarmful"></queryTableHarmful>
   </el-tab-pane>
 </el-tabs>
    </div>
  </div>


</template>

<script>
import queryTable from './QueryTable.vue'
import queryTableHarmful from './QueryTableHarmful.vue'
import {mapState,mapActions } from 'vuex'
export default {
  components: {queryTable,queryTableHarmful },
  computed:{
    ...mapState({
   })},

   data(){
   				 return { 
              eventLogActiveNamee:"1",
   				 }
  },

    methods: {


    },
  created :function() {

  },
  mounted:  function() {

  }

}
</script>
