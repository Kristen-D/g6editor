// JavaScript Document

$(document).ready(function() {
	'use strict';
var flowrate = [
    {
        "value": 7,
        "date": "3.21",
        "l": 0,
        "u": 17
    },
    {
        "value": 14.5,
        "date": "3.22",
        "l": 12.8,
        "u": 15.5
    },
    {
        "value": 13.5,
        "date": "3.23",
        "l": 13,
        "u": 14
    },
    {
        "value": 18.5,
        "date": "3.24",
        "l": 16,
        "u": 19.5
    },
    {
        "value": 13,
        "date": "3.25",
        "l": 11,
        "u": 15
    },
    {
        "value": 13.5,
        "date": "3.26",
        "l": 12.8,
        "u": 15
    },
    {
        "value": 19,
        "date": "3.27",
        "l": 18,
        "u": 19
    }
];
var base = -flowrate.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
var myChart1 = echarts.init(document.getElementById('netflow'));
var option1 = {
       
        tooltip: {
            trigger: 'axis',
            backgroundColor:'#2d3031',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: function (params) {
                return params[2].name + '<br />' + params[2].value;
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            top: '10%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: flowrate.map(function (item) {
                return item.date;
            }),
            axisLabel: {color:'#3e4956', margin:15,fontSize:14},
            axisTick: { show:false},
            splitLine: {show: false},
            axisLine: {
            	show: true,
            	lineStyle:{color:'#e1e3e4'}
            },
            boundaryGap: false,
           
        },
        yAxis: {
            axisLabel: {
                formatter: function (val) {
					return val - base;
                }, 
                color:'#3e4956',
                margin:15
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
						return params.value - base;
                    }
                }
            },
            splitNumber: 4,
           // interval:5,
            axisTick: { show:false},
            splitLine: {
            	show: true,
            	lineStyle:{color:'#e1e3e4'}
            },
            axisLine: {show: false},
        },
        series: [{
            name: 'L',
            type: 'line',
            data: flowrate.map(function (item) {
                return item.l + base;
            }),
            lineStyle: {
                normal: {
                    opacity: 0
                }
            },
            stack: 'confidence-band',
            symbol: 'none'
        }, {
            name: 'U',
            type: 'line',
            data: flowrate.map(function (item) {
                return item.u - item.l;
            }),
            lineStyle: {
                normal: {
                    opacity: 0
                }
            },
            areaStyle: {
                normal: {
                    color: '#ccc'
                }
            },
            stack: 'confidence-band',
            symbol: 'none'
        }, {
            type: 'line',
            data: flowrate.map(function (item) {
                return item.value + base;
            }),
            hoverAnimation: false,
            symbolSize: 6,
            itemStyle: {
                normal: {
                    color: '#c23531'
                }
            },
            showSymbol: false
        }]
    };
    
myChart1.setOption(option1);

var myChart2 = echarts.init(document.getElementById('bar1'));
var option2 = {
    color: ['#82d075'],
			tooltip : {
				trigger: 'axis',
                backgroundColor:'#2d3031',
				axisPointer : { type : 'shadow',}
			},
			grid: {
				top:'6%',
				left: '-2%',
				right: '2%',
				bottom: '6%',
				containLabel: true,
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap: true,
                    axisLabel:{
                        show:true,
                        color:'#3e4956', 
                        margin:10,
                        fontSize:12
                    },
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
					data : ['协议1', '协议2', '协议3', '协议4', '协议5', '协议6', '协议7', '协议8', '协议9', '协议10', '协议11', '协议12'],				
				}
			],
			yAxis : [
				{
					type : 'value',
					splitNumber:9,
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
					data:[196, 185, 178, 136, 109,101,94,89,81,68,47,32 ]
				}
			]
};

myChart2.setOption(option2);

window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
};
	 	

}); //ready结束