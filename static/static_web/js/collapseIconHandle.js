
function handleCollapseIcon(){
	$(".el-collapse-item__header").on('click', function(){
		if($(this).closest('.el-collapse-item').hasClass('is-active')){
			$(this).find("i").css({
					transform: "rotate(0deg)"
			})
		}else {
			$(this).find("i").css({
				// -webkit-transform: "rotate(0deg)";
					transform: "rotate(90deg)"
			})
		}
	})
}

export default{
	handleCollapseIcon
};
