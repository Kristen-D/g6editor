<template >
  <div class="el-panel-white mygrid-def">
    <!-- <div class="el-panel-white-heading"><h3 class="el-panel-white-title">威胁事件</h3></div> -->
    <div class="el-panel-white-body">
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
       params:state=>state.context.params,
        test:state=>state.context.test,
   })},

   data(){
   				 return {
   	          isOpen:false,
   						currentIndex:-1,
              eventTypelist:[],
              scorelist:[],
              current:[],
              history:[],
              eventLogActiveNamee:"1",
              params:{dateRange:'month'}
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
