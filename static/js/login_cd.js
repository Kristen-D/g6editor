var captchaFlag = 'false';
		var loginMsg = '';
		var captchaUuid = null;
		jQuery(function() { 
			var hx = 770;
			var brow = $.browser;
			if (brow.webkit)
				hx = 708
			if(window.top!=window.self){
				window.top.location = "/";
			} 
			 	init();  
			$("#btsubmit")
					.click(
							function() { 
								if ($("#name").val() == ""
										|| $("#name").val() == null) {
									$('#name').focus();
									$('#name').val("");
								} else if ($("#password").val() == ""
										|| $("#password").val() == null) {
									$('#password').focus();
									$('#password').val("");
								} else if (($("#captcha").val() == "" || $(
										"#captcha").val() == null)
										&& captchaFlag == "true") {
									$('#captcha').focus();
									$('#captcha').val("");
								} else {
									submit();

								}
							});

			$("#name,#password,#captcha").bind('keyup', function(event) {
				if (event.keyCode == 13) {
					event.preventDefault();
					$("#btsubmit").click();
				}
			});

			$("#name,#password,#captcha").bind('input propertychange',
					function(event) {
						//alert(11)
						$(event.target).popover('destroy');
					});
		});
		
		function tomd5(str){  
			var m = md5(str+"66f1b370c660445a8657bf8bf1794486").toUpperCase(); 
			var captcha = $("#captcha").val();  
			if(captchaFlag == "true"){ 
					 m = 	md5( m+captcha.toUpperCase()).toUpperCase();
			} 
	         return m;
		}
		

		 
		function init() {
			// changeLoginWord(); 

			getPinBaseCode(); 

			if (loginMsg != "" && loginMsg != "success") {
				$("#loginMsgDiv").show();
				$("#loginMsg").text(loginMsg);
			}
		}

		function getPinBaseCode() {
			$.ajax({
				type : "post",
				url : "/sso/getPinBaseCode.do",
				data : {uuid:captchaUuid},
				dataType : "json",
				success : function(result) {
					var data = result.data;
					var imgCode = data.imgCode; 
					captchaUuid = data.captchaUuid; 
					setCaptchaFlag(data); 
					if (result.state) {
						var img = "data:image/jpg;base64," +imgCode;
						$("#pin").attr("src", img);
					}
				},
				error : function(msg) {
					//	alert(msg)
					var x = []
					for ( var s in msg) {
						x.push(s + ":" + msg[s])
					}
					alert(x.join(","))
				}
			});
		}
		
		function getMsgCode(){ 
			var name = $("#name").val(); 
			if(name == null || name == ""){
				alert("登录名不可为空");
				return;
			}
			
			$.ajax({
				type : "post",
				url : "/sso/sendCode.do",
				data : {"userName":name},
				dataType : "json",
				success : function(data) {
					if (data.state) {
					 	alert(data.message);
					} 
				},
				error : function(msg) {
				 console.log(msg)
				}
			});
		}
		 

		function setCaptchaFlag(flag) {
						captchaFlag = flag.captchaFlag;
						if (flag.captchaFlag == "true") {
							$('#captchaLi').show();
							try
							{ 
								if(typeof(eval(changeStyle))=="function") 
									 {
									   changeStyle();
									 }
							}catch(e)
							{
							//alert("not function"); 
							} 							
						} else {
							$('#captchaLi').hide();
						} 
						if (flag.msgCodeFlag == "true") {
							$('#codeLi').show();
						} else {
							$('#codeLi').hide();
						}
			
		}

	  

		function submit() { 
			var backurl = GetQueryString("backurl");  
			
			$.ajax({
				type : "post",
				url : "/sso/login.do",
				data : {
					backurl : backurl,
					password :  tomd5($("#password").val()),
					username : $("#name").val(),
					captcha : $("#captcha").val(),
					captchaFlag : captchaFlag,
					msgCode:$("#msgCode").val(),
					captchaUuid:captchaUuid
				},
				dataType : "json",
				success : function(data) {  
					if(data.code==1){  
						try{ 
							if(typeof(eval(setLoginFrom_cd))=="function"){
								$("#userName").text(data.username);
								setLoginFrom_cd();  
								if(toConsole)upms_code = data.data.code;
							}
							else{
								window.location = data.data.url;
							}
						}catch(e){
						//alert("not function"); 
						} 	
					}else{ 
						alert(data.data)
						getPinBaseCode(); 
					} 
					
				},
				error : function(msg) {
					// alert($.toJSON(msg))
					console.log(msg);
				}
			})
		}

		function GetQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		}
		
		(function(jQuery) {

			if (jQuery.browser)
				return;

			jQuery.browser = {};
			jQuery.browser.mozilla = false;
			jQuery.browser.webkit = false;
			jQuery.browser.opera = false;
			jQuery.browser.msie = false;

			var nAgt = navigator.userAgent;
			jQuery.browser.name = navigator.appName;
			jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
			jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
			var nameOffset, verOffset, ix;

			// In Opera, the true version is after "Opera" or after "Version"   
			if ((verOffset = nAgt.indexOf("Opera")) != -1) {
				jQuery.browser.opera = true;
				jQuery.browser.name = "Opera";
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 6);
				if ((verOffset = nAgt.indexOf("Version")) != -1)
					jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
			}
			// In MSIE, the true version is after "MSIE" in userAgent   
			else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
				jQuery.browser.msie = true;
				jQuery.browser.name = "Microsoft Internet Explorer";
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
			}
			// In Chrome, the true version is after "Chrome"   
			else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
				jQuery.browser.webkit = true;
				jQuery.browser.name = "Chrome";
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
			}
			// In Safari, the true version is after "Safari" or after "Version"   
			else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
				jQuery.browser.webkit = true;
				jQuery.browser.name = "Safari";
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
				if ((verOffset = nAgt.indexOf("Version")) != -1)
					jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
			}
			// In Firefox, the true version is after "Firefox"   
			else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
				jQuery.browser.mozilla = true;
				jQuery.browser.name = "Firefox";
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
			}
			// In most other browsers, "name/version" is at the end of userAgent   
			else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt
					.lastIndexOf('/'))) {
				jQuery.browser.name = nAgt.substring(nameOffset, verOffset);
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 1);
				if (jQuery.browser.name.toLowerCase() == jQuery.browser.name
						.toUpperCase()) {
					jQuery.browser.name = navigator.appName;
				}
			}
			// trim the fullVersion string at semicolon/space if present   
			if ((ix = jQuery.browser.fullVersion.indexOf(";")) != -1)
				jQuery.browser.fullVersion = jQuery.browser.fullVersion
						.substring(0, ix);
			if ((ix = jQuery.browser.fullVersion.indexOf(" ")) != -1)
				jQuery.browser.fullVersion = jQuery.browser.fullVersion
						.substring(0, ix);

			jQuery.browser.majorVersion = parseInt(''
					+ jQuery.browser.fullVersion, 10);
			if (isNaN(jQuery.browser.majorVersion)) {
				jQuery.browser.fullVersion = ''
						+ parseFloat(navigator.appVersion);
				jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
			}
			jQuery.browser.version = jQuery.browser.majorVersion;
		})(jQuery);