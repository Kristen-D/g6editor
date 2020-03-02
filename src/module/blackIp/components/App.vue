<template>
<div>
  <!-- <container></container> -->
  <div class="container-padding body-bgcolor" style="height: 989px;">
     <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</div>
</template>

<script>
export default {
  created: function() {
    sessionStorage.removeItem('blackIpInfoForm');
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
