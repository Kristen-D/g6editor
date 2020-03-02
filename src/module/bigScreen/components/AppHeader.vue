<template>
  <el-row class="app-header">
    <el-col :span="8">
      <h2 class="header-title">移动态势感知平台</h2>
    </el-col>
    <el-col :span="16" class="announcement">
      <span class="tip-left"></span><span class="tip-right"></span>
      <marquee direction="left" behavior="scroll" scrollamount="30" scrolldelay="200" onMouseOut="this.start()"
               onMouseOver="this.stop()">
        {{value}}
      </marquee>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "app-header",
    data() {
      return {
        value: '漏洞具体为，Linux内核的内存子系统在处理写入时复制（copy-on-write, COW）时产生了竞内存子系统在处理'
      }
    }
  }
</script>

<style scoped>
  .app-header {
    height: 60px;
    line-height: 60px;
    color: white;
  }
  .app-header h2 {
    font-size: 16px;
    margin: 0;
    line-height: 60px;
  }
  .app-header .announcement {
    height: 60px;
  }
</style>
