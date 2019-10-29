<template>
<div>
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {

}
</script>
<style >
.fadeOutLeft {
  animation-duration: 0.5s;

}

.fadeInRight {
  animation-duration: 0.5s;
}
</style>
