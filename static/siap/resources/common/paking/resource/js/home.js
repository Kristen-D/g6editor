var $wordsCookie = "SEARCH WORD";
$(document).ready(function(){
	initSearchTip();
	
	var index="";
	var $commands = new Array("head","table","addtotals","dedup","fields","multikv","strcat","sort","tail","where","rex","cofilter","stats","replace","rename","top","rare","chart","timechart","eventcount","reverse","transpose","accum","regex","trendline","xmlunescape","iplocation","sendemail","uniq","xmlkv","filldown","fillnull","fieldsummary","mvcombine","transaction","dategap","pivot");
//	i18n("common", '../resource/i18n/', 'map', function() {
//		   //平台标题
//		   $('title').text($.i18n.prop('aus_title'));
//	});
	
	
	$("#nav_wrap_search").parent("li").addClass("current");
	
	$("#search_home").load($("#search_home").attr("data-view"), function(responseTxt,statusTxt,xhr){
	    if(statusTxt=="success") {
	     	$('.m_search_cont .search_input_text').keydown(function(event){
				$(".status-search-result").show();
				if(event.keyCode==8 && $(this).val()==''||event.keyCode==13){
					$(".status-search-result").hide();
				}
		    });
	     	
	     	$('.m_search_cont .search_input_text').keyup(function(event){
				var valText = $.trim($(this).val());
				if(valText ==''||valText==""){
					return;
				}
				var arr=new Array();
				if(valText.indexOf('|')>=0){
					arr = valText.split('|');
					var arr_i = arr[arr.length-1].trim();
					if(arr_i != ""){
						if($('#saHeadingNav_h').text()!=""&&arr_i.indexOf($('#saHeadingNav_h').text())>=0){
								return;
						}
						$('.status-search-result li').remove();
						$(".status-search-result .search-command-history").remove();
						$('.saHeadingNav_hh h5').remove();
						$('.saHeadingNav_hh a').remove();
						//命令历史开始
						var $_data = {"handler":"SearchHistoryHandler","action" :"select","search":arr_i,"maxNum":"5"};
						ajaxPost("/felix", $_data, function(rs) {
							if(rs["result"] == "OK"){
								if(rs["data"].length>0){
									$('.status-search-result').append("<h1 class='splFont-cidi search-command-history'>命令历史</h1>");
									for(var j=0;j<rs["data"].length;j++){
										var $li="<li class='search-history'>"+rs["data"][j]["search_string"]+"</li>";
										$('.status-search-result').append($li);
									}
									$('.status-search-result .search-history').click(function(){
										$("#queryCon").val($(this).text());
									});
								}
							}
						});
						//命令历史结束
						//循环遍历开始
						$.each($commands,function(key,value){
							var input_length=arr_i.length<=value.length?arr_i.length:value.length;
							if(value.substring(0,input_length).indexOf(arr_i)>=0){
								containCommand(value);
								}
							if(arr_i.indexOf(value)>=0){
								$('.saHeadingNav').remove();
								//读取xml开始
								$.ajax({
							        url: '/search/resource/pakingCommandArr.xml',
							        dataType: 'xml',
							        type: 'GET',
							        timeout: 2000,
							        success: function(xml)
							        {
							            $(xml).find("command").each(function(i)
							            {
							                var oid = $(this).attr("id");
							                if(arr_i.indexOf(oid)>=0){
							                	 var explain = $(this).children("explain").text();
									             var example = $(this).children("example").text();										             
									             var div_i = "<div class='saHeadingNav'><div class='saHeadingNav_hh'><h5 id='saHeadingNav_h'>"
									            	 + value + "</h5><a href='#'>帮助</a></div><div class='saContent'>"
													+ explain + "<h5>示例</h5>" + example + "</div></div>";													
												$('.status-cont').append(div_i);
												$('.saHeadRor').css("display","none");
							                }
							               
							            });
							        }
							    });
								//读取xml结束
							}
						});
						//循环遍历结束
					}else{
						$('.status-search-result li').remove();
						$(".status-search-result .search-command-history").remove();
						$.each($commands,function(key,value){
							containCommand(value);
						});
					}
					$('.status-search-result .search-command').click(function(){
						var tempArr = "";
						for(var i = 0;i < arr.length - 1; i++){
							tempArr = tempArr + arr[i] + "| ";
						}
						$("#queryCon").val(tempArr + $(this).text());
					});
				}else{
					$('.saHeadRor').css("display","block");
					$('.saHeadingNav').css("display","none");
					$('.status-search-result li').remove();
					$(".status-search-result .search-command-history").remove();
				}
				addWords();
				$('.status-search-result .search_col').click(function(){
					$("#queryCon").val(valText + " " + $(this).text());
				});
				key = valText;
				if(event.keyCode==8 && $(this).val()==''||event.keyCode==13){
			  	    $(this).parent().nextAll('ul').hide();
				}
		    });
	     	
	    	$('.m_search_cont .status-search-result .search-command').click(function(){
				var adminname = $(this).text();
				$(this).parents('.m_search_cont').find('textarea').val(adminname);
			});
	    	initSearchIndex();
	    	$("#queryCon").autoHeight();
	    	$("#queryCon").keydown(function(e){
				if(e.keyCode==13){
					var kcon = escape($("#queryCon").val());
					if(kcon == ""){
						return;
					}
					var index_selected = new Array();
					$(".index_chkbox").each(function() {
						if ($(this).is(':checked'))
							index_selected.push($(this).val());
					});
		    		window.location.href="/search/main.html?q="+kcon+"&index="+index_selected.join(",")+"&startdatetime="+$query.getStartDateTime()+"&enddatetime="+$query.getEndDateTime();
				}
			});
	    	$("#search").click(function() {
	    		var con = escape($("#queryCon").val());
	    		if(con == ""){
	    			return;
	    		}
	    		var index_selected = new Array();
				$(".index_chkbox").each(function() {
					if ($(this).is(':checked'))
						index_selected.push($(this).val());
				});
	    		window.location.href="/search/main.html?q="+con+"&index="+index_selected.join(",")+"&startdatetime="+$query.getStartDateTime()+"&enddatetime="+$query.getEndDateTime();
	    	});
	    	//加载事件界面
			$("#d_datetimepicker").load($("#d_datetimepicker").attr("data-view"), function(responseTxt,statusTxt,xhr) {
				//to do.....
				if(statusTxt == "success"){
				var $timepicker = new TimePicker(applyCallback);
				$timepicker._init();
				//拖拽事件
				dragInit();
				}
			});
	    	
	    	$('.time_l_n a').click(function(event) {
	    		$(".status-search-result").hide();
	    		$('#popdown_index').css('display',"none");
	    		event.stopPropagation();
	    		$(this).next().toggle();
	    		if($('.time_l_n .search_button').attr("class").indexOf("search_button_c")){
	    			$('.time_l_n .search_button').removeClass('search_button_c');
	    			$('.time_l_n .search_button_g').removeClass('search_button_c2');
	    		}else{
	    			$('.time_l_n .search_button').addClass('search_button_c');
	    			$('.time_l_n .search_button_g').addClass('search_button_c2');
	    		}
	    	});
	    	
	    	$('.index_l_n a').click(function(event){
	    		$(".status-search-result").hide();
	    		$('#d_datetimepicker').css('display',"none");
	    		event.stopPropagation();
	    		$(this).next().toggle();
	    	});
	    	
	    	i18n("search_home", '/resource/i18n/', 'map', function() {
	 		   $('#queryCon').attr("placeholder", $.i18n.prop('queryCon'));
	 		   $('#apply').text($.i18n.prop('apply'));
	 		   $('#time').text($.i18n.prop('time'));
	 		   $('#search').text($.i18n.prop('search'));
	    	});
	    	
	    	
	    	var $data = {"handler":"SceneHandler"};
			ajaxPost("/felix", $data, function(rs) {
				if(rs.result = "success"){
					if(rs.data.length>0){
						$('#all_scene').css('display','block');
						$.each(rs.data,function(i,n){
							$("#ul_scene").append("<li><a href='"+n.url+"'>"+decodeURIComponent(n.sceneName).replace(/\+/g,' ')+"</a></li>")
						});
					}
				}
			});
	    	
	    }
      if(statusTxt=="error")
        alert("Error: "+xhr.status+": "+xhr.statusText);
	});
	$("#home").load($("#home").attr("data-view"));
	
	function query(currentPage) {
		var con = $("#queryCon").val();
		var index_selected = new Array();
		$(".index_chkbox").each(function() {
			if ($(this).is(':checked'))
				index_selected.push($(this).val());
		});
		data = {"handler":"SearchHandler", "queryCondition":con, "currentPage":""+currentPage, "batchNum":""+10,"index":index_selected.join(",")};
		ajaxPost("/felix", data, function(rs) {
 			if(rs["result"] == "OK") {
 			} else {
 				alert($.i18n.prop('query_queryfail'));
 			}
 		}, function() {
 			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
 		});
	}
	
	function dragInit(){
		var m_item;
		$(".appList .dashboard_panel").sortable({
			connectWith : ".app-wrapper",
			containment:".appList .dashboard_panel",
			cursor : "move",
			helper : function(e, ele) {
				var cp = $(ele).clone();
				$(cp).css("opacity", 0.5);
				return $(cp).clone();
			},
			placeholder : "app-wrapper app_placeholder",
			cancel : ".draghandle_b"
		}).disableSelection();

		$(".appList .dashboard_panel").bind('sortactivate', function(e, ele) {
			$(".app_placeholder").css("height", ele.item.css("height"));
			m_item=ele.item;
			ele.item.remove();
		});
		
		$(".appList .dashboard_panel").bind('sortbeforestop',function(e,ele){
			var m_div=$(".appList .app_placeholder").next("div");
			m_item.insertBefore(m_div);
		});
	}
	
	$(document).click(function(event) {
		$('.time_l_n .search_button').removeClass('search_button_c');
		$('.time_l_n .search_button_g').removeClass('search_button_c2');
//		$('#popdown_index').css('display',"none");
	//	$('#d_datetimepicker').css('display',"none");
	});
	
	function initSearchIndex(){
		//获取collection
		var ajax_data={"handler":"IndexHandler","action":"select"};
		ajaxPost("/felix", ajax_data, function(rs) {
			if(rs["result"] == "OK"){
				var all_index = rs.index;
				var month = new Array();
//				uniqueIndex(rs,all_index,month);
				all_index.sort(function(a,b){
					return a.localeCompare(b); 
				});
				for(var i=0;i<all_index.length;i++){
					$('#index').append("<li><input class='index_chkbox' type='checkbox' value='"+all_index[i]+"'><span>"+all_index[i]+"</span></li>");
				}
				
				$('#index a').click(function(){
					var index_select= $(this).text();
//					$(this).toggleClass("index_selected");
					var queryCon= $("#queryCon").val();
					queryCon = queryCon.trim().replaceAll(" =","=").replaceAll("= ","=");
					var indexs="";
					if(queryCon.indexOf("index=")==0&&queryCon.indexOf(" ")>0){
						indexs= queryCon.substring(6,queryCon.indexOf(" "));
						if((","+indexs+",").indexOf(","+index_select+",")<0){
							if(indexs.length>0){
								indexs = indexs + ","+index_select;
							}else{
								indexs=index_select;
							}
						}
						queryCon="index="+indexs+queryCon.substring(queryCon.indexOf(" "));
					}else{
						queryCon="index="+index_select+" "+queryCon;
					}
					$("#queryCon").val(queryCon);
				});
				
				$("#queryCon").keyup(function(){
					if($("#queryCon").val()!=""&&$("#queryCon").val().indexOf("index")==0){
						$('#select_index').text("索引库");
						index="";
					}
				});
				
				if(navigator.userAgent.indexOf("MSIE 8.0")>0){
		    		$('.li_collection li:nth-child(4n+1), .li_collection li:nth-child(4n+2), .li_collection li:nth-child(4n+3)').css({
		    			"float": "left",
			            "width": "120px"
		    		});
		    	}
			}
		},function(){
		});
	}
	
	function containCommand(value) {
		var lii = "<li class='search-command'>" + value + "</li>";
		$('.status-search-result').append(lii);
		$('.saHeadRor').css("display","block");
		$('.saHeadingNav').css("display","none");
	};
	function addWords(){
		$('.status-search-result .search-column').remove();
		var $cookieValue = $cookie._getCookie($wordsCookie);
		var lis = "";
		//得到cookie初始化可选和有趣字段
		if($cookieValue != ""){
			$('.status-search-result').append("<h1 class='splFont-cidi search-column'>字段</h1>")
			$.each($cookieValue.split(","),function(index, value){
				lis += "<li class='search_col'>"+value+"</li>";
			});
			$('.status-search-result').append(lis);
		}
	}
});

//点击apply后的回调函数
function applyCallback(){
	
}

function initSearchTip(){
	var words = $cookie._getCookie($wordsCookie);
	if (words == "") {
		$data = {"handler":"SearchHandler", "queryCondition":"*","currentPage":""+1, "batchNum":""+10, "type":"event","index":""};
		ajaxPost("/felix", $data, function(rs) {
			var $s_fields = rs["SELECTED_FIELDS"].replace("rawMsg,","");
			var $i_fields_rs = rs["INTRERESTED_FIELDS"].replace("id,","").replace("_version_,","").replace("name,","");
			$i_fields_rs = $i_fields_rs.substring(0,$i_fields_rs.length-1);
			$cookie._addCookie($wordsCookie,$s_fields+","+$i_fields_rs,24*5);
		});
	}
}
