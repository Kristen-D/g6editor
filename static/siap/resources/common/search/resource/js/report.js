//事件报表弹窗

	function eventReport(sindex,reportStartTime,reportEndTime,startTime,endTime,reportSearchDiff){		
	   //弹出框
	    $(".save_create").click(function(){
			easyDialog.open({
				container : 'b_dialog'
				});
			$(".btn_save_yes,.btn_save_no").click(function(){
        		$(this).addClass("active");
		     	$(this).removeClass("cother");
		     	$(this).siblings(".active").addClass("cother").removeClass("active");
        	});
		});
	    
		$(".close,.modal-btn-cancel").click(function(){
			$("#event_title_msg").text("");
			$("#event_title_msg").removeClass("modal_i_msg");
			easyDialog.close();
		});
		
		$(".btn_ce_bg").click(function(){
			var title=$("#event_title").val();
			var did=$("#queryCon").val();
			var descrip=$("#saveet_descrip").val();
			var owner=$cookie._getCookie("USERNAME");
			var apply="search";
			var type="event";
			var permission="专用";
			var sameflag=false;
			data = {"handler":"ReportHandler","action":"select"};
    		ajaxPost("/felix", data, function(rs) {
    				if(rs["result"] == "success"){
    					for(var j=0;j<rs['data'].length;j++){
    		        		if(decodeURIComponent(rs['data'][j].title).replace(/\+/g,' ')==title){
    		        			sameflag=true;
    		        			break;
    		        		}
    		        	}
    					
    					if($.trim(title)==""){
    						$("#event_title_msg").addClass("modal_i_msg");
    		        		$("#event_title_msg").text("In handler 'ReportHandler': Cannot create an object with empty or all whitespace name ");
    		    			return;
    		    		}else if(sameflag){
    		    			$("#event_title_msg").addClass("modal_i_msg");
    		    			$("#event_title_msg").text("In handler 'ReportHandler':  Unable to create report search with name'"+title+"'. A report search with that name already exists.  ");
    		    		}else{
    		    			//写入数据库
    		    			data = {"handler":"ReportHandler","action":"insert", "title":title, "did":did,"owner" : owner,"apply" : apply,"permission" : permission,"type":type,"descrip":descrip,"sindex":sindex,"startTime":$query.getStartDateTime(),"endTime":$query.getEndDateTime(),"reportStartTime":reportStartTime,"reportEndTime":reportEndTime,"reportSearchDiff":reportSearchDiff};
    		    			ajaxPost("/felix", data, function(rs) {
    		    	 			if(rs["result"] == "success"){
    		    	 				$("#in_title").val("");
    		    					easyDialog.close();
    		    					easyDialog.open({
    		    						container : 'e_dialog'
    		    						});
    		    					
    		    					var url="/search/main.html?q="+did+"&index="+sindex+"&startdatetime="+$query.getStartDateTime()+"&enddatetime="+$query.getEndDateTime();
    		    					$(".btn_cj_report").click(function(){
    		    						window.location.href=url;
    		    					});
    		    	 			}
    		    	 		}, function() {
    		    	 			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
    		    	 		});
    		    		}
    				}
    		});
		});
	}
	
	function clearEventClick(){
		$(".save_create").unbind("click");
		$(".btn_save_yes,.btn_save_no").unbind("click");
		$(".close,.modal-btn-cancel").unbind("click");
		$(".btn_ce_bg").unbind("click");
	}
	
	function clearFacetClick(){
		$(".save_create").unbind("click");
		$(".btn_save_yes,.btn_save_no,.btn_save_visual,.btn_save_unvisual").unbind("click");
		$(".close,.modal-btn-cancel").unbind("click");
		$(".btn_cf_bg").unbind("click");
	}
	
	//统计报表弹窗
	function facetReport(sindex,reportStartTime,reportEndTime,startTime,endTime,reportSearchDiff){	
		
	   //弹出框
	    $(".save_create").click(function(){
			easyDialog.open({
				container : 'bf_dialog'
				});
			var type_class=$("#chart-type span[class^='icon-']").attr('class');
			var type=type_class.split("-")[2];
			var icon_type=$("#button_type span[class^='icon-']");
			icon_type.removeClass();
			icon_type.addClass("icon-chart-"+type);
			$("#button_text").text($('#icon-type-text').text());
			$(".btn_save_yes,.btn_save_no,.btn_save_visual,.btn_save_unvisual").click(function(){
        		$(this).addClass("active");
		     	$(this).removeClass("cother");
		     	$(this).siblings(".active").addClass("cother").removeClass("active");
        	});
		});
	    
		$(".close,.modal-btn-cancel").click(function(){
			$("#facet_title_msg").text("");
			$("#facet_title_msg").removeClass("modal_i_msg");
			easyDialog.close();
		});
		
		$(".btn_cf_bg").click(function(){
			var title=$("#facet_title").val();
			var did=$("#queryCon").val();
			var descrip=$("#saveft_descrip").val();
			var owner=$cookie._getCookie("USERNAME");
			var apply="search";
			var type_class=$("#chart-type span[class^='icon-']").attr('class');
			var type=type_class.split("-")[2];
			var permission="专用";
			var sameflag=false;
			data = {"handler":"ReportHandler","action":"select"};
    		ajaxPost("/felix", data, function(rs) {
    				if(rs["result"] == "success"){
    					for(var j=0;j<rs['data'].length;j++){
    		        		if(decodeURIComponent(rs['data'][j].title).replace(/\+/g,' ')==title){
    		        			sameflag=true;
    		        			break;
    		        		}
    		        	}
    					if($.trim(title)==""){
    						$("#facet_title_msg").addClass("modal_i_msg");
    		        		$("#facet_title_msg").text("In handler 'ReportHandler': Cannot create an object with empty or all whitespace name ");
    		    			return;
    		    		}else if(sameflag){
    		    			$("#facet_title_msg").addClass("modal_i_msg");
    		    			$("#facet_title_msg").text("In handler 'ReportHandler':  Unable to create report search with name'"+title+"'. A report search with that name already exists.  ");
    		    		}else{
    		    			//写入数据库
    		    			data = {"handler":"ReportHandler","action":"insert", "title":title, "did":did,"owner" : owner,"apply" : apply,"permission" : permission,"type":type,"descrip":descrip,"sindex":sindex,"startTime":startTime,"endTime":endTime,"reportStartTime":reportStartTime,"reportEndTime":reportEndTime,"reportSearchDiff":reportSearchDiff};
    		    			ajaxPost("/felix", data, function(rs) {
    		    	 			if(rs["result"] == "success"){
    		    	 				$("#in_title").val("");
    		    					easyDialog.close();
    		    					easyDialog.open({
    		    						container : 'e_dialog'
    		    						});
    		    					
    		    					var url="/report/reportform.html?q="+did+"&title="+title;
    		    					$(".btn_cj_report").click(function(){
    		    						window.location.href=url;
    		    					});
    		    					$(".modal-power").click(function(){
    		    						window.location.href=url+"&dialogWhich=power";
    		    					});
    		    					$(".modal-plan").click(function(){
    		    						window.location.href=url+"&dialogWhich=plan";
    		    					});
    		    					$(".modal-quick").click(function(){
    		    						window.location.href=url+"&dialogWhich=quick";
    		    					}); 
    		    	 			}
    		    	 		}, function() {
    		    	 			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
    		    	 		});
    		    		}
    				}
    		});
		});
}