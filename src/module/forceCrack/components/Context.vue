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
   <!-- <eventAttackPhase  style="width:100%" ref="eventAttackPhase"></eventAttackPhase> -->

			 <!-- <div class="divider"></div> -->

			 <!--安全指数、单位管理-->

			<el-row :gutter="20">
				<el-col :span="16">
			  <chinaMap  ref="chinaMap"></chinaMap>
				</el-col>
				<el-col :span="8">
				<eventAttackPhase  ref="eventAttackPhase"></eventAttackPhase>
				</el-col>
			</el-row>


			<el-row :gutter="20">
		 		<el-col :span="12">
	    <hitLibraryBarAndLine    ref="hitLibraryBarAndLine"></hitLibraryBarAndLine>
		 		</el-col>
		 		<el-col :span="12">
    <reSaveLine   ref="reSaveLine"></reSaveLine>
		 		</el-col>
			</el-row>


			<el-row :gutter="20">
	 		<el-col :span="12">
			<ipBar   ref="ipBar"></ipBar>
	 		</el-col>
	 		<el-col :span="12">

		<div class="el-panel-white">
					<div class="el-panel-white-heading">
						 <h3 class="el-panel-white-title">高危账户</h3>
						 <el-tabs class="float-r day-tabs m-r--30"  @tab-click="changeTime" v-model="activeName">
								<el-tab-pane label="今天" name="1"></el-tab-pane>
								<el-tab-pane label="近7天" name="2"></el-tab-pane>
								<el-tab-pane label="近30天" name="3"></el-tab-pane>
							 </el-tabs>
					</div>
				 <div class="el-panel-white-body clearfloat" style="height:250px;!important">
	         <queryTable   id="queryTable"></queryTable>
				 </div>
			 </div>

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
	import queryTable from './QueryTable.vue'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
	import commonAjax from 'components/js/common.js'
	export default {
		components: {hitLibraryTypeBar,chinaMap,EventAttackPhase,hitLibraryBarAndLine,ipBar,reSaveLine,highAccountLine,queryTable},
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
				params:{event_type:null,dateRange:"month"},
			  activeName:'3',

		}
	},
		computed:{
			...mapState({
				menuName:state=>state.context.menuName,
			})},

		methods:{
			changeTime(value){
				if (value.name==1){
				this.params.dateRange="day";
				}else if(value.name==2){
				this.params.dateRange="week";
				}else if(value.name==3){
			   this.params.dateRange="month";
				}
				this.$store.commit('setParams',["queryTable", this.params]);
				this.$store.dispatch('reloadTable',"queryTable");
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
			// this.$refs.highAccountLine.loadMapChart();
			// this.$refs.hitLibraryTypeBar.loadMapChart();

			// this.$store.dispatch('reloadTable',"qryTable");
		});



	 }

}
</script>
