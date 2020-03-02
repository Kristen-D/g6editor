var upms_code = null;
$(document).ready(function(){
		//限制字符个数
		$(".wordlimit").each(function(){
			var maxwidth=30;
			if($(this).text().length>maxwidth){
				$(this).text($(this).text().substring(0,maxwidth));
				$(this).html($(this).html()+'…');
			}

		});
		getUser();
		$('.login').click(function() {
			$('.login-form-mask').fadeIn(100);
			$('.login-form').slideDown(200);
		});
		$('.login-close').click(function() {
			$('.login-form-mask').fadeOut(100);
			$('.login-form').slideUp(200);
		});
		$('#exit').click(function() {getlogout();
			$("#unlogin").show();
			$("#console").hide();
			$("#islogin").hide();
			$("#exit").hide();
		});
	});
function getUser() {
		$.ajax({
			type : "post",
			url : "/sso/getuser.do",
			data : {},
			dataType : "json",
			success : function(data) {
				if(data.username!=""){
					$("#userName").text(data.username);
					$("#console").show();
					$("#unlogin").hide();
				}else{
					$("#unlogin").show();
					$("#console").hide();
					$("#islogin").hide();
					$("#exit").hide();
				}
			},
			error : function(msg) {
				// alert($.toJSON(msg))
				console.log(msg);
			}
		})
	}

	function getlogout() {
			$.ajax({
				type : "get",
				url : "/sso/logout.do",
				data : {},
				dataType : "json",
				success : function(data) {
						$("#unlogin").show();
						$("#islogin").hide();
						$("#exit").hide();
				},
				error : function(msg) {
					// alert($.toJSON(msg))
					console.log(msg);
				}
			})
		}

function gotoTop(min_height){
	//预定义返回顶部的html代码，它的css样式默认为不显示
	var gotoTop_html = '<div id="gotoTop"><i class="go2top-icon"></i></div>';
	//将返回顶部的html代码插入页面上id为page的元素的末尾
	$("#page").append(gotoTop_html);
	$("#gotoTop").click(//定义返回顶部点击向上滚动的动画
	   function(){
		   $('html,body').animate({scrollTop:0},500);
	   }
	).hover(//为返回顶部增加鼠标进入的反馈效果，用添加删除css类实现
			function(){$(this).addClass("hover");},
	        function(){$(this).removeClass("hover");}
	);
	//获取页面的最小高度，无传入值则默认为600像素
	min_height ? min_height = min_height : min_height = 500;
	//为窗口的scroll事件绑定处理函数
	$(window).scroll(function(){
		//获取窗口的滚动条的垂直位置
		var s = $(window).scrollTop();
		//当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
		if( s > min_height){
			$("#gotoTop").fadeIn(100);
		}else{
			$("#gotoTop").fadeOut(100);
		};
	});
};
gotoTop();


var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;
$(".next").click(function() {

if(animating) return false;
animating = true;
//console.log(11);
current_fs = $(this).parent();
next_fs = $(this).parent().next();
//console.log(next_fs);
$(".wizard-steps li").eq($("fieldset").index(next_fs)).addClass("active-step");
$(".wizard-steps li").eq($("fieldset").index(current_fs)).removeClass("active-step").addClass("completed-step");

//show the next fieldset
next_fs.show();
//current_fs.hide();
current_fs.animate({
				opacity: 0
			}, {
				step: function(now, mx) {
					scale = 1 - (1 - now) * 0.2;
					left = (now * 50) + "%";
					opacity = 1 - now;
					current_fs.css({
						'transform': 'scale(' + scale + ')'
					});
					next_fs.css({
						'left': left,
						'opacity': opacity
					});
				},
				duration: 0,
				complete: function() {
					current_fs.hide();
					animating = false;
				},


			});
});


function toConsole(){ 
	window.location = "/ssa/main/begin.do?upms_code="+upms_code;
}

$(function(){
'use strict';

$(".navigation .el-submenu__title i").remove();
$(".re-el-collapse  >.el-collapse >.el-collapse-item  .el-collapse-item__header > i").remove();


});
