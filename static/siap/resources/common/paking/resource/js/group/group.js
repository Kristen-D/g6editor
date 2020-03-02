/**
 * Created by ai on 2016/9/7.
 */
    function _initFlumeField() {
        i18n("group", '/resource/i18n/group/', 'map', function() {
            $('#flume_no').text($.i18n.prop('flume_no'));
            $('#flume_sourcename').text($.i18n.prop('flume_sourcename'));
            $('#flume_groupname').text($.i18n.prop('flume_groupname'));
            $('#flume_operate').text($.i18n.prop('_operate'));
        });
    }

    function _initFlumeTab(){
        this._initFlumeField(); // 国际化列表的标题
        this._getFlumeGroupList(); // 获取flume列表
    }

    function _initDataprocessField() {
        i18n("group", '/resource/i18n/group/', 'map', function() {
            $('#dataprocess_no').text($.i18n.prop('dataprocess_no'));
            $('#dataprocess_sourcename').text($.i18n.prop('dataprocess_sourcename'));
            $('#dataprocess_groupname').text($.i18n.prop('dataprocess_groupname'));
            $('#dataprocess_operate').text($.i18n.prop('_operate'));
        });
    }

    function _initDataprocessTab(){
        this._initDataprocessField(); // 国际化列表的标题
        this._getDataprocessGroupList(); // 获取dataprocess列表
    }

function _initIndexField() {
    i18n("group", '/resource/i18n/group/', 'map', function() {
        $('#index_no').text($.i18n.prop('index_no'));
        $('#index_sourcename').text($.i18n.prop('index_sourcename'));
        $('#index_groupname').text($.i18n.prop('index_groupname'));
        $('#index_operate').text($.i18n.prop('_operate'));
    });
}

function _initIndexTab(){
    this._initIndexField(); // 国际化列表的标题
    this._getIndexGroupList(); // 获取索引库列表
}
$(function(){
    _initFlumeTab();
});
