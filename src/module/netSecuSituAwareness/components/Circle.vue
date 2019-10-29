<template>
  <div>

    <div class="circle-progress" style="display: inline-block">
      <div class="pie_left"><div class="left" :style="leftStyle"></div></div>
      <div class="pie_right"><div class="right" :style="rightStyle"></div></div>
      <div  class="mask"><span style="display: none">{{dataRatio}}</span></div>
      <div class="inner-circle"></div>
      <div class="inner-img"><img src="/static/img/icon-01.png" alt="漏洞"></div>
    </div>
    <div class="circle-progress-content">
      <p class="name">{{name}}</p>
      <p class="digital">{{data}}</p>
    </div>
  </div>

</template>
<script>

export default {
  props:["dataRatio" , "data", "name"],
  computed:{
    rightStyle() {
      var num = this.dataRatio * 3.6;
      return {
        transform: num <= 180 ? "rotate(" + num + "deg)" : "rotate(180deg)"
      }
    },
    leftStyle() {
      var num = this.dataRatio * 3.6;
      return {
        transform: num > 180 ? "rotate(" + (num - 180) + "deg)": ''
      }
    }
  },
  mounted: function() {

  }
}
</script>
