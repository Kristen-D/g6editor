var tab = 1
var searchContent = "";
function petTab(name, cursel, n) {
	tab = cursel;
	for (i = 1; i <= n; i++) {
		var menu = document.getElementById(name + i);
		var con = document.getElementById(name + "_" + i);
		// menu.checked=i==cursel?"true":"";
		menu.className = i == cursel ? "lab_pg_xct01" : "lab_pg_vor01";
		con.style.display = i == cursel ? "block" : "none";
	}
}
$(function() {
	if (location.hash) {
		var $tab = location.hash.substr(1);
		if ($tab) {
			petTab('fab', $tab, 3);
		}
		$(window).scrollTop(0);
	}
	$(document).on("mouseover mouseout", ".xq_btn", function(e) {
		if (event.type == 'mouseover') {
			$(this).next(".frm_edit_box").show();
		} else {
			$(this).next(".frm_edit_box").hide();
		}
	});
	var param = {
		handler : "PluginManagerHandler",
		action : "getPlugins"
	}
	exceptAjaxPost(
		"../felix/PluginManagerHandler",
		param,
		function(rs) {

			if (rs.result == "SUCCESS") {
				var url = rs["url"];
				var local = rs.local;
				var store = rs.store;
				var NOT_INSTALL = 0;
				var NOT_LATEST = 1;
				var LATEST = 2;
				var localList = new Array();
				if (store) {
					$("#fab1").click(function() {
						location.hash = 1;
						petTab('fab', 1, 3)
					});
					$("#fab2").click(function() {
						location.hash = 2;
						petTab('fab', 2, 3)
					});

					for (var i = 0; i < store.length; i++) {
						var pluginStore = store[i];
						var name = pluginStore["name"]
						var pluginLocal = local[name];
						if (pluginLocal) {
							localList.push(pluginStore);
							delete local[name];
							var vStore = pluginStore["version"] || "0.0.0";
							var vLocal = pluginLocal["version"] || "0.0.0";
							pluginStore["local_version"] = vLocal;
							var comp = compareVersion(vStore, vLocal)
							if (comp > 0) {
								pluginStore["install_state"] = NOT_LATEST;
							} else {
								pluginStore["install_state"] = LATEST;
							}
						} else {
							pluginStore["install_state"] = NOT_INSTALL;
						}
					}
					// 下载量排行榜

					var downloadCount = copyArray(store);

					downloadCount.sort(function(a, b) {
						return parseInt(b["count"]) - parseInt(a["count"]);
					})
					var $downloadCout = $("#downloadCout");
					$downloadCout.empty();
					for (var i = 0; i < 10 && i < downloadCount.length; i++) {
						var plugin = downloadCount[i];
						var installState = plugin["install_state"];
						var option;
						if (installState == 0) {
							option = $('<a class="dowonload_icon sc_download"></a>').attr('path', plugin["path"]).attr("storeid", plugin["id"]).text("获取");
						} else if (installState == 1) {
							option = $('<a class="update_icon sc_update"></a>').attr('path', plugin["path"]).attr("storeid", plugin["id"]).text("更新");
						} else if (installState == 2) {
							option = $('<a class="dowonload_icon_n sc_latest"></a>').attr('path', plugin["path"]).attr("storeid", plugin["id"]).text("最新");
						}

						var $li = $('<li><div class="cont_list_left"><div class="spec-preview"><a class="jqzoom"><img width="300" height="180" onerror="this.src=\'../resources/images/noimg.jpg\'"/></a></div></div><div class="cont_list_right"><table width="100%" border="0"></table></div></li>');
						$li.find("img").attr('src', url + "/picture/" + plugin["photo"])
						$li.find(".jqzoom").attr("href", url + "/picture/" + plugin["photo"]).attr('title', plugin["name"]);
						$li.find("table").append('<tr><td><strong>' + plugin["name"] + '</strong></td></tr>')
							.append($('<tr></tr>').append($('<td></td>').text('最新版本:' + plugin["version"] + ' 下载量:' + plugin["count"])))
							.append($('<tr></tr>').append($('<td></td>').text(plugin["description"] || "--").attr("title", plugin["description"])))
							.append($('<tr></tr>').append($('<td></td>').append(option)));
						$downloadCout.append($li);
					}
					$("#downloadCout .jqzoom").jqzoom({
						title : false,
						lens : true,
						preloadImages : false,
						alwaysOn : false
					});
					// 商城时间由低到高
					var storeList = copyArray(store);
					storeList.sort(function(a, b) {
						return parseInt(b["date"]) - parseInt(a["date"])
					})
					$("#choose").click(pluginfilters);
					$("#search").click(function() {
						searchContent = $("#serachkey").val();
						pluginfilters();
					})
					function pluginfilters() {
						var filterType = $("#choose").val();
						var storeListFiltered;
						if (filterType == "1") {
							storeListFiltered = new Array()
							for (var i = 0; i < storeList.length; i++) {
								var plugin = storeList[i];
								var installState = plugin["install_state"];
								if (plugin["name"].indexOf(searchContent) >= 0) {
									storeListFiltered.push(plugin);
								}
							}
						} else {
							storeListFiltered = new Array()
							for (var i = 0; i < storeList.length; i++) {
								var plugin = storeList[i];
								var installState = plugin["install_state"];
								if (((filterType == 2 & (installState == 1 || installState == 2)) || (filterType == 3 & installState == 0))
									&& plugin["name"].indexOf(searchContent) >= 0) {
									storeListFiltered.push(plugin);
								}
							}
						}
						getstoreContent(storeListFiltered);
					}
					getstoreContent(storeList)
					function getstoreContent(storeList) {
						var $store = $("#store");
						$store.empty();
						for (var i = 0; i < storeList.length; i++) {
							var plugin = storeList[i];
							var installState = plugin["install_state"];
							var option;
							if (installState == 0) {
								option = $('<a class="dowonload_icon sc_download"></a>').attr('path', plugin["path"]).attr("storeid", plugin["id"]).text("获取");
							} else if (installState == 1) {
								option = $('<a class="update_icon sc_update"></a>').attr('path', plugin["path"]).attr("storeid", plugin["id"]).text("更新");
							} else if (installState == 2) {
								option = $('<a class="dowonload_icon_n sc_latest"></a>').attr('path', plugin["path"]).attr("storeid", plugin["id"]).text("最新");
							}
							var $li = $('<li><div class="cont_list_left"><div class="spec-preview"><a class="jqzoom"><img width="300" height="180" onerror="this.src=\'../resources/images/noimg.jpg\'"/></a></div></div><div class="cont_list_right"><table width="100%" border="0"></table></div></li>');
							$li.find("img").attr('src', url + "/picture/" + plugin["photo"]);
							$li.find(".jqzoom").attr("href", url + "/picture/" + plugin["photo"]).attr('title', plugin["name"]);
							$li.find("table").append('<tr><td><strong>' + plugin["name"] + '</strong></td></tr>')
								.append($('<tr></tr>').append($('<td></td>').text('最新版本:' + plugin["version"] + ' 下载量:' + plugin["count"])))
								.append($('<tr></tr>').append($('<td></td>').text(plugin["description"] || "--").attr("title", plugin["description"])))
								.append($('<tr></tr>').append($('<td></td>').append(option)));
							$store.append($li);
						}
						$("#store .jqzoom").jqzoom({
							title : false,
							lens : true,
							preloadImages : false,
							alwaysOn : false
						});
					}
				} else {
					location.hash = 3;
					petTab('fab', 3, 3)
					$("#fab1,#fab2").css({
						color : "grey"
					})
				}
				$("#fab3").click(function() {
					location.hash = 3;
					petTab('fab', 3, 3)
				});
				// 本地列表
				for (var key in local) {
					localList.push({
						"name" : key,
						"local_version" : local[key]["version"] || "0.0.0"
					})
				}
				localList.sort(function(a, b) {
					return parseInt(b["name"]) - parseInt(a["name"])
				})
				var $local = $("#local");
				$local.empty();
				for (var i = 0; i < localList.length; i++) {
					var plugin = localList[i];
					var installState = plugin["install_state"];
					var option = "";
					if (installState == 0) {
						//							option = $('<a class="dowonload_icon sc_download"></a>').attr('path', plugin["path"]).attr("storeid",plugin["id"]).text("获取");
					} else if (installState == 1) {
						option = $('<a class="update_icon sc_update"></a>').attr('path', plugin["path"]).attr("storeid", plugin["id"]).text("更新");
					} else if (installState == 2) {
						//							option = $('<a class="dowonload_icon_n sc_latest"></a>').attr('path', plugin["path"]).attr("storeid",plugin["id"]).text("最新");
					}
					var $li = $('<li><div class="cont_list_left"><div class="spec-preview"><a class="jqzoom"><img width="300" height="180" onerror="this.src=\'../resources/images/noimg.jpg\'"/></a></div></div><div class="cont_list_right"><table width="100%" border="0"></table></div></li>');
					$li.find("img").attr('src', url + "/picture/" + plugin["photo"]);
					$li.find(".jqzoom").attr("href", url + "/picture/" + plugin["photo"]).attr('title', plugin["name"]);
					$li.find("table").append('<tr><td><strong>' + plugin["name"] + '</strong></td></tr>')
						.append($('<tr></tr>').append($('<td></td>').text('本地版本:' + plugin["local_version"] + (plugin["version"] ? ' 最新版本:' + plugin["version"] : ""))))
						.append($('<tr></tr>').append($('<td></td>').text(plugin["description"] || "--").attr("title", plugin["description"])))
						.append($('<tr></tr>').append($('<td></td>').append($('<a class="remove_icon sc_delete">卸载</a>').attr('pluginname', plugin["name"])).append(option)));
					$local.append($li);
				}
				$("#local .jqzoom").jqzoom({
					title : false,
					lens : true,
					preloadImages : false,
					alwaysOn : false
				});
				bindevent();
			} else {
				alert("Request Failed");
			}
		}, function() {
			alert("Request Failed");
		});
})

function unbindzoom(el) {
	$(el).parent().data('jqzoom').disable();
}

function bindevent() {
	$(document).on("click", ".dowonload_icon,.update_icon", function() {
		var param = {
			handler : "PluginManagerHandler",
			action : "install",
			filePath : $(this).attr("path"),
			id : $(this).attr("storeid")
		}
		easyDialog.open({
			container : 'loading'
		});
		longAjaxPost("../felix/PluginManagerHandler", param, function(rs) {
			easyDialog.close();
			if (rs["result"] == "SUCCESS") {
				location.reload();
			} else {
				alert("安装失败,请稍后重试");
			}
		}, function() {
			easyDialog.close();
			alert("请求超时,请稍后重试");
		})
	})
	$(document).on("click", ".remove_icon", function() {

		if (confirm("是否删除:" + $(this).attr("pluginname") + "?")) {
			var param = {
				handler : "PluginManagerHandler",
				action : "uninstall",
				name : $(this).attr("pluginname"),
			}
			easyDialog.open({
				container : 'loading'
			});
			ajaxPost("../felix/PluginManagerHandler", param, function(rs) {
				easyDialog.close();
				if (rs["result"] == "SUCCESS") {
					location.reload();
				} else {
					alert("卸载失败,请稍后重试");
				}
			}, function() {
				easyDialog.close();
				alert("请求超时,请稍后重试");
			})
		}
	});
	$("#pluginfile_show,#view").click(function() {
		$("#pluginfile").trigger("click");
	})
	$("#pluginfile").change(function() {
		$("#pluginfile_show").val($("#pluginfile").val());
	})
	$("#upload").click(function() {
		var filename = $("#pluginfile").val();
		if (filename) {
			if (filename.length > 4 && filename.substr(filename.length - 4) == ".war") {
				easyDialog.open({
					container : 'loading'
				});
				$("#fileuploadform").ajaxSubmit({
					url : "../pluginupload",
					type : "post",
					success : function(rs) {
						if (rs.result == "SUCCESS") {
							alert("上传成功");
							window.location.reload();
						} else {
							alert("请求失败");
							alert("上传失败");
						}
					},
					dataType : "json",
					error : function() {
						easyDialog.close()
						alert("请求失败");
					}
				})
			} else {
				alert("请选择war包");
			}
		}
	})
}

function copyArray(arr) {
	var newArr = new Array(arr.length);
	for (var i = 0; i < arr.length; i++) {
		newArr[i] = arr[i];
	}
	return newArr;
}

function parseVersion(version) {
	var ret = {
		maj : 0,
		min : 0,
		mic : 0,
		qual : ""
	}
	var arr = version.split(/\./);
	arr[0] && (ret.maj = (parseInt(arr[0]) || 0));
	arr[1] && (ret.min = (parseInt(arr[1]) || 0));
	arr[2] && (ret.mic = (parseInt(arr[2]) || 0));
	arr[3] && (ret.qual = arr[3]);
	return ret;
}
function compareVersion(version1, version2) {
	var v1 = (typeof version1 == "string") ? parseVersion(version1) : version1;
	var v2 = (typeof version2 == "string") ? parseVersion(version2) : version2;
	var result = 0;
	result = v1.maj - v2.maj;
	if (result != 0) {
		return result;
	}
	result = v1.min - v2.min;
	if (result != 0) {
		return result;
	}
	result = v1.mic - v2.mic;
	if (result != 0) {
		return result;
	}
	return v1.qual.localeCompare(v2.qual);
}