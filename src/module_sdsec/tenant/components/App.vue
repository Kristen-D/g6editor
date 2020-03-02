<template>
  <div class="container_content body-bgcolor" style="height:1080px;">
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
    import container from './Context.vue'
    export default {
        components: {
            container
        },
        created: function() {
            sessionStorage.removeItem('tenantForm');
            sessionStorage.removeItem('tenantEntity');
            sessionStorage.removeItem('roleEntity');
            sessionStorage.removeItem('userEntity');
            // const router = this.$router;
            // router.push('/context');
        }
    }
</script>

<style scoped>
  .fadeOutLeft{
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;

  }
  .fadeInRight{
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
  }
  /*.el-table{*/
  /*  min-height: 400px;*/
  /*}*/

</style>
