<template>
<div>
    <el-row>
        <el-col :span="12"><h1>{{title}}</h1></el-col>
        <el-col :span="7" :offset="5"><h1>调度用时：{{timeMsg}}</h1></el-col>
    </el-row>
    <el-row>
        <div id='myZrender' :style="{ height: screenHeight + 'px' }"></div>
    </el-row>
</div>
</template>
<script>
    
    export default{
        data(){
            return{
                title:'太原网安网络攻击-网络安全指挥调度系统',
                startTime:0,
                timeMsg:'',
                screenHeight:document.documentElement.clientHeight,
                zr:''
            }
        },
        methods:{
            countTime:function(){
                var startTime=this.startTime;
                var self=this;
                let timer = setInterval(function(){
                    let nowTime = new Date();
                    let t = nowTime.getTime()-startTime;
                    console.log(nowTime+'   '+startTime)
                    if(t>0){
                        let day = Math.floor(t/86400000);
                        let hour=Math.floor((t/3600000)%24);
                        let min=Math.floor((t/60000)%60);
                        hour = hour < 10 ? "0" + hour : hour;
                        min = min < 10 ? "0" + min : min;
                        self.timeMsg = day+'天'+hour+'小时'+min+'分';
                    }},3000);
                
            }
        },
        mounted:function(){
            var d = new Date()
            this.startTime=d.getTime()-1234*60*60*24
            this.countTime();
            var zrender = require('zrender');
           
            this.zr = zrender.init(document.getElementById('myZrender'));
            var Circle = require('zrender/lib/graphic/shape/Circle');
            var circle1 = new Circle({
                shape: {
                    cx: 100,
                    cy: 100,
                    r: 30
                },
                style: {
                    fill: 'blue'
                },
                draggable: true
            });
            
            // 圆形
            this.zr.add(circle1);
        }
    }
</script>
<style>

</style>