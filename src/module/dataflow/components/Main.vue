<template>
  <el-container>
    <!-- <el-aside width="150px">
      <div class="menu">
        <router-link to="/context">Context</router-link> 
        <router-link to="/flow">模型列表</router-link> 
        <router-link to="/model">模型管理</router-link> 
        <router-link to="/process">算子管理</router-link>
        <router-link to="/input">输入管理</router-link>
        <router-link to="/output">输出管理</router-link>
        <router-link to="/tasks">运行历史</router-link>
        <router-link to="/context">模型环境</router-link>
      </div>
    </el-aside> -->
    <el-main style="padding: 0"><router-view></router-view></el-main>
  </el-container>
</template>

<style scope>
  .menu {
    padding-top: 20px;
    background: rgb(84, 92, 100);
    height: 100%;
  }
  .menu a {
    display: block;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    color: white;
    text-decoration: none;
  }
</style>

<style>
a.router-link-active {
  color: #409EFF;
}
</style>


