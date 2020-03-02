<template>

  <div class="container_content">
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default { 
}


</script>
<style scoped >
.fadeOutLeft{
-webkit-animation-duration: 0.3s;
animation-duration: 0.3s;

}

.fadeInRight{
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}
</style>
