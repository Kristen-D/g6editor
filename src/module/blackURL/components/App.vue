<template>
<div class="container_content">
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>
<script>
import container from './Context.vue'

export default {
}
</script>
<style scoped >
.fadeOutLeft{
-webkit-animation-duration: 0.1s;
animation-duration: 0.1s;

}

.fadeInRight{
  -webkit-animation-duration: 0.1s;
  animation-duration: 0.1s;
}
</style>
