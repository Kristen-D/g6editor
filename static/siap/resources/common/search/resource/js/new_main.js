var myErrorInfo="";
var mycharts=new Object();
//用来存储rs数据
var $rsData = null;
var $paking = {
		start : 0,
		row : 1000
};
var $snum = 10;
var $selected_fields = new Array();
//rs对象
var Rs = function (){
	this.prev=0;
	this.curr=0;
	this._init = function(){
		
		this.prev=0;
		this.curr=0;
	};
};	
//first对象
var First = function (){
	this.is_first = true;
	this.is_first_data = false;
	this._init = function (){
		this.is_first = true;
		this.is_first_data = false;
	};
};
var $con;
var $con_abs; //包含 绝对时间 ,翻页用
var predistance=0;
var $tempRS;
var $time_task;
var $commands = "";
var $bk;
var $push_data_function;
var $push_data;
var $push_data_boolean = "";
var statsCount = 0;
var currDate="";
var currEndDate="";
var $default_index;
var $startTime="";//事件开始时间
var $endTime="";//事件 结束时间
var $getDataTime="";
var $begin_time;//任务开始时间
var $end_time;//任务结束时间
var $spend_time;//任务耗时
var $search_index;
var $auth="";
var $startTime_abs=""; // 时间轴查询开始终止时间
var $endTime_abs="";
// 分页
var pageDeliver;
// 全量content
var full_Content;
//任务管理器对象
var TaskManager = function(){
	var $start = "";
	var $square = "";
	var $squareOver = "";
	var $end = "";
	var $endOver = "";
	this._init = function(){
		$start = $("#task_start");
		$square = $("#task_square");
		$squareOver = $("#task_square_over");
		$end = $("#task_end");
		$endOver = $("#task_end_over");
		this._initEvent(this._start,this._square,this._end);
	};
	this._start = function(){
		$start.hide();
		$square.show();
		$squareOver.hide();
		$endOver.hide();
		$end.show();
	};
	this._square = function(){
		$start.show();
		$end.show();
		$square.hide();
		$squareOver.hide();
		$endOver.hide();
	};
	this._end = function (){
		$start.hide();
		$square.hide();
		$end.hide();
		$squareOver.show();
		$endOver.show();
	};
	this._initEvent = function (startClick,squareClick,endClick){
		$square.click(function(){squareClickFunction(squareClick)});
		$start.click(function(){startClickFunction(startClick)});
		$end.click(function(){endClickFunction(endClick)});
	};
	function squareClickFunction(squareClick){
		squareClick();
		if($time_task != undefined){
			clearInterval($time_task);
		}
		if($push_data_function != undefined){
			clearInterval($push_data_function);
		}
		doAction("pause");
	};
	function startClickFunction(startClick){
		startClick();
		$time_task=setInterval(function(){
			if($progressbar._getValue()<90){
				$progressbar._setValue($progressbar._getValue()+1);
			}
		},2000);
		/*$push_data_function=setInterval(function(){
			var $push_data = {"handler":"PushDataHandler", "task_id":$push_data_boolean};
			ajaxPost("/felix", $push_data, function(ks) {
				if(ks["rx"] == 0){
					clearInterval($push_data_function);
					$push_data_boolean = "";
					getDataSuccess();
				}else{
					$bk = ks;
					$loadTab2._init($tabStatistics,ks);
				}
			},function() {
				alert("error");
			});
		},1000);*/
		var $push_data = {"handler":"PushDataHandler", "task_id":$push_data_boolean};
		pushData($push_data_boolean,$push_data);
		doAction("restart");
	};
	function endClickFunction(endClick){
		endClick();
		//清除时钟
		if($time_task != undefined){
			clearInterval($time_task);
		}
		if($push_data_function != undefined){
			clearInterval($push_data_function);
		}
		$progressbar._setValue(0);
		$progressbar._hide();
		doAction("stop");
	};
	//向后台发送命令
	function doAction($str){
		var param = {"handler":"ControlTaskHandler", "type": $str,"task_id" :$push_data_boolean};
		ajaxPost("/felix", param, function(rs) {
			//success
		},function() {
			alert("查询超时");
		});
	}
	
};
var $taskManager = new TaskManager();
//对话框对象
var Dialog = function(){
	this._open = function (container){
		easyDialog.open({
			container : container
			});
	};
	this._close = function (){
		easyDialog.close();
	};
};
//进度条对象
var Progressbar = function (){
	this._init = function (){
    	 $( "#progressbar" ).progressbar({
    		 value: 0
    	  });
	};
	//显示进度条
	this._show = function (){
		$("#progressbar").show();
	};
	this._hide = function (){
		$("#progressbar").hide();
	};
	//为进度条赋值
	this._setValue = function (value){
		$("#progressbar").progressbar("option","value",value);
	};
	this._getValue = function (){
		return $("#progressbar").progressbar("value");
	};
};
//插入历史
var History = function (){
	this._insertHistory = function (currentPage){
		var url = "main.html?q="+$("#queryCon").val() +"&index="+$search_index+ "&pageindex="+currentPage+"&startdatetime="+$query.startDateTime+"&enddatetime="+$query.endDateTime+"&auth="+$auth;
		this._history("query", url, "1");
	};
	this._history = function (title, url, othervalue){
		var state = {
			    title: title,
			    url: url,
			    otherkey: othervalue
			};
/*		if(!(navigator.userAgent.indexOf("MSIE 8.0")>0||navigator.userAgent.indexOf("MSIE 9.0")>0)){
			window.history.pushState(state, document.title, url);
		}*/
	};
};
var $history = new History();
//clear对象
var Clear = function(){
	this._clear = function (){
		$f._initFields();
		initTable();
	};
};
//display对象
var Display = function(rs,tabletype){
		this._display = function (){
			$f._displayFields(rs);
			rs_table =rs;
			displayTable($selected_fields, rs,tabletype);
		};
};
var $first = new First();
var $progressbar = new Progressbar();
var $pageSize=10;
var cookie_pagesizs=$cookie._getCookie("pageSize");
if(""!=cookie_pagesizs&&null!=cookie_pagesizs&&undefined!=cookie_pagesizs){
	$pageSize=cookie_pagesizs;
}
var tabletype="table_type_list";//默认表格类型为列表
var emptyFlag=true;//点导出是否清空input框参数
var stopExportFlag=false;//是否终止任务
//分页对象
var PageQuery = function (){
	
	var currentPage;
	this.totalNum = $pageSize;
	this.batchNum = $pageSize;
	this._pageQuery = function (){
		this._initPrev();
		this._initNext();
		this._initCurr();
		this._pageSize();
		this._tableType();
		this._export();
	};
	this._initPrev= function (){
		$(".page_pre").click(function() {
			var currentPage = parseInt(_getCurrentPage()) - 1;
			if (currentPage >= 1) {
				$begin_time=new Date();
				_queryPaging(currentPage);
				$history._insertHistory(currentPage);
				$progressbar._show();
				$end_time=new Date();
				$spend_time=$end_time.getTime()-$begin_time.getTime();
				$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
			}
		});
	};
	this._initNext = function (){
		$(".page_next").click(function() {
			var currentPage = parseInt(_getCurrentPage()) + 1;
			if (currentPage <=  parseInt($bk["pageCount"])) {
				$begin_time=new Date();
				_queryPaging(currentPage);
				$history._insertHistory(currentPage);
				$progressbar._show();
				$end_time=new Date();
				$spend_time=$end_time.getTime()-$begin_time.getTime();
				$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
			}
		});
	};
	this._initCurr = function (){
		for(var i=1;i<=10;i++){
			$(".page_"+i).click(function() {
				$begin_time=new Date();
				var currentPage = $(this).text();
				_queryPaging(currentPage);
				$history._insertHistory(currentPage);
				$progressbar._show();
				$end_time=new Date();
				$spend_time=$end_time.getTime()-$begin_time.getTime();
				$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
			});
		}
	};
	this._paging = function (totalNum, batchNum, currentPage){
			var page = new Pagination(totalNum, batchNum, currentPage);
			var pageCount = page.pageCount();
			$bk["pageCount"] = pageCount;
			editPagingBar(pageCount, currentPage);
	};
	
	//事件分页自动化
	this._pageSize=function(){
		$(".usertable_perpagecount").click(function(event) {
			var offset = $(this).offset();
			 $('.editor-table_size').css({
				 "top": offset.top + 15 + "px",
				 "left":offset.left - 50 + "px"
			 });
			event.stopPropagation();
			$('.editor-table_type').hide();
			$('.editor-table_size').toggle();
			$('.editor-table_size li').click(function(){
				var size_id=$(this).attr('id');
				$pageSize=size_id.substr(size_id.length-2, size_id.length);
				$cookie._addCookie('pageSize', $pageSize,24*90); 
				currentpage=1;
				$begin_time=new Date();
				_queryPaging(currentpage);
				$('.editor-table_size li img').css("visibility","hidden");
				$('#'+size_id+' img').css("visibility","visible");
				$('.editor-table_size').hide();
				$('.usertable_perpagecount label').text("每页"+$pageSize+"个");
				$end_time=new Date();
				$spend_time=$end_time.getTime()-$begin_time.getTime();
				$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
			});
		});
	};
	
	//表格类型
	this._tableType=function(){
		$(".usertable_list").click(function(event) {
			var offset = $(this).offset();
			 $('.editor-table_type').css({
				 "top": offset.top + 15 + "px",
				 "left":offset.left - 65 + "px"
			 });
			event.stopPropagation();
			$('.editor-table_size').hide();
			$('.editor-table_type').toggle();
			$('.editor-table_type li').click(function(){
				var size_id=$(this).attr('id');
				$('.editor-table_type li img').css("visibility","hidden");
				$('#'+size_id+' img').css("visibility","visible");
				$('.editor-table_type').hide();
				$('.usertable_list label').text($(this).text());
				if(size_id=="table_type_list"){
					tabletype="table_type_list";
				}else{
					tabletype="table_type_original";
				}
				currentpage=1;
				$begin_time=new Date();
				_queryPaging(currentpage);
				$end_time=new Date();
				$spend_time=$end_time.getTime()-$begin_time.getTime();
				$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
			});
		});
	};
	
	this._export=function(){
		$('.usertable_export').click(function(){
			if(emptyFlag){
				stopExportFlag=false;
				$("#usertable_export_msg").removeClass("modal_i_msg");
				$("#usertable_export_msg").text("");
				$('#usertable_file_name').val('');
				$('#usertable_file_startnum').val('');
				$('#usertable_file_endnum').val('');
				$("#progress-in").css("width", "0%");
				$("#progress-val").html("0%");
			}
			
			easyDialog.open({
				container : 'usertable_export_dialog'
			});
		});
		$('.usertable_close').click(function(){
			easyDialog.close();
		});
		
		$('.usertable_modal-btn-cancel').click(function(){
			stopExportFlag=true;
			emptyFlag=true;
			easyDialog.close();
		});
		
		bindExportEvent();
	};
	
	this._pageRefresh = function (){
		var q = unescape(getUrlVar("q"));
		$search_index=getUrlVar("index");
		initSearchIndex($search_index);
		var index = q.indexOf("#");
		if (index > -1) {
			q = q.substr(0, index);
		}
		if(q == undefined || q=="undefined"){
			q = "*";
		}
		$("#queryCon").val(q);
		$con = q;
		var currentPage = getUrlVar("pageindex");
		if (currentPage != "undefined" &&  currentPage != undefined) {
			var i = currentPage.indexOf("#");
			if (i > -1) {
				currentPage = currentPage.substr(0, i);
			}
		} else {
			currentPage = 1;
		}
		//得到时间戳
		$query.oppositeStart = getUrlVar("startdatetime");
		$query.oppositeEnd = getUrlVar("enddatetime");
		$query.isStartOpposite=true;
		$query.isEndOpposite=true;
		if($query.oppositeStart==undefined){
			$query.oppositeStart="";
		}else{
			$query.oppositeStart=decodeURI($query.oppositeStart);
		}
		if($query.oppositeEnd!=undefined){
			$query.oppositeEnd=$query.oppositeEnd.split("#")[0];
			$query.oppositeEnd=decodeURI($query.oppositeEnd);
		}else{
			$query.oppositeEnd="";
		}
		$query.oppositeStart=decodeURI($query.oppositeStart);
//		if($query.endDateTime != undefined &&$query.endDateTime != "undefined"){
//			$query.endDateTime = $query.endDateTime.substr(0,10);
//			$query.startDateTime =$query.startDateTime.substr(0,10);
//			$query.endDateTime=$query.endDateTime.split("#")[0];
//		}else{
//			$query.endDateTime=0;
//		}
//		if($query.startDateTime==undefined||$query.startDateTime == "undefined"){
//			$query.startDateTime=0;
//		}
//		
//		if($query.startDateTime != "0" && $query.endDateTime!="0"){
//			//得到开始日期和结束日期
//			$query._transToDate();
//		}
		
		//加载load parent.js
		$auth = getUrlVar("auth");
		if($auth != "true"){
			$auth = "";
		} else{
			//隐藏部分组件
			$("#editorR").hide();
		}
		$history._insertHistory(currentPage);
		_query(currentPage);
	};
};
function _getCurrentPage(){
	var k=0;
	for(var i=1;i<=10;i++){
		if ($(".page_"+i).css("font-size") == "18px") {
			k=$("#page_"+i).text();
			break;
		}
	}
	return k;	
};
//实例化
var $pageQuery = new PageQuery(); 


//页面对象开始。。。。。。。。
//页面加载
var LoadTab2 = function (){
	this._init = function ($tab,rs){
		if($first.is_first){
			$("#tab").load($("#tab").attr("data-view"),  function(responseTxt,statusTxt,xhr){
			    if(statusTxt=="success") {
			    	$('#tab-container').easytabs({animate:false});
			    	keepScroll();
			    	$tab._init(rs);
			    	i18n_tab();
			    }
		      if(statusTxt=="error")
		        alert("Error: "+xhr.status+": "+xhr.statusText);
			});
			}else{
		//		$('#tab-container').easytabs();
		    	$tab._init(rs);
			}
	};
	
};
var $loadTab2 = new LoadTab2();
//加载事件的页面对象
var TabEvents = function (){
	this._init = function (rs){
		this._loadTabEvents(rs);
//		this._loadTab();
//		if(!(navigator.userAgent.indexOf("MSIE 8.0")>0)){
			this._drawTimer();
//		}
		this._scrollBarEvent();
	};
	this._loadTabEvents = function (rs){
		$("#tab-events").load($("#tab-events").attr("data-view"), function(responseTxt,statusTxt,xhr) {
    		if(statusTxt=="success") {
    			$("#usertable_perpagecount label").text("每页"+$pageSize+"个");
    			$('.editor-table_size li img').css("visibility","hidden");
    			$("#each_page_"+$pageSize+' img').css("visibility","visible");
//    			$pageSize =10; // 初始化
    			$pageQuery._pageQuery();
    			$('#tab-container').easytabs('select', '#tab-events');
				//分页
    			$pageQuery._paging($pageQuery.totalNum, $pageQuery.batchNum, 1);
 				if($pageQuery.totalNum < 11){
 					$('.float_right').css("display",'none');
 				}
 				$progressbar._setValue(100);
 				//隔一秒后执行
 				setTimeout(function(){
 					$progressbar._hide();
 					$progressbar._setValue(0);
 				},1000);
 				$bk = rs;
 				//清空
 				new Clear()._clear();
 				//换行
 				textWrap();
				//显示
 				new Display(rs,tabletype)._display();
 				//解决Firefox浏览器格式乱
 				if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
		    		$('.tabList').addClass('firefox_tabList');
		    		$('.float_format_left').addClass('firefox_format_left');
		    		$('.float_page_right').addClass('firefox_page_right');
		    		$('.float_left').addClass('ie_firefox_float_left');
 					$('.float_right').addClass('ie_firefox_float_right');
 				}else if(!!window.ActiveXObject || "ActiveXObject" in window||navigator.userAgent.indexOf("Edge")>0) {
 					$('.tabList').addClass('ie_tabList');
 					$('.float_left').addClass('ie_firefox_float_left');
 					$('.float_right').addClass('ie_firefox_float_right');
 				}
    		}
    	});
	};
	this._loadTab = function (){
		load("tab-statistics");
    	load("tab-visualization");
	};
	//画时间轴
	this._drawTimer = function (){
		var s;
		var dd = new Date();
//		dd.setTime(dd.getTime()+timeoffset);
		var year=dd.getFullYear();
		var month = dd.getMonth()+1;
		var date=dd.getDate();
		var hour=dd.getHours();
		hour =(hour<10?"0"+hour:""+hour)
		var min=dd.getMinutes();
		min =(min<10?"0"+min:""+min)
		var sec=dd.getSeconds();
		sec =(sec<10?"0"+sec:""+sec)
		if($startTime_abs == ""){
		//	s=getPreviousTime(year,month-1,date);
		//	s = year + "-" + (month<10?"0"+month:month) + "-01";
			s=year+"-"+(month<10?"0"+month:""+month)+"-"+"01 "+"00:00:00";
    	}else{
    		s=$startTime_abs.replace("T"," ").replace("Z","");
    	}
		var d;
    	if($endTime_abs == ""){
    		d=year+"-"+(month<10?"0"+month:""+month)+"-"+(date<10?"0"+date:""+date)+" "+hour+":"+min+":"+sec;
    	}else{
    		d=$endTime_abs.replace("T"," ").replace("Z","");
    	}
    	draw(s,d,$con_abs,$search_index)
	};	
	
	//滚动条事件
	this._scrollBarEvent=function(){
		$(window).scroll(function() {
			var distance = $(window).scrollTop();
			var offset_size=0;
			var offset_type=0;
			if (distance >= 277) {
				$("#float").css("display", "block");
				offset_size = $('#float_perpagecount').offset();
				offset_type = $('#float_list').offset();
				
			} else {
				$("#float").css("display", "none");
				offset_size = $('#usertable_perpagecount').offset();
				offset_type = $('#usertable_list').offset();
			}
			
			if(offset_size!=undefined){
				 $('.editor-table_size').css({
					 "top": offset_size.top + 15 + "px",
					 "left":offset_size.left - 50 + "px"
				 });
				 $('.editor-table_type').css({
					 "top": offset_type.top + 15 + "px",
					 "left":offset_type.left- 65 + "px"
				 });
			}
		});	
	};
	
};
var $tabEvents = null;
var $searchCon = {
		pre : null,
		sNum : 10,
		num : null,
		stats_title : null,
		namec : null,
		title : null
};

var $stats_pageSize=10;//选择的统计分页个数
var $rs = new Rs();
//统计处理对象
var TabStatistics = function(){

	var $visual = {
			visualcontainer : null,
			visualname : null,
			visualyName : null,
			visualkey : null,
			visualvalue : null,
			visualselect : null
		};
	this._init = function (rs){
		$searchCon.pre="stats";
		$searchCon.num = parseInt(rs["SIZE"]);
		$searchCon.stats_title = rs["STATS_TITILE"];
		$searchCon.namec=String($searchCon.stats_title).split(",");
		$stats_pageSize=10;
		this._initData(rs);
		this._initStatistics(rs);
		this._initVisualization(rs);
	};
	this._initData = function (rs){
		if($first.is_first){
				$('#tab-container').easytabs('select', '#tab-statistics');
			//	load("tab-events");
			}
			for(var i=0;i<$searchCon.num;i++){
			for(var j=0;j<$searchCon.namec.length;j++){
				rs[$searchCon.namec[j]+i]=decodeURIComponent(rs[$searchCon.namec[j]+i]).replace(/\+/g,' ');
				}
			}
	};
	this._initStatistics = function (rs){
	//	$('#search_main_time').text("");
		if($first.is_first){	
			$("#tab-statistics").load("/search/statistics/statistics.html", function(reponseTxt, statusTxt, xhr) {
					if(statusTxt=="success") {
						if(rs["rettype"]=="SYN"){
							$first.is_first=true;
							//是同步返回
							if(rs["SIZE"]==0){
								$("#stats_table").html("<p style='text-align:center'>没有符合条件的数据.</p>");
								$('.float_right').hide();	
							}else{
								getDataSuccess();
								pageUnbindClick($searchCon.pre);
								statsPagerClick(rs,$searchCon.pre,$stats_pageSize);
								if(rs["SIZE"] < 11){
									$searchCon.sNum = rs["SIZE"];
									$snum = rs["SIZE"];
								}else{
									$searchCon.sNum = 10;
									$snum = 10;
								}
								drawTable(rs);
								statsSizeClick(rs);
							}
						}else{
							//任务开始
							$taskManager._start();
							$("#stats_table").html("<p style='text-align:center'>正在加载...</p>");
						}
					}
					if(statusTxt=="error") {
				        alert("Error: "+xhr.status+": "+xhr.statusText);
					}
				});
		}else{			
		//	var $rsNum1 =  $rsData==null?0:parseInt($rsData["totalNum"]);
			var $rsNum = rs["totalNum"]==null?0:parseInt(rs["totalNum"]);
			$("#search_main_num").text('搜索事件数:' + ($rsNum));
			$end_time=new Date();
			$spend_time=$end_time.getTime()-$begin_time.getTime();
			$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
			$rs.prev=$rs.curr;
			$rs.curr=rs["SIZE"];
			if($rs.prev==0 && $rs.curr !=0){
				$('.float_right').css("display",'none');
				$progressbar._setValue(10);
				pageUnbindClick($searchCon.pre);
				statsPagerClick(rs,$searchCon.pre,$stats_pageSize);
				if(rs["SIZE"] < 11){
					$searchCon.sNum = rs["SIZE"];
					$snum = rs["SIZE"];
				}else{
					$searchCon.sNum = 10;
					$snum = 10;
				}
				drawTable(rs);
				statsSizeClick(rs);
					//进度条
					//统计类
				$time_task=setInterval(function(){
						if(rs["rx"] != 0 && $progressbar._getValue()<90){
							$progressbar._setValue($progressbar._getValue()+1);
						}
				},2000);
			}
			if($rs.prev!=0 && $rs.curr !=0){														
			$searchCon.title = $searchCon.stats_title.split(",");
//			var $currpage = 0;
//			if(rs["SIZE"]>1000){
//				if(rs["SIZE"]%1000==0){
//					$currpage = parseInt(rs["SIZE"]/1000-1)*1000/$pageSize;
//				}else{
//					$currpage = parseInt(rs["SIZE"]/1000)*1000/$pageSize;
//				}
//			}
			statsPager(rs["SIZE"],$searchCon.sNum,1,$searchCon.pre);
			$tempRS=rs;
			$("#t_tbody").empty();
			//用数组代替+操作提升效率
			var $tbody = [];
			for (var i=0; i<$searchCon.sNum; i++) {
				$tbody.push("<tr  class='table-tr-content'> <td>" + (i+1)+"</td>");
				for (var k=0; k<$searchCon.title.length; k++) {
					var t = $searchCon.title[k];
					if(rs[t + i]=="undefined"){
						$tbody.push("<td></td>");
					}else{
					//	$tbody.push("<td>" + decodeURIComponent(rs[t + i]).replace(/\+/g,' ') + "</td>");
						$tbody.push("<td>" + rs[t + i] + "</td>");
					}
				}
				$tbody.push("</tr>");
			}
			$("#t_tbody").append($tbody.join(""));
			//释放rs
			rs = null;
			initStatsTable();
			}
		}
	};
	this._initVisualization = function (rs){
	   if($first.is_first){
		$first.is_first=false;
		$("#tab-visualization").load("/search/visualization/visualization.html", function(reponseTxt, statusTxt, xhr) {
				if(statusTxt=="success") {
					if(navigator.userAgent.indexOf("MSIE 8.0") >0){
						   $("#tab_visualization").click(function(){
							   if($("#tab-visualization").css('display')=="none"){
							   		$("#tab-visualization").show();
								   setTimeout(function(){
								   detetminType($visual.visualselect);
								   }, 450);
							   }else{detetminType($visual.visualselect);}
						   });
					}
				    //统计弹窗
					var reportSearchDiff="0";
					if($query.getStartDateTime()!= "" && $query.getEndDateTime()!=""){
				    	reportSearchDiff="collectTime:[" + $query.getStartDateTime() +" TO "+$query.getEndDateTime()+"]";
					}
					clearFacetClick();
					facetReport($search_index,$query.getStartDateTime(),$query.getEndDateTime(),$startTime,$endTime,reportSearchDiff);
				   //可视化图表类型选择按钮
				    $('#chart-type').click(function(event){
						  event.stopPropagation();
						  $('.edit-bg').toggle();
					      $('#chart-type').addClass('active');
						});
				    if($searchCon.namec.length>1||!isNaN(rs[$searchCon.namec[0]+0])){
				    	visualization(rs,$searchCon.num,$searchCon.namec);
				    }else{
				   // 	unvisualization();
				    }
				}
				if(statusTxt=="error") {
			        alert("Error: "+xhr.status+": "+xhr.statusText);
				}
			});
	}else{
		 if($searchCon.namec.length>1||!isNaN(rs[$searchCon.namec[0]+0])){
		    	visualization(rs,$searchCon.num,$searchCon.namec);
		    }else{
		   // 	unvisualization();
		    }
	}
	};
	//可视化
	function visualization(rs,num,namec) {
		$(".visual_select li").click(function(){
			$visual.visualselect=$(this).attr('id');
			var inon_text=$(this).text();
			var icon_type=$("#chart-type span[class^='icon-']");
			icon_type.removeClass();
			icon_type.addClass('icon-chart-'+$visual.visualselect);
			$("#chart-type").css('width',inon_text.length*12+44);
			$("#icon-caret").css("left",inon_text.length*12+34);
			$("#icon-type-text").text(inon_text);
		    detetminType($visual.visualselect);
		});
		
		$visual.visualselect = 'pie';
        $visual.visualcontainerId='visualimg';
		$visual.visualname = namec[0];
		$visual.visualyName= namec[1];
		$visual.visualkey = new Array();
		$visual.visualvalue = new Array();
		for(var i=0;i<num;i++){
			$visual.visualvalue[i]=namec.length>1?parseFloat(rs[namec[1]+i]):parseFloat(rs[namec[0]+i]);
			$visual.visualkey[i]=namec.length>1?(rs[namec[0]+i]):(namec[0]);
			}
		
		   $('#visualimg').css('width',document.body.clientWidth+"px");
		
		//画图 
		detetminType($visual.visualselect);
	};
	
	function detetminType(visualselect){
		if(visualselect=="line"){
			//折线
			brokenLineChart($visual.visualcontainerId,$visual.visualname,$visual.visualyName,$visual.visualkey,$visual.visualvalue);
		}else if(visualselect=="area"){
			//区域
			regionChart($visual.visualcontainerId,$visual.visualname,$visual.visualyName,$visual.visualkey,$visual.visualvalue);
		}else if(visualselect=="column"){
			//列
			columnChart($visual.visualcontainerId,$visual.visualname,$visual.visualyName,$visual.visualkey,$visual.visualvalue);
		}else if(visualselect=="bar"){
			//栏
			barChart($visual.visualcontainerId,$visual.visualname,$visual.visualyName,$visual.visualkey,$visual.visualvalue);
		}else if(visualselect=="pie"){
			//饼图
			pieChart($visual.visualcontainerId,$visual.visualname,$visual.visualyName,$visual.visualkey,$visual.visualvalue);
		}else if(visualselect=="scatter"){
			//散点
			scatterChart($visual.visualcontainerId,$visual.visualname,$visual.visualyName,$visual.visualkey,$visual.visualvalue);
		}
	}
};
//统计分页自动化
function statsSizeClick(rs){
	$("#stats_table_perpagecount").click(function(event) {
		event.stopPropagation();
		$('.stats-table_size').toggle();
		});
	$('.stats-table_size li').click(function(){
		var size_id=$(this).attr('id');
		$stats_pageSize=size_id.split("_")[2];
		$pageSize=size_id.split("_")[2];
		statsCount = 0;
		$('.stats-table_size li img').css("visibility","hidden");
		$('#'+size_id+' img').css("visibility","visible");
		$('.stats-table_size').hide();
		$('#stats_table_perpagecount label').text("每页"+$stats_pageSize+"个");
		$searchCon.sNum=$stats_pageSize;
		//取消之前的事件绑定
		pageUnbindClick($searchCon.pre);
		statsPagerClick(rs,$searchCon.pre,$stats_pageSize);
		drawTable(rs);
		});
};
function drawTable(rs){
	if(parseInt(rs["SIZE"]) < parseInt($searchCon.sNum)+1){
		$searchCon.sNum = rs["SIZE"];
		$('.float_right').css("display",'none');
	}else{
		$('.float_right').css("display",'inline');
	}
//	var $currpage = 0;
//	if(rs["SIZE"]>1000){
//		if(rs["SIZE"]%1000==0){
//			$currpage = parseInt(rs["SIZE"]/1000-1)*1000/$pageSize;
//		}else{
//			$currpage = parseInt(rs["SIZE"]/1000)*1000/$pageSize;
//		}
//	}
	statsPager(rs["SIZE"],$searchCon.sNum,1,$searchCon.pre);
	tempRS=rs;
	diplayStats(rs,0,$searchCon.sNum,$searchCon.pre);
};
//页面对象结束。。。。。。。。
var $tabStatistics = null;
//query方法
function _query(currentPage){
 	$("#time_bar").css('display','none');
	//清除fields的数据
	$f._removeFields();
//	$('#search_main_time').text("");
	if($push_data_boolean != ""){
		var param = {"handler":"ControlTaskHandler", "task_id":$push_data_boolean, "type":"stop"};
		ajaxPost("/felix", param, function(rs) {
			
		},function() {
			alert("查询超时");
		});
		clearInterval($push_data_function);
		$push_data_boolean = "";
	}
	//显示进度条
	$progressbar._show();
	//得到查询条件
	$con =  $("#queryCon").val();
	if($con==""){
		$con = "*";
		$("#queryCon").val("*");
	}

	var $data;
	var reportStartTime="0";
	var reportEndTime="0";
	var reportSearchDiff="0";
//	if($query.startDate == "" || $query.endDate==""){
//		$data = {"handler":"SearchHandler", "queryCondition":$con, "currentPage":""+currentPage, "batchNum":""+10,"pakingStart":$paking.start,"pakingRow":$paking.row, "type":"event"};
//	}else{
//		$data = {"handler":"SearchHandler", "queryCondition":$con +" AND collectTime:[" + $query.startDate.replaceAll("/","-") + "T"+$query.startTime +"Z TO "+$query.endDate.replaceAll("/","-") +"T"+$query.endTime+"Z]", "currentPage":""+currentPage,"pakingStart":$paking.start,"pakingRow":$paking.row, "batchNum":""+10, "type":"event"};
//	}
	if($query.getStartDateTime() == "" || $query.getEndDateTime()==""){
		$data = {"handler":"SearchHandler", "queryCondition":$con,"currentPage":""+currentPage, "batchNum":""+$pageSize, "type":"event","index":$search_index,"highFlag":"true"};
	}else{
		var rTime="collectTime:[" + $query.getStartDateTime() +" TO "+$query.getEndDateTime()+"]";
		if($con.indexOf('|')>=0){
			var cons=$con.split("|");
			$con=cons[0]+" AND "+rTime+" | ";
			for(var t_i=1;t_i<cons.length;t_i++){
				$con+=cons[t_i];
			}
		}else{
			$con=$con+" AND "+rTime;
		}
    	reportSearchDiff=rTime;
		$data = {"handler":"SearchHandler", "queryCondition":$con, "currentPage":""+currentPage,"batchNum":""+$pageSize, "type":"event","index":$search_index,"highFlag":"true"};
	}
	//查询solr
//	$('#search_main_time').text("");
	$begin_time=new Date();
	ajaxPost("/felix", $data, function(rs) {
		if(rs["queryResult"] == "OK"){
			$pageQuery.totalNum = rs["totalNum"];
			$pageQuery.batchNum = rs["batchNum"];
				for(var i=0;i<rs["SIZE"];i++){
					rs["TIME"+i]=decodeURIComponent(rs["TIME"+i]).replace(/\+/g,' ');
					rs["MAIN"+i]=decodeURIComponent(rs["MAIN"+i]).replace(/\+/g,' ');
					rs["CONTENT"+i]=decodeURIComponent(rs["CONTENT"+i]).replace(/\+/g,' ');
 			}
				$bk = rs;
				var $timeRange="";
				if(rs["startTime"]!=""&&rs["endTime"]!=""){
					var reg=/collectTime\s*[:=]{1}\s*\[[^\[\]]*TO[^\[\]]*\]/g;
					$con_abs = $con.replace(reg, "collectTime:["+rs["startTime"]+" TO "+rs["endTime"]+"]");
					$startTime_abs = rs["startTime"];
					$endTime_abs = rs["endTime"];
					$timeRange= "时间范围:"+rs["startTime"]+"--"+rs["endTime"];
				}else{
					$con_abs =$con;
				}
				$("#search_main_num").text('搜索事件数:' + ($pageQuery.totalNum==null?"0":$pageQuery.totalNum)  + $timeRange);
				$end_time=new Date();
				$spend_time=$end_time.getTime()-$begin_time.getTime();
				$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
				if(rs["commands"] != null){
					$commands = rs["commands"];
				}
				if (rs["TYPE"] == "EVENTS") {
					//事件报表弹窗
					clearEventClick();
					eventReport($search_index,$query.getStartDateTime(),$query.getEndDateTime(),$startTime,$endTime,reportSearchDiff);
					//处理没有数据的情况
					if(rs["totalNum"] == "0"){
						$('#search').parent().addClass("s_input_bg");
						$('#search').parent().removeClass("g_input_bg");
						$('#search').removeClass("g_search_button");
						$("#d_no_data_msg").show();
						$("#d_mian_cont").hide();
						return;
					}else{
						$("#d_no_data_msg").hide();
						$("#d_mian_cont").show();
					}
					
					if($tabEvents == null){
						$tabEvents = new TabEvents();
					}
					//事件处理
					$loadTab2._init($tabEvents,rs);
				}else {
					$('#search').parent().addClass("s_input_bg");
					$('#search').parent().removeClass("g_input_bg");
					$('#search').removeClass("g_search_button");
					if($tabStatistics == null){
						$tabStatistics = new TabStatistics();
					}
					//事件处理
					$loadTab2._init($tabStatistics,rs);
					if(rs["rettype"] == "ASYN"){
						$push_data_boolean = rs["task_id"];
						$push_data = {"handler":"PushDataHandler", "task_id":$push_data_boolean};
						pushData($push_data_boolean,$push_data);
					}
					$end_time=new Date();
					$spend_time=$end_time.getTime()-$begin_time.getTime();
					$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
				}
			}else {
				$('#search').parent().addClass("s_input_bg");
				$('#search').parent().removeClass("g_input_bg");
				$('#search').removeClass("g_search_button");
				$("#search_main_num").text('搜索事件数:0');
				$end_time=new Date();
				$spend_time=$end_time.getTime()-$begin_time.getTime();
				$('#search_main_time').text("搜索用时:"+$spend_time+"毫秒");
				$("#tab-events").load($("#tab-events").attr("data-view"), function(responseTxt,statusTxt,xhr) {
		    		if(statusTxt=="success") {
		    			$("#usertable_perpagecount label").text("每页"+$pageSize+"个");
		    			$('.editor-table_size li img').css("visibility","hidden");
		    			$("#each_page_"+$pageSize+' img').css("visibility","visible");
		    			$('#tab-container').easytabs('select', '#tab-events');
		    			$("#d_no_data_msg").show();
						$("#d_mian_cont").hide();
						//事件报表弹窗
						clearEventClick();
						eventReport($search_index,$query.getStartDateTime(),$query.getEndDateTime(),$startTime,$endTime,reportSearchDiff);
		    		    
						var error_info =rs["ERRORINFO"];
						
						if(error_info.indexOf("'gap'")>=0){
							alert("dategap指令日期间隔参数格式不符合要求");
						}else if(error_info.indexOf("'end' comes before 'start'")>=0){
							alert("dategap指令起始日期大于终止日期 ");
						}else if(error_info.indexOf("No matched index during collectimes")>=0){
//							alert("当前时间范围内没有符合条件的数据");
							return;
						}else{
							//alert(error_info);
							myErrorInfo=error_info;
							var myShowInfo;
							var bool = error_info.indexOf("/solr is not avaiable!");
							if(bool>0)
							{
							   myShowInfo="<font color=\"red\">solr服务不可用\n     </font>"+"<input type=\"button\" id=\"Button1\"  style=\"border:0;\" onclick=\"showErrorAlert()\" value='查看详情' />"; 
							}
							else
							{
								myShowInfo="<font color=\"red\">APL语句错误！\n     </font>"+"<input type=\"button\" id=\"Button1\"  style=\"border:0;\" onclick=\"showErrorAlert()\" value='查看详情' />"; 
							}
							$("#search_main_num").html(myShowInfo);
						}
		    		}
		    	});
			}
	},function() {
		    $('#search').parent().addClass("s_input_bg");
			$('#search').parent().removeClass("g_input_bg");
		 	$('#search').removeClass("g_search_button");
			alert("浏览器无法发送请求。");
		});
}
function showErrorAlert(){
	alert(myErrorInfo);	
}

function pushData($push_data_boolean,$push_data){
	ajaxPost("/felix", $push_data, function(ks) {
		if(ks["rx"] == 0){
			if($push_data_function != undefined){
				clearInterval($push_data_function);
			}
			$push_data_boolean = "";
			getDataSuccess();
		}else{
			if($push_data_function != undefined){
				clearInterval($push_data_function);
			}
			$bk = ks;
			$loadTab2._init($tabStatistics,ks);
			$push_data_function=setInterval(function(){
				pushData($push_data_boolean,$push_data);
			},1000);
		}
	},function() {
		if($push_data_function != undefined){
			clearInterval($push_data_function);
		}
		alert("查询超时");
	});
}

function getDataSuccess(){
//		$rsData = combineData($rsData,$bk);
//		statsSizeClick($rsData);
//		//重新绑定事件
//		pageUnbindClick("stats");
//		statsPagerClick($rsData,"stats",$pageSize);
//		drawTable($rsData);
		$rs._init();
		//任务结束
		$taskManager._end();
		if($bk["SIZE"]=="0"){
			$("#stats_table").html("<p style='text-align:center'>没有符合条件的数据.</p>");
			$('.float_right').hide();
		}else if($bk["SIZE"]=="-1"){
			$("#stats_table").html("<p style='text-align:center'>"+$bk["ERROR"]+"</p>");
			$('.float_right').hide();
		}
		if(parseInt($bk["SIZE"])>parseInt($snum)+1){
			$('.float_right').show();
		}
		$progressbar._setValue(100);
		//终止时钟
		if($time_task != undefined){
			clearInterval($time_task);
		}
		//隔一秒后执行
		setTimeout(function(){
			$progressbar._hide();
			$progressbar._setValue(0);
		},1000);
}

//合并数据
//function combineData($old,$new){
//	if($old==null){
//		return $new;
//	}
//	$rs = new Object();
//	$rs.SIZE = parseInt($old.SIZE)+parseInt($new.SIZE);
//	$rs.totalNum = parseInt($old.SIZE)+parseInt($new.SIZE);
//	$rs.STATS_TITILE = $old.STATS_TITILE;
//	var $tempStats = $rs.STATS_TITILE.split(",");
//	$rs.TYPE = "STATS";
//	for(var i = 0;i<$old.SIZE;i++){
//		for(var j=0;j<$tempStats.length;j++){
//			$rs[$tempStats[j]+i]=$old[$tempStats[j]+i];
//		}
//	}
//	for(var i = 0;i<$new.SIZE;i++){
//		for(var j=0;j<$tempStats.length;j++){
//			$rs[$tempStats[j]+(i+$old.SIZE)]=$old[$tempStats[j]+i];
//		}
//	}
//	return $rs;
//}

//分页的query方法
function _queryPaging(currentPage) {
//	var $con_abs = $("#queryCon").val();
	var contmp =$con_abs;
	if($con_abs == ""){
		$con_abs = "*";
		$("#queryCon").val("*");
	}
	var reportStartTime="";
	var reportEndTime="";
	var reportSearchDiff="0";
	if(currDate==""){
		data = {"handler":"SynHandler", "queryCondition":$con_abs,"currentPage":""+currentPage, "batchNum":""+$pageSize, "type":"EVENT","index":$search_index,"highFlag":"true"};
	}else{
		var rTime="collectTime:["+currDate+" TO "+currEndDate+"}";
		if($con_abs.indexOf('|')>=0){
			var cons=$con_abs.split("|");
			contmp=cons[0]+" AND "+rTime;
			for(var t_i=1;t_i<cons.length;t_i++){
				contmp+="|"+cons[t_i];
			}
		}else{
			contmp=$con_abs+" AND "+rTime;
		}
    	reportSearchDiff=rTime;
    	reportStartTime=currDate;
        reportEndTime=currEndDate;
//        $startTime=getCollectionTime(reportStartTime);
//        $endTime=getCollectionTime(reportEndTime);
		data = {"handler":"SynHandler", "queryCondition":contmp,"currentPage":""+currentPage, "batchNum":""+$pageSize, "type":"EVENT","index":$search_index,"highFlag":"true"};
	}
//	$('#search_main_time').text("");
	ajaxPost("/felix", data, function(rs) {
			if(rs["result"] == "OK"){
				$pageQuery.totalNum = rs["totalNum"];
				$pageQuery.batchNum = rs["batchNum"];
				for(var i=0;i<rs["SIZE"];i++){
					rs["TIME"+i]=decodeURIComponent(rs["TIME"+i]).replace(/\+/g,' ');
					rs["MAIN"+i]=decodeURIComponent(rs["MAIN"+i]).replace(/\+/g,' ');
					rs["CONTENT"+i]=decodeURIComponent(rs["CONTENT"+i]).replace(/\+/g,' ');
 			    }
				$bk = rs;
				var $timeRange="";
				if(rs["startTime"]!=""&&rs["endTime"]!=""){
					$timeRange= "时间范围:"+rs["startTime"]+"--"+rs["endTime"];
				}else{
					
				}
				$("#search_main_num").text('搜索事件数:' + $pageQuery.totalNum+$timeRange);
				if (rs["TYPE"] == "EVENTS") {
					//事件报表弹窗
					//eventReport();
					$('#tab-container').easytabs('select', '#tab-events');
					//分页
	 				$pageQuery._paging($pageQuery.totalNum, $pageQuery.batchNum, currentPage);
	 				//清空
	 			//	new Clear()._clear();
	 				initTable();
	 				//换行
	 				textWrap();
					//显示
	 				//new Display(rs,tabletype)._display();
	 				displayTable($selected_fields, rs,tabletype);
	 				$progressbar._hide();
	 				$f._displayFields(rs);
				} else {
					//统计弹窗
					clearFacetClick();
					facetReport($search_index,reportStartTime,reportEndTime,$startTime,$endTime,reportSearchDiff);
					$('#tab-container').easytabs('select', '#tab-statistics');
//				diplayStats(rs);
				}				
			} else {
				alert("Paging error");
			}
		}, function() {
		//	$('#search_main_time').text("");
			alert("查询超时");
		});
		function getNowDate() {
		var myDate = new Date();
		return myDate.toLocaleString();
	}
}

//事件控件apply后的回调函数
function applyCallback(){
	_query(1);
}

//mian对象
var Main = function (){	
	var $dialog = new Dialog();
	//初始化主界面
	this._init = function (){
		//初始化数据
		this._initField();
		//加载头页面
		this._load("navigator");
		//加载尾页面
		this._loadTab();
		//加载搜素
		this._loadSearchMain();
		new dashboard($("#queryCon").val())._init();
	};
	this._initField = function (){
//		i18n("common", '/resource/i18n/', 'map', function() {
//			   //平台标题
//			 //  $('title').text($.i18n.prop('aus_title'));
//		});
//		window.addEventListener('popstate', function(e) {
//			var state = e.state;
//			if(state == null){
//				return;
//			}
//			if (state.title == "query") {
//				var q = decodeURI(getUrlVar("q"));
//				var currentPage = getUrlVar("pageindex");
//				var index = currentPage.indexOf("#");
//				if (index > -1) {
//					currentPage = currentPage.substr(0, index);
//				}
//				_query(parseInt(currentPage));
//			}	
//		}, false); 
	};
	//加载页面
	this._load = function (id){
		$("#"+id).load($("#"+id).attr("data-view"), function(responseTxt,statusTxt,xhr) {
			if (statusTxt == "success") {
				if(id == "navigator"){
					i18n_navigator();
				}
				if(id == "tab"){
					i18n_tab();
				}
			}
		});
	};
	this._loadSearchMain = function (){
		$("#search_main").load($("#search_main").attr("data-view"), function(responseTxt,statusTxt,xhr) {
			if (statusTxt == "success") {
			    $('textarea').autoHeight();
				if($("#search_main").hasClass('search_main_free')){
					$('#search_icons').css("display","none");
					$('#othercont').css("display","none");
				}
				//初始化任务管理器
				$taskManager._init();
				$taskManager._end();
				 //初始化进度条
				$progressbar._init();
				
				$(document).click(function(){
					//搜索框帮助
					$('.status-search-result').hide();
				//	$('#d_datetimepicker').css('display',"none");
				});
				
		    	 $("#queryCon").keydown(function(e){
						if(e.keyCode==13){
							initAll();
						}
				 });
		    	 $("#search").click(function() {
			    		initAll();
			    	});
		    	 //另存为按钮点击
				 $('#editorR').click(function(event) {
				    	event.stopPropagation();
				    	$('.edit-wrap7').toggle();
				    	$('#editorR').addClass('active');
				     });
				 //另存为仪表板
					$("#a_dashboard,#a_add_dashboard").click(function(){
						$dialog._open("save_dialog");
					});
					
					//加载事件界面
					$("#d_datetimepicker").load($("#d_datetimepicker").attr("data-view"), function(responseTxt,statusTxt,xhr) {
						//to do.....
						if(statusTxt == "success"){
						var $timepicker = new TimePicker(applyCallback);
						$timepicker._init();
						}
					});
					
					//时间选择界面点击
			    	$('.time_l_n a').click(function(event) {
			    		$('.status-search-result').hide();
			    		$('#popdown_index').css('display',"none");
						event.stopPropagation();
						$(this).next().toggle();
						if($('.time_l_n .search_button').attr("class").indexOf("search_button_c")){
			    			$('.time_l_n .search_button').removeClass('search_button_c');
			    			$('.time_l_n .search_button_g').removeClass('search_button_c2');
			    		}else{
			    			$('.time_l_n .search_button').addClass('search_button_c');
			    			$('.time_l_n .search_button_g').addClass('search_button_c2');
			    		}
					});
			    	
			    	$('.index_l_n a').click(function(event){
			    		$('.status-search-result').hide();
			    		$('#d_datetimepicker').css('display',"none");
			    		event.stopPropagation();
			    		$(this).next().toggle();
			    	});
			    	
			    	//搜索框帮助+
			    	$('.search_cont .search_input_text').keydown(function(event){
						$(".status-search-result").show();
						if(event.keyCode==8 && $(this).val()==''||event.keyCode==13){
							$(".status-search-result").hide();
						}
				    });
			    	$('.search_cont .search_input_text').keyup(function(event){
						var valText = $.trim($(this).val());
						if(valText ==''||valText==""){
							return;
						}
						var arr=new Array();
						if(valText.indexOf('|')>=0){
							arr = valText.split('|');
							var arr_i = arr[arr.length-1].trim();
							if(arr_i != ""){
								if($('#saHeadingNav_h').text()!=""&&arr_i.indexOf($('#saHeadingNav_h').text())>=0){
										return;
								}
								$('.status-search-result li').remove();
								$(".status-search-result .search-command-history").remove();
								$('.saHeadingNav_hh h5').remove();
								$('.saHeadingNav_hh a').remove();
								//命令历史开始
								var $_data = {"handler":"SearchHistoryHandler","action" :"select","search":arr_i,"maxNum":"5"};
								ajaxPost("/felix", $_data, function(rs) {
									if(rs["result"] == "OK"){
										if(rs["data"].length>0){
											$('.status-search-result').append("<h1 class='splFont-cidi search-command-history'>命令历史</h1>");
											for(var j=0;j<rs["data"].length;j++){
												var $li="<li class='search-history'>"+rs["data"][j]["search_string"]+"</li>";
												$('.status-search-result').append($li);
											}
											$('.status-search-result .search-history').click(function(){
												$("#queryCon").val($(this).text());
											});
										}
									}
								});
								//命令历史结束
								//循环遍历开始
								$.each($commands,function(key,value){
									var input_length=arr_i.length<=value.length?arr_i.length:value.length;
									if(value.substring(0,input_length).indexOf(arr_i)>=0){
										containCommand(value);
									}
									if(arr_i.indexOf(value)>=0){
										$('.saHeadingNav').remove();
										//读取xml开始
										$.ajax({
									        url: '/search/resource/pakingCommandArr.xml',
									        dataType: 'xml',
									        type: 'GET',
									        timeout: 2000,
									        success: function(xml)
									        {
									            $(xml).find("command").each(function(i)
									            {
									                var oid = $(this).attr("id");
									                if(arr_i.indexOf(oid)>=0){
									                	 var explain = $(this).children("explain").text();
											             var example = $(this).children("example").text();										             
											             var div_i = "<div class='saHeadingNav'><div class='saHeadingNav_hh'><h5 id='saHeadingNav_h'>"
											            	 + value + "</h5><a href='#'>帮助</a></div><div class='saContent'>"
															+ explain + "<h5>示例</h5>" + example + "</div></div>";													
														$('.status-cont').append(div_i);
														$('.saHeadRor').css("display","none");
									                }
									               
									            });
									        }
									    });
										//读取xml结束
									}
								});
								//循环遍历结束
							}else{
								$('.status-search-result li').remove();
								$(".status-search-result .search-command-history").remove();
								$.each($commands,function(key,value){
									containCommand(value);
								});
							}
							$('.status-search-result .search-command').click(function(){
								var tempArr = "";
								for(var i = 0;i < arr.length - 1; i++){
									tempArr = tempArr + arr[i] + "| ";
								}
								$("#queryCon").val(tempArr + $(this).text());
							});
						}else{
							$('.saHeadRor').css("display","block");
							$('.saHeadingNav').css("display","none");
							$('.status-search-result li').remove();
							$(".status-search-result .search-command-history").remove();
						}
						addWords();
						$('.status-search-result .search_col').click(function(){
							$("#queryCon").val(valText + " " + $(this).text());
						});
						key = valText;
						if(event.keyCode==8 && $(this).val()==''||event.keyCode==13){
					  	    $(this).parent().nextAll('ul').hide();
						}
				    });
			    	$('.search_cont .status-search-result .search-command').click(function(){
						var adminname = $(this).text();
						$(this).parents('.search_cont').find('textarea').val(adminname);
					});
			}else if(statusTxt=="error"){
		        alert("Error: "+xhr.status+": "+xhr.statusText);
			}
		});
	};
	this._loadTab = function (){
		$("#tab").load($("#tab").attr("data-view"),  function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success") { 
		    	$('#tab-container').easytabs({animate:false});
		    	keepScroll();
		    	$("#tab-events").load($("#tab-events").attr("data-view"), function(responseTxt,statusTxt,xhr) {
		    		if(statusTxt=="success") {
		    			$pageQuery._pageRefresh();
		    			$pageQuery._pageQuery();
		    			i18n_tab();
		    			$("#usertable_perpagecount label").text("每页"+$pageSize+"个");
		    			$('.editor-table_size li img').css("visibility","hidden");
		    			$("#each_page_"+$pageSize+' img').css("visibility","visible");
		    		}
		    	});
//		    	load("tab-statistics");
//		    	load("tab-visualization");
		    }
	      if(statusTxt=="error")
	        alert("Error: "+xhr.status+": "+xhr.statusText);
		});
	};
	//国际化头页面
	  function i18n_navigator(){
		i18n("navigator", '/search/resource/i18n/', 'map', function() {
			   $('#nav_wrap_search').text($.i18n.prop('nav_wrap_search'));
			   $('#nav_wrap_datawatchtable').text($.i18n.prop('nav_wrap_datawatchtable'));
			   $('#nav_wrap_report').text($.i18n.prop('nav_wrap_report'));
			//   $('#nav_wrap_warn').text($.i18n.prop('nav_wrap_warn'));
			   $('#nav_wrap_dashboard').text($.i18n.prop('nav_wrap_dashboard'));
			});
	};

	function containCommand(value) {
		var lii = "<li class='search-command'>" + value + "</li>";
		$('.status-search-result').append(lii);
		$('.saHeadRor').css("display","block");
		$('.saHeadingNav').css("display","none");
	};
	
	function addWords(){
		$('.status-search-result .search-column').remove();
		var $cookieValue = $cookie._getCookie($wordsCookie);
		var lis = "";
		//得到cookie初始化可选和有趣字段
		if($cookieValue != ""){
			$('.status-search-result').append("<h1 class='splFont-cidi search-column'>字段</h1>")
			$.each($cookieValue.split(","),function(index, value){
				lis += "<li class='search_col'>"+value+"</li>";
			});
			$('.status-search-result').append(lis);
		}
	}
};
function i18n_tab(){
	i18n("tab", '/search/resource/i18n/', 'map', function() {
		   $('#tab_events').text($.i18n.prop('tab_events'));
		   $('#tab_statistics').text($.i18n.prop('tab_statistics'));
		   $('#tab_visualization').text($.i18n.prop('tab_visualization'));
		   $('#btn_more_pre').text($.i18n.prop('page_pre'));
		   $('#btn_more_next').text($.i18n.prop('page_next'));
	    	$('#text_footer').append($.i18n.prop('tab_page'));
		});
};

function keepScroll(){
	$('#tab-container').unbind('easytabs:before');
	$('#tab-container').unbind('easytabs:after');
	$('#tab-container').bind('easytabs:before',function(){
		predistance = $(window).scrollTop();
	});
	
	$('#tab-container').bind('easytabs:after',function(){
		$(window).scrollTop(predistance);
	});
}
function getPreviousTime(year,month,date){
	if(month<=0){
		year=year-1;
		month=month+12;
	}
	var newDate=new Date(year,month-1,0);
	var maxDate=newDate.getDate();
	if(maxDate<=date){
		date=maxDate;
	}
	return year+"-"+(month<10?"0"+month:month)+"-"+date;
}
//重新搜索初始化
function initAll(){
	if($('#search').hasClass("g_search_button")){
		return;
	}
	$('#search').parent().removeClass("s_input_bg");
	$('#search').parent().addClass("g_input_bg");
	$('#search').addClass("g_search_button");
 	$("#time_bar").text("");
	$rsData = null;
	$paking.start = 0;
	$first._init();
	currDate = "";
	currEndDate="";
	//终止时钟
	$('#popdown_index').css('display',"none");
	$('#d_datetimepicker').css('display',"none");
	if($time_task != undefined){
		clearInterval($time_task);
	}
	_query(1);
	$history._insertHistory(1);
	$progressbar._show();
	$progressbar._setValue(0);
};

function getCollectionTime(time){
	var timetmp=time.replaceAll("-","/");
	var date = new Date(Date.parse(timetmp+" "+gmt)+8*3600000);
	return date.getUTCFullYear()+""+(date.getUTCMonth()+1<10?"0"+(date.getUTCMonth()+1):date.getUTCMonth()+1);
}

function initSearchIndex(url_search_index){
	if(url_search_index==undefined||url_search_index==null){
		url_search_index="";
	}
	//获取collection
	var ajax_data={"handler":"IndexHandler","action":"select"};
	ajaxPost("/felix", ajax_data, function(rs) {
		if(rs["result"] == "OK"){
			var all_index = rs.index;
			var month = new Array();
//			uniqueIndex(rs,all_index,month);
			all_index.sort(function(a,b){
				return a.localeCompare(b);
			});
			var url_search_indexs=url_search_index.split(",");
			for(var i=0;i<all_index.length;i++){
				for(var j=0;j<url_search_indexs.length;j++){
					if(all_index[i]==url_search_indexs[j]){
						$('#s_main_index').append("<li><input class='index_chkbox' checked='checked' type='checkbox' value='"+all_index[i]+"'><span>"+all_index[i]+"</span></li>");
						break;
					}
					if(j==url_search_indexs.length-1){
						$('#s_main_index').append("<li><input class='index_chkbox' type='checkbox' value='"+all_index[i]+"'><span>"+all_index[i]+"</span></li>");
					}
				}
			}
			
			$('.index_chkbox').click(function(){
				var index_selected =new Array();
				$(".index_chkbox").each(function() {
					if ($(this).is(':checked'))
						index_selected.push($(this).val());
				});
					$search_index=index_selected.join(",");				
				});

			
			$("#queryCon").keyup(function(){
				if($("#queryCon").val()!=""&&$("#queryCon").val().indexOf("index")==0){
					$('#select_index').text("索引库");
					$('#select_index').css("width","auto");
					$('#td_index').css("width","45");
					$search_index="";
				}
			});
			
			if(navigator.userAgent.indexOf("MSIE 8.0")>0){
	    		$('.li_collection li:nth-child(4n+1), .li_collection li:nth-child(4n+2), .li_collection li:nth-child(4n+3)').css({
	    			"float": "left",
		            "width": "120px"
	    		});
	    	}
		}
	},function(){
	});
}

function bindExportEvent(){
	emptyFlag=true;
	stopExportFlag=false;
	var reg_num_format = /^[1-9]\d*$/;
	var error_startNum_null;
	var error_endNum_null;
	var error_startNum_format;
	var error_endNum_format;
	var error_startNum_endNum;
	var error_max_num;
	i18n("events", '/search/resource/i18n/', 'map', function() {
		error_startNum_null=$.i18n.prop('error_startNum_null');
		error_endNum_null=$.i18n.prop('error_endNum_null');
		error_startNum_format=$.i18n.prop('error_startNum_format');
		error_endNum_format=$.i18n.prop('error_endNum_format');
		error_startNum_endNum=$.i18n.prop('error_startNum_endNum');
		error_max_num=$.i18n.prop('error_max_num');
		});
	$(".usertable_btn_sure_export").removeClass("btn_cancel_bg");
	$(".usertable_btn_sure_export").removeClass("btn_cj_bg");
	$(".usertable_btn_sure_export").addClass("btn_cj_bg");
	$(".usertable_btn_sure_export").css("cursor","pointer");

	$('.usertable_btn_sure_export').click(function(){
		$("#progress-in").css("width", "0%");
		$("#progress-val").html("0%");
		$("#usertable_export_msg").text("");
		$("#usertable_export_msg").removeClass("modal_i_msg");
		var filename=$('#usertable_file_name').val().trim();
		var startNum=$('#usertable_file_startnum').val().trim();
		var endNum=$('#usertable_file_endnum').val().trim();
		var batchNum=1000;//一次查1000条
		var sizeDiff;
		if(startNum==""){
			$("#usertable_export_msg").addClass("modal_i_msg");
			$("#usertable_export_msg").text(error_startNum_null);
			return;
		}
		if(!reg_num_format.test(startNum)){
			$("#usertable_export_msg").addClass("modal_i_msg");
			$("#usertable_export_msg").text(error_startNum_format);
			return;
		}
		if(endNum==""){
			$("#usertable_export_msg").addClass("modal_i_msg");
			$("#usertable_export_msg").text(error_endNum_null);
			return;
		}
		if(!reg_num_format.test(endNum)){
			$("#usertable_export_msg").addClass("modal_i_msg");
			$("#usertable_export_msg").text(error_endNum_format);
			return;
		}
		sizeDiff=endNum-startNum+1;
		if(sizeDiff<1){
			$("#usertable_export_msg").addClass("modal_i_msg");
			$("#usertable_export_msg").text(error_startNum_endNum);
			return;
		}else if(sizeDiff>50000){
			$("#usertable_export_msg").addClass("modal_i_msg");
			$("#usertable_export_msg").text(error_max_num);
			return;
		}

		//得到查询条件
		$con =  $("#queryCon").val();
		if($con==""){
			return;
		}
		if($query.startDate == "" || $query.endDate==""){
			$startTime="0";
			$endTime="0";
		}else{
			var rTime="collectTime:[" + $query.getStartDateTime() +" TO "+$query.getEndDateTime()+"]";
			if($con.indexOf('|')>=0){
				var cons=$con.split("|");
				$con=cons[0]+" AND "+rTime+" | ";
				for(var t_i=1;t_i<cons.length;t_i++){
					$con+=cons[t_i];
				}
			}else{
				$con=$con+" AND "+rTime;
			}
			$startTime=getCollectionTime($query.startDate.replaceAll("/","-")+" "+$query.startTime);
	    	$endTime=getCollectionTime($query.endDate.replaceAll("/","-") +" "+$query.endTime);
		}
		var totalMaxNum=$pageQuery.totalNum==null?0:$pageQuery.totalNum;
		endNum=endNum<totalMaxNum?endNum:totalMaxNum;
		sizeDiff=endNum-startNum+1;
		var thisPage=Math.ceil(startNum/batchNum);
		var maxPage=Math.ceil(endNum/batchNum);//向上取整,有小数就整数部分加1
		var firstArrayIndex=(startNum%batchNum+(batchNum-1))%batchNum;//第一次查询出来的结果数组开始的下标
		var lastBatchNum=endNum%batchNum;
		var allCount=maxPage-thisPage+1;
		lastBatchNum=lastBatchNum==0?batchNum:lastBatchNum;
		var export_type=document.getElementById("export_type");
		var type=export_type.options[export_type.selectedIndex].value;
		var parameters={
				"thisPage":thisPage,
				"maxPage":maxPage,
				"batchNum":batchNum,
				"size":sizeDiff,
				"thisCount":1,//第几次查询
				"allCount":allCount,//总共需要查询的次数
				"batch":batchNum,
				"firstArrayIndex":firstArrayIndex,
				"lastBatchNum":lastBatchNum,
				"con":$con,
				"startTime":$startTime,
				"endTime":$endTime
				};
		getAllExportData(parameters,type,filename);
	});
}

function getAllExportData(parameters,type,filename){
	$(".usertable_btn_sure_export").removeClass("btn_cj_bg");
	$(".usertable_btn_sure_export").addClass("btn_cancel_bg");
	$(".usertable_btn_sure_export").css("cursor","not-allowed");
	$('.usertable_btn_sure_export').unbind("click");
	emptyFlag=false;
	if(stopExportFlag){
		 bindExportEvent();
		 return;
	}
	
	var thisPage=parameters['thisPage'];
	var batch=parameters['batch'];
	if(thisPage==parameters['maxPage']&&parameters['lastBatchNum']!=0){
		parameters['batchNum']=parameters['lastBatchNum'];
	}
	var progresspercnet=100*parameters['thisCount']/parameters['allCount'];
	var prepercnet=100*(parameters['thisCount']-1)/parameters['allCount'];
	var betweenpercnet=Math.round(prepercnet+(progresspercnet-prepercnet)/2);
	$("#progress-in").css("width", betweenpercnet+"%");
	$("#progress-val").html(betweenpercnet+"%");
	var $data = {"handler":"SearchExportHandler", "queryCondition":parameters['con'],"startTime":parameters['startTime'],"endTime":parameters['endTime'], "currentPage":""+thisPage,"thisCount":""+parameters['thisCount'],"firstArrayIndex":""+parameters['firstArrayIndex'],batchNum:""+parameters['batchNum'], "size":""+parameters['size'],"type":"event","index":$search_index};
	ajaxPost("/felix", $data, function(rs) {
		if(rs["queryResult"] == "OK"){
			if(stopExportFlag){
				 bindExportEvent();
				 return;
			}
		    if(thisPage<parameters['maxPage']){
		    	progresspercnet=Math.round(progresspercnet);
		    	$("#progress-in").css("width", progresspercnet+"%");
				$("#progress-val").html(progresspercnet+"%");
		    	if(thisPage+1==parameters['maxPage']&&parameters['lastBatchNum']!=0){
		    		parameters['batchNum']=parameters['lastBatchNum'];
		    	}
		    	parameters['thisCount']++;
		    	parameters['thisPage']++;
		    	getAllExportData(parameters,type,filename);
		    }else{
			    bindExportEvent();
		        $("#progress-in").css("width", "100%");
			    $("#progress-val").html("100%");
		        //向服务器传数据
		   	    $("#form").prop("action", "/felix/search/export?type="+type+"&filename="+filename).submit();  
		   	    easyDialog.close();
		    }	    
		  }else {
				bindExportEvent();
				if(stopExportFlag){
					 return;
				}
				easyDialog.close();
				alert("导出失败");
		}
	},function() {
		bindExportEvent();
		if(stopExportFlag){
			 return;
		}
		easyDialog.close();
		alert("导出失败");
		});
}


$(function(){
	new Main()._init();
});
//function getIndexs(){
//	var indexs="";
//	$("#s_main_index .index_selected").each(function(){
//		indexs += $(this).text();
//	});
//	return indexs;
//}