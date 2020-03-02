<template>
  <div>


<el-row>
  <el-col :span="18" :offset="1">
    <el-row>
    <systemDetail style="margin-bottom:20px;" :tkey="tkey" :unitDetail="unitDetail">
    </systemDetail>

      </el-row>
      <el-row>
     <systemInfo></systemInfo>
     </el-row>
  </el-col>
</el-row>


  </div>
</template>

<script>
import systemInfo from './SystemInfo.vue'
import systemDetail from './SystemDetail'
export default {
  components: {
    systemInfo,
    systemDetail
  },
  data(){
    return {
      tkey:"",
      systemDetail: {},
    }
  },
  created: async function(){
    // if(this.$route.params.tkey != null){
    //   var params = {};
    //   this.tkey = this.$route.params.tkey;
    //   params.taskId = this.$route.params.taskId
    //   params.processInstanceId = this.$route.params.processInstanceId;
    //
    //   params.unit_id = this.$route.params.unit_id;
    //   if (this.tkey == 'Unit_Check') {
    //     this.unitDetail = await  this.$store.dispatch('getUnitDetail', [params, this.tkey]);
    //   }
    // }
  }
}
</script>

<style>

</style>
