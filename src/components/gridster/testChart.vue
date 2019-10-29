<template >
  <div  style="height:100%;width:100% ; background-color:white"  >
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
      resize:function(d){
        //
    //  if(d)  console.log(d.source.x)
        let vm = this;
        this.$nextTick(()=>{
            vm.myChart = echarts.init(document.getElementById(this.data.i));
            this.myChart.setOption(this.option);

        })

      },
      getCustomMethods:function(){
        return [{method_name:"测试",method:"resize"}];
      }
    },
    watch:{

    },
    computed:{
      ...mapState({

     })},
     created:function(){
       console.log("testcrt");
      // this.$store.commit("setRef",this);
     },

     mounted :function() {
    // 基于准备好的dom，初始化echarts实例
        let vm = this;


       // 指定图表的配置项和数据
       var option = {
           title: {
               text: 'ECharts 入门示例'
           },
           toolbox: {
             feature: {
                 restore: {}
             }
           },
           legend: {
               data:['销量']
           },
           xAxis: {
               data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: [5, 20, 36, 10, 10, 20]
           }]
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
