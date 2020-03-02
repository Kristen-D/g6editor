<template>
<div class="wraper container-fluid">


	<div class="m-30">
				  <el-row :gutter="20">
					  <el-col :span="9">
						  <div class="el-panel el-panel-scenario">
							  <div class="el-panel-heading"><p  style="color: #f8f8f8;!important">宽带利用率</p></div>
						  	  <div class="el-panel-body tx_cont postion_r">
                                  <dl class="number_s">
                                   <dt>23</dt>
                                   <dd>总利用率</dd>
                                  </dl>

																  <lineAMap   ref="lineAMap"></lineAMap>
                             </div>
						  </div>

						  <div class="el-panel el-panel-scenario">
						  	   <div class="el-panel-heading"><p  style="color: #f8f8f8;!important">丢包率</p></div>
						       <div class="el-panel-body tx_cont postion_r">
                                  <dl class="number_s">
                                   <dt>0.1</dt>
                                   <dd>总利用率</dd>
                                  </dl>
                              <barAMap  ref="barAMap"></barAMap>
                               </div>
						  </div>

						  <div class="el-panel el-panel-scenario">
							  <div class="el-panel-heading"><p  style="color: #f8f8f8;!important">链路状态（近24小时）</p></div>
								    <barB1Map   ref="barB1Map"></barB1Map>
								    <barB2Map   ref="barB2Map"></barB2Map>
								    <barB3Map   ref="barB3Map"></barB3Map>
								    <barB4Map   ref="barB4Map"></barB4Map>
						  </div>
					  </el-col>
					  <el-col :span="15">
						  <div class="el-panel el-panel-scenario">
							   <ul class="scenario-tabs map_time">
								  <li class="active"><a href="#">今天</a></li>
								  <li><a href="#">近7天</a></li>
								  <li><a href="#">近30天</a></li>
						      </ul>
							  <div class="tp_img2">
								   <span class="tp_word01">UCloud</span><span class="tp_word02">UCloud</span>
								   <span class="tp_word03">三方合作伙伴</span>
								   <span class="tp_word04">三方运维</span><span class="tp_word05">SOHO</span>
								   <span class="tp_word06">分支机构</span><span class="tp_word07">IDC</span>
								   <span class="tp_word08">VOIF</span><span class="tp_word09">台式PC</span>
								   <span class="tp_word10">视频监控</span><span class="tp_word11">笔记本</span><span class="tp_word12">AP CISCO</span>
								   <span class="tp_wordA">电信一</span> <span class="tp_wordB">电信二</span>
								   <span class="tp_wordC">联通一</span> <span class="tp_wordD">联通二</span>
							  </div>
						  </div>
						  <div class="el-panel el-panel-scenario">
						  	  <p  style="color: #f8f8f8;!important">中断告警</p>
            			       <div class="el-panel-body">
                               <el-table :data="tableDataInterruptalarm" border style="width: 100%" class="dark-table">
									<el-table-column prop="one" label="链路名称" align="center" show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="two" label="带宽" align="center" show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="three" label="中断时常" align="center" show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="four" label="中断时间" align="center" show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="five" label="恢复时间" align="center" width="200" show-overflow-tooltip="true"></el-table-column>
						       </el-table>
						    </div>

						  </div>
					  </el-col>
				  </el-row>
			  </div>

	</div>


</template>

<script>
	import {mapState } from 'vuex'
	import barAMap from './BarAMap.vue'
	import barB1Map from './BarB1Map.vue'
	import barB2Map from './BarB2Map.vue'
	import barB3Map from './BarB3Map.vue'
	import barB4Map from './BarB4Map.vue'
	import lineAMap from './LineAMap.vue'

	import qryTable from './QueryTable.vue'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
	import commonAjax from 'components/js/common.js'
	export default {
		components: { barAMap,barB1Map,barB2Map,barB3Map,barB4Map,lineAMap,qryTable},
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
				tableDataInterruptalarm:[
			 			 {
			 				 one:'电信一',
			 				 two:'100M',
			 				 three:'1ms',
			 				 four:'2017-06-03 13:00:35',
			 				 five:'2017-06-03 13:00:35',
			 			 },
			 			 {
			 				 one:'电信一',
			 				 two:'100M',
			 				 three:'1ms',
			 				 four:'2017-06-03 13:00:35',
			 				 five:'2017-06-03 13:00:35',
			 			 },
			 		     {
			 				 one:'电信一',
			 				 two:'100M',
			 				 three:'1ms',
			 				 four:'2017-06-03 13:00:35',
			 				 five:'2017-06-03 13:00:35',
			 			 },
			 			 {
			 				 one:'电信一',
			 				 two:'100M',
			 				 three:'1ms',
			 				 four:'2017-06-03 13:00:35',
			 				 five:'2017-06-03 13:00:35',
			 			 },
			 			 {
			 				 one:'电信一',
			 				 two:'100M',
			 				 three:'1ms',
			 				 four:'2017-06-03 13:00:35',
			 				 five:'2017-06-03 13:00:35',
			 			 },
			 		 ],

		}
	},
		computed:{
			...mapState({
				menuName:state=>state.context.menuName,
				qryTableName1:state=>state.context.qryTableName1,
				qryTableName2:state=>state.context.qryTableName2,
			})},

		methods:{

			handleClick(tab, event) {
				this.$store.state.context.params.event_type=tab.name;
				// this.$refs.totalHeatMap.loadMapChart();
			 },


			onSetting(){
				this.dialogVisible = true
			},
		  qryStatsReports(){
				//所有的图表子组件watch=>params,params改变则重新查询
				var MstartTime = commonAjax.formatDate(this.dateTime[0],"yyyy-MM-dd");
		    var MendTime = commonAjax.formatDate(this.dateTime[1],"yyyy-MM-dd");
				var start_date = new Date(MstartTime);//将字符串转化为时间
				var end_date = new Date(MendTime);//将字符串转化为时间
				var num = (end_date-start_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数
				console.log(num);
				if(num>30){
				this.$message.error({message:'时间范围最多只能为30天,请重新选择时间段！',duration:3000,showClose:true});
				}else{
         this.$store.dispatch('updateContextParams',this.dateTime);
			  }

			}
		},

		created: function() {

   },
	 mounted: async function() {

		this.$store.dispatch('loadListTypeList').then((data) => {
			this.$refs.barAMap.loadMapChart();
			this.$refs.barB1Map.loadMapChart();
     this.$refs.barB2Map.loadMapChart();
		 this.$refs.barB3Map.loadMapChart();
		 this.$refs.barB4Map.loadMapChart();
		 this.$refs.lineAMap.loadMapChart();


			// this.$store.dispatch('reloadTable',"qryTable");
		});


		var params =[] ;
		var data = await this.commonAjax.req("/ssa/netAttack/getEventTypeOnTab.do", params);

		var seriesData=[];
		for(var i = 0; i < data.length; i++){
			var dataUnit = data[i];
			var childData = {};
			childData.value=dataUnit.event_type;
			childData.name=dataUnit.name;
			seriesData.push(childData);
		};

		this.seriesData=seriesData;
    // console.log(seriesData);

		//日期切换
		 $(".scenario-tabs > li").click(function(){
				$(this).addClass("active").siblings("li").removeClass();
		 });



	 }

}
</script>
