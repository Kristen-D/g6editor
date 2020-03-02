<template>
<div>
  <!-- <container></container> -->
  <div class="container_content">
    <transition name="component-fade">
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
    const router = this.$router;
    router.push('/context');
  }
}
</script>
<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
/*.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}*/
</style>
