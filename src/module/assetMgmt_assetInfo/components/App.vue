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
    sessionStorage.removeItem('assetInfoForm');
    // const router = this.$router;
    // router.push('/context');
  }
}
</script>
<style>
.fadeOutLeft{
animation-duration: 0.3s;

}
.fadeInRight{
  animation-duration: 0.3s;
}
</style>
