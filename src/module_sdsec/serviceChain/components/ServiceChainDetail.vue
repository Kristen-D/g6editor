<!--服务链详情包含三个表格-->
<template>
  <div class="el-panel">
    <el-tabs  class="noBottom  ssas-tabs" v-model="tabActiveName">

<!--      当是物理服务链时，展示如下-->

      <el-tab-pane label="基本信息" name="1"><ServiceChainBaseInfo :id="id"></ServiceChainBaseInfo></el-tab-pane>
<!--      <el-tab-pane label="服务链拓扑图" name="2"><GraphInfo :id="id"></GraphInfo></el-tab-pane>-->
    </el-tabs>
    <div class="fix-bottom-button">
      <el-button type="gray"  size="medium" @click="goBack">返回</el-button>
    </div>
  </div>

</template>

<script>
  import ServiceChainBaseInfo from './ServiceChainBaseInfo'
  import GraphInfo from "./GraphInfo";


  export default {
    components : {
      ServiceChainBaseInfo,
      GraphInfo
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
