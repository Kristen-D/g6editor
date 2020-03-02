<template>
					<section >
				    <div class="container-fluid">
							    <!-- <div class="top-breadcrumb">
											<el-breadcrumb separator="/">
												  <el-breadcrumb-item>态势场景</el-breadcrumb-item>
												  <el-breadcrumb-item>暴力破解</el-breadcrumb-item>
											</el-breadcrumb>
									</div> -->
									<!-- 各攻击阶段的视图 -->
									<eventAttackPhase  style="width:100%" ref="eventAttackPhase"></eventAttackPhase>
								<el-row :gutter="16">
										<el-col :span="8">
											<chinaMap  ref="chinaMap"></chinaMap>
										</el-col>
										<el-col :span="16">
												<!-- 撞库趋势中的饼图与折线图 -->
												<trendPieAndLine   ref=""></trendPieAndLine>
												<!-- 撞库类型中的折线图 是已挽回数据-->
											  <typeLineRedeem   ref=""></typeLineRedeem>
										</el-col>
								</el-row>

								<el-row :gutter="16">
											<el-col :span="12">
														<!-- 高危IP折线图 -->
														<highIpBar   ref="highIpBar"></highIpBar>
											</el-col>
											<el-col :span="12">
														<!-- 高危账户表格 -->
														<!-- <highAccountTable   ref="highAccountLine"></highAccountTable> -->
														<!-- 高危账户柱状图 -->
														<highAccountBar   ref="highAccountBar"></highAccountBar>
											</el-col>
								</el-row>
					 </div>
				</section>


</template>

<script>
	import {mapState } from 'vuex'
	import chinaMap from './ChinaMap.vue'
	import EventAttackPhase from './EventAttackPhase.vue'
	import trendPieAndLine from './TrendPieAndLine.vue'
	import highIpBar from './HighIpBar.vue'
	import typeLineRedeem from './TypeLineRedeem.vue'
	import highAccountTable from './HighAccountTable.vue'
	import highAccountBar from './HighAccountBar.vue'
	import commonAjax from 'components/js/common.js'
	export default {
		components: {chinaMap,EventAttackPhase,trendPieAndLine,highIpBar,typeLineRedeem,highAccountTable,highAccountBar},
		data(){
			return {


		}
	},
		computed:{
			...mapState({

			})},

		methods:{


		},

		created: function() {

   },
	 mounted: async function() {



	 }

}
</script>
