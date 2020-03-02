$(document).ready(function() {
	'use strict';

	// 异地登录
	var myChart4 = echarts.init(document.getElementById('bar2'));
	var option4 = {
		color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'10%',
				left: '-10',
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
					data : ['北京', '上海', '广州', '杭州', '重庆', 
					'郑州', '西安', '成都', '呼和浩特', '哈尔滨', '福州 ', 
					'海口','南京','威海','厦门','潍坊','苏州','曲靖','玉溪','深圳'],				
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
	myChart4.setOption(option4);

	var myChart5 = echarts.init(document.getElementById('line2'));
	var option5 = {
		tooltip: {
			trigger: 'axis',
			backgroundColor:'#2d3031',
			formatter:'{c}次{a}',
			axisPointer:{
			 	lineStyle:{color:'#E1E3E4',},
			},
		},
		grid: {
			top: '8%',
			left: '1%',
			right: '1%',
			bottom: '8%',
			containLabel: true,
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
					 margin:15,
				 },
			 },
			 axisTick: { show: false,},
			data: ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27'],
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			max:20,
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
			 	margin:20,
				 textStyle: {
					 color: '#3E4956',
					 
				 },
			 },
			 axisTick: { show: false,},  
		}],
		series: [{
			name: '异地登录',
			type: 'line',
			smooth: true, //是否平滑曲线显示
			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
			symbolSize:6,
			itemStyle: {
				normal: {
					color: "#2980b9",  // 会设置点和线的颜色，所以需要下面定制 line
					borderColor: "#fff"  // 点边线的颜色
				}
			},
			lineStyle: {
				normal: {
					color: "#2980b9"   // 线条颜色
				}
			},
			areaStyle: { //区域填充样式
                normal: {
                 //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					   { offset: 0,  color: 'rgba(53,142,215, 0.9)'}, 
					   { offset: 0.7,  color: 'rgba(53,142,215, 0.3)'}
				   ], false),

                 shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                 shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
             }
         },
			data: [12, 9, 14, 17, 15, 12, 14]
		}]
	};
	myChart5.setOption(option5); 


	window.onresize = function() {
	myChart4.resize();
	myChart5.resize();
};
	 	

}); //ready结束