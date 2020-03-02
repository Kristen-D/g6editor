<template>
  <div style="display:none;">
    <form ref="poi_form" :action='url' method='POST' target='_poi'>
       <input v-for="(value,key) in params" type='text'  :name='key' :value="value"/>
    </form>

    <iframe  src="" name="_poi"></iframe>
  </div>

</template>
<script>
export default {
  props:['params'],
 data(){
   return {
     url:"",
   }
 },
  methods:{
    doExport(url){
      this.url = url;
      var vm = this;
      Vue.nextTick(()=>{
          console.log(vm.$refs["poi_form"]);
          vm.$refs["poi_form"].submit();
      })

    }
  },
  created:function(){
     
  }
  
}
</script>
