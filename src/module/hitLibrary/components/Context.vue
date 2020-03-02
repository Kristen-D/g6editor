<template>
	<div id="sidebal-middle" class="viewFramework-product">

	<div class="viewFramework-product-body body-bgcolor" style="top:0px!important" id="mainFrameBody">
	<div id="app" class="container-padding">
			 <div class="top-breadcrumb">
				  <!-- <ul class="tabs-panel tabs-panel-index">
					 <li><a href="#">工作台</a></li>
					 <li class="active"><a href="#">态势分析</a></li>
				  </ul> -->
			 </div>

			 <!--各阶段攻击数（环比）-->
   <eventAttackPhase  style="width:100%" ref="eventAttackPhase"></eventAttackPhase>

			 <!-- <div class="divider"></div> -->

			 <!--安全指数、单位管理-->
			 <el-row :gutter="20">

				 <el-col :span="11">


	 			   <!-- <div class="el-index-heading">
	 				   <h4 class="index-title"><i class="el-icon-caret-right iconsize"></i>攻击分布</h4>
	 			   </div> -->


        <chinaMap  ref="chinaMap"></chinaMap>
				<ipBar   ref="ipBar"></ipBar>


				 	</el-col>




					<el-col :span="13">




						<!-- <div class="el-index-heading">
							<h4 class="index-title"><i class="el-icon-caret-right iconsize"></i>撞库趋势</h4>
						</div> -->
						 <hitLibraryBarAndLine  style="width:100%;" ref="hitLibraryBarAndLine"></hitLibraryBarAndLine>




						<!-- <div class="el-index-heading">
							<h4 class="index-title"><i class="el-icon-caret-right iconsize"></i>挽回结果</h4>
						</div> -->
						<el-row :gutter="10">
	          <el-col :span="9">  <hitLibraryTypeBar ref="hitLibraryTypeBar"></hitLibraryTypeBar></el-col>
	          <el-col :span="15"> <reSaveLine   ref="reSaveLine"></reSaveLine> </el-col>
	          </el-row>




						<!-- <div class="el-index-heading">
							<h4 class="index-title"><i class="el-icon-caret-right iconsize"></i>高危账户</h4>
						</div> -->
       <highAccountLine   ref="highAccountLine"></highAccountLine>


					 </el-col>

			 </el-row>




		 </div><!--app end-->
		 </div><!--viewFramework-product-body end-->
	    </div><!--viewFramework-product end-->


</template>

<script>
	import {mapState } from 'vuex'
	import chinaMap from './ChinaMap.vue'
	import EventAttackPhase from './EventAttackPhase.vue'
	import hitLibraryBarAndLine from './HitLibraryBarAndLine.vue'
	import hitLibraryTypeBar from './HitLibraryTypeBar.vue'
	import ipBar from './IpBar.vue'
	import reSaveLine from './ReSaveLine.vue'
	import highAccountLine from './HighAccountLine.vue'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
	import commonAjax from 'components/js/common.js'
	export default {
		components: {hitLibraryTypeBar,chinaMap,EventAttackPhase,hitLibraryBarAndLine,ipBar,reSaveLine,highAccountLine},
		data(){
			return {
				report:{
					title:"",
					type:"",
					width:"",
					statsFields:"",
					statsIndex:""
				},

			 	dateTime:"",
				dialogVisible:false,
				tableId:"threatReports",
				activeName: 'all',
				seriesData:[],
				params:{event_type:null},
			  activeName:"first",

		}
	},
		computed:{
			...mapState({
				menuName:state=>state.context.menuName,
				qryTableName1:state=>state.context.qryTableName1,
				qryTableName2:state=>state.context.qryTableName2,
			})},

		methods:{
			changeTime(value){
				if (value==1){
				this.$refs.keyAssetTop5.loadMapChart("day");
				}else if(value==2){
				this.$refs.keyAssetTop5.loadMapChart("week");
				}else if(value==3){
			   this.$refs.keyAssetTop5.loadMapChart("month");
				}
				this.loadMapChart();
			},

			handleClick(tab, event) {
				this.$store.state.context.params.event_type=tab.name;
				// this.$refs.totalHeatMap.loadMapChart();
			 },


			onSetting(){
				this.dialogVisible = true
			},

		},

		created: function() {

   },
	 mounted: async function() {

		this.$store.dispatch('loadListTypeList').then((data) => {
			this.$refs.chinaMap.loadMapChart();
			this.$refs.ipBar.loadMapChart();
			this.$refs.hitLibraryBarAndLine.loadMapChart();
			this.$refs.reSaveLine.loadMapChart();
			this.$refs.highAccountLine.loadMapChart();
			this.$refs.hitLibraryTypeBar.loadMapChart();

			// this.$store.dispatch('reloadTable',"qryTable");
		});



	 }

}
</script>
