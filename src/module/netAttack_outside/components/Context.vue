<template>
<div class="wraper container-fluid">
	<div class="m-30">
 				  <el-row :gutter="20">
 					  <el-col :span="17"  >
 				         <div class="el-panel el-panel-scenario">
 					     <div  class="el-panel-heading">
 							  <div class="el-panel-title" style="color: #f8f8f8;!important">网络攻击 — 外部攻击</div>
 						 </div>
 						 <el-row class="el-panel-body">
 					 	        <ul class="scenario-tabs map_time">
 								  <li @click="changeTime(1)"><a href="#">今天</a></li>
 								  <li @click="changeTime(2)"><a href="#">近7天</a></li>
 								  <li class="active" @click="changeTime(3)"><a href="#">近30天</a></li>
 						        </ul>
 						 	  <!-- <div class="mapBoxA" style="height:500px;!important" id="flowDayMapA"></div> -->
            <chinaMap ref="chinaMap"></chinaMap>
						 </el-row>
 						  </div>
 					  </el-col>
 					  <el-col :span="7">
 						  <div class="el-panel el-panel-scenario">
 							 <!-- <div class="right_t postion_r">
 					               <p class="wordA">89</p>
                                    <p>安全指数</p>
                                    <i class="fa fa-dashboard"></i>
                               </div> -->
                               <!-- <div class="right_c margin_t60" id="flowDayBarB"></div> -->
															 <!-- <div class="right_b margin_t60" id="flowDayBarA"></div>
														  -->
															 <threatTop5 ref="threatTop5"></threatTop5>
															  <ipPie ref="ipPie"></ipPie>
 						  </div>
 					  </el-col>
 				  </el-row>

 			  </div>


	</div>


</template>

<script>
	import {mapState } from 'vuex'
	import ipPie from './IpPie.vue'
	import threatTop5 from './ThreatTop5.vue'
	import chinaMap from './ChinaMap.vue'
	import draggable from 'vuedraggable'
	import jqJson from 'components/js/jquery.json.js'
	import commonAjax from 'components/js/common.js'
	export default {
		components: {ipPie,threatTop5,chinaMap},
		data(){
			return {

		}
	},
		computed:{
			...mapState({

			})},

		methods:{
			changeTime(value){
				if (value==1){
				this.$refs.chinaMap.loadMapChart("day");
				}else if(value==2){
				this.$refs.chinaMap.loadMapChart("week");
				}else if(value==3){
			   this.$refs.chinaMap.loadMapChart("month");
				}
			},

		},

		created: function() {

   },
	 mounted: async function() {

		this.$store.dispatch('loadListTypeList').then((data) => {

			this.$refs.threatTop5.loadMapChart();
      this.$refs.ipPie.loadMapChart();
			this.$refs.chinaMap.loadMapChart("month");

		// 	this.$refs.scatterAMap.loadMapChart();
    //  this.$refs.scatterBMap.loadMapChart();
		//  this.$refs.radarAMap.loadMapChart();

			// this.$store.dispatch('reloadTable',"qryTable");
		});


    // console.log(seriesData);
		//日期切换
		 $(".scenario-tabs > li").click(function(){
				$(this).addClass("active").siblings("li").removeClass();
		 });

	 }

}
</script>
