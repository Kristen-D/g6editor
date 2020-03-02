// JavaScript Document
(function($){
	$.fn.myScroll = function(options){
	//参数配置
	// speed: 40, //滚动速度,值越大速度越慢
	// rowHeight: 41, //每行的高度
	// lightRowNumber: 2,//高亮的行索引值
	// DarkRowNumber1: 1,//变暗的行索引值
	// DarkRowNumber2:5,//变暗的行索引值
	// pageType:'white',//白色背景
	// colorLight:'#000', //高亮的颜色
	// colorDark:'#d6e0ed' //变暗的颜色
	//colorIndex:1, 表格存在两列，第二列的颜色不同于第一列
	//colorLightSecond:'rgba(225,36,36,1)' 表格第二列高亮的颜色
	//secondSpanName:'.red-span' 第二列的className
	//默认配置
	var defaults = {
		speed:40,  //滚动速度,值越大速度越慢
		rowHeight:40 //每行的高度
		// lineNumber: 2 //第2行高亮
	};
	
	var opts = $.extend({}, defaults, options),intId = [];
	
	function marquee(obj, step){
		
		var lightRowNumber = opts["lightRowNumber"] - 1;
		var darkRowNumber1 = opts["DarkRowNumber1"] - 1;
		var darkRowNumber2 = opts["DarkRowNumber2"] - 1;
		var pageType = opts["pageType"];
		var colorLight = opts["colorLight"];
		var colorDark = opts["colorDark"];
		var colorIndex = opts["colorIndex"];
		var colorLightSecond = opts["colorLightSecond"];
		var secondSpanName = opts["secondSpanName"];
		obj.find("table").animate({
			marginTop: '-=1'
		},0,function(){
				var s = Math.abs(parseInt($(this).css("margin-top")));
				if(s >= step){
					$(this).find("tr").slice(0, 1).appendTo($(this));
					$(this).css("margin-top", 0);
					if(pageType == 'black'){
						$(this).find("tr").css({"color":"rgb(255,255,255,0.4)","transition":"color 0.9s"});
						$(this).find("tr").eq(lightRowNumber).css('cssText','color:#fff!important;transition:color 0.9s');
						if(colorIndex){
							$(this).find(secondSpanName).css({"color":"rgba(225,36,36,.5)","transition":"color 0.9s"});
							$(this).find(secondSpanName).eq(lightRowNumber).css({"color":colorLightSecond,"transition":"color 0.9s"});
						}
					}else if(pageType == 'white'){
						$(this).find("tr").css({"color":colorLight,"transition":"color 0.9s"});
						$(this).find("tr").eq(darkRowNumber1).css({"color":colorDark,"transition":"color 0.9s"});
						$(this).find("tr").eq(darkRowNumber2).css({"color":colorDark,"transition":"color 0.9s"});
					}
					
				}
			});
		}
		
		this.each(function(i){
			var isScroll = opts["isScroll"];
			var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
			intId[i] = setInterval(function(){
				if(_this.find("table").height()<=_this.height()){
					clearInterval(intId[i]);
				}else{
					marquee(_this, sh);
				}
			}, speed);

			_this.hover(function(){
				if(isScroll){
					$(this).css({"overflow-y":"scroll"}); //鼠标移入使用鼠标滚轮滚动
				};
				
				clearInterval(intId[i]);
			},function(){
				if(isScroll){
					$(this).css({"overflow":"hidden"});//鼠标移出取消鼠标滚轮滚动
				};
				intId[i] = setInterval(function(){
				
					if(_this.find("table").height()<=_this.height()){
						clearInterval(intId[i]);
					}else{
						marquee(_this, sh);
					}
				}, speed);
			});
		
		});

	}

})(jQuery);


//
//   $(function(){
//			$("div.el-table__body-wrapper").myScroll({
//				speed:40, //数值越大，速度越慢
//			});
//		  }); 