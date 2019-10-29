<template>
<div class="container_content"   style="margin-top:20px;">
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  created: function() {
    /*标准版告警管理*/
  }
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
