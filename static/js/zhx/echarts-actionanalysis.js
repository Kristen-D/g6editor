// JavaScript Document

$(document).ready(function() {
	'use strict';
	var myChart1 = echarts.init(document.getElementById('line1'));
	var option1 = {
		tooltip: {
			trigger: 'axis',
			backgroundColor:'#2d3031',
			formatter:'时间：2017.{b} <br/> {a}：{c}',
			axisPointer:{
			 	lineStyle:{color:'#E1E3E4',},
			},
		},
		grid: {
			top: '19%',
			left: '3%',
			right: '10%',
			bottom: '0%',
			containLabel: true,
		},
		xAxis: [{
			type: 'category',
			data: ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27'],
			axisLine: { //坐标轴轴线相关设置。数学上的x轴
				 show: true,
				 lineStyle: {
					 color: '#E1E3E4'
				 },
			 },
			 axisLabel: { //坐标轴刻度标签的相关设置
			 	margin:12,
				 textStyle: {
					 color: '#3E4956',
				 },
			 },
			 axisTick: { show: false,},
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			splitNumber: 5,
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
		series: [{
			name: '端口扫描趋势',
			type: 'line',
			smooth: true, //是否平滑曲线显示
			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
			symbolSize:6,
			itemStyle: {
				normal: {
					color: "#f1c40f",  // 会设置点和线的颜色，所以需要下面定制 line
					borderColor: "#fff"  // 点边线的颜色
				}
			},
			lineStyle: {
				normal: {
					color: "#f1c40f"   // 线条颜色
				}
			},

			data: [18, 22, 13, 9, 20, 23, 19]
		}]
	};
	myChart1.setOption(option1);
	
	var myChart2 = echarts.init(document.getElementById('bar1'));
	var option2 = {
		color:['#82d075','#fcb80e'],
		tooltip: {
			trigger: 'axis',
			backgroundColor:'#2d3031',
        	axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
        	}
		},
		grid: {
			top: '13%',
			left: 0,
			right: 0,
			bottom: '8%',
			containLabel: true,
		},
		xAxis: [{
			type: 'category',
			data: ['3128/tcp', '8080', '559/tcp', '6010/tcp', '8008', '5766', '3438/tcp', '3456'],
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
			 axisTick: { show: false,},
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			splitNumber: 5,
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
		 series: [{
            name: 'x1',
            type: 'bar',
            barWidth:'20%',
            label:{
            	normal:{
	            	show:true,
	            	position:'top',
	            	color:'#3E4956'
            	}
            },
            data: [25, 22, 19, 17, 15, 13,9,5]
        },
        {
            name: 'x2',
            type: 'bar',
            barWidth:'20%',
            label:{
            	normal:{
	            	show:true,
	            	position:'top',
	            	color:'#3E4956'
            	}
            },
            data: [23,21,17,16,13,11,8,5]
        }
    	]
	};
    myChart2.setOption(option2);
    

    var myChart3 = echarts.init(document.getElementById('pie1'));
	var option3 = {
		color:['#82d075','#239a29','#cce46a'],
	    title : {
	        text: '外联黑IP总数\x20\x20'+'123',
	        left:'center',
	        top:'14%',
	        textStyle: {
	            color: '#3e4956',
	            fontSize:14,
	            fontWeight:'normal'
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        backgroundColor:'#2d3031',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },

	    series : [

	        {
	            name:'外联黑IP',
	            type:'pie',
	            radius : ['30%', '50%'],
	            center : ['50%', '56%'],
	            roseType : 'radius',
	            label: {
	                normal: {
	                	formatter:'{b}\n{c}个',
	                    textStyle: {
	                        color: '#3e4956',
	                        fontSize:14,
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    lineStyle: {
	                        color: '#e1e3e4'
	                    },
	                    smooth: 0.2,
	                    length: 10,
	                    length2: 10
	                }
	            },
	            data:[
	                {value:35, name:'类型二'},
	                {value:15, name:'类型三'},
	                {value:73, name:'类型一'}
	            ],
	            
	            animationType: 'scale',
	            animationEasing: 'elasticOut',
	            animationDelay: function (idx) {
	                return Math.random() * 200;
	            }
	        }
	    ]
	};
	
	myChart3.setOption(option3);

	var myChart4 = echarts.init(document.getElementById('line2'));
	var option4 = {
		tooltip: {
			trigger: 'axis',
			backgroundColor:'#2d3031',
			formatter:'时间：2017.{b} <br/> {a}：{c}',
			axisPointer:{
			 	lineStyle:{color:'#E1E3E4',},
			},
		},
		grid: {
			top: '10%',
			left: 0,
			right: '2%',
			bottom: '5%',
			containLabel: true,
		},
		xAxis: [{
			type: 'category',
			data: ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27'],
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
			 axisTick: { show: false,},
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			splitNumber: 5,
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
		series: [{
			name: '外联黑IP',
			type: 'line',
			smooth: true, //是否平滑曲线显示
			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
			symbolSize:6,
			itemStyle: {
				normal: {
					color: "#358ed7",  // 会设置点和线的颜色，所以需要下面定制 line
					borderColor: "#fff"  // 点边线的颜色
				}
			},
			lineStyle: {
				normal: {
					color: "#358ed7"   // 线条颜色
				}
			},

			data: [18, 22, 13, 9, 20, 23, 19]
		}]
	};
	myChart4.setOption(option4);
	
	var myChart5 = echarts.init(document.getElementById('pie2'));
	var option5 = {
		color:['#358ed7','#4553a5','#7fc958'],
	    title : {
	        text: '终端感染僵木蠕123次',
	        left:'center',
	        top:'14%',
	        textStyle: {
	            color: '#3e4956',
	            fontSize:14,
	            fontWeight:'normal'
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        backgroundColor:'#2d3031',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    series : [

	        {
	            name:'终端感染僵木蠕',
	            type:'pie',
	            radius : ['30%', '50%'],
	            center : ['48%', '56%'],
	            roseType : 'radius',
	            label: {
	                normal: {
	                	formatter:'{b}\n{c}次',
	                    textStyle: {
	                        color: '#3e4956',
	                        fontSize:14,
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    lineStyle: {
	                        color: '#e1e3e4'
	                    },
	                    smooth: 0.2,
	                    length: 10,
	                    length2: 10
	                }
	            },
	            data:[
	                {value:35, name:'特洛伊木马'},
	                {value:15, name:'僵尸网络'},
	                {value:73, name:'蠕虫'}
	            ],
	            
	            animationType: 'scale',
	            animationEasing: 'elasticOut',
	            animationDelay: function (idx) {
	                return Math.random() * 200;
	            }
	        }
	    ]
	};
	myChart5.setOption(option5);

	var myChart6 = echarts.init(document.getElementById('line3'));
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
	
	var option6 = {
		 color: ['#ff7d27','#358ED7', '#4553A5', '#7FC958'],
		 tooltip: {
			 trigger: 'axis',
			 backgroundColor:'#2d3031',
			 formatter:'{c}次{a}',
			 axisPointer:{
			 	lineStyle:{color:'#E1E3E4',},
			 },

		 },
		 legend: {
			 bottom: '0',
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
			 top:'8%',
			 left: 0,
			 right: '2%',
			 bottom: '13%',
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
	myChart6.setOption(option6);


	var myChart7 = echarts.init(document.getElementById('bar2'));
	var option7 = {
	    color: ['#82d075'],
				tooltip : {
					trigger: 'axis',
					backgroundColor:'#2d3031',
					axisPointer : { type : 'shadow',}
				},
				grid: {
					top:'13%',
					left: '0',
					right: '10',
					bottom: '8%',
					containLabel: true,
				},
				xAxis : [
					{
						type : 'category',
						boundaryGap: true,
						axisLabel:{
							show:true,
							color:'#3e4956',
							rotate:-40,
							// offset:[0,-55],
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
						data : ['病毒1', '病毒2', '病毒3', '病毒4', '病毒5', '病毒6', '病毒7', '病毒8', '病毒9', '病毒10',
								'病毒11', '病毒12', '病毒13', '病毒14', '病毒15', '病毒16', '病毒17', '病毒18', '病毒19', '病毒20'],
					}
				],
				yAxis : [
					{
						type : 'value',
						splitNumber:5,
						axisTick:{show:false},
	 					axisLine:{show:false},
	 					axisLabel:{show:true},
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

						name:'命中次数',
						type:'bar',
						barWidth: '28%',
						label: {
			                normal: {
			                    show: true,
			                    position: 'top',
			                    color:'#3e4956'
			                }
			            },
						data:[94, 89, 87, 84, 81,78,74,72,70,67,64,63,62,61,58,56,52,47,32,18 ]
					}
				]
	};
	myChart7.setOption(option7);



window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
	myChart3.resize();
	myChart4.resize();
	myChart5.resize();
	myChart6.resize();
	myChart7.resize();
};
	 	

}); //ready结束