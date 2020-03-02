$(document).ready(function() {
	'use strict';

	var myChart1 = echarts.init(document.getElementById('bar1'));
	var option1 = {
		color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'5%',
				left: '-15',
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
						// rotate:-40,
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
					data : ['系统1', '系统2', '系统3', '系统4', '系统5', '系统6', '系统7', '系统8', '系统9', '系统10'],				
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
					data:[234, 198, 178, 136, 109,101,94,89,81,68, ]
				}
			]
	};
	myChart1.setOption(option1);

	var myChart2 = echarts.init(document.getElementById('bar2'));
	var option2 = {
		color: ['#35a2ff'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'5%',
				left: '-15',
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
					data : ['类型1', '类型2', '类型3', '类型4', '类型5', '类型6', '类型7', '类型8', '类型9', '类型10'],				
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
					data:[234, 198, 178, 136, 109,101,94,89,81,68, ]
				}
			]
	};
	myChart2.setOption(option2);

	var myChart3 = echarts.init(document.getElementById('line1'));
	var option3 = {
		tooltip: {
			trigger: 'axis',
			backgroundColor:'#2d3031',
			formatter:'{c}次{a}',
			 axisPointer:{
			 	lineStyle:{color:'#E1E3E4',},
			 },
		},
		grid: {
			top: '6%',
			left: '2%',
			right: '3%',
			bottom: '12%',
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
				 },
			 },
			 axisTick: { show: false,},
			data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			max:150,
			splitNumber: 3,
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
			data: [72, 95, 84, 107, 75, 112, 84,]
		}]
	};
	myChart3.setOption(option3);


	var myChart4 = echarts.init(document.getElementById('radar1'));
	var option4 = {
    	tooltip: {
    		trigger: 'item',
		    padding:10,
		    backgroundColor:'#2d3031',
		    // formatter:'name：{c}次/天'
		    // formatter:function(params) {
      //                           return params.value;
      //                       },
    	},
	    radar: {
	        center: ['50%','50%'],
	        radius: '66%',
	        indicator: [
	           { name: '操作1',max: 1350},
	           { name: '操作5',max: 1350},
	           { name: '操作4',max: 1350},
	           { name: '操作3',max: 1350},
	           { name: '操作2',max: 1350},
	        ],
	        splitArea: {show: false },
	        axisLine:{ show:false},
	        name:{color:'#3e4956'}

	    },
	    series: [{
	        name: '操作行为基准',
	        type: 'radar',
	        symbol: 'circle',
	        symbolSize:4,
	        itemStyle: {
                normal: {color: '#1abc9c'}
            },
            areaStyle: {
                normal: {opacity: 0.8}
            },
	        data : [
	            {
	                value : [1350, 659, 837, 1010, 1169],
	                name : '',
	                label:{
	                	normal:{show:false}
	                }
	            },
	        ],
	    }]
	};
 	myChart4.setOption(option4);

 	var myChart5 = echarts.init(document.getElementById('radar2'));
	var option5 = {
    	tooltip: {
    		trigger: 'item',
		    padding:10,
		    backgroundColor:'#2d3031',
		    // formatter:'name：{c}次/天'
		    // formatter:function(params) {
      //                           return params.value;
      //                       },
    	},
	    radar: {
	        center: ['50%','50%'],
	        radius: '66%',
	        indicator: [
	           { name: '设备1',max: 1350},
	           { name: '设备5',max: 1350},
	           { name: '设备4',max: 1350},
	           { name: '设备3',max: 1350},
	           { name: '设备2',max: 1350},
	        ],
	        splitArea: {show: false },
	        axisLine:{ show:false},
	        name:{color:'#3e4956'}

	    },
	    series: [{
	        name: 'IP访问基准',
	        type: 'radar',
	        symbol: 'circle',
	        symbolSize:4,
	        itemStyle: {
                normal: {color: '#5e4ef6'}
            },
            areaStyle: {
                normal: {opacity: 0.8}
            },
	        data : [
	            {
	                value : [1350, 659, 837, 1010, 1169],
	                name : '',
	                label:{
	                	normal:{show:false}
	                }
	            },
	        ],
	    }]
	};
 	myChart5.setOption(option5);

 	

	window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
	myChart3.resize();
	myChart4.resize();
	myChart5.resize();
	myChart6.resize();
};
	 	

}); //ready结束