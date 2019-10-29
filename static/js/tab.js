$(document).ready(function(){

	/*$('#list_mark2 em:first').addClass('emon');
	$('.list1:first').css('display','block');*/
	/*第一次读取最新通知*/

			load_7();

	/*30轮询读取函数*/
	setInterval(function() {

		load_7();

		},
		30000);
	var loadTopInfoFirst=true;
	function load_7() {
	$.ajax({ 
        type: "post", 
                                     url: "/ssa/alarmMap/getTopInfo.do", 
                                     dataType: "json", 
                                     success: function (data) { 
                                    	 
                                    	 var dataList = data.data;

                                    	 var str="";
//                                    	 console.log(dataList);
                                    	$("#list_mark2").empty();
                         				$("#list_mark2").append(" <span><em></em><em></em></span>");
										  for (var i = 0; i < dataList.length; i++) {
											  var child = dataList[i].data;
											  str+="<div class='list1 list2 add_padding'><p>TOP5"+ dataList[i].title +"</p><table width='100%' border='0' cellpadding='0' cellspacing='0'>";
											  str+="<tr><th>排序</th><th>威胁类型</th><th>数量</th></tr><tr>";
		                                    
											  for (var j = 0; j < child.length; j++) {
											   var k=j+1;
											   str+="<tr><td>"+ k +"</td><td>"+ child[j].title +"</td><td>"+ child[j].total +"</td></tr><tr>";
											  }
											  
											  str+="</table></div>";
										  }
										  

                                    	// loadAsset(); 

										    $("#list_mark2").append(str);   
											$('#list_mark2 em:first').addClass('emon');
//											  if(loadTopInfoFirst){
//													scroll('list_mark');
													scroll('list_mark2');
													loadTopInfoFirst=false;
//											  }
                                    		
                                     }, 
                                     error: function (XMLHttpRequest, textStatus, errorThrown) { 
                                    	 console.log("出现错误");
                                     } 
                             });
	
	}
	
	
	
	

	/*hookThumb();*/
})
function scroll(scrollObj){
	var i=-1; //第i+1个tab开始
var offset = 3000; //轮换时间
var timer = null;
function autoroll(){
	n = $('#'+scrollObj+' em').length-1;
	i++;
	if(i > n){
	i = 0;
	}
	slide(i);
	
	
	timer = window.setTimeout(autoroll, offset);
}
autoroll();
function slide(i){
	$('#'+scrollObj+' em').eq(i).addClass('emon').siblings().removeClass('emon');
	$('#'+scrollObj+' .list1').css('display','none');
	$('#'+scrollObj+' .list1').eq(i).css('display','block');
}
  
$('#'+scrollObj+' em').hover(
	function(){
		if(timer){
			clearTimeout(timer);
			j = $(this).prevAll().length;
			console.log(j);
			slide(j); 
		}
	},function(){
		timer = window.setTimeout(autoroll, offset);  
		this.blur();            
		return false;
	}); 


}
