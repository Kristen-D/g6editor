var allgroups;
var TableAdvanced = function () {
    this.initTable1 = function(_flumeGroupData) {
        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
        var oTable = $('#sample_1').dataTable( {
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 3 ] }],
            "aaSorting": [[0, 'asc']],
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            "iDisplayLength": 10,
            "bServerSide": false,
            "bFilter" :true,
            "bRetrieve": true,
            "bDestroy":true,

            "aoColumns" : [{
                "mData" : "no"
            }, {
                "mData" : "protocol_sourcename"
            },{
                "mData" : "groupname"
            },  {
                "mData" : "operate"
            }],
            "aaData" : _flumeGroupData ,
            "fnDrawCallback": function( oSettings ){
                $('.editorAS a').click(function(event) {
                    $('.edit-wrap-qx').hide();
                    var _grouppop = initGroupPup(allgroups, $(this).attr('group_ref'), $(this).attr('source_ref'));
                    event.stopPropagation();
                    $(this).next('.edit-wrap-qx').html(_grouppop);

                    $('.close a').click(function(event) {
                        $('.edit-wrap-qx').hide();
                    });
                    //钻取选择
                    $(".zdList2 li").click(function(){
                        $(this).toggleClass("hot");
                    });

                    $(".btn_cj_bg").click(function(){
                        var sourcename_ref = $(this).attr('sourcename_ref');
                        var selectGroup = '';
                        $(this).parent().parent().find("li").each(function () {
                            if($(this).attr('class') == 'hot') {
                                if (selectGroup == '') {
                                    selectGroup = $(this).text();
                                }else{
                                    selectGroup = selectGroup + "," + $(this).text();
                                }
                            }
                        })
                        if(selectGroup == ''){
                            alert($.i18n.prop('group_select_tip'));
                            return ;
                        }else{
                            var data = {"handler":"GroupSourceManageHandler","action" :"updateFlumeGroup","groups" :selectGroup, "protocol_sourcename" : sourcename_ref};
                            ajaxPost("/felix", data, function(rs) {
                                if(rs["result"] == "OK"){
                                    alert($.i18n.prop('operate_success'));
                                    oTable.fnClearTable();
                                    oTable.fnDestroy();
                                    _getFlumeGroupList();
                                } else {
                                    alert($.i18n.prop('operate_failed'));
                                    oTable.fnClearTable();
                                    oTable.fnDestroy();
                                    _getFlumeGroupList();
                                }
                            },function(){
                                alert($.i18n.prop('operate_exception'));
                                oTable.fnClearTable();
                                oTable.fnDestroy();
                                _getFlumeGroupList();
                            });
                        }
                    });

                    $(this).next('.edit-wrap-qx').toggle();
                });
            }
        });
        jQuery('#sample_1_wrapper .dataTables_filter input').addClass("m-wrap small"); // modify table search input
        jQuery('#sample_1_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
        jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialzie select2 dropdown
        
        $('#sample_1').on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
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
        });
    }
	
	this.initTable2 = function(_dataprocessGroupData) {
        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
        var oTable = $('#sample_2').dataTable( {
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 3 ] }],
            "aaSorting": [[0, 'asc']],
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            "iDisplayLength": 10,
            "bServerSide": false,
            "bFilter" :true,
            "bRetrieve": true,
            "bDestroy":true,

            "aoColumns" : [{
                "mData" : "no"
            }, {
                "mData" : "sourcename"
            },{
                "mData" : "groupname"
            },  {
                "mData" : "operate"
            }],
            "aaData" : _dataprocessGroupData,
            "fnDrawCallback": function( oSettings ){
                $('.editorAS a').click(function(event) {
                    $('.edit-wrap-qx').hide();
                    var _grouppop = initGroupPup(allgroups, $(this).attr('group_ref'), $(this).attr('source_ref'));
                    event.stopPropagation();
                    $(this).next('.edit-wrap-qx').html(_grouppop);

                    $('.close a').click(function(event) {
                        $('.edit-wrap-qx').hide();
                    });
                    //钻取选择
                    $(".zdList2 li").click(function(){
                        $(this).toggleClass("hot");
                    });

                    $(".btn_cj_bg").click(function(){
                        var sourcename_ref = $(this).attr('sourcename_ref');
                        var selectGroup = '';
                        $(this).parent().parent().find("li").each(function () {
                            if($(this).attr('class') == 'hot') {
                                if (selectGroup == '') {
                                    selectGroup = $(this).text();
                                }else{
                                    selectGroup = selectGroup + "," + $(this).text();
                                }
                            }
                        })
                        if(selectGroup == ''){
                            alert($.i18n.prop('group_select_tip'));
                            return ;
                        }else{
                            var data = {"handler":"GroupSourceManageHandler","action" :"updateDataprocessGroup","groups" :selectGroup, "sourcename" : sourcename_ref};
                            ajaxPost("/felix", data, function(rs) {
                                if(rs["result"] == "OK"){
                                    alert($.i18n.prop('operate_success'));
                                    oTable.fnClearTable();
                                    oTable.fnDestroy();
                                    _getDataprocessGroupList()
                                } else {
                                    alert($.i18n.prop('operate_failed'));
                                    oTable.fnClearTable();
                                    oTable.fnDestroy();
                                    _getDataprocessGroupList()
                                }
                            },function(){
                                alert($.i18n.prop('operate_exception'));
                                oTable.fnClearTable();
                                oTable.fnDestroy();
                                _getDataprocessGroupList()
                            });
                        }
                    });

                    $(this).next('.edit-wrap-qx').toggle();
                });
            }
        });
        jQuery('#sample_2_wrapper .dataTables_filter input').addClass("m-wrap small"); // modify table search input
        jQuery('#sample_2_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
        jQuery('#sample_2_wrapper .dataTables_length select').select2(); // initialzie select2 dropdown
        
        $('#sample_2').on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
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
        });
    }
	
	this.initTable3 = function(_indexGroupData) {
        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
        var oTable = $('#sample_3').dataTable( {
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 3 ] }],
            "aaSorting": [[0, 'asc']],
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            "iDisplayLength": 10,
            "bServerSide": false,
            "bFilter" :true,
            "bRetrieve": true,
            "bDestroy":true,

            "aoColumns" : [{
                "mData" : "no"
            }, {
                "mData" : "sourcename"
            },{
                "mData" : "groupname"
            },  {
                "mData" : "operate"
            }],
            "aaData" : _indexGroupData,
            "fnDrawCallback": function( oSettings ){

                $('.editorAS a').click(function(event) {
                    $('.edit-wrap-qx').hide();
                    var _grouppop = initGroupPup(allgroups, $(this).attr('group_ref'), $(this).attr('source_ref'));
                    event.stopPropagation();
                    $(this).next('.edit-wrap-qx').html(_grouppop);

                    $('.close a').click(function(event) {
                        $('.edit-wrap-qx').hide();
                    });
                    //钻取选择
                    $(".zdList2 li").click(function(){
                        $(this).toggleClass("hot");
                    });

                    $(".btn_cj_bg").click(function(){
                        var sourcename_ref = $(this).attr('sourcename_ref');
                        var selectGroup = '';
                        $(this).parent().parent().find("li").each(function () {
                            if($(this).attr('class') == 'hot') {
                                if (selectGroup == '') {
                                    selectGroup = $(this).text();
                                }else{
                                    selectGroup = selectGroup + "," + $(this).text();
                                }
                            }
                        })
                        if(selectGroup == ''){
                            alert($.i18n.prop('group_select_tip'));
                            return ;
                        }else{
                            var data = {"handler":"GroupSourceManageHandler","action" :"updateIndexGroup","groups" :selectGroup, "sourcename" : sourcename_ref};
                            ajaxPost("/felix", data, function(rs) {
                                if(rs["result"] == "OK"){
                                    alert($.i18n.prop('operate_success'));
                                    oTable.fnClearTable();
                                    oTable.fnDestroy();
                                    _getIndexGroupList()
                                } else {
                                    alert($.i18n.prop('operate_failed'));
                                    oTable.fnClearTable();
                                    oTable.fnDestroy();
                                    _getIndexGroupList()
                                }
                            },function(){
                                alert($.i18n.prop('operate_exception'));
                                oTable.fnClearTable();
                                oTable.fnDestroy();
                                _getIndexGroupList()
                            });
                        }
                    });

                    $(this).next('.edit-wrap-qx').toggle();
                });
            }
        });
        jQuery('#sample_3_wrapper .dataTables_filter input').addClass("m-wrap small"); // modify table search input
        jQuery('#sample_3_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
        jQuery('#sample_3_wrapper .dataTables_length select').select2(); // initialzie select2 dropdown
        
        $('#sample_3').on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
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
        });
    }
};

// 截取字符串
function cutStr(str,num){
    var val = str;
    var length = 0;
    var newVal="";
    for (var i = 0; i < val.length; i++) {
        if (val.charCodeAt(i) > 255){ //汉字还是字母
            length = length + 2;
        }else{
            length = length + 1;
        }
        if(length > num){
            newVal= str.substring(0,i);
            return newVal;
        }
    }
    return str;

}

// 判断字符串长度
function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            len++;
        }
        else {
            len+=2;
        }
    }
    return len;
}

function packageFlumeData(msgObj){
    var a=[];
    var tableName=["no", "protocol_sourcename","groupname","operate"];
    var banddata = msgObj['data'];
    for(var key in banddata) {
        var tempObj = new Object();
        tempObj.no = parseInt(key) + 1;
        tempObj.protocol_sourcename = banddata[key]["protocol_sourcename"];
        tempObj.groupname = banddata[key]["groupname"];
        allgroups = msgObj['groups'];
        if (allgroups != null && allgroups != undefined && allgroups != '') {
            var update_html = '<div style="position:relative" class="editorAS"><a href="#" group_ref="' + tempObj.groupname +'" source_ref="' + banddata[key]["protocol_sourcename"] + '">' + $.i18n.prop("operate_update") +'</a>' +
                '<div class="editor-bg edit-wrap-qx hide"></div></div>';
            tempObj.operate = update_html;
        }else{
            tempObj.operate = "--";
        }
        a.push(JSON.parse(JSON.stringify(tempObj, tableName)));
    }
    return a;
}

function initGroupPup(allgroups, selectGroup, sourcename){
    var pre_html = '<div class="arrow"></div> <div class="edit-dialog draghandle_m"> <div class="zdList2"> <ul>';
    var suf_html = '</ul> </div> <div class="jmFormActions close"> <a href="#" class="btn_cancel_bg modal-btn-cancel">' + $.i18n.prop("operate_cancel") +
        '</a> <a href="#" class="btn_cj_bg" sourcename_ref = "' + sourcename + '">' + $.i18n.prop("operate_save") +'</a> </div> </div>';
    var group_html = '';
    for (var i = 0; i < allgroups.length; i++) {
        var v_usergroup = allgroups[i]["usergroup"];
        if(strlen(v_usergroup) > 6){
            v_usergroup = cutStr(v_usergroup, 6) + "...";
        }
        if (checkIsHot(selectGroup, allgroups[i]["usergroup"])) {
            group_html += '<li class="hot" title="'+ allgroups[i]["usergroup"] + '">' + v_usergroup + '</li>';
        } else {
            group_html += '<li title="' + allgroups[i]["usergroup"] +'">' + v_usergroup + '</li>';
        }
    }
   return pre_html + group_html + suf_html;
}

function checkIsHot(selectedGroup, group){
    if (selectedGroup == null || selectedGroup == undefined || selectedGroup == '') {
        return false;
    }
    var group1 = selectedGroup.split(",");
    for(var i = 0; i < group1.length; i++){
        if(group1[i] == group){
            return true;
        }
    }
    return false;
}

function _getFlumeGroupList(){
    var data = {"handler":"GroupSourceManageHandler","action" :"flumeSelect"};
    ajaxPost("/felix", data, function(rs) {
        if(rs["result"] == "OK"){
            var data = this.packageFlumeData(rs);
            new TableAdvanced().initTable1(data);
        } else {
        }
    },function(){
    });
}

function packageDataprocessData(msgObj){
    var a=[];
    var tableName=["no", "sourcename","groupname","operate"];
    var banddata = msgObj['data'];
    for(var key in banddata){
        var tempObj=new Object();
        tempObj.no = parseInt(key) + 1;
        tempObj.sourcename=banddata[key]["sourcename"];
        tempObj.groupname=banddata[key]["groupname"];
        allgroups=msgObj['groups'];
        if (allgroups != null && allgroups != undefined && allgroups != '') {
            var update_html = '<div style="position:relative" class="editorAS"><a href="#" group_ref="' + tempObj.groupname +'" source_ref="' + banddata[key]["sourcename"] + '">' + $.i18n.prop("operate_update") +'</a>' +
                '<div class="editor-bg edit-wrap-qx hide"></div></div>';
            tempObj.operate = update_html;
        }else{
            tempObj.operate = "--";
        }
        a.push(JSON.parse(JSON.stringify(tempObj,tableName)));
    }
    return a;
}

function _getDataprocessGroupList(){
    var data = {"handler":"GroupSourceManageHandler","action" :"dataprocessSelect"};
    ajaxPost("/felix", data, function(rs) {
        if(rs["result"] == "OK"){
            var data = this.packageDataprocessData(rs);
            new TableAdvanced().initTable2(data);
        } else {
        }
    },function(){
    });
}

function packageIndexData(msgObj){
    var a=[];
    var tableName=["no", "sourcename","groupname","operate"];
    var banddata = msgObj['data'];
    for(var key in banddata){
        var tempObj=new Object();
        tempObj.no = parseInt(key) + 1;
        tempObj.sourcename=banddata[key]["sourcename"];
        tempObj.groupname=banddata[key]["groupname"];
        allgroups=msgObj['groups'];
        if (allgroups != null && allgroups != undefined && allgroups != '') {
            var update_html = '<div style="position:relative" class="editorAS"><a href="#" group_ref="' + tempObj.groupname +'" source_ref="' + banddata[key]["sourcename"] + '">' + $.i18n.prop("operate_update") +'</a>' +
                '<div class="editor-bg edit-wrap-qx hide"></div></div>';
            tempObj.operate = update_html;
        }else{
            tempObj.operate = "--";
        }
        a.push(JSON.parse(JSON.stringify(tempObj,tableName)));
    }
    return a;
}

function _getIndexGroupList(){
    var data = {"handler":"GroupSourceManageHandler","action" :"indexSelect"};
    ajaxPost("/felix", data, function(rs) {
        if(rs["result"] == "OK"){
            var data = this.packageIndexData(rs);
            new TableAdvanced().initTable3(data);
        } else {
        }
    },function(){
    });
}

//qiehuan
function setTab4(name,cursel,n, labId){
    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById(name+"_"+i);
        //menu.checked=i==cursel?"true":"";
        menu.className = i== cursel?"lab_pg_xz":"lab_pg_yl";
        con.style.display=i==cursel?"block":"none";
    }
    if(labId == 'lab1'){
        $('#sample_1').dataTable().fnClearTable();
        $('#sample_1').dataTable().fnDestroy();
        _initFlumeTab();
    }else if(labId == 'lab2'){
        $('#sample_2').dataTable().fnClearTable();
        $('#sample_2').dataTable().fnDestroy();
        _initDataprocessTab();
    }else if(labId == 'lab3'){
        $('#sample_3').dataTable().fnClearTable();
        $('#sample_3').dataTable().fnDestroy();
        _initIndexTab();
    }
}

