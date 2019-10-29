

<template >
  <div  >
    <div class="pull-right">
    <div class="btn-group " >
      <!--   <button type="button" class="navbar-toggle" data-toggle="dropdown" aria-expanded="true">
           <span class="sr-only">Toggle navigation</span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>

         </button>-->
           <ul class="dropdown-menu dropdown-menu-right" role="menu">
               <li  v-for="m in  chartMenu"><a  @click="changeChart(m.url)" >{{m.title}}</a></li>
           </ul>
       </div></div>
           <div class="panel">
             <div class="panel-heading">
                 <h3 class="panel-title">{{setting.title}}</small></h3>
             </div>

              <div :id="setting.id" :style="'height:'+setting.height"></div>

           </div>
    </div>
</template>



<script>
import {mapState } from 'vuex'
export default {
  data () {
      return {
        data:{},
        url:"",
        params:{},
        myChart:null
    }
    },
  props: ['setting'],
  watch:{
    setting:  function (setting){
    //  alert($.toJSON(setting))

    this.data  =  {...this.data};
    this.loadMapChart( setting);
     alert(setting.id)
  }
  },
 methods: {
   getAjaxChartData(){
     var data  =   this.commonAjax.req(this.setting.url,this.params).then(data=>{
       this.data = data;
        this.loadMapChart( this.setting );
     });
   },
   loadMapChart(setting,data){

      var data = this.data;

       var radius = setting.radius==null?'45%':setting.radius;
         this.myChart = echarts.init(document.getElementById(setting.id));


       var dayData = data.day;
       var weekData = data.week;
       var monthData = data.month;
         //var xData = data.xData
         var xData = []
         for (var i = 0; i < 24 ; i++) {
          xData.push(i);
         }

       var option = {
          legend: {
             selectedMode: 'single',
             selected:{
                 '7天' : false,
                 '本月':false
             },
             data: ["本日","7天","本月"]
         },
           tooltip: {},

           series: [{
               radius : radius,
               name: '本日',
               areaStyle: {normal: {}},
               type: setting.type,
               data: dayData
           },
           {
               radius : radius,
               name: '7天',
               areaStyle: {normal: {}},
               type: setting.type,
               data: weekData
           },
           {
               radius : radius,
               name: '本月',
               areaStyle: {normal: {}},
               type: setting.type,
               data: monthData
           }
         ]
       };

      if(setting.type =='line'){
        var xAxis =  {
          type: 'category',
          boundaryGap : false,
            data:  xData
        };
       var yAxis = {};

        option.xAxis = xAxis;
        option.yAxis = yAxis;
      }
       // 使用刚指定的配置项和数据显示图表。
       this.myChart.setOption(option);

      window.onresize=this.myChart.resize;


   },
   changeChart(url){
    //  alert(url)
   }
 },
 created :function() {

 },
 mounted() {
  this.getAjaxChartData();
},
destroyed(){
this.myChart.dispose();

}
}
</script>
