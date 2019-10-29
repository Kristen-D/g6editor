<template>
  <div class="container_content body-bgcolor" style="height:1080px;">
   <context></context>
  </div>
</template>
<script>
import context from './Context.vue'
export default {
    components: { context}
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
