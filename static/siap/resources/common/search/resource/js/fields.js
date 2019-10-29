var $fields = new Array();
var $cookieName = "SEARCH INDEX:";
var $i_fields = null;
var $s_fields = null;
var $t_fields = null;
var $wordsCookie = "SEARCH WORD";

var Field = function (){
	this._displayFields = function (rs){
		//rawMsg一定显示
		$selected_fields.push("rawMsg");
		var $cookieValue = $cookie._getCookie($cookieName+$search_index+" "+$("#queryCon").val());
		//得到cookie初始化可选和有趣字段
		if($cookieValue != ""){
			$s_fields = $cookieValue.split(";")[0];
			$i_fields = $cookieValue.split(";")[1];
		}else{
			//去掉id和_version_
			if(rs["SELECTED_FIELDS"] != undefined){
				$s_fields = rs["SELECTED_FIELDS"].replace("rawMsg,","");
			}
		}
		var $i_fields_rs="";
		if(rs["INTRERESTED_FIELDS"] != undefined){
			$i_fields_rs = rs["INTRERESTED_FIELDS"].replace("id,","").replace("_version_,","").replace("name,","");
			$i_fields_rs = $i_fields_rs.substring(0,$i_fields_rs.length-1);
		}
		$selected_fields = $s_fields.split(",");
		var $intrerest_fields_rs = $i_fields_rs.split(",");
		var i_fields_arraytmp = new Array();
		var i_fields_array = new Array();
		if($i_fields!=null&&$i_fields.length>0){
			i_fields_array=$i_fields.split(",");
			i_fields_arraytmp = $i_fields.split(",");
		}

		
		L1:for(var i=0;i<$intrerest_fields_rs.length;i++){
			for(var j=0 ;j<$selected_fields.length;j++){
				if($selected_fields[j]==$intrerest_fields_rs[i]){
					continue L1;
				}
			}
			for(var j=0 ;j<i_fields_arraytmp.length;j++){
				if(i_fields_arraytmp[j]==$intrerest_fields_rs[i]){
					continue L1;
				}
			}

			i_fields_array.push($intrerest_fields_rs[i]);
			
		}
		$i_fields = i_fields_array.join(",");
		//显示
		var div = "<div class='tabList_bor_l_n_fields'>" + 
		getBlock("<p>选定字段</p>", $s_fields.split(","),"main_feilds", "_s") +
		getBlock("<p>感兴趣字段</p>",$i_fields.split(","),"main_feilds", "_i") +
		"</div>";
		$("#tabList_bor_l_n").html(div);
		
		
		
		//如果存在数据就不需要获得，如果不存在则向服务器请求数据
//		if($fields.length == 0){
//		//	$fields = new Array();
//			//得到所有数据
//			this._getData(this._initEvents);
//		}else {
//			this._getTotalNum();
//		}
		//先去除绑定事件
		unbindClick();
		//追加事件
		this._initEvents();
		addCookie();
	};
	this._initFields = function (){
		$("#tabList_bor_l_n").html("<p>"+$.i18n.prop('query_public_bor_l_n')+"</p>");
		$("#tabList_bor_l_n").attr("rowspan", 3);
	};
	this._initEvents = function (){
		//初始化事件
		initEvents();
	};
	this._getData = function (initEvent){
		$t_fields = $s_fields+","+$i_fields;		
		var $ss = $t_fields.split(",");
		$.each($ss,function(i,n){
				getData(n);
		});
	};
	this._getTotalNum = function(){
		$.each($fields,function(i,n){
		        i++;
				if(n.totalNum >= 100){
					$("#tabList_bor_l_n #s_"+n.name).html("100+");
				}else{
					$("#tabList_bor_l_n #s_"+n.name).html(n.totalNum);
				}
		});
	};
	this._removeFields = function(){
		if($fields.length > 0){
			$fields = new Array();
		}
	};
};

function getData(n){
//	var $con = $("#queryCon").val();
//	var index="";
//	var index_select=$('#select_index').text();
//	if(index_select!="索引库"){
//		index=index_select;
//	}
//	var $data={};
//	if($getDataTime.length==0&&$con_abs.replace(/(^\s*)|(\s*$)/g, "").length==0){
//		$data= {"handler":"SynHandler", "queryCondition":"*| fieldfacet "+n, "currentPage":""+1, "batchNum":""+10, "type":"TAB_TYPE_GROUP","index":$search_index};
//	}else{
		$data= {"handler":"SynHandler", "queryCondition":$con_abs+" "+"| fieldfacet "+n,"currentPage":""+1, "batchNum":""+10, "type":"TAB_TYPE_GROUP","index":$search_index};
//	}
	ajaxPost("/felix", $data, function(rs) {
			if(rs["result"] == "OK"){
			   var group = decodeURIComponent(rs["GROUP"].replace(/\+/g,' '));
			   getGroupData(group,n);			   
			} else {
				alert($.i18n.prop('query_queryfail'));
			}
		}, function() {
			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
		});
};

function initEvents (){
	$(document).click(function(e){documentClick(e,$(this));});
	$('.shared-fieldinfo').click(function(e){sharedClick(e);});
	$('.main_feilds li a').mouseenter(function(e){
		e.stopPropagation();
		var c_id = $(this).attr('id');		
		var c_field = c_id.substr(0,c_id.length-2);
		var isExist = false;
		$.each($fields,function(i,n){
			if(n.name == c_field){
				isExist = true;
			}
		});
		if(isExist == false){
			getData(c_field);
		}
		});
	$('.main_feilds li a').click(function(e){mainFieldsClick(e,$(this));$(this).scrollTop(this.offsetTop);});
	$("#btn_n").click(function(e){btnNoClick(e);});
	$("#btn_y").click(function(e){btnYesClick(e);});
	$('.close_field').click(function(e){closeClick(e);});
	$('.field_expend_content').click(function(){expendFieldClick($(this));});
//	$('.icon_check_choose').click(function(e){iconCheckClick(e,$(this));});
};
function unbindClick(){
	$('.main_feilds li a').unbind("mouseenter");
	$('.shared-fieldinfo').unbind("click");
	$('.main_feilds li a').unbind("click");
	$("#btn_n").unbind("click");
	$("#btn_y").unbind("click");
	$('.close_field').unbind("click");
	$('.field_expend_content').unbind("click");
//	$(".icon_check_choose").unbind("click");
};
function getBlock($title,$fields, $classname, $idprx){
	var block = $title;
	var close_ul = "</ul>";
    var open_ul = "<ul class='" + $classname + " "+$classname+$idprx+"'>";
	$.each($fields, function(key, value){
				var li =  "<li><a href='javascript:void(0)' class='a_field' id='" + value + $idprx +"'>" + value + "&nbsp;&nbsp;<span style='color:grey' id='s_"+value+"'></span></a></li>";
				open_ul = open_ul + li;		
	});
	return block + open_ul + close_ul;
};

function iconCheckClick(e,$curr){
	var id=$curr.attr('id');
	var $split=id.split("_");
	var length=$split.length;
	var choose_type=$split[1];
	var choose_which=$split[2];
	if(length>3){
		for(var k=3;k<id.split("_").length;k++){
			choose_which=choose_which+"_"+$split[k];
		}
	}
	var which_table_apper=$curr.parent().parent().parent().parent().attr('id');
	if(choose_type=="i"){
		//感兴趣字段添加到选定字段
		$("#" + choose_which+"_i").parent().remove();
		$("#" + choose_which+"_s").parent().remove();
		$(".main_feilds").eq(0).prepend(getNewLi(choose_which,"_s"));
		if($selected_fields.indexOf(choose_which) == -1){
			$selected_fields.push(choose_which);
		}
		//遍历选定字段，存cookie
		addCookie();
		initTable();
		displayTable($selected_fields, $bk,getTabletype());
		$('#'+which_table_apper).show();
		//先去除绑定事件
		unbindClick();
		//追加事件
		initEvents();
	}else{
		//选定字段添加到感兴趣字段
		$("#" + choose_which+"_s").parent().remove();
		$("#" + choose_which+"_i").parent().remove();
		$(".main_feilds").eq(1).prepend(getNewLi(choose_which,"_i"));
		var flag=true;
		$.each($selected_fields, function(key, val){
			if (choose_which == val) {
				flag=false;
				$selected_fields.splice(key, 1);
				}
			}); 
		if(flag){
			var num = parseInt($bk["SIZE"]);
			var bmain=new Array();
			for(var i=0;i<num;i++){
				var sbk=$bk["MAIN" + i].split(/\s+/);
				bmain[i]="";
				for(var j=0;j<sbk.length;j++){
					var ssbk=sbk[j].split("=");
					if(ssbk[0]!=choose_which){
						bmain[i]+=(j==sbk.length-1)?ssbk[0]+"="+ssbk[1]:ssbk[0]+"="+ssbk[1]+" ";
						}
					}
				$bk["MAIN"+i] = bmain[i];
				}
			}
		//遍历选定字段，存cookie
		addCookie();
		initTable();
		displayTable($selected_fields, $bk,getTabletype());
		$('#'+which_table_apper).show();
		//先去除绑定事件
		unbindClick();
		//追加事件
		initEvents();
	}
}

function expendFieldClick($curr){
	var fieldValue=$curr.text();
	var field=$curr.parent().prev().prev().text();
	searchClick._click(field,fieldValue);
}

//将字符串转换为数组
function getGroupData(group,n){		
	var $groups = new Array();
	group=transJsonSpeChar(group);
	var $temp = JSON.parse(group);
	var $field = new Object();
	$field.name = n;
	if($temp.length==0){
		document.getElementById("s_"+n).innerHTML="0";
	}else{
		for(var i=0;i<$temp.length;i++){
			//得到总数
			if($temp[i][n] == "@@##########@@"){
				$field.totalNum = $temp[i]["Count("+n+")"];
				//刷新字段后面的数字
				if(parseInt($field.totalNum)>=100){
					document.getElementById("s_"+n).innerHTML="100+";
				}else{
					document.getElementById("s_"+n).innerHTML=$field.totalNum;
				}
			}else{
				var $group = new Object();
			//	$group.name = decodeURIComponent($temp[i][n]).replace(/\+/g,' ');
				$group.name = $temp[i][n].toString();
				$group.count = $temp[i]["Count("+n+")"];
				$group.percent = $temp[i]["percent(%)"];
				$groups.push($group);
			};
	}
	}
	
	$field.groups = $groups;
	$fields.push($field);
	//先去除绑定事件
	unbindClick();
	//追加事件
	initEvents();
};

function transJsonSpeChar(group){
	group = group.replace(/\\n/g,'\\\\n').replace(/\\t/g, '\\\\t').replace(/\\r/g, '\\\\r');
	return group;
}

function documentClick(e,$curr){
		//弹出框消失
		$('.edit-bg').hide();
		$('#chart-type').removeClass('active');
		$('.edit-wrap7').hide();
		$('#editorR').removeClass('active');
		$('.save-wrap').hide();
		$('.shared-fieldinfo').hide();
		$('.main_feilds li').removeClass();
		$('.status-search-result').hide();
		$('.editor-table_type').hide();
		$('.editor-table_size').hide();
		$('.stats-table_size').hide();

};
function sharedClick(event){
		event.stopPropagation();
};
function mainFieldsClick(event,$curr){
		var offset = $curr.offset().top;
		event.stopPropagation();
		if ($curr.parent().hasClass('active')) {
			$curr.parent().removeClass();
			$('.shared-fieldinfo').hide();
		} else {
			var c_id = $curr.attr('id');		
			var c_field = c_id.substr(0,c_id.length-2);
			getData(c_field);
			var c_v = c_id.substr(c_id.length-2, c_id.length);
			if(c_v=="_s"){
				$("#btn_n").removeClass('active');
				$("#btn_y").addClass('active');
				$("#btn_y").addClass('noAllowedClick');
			}else{
				$("#btn_y").removeClass('active');
				$("#btn_y").removeClass('noAllowedClick');
				$("#btn_n").addClass('active');
			}
			$(".field-info-header").text(c_field);
			
			$('.main_feilds li').removeClass();
			$curr.parent().addClass('active');
			$('.shared-fieldinfo').css({
				"top": offset - 55 + "px"
			});
			tipdiv(c_field);
			$('.shared-fieldinfo').show();
		};
};
function closeClick(e){
		$('.popdown-fieldinfo-dialog').hide();
		$('.main_feilds li').removeClass();
};
function btnNoClick(e){
		var c_field=$(".timerangepicker-dialog .field-info-header").text();
		var c_v=existId(c_field+"_i")==false?"_s":"_i";
		var c_id = c_field+c_v;
		if(c_v=="_s"){
			var flag=true;
			$.each($selected_fields, function(key, val){
				if (c_field == val) {
					flag=false;
					$selected_fields.splice(key, 1);
					}
				}); 
			if(flag){
				var num = parseInt($bk["SIZE"]);
				var bmain=new Array();
				for(var i=0;i<num;i++){
					var sbk=$bk["MAIN" + i].split(/\s+/);
					bmain[i]="";
					for(var j=0;j<sbk.length;j++){
						var ssbk=sbk[j].split("=");
						if(ssbk[0]!=c_field){
							bmain[i]+=(j==sbk.length-1)?ssbk[0]+"="+ssbk[1]:ssbk[0]+"="+ssbk[1]+" ";
							}
						}
					$bk["MAIN"+i] = bmain[i];
					}
				}
			
			var demoLi=document.getElementById(c_id).parentNode;
			demoLi.parentNode.removeChild(demoLi);
			
			if(existId(c_field+"_i")==false){
				$(".main_feilds").eq(1).prepend(getNewLi(c_field,"_i"));
				}
			//遍历选定字段，存cookie
			addCookie();
			initTable();
			displayTable($selected_fields, $bk,getTabletype());
			$('.popdown-fieldinfo-dialog').hide();
			$('.main_feilds li').removeClass();
			//先去除绑定事件
			unbindClick();
			//追加事件
			initEvents();
		};
};
function btnYesClick(e){
		var c_field=$(".timerangepicker-dialog .field-info-header").text();
		var c_v=existId(c_field+"_i")==false?"_s":"_i";
		var c_id = c_field+c_v;
		if(c_v=="_i"&&(!$('#btn_y').hasClass('noAllowedClick'))){
			//不存在就添加
			if($selected_fields.indexOf(c_field) == -1){
				$selected_fields.push(c_field);
			}
			
			var demoLi=document.getElementById(c_id).parentNode;
			demoLi.parentNode.removeChild(demoLi);

			if(existId(c_field+"_s")==false){
				$(".main_feilds").eq(0).prepend(getNewLi(c_field,"_s"));
			}
			//存cookie
			addCookie();
			initTable();
			displayTable($selected_fields, $bk,getTabletype());
			$('.popdown-fieldinfo-dialog').hide();
			$('.main_feilds li').removeClass();
			//先去除绑定事件
			unbindClick();
			//追加事件
			initEvents();
		};
};

function removeDemoElement(c_id){
	var demoLi=document.getElementById(c_id).parentNode;
	demoLi.parentNode.removeChild(demoLi);
}

function existId(id){
    var s=document.getElementById(id);
    if(s){
    	return true;
    }else{
    	return false;
    }
  }

function getTabletype(){
	var size_text=$('#usertable_list label').text();
	var tabletype;
	if(size_text=="列表"){
		tabletype="table_type_list";
	}else{
		tabletype="table_type_original";
	}
	
	return tabletype;
}
function getNewLi(c_field,$str){
	var li = "";
	var totalNum = null;
	$.each($fields,function(i,n){
		if(n.name == c_field){
			totalNum = n.totalNum;
		}
	});
	if(totalNum == null){
		return;
	}else if(totalNum >= 100){
		totalNum = "100+";
	}
	li = "<li><a href='javascript:void(0)' id='" + c_field +$str+ "'>" + c_field + "&nbsp;&nbsp;<span style='color:grey'>"+totalNum+"</span></a></li>";
	return li;
};
function addCookie(){
	$s_fields = "";
	$i_fields = "";
	$.each($('.main_feilds_s li a'),function(i,n){
		$s_fields = $s_fields + $(this).attr("id").substring(0,$(this).attr("id").length-2)+",";
	});
	$.each($('.main_feilds_i li a'),function(i,n){
		$i_fields = $i_fields + $(this).attr("id").substring(0,$(this).attr("id").length-2)+",";
	});
	$s_fields = $s_fields.substring(0,$s_fields.length-1);
	$i_fields = $i_fields.substring(0,$i_fields.length-1);
	if($cookie._getCookie($cookieName +$search_index+" "+ $("#queryCon").val()) != ""){
		$cookie._deleteCookie($cookieName +$search_index+" "+ $("#queryCon").val());
	}
	$cookie._addCookie($cookieName +$search_index+" "+ $("#queryCon").val(),$s_fields+";"+$i_fields,24*5);
	$cookie._addCookie($wordsCookie,$s_fields+","+$i_fields,24*5);
};
function tipdiv($fieldName){
	var $temp = null;
	$.each($fields,function(i,n){
		if(n.name == $fieldName){
			$temp = n;
		}
	});
	if($temp==null){
		return;
	}
	var $group = null;
	if($temp.groups.length==0){
		$(".righttanc p").text("0个值,0%的事件");
		$(".table-condensed").empty();
		return;
	}
	$group = $temp;
	
	
	var groupLength=$group.groups.length;
	if(groupLength>10){
		groupLength=10;
	}
	$(".righttanc .trtext").text(trtext);
	if($("tr").hasClass("tr-added")){
		$(".table-condensed .tr-added").remove();
	}
	var allpencent=0;
	var multipleNum=100000;
	for(var i=0;i<groupLength;i++){
		allpencent = allpencent + ($group.groups[i].percent*multipleNum);
	}
	allpencent=parseFloat(allpencent)/parseFloat(multipleNum);
	for(var i=0;i<groupLength;i++){
		var trtext=$temp.totalNum>10?"前10":$temp.totalNum;
		$(".righttanc p").text(trtext+"个值,"+(allpencent>100?100:allpencent)+"%的事件");
		var newtr="<tr class='tr-added'><td><a href='javascript:void(0)' class='field_content'>"+$group.groups[i].name.substring(0,50)+"</a><a style='display:none'>"+$group.groups[i].name+"</a></td><td>"+$group.groups[i].count
        +"</td><td>"+$group.groups[i].percent+"%</td><td><div class='graph-bar' id='graphbar_"+i+"'></div></td></tr>";
		$(".table-condensed").append(newtr);
		$("#graphbar_"+i).css("width",$group.groups[i].percent);
	}
	
	//绑定事件，点击后默认搜索
	$(".field_content").click(function(){
		searchClick._click($temp.name,$(this).next().text());
	});
};

//实例化Field
var $f = new Field();