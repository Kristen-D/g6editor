$(document).ready(function() {
	'use strict';


	// 撞库
	var myChart1 = echarts.init(document.getElementById('line1'));
	var option1 = {
		tooltip: {
			trigger: 'axis',
			backgroundColor:'#2d3031',
			formatter:'时间：2017.{b} <br/> {a}：{c}',
			 axisPointer:{
			 	lineStyle:{color:'#E1E3E4',},
			 },
		},
		grid: {
			top: '5%',
			left: '2%',
			right: '3%',
			bottom: '5%',
			containLabel: true,
		},
		xAxis: [{
			type: 'category',
			data: ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27'],
			axisLine: { //坐标轴轴线相关设置。数学上的x轴
				 show: true,
				 lineStyle: {
					 color: '#E1E3E4'
				 },
			 },
			 axisLabel: { //坐标轴刻度标签的相关设置
				 textStyle: {
					 color: '#3E4956',
				 },
			 },
			 axisTick: { show: false,},
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			max:200,
			splitNumber: 5,
			splitLine: {
				 show: true,
				 lineStyle: {
					 color: '#E1E3E4'
				 }
			 },
			 axisLine: {
				 show: false,
				 lineStyle: {
					 color: '#E1E3E4'
				 },
			 },
			 axisLabel: {
				 textStyle: {
					 color: '#3E4956',
					 
				 },
			 },
			 axisTick: { show: false,},  
		}],
		series: [{
			name: '账户数',
			type: 'line',
			smooth: true, //是否平滑曲线显示
			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
			symbolSize:6,
			itemStyle: {
				normal: {
					color: "#2980b9",  // 会设置点和线的颜色，所以需要下面定制 line
					borderColor: "#fff"  // 点边线的颜色
				}
			},
			lineStyle: {
				normal: {
					color: "#2980b9"   // 线条颜色
				}
			},

			data: [112, 121, 40, 96, 17, 16, 15]
		}]
	};
	myChart1.setOption(option1);

	var myChart2 = echarts.init(document.getElementById('bar1'));
	var option2 = {
		tooltip: {
			trigger: 'item',
			backgroundColor:'#2d3031',
			axisPointer: {
				type: 'cross',
			}
		},
		grid: {
			top: '10%',
			left: '3%',
			right: '3%',
			bottom: '5%',
			containLabel: true,
		},
		xAxis: [{
			type: 'category',
			data: ['192.168.1.44', '192.168.1.56', '192.168.1.89', '192.168.1.71', '192.168.1.55'],
			axisLine: { //坐标轴轴线相关设置。数学上的x轴
				 show: true,
				 lineStyle: {
					 color: '#E1E3E4'
				 },
			 },
			 axisLabel: { //坐标轴刻度标签的相关设置
				 textStyle: {
					 color: '#3E4956',
				 },
			 },
			 axisTick: { show: false,},
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			splitNumber: 4,
			splitLine: {
				 show: true,
				 lineStyle: {
					 color: '#E1E3E4'
				 }
			 },
			 axisLine: {
				 show: false,
				 lineStyle: {
					 color: '#E1E3E4'
				 },
			 },
			 axisLabel: {
				 textStyle: {
					 color: '#3E4956',
					 
				 },
			 },
			 axisTick: { show: false,}, 
		}],
		series: [
		   {
            type: 'bar',
            stack: 'chart',
            barWidth: '26%',
            itemStyle: {
              normal: {
                color: '#0065ba'
              }
            },
            label: {
              normal: {
                position: 'right',
                show: false
              }
            },
            data: [4000,7100,4800,6200,6800],
          }
		]
	};
	myChart2.setOption(option2);

	
	var myChart3 = echarts.init(document.getElementById('wd-map'));

	var allData = {
        "citys": [{
            "name": "柏林",
            "value": [13.25, 52.3, 4],
            "symbolSize": 12,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "波兰",
            "value": [19.08, 51.55, 4],
            "symbolSize": 8,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "青海",
            "value": [110.49, 36.34, 4],
            "symbolSize": 15,
            "itemStyle": {
                "normal": {
                    "color": "#f72e00"
                }
            }
        }, {
            "name": "India",
            "value": [77,28, 4],
            "symbolSize": 13,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "Romania",
            "value": [25, 44, 4],
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "Rusia",
            "value": [100, 65, 4],
            "symbolSize": 15,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "Rusia",
            "value": [30, 31, 4],
            "symbolSize": 12,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "South Afr ",
            "value": [24, -27, 4],
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }],


        "moveLines": [{
            "fromName": "青海",
            "toName": "柏林",
            "coords": [
                [110.49, 36.34],
                [13.25, 52.3]
            ]
        }, {
            "fromName": "青海",
            "toName": "SA",
            "coords": [
                [110.49, 36.34],
                [24,-27]
            ]
        }, {
            "fromName": "青海",
            "toName": "Egyp",
            "coords": [
                [110.49, 36.34],
                [30,31]
            ]
        }, {
            "fromName": "青海",
            "toName": "India",
            "coords": [
                [110.49, 36.34],
                [77,28]
            ]
        },{
            "fromName": "青海",
            "toName": "波兰",
            "coords": [
                [110.49, 36.34],
                [19.08, 51.55]
            ]
        }, {
            "fromName": "青海",
            "toName": "Romania",
            "coords": [
                [110.49, 36.34],
                [25,44]
            ]
        }, {
            "fromName": "青海",
            "toName": "Russia",
            "coords": [
                [110.49, 36.34],
                [100, 65]
            ]
        }]
    };

	var wdoption={
        geo: {
            map: 'world',
                width: '95%',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
					areaColor: '#f2f2f2',
					borderColor: '#dadada'
				},
                emphasis: {
                    areaColor: '#71a9c0'
                }
            }

        },
       
        series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 22,
            symbol:'image://images/skeleton.png',
            symbolRotate: 0,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true,
                    color: '#fa1828',
                }
            },
            itemStyle: {
                normal: {
                    color: '#fa1828',
                },
                emphasis:{
                	color: '#fa1828',
                }
            },
            data: allData.citys
        }, ]
    };
	myChart3.setOption(wdoption);

	


	window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
	myChart3.resize();
};
	 	

}); //ready结束