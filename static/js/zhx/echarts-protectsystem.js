$(document).ready(function () {
	'use strict';
	
	var myChart1 = echarts.init(document.getElementById('bar1'));
	var option1 ={
		color: ['#cce9c7','#8bd0d1', '#44b9d8', '#2d94c8','#276eb1','#171882'],
		backgroundColor: '#ffffff',
		tooltip: {
			trigger: 'item',
			backgroundColor:'#2d3031',
			formatter:'{a}策略{c}个: <br/>策略1<br/>策略2'
			
		},
		legend: {
			top: '0',
			left: 'center',
			itemWidth: 8,
			itemHeight: 8,
			itemGap: 35,
			textStyle: {
				color: '#3E4956',
				fontSize: 14,
			},
			data: [
				{
					name: '互斥',
					icon: 'circle'
				},{
					name: '可合并',
					icon: 'circle'
				},{
					name: '交叉',
					icon: 'circle'
				},{
					name: '非法',
					icon: 'circle'
				},{
					name: '宽松',
					icon: 'circle'
				},{
					name: '冗余',
					icon: 'circle'
				},
			 ]
		 },
		grid: {
			 top:'8%',
			 left: '2%',
			 right: '10%',
			 bottom: '0',
			 containLabel: true
		},
		xAxis:  {
	        type: 'value',
	        axisLine: {show: false},
			axisTick: {show: false},
			axisLabel: {show: false},
			splitLine: {show: false,},
	    },
	    yAxis: {
	        type: 'category',
	        axisLine: {show: false},
			axisTick: {show: false},
			axisLabel: {
				show: true,
				color:'#747a82',
				fontSize:'14',
				margin:20

			},
			splitLine: {show: false,},
	        data: ['策略9','策略8','策略7','策略6','策略5','策略4','策略3','策略2','策略1']
	    },
	    series: [
        {
            name: '互斥',
            type: 'bar',
            barWidth:'22',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: function (params) {
                        return params.value === 0 ? '':params.value;
                    }
                }
            },
            data: [0, 1, 0, 0, 0, 2, 0, 1, 1]
        },
        {
            name: '可合并',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: function (params) {
                      //  console.log(params.value);
                        return params.value === 0 ? '':params.value;
                    }
                }
            },
            data: [0, 0, 0, 0, 1, 0, 1, 2, 1]
        },
        {
            name: '交叉',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: function (params) {
                        return params.value === 0 ? '':params.value;
                    }
                }
            },
            data: [0, 0, 2, 1, 0, 0, 1, 0, 2]
        },
        {
            name: '非法',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: function (params) {
                        return params.value === 0 ? '':params.value;
                    }
                }
            },
            data: [0, 0, 0, 0, 1, 0, 0, 0, 1]
        },
        {
            name: '宽松',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: function (params) {
                        return params.value === 0 ? '':params.value;
                    }
                }
            },
            data: [0, 0, 0, 0, 0, 0, 1, 0, 0]
        },
        {
            name: '冗余',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: function (params) {
                        return params.value === 0 ? '':params.value;
                    }
                }
            },
            data: [1, 0, 0, 1, 0, 1, 0, 1, 1]
        }
    ]
	};
	myChart1.setOption(option1);


	var myChart2 = echarts.init(document.getElementById('bar2'));
	var option2 = {
			color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
				axisPointer : { type : 'shadow',},
				backgroundColor:'#2d3031',
			},
			grid: {
				top:'5%',
				left: '-10',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap: true,
					axisTick: { 
					    inside:true,
						alignWithLabel: true,//在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
					},
					axisLine:{show:false,},
					splitLine:{
						show: false,
						lineStyle:{
							color:'#e1e3e4',
							type:'solid'
						}
					},
					data : ['策略1', '策略2', '策略3', '策略4', '策略5', '策略6', '策略6', '策略8', '策略9', '策略10', '策略11', '策略12'],				
				}
			],
			yAxis : [
				{
					type : 'value',
					splitNumber:10,
					axisTick:{show:false},
 					axisLine:{show:false},
 					axisLabel:{show:false},
					splitLine:{ 
						show:true,
						lineStyle:{ 
							color:'#e1e3e4',
  						    type:'solid'
						},
				},	    
				}
			],
			series : [
				{

					name:'命中次数',
					type:'bar',
					barWidth: '28%',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    color:'#3e4956'
		                }
		            },
					data:[234, 198, 178, 136, 109,101,94,89,81,68,47,32 ]
				}
			]
	 };
	myChart2.setOption(option2);

	window.onresize = function() {
    	myChart1.resize();
   		myChart2.resize();
  	};
	
	
});