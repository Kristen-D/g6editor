<template>
  <el-container>
    <el-aside width="150px">
      <div class="menu">
        <router-link to="/context">Context</router-link>
        <router-link to="/flow">flow</router-link>
      </div>
    </el-aside>
    <el-main><router-view></router-view></el-main>
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


