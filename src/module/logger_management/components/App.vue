<template>
<div>
  <!-- <container></container> -->
  <!-- <el-row>
    <el-menu :default-active="index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">日志操作</el-menu-item>
      <el-menu-item index="2">日志阈值</el-menu-item>
    </el-menu>

  </el-row> -->
  <el-row>

      <!-- <el-menu :default-active="this.index" class="el-menu-vertical-demo" @select="selectMenu" @open="handleOpen" @close="handleClose">
      <el-menu-item index="1"><i class="el-icon-menu"></i>日志操作</el-menu-item>
      <el-menu-item index="2"><i class="el-icon-setting"></i>日志阈值</el-menu-item>
    </el-menu> -->


        <div class="container_content">
          <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>

  </el-row>
</div>
</template>

<script>

export default {
  components: {
  },
  computed: {
  },
  data() {
    return {
      index:'1',

  }
},
  methods: {
    handleSelect(menuId){
      if(menuId === '1'){
        this.$router.push({name:'logoperation'});
      }else if(menuId === '2'){
        this.$router.push({name:'logthreshold'});
      }
    }

},
  created: async function() {
      this.$router.push({name:'logoperation'});
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
