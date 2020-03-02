$(document).ready(function() {
	'use strict';


	// 撞库
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
			top: '5%',
			left: '2%',
			right: '3%',
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
			max:200,
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
			name: '账户数',
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

			data: [112, 121, 40, 96, 17, 16, 15]
		}]
	};
	myChart1.setOption(option1);

	window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
	myChart3.resize();
};
	 	

}); //ready结束