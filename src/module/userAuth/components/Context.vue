<template>
  <div class="whitebackground Whitespace">
    <div class="top-title"   >用户认证</div>

     <authForm type="edit" ></authForm>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import authForm from './userAuthForm.vue'
export default {
    components: { authForm} ,
    data(){

        return {

        }
    },
    computed:{
      ...mapState({

     })
   },
   methods:{

   },
   created :async function() {


  }
}
</script>
