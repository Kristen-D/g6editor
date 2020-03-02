<template >

	<div id="totalHeatMap" style="height:300px;">
	</div>
</template>

<script>
	import {mapState,mapActions } from 'vuex'
	import echarts from 'echarts'
	export default {
		computed:{
	    ...mapState({
	       test:state=>state.context.params.test,
	   })},
		 watch:{
			test:function(test){
					 console.log(666);
			}
		},
		 data(){
				 return {
	          isOpen:false,
						currentIndex:-1,
				 }
		 },

			methods: {

			async	loadMapChart(){
      var params = this.$store.state.context.params;
			var data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnLine.do", params);
			var myChart = echarts.init(document.getElementById("totalHeatMap"));
			var lenData = [];
			var seriesData=[];
			for(var i = 0; i < data.length; i++){
				var dataUnit = data[i];
				// var childData = {};
				// childData.value=dataUnit.total;
				// childData.name=dataUnit.event_type;
				lenData.push(dataUnit.days);
				seriesData.push(dataUnit.total);
			};

      var myChart = echarts.init(document.getElementById("totalHeatMap"));



      var   option = {
	        tooltip : {
	            trigger: 'axis'
	        },
	        toolbox: {
	            show : true,
	            right: 7,
	            feature : {
	                mark : {show: true},
	                // dataView : {show: true, readOnly: true},
	                saveAsImage : {show: true}
	            }
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '15%',
	            containLabel: true
	        },

	        xAxis : [
	            {
	                type : 'category',
	                boundaryGap : false,
	                data : lenData,
	                axisLine: {
	                    show: false,
	                    lineStyle: {
	                        color: 'rgb(135,135,135)',
	                        width: 1.5,
	                    }
	                },
	                axisLabel: { //坐标轴刻度标签的相关设置。
	    						textStyle: {
	    							color: 'rgba(255,255,255,0.83)',
	    							fontFamily: "微软雅黑",
	    							fontSize: 12
	    						},
	    					}
	            }
	        ],

	        yAxis : [
	            {
	                type : 'value',
	                minInterval: 1,
	                position: ['left', 'right'],
	                splitLine: {
	                    show: false
	                },
	                axisLabel: { //坐标轴刻度标签的相关设置。
	    						textStyle: {
	    							color: 'rgba(255,255,255,0.83)',
	    							fontFamily: "微软雅黑",
	    							fontSize: 12
	    						},
	    					}
	            }
	        ],

	        series : [
	            {
	                name:'值',
	                type:'line',
	                stack: '总量',
	                smooth:true,
	                areaStyle: {normal: {color: 'rgb(173, 234, 226)'}},
	                lineStyle: {normal: {color: 'rgb(175, 236, 214)'}},
	                data: seriesData
	            }
	        ]
	      };



      myChart.setOption(option);
      window.onresize=myChart.resize;
			let vm=this;
			// myChart.on('click', function(params) {
			// 	  vm.funbs(params.name,params.dataIndex);
			// });

  },
	funbs(names,index){
		if(this.currentIndex==-1){
			this.$store.state.context.params.org_name=names;
			this.isOpen=true;
			this.currentIndex=index;//初始化进来的第一次点击
			this.$store.state.context.qryTableName2="-"+names;
		}else if (this.currentIndex==index&&this.isOpen){
			this.$store.state.context.params.org_name=null;
			this.isOpen=false;
			this.currentIndex=-1;//打开一个机构，又把它关回去，相当于初始化
			this.$store.state.context.qryTableName2="";
		}else{
			this.$store.state.context.params.org_name=names;
			this.isOpen=true;
			this.currentIndex=index;//打开了一个机构，又去打开其他机构
			this.$store.state.context.qryTableName2="-"+names;
		}

		this.$store.commit('setParams',["threatReports", this.$store.state.context.params]);
		this.$store.dispatch('reloadTable',"threatReports");
    this.$store.state.context.test=names;

	},
},
created :function() {

},
mounted: async function(){
	this.loadMapChart();

}

}
</script>
