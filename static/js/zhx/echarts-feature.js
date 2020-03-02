// JavaScript Document

$(document).ready(function() {
	'use strict';

var myChart1 = echarts.init(document.getElementById('treemap'));
var option1 = {
    tooltip: {
        trigger: 'item',
        backgroundColor:'#2d3031',
        formatter: "{b}: {c}"
    },

    calculable: true,
    series: [{

        name: 'webshell特征',
        type: 'treemap',
        left:0,
        right:'5%',
        top:-8,
        bottom:'2%',
        roam: false, //是否开启拖拽漫游（移动和缩放）
        nodeClick: false, //点击节点后的行为,false无反应
         breadcrumb:{show:false},
        label: {
            normal: {
                textStyle: {
                    fontSize: '18',
                }

            }

        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    formatter: "{b}"
                },
                borderWidth: 5,
                borderColor: '#fff'
            }
        },
        data: [{
            value: 40,
            name: '孤立页面',
            itemStyle: {
                normal: {
                    color: '#42a5f5',
                }
            },


        }, {
            value: 20,
            name: '跳板扫描内部服务器',
            itemStyle: {
                normal: {
                    color: '#2196f3',
                }
            },


        }, {
            value: 20,
            name: '常用函数',
            itemStyle: {
                normal: {
                    color: '#1565c0',
                }
            },

        }, {
            value: 10,
            name: '文件名',
            itemStyle: {
                normal: {
                    color: '#1976d2',
                }
            },


        }, {
            value: 10,
            name: '其他特征',
            itemStyle: {
                normal: {
                    color: '#2979ff',
                }
            }

        }]
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
				left: '-4.5%',
				right: '0%',
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
					data : ['文件1', '文件2', '文件3', '文件4', '文件5', '文件6', '文件7', '文件8', '文件9', '文件10', '文件11', '文件12'],				
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

var myChart3 = echarts.init(document.getElementById('bar2'));
var option3 = {
   color: ['#cce9c7','#8bd0d1', '#44b9d8', '#2d94c8','#276eb1','#234797','#171882','#121556'],
		tooltip: {
			trigger: 'item',
            backgroundColor:'#2d3031',
			formatter:'{c}次{a}攻击',
			
		},
		legend: {
			top: '0',
			left: 'center',
			itemWidth: 8,
			itemHeight: 8,
			itemGap: 20,
			textStyle: {
				color: '#3E4956',
				fontSize: 14,
			},
			data: [
				{
					name: '有害程序',
					icon: 'circle'
				},{
					name: '计算机病毒',
					icon: 'circle'
				},{
					name: '木马',
					icon: 'circle'
				},{
					name: '僵尸网络',
					icon: 'circle'
				},{
					name: '混合攻击程序',
					icon: 'circle'
				},{
					name: '网络恶意代码',
					icon: 'circle'
				},{
					name: '拒绝服务攻击',
					icon: 'circle'
				},{
					name: '其他',
					icon: 'circle'
				},
			 ]
		 },
		grid: {
			 top:'13%',
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
	        data: ['120.12.180.3','120.12.180.7','120.12.180.43','120.12.180.210','120.12.180.4','120.12.180.56','120.12.180.120','120.12.180.2','120.12.180.43']
	    },
	    series: [
        {
            name: '有害程序',
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
            name: '计算机病毒',
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
            name: '木马',
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
            name: '僵尸网络',
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
            name: '混合攻击程序',
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
            name: '网络恶意代码',
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
        },
        {
            name: '拒绝服务攻击',
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
        },
        {
            name: '其他',
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

myChart3.setOption(option3);

window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
	myChart3.resize();
};
	 	

}); //ready结束