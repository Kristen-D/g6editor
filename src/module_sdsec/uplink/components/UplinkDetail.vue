<!--链路详情-->
<template>
  <div class="el-panel">
    <el-tabs class="noBottom  ssas-tabs" v-model="tabActiveName">

      <!--      当是物理资源池时，展示如下-->

      <el-tab-pane label="基本信息" name="1">
        <UplinkBaseInfo :id="id"></UplinkBaseInfo>
      </el-tab-pane>

    </el-tabs>
    <div class="fix-bottom-button">
      <el-button type="gray" size="medium" @click="goBack">返回</el-button>
    </div>
  </div>

</template>

<script>
    import UplinkBaseInfo from './UplinkBaseInfo'


    export default {
        components: {
            UplinkBaseInfo,

        },
        data() {
            return {
                id: this.$route.params.id,
                tabActiveName: "1",
            }
        },
        methods: {
            getOrder() {
                this.id = this.$router.params && this.$route.params.id
            },
            goBack: function () {
                this.$router.go(-1);
            },
        },
        created: function () {
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
  .fix-bottom-button {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, .7);
    padding: 10px;
  }

</style>
