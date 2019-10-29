<template>
	<div style="height: 300px">
		<e-charts :options="option" auto-resize></e-charts>
	</div>

</template>

<script type="text/javascript">

    import ECharts from "../../../vue-echarts/ECharts";
    // import {radarCategory} from "./ChartsOption.js"

	export default {
		props: ['data'],
		components: {
			ECharts,
		},

		data () {
			return {
				  option: {},
					configuration: this.data.json
			}
		},
		methods:{
			getInitData() {
	      this.common.req(this.configuration.dataUrl, {}, this).then((data) => {
	        this.loadMapChart(data);
	      })
	    },
			loadMapChart(data) {
					this.option= {


					  title: {
					            left: 0,
					            top: "4%",
					            // text:['{c|}' + '{d|受攻击资产TOP}'],
					            text:[],
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
					                        color: '#3e4956',
					                        fontWeight:'bold',
					                        fontSize: 14,
					                        padding: [0, 0, 0, 10],
					                    },
					                }
					            },
					        },
					  tooltip: {
					        trigger: 'item',
					        backgroundColor: '#2d3031',
					        padding:10,
					      },
					      radar: {
					          // shape: 'circle',
					          center: ['50%','55%'],
					          radius: '46%',
					          indicator: [
					             // { name: '192.21.5.9',max: 14},


					          ],
					          splitLine:{
					            lineStyle:{color:'#e1e3e4'}
					          },
					          splitArea: {show: false },
					          axisLine:{ show:false},
					          name: {
					            formatter: function(value, indicator) {
					                return value;
					            },
					            textStyle: {
					                fontSize: 12,
					                fontFamily:'Helvetica',
					                color: '#3e4956'
					            }
					        },

					      },
					      series: {
					          name: '',
					          type: 'radar',
					          symbol: 'circle',
					          symbolSize:5,
					          lineStyle:{
					            normal:{
					              color:'#e1e3e4',
					              opacity:0.0
					            }
					          },
					          itemStyle: {
					                normal: {
					                  // color: '#12cbf6'
					                  color:''
					                }
					            },
					          areaStyle: {
					                normal: {opacity: 0.6}
					            },
					          data : [
					              {
					                  value : [],
					                  name : '',
					                  label:{
					                    normal:{
					                      show:false,
					                    }
					                  }
					              },
					          ],
					      }
					};
					if (this.configuration.name == "受攻击资产TOP") {
						this.option.title.text =['{c|}' + '{d|受攻击资产TOP}'];
						this.option.series.itemStyle.normal.color = '#12cbf6';
						this.option.series.name = "受攻击次数";
					} else if(this.configuration.name == "受威胁资产TOP") {
						this.option.title.text =['{c|}' + '{d|受威胁资产TOP}'];
						this.option.series.itemStyle.normal.color = '#3498db';
						this.option.series.name = "受威胁次数";
					}
					var indicatorData =data.indicatorList ;
					var valueData = data.valueList;

					if(indicatorData.length<5){
						if(indicatorData.length==0){
							for(var i = 0;i<5;i++){
									indicatorData.push({ name: 'N/A',max: 14})
							}
						}else {
							var maxValue = indicatorData[0].max ;
							for (var j = indicatorData.length; j < 5; j++) {
								indicatorData.push({ name: 'N/A',max: maxValue})
								valueData.push(0)
							}
						}
					}
					this.option.radar.indicator = indicatorData;
					this.option.series.data[0].value = valueData;
			},


		},
		created() {

		},
		mounted () {
			this.getInitData();
		}
	}
</script>
