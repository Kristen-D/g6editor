 <template>
	<div id="sidebal-middle" class="viewFramework-product">
		<drillDialog ></drillDialog>
		 <div class="viewFramework-product-body body-bgcolor" id="mainFrameBody" style="top:0px!important">
			 <div id="app" class="container-padding">
				  <div class="top-breadcrumb">
				 </div>

			 <!--各阶段攻击数（环比）-->
   <eventAttackPhase  style="width:100%" ref="eventAttackPhase"></eventAttackPhase>

			 <!-- <div class="divider"></div> -->

			 <!--安全指数、单位管理-->

			 <el-row :gutter="16">
			<scoreMap  ref="scoreMap"></scoreMap>
			<orgManage  ref="orgManage"></orgManage>

 		  </el-row>



			 <!-- <div class="divider"></div> -->

		     <!--资产管理-->

				 <el-row>
					<div class="el-panel-white">
						<div class="el-panel-white-heading">
							<h3 class="el-panel-white-title">资产视图</h3>
							<el-tabs class="float-r day-tabs" v-model="activeName" @tab-click="changeTime">
			           <el-tab-pane label="今天" name="1" ></el-tab-pane>
			           <el-tab-pane label="近7天" name="2" ></el-tab-pane>
			           <el-tab-pane label="近30天" name="3" ></el-tab-pane>
			        </el-tabs>
						</div>
						<div class="el-panel-white-body">
							 <el-row>
	             <iskeyAsset  ref="iskeyAsset"></iskeyAsset>
               <attackMonthLine  ref="attackMonthLine"></attackMonthLine>
              <keyAssetTop5  ref="keyAssetTop5"></keyAssetTop5>
						 </el-row>
						</div>
					</div>
				 </el-row>

	     	 <!--威胁类型（环比）、事件采集量（环比）-->
				 <el-row :gutter="16">
<eventTypeBarAndLine  ref="eventTypeBarAndLine"></eventTypeBarAndLine>
  <productTypeLine  ref="productTypeLine"></productTypeLine>
				 </el-row>

				 <el-row>
	 			 <div class="el-panel-white">
	 				 <!-- <div class="el-panel-white-heading"><h3 class="el-panel-white-title">威胁事件</h3></div> -->
	 				 <div class="el-panel-white-body">
				<el-tabs v-model="eventLogActiveNamee">
					<el-tab-pane label="网络攻击事件" name="1">
						<queryTable  id="queryTable"></queryTable>
					</el-tab-pane>
					<el-tab-pane label="有害程序事件" name="2">
						<queryTableHarmful  id="queryTableHarmful"></queryTableHarmful>
					</el-tab-pane>
			  </el-tabs>
	 				 </div>
	 			 </div>
	 		  </el-row>

		 </div><!--app end-->
		 </div><!--viewFramework-product-body end-->
	    </div><!--viewFramework-product end-->


</template>

<script>
	import {mapState } from 'vuex'
	import orgManage from './OrgManage.vue'
	import productTypeLine from './ProductTypeLine.vue'
	import keyAssetTop5 from './KeyAssetTop5.vue'
	import iskeyAsset from './IsKeyAsset.vue'
	import eventTypeBarAndLine from './EventTypeBarAndLine.vue'
	import scoreMap from './ScoreMap.vue'
	import attackMonthLine from './AttackMonthLine.vue'
	import eventAttackPhase from './EventAttackPhase.vue'
	import queryTable from './QueryTable.vue'
	import queryTableHarmful from './QueryTableHarmful.vue'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
	import commonAjax from 'components/js/common.js'
	import drillDialog from './DrillDialogTable.vue'
	export default {
		components: { queryTable,queryTableHarmful,orgManage,productTypeLine,keyAssetTop5,iskeyAsset,eventTypeBarAndLine,attackMonthLine,scoreMap,eventAttackPhase, drillDialog},
		data(){
			return {
				report:{
					title:"",
					type:"",
					width:"",
					statsFields:"",
					statsIndex:""
				},
        eventLogActiveNamee: "1",
			 	dateTime:"",
				dialogVisible:false,
				tableId:"threatReports",
				activeName:"3",
				seriesData:[],
				params:{event_type:null},
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
				if (value.name==1){
				this.$refs.keyAssetTop5.loadMapChart("day");
				this.$refs.attackMonthLine.loadMapChart("day");
				}else if(value.name==2){
				this.$refs.keyAssetTop5.loadMapChart("week");
				this.$refs.attackMonthLine.loadMapChart("week");
				}else if(value.name==3){
			   this.$refs.keyAssetTop5.loadMapChart("month");
				 this.$refs.attackMonthLine.loadMapChart("month");
				}

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
			this.$refs.attackMonthLine.loadMapChart("month");
			this.$refs.productTypeLine.loadMapChart();
     this.$refs.eventTypeBarAndLine.loadMapChart("month");
		 this.$refs.keyAssetTop5.loadMapChart("month");
     this.$refs.orgManage.loadMapChart();
		  this.$refs.eventAttackPhase.loadMapChart();
			this.$refs.iskeyAsset.loadMapChart();
			this.$refs.scoreMap.loadMapChart();
			// this.$store.dispatch('reloadTable',this.id);
			this.$store.dispatch('reloadTable',"queryTable");
			this.$store.dispatch('reloadTable',"queryTableHarmful");
		});



    // console.log(seriesData);
		//日期切换
		$(".tabs-panel > li").click(function(){
       $(this).addClass("active").siblings("li").removeClass();
    });


		$(".si-ul11 > li").click(function(){
			 $(this).addClass("active").siblings("li").removeClass();
		});


	 }

}
</script>
