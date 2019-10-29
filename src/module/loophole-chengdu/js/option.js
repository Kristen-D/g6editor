/******************漏洞趋势******************/
var generateData = function() {
  return Array.apply(null, {
    length: 25
  }).map(function(item, index) {
    return Math.round(Math.random() * 50 + 50);
  });
}

var Echaroption1 = {
  backgroundColor:'#fff',
  color:['#ba1f00','#ff2a00','#ff8400','#ffdd3f'],
  grid:{
    top:20,
    bottom:100,
    left:40,
    right:20,
  },
  legend: {
    bottom:10,
    itemGap:30,
    itemWidth:20,
    itemHeight:10,
    data: [{name: '紧急',icon:'rect'},{name:'高危',icon:'rect'},{name: '中危',icon:'rect'},{name:'低危',icon:'rect'}]
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    // splitNumber:30,
    minInterval:10,
    boundaryGap: false,
    axisTick:{show:false},
    axisLine:{lineStyle:{color:'#ccc'}},
    axisLabel:{color:'#333',interval:'auto'},
    data: []
  },
  yAxis: {
     interval:100,
     axisTick:{show:false},
     axisLine:{show:false} ,
     splitLine: {
      show: true,
      lineStyle: { color: '#eaeef1',},
    },
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      height:15,
    bottom:50,

    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    handleStyle: {
      color: '#fff',
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2
    }
  }],
  series: [
    {
    name: '紧急',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  },
    {
    name: '高危',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  },
    {
    name: '中危',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  },
    {
    name: '低危',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  }
  ]
};


var Echaroption2 = {
    color: ['#0692dd'],
    tooltip : {
      trigger: 'axis',
      axisPointer : { type : 'shadow',}
    },
    grid: {
      top:'10%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap: true,
        axisTick:{show:false},
        axisLine:{lineStyle:{color:'#eaeef1'}},
        axisLabel:{color:'#333',interval:0},
        data : [],
      }
    ],
    yAxis : [
      {
         type : 'value',
         axisTick:{show:false},
         axisLine:{show:false} ,
         splitLine: {
          show: true,
          lineStyle: { color: '#eaeef1',},
        },
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '26%',
        data:[]
      }

    ]

 };


 var Echaroption3 = {
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            color:['#5adae5','#1970b3' ],
            radius: [0, '33%'],
            label: {
                normal: {
                    show:false,
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        },
        {
            name:'访问来源',
            type:'pie',
            color:['#7becf6','#0065BA'],
            radius: ['38%', '58%'],
            label: {
                normal: {
                    show: true,
                    textStyle: { fontSize: 12, color: '#666' }
                },
            },
            labelLine: {
                normal: {
                    lineStyle:{color:'#e1e3e4'}
                }
            },
            itemStyle: {
				normal: {
					borderWidth: 2,
					borderColor: '#ffffff',
				}
			},
            data:[]
        }
    ]
   };

var Echaroption4 = {
	 color:['#ba1f00','#f53c61','#ff7348','#f3ce21'],
	 tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	 },
	 series: [{
		name: '等级',
		type: 'pie',
		radius: ['36%', '60%'],
		center: ['50%', '50%'],
		roseType : 'radius',
		label: {
			normal: {
				textStyle:{
					fontSize:12,
					color:'#3E4956',
				}

			},
			emphasis: {
				show: true,
				textStyle: {
					color:'#3E4956',
					fontSize: '12',
					formatter: "{b} <br/>{a}: {c} ({d}%)"
				}
			}
		},
		labelLine:{
				normal:{
					show:true,
					length:5,
					length2:15,
					lineStyle:{
						color:'#e1e3e4'
					}

				},
				emphasis:{
					lineStyle:{
						//width:1,
						color:'#3e4956'
					}
				}
			},
		data: []
	}]
 };



export {
  Echaroption1,
  Echaroption2,
  Echaroption3,
  Echaroption4,
}
