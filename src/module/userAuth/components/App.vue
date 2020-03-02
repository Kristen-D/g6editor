<template>
  <div class="container_content">
    <container></container>
  </div>
</template>
<script>
import container from './Context.vue'

export default {
  components: {
    container
  }
}
</script>
<style scoped >
.fadeOutLeft{
-webkit-animation-duration: 0.5s;
animation-duration: 0.5s;

}

.fadeInRight{
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
}
</style>
