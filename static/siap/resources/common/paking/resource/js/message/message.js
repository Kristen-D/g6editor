var Message = function (){
	var $oTable;
	var delId = "";
	this._init = function (){
		this._initField();
		this._getData(this._initTable);
		this._initEvent();
	};
	this._initField = function (){
		i18n("message", '/resource/i18n/message/', 'map', function() {
			   $("#s_message").text($.i18n.prop('s_message'));
			   $("#th_id").text($.i18n.prop('th_id'));
			   $("#th_time").text($.i18n.prop('th_time'));
			   $("#th_message").text($.i18n.prop('th_message'));
			   $("#th_operate").text($.i18n.prop('th_operate'));
			   $("#h_del_message").text($.i18n.prop('h_del_message'));
			   $("#h_msg").text($.i18n.prop('h_msg'));
			   $(".btn_cancel_bg").text($.i18n.prop('btn_cancel_bg'));
			   $("#btn_del_sure").text($.i18n.prop('th_operate'));
		});
	};
	this._getData = function (initTable){
		 var $handelData = {"handler":"HttpAlarmHandler","action":"select"};
		 ajaxPost("/felix", $handelData, function(rs) {
				if(rs["result"] == "OK"){
					rs.alarms.sort(function(a,b){
						return b.time-a.time;
					});
					var $data = packagingdatatabledata(rs);
	 				initTable($data);
				}
		 });
	};
	this._initEvent = function (){
		//搜索功能
		$("#in_filter").keyup(function(){oTable.fnFilter( this.value, 2 );});
		$('.btn_cancel_bg,.close').click(function(){easyDialog.close();});
		$('#btn_del_sure').click(function(){deleteAlarm();});
	};
	this._initTable = function ($data){
	   oTable = $('#table').dataTable({
	    	"aaData" :$data,
	    	"aoColumnDefs": [{ "bSortable": false, "aTargets": [0]}],
	        "aaSorting": [[0, 'asc']],
	        "aLengthMenu": [
	           [5, 15, 20, -1],
	           [5, 15, 20, "All"]
	       ],
	       "iDisplayLength": 10,
	       "bServerSide": false,
	       "aoColumns" : [{  
	           "mData" : "id"
	         }, {  
	           "mData" : "time"
	       }, {  
	           "mData" : "message"
	       }, {  
	           "mData" : "del"
		   }],
	       "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
	    	   if($cookie._getCookie("ROLE")!="2"){
	    		   $('td:eq(3)', nRow).html("<a href='javascript:void(0)' id='"+aData.delId+"' class='message_del message_del_gray'>"+aData.del+"</a>");  
	    	   }else{
	    		   $('td:eq(3)', nRow).html("<a href='javascript:void(0)' id='"+aData.delId+"' class='message_del'>"+aData.del+"</a>");  
	    	   }
	           return nRow;  
	       },
	       "fnDrawCallback": function( oSettings ){
	    	 //重绘时重新绑定事件
	    	   initTableEvent();
	       }
	   });
	};
	function initTableEvent(){
		$('.message_del').click(function(){delClick($(this));});
	}
	
	function packagingdatatabledata(msgObj){    
	    var a = new Array();  
	    var tableName=['id','time','message','del','delId'];  
	    var banddata = msgObj['alarms']; 
	    var name;
	    for(var key in banddata){  
	        var tempObj=new Object();  
	        tempObj.id=parseInt(key)+1; 
	        tempObj.time=(new Date(banddata[key].time)).toLocaleString(); 
	        tempObj.message="从"+banddata[key].source+"发现告警信息:"+(banddata[key].alarmInfo+"!").replace("!!","!").replace(".!","!").replace("!"," !"); 
	        tempObj.del=$.i18n.prop('th_operate');
	        tempObj.delId=banddata[key].source+"_~_"+banddata[key].sourceType+"_~_"+banddata[key].type+"_~_"+banddata[key].alarmCode;
	        a.push(JSON.parse(JSON.stringify(tempObj,tableName)));  
	        }
	    return a;  
	};  
	
	function delClick($this){
		if($cookie._getCookie("ROLE")!="2"){
			return;
		}
		easyDialog.open({container : "del_dialog"});
		delId=$this.attr('id');
	}
	
	function deleteAlarm(){
		var ids = delId.split("_~_");
		var $source = ids[0];
		var $sourceType = ids[1];
		var $type = ids[2];
		var $alarmCode = ids[3];
		var $data = {"handler":"HttpAlarmHandler","action":"delete","source":$source,"sourceType":$sourceType,"type":$type,"alarmCode":$alarmCode};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK"){
					window.location.reload();
				}else{
					easyDialog.close();
					alert("删除失败");
				}
			}, function() {
				easyDialog.close();
				alert("删除失败");
		});
	}
};
$(function(){
	new Message()._init();
});