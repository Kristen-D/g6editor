<template>
<div class="wraper container-fluid">




	<!-- <div class="row">
	<div class="col-lg-12 col-md-12 col-sm-12">
		<div class="panel panel-default bg-panel">
		                	<div class="panel-heading">
		                    	事件趋势
		                     </div>
		                    <div class="panel-body">
		                  		<realTimeDataMap  style="width:100%;"></realTimeDataMap>
		                    </div>
	  </div>
	</div>
	</div> -->


	<div class="m-30">
			     <el-row :gutter="20" >
                      <el-col :span="5">
                          <div class="right_t postion_r i2">
					           <p class="wordA font_b">0</p>
							   <p>安全评价指标</p>
							   <i class="fa fa-dashboard"></i>
                          </div>
                          	<barAMap  style="width:100%" ref="barAMap"></barAMap>
                      </el-col>
                      <el-col :span="13">
                          <div class="p_img_cont">
                               <span class="pos_leftA"><p class="font_12">短时间多IP登录</p><p>0 个</p></span>
                               <span class="pos_leftB"><p class="font_12">绕行</p><p>0个</p></span>
                               <span class="pos_leftC"><p class="font_12">非工作时间访问</p><p>0 个</p></span>
                               <span class="pos_rightA"><p class="font_12">短时间多终端登录</p><p>0个</p></span>
                               <span class="pos_rightB"><p class="font_12">短时间异地登录</p><p>0 个</p></span>
                               <!-- <span class="pos_rightC"><p class="font_12">常用登录IP</p><p>192.168.3.4</p></span> -->
                          </div>
                      </el-col>
                      <el-col :span="6">
                          <div class="postion_r">
                            <!-- <ul class="clearfloat scenario-tabs map_time">
								  <li class="active"><a href="#">今天</a></li>
								  <li><a href="#">近7天</a></li>
								  <li><a href="#">近30天</a></li>
						    </ul> -->

								<ul class="scenario-tabs map_time">
 								  <li class="active"><a href="#">今天</a></li>
 								  <li><a href="#">近7天</a></li>
 								  <li><a href="#">近30天</a></li>
 						    </ul>
                          	<scatterAMap  style="width:100%" ref="scatterAMap"></scatterAMap>
                           <scatterBMap  style="width:100%" ref="scatterBMap"></scatterBMap>
                         </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="25">
                      <el-col :span="6"> <radarAMap  style="width:100%" ref="radarAMap"></radarAMap></el-col>
                      <el-col :span="12">
						 <div class="el-panel-heading"><p  style="color: #f8f8f8;!important">异常登录IP</p></div>
            			 <div class="el-panel-body">
                          <el-table :data="tableData2" border style="width: 100%" class="dark-table">
								<!-- <el-table-column prop="IPnormal" label="正常IP" align="center" show-overflow-tooltip="true"></el-table-column> -->
								<!-- <el-table-column prop="Addnormal" label="正常地址" align="center" show-overflow-tooltip="true"></el-table-column> -->
								<el-table-column prop="IPabnormal" label="异常IP" align="center" show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="Addabnormal" label="异常地址" align="center" show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="Happenunit" label="事发单位" align="center" show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="Account" label="账户" align="center" width="80" show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="Timeabnormal" label="异常时间" align="center" width="200" show-overflow-tooltip="true"></el-table-column>
						   </el-table>
						  </div>
                      </el-col>
                      <el-col :span="6">
						  <div class="el-panel-heading"><p  style="color: #f8f8f8;!important">异常登录单位top5</p></div>
                		  <div class="el-panel-body">
                      		 <el-table :data="tableData3" border style="width: 100%" class="dark-table">
								<el-table-column prop="Unit" label="单位部门" align="center" show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="No" label="次数" align="center" width="70"></el-table-column>
						      </el-table>
						  </div>
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
			// 	{
			// 	IPnormal: '192.168.32.16',
			// 	Addnormal:'晋安区',
			// 	IPabnormal:'192.168.32.11',
			// 	Addabnormal:'晋安区',
			// 	Happenunit:'中国核工业集团',
			// 	Account:'admin',
			// 	Timeabnormal:'2017/04/09 11：49：12'
			// },
			// 	{
			// 		IPnormal: '192.168.32.16',
			// 		Addnormal:'晋安区',
			// 		IPabnormal:'192.168.32.11',
			// 		Addabnormal:'晋安区',
			// 		Happenunit:'中国核工业集团',
			// 		Account:'admin',
			// 		Timeabnormal:'2017/04/09 11：49：12'
			// 	},
			// 	{
			// 		IPnormal: '192.168.32.16',
			// 		Addnormal:'晋安区',
			// 		IPabnormal:'192.168.32.11',
			// 		Addabnormal:'晋安区',
			// 		Happenunit:'中国核工业集团',
			// 		Account:'admin',
			// 		Timeabnormal:'2017/04/09 11：49：12'
			// 	},
			// 	{
			// 		IPnormal: '192.168.32.16',
			// 		Addnormal:'晋安区',
			// 		IPabnormal:'192.168.32.11',
			// 		Addabnormal:'晋安区',
			// 		Happenunit:'中国核工业集团',
			// 		Account:'admin',
			// 		Timeabnormal:'2017/04/09 11：49：12'
			// 	},
			// 	{
			// 		IPnormal: '192.168.32.16',
			// 		Addnormal:'晋安区',
			// 		IPabnormal:'192.168.32.11',
			// 		Addabnormal:'晋安区',
			// 		Happenunit:'中国核工业集团',
			// 		Account:'admin',
			// 		Timeabnormal:'2017/04/09 11：49：12'
			// 	},


		],

		tableData3: [
	// 	{
	// 		Unit: '中国核工业集团',
	// 		No:'32',
	//
	// 	},
	// 		{
	// 	Unit: '中国核工业集团',
	// 	No:'32',
	//
	// },
	// 		{
	// 	Unit: '中国核工业集团',
	// 	No:'32',
	//
	// },
	// 		{
	// 	Unit: '中国核工业集团',
	// 	No:'32',
	//
	// },
	// 		{
	// 	Unit: '中国核工业集团',
	// 	No:'32',
	//
	// },
]

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
			this.$refs.scatterAMap.loadMapChart();
     this.$refs.scatterBMap.loadMapChart();
		 this.$refs.radarAMap.loadMapChart();

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
