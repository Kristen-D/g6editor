<template>
  <big-screen-header
    title="安全评分">
    <div class="el-box clearfloat">
      <span class="el-box-tl"></span><span class="el-box-tr"></span>
      <span class="el-box-bl"></span><span class="el-box-br"></span>
      <div class="safety-index float-l">
        <span>{{value}}</span>
        <p>状态{{status}}</p>
        <p>Condition</p>
      </div>
      <i class="dashboard-icon float-r"></i>
    </div>
  </big-screen-header>
</template>

<script>
  import BigScreenHeader from "./BigScreenHeader";

  export default {
    components: {BigScreenHeader},
    name: "safe-grade",
    computed: {
      status() {
        return this.$store.state.grade.status;
      },
      value () {
        return this.$store.state.grade.value;
      }
    }
  }
</script>

<style scoped>
  .safety-index {
    padding-bottom: 0;
  }
</style>
