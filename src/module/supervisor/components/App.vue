<template>
<div>
  <!-- <container></container> -->
  <div class="container-padding">
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
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
    // const router = this.$router;
    // router.push('/context');
  }
}
</script>
