var Cookie = function() {
	this._addCookie = function($name, $value, $expiresHours) {
		var $cookieString = escape($name) + "=" + escape($value);
		//判断是否设置过期时间
		if ($expiresHours > 0) {
			var $date = new Date();
			$date.setTime($date.getTime() + $expiresHours * 3600 * 1000);
			$cookieString = $cookieString + "; expires=" + $date.toGMTString() + "; path=/";
		}
		document.cookie = $cookieString;
	};
	//根据name得到cookie
	this._getCookie = function($name) {
		var $strCookie = document.cookie;
		var $arrCookie = $strCookie.split("; ");
		for (var i = 0; i < $arrCookie.length; i++) {
			var $arr = $arrCookie[i].split("=");
			if (unescape($arr[0]) == $name) {
				return unescape($arr[1]);
			}
		}
		return "";
	};

	//删除所有cookie，将事件设置为一个过去的时间
	this._deleteAllCookie = function() {
		var $date = new Date();
		var $strCookie = document.cookie;
		var $arrCookie = $strCookie.split("; ");
		$date.setTime($date.getTime() - 10000);
		for (var i = 0; i < $arrCookie.length; i++) {
			var $arr = $arrCookie[i].split("=");
			document.cookie = $arr[0] + "=v;expires=" + $date.toGMTString() + "; path=/";
		}
	};

	//删除cookie，将事件设置为一个过去的时间
	this._deleteCookie = function($name) {
		var $date = new Date();
		$date.setTime($date.getTime() - 10000);
		document.cookie = $name + "=v;expires=" + $date.toGMTString() + "; path=/";
	};
};

var $cookie = new Cookie();