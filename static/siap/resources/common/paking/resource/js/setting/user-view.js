var User = function (){
	this.id = "";
	this.name = "";
	this.password = "";
	this.confirmPassword = "";
	this.role = "";
	this.group="";
	this._init = function (){
		this.id = "";
		this.name = "";
		this.password = "";
		this.role = "";
		this.confirmPassword = "";
		this.group="";
	};
};
var $user = new User();
var dialog=getUrlVar("dialog");
if(dialog != undefined &&dialog != "undefined"){
	var index = dialog.indexOf("#");
	if (index > -1) {
		dialog = dialog.substr(0, index);
	}
}

//当前使用用户
var $currUser = new User();
var UserManager = function (){
	var $data;
	var $oTable;
	var $errorMsg = "";
	this._init = function (){
		this._initField();
		this._getData(this._initTable);
		this._initEvent();
	};
	this._initField = function (){
		i18n("user", '/resource/i18n/user/', 'map', function() {
			   $("#th_username,.s_username").text($.i18n.prop('user_username'));
			   $("#th_role,.s_permission,.s_role").text($.i18n.prop('user_role'));
			   $("#th_index").text($.i18n.prop('user_index'));
			   $("#th_group,.s_group").text($.i18n.prop('user_group'));
			   $("#th_operate").text($.i18n.prop('user_operate'));
			   $("#s_user_manager").text($.i18n.prop('user_manager'));
			   $("#a_create_user,#h_create,#btn_create").text($.i18n.prop('user_create_user'));
			   $(".s_password").text($.i18n.prop('user_password'));
			   $(".s_confirm_password").text($.i18n.prop('user_confirm_password'));
			   $(".s_defaultindex").text($.i18n.prop('user_index'));
			   $(".btn_normal").text($.i18n.prop('user_normal'));
			   $(".btn_root").text($.i18n.prop('user_root'));
			   $(".btn_cancel_bg").text($.i18n.prop('user_cancel'));
			   $("#btn_add").text($.i18n.prop('user_create'));
			   $("#h_del_user").text($.i18n.prop('user_delete_user'));
			   $("#btn_del_sure").text($.i18n.prop('user_delete'));
			   $("#h_msg").text($.i18n.prop('user_delete_msg'));
			   $("#h_modify").text($.i18n.prop('user_modify_user'));
			   $("#btn_modify").text($.i18n.prop('user_modify'));
			   $(".common_role").text($.i18n.prop('user_normal'));
			   $(".manager_role").text($.i18n.prop('user_group_manager'));
			   $(".root_role").text($.i18n.prop('user_root'));
		});
	};
	this._getData = function (initTable){
		var data = {"handler":"UserManagerHandler","action" :"select"};
		ajaxPost("/felix", data, function(rs) {
 			if(rs["result"] == "OK"){
 				$data = packagingdatatabledata(rs);
 				$.each($data,function(i,n){
 					if(n.username == $cookie._getCookie("USERNAME")){
 						$currUser.name = n.username;
 						$currUser.role = n.role;
 						$currUser.defaultindex=n.defaultindex;
 						$currUser.password=n.password;
 						$currUser.group=n.group;
 					}
 				});
 				initTable();
 				initDialog();
 			} else {
 				alert("error");
 			}
		});
	};
	this._initEvent = function (){
		$("#btn_create").click(function(){createUser();});
		$(".close,.btn_cancel_bg").click(function(){
			document.getElementById("in_m_defaultindex").options.length=0;
			easyDialog.close();
			});
		$("#btn_add").click(function(){addUser();});
		$("#btn_del_sure").click(function(){deleteUser();});
		$("#btn_modify").click(function(){modifyUser();});
		//搜索功能
		$("#in_filter").keyup(function(){
			oTable.fnFilter( this.value, 1 );
		});
		$('#in_m_group,#in_group').change(function(){
			var thisId=$(this).attr('id');
			var thisValue=$('#'+thisId+" option:selected").val();
			$('#in_m_defaultindex').empty();
			$('#in_defaultindex').empty();
			if(thisValue==""){
				$('.tr_group').removeClass("display_none");
				$('#in_m_group').val("");
				$('#in_group').val("");
			}else{
				$('.tr_group').removeClass("display_none");
				$('.tr_group').addClass("display_none");
				if(thisId=="in_m_group"){
					initIndex(thisValue,$user.defaultindex,$("#in_m_role option:selected").val());
				}else{
					initIndex(thisValue,null,$("#in_role option:selected").val());
				}
			}
		});
		$('#in_m_role,#in_role').change(function(){
			var thisId=$(this).attr('id');
			var thisValue=$('#'+thisId+" option:selected").val();
			$('#in_m_defaultindex').empty();
			$('#in_defaultindex').empty();
			var $thisGroup;
			if(thisId=="in_m_role"){
				$thisGroup=$("#in_m_group option:selected").val();
				if($thisGroup==""){
					$thisGroup=$('#in_m_group_name').val();
				}
				if($thisGroup!=""){
					initIndex($thisGroup,$user.defaultindex,thisValue);
				}
			}else{
				$thisGroup=$("#in_group option:selected").val();
				if($thisGroup==""){
					$thisGroup=$('#in_group_name').val();
				}
				if($thisGroup!=""){
					initIndex($thisGroup,null,thisValue);
				}
			}
		});
		$('#in_group_name,#in_m_group_name').keyup(function(){
			var thisId=$(this).attr('id');
			var thisValue=$('#'+thisId).val();
			$('#in_m_defaultindex').empty();
			$('#in_defaultindex').empty();
			if(thisValue!=""){
				if(thisId=="in_m_group_name"){
					initIndex(thisValue,$user.defaultindex,$("#in_m_role option:selected").val());
				}else{
					initIndex(thisValue,null,$("#in_role option:selected").val());
				}
			}
		});
	};
	this._initTable = function (){
		 //set table 
		 /*
	    * Initialse DataTables, with no sorting on the 'details' column
	    */
	   oTable = $('#table').dataTable( {
	    	"aaData" :$data,
	    	"aoColumnDefs": [{ "bSortable": false, "aTargets": [0]}],
	        "aaSorting": [[0, 'asc']],
	        "aLengthMenu": [
	           [5, 15, 20, -1],
	           [5, 15, 20, "All"] // change per page values here
	       ],
	       // set the initial value
	       "iDisplayLength": 10,
	       "bServerSide": false,
	       "aoColumns" : [{  
	           "mData" : "id"
	         }, {  
	           "mData" : "username"
	       }, {  
	           "mData" : "role"
	       }, {  
	           "mData" : "defaultindex"
		   },  {  
	           "mData" : "group"
		   }, {  
	           "mData" : null
	      }],
	       "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
	    	   $('td:eq(1)', nRow).html("<span id='username_"+aData.id+"'>"+aData.username+"</span>");
	    	   if(aData.role=="0"){
	    		   $('td:eq(2)', nRow).html("<span id='role_"+aData.id+"'>"+$.i18n.prop('user_normal')+"</span>"); 
	    	   }else if(aData.role=="1"){
	    		   $('td:eq(2)', nRow).html("<span id='role_"+aData.id+"'>"+$.i18n.prop('user_group_manager')+"</span>"); 
	    	   }else if(aData.role=="2"){
	    		   $('td:eq(2)', nRow).html("<span id='role_"+aData.id+"'>"+$.i18n.prop('user_root')+"</span>");
	    	   }
	    	   if($currUser.role != "2"){
	    	       if($currUser.name!=aData.username){
	    	    	   if($currUser.role=="1"&&$currUser.group==aData.group&&aData.role!="2"&&aData.role!="1"){
	    	    		   $('td:eq(5)', nRow).html("<a href='#' class='a_modify' id='a_modify_"+aData.id+"'>"+$.i18n.prop('user_modify')+"</a>&nbsp;&nbsp;<a href='#' class='a_delete' id='a_delete_"+aData.id+"'>"+$.i18n.prop('user_delete')+"</a>");
	    	    	   }else{
	    	    		   $('td:eq(5)', nRow).html(""); 
	    	    	   }
	    	       }else{
	    	    	   $('td:eq(5)', nRow).html("<a href='#' class='a_modify' id='a_modify_"+aData.id+"'>"+$.i18n.prop('user_modify')+"</a>");
	    	       }
	    	   }else{
	    		   if($currUser.name!=aData.username){
	    			   $('td:eq(5)', nRow).html("<a href='#' class='a_modify' id='a_modify_"+aData.id+"'>"+$.i18n.prop('user_modify')+"</a>&nbsp;&nbsp;<a href='#' class='a_delete' id='a_delete_"+aData.id+"'>"+$.i18n.prop('user_delete')+"</a>");
	    		   }else{
	    			   $('td:eq(5)', nRow).html("<a href='#' class='a_modify' id='a_modify_"+aData.id+"'>"+$.i18n.prop('user_modify')+"</a>");
	    		   }
	    	   }
	    	   
	           return nRow;  
	       },
	       "fnDrawCallback": function( oSettings ){
	    	 //重绘时重新绑定事件
	    	   initTableEvent();
	       }
	   });
	};
	function initTableEvent(){
		$(".a_modify,.a_delete").mouseup(function(){$(this).addClass("hover");});
		$(".a_delete").click(function(){
			$user.id = $(this).attr("id").split("_")[2];
			easyDialog.open({container : "del_dialog"});
		});
		$(".a_modify").click(function(){
			$user.id = $(this).attr("id").split("_")[2];
			$('#in_m_group_name').val('');
			var $thisPermission=$("#role_"+$user.id).text().trim()==$.i18n.prop('user_normal')?"0":($("#role_"+$user.id).text().trim()==$.i18n.prop('user_group_manager')?"1":"2");
			if($currUser.name == $("#username_"+$user.id).text().trim()){
				if($thisPermission!="2"){
					$('#in_m_group').attr("disabled",true);
					$('#in_m_group').removeClass("option_disabled");
					$('#in_m_group').addClass("option_disabled");
				}else{
					$('#in_m_group').attr("disabled",false);
					$('#in_m_group').removeClass("option_disabled");
				}
				$('#in_m_role').attr("disabled",true);
				$('#in_m_role').removeClass("option_disabled");
				$('#in_m_role').addClass("option_disabled");
			}else{
				if($currUser.role=="1"){
					$('#in_m_role').attr("disabled",true);
					$('#in_m_group').attr("disabled",true);
					$('#in_m_role').removeClass("option_disabled");
					$('#in_m_role').addClass("option_disabled");
					$('#in_m_group').removeClass("option_disabled");
					$('#in_m_group').addClass("option_disabled");
				}else{
					$('#in_m_group').attr("disabled",false);
					$('#in_m_role').attr("disabled",false);
					$('#in_m_group').removeClass("option_disabled");
					$('#in_m_role').removeClass("option_disabled");
				}
			}
			$('#in_m_role').get(0).selectedIndex=$thisPermission;
		    easyDialog.open({container : "d_modify_dialog"});
			$("#in_m_username").attr("disabled",true);
			$.each($data,function(i,n){
				if(n.id == $user.id){
					if(($currUser.role == "2"||($currUser.role == "1"&&$currUser.group==n.group))&&$currUser.name != $("#username_"+$user.id).text().trim()){
						$("#in_m_username").attr("disabled",false);
					}
					var selects = document.getElementById("in_m_group");
					for (var i = 0; i < selects.length; i++) {
						if (selects[i].value == n.gruop) {
							selects[i].selected = true;
							break;
						}
					}
					$("#in_m_username").val(n.username);
					$("#in_m_password,#in_m_confirm_password").val(n.password);
					$user.name = n.username;
					$user.role = n.role;
					$user.defaultindex = n.defaultindex;
					$user.password=n.password;
					$user.group=n.group;
					initGroup(n.group,n.defaultindex,n.role);
				}
			});
		});
	};
	
	function initDialog(){
		if(dialog != undefined &&dialog != "undefined"){
			easyDialog.open({container : "d_modify_dialog"});
			$("#in_m_username").attr("disabled",true);
			$("#in_m_username").val($currUser.name);
			$("#in_m_password,#in_m_confirm_password").val($currUser.password);
			if($currUser.role!=2){
				$('#in_m_group').attr("disabled",true);
				$('#in_m_group').removeClass("option_disabled");
				$('#in_m_group').addClass("option_disabled");
			}
			$('#in_m_role').get(0).selectedIndex = $currUser.role;
			$('#in_m_role').attr("disabled",true);
			$('#in_m_role').removeClass("option_disabled");
			$('#in_m_role').addClass("option_disabled");
			$user.id=$cookie._getCookie("ID");
			initGroup($currUser.group,$currUser.defaultindex,$currUser.role);
		}
	}
	
	function initIndex($group,defaultindex,$role){
		var data={"handler":"IndexHandler","action":"select","group":$group,"role":$role};
		ajaxPost("/felix", data, function(rs) {
			if(rs["result"] == "OK"){
				var index=rs.index;
				var flag=false;
				index.sort(function(a,b){
					return a.localeCompare(b);
				});
				$('#in_m_defaultindex').empty();
				$('#in_defaultindex').empty();
				if(defaultindex==null){
					for(var i=0;i<index.length;i++){
						if(i==0){
							$("#in_defaultindex").append("<option value='"+index[i]+"' selected='selected'>"+index[i]+"</option>");
							$("#in_m_defaultindex").append("<option value='"+index[i]+"' selected='selected'>"+index[i]+"</option>");
						}else{
							$("#in_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
							$("#in_m_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
						}
					}
				}else if(defaultindex==""){
					for(var i=0;i<index.length;i++){
						if(i==0){
							$("#in_defaultindex").append("<option value='"+defaultindex+"' selected='selected'>"+defaultindex+"</option>");
							$("#in_m_defaultindex").append("<option value='"+defaultindex+"' selected='selected'>"+defaultindex+"</option>");
							$("#in_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
							$("#in_m_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
						}else{
							$("#in_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
							$("#in_m_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
						}
					}
				}else{
					for(var i=0;i<index.length;i++){
						if(index[i]==defaultindex){
							$("#in_m_defaultindex").append("<option value='"+index[i]+"' selected='selected'>"+index[i]+"</option>");
							$("#in_defaultindex").append("<option value='"+index[i]+"' selected='selected'>"+index[i]+"</option>");
						}else{
							$("#in_m_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
							$("#in_defaultindex").append("<option value='"+index[i]+"'>"+index[i]+"</option>");
						}
					}
				}
			}
		});
	}
	
	function initGroup($group,$index,$role){
		var data={"handler":"UserManagerHandler","action":"selectGroup"};
		ajaxPost("/felix", data, function(rs) {
			if(rs["result"] == "OK"){
				var selectedGroup="";
				var groups=rs['groups'];
				groups.sort(function(a,b){
					return a.usergroup.localeCompare(b.usergroup);
				});
				$('#in_m_group_name').val('');
				$('#in_group_name').val('');
				$('#in_m_group').empty();
				$('#in_group').empty();
				if($group!=""){
					for(var i=0;i<groups.length;i++){
						if(groups[i]["usergroup"]==$group){
							selectedGroup=$group;
							$('#in_m_group').append("<option value='"+groups[i]["usergroup"]+"' selected='selected'>"+groups[i]["usergroup"]+"</option>");
						}else{
							$('#in_m_group').append("<option value='"+groups[i]["usergroup"]+"'>"+groups[i]["usergroup"]+"</option>");
						}
					}
					$('#in_m_group').append("<option value=''>其它</option>");
					$('.tr_group').removeClass("display_none");
					$('.tr_group').addClass("display_none");
				}else{
					for(var i=0;i<groups.length;i++){
						if(i==0){
							selectedGroup=groups[i]["usergroup"];
							$('#in_group').append("<option value='"+groups[i]["usergroup"]+"' selected='selected'>"+groups[i]["usergroup"]+"</option>");
						}else{
							$('#in_group').append("<option value='"+groups[i]["usergroup"]+"'>"+groups[i]["usergroup"]+"</option>");
						}
					}
					$('#in_group').append("<option value=''>其它</option>");
					$('.tr_group').removeClass("display_none");
					$('.tr_group').addClass("display_none");
				}
				initIndex(selectedGroup,$index,$role);
			}else{
				alert("获取组失败");
			}
		});
	}
	
	function packagingdatatabledata(msgObj){    
	    var a = new Array();  
	    var tableName=['id','username','role','defaultindex','password','group'];  
	    var banddata = msgObj['user']; 
	    var name;
	    for(var key in banddata){  
	        var tempObj=new Object();  
	        tempObj.id=banddata[key].id;  
	        tempObj.username=decodeURI(banddata[key].userName).replace(/\+/g,' ');  
	        tempObj.password=decodeURI(banddata[key].password).replace(/\+/g,' '); 
	        tempObj.role=banddata[key].role;
	        tempObj.defaultindex=banddata[key].defaultIndex;
	        tempObj.group=banddata[key].group;
	        a.push(JSON.parse(JSON.stringify(tempObj,tableName)));  
	        }
	    return a;  
	};  
	function createUser(){
		if($currUser.role != "1"&&$currUser.role != "2"){
			alert($.i18n.prop('no_create_permission'));
			return;
		}
		easyDialog.open({
			container : "d_create_dialog"
		});
		$('#in_defaultindex').empty();
		$('#in_role').get(0).selectedIndex = 0;
		$("#in_username").val("");
		$('#in_group_name').val('');
		$("#in_password,#in_confirm_password").val("");
		$('.tr_group').removeClass("display_none");
		$('#in_m_group').val("");
		$('#in_group').val("");
		$('.tr_group').addClass("display_none");
		if($currUser.role=="1"){
			$('#in_role').attr("disabled",true);
			$('#in_role').removeClass("option_disabled");
			$('#in_role').addClass("option_disabled");
			$('#in_group').empty();
			$('#in_group').append("<option value='"+$currUser.group+"' selected='selected'>"+$currUser.group+"</option>");
			$('#in_group').attr("disabled",true);
			$('#in_group').removeClass("option_disabled");
			$('#in_group').addClass("option_disabled");
			initIndex($currUser.group,null,"0");
		}else{
			$('#in_group').get(0).selectedIndex = 0;
			initGroup("",null,"0");
		}
	};
	function addUser(){
		$user.name = $("#in_username").val();
		$user.password = $("#in_password").val();
		$user.confirmPassword = $("#in_confirm_password").val();
		var select = document.getElementById("in_defaultindex");
		$user.defaultindex="";
		if(select.selectedIndex>-1){
			$user.defaultindex=select.options[select.selectedIndex].value;
		}
		$user.role = 1;
		$('#in_group').attr("disabled",false);
		$('#in_role').attr("disabled",false);
		$user.group=$("#in_group option:selected").val();
		$user.role=$("#in_role option:selected").val();
		if($user.group==""){
			$user.group=$('#in_group_name').val();
		}
		$('#in_group').attr("disabled",true);
		$('#in_role').attr("disabled",true);
		if(!validateUser()){
			$user._init();
			alert($errorMsg);
			return;
		}else{
			var $sameFlag=false;
			$.each($data,function(i,n){
				if($user.name==n.username){
					$sameFlag=true;
					alert($.i18n.prop('create_username_exist'));
				}
			});
			if($sameFlag){
				return;
			}
			var data = {"handler":"UserManagerHandler","action" :"insert","username":$user.name,"password":$user.password,"defaultindex":$user.defaultindex,"role":$user.role,"group":$user.group};
			ajaxPost("/felix", data, function(rs) {
	 			if(rs["result"] == "OK"){ 					
	 				window.location.href="/setting/user_view.html";
	 			} else {
	 				alert("error");
	 			}
			});
		}
	};
	function modifyUser(){
		$user.name = $("#in_m_username").val();
		$user.password = $("#in_m_password").val();
		$user.confirmPassword = $("#in_m_confirm_password").val();
		var select = document.getElementById("in_m_defaultindex");
		$user.defaultindex="";
		if(select.selectedIndex>-1){
			$user.defaultindex=select.options[select.selectedIndex].value;
		}
		$('#in_m_group').attr("disabled",false);
		$('#in_m_role').attr("disabled",false);
		$user.group=$("#in_m_group option:selected").val();
		$user.role=$("#in_m_role option:selected").val();
		if($user.group==""){
			$user.group=$('#in_m_group_name').val();
		}
		$('#in_m_group').attr("disabled",true);
		$('#in_m_role').attr("disabled",true);
		if(!validateUser()){
			$user._init();
			alert($errorMsg);
			return;
		}
		var $sameFlag=false;
		$.each($data,function(i,n){
			if($user.name==n.username&&$user.id!=n.id){
				$sameFlag=true;
				alert($.i18n.prop('modify_username_exist'));
			}
		});
		if($sameFlag){
			return;
		}
		var data = {"handler":"UserManagerHandler","action" :"update","id":$user.id,"username":$user.name,"password":$user.password,"defaultindex":$user.defaultindex,"role":$user.role,"group":$user.group};
		ajaxPost("/felix", data, function(rs) {
 			if(rs["result"] == "OK"){
 				$cookie._addCookie("INDEX",$user.defaultindex,1);
 				window.location.href="/setting/user_view.html";
 			} else if(rs["result"] == "FAIL"){
 				alert($.i18n.prop('username_exist'));
 			} else{
 				alert("error");
 			}
		});
	};
	function deleteUser(){
		var data = {"handler":"UserManagerHandler","action" :"delete","id":$user.id};
		ajaxPost("/felix", data, function(rs) {
 			if(rs["result"] == "OK"){ 					
 				window.location.href="/setting/user_view.html";
 			} else {
 				alert("error");
 			}
		});
	};
	function validateUser(){
		if($user.name == ""){
			$errorMsg = $.i18n.prop('username_not_null');
			return false;
		}
		if($user.password == ""){
			$errorMsg = $.i18n.prop('password_not_null');
			return false;
		}
		if($user.password != $user.confirmPassword){
			$errorMsg = $.i18n.prop('password_not_same');
			return false;
		}
		if($user.group == ""){
			$errorMsg = $.i18n.prop('group_not_null');
			return false;
		}
		return true;
	};
};
$(function(){
	new UserManager()._init();
});