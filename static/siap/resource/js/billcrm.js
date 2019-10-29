$(function() {
	i18n("jsdxdbscene", 'resource/i18n/', 'map', function() {
		// 国际化：html 标签增加 i18n属性 值为 国际化的key
		//		$("[i18n]").each(function() {
		//			$(this).text($.i18n.prop($(this).attr("i18n")))
		//		})
		$("#box-2").css("left", $("#li-1").outerWidth())
		// 标题
		$("title").text("数据库审计" + "-" + '查询计费敏感信息数据库操作审计');
		var settings = {
			baseApl : "* AND billcrm_s=1 AND Operation_s=select AND duser_s={\"\" TO *] ", // APL
			topfield : "duser_s", // top统计字段
			index : collection_name, // 索引库
			zField : { // 钻取的字段 字段名:国际化
				"duser_s" : '用户', //用户Id
				"Object_s" : '表名', //协议
				"src_s" : '源ip', //用户主机
				"SourceApplication_s" : '源应用', //协议
				"ApplicationName_s" : '应用名', //身份验证账户
				"ServiceName_s" : '服务名', //主机名
				"Schema_s" : 'Schema', //协议
				"Database_s" : '数据库', //协议
				"Operation_s" : '操作', //登录或登出
				"HostName_s" : '主机名' //结果
			},
			// 表格回调函数 涉及一些字段的拼接 (${TargetUserName_s}  ${Action} at ${EventTime_s})
			queryEventSelectionCallBack : function(rs) {
				var count = rs["SIZE"];
				var data = new Array();
				var columns = [ "用户", "表名", "源ip", "源应用", "应用名", "服务名", "Schema", "数据库", "操作", "主机名", "搜索语句" ];
				for (var i = 0; i < count; i++) {
					var tempObj = {
						"No" : i + 1
					};
					tempObj["用户"] = decodeURIComponent(rs["duser_s" + i].replace(/\+/g, ' '));
					tempObj["表名"] = decodeURIComponent(rs["Object_s" + i].replace(/\+/g, ' '));
					tempObj["源ip"] = decodeURIComponent(rs["src_s" + i].replace(/\+/g, ' '));
					tempObj["源应用"] = decodeURIComponent(rs["SourceApplication_s" + i].replace(/\+/g, ' '));
					tempObj["应用名"] = decodeURIComponent(rs["ApplicationName_s" + i].replace(/\+/g, ' '));
					tempObj["服务名"] = decodeURIComponent(rs["ServiceName_s" + i].replace(/\+/g, ' '));
					tempObj["Schema"] = decodeURIComponent(rs["Schema_s" + i].replace(/\+/g, ' '));
					tempObj["数据库"] = decodeURIComponent(rs["Database_s" + i].replace(/\+/g, ' '));
					tempObj["操作"] = decodeURIComponent(rs["Operation_s" + i].replace(/\+/g, ' '));
					tempObj["主机名"] = decodeURIComponent(rs["HostName_s" + i].replace(/\+/g, ' '));
					tempObj["搜索语句"] = decodeURIComponent(rs["RawQuery_s" + i].replace(/\+/g, ' '));
					data.push(tempObj);
				}
				initDataTables(data, columns, "event");
			}
		}
		var report = new Report(settings);

		$('#showView').unbind().bind('click', function() {
			$('.edit-bg').toggleClass('showView');
		});

		$('.edit-bg .visual_select').find('li').unbind().bind('click', function() {
			var txt = $(this).attr('id');
			$('.edit-bg .visual_select li').removeClass('active');
			$(this).addClass('active');
			report.init(txt);
			$('.edit-bg').toggleClass('showView');
			$('#showView').find('span').text($.i18n.prop("pic_" + txt));
		});
	})
})