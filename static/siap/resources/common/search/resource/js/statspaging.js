//统计信息分页
 function addClass(item) {
	item.addClass("choiseItem");
}

function removeClass(item) {
	item.removeClass("choiseItem");
}

function pageUnbindClick(pre){
	$("#"+pre+"_right_pre").unbind("click");
	$("."+pre+"_page_1").unbind("click");
	$("."+pre+"_page_2").unbind("click");
	$("."+pre+"_page_3").unbind("click");
	$("."+pre+"_page_4").unbind("click");
	$("."+pre+"_page_5").unbind("click");
	$("."+pre+"_page_6").unbind("click");
	$("."+pre+"_page_7").unbind("click");
	$("."+pre+"_page_8").unbind("click");
	$("."+pre+"_page_9").unbind("click");
	$("."+pre+"_page_10").unbind("click");
	$("#"+pre+"_right_next").unbind("click");
	$("#"+pre+"_right_first").unbind("click");
	$("#"+pre+"_right_last").unbind("click");
	$("#"+pre+"_more").unbind("click");
}

function statsPagerClick(tempRS,pre,$pageSize){	
	$("#"+pre+"_right_pre").click(function (e){
		var start_time=new Date();
		var currentPage = parseInt(getCurrenStatsPage(pre)) - 1;
		if (currentPage >= 1) {
			var showPageCount = currentPage * $pageSize;
			var PageIndex = showPageCount - $pageSize;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
			}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
		});
		
	$("."+pre+"_page_1").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_1").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;

			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
		
	$("."+pre+"_page_2").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_2").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%10;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
	$("."+pre+"_page_3").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_3").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
		
	$("."+pre+"_page_4").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_4").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%10;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
	$("."+pre+"_page_5").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_5").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
		
	$("."+pre+"_page_6").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_6").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
	$("."+pre+"_page_7").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_7").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
		
	$("."+pre+"_page_8").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_8").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var start_time=new Date();
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
	$("."+pre+"_page_9").click(function() {
		var currentPage =parseInt($("#"+pre+"_page_9").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
		
	$("."+pre+"_page_10").click(function() {
		var start_time=new Date();
		var currentPage =  parseInt($("#"+pre+"_page_10").text());
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
	$("#"+pre+"_right_next").click(function (e){
		var start_time=new Date();
		var currentPage = parseInt(getCurrenStatsPage(pre)) + 1;
		statsCount=parseInt(statsCount);
		if (currentPage <= statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
   		    	k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
				var PageIndex = showPageCount - k;
				statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
				diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
	$("#"+pre+"_right_first").click(function() {
		var start_time=new Date();
		var currentPage = 1;
		if (currentPage !=  parseInt(getCurrenStatsPage(pre))) {
			var showPageCount = currentPage * $pageSize;
			var PageIndex = showPageCount - $pageSize;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
		
	$("#"+pre+"_right_last").click(function() {	
		var start_time=new Date();
		var currentPage = parseInt(statsCount);
		statsCount=parseInt(statsCount);
		if (currentPage <=  statsCount) {
			var showPageCount = currentPage * $pageSize;
			var k=$pageSize;
				
			if(currentPage==statsCount){
				var lastPagecount=parseInt(tempRS["SIZE"])%$pageSize;
				k=lastPagecount==0?$pageSize:lastPagecount;
				showPageCount=tempRS["SIZE"];
			}
			var PageIndex = showPageCount - k;
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,PageIndex,showPageCount,pre);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
	
	$("#"+pre+"_more").click(function(){
		var start_time=new Date();
		var currentPage = parseInt(getCurrenStatsPage(pre));
		statsCount = currentPage;
		var $startNum = currentPage * $pageSize ;
		//判断是否已经缓存在前台
		if($startNum<parseInt($rsData["SIZE"])){
			statsPager(tempRS["SIZE"], $pageSize, currentPage,pre);
			diplayStats(tempRS,$startNum-$pageSize,$startNum,pre);
		}else{
			$paking.start = $startNum;
			_query(1);
		}
		var end_time=new Date();
		$spend_time=end_time.getTime()-start_time.getTime();
		$('#search_main_time').text("分页用时:"+$spend_time+"毫秒");
	});
}
	
	
function statsPager(totalNum, batchNum, currentPage,pre){
	var page = new Pagination(totalNum, batchNum, currentPage);
	var pageCount = parseInt(page.pageCount());
	statsCount = pageCount;
	var j=(pageCount>=10)?10:pageCount;
	
	//用于显示更多
//	if(totalNum == parseInt(batchNum)*currentPage){
//		$("#"+pre+"_right_last").hide();
//		$("#"+pre+"_more").show();
//	}else{
//		$("#"+pre+"_right_last").show();
//		$("#"+pre+"_more").hide();
//	}
	
	currentPage=parseInt(currentPage);
	//先都显示
	for(var i=10;i>0;i--){
		$("."+pre+"_page_"+i).css("display",'inline');
	}
	//再隐藏部分
	if(j<10){
		for(var i=10;i>j;i--){
			$("."+pre+"_page_"+i).css("display",'none');
		}
	}

	if (currentPage == 1) {
		$("#"+pre+"_right_first").addClass("page_pre_next");
		$("#"+pre+"_right_pre").addClass("page_pre_next");
		$("#"+pre+"_right_last").removeClass("page_pre_next");
		$("#"+pre+"_right_next").removeClass("page_pre_next");
		for(var i=1;i<=j;i++){
			$("#"+pre+"_page_"+i).text(i);
		}
		for(var i=2;i<=j;i++){
			removeClass($("."+pre+"_page_"+i));
		}
		addClass($("."+pre+"_page_1"));
	} else if (currentPage != 1) {
		
		$("#"+pre+"_right_first").removeClass("page_pre_next");
		$("#"+pre+"_right_pre").removeClass("page_pre_next");
		$("#"+pre+"_right_last").removeClass("page_pre_next");
		$("#"+pre+"_right_next").removeClass("page_pre_next");
		if (currentPage < pageCount-j+2) {
			for(var i=1;i<=j;i++){
				$("#"+pre+"_page_"+i).text(currentPage+i-1);
			}
			for(var i=2;i<=j;i++){
				removeClass($("."+pre+"_page_"+i));
			}
			addClass($("."+pre+"_page_1"));
		} else {
			if(currentPage==pageCount){
				$("#"+pre+"_right_last").addClass("page_pre_next");
				$("#"+pre+"_right_next").addClass("page_pre_next");
			}
			var k=j-(pageCount-currentPage);
			for(var i=1;i<=j;i++){
				$("#"+pre+"_page_"+i).text(currentPage+i-k);
				if(i!=k){
					removeClass($("."+pre+"_page_"+i));
				}else{
					addClass($("."+pre+"_page_"+i));
				}
			}
		}
	}
}
	
	
function diplayStats(rs,PageIndex,showPageCount,pre) {
	
	var num = parseInt(rs["SIZE"]);
	var stats_title = rs["STATS_TITILE"]; 
	var title = String(stats_title).split(",");
		//如果是第一次则画表格
	    var table = "<table width='99%' class='list' border='0' align='center' cellpadding='0' cellspacing='1'>";
		var thead = "<thead><tr><th>NO.</th>";
		var tbody = "<tbody id='t_tbody'>";
		
			
		if (title && title.length > 0) {
			for (var k=0; k<title.length; k++) {
				var t = title[k];
				var th = "<th>"+t+"</th>";
				thead += th;
			}
				
			thead += "</tr></thead>";
				
			for (var i=PageIndex; i<showPageCount; i++) {
				var tr = "<tr  class='table-tr-content'> <td>" + (i+1)+"</td>";
				for (var k=0; k<title.length; k++) {
					var t = title[k];
					var td;
					if(rs[t + i]=="undefined"){
						td = "<td></td>";
					}else{
						td = "<td>" + formatTime(t,rs[t + i]) + "</td>";
					}
					tr += td;
				}
				tr += "</tr>";
				tbody += tr;
			}
			tbody += "</tbody>";
			table = table + thead + tbody + "</table>";
			$("#"+pre+"_table").empty();
			$("#"+pre+"_table").append(table);

		}
	initStatsTable();
}

function formatTime(title,value){
	if((title=="collectTime"||title=="recordTime")&&/^\d{10}$/.test(value)){
		return new Date(parseInt(value) * 1000).toJSON();      
	}else if((title=="collectTime"||title=="recordTime")&&/^\d{13}$/.test(value)){
		return new Date(parseInt(value)).toJSON();      
	}else{
		return value;
	}
}
	
function initStatsTable() {
	$(".list tbody tr:odd").addClass("normalEvenTD");
	$(".list tbody tr").hover(function() {
		$(this).addClass('hover_class');
		$(this).removeClass('table-tr-content');
	}, function() {
		$(this).removeClass('hover_class');
		$(this).addClass('table-tr-content');
	});

	$(".list tbody tr").click(function() {
		$(".list tbody tr").removeClass("selected_class");
		$(this).addClass("selected_class");
		$(this).removeClass('table-tr-content');
	});
}
	
	
function getCurrenStatsPage(pre) {
	var k=0;
	for(var i=1;i<=10;i++){
		if ($("."+pre+"_page_"+i).css("font-size") == "18px") {
			k=$("#"+pre+"_page_"+i).text();
			break;
		}
	}
	return k;
}