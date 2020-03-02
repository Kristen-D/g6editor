$(document).ready(function () {
	'use strict';
	
	var myChart1 = echarts.init(document.getElementById('line1'));
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
	
	var option1 = {
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
					 name: '恶意退票',
					 icon: 'circle'
				 },
				 {
					 name: '恶意注册',
					 icon: 'circle'
				 },
				{
					 name: '恶意扒取',
					 icon: 'circle'
				 }

			 ]
		 },
		 grid: {
			 top:'5%',
			 left: '1%',
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
				 name: '恶意扒取',
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
				 name: '恶意注册',
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
				 name: '恶意退票',
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
	myChart1.setOption(option1);


	var myChart2 = echarts.init(document.getElementById('bar3'));
	var option2 = {
			color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
				axisPointer : { type : 'shadow',},
				backgroundColor:'#2d3031',
			},
			grid: {
				top:'10%',
				left: '-15',
				right: '2%',
				bottom: '10%',
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
					data : ['21.247.1.21', '124.200.103.201', '21.247.1.345', '124.200.103.201', '211.247.1.21', 
					'56.200.103.201', '200.247.12.21', '21.247.16.210', '145.247.1.21', '46.247.1.21', '21.247.1.21 ', 
					'124.200.103.201','21.247.1.345','124.200.103.201','211.247.1.21','56.200.103.201','200.247.12.21','21.247.16.210','145.247.1.21','46.247.1.21'],				
				}
			],
			yAxis : [
				{
					type : 'value',
					splitNumber:5,
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
					data:[94, 89, 87, 84, 81,78,74,72,70,67,64,63,63,61,58,56,52,47,32,32, ]
				}
			]
	 };
	myChart2.setOption(option2);

	window.onresize = function() {
    	myChart1.resize();
   		myChart2.resize();
  	};
	
	
});