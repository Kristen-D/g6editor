var permission=0;
var data;
var owner="";
var oTable;
var share=new Array([3]);
var edit;
var search;
var id;
var del;
var edit_dash;
var edit_permission;
var did;
var copy;
var is_new=true;
var trans_html;
$(function(){
	
	App.init();
	
	//init data
    initData();
	
    initfield();
    
    $("#nav_wrap_dashboard").parent("li").addClass("current");
    
	i18n("dashboard", '/dashboard/resource/i18n/', 'map', function() {
		   $("#th_share").text($.i18n.prop('dash_share'));
		   $("#th_apply").text($.i18n.prop('dash_apply'));
	       $("#th_owner").text($.i18n.prop('dash_owner'));
		   $("#th_operator").text($.i18n.prop('dash_operate'));
		   $("#th_title").text($.i18n.prop('dash_title'));
		   $("#p_report").text($.i18n.prop('dash_report_description'));
		   $("#s_dashboard").text($.i18n.prop('dash_dashboard'));
		   $(".s_title").text($.i18n.prop('dash_title'));
		   $(".s_desc").text($.i18n.prop('dash_desc'));
		   $(".s_permission").text($.i18n.prop('dash_permission'));
		   $("#btn_special_use").text($.i18n.prop('dash_special_use'));
		   $("#btn_share_apply").text($.i18n.prop('dash_share_apply'));
		   $(".btn_cancel_bg").text($.i18n.prop('dash_cancel'));
		   $("#btn_add").text($.i18n.prop('dash_create_dashboard'));
		   $("#btn_create").text($.i18n.prop('dash_create_dashboard'));
		   $("#h_create").text($.i18n.prop('dash_create_dashboard'));
		   $("#s_id_msg").text($.i18n.prop('dash_id_msg'));
		   $("#h_msg").text($.i18n.prop('dash_del_msg'));
		   $("#btn_del_sure").text($.i18n.prop('dash_del'));
		   $("#btn_all").text($.i18n.prop('dash_all'));
		   $("#btn_all_use").text($.i18n.prop('dash_all'));
		   $("#btn_yours").text($.i18n.prop('dash_yours'));
		   $("#btn_app").text($.i18n.prop('dash_app'));
		   $("#h_edit_permission").text($.i18n.prop('dash_edit_permission'));
		   $("#btn_save").text($.i18n.prop('dash_save'));
		   $(".s_owner").text($.i18n.prop('dash_owner'));
		   $(".s_apply").text($.i18n.prop('dash_apply'));
		   $(".s_show").text($.i18n.prop('dash_show'));
		   $("#btn_edit_owner,#btn_html_owner").text($.i18n.prop('dash_owner'));
		   $("#btn_edit_apply,#btn_html_apply").text($.i18n.prop('dash_apply'));
		   $("#btn_edit_all,#btn_html_all").text($.i18n.prop('dash_all_apply'));
		   $("#btn_edit_permission_save").text($.i18n.prop('dash_save'));
		   $("#h_del_dashboard").text($.i18n.prop('dash_del_dashboard'));
		   $("#h_trans_html").text($.i18n.prop('dash_trans_html'));
		   $(".s_dashboard").text($.i18n.prop('dash_dashboard'));
		   $("#btn_new_html").text($.i18n.prop('dash_new_html'));
		   $("#btn_replace_curr").text($.i18n.prop('dash_replace_curr'));
		   $("#btn_trans_html").text($.i18n.prop('dash_trans_dashboard'));
	});
	
	$("#navigator_header").load($("#navigator_header").attr("data-view"), function(responseTxt,statusTxt,xhr){
		 if(statusTxt=="success") {
			 i18n("navigator_dashboard", '/dashboard/resource/i18n/', 'map', function() {
				   $('#nav_wrap_apply').text($.i18n.prop('dash_nav_wrap_apply'));
				   $('#nav_account_news').text($.i18n.prop('dash_nav_account_news'));
				   $('#nav_account_set').text($.i18n.prop('dash_nav_account_set'));
				   $('#nav_account_action').text($.i18n.prop('dash_nav_account_action'));
				   $('#nav_account_help').text($.i18n.prop('dash_nav_account_help'));
				   $('#nav_wrap_search').text($.i18n.prop('dash_nav_wrap_search'));
				   $('#nav_wrap_datawatchtable').text($.i18n.prop('dash_nav_wrap_datawatchtable'));
				   $('#nav_wrap_report').text($.i18n.prop('dash_nav_wrap_report'));
				   $('#nav_wrap_warn').text($.i18n.prop('dash_nav_wrap_warn'));
				   $('#nav_wrap_dashboard').text($.i18n.prop('dash_nav_wrap_dashboard'));
			});
		 }
	});
	
    /*
     * Insert a 'details' column to the table
     */
//    var nCloneTh = document.createElement( 'th' );
//    var nCloneTd = document.createElement( 'td' );
//    nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';
//     
//    $('#table thead tr').each( function () {
//        this.insertBefore( nCloneTh, this.childNodes[0] );
//    } );
     
//    $('#table tbody tr').each( function () {
//        this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
//    } );
//     
   
 //   jQuery('#sample_1_wrapper .dataTables_filter input').addClass("m-wrap small"); // modify table search input
 //   jQuery('#sample_1_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
  //  jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialzie select2 dropdown
     
    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
	
	$("#btn_create").click(function(){
		$("#btn_add").text($.i18n.prop('dash_create_dashboard'));
		//清空原来的数据
		$("#in_title").val("");
		$("#in_desc").val("");
		$("#in_id").val("");
		$("#btn_owner").addClass("active");
		$("#btn_owner").siblings().addClass("cother");
		easyDialog.open({
			container : 'd_dialog'
			});
		
	});
	
	$(".btn_s").click(function(){
		if($(this).attr("class").indexOf("active")<0){
			$(this).addClass("active");
			$(this).removeClass("cother");
			$(this).siblings(".active").addClass("cother").removeClass("active");
			}
	});
	
	$(".a_close,.btn_cancel_bg").click(function(){
		easyDialog.close();
	});
	
	//搜索功能
	$("#in_filter").keyup(function(){
		oTable.fnFilter( this.value, 1 );
	});
	
	$("#btn_special_use,#btn_edit_owner,#btn_html_owner").click(function(){
		$(this).addClass("active");
		$(this).removeClass("cother");
		$(this).siblings(".active").addClass("cother").removeClass("active");
		permission = 0;
	});
	
	$("#btn_share_apply,#btn_edit_apply,#btn_html_apply").click(function(){
		$(this).addClass("active");
		$(this).removeClass("cother");
		$(this).siblings(".active").addClass("cother").removeClass("active");
		permission = 1;
	});
	
	$("#btn_edit_all,#btn_all_use,#btn_html_use").click(function(){
		$(this).addClass("active");
		$(this).removeClass("cother");
		$(this).siblings(".active").addClass("cother").removeClass("active");
		permission = 2;
	});
	
	$("#btn_new_html").click(function(){
		is_new=true;
		$(this).addClass("active");
		$(this).removeClass("cother");
		$(this).siblings(".active").addClass("cother").removeClass("active");
		$(this).parents("tr").siblings("tr").show();
	});
	
	$("#btn_replace_curr").click(function(){
		is_new=false;
		$(this).addClass("active");
		$(this).removeClass("cother");
		$(this).siblings(".active").addClass("cother").removeClass("active");
		$(this).parents("tr").siblings("tr").hide();
	});
	
	$("#btn_trans_html").click(function(){
		var title=$("#in_html_title").val();
		var did=$("#in_html_id").val();
		var desc=$("#in_html_desc").val();
		//默认是XML
		var source_type="HTML";
		//to set
		var source="";
		var pattern = /^\w+$/i;
		//检查有效性
		if($.trim(did)==""){
			 $("#s_html_id_msg").text($.i18n.prop('dash_id_msg_empty'));
			 return;
		}else if(!did.match(pattern)){
			 $("#s_html_id_msg").text($.i18n.prop('dash_id_msg'));
			 return;
		}
		if($.trim(title)==""){
			title=did;
		}
		//to be done......
		var apply="search";
		var data;
		if(is_new){
			//insert
			data = {"handler":"DashboardTableHandler","action":"insert", "title":title, "did":did,"desc" : desc,"apply" : apply,"permission" : permission,"source_type":source_type,"source":source};
		}else{
			data = {"handler":"DashboardTableHandler","action":"updateType", "id":id,"source_type":source_type};
		}
		ajaxPost("/felix", data, function(rs) {
 			if(rs["result"] == "success"){
 				window.location.reload();
 			}
 		}, function() {
 			alert("error");
 		});
	});
	
	$("#btn_del_cancel").click(function(){
		easyDialog.close();
	});
	
	$("#btn_del_sure").click(function(){
		//delete by id
   	 data = {"handler":"DashboardTableHandler","action":"delete","id":id};
   		ajaxPost("/felix", data, function(rs) {
   				if(rs["result"] == "success"){
   						//刷新
   					window.location.reload();
   					}
   			}, function() {
   				alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
   			});
	});
	
	$("#btn_edit_permission_save").click(function(){
		var title=$("#in_edit_title").val();
		if($.trim(title)==""){
			title=did;
		}
		var desc=$("#in_edit_desc").val();
		//写入数据库
		updateData = {"handler":"DashboardTableHandler","action":"update", "title":title, "id":id,"desc" : desc,"permission" : permission};
		ajaxPost("/felix", updateData, function(rs) {
 			if(rs["result"] == "success"){
 				window.location.reload();
 			}
 		}, function() {
 			alert("error");
 		});
	});
	
	$("#btn_add").click(function(){
		var title=$("#in_title").val();
		var id=$("#in_id").val();
		var desc=$("#in_desc").val();
		//默认是XML
		var source_type="XML";
		//to set
		var source="";
		var pattern = /^\w+$/i;
		//检查有效性
		if($.trim(id)==""){
			 $("#s_id_msg").text($.i18n.prop('dash_id_msg_empty'));
			 return;
		}else if(!id.match(pattern)){
			 $("#s_id_msg").text($.i18n.prop('dash_id_msg'));
			 return;
		}
		if($.trim(title)==""){
			title=id;
		}
		//to be done......
		var apply="search";
		//写入数据库
		insertData = {"handler":"DashboardTableHandler","action":"insert", "title":title, "did":id,"desc" : desc,"apply" : apply,"permission" : permission,"source_type":source_type,"source":source};
		ajaxPost("/felix", insertData, function(rs) {
 			if(rs["result"] == "success"){
 				window.location.reload();
 			}
 		}, function() {
 			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
 		});
	});
});

function initfield(){
	i18n("dashboard", '/dashboard/resource/i18n/', 'map', function() {
		   $(".edit").text($.i18n.prop('dash_edit'));
		   $(".tb_search").text($.i18n.prop('dash_search'));
		   $(".tb_0").text($.i18n.prop('dash_0'));
		   $(".tb_1").text($.i18n.prop('dash_1'));
		   $(".tb_2").text($.i18n.prop('dash_2'));
//		   $(".delete").text($.i18n.prop('dash_del'));
//		   $(".edit_dashboard").text($.i18n.prop('dash_edit_dashboard'));
		   edit_dash=$.i18n.prop('dash_edit_dashboard');
		   del=$.i18n.prop('dash_del');
		   edit=$.i18n.prop('dash_edit')
		   search=$.i18n.prop('dash_search');
		   share[0]=$.i18n.prop('dash_0');
		   share[1]=$.i18n.prop('dash_1');
		   share[2]=$.i18n.prop('dash_2');
		   edit_permission=$.i18n.prop('dash_edit_permission');
		   copy=$.i18n.prop('dash_copy');
		   trans_html=$.i18n.prop('dash_trans_html');
	});
}

function initData(){
	data = {"handler":"DashboardTableHandler","action":"select"};
	ajaxPost("/felix", data, function(rs) {
			if(rs["result"] == "success"){
					data=packagingdatatabledata(rs);
					initfield();
					initDataTables();
					$("#nav_wrap_dashboard").parent("li").addClass("current");
				}
		}, function() {
			alert($.i18n.prop('aus_error'), $.i18n.prop('aus_methodfail'));
		});
}

function initDataTables(){
	 //set table 
	 /*
    * Initialse DataTables, with no sorting on the 'details' column
    */
   oTable = $('#table').dataTable( {
    	"aaData" :data,
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
           "mData" : null
         }, {  
           "mData" : "title"
       }, {  
           "mData" : "operate"
       }, {  
           "mData" : "owner"
       }, {  
           "mData" : "apply"
       }, {  
           "mData" : null
      }],
       "fnRowCallback" : function(nRow, aData, iDisplayIndex) {   
           $('td:eq(0)', nRow).html("<span class='row-details row-details-close' id='s_"+aData.id+"'></span>");  
           $('td:eq(1)', nRow).html("<a href='/dashboard/panel_view.html?dashboardid="+aData.id+"'>"+aData.title+"</a>");  
           $('td:eq(2)', nRow).html("<div style='position:relative;'><a href='#' class='edit'>"+edit+"</a><div class='popdown-dialog edit-wrap dashboard_edit hide'>"+
       					"<div class='arrow'></div><div class='edit-dialog draghandle_b'><ul>"+
                          "<li><a  class='edit_dashbord' href='/dashboard/panel.html?dashboardid="+aData.id+"'>"+edit_dash+"</a></li><li><a href='#' class='edit_permission' id='edit_permission_"+aData.id+"'>"+edit_permission+"</a></li>" +
                           //"<li><a href='#' class='a_trans_html' id='a_trans_html_"+aData.id+"'>"+trans_html+"</a></li></ul></div><div class='draghandle_b'><ul>"+"<li><a href='#' class='a_copy' id='a_copy_"+aData.id+"'>"+copy+"</a></li>"+
                           "</div><div class='draghandle_b'><ul>"+
                           "<li class='delete' id='del_"+aData.id+"'><a href='#'>"+del+"</a></li></ul></div></div></div>");
           $('td:eq(4)', nRow).html(aData.apply);
           $('td:eq(5)', nRow).html(share[aData.share]); ; 
          
           return nRow;  
       },
       "fnDrawCallback": function( oSettings ){
    	 //重绘时重新绑定事件
    	   initEvent();
       }
   });
   	 
   
   
   
}

/* Formating function for row details */
function fnFormatDetails ( oTable, nTr ,id)
{
	var apply="";
	var plan="";
	var unplan="";
	var permission="";
	var d_apply=nTr.children[4].innerHTML;
	var per="";
	var have="";
	i18n("dashboard", '/dashboard/resource/i18n/', 'map', function() {
	    apply=$.i18n.prop('dash_apply');
	    plan=$.i18n.prop('dash_plan');
	    permission=$.i18n.prop('dash_permission');
	    unplan=$.i18n.prop('dash_n_plan');
	    have=$.i18n.prop('dash_have',[owner]);
	 });
    var sOut = '<dl class="list-dotted">';
    sOut += '<dt class="dt_apply">'+apply+'</dt><dd>'+d_apply+'</dd>';
    sOut += '<dt class="dt_plan">'+plan+'</dt><dd>'+unplan+'</dd>';
	sOut += '<dt class="dt_permission">'+permission+'</dt><dd>'+have+'<a href="#" class="a_edit">'+edit+'</a></dd>';
    sOut += '</dl>';
    return sOut;
}

function initEvent(){
	   $('#table').on('click', ' tbody td .row-details', function () {
	       var nTr = $(this).parents('tr')[0];
	       id = $(this).attr("id").split("_")[1];
	       if ( oTable.fnIsOpen(nTr) )
	       {
	           /* This row is already open - close it */
	           $(this).addClass("row-details-close").removeClass("row-details-open");
	           oTable.fnClose( nTr );
	       }
	       else
	       {
	           /* Open this row */                
	           $(this).addClass("row-details-open").removeClass("row-details-close");
	           oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
	       }
	       
	       //加点击事件
	       $(".a_edit").click(function(){
	    	   editEvent(id);
	       });
	   });
	
	//edit事件
    $('.edit').click(function(event) {
		event.stopPropagation();
		$(this).next().removeClass('edit-wrap');
		$('.edit-wrap').hide();
		$(this).next().addClass('edit-wrap');
		$(this).next().toggle();
	    });
	    $(document).click(function() {
	    $('.edit-wrap').hide();
	    });	
        if ($('.edit').click) {
			$(this).parent().show();
		}else {$(this).parent().hide();}
     //delete事件
     $(".delete").click(function(){
    	 id = $(this).attr("id").split("_")[1];
    	 easyDialog.open({
 			container : 'del_dialog'
 			});
    	 
     });   
     
     $(".edit_permission").click(function(){
    	 //初始化对话框数据
    	 id=$(this).attr("id").split("_")[2];
    	 editEvent(id);
     });
     
     //复制功能
     $(".a_copy").click(function(){
    	 
    	 $("#btn_add").text($.i18n.prop('dash_copy'));
    	 id=$(this).attr("id").split("_")[2];
    	//查询数据库得到数据
    	 data = {"handler":"DashboardTableHandler","action":"selectById","id":id};
    		ajaxPost("/felix", data, function(rs) {
    				if(rs["result"] == "success"){
    						//初始化数据
    						$("#in_title").val(rs.dashboard.title+"_copy");
    						$("#in_desc").val(rs.dashboard.desc+"_copy");
    						$("#in_id").val(rs.dashboard.did+"_copy");
    						if(rs.dashboard.permission==0){
    							$("#btn_owner").addClass("active");
    							$("#btn_owner").siblings().addClass("cother");
    						}else if(rs.dashboard.permission==1){
    							$("#btn_apply").addClass("active");
    							$("#btn_apply").siblings().addClass("cother");
    						}else if(rs.dashboard.permission==2){
    							$("#btn_all").addClass("active");
    							$("#btn_all").siblings().addClass("cother");
    						}
    					}
    			}, function() {
    				alert("error");
    			});
    		easyDialog.open({
    			container : 'd_dialog'
    		});

     });
     
     //转换为html
     $(".a_trans_html").click(function(){
    	 id=$(this).attr("id").split("_")[3];
    	//查询数据库得到数据
    	 data = {"handler":"DashboardTableHandler","action":"selectById","id":id};
    		ajaxPost("/felix", data, function(rs) {
    				if(rs["result"] == "success"){
    						//初始化数据
    						$("#in_html_title").val(rs.dashboard.title+"_html");
    						$("#in_html_desc").val(rs.dashboard.desc+"_html");
    						$("#in_html_id").val(rs.dashboard.did+"_html");
    						if(rs.dashboard.permission==0){
    							$("#btn_html_owner").addClass("active");
    							$("#btn_html_owner").siblings().addClass("cother");
    						}else if(rs.dashboard.permission==1){
    							$("#btn_html_apply").addClass("active");
    							$("#btn_html_apply").siblings().addClass("cother");
    						}else if(rs.dashboard.permission==2){
    							$("#btn_html_all").addClass("active");
    							$("#btn_html_all").siblings().addClass("cother");
    						}
    					}
    			}, function() {
    				alert("error");
    			});
    		easyDialog.open({
    			container : 'html_dialog'
    		});

     });
     
}

function editEvent(id){
	//查询数据库得到数据
	 data = {"handler":"DashboardTableHandler","action":"selectById","id":id};
		ajaxPost("/felix", data, function(rs) {
				if(rs["result"] == "success"){
						//初始化数据
						$("#in_edit_title").val(decodeURIComponent(rs.dashboard.title).replace(/\+/g,' '));
						$("#in_edit_desc").val(decodeURIComponent(rs.dashboard.desc).replace(/\+/g,' '));
						$("#s_edit_owner").html(decodeURIComponent(rs.dashboard.owner).replace(/\+/g,' '));
						$("#s_edit_apply").html(decodeURIComponent(rs.dashboard.apply).replace(/\+/g,' '));
						if(rs.dashboard.permission==0){
							$("#btn_edit_owner").addClass("active");
							$("#btn_edit_owner").siblings().addClass("cother");
						}else if(rs.dashboard.permission==1){
							$("#btn_edit_apply").addClass("active");
							$("#btn_edit_apply").siblings().addClass("cother");
						}else if(rs.dashboard.permission==2){
							$("#btn_edit_all").addClass("active");
							$("#btn_edit_all").siblings().addClass("cother");
						}
						did=rs.dashboard.did;
					}
			}, function() {
				alert("error");
			});
		easyDialog.open({
			container : 'edit_dialog'
		});

}

function packagingdatatabledata(msgObj){    
    var a = new Array();  
    var tableName=['id','title','operate','owner','apply','share'];  
    var banddata = msgObj['data'];  
    for(var key in banddata){  
        var tempObj=new Object();  
        tempObj.id=banddata[key].id;  
        tempObj.title=decodeURI(banddata[key].title).replace(/\+/g,' ');;  
        tempObj.operate='';
        tempObj.owner= decodeURI(banddata[key].owner).replace(/\+/g,' ');
        tempObj.apply= decodeURI(banddata[key].apply).replace(/\+/g,' ');
        tempObj.share=banddata[key].permission;
        owner=decodeURI(banddata[key].owner).replace(/\+/g,' ');
        a.push(JSON.parse(JSON.stringify(tempObj,tableName)));  
        }
    return a;  
}  