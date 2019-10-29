$(function() {
	$("#refreshparent").click(function(e) {
		if (parent.pathname != "menumanager.html") {
			parent.location.reload();
		}
	})

	$("form").each(function() {
		$(this).validate({
			errorElement : "em",
			onfocusout : false,
			onkeyup : false,
			onclick : false
		})
	});

	var param = {
		handler : "MenuHandler",
		action : "getMenu"
	};

	ajaxPost(
		"../felix/MenuHandler",
		param,
		function(rs) {
			if (rs["result"] == "SUCCESS") {
				var pluginMenus = rs.pluginMenus;
				var linkMenus = rs.linkMenus;
				var menus = rs.menus;
				var topMenus = rs.topMenus;
				var content = "";
				var default_content = "";
				for (var i = 0; i < menus.length; i++) {
					var topMenu = topMenus[menus[i]];
					if (topMenu) {
						var $content = "";
						$content += "<div class='col-md-12 column' topmenutitle='" + menus[i] + "' icon='" + topMenu.icon + "' ><div class='col-md-1'>"
							+ (menus[i] == "default" ? "" : "<a class=' submenu_item fa fa-close topmenu_icon_operation_del'></a> ")
							+ "<span class='topmenu'><span class='topmenuicon fa fa-" + topMenu.icon + "'></span><span class='topmenutitle'>"
							+ topMenu.title + "</span></span>"
							+ (menus[i] == "default" ? "" : "<a class=' submenu_item fa fa-pencil topmenu_icon_operation_edit'></a>")
							+ "</div><div class='col-md-11 submenu_container'>";
						var subMenus = topMenu.subMenus;
						for (var j = 0; j < subMenus.length; j++) {
							var subMenu;
							if (subMenu = linkMenus[subMenus[j]]) {
								$content += "<div class='col-md-2 submenu' submenutitle='"
									+ subMenus[j]
									+ "' submenuurl='"
									+ subMenu.url
									+ "'>"
									+ "<span><a class='submenu_item fa fa-close submenu_icon_operation_del'></a> <span class='submenu_item col-md-offset-1 col-md-10  submenu_content'>"
									+ subMenu.title + "</span><a class=' submenu_item fa fa-pencil submenu_icon_operation_edit'></a></span></div>"
								delete linkMenus[subMenus[j]];
							} else if (subMenu = pluginMenus[subMenus[j]]) {
								$content += "<div class='col-md-2 submenu' submenutitle='" + subMenus[j] + "' submenuurl='" + subMenu.url + "'>"
									+ "<span><span class='submenu_item col-md-offset-1 col-md-10 submenu_content'>" + subMenu.title
									+ "</span></span></div>";
								delete pluginMenus[subMenus[j]];
							}
						}
						if (menus[i] == "default") {
							default_content += $content + "</div></div>";
						} else {
							content += $content + "</div></div>";
						}

					}
				}
				$(".menu_container").html(content);
				$(".default_menu_container").html(default_content);
				var default_submenu_content = "";
				for (var key in linkMenus) {
					var subMenu = linkMenus[key];
					default_submenu_content += "<div class='col-md-2 submenu' submenutitle='"
						+ key
						+ "' submenuurl='"
						+ subMenu.url
						+ "'>"
						+ "<span><a class='submenu_item fa fa-close submenu_icon_operation_del'></a> <span class='submenu_item col-md-offset-1 col-md-10  submenu_content'>"
						+ subMenu.title + "</span><a class=' submenu_item fa fa-pencil submenu_icon_operation_edit'></a></span></div>"
				}
				for (var key in pluginMenus) {
					var subMenu = pluginMenus[key];
					default_submenu_content += "<div class='col-md-2 submenu' submenutitle='"
						+ key
						+ "' submenuurl='"
						+ subMenu.url
						+ "'>"
						+ "<span><span class='submenu_item col-md-offset-1 col-md-10 submenu_content'>"
						+ subMenu.title + "</span></span></div>"
				}
				// default_content += "</div></div>"
				$("[topmenutitle=default] .submenu_container").append(default_submenu_content);
				initsortable();
			} else {
				rs.msg ? alert(rs.msg) : alert("error");
			}
		}, function() {
			alert("Get Menu data field");
		});
	function initsortable() {
		$(".submenu_container").sortable({
			placeholder : "ui-state-highlight",
			connectWith : ".submenu_container",
			cursor : "move",
			revert : true,
			update : function(event, ui) {
				// console.log(event);
				// console.log($(event.target).text());
				// console.log(ui.item.text());
				// if (ui.sender) {
				// console.log(ui.sender.text());
				// }
				var idx = $(event.target).children().index(ui.item)
				if (idx > -1) {
					var req;
					if (ui.sender) {
						req = {
							handler : "MenuHandler",
							action : "changeSubMenuPosition",
							subMenu : ui.item.attr("submenutitle"),
							srcTopMenu : ui.sender.parents("[topmenutitle]").attr("topmenutitle"),
							destTopMenu : $(event.target).parents("[topmenutitle]").attr("topmenutitle"),
							position : idx
						}
					} else {
						req = {
							handler : "MenuHandler",
							action : "changeSubMenuPosition",
							subMenu : ui.item.attr("submenutitle"),
							srcTopMenu : $(event.target).parents("[topmenutitle]").attr("topmenutitle"),
							destTopMenu : $(event.target).parents("[topmenutitle]").attr("topmenutitle"),
							position : idx
						}
					}
					ajaxPost("../felix/MenuHandler", req, function(rs) {
						if (rs.result == "SUCCESS") {
							// $(".submenu_container").sortable("refresh");
						} else {
							rs.msg ? alert(rs.msg) : alert("error");
							window.location.reload();
						}
					}, function() {
						alert("Request failed");
					})

				}

			}
		});

		$(".menu_container").sortable({
			placeholder : "ui-state-highlight",
			cursor : "move",
			revert : true,
			update : function(event, ui) {
				var idx = $(event.target).children().index(ui.item)
				if (idx > -1) {
					var req = {
						handler : "MenuHandler",
						action : "changeTopMenuPosition",
						topTitle : ui.item.attr("topmenutitle"),
						position : idx
					}
					ajaxPost("../felix/MenuHandler", req, function(rs) {
						if (rs.result == "SUCCESS") {
							// $(".submenu_container").sortable("refresh");
						} else {
							rs.msg ? alert(rs.msg) : alert("error");
							window.location.reload();
						}
					}, function() {
						alert("Request failed")
					});
				}
			}
		});
		$(".menu_container,.submenu_container").disableSelection();
	}
	$(document).on("click", ".submenu_icon_operation_del", function() {
		var subMenuTitle = $(this).parents(".submenu").attr("submenutitle");

		$("#modal-container-deletesubmenu-content").text("是否删除\"" + $(this).parents(".submenu").find(".submenu_content").text() + "\"!");
		$("#deletesubmenu_submit").attr("menu", subMenuTitle);
		$("#modal-container-deletesubmenu").modal({
			backdrop : "static"
		})
	});
	$(document).on("click", ".topmenu_icon_operation_del", function() {

		var topMenuTitle = $(this).parents("[topmenutitle]");
		$("#modal-container-deletetopmenu-content").text("是否删除\"" + $(this).parents("[topmenutitle]").find(".topmenutitle").text() + "\"!");
		$("#deletetopmenu_submit").attr("menu", topMenuTitle.attr("topmenutitle"));
		$("#modal-container-deletetopmenu").modal({
			backdrop : "static"
		})
	});
	$(document).on("click", ".submenu_icon_operation_edit", function() {

		var $submenu = $(this).parents(".submenu");
		$("#editsub_name").val($submenu.find(".submenu_content").text());
		$("#editsub_name").attr("oriname", $submenu.attr("submenutitle"));
		$("#editsub_url").val($submenu.attr("submenuurl"));
		$("#modal-container-editsubmenu").modal({
			backdrop : "static"
		})
	});
	$("#editsubmenu_submit").click(function() {
		if (!$("#editsub_form").valid()) {
			return;
		}
		$(this).parents(".modal").modal("toggle");
		var _originSubmenu = $("#editsub_name").attr("oriname");
		var _title = $("#editsub_name").val();
		var _url = $("#editsub_url").val();
		var req = {
			handler : "MenuHandler",
			action : "changeLinkMenu",
			originSubmenu : _originSubmenu,
			title : _title,
			url : _url,
		}
		ajaxPost("../felix/MenuHandler", req, function(rs) {
			if (rs.result == "SUCCESS") {
				$("[submenutitle='" + _originSubmenu + "']").attr("submenuurl", _url).find(".submenu_content").text(_title);
			} else {
				rs.msg ? alert(rs.msg) : alert("error");
				window.location.reload();
			}
		}, function() {
			alert("Request failed")
		});
	})
	$(document).on("click", ".topmenu_icon_operation_edit", function() {

		var $topmenu = $(this).parents("[topmenutitle]");
		$("#edittop_name").val($topmenu.find(".topmenutitle").text());
		$("#edittop_name").attr("oriname", $topmenu.attr("topmenutitle"));
		$("#edittop_icon").val($topmenu.attr("icon"));
		$("#modal-container-edittopmenu").modal({
			backdrop : "static"
		})
	});
	$("#edittopmenu_submit").click(function() {
		if (!$("#edittop_form").valid()) {
			return;
		}
		$(this).parents(".modal").modal("toggle");
		var _origin = $("#edittop_name").attr("oriname");
		var _topTitle = $("#edittop_name").val();
		var _icon = $("#edittop_icon").val();
		var req = {
			handler : "MenuHandler",
			action : "changeTopMenu",
			origin : _origin,
			topTitle : _topTitle,
			icon : _icon,
		}
		ajaxPost("../felix/MenuHandler", req, function(rs) {
			if (rs.result == "SUCCESS") {
				var $topmenu = $("[topmenutitle='" + _origin + "']");
				$topmenu.attr("icon", _icon).find(".topmenutitle").text(_topTitle);
				var $icon = $topmenu.find(".topmenuicon");
				var clazzes = $icon.attr("class").split(/\s+/);
				for (var i = 0; i < clazzes.length; i++) {
					if (/fa-\.+/.test(clazzes[i])) {
						$icon.removeClass(clazzes[i])
						$icon.addClass("fa-" + _icon)
						break;
					}
				}
			} else {
				rs.msg ? alert(rs.msg) : alert("error");
				window.location.reload();
			}
		}, function() {
			alert("Request failed")
		});
	})
	$("#addtopmenu").click(function(e) {
		$("#addtop_name").val("");
		$("#addtop_icon").val("");
		$("#modal-container-addtop").modal({
			backdrop : "static"
		})
	});
	$("#addsubmenu").click(function(e) {
		$("#addsub_name").val("");
		$("#addsub_url").val("");
		$("#modal-container-addsub").modal({
			backdrop : "static"
		})
	});

	$("#deletesubmenu_submit").click(function() {
		$(this).parents(".modal").modal("toggle");
		var thistitle = $(this).attr("menu")
		var req = {
			handler : "MenuHandler",
			action : "removeLinkMenu",
			title : thistitle
		}
		ajaxPost("../felix/MenuHandler", req, function(rs) {
			if (rs.result == "SUCCESS") {
				$("[submenutitle='" + thistitle + "']").remove()
			// $(".submenu_container").sortable("refresh");
			} else {
				rs.msg ? alert(rs.msg) : alert("error");
				window.location.reload();
			}
		}, function() {
			alert("Request failed")
		});
	})
	$("#deletetopmenu_submit").click(function() {
		$(this).parents(".modal").modal("toggle");
		var thistitle = $(this).attr("menu")
		var req = {
			handler : "MenuHandler",
			action : "removeTopMenu",
			topTitle : thistitle
		}

		ajaxPost("../felix/MenuHandler", req, function(rs) {
			if (rs.result == "SUCCESS") {
				$("[topmenutitle='" + thistitle + "']").remove()
			// $(".submenu_container").sortable("refresh");
			} else {
				rs.msg ? alert(rs.msg) : alert("error");
				window.location.reload();
			}
		}, function() {
			alert("Request failed")
		});
	});
	$("#addtopmenu_submit")
		.click(
			function() {

				if (!$("#addtop_form").valid()) {
					return;
				}
				$(this).parents(".modal").modal("toggle");
				var _topTitle = $("#addtop_name").val();
				var _icon = $("#addtop_icon").val();
				var req = {
					handler : "MenuHandler",
					action : "addTopMenu",
					topTitle : _topTitle,
					icon : _icon
				};
				ajaxPost(
					"../felix/MenuHandler",
					req,
					function(rs) {
						if (rs.result == "SUCCESS") {
							var topmenuContent = "<div class='col-md-12 column topmenu' topmenutitle='"
								+ rs.id
								+ "' icon='"
								+ _icon
								+ "' ><div class='col-md-1'>"
								+ "<a class=' submenu_item fa fa-close topmenu_icon_operation_del'></a> <span class='topmenu'><span class='topmenuicon fa fa-"
								+ _icon
								+ "'></span><span class='topmenutitle'>"
								+ _topTitle
								+ "</span><a class=' submenu_item fa fa-pencil topmenu_icon_operation_edit'></a></div><div class='col-md-11 submenu_container ui-sortable'></div></div>";

							$(".menu_container").append(topmenuContent).sortable("refresh");
							setTimeout(function() {
								try {
									$(".submenu_container").sortable("destroy");


								} catch (e) {}
								$(".submenu_container").sortable({
									placeholder : "ui-state-highlight",
									connectWith : ".submenu_container",
									cursor : "move",
									revert : true,
									update : function(event, ui) {
										var idx = $(event.target).children().index(ui.item)
										if (idx > -1) {
											var req;
											if (ui.sender) {
												req = {
													handler : "MenuHandler",
													action : "changeSubMenuPosition",
													subMenu : ui.item.attr("submenutitle"),
													srcTopMenu : ui.sender.parents("[topmenutitle]").attr("topmenutitle"),
													destTopMenu : $(event.target).parents("[topmenutitle]").attr("topmenutitle"),
													position : idx
												}
											} else {
												req = {
													handler : "MenuHandler",
													action : "changeSubMenuPosition",
													subMenu : ui.item.attr("submenutitle"),
													srcTopMenu : $(event.target).parents("[topmenutitle]").attr("topmenutitle"),
													destTopMenu : $(event.target).parents("[topmenutitle]").attr("topmenutitle"),
													position : idx
												}
											}
											ajaxPost("/felix", req, function(rs) {
												if (rs.result == "SUCCESS") {
													// $(".submenu_container").sortable("refresh");
												} else {
													rs.msg ? alert(rs.msg) : alert("error");
													window.location.reload();
												}
											}, function() {
												alert("Request failed");
											})
										}
									}
								});
							}, 200);
						} else {
							rs.msg ? alert(rs.msg) : alert("error");
							window.location.reload();
						}
					}, function() {
						alert("Request failed")
					});
			});
	$("#addsubmenu_submit")
		.click(
			function() {
				if (!$("#addsub_form").valid()) {
					return;
				}
				$(this).parents(".modal").modal("toggle");
				var _addsub_name = $("#addsub_name").val();
				var _sub_url = $("#addsub_url").val();
				var req = {
					handler : "MenuHandler",
					action : "addLinkMenu",
					title : _addsub_name,
					url : _sub_url
				};
				ajaxPost(
					"../felix/MenuHandler",
					req,
					function(rs) {
						if (rs.result == "SUCCESS") {
							var content = ""
							content += "<div class='col-md-2 submenu' submenutitle='"
								+ rs.id
								+ "' submenuurl='"
								+ _sub_url
								+ "'>"
								+ "<span><a class='submenu_item fa fa-close submenu_icon_operation_del'></a> <span class='submenu_item col-md-offset-1 col-md-10 submenu_content'>"
								+ _addsub_name + "</span><a class=' submenu_item fa fa-pencil submenu_icon_operation_edit'></a></span></div>"
							$(".default_menu_container .submenu_container").append(content).sortable("refresh");
						} else {
							rs.msg ? alert(rs.msg) : alert("error");
							window.location.reload();
						}
					}, function() {
						alert("Request failed")
					});
			});
	$("#addtop_icon,#edittop_icon").click(function(e) {
		var myWindow = window.open('icon.html?id=' + $(this).attr("id"), '', 'resizable=1,status=no,toolbar=no,menu=no,width=1024,height=600,left=150,top=50');
		myWindow.focus();
	})
});
$.validator.addMethod("maxBytes", function(value, element, params) {
	return lenFor(value) <= params;
	function lenFor(str) {
		var byteLen = 0,
			len = str.length;
		if (str) {
			for (var i = 0; i < len; i++) {
				if (str.charCodeAt(i) > 255) {
					byteLen += 2;
				} else {
					byteLen++;
				}
			}
			return byteLen;
		} else {
			return 0;
		}
	}
}, $.validator.format("请输入少于{0}个字节"));