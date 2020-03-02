// JavaScript Document		
function getRootPath_web() {
	var curWwwPath = window.document.location.href;
	//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	//获取带"/"的项目名，如：/uimcardprj
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName + "/");
}
$(document).ready(function() {

	$("#Frm_header").load("../resources/component/header.html", function() {
		/* 设置hover */
		$(".frm_edit_box").hide();
		$("#Frm_sz").hover(function() {
			$(this).children(".frm_edit_box").show();
		}, function() {
			$(this).children(".frm_edit_box").hide();
		});
		$("#Frm_hf").hover(function() {
			$(this).children(".frm_edit_box").show();
		}, function() {
			$(this).children(".frm_edit_box").hide();
		});
		$(".box_hf").hover(function() {
			$("#Frm_hf i").toggleClass("hot");
		});
		$("#Frm_news").hover(function() {
			$(this).children(".frm_edit_box").show();
		}, function() {
			$(this).children(".frm_edit_box").hide();
		});
		$(".news_list li span").click(function() {
			$(this).parent().remove();
		});
	})
	$("#Frm_sidebar").load("../resources/component/sidebar.html", function() {
		/* 左侧菜单 */
		$(".J_sideMenu>li").hover(function() {
			showPopmenu(this, 'level1');
		}, function() {
			hidePopmenu(this, 'level1');
		});
		$(".J_sideMenu_sub1").hover(function() {
			showPopmenu(this, 'level2');
		}, function() {
			hidePopmenu(this, 'level2');
		});

		$(".menu ul li").each(function() {
			$(this).click(function() {
				$(this).addClass("hot").siblings("li").removeClass();
			});
		});

		/* 菜单显示 */
		function showPopmenu(hoverObj, level) {
			$(hoverObj).addClass("hover");
			var menuPop1 = $(hoverObj).find("." + level);
			var menuPop1L = menuPop1.length;
			if (menuPop1L > 0) {
				menuPop1.removeClass("sf-hide").addClass("in");
			} else {
			}
		}
		/* 菜单隐藏 */
		function hidePopmenu(hoverObj, level) {
			$(hoverObj).removeClass("hover");
			var menuPop1 = $(hoverObj).find("." + level);
			var menuPop1L = menuPop1.length;
			if (menuPop1L > 0) {
				menuPop1.addClass("sf-hide").removeClass("in");
			} else {
			}
		}
		/* 显示菜单图标 */
		$(".Frm_menu_cwidth").click(function() {
			$(".Frm_menu_cwidth").toggleClass('width_54');
			$(".Frm_sidebar").toggleClass('width_54');
			$(".Frm_right").toggleClass('right_54');
			$(".sf-sidebmenu-hang").toggleClass('right_54');
			$(".main_content_tit").toggleClass("padding_0");
		});
	})

	/* 全屏、还原 */
	$(".qp_link").click(function() {
		$(this).parent().addClass("expand_mode");
		$(".Frm_menu_cwidth").hide();
		$("#Frm_header").slideUp();
		$(".Frm_sidebar").slideUp();
		$(".Frm_right").addClass("right2");
	});
	$(".hy_link").click(function() {
		$(this).parent().removeClass("expand_mode");
		$(".Frm_menu_cwidth").show();
		$("#Frm_header").slideDown();
		$(".Frm_sidebar").slideDown();
		$(".Frm_right").removeClass("right2");
	});
});