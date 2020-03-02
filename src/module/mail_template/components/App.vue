<template>
<div>
  <div class="container_content">
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</div>
</template>

<script>
import container from './Context.vue'

export default {
  components: {
    container
  },
  created: function() {
    // const router = this.$router;
    // router.push('/context');
  }
}
</script>
<style>
.fadeOutLeft{
animation-duration: 0.5s;

}
.fadeInRight{
  animation-duration: 0.5s;
}
</style>
