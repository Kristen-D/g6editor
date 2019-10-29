$(document).ready(function() {
	if (parent) {
		if (parent.location.pathname !=location.pathname) {
			parent.location.href = "login.html";
		}
	}
	$(".w_P2").text(siap_title ? siap_title : "SIAP安全智能分析平台");
	$("title").text(siap_title ? siap_title : "SIAP安全智能分析平台")
	$("#username").focus();
	//	$("#verifycode").attr("src", "/siap/verifycode?" + new Date().getTime());
	//	$("#refreshcode").click(function() {
	//		$("#verifycode").attr("src", "/siap/verifycode?" + new Date().getTime());
	//	})
	//	$cookie._deleteAllCookie();
	//	var $login
	/**
	 * 登录
	 */
	$("#username,#password,#validateCode").keydown(function(e) {
		if (e.keyCode == 13) {
			$("#submit").trigger("click");
		}
	});
	$("#submit").click(function() {
		login();
	});
	function login() {
		var userName = $("#username").val();
		var password = $("#password").val();
		//		var validateCode = $("#validateCode").val();

		if ($.trim(userName) == "") {
			$("#error").text("请输入用户名");
			$("#username").focus();
			return
		} else if ($.trim(password) == "") {
			$("#error").text("请输入密码");
			$("#password").focus();
			return
		}
		$("#submit").unbind("click").css({
			cursor : "auto"
		});
		auth(authserver + "/auth/login", userName, password, function(data) {

			$cookie._addCookie("USERNAME", data["username"], -1);
			$cookie._addCookie("ROLE", data["role"], -1);
			$cookie._addCookie("GROUP", data["group"], -1);
			//				$cookie._addCookie("ID", data["id"], -1);
			$cookie._addCookie("INDEX", data["defaultindex"], -1);
			window.location.href = "index.html";
		}, function() {
			$("#submit").css({
				cursor : "pointer"
			});
			$("#submit").click(function() {
				login();
			});
			$("#error").text("登录失败");
		}, function() {
			$("#submit").css({
				cursor : "pointer"
			});
			$("#submit").click(function() {
				login();
			});
			$("#error").text("登录失败");
		})

	}
})
//		data = {
//			"handler" : "LoginHandler",
//			"action" : "login",
//			"username" : userName,
//			"password" : password,
//			"validateCode" : validateCode
//		};
//		$("#submit").unbind("click").css({
//			cursor : "auto"
//		});
//		ajaxPost("/felix", data, function(rs) {
//			if (rs["result"] == "OK") {
//				if (rs["logon"] == "SUCCESS") {
//					$cookie._addCookie("USERNAME", rs["username"], -1);
//					$cookie._addCookie("ROLE", rs["role"], -1);
//					$cookie._addCookie("GROUP", rs["group"], -1);
//					$cookie._addCookie("ID", rs["id"], -1);
//					$cookie._addCookie("INDEX", rs["index"], -1);
//				} else if (rs["logon"] == "AUTHORIZED") {
//					var errorTimes = rs["errorTimes"];
//					if (errorTimes > 4) {
//						$("#error").text("你已经输错密码五次,请" + decodeURI(rs["remain"]) + "后再试");
//					} else {
//						$("#error").text("密码输入有误,您还有" + (5 - errorTimes) + "次机会")
//					}
//				// alert($.i18n.prop('login_wrongpassword'));
//				} else if (rs["logon"] == "FORBIDDEN") {
//					$("#error").text("用户名或密码错误");
//				} else if (rs["logon"] == "validateCodeError") {
//					$("#error").text("验证码错误");
//				} else if (rs["logon"] == "validateCodeOutOfDate") {
//					$("#error").text("验证码过期");
//				} else {
//					$("#error").text("登录失败");
//				}
//			} else {
//				$("#error").text("登录失败")
//			}
//			$("#verifycode").attr("src", "/siap/verifycode?" + new Date().getTime());
//			$("#submit").css({
//				cursor : "pointer"
//			});
//			$("#submit").click(function() {
//				login();
//			});
//		}, function() {
//			$("#error").text("请求失败");
//			$("#submit").css({
//				cursor : "pointer"
//			});
//			$("#submit").click(function() {
//				login();
//			});
//		});
//	}

//	$("#reset").click(function(){
//		$("#username").val("");
//		$("#password").val("");
//	});
//});