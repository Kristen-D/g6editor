<template>

	<div class="wraper container-fluid">
	<drillDialog></drillDialog>

  <div class="row">
      <div v-show="isEdit" class="col-md-12">

					<div class="btn-group pull-right" role="group" >
						<div class="btn-group" role="group" >
						 <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							 添加
							 <span class="caret"></span>
						 </button>
						 <ul class="dropdown-menu">
							 <li v-for="d in componentList"  @click="addGrid(d)" ><a href="JavaScript:void(0)">{{d.component_name}}</a></li>
						 </ul>
					 </div>

				  <button type="button" class="btn btn-default" @click="saveGrid" >保存</button>
	 				<button type="button" class="btn btn-default" @click="saveDefGrid" >设成默认</button>
					<button type="button" class="btn btn-default" @click="cancelEdit" >取消</button>

			</div>
		</div>

			<div   v-show="!isEdit" class="col-md-12">
				<i class="fa fa-cog  pull-right" style="font-size:25px;cursor:pointer;"   @click="editStart"  ></i>
			</div>

  </div>

<div class="row">
    <grid-layout
								ref = "home_gl"
                :layout="gridData"
                :col-num="12"
                :row-height="30"
                :is-draggable="isDraggable"
                :is-resizable="isResizable"
                :vertical-compact="true"
                :margin="[10, 10]"
                :use-css-transforms="true"
        >



            <grid-item  v-for="item in gridData"
                        @resized="resizedEvent"
                       :minW = "item.minW"
                       :minH = "item.minH"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i">
										<div class = "panel panel-default bg-panel"   :class="(isEdit||Boolean(item.title))?'my-grid':''" style="height: 100%;">
											<div class = "panel-heading my-grid-header" v-show="isEdit">
												<div class="btn-group btn-group-xs  btn-box-tool">
													<i type="button"  class=" el-dialog__close fa fa-cog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													</i>
													<ul class="dropdown-menu">
														<li  v-for="c in componentList" @click="changeGrid(item,c)" ><a >{{c.component_name}}</a></li>
													</ul>
												</div>

													<div class="btn-group btn-group-xs  btn-box-tool">
													<i type="button" v-if="Boolean(gridCustomMethods[item.i])" class=" el-dialog__close fa  fa-star"
													 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													</i>
													<ul class="dropdown-menu">
														<li   v-for="m in gridCustomMethods[item.i]" @click="handleCustomMethods(item,m)" ><a >{{m.name}}</a></li>
													</ul>
												</div>
											<div class="btn-group btn-group-xs  btn-box-tool">
													<el-input v-model="item.title" placeholder="标题设置" size="small" ></el-input>
													</div>
												<div class="el-dialog__headerbtn">
													<i type="button" @click="delGrid(item)" class="  btn-box-tool el-dialog__close fa fa-times" >
													</i>
												</div>
											</div>
											<div class = "panel-heading my-grid-header" v-show="!isEdit&&Boolean(item.title)"><h3 class="panel-title">{{item.title}}<i class="fa fa-list-ul pull-right"></i></h3></div>
										  <grid :data = "item" >  </grid>
										</div>

            </grid-item>
        </grid-layout>
			</div>
	</div>
</template>

<script>
  import grid from 'components/gridster/Grid.vue'
	import drillDialog from './DrillDialog.vue'
	import {mapState } from 'vuex'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
import commonAjax from 'components/js/common.js'
  var GridLayout = VueGridLayout.GridLayout;
  var GridItem = VueGridLayout.GridItem;

	export default {
		components: {GridLayout,GridItem,grid,drillDialog},
		data(){
			return {
				moudle:"home",
        isResizable:false,
        isDraggable:false,
				isEdit:false,
				componentList:[],
				tempGrid:[],
		}
	},
		computed:{
			...mapState({
				menuName:state=>state.context.menuName,
        gridData : state=>state.gridster.gridData,
				gridCustomMethods:state=>state.gridster.gridCustomMethods
			})},

		methods:{
			 resizedEvent:function(i, newH, newW){
         //console.log(this.$refs)
           this.$store.commit("resetGrid",i);
       },
			 editStart(){
				 let vm = this;
				 this.isResizable = true;
         this.isDraggable = true;
				 this.isEdit = true;
				 this.tempGrid = jQuery.extend(true,[] ,this.gridData);
				 this.$nextTick(()=>{
					  vm.$store.commit("resetAllGrid");
				 });

			 },
			 cancelEdit(){
			   let vm = this;
				 vm.$store.commit("setGridData",this.tempGrid);
				 this.editEnd();
			 },
			 editEnd(){
				 let vm = this;
				 this.isResizable = false;
				 this.isDraggable = false;
				 this.isEdit = false;
				 //console.log(this.tempGrid)
				 this.$nextTick(()=>{
					  vm.$store.commit("resetAllGrid");
				 });
			 },
       addGrid:function(component){
				 component = {x:0,y:0,w:component.minW,h:component.minH,loading:true,...component}
         this.$store.dispatch("addGrid",component);
       },
			 saveGrid:function(){
				  let vm = this;
					vm.$store.commit("saveGirdConf");
					 vm.commonAjax.req("/ssa/gridConf/saveGrid.do", {moudle:this.moudle,jsonDataStr:JSON.stringify(this.gridData)},this).then(msg=>{
						  this.$message({ type: 'success',   message: msg });
							this.editEnd();
					});
			 },
			 saveDefGrid:function(){
				 let vm = this;
				 vm.$store.commit("saveGirdConf");
					vm.commonAjax.req("/ssa/gridConf/saveGrid.do", {moudle:this.moudle,jsonDataStr:JSON.stringify(this.gridData),type:-1},this).then(msg=>{
						 this.$message({ type: 'success',   message: msg});
						 this.editEnd();
				 });
			 },
			 delGrid:function(item){
				 this.$confirm('此操作将删除选中面板, 是否继续?', '提示', {
					 confirmButtonText: '确定',
					 cancelButtonText: '取消',
					 type: 'warning'
				 }).then(async() =>
				 {
					  this.$store.commit("delGrid",item);
				 }).catch(() => { });

			 },
			 handleCustomMethods:function(item,m){
				this.$store.commit("handleCustomMethods",[item,m]);
			 },
			 initComponentList:function(){
				 let vm = this;
				 vm.commonAjax.req("/ssa/gridConf/listComponent.do", {moudle:vm.moudle}).then(data=>{
					 this.componentList = data;
				});
			 },
			initGridList:function(){
					let vm = this;
					vm.commonAjax.req("/ssa/gridConf/listGrid.do", {moudle:vm.moudle}).then(data=>{

						data.forEach(d=>{
							if(d.params) 	d.params = eval("("+d.params+")")
						})
						vm.$store.commit("setGridData",data);
				 });
			},
			changeGrid:function(item,c){
				if(item.component!=c.component){
					item.component = c.component
					item.minW = c.minW;
					item.minH = c.minH;
					item.w = c.minW;
					item.h = c.minH;
					item.component_id = c.component_id;
					this.$store.commit("rmRef",item.i);
				 	this.$store.dispatch("changeGrid",[item,this]);



				}

			}
		},

		created:   function() {
			// var wsUri = "ws://localhost:8181/websocket";
			// var  echo_websocket = new WebSocket(wsUri);
			// echo_websocket.onopen = function(event){
			//
      // }
			// console.log(echo_websocket)
  	this.initGridList();
	  this.initComponentList();
   },
	 mounted:function(){
     var vm = this;
     var t = null;
		 $(window).resize(function() {
			 clearTimeout(t);
 			t = window.setTimeout(function (){ vm.$store.commit("resetAllGrid")},200);
		 });

	 }

}
</script>

<style>
.my-grid {  padding: 38px 0 0; box-sizing: border-box ; }
.my-grid-header { height: 38px; margin: -38px 0 0;  padding: 5px 15px;}
.btn-box-tool {
    padding:0px 0px 0px 5px;
}

</style>
