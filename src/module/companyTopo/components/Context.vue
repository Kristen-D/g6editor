<template>
<div class="wraper container-fluid">



	<div class="m-30">
 			      <el-row style="margin-top:30px">
 			          <el-col :span="24">
 					  <el-form :inline="true" class="demo-form-inline">
                          <el-form-item class="scenario-form-item">
                              <el-select placeholder="网络攻击">
 							     <el-option label="区域一" value="1"></el-option>
 							     <el-option label="区域二" value="2"></el-option>
 							 </el-select>
                          </el-form-item>
 						  <el-form-item class="scenario-form-item">
 							<el-select placeholder="漏洞攻击">
 							    <el-option label="区域一" value="1"></el-option>
 							    <el-option label="区域二" value="2"></el-option>
 							</el-select>
 						  </el-form-item>
 						  <el-form-item class="scenario-form-item">
 							<el-select  placeholder="SQL注入">
 							    <el-option style="backgrouond-color:red;" label="区域一" value="1"></el-option>
 							    <el-option label="区域二" value="2"></el-option>
 							</el-select>
 						  </el-form-item>
 						  <el-form-item class="scenario-form-item">
 							    <el-date-picker type="month" placeholder="选择月"></el-date-picker>
 						  </el-form-item>
 						   <el-form-item>
 							    <el-button type="primary" style="vertical-align: middle;">搜索</el-button>
 						  </el-form-item>
 						</el-form>
 					  </el-col>
 				  </el-row>
 				  <el-row>
 					  <el-col :span="24">
 						  <div style="margin-top: 20px"><i class="attack-path"></i><span style="color: rgb(248, 248, 248);">攻击路径</span></div>
 						  <div><img src="/static/images/companyTopo.png" alt="img"></div>
							
 					  </el-col>
 				  </el-row>
 			  </div>

	</div>


</template>

<script>
	import {mapState } from 'vuex'
	import barAMap from './BarAMap.vue'
	import radarAMap from './RadarAMap.vue'
	import scatterAMap from './ScatterAMap.vue'
	import scatterBMap from './ScatterBMap.vue'
	import qryTable from './QueryTable.vue'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
	import commonAjax from 'components/js/common.js'
	export default {
		components: { barAMap,radarAMap,scatterAMap,scatterBMap,qryTable},
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
				tableData1: [
		{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
		{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
		{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
			{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
		{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
			{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
		{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
			{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
		{
			Num: '103304',
			Level:'一级',
			Type:'网络攻击',
			Subclass:'DNS域名攻击',
			State:'待处置',
			Time:'2017/04/09 11：49：12',
			Operate:'查看'
		},
		],

			tableData2: [
				{
				IPnormal: '192.168.32.16',
				Addnormal:'晋安区',
				IPabnormal:'192.168.32.11',
				Addabnormal:'晋安区',
				Happenunit:'中国核工业集团',
				Account:'admin',
				Timeabnormal:'2017/04/09 11：49：12'
			},
				{
					IPnormal: '192.168.32.16',
					Addnormal:'晋安区',
					IPabnormal:'192.168.32.11',
					Addabnormal:'晋安区',
					Happenunit:'中国核工业集团',
					Account:'admin',
					Timeabnormal:'2017/04/09 11：49：12'
				},
				{
					IPnormal: '192.168.32.16',
					Addnormal:'晋安区',
					IPabnormal:'192.168.32.11',
					Addabnormal:'晋安区',
					Happenunit:'中国核工业集团',
					Account:'admin',
					Timeabnormal:'2017/04/09 11：49：12'
				},
				{
					IPnormal: '192.168.32.16',
					Addnormal:'晋安区',
					IPabnormal:'192.168.32.11',
					Addabnormal:'晋安区',
					Happenunit:'中国核工业集团',
					Account:'admin',
					Timeabnormal:'2017/04/09 11：49：12'
				},
				{
					IPnormal: '192.168.32.16',
					Addnormal:'晋安区',
					IPabnormal:'192.168.32.11',
					Addabnormal:'晋安区',
					Happenunit:'中国核工业集团',
					Account:'admin',
					Timeabnormal:'2017/04/09 11：49：12'
				},


		],

		tableData3: [
		{
			Unit: '中国核工业集团',
			No:'32',

		},
			{
		Unit: '中国核工业集团',
		No:'32',

	},
			{
		Unit: '中国核工业集团',
		No:'32',

	},
			{
		Unit: '中国核工业集团',
		No:'32',

	},
			{
		Unit: '中国核工业集团',
		No:'32',

	},]

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
		// 	this.$refs.barAMap.loadMapChart();
		// 	this.$refs.scatterAMap.loadMapChart();
    //  this.$refs.scatterBMap.loadMapChart();
		//  this.$refs.radarAMap.loadMapChart();

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


	 }

}
</script>
