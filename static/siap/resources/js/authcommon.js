/**
 * 
 */

function auth(url, username, password, successMethod, failMethod, exception) {
	$.ajax({
		url : url,
		data : {
			'username' : username,
			'password' : password
		},
		type : "POST",
		timeout : 30000,
		success : function(data, status) {
			if (data.result == "fail") {
				failMethod();
			}
			var userinfo = data.userinfo;
			var token = data.token;
			var $date = new Date();
			$date.setTime($date.getTime() + 30 * 24 * 3600 * 1000)
			document.cookie = "token=" + token + "; expires=" + $date.toGMTString() + "; path=/";
			successMethod(userinfo, token);
		//			console.log('data=' + JSON.stringify(data) + ',status=' + status);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(textStatus)
			exception && exception()
		}
	});
}
function ahthedAjax(url, type, data, timeout, success, exception) {
	var token = $cookie._getCookie("token");
	$.ajax({
		url : url,
		data : data,
		type : type,
		headers : {
			"X-Authorization" : token
		},
		timeout : timeout,
		success : function(data, status) {
			success(data)
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(textStatus)
			exception && exception()
		}
	});
}