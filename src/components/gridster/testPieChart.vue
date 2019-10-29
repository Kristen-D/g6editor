<template >

  <div   style="height:100%;width:100% ; background-color:white" >
   
  <div :id="data.i" style="height:100%;width:100%"></div>

  </div>

</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  data(){
    return{
      myChart:null,
      otpion :null,
    }
  },
  props:['data'],
    methods: {
      resize:function(){
        //
        let vm = this;
        this.$nextTick(()=>{
            vm.myChart = echarts.init(document.getElementById(vm.data.i));
            vm.myChart.setOption(vm.option);

        })

      },
    },
    watch:{

    },
    computed:{
      ...mapState({

     })},
     created:function(){
      // this.$store.commit("setRef",this);
     },
     mounted :function() {
    // 基于准备好的dom，初始化echarts实例
        let vm = this;
       // 指定图表的配置项和数据
       var option = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

       // 使用刚指定的配置项和数据显示图表。
       this.option = option;
      this.resize();
      //  window.addEventListener("resize", function () {
       //
      //                            vm.resize();
      //                       });
},

destroyed(){
this.myChart.dispose();

}
}
</script>
