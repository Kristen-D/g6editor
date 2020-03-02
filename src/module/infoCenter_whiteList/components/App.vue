
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
//
export default {
  components: {}
}
</script>
<style>
.fadeOutLeft {
  animation-duration: 0.5s;
}

.fadeInRight {
  animation-duration: 0.5s;
}
</style>
