function drawPie1($value) {
	// flume环形饼图01
	require.config({
		paths : {
			'echarts' : 'resource/js/js'
		}
	});
	require([ 'echarts', 'echarts/theme/shine', 'echarts/chart/pie' ],
			function(ec, theme) {
				var myChart = ec.init(document.getElementById('flowDayPieA'),
						theme);

				var option = {
					color : [ '#5ab1ef', '#febd0f', '#f57e85', ],
					tooltip : {
						show : false,
						trigger : 'item',
						formatter : "{a} <br/>{b} : {c} ({d}%)",
					},

					calculable : false,
					series : [ {
						name : '访问来源',
						type : 'pie',
						center : [ '50%', '48%' ],
						radius : [ '50%', '65%' ],
						itemStyle : {
							normal : {
								borderWidth : 0,
								label : {
									show : false
								},
								labelLine : {
									show : false
								}
							},
							emphasis : {
								label : {
									show : true,
									position : 'center',
									formatter : "{b} :\n{c}\n({d}%)",
									textStyle : {
										fontSize : '18',
									}
								}
							}
						},
						data : [ {
							value : $value[0],
							name : '运行'
						}, {
							value : $value[1],
							name : '停止'
						}, {
							value : $value[2],
							name : '异常'
						}, ]
					} ]
				};
				myChart.setOption(option);
			});

	$("#flowDayPieA").hover(function() {
		$(this).prev(".pieOutBox dl").hide();
	}, function() {
		$(this).prev(".pieOutBox dl").show();
	});// flume结束
}
function drawPie2($value) {
	// dp环形饼图02
	require.config({
		paths : {
			'echarts' : 'resource/js/js'
		}
	});
	require([ 'echarts', 'echarts/theme/shine', 'echarts/chart/pie' ],
			function(ec, theme) {
				var myChart = ec.init(document.getElementById('flowDayPieB'),
						theme);

				var option = {
					color : [ '#5ab1ef', '#febd0f', '#f57e85', ],
					tooltip : {
						show : false,
						trigger : 'item',
						formatter : "{a} <br/>{b} : {c} ({d}%)",
					},

					calculable : false,
					series : [ {
						name : '访问来源',
						type : 'pie',
						center : [ '50%', '48%' ],
						radius : [ '50%', '65%' ],
						itemStyle : {
							normal : {
								borderWidth : 0,
								label : {
									show : false
								},
								labelLine : {
									show : false
								}
							},
							emphasis : {
								label : {
									show : true,
									position : 'center',
									formatter : "{b} :\n{c}\n({d}%)",
									textStyle : {
										fontSize : '18',
									}
								}
							}
						},
						data : [ {
							value : $value[0],
							name : '运行'
						}, {
							value : $value[1],
							name : '停止'
						}, {
							value : $value[2],
							name : '异常'
						}, ]
					} ]
				};
				myChart.setOption(option);
			});

	$("#flowDayPieB").hover(function() {
		$(this).prev(".pieOutBox dl").hide();
	}, function() {
		$(this).prev(".pieOutBox dl").show();
	});// dp结束
}
function drawBar($value) {
	// 统计柱状图01
	require.config({
		paths : {
			'echarts' : 'resource/js/js'
		}
	});
	require([ 'echarts', 'echarts/theme/shine', 'echarts/chart/bar' ],
			function(ec, theme) {
				var myChart = ec.init(document.getElementById('flowDayBarA'),
						theme);
				var option = {
					title : {
						x : 'center',
					},
					tooltip : {
						trigger : 'item',
						axisPointer : { // 坐标轴指示器，坐标轴触发有效
							type : 'shadow' // 默认为直线，可选为：'line'或'shadow'
						},
						textStyle : {
							fontSize : 15,
						}
					},
					calculable : true,
					grid : {
						x : 21,
						y : 40,
						x2 : 21,
						y2 : 42,
						borderWidth : 1,
						borderColor : '#e0dfdf',
					},
					xAxis : [ {
						type : 'category',
						show : true,
						data : [ '采集量', '处理量' ],

						splitLine : {
							lineStyle : {
								color : '#e0dfdf'
							}
						},
						axisLabel : {
							textStyle : {
								color : "#666",
								fontSize : 12,
							},
						},

					} ],
					yAxis : [ {
						type : 'value',
						axisLine : {
							show : false
						},
						splitNumber : 5,
						splitLine : {
							lineStyle : {
								color : '#e0dfdf'
							}
						},
						axisLabel : {
							show : false,
							textStyle : {
								color : "#666",
								fontSize : 12,
							},
						},
					} ],

					series : [ {
						name : '个数统计',
						type : 'bar',
						barWidth : 20,// 柱图宽度
						itemStyle : {
							normal : {
								color : function(params) {
									// build a color map as your need.
									var colorList = [ '#5ab1ef', '#94bd2b' ];
									return colorList[params.dataIndex];
								},
								label : {
									show : true,
									position : 'top',
									formatter : '{c}'
								}
							}
						},

						data : [ $value[0], $value[1] ],
					} ]

				};
				myChart.setOption(option);
			});// 柱状图结束
}
