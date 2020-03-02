<!--背景图片加文字-->
<template>
  <div :style="'background-image:url('+imageSrc+') ; background-size:cover;height:30%' ">
      <div class="sdsec-backgroud-title" >
        <span style="color: #1a6ecc ">{{title}}</span>
      </div>
      <div class="sdsec-backgroud-content">
        <span style="color: whitesmoke ">{{content}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: ['imageSrc','title','content'],
        data() {
            return {
                //虽然没用，但是别删, 可参考
                // myStyle:{
                //     //background:"url('"+this.imageSrc+"') no-repeat",
                //     // background-size:cover,
                // },
            }
        },
        methods: {},
        created: function () {
        },
    }
</script>

<style scoped>
</style>
