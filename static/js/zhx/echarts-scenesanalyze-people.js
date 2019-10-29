$(document).ready(function() {
	'use strict';

	var myChart1 = echarts.init(document.getElementById('pie1'));
 	var option1 = {
 		color:['#2a87e7','#1c52b5','#78e1ff'],
		 tooltip: {
			trigger: 'item',
			backgroundColor:'#2d3031',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		 },
		 series: [{
			name: '常使用IP',
			type: 'pie',
			center:['50%','45%'],
			radius: ['30%', '50%'],
			roseType : 'radius',//南丁格尔玫瑰图
			label: {
				normal: {
					formatter: "{b}\n{d}%",
					textStyle:{
						fontSize:12,
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
						length2:5,
						lineStyle:{
							color:'#e1e3e4'
						}
						
					},
					emphasis:{
						lineStyle:{
							//width:1,
							color:'#3e4956'
						}
					}
				},
			data: [
			{value: 30, name: '192.36.3.6'},
			{value: 10, name: '192.36.3.55'}, 
			{value: 60, name: '192.36.3.2'},
		  ]
		}]
 	};
 	myChart1.setOption(option1);

 	var myChart2 = echarts.init(document.getElementById('line1'));
	var option2 = {
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
			bottom: '8%',
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
			 	margin:15,
				 textStyle: {
					 color: '#3E4956',
				 },
			 },
			 axisTick: { show: false,},
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			max: 25,
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
			 	margin:15,
				 textStyle: {
					 color: '#3E4956',
					 
				 },
			 },
			 axisTick: { show: false,},  
		}],
		series: [{
			name: '访问趋势',
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

			data: [18, 22, 13, 9, 20, 23, 17]
		}]
	};
	myChart2.setOption(option2);


	var myChart3 = echarts.init(document.getElementById('bar1'));
	var option3 = {
		color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'5%',
				left: '-10',
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
				},
				{
					name:'',
					type:'line',
					
					data:[160, 160, 160, 120, 80,80,80,80,80,80, ],
					symbol:'rect',
					symbolSize:2,
					itemStyle: {
		                normal: {
		                	color:'#f1c40f',
		                    lineStyle: {
		                        width: 2,
		                        type:'dashed',

		                    }
		            	},
		            },
				}
			]
	};
	myChart3.setOption(option3);

	var myChart4 = echarts.init(document.getElementById('bar2'));
	var option4 = {
		color: ['#35a2ff'],
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'5%',
				left: '-10',
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
					data : ['设备类型1', '设备类型2', '设备类型3', '设备类型4', '设备类型5', '设备类型6', '设备类型7', '设备类型8', '设备类型9', '设备类型10'],				
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
				},
				{
					name:'',
					type:'line',
					
					data:[160, 160, 160, 120, 80,80,80,80,80,80, ],
					symbol:'rect',
					symbolSize:2,
					itemStyle: {
		                normal: {
		                	color:'#f1c40f',
		                    lineStyle: {
		                        width: 2,
		                        type:'dashed',

		                    }
		            	},
		            },
				}
			]
	};
	myChart4.setOption(option4);

	var myChart5 = echarts.init(document.getElementById('radar1'));
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
	        
	        data : [
	            {
	                value : [1350, 1169, 1200, 810,659 ],
	                name : '',
	                label:{
	                	normal:{show:false}
	                },
	                itemStyle: {
		                normal: {color: '#82d075'}
		            },
		            areaStyle: {
		                normal: {opacity: 0.75}
		            },
	            },
	            {
	                value : [1350, 900, 1100, 210, 900],
	                name : '',
	                label:{
	                	normal:{show:false}
	                },
	                itemStyle: {
		                normal: {color: '#1abc9c'}
		            },
		            areaStyle: {
		                normal: {opacity: 0.75}
		            },
	            },
	        ],
	    }]
	};
 	myChart5.setOption(option5);

 	var myChart6 = echarts.init(document.getElementById('radar2'));
	var option6 = {
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
	        name: '操作行为基准',
	        type: 'radar',
	        symbol: 'circle',
	        symbolSize:4,
	        
	        data : [
	            {
	                value : [1350, 1169, 1200, 810,659 ],
	                name : '',
	                label:{
	                	normal:{show:false}
	                },
	                itemStyle: {
		                normal: {color: '#82d075'}
		            },
		            areaStyle: {
		                normal: {opacity: 0.75}
		            },
	            },
	            {
	                value : [1350, 900, 1100, 210, 900],
	                name : '',
	                label:{
	                	normal:{show:false}
	                },
	                itemStyle: {
		                normal: {color: '#5e4ef6'}
		            },
		            areaStyle: {
		                normal: {opacity: 0.75}
		            },
	            },
	        ],
	    }]
	};
 	myChart6.setOption(option6);

	window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
	myChart3.resize();
	myChart4.resize();
	myChart5.resize();
	myChart6.resize();
};
	 	

}); //ready结束