<template>
	<div>
		<h4 class="el-panel-title"><i class="el-icon-caret-right m-r-10"></i>趋势</h4>
		<div style="height: 300px;">
			<e-charts :options="options" auto-resize></e-charts>
		</div>
	</div>
</template>

<script>
	/**
	 * 趋势
	 */
	import ECharts from "../../../commom/vue-echarts/ECharts.vue"
	import { formatDate } from "../../service/date.js"
	const X_LENGTH = 7;
	export default {
		props: ["threatTrendList"],
		data() {
			return {
				options: null,
				color: ["rgba(108,135,237,0.8)", "rgba(18,203,246,0.8)",
					"rgba(6,82,221,0.8)", "rgba(46,204,113,0.8)"],
				xData: [],
			}
		},
		watch: {
			threatTrendList(newVal) {
				this.init(newVal);
			}
		},
		created() {
			for (let i = X_LENGTH - 1; i >= 0; i--) {
				this.xData.push(this.getDateStr(i, "MM.dd"))
			}
			this.init(this.threatTrendList)
		},
		methods: {
			init(threatTrendList) {
				if (threatTrendList == null || threatTrendList.length == 0) {
					return;
				}
				let legendData = [{ name: "总数", icon: "rec" }]
				for (let threatTrend of threatTrendList) {
					legendData.push({ name: threatTrend.event_subtype_name, icon: "rec" })
				}

				let series = [];
				for (let i = 0; i < threatTrendList.length; i++) {
					let threatTrend = threatTrendList[i];
					let yData = [];
					threatTrend.map = this.toMap(threatTrend.list);

					for (let j = X_LENGTH - 1; j >= 0; j--) {
						yData.push(threatTrend.map[this.getDateStr(j, "yyyyMMdd")] || 0);
					}
					series.push({
						name: threatTrend.event_subtype_name,
						type: 'line',
						// stack: '总量',
						symbol: 'none',
						areaStyle: {
							normal: {
								color: this.color[i]
							}
						},
						data: yData
					})
				}

				series.push({
					name: '总数',
					type: 'line',
					// stack: '总量',
					smooth: false,
					symbol: 'none',
					symbolSize: 6,
					data: []
				})


				let lastSeries = series[series.length - 1];
				for (let i = X_LENGTH - 1; i >= 0; i--) {
					let sum = 0;
					let dateStr = this.getDateStr(i, "yyyyMMdd")
					for (let threatTrend of threatTrendList) {
						sum += threatTrend.map[dateStr] || 0;
					}
					lastSeries.data.push(sum)
				}

				this.options = {
					color: ['rgba(108,135,237,0.8)', 'rgba(18,203,246,0.8)', 'rgba(6,82,221,0.8)', 'rgba(46,204,113,0.8)', '#ffdd3f'],
					tooltip: {
						trigger: 'axis',
					},
					legend: {
						bottom: '7%',
						left: 'center',
						itemWidth: 10,
						itemHeight: 10,
						itemGap: 20,
						textStyle: {
							color: '#9fa6c6',
							fontSize: 14,
						},
						data: legendData
					},
					grid: {
						top: '10%',
						left: '3%',
						right: '0%',
						bottom: '20%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						axisLine: {
							show: false,
						},
						axisLabel: {
							textStyle: {
								color: '#9fa6c6',
							},
						},
						axisTick: { show: false, },
						data: this.xData,
					}],
					yAxis: [{
						type: 'value',
						splitNumber: 5,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#27377f'
							}
						},
						axisLine: { show: false, },
						axisLabel: {
							textStyle: {
								color: '#9fa6c6'
							},
						},
						axisTick: { show: false, },
					}],
					series: series
				}
			},
			toMap(list) {
				let map = {};
				if (list == null) {
					return map;
				}
				for (let l of list) {
					map[l.event_report_date] = l.event_total_count_sum;
				}
				return map;
			},
			getDateStr(i, foramt) {
				let date = new Date();
				date.setDate(date.getDate() - i);
				let dateStr = formatDate(date, foramt);
				return dateStr
			}
		},
		components: {
			ECharts,
		},
	}
</script>