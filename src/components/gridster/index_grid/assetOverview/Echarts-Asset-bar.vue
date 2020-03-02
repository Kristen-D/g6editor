<template>
<div>
	<div style="height: 80px; ">
		<e-charts :options="option" auto-resize></e-charts>
	</div>
	<ul class="flex assetop-inner">
		<li>
			<p>{{dataCount.attackData}}</p>
			<p><span class="circle c1"></span><label>受攻击</label></p>
		</li>
		<li>
			<p>{{dataCount.treatData}}</p>
			<p><span class="circle c2"></span><label>受威胁</label></p>
		</li>
		<li>
			<p>{{dataCount.normalData}}</p>
			<p><span class="circle c3"></span><label>正常</label></p>
		</li>
	</ul>
</div>


</template>
<style scoped>
	
    .assetop-inner li{
	  	width: 32%;
	  	font-family: "Haettenschweiler";
	    border-right: 1px solid transparent;
	    text-align: center;
		border-image: -moz-linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
	    border-image: -webkit-linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
		border-image: -o-linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
	    border-image: linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
	}
	.assetop-inner li >p:first-child{ margin:auto auto 5px 10px; font-size: 20px; color: #3e4956;}
	.assetop-inner li:first-child{margin-left: 10px;}
	.assetop-inner li:last-child{ border:none; }

	.c1{background-color: #12cbf6}
	.c2{background-color: #3498db}
	.c3{background-color: #2ecc71}
</style>

<script type="text/javascript">

    import ECharts from "../../../vue-echarts/ECharts";
    // import {assetbarCategory} from "./ChartsOption.js"

	export default {
		props: ['data'],
		components: {
			ECharts,


		},

		data () {
			return {
				  option: {},
					configuration: this.data.json,
					dataCount:{}
			}
		},
		methods:{
			getInitData() {
	      this.common.req(this.configuration.dataUrl, {}, this).then((data) => {
					this.dataCount = data
	        this.loadMapChart(data);
	      })
	    },
			loadMapChart(data) {
				this.option={
				    color:['#12cbf6','#3498db','#2ecc71'],
				     title: {
				            left: 0,
				            top: "18%",
				            text:['{c|}' + '{d|受攻击资产TOP}'],
				            // text:[],
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
				    },
				    xAxis: {
				        type: 'value',
				        max:1000,
				        show: false,
				    },
				    yAxis: [{
				        type: 'category',
				        show: false,
				    },{
				         type: 'category',//辅助显示
				        show: false,
				    }
				    ],
				    grid: {
				        top: '40%',
				        left: '7%',
				        right: '0%',
				        bottom: '0%',
				        containLabel: false
				      },
				    series: [
							{
					        name: '辅助',
					        type: 'bar',
					        barWidth:'30%',
					        yAxisIndex: 1,
					        itemStyle: {
					          normal: {
					            color: 'rgba(229, 242, 253,0.5)',
					          },
					          emphasis: {
					            color: 'rgba(229, 242, 253,0.5)',
					          }
					        },
					        label: {
					          normal: {
					            show: false,
					          }
					        },
					        tooltip: {show: false},
					        data: [1000] //背景值

					    },
				    {
				        type: 'bar',
				        name: '受攻击',
				        data: [],
				        stack: '总量',
				        barWidth:'30%',
				        z: 10,
				    },
				    {
				        type: 'bar',
				        name: '受威胁',
				        data: [],
				        stack: '总量',
				        barWidth:'30%',
				        z: 10,
				    },
				    {
				        type: 'bar',
				        name: '正常',
				        data: [],
				        stack: '总量',
				        barWidth:'30%',
				        z: 10,
				    },


				    ]
				}
					if(this.configuration.name=="网络设备"){
						this.option.title.text =['{c|}' + '{d|网络设备}'];
					}else if(this.configuration.name=="安全设备"){
						this.option.title.text =['{c|}' + '{d|安全设备}'];
					}	else if(this.configuration.name=="终端设备"){
						this.option.title.text = ['{c|}' + '{d|终端设备}'];
					}	else if(this.configuration.name=="应用系统"){
						this.option.title.text = ['{c|}' + '{d|应用系统}'];
					}
					this.option.xAxis.max = data.attackData+data.treatData+data.normalData
					this.option.series[1].data =[data.attackData] ;
					this.option.series[2].data = [data.treatData];
					this.option.series[3].data = [data.normalData];



			},

		},
		created() {

		},
		mounted () {
			this.getInitData();
		}
	}
</script>
