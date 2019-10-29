<template >
<div :id="id" class="echartbarbox"></div>
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


        var tipShow=false;
        var seriesNameStr=this.myname;
        if(this.myname.length>6){
          var mystr=this.myname.substr(0,6);
          mystr+="..";
          // mystr+=this.myname.substr(6,this.myname.length-6);
          tipShow=true;
          this.myname=mystr;
        }


        var option = {
		title:{
		   text:this.id,
		   subtext:this.myname,
		   textStyle:{ //主标题
			  color:'#3E4956',
			  fontWeight:'bold',
			  fontSize:14,
		   },
		   subtextStyle:{//副标题
			  color:'#3E4956',
			   fontSize:12,
		   },
		   itemGap:12,//主副标题之间的距离
		   top:'10%',
		},
    tooltip: {
        show:tipShow,
        trigger: 'item',
        formatter: function (params, ticket, callback) {
              return params.seriesName;
          }
    },
		series: [{
			name: seriesNameStr,
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
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
							fontSize: 14
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
