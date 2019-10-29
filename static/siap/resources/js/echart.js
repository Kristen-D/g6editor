var echartClickFn = "";

function initConfig() {
	require.config({
		paths : {
			echarts : '../resources/lib/echart'
		}
	});
}

function getMaxy(value) {
	var length = value.length;
	var maxy = 0;
	for (var i = 0; i < length; i++) {
		if (maxy < value[i]) {
			maxy = value[i];
		}
	}
	return 1.1 * maxy;
}

// 柱状图
function columnChart(containerId, name, yName, key, value) {
	initConfig();
	// 使用
	require([ 'echarts', 'echarts/chart/bar' ], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var container = document.getElementById(containerId);
		mycharts[containerId + '_myChart'] = ec.init(container);
		var maxy = getMaxy(value);

		var option = {
			tooltip : {
				trigger : 'axis',
				show : true,
				axisPointer : {
					type : 'shadow'
				},
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				}
			},
			grid : {
				y : 10,
				y2 : 80
			},
			calculable : false,
			legend : {
				data : [ name ],
				y : 'bottom'
			},
			xAxis : [ {
				type : 'category',
				data : key,
				splitLine : {
					show : false
				},
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				}
			} ],
			yAxis : [ {
				type : 'value',
				max : maxy,
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				}
			} ],
			series : [ {
				name : name,
				type : 'bar',
				barCategoryGap : '60%',
				data : value,
				itemStyle : {
					normal : {
						color : '#7cb5ec',
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#000000'
							}
						}
					}
				}
			} ]
		};

		// 为echarts对象加载数据
		mycharts[containerId + '_myChart'].setOption(option);
		//点击事件
		var ecConfig = require('echarts/config');
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.CLICK, echartClick);
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.DBLCLICK, echartDblClick);
	});
}

// 饼图
function pieChart(containerId, name, yName, key, value) {
	var ykeytmp = new Array();
	var valuetmp = new Array();
	for (var i = 0; i < key.length; i++) {
		if (value[i] == 0) {
			continue;
		} else {
			ykeytmp.push(key[i]);
			valuetmp.push(value[i]);
		}
	}
	initConfig();
	// 使用
	require([ 'echarts', 'echarts/chart/pie' ], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var container = document.getElementById(containerId);
		mycharts[containerId + '_myChart'] = ec.init(container);

		var option = {
			tooltip : {
				trigger : 'item',
				formatter : "{b} <br/>{a} : {c} ({d}%)"
			},
			calculable : false,
			animationDuration : 100,
			animationDurationUpdate : 50,
			series : [ {
				name : name,
				type : 'pie',
				data : (function() {
					var length = ykeytmp.length;
					var data = new Array(length);
					for (var i = 0; i < length; i++) {
						var temp = {
							name : ykeytmp[i],
							value : valuetmp[i]
						}
						data[i] = temp;
					}
					return data;
				})(),
				itemStyle : {
					normal : {
						label : {
							show : true,
							formatter : '{b}: {d}%',
							textStyle : {
								color : '#000000'
							},
							labelLine : {
								show : true
							}
						}
					}
				}
			} ]
		};

		// 为echarts对象加载数据
		mycharts[containerId + '_myChart'].setOption(option);
		//点击事件
		var ecConfig = require('echarts/config');
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.CLICK, echartClick);
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.DBLCLICK, echartDblClick);
	});
}

// 折线图
function brokenLineChart(containerId, name, yName, key, value) {
	initConfig();
	// 使用
	require([ 'echarts', 'echarts/chart/line' ], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var container = document.getElementById(containerId);
		mycharts[containerId + '_myChart'] = ec.init(container);
		var maxy = getMaxy(value);

		var option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'cross'
				}
			},
			calculable : false,
			legend : {
				data : [ name ],
				y : 'bottom'
			},
			grid : {
				y : 10,
				y2 : 80
			},
			xAxis : [ {
				type : 'category',
				data : key,
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				}
			} ],
			yAxis : [ {
				type : 'value',
				max : maxy,
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				}
			} ],
			series : [ {
				name : name,
				type : 'line',
				data : value,
				itemStyle : {
					normal : {
						color : '#7cb5ec',
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#000000'
							}
						}
					}
				}
			} ]
		};

		// 为echarts对象加载数据
		mycharts[containerId + '_myChart'].setOption(option);
		//点击事件
		var ecConfig = require('echarts/config');
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.CLICK, echartClick);
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.DBLCLICK, echartDblClick);
	});
}
;

// 区域图
function regionChart(containerId, name, yName, key, value) {
	initConfig();
	// 使用
	require([ 'echarts', 'echarts/chart/line' ], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var container = document.getElementById(containerId);
		mycharts[containerId + '_myChart'] = ec.init(container);
		var maxy = getMaxy(value);

		var option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'cross'
				}
			},
			calculable : false,
			legend : {
				data : [ name ],
				y : 'bottom'
			},
			grid : {
				y : 10,
				y2 : 80
			},
			xAxis : [ {
				type : 'category',
				data : key,
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				}
			} ],
			yAxis : [ {
				type : 'value',
				max : maxy,
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				}
			} ],
			series : [ {
				name : name,
				type : 'line',
				smooth : true,
				data : value,
				itemStyle : {
					normal : {
						areaStyle : {
							type : 'default'
						},
						color : '#7cb5ec',
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#000000'
							}
						}
					}
				}
			} ]
		};

		// 为echarts对象加载数据
		mycharts[containerId + '_myChart'].setOption(option);
		//点击事件
		var ecConfig = require('echarts/config');
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.CLICK, echartClick);
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.DBLCLICK, echartDblClick);
	});
}
;

// 栏图
function barChart(containerId, name, yName, key, value) {
	initConfig();
	var maxByte = 0;
	for (var j = 0; j < key.length; j++) {
		if (maxByte < key[j].length) {
			maxByte = key[j].length;
		}
	}
	maxByte = 8 * maxByte;
	maxByte = maxByte < 80 ? maxByte + 20 : maxByte;
	// 使用
	require([ 'echarts', 'echarts/chart/bar' ], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var container = document.getElementById(containerId);
		mycharts[containerId + '_myChart'] = ec.init(container);

		var maxy = getMaxy(value);

		var option = {
			tooltip : {
				trigger : 'axis',
				show : true,
				axisPointer : {
					type : 'shadow'
				},
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				}
			},
			grid : {
				y : 10,
				y2 : 80,
				x : maxByte
			},
			calculable : false,
			legend : {
				data : [ name ],
				y : 'bottom'
			},
			xAxis : [ {
				type : 'value',
				max : maxy,
				axisLabel : {
					textStyle : {
						fontSize : '10',
						fontFamily : 'Verdana, sans-serif'
					}
				},
				axisLine : {
					show : false
				},
				splitNumber : 15
			} ],
			yAxis : [ {
				type : 'category',
				data : (function() {
					var length = key.length;
					var keyData = new Array(length);
					for (var i = 0; i < length; i++) {
						keyData[i] = key[length - i - 1];
					}
					return keyData;
				})(),
				splitLine : {
					show : false
				},
				axisLabel : {
					textStyle : {
						fontSize : '10',
						fontFamily : 'Verdana, sans-serif'
					}
				},
				axisLine : {
					show : false
				}
			} ],
			series : [ {
				name : name,
				type : 'bar',
				barCategoryGap : '50%',
				data : (function() {
					var length = value.length;
					var valueData = new Array(length);
					for (var i = 0; i < length; i++) {
						valueData[i] = value[length - i - 1];
					}
					return valueData;
				})(),
				itemStyle : {
					normal : {
						color : '#7cb5ec',
						label : {
							show : true,
							position : 'right',
							textStyle : {
								color : '#000000'
							}
						}
					}
				}
			} ]
		};

		// 为echarts对象加载数据
		mycharts[containerId + '_myChart'].setOption(option);
		//点击事件
		var ecConfig = require('echarts/config');
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.CLICK, echartClick);
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.DBLCLICK, echartDblClick);
	});
}
;

// 散点图
function scatterChart(containerId, name, yName, key, value) {
	initConfig();
	// 使用
	require([ 'echarts', 'echarts/chart/scatter' ], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var container = document.getElementById(containerId);
		mycharts[containerId + '_myChart'] = ec.init(container);
		var maxy = getMaxy(value);

		var option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'cross'
				},
				formatter : function(params) {
					if (params[0].value.length > 1) {
						return params[0].seriesName + '<br/>'
							+ params[0].value[0] + ': '
							+ params[0].value[1];
					} else {
						return params[0].seriesName + '<br/>' + params[0].name
							+ ': ' + params[0].value;
					}
				}
			},
			calculable : false,
			legend : {
				data : [ name ],
				y : 'bottom'
			},
			grid : {
				y : 10,
				y2 : 80
			},
			xAxis : [ {
				type : 'category',
				data : key,
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				}
			} ],
			yAxis : [ {
				type : 'value',
				max : maxy,
				axisLabel : {
					textStyle : {
						fontSize : '10'
					}
				},
				axisLine : {
					show : false
				}
			} ],
			series : [ {
				name : name,
				type : 'scatter',
				data : (function() {
					var length = key.length;
					var data = new Array(length);
					for (var i = 0; i < length; i++) {
						data[i] = [ key[i], value[i] ];
					}
					return data;
				})(),
				itemStyle : {
					normal : {
						color : '#7cb5ec',
						label : {
							show : true,
							position : 'top',
							textStyle : {
								color : '#000000'
							},
							formatter : function(params) {
								if (params.value.length > 1) {
									return params.value[1];
								} else {
									return params.value;
								}
							}
						}
					}
				}
			} ]
		};

		// 为echarts对象加载数据
		mycharts[containerId + '_myChart'].setOption(option);
		//点击事件
		var ecConfig = require('echarts/config');
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.CLICK, echartClick);
		mycharts[containerId + '_myChart'].on(ecConfig.EVENT.DBLCLICK, echartDblClick);
	});
}
;

function echartClick(param) {
	if (echartClickFn != "") {
		clearTimeout(echartClickFn);
	}
	echartClickFn = setTimeout(function() {
		echartClickEvent(param);
	}, 300);
}
function echartDblClick(param) {
	clearTimeout(echartClickFn);
	echartDblClickEvent(param);
}