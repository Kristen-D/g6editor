<template>
    <div id="bigscreen">
        <DispatchHeader></DispatchHeader>
        <DispatchContext></DispatchContext>
    </div>
</template>
<script>
import DispatchHeader from './DispatchHeader.vue'
import DispatchContext from './DispatchContext.vue'
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'

export default {
  components:{ DispatchHeader,DispatchContext
  },
  computed:{
    ...mapState({
        dispatchConfig:state=>state.context.dispatchConfig
    })
  },
  methods:{
      ...mapActions({
			    setDispatchConfig:'setDispatchConfig',
                initDispatchConfig:'initDispatchConfig'      
      }),
      getLastRecord:function(){
            commonAjax.req('/ssa/dispatchCenter/lastRecord.do').then((data)=>{
                console.log(data)
                if(data==null){
                    this.initDispatchConfig()
                }else{
                    var config=JSON.parse(data.config)
                    config.id=data.id
                    this.setDispatchConfig(config)
                }
            })
        }
        
  },
  mounted:function(){
      this.getLastRecord()
    
  }
}
</script>
<style>
    
</style>