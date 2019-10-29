<template>
<div class="wraper container-fluid">


	<div class="m-30">
					<el-row :gutter="20">
					<el-col :span="8">
					 <div class="el-panel el-panel-scenario">
							<div class="el-panel-heading"><p  style="color: #f8f8f8;!important">情报刺探－威胁等级</p></div>
						     	<pieAMap  style="width:100%" ref="pieAMap"></pieAMap>
						 </div>
						 <div class="el-panel el-panel-scenario">
							<div class="el-panel-heading"><p  style="color: #f8f8f8;!important">情报刺探－危险设备</p></div>
													<pieBMap  style="width:100%" ref="pieBMap"></pieBMap>
					 </div>
						<div class="el-panel el-panel-scenario">
							<div class="el-panel-heading"><p  style="color: #f8f8f8;!important">情报刺探－攻击次数</p></div>
												<barAMap  style="width:100%" ref="barAMap"></barAMap>
					 </div>
				 </el-col>

					 <el-col :span="16">
						 <div class="el-panel el-panel-scenario">
							 <ul class="scenario-tabs map_time">
								  <li class="active"><a href="#">今天</a></li>
								  <li><a href="#">近7天</a></li>
								  <li><a href="#">近30天</a></li>
						    </ul>
						 <div class="liuds_img3"></div>
					 </div>

					 <div class="el-panel el-panel-scenario">

									<!-- <div class="el-panel-heading"><p  style="color: #f8f8f8;!important">中断告警</p></div> -->
												<div class="el-panel-body">

<el-tabs type="card">
  <el-tab-pane label="侦查"></el-tab-pane>
  <el-tab-pane label="社会工程学"></el-tab-pane>
  <el-tab-pane label="WEB漏洞扫描"></el-tab-pane>
  <el-tab-pane label="网络钓鱼"></el-tab-pane>
	<el-tab-pane label="IP空间扫描"></el-tab-pane>
</el-tabs>
															<el-table :data="tableDataInterruptalarm" border style="width: 100%" class="dark-table">
								 <el-table-column prop="one" label="事件" align="center" show-overflow-tooltip="true"></el-table-column>
								 <el-table-column prop="two" label="威胁类型" align="center" show-overflow-tooltip="true"></el-table-column>
								 <el-table-column prop="three" label="等级" align="center" show-overflow-tooltip="true"></el-table-column>
								 <el-table-column prop="four" label="攻击者IP" align="center" show-overflow-tooltip="true"></el-table-column>
								 <el-table-column prop="five" label="目标IP" align="center"   show-overflow-tooltip="true"></el-table-column>
<el-table-column   label="端口" align="center"   show-overflow-tooltip="true">
<template   scope="scope"><div >50</div></template>
</el-table-column>
<!-- <el-table-column   label="提交方式" align="center"   show-overflow-tooltip="true">
<template   scope="scope"><div >GET</div></template>
</el-table-column> -->
<el-table-column prop="eight" label="威胁时间" align="center"  show-overflow-tooltip="true"></el-table-column>
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
	import pieAMap from './PieAMap.vue'
	import pieBMap from './PieBMap.vue'
	import qryTable from './QueryTable.vue'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
	import commonAjax from 'components/js/common.js'
	export default {
		components: { barAMap,pieAMap,pieBMap,qryTable},
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
				one:'侦查',
				two:'恶意程序',
				three:'高',
				four:'192.168.1.4',
				five:"192.168.1.1",
				eight:'2017-06-03 13:00:35',
			},
			{
				one:'侦查',
				two:'恶意程序',
				three:'中',
			four:'192.168.1.4',
			five:"192.168.1.1",
				eight:'2017-06-03 13:00:35',
			},
				{
				one:'侦查',
				two:'恶意程序',
				three:'低',
			four:'192.168.1.4',
			five:"192.168.1.1",
				eight:'2017-06-03 13:00:35',
			},
			{
				one:'侦查',
				two:'恶意程序',
				three:'高',
		four:'192.168.1.4',
		five:"192.168.1.1",
				eight:'2017-06-03 13:00:35',
			},
			{
				one:'侦查',
				two:'恶意程序',
				three:'中',
				four:'192.168.1.4',
				five:"192.168.1.1",
				eight:'2017-06-03 13:00:35',
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
			this.$refs.pieAMap.loadMapChart();
     this.$refs.pieBMap.loadMapChart();

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
