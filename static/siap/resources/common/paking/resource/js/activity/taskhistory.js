var Page = function (){
	this.pageSize = 20;
	this.currPage = 1;
	this.totalPage = 1;
	this.startNum = 0;
};
var $page = new Page();
var TaskHistory = function (){
	var $search = "";
	var $tempId = "";
	var $lastPage = $("#l_last_page");
	var $nextPage = $("#l_next_page");
	var $currPage = $("#a_curr_page");
	var $cancel = $("#btn_cancel");
	var $close = $(".close");
	var $delete = $("#btn_delete");
	var $table = $("#t_body");
	var $filter = $("#in_filter");
	this._init = function (){
		this._initField();
		this._initData();
		this._initEvent(this._getData,this._getTotalPage);
	};
	//国际化
	this._initField = function (){
		i18n("task", '/resource/i18n/task/', 'map', function() {
			   $("#s_task_history").text($.i18n.prop('task_history'));
			   $("#th_send_by").text($.i18n.prop('task_send_by'));
			   $("#th_owner").text($.i18n.prop('task_owner'));
			   $("#th_apply").text($.i18n.prop('task_apply'));
			   $("#th_event").text($.i18n.prop('task_event'));
			   $("#th_time").text($.i18n.prop('task_time'));
			   $("#th_state").text($.i18n.prop('task_state'));
			   $("#th_operate").text($.i18n.prop('task_operate'));
			   $("#s_last_page").text($.i18n.prop('task_last_page'));
			   $("#s_next_page").text($.i18n.prop('task_next_page'));
			   $("#h_msg").text($.i18n.prop('task_del_msg'));
			   $("#h_del_task").text($.i18n.prop('task_delete_task'));
			   $("#btn_cancel").text($.i18n.prop('task_cancel'));
			   $("#btn_delete").text($.i18n.prop('task_delete'));
		});
	};
	this._initData = function (){
		$search = $("#in_filter").val();
		this._getTotalPage();
		this._getData();
	};
	//得到总页数
	this._getTotalPage = function (){
		var $data = {"handler":"TaskHistoryHandler","action" :"getTotalPage","pageSize" :$page.pageSize,"search":$search};
		ajaxPost("/felix", $data, function(rs) {
 			if(rs["result"] == "OK"){ 					
 				if(parseInt(rs["totalPage"])%$page.pageSize == 0){
 					$page.totalPage = parseInt(rs["totalPage"])/$page.pageSize;
 				}else{
 					$page.totalPage = parseInt(parseInt(rs["totalPage"])/$page.pageSize)+1;
 				}
 				showPage();
 			} else {
 				alert("error");
 			}
		});
	};
	//得到数据
	this._getData = function (){
		$page.startNum = ($page.currPage-1)*$page.pageSize;
		var $data = {"handler":"TaskHistoryHandler","action" :"select","startNum" : $page.startNum,"pageSize" :$page.pageSize,"search":$search};
		ajaxPost("/felix", $data, function(rs) {
 			if(rs["result"] == "OK"){ 
 				//清空
 				$table.empty();
 				var $str = "";
 				$.each(rs["data"],function(i,n){
 					if(parseInt(i%2)==0){
 						$str = $str + "<tr class='odd'>";
 					}else{
 						$str = $str + "<tr class='even'>";
 					}
 					var search = decodeURIComponent(n.search.replace(/\+/g,' '));
 					//判断search是否是默认索引库
// 					var index = $cookie._getCookie("INDEX");
// 					if(search.indexOf(index)>0){
// 						search = search.substring((search.indexOf(index)+index.length+6),search.length);
// 					}
 					var $href= "/search/main.html?q="+escape(search);
 					$str = $str + "<td>"+decodeURIComponent(n.startDate).replace(/\+/g,' ')+"&nbsp;&nbsp;<a href='"+$href+"'>"+
 					search+"</a></td><td>"+
 					decodeURIComponent(n.owner).replace(/\+/g,' ')+"</td><td>search</td><td>"+
 					decodeURIComponent(n.totalNum).replace(/\+/g,' ')+"</td><td>"+
 					getRunTime(decodeURIComponent(n.startDate).replace(/\+/g,' '),decodeURIComponent(n.endDate).replace(/\+/g,' '))+
 					"</td><td>"+decodeURIComponent(n.state).replace(/\+/g,' ')+"</td><td><a href='#' style='cursor:pointer;' class='a_delete' id='"+n.taskId+"'>"+$.i18n.prop('task_delete')+"</a></td></tr>";
 				});
 				if($str==""){
 					$str = $str + "<tr><td colspan='7' style='text-align:center;'>No Data Available...</td></tr>"
 				}
 				$table.append($str);
 				addEvent();
 			} else {
 				alert("error");
 			}
		});
	};
	//绑定事件
	this._initEvent = function (getData,getPage){
		$close.click(function(){easyDialog.close()});
		$cancel.click(function(){easyDialog.close()});
		$delete.click(function(){deleteSure()});
		$lastPage.click(function(){lastPageClick(getData)});
		$nextPage.click(function(){nextPageClick(getData)});
		$filter.keyup(function(){filterKeyUp(getData,getPage)});
	};
	function deleteSure(){
		var $data = {"handler":"TaskHistoryHandler","action" :"delete","task_id":$tempId};
		ajaxPost("/felix", $data, function(rs) {
 			if(rs["result"] == "OK"){ 
 				window.location.reload();
 			} else {
 				alert("error");
 			}
		});
	};
	function lastPageClick(getData){
		$page.currPage = $page.currPage -1;
		$currPage.html($page.currPage);
		showPage()
		getData();
	};
	function nextPageClick(getData){
		$page.currPage = $page.currPage +1;
		$currPage.html($page.currPage);
		showPage()
		getData();
	};
	function filterKeyUp(getData,getPage){
		$search = $filter.val();
		$page.currPage = 1;
		$currPage.html($page.currPage);
		getPage();
		getData();
	}
	function addEvent(){
		$(".a_delete").click(function(){
			easyDialog.open({
				container : 'del_dialog'
			});
			$tempId = $(this).attr("id");
		});
	};
	function getRunTime($startTime,$endTime){
		if($endTime == ""){
			return "00:00:00";
		}
		var $unixStart = getUnixTime($startTime);
		var $unixEnd = getUnixTime($endTime);
		var $temp = $unixEnd - $unixStart;
		return transUnixTimeToTime($temp);
	};
	function getUnixTime($time){
		var $temp = $time.split(" ")[1].split(":");
		return parseInt($temp[0])*1000*60*24+parseInt($temp[1])*1000*60+parseInt($temp[2].split(".")[0])*1000+parseInt($temp[2].split(".")[1]);
	};
	function transUnixTimeToTime($unixTime){
		var $temp = $unixTime.toString().substring($unixTime.toString().length-3,$unixTime.toString().length);
		$unixTime = ($unixTime - parseInt($temp))/1000;
		var $str="";
		var $hour = parseInt($unixTime/60/24);
		var $minu = parseInt(($unixTime - $hour*60*24)/60);
		var $sec = $unixTime -$hour*60*24-$minu*60;
		return ($hour<10?"0"+$hour:$hour)+":"+($minu<10?"0"+$minu:$minu)+":"+($sec<10?"0"+$sec:$sec)+"."+$temp;
	}
	function showPage(){
		if($page.totalPage == 0){
			$nextPage.hide();
			$lastPage.hide();
			return;
		}
		if($page.totalPage == $page.currPage){
			$nextPage.hide();
		}else{
			$nextPage.show();
		}
		if($page.currPage == 1){
			$lastPage.hide();
		}else{
			$lastPage.show();
		}
	}
}
$(function(){
	new TaskHistory()._init();
});