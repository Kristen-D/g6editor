<template>
  <div class="container_content">
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
//import context from "./Context.vue"
export default {
  components: {
    //context
  },
  created :function(){
  //  this.$router.replace("/eventMgmtProcess");
  }
}
</script>
