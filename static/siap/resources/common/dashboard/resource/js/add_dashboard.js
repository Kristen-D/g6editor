var dashboard = function(){
	var is_new=true;
	var permission=0;
	this._init = function(){
			$("#see_dashboard").load($("#see_dashboard").attr("data-view"), function(responseTxt,statusTxt,xhr) {
				if (statusTxt == "success") {
					i18n("navigator_dashboard", '/dashboard/resource/i18n/', 'map', function() {
				 		   $('#nav_created_panel').text($.i18n.prop('nav_created_panel'));
				 		   $('#nav_see_panel').text($.i18n.prop('nav_see_panel'));
				 		   $('#btn_see_panel').text($.i18n.prop('btn_see_panel'));
				 	 });
					$("#a_dash_close").click(function(){
						easyDialog.close();
					});
				}
			});
			$("#add_dashboard").load($("#add_dashboard").attr("data-view"), function(responseTxt,statusTxt,xhr) {
				if (statusTxt == "success") {
					i18n("navigator_dashboard", '/dashboard/resource/i18n/', 'map', function() {
				 		   $('#h_save').text($.i18n.prop('h_save'));
				 		   $('#h_nav_dashboard').text($.i18n.prop('dash_nav_wrap_dashboard'));
				 		   $('#h_nav_create').text($.i18n.prop('h_nav_create'));
				 		   $('#h_nav_have').text($.i18n.prop('h_nav_have'));
				 		   $('#s_dash_title').text($.i18n.prop('s_dash_title'));
				 		   $('#h_nav_dashboardid').text($.i18n.prop('h_nav_dashboardid'));
				 		   $('#h_nav_help').text($.i18n.prop('h_nav_help'));
				 		   $('#h_nav_dashboard_description').text($.i18n.prop('h_nav_dashboard_description'));
				 		   $('#h_nav_dashboard_permission').text($.i18n.prop('h_nav_dashboard_permission'));
				 		   $('#btn_special_use').text($.i18n.prop('btn_special_use'));
				 		   $('#btn_share_apply').text($.i18n.prop('dash_nav_wrap_apply'));
				 		   $('#btn_all_use').text($.i18n.prop('btn_all_use'));
				 		   $('#h_nav_panel_title').text($.i18n.prop('h_nav_panel_title'));
				 		   $('#btn_dash_cancel').text($.i18n.prop('btn_dash_cancel'));
				 		   $('#btn_dash_add').text($.i18n.prop('btn_dash_add'));
				 	 });
				//给选择框加数据
				data = {"handler":"DashboardTableHandler","action":"select"};
				ajaxPost("/felix", data, function(rs) {
						if(rs["result"] == "success"){
								var option="";
								$.each(rs.data,function(i,n){
									option = option + "<option class='op_dash' id='op_dash_"+n.id+"'>"+decodeURI(n.title).replace(/\+/g,' ')+"</option>";
								});
								$("#dash_select").append(option);
							}
					}, function() {
						alert("error");
					});
					$(".dash_old").hide();
					$("#btn_dash_cancel,#btn_dash_close").click(function(){
						easyDialog.close();
					});
					$("#btn_dash_add").click(function(){
						//另存为仪表板
						var title=$("#in_dash_title").val();
						var did=$("#in_dash_id").val();
						var desc=$("#in_dash_desc").val();
						//默认是XML
						var source_type="XML";
						//to set
						var source="";
						var apply="search";
						var q = $("#queryCon").val();
						if(is_new){
							//新建dashboard
							var pattern = /^\w+$/i;
							//检查有效性
							if($.trim(did)==""){
								 return;
							}else if(!did.match(pattern)){
								 return;
							}
							if($.trim(title)==""){
								title=did;
							}
							insertData = {"handler":"DashboardTableHandler","action":"insert", "title":title, "did":did,"desc" : desc,"apply" : apply,"permission" : permission,"source_type":source_type,"source":source};
							ajaxPost("/felix", insertData, function(rs) {
					 			if(rs["result"] == "success"){
					 				addPanel(1,rs.dashboardId,q);
					 			}
					 		}, function() {
					 			alert("error");
					 		});
						}else{
							//在原来dashboard上加panel
							var dashboard_id=$("#dash_select :selected").attr("id").split("_")[2];
							//得到layout_row
							data = {"handler":"PanelHandler","action":"getLayout","dashboardId":dashboard_id};
							ajaxPost("/felix", data, function(rs) {
					 			if(rs["result"] == "success"){
					 				addPanel(rs.layoutRow,dashboard_id,q);
					 			}
					 		}, function() {
					 			alert("error");
					 		});
						}
					});
					$("#btn_dash_old").click(function(){
						$(".dash_new").hide();
						$(".dash_old").show();
						is_new=false;
						$(this).addClass("active");
						$(this).removeClass("cother");
						$(this).siblings(".active").addClass("cother").removeClass("active");
					});
					$("#btn_dash_new").click(function(){
						$(".dash_old").hide();
						$(".dash_new").show();
						is_new=true;
						$(this).addClass("active");
						$(this).removeClass("cother");
						$(this).siblings(".active").addClass("cother").removeClass("active");
					});
					$("#btn_special_use").click(function(){
						permission = 0;
						$(this).addClass("active");
						$(this).removeClass("cother");
						$(this).siblings(".active").addClass("cother").removeClass("active");
					});
					$("#btn_share_apply").click(function(){
						permission = 1;
						$(this).addClass("active");
						$(this).removeClass("cother");
						$(this).siblings(".active").addClass("cother").removeClass("active");
					});
					$("#btn_all_use").click(function(){
						permission = 2;
						$(this).addClass("active");
						$(this).removeClass("cother");
						$(this).siblings(".active").addClass("cother").removeClass("active");
					});
				}
			});	
		}
}
function addPanel(layout_row,dashboard_id,q){
	var panel_title=$("#in_dash_panel_title").val();
	//插入panel数据
		//写入东数据库
		var layout_col = 1;
		//默认是column
		var chart="column";
		var type=null;
		var start=null;
		var end=null;
		data = {"handler":"PanelHandler","action":"insert","title":panel_title,"search":q,"type":type,"chart":chart,"start":start,"end":end,"layout_row":layout_row,"layout_col":layout_col,"dashboardId":dashboard_id};
		ajaxPost("/felix", data, function(rs) {
				if(rs["result"] == "success"){
						easyDialog.close();
						easyDialog.open({
							container:"check_dialog"
						});
					}
			}, function() {
				alert("error");
			});
}