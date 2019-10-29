<template>
<div>
  <!-- <container></container> -->
  <div class="container-padding body-bgcolor" style="height:950px;">
    <transition name="slide-fade" mode="out-in">
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
