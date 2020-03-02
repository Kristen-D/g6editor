function addClass(item) {
	item.addClass("choiseItem");
}

function removeClass(item) {
	item.removeClass("choiseItem");
}

function editPagingBar(pageCount, currentPage) {
	var j=(pageCount>=10)?10:pageCount;
	currentPage=parseInt(currentPage);
	if(j<10){
		for(var i=10;i>j;i--){
			$(".page_"+i).css("display",'none');
		}
	}
	if (currentPage == 1) {
		$(".page_pre").addClass("page_pre_next");
		$(".page_next").removeClass("page_pre_next");
		for(var i=1;i<=j;i++){
			$("#page_"+i).text(i);
			$("#fpage_"+i).text(i);
		}
		for(var i=2;i<=j;i++){
			removeClass($(".page_"+i));
		}
		addClass($(".page_1"));
	} else if (currentPage != 1) {
		$(".page_pre").removeClass("page_pre_next");
		$(".page_next").removeClass("page_pre_next");
		if (currentPage < pageCount-j+2) {
			for(var i=1;i<=j;i++){
				$("#page_"+i).text(currentPage+i-1);
				$("#fpage_"+i).text(currentPage+i-1);
			}
			for(var i=2;i<=j;i++){
				removeClass($(".page_"+i));
			}
			addClass($(".page_1"));
		
		} else {
			if(currentPage==pageCount){
				$(".page_next").addClass("page_pre_next");
			}
			var k=j-(pageCount-currentPage);
			for(var i=1;i<=j;i++){
				$("#page_"+i).text(currentPage+i-k);
				$("#fpage_"+i).text(currentPage+i-k);
				if(i!=k){
					removeClass($(".page_"+i));
				}else{
					addClass($(".page_"+i));
				}
			}
		}
	}
}