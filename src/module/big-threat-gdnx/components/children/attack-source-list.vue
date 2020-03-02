<template>
	<div>
		<h4 class="el-panel-title" style="padding-left: 16px;"><i class="el-icon-caret-right m-r-10"></i>僵木蠕攻击源 TOP</h4>
		<div style="height: 300px;">
			<e-charts :options="options" auto-resize></e-charts>
		</div>
	</div>
</template>

<script>
	/**
	 * 僵木蠕攻击源 top
	 */
	import ECharts from "../../../commom/vue-echarts/ECharts.vue"

	export default {
		props: ["attackSourceTopList"],
		data() {
			return {
				options: null
			}
		},
		watch: {
			attackSourceTopList(newVal) {
				this.init(newVal)
			}
		},
		methods: {
			init(attackSourceTopList) {
				let xData = [];
				let yData = [];
				let maxdata = []
				let maxValue = 0
				for (let attackSource of attackSourceTopList) {
					xData.push(attackSource.event_total_count_sum);
					yData.push(attackSource.country + ' ' + attackSource.event_src_ip)
					if (attackSource.event_total_count_sum > maxValue) {
						maxValue = attackSource.event_total_count_sum;
					}
				}
				maxValue = (parseInt((maxValue / 10)) + 1) * 10
				for (let i = 0; i < attackSourceTopList.length; i++) {
					maxdata.push(maxValue)
				}
				this.options = {
					tooltip: {
						trigger: 'item',
						textStyle: {
							fontSize: 12,
						},
						formatter: "攻击源:{b} <br/>攻击数量：{c}"
					},
					grid: {
						top: '10%',
						left: '8%',
						right: '0%',
						bottom: '30',
						containLabel: false
					},
					xAxis: [{
						type: 'value',
						axisLine: { show: false },
						axisTick: { show: false },
						axisLabel: { show: false },
						splitLine: { show: false, },
					}],
					yAxis: [
						{
							type: 'category',
							data: yData,
							axisTick: { show: false },
							axisLine: { show: false },
							axisLabel: {
								color: '#9fa6c6',
								fontSize: '14',
								formatter: function (val) {
									return (val.length > 18 ? (val.slice(0, 17) + "...") : val);
								},
								inside: true,
								padding: [-50, 0, 10, -5]
							}
						},
						{
							type: 'category', //辅助x轴
							axisLine: { show: false },
							axisTick: { show: false },
							axisLabel: { show: false },
							splitArea: { show: false },
							splitLine: { show: false }
						}
					],
					series: [
						{
							name: '辅助',
							type: 'bar',
							barWidth: '20%',
							yAxisIndex: 1,
							itemStyle: {
								normal: {
									color: 'rgba(255, 255, 255,0.1)',
								},
								emphasis: {
									color: 'rgba(255, 255, 255,0.1)',
								}
							},
							label: {
								normal: {
									show: true,
									color: '#fff',
									fontSize: '14',
									position: 'insideRight',
									offset: [-5, -25],
									formatter: function (d) {
										return xData[d.dataIndex];
									}
								}
							},
							tooltip: { show: false },
							data: maxdata //背景值
						}, {
							name: '访问数',
							type: 'bar',
							color: ['#2281d9'],
							barWidth: '20%',
							data: xData,
							z: 10,
						}]
				}
			}
		},
		components: {
			ECharts,
		}
	}
</script>