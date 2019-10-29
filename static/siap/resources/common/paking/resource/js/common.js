var ajax = function(url, type, params, successProcess, failProcess) {
	var token = $cookie._getCookie("token");
	$.ajax({
		url : url,
		data : params,
		'type' : type,
		headers : {
			"X-Authorization" : token
		},
		timeout : 6 * 60000,
		success : function(data, status) {
			successProcess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 401) {
				location.href = '/siap/html/login.html'
			} else {
				failProcess(textStatus);
			}
		}
	});
}
var ajaxJson = function(url, type, params, successProcess, failProcess) {
	var token = $cookie._getCookie("token");
	$.ajax({
		url : url,
		data : JSON.stringify(params),
		'type' : type,
		dataType : "json",
		contentType : "application/json",
		headers : {
			"X-Authorization" : token
		},
		timeout : 6 * 60000,
		success : function(data, status) {
			successProcess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 401) {
				location.href = '/siap/html/login.html'
			} else {
				failProcess(textStatus);
			}
		}
	});
}



/**
 * ajax 同步请求
 * url请求路径
 * params请求参数
 * successProcess成功回调函数
 * failProcess失败回调函数
 * 
 * 
 */
var ajaxPost = function(url, params, successProcess, failProcess) {
	var token = $cookie._getCookie("token");
	$.ajax({
		url : url,
		data : params,
		type : "POST",
		headers : {
			"X-Authorization" : token
		},
		timeout : 6 * 60000,
		success : function(data, status) {
			successProcess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 401) {
				location.href = '/siap/html/login.html'
			} else {
				failProcess(textStatus);
			}
		}
	});
}

/**
 * 采集、dataprocess ajax 同步请求
 * url请求路径
 * params请求参数
 * successProcess成功回调函数
 * failProcess失败回调函数
 */
var exceptAjaxPost = function(url, params, successProcess, failProcess) {
	var token = $cookie._getCookie("token");
	$.ajax({
		url : url,
		data : params,
		type : "POST",
		headers : {
			"X-Authorization" : token
		},
		timeout : 90000,
		success : function(data, status) {
			successProcess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 401) {
				location.href = '/siap/html/login.html'
			} else {
				failProcess(textStatus);
			}
		}
	});
}

/**
 * 采集、dataprocess ajax 同步请求
 * url请求路径
 * params请求参数
 * successProcess成功回调函数
 * failProcess失败回调函数
 */
var longAjaxPost = function(url, params, successProcess, failProcess) {
	var token = $cookie._getCookie("token");
	$.ajax({
		url : url,
		data : params,
		type : "POST",
		headers : {
			"X-Authorization" : token
		},
		timeout : 60000,
		success : function(data, status) {
			successProcess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 401) {
				location.href = '/siap/html/login.html'
			} else {
				failProcess(textStatus);
			}
		}
	});
}

/**
 * 采集、dataprocess ajax 同步请求
 * url请求路径
 * params请求参数
 * successProcess成功回调函数
 * failProcess失败回调函数
 */
var NoLimitedAjaxPost = function(url, params, successProcess, failProcess) {
	var token = $cookie._getCookie("token");
	$.ajax({
		url : url,
		data : params,
		type : "POST",
		headers : {
			"X-Authorization" : token
		},
		success : function(data, status) {
			successProcess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 401) {
				location.href = '/siap/html/login.html'
			} else {
				failProcess(textStatus);
			}
		}
	});
}

/**
 * 获取请求url中的参数
 */
var getUrlVars = function() {
	var vars = [],
		hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[2] != undefined ? hash[1] + "=" + hash[2] : hash[1];
	}
	return vars;
}

var getUrlVar = function(name) {
	return getUrlVars()[name];
}

/**
 * 国际化
 */
var i18n = function(iname, ipath, imode, ifunc) {
	jQuery.i18n.properties({ // 加载资浏览器语言对应的资源文件
		name : iname, // 资源文件名称
		path : ipath, // 资源文件路径
		mode : imode, // 用 Map 的方式使用资源文件中的值
		callback : function() { // 加载成功后设置显示内容
			ifunc();
		}
	});
}

//为string添加replaceAll方法
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

//为string添加trim方法
String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


//转义点击字段
function transferField(field) {
	field = field.replace(/\\/g, '\\\\').replaceAll(' ', '\\ ').replaceAll('/', '\\/').replaceAll(':',
		'\\:').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\{/g, '\\{').replace(/\}/g,
		'\\}').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\?/g, '\\?').replace(/~/g,
		'\\~').replace(/\-/g, '\\-');
	return field;
}