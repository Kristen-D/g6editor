<template>
	<div id="sidebal-middle" class="viewFramework-product">
		<div class="row">
				<div v-show="isEdit" class="col-md-12">

						<div class="btn-group pull-right" role="group" >
							<div class="btn-group" role="group" >
							 <button type="button" class="btn btn-default "  @click="showGridConf()"   >
								 添加
							 </button>
							 <!-- <ul class="dropdown-menu">
								 <li v-for="d in componentList"  @click="addGrid(d)" ><a href="JavaScript:void(0)">{{d.component_name}}</a></li>
							 </ul> -->
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
									:col-num="24"
									:row-height="30"
									:is-draggable="isDraggable"
									:is-resizable="isResizable"
									:vertical-compact="true"
									:margin="[10, 10]"
									:use-css-transforms="true"
					>



							<grid-item  v-for="(item,index) in gridData"
													@resized="resizedEvent"
												 :minW = "item.minW"
												 :minH = "item.minH"
												 :x="item.x"
												 :y="item.y"
												 :w="item.w"
												 :h="item.h"
												 :i="item.i">

													<grid :ref="gridrefName+item.i" :data = "item"     :gridrefName="gridrefName" :isEdit="isEdit" >
															<li slot="menu" v-for="c in componentList" @click="changeGrid(item,c)" ><a >{{c.component_name}}</a></li>

															<i slot="customButton" type="button" v-if="Boolean(gridCustomMethods[item.i])" class=" el-dialog__close fa  fa-star"
															 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </i>



															<el-input slot="title" v-model="item.title" placeholder="标题设置" size="small" ></el-input>

															<i slot="delGrid" type="button" @click="delGrid(item)" class="  btn-box-tool el-dialog__close fa fa-times" > </i>
													 </grid>

							</grid-item>
					</grid-layout>
				</div>

 </div><!--viewFramework-product end-->


</template>

<script>
  import grid from 'components/gridster/Grid.vue'
	import {mapState } from 'vuex'
  var GridLayout = VueGridLayout.GridLayout;
  var GridItem = VueGridLayout.GridItem;

	export default {
		components: {GridLayout,GridItem,grid},
		data(){
			return {
				gridSeq:0,
				gridrefName:'my_grid_',
				moudle:"eventInfo",
        isResizable:false,
        isDraggable:false,
				isEdit:false,
				componentList:[],
				tempGrid:[],
				gridData : [],
				gridCustomMethods:{},
		}
	},
		computed:{
			...mapState({
				menuName:state=>state.context.menuName,
			})},

		methods:{
			showGridConf(grid){
		 			this.$refs.gridConf.showGridConf(grid);
			},
			getGridSeq(){
				return this.gridSeq++;
			},

			resetAllGrid(){

				for(var id in this.$refs){
					if(id.indexOf(this.gridrefName)==0){
						 var gridRef = this.$refs[id][0] ;
						 	gridRef.resize();
					}
				}
			},
			 resizedEvent:function(i, newH, newW){
				 var id = this.gridrefName+i;
			  var gridRef = this.$refs[id][0] ;
				 if(gridRef){
					  gridRef.resize();
				 }
       },
			 editStart(){
				 let vm = this;
				 this.isResizable = true;
         this.isDraggable = true;
				 this.isEdit = true;
				 this.tempGrid = jQuery.extend(true,[] ,this.gridData);
				 this.$nextTick(()=>{
					 this.resetAllGrid();
				 });

			 },
			 cancelEdit(){
				this.gridData = this.tempGrid;
				 this.editEnd();
			 },
			 editEnd(){
				 let vm = this;
				 this.isResizable = false;
				 this.isDraggable = false;
				 this.isEdit = false;
				 //console.log(this.tempGrid)
				 this.$nextTick(()=>{
					//  vm.$store.commit("resetAllGrid");
				 });
			 },
       addGrid:function(component){
				 var i = this.getGridSeq();
				 component = {x:0,y:0,w:component.minW,h:component.minH,loading:true,i:i,...component}
				 this.gridData.push(component);
       },
			 saveGrid:function(){
				  let vm = this;
					 vm.common.req("/ssa/viewPlugins/saveGrid.do", {moudle:this.moudle,jsonDataStr:JSON.stringify(this.gridData)},this).then(msg=>{
						  this.$message({ type: 'success',   message: msg });
							this.editEnd();
					});
			 },
			 saveDefGrid:function(){
				 let vm = this;
					vm.common.req("/ssa/viewPlugins/saveGrid.do", {moudle:this.moudle,jsonDataStr:JSON.stringify(this.gridData),type:-1},this).then(msg=>{
						 this.$message({ type: 'success',   message: msg });
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
					 var g = this.gridData;
			     g.forEach((d, i) => {
			       if (d.i == item.i) {
			         g.splice(i, 1);
			       }
			     })

				 }).catch(() => { });

			 },
			 handleCustomMethods:function(item,m){

			 },
			 initComponentList:function(){
				 let vm = this;
				 vm.common.req("/ssa/viewPlugins/listComponent.do", {moudle:vm.moudle}).then(data=>{
					 
					 this.componentList = data;
				});
			 },
			initGridList:function(){
					let vm = this;
					vm.common.req("/ssa/viewPlugins/listGrid.do", {moudle:vm.moudle}).then(data=>{

						data.forEach((d,i)=>{
							d.i = i;
							if(d.params) 	d.params = eval("("+d.params+")")
						})
						this.gridData = data;
						this.gridSeq = data.length;
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

				}

			}
		},

		created:   function() {
  	this.initGridList();
	  this.initComponentList();
   },
	 mounted:function(){
     var vm = this;
     var t = null;
		 $(window).resize(function() {
			 clearTimeout(t);
 			//t = window.setTimeout(function (){ vm.$store.commit("resetAllGrid")},200);
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
