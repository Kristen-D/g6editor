
function generateData () {
  return Array.apply(null, {
      length: 25
  }).map(function(item, index) {
      return Math.round(Math.random() * 50 + 50);
  });
}

var Echaroption1 = {
    backgroundColor:'#fff',
	color:['#1875f0','#4ecf69','#ff2a00','#ff8400','#ffdd3f'],
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
        data: [{name:'攻击量',icon:'rect'},{name: '被攻击IP量',icon:'rect'},{name:'高危',icon:'rect'},{name: '中危',icon:'rect'},{name:'低危',icon:'rect'}]
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        boundaryGap: false,
        axisTick:{show:false},
        axisLine:{lineStyle:{color:'#ccc'}},
        axisLabel:{color:'#333'},
        data: ['11.04', '11.05','11.06', '11.07','11.08', '11.09','11.10', '11.11', '11.12', '11.13','11.14', '11.15','11.16', '11.17','11.18', '11.19','11.20', '11.21','11.22', '11.23','11.24', '11.25','11.26', '11.27', '11.28']
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
        name: '攻击量',
        type: 'line',
        stack: '总量',
        itemStyle: {normal: {opacity:0}},
        areaStyle: {normal: {}},
        data: generateData()
    },
		{
        name: '被攻击IP量',
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
		 color:['#f53c61','#ff7348','#f3ce21'],
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
			data: [
  			{value: 15, name: '高危'},
  			{value: 30, name: '中危'},
  			{value: 24, name: '低危'},]
		}]
	 };


export {
  Echaroption1,
  Echaroption2,
}
