
<template>
  <div class="container_content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
//
export default {
  components: {}
};
</script>
<style>
/*.fadeOutLeft {
  animation-duration: 0.5s;
}

.fadeInRight {
  animation-duration: 0.5s;
}*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
