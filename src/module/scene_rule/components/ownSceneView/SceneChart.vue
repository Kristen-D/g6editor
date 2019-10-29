<template>
    <div class="echars">
        {{chartOption}}
        <p>{{sceneForm}}</p>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
           chartOption:state=>state.content.chartOption,
           sceneForm:state=>state.content.sceneForm
        })
    }
}
</script>
<style>
    .echars {
      min-height:400px;
      background:#f5e9f2;
  }
</style>