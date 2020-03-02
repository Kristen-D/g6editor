var Paking=function(){
	var alarm_pageNo =1;

	this._init=function(){
		this._initHead();
		this._initEvent();
	};
	
	this._initHead=function(){
		//判断是否加载页头
		var head = getUrlVar("head");
		var cookie_head=$cookie._getCookie("HEAD");
		if (head != undefined && head != "undefined") {
			head=head.split("#")[0];
			if(cookie_head==""||(cookie_head!=""&&cookie_head!=head)){
				$cookie._deleteCookie("HEAD");
				$cookie._addCookie("HEAD",head,1);
			}
		}else{
			head=cookie_head;
		}
		if(head=="false"){
			return;
		}
		this._initHeader();
		this._initFooter();
	};
	
	this._initEvent=function(){
		$(document).click(function(event) {
			var id=$(event.target).attr('id');
			if(id=="nav_account_set"){
				event.stopPropagation();
				$('#d_systemUser').hide();
				$('#d_systemAction').hide();
				$('#d_systemNews').hide();
				$('#d_systemMenu').toggle();
			}else if(id=="nav_account_news"){
				event.stopPropagation();
				$('#d_systemMenu').hide();
				$('#d_systemUser').hide();
				$('#d_systemAction').hide();
				$('#d_systemNews').toggle();
				$("#alerm_page_"+alarm_pageNo).hide();
				alarm_pageNo=1;
				$("#alerm_page_"+alarm_pageNo).show();
			}else if(id=="nav_account_user"){
				event.stopPropagation();
				$('#d_systemMenu').hide();
				$('#d_systemAction').hide();
				$('#d_systemUser').toggle();
				$('#d_systemNews').hide();
			}else if(id=="nav_account_action"){
				event.stopPropagation();
				$('#d_systemMenu').hide();
				$('#d_systemUser').hide();
				$('#d_systemAction').toggle();
				$('#d_systemNews').hide();
			}else if(id=="nav_user_cancel"){
				//删除cookie
				$cookie._deleteAllCookie();
				window.location.href="/index.html";
			}else {
				if(!$(event.target).parents("#d_systemNews").size()>0&&$(event.target).attr('id')!="d_systemNews"){
				$('#d_systemMenu').hide();
				$('#d_systemUser').hide();
				$('#d_systemAction').hide();
				$('#d_systemNews').hide();
				}
			}
		});
	};
	
	this._initHeader=function(){
		$("#header").load($("#header").attr("data-view"), function(responseTxt,statusTxt,xhr){
			 if(statusTxt=="success") {
				 var index = $("#header").attr("data-view").indexOf("/component");
				 var path = $("#header").attr("data-view").substr(0,index);
				 getUserInfo();
				$("#task_history").click(function(){
					window.location.href="/activity/taskhistory.html";
				});
				$("#system_state").click(function(){
					window.location.href="/system/monitor/monitor.html";
				});
				
				getTitle();
				getVersionInfo();
				
				//实例化alarm
				var alarm = new Alarm();
				//初始化
				alarm._init();
				//运行周期
				alarm._doJob();
			 }
		});
	};
	this._initFooter=function(){
		$("#footer").load($("#footer").attr("data-view"), function(responseTxt,statusTxt,xhr){
			 if(statusTxt=="success") {
				 var index = $("#footer").attr("data-view").indexOf("/component");
				 var path = $("#footer").attr("data-view").substr(0,index);
				 $("#footer_about").click(function(){
					 //从配置中读信息
					 var $data = {"handler":"CommonHandler"};
					 ajaxPost("/felix", $data, function(rs) {
							if(rs["result"] == "OK"){
								 $("#s_version").text(rs["pakingVersion"]);
								 $("#s_curr_apply").text(rs["currentApply"]);
								 $("#s_apply_version").text(rs["applyVersion"]);
								 $("#s_server_name").text(rs["serverName"]);
							}
						}, function() {
							alert("error");
					});
					 easyDialog.open({
						 container : 'about_dialog'
					 });
				 });
				 $(".close_about").click(function(){
					 easyDialog.close();
				 });
			 }
		});
	};
	
	function getTitle(){		 
		 var $data = {"handler":"TitleHandler","action":"getTitle"};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK"){
					var logo=decodeURIComponent(rs['title_logo']).replace(/\+/g,' ');
					var name=decodeURIComponent(rs['title_name']).replace(/\+/g,' ');
					$('#title_head_logo').css("visibility","visible");
					$('#title_head_logo').attr("src","/resource/images/head/"+logo+"HeadLogo.png");
					$('#title_head_text').text(name);
				}else{
					$('#title_head_logo').css("visibility","visible");
					$('#title_head_logo').attr("src","/resource/images/head/pakingHeadLogo.png");
				}
			}, function() {
				$('#title_head_logo').css("visibility","visible");
				$('#title_head_logo').attr("src","/resource/images/head/pakingHeadLogo.png");
		});
	}
	function getVersionInfo(){		 
		 var $data = {"handler":"CommonHandler","action":""};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK"){
					var name=decodeURIComponent(rs['ausversion']).replace(/\+/g,' ');
					//$('#versioninfo').text("版本信息："+name);					
					$('#feedback_a').text("asiainfo"+"    版本信息："+name);
				}else{
					var name="无";
					//$('#versioninfo').text("版本信息："+name);
					$('#feedback_a').text("asiainfo"+"    版本信息："+name);
				}
			}, function() {
				var name="获取版本失败";
				//$('#versioninfo').text("版本信息："+name);
				$('#feedback_a').text("asiainfo"+"    版本信息："+name);
		});
	}
	
	function getUserInfo(){
		if($cookie._getCookie("USERNAME")!=""){
			$("#nav_account_user").html($cookie._getCookie("USERNAME"));
			return;
		}
		var data = {"handler":"LoginHandler","action":"getUserInfo"};
		ajaxPost("/felix", data, function(rs) {
			if(rs["result"] == "OK"){
				if (rs["logon"] == "SUCCESS") {
					$cookie._addCookie("USERNAME",rs["username"],1);
					$cookie._addCookie("ROLE",rs["role"],1);
					$cookie._addCookie("GROUP",rs["group"],1);
					$cookie._addCookie("ID",rs["id"],1);
					$cookie._addCookie("INDEX",rs["index"],1);
					$("#nav_account_user").html(rs["username"]);
				}
			} 
		}, function() {
		});
	}
	
	//告警显示
	var Alarm = function (){
		var $alarmMenu = $('#d_messageMenu');
		var $alarmNum = $("#s_alarm_num");
		var $alarmContent = $("#d_alarm_dl");
		var $alarmDeleteAll = $("#a_delete_all");
		var $alarmDelete;
		var $alarmTask;
		this._init = function(){
			this._initDeleteAll();
		};
		this._initDeleteAll = function(){
			$alarmDeleteAll.click(function(){
				if($cookie._getCookie("ROLE")!="2"){
					return;
				}
				var $data = {"handler":"HttpAlarmHandler","action":"deleteall"};
				 ajaxPost("/felix", $data, function(rs) {
						if(rs["result"] == "OK"){
							$alarmNum.hide();
						}
					}, function() {
						alert("删除失败");
				});
			});
		};
		this._doJob = function(){
			//定时周期任务调用
			$alarmTask = setInterval(function(){
				getAlarm();
			},2000);
		};
		function getAlarm(){
			 var $data = {"handler":"HttpAlarmHandler","action":"select"};
			 ajaxPost("/felix", $data, function(rs) {
					if(rs["result"] == "OK"){
						$alarmContent.empty();
						if(rs.num==0){
							$alarmContent.append("没有任何消息。");
							$alarmNum.hide();
							$('.e_more').hide();
							$('.e_all_del').hide();
							$('#d_alarm_dl').css('margin-bottom','10px');
						}else{
							$alarmNum.html(rs.num);
							$alarmNum.show();
							$('.e_more').show();
							$('.e_all_del').show();
							$('#d_alarm_dl').css('margin-bottom','36px');
							rs.alarms.sort(function(a,b){
								return b.time-a.time;
							});
							var contenttmp="";
							var maxNum=rs.num<5?rs.num:5;
							for(var j=0;j<maxNum;j++){
								contenttmp="";
								var $date = new Date(rs.alarms[j].time);
								contenttmp="<dt>"+(j+1)+"、 "+$date.toLocaleString()+"</dt><dd>从"+rs.alarms[j].source+"发现告警信息:"+(rs.alarms[j].alarmInfo+"!").replace("!!","!").replace(".!","!").replace("!"," !")+" <a href='javascript:void(0)' id='"+rs.alarms[j].source+"_~_"+rs.alarms[j].sourceType+"_~_"+rs.alarms[j].type+"_~_"+rs.alarms[j].alarmCode+"' class='alarm_delete'>删除</a></dd>";
								$alarmContent.append(contenttmp);
							}
							if($cookie._getCookie("ROLE")!="2"){
								$(".alarm_delete").removeClass("alarm_gray");
								$('#a_delete_all').removeClass("alarm_gray");
								$(".alarm_delete").addClass("alarm_gray");
							    $('#a_delete_all').addClass("alarm_gray");
							}else{
								$(".alarm_delete").removeClass("alarm_gray");
								$('#a_delete_all').removeClass("alarm_gray");
							}
							//绑定删除
							$alarmDelete = $(".alarm_delete");
							//绑定删除事件
							deleteEvent();
						}
					}
				}, function() {
					clearInterval($alarmTask);
			});
		};
		function deleteEvent(){
			$alarmDelete.click(function(){
				if($cookie._getCookie("ROLE")!="2"){
					return;
				}
				var ids = this.id.split("_~_");
				var $source = ids[0];
				var $sourceType = ids[1];
				var $type = ids[2];
				var $alarmCode = ids[3];
				var $data = {"handler":"HttpAlarmHandler","action":"delete","source":$source,"sourceType":$sourceType,"type":$type,"alarmCode":$alarmCode};
				 ajaxPost("/felix", $data, function(rs) {
						if(rs["result"] == "OK"){
							getAlarm();
						}
					}, function() {
						alert("删除失败");
				});
			});
		};
	};
	
};

$(function(){
	new Paking()._init();
});