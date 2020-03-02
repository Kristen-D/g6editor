<template>
    <div>
     <iframe :src="reportUrl" width="100%" height="750" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
export default{
        data:function(){
            return {
               // reportUrl:"http://localhost:8181/module/analysisRule.html"
               // reportUrl:"http://192.168.1.190:8080/reportc/#dashboard/db/仪表盘-htest1?dateStr=2017-03&ruleId=1"
            }
        },
        computed:{
            ...mapState({
                sceneConf:state=>state.content.sceneConf,
                sceneTableData:state=>state.content.sceneTableData,
                reportContext:state=>state.content.reportContext

            }),
            reportUrl:function(){
                
                var url=this.sceneConf.url;
                if(url!=''&&url!='http://about:blank'&&url!=null){
                    url=this.reportContext+url+'?dateStr=2017-03&ruleId='+this.sceneConf.rule;
                }
                
                return url;
            }
        }

}
</script>
<style>
    
</style>