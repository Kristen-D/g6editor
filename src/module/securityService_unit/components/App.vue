<template>
<div>
  <el-breadcrumb separator="/" class="breadcrumb-inner">
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <strong class="title">{{$route.title}}</strong>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  components: {
    
  },
  created :function(){
  //  this.$router.replace("/eventMgmtProcess");
  }
}
</script>
