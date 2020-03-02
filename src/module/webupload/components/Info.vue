<template lang="html">
  <div >
    <span>{{fileName}}</span>  <span style="float:right">{{status}}</span>
    <el-progress :percentage="processNum" ></el-progress>
    <span style="color:#FF4949">{{errorMsg}}</span>
  </div>
</template>

<script>
export default {
  props:["id","status","processNum","fileName","errorMsg"],
  data(){
    return {}
  }
}
</script>
