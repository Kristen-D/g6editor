<template>
  <div class="el-panel">
    <el-tabs  class="noBottom  ssas-tabs" v-model="tabActiveName">

      <el-tab-pane label="基本信息" name="1"><MessageBaseInfo :id="id"></MessageBaseInfo></el-tab-pane>

    </el-tabs>
    <div class="fix-bottom-button">
      <el-button type="gray"  size="medium" @click="goBack">返回</el-button>
    </div>
  </div>

</template>

<script>
  import MessageBaseInfo from './MessageBaseInfo'


  export default {
    components : {
      MessageBaseInfo,
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
