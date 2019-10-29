<template>

   <el-button @click="test" :type="type" :disabled="dis"  :icon="icon" >测试</el-button>
</template>
<script>

export default {

    data() {
        return {
          dis:false,
          icon:"setting",
          type:"",
        }
    },
    methods: {
   
      changeButton(flag){
        this.dis = false;
        if(flag === true){
           this.icon = "check";
           this.type = "success";
        }else{
          this.icon = "close";
          this.type = "danger";
        }
      },
      test(){
         this.icon = "loading";
         this.dis = true;
         this.$emit("click");
      },

    },

    created: async function() {

    },
    mounted: function() {


    }

}

</script>
