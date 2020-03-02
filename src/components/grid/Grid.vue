<template>
  <div :id="id" class="dataTables_wrapper form-inline dt-bootstrap no-footer " :class=" active?'tab-pane fade in active':'tab-pane fade' " :style="'height:'+height+'px'">
      <!--Hover Rows-->
<div  class="row">      <!--===================================================-->
  <div class="col-sm-12">
  <div  v-show="mask" class="mask "  :style="'height:'+height+'px'">
    <div  class="col-sm-6" :style="'top:'+(height/2)+'px'">
            <i  class="fa ion-loading-a pull-right" style="font-size:30px;color:#071023"></i>
   </div>
  </div>
  </div>
</div>


<div class="row"  >

  <div class="col-sm-12">
      <table class="table table-striped table-bordered dataTable no-footer" >
          <thead>
              <tr>
                <th  v-if="isCheckBox" style="width:25px" >
                  <input type="checkbox" :checked="allChecked" @click="checkedAllRow()" />
                </th>
                <th :style="'width:'+column.width+'%'" v-if="showSort" v-for="column in columns"  :class=" sortKey ==column.key?sortClass:'sorting' "  @click="sortBy(column.key)" >
                  {{column.name}}
                 </th>
                <th :style="'width:'+column.width+'%'" v-if="!showSort" v-for="column in columns" >
                {{column.name}}
               </th>
               <th v-if="actions!=null || isEdit" >
                 操作
               </th>
              </tr>
          </thead>
          <tbody>

            <tr v-for="(row,index) in rowData">
              <td  v-if="isCheckBox"  >
                  <input type="checkbox"  :checked="row.checked" @change="checkedRow(m,$event,row)"/>
              </td>
            <td    v-for="column in columns" >
              <a v-show="!row.edited || column.editorDisabled" :title="handleShowData(row,index,column)" >{{handleShowData(row,index,column)}}</a>
              <input     class=" form-control"  v-model="row[column.key]"   v-if="column.editor==null" v-show="row.edited&& !column.editorDisabled"     />
              <div  style="width:100%" :class="row.edited?'show':'hidden'"  v-if="column.editor!=null&&column.editor.type=='select'">
              <select2 :options="column.editor.options" v-model="row[column.key]" style="width:100%"  >  </select2>
              </div>
            </td>
            <td v-if="actions!=null || isEdit "  class="actions">
              <a href="JavaScript:void(0);" v-show="isEdit&&!row.edited"  title="编辑" @click="editRow(index,row)" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
              <a href="JavaScript:void(0);" v-show="isEdit&&!row.edited" title="删除" @click="delRow(index,row)" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
              <a href="JavaScript:void(0);" v-show="isEdit&&row.edited" title="保存" @click="saveRow(index,row)" class="on-default edit-row"><i class="fa  fa-save"></i></a>
              <a href="JavaScript:void(0);" v-show="isEdit&&row.edited" title="取消" @click="cancelEdit(index,row)" class="on-default remove-row"><i class="fa fa-times"></i></a>
              <span v-for="action in actions" v-show="!row.edited"  >
                <a href="JavaScript:void(0);" v-if="action.type=='custom'" @click="action.action(index,row,column)" :title="action.title" class="on-default" >
                                                          <i class="fa " :class="type[action.type].icon" ></i> </a>
              <span>
            </td>
          </tr>

          </tbody>
      </table>
      </div>
      </div>


<div class="row" >
  <div class="col-sm-6"><div class="dataTables_info"  >共搜索到数据{{total}}条,总页数{{pageLen}}页&nbsp;{{ajaxMsg}}

  </div></div>
  <div class="col-sm-6" v-show="showPage">
    <div  class="dataTables_paginate"  >

      <ul class="pagination">
        <li><a  >跳至
              <input   type="text"   style="width:25px;height:20px" v-model="toolPageIndex"  @blur="goPage(toolPageIndex)"> &nbsp;页
       </a> </li>

        <li><a href="JavaScript:void(0);"  @click="goPage(1)" >&laquo;</a></li>

        <li  :class="page.active?'active':''" v-for="page in pageList"  @click="goPage(page.index)" >
          <a href="JavaScript:void(0);" v-show="page.show" >{{page.index}}</a>
        </li>

        <li><a href="JavaScript:void(0);" @click="goPage(pageLen)">&raquo;</a></li>

      <!--  <li><a href="JavaScript:void(0);" @click="">到</a></li>-->
      </ul>
    </div>
  </div>
  </div>

      <!--===================================================-->
      <!--End Hover Rows-->
  </div>
</template>
<script>
import commonAjax from 'components/js/common.js'

import {mapState } from 'vuex'
export default {
  data(){
    return {

      title:"",
      id:"",
      height:400,
      columns:[],
      rowData:[],
      total:0,

      pageList:null,
      pageSize:10,
      pageIndex:1,
      pageShowLen:6,
      //页码数
      pageLen:1,
      toolPageIndex:null,

      url:"",
      params:{},

      sortClass:"sorting_asc",
      sortKey:"",
      sortParams:{"sorting_asc":"asc","sorting_desc":"desc"},
      type:{info:{icon:"fa-search"},edit:{icon:"fa-pencil"},del:{icon:"fa fa-trash-o"},custom:{icon:"fa  fa-file-text-o"}},
      active:false,
      showSort:false,
      showPage:false,
      actions:null,
      editConf:null,
      editRowCopy:{},
      editRowIndex:-1,
      isEdit:false,
      isCheckBox:false,
      allChecked:false,
      checkedList:[],
      mask:false,
      ajaxMsg:""
  };
  },
  props: ['setting'],
  methods:{
    async  loadGridData (create) {
        this.editRowIndex = -1;
        this.mask=true;
        this.params.pageSize = this.pageSize;
        this.params.pageIndex = this.pageIndex;

          var gridData = await commonAjax.req(this.url,this.params) ;
          this.initData(gridData.rowData);
          this.total = gridData.total;
          if(this.total > this.pageSize)this.showPage = true;
          this.rowData = gridData.rowData;
          this.mask=false;
          return gridData;
     },
    async reload(){
       this.pageList = null;
       this.allChecked = false;
       this.pageIndex = 1;

        var gridData =   await    this.loadGridData() ;
         this.setPage(1);
        return gridData;

     },
     setParams(params){
       this.params = jQuery.extend({}, params);
       this.pageIndex = 1;
     },
     loadCols(){
       for (var i = 0; i < this.columns.length; i++) {
          var col = this.columns[i];
          if(col.editor!=null) this.loadEditor(col);
       }
     },
  async loadEditor(col){
       var options = col.editor.options;
       var data =   await  commonAjax.req(options.url,options.params)
          var newOpt = jQuery.extend({}, options);
          newOpt.data = data;
          col.editor.options  = newOpt;
     },
     initData(rowData){
       for (var i = 0; i < rowData.length; i++) {
         var row = rowData[i];
         row.edited=false;
         row.checked = false;
       }

     },
     addRow(newRow){
       if(this.editRowIndex!=-1){
         this.cancelEdit(this.editRowIndex,this.rowData[this.editRowIndex]);
       }
      newRow.edited=true;
      newRow.new=true;
       this.rowData.push(newRow);
       this.editRowIndex =  this.rowData.length-1
     },
     editRow(i,row){

       if(this.editRowIndex!=-1){
         this.cancelEdit(this.editRowIndex,this.rowData[this.editRowIndex]);
       }
       this.editRowIndex = i;
       this.editRowCopy = jQuery.extend({}, row);
       row.edited = true;
     },
  async   saveRow(i,row){
        //this.editConf.save(i,row);
        var url = this.editConf.save.url;

        var msg = await commonAjax.req(url,row)

        await  this.reload() ;
       alert(msg);
     },
async     delRow(i,row,col){
       //this.editConf.del(i,row);
       var url = this.editConf.del.url;
       if(window.confirm("是否删除用户")){
           var msg = await commonAjax.req(url,row)
           await  this.reload() ;
            alert(msg);
       }

     },
     cancelEdit(i,row){
       jQuery.extend(row,  this.editRowCopy);
       row.edited = false
       if(row.new){
          this.rowData.pop();
       }
       this.editRowIndex=-1
     },
     handleShowData(row,index,column){
       if(typeof column.fmt=="function")
          return column.fmt(index,row,column,row[column.key]);
      else
          return row[column.key];
     },
     checkedAllRow(){
        //var checked = e.currentTarget.checked;
        this.allChecked = !this.allChecked;
       this.rowData.forEach(row=>{
         row.checked =  this.allChecked;
       });
     },
     checkedRow(m,e,row){
        var checked = e.currentTarget.checked;
        row.checked = checked;
     },
     getCheckedRows(){
      return  this.rowData.filter(row=>{
          return row.checked;
       })
     },
     sortBy(key){
       if(this.sortKey != key){
        this.sortClass = 'sorting_asc';
       }else{
         this.sortClass = this.sortClass=='sorting_asc'?'sorting_desc':'sorting_asc';
       }
       this.sortKey = key;

       this.params["sort"] = this.sortParams[this.sortClass];
        this.params["sort_key"] = this.sortKey ;
       this.loadGridData() ;
     },
     goPage(index){
       if(index>this.pageLen)index = this.pageLen;
       if(index<=0)index = 1;
       this.pageIndex = index;
       this.params["pageIndex"] = this.pageIndex;
       this.params["pageSize"] = this.pageSize;
       this.loadGridData().then(data=>{
         this.setPage(index);
       });

     },
     setPage(pageIndex){
       if(this.total<=this.pageSize) {
         this.showPage = false;
         this.pageLen = 1;
         return;
       }
       //得到page在数组中的index
       var rindex = pageIndex-1;
       var pageShowLen = this.pageShowLen;
       if(rindex>this.pageLen)rindex = this.pageLen-1;
       if(rindex<0)rindex = 0;
       //确定页数
       var pageLen = parseInt(this.total/this.pageSize)
       var x = this.total%this.pageSize
       if(x > 0)pageLen++;
       this.pageLen = pageLen;
       if(this.pageLen < pageShowLen)pageShowLen = this.pageLen;
       if(this.pageList == null || this.pageList.length <=0){
         this.pageList = [];
         for (var i = 0; i < this.pageLen; i++) {
            this.pageList.push({index:i+1,active:false,show:false});
         }
       }

       //得到选中页数显示的中间位置
       var halfLen = Math.round(pageShowLen/2);
       //得到显示页的起始位置
       var start = pageIndex-halfLen;
     // 大于最大页数就让重置起始位置为最大值
       if((start+pageShowLen)>this.pageLen)start = this.pageLen-pageShowLen
       //小于重置值就从1开始
       if(start<0)start = 0;
       var end = start+pageShowLen;

         //设置选中的页数为选中样式
         for (var i = 0; i < this.pageList.length; i++) {
           var page = this.pageList[i];
           if(i>=start && start< end){
             page.show=true;
             start++;
           }else{
             page.show=false;
           }
           if(i == rindex)   page.active = true;
           else page.active = false;
         }
     }
  },
  created :function() {
    for(var a in this.setting){
          this[a] = this.setting[a];
    }
    this.isEdit = (this.setting.editConf!=null);


    this.loadGridData().then(data=>{
      this.setPage(1);
      this.loadCols();
    });

  }

}

</script>
<style type="text/css">
    .mask {
            position: absolute; filter: alpha(opacity=30); background-color: #ffff;
            z-index: 1002;
            width:100%;
            left:0px;
            opacity:0.6; -moz-opacity:0.6;
        }

   table{
     table-layout:fixed;word-wrap:break-word;
   }

   td {
      white-space:nowrap;overflow:hidden;text-overflow: ellipsis;

   }
</style>
