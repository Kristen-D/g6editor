var _chart;
var temp;
var panel = new Object();
var $hdata = new Array();
var mycharts=new Object();
var title;
var desc;
var Task = function(){
	this.push_data_boolean = "";
	this.push_data_function = null;
	this.push_data = ""
	this.bk = null;
};
var panel_view = function (){
	var dashboard = new Object();
	var is_new = true;
	this.init = function(){
		dashboard.id=this.getQueryString("dashboardid");
		//初始化数据
		this.initDashboard();
		//初始化国际化
		this.initField();
		//初始化页面布局
		this.initPanel();
		//初始化事件
		this.initEvent();
	};
	this.initDashboard = function(){
		//初始化数据
		//根据ID查询数据库
		ajaxPost("/felix", {"handler":"DashboardTableHandler","action":"getByOwnerAndId","id":dashboard.id}, function(rrs) {
			if(rrs["result"] == "success"){
				if(rrs["size"]==0){
					alert("仪表板id不存在");
					return;
				}
				data = {"handler":"DashboardTableHandler","action":"selectById","id":dashboard.id};
		   		ajaxPost("/felix", data, function(rs) {
		   				if(rs["result"] == "success"){
		   						//初始化数据
		   						dashboard.title=decodeURI(rs.dashboard.title).replace(/\+/g,' '); 
		   						dashboard.did=rs.dashboard.did;
		   						dashboard.desc=decodeURI(rs.dashboard.desc).replace(/\+/g,' '); 
		   						dashboard.apply=decodeURI(rs.dashboard.apply).replace(/\+/g,' '); 
		   						dashboard.owner=decodeURI(rs.dashboard.owner).replace(/\+/g,' '); 
		   						dashboard.permission=rs.dashboard.permission;
		   						title=dashboard.title;
		   						desc=dashboard.desc;
		   						new initPanelData();
		   					}
		   				$("#nav_wrap_dashboard").parent("li").addClass("current");
		   			}, function() {
		   				$("#nav_wrap_dashboard").parent("li").addClass("current");
		   				alert("error");
		   			});
			}
		});
	};
	var initPanelData = function(){
		$("#s_title").html(dashboard.title);
		$('.edit_descrip').html(dashboard.desc);
		var html='<dt class="dt_apply"></dt><dd>'+dashboard.apply+'</dd><dt class="dt_plan"></dt>'+
	      '<dd class="dd_no_plan"></dd><dt class="dt_permission"></dt>'+
	      '<dd class="dd_owner"><a href="#" class="a_edit"></a></dd>';
		$("#dl_dt").html(html);
		new initPanelField();
	};
	var initPanelField = function (){
		i18n("dashboard", '/dashboard/resource/i18n/', 'map', function() {
			   $('.dt_apply').text($.i18n.prop('dash_apply'));
			   $('.dt_plan').text($.i18n.prop('dash_plan'));
			   $('.dd_no_plan').text($.i18n.prop('dash_n_plan'));
			   $('.dt_permission').text($.i18n.prop('dash_permission'));
			   $('.dd_owner').text($.i18n.prop('dash_have',[dashboard.owner]));
			   $('.a_edit').text($.i18n.prop('dash_edit'));
		});
	};
	this.initField = function(){
		//头部
		$("#navigator_header").load($("#navigator_header").attr("data-view"), function(responseTxt,statusTxt,xhr){
			 if(statusTxt=="success") {
				 i18n("navigator_dashboard", '/dashboard/resource/i18n/', 'map', function() {
					   $('#nav_wrap_apply').text($.i18n.prop('dash_nav_wrap_apply'));
					   $('#nav_account_news').text($.i18n.prop('dash_nav_account_news'));
					   $('#nav_account_set').text($.i18n.prop('dash_nav_account_set'));
					   $('#nav_account_action').text($.i18n.prop('dash_nav_account_action'));
					   $('#nav_account_help').text($.i18n.prop('dash_nav_account_help'));
					   $('#nav_wrap_search').text($.i18n.prop('dash_nav_wrap_search'));
					   $('#nav_wrap_datawatchtable').text($.i18n.prop('dash_nav_wrap_datawatchtable'));
					   $('#nav_wrap_report').text($.i18n.prop('dash_nav_wrap_report'));
					   $('#nav_wrap_warn').text($.i18n.prop('dash_nav_wrap_warn'));
					   $('#nav_wrap_dashboard').text($.i18n.prop('dash_nav_wrap_dashboard'));
				});
			 }
		});
		//其它
		 i18n("dashboard", '/dashboard/resource/i18n/', 'map', function() {
			  $("#a_edit_dashboard").text($.i18n.prop('dash_edit_dashboard'));
			  $("#a_trans_html").text($.i18n.prop('dash_trans_html'));
			  $("#a_edit").text($.i18n.prop('dash_edit_permission'));
			  $("#a_copy").text($.i18n.prop('dash_copy'));
			  $("#a_delete").text($.i18n.prop('dash_del'));
			  $("#editorT").text($.i18n.prop('dash_edit'));
			  $("#editorM").text($.i18n.prop('dash_more'));
			  $("#h_edit").text($.i18n.prop('dash_edit_permission'));
			  $(".s_title").text($.i18n.prop('dash_title'));
			  $(".s_desc").text($.i18n.prop('dash_desc'));
			  $(".s_owner").text($.i18n.prop('dash_owner'));
			  $(".s_apply").text($.i18n.prop('dash_apply'));
			  $(".edit_owner").text($.i18n.prop('dash_yours'));
			  $(".edit_apply").text($.i18n.prop('dash_app'));
			  $(".edit_all").text($.i18n.prop('dash_all'));
			  $(".btn_cancel_bg").text($.i18n.prop('dash_cancel'));
			  $("#btn_edit_save").text($.i18n.prop('dash_save'));
			  $("#h_copy").text($.i18n.prop('dash_copy_dashboard'));
			  $("#btn_copy").text($.i18n.prop('dash_copy'));
			  $("#h_del_dashboard").text($.i18n.prop('dash_del_dashboard'));
			  $("#h_msg").text($.i18n.prop('dash_del_msg'));
			  $("#btn_del_sure").text($.i18n.prop('dash_del'));
			  $("#h_del_dashboard").text($.i18n.prop('dash_del_dashboard'));
			  $("#h_trans_html").text($.i18n.prop('dash_trans_html'));
			  $(".s_dashboard").text($.i18n.prop('dash_dashboard'));
			  $("#btn_new_html").text($.i18n.prop('dash_new_html'));
			  $("#btn_replace_curr").text($.i18n.prop('dash_replace_curr'));
			  $("#btn_trans_html").text($.i18n.prop('dash_trans_dashboard'));
			  $("#btn_html_owner").text($.i18n.prop('dash_owner'));
			  $("#btn_html_apply").text($.i18n.prop('dash_apply'));
			  $("#btn_html_all").text($.i18n.prop('dash_all_apply'));
		});
		 
	};
	this.initPanel = function(){
		//加载页面布局
		//查询数据库
		 data = {"handler":"PanelHandler","action":"select","dashboardId":dashboard.id};
			ajaxPost("/felix", data, function(rs) {
					if(rs["result"] == "success"){
							//整理data按照row分组
							var newData = getNewData(rs["data"]);
							//得到数据,遍历
							$.each(newData,function(i,m){
								//$hdata.push(new Task());
								var dashboardRow= $("#dashboard_row").clone().show();
	        					var dashboardRowEmpty=$(".empty").clone(true)[0];
	        					//查询数据库得到图表
	        					$(dashboardRow).attr("id","dashboard_row_"+i);
	        					$("#edit_main").append(dashboardRow);
	        					$("#edit_main").append(dashboardRowEmpty);
	        					var num = $(m).length;
								$.each($(m),function(j,n){
									var id=n.id;
									var dashboard_cell=$("#dashboard_cell").clone().show();;
									$(dashboard_cell).attr("id","dashboard_cell_"+id);
									$(dashboard_cell).css("width",100/num+"%");
									
									$("#dashboard_row_"+i).append(dashboard_cell);
									$("#dashboard_cell_"+id+" .dashboard-panel").resizable({
										  handles: " n, e, s, w, ne, se, sw, nw"
									});
									//存数据
									$("#dashboard_cell_"+id+" .h_title").html(decodeURIComponent(n.title).replace(/\+/g,' '));
									var container=$("#dashboard_cell_"+id+" .panel-body");
									container.attr('id','view_cell_panel_body_'+id);
									var eContainerId='view_cell_panel_body_'+id;
									container.html("loading....................");
									var chart=n.chart;
									getData(id,decodeURIComponent(n.search.replace(/\+/g,' ')),container,eContainerId,chart);
								});
										       					
							});
						}
				}, function() {
					alert("error");
				});
		
	};
	this.initEvent = function(){
		//编辑和更多信息事件
		$("#a_edit_dashboard").click(function(){
			window.location.href="/dashboard/panel.html?dashboardid="+dashboard.id;
		});
		
		$(".btn_cancel_bg,.a_close").click(function(){
			easyDialog.close();
		});
		
		$("#btn_edit_owner,#btn_html_owner").click(function(){
			$(this).addClass("active");
			$(this).removeClass("cother");
			$(this).siblings(".active").addClass("cother").removeClass("active");
			dashboard.permission = 0;
		});
		
		$("#btn_edit_apply,#btn_html_apply").click(function(){
			$(this).addClass("active");
			$(this).removeClass("cother");
			$(this).siblings(".active").addClass("cother").removeClass("active");
			dashboard.permission = 1;
		});
		
		$("#btn_edit_all,#btn_html_all").click(function(){
			$(this).addClass("active");
			$(this).removeClass("cother");
			$(this).siblings(".active").addClass("cother").removeClass("active");
			dashboard.permission = 2;
		});
		
		$("#btn_edit_save").click(function(){
			//更新数据库
			var title=$("#in_edit_title").val();
			if($.trim(title)==""){
				title=dashboard.did;
			}
			var desc=$("#in_edit_desc").val();
			//写入数据库
			var updateData = {"handler":"DashboardTableHandler","action":"update", "title":title, "id":dashboard.id,"desc" : desc,"permission" : dashboard.permission};
			ajaxPost("/felix", updateData, function(rs) {
	 			if(rs["result"] == "success"){
	 				window.location.reload();
	 			}
	 		}, function() {
	 			alert("error");
	 		});
		});
		
		$("#a_edit").click(function(){
	    		//初始化数据
	    		$("#in_edit_title").val(dashboard.title);
	    		$("#in_edit_desc").val(dashboard.desc);
	    		if(dashboard.permission==0){
	    		$("#btn_edit_owner").addClass("active");
	    		$("#btn_edit_owner").siblings().addClass("cother");
	    		}else if(dashboard.permission==1){
	    			$("#btn_edit_apply").addClass("active");
	    			$("#btn_edit_apply").siblings().addClass("cother");
	    		}else if(dashboard.permission==2){
	    			$("#btn_edit_all").addClass("active");
	    			$("#btn_edit_all").siblings().addClass("cother");
	    		}
	    		easyDialog.open({
	    			container : 'edit_dialog'
	    		});
			
		});
		//复制
		$("#a_copy").click(function(){
			//初始化数据
			$("#in_title").val(dashboard.title+"_copy");
			$("#in_id").val(dashboard.did+"_copy");
			$("#in_desc").val(dashboard.desc+"_copy");
			easyDialog.open({
    			container : 'd_dialog'
    		});
		});
		
		$("#btn_copy").click(function(){
			var title=$("#in_title").val();
			var id=$("#in_id").val();
			var desc=$("#in_desc").val();
			var pattern = /^\w+$/i;
			//检查有效性
			if($.trim(id)==""){
				 $("#s_id_msg").text($.i18n.prop('dash_id_msg_empty'));
				 return;
			}else if(!id.match(pattern)){
				 $("#s_id_msg").text($.i18n.prop('dash_id_msg'));
				 return;
			}
			if($.trim(title)==""){
				title=id;
			}
			//to be done......
			var apply="search";
			//写入数据库
			insertData = {"handler":"DashboardTableHandler","action":"insert", "title":title, "id":id,"desc" : desc,"apply" : apply,"permission" : dashboard.permission};
			ajaxPost("/felix", insertData, function(rs) {
	 			if(rs["result"] == "success"){
	 				window.location.reload();
	 			}
	 		}, function() {
	 			alert("error");
	 		});
	});
		//删除
		$("#a_delete").click(function(){
			easyDialog.open({
    			container : 'del_dialog'
    		});
		});
		
		$("#btn_del_sure").click(function(){
		   	 data = {"handler":"DashboardTableHandler","action":"delete","id":dashboard.id};
		   		ajaxPost("/felix", data, function(rs) {
		   				if(rs["result"] == "success"){
		   						//返回之前的界面
		   					window.location.href="/dashboard/dashboard_table.html";
		   					}
		   			}, function() {
		   				alert("error");
		   			});
		});
		
		//转换为HTML
		$("#a_trans_html").click(function(){
			$("#in_html_title").val(dashboard.title+"_html");
			$("#in_html_desc").val(dashboard.desc+"_html");
			$("#in_html_id").val(dashboard.did+"_html");
			if(dashboard.permission==0){
				$("#btn_html_owner").addClass("active");
				$("#btn_html_owner").siblings().addClass("cother");
			}else if(dashboard.permission==1){
				$("#btn_html_apply").addClass("active");
				$("#btn_html_apply").siblings().addClass("cother");
			}else if(dashboard.permission==2){
				$("#btn_html_all").addClass("active");
				$("#btn_html_all").siblings().addClass("cother");
			}
			easyDialog.open({
				container : 'html_dialog'
			});
		});
		
		$("#btn_trans_html").click(function(){
			var title=$("#in_html_title").val();
			var did=$("#in_html_id").val();
			var desc=$("#in_html_desc").val();
			//默认是XML
			var source_type="HTML";
			//to set
			var source="";
			var pattern = /^\w+$/i;
			//检查有效性
			if($.trim(did)==""){
				 $("#s_html_id_msg").text($.i18n.prop('dash_id_msg_empty'));
				 return;
			}else if(!did.match(pattern)){
				 $("#s_html_id_msg").text($.i18n.prop('dash_id_msg'));
				 return;
			}
			if($.trim(title)==""){
				title=did;
			}
			//to be done......
			var apply="search";
			var data;
			if(is_new){
				//insert
				data = {"handler":"DashboardTableHandler","action":"insert", "title":title, "did":did,"desc" : desc,"apply" : apply,"permission" : dashboard.permission,"source_type":source_type,"source":source};
			}else{
				data = {"handler":"DashboardTableHandler","action":"updateType", "id":dashboard.id,"source_type":source_type};
			}
			ajaxPost("/felix", data, function(rs) {
	 			if(rs["result"] == "success"){
	 				window.location.reload();
	 			}
	 		}, function() {
	 			alert("error");
	 		});
		});
		
		$("#btn_new_html").click(function(){
			is_new=true;
			$(this).addClass("active");
			$(this).removeClass("cother");
			$(this).siblings(".active").addClass("cother").removeClass("active");
			$(this).parents("tr").siblings("tr").show();
		});
		
		$("#btn_replace_curr").click(function(){
			is_new=false;
			$(this).addClass("active");
			$(this).removeClass("cother");
			$(this).siblings(".active").addClass("cother").removeClass("active");
			$(this).parents("tr").siblings("tr").hide();
		});
		
		//打印
		$("#btn_print").click(function(){  
			$("#edit_main").printArea();  
		});
		
		$("#btn_export").click(function(){
			//ie8及以下浏览器不支持导出
        	var $userAgent = navigator.userAgent;
        	if( $userAgent.indexOf("compatible") > -1 && $userAgent.indexOf("MSIE") > -1 &&!($userAgent.indexOf("Opera") > -1)){
        		 var reIE = new RegExp("MSIE (\\d+\\.\\d+);");  
                 reIE.test($userAgent);  
                 var fIEVersion = parseFloat(RegExp["$1"]);
                 if(fIEVersion<9){
                	 alert("ie8及以下浏览器不支持导出功能！"); 
                	 return;
                 }
        	}
			initHighchart(panel);
		});
		
	};
	this.getQueryString = function (name){
		//得到URL参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;		
	};
};

//是新数据的结构为[[1.1,1.2,...],[],[],[]]
function getNewData(data){
	var row_data = new Array();
	var new_data=new Array();
	var exist=false;
	$.each(data,function(i,n){
		$.each(row_data,function(j,m){
			if(m==n.layoutRow){
				exist=true;
			}
		});
		if(!exist){
			row_data.push(n.layoutRow);
		}
		exist=false;
	});
	
	$.each(row_data,function(i,n){
		var temp=new Array();
		$.each(data,function(j,m){
			if(m.layoutRow==n){
				temp.push(m)
			}
		});
		new_data.push(temp);
	});
	return new_data;
}

//得到图表
//function getData(id,search,container,chart,i){
//	var params = {"handler":"SearchHandler", "queryCondition":search, "currentPage":""+1, "batchNum":""+1000,"type":"event"};
//	ajaxPost("/felix", params, function(rs) {
//		if(rs["rettype"] == "ASYN"){
//			$hdata[i].push_data_boolean = rs["task_id"];
//			$hdata[i].push_data_function=setInterval(function(){
//			$hdata[i].push_data = {"handler":"PushDataHandler", "task_id":$hdata[i].push_data_boolean};
//				ajaxPost("/felix", $hdata[i].push_data, function(ks) {
//					if(ks["rx"] == 0){
//						for(var i=0;i<$hdata.length;i++){
//							if($hdata[i].push_data_boolean == ks["taskId"]){
//								clearInterval($hdata[i].push_data_function);
//								$hdata[i].push_data_boolean = "";
//						var stats_title=$hdata[i].bk["STATS_TITILE"].split(",");
//						var name = stats_title[0];
//						var yName= stats_title[1];
//		                var pName = stats_title[2];
//						var key = new Array();
//						var value = new Array();
//		                var percent = new Array();
//						for(var j=0;j<$hdata[i].bk["SIZE"];j++){
//							key[j]=decodeURIComponent($hdata[j].bk[stats_title[0]+""+j]).replace(/\+/g,' ');
//		 			        value[j]=parseFloat(decodeURIComponent($hdata[j].bk[stats_title[1]+""+j]).replace(/\+/g,' '));
//		                  percent[j]=parseFloat(decodeURIComponent($hdata[j].bk[stats_title[2]+""+j]).replace(/\+/g,' '));
//					   }
//						panel.name=name;
//						panel.yName=yName;
//						panel.pName=pName;
//						panel.key=key;
//						panel.value=value;
//						panel.percent=percent;
//						//判断图表类型
//						//折线
//					if(chart=="brokenline"){
//							 brokenLineChart(container,name,yName,key,value);
//						//区域
//						}else if(chart=="area"){
//							 regionChart(container,name,yName,key,value);
//						//列
//						}else if(chart=="column"){
//							 columnChart(container,name,yName,key,value);
//						//栏
//						}else if(chart=="bar"){
//							barChart(container,name,yName,key,value);
//						//饼图
//						}else if(chart=="pie"){
//							pieChart(container,name,yName,key,value);
//						//散点
//						}else if(chart=="scatter"){
//							scatterChart(container,name,yName,key,value);
//						//径向仪表
//						}else if(chart=="radia"){
//							radiaChart(container,name,yName,key,value);
//		              }else if(chart=="count"){
//		              //生成表格
//		                drawTable(id,name,yName,pName,key,value,percent);
//		              }
//							}
//						}
//					}else{
//						for(var i=0;i<$hdata.length;i++){
//							if($hdata[i].push_data_boolean == ks["taskId"]){
//								$hdata[i].bk=ks;
//							}
//						}
//					}
//				},function() {
//					alert("error");
//				});
//			},1000);
//		}
//	});
//
//}

function getData(id,search,container,eContainerId,chart){
	var params = {"handler":"SynHandler", "queryCondition":search,"currentPage":""+1, "batchNum":""+1000,"type" :"TAB_TYPE_GRID"};
	var url="/felix";
	var aa = $.toJSON(params);
	var value = base64.encode(base64.utf16to8(aa));
	var jsonParams = {"json":value};
	$.ajax({
		type:"POST",
		url : url,
		data:jsonParams,
		async:true,
		dataType:"html",
		success: function(data){
			var data = base64.utf8to16(base64.decode(data));
			var rs = $.evalJSON(data);
			if(rs["queryResult"] == "OK") {
				if(rs["SIZE"]==0){
					container.html("<p>当前时间范围内没有结果。</p>");
				}else{
					var stats_title=rs["STATS_TITILE"].split(",");
					var name = stats_title[0];
					var yName= stats_title[1];
	                var pName = stats_title[2];
					var key = new Array();
					var value = new Array();
	                var percent = new Array();
					for(var i=0;i<rs["SIZE"];i++){
						var temp = decodeURIComponent(rs[stats_title[0]+""+i]).replace(/\+/g,' ');
						if(temp != "@@##########@@"){
							key[i]=temp;
		 			        value[i]=parseFloat(decodeURIComponent(rs[stats_title[1]+""+i]).replace(/\+/g,' '));
		                  percent[i]=parseFloat(decodeURIComponent(rs[stats_title[2]+""+i]).replace(/\+/g,' '));
						}
				   }
					panel[eContainerId+'_name']=name;
					panel[eContainerId+'_yName']=yName;
					panel[eContainerId+'_pName']=pName;
					panel[eContainerId+'_key']=key;
					panel[eContainerId+'_value']=value;
					panel[eContainerId+'_percent']=percent;
					//判断图表类型
					//折线
				    if(chart=="brokenline"){
						 brokenLineChart(eContainerId,name,yName,key,value);
					//区域
					}else if(chart=="area"){
						 regionChart(eContainerId,name,yName,key,value);
					//列
					}else if(chart=="column"){
						 columnChart(eContainerId,name,yName,key,value);
					//栏
					}else if(chart=="bar"){
						barChart(eContainerId,name,yName,key,value);
					//饼图
					}else if(chart=="pie"){
						pieChart(eContainerId,name,yName,key,value);
					//散点
					}else if(chart=="scatter"){
						scatterChart(eContainerId,name,yName,key,value);
					}else if(chart=="count"){
	              //生成表格
	                drawTable(id,name,yName,pName,key,value,percent);
	                mycharts[eContainerId+'_myChart']="data";
	              }
				}
				
			}
		}
	});
}

//function getData(id,search,container,chart){
//	name = "x";
//	yName= "y";
//	pName= "z";
//	key = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];
//	value = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//	percent=[10,20,30,40,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//	barChart(container,name,yName,key,value);
//}

function drawTable(id,col1,col2,col3,key,value,percent){
	var table='<table class="table table_chrome" id="table_'+id+'"><thead><tr><td>'+col1+'</td><td>'+col2+'</td><td>'+col3+'</td>'
	'</tr></thead><tbody id="t_body_'+id+'"></tbody></table>';
	$("#dashboard_cell_"+id+" .panel-body").empty();
	$("#dashboard_cell_"+id+" .panel-body").append(table);
	count_data=packagingdatatabledata(key,value,percent);
	initCountTable(id);
}

function packagingdatatabledata(key,value,percent){    
    var a = new Array();  
    var tableName=['name','count','percent'];   
    for(var k in key){
    	var tempObj=new Object();  
		tempObj.name=key[k];  
		tempObj.count=value[k];
		tempObj.percent=percent[k];  
		a.push(JSON.parse(JSON.stringify(tempObj,tableName)));   
	 }    
    return a;  
} 

function initCountTable(id){
	 oTable = $('#table_'+id).dataTable( {
	    	"aaData" :count_data,
	       // set the initial value
	       "iDisplayLength": 10,
	       "bServerSide": false,
	       "bLengthChange": false,
	       "bSort":false,
	       "aLengthMenu": [
	                       [5, 15, 20, -1],
	                       [5, 15, 20, "All"] // change per page values here
	                   ],
	       "bFilter" : false,
	       "aoColumns" : [{  
	           "mData" : "name"
	         }, {  
	           "mData" : "count"
	       }, {  
	           "mData" : "percent"
	       }]
	   });
}

function initHighchart(panel){
	var svg="";
	var titles="";
	 $.each($(".panel-body:visible"),function(i,n){
		var eId = $(n).attr('id');
		var emychart=mycharts[eId+'_myChart'];
		if(emychart=="data"){
			//导出数据
			svg = svg + "#T-~" + panel[eId+'_name'] + "," + panel[eId+'_yName'] +"," + panel[eId+'_pName']+"-~";
			for(var k in panel[eId+'_key']){
				svg = svg + panel[eId+'_key'][k]+ "," + panel[eId+'_value'][k]+ "," + panel[eId+'_percent'][k]+",";
			}
			svg = svg.substring(0,svg.length-1);
			svg = svg + "_~";
		}else {
			titles=titles + $("#dashboard_cell_"+eId.split('_')[4]+" .h_title").text() + "_~";
			//导出图片
			svg = svg + emychart.getDataURL("png") + "_~";
		}
	 });
	 svg = svg.substring(0,svg.length-2);
	 $("#in_svg").val(svg);
	 var type="pdf";
	 //向服务器传数据
	 $("#form").prop("action", "/dashboard/export?type="+type+"&title="+title+"&descrip="+desc+"&titles="+titles).submit();  
}

$(function(){
	new panel_view().init();
});

function echartClickEvent(param){
	
}

function echartDblClickEvent(param){
	
}
