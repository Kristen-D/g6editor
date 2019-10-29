// JavaScript Document
$(document).ready(

	function() {
		ausserver = ausserver || ("http://" + location.hostname + ":10001");
		String.prototype.formate = function(args) {
			var rs = this;
			for (var key in args) {
				var reg = new RegExp("\\${" + key + "}", "g");
				rs = rs.replace(reg, args[key]);
			}
			return rs;
		}
		loadiframe();
		// 移动端事件
		if (navigator.userAgent.indexOf("Mobile") >= 0) {
			//				$("#main_content_iframe").contents().click(clickevents)
			$(document).click(hidesideEventMobile)

		} else {
			$(".Frm_sidebar").addClass("width_54");
			//				$(".Frm_right").addClass("right_54");
			//				$(".side_topmenu>span").toggle();
			//				$("#main_content_iframe").contents().click(clickevents);
			$(document).click(hidesideEventPc);
		}
		// iframe 内容加载事件
		$("#main_content_iframe").load(function() {
			var elem = document.getElementById("main_content_iframe");

			location.hash = encodeURIComponent((elem.contentDocument || elem.contentWindow.document).location.href);
			$(window.frames["main_content_iframe"]).ready(function() {
				$("#main_content_iframe").contents().find("#appheader,#header").hide();
				$("#main_content_iframe").contents().find("body").scrollTop(0);
				if (navigator.userAgent.indexOf("Mobile") >= 0) {
					$("#main_content_iframe").contents().click(hidesideEventMobile);
				} else {
					$("#main_content_iframe").contents().click(hidesideEventPc);
				}
				setTimeout(function() {
					document.getElementById("main_content_iframe").contentWindow.scroll(0);
				}, 400)
			})
		})
		// toiframe 链接
		$(document).on("click", ".toiframe", function() {
			$("#main_content_iframe").attr("src", $(this).attr("href").formate({
				'host' : ausserver
			}));
			// 二级菜单标题
			$("#maincontent_title").text($(this).attr("_title_"));
			return false;
		})
		$("#Frm_header").load("../resources/component/header.html", function() {
			$("#index_title").html($("<span>").append((siap_logo ? "<img height='32' src='../resources/logo/" + siap_logo + "'>" : "")
				+ (siap_title ? siap_title : "安全智能分析平台")));
			$("title").text(siap_title || "安全智能分析平台")
			siap_logo && $(".Frm_header_box").addClass("Frm_header_box2");
			$(".Frm_menu_cwidth2").click(function() {
				$(".Frm_sidebar").toggleClass('width_150');
				$(".Frm_right").toggleClass('right_150');
				$(".side_topmenu>span").toggle();
			});
			/* 设置hover */
			$(".frm_edit_box").hide();
			$("#Frm_sz").hover(function() {
				$(this).children(".frm_edit_box").show();
			}, function() {
				$(this).children(".frm_edit_box").hide();
			});
			$("#Frm_hf,.Frm_hf").hover(function() {
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
			getUserInfo();
			var alarm = new Alarm();
			$("#gotoallnews").click(function() {
				$("#main_content_iframe").attr("src", "/message/message.html");
				// 二级菜单标题
				$("#maincontent_title").text("告警消息");
			})
			// 初始化
			alarm._init();
			$("#skin li").click(function() {
				switchSkin(this.id);
			});
			var cookie_skin = $cookie._getCookie("MyCssSkin"); // 优化了代码，将功能模块化了
			if (cookie_skin) {
				switchSkin(cookie_skin);
			}

			function switchSkin(skinName) {
				$("#" + skinName).addClass("selected") // 当前<li>元素选中
					.siblings("li").removeClass(); // 去掉其它同辈<li>元素的选中
				$("#cssfile1").attr("href", "../resources/skin/" + skinName + "/css/style_ui.css"); // 设置不同皮肤
				//$("#cssfile2").attr("href", "/siap/resource/skin/" + skinName + "/css/font-awesome.min.css"); // 设置不同皮肤
				$cookie._addCookie("MyCssSkin", skinName, 240);
			}
			// 运行周期
			alarm._doJob();
			$("#header_logout,.logout").click(function() {
				// 删除cookie
				ahthedAjax(authserver + "/auth/logout", "POST", {
					token : $cookie._getCookie("token")
				}, 30000, function() {}, function() {});
				$cookie._deleteAllCookie();
				window.location.href = "login.html";
			})
			function getUserInfo() {
				if ($cookie._getCookie("USERNAME") != "") {
					return;
				}
			//				var data = {
			//					"handler" : "LoginHandler",
			//					"action" : "getUserInfo"
			//				};
			//				ajaxPost("/felix", data, function(rs) {
			//					if (rs["result"] == "OK") {
			//						if (rs["logon"] == "SUCCESS") {
			//							$cookie._addCookie("USERNAME", rs["username"], 1);
			//							$cookie._addCookie("ROLE", rs["role"], 1);
			//							$cookie._addCookie("GROUP", rs["group"], 1);
			//							$cookie._addCookie("ID", rs["id"], 1);
			//							$cookie._addCookie("INDEX", rs["index"], 1);
			//						} else {
			//							// alert(rs["logon"]);
			//						}
			//
			//					} else {
			//						// alert("Get username fail!");
			//					}
			//				}, function() {
			//					// alert("Get username fail!");
			//				});
			}
			$("#header_login_user").html($cookie._getCookie("USERNAME"));
		});
		$("#Frm_sidebar").load(
			"../resources/component/sidebar.html",
			function() {
				if (navigator.userAgent.indexOf("Mobile") >= 0) {
					$(document).click(hidesideEventMobile)

				} else {
					$(".Frm_right").addClass("right_54");
					$(".Frm_menu_cwidth").addClass("width_54");
				}
				var $data = {
					"handler" : "MenuHandler",
					"action" : "getMenu"
				};
				ajaxPost("../felix/MenuHandler", $data, function(rs) {
					if (rs["result"] == "SUCCESS") {

						var pluginMenus = rs.pluginMenus;
						var linkMenus = rs.linkMenus;
						var menus = rs.menus;
						var topMenus = rs.topMenus;
						var content = "";
						var default_content = "";
						var isdefalutempty = true;
						for (var i = 0; i < menus.length; i++) {
							var topMenu = topMenus[menus[i]];
							if (topMenu) {
								var $content = "";

								$content += "<li><a class='side_topmenu' href='javascript:void(0)'><i class='fa fa-" + topMenu.icon + "'></i><span>"
									+ topMenu.title + "<span></a><div class='sf-sidebmenu-hang level1 sf-fade sf-hide'>"
									+ "<h3 class='sf-sidemenu-ttl sf-dsborder-btm'>" + topMenu.title + "</h3>"

								var subMenus = topMenu.subMenus;
								for (var j = 0; j < subMenus.length; j++) {
									var subMenu;
									if (subMenu = linkMenus[subMenus[j]]) {
										if (menus[i] == "default") {
											isdefalutempty = false;
										}
										$content += "<a class='toiframe'  _title_='" + subMenu.title + "' href='" + subMenu.url + "'><div class='sf-sidemenu-popup'>"
											+ "<div id='user-resetKey' class='J_sideMenu_sub1 sf-sidemenu-sub'>" + "<p class='sf-sidemenu-item'>"
											+ "<span class='sf-dot'>·</span> <span>" + subMenu.title + "</span>" + "</p></div></div></a>";
										delete linkMenus[subMenus[j]];
									} else if (subMenu = pluginMenus[subMenus[j]]) {
										if (menus[i] == "default") {
											isdefalutempty = false;
										}
										$content += "<a class='toiframe' _title_='" + subMenu.title + "' href='" + subMenu.url + "'><div class='sf-sidemenu-popup'>"
											+ "<div id='user-resetKey' class='J_sideMenu_sub1 sf-sidemenu-sub'>" + "<p class='sf-sidemenu-item'>"
											+ "<span class='sf-dot'>·</span> <span>" + subMenu.title + "</span>" + "</p></div></div></a>";
										delete pluginMenus[subMenus[j]];
									}
								}
								if (menus[i] == "default") {
									default_content += $content;
								} else {
									content += $content + "</div></li>";
								}

							}
						}
						if (!default_content) {
							default_content = "<li><a class='side_topmenu' href='javascript:void(0)'><i class='fa fa-arrows'></i><span>未分类</span>"
								+ "</a><div class='sf-sidebmenu-hang level1 sf-fade sf-hide'>"
								+ "<h3 class='sf-sidemenu-ttl sf-dsborder-btm'>未分类</h3>"
						}

						for (var key in linkMenus) {
							isdefalutempty = false
							var subMenu = linkMenus[key];
							default_content += "<a class='toiframe' _title_='" + subMenu.title + "' href='" + subMenu.url + "'><div class='sf-sidemenu-popup'>"
								+ "<div id='user-resetKey' class='J_sideMenu_sub1 sf-sidemenu-sub'>" + "<p class='sf-sidemenu-item'>"
								+ "<span class='sf-dot'>·</span> <span>" + subMenu.title + "</span>" + "</p></div></div></a>";
						}
						for (var key in pluginMenus) {
							isdefalutempty = false
							var subMenu = pluginMenus[key];
							default_content += "<a class='toiframe' _title_='" + subMenu.title + "' href='" + subMenu.url + "'><div class='sf-sidemenu-popup'>"
								+ "<div id='user-resetKey' class='J_sideMenu_sub1 sf-sidemenu-sub'>" + "<p class='sf-sidemenu-item'>"
								+ "<span class='sf-dot'>·</span> <span>" + subMenu.title + "</span>" + "</p></div></div></a>";
						}
						if (!isdefalutempty) {
							content += default_content + "</div></li>"
						}
						$(".J_sideMenu").html(content);
						if (navigator.userAgent.indexOf("Mobile") >= 0) {

						} else {
							$(".sf-sidebmenu-hang").addClass("right_54");
						}
						$(".side_topmenu>span").hide();
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
					} else {
						alert("获取菜单失败");
					}
				}, function() {
					alert("获取菜单请求失败");
				});



				// $(".menu ul li").each(function() {
				// $(this).click(function() {
				// $(this).addClass("hot").siblings("li").removeClass();
				// });
				// });

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
					//							$(".main_content_tit").toggleClass("padding_0");
					$(".side_topmenu>span").toggle();
				});
				$(".Frm_head_right2").hover(function() {
					$(this).children(".frm_edit_box").show();
				}, function() {
					$(this).children(".frm_edit_box").hide();
				});

				// 钻取选择
				$(".inputList li a").click(function() {
					$(this).addClass("hot").siblings("a").removeClass();
				});
				// 钻取选择
				$(".checkbox_right a").click(function() {
					$(this).addClass("hot").siblings("a").removeClass();
				});
				// 钻取选择
				$("#skin li").click(function() {
					$(this).addClass("selected").siblings("li").removeClass();
				});
				// 切换选择
				$("#fx_r_btnA").click(function() {
					$(".fx_r_cont_w").removeClass("madehot");
					$(this).addClass("hot").siblings("a").removeClass();
				});
				$("#fx_r_btnB").click(function() {
					$(this).addClass("hot").siblings("a").removeClass();
					$(".fx_r_cont_w").addClass("madehot");

				});
			});

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

var Alarm = function() {
	var $alarmNum = $(".Frm_news_num");
	var $alarmContent = $(".news_list");
	var $alarmDeleteAll = $(".e_all_del");
	var $alarmDelete;
	var $alarmTask;
	this._init = function() {
		this._initDeleteAll();
	};
	this._initDeleteAll = function() {
		$alarmDeleteAll.click(function() {
			if ($cookie._getCookie("ROLE") != "2") {
				return;
			}
			var $data = {
				"handler" : "HttpAlarmHandler",
				"action" : "deleteall"
			};
			ajaxPost("/felix", $data, function(rs) {
				if (rs["result"] == "OK") {
					$alarmNum.hide();
				}
			}, function() {
				alert("删除失败");
			});
		});
	};
	this._doJob = function() {
		// 定时周期任务调用
		$alarmTask = setInterval(function() {
			//			getAlarm();
		}, 2000);
	};
	function getAlarm() {
		var $data = {
			"handler" : "HttpAlarmHandler",
			"action" : "select"
		};
		ajaxPost("/felix", $data, function(rs) {
			if (rs["result"] == "OK") {
				$alarmContent.empty();
				if (rs.num == 0) {
					$alarmContent.append("没有任何消息。");
					$alarmNum.hide();
					$('.e_more').hide();
					$('.e_all_del').hide();
					$('#d_alarm_dl').css('margin-bottom', '10px');
				} else {
					$alarmNum.html(rs.num);
					$alarmNum.show();
					$('.e_more').show();
					$('.e_all_del').show();
					$('#d_alarm_dl').css('margin-bottom', '36px');
					rs.alarms.sort(function(a, b) {
						return b.time - a.time;
					});
					var contenttmp = "";
					var maxNum = rs.num < 5 ? rs.num : 5;
					for (var j = 0; j < maxNum; j++) {
						contenttmp = "";
						var $date = new Date(rs.alarms[j].time);
						contenttmp = (j + 1) + "、 " + $date.toLocaleString() + "从" + rs.alarms[j].source + "发现告警信息:"
						+ (rs.alarms[j].alarmInfo + "!").replace("!!", "!").replace(".!", "!").replace("!", " !") + " <span id='" + rs.alarms[j].source
						+ "_~_" + rs.alarms[j].sourceType + "_~_" + rs.alarms[j].type + "_~_" + rs.alarms[j].alarmCode;
						$alarmContent.append("<li title='" + contenttmp + "'>" + contenttmp + "<spam></span></li>");
					}
					if ($cookie._getCookie("ROLE") != "2") {
						$(".alarm_delete").removeClass("alarm_gray");
						$('#a_delete_all').removeClass("alarm_gray");
						$(".alarm_delete").addClass("alarm_gray");
						$('#a_delete_all').addClass("alarm_gray");
					} else {
						$(".alarm_delete").removeClass("alarm_gray");
						$('#a_delete_all').removeClass("alarm_gray");
					}
					// 绑定删除
					$alarmDelete = $(".alarm_delete");
					// 绑定删除事件
					deleteEvent();
				}
			}
		}, function() {
			clearInterval($alarmTask);
		});
	}
	function deleteEvent() {
		$alarmDelete.click(function() {
			if ($cookie._getCookie("ROLE") != "2") {
				return;
			}
			var ids = this.id.split("_~_");
			var $source = ids[0];
			var $sourceType = ids[1];
			var $type = ids[2];
			var $alarmCode = ids[3];
			var $data = {
				"handler" : "HttpAlarmHandler",
				"action" : "delete",
				"source" : $source,
				"sourceType" : $sourceType,
				"type" : $type,
				"alarmCode" : $alarmCode
			};
			ajaxPost("/felix", $data, function(rs) {
				if (rs["result"] == "OK") {
					getAlarm();
				}
			}, function() {
				alert("删除失败");
			});
		});
	}

};
function hidesideEventMobile(e) {
	if ($(e.target).is(".Frm_menu_cwidth,.Frm_menu_cwidth2") || $(e.target).is(".Frm_sidebar") || $(e.target).parents(".Frm_sidebar,.Frm_menu_cwidth2").size() > 0) {
		if ($(e.target).is(".sf-sidemenu-item") || $(e.target).parents("sf-sidemenu-item").size() > 0) {
			$(".Frm_sidebar").removeClass('width_150');
			$(".Frm_right").removeClass('right_150');
		}
	} else {
		//$(".Frm_menu_cwidth").addClass('width_54');
		$(".Frm_sidebar").removeClass('width_150');
		$(".Frm_right").removeClass('right_150');
	//$(".sf-sidebmenu-hang").addClass('right_54');
	//$(".main_content_tit").addClass("padding_0");
	}
	if (!$(this).is(".Frm_head_right2")) {
		$(".Frm_head_right2.frm_edit_box").hide();
	}
}
function hidesideEventPc(e) {
	if ($(e.target).is(".Frm_menu_cwidth") || $(e.target).is(".Frm_sidebar") || $(e.target).parents(".Frm_sidebar,.Frm_menu_cwidth").size() > 0) {
	} else {
		$(".Frm_menu_cwidth").addClass('width_54');
		$(".Frm_sidebar").addClass('width_54');
		$(".Frm_right").addClass('right_54');
		$(".sf-sidebmenu-hang").addClass('right_54');
		//		$(".main_content_tit").addClass("padding_0");
		$(".side_topmenu>span").hide();
	}
}
function loadiframe() {
	var url = location.hash.replace("#", "") || "home.html"
	$("#main_content_iframe").attr("src", decodeURIComponent(url));
}