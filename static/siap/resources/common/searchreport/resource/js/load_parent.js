$(function(){
	getUserInfo();
	initHead();
	 
	function initHead(){
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
		
		$("#appheader").load($("#appheader").attr("data-view"),function(responseTxt,statusTxt,xhr){
		});
		
		$("#appfooter").load($("#appfooter").attr("data-view"),function(responseTxt,statusTxt,xhr){
		});
	}
	
	function getUserInfo(){
		var thisUsername = getUrlVar("username");
		var cookieUsername = $cookie._getCookie("USERNAME");
		if(thisUsername != undefined){
			thisUsername=thisUsername.split("#")[0];
		}
		if(thisUsername == undefined&&cookieUsername != ""){
				return;
		}
		if(thisUsername != undefined&&cookieUsername != ""&&cookieUsername == thisUsername){
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
 				} else {
 				}
 				
 			} else {
 			}
 		}, function() {
 		});
	}
	
});