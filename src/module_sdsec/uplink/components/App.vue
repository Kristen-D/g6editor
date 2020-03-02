<template>
  <div class="container_content body-bgcolor" style="height:1080px;">
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style scoped>
  .fadeOutLeft {
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;

  }

  .fadeInRight {
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
  }

</style>
