var solruserinfo={'username':'root','password':'123123'};
var solrserver='/solrApp';
$(function() {
	var num;
	$('.navList').load('navlist.html', function() {
		$('.nav-main>li[id]').hover(function() {
			/* 图标向上旋转 */
			$(this).children("span").removeClass().addClass('hover-up');
			/* 下拉框出现 */
			var Obj = $(this).attr('id');
			num = Obj.substring(3, Obj.length);
			$('#box-' + num).slideDown(300);
		}, function() {
			/* 图标向下旋转 */
			$(this).children("span").removeClass().addClass('hover-down');
			/* 下拉框消失 */
			$('#box-' + num).hide();
		});
		// hidden-box hover e
		$('.hidden-box').hover(function() {
			/* 保持图标向上 */
			$('#li-' + num).addClass('hot');
			$('#li-' + num).children("span").removeClass().addClass('hover-up');
			$(this).show();

		}, function() {
			$('#li-' + num).removeClass('hot');
			$(this).slideUp(200);
			$('#li-' + num).children("span").removeClass().addClass('hover-down');
		});
		// 钻取选择
		$(".zdList li").live("click", function() {
			$(this).addClass("hot").siblings("li").removeClass();
		});

		// load datatimepicker
		$("#d_datetimepicker").load($("#d_datetimepicker").attr("data-view"), function(responseTxt, statusTxt, xhr) {
			if (statusTxt == "success") {
				//var position = $(".timeZq").position();
				$("#popdown_timerangepicker").css({
					"position" : "absolute",
					'margin-top' : '60px',
					'left' : '44px'
				})
				var $timepicker = new TimePicker(applyCallback);
				$timepicker._init();
				if ($('.edit-bg .visual_select .active').length > 1) {
					$(".edit-bg .draghandle_b .visual_select li:first").removeClass("active");
				}
			}
		});

		$("#timeZq").click(function(event) {
			event.stopPropagation();
			$('#d_datetimepicker').toggle();
		});

		$('.box_div a').click(function() {
			var $url = $(this).attr('urllink');
			var startTime = $query.getStartDateTime();
			var endTime = $query.getEndDateTime();
			var $echartType = $('.edit-bg .visual_select .active').attr('id');
			if ($echartType == undefined) {
				$echartType = "pie";
			}
			window.location.href = $url + "?startTime=" + startTime + "&endTime=" + endTime + "&echartType=" + $echartType;
		});
	})
})
/**
 * 声明一个空壳 在使用时对方法进行定义
 */
var mycharts = new Object();
var $applyCallback;
var $echartClickEvent;
var $echartDblClickEvent;
var $select_history_this = "";
var $drillDownHistory = []; //钻取字段

function applyCallback() {
	$applyCallback();
}
function echartClickEvent(param) {
	$echartClickEvent(param);
}
function echartDblClickEvent(param) {
	$echartDblClickEvent(param);
}
/**
 * baseApl 基础APL 不包括top 字段 topfield top字段 index 索引库 zField 钻取字段
 * {字段名:国际化,字段名:国际化,...} tableField 表格显示字段 {字段名:国际化,字段名:国际化,...}
 * defaultFieldvalue{字段名:default}
 */
function Report(settings) {
	settings.collectTime = settings.collectTime || "";
	var $this = this;
	this.settings = settings;

	/**
	 * 基础APL
	 */
	// this.baseApl = baseApl;
	/**
	 * 时间周期
	 */
	// this.collectTime = "";
	// /**
	// * 审计基准
	// */
	// this.auditBase = "";
	// /**
	// * 完成
	// */
	// this.field = "";
	// /**
	// * top钻取的字段
	// */
	// this.topfield = topfield;
	/**
	 * {英文名:中文名,英文名:中文名}
	 */
	// this.tableField = tableField;
	// this.defaultFieldvalue=defaultFieldvalue||{}
	// this.zField = zField;
	// this.index = index;
	$this.initBase = function() {
		var startTime = getUrlVar("startTime");
		var endTime = getUrlVar("endTime");
		var echartType = getUrlVar("echartType");
		if (startTime != undefined && endTime != undefined && startTime != "" && endTime != "") {
			$query.oppositeStart = decodeURI(startTime);
			$query.oppositeEnd = decodeURI(endTime);
			$this.settings.collectTime = "[" + $query.getStartDateTime() + " TO " + $query.getEndDateTime() + "]";
		}
		if (echartType != undefined && echartType != "") {
			echartType = echartType.split("#")[0];
			$('.edit-bg .visual_select .active').removeClass("active");
			$('.visual_select #' + echartType).addClass('active');
			$('#showView').find('span').text($.i18n.prop("pic_" + echartType));
		}
	}
	this.init = function(_type) {
		if (_type == undefined || _type == "") {
			_type = $('.edit-bg .visual_select .active').attr('id');
		}
		if (_type == undefined) {
			_type = "pie";
		}
		$this.querySelection($this.settings.baseApl + (($this.settings.collectTime == "") ? "" : " AND collectTime=" + $this.settings.collectTime) + "|top "
			+ $this.settings.topfield, _type);
	// }
	}
	this.timePickerCallback = function() {
		$this.settings.collectTime = "[" + $query.getStartDateTime() + " TO " + $query.getEndDateTime() + "]";
		$this.init();
	}
	/**
	 * 表格数据包装
	 */

	// this.zpackagingdatatabledata=$this.packagingdatatabledata
	/**
	 * 绘制表格
	 */

	/**
	 * 图表单击事件
	 */
	this.echartClickEvent = function(param) {
		var maxBatchNum = 100;
		var selectField = $(".zdList ul .hot").attr("val") || ""; // 选取钻取字段
		var selectKey = param.seriesName;
		var zField = $this.settings.zField
		for (var key in zField) {
			if (zField[key] == selectKey) {
				selectKey = key;
				break;
			}
		}
		var selectValue = param.name;
		var selectBatchNum = param.value;
		var echartType = $('.edit-bg .visual_select .active').attr('id');
		if (echartType == "scatter") {
			selectValue = param.value[0];
			selectBatchNum = param.value[1];
		} else {
			selectBatchNum = param.value;
		}
		var quetyq;
		if (selectField == "") {
			quetyq = $this.settings.baseApl + (($this.settings.collectTime == "") ? "" : " AND collectTime=" + $this.settings.collectTime) + " AND "
			+ transferField(selectKey) + "=" + transferField(selectValue);
			// $('#event_content_more').removeClass('history_none');
			// $('#event_content_more').addClass('history_none');
			if (selectBatchNum > maxBatchNum) {
				selectBatchNum = maxBatchNum;
			// $('#event_content_more').removeClass('history_none');
			}
			$this.queryEventSelection(quetyq, selectBatchNum);
		} else {

			$('.zdList li').removeClass("hot");
			$this.settings.baseApl = $this.settings.baseApl + " AND " + transferField(selectKey) + "=" + transferField(selectValue);
			$this.settings.topfield = selectField;

			$(".imgtabBox_title a .focus").nextAll().remove();
			if ($select_history_this != "") {
				//删除后面的标题，并添加新的钻取字段标题
				$drillDownHistory.splice($select_history_this.prevAll().length - 1);
				$select_history_this.nextAll().remove();
				$select_history_this = "";
			}
			var drillO = new Object();
			drillO.key = selectKey;
			drillO.value = selectValue;
			$drillDownHistory.push(drillO);

			$(".imgtabBox_title").append(
				"<span>>><a href='javascript:void(0)' apl='" + $this.settings.baseApl + "' top='" + selectField + "'>" + $this.settings.zField[selectField]
				+ "</a></span>");
			quetyq = $this.settings.baseApl + (($this.settings.collectTime == "") ? "" : " AND collectTime=" + $this.settings.collectTime) + " | top "
				+ selectField;
			var $thisType = $('.edit-bg .visual_select .active').attr('id');
			if ($thisType == undefined) {
				$thisType = "pie";
			}
			$this.querySelection(quetyq, $thisType);
		}
	}
	/**
	 * 图表双击事件
	 */
	this.echartDblClickEvent = function(param) {
		//		var selectField = $(".zdList ul .hot").attr("val") || "";
		//		var selectKey = param.seriesName;
		//		var zField = $this.settings.zField
		//		for (var key in zField) {
		//			if (zField[key] == selectKey) {
		//				selectKey = key;
		//				break;
		//			}
		//		}
		//		var selectValue = param.name;
		//		var echartType = $('.edit-bg .visual_select .active').attr('id');
		//		if (echartType == "scatter") {
		//			selectValue = param.value[0];
		//		}
		//		var quetyq = "";
		//		if (selectField == "") {
		//			quetyq = $this.settings.baseApl + (($this.settings.collectTime == "") ? "" : " AND collectTime=" + $this.settings.collectTime) + " AND "
		//			+ transferField(selectKey) + "=" + transferField(selectValue)
		//		} else {
		//			quetyq = $this.settings.baseApl + (($this.settings.collectTime == "") ? "" : " AND collectTime=" + $this.settings.collectTime) + " AND "
		//			+ transferField(selectKey) + "=" + transferField(selectValue) + " | top " + transferField(selectField);
		//		}
		//		window.location.href = "/search/main.html?q=" + escape(quetyq) + "&index=" + $this.settings.index;
	}
	/**
	 * 初始化可钻取字段
	 */
	this.initFields = function() {
		var $ul = "";
		var zField = $this.settings.zField;
		for (var key in zField) {
			$ul += "<li val='" + key + "'>" + zField[key] + "</li>";
		}
		$(".zdList ul").html($ul)
	}

	/**
	 * 单击图表,不进行钻取 刷新表格
	 */
	this.queryEventSelection = function(selection, selectBatchNum) {
		var $handelData;
		$handelData = {
			"username" : solruserinfo.username,
			"password" : solruserinfo.password,
			"queryCondition" : selection,
			"currentPage" : "" + 1,
			"batchNum" : "" + selectBatchNum,
			"type" : "event",
			"index" : $this.settings.index
		};
		ajaxPost(solrserver + "/search", $handelData, function(rs) {
			if (rs["queryResult"] == "OK") {
				// $("#startTime").text(rs["startTime"]);
				// $("#endTime").text(rs["endTime"]);
				var collums = $this.settings.tableField;
				$this.settings.queryEventSelectionCallBack(rs);
			} else {
				$("#table_sample_1").hide();
				var error_info = rs["ERRORINFO"];
				alert(error_info);
			}
		}, function() {
			// alert("浏览器无法发送请求。");
		});
	}
	/**
	 * 画图，type:图表类型 并刷新表格
	 */
	this.querySelection = function(selection, type) {
		$('.report_content').css("display", "none");
		$('.report_event_content').css("display", "none");
		container = $("#imgBar");
		container.html("<p>Loading...</p>");
		var $data = {
			"username" : solruserinfo.username,
			"password" : solruserinfo.password,
			"queryCondition" : selection,
			"currentPage" : "" + 1,
			"batchNum" : "" + 100,
			"type" : "TAB_TYPE_GRID",
			"index" : $this.settings.index
		};
		ajaxPost(solrserver + "/search", $data, function(rs) {
			if (rs["queryResult"] == "OK") {

				var name,
					yName,
					pName;
				var num = parseInt(rs["SIZE"]);
				if (rs["startTime"] != "" && rs["endTime"] != "") {
					$('.time_range').removeClass('display_none');
					$("#startTime").text(rs["startTime"]);
					$("#endTime").text(rs["endTime"]);
				}
				if (num == 0) {
					// $("#marginT_count").text("0");
					$("#error").show();
					$("#success").hide();
					$("#errorMsg").text($.i18n.prop("no_data"));
					$("#table_sample_1").hide();
				} else {
					$("#error").hide();
					$("#success").show();
					var namec = rs["STATS_TITILE"].split(",");
					name = $this.settings.zField[namec[0]];
					yName = namec[1];
					pName = namec[2];
					var length = 4;
					key = new Array();
					value = new Array();
					var percent = new Array();
					allName = new Array(length);
					allData = new Array(length);
					for (var k = 0; k < length; k++) {
						allData[k] = new Array();
					}
					for (var i = 0; i < num; i++) {
						var temp = decodeURIComponent(rs[namec[0] + "" + i].replace(/\+/g, ' '));
						if (temp != "@@##########@@") {
							key[i] = temp;
							value[i] = parseFloat(decodeURIComponent(rs[namec[1] + "" + i].replace(/\+/g, ' ')));
							percent[i] = parseFloat(decodeURIComponent(rs[namec[2] + "" + i].replace(/\+/g, ' ')));
							for (var k = 0; k < length; k++) {
								if (k == 0) {
									allName[k] = "NO";
									allData[k][i] = i + 1;
								} else {
									allName[k] = namec[k - 1].replace(/\+/g, ' ');
									allData[k][i] = decodeURIComponent(rs[namec[k - 1] + i].replace(/\+/g, ' '));
								}
							}
						}
					}

					var echartContainerId = 'imgBar';
					container.empty();
					container.width($(".imgtabBox").width() - $(".zdList").width() - 26);
					// 判断图表类型
					// 折线
					if (type == "line") {
						brokenLineChart(echartContainerId, name, yName, key, value);
					// 区域
					} else if (type == "area") {
						regionChart(echartContainerId, name, yName, key, value);
					// 列
					} else if (type == "column") {
						columnChart(echartContainerId, name, yName, key, value);
					// 栏
					} else if (type == "bar") {
						barChart(echartContainerId, name, yName, key, value);
					// 饼图
					} else if (type == "pie") {
						pieChart(echartContainerId, name, yName, key, value);
					// 散点
					} else if (type == "scatter") {
						scatterChart(echartContainerId, name, yName, key, value);
					}
					// 统计信息表格
					$("#table_sample_1").show();
					var count = rs["SIZE"];
					var data = new Array();
					var cols = rs["STATS_TITILE"].split(",");
					//加上钻取字段,捞取点击标题
					var showColNum = $drillDownHistory.length;
					if ($select_history_this != "") {
						showColNum = $select_history_this.prevAll().length - 1;
					}

					var columns = [];
					//加上钻取字段，过滤掉重复字段
					$.each($drillDownHistory, function(index, item) {
						if (index < showColNum && item.key != cols[0]) {
							if ($.inArray($this.settings.zField[item.key], columns) == -1) {
								columns.push($this.settings.zField[item.key]);
							}
						}
					});
					columns.push($this.settings.zField[cols[0]], "Count", "percent(%)");

					for (var i = 0; i < count; i++) {
						var tempObj = {
							"No" : i + 1
						};
						tempObj[$this.settings.zField[cols[0]]] = decodeURIComponent(rs[cols[0] + i].replace(/\+/g, ' '))
						tempObj["Count"] = decodeURIComponent(rs[cols[1] + i].replace(/\+/g, ' '));
						tempObj["percent(%)"] = decodeURIComponent(rs[cols[2] + i].replace(/\+/g, ' '));
						//加上钻取字段
						$.each($drillDownHistory, function(index, item) {
							if (index < showColNum && item.key != cols[0]) {
								tempObj[$this.settings.zField[item.key]] = item.value;
							}
						});
						data.push(tempObj);
					}

					initDataTables(data, columns, "facet");
				}
			// $("#marginT_count").text(num);
			// dialogDiv();// 弹出层
			} else {
				$("#table_sample_1").hide();
				var error_info = rs["ERRORINFO"];
				if (error_info == undefined) {
					error_info = rs["error"];
				}
				if (error_info.indexOf("No matched index during collectimes") >= 0) {
					$("#error").show();
					$("#success").hide();
					$("#errorMsg").text($.i18n.prop("no_data"));
					return;
				} else if (error_info.indexOf("No such index") >= 0) {
					error_info = $.i18n.prop("index_not_exsit");
				}
				$("#error").show();
				$("#success").hide();
				$("#errorMsg").text(error_info);
			}
		}, function() {
			$("#table_sample_1").hide();
			$("#error").show();
			$("#success").hide();
		});
	}
	// 
	$this.initFields();
	$echartClickEvent = $this.echartClickEvent;
	$echartDblClickEvent = $this.echartDblClickEvent
	$applyCallback = $this.timePickerCallback;
	$(".imgtabBox_title a").live("click", function() {
		$(this).addClass("focus").siblings().removeClass("focus");
		$this.settings.baseApl = $(this).attr("apl");
		$this.settings.topfield = $(this).attr("top");
		$this.init();
		$select_history_this = $(this).parent('span');
	});
	$("#chartTile").attr("apl", $this.settings.baseApl);
	$("#chartTile").attr("top", $this.settings.topfield);
	$this.initBase();
	$this.init();
}

function initDataTables(data, columns, $thisType) {
	$("#sample_1_th_tr").empty();
	var tr = "<th>No</th>";
	for (var i = 0; i < columns.length; i++) {
		tr += "<th>" + columns[i] + "</th>"
	}
	$("#sample_1_th_tr").html(tr);
	var maxLength = columns.length;
	$('#sample_1').dataTable().fnDestroy();
	var oTable = $('#sample_1').dataTable({
		"aaData" : data,
		"iDisplayLength" : 10,
		"bServerSide" : false,
		"bLengthChange" : false,
		"bDestroy" : true,
		"bSort" : false,
		"bAutoWidth" : false,
		"aLengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] // change
		// per page
		// values
		// here
		],
		"bFilter" : false,
		"sDom" : "T<'clear'>lfrtip",
		"oTableTools" : {
			"sSwfPath" : "resource/swf/copy_csv_xls_pdf.swf",
			"aButtons" : [
				{
					"sExtends" : "xls",
					"sButtonText" : "导出Excel",
					"fnCellRender" : function(sValue, iColumn, nTr, iDataIndex) {
						return sValue;
					}
				}
			]
		},
		"aoColumns" : function() {
			var ret = [ {
				"mData" : "No"
			} ];
			for (var i = 0; i < maxLength; i++) {
				ret.push({
					"mData" : columns[i]
				});
			}
			return ret;
		}(),
		"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
			if ($thisType == "event") {
				$("td:eq(" + maxLength + ")", nRow).html("<a class='fn_a_title' id='fn_a_" + aData['No'] + "' href='javascript:void(0)' title=''>" + $.i18n.prop("details") + "</a>");
			}
			return nRow;
		},
		"fnDrawCallback" : function(oSettings) {
			if ($thisType == "event") {
				for (var i = 0; i < data.length; i++) {
					$('#fn_a_' + (i + 1)).attr("title", data[i][columns[maxLength - 1]]);
				}
			}
		}
	});
}