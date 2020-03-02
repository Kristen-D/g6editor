//用于处理所有的点击之后搜索事件
var SearchClick = function(){
	this._click = function(name,temp){
		var con = $("#queryCon").val();
		name=transferField(name);
		temp=transferField(temp);
		//recordTime单独处理
		if(isTime(temp)){
			//选判断是否存在毫秒
			temp=temp.replace(/\//g,'-');
			if(temp.indexOf(".")>0){
				var time = temp.substring(0,temp.indexOf("."));
				var mill = temp.substring(temp.indexOf("."),temp.length);
				mill = mill.replaceAll("000Z","Z").replaceAll("00Z","Z").replaceAll("0Z","Z");
				if(mill == ".Z"){
					$("#queryCon").val(con+" AND "+name+"="+time+"Z");
				}else{
					$("#queryCon").val(con+" AND "+name+"="+time+mill);
				}
			}else{
				$("#queryCon").val(con+" AND "+name+"="+temp);
			}
		}else{
			$("#queryCon").val(con+" AND "+name+"="+temp);
		}
		initAll();
	};
};
var searchClick = new SearchClick();

//清空
function initTable() {	
	$(".tr_i").remove();
	$('.tab_expend .expend_tr').remove();
}

//换行
function textWrap() {
	$("#usertable").css({"word-break":"break-all", "word-wrap":"break-all"});
}

function displayTable(fields, rs,tabletype) {
	var num = parseInt(rs["SIZE"]);
	$("#tabList_bor_l_n").attr("rowspan", num+1);
		for (var i=0; i<num; i++) {
			var fields_value = "";
			if (fields && fields.length > 0) {
				for (var k=fields.length-1; k>=0; k--) {
					var field = fields[k];
					if( rs[field+i] != undefined){
					var fieldValue = field + "=" + rs[field+i] + "  ";
					fields_value = fields_value + fieldValue;
					}
				}
			}
			//低亮处理
			var p_main="<p class='content_main'>";		
			var fvalue=fields_value.split(/\s+/);
			for(var j=0;j<fvalue.length;j++){
				if(fvalue[j]!=""){
					var f_value=fvalue[j].split("=");
					var in_key=f_value[0];
					var in_value=decodeURIComponent(f_value[1]).replace(/\+/g,' ').trim();
					
					if(j == 0){
						p_main=p_main+"<span class='tab_events_fields'>"+in_key+" =</span>&nbsp;<a class='tab_events_value' href='javascript:void(0)'>"+in_value+"</a>";
					}else{
						if(in_value==""){
							p_main=p_main+"<img class='tab_events_img' src='/resource/images/tab_events_split.jpg' style='margin-top: 0px'><span class='tab_events_fields'>"+in_key+" =</span>&nbsp;";
						}else{
							p_main=p_main+"<img class='tab_events_img' src='/resource/images/tab_events_split.jpg' style='margin-top: 0px'><span class='tab_events_fields'>"+in_key+" =</span>&nbsp;<a class='tab_events_value' href='javascript:void(0)'>"+in_value+"</a>";
						}
					}
				}
			}
			p_main=p_main+"</p>";
			var list_pre="list";
	        var original_pre="original";
			var p_content = "<p class='tab_events_first tab_events_first_"+i+"'></p>";
			var content = "<div class='content'>" +  p_content + p_main + "</div>" + expenddiv(list_pre,i);
			var content_original = "<div class='content'>" +  p_content + "</div>" + expenddiv(original_pre,i);
//			var content = "<div class='content'>" +  p_content + p_main + "</div>";
//			var content_original = "<div class='content'>" +  p_content + "</div>";
			var time = rs["TIME" + i];
			$('.tr_list_i').css("display",'');
			$('.tr_original_i').css("display",'');
			var $tr=$("<tr class='tr_list_i tr_i'>"+  
					     "<td class='list_expend' id='list_expend_"+i+"'><a href='javascript:void(0)' class='icon_close'></a></td>"+  
						 "<td>"+time+"</td>"+  
						 "<td>"+content+"</td>"+  
						"</tr>");
			$("#usertable").append($tr);
			var $tr_original=$("<tr class='tr_original_i tr_i'>"+  
						        "<td class='original_expend' id='original_expend_"+i+"'><a href='javascript:void(0)' class='icon_close'></a></td>"+  
						        "<td>"+content_original+"</td>"+  
						      "</tr>");
			$('#usertable').append($tr_original);
			expendData(rs,i);
			var content= rs["CONTENT" + i];
			var hasMore =rs["MORE_CONTENT"+i];
			if (hasMore !="Y"){
				processHighLight(i,content,"N");
			}else{
			//	processHighLight(i,content.substr(0,500).replace(/[\u0000]+/g,''),"Y");
				processHighLight(i,content,"Y");
				$('.tab_events_first_'+i).append("...<a href='javascript:void(0)'><img class='tab_event_more' id ='tab_event_more_"+i+"' src='/resource/images/icon-more.png'> </a>" );
			}
		}
		unbindClick();
		//追加事件
		initEvents();
		//绑定事件，点击后直接搜索
		$(".tab_events_value").click(function(){
			var name = $(this).prev().html();
			name = name.substring(0,name.indexOf(" "));
			searchClick._click(name,$(this).text());
		});
		$(".tab_event_more").unbind("click");
		$(".tab_event_more").click(function(){
			findDimensions();
			$("#table_more_div").height(winHeight*.6);
			$("#textView").siblings().height(winHeight*.6);
			var id =$(this).attr("id");
			var i = parseInt(id.split('_')[3]);
			full_Content="";
			_queryCurrentCollum($con_abs,$bk["id"+i].substring(0,$bk["id"+i].length-1),$search_index);
		});
		$(".more_close").unbind("click").click(function(){
			easyDialog.close();
			$(".more_normal").css("display","none");
			$(".more_max").css("display","block");
			$("#more_dialog").width(700);
			$("#table_more_div").height(500);
			$("#textView").siblings().height(500);
		});
		$(".more_normal").unbind("click").click(function(){
			easyDialog.close();
			findDimensions();
			$(".more_normal").css("display","none");
			$(".more_max").css("display","block");
			$("#more_dialog").width(700);
			$("#table_more_div").height(winHeight*.6);
			$("#textView").siblings().height(winHeight*.6);
			easyDialog.open({
				container : 'more_dialog'
				});		
		});
		$(".more_max").unbind("click").click(function(){
			easyDialog.close();
			findDimensions();
			$(".more_max").css("display","none");
			$(".more_normal").css("display","block");
			$("#more_dialog").width(winWidth);
			$("#table_more_div").height(winHeight-150);
			$("#textView").siblings().height(winHeight-110);
			easyDialog.open({
				container : 'more_dialog'
				});
		});
		$(".btn_more_pre").unbind("click").click(function(){
			pageDeliver.pre();
		});
		$(".btn_more_next").unbind("click").click(function(){
			pageDeliver.next();
			});
		if(tabletype=="table_type_list"){
			$('.tr_original_i').css("display","none");
		}else{
		    $('.tr_list_i').css("display","none");
			}
		closeopenEvent(num);
		tipsId(rs);
}

function processHighLight(i,content,hasMore){
	var contents=content.split("<span class=\"highFont\">");
	var countNum=0;
	for(var k=0;k<contents.length;k++){
		if(k==0){
			$('.tab_events_first_'+i).text(contents[k]);
			countNum+=contents[k].length;
		}else{
			var endSpan=contents[k].split("</span>");
			for(var $k=0;$k<endSpan.length;$k++){
				if($k==0){
					$('.tab_events_first_'+i).append("<span class='highFont highFont_"+i+"_"+k+"_"+$k+"'></span>");
					$('.tab_events_first_'+i + ' .highFont_'+i+'_'+k+'_'+$k).text(endSpan[$k]);
				}else{
					$('.tab_events_first_'+i).append("<span class='noHighFont_"+i+"_"+k+"_"+$k+"'></span>");
					$('.tab_events_first_'+i + ' .noHighFont_'+i+'_'+k+'_'+$k).text(endSpan[$k]);
				}
				countNum+=endSpan[$k].length;
				if(hasMore=="Y"&&countNum>=500){
					break;
				}
			}
		}
		if(hasMore=="Y"&&countNum>=500){
			break;
		}
	}
}


var winWidth=0;
var winHeight=0;
function findDimensions() //函数：获取尺寸 
{ 
	//获取窗口宽度 
	if (window.innerWidth) 
		winWidth = window.innerWidth; 
	else if ((document.body) && (document.body.clientWidth)) 
		winWidth = document.body.clientWidth; 
	if (window.innerHeight) 
		winHeight = window.innerHeight; 
	else if ((document.body) && (document.body.clientHeight)) 
		winHeight = document.body.clientHeight; 
	//通过深入Document内部对body进行检测，获取窗口大小 
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) 
	{ 
		winHeight = document.documentElement.clientHeight; 
		winWidth = document.documentElement.clientWidth; 
	} 
}
var tab_click=function(){
	var tab = $(this).attr("id").split("_")[1];
	$("#"+tab+"View").css("display","block").siblings().css("display","none");
	$("#tab_"+tab).addClass("active").siblings().removeClass("active");
};
var PageDeliver = function(){
	var pageNum = 0;
	var content;
	var sum = 2000;
	this.init = function(a){
		content=a;
		pageNum=0;
		$("#pageSum").text(Math.ceil(content.length/sum));

		// 初始化
		$("#textView").css("display","block").siblings().css("display","none");
		$("#tab_text").addClass("active curser_p").unbind("click").bind("click",tab_click).siblings().removeClass("active").removeClass("cursor_p").removeClass("timeline-btn").unbind("click");
		var localName ="";
		var xmlDom=null;
		try{
			xmlDom=createXMLDoc(content);
			
			localName =xmlDom.documentElement.localName;
			if(!localName){
				localName =xmlDom.documentElement.tagName;
			}
			
		}catch(e){localName="parsererror";}
		if(localName=="parsererror"||localName ==""||localName=="undefined"||
				(navigator.userAgent.indexOf("Chrome")>0&&xmlDom.childNodes.length>0&&
						(xmlDom.childNodes[0].localName)=="html"&&xmlDom.childNodes[0].childNodes.length>0&&
						xmlDom.childNodes[0].childNodes[0].localName=="body"&&xmlDom.childNodes[0].childNodes[0].childNodes.length>0&&
						xmlDom.childNodes[0].childNodes[0].childNodes[0].localName=="parsererror")){
			$("#htmlView").text("");
		}else{
			$("#xmlView pre").text(formatXml(content));
			$("#tab_xml").addClass("cursor_p timeline-btn").unbind("click").bind("click",tab_click);
			if(localName.toLocaleLowerCase()=="html"){
				$("#htmlView").text(content);
				$("#tab_html").addClass("cursor_p timeline-btn").unbind("click").bind("click",tab_click);
			}else{
				$("#htmlView").text("");
//				$("#tab_html").css("display","none");
			}
		} 
		if(isJson(content)){
			$("#jsonView pre").text(formatJson(content));
			$("#tab_json").addClass("cursor_p timeline-btn").unbind("click").bind("click",tab_click);
		}
		this.show();
		easyDialog.open({
			container : 'more_dialog'
			});
	};
	this.pre = function(){
		pageNum--;
		this.show();
	};
	this.next = function(){
		pageNum++;
		this.show();
	};
	this.show =function(){
		$("#table_more_content").text(content.substr(pageNum*sum,sum));
		if(pageNum==0){
			$(".btn_more_pre").css({color:"#999",cursor:"default"}).unbind("click");
		}else{
			$(".btn_more_pre").css({"color":"#333",cursor:"pointer"}).unbind("click").click(function(){
			pageDeliver.pre();
			});
		}
		if(pageNum>=content.length/sum-1){
			$(".btn_more_next").css({color:"#999",cursor:"default"}).unbind("click");
		}else{
			$(".btn_more_next").css({"color":"#333",cursor:"pointer"}).unbind("click").click(function(){
			pageDeliver.next();
			});
		}
		$("#pageNo").text(pageNum+1);
	};
	this.close =function(){
		easyDialog.close();
	};
};
function closeopenEvent(num){
	$(".original_expend,.list_expend").click(function(event){
		var id=$(this).attr('id');
		var i=id.split("_")[2];
		var pre=id.split("_")[0];
		$('#tab_'+pre+'_expend_'+i).toggle();
		event.stopPropagation();
		$(this).scrollTop(this.offsetTop);
		for(var j=0;j<num;j++){
			if(j!=i){
				$('#tab_'+pre+'_expend_'+j).hide();
				$('#'+pre+'_expend_'+j+' a').removeClass();
				$('#'+pre+'_expend_'+j+' a').addClass("icon_close");
			}
		}
		if ($('#tab_'+pre+'_expend_'+i).css("display")=="none") {
			$('#'+id+' a').removeClass();
			$('#'+id+' a').addClass("icon_close");
			} else {
				$('#'+id+' a').removeClass();
				$('#'+id+' a').addClass("icon_open");
				}
		});
};
var timeout_id=null;
function tipsId(rs){
		$('.list_expend,#popdown_id').unbind("mouseover");
		$('.list_expend,#popdown_id').unbind("mouseout");
		
		$('.list_expend').mouseover(function(){
			if(timeout_id!=null){
				clearTimeout(timeout_id);
			}
			var $obj = $(this);
			var id =$obj.attr("id");
			var i = parseInt(id.split('_')[2]);
			$(".popdown_id_content").text("id : "+$bk["id"+i].substring(0,$bk["id"+i].length-1));
			$("#popdown_id").css({
					"top":$obj.offset().top+35+"px",
					"left":$obj.offset().left-20+"px"
			});
			$("#popdown_id").show();
		});
			$('#popdown_id').mouseover(function(){
				clearTimeout(timeout_id);
			});
		$('.list_expend,#popdown_id').mouseout(function(){
			timeout_id=setTimeout(function(){
				$("#popdown_id").hide();
			},50);
		});
}

function expenddiv(pre,i){
	var div="<div class='tab_event_expend tab_hide' id='tab_"+pre+"_expend_"+i+"'>"+
	 "<table width='100%' cellspacing='0' border='0' class='tab_expend expend_table_both_"+i+"' "+"id='table_"+pre+"_expend_"+i+"'>"+
	   "<tr>"+
          "<td class='tab_evnets_expend_type'>类型</td>"+
//          "<td class='col-visibility'><img src='/resource/images/icon-check.jpg'/></td>"+
          "<td class='col-visibility'>&nbsp;&nbsp;</td>"+
          "<td>字段</td>"+
          "<td class='col-visibility'>&nbsp;&nbsp;</td>"+
          "<td>值</td>"+
      "</tr>"+
  "</table>"+
 "</div>";
	return div;
}

function expendData(rs,this_i){
	var i=-1;
	var j=-1;
	var this_value ="";
	var $s_fields_arr=$s_fields.split(",")
	var tr="";
	$.each($s_fields_arr, function(key, value){
		if(value!=""&&value!="collectTime"){
			i++;
			var $tr;
			if(i==0){
				$tr="<tr class='expend_tr'>"+
		          "<td>选定的</td>";
			}else{
				$tr="<tr class='expend_tr'><td>&nbsp;</td>";
			}
			this_value=decodeURIComponent(rs[value+this_i]).replace(/\+/g,' ').trim();
			if(this_value==undefined||this_value=="undefined"){
				this_value="";
				i--;
				return;
			}else{
				decodeURIComponent(this_value.replace(/\+/g,' ')).trim();
			}
			tr+=$tr
			tr+="<td id='td_s_"+value+"' class='icon_check_choose'>&nbsp;&nbsp;</td>"+
	          "<td class='tab_evnets_expend_fields'>"+value+"</td><td>&nbsp;&nbsp;</td>"+
	          "<td><a href='javascript:void(0)' class='field_expend_content'>"+this_value+"</a></td>"+
	       "</tr>";
			i=i==0&&value=="collectTime"?--i:i;
		}
   });
	$('.expend_table_both_'+this_i).append(tr);
	var $i_fields_arr= $i_fields.split(",")
	var tr_d=""
	$.each($i_fields_arr, function(key, value){
		if(value!=""&&value!="collectTime"){
			j++;
			var $tr_d;
			if(j==0){
				$tr_d="<tr class='expend_tr'>"+
		          "<td>事件</td>";
			}else{
				$tr_d="<tr class='expend_tr'><td>&nbsp;</td>";
			}
			this_value=rs[value+this_i];
			if(this_value==undefined||this_value=="undefined"){
				this_value="";
				j--;
				return;
			}else{
				this_value=decodeURIComponent(rs[value+this_i].replace(/\+/g,' ')).trim();
			}
			tr_d+=$tr_d
	//		tr_d=tr_d+"<td id='td_i_"+value+"' class='icon_check_choose'><img src='/resource/images/icon-check-uncheck.jpg'/></td>"+
			tr_d+="<td id='td_i_"+value+"' class='icon_check_choose'>&nbsp;&nbsp;</td>"+
	          "<td class='tab_evnets_expend_fields'>"+value+"</td><td>&nbsp;&nbsp;</td>"+
	          "<td><a href='javascript:void(0)' class='field_expend_content'>"+this_value+"</a></td>"+
	       "</tr>";
			j=j==0&&value=="collectTime"?--j:j;
		}
   });
	$('.expend_table_both_'+this_i).append(tr_d);
	this_value=decodeURIComponent(rs["collectTime"+this_i]).replace(/\+/g,' ').trim();
	if(this_value==undefined||this_value=="undefined"){
		this_value="";
	}
	var recodetime_tr="<tr class='expend_tr'>"+
                        "<td>时间</td>"+
                        "<td>&nbsp;&nbsp;</td>"+
                        "<td  class='tab_evnets_expend_fields'>collectTime</td><td>&nbsp;&nbsp;</td>"+
                        "<td><a href='javascript:void(0)'  class='field_expend_content'>"+this_value+"</a></td>"+
                      "</tr>";
	$('.expend_table_both_'+this_i).append(recodetime_tr);
	//先去除绑定事件
}

function isTime(temp){
	var date1=/^\d{4}[-|\/]\d{2}[-|\/]\d{2}\s+\d{1,2}:\d{2}:\d{2}(\.\d{1,6}){0,1}$/;
	var date2=/^\d{4}[-|\/]\d{2}[-|\/]\d{2}T\d{1,2}:\d{2}:\d{2}(\.\d{1,6}){0,1}Z$/;
	return (date1.test(temp)||date2.test(temp));
}
function _queryCurrentCollum(con,id,index) {
	var dataid;
//	if(con == ""){
//		con = "*";
//		$("#queryCon").val("*");
//	}
//	if(currDate==""){
//		dataid = {"handler":"SynHandler", "queryCondition":con+" AND id:"+$bk["id"+i].substring(0,$bk["id"+i].length-1), "startTime":"0","endTime":"0","currentPage":""+1, "batchNum":""+10, "type":"EVENT","index":$search_index,"isFullContent":"Y"};
//	}else{
//		var rTime="collectTime:["+currDate+" 00:00:00.0 TO "+currEndDate+" 24:00:00.0]";
//		if(con.indexOf('|')>=0){
//			var cons=con.split("|");
//			con=cons[0]+" AND "+rTime+" | ";
//			for(var t_i=1;t_i<cons.length;t_i++){
//				con+=cons[t_i];
//			}
//		}else{
//			con=con+" AND "+rTime;
//		}
//		$startTime=getCollectionTime(currDate+" 00:00:00");
//    	$endTime=getCollectionTime(currEndDate+" 23:59:59");
	dataid = {"handler":"SynHandler", "queryCondition":con+" AND id:"+id, "startTime":"0","endTime":"0","currentPage":""+1, "batchNum":""+10, "type":"EVENT","index":index,"isFullContent":"Y"};//	}
//	$('#search_main_time').text("");
	ajaxPost("/felix", dataid, function(rs) {
			if(rs["result"] == "OK"){
				if(rs["SIZE"]>0){
					full_Content =rs["CONTENT"+0]=decodeURIComponent(rs["CONTENT"+0]).replace(/[\u0000]+/g, '').replace(/\+/g,' ');
				}
				$("#table_more_head").text(decodeURIComponent(rs["TIME"+0]).replace("+", " "));
				pageDeliver =new PageDeliver();
				pageDeliver.init(full_Content);
			}
		}, function() {
			alert("查询超时");
		});
		function getNowDate() {
		var myDate = new Date();
		return myDate.toLocaleString();
	}
}
function createXMLDoc(str){
	var xmlDoc;  
	if (window.ActiveXObject){ // IE     
	    var activeXNameList=new Array("MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","Microsoft.XMLDOM","MSXML.DOMDocument");  
	   for(var h=0;h<activeXNameList.length;h++)  
	   {  
	      try{  
	           xmlDoc=new ActiveXObject(activeXNameList[h]);  
	       }catch(e){  
	        continue;  
	       }  
	    if(xmlDoc) break;     
	  }  
	}else if(document.implementation && document.implementation.createDocument){ //非 IE  
	    xmlDoc=document.implementation.createDocument("","",null);    
	}else{  
	    alert('can not create XML DOM object, update your browser please...');  
	}  
	xmlDoc.async=false;  //同步  
	try{
		xmlDoc.loadXML(str); //加载XML  
	}catch(e){
		try{
		xmlDoc= new DOMParser().parseFromString(str,"text/xml");
		}catch(e){
			return undefined;
		}
	}
	return xmlDoc;
}
String.prototype.removeLineEnd = function() {
	return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2');
};
function formatXml(text) {
	//去掉多余的空格
	text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function($0, name, props) {
		return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
	}).replace(/>\s*?</g, ">\n<");

	//把注释编码
	text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g,
			function($0, text) {
				var ret = '<!--' + escape(text) + '-->';
				//alert(ret);
				return ret;
			}).replace(/\r/g, '\n');

	//调整格式
	var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
	var nodeStack = [];
	var output = text.replace(rgx, function($0, all, name, isBegin,isCloseFull1, isCloseFull2, isFull1, isFull2) {
		var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/')|| (isFull1 == '/') || (isFull2 == '/');
		//alert([all,isClosed].join('='));
		var prefix = '';
		if (isBegin == '!') {
			prefix = getPrefix(nodeStack.length);
		} else {
			if (isBegin != '/') {
				prefix = getPrefix(nodeStack.length);
				if (!isClosed) {
					nodeStack.push(name);
				}
			} else {
//				nodeStack.pop();
				for(var i=nodeStack.length-1;i>=0;i--){
					if (name.substring(1) ==nodeStack[i]){
						prefix = getPrefix(i);
						for(var j=nodeStack.length-1;j>=i;j--){
							nodeStack.pop();
						}
						break;
					}
				}
			}

		}
		var ret = '\n' + prefix + all;
		return ret;
	});

	var prefixSpace = -1;
	var outputText = output.substring(1);
	//alert(outputText);

	//把注释还原并解码，调格式
	outputText = outputText.replace(/\n/g, '\r').replace(
			/(\s*)<!--(.+?)-->/g,
			function($0, prefix, text) {
				//alert(['[',prefix,']=',prefix.length].join(''));
				if (prefix.charAt(0) == '\r')
					prefix = prefix.substring(1);
				text = unescape(text).replace(/\r/g, '\n');
				var ret = '\n' + prefix + '<!--'
						+ text.replace(/^\s*/mg, prefix) + '-->';
				//alert(ret);
				return ret;
			});

	return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');

};

function getPrefix(prefixIndex) {
	var span = '    ';
	var output = [];
	for ( var i = 0; i < prefixIndex; ++i) {
		output.push(span);
	}

	return output.join('');
};
function isJson(txt){
	 if(/^\s*$/.test(txt)) return false;
	 try{eval("("+txt+")");}catch(e){return false;}
	 return true;
}
function formatJson(txt,compress){
   var indentChar = '    ';
    var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;

    var notify=function(name,value,isLast,indent,formObj){
        nodeCount++;
        for (var i=0,tab='';i<indent;i++ )tab+=indentChar;
        tab=compress?'':tab;
        maxDepth=++indent;
        if(value&&value.constructor==Array){
            draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);
            for (var i=0;i<value.length;i++)
                notify(i,value[i],i==value.length-1,indent,false);
            draw.push(tab+']'+(isLast?line:(','+line)));
        }else   if(value&&typeof value=='object'){
                draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);
                var len=0,i=0;
                for(var key in value)len++;
                for(var key in value)notify(key,value[key],++i==len,indent,true);
                draw.push(tab+'}'+(isLast?line:(','+line)));
            }else{
                    if(typeof value=='string')value='"'+value+'"';
                    draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);
            };
    };
    var isLast=true,indent=0;
    notify('',eval("("+txt+")"),isLast,indent,false);
    return draw.join('');
}