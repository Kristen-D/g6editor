var dashboardId;
//设置默认图表
var chart="column";
var type=null;
var start=null;
var end=null;
var stats_title;
var name;
var yName;
var pName;
var key;
var value;
var container;
var panels = new Array();
var panel;
var currId;
var panel_data = new Array();
var count_data;
var percent;
var oTable;
var temp;
var did;
var type;
var mycharts=new Object();
$(function(){	
	init();
});

function init(){
	dashboardId=getQueryString("dashboardid");
	//事件初始化
	initEvent();
	//国际化
	initField();
	//头部国际化
	initHeader();
	//初始化加载数据库数据
	initPanel(dashboardId);
}

//初始化加载数据库数据
function initPanel(dashboardId){
	//查询数据库
	ajaxPost("/felix", {"handler":"DashboardTableHandler","action":"getByOwnerAndId","id":dashboardId}, function(rrs) {
		if(rrs["result"] == "success"){
			if(rrs["size"]==0){
				alert("仪表板id不存在");
				return;
			}
			 data = {"handler":"PanelHandler","action":"select","dashboardId":dashboardId};
				ajaxPost("/felix", data, function(rs) {
						if(rs["result"] == "success"){
								//整理data按照row分组
								var newData = getNewData(rs["data"]);
								//得到数据,遍历
								$.each(newData,function(i,m){
									var dashboardRow= $("#dashboard_row").clone().show();
		        					var dashboardRowEmpty=$(".d_empty").clone(true)[0];
		        					//查询数据库得到图表
		        					$(dashboardRow).attr("id","dashboard_row_"+i);
		        					$("#edit_main").append(dashboardRow);
		        					$("#edit_main").append(dashboardRowEmpty);
		        					var num = $(m).length;
									$.each($(m),function(j,n){
										var obj = new Object();
										obj.id=n.id;
										obj.title=decodeURIComponent(n.title).replace(/\+/g,' ');
										obj.search=decodeURIComponent(n.search.replace(/\+/g,' '));
										obj.chart=n.chart;
										panel_data.push(obj);
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
										//添加拖拽事件
										initDragEvent(i);
										//初始化事件！！！！！！！！！
										initPanelEvent(id);
										var container=$("#dashboard_cell_"+id+" .panel-body");
										container.attr('id','panel_cell_panel_body_'+id);
										var eContainerId='panel_cell_panel_body_'+id;
										container.html("loading....................");
										search = decodeURIComponent(n.search.replace(/\+/g,' '));
										var chart=n.chart;
										getData(id,search,container,eContainerId,chart);
									});
											       					
								});
							}else{
								alert("仪表板id不存在");
							}
						$("#nav_wrap_dashboard").parent("li").addClass("current");
					}, function() {
						$("#nav_wrap_dashboard").parent("li").addClass("current");
						alert("error");
					});
		}
	});
}

//为新增模块添加拖拽
function initDragEvent(i){
	$("#dashboard_row_"+i+",.d_empty").sortable({ 
		connectWith: ".dashboard-row",
		dropOnEmpty: true,
		tolerance: "pointer", 
		helper:function(e,ele){
			  var cp= $(ele).clone(); 
			  $(cp).css("width",500);
			  $(cp).css("z-index",90);
			  return $(cp).clone();
		},
		placeholder : "dashboard_placeholder",
		cancel: ".panel-body,.panel-head"
	}).disableSelection();
	
//	$('#dashboard_row_1,#dashboard_row_2,.empty').bind('sortout', function(event, ui) {alert("out")}); 
	$("#dashboard_row_"+i).bind('sortremove', function(event, ui) {
		if($(this).children().length==0){
			$(this).next().remove(); 
			$(this).remove();			
		}else{
			var num = $(this).children().length;
			$.each($(this).children(),function(i,n){
	 			$(n).css("width",100/num+"%");
	 		});
		}
	});
	$("#dashboard_row_"+i+",.d_empty").bind('sortreceive', function(event, ui) {
		var num = $(this).children().length;
		$.each($(this).children(),function(i,n){
 			$(n).css("width",100/num+"%");
 		});
		if($(this).attr("class").indexOf("d_empty")>=0){
				$(this).removeClass("d_empty");
				$(this).parent().append($(this).siblings(".d_empty").first().clone(true));
		}
		//整理所有
		$.each($(".dashboard-row"),function(i,n){
			var  num = $(n).children().length;
			if(num > 0){
			$.each($(n).children(),function(i,n){
				$(n).css("width",100/num+"%");
			});
			}
		});
		//检查结构第一个和最后一个是否是空的，不是就添加
		if($(this).parent().children().eq(1).attr("class").indexOf("d_empty")<0){
			$(this).parent().children().eq(0).after($(this).siblings(".d_empty").first().clone(true));
		}
		if($(this).parent().children().last().attr("class").indexOf("d_empty")<0){
			$(this).parent().append($(this).siblings(".d_empty").first().clone(true));
		}
		//resize
		$.each($(".panel-body:visible"),function(i,n){
			var eId = $(n).attr('id');
			var emychart=mycharts[eId+'_myChart'];
			if(emychart!="data"){
				emychart.resize();
			}
		});
		var layout_row;
		var layout_col;
		var id;
		//遍历所有得到新的布局
		$.each($(".dashboard-row:not(.d_empty):visible"),function(i,n){
			$.each($(this).children(),function(j,m){
				id=$(this).attr("id").split("_")[2];
				layout_row=i+1;
				layout_col=j+1;
				//更新数据库
				var data = {"handler":"PanelHandler","action":"updateLayout","layout_row":layout_row,"layout_col":layout_col,"id":id};
		 		ajaxPost("/felix", data, function(rs) {
		 				if(rs["result"] == "success"){
		 						
		 					}
		 			}, function() {
		 			//	alert("error");
		 			});
			});
		});
		
	});
	$("#dashboard_row_"+i+",.d_empty").bind('sort', function(event, ui) {
		 $.each($(".dashboard-row"),function(m,n){
			 //jquery ui 貌似和datatables有冲突，在此判断是否是datatable来的还是jquery ui的
			 if(ui.helper!=undefined){
				if(isContain(ui.helper[0],n)){
					var isOneLine=false;
					//同行
					$.each($(this).children(),function(m,n){
						if($(n).attr("id") == ui.item.attr("id")){
							isOneLine=true;
							var num = $(n).parent().children().length-2;
							$(".dashboard_placeholder").css("width",100/num+"%");
							//解决边界有宽度的问题
							var width=$(".dashboard_placeholder").css("width");
							width=parseInt(width.substring(0,width.length-2))-4;
							$(".dashboard_placeholder").css("width",width+"px");
						}
					});
					if(isOneLine==false){
			 		var num = $(this).children().length;
			 		$.each($(this).children(),function(i,n){
			 			$(n).css("width",100/num+"%");
			 			
			 		//	$(ui.item).css("width",width/num+"%");
			 		});
			 		$(".dashboard_placeholder").css("width",100/num+"%");
			 		//解决边界有宽度的问题
					var width=$(".dashboard_placeholder").css("width");
					width=parseInt(width.substring(0,width.length-2))-4;
					$(".dashboard_placeholder").css("width",width+"px");
					}
				}
			 	}
			 });
	});
}

function initEvent(){
        
        $("#btn_add_panel").click(function(){
        	//显示添加按钮隐藏显示按钮
        	$("#btn_add").show();
        	$("#btn_save").hide();
        	$('#in_title').val('');
        	$('#in_search').val('');
        	$("#h_create").text($.i18n.prop('dash_create_panel'));
        	easyDialog.open({
    			container : 'd_dialog'
    			});
        });
        
        $("#btn_cancel,.a_close").click(function(){
        	easyDialog.close();	
        });
        
        $("#btn_del_sure").click(function(){
        	//删除
        	 data = {"handler":"PanelHandler","action":"delete","id":currId};
        		ajaxPost("/felix", data, function(rs) {
        				if(rs["result"] == "success"){
        						//刷新
        					window.location.reload();
        					}
        			}, function() {
        				alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
        			});
        	 
        });
        
        $("#btn_del_cancel").click(function(){
        	easyDialog.close();
        });
        
        $(".close,.modal-btn-cancel").click(function(){
        	easyDialog.close();
        });
        
        $("#btn_add").click(function(){
        	addPanel();
        });
        
        $("#btn_finish").click(function(){
        	window.location.href="/dashboard/panel_view.html?dashboardid="+dashboardId;
        });
        
        //更新
        $("#btn_save").click(function(){
        	title=$("#in_title").val();
        	search=$("#in_search").val();
        	data = {"handler":"PanelHandler","action":"updateTitle","title":title,"search":search,"id":currId};
        	ajaxPost("/felix", data, function(rs) {
        			if(rs["result"] == "success"){
        					window.location.reload();
        				}
        		}, function() {
        			alert("error");
        		});
        });
       
        $(".btn_rt_bg").click(function(){
		    var title=$("#report_title").val();
			var descrip=$("#report_descrip").val();
			var owner=$cookie._getCookie("USERNAME");
			var apply="search";
			var permission="专用";
			var sameflag=false;
			data = {"handler":"ReportHandler","action":"select"};
  		    ajaxPost("/felix", data, function(rs) {
  				if(rs["result"] == "success"){
  					for(var j=0;j<rs['data'].length;j++){
  		        		if(decodeURIComponent(rs['data'][j].title).replace(/\+/g,' ')==title){
  		        			sameflag=true;
  		        			break;
  		        		}
  		        	}
  					if($.trim(title)==""){
  						$("#report_title_msg").addClass("modal_i_msg");
  		        		$("#report_title_msg").text("In handler 'ReportHandler': Cannot create an object with empty or all whitespace name ");
  		    			return;
  		    		}else if(sameflag){
  		    			$("#report_title_msg").addClass("modal_i_msg");
  		    			$("#report_title_msg").text("In handler 'ReportHandler':  Unable to create report search with name'"+title+"'. A report search with that name already exists.  ");
  		    		}else{
  		    			data = {"handler":"ReportHandler","action":"insert", "title":title, "did":did,"owner" : owner,"apply" : apply,"permission" : permission,"type":type,"descrip":descrip,"sindex":"","startTime":"0","endTime":"0","reportStartTime":"","reportEndTime":"","reportSearchDiff":"0"};
                          ajaxPost("/felix", data, function(rs) {
                          	if(rs["result"] == "success"){
                          		easyDialog.close();
                          	}
                          	});
  		    		}
  				}
  		});	
		});
}

function addPanel(){
	//写入东数据库
	title=$("#in_title").val();
	search=$("#in_search").val();
	//得到布局
	var layout_row = $(".dashboard-row:not(.d_empty):visible").length + 1;
	var layout_col = 1;
	data = {"handler":"PanelHandler","action":"insert","title":title,"search":search,"type":type,"chart":chart,"start":start,"end":end,"layout_row":layout_row,"layout_col":layout_col,"dashboardId":dashboardId};
	ajaxPost("/felix", data, function(rs) {
			if(rs["result"] == "success"){
					easyDialog.close();
					$("#in_title").val("");
					$("#in_search").val("");
					//得到panel的div
					var id=rs["id"];
					var dashboardRow= $("#dashboard_row").clone().show();
					var dashboardRowEmpty=$(".d_empty").clone()[0];
					//查询数据库得到图表
					$(dashboardRow).attr("id","dashboard_row_"+id);
					//给dashboard-cell 加id
					var dashboard_cell=$("#dashboard_cell").clone().show();
					$(dashboard_cell).attr("id","dashboard_cell_"+id);
					$("#edit_main").append(dashboardRow);
					$("#edit_main").append(dashboardRowEmpty);
					$("#dashboard_row_"+id).append(dashboard_cell);
					//加title
					$("#dashboard_cell_"+id+" .h_title").html(title);
					//
					var obj = new Object();
					obj.id=id;
					obj.title=title;
					obj.search=search;
					obj.chart="column";
					panel_data.push(obj);
					//添加拖拽
					initDragEvent(id)
					//初始化事件！！！！！！！！！
					initPanelEvent(id);
					container=$("#dashboard_row_"+id+" .panel-body");
					container.attr('id','panel_cell_panel_body_'+id);
					var eContainerId='panel_cell_panel_body_'+id;
					container.html("loading....................");
					//得到图表
					getData(id,search,container,eContainerId,"column");
					
				}
		}, function() {
			alert("error");
		});
}

//给仪表板按钮加事件
function initPanelEvent(id){
	$('#dashboard_cell_'+id+' .panel-editor li').eq(0).click(function(event) {
		 event.stopPropagation();
		 $('#dashboard_cell_'+id+' .edit-wrap5').removeClass('editor-bg');
		 $('.editor-bg').hide();
		 $('#dashboard_cell_'+id+' .edit-wrap5').addClass('editor-bg');
		 $('#dashboard_cell_'+id+' .edit-wrap5').toggle();
		 $('.edit-wrap6').hide();
		 $('.panel-editor li').removeClass('active');
		 $('#dashboard_cell_'+id+' .panel-editor li').eq(0).addClass('active');
	    });
	    $(document).click(function() {
	     $('.edit-wrap5').hide();
	     $('.edit-wrap6').hide();
		 $('.panel-editor li').removeClass('active');
	    });
		$('#dashboard_cell_'+id+' .panel-editor li').eq(1).click(function(event) {
		  event.stopPropagation();
		  $('#dashboard_cell_'+id+' .edit-wrap5').removeClass('editor-bg');
	      $('.editor-bg').hide();
		  $('#dashboard_cell_'+id+' .edit-wrap5').addClass('editor-bg');
		  $('#dashboard_cell_'+id+' .edit-wrap6').toggle();
		  $('.edit-wrap5').hide();
		  $('.panel-editor li').removeClass('active');
		  $('#dashboard_cell_'+id+' .panel-editor li').eq(1).addClass('active');
	    });
	    //搜索框事件
	    initSearchEvent(id);
	    initChartEvent(id);
	    //国际化
	    interField();
}

//给仪表板选择图像加事件
function initChartEvent(id){
	
	$('#dashboard_cell_'+id+' .a_chart').click(function(){
		var currLi=$(this);
		var parent = $(this).parents(".dashboard-cell");
		var currId = parent.attr("id").split("_")[2];
		container = $('#dashboard_cell_'+id+' .panel-body');
		container.attr('id','panel_cell_panel_body_'+id);
		var eContainerId='panel_cell_panel_body_'+id;
		//得到key 和 value
		$.each(panels,function(i,n){
			if(n.id == currId){
				var chart;
				//折线
				if($(currLi).attr("class").indexOf("a_line")>=0){
					chart="brokenline"
					brokenLineChart(eContainerId,n.name,n.yName,n.key,n.value);
				//区域
				}else if($(currLi).attr("class").indexOf("a_area")>=0){
					chart="area";
					regionChart(eContainerId,n.name,n.yName,n.key,n.value);
				//列
				}else if($(currLi).attr("class").indexOf("a_column")>=0){
					chart="column";
					columnChart(eContainerId,n.name,n.yName,n.key,n.value);
				//栏
				}else if($(currLi).attr("class").indexOf("a_bar")>=0){
					chart="bar";
					barChart(eContainerId,n.name,n.yName,n.key,n.value);
				//饼图
				}else if($(currLi).attr("class").indexOf("a_pie")>=0){
					chart="pie";
					pieChart(eContainerId,n.name,n.yName,n.key,n.value);
				//散点
				}else if($(currLi).attr("class").indexOf("a_scatter")>=0){
					chart="scatter";
					scatterChart(eContainerId,n.name,n.yName,n.key,n.value);
				//统计信息
				}else if($(currLi).attr("class").indexOf("a_count")>=0){
					chart="count";
					//生成表格
					drawTable(n.id,n.name,n.yName,n.pName,n);
				}	
				//向数据库写数据更新图形类型
				data = {"handler":"PanelHandler","action":"update","id":currId,"chart":chart};
	        	ajaxPost("/felix", data, function(rs) {
	        			if(rs["result"] == "success"){
	        					//To do nothing
	        				}
	        		}, function() {
	        			alert("error");
	        		});
			}
		});
		
	});
}


//绑定搜索按钮下的事件
function  initSearchEvent(id){
	//删除事件
	$('#dashboard_cell_'+id+' .a_del').click(function(){
		var parent = $(this).parents(".dashboard-cell");
		currId = parent.attr("id").split("_")[2];
		easyDialog.open({
			container : 'del_dialog'
			});
	});
	//编辑标题及搜索字符串
	$('#dashboard_cell_'+id+' .a_search').click(function(){
		var parent = $(this).parents(".dashboard-cell");
		currId = parent.attr("id").split("_")[2];
		//遍历panels得到数据
		$.each(panel_data,function(i,n){
			if(n.id==currId){
				$("#in_title").val(n.title);
				$("#in_search").val(n.search);
			}
		});
		
		//隐藏添加按钮显示更新按钮
		$("#btn_save").show();
		$("#btn_add").hide();
		$("#h_create").text($.i18n.prop('dash_edit_search'));
		easyDialog.open({
			container : 'd_dialog'
			});
	});

	//转换为报表
	$('#dashboard_cell_'+id+' .a_trans').click(function(){
		var parent = $(this).parents(".dashboard-cell");
		currId = parent.attr("id").split("_")[2];
		//遍历panels得到数据
		$.each(panel_data,function(i,n){
			if(n.id==currId){
				$("#report_title").val(n.title);
				did=n.search;
				type=n.chart;
			}
		});
		
		easyDialog.open({
			container : 'b_dialog'
			});
		
		/*  $(".btn_rt_bg").click(function(){
			    var title=$("#report_title").val();
				var descrip=$("#report_descrip").val();
				var owner=$cookie._getCookie("USERNAME");
				var apply="search";
				var permission="专用";
				var sameflag=false;
				data = {"handler":"ReportHandler","action":"select"};
	    		ajaxPost("/felix", data, function(rs) {
	    				if(rs["result"] == "success"){
	    					for(var j=0;j<rs['data'].length;j++){
	    		        		if(decodeURIComponent(rs['data'][j].title).replace(/\+/g,' ')==title){
	    		        			sameflag=true;
	    		        			break;
	    		        		}
	    		        	}
	    					if($.trim(title)==""){
	    						$("#report_title_msg").addClass("modal_i_msg");
	    		        		$("#report_title_msg").text("In handler 'ReportHandler': Cannot create an object with empty or all whitespace name ");
	    		    			return;
	    		    		}else if(sameflag){
	    		    			$("#report_title_msg").addClass("modal_i_msg");
	    		    			$("#report_title_msg").text("In handler 'ReportHandler':  Unable to create report search with name'"+title+"'. A report search with that name already exists.  ");
	    		    		}else{
	    		    			data = {"handler":"ReportHandler","action":"insert", "title":title, "did":did,"owner" : owner,"apply" : apply,"permission" : permission,"type":type,"descrip":descrip,"sindex":"","startTime":"0","endTime":"0","reportStartTime":"0","reportEndTime":"0","reportSearchDiff":"0"};
	                            ajaxPost("/felix", data, function(rs) {
	                            	if(rs["result"] == "success"){
	                            		easyDialog.close();
	                            	}
	                            	});
	    		    		}
	    				}
	    		});	
			});*/
	});

}

//国际化下拉菜单内容
function interField(){
	i18n("dashboard", '/dashboard/resource/i18n/', 'map', function() {
		 $(".s_line").text($.i18n.prop('dash_line'));
		 $(".s_area").text($.i18n.prop('dash_area'));
		 $(".s_column").text($.i18n.prop('dash_column'));
		 $(".s_bar").text($.i18n.prop('dash_bar'));
		 $(".s_pie").text($.i18n.prop('dash_pie'));
		 $(".s_scatter").text($.i18n.prop('dash_scatter'));
		 $(".s_radial").text($.i18n.prop('dash_radial'));
		 $(".s_inner_search").text($.i18n.prop('dash_inner_search'));
		 $(".s_edit_title").text($.i18n.prop('dash_edit_title'));
		 $(".s_edit_search").text($.i18n.prop('dash_edit_search'));
		 $(".s_trans_report").text($.i18n.prop('dash_trans_report'));
		 $(".s_del").text($.i18n.prop('dash_del'));
	});
}

function initField(){
	i18n("dashboard", '/dashboard/resource/i18n/', 'map', function() {
		   $("#s_add_panel").text($.i18n.prop('dash_add_panel'));
		   $("#s_edit_source").text($.i18n.prop('dash_edit_source'));
		   $(".s_title").text($.i18n.prop('dash_title'));
		   $("#s_finish").text($.i18n.prop('dash_finish'));
		   $("#s_edit").text($.i18n.prop('dash_edit'));
		   $(".s_search").text($.i18n.prop('dash_search_string'));
		   $("#btn_cancel").text($.i18n.prop('dash_cancel'));
		   $("#btn_add").text($.i18n.prop('dash_create_panel'));
		   $("#btn_del_cancel").text($.i18n.prop('dash_cancel'));
		   $("#btn_del_sure").text($.i18n.prop('dash_del'));
		   $("#h_msg").text($.i18n.prop('dash_del_msg'));
		   $("#h_create").text($.i18n.prop('dash_create_panel'));
		   $("#h_del_panel").text($.i18n.prop('dash_del'));
		   $("#btn_save").text($.i18n.prop('dash_save'));
	});
}

function initHeader(){
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
}

//得到URL参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
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

//判断是否包含
function isContain(m,n){
		if(m.offsetTop > n.offsetTop && m.offsetTop < (n.offsetTop+m.offsetHeight)){
			 return true;
		 }else{
			 return false;
}
}

//判断是否同一行
function isNotOneLine(m,n){
	if(m.originalPosition.top == n.offsetTop){
		return true;
	}else{
		return false;
	}
}

//不知道search是否会对重复调用产生影响
//function getData(id,search,container,chart){
//	var params = {"handler":"SearchHandler", "queryCondition":search, "currentPage":""+1, "batchNum":""+1000};
//	var url="/felix";
//	var aa = $.toJSON(params);
//	var value = base64.encode(base64.utf16to8(aa));
//	var jsonParams = {"json":value};
//	$.ajax({
//		type:"POST",
//		url : url,
//		data:jsonParams,
//		async:true,
//		dataType:"html",
//		timeout: 5000,
//		error: function (XMLHttpRequest, textStatus, errorThrown) {
//        	// 请求超时
//            if (textStatus == "timeout") { 
//            	// 递归调用
//            	getData(id,search,container,chart); 
//            }else{
//                	alert("error");
//                }
//         },
//		success: function(data,status){
//			var data = base64.utf8to16(base64.decode(data));
//			var rs = $.evalJSON(data);
//			if(rs["rx"] == 0){
//				status = "finish";
//				stats_title=temp["STATS_TITILE"].split(",");
//				name = stats_title[0];
//				yName= stats_title[1];
//				pName= stats_title[2];
//				key = new Array();
//				value = new Array();
//				percent = new Array();
//				for(var i=0;i<temp["SIZE"];i++){
//					key[i]=decodeURIComponent(temp[stats_title[0]+""+i]).replace(/\+/g,' ');
// 			        value[i]=parseFloat(decodeURIComponent(temp[stats_title[1]+""+i]).replace(/\+/g,' '));
// 			        percent[i]=parseFloat(decodeURIComponent(temp[stats_title[2]+""+i]).replace(/\+/g,' '));
// 			   }
//				panel = new Object();
//				panel.id=id;
//				panel.key=key;
//				panel.value=value;
//                panel.name=name;
//                panel.yName=yName;
//                panel.percent=percent;
//				panels.push(panel);
//				//判断图表类型
//				//折线
//				if(chart=="brokenline"){
//					brokenLineChart(container,name,yName,key,value);
//				//区域
//				}else if(chart=="area"){
//					regionChart(container,name,yName,key,value);
//				//列
//				}else if(chart=="column"){
//					columnChart(container,name,yName,key,value);
//				//栏
//				}else if(chart=="bar"){
//					barChart(container,name,yName,key,value);
//				//饼图
//				}else if(chart=="pie"){
//					pieChart(container,name,yName,key,value);
//				//散点
//				}else if(chart=="scatter"){
//					scatterChart(container,name,yName,key,value);
//				//径向仪表
//				}else if(chart=="radia"){
//					radiaChart(container,name,yName,key,value);
//				}else if(chart=="count"){
//					//生成表格
//					drawTable(id,name,yName,pName,panel);
//				}
//			}
//			if (status == "success") {
//        		temp = rs;
//        		//递归调用
//				getData(id,search,container,chart); 
//        	}
//		}
//	});
//}

function getData(id,search,container,eContainerId,chart){
	var params = {"handler":"SynHandler", "queryCondition":search, "startTime":"0","endTime":"0","currentPage":""+1, "batchNum":""+1000,"type" :"TAB_TYPE_GRID","index":""};
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
			if(rs["result"] == "OK") {
				if(rs["SIZE"]==0){
					container.html("<p>当前时间范围内没有结果。</p>");
				}else{
					stats_title=rs["STATS_TITILE"].split(",");
					name = stats_title[0];
					yName= stats_title[1];
					pName= stats_title[2];
					key = new Array();
					value = new Array();
					percent = new Array();
					for(var i=0;i<rs["SIZE"];i++){
						var temp = decodeURIComponent(rs[stats_title[0]+""+i]).replace(/\+/g,' ');
						if(temp != "@@##########@@"){
							key[i]=temp;
		 			        value[i]=parseFloat(decodeURIComponent(rs[stats_title[1]+""+i]).replace(/\+/g,' '));
		                  percent[i]=parseFloat(decodeURIComponent(rs[stats_title[2]+""+i]).replace(/\+/g,' '));
						}
	 			   }
					panel = new Object();
					panel.id=id;
					panel.key=key;
					panel.value=value;
	                panel.name=name;
	                panel.yName=yName;
	                panel.percent=percent;
	                panel.pName = pName;
					panels.push(panel);
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
						drawTable(id,name,yName,pName,panel);
						mycharts[eContainerId+'_myChart']="data";
						container.resize(function(){
							drawTable(id,name,yName,pName,panel);
						});
					}
				}			
		  }
		}
	});
}


//function getData(id,container,chart){
//name = "x";
//yName= "y";
//pName= "z";
//key = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];
//value = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//percent=[10,20,30,40,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//panel = new Object();
//panel.id=id;
//panel.key=key;
//panel.value=value;
//panel.name=name;
//panel.yName=yName;
//panel.percent=percent;
//panels.push(panel);
//columnChart(container,name,yName,key,value);
//}

function drawTable(id,col1,col2,col3,panel){
	var table='<table class="table table_chrome" id="table_'+id+'"><thead><tr><td>'+col1+'</td><td>'+col2+'</td><td>'+col3+'</td>'
	'</tr></thead><tbody id="t_body_'+id+'"></tbody></table>';
	$("#dashboard_cell_"+id+" .panel-body").empty();
	$("#dashboard_cell_"+id+" .panel-body").append(table);
	count_data=packagingdatatabledata(panel);
	initCountTable(id);
}

function packagingdatatabledata(panel){    
    var a = new Array();  
    var tableName=['name','count','percent'];   
		   for(var k in panel.key){
			   var tempObj=new Object();  
		       tempObj.name=panel.key[k];  
		       tempObj.count=panel.value[k];
		       tempObj.percent=panel.percent[k];  
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
function echartClickEvent(param){
	
}

function echartDblClickEvent(param){
	
}