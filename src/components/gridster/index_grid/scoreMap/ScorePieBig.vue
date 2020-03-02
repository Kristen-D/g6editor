<template >
<div :id="id" class="tabsbox"></div>
</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  computed:{
    ...mapState({
       params:state=>state.context.params,
        scorelist:state=>state.context.scorelist,
   })},
  props: ['id','param','myname'],
    methods: {

      fmtScoreList(val){

         for(var item in this.scorelist) {
             if (val==this.scorelist[item].id){
               return this.scorelist[item].score;
             }
         }
         return 100;
      },

      async loadMapChart(){


        // var data = await this.commonAjax.req("/ssa/situationAnaly/getOrgEventType.do", this.params);
        var myChart = echarts.init(document.getElementById(this.id));
        var count = this.fmtScoreList(this.param);
        var color="";


        if (count>=90){
          color="rgba(33,150,243,1)";
        }else if(count>=80){
            color="rgba(60,252,168,1)";
        }else{
           color="rgba(245,60,97,1)";
        }



        var option = {
		 title:{
       text:this.id,
		   textStyle:{ //主标题
			  color:'#3e4956',
			  fontSize:12,
			  // fontWeight:600,
		   },

		 top:'12%',
		 left:'40%',
		},
		 series: [{
			name: '饼图二',
			type: 'pie',
			radius:['70%', '80%'],
			center:['20%','38%'],
			data: [
			{
				value: count,
				name: '占比',
				label: {
					normal: {
						formatter: '{c}',
						position:'center',
						textStyle: {
							color:'#3E4956',
							fontSize: 11
						}
					}
				},
				itemStyle:{
					normal:{ color:color}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 100-count,
				 labelLine:{
			       normal:{ show:false,}
			    },
				itemStyle: {
					normal: {
					  color:'rgba(33,150,243,0.1)'
					},

				},
				hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			}]
		}]
	 };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
 }
    },
  mounted: async function() {
       this.loadMapChart();
  }

}
</script>
