<template>
<div class="container_content body-bgcolor"  style="height:1080px;">
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  created: function() {
  }
}
</script>

<style>
.fadeOutLeft{
animation-duration: 0.2s;

}
.fadeInRight{
  animation-duration: 0.2s;
}
</style>
