<template>
  <div class="el-panel">
    <el-tabs  class="noBottom  ssas-tabs" v-model="tabActiveName">

      <el-tab-pane label="基本信息" name="1"><OrderBaseInfo :id="id"></OrderBaseInfo></el-tab-pane>

<!--      <el-tab-pane label="已购服务" name="2"><SdnSwitchInfo :id="id"></SdnSwitchInfo></el-tab-pane>-->

<!--      <el-tab-pane label="审批信息" name="3"><SecEquipInfo :id="id"></SecEquipInfo></el-tab-pane>-->

    </el-tabs>
    <div class="fix-bottom-button">
      <el-button type="gray"  size="medium" @click="goBack">返回</el-button>
    </div>


  </div>

</template>

<script>
  import OrderBaseInfo from './OrderBaseInfo'

  export default {
    components : {
      OrderBaseInfo,
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
