<template>
	<div class="black-gdnx">
		<section style="margin:45px 20px 20px 40px;">
			<el-row :gutter="40">
				<el-col :span="18" class="box">
					<span class="box-tl"></span><span class="box-br"></span>
					<div class="flexCenter" style="height: 100px;">
						<ul class="count">
							<li>
								<label>一周累计发现</label>
								<span v-for="n in threatCountOneWeek">{{n}}</span>
							</li>
							<li>
								<label>当天新增威胁</label>
								<span v-for="n in threatCountToday">{{n}}</span>
							</li>
							<li>
								<label>当天新增告警</label>
								<span v-for="n in alarmCountToday">{{n}}</span>
							</li>
						</ul>
					</div>
					<ul class="flexBetween m-a-20">
						<li v-for="threat in threatList" :key="threat.event_subtype_name" class="box sbox attacktype">
							<span class="box-tl sbox-stl"></span><span class="box-br sbox-br"></span>
							<div style="height: 246px;">
								<threat :threat="threat" @openRiskListDlg="openRiskListDlg"></threat>
							</div>
						</li>
					</ul>
				</el-col>
				<el-col :span="6">
					<asset-attack-top-list :assetAttackTopList="assetAttackTopList"></asset-attack-top-list>
					<org-attack-top-list :orgAttackTopList="orgAttackTopList"></org-attack-top-list>
				</el-col>
			</el-row>
			<el-row :gutter="20" style="margin-top: 30px;">
				<el-col :span="9" style="padding-left: 0">
					<h4 class="el-panel-title m-l--16"><i class="el-icon-caret-right m-r-10"></i>最新告警事件</h4>
					<alarm-info-list style="margin-top: 20px;" :alarmInfoTopList="alarmInfoTopList" @openAlarmDetail="openAlarmDetail"></alarm-info-list>
				</el-col>
				<el-col :span="9">
					<threat-trend :threatTrendList="threatTrendList"></threat-trend>
				</el-col>
				<el-col :span="6">
					<attack-source-list :attackSourceTopList="attackSourceTopList"></attack-source-list>
				</el-col>
			</el-row>
		</section>
		<el-dialog title="告警事件详情" :visible.sync="alarmInfoDlg" class="dialog-GDNX">
			<alarm-info-detail :alarmInfo="alarmInfo"></alarm-info-detail>
		</el-dialog>

		<el-dialog title="详情" :visible.sync="threatDlg" class="dialog-GDNX">
			<threat-risk-detail :threatRiskPage="threatRiskPage" @riskPageChange="riskPageChange"></threat-risk-detail>
		</el-dialog>
	</div>
</template>

<script>
	import threat from './children/threat.vue'
	import threatTrend from "./children/threat-trend.vue"
	import attackSourceList from "./children/attack-source-list.vue"
	import assetAttackTopList from "./children/asset-attack-top-list.vue"
	import orgAttackTopList from './children/org-attack-top-list.vue'

	import alarmInfoList from "./children/alarm-info-list.vue"
	import alarmInfoDetail from './children/alarm-info-detail.vue'
	import threatRiskDetail from './children/threat-risk-detail.vue'

	import { getData, getAlarmInfo, getThreatByEventsubtypeAndRisk } from "../service/getData.js"


	export default {
		name: "container",
		data() {
			return {
				threatCountOneWeek: [0],// 一周累计发现威胁数
				threatCountToday: [0], // 今天累计发现威胁数
				alarmCountToday: [0], //今天新增告警数
				threatList: [], // 威胁列表
				assetAttackTopList: [], // 受攻击资源top
				orgAttackTopList: [], // 受攻击单位top
				alarmInfoTopList: [], // 最新告警
				attackSourceTopList: [], // 僵木蠕攻击源 TOP
				threatTrendList: [], // 趋势
				alarmInfo: {}, // 告警事件详情
				alarmInfoDlg: false,// 告警事件详情对话框
				threatDlg: false,
				threatRiskPage: {},
				threatRiskParams: {},
			}
		},
		created() {
			this.fetchData();
			window.fetchData = [this.fetchData];
		},
		methods: {
			async fetchData() {
				let result = await getData()
				if (result.state) {
					let data = result.data;
					this.alarmInfoTopList = data.alarmInfoTopList;
					this.assetAttackTopList = data.assetAttackTopList;
					this.threatList = data.threatList;
					this.orgAttackTopList = data.orgAttackTopList;
					this.attackSourceTopList = data.attackSourceTopList;
					this.threatTrendList = data.threatTrendList;
					this.threatCountOneWeek = this.numToArray(data.threatCountOneWeek);
					this.threatCountToday = this.numToArray(data.threatCountToday);
					this.alarmCountToday = this.numToArray(data.alarmCountToday);
				}
			},
			/**
			 * 打开告警事件详情对话框
			 */
			async openAlarmDetail(alarmId) {
				let result = await getAlarmInfo(alarmId)
				if (result.state) {
					this.alarmInfoDlg = true;
					this.alarmInfo = result.data;
				}
			},
			async openRiskListDlg(params) {
				let result = await getThreatByEventsubtypeAndRisk(params);
				if (result.state) {
					this.threatDlg = true;
					this.threatRiskPage = result.data;
					this.threatRiskParams = params;
				}
			},
			async riskPageChange(pageIndex) {
				this.threatRiskParams.pageIndex = pageIndex;
				let result = await getThreatByEventsubtypeAndRisk(this.threatRiskParams);
				if (result.state) {
					this.threatRiskPage = result.data;
				}
			},
			numToArray(num) {
				let array = [num % 10];
				let n = 0;
				while ((num = parseInt(num / 10)) != 0) {
					array.splice(0, 0, num % 10);
				}
				return array;
			}
		},
		components: {
			threat,
			assetAttackTopList,
			orgAttackTopList,
			attackSourceList,
			alarmInfoList,
			alarmInfoDetail,
			threatTrend,
			threatRiskDetail
		}
	}

</script>

<style scoped>
	.attacktype {
		margin-bottom: 30px;
		width: 48.6%;
	}

	.flexBetween {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		flex-flow: row wrap;
	}

	ul.count li {
		float: left;
		text-align: center;
		font-size: 14px;
		margin: 0 28px;
		display: flex;
		align-items: center;
	}

	ul.count li label {
		font-size: 18px;
		margin-right: 15px
	}

	ul.count li span {
		margin-right: 5px;
		font-size: 32px;
		border: 2px solid #0b3883;
		height: 44px;
		width: 38px;
		line-height: 44px;
	}
</style>
