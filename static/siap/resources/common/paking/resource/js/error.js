$(document).ready(function() {
	var remain = decodeURI(getUrlVar("remain"));
	var errorTimes = getUrlVar("errorTimes");
	var logon = getUrlVar("logon");
	if (errorTimes != undefined && errorTimes != "undefined") {
		remain=remain.split("#")[0];
		errorTimes=errorTimes.split("#")[0];
		var errorTimesFlag=getUrlVar("errorTimesFlag").split("#")[0];
		if(errorTimesFlag=="true"){
			if (errorTimes > 4) {
				$("#login_error").text("您已经输错密码5次,请" + remain + "后再试");
			} else {
				$("#login_error").text("密码输入有误,您还有" + (5 - errorTimes) + "次机会重试");
			}
		}else{
			$("#login_error").text("密码输入有误");
		}
	} else if (logon != undefined && logon != "undefined") {
		logon=logon.split("#")[0];
		if (logon == "FORBIDDEN") {
			$("#login_error").text("用户名不存在");
		} else if (logon == "EMPTY") {
			$("#login_error").text("用户名、密码不能为空");
		} else {
			$("#login_error").text("认证出错");
		}
	} else {
		$("#login_error").text("认证出错");
	}
});
