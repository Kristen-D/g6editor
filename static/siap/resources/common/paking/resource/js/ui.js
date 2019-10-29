$(document).ready(function() {
//导航隐藏
        $(".nav_tasks_s").hide();
        $(".nav_tasks_h").click(function(){
		$(".nav").css("margin-top","-34px");
		$(this).hide();
		$(".nav_tasks_s").show();

	    });	
	    $(".nav_tasks_s").click(function(){
		$(this).hide();
		$(".nav_tasks_h").show();
		$(".nav").css("margin-top","0px");
	    });	
	
//搜索
	    $('.s_input_bg .search_input_text').keydown(function(event){
			$('.dialog-k').hide();
		    var offset = $(this).offset().top;
		    event.stopPropagation();
		$(this).parent().nextAll('ul').show();
		if(event.keyCode==8 && $(this).val()==''){
	  	    $(this).parent().nextAll('ul').hide();
		}
        });
	    $('.s_input_bg .search_input_text').keyup(function(event){
		if(event.keyCode==8 && $(this).val()==''){
	  	    $(this).parent().nextAll('ul').hide();
		}
        });
	    $('.s_input_bg .status-search-result li').click(function(){
		var adminname = $(this).text();
		$(this).parents('.s_input_bg').find('textarea').val(adminname);
	    });
	
	    $(document).click(function() {
	    $('.status-search-result').hide();
	    });
		
//bianji
	    $('.edit').click(function(event) {
		event.stopPropagation();
		$(this).next().toggle();
	    });
	    $(document).click(function() {
	    $('.edit-wrap').hide();
		$('.edit-wrap2').hide();
	    });	
        if ($('.edit').click) {
			$(this).parent().show();
		}else {$(this).parent().hide();}		
		
		$('#editorT').click(function(event) {
		event.stopPropagation();
		$('.edit-wrap3').toggle();
		$('#editorT').addClass('active');
	    });
	    $(document).click(function() {
	    $('.edit-wrap3').hide();
		$('#editorT').removeClass('active');
	    });	
		
		$('#editorM').click(function(event) {
		event.stopPropagation();
		$('.edit-wrap4').toggle();
		$('#editorM').addClass('active');
	    });
	    $(document).click(function() {
	    $('.edit-wrap4').hide();
		$('#editorM').removeClass('active');
	    });
		$('#editorR').click(function(event) {
		$('.dialog-k').hide();
		    var offset = $(this).offset().top;
		    event.stopPropagation();
		$('.edit-wrap7').toggle();
		$('#editorR').addClass('active');
	    });
	    $(document).click(function() {
	    $('.edit-wrap7').hide();
		$('#editorR').removeClass('active');
	    });
		
		$('.panel-editor li').eq(0).click(function(event) {
		event.stopPropagation();
		$('.edit-wrap5').toggle();
		$('.panel-editor li').eq(0).addClass('active');
	    });
	    $(document).click(function() {
	    $('.edit-wrap5').hide();
		$('.panel-editor li').eq(0).removeClass('active');
	    });
		$('.panel-editor li').eq(1).click(function(event) {
		event.stopPropagation();
		$('.edit-wrap6').toggle();
		$('.panel-editor li').eq(1).addClass('active');
	    });
	    $(document).click(function() {
	    $('.edit-wrap6').hide();
		$('.panel-editor li').eq(1).removeClass('active');
	    });
 
		
});
//左跟随菜单	
$(document).ready(function() {
//	    $(document).click(function() {
//		$('.shared-fieldinfo').hide();
//		$('.main_feilds li').removeClass();
//	    });
//	    $('.shared-fieldinfo').click(function(event) {
//		event.stopPropagation();
//	    });
//	    $('.main_feilds li a').click(function(event) {
//			$('.dialog-k').hide();
//		var offset = $(this).offset().top;
//		event.stopPropagation();
//		if ($(this).parent().hasClass('active')) {
//		$(this).parent().removeClass();
//		$('.shared-fieldinfo').hide();
//		} else {
//		$(this).parent().addClass('active').siblings().removeClass();
//		$('.shared-fieldinfo').css({
//				"top": offset - 55 + "px"
//		}).show();
//		}
//	    });
//	    $('.close').click(function(){
//		    $(this).parents('.popdown-dialog').hide();
//		    $('.main_feilds li').removeClass();
//		});
		
//表格隐藏显示td	
$(".expands a").click(function(){
	   $(this).parents('tr').find('.tab_hide').slideToggle("slow");
       $(this).toggleClass('icon_down');
	   
	});
//title隐藏显示	
    	$(".search_icons_grounp a").hover(function(){
		$(this).children("div").show()
		},function(){
			$(this).children("div").hide();		
	    });	
		
})
