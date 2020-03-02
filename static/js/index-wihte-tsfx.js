// JavaScript Document

$(document).ready(function () {
	'use strict';
	  
  /******************部门视图******************/
  var myChart1 = echarts.init(document.getElementById('SecThreatendBar'));
  var option1 = {
		color: ['#0065BA', '#028BFF', '#12CBF6'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'shadow' }
		},
		legend: {
			top:'18',
			left:'10',
			itemWidth:10,
			itemHeight:10,
			itemGap:25,
			textStyle: {color: '#3E4956',fontSize: 12,},
			data: [
				{name: '有害程序',icon: 'circle'}, 
				{name: '网络攻击',icon: 'circle'},
				{name: '信息破坏',icon: 'circle'}
			]
		},
		grid: {
			show:true,
			top:'22%',
			left: '3%',
			right: '6%',
			bottom: '4%',
			containLabel: true,//grid 区域是否包含坐标轴的刻度标签。
		},
		xAxis: {
			type: 'value',
			min: 0,
			splitNumber: 5,
			splitLine: { //坐标轴在 grid 区域中的分隔线。
				show: true,
				lineStyle: {
					color: '#E1E3E4'
				}
			},
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
			axisTick:{ //坐标轴刻度相关设置。
				show:false,
			},


		}, 
		yAxis: {
			type: 'category',
			splitLine: { //坐标轴在 grid 区域中的分隔线。
				show: false,
				lineStyle: {
					color: '#E1E3E4'
				}
			},
			axisLine: { //坐标轴轴线相关设置。数学上的y轴
				show: true,
				lineStyle: {
					color: '#E1E3E4'
				},
			},
			axisLabel: {
				textStyle: {
					color: '#3E4956'
				},
			},
			axisTick:{ //坐标轴刻度相关设置。
				show:false,
			},
			data: ['北京分公司', '湖南分部', '总部', '丰台分公司', '海淀分公司']
		},
		series: [
			{
				name: '有害程序',
				type: 'bar',
				stack: '总量',
				barMaxWidth:'40%',
				data: [10, 23, 30, 41, 51]
			},
			{
				name: '网络攻击',
				type: 'bar',
				stack: '总量',
				barMaxWidth:'40%',
				data: [13, 25, 33, 42, 52]
			}, 
			{
				name: '信息破坏',
				type: 'bar',
				stack: '总量',
				barMaxWidth:'40%',
				data: [14, 26, 34, 44, 53]
			}

		]
  };
  myChart1.setOption(option1);
	
	    
	
  /*****************资产管理 Pie、bar、line*******************/
   var myChart2 = echarts.init(document.getElementById('flowDayPieA'));
   var option2 = {
		backgroundColor: '#ffffff',
		color: ['#028BFF', '#0065BA', '#50E3C2', '#12CBF6'],
		series: [{
			name: '访问来源',
			type: 'pie',
			center: ['40%', '60%'],
			radius: ['50%', '74%'],
			startAngle: 0, //起始角度，支持范围[0, 360]。
			itemStyle: { //图形样式
				normal: {
					borderWidth: 2,
					borderColor: '#ffffff',
				}
			},
			label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						formatter:'{d}%\n {b}',
						textStyle: {
							color:'#3E4956',
							fontSize: '14',
							fontWeight: 'bold'
						}
					}
				},
			data: [{
				value: 35,
				name: '网络设备',
				label: {
					normal: {
						position: 'center'
					}
				}
			}, {
				value: 30,
				name: '安全设备',
				label: {
					normal: {
						position: 'center'
					}
				}
			}, 
			{
				value: 24,
				name: '终端设备',
				label: {
					normal: {
						position: 'center'
					}
				}
			},
			{
			   value: 30,
				name: '应用系统',
				label: {
					normal: {
						position: 'center'
					}
				} 
			}
			]
		}]
   };
   myChart2.setOption(option2);
	
    var myChart3 = echarts.init(document.getElementById('flowDayBarA'));
    var  data=[17];
	var xMax=100;
	var option3 = {
	    tooltip: {
	        show: true,
	        formatter: "{b} {c}"
	    },
	    grid: {
	        top: 0,
	        bottom: '10',
	        left: 10,
	        right: '70'
	    },
	    xAxis: [{
	        max: xMax,
	        type: 'value',
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        },
	        axisLabel: {
	            show: false
	        },
	        splitLine: {
	            show: false
	        }
	    }],
	    yAxis: [{
	        type: 'category',
	        data: ['重要资产'],
	        nameTextStyle: {
	            color: '#f53c61',
	            fontSize: '12px'
	        },
	        axisLabel: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        }
	    }],
	    graphic: [{
	        type: 'text',
	        z: -10,
	        left: 10,
	        top: '60',
	        style: {
	            fill: '#3E4956',
	            text: '总资产：53；重要资产占：7',
	            font: 'bold 12px Microsoft YaHei'
	        }
	    }],
	    series: [
			{
	        name: ' ',
	        type: 'bar',
	        barWidth: 12,
	        silent: true,
	        itemStyle: {
	            emphasis: {
	                barBorderRadius: [4, 4, 4, 4]
	            },
	            normal: {
	                barBorderRadius: [4, 4, 4, 4],
	                color: '#ccc',
	            }
	        },
	        barGap: '-100%',
	        barCategoryGap: '20%',
	        data: data.map(function(d) {
	            return xMax;
	        }),
	    }, 
			{
	        name: ' ',
	        type: 'bar',
	        barWidth: 12,
//	        itemStyle: {
//	            //柱形图圆角，鼠标移上去效果
//	            emphasis: {
//	                barBorderRadius: [10, 10, 10, 10]
//	            },
//	            normal: {
//	                //柱形图圆角，初始化效果
//	                barBorderRadius: [10, 10, 10, 10],
//	                color: '#ccc',
//	            }
//	        },
	        label: {
	            normal: {
	                show: false,
	                position: 'right',
	                formatter: '{c}%'
	            }
	        },
	        data: [{
	            value: 7,
	            itemStyle: {
	                normal: {
	                    color: '#0065BA'
	                }
	            }
	        }]
	    }
		]
	};
    myChart3.setOption(option3);
	
	 var myChart4 = echarts.init(document.getElementById('flowDayLineA'));
	 var option4 = {
		color:['#358ED7','#4553A5','#7FC958'],
		backgroundColor: '#ffffff',
		tooltip : {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
				top:'18',
				left:'10',
				itemWidth:10,
				itemHeight:10,
				itemGap:25,
				textStyle: {color: '#3E4956',fontSize: 12,},
				data: [
					{name: '漏洞攻击',icon: 'circle'}, 
					{name: '扫描窃听',icon: 'circle'},
					{name: '拒绝服务攻击',icon: 'circle'}
				]
			},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
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
				axisTick:{ //坐标轴刻度相关设置。
					show:false,
				},
				data : ['1月','2月','3月','4月','5月','6月','7月']
			}
		],
		yAxis : [
			{
				type : 'value',
				splitLine: { //坐标轴在 grid 区域中的分隔线。
					show: true,
					lineStyle: {
						color: '#E1E3E4'
					}
				},
				axisLine: { //坐标轴轴线相关设置。数学上的y轴
					show: true,
					lineStyle: {
						color: '#E1E3E4'
					},
				},
				axisLabel: {
					textStyle: {
						color: '#3E4956'
					},
				},
				axisTick:{ //坐标轴刻度相关设置。
					show:false,
				},

			}
		],
		series : [
			{
				name:'漏洞攻击',
				type:'line',
				stack: '总量',
				smooth: true, //是否平滑曲线显示
				symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				symbolSize:8,
				itemStyle: {
					normal: {
							color: "#358ED7",  // 会设置点和线的颜色，所以需要下面定制 line
							borderColor: "#fff"  // 点边线的颜色
						}
					},
				lineStyle: {
						normal: {
							color: "#358ED7"   // 线条颜色
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
							 }], false),
				}},
				data:[120, 132, 101, 134, 90, 230, 210]
			},
			{
				name:'扫描窃听',
				type:'line',
				stack: '总量',
			   smooth: true, //是否平滑曲线显示
				symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				symbolSize:8,
				itemStyle: {
					normal: {
							color: "#4553A5",  // 会设置点和线的颜色，所以需要下面定制 line
							borderColor: "#fff"  // 点边线的颜色
						}
					},
				lineStyle: {
						normal: {
							color: "#4553A5"   // 线条颜色
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
								 color:'rgba(69,83,165,0.6)'
							 },
							  {
								 offset: 0.8,
								 color:'rgba(69,83,165,0.4)'
							 },
							 ], false),
				}},
				data:[220, 182, 191, 234, 290, 330, 310]
			},
			{
				name:'拒绝服务攻击',
				type:'line',
				stack: '总量',
				smooth: true, //是否平滑曲线显示
				symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				symbolSize:8,
				itemStyle: {
					normal: {
							color: "#7FC958",  // 会设置点和线的颜色，所以需要下面定制 line
							borderColor: "#fff"  // 点边线的颜色
						}
					},
				lineStyle: {
						normal: {
							color: "#7FC958"   // 线条颜色
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
				}},
				data:[150, 232, 201, 154, 190, 330, 410]
			}
		]
	};
	 myChart4.setOption(option4);
	
	
	
	 var myChart5 = echarts.init(document.getElementById('flowDayBarB'));
	 var option5 = {
			color: ['#1B55A5', '#00B8FF', '#FDB502'],
			legend: {
				top: '18',
				left: '10',
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 25,
				textStyle: {
					color: '#3E4956',
					fontSize: 12,
				},
				data: [
					{ name: 'Web漏洞', icon: 'circle' },
					{ name: '主机漏洞', icon: 'circle' },
					{ name: '弱口令', icon: 'circle' }
				]
			},
			tooltip: {
				trigger: "axis",
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
				splitLine: { //坐标轴在 grid 区域中的分隔线。
						show: false,
						lineStyle: {
							color: '#E1E3E4'
						}
					},
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
				axisTick:{ //坐标轴刻度相关设置。
						show:false,
					},
				data: ['数据库\n\n192.168.1.44', '网站\n\n192.168.1.56', '服务器\n\n192.168.1.89', '服务器\n\n192.168.1.71', '服务器\n\n192.168.1.55', ],
			}],
			yAxis: [{
				type: "value",
				min: 0,
				splitNumber: 4,
				splitLine: { //坐标轴在 grid 区域中的分隔线。
						show: true,
						lineStyle: {
							color: '#E1E3E4'
						}
					},
				axisLine: { //坐标轴轴线相关设置。数学上的y轴
						show: false,
						lineStyle: {
							color: '#E1E3E4'
						},
					},
				axisLabel: {
						textStyle: {
							color: '#3E4956'
						},
					},
				axisTick:{ //坐标轴刻度相关设置。
						show:false,
					},
			}],
			series: [
				{
				name: "Web漏洞",
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
				data: [40, 16, 6, 12, 11],
			}, 
			    {
				name: "主机漏洞",
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
				data: [20, 26, 18, 18, 10]
			}, 
			    {
				name: "弱口令",
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
				data: [12, 10, 18, 8, 7]
			}, ]
		};
	 myChart5.setOption(option5);
	
	
	
	
	
	 /*****************威胁视图*******************/
	 var myChart6 = echarts.init(document.getElementById('ThreatypePie'));
	 var option6 = {
		 color:['#f53c61','#ff7348','#f3ce21'],
		 tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		 },
		 series: [{
			name: '威胁类型',
			type: 'pie',
			center:['46%','50%'],
			radius: ['38%', '58%'],
			roseType : 'radius',//南丁格尔玫瑰图
			label: {
				normal: {
					textStyle:{
						fontSize:12,
						color:'#3E4956',
					}

				},
				emphasis: {
					show: true,
					textStyle: {
						color:'#fff',
						fontSize: '18',
						formatter: "{b} <br/>{a}: {c} ({d}%)"
					  //  fontWeight: 'bold'
					}
				}
			},
			data: [
			{value: 15, name: '高危'},
			{value: 30, name: '中危'}, 
			{value: 24, name: '低危'},
		  ]
		}]
	  };
	 myChart6.setOption(option6);
	
	
	var myChart7 = echarts.init(document.getElementById('flowDaylineB'));
	var option7 = {
	    tooltip : {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
				top:'0',
				left:'10',
				itemWidth:10,
				itemHeight:10,
				itemGap:25,
				textStyle: {color: '#3E4956',fontSize: 12,},
				data: [
					{name: 'Web漏洞',icon: 'circle'}, 
					{name: '主机漏洞',icon: 'circle'},
					{name: '弱口令',icon: 'circle'}
				]
			},
		grid: {
			top:'16%',
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,

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
				axisTick:{ //坐标轴刻度相关设置。
					show:false,
				},
				data : ['3.21','3.22','3.23','3.24','3.25','3.26','3.27']
			}
		],
		yAxis : [
			{
				type : 'value',
				splitLine: { //坐标轴在 grid 区域中的分隔线。
					show: true,
					lineStyle: {
						color: '#E1E3E4'
					}
				},
				axisLine: { //坐标轴轴线相关设置。数学上的y轴
					show: true,
					lineStyle: {
						color: '#E1E3E4'
					},
				},
				axisLabel: {
					textStyle: {
						color: '#3E4956'
					},
				},
				axisTick:{ //坐标轴刻度相关设置。
					show:false,
				},

			}
		],
		series : [
			{
				name:'Web漏洞',
				type:'line',
				smooth: true, //是否平滑曲线显示
				symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				symbolSize:8,
				itemStyle: {
					normal: {
							color: "#16A085",  // 会设置点和线的颜色，所以需要下面定制 line
							borderColor: "#fff"  // 点边线的颜色
						}
					},
				lineStyle: {
						normal: {
							color: "#16A085"   // 线条颜色
						}
					},
				data:[120, 132, 101, 134, 90, 230, 210]
			},
			{
				name:'主机漏洞',
				type:'line',
			    smooth: true, //是否平滑曲线显示
				symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				symbolSize:8,
				itemStyle: {
					normal: {
							color: "#2980B9",  // 会设置点和线的颜色，所以需要下面定制 line
							borderColor: "#fff"  // 点边线的颜色
						}
					},
				lineStyle: {
						normal: {
							color: "#2980B9"   // 线条颜色
						}
					},
				data:[220, 182, 191, 234, 290, 330, 310]
			},
			{
				name:'弱口令',
				type:'line',
				smooth: true, //是否平滑曲线显示
				symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				symbolSize:8,
				itemStyle: {
					normal: {
							color: "#F1C40F",  // 会设置点和线的颜色，所以需要下面定制 line
							borderColor: "#fff"  // 点边线的颜色
						}
					},
				lineStyle: {
						normal: {
							color: "#F1C40F"   // 线条颜色
						}
					},
				data:[150, 232, 201, 154, 190, 330, 410]
			}
		]
	};
     myChart7.setOption(option7);
	
	 /*****************攻击视图*******************/
	 var myChart8 = echarts.init(document.getElementById('Attackpie'));
	 var option8 = {
			backgroundColor: '#ffffff',
			color: ['#8F69C7', '#0065BA', '#028BFF', '#12CBF6','#50E3C2','#9FE060'],
					    tooltip : {
			trigger: 'item',
		},
			series: [{
				name: '攻击类型',
				type: 'pie',
				center: ['50%', '46%'],
				radius: ['40%', '60%'],
				startAngle: 0, //起始角度，支持范围[0, 360]。
				itemStyle: { //图形样式
					normal: {
						borderWidth: 4,
						borderColor: '#ffffff',
					}
				},
				labelLine:{
					normal:{
						show:true,
						length:3,
					}
				},
				label: {
					   normal: {
							textStyle:{
								fontSize:12,
								color:'#3E4956',
							}

						},
					},
				data: [
				{ value: 15, name: '其他'}, 
				{ value: 30, name: '后门\n攻击'}, 
				{ value: 24, name: '拒绝\n服务攻击' },
				{ value: 40, name: '网络扫描\n窃听'},
				{ value: 40, name: '攻击\n漏洞'}, 
				{ value: 24, name: '网络\n钓鱼'},
				]
			}]
	};
	 myChart8.setOption(option8); 
	
	
	
	 /*****************安全指数*******************/
	 var myChart16 = echarts.init(document.getElementById('bar1'));
	 var option16 = {
		title:{
		   text:'CVI',
		   subtext:'计算机病毒',
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
		series: [{
			name: '饼图一',
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
			data: [
			{
				value: 70,
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
					normal:{ color:'rgba(245,60,97,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 30,
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
	 myChart16.setOption(option16);
	  
	 var myChart17 = echarts.init(document.getElementById('bar2'));
	 var option17 = {
		title:{
		   text:'WI',
		   subtext:'蠕虫',
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
		series: [{
			name: '饼图二',
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
			data: [
			{
				value: 93,
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
					normal:{ color:'rgba(33,150,243,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 7,
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
	 myChart17.setOption(option17);

	 var myChart18 = echarts.init(document.getElementById('bar3'));
	 var option18 = {
		 title:{
		   text:'THI',
		   subtext:'特洛伊木马',
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
		 series: [{
			name: '饼图二',
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
			data: [
			{
				value: 91,
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
					normal:{ color:'rgba(33,150,243,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 9,
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
	  myChart18.setOption(option18);
	
	 var myChart19 = echarts.init(document.getElementById('bar4'));
	 var option19 = {
		 title:{
		   text:'BI',
		   subtext:'僵尸网络',
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
		 series: [{
			name: '饼图二',
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
			data: [
			{
				value: 85,
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
					normal:{ color:'rgba(60,252,168,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 15,
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
	  myChart19.setOption(option19);
	
	 var myChart20 = echarts.init(document.getElementById('bar5'));
	 var option20 = {
		 title:{
		   text:'BAI',
		   subtext:'混合攻击程序',
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
		 series: [{
			name: '饼图二',
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
			data: [
			{
				value: 87,
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
					normal:{ color:'rgba(60,252,168,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 13,
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
	  myChart20.setOption(option20);
	
	 var myChart21 = echarts.init(document.getElementById('bar6'));
	 var option21 = {
		title:{
		   text:'WBPI',
		   subtext:'网络内嵌恶意..',
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
		series: [{
			name: '饼图一',
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
			data: [
			{
				value: 70,
				name: '占比',
				label: {
					normal: {
						formatter: '{c}',
						position:'center',
						textStyle: {
							color:'#3E4956',
							fontSize: 12
						}
					}
				},
				itemStyle:{
					normal:{ color:'rgba(245,60,97,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 30,
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
	 myChart21.setOption(option21);
	
	
	 var myChart22 = echarts.init(document.getElementById('bar7'));
	 var option22 = {
		 title:{
		   text:'OMI',
		   subtext:'其他有害程序',
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
		 series: [{
			name: '饼图二',
			type: 'pie',
			radius:['50%', '56%'],
			center:['76%','40%'],
			data: [
			{
				value: 85,
				name: '占比',
				label: {
					normal: {
						formatter: '{c}',
						position:'center',
						textStyle: {
							color:'#3E4956',
							fontSize: 12
						}
					}
				},
				itemStyle:{
					normal:{ color:'rgba(33,150,243,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 15,
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
	  myChart22.setOption(option22);
	
	
	 var myChart23 = echarts.init(document.getElementById('oneli'));
	 var option23 = {
		 title:{
		   text:'有害程序',
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
				value: 82,
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
					normal:{ color:'rgba(60,252,168,1)'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 18,
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
	  myChart23.setOption(option23);
	
	
	 var myChart24 = echarts.init(document.getElementById('secli'));
	 var option24 = {
		 title:{
		   text:'网络攻击',
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
				value: 95,
				name: '占比',
				label: {
					normal: {
						formatter: '{c}',
						position:'center',
						textStyle: {
							color:'#3E4956',
							fontSize: 12
						}
					}
				},
				itemStyle:{
					normal:{ color:'#028bff'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 5,
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
	  myChart24.setOption(option24);
	
	 var myChart25 = echarts.init(document.getElementById('thrli'));
	 var option25 = {
		 title:{
		   text:'信息破坏',
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
				value: 92,
				name: '占比',
				label: {
					normal: {
						formatter: '{c}',
						position:'center',
						textStyle: {
							color:'#3E4956',
							fontSize: 12
						}
					}
				},
				itemStyle:{
					normal:{ color:'#028bff'}
				},
			  hoverAnimation: false//是否开启 hover 在扇区上的放大动画效果。
			},
			{
				value: 8,
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
	  myChart25.setOption(option25);
	
	
	
	
	
});//ready结束