$(document).ready(function(){
	
//	i18n("common", '/resource/i18n/', 'map', function() {
//		   //平台标题
//		   $('title').text($.i18n.prop('aus_title'));
//	});
	
	i18n("login", '/resource/i18n/', 'map', function() {
		   // 登录标题
		   $('#login h1').text($.i18n.prop('login_title'));
		   // 显示“用户名”
		   $('#username').attr('placeholder', $.i18n.prop('login_username')); 
           // 显示“密码”
		   $('#password').attr('placeholder', $.i18n.prop('login_password')); 
		   // 显示“验证码”
		   $('#checkCodeInput').attr('placeholder', $.i18n.prop('login_checkcode')); 
		   // 显示“登录”
		   $('#submit').val($.i18n.prop('login_login')); 
	       // 显示“清空”
		   $('#reset').val($.i18n.prop('login_clear')); 
	});
	
	$cookie._deleteAllCookie();
	getTitle();
	
	/**
	 * 登录
	 */
	$("#username").keydown(function(e){
		if(e.keyCode==13){
			login();
		}
	});
	$("#password").keydown(function(e){
		if(e.keyCode==13){
			login();
		}
	});
	$("#checkCodeInput").keydown(function(e){
		if(e.keyCode==13){
			login();
		}
	});
	$("#submit").click(function(){
		login();
	});
	
	function getTitle(){
		var $data = {"handler":"TitleHandler","action":"getTitle"};
		 ajaxPost("/felix", $data, function(rs) {
				if(rs["result"] == "OK"){
					var logo=decodeURIComponent(rs['title_logo']).replace(/\+/g,' ');
					var name=decodeURIComponent(rs['title_name']).replace(/\+/g,' ');
					$('#title_logo_img').css("visibility","visible");
					$('#title_logo_img').attr("src","/resource/images/head/"+logo+"Logo.png");
					$('#index_title').text(name);
				}else{
					$('#title_logo_img').css("visibility","visible");
					$('#title_logo_img').attr("src","/resource/images/head/pakingLogo.png");
				}
			}, function() {
				$('#title_logo_img').css("visibility","visible");
				$('#title_logo_img').attr("src","/resource/images/head/pakingLogo.png");
		});
	}
	
	function login(){
		if($('#submit').hasClass("btn-gray-inverse")){
			return;
		}
		var userName = $("#username").val();
		var password = $("#password").val();
		var checkcode = $("#checkCodeInput").val();
		
		if ($.trim(checkcode) == "" || $.trim(userName) == "" || $.trim(password) == "") {
			alert("用户名、密码和验证码不能为空");
			return;
		} if (!validateCheckCode()) {
			alert("验证码错误"); //则弹出验证码输入错误
			return;
		}	
		$('#submit').removeClass("btn-inverse");
		$('#submit').addClass("btn-gray-inverse");
		
		data = {"handler":"LoginHandler","action":"login", "username":userName, "password":password};
		ajaxPost("/felix", data, function(rs) {
 			if(rs["result"] == "OK"){
 				$('#submit').removeClass("btn-gray-inverse");
 				$('#submit').addClass("btn-inverse");
 				if (rs["logon"] == "SUCCESS") {
 					$cookie._addCookie("USERNAME",rs["username"],1);
 					$cookie._addCookie("ROLE",rs["role"],1);
 					$cookie._addCookie("GROUP",rs["group"],1);
 					$cookie._addCookie("ID",rs["id"],1);
 					$cookie._addCookie("INDEX",rs["index"],1);
 					window.location.href="/home.html";
// 					//普通用户
// 					if(rs["permission"] == "1"){
// 						window.location.href="html/home.html";
// 					}else if(rs["permission"] == "2"){
// 						//root用户
// 						window.location.href="html/user/user_view.html";
// 					}
 				} else if (rs["logon"] == "AUTHORIZED") {
 					var errorTimes = rs["errorTimes"];
 					var errorTimesFlag = rs["errorTimesFlag"];
 					if(errorTimesFlag=="true"){
 						if(errorTimes>4){
 	 						$("#error").text("你已经输错密码五次,请"+decodeURI(rs["remain"])+"后再试");
 	 					}else{
 	 						$("#error").text("密码输入有误,您还有"+(5-errorTimes)+"次机会");
 	 					}
 					}else{
 						$("#error").text("密码输入有误");
 					}
 					//alert($.i18n.prop('login_wrongpassword'));
 				} else if (rs["logon"] == "FORBIDDEN") {
 					alert($.i18n.prop('login_usernotexist'));
 				} else {
 					alert($.i18n.prop('login_loginfail'));
 				}
 				
 			} else {
 				$('#submit').removeClass("btn-gray-inverse");
 				$('#submit').addClass("btn-inverse");
 				alert($.i18n.prop('login_loginfail'));
 			}
 		}, function() {
 			$('#submit').removeClass("btn-gray-inverse");
			$('#submit').addClass("btn-inverse");
 			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
 		});
	}
	
	$("#reset").click(function(){
		$("#username").val("");
		$("#password").val("");
	});
});
