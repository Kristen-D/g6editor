var AppHeader = function(){
	var $scene = $("#ul_scene");
	
	this._init = function(){
		this._getData();
	}
	this._getData = function(){
		var $data = {"handler":"SceneHandler"};
		ajaxPost("/felix", $data, function(rs) {
			if(rs.result = "success"){
				$.each(rs.data,function(i,n){
					$scene.append("<li><a href='"+n.url+"'>"+decodeURIComponent(n.sceneName).replace(/\+/g,' ')+"</a></li>")
				});
			}
		});
	}
	
}
$(function(){
	new AppHeader()._init();
	
	
});