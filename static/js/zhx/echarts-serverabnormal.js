$(document).ready(function() {
	'use strict';

	var myChart1 = echarts.init(document.getElementById('pie1'));
 	var option1 = {
 		color:['#2a87e7','#1c52b5','#78e1ff'],
 		title:{
 			show:true,
 			text:'连接123次',
 			top:'14%',
 			left:'center',
 			textStyle:{
 				fontSize:14,
 				fontWeight:'normal',
 				color:'#3E4956',
 			}
 		},
		 tooltip: {
			trigger: 'item',
			backgroundColor:'#2d3031',
			// formatter: "{a} <br/>{b}: {c} ({d}%)"
		 },
		 series: [{
			name: '外联IP占比',
			type: 'pie',
			center:['50%','56%'],
			radius: ['30%', '50%'],
			roseType : 'radius',//南丁格尔玫瑰图
			label: {
				normal: {
					formatter: "{b}\n{d}次",
					textStyle:{
						fontSize:14,
						color:'#3E4956',
					}

				},
				emphasis: {
					show: true,
					textStyle: {
						color:'#3E4956',
						fontSize: '12',

					}
				}
			},
			labelLine:{
					normal:{
						show:true,
						length:10,
						length2:15,
						lineStyle:{
							color:'#e1e3e4'
						}
						
					},
					emphasis:{
						lineStyle:{
							color:'#3e4956'
						}
					}
				},
			data: [
			{value: 30, name: '类型二'},
			{value: 10, name: '类型三'}, 
			{value: 60, name: '类型一'},
		  ]
		}]
 	};
 	myChart1.setOption(option1);

 	var myChart2 = echarts.init(document.getElementById('pie2'));
 	var option2 = {
 		color:['#82d075','#239a29','#cce46a'],
 		title:{
 			show:true,
 			text:'连接123次',
 			top:'14%',
 			left:'center',
 			textStyle:{
 				fontSize:14,
 				fontWeight:'normal',
 				color:'#3E4956',
 			}
 		},
		 tooltip: {
			trigger: 'item',
			backgroundColor:'#2d3031',
		 },
		 series: [{
			name: '外联域名占比',
			type: 'pie',
			center:['50%','56%'],
			radius: ['30%', '50%'],
			roseType : 'radius',//南丁格尔玫瑰图
			label: {
				normal: {
					formatter: "{b}\n{d}次",
					textStyle:{
						fontSize:14,
						color:'#3E4956',
					}

				},
				emphasis: {
					show: true,
					textStyle: {
						color:'#3E4956',
						fontSize: '12',

					}
				}
			},
			labelLine:{
					normal:{
						show:true,
						length:10,
						length2:15,
						lineStyle:{
							color:'#e1e3e4'
						}
						
					},
					emphasis:{
						lineStyle:{
							color:'#3e4956'
						}
					}
				},
			data: [
			{value: 30, name: '类型二'},
			{value: 10, name: '类型三'}, 
			{value: 60, name: '类型一'},
		  ]
		}]
 	};
 	myChart2.setOption(option2);

 	var myChart3 = echarts.init(document.getElementById('pie3'));
 	var option3 = {
 		color:['#358ed7','#4553a5','#7fc958'],
 		title:{
 			show:true,
 			text:'感染123次',
 			top:'14%',
 			left:'center',
 			textStyle:{
 				fontSize:14,
 				fontWeight:'normal',
 				color:'#3E4956',
 			}
 		},
		 tooltip: {
			trigger: 'item',
			backgroundColor:'#2d3031',
		 },
		 series: [{
			name: '外联域名占比',
			type: 'pie',
			center:['46%','56%'],
			radius: ['30%', '50%'],
			roseType : 'radius',//南丁格尔玫瑰图
			label: {
				normal: {
					formatter: "{b}\n{d}次",
					textStyle:{
						fontSize:14,
						color:'#3E4956',
					}

				},
				emphasis: {
					show: true,
					textStyle: {
						color:'#3E4956',
						fontSize: '12',

					}
				}
			},
			labelLine:{
					normal:{
						show:true,
						length:5,
						length2:12,
						lineStyle:{
							color:'#e1e3e4'
						}
						
					},
					emphasis:{
						lineStyle:{
							color:'#3e4956'
						}
					}
				},
			data: [
			{value: 30, name: '特洛伊木马'},
			{value: 10, name: '僵尸网络'}, 
			{value: 60, name: '蠕虫'},
		  ]
		}]
 	};
 	myChart3.setOption(option3);
 

 	var myChart4 = echarts.init(document.getElementById('bar1'));
	var option4 = {
		color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'5%',
				left: '-20',
				right: '2%',
				bottom: '5%',
				containLabel: true,
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap: true,
					axisLabel:{
						show:true,
						color:'#3e4956',
						margin:15,
					},
					axisTick: { 
					    inside:true,
						alignWithLabel: true,//在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
					},
					axisLine:{show:false,},
					splitLine:{
						show: false,
						lineStyle:{
							color:'#e1e3e4',
							type:'solid'
						}
					},
					data : ['IP1', 'IP2', 'IP3', 'IP4', 'IP5', 'IP6', 'IP7', 'IP8', 'IP9', 'IP10'],				
				}
			],
			yAxis : [
				{
					type : 'value',
					splitNumber:9,
					axisTick:{show:false},
 					axisLine:{show:false},
 					axisLabel:{show:false},
					splitLine:{ 
						show:true,
						lineStyle:{ 
							color:'#e1e3e4',
  						    type:'solid'
						},
				},	    
				}
			],
			series : [
				{
					name:'',
					type:'bar',
					barWidth: '20%',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    color:'#3e4956'
		                }
		            },
					data:[234, 198, 178, 136, 109,101,94,89,81,68, ]
				},

			]
	};
	myChart4.setOption(option4);

	var myChart5 = echarts.init(document.getElementById('bar2'));
	var option5 = {
		color: ['#35a2ff'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'5%',
				left: '-20',
				right: '2%',
				bottom: '5%',
				containLabel: true,
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap: true,
					axisLabel:{
						show:true,
						color:'#3e4956',
						margin:15,
					},
					axisTick: { 
					    inside:true,
						alignWithLabel: true,//在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
					},
					axisLine:{show:false,},
					splitLine:{
						show: false,
						lineStyle:{
							color:'#e1e3e4',
							type:'solid'
						}
					},
					data : ['域名1', '域名2', '域名3', '域名4', '域名5', '域名6', '域名7', '域名8', '域名9', '域名10'],				
				}
			],
			yAxis : [
				{
					type : 'value',
					splitNumber:9,
					axisTick:{show:false},
 					axisLine:{show:false},
 					axisLabel:{show:false},
					splitLine:{ 
						show:true,
						lineStyle:{ 
							color:'#e1e3e4',
  						    type:'solid'
						},
				},	    
				}
			],
			series : [
				{
					name:'',
					type:'bar',
					barWidth: '20%',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    color:'#3e4956'
		                }
		            },
					data:[234, 198, 178, 136, 109,101,94,89,81,68, ]
				},

			]
	};
	myChart5.setOption(option5);

	var myChart6 = echarts.init(document.getElementById('bar3'));
	var option6 = {
		color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'3%',
				left: '-20',
				right: '2%',
				bottom: '5%',
				containLabel: true,
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap: true,
					axisLabel:{
						show:true,
						color:'#3e4956',
						margin:15,
					},
					axisTick: { 
					    inside:true,
						alignWithLabel: true,//在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
					},
					axisLine:{show:false,},
					splitLine:{show: false,},
					data: ['数据库\n\n192.168.1.44', '网站\n\n192.168.1.56', '服务器\n\n192.168.1.89', '服务器\n\n192.168.1.71', 
				'服务器\n\n192.168.1.55','服务器\n\n192.168.1.89','服务器\n\n192.168.1.71','服务器\n\n192.168.1.55', ],			
				}
			],
			yAxis : [
				{
					type : 'value',
					splitNumber:10,
					axisTick:{show:false},
 					axisLine:{show:false},
 					axisLabel:{show:false},
					splitLine:{ 
						show:true,
						lineStyle:{ 
							color:'#e1e3e4',
  						    type:'solid'
						},
				},	    
				}
			],
			series : [
				{
					name:'',
					type:'bar',
					barWidth: '20%',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    color:'#3e4956'
		                }
		            },
					data:[234, 198, 178, 136, 109,101,94,89,81,68, ]
				},

			]
	};
	myChart6.setOption(option6);

	var myChart7 = echarts.init(document.getElementById('bar4'));
	var option7 = {
			color: ['#1B55A5', '#00B8FF', '#FDB502'],
			legend: {
				top: '18',
				left: 'center',
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 25,
				textStyle: {
					fontSize: 12,
				},
				data: [
					{ name: '染僵', icon: 'circle' },
					{ name: '染木', icon: 'circle' },
					{ name: '染蠕', icon: 'circle' }
				]
			},
			tooltip: {
				trigger: "axis",
				backgroundColor:'#2d3031',
				axisPointer: {
					type: "shadow",
					textStyle: {
						color: "#fff"
					}
				},
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true, //grid 区域是否包含坐标轴的刻度标签。	
			},
			calculable: true,
			xAxis: [{
				type: "category",
				boundaryGap: true, //坐标轴两边留白策略（类目轴）
				splitLine: { show: false,},
				axisLine: { show: false,},
				axisLabel: { //坐标轴刻度标签的相关设置
						textStyle: {
							fontSize:12,
							color: '#3E4956',
						},
					},
				axisTick:{show:false,},
				data: ['数据库\n\n192.168.1.44', '网站\n\n192.168.1.56', '服务器\n\n192.168.1.89', '服务器\n\n192.168.1.71', 
				'服务器\n\n192.168.1.55','服务器\n\n192.168.1.89','服务器\n\n192.168.1.71','服务器\n\n192.168.1.55', ],
			}],
			yAxis: [{
				type: "value",
				max: 90,
				splitNumber: 9,
				splitLine:{ 
						show:true,
						lineStyle:{ 
							color:'#e1e3e4',
  						    type:'solid'
						},
				},	    
				axisLine: { show: false,},
				axisLabel: {
						textStyle: {
							color: '#3E4956'
						},
					},
				axisTick:{show:false,},
			}],
			series: [
				{
				name: "染僵",
				type: "bar",
				stack: "总量",
				barMaxWidth: '20%',
				itemStyle: {
					normal: {
						label: {
							show: false,
							textStyle: {
								color: "#fff"
							},
							position: "insideTop",
							formatter: function(p) {
								return p.value > 0 ? (p.value) : '';
							}
						}
					}
				},
				data: [37, 31, 17, 25, 34,10,18,22],
			}, 
			    {
				name: "染木",
				type: "bar",
				stack: "总量",
				barMaxWidth: '20%',
				itemStyle: {
					normal: {
						label: {
							show: false,
							textStyle: {
								color: "#fff"
							},
							position: "insideTop",
							formatter: function(p) {
								return p.value > 0 ? (p.value) : '';
							}
						}
					}
				},
				data: [22, 10, 25, 13, 6,15,6,4]
			}, 
			    {
				name: "染蠕",
				type: "bar",
				stack: "总量",
				barMaxWidth: '20%',
				itemStyle: {
					normal: {
						barBorderRadius: 0,
						label: {
							show: false,
							position: "top",
							formatter: function(p) {
								return p.value > 0 ? (p.value) : '';
							}
						}
					}
				},
				data: [22, 26, 12,12, 2, 7,8,1]
			}, ]
		};
	 myChart7.setOption(option7);


	var myChart8 = echarts.init(document.getElementById('line1'));
 	var lineData1 = []; 
	var lineData2 = []; 
	var lineData3 = [];
	var lineData4 = [];
	
	for (var i = 0; i < 8; i++) {
		var a = Math.random() * 10;
		var b = Math.random() * 20;
		var c = Math.random() * 20;
		var sum = a + b + c;
		lineData1.push(a.toFixed(0));
		lineData2.push(b.toFixed(0));
		lineData3.push(c.toFixed(0));
		lineData4.push(sum.toFixed(0));
    }
	
	var option8 = {
		 color: ['#ff7d27','#358ED7', '#4553A5', '#7FC958'],
		 backgroundColor: '#ffffff',
		 tooltip: {
			 trigger: 'axis',
			 backgroundColor:'#2d3031',
			 formatter:'{c}次{a}',
			 axisPointer:{
			 	lineStyle:{color:'#E1E3E4',},
			 },

		 },
		 legend: {
			 bottom: '5%',
			 left: 'center',
			 itemWidth: 8,
			 itemHeight: 8,
			 itemGap: 80,
			 textStyle: {
				 color: '#3E4956',
				 fontSize: 12,
			 },
			 data: [{
					 name: '总数',
					 icon: 'circle'
				 },
				 {
					 name: '特洛伊木马',
					 icon: 'circle'
				 },
				 {
					 name: '僵尸网络',
					 icon: 'circle'
				 },
				{
					 name: '蠕虫',
					 icon: 'circle'
				 }

			 ]
		 },
		 grid: {
			 top:'10%',
			 left: '1%',
			 right: '2%',
			 bottom: '25%',
			 containLabel: true
		 },
		 xAxis: [{
			 type: 'category',
			 boundaryGap: false,
			 axisLine: { //坐标轴轴线相关设置。数学上的x轴
				 show: true,
				 lineStyle: {
					 color: '#E1E3E4'
				 },
			 },
			 axisLabel: { //坐标轴刻度标签的相关设置
				 textStyle: {
					 color: '#3E4956',
				 },
			 },
			 axisTick: { //坐标轴刻度相关设置。
				 show: false,
			 },
			 data: ['3.21','3.22','3.23','3.24','3.25','3.26','3.27']
		 }],
		 yAxis: [{
			 type: 'value',
			 splitLine: {
				 show: true,
				 lineStyle: {
					 color: '#E1E3E4'
				 }
			 },
			 axisLine: {
				 show: false,
				 lineStyle: {
					 color: '#E1E3E4'
				 },
			 },
			 axisLabel: {
				 textStyle: {
					 color: '#3E4956',
					 
				 },
			 },
			 axisTick: { show: false,},
		 }],
		 series: [
			 {
				 name: '特洛伊木马',
				 type: 'line',
				 stack: '总量',
				 smooth: true, 
				 symbol: 'circle', 
				 symbolSize: 6,
				
				 itemStyle: {
					 normal: {
						 color: "#358ED7",
						 borderColor: "#fff" 
					 }
				 },
				 areaStyle: {
					 normal: {
						 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								 offset: 0,
								 color: 'rgba(53, 142, 215, 0.9)'
							 },
							 {
								 offset: 0.4,
								 color: 'rgba(53, 142, 215, 0.6)'
							 },
							 {
								 offset: 0.8,
								 color: 'rgba(53, 142, 215, 0.4)'
							 }
						 ], false),
					 }
				 },
				 data:lineData1
			 },
			 {
				 name: '僵尸网络',
				 type: 'line',
				 stack: '总量',
				 smooth: true, 
				 symbol: 'circle',
				 symbolSize: 6,
				 itemStyle: {
					 normal: {
						 color: "#4553A5", 
						 borderColor: "#fff" 
					 }
				 },
				 areaStyle: {
					 normal: {
						 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								 offset: 0,
								 color: 'rgba(69,83,165,0.9)'
							 },
							 {
								 offset: 0.4,
								 color: 'rgba(69,83,165,0.6)'
							 },
							 {
								 offset: 0.8,
								 color: 'rgba(69,83,165,0.4)'
							 },
						 ], false),
					 }
				 },
				 data:lineData2
			 },
			 {
				 name: '蠕虫',
				 type: 'line',
				 stack: '总量',
				 smooth: true, 
				 symbol: 'circle',
				 symbolSize: 6,
				 itemStyle: {
					 normal: {
						 color: "#7FC958", 
						 borderColor: "#fff" 
					 }
				 },
				 areaStyle: {
					 normal: {
						 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								 offset: 0,
								 color: 'rgba(127, 201, 88, 0.9)'
							 },
							 {
								 offset: 0.4,
								 color: 'rgba(127, 201, 88, 0.6)'
							 },
							 {
								 offset: 0.8,
								 color: 'rgba(127, 201, 88, 0.4)'
							 }
						 ], false),
					 }
				 },
				 data:lineData3
			 },
			 {
				 name: '总数',
				 type: 'line',
				 stack: '总量',
				 smooth: true, //是否平滑曲线显示
				 symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
				 symbolSize: 6,
				 data:lineData4

			 },
		 ]
    };
	myChart8.setOption(option8);

	window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
	myChart3.resize();
	myChart4.resize();
	myChart5.resize();
	myChart6.resize();
	myChart7.resize();
	myChart8.resize();
};
	 	

}); //ready结束