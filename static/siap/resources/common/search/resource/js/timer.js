var drawmethodid = -1;
// 右边界
function draw(s, e, con, idx) {
	var sDate = new Date(Date.parse(s.replace(/-/g, "/")));
	var eDate = new Date(Date.parse(e.replace(/-/g, "/")));
	var gap = checkDateDiff(sDate, eDate);

	var data2 = {
		"handler" : "SynHandler",
		"queryCondition" : $con_abs + " AND collectTime:[" + s + " TO " + e + "}" + "|dategap collectTime " + s + "/" + gap + " " + e + "+1" + gap + "-1SECOND" + "/" + gap + " +1" + gap,
		"currentPage" : "" + 1,
		"batchNum" : "0",
		"type" : "TAB_TYPE_GRID",
		"index" : idx
	};
	ajaxPost("/felix", data2, function(rs) {
		if (rs["queryResult"] == "OK") {
			$('#search').parent().addClass("s_input_bg");
			$('#search').parent().removeClass("g_input_bg");
			$('#search').removeClass("g_search_button");
			$('#time_bar').css('display', 'block');
			// 时间轴

			drawecharts(rs, $search_index, s, e, gap);

			// if (!(isFirefox = navigator.userAgent.indexOf("Firefox") > 0)) {
			window.onresize = function() {
				drawecharts(rs, $search_index, s, e, gap);
				// };
			}
		} else {
			$('#search').parent().addClass("s_input_bg");
			$('#search').parent().removeClass("g_input_bg");
			$('#search').removeClass("g_search_button");
			alert("Timeline error");
		}
	}, function() {
		$('#search').parent().addClass("s_input_bg");
		$('#search').parent().removeClass("g_input_bg");
		$('#search').removeClass("g_search_button");
		alert("时间轴查询超时");
	});

	$("#tab-events").css("display", "block");
	var $selectObj = document.getElementById('time_bar');
}

function drawecharts(rs, index, s, e, gap) {
	$("#tab-events").css("display", "block");
	var $selectObj = document.getElementById('time_bar');
	var size = rs.SIZE;
	var count = new Array();
	var start = new Array();
	var end = new Array();
	var info = new Array();
	var tips = new Array();
	for (var i = 0; i < size; i++) {
		var stmp;
		var etmp;
		if (i == 0) {
			stmp = s
		} else {
			stmp = decodeURIComponent(rs["collectTime" + i].replace(/\+/g, " ")).replace(/\//g, "-").replace("T", " ").replace("Z", "");
		}
		if (i == size - 1) {
			etmp = e;
		} else {
			etmp = decodeURIComponent(rs["collectTime" + (i + 1)].replace(/\+/g, " ")).replace(/\//g, "-").replace("T", " ").replace("Z", "");
		}
		start.push(stmp);
		end.push(etmp);
		count.push(rs["Count(collectTime)" + i]);
		tips.push(stmp + "--" + etmp)
		info.push(s);
		info.push(e);
		info.push(size + gap);
	}
	drawBar($selectObj, tips, count, start, end, index, info)
}

function clickTooltip(num, date, searchStart, searchEnd, index) {
	var usertable = document.getElementById("usertabList");
	var userDiv = document.getElementById("userDiv");
	if (num == 0) {
		var $timeRange;
		if (timezone == "GMT") {
			$timeRange = ('搜索事件数: 0(时间范围:' + searchStart + '--' + searchEnd + ')').replace(/\//g, "-");
		} else {
			$timeRange = '搜索事件数: 0(时间范围:' + searchStart + '--' + searchEnd + ' )';
		}
		$("#search_main_num").text($timeRange);
		$('#search_main_time').text("");
		usertable.style.display = "none";
		userDiv.style.display = "block";
	} else {
		userDiv.style.display = "none";
		usertable.style.display = '';
		var con = $("#queryCon").val();
		var start_time = new Date();
		var data = {
			"handler" : "SearchHandler",
			"queryCondition" : $con_abs + " AND collectTime:[" + searchStart + " TO " + searchEnd + "}",
			"currentPage" : "" + 1,
			"batchNum" : "" + $pageSize,
			"type" : "event",
			"index" : index
		};
		ajaxPost("/felix", data, function(rs) {
			if (rs["queryResult"] == "OK") {
				var totalNum = rs["totalNum"];
				var batchNum = rs["batchNum"];
				for (var i = 0; i < rs["SIZE"]; i++) {
					rs["TIME" + i] = decodeURIComponent(rs["TIME" + i]).replace(/\+/g, ' ');
					rs["MAIN" + i] = decodeURIComponent(rs["MAIN" + i]).replace(/\+/g, ' ');
					rs["CONTENT" + i] = decodeURIComponent(rs["CONTENT" + i]).replace(/\+/g, ' ');
				}

				var $timeRange = '';
				if (searchStart != "" || searchEnd != "") {
					if (timezone == "GMT") {
						$timeRange = ('(时间范围:' + searchStart + '--' + searchEnd + ')').replace(/\//g, "-");
					} else {
						$timeRange = '(时间范围:' + searchStart + '--' + searchEnd + ')';
					}
				}
				$("#search_main_num").text('搜索事件数:' + (totalNum == null ? "0" : totalNum) + $timeRange);
				$('#search_main_time').text("");
				// 请求
//				$pageQuery._pageQuery();
				$('#tab-container').easytabs('select', '#tab-events');
				// 分页
				$pageQuery._paging(totalNum, batchNum, 1);
				if (totalNum < 11) {
					$('.float_right').css("display", 'none');
				}
				$progressbar._setValue(100);
				// 隔一秒后执行
				setTimeout(function() {
					$progressbar._hide();
					$progressbar._setValue(0);
				}, 1000);
				$bk = rs;
				// 清空
				new Clear()._clear();
				// 换行
				textWrap();
				// 显示
				// 字段置空
				$fields = new Array();
				currDate = searchStart;
				currEndDate = searchEnd;
				new Display(rs, tabletype)._display();

			} else {
				alert($.i18n.prop('query_queryfail'));
			}
			var end_time = new Date();
			$spend_time = end_time.getTime() - start_time.getTime();
			$('#search_main_time').text("搜索用时:" + $spend_time + "毫秒");
		}, function() {
			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
		});
	}
}
/**
 * 
 * @param $selectObj
 *            画图的div htmldocument
 * @param x
 *            轴 Array
 * @param y
 *            轴 Array
 * @param searchStart
 *            String[] 开始时间
 * @param searchEnd
 *            String[] 结束时间
 * @param index
 *            索引 String
 * @param info
 *            下方提示 String[]
 */


function drawBar($selectObj, x, y, searchStart, searchEnd, index, info) {
	// 空白柱状图，用于触发空白处鼠标事件
	var ymax = Math.max.apply(null, y);
	var y1 = new Array();
	for (var i = 0; i < y.length; i++) {
		y1.push(ymax - y[i]);
	}
	require.config({
		paths : {
			echarts : '/resource/lib/echart/'
		}
	});
	require([ 'echarts', 'echarts/chart/bar' ], function(ec) {
		var myChart = ec.init($selectObj);
		var option = {
			title : {
				show : false
			},
			animation : false,
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'none'
				},
				formatter : '<div style="text-align:center">{c1} events <br />{b}</div>'
			},
			// calculable : true,
			xAxis : [ {
				type : 'category',
				data : x,
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				},
				axisLabel : {
					show : false,
					interval : function() {
						return false;
					}
				}
			} ],
			yAxis : [ {
				type : 'value',
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				},
				axisLabel : {
					show : false
				}
			} ],
			grid : {
				borderWidth : 0,
				x : '10px',
				y : 0,
				x2 : '10px',
				y2 : '24px'
			},
			series : [ {
				barCategoryGap : 0,
				type : 'bar',
				data : y,
				stack : "y",
				itemStyle : {
					normal : {
						color : '#ce6f00'
					}
				}
			}, {
				type : 'bar',
				stack : "y",
				itemStyle : {
					normal : {
						barBorderColor : 'rgba(0,0,0,0)',
						color : 'rgba(0,0,0,0)'
					},
					emphasis : {
						barBorderColor : 'rgba(0,0,0,0)',
						color : 'rgba(0,0,0,0)'
					}
				},
				data : y1
			} ]
		};
		myChart.setOption(option);
		$("#tips_left").text(info[0]);
		$("#tips_right").text(info[1]);
		$("#tips_center").text(info[2]);
		var ecConfig = require('echarts/config');
		function eConsole(param) {
			var i = param.dataIndex;
			if (typeof param.dataIndex != 'undefined') {
				clickTooltip(y[i], x[i], searchStart[i], searchEnd[i], index);
			}
		}
		function eConsoleDB(param) {
			var i = param.dataIndex;
			if (y[i] != 0) {
				draw(searchStart[i], searchEnd[i], $con_abs, index);
			}
		}
		function eConsolemouseover() {
			$("#tips").css("display", "block");
		}
		function eConsolemouseout() {
			$("#tips").css("display", "none");
		}
		;
		myChart.on(ecConfig.EVENT.CLICK, eConsole);
		myChart.on(ecConfig.EVENT.DBLCLICK, eConsoleDB);
		$("#time_bar").mouseover(eConsolemouseover);
		$("#time_bar").mouseout(eConsolemouseout);
	});
}
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

	str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
	str = str.replace(/M/g, this.getMonth());

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;
}
// +---------------------------------------------------
// | 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
// +---------------------------------------------------
Date.prototype.DateDiff = function(strInterval, dtEnd) {
	var dtStart = this;
	if (typeof dtEnd == 'string')// 如果是字符串转换为日期型
	{
		dtEnd = StringToDate(dtEnd);
	}
	switch (strInterval) {
	case 's':
		return parseInt((dtEnd - dtStart) / 1000);
	case 'n':
		return parseInt((dtEnd - dtStart) / 60000);
	case 'h':
		return parseInt((dtEnd - dtStart) / 3600000);
	case 'd':
		return parseInt((dtEnd - dtStart) / 86400000);
	case 'w':
		return parseInt((dtEnd - dtStart) / (86400000 * 7));
	case 'm':
		return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
	case 'y':
		return dtEnd.getFullYear() - dtStart.getFullYear();
	}
}
Date.prototype.toString = function(showWeek) {
	var myDate = this;
	var str = myDate.Format("yyyy-MM-DD hh:mm:ss")
			+ "."
			+ (myDate.getMilliseconds() < 10 ? "00" + myDate.getMilliseconds() : myDate.getMilliseconds() < 100 ? "0" + myDate.getMilliseconds() : myDate
					.getMilliseconds())
	if (showWeek) {
		var Week = [ '日', '一', '二', '三', '四', '五', '六' ];
		str += ' 星期' + Week[myDate.getDay()];
	}
	return str;
}
// | 日期计算

Date.prototype.DateAdd = function(strInterval, Number) {
	var dtTmp = this;
	switch (strInterval) {
	case 'ms':
		return new Date(Date.parse(dtTmp) + Number);
	case 's':
		return new Date(Date.parse(dtTmp) + (1000 * Number));
	case 'n':
		return new Date(Date.parse(dtTmp) + (60000 * Number));
	case 'h':
		return new Date(Date.parse(dtTmp) + (3600000 * Number));
	case 'd':
		return new Date(Date.parse(dtTmp) + (86400000 * Number));
	case 'w':
		return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
	case 'q':
		return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds(), dtTmp
				.getMilliseconds());
	case 'm':
		return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds(), dtTmp
				.getMilliseconds());
	case 'y':
		return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds(), dtTmp
				.getMilliseconds());
	}
}
function checkDateDiff(sDate, eDate) {
	var sDatetmp =new Date(sDate.getTime());
	var eDatetmp =new Date(eDate.getTime());
	sDatetmp.setMilliseconds(0);
	eDatetmp.setMilliseconds(0);
	if (sDate.DateDiff("s", eDate) < 24 * 12) {
		return "SECOND"
	}
	sDatetmp.setSeconds(0);
	eDatetmp.setSeconds(0);
	if (sDate.DateDiff("n", eDate) < 24 * 12) {
		return "MINUTE"
	} 
	sDatetmp.setMinutes(0);
	eDatetmp.setMinutes(0);
	if (sDate.DateDiff("h", eDate) < 24 * 12) {
		return "HOUR"
	} 
	sDatetmp.setHours(0);
	eDatetmp.setHours(0);
	if (sDate.DateDiff("d", eDate) < 24 * 12) {
		return "DAY"
	} 
	sDatetmp.setDate(1)
	eDatetmp.setDate(1)
	if (sDate.DateDiff("m", eDate) < 24 * 12) {
		return "MONTH"
	}
	return "YEAR"
}