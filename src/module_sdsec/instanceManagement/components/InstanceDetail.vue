<template>
  <div class="el-panel">
    <el-tabs  class="noBottom  ssas-tabs" v-model="tabActiveName">

      <el-tab-pane label="概览" name="1"><InstanceBaseInfo :id="id"></InstanceBaseInfo></el-tab-pane>

    </el-tabs>
    <div class="fix-bottom-button">
      <el-button type="gray"  size="medium" @click="goBack">返回</el-button>
    </div>
  </div>

</template>

<script>
  import InstanceBaseInfo from './InstanceBaseInfo'

  export default {
    components : {
      InstanceBaseInfo,
    },
    data(){
      return{
        id:  this.$route.params.id,
        tabActiveName : "1",
      }
    },
    methods : {
      getOrder(){
          this.id = this.$router.params && this.$route.params.id
      },
      goBack : function(){
        this.$router.go(-1);
      },
    },
    created : function(){
      // console.log(this.id)
      // var id = this.$route.params.id;
      // // console.log('route:',this.$route.params.id)
      // this.id = id;
      // console.log('route2:',this.id)
        this.getOrder();
    }
  }
</script>

<style scoped>
  .fix-bottom-button{
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255,255,255,.7);
    padding: 10px;
  }

</style>
