<template>
  <div id="app">
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb" style="margin-left:5%">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item>资讯预览</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="white-background">
        <h1 class="title">亚信安全受邀出席2017 检法信息化融创大会综合网络安全体系保障检法信息安全</h1>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>

<style lang="css">
  .white-background{
    width:90%;
    height:900px;
    background-color:white;
    margin-left: 5%;
    text-align: center;
  }
  .title{
    font-size: 42px;
  }
</style>
