var $safeData = new Array();
var SafeInfo = function(){
	this.name = "";
	this.msg = "";
	this.totalNum = "";
	this.type="";
	this.order="";
	this._init = function(){
		this.name = "";
		this.msg="";
		this.totalNum="";
		this.type="";
		this.order="";
	};
};
var j=0;
var GetAbnormalData = function(ks,name,type,msg,order){
	this._init=function(){
		if(ks["SIZE"]>0){
			var $safeInfo = new SafeInfo();
			$safeInfo.msg=decodeURIComponent(msg).replace(/\+/g,' ');
			$safeInfo.type=decodeURIComponent(type).replace(/\+/g,' ');
			$safeInfo.name=decodeURIComponent(name).replace(/\+/g,' ');
			$safeInfo.totalNum=ks["totalNum"];
			$safeInfo.order=order;
			$safeData.push($safeInfo);
		}
	};
};
var GetData = function(k,rs,initTable){
	this._getData = function(){
		var $data2 = {"handler":"SearchHandler", "queryCondition":rs.safeOrders[k].order, "currentPage":""+1, "batchNum":""+10, "type":"EVENT"};
		ajaxPost("/felix", $data2, function(ks) {
			if(ks["result"] == "OK"){
				var $getAbnormalData = new GetAbnormalData(ks,rs.safeOrders[k].name,rs.safeOrders[k].type,rs.safeOrders[k].message,rs.safeOrders[k].order);
				$getAbnormalData._init();
				if(j==rs.safeOrders.length-1){
					initTable();
					$("#nav_wrap_warn").parent("li").addClass("current");
				}
				j++;
			}
	});
	}
};
var Main = function(){
	this._init = function(){
		this._initData(this._initTable);
	};
	this._initData = function(initTable){
		var $data = {"handler":"CommonHandler"};
		$("#t_body").html("正在分析检测异常日志....");
		ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK"){
					for(var k in rs.safeOrders){
						var $getData=new GetData(k,rs,initTable);
						$getData._getData();
					}
				}
			}, function() {
				alert("error");
		});
	};
	this._initTable = function(){
		if($safeData.length==0){
			$("#t_body").html("无异常情况");
		}else{
			$("#t_body").empty();
			$.each($safeData,function(i,n){
				var $tr
				if(parseInt(i%2)==0){
					$str = $tr + "<tr class='odd'>";
				}else{
					$str = $tr + "<tr class='even'>";
			}
			$("#t_body").append($str+"<td>"+n.name+"</td><td>"+n.type+"</td><td>"+n.msg+"</td><td>High</td><td>"+n.totalNum+
					"</td><td><a href='/main.html?q="+escape(n.order)+"&startdatetime=0&enddatetime=0' target='_blank'>查看异常日志</a></td></tr>");
		});
		}
	};
};

function formatDate($date){
	var $temp = $date.split("T");
	var $temp1 = $temp[1].split(":");
	return $temp[0]+" "+$temp1[0]+":"+$temp1[1]+":"+$temp1[2].split(".")[0];
};
$(function(){
	new Main()._init();
});