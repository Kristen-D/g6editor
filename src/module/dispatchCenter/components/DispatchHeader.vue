<template>
<div>
<el-popover ref="popover1" placement="bottom" width="400" trigger="click">
    <el-form  :model="dispatchConfig" ref="dispatchConfig">
        <el-form-item label="开始时间：">
            <el-date-picker
            v-model="dispatchConfig.startDate1"
            type="datetime"
            placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
   </el-form>
</el-popover>
 <header class="big-header">   
    <h3  class="schedule-title" @click="changeTitle">{{dispatchConfig.title}}</h3>
    <div class="schedule-time"  v-popover:popover1>调度用时：<span class="margin">{{day}}</span>天<span  class="margin">{{hour}}</span>时<span  class="margin">{{min}}</span>分</div> 
</header>
</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default{
    data(){
        return { 
            day:0,
            hour:0,
            min:0
        }
    },
    computed:{
            ...mapState({
                dispatchConfig:state=>state.context.dispatchConfig
            })
    },
    methods:{
        countTime:function(){ 
                var self=this;
                this.dispatchConfig.timer = setInterval(function(){
                    if(self.dispatchConfig.timerStart==false){
                        self.day = '0'
                        self.hour = '00'
                        self.min = '00'
                        return
                    }
                    let time
                    if(self.dispatchConfig.endTime!=0){
                        time=self.dispatchConfig.endTime
                    }else{
                        time= new Date().getTime()
                    }
                
                    let t = time-new Date(self.dispatchConfig.startDate1).getTime();
                    
                    if(t>0){
                        self.day = Math.floor(t/86400000);
                        let hour=Math.floor((t/3600000)%24);
                        let min=Math.floor((t/60000)%60);
                        self.hour = hour < 10 ? "0" + hour : hour;
                        self.min = min < 10 ? "0" + min : min;
                    }
                    console.log(t +' '+self.day +' '+self.hour+' '+self.min)
                    },3000);
                    
        },
        changeTitle:function() {
            this.$prompt('请输入新标题', '修改标题', {
                confirmButtonText: '确定',
                inputValue:this.dispatchConfig.title 
            }).then(({ value }) => {
                this.dispatchConfig.title=value
            })
      }
    },
    mounted:function(){
        if(this.dispatchConfig.timer!=-1){
            clearInterval(this.dispatchConfig.timer);
            this.dispatchConfig.timer=-1
        }
        
        this.countTime();
        
    }
}
</script>
<style>
    
</style>