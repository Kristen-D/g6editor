<template>

	<e-charts :options="options" auto-resize @chartclick="chartclick"></e-charts>

</template>

<script>
	import ECharts from "../../../commom/vue-echarts/ECharts.vue"

	const darkBlue = {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: 'rgba(255, 255, 255, 0.8)' // 0% 处的颜色
		},
		{
			offset: 0.5,
			color: 'rgba(255, 255, 255, 0.5)' // 0% 处的颜色
		},
		{
			offset: 1,
			color: 'rgba(0, 192, 255, 0.1)' // 100% 处的颜色
		}
		],
		globalCoord: false // 缺省为 false
	}
	const lightBlue = {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: 'rgba(255, 255, 255, 1)' // 0% 处的颜色
		},
		{
			offset: 0.5,
			color: 'rgba(255, 255, 255, 0.8)' // 0% 处的颜色
		},
		{
			offset: 1,
			color: 'rgba(0, 192, 255, 0.7)' // 100% 处的颜色
		}
		],
		globalCoord: false // 缺省为 false
	};

	const riskColor = {
		3: "#ff2a00",
		2: "#ff8400",
		1: "#ffdd3f"
	};

	export default {
		props: ["threat"],
		components: {
			ECharts,
		},
		data() {
			return {
				options: null
			}
		},
		created() {
			this.init(this.threat);
		},
		methods: {
			chartclick(options) {
				if (options.seriesName == "风险等级") {
					let risk = 0;
					switch (options.name) {
						case "高危":
							risk = 3;
							break;
						case "中危":
							risk = 2;
							break;
						case "低危":
							risk = 1;
							break;
					}
					this.$emit("openRiskListDlg", { risk, eventSubtype: this.threat.event_subtype })
				}
			},
			init(threat) {
				let title = `{c|}{d|${threat.event_subtype_name}}`;

				let riskData = [];

				let color = [];

				if (threat.riskList != null) {
					for (let risk of threat.riskList) {
						color.push(riskColor[risk.risk]);
						riskData.push({
							value: risk.event_total_count_sum,
							name: risk.risk_name
						});
					}
				}

				let eventThreeTypeXData = [];
				let eventThreeTypeYData = [];
				if (threat.eventThreeTypeList != null) {
					for (let eventThreeType of threat.eventThreeTypeList) {
						eventThreeTypeXData.push(eventThreeType.event_three_type_name);
						eventThreeTypeYData.push(eventThreeType.event_total_count_sum);
					}
				}


				let subTitle = `{a|威胁总数}{b|${threat.threat_count}}\n{c|涉及资产}{d|${threat.asset_count}}`;


				this.options = {
					color,
					backgroundColor: "#0c2170",
					title: [{
						left: 10,
						top: "4%",
						text: [title],
						textStyle: {
							rich: {
								c: {
									color: '#2196f3',
									fontSize: 20,
									fontWeight: 'bold',
									width: 4,
									height: 15,
									backgroundColor: '#2196f3',

								},
								d: {
									color: '#fff',
									fontSize: 15,
									padding: [0, 0, 0, 10],
								},
							}
						},
					},
					{
						left: '6%',
						bottom: '4%',
						text: [subTitle],
						textStyle: {
							rich: {
								a: {
									color: '#eff0f5',
									fontSize: 14,
									width: 70,
									lineHeight: 35
								},
								b: {
									color: '#fff',
									fontSize: 20,
								},
								c: {
									color: '#eff0f5',
									fontSize: 14,
									fontWeight: 500,
									width: 70,
								},
								d: {
									color: '#fff',
									fontSize: 20,
									fontWeight: 500,
								},
							}
						},
					},
					],
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} "
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						min: -1,
						max: 5,
						// interval:0,
						axisLine: {
							show: false,
							lineStyle: {
								color: '#4bbbf8',
								shadowColor: 'rgba(75, 211, 255, 0.5)',
								shadowBlur: 5
							}
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							color: '#9fa6c6',
							fontSize: 14,
							interval: 0,
							formatter (value) {
								if(value == null){
									return value;
								}
								var ret = "";//拼接加\n返回的类目项
								var maxLength = 4;//每项显示文字个数
								var valLength = value.length;//X轴类目项的文字个数
								var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
								if (rowN > 1)//如果类目项的文字大于3,
								{
									for (var i = 0; i < rowN; i++) {
										var temp = "";//每次截取的字符串
										var start = i * maxLength;//开始截取的位置
										var end = start + maxLength;//结束截取的位置
										//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
										temp = value.substring(start, end) + "\n";
										ret += temp; //凭借最终的字符串
									}
									return ret;
								}
								else {
									return value;
								}
							}
						},
						splitLine: {
							show: false
						},
						data: eventThreeTypeXData
					},
					yAxis: [{
						min: 0,
						max: 50,
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisLabel: {
							color: '#9fa6c6',
							fontSize: 14,
						},
						splitLine: {
							lineStyle: {
								color: "#27377f"
							}
						},
					}],
					grid: {
						top: '18%',
						bottom: '3%',
						left: '30%',
						right: 40,
						containLabel: true
					},
					series: [
						{
							name: '风险等级',
							type: 'pie',
							radius: ['26%', '44%'],
							center: ['15%', '45%'],
							roseType: 'radius',
							label: {
								normal: {
									show: false
								}
							},
							lableLine: {
								normal: {
									show: false
								}
							},
							data: riskData
						},
						{
							name: '数量',
							type: 'pictorialBar',
							barCategoryGap: '-60%',
							symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
							label: {
								show: true,
								position: 'top',
								color: '#fff',
								fontSize: 14
							},
							itemStyle: {
								color: function (params) {
									return params.dataIndex % 2 ? lightBlue : darkBlue;
								}
							},
							data: eventThreeTypeYData
						}
					]
				};
				this.options.series[1].itemStyle.color = function (params) {
					return params.dataIndex % 2 ? lightBlue : darkBlue;
				};
				// text: ['{c|}' + '{d|僵尸网络}'], data: ['Agobot', 'Phatbot', 'GT-Bots', 'XtremBot', 'SDBot'] 
			},
			getInitData() {
				let obj = JSON.stringify(this.options);
				this.options = JSON.parse(obj);

				this.options.title[0].text = this.attacktype.text;
				this.options.xAxis.data = this.attacktype.data;
				//color是一个函数，stringify解析不了，需要重新写
				this.options.series[1].itemStyle.color = function (params) {
					return params.dataIndex % 2 ? lightBlue : darkBlue;
				};
			}
		},
	}
</script>