/******************漏洞趋势******************/
var generateData = function() {
  return Array.apply(null, {
    length: 365
  }).map(function(item, index) {
    return Math.round(Math.random() * 50 + 50);
  });
}

var Echaroption1 = {
  backgroundColor:'#fff',
  color:['#C0DE47','#80CEDF','#000099'],
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
    data: [{name: '文字篡改',icon:'rect'},{name:'图片篡改',icon:'rect'},{name:'篡改总量',icon:'rect'}]
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
     axisTick:{show:false},
     axisLine:{show:false} ,
     splitLine: {
      show: true,
      lineStyle: { color: '#eaeef1',},
    },
  },
  series: [
    {
    name: '文字篡改',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  },
    {
    name: '图片篡改',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  },
  {
      name:'篡改总量',
      type:'line',
      stack: '总量',
      showSymbol: false,
      data:generateData()
  }]
};


var Echaroption2 = {
  backgroundColor:'#fff',
  color:['#AD94F5','#FF80CC','#CC0000'],
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
    data: [{name: '挂马类型1',icon:'rect'},{name:'挂马类型2',icon:'rect'},{name:'挂马总量',icon:'rect'}]
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
     axisTick:{show:false},
     axisLine:{show:false} ,
     splitLine: {
      show: true,
      lineStyle: { color: '#eaeef1',},
    },
  },
  series: [
    {
    name: '挂马类型1',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  },
  {
    name: '挂马类型2',
    type: 'line',
    stack: '总量',
    itemStyle: {normal: {opacity:0}},
    areaStyle: {normal: {}},
    data: generateData()
  },
  {
      name:'挂马总量',
      type:'line',
      stack: '总量',
      showSymbol: false,
      data:generateData()
  }]
};


 var Echaroption3 = {
   backgroundColor:'#fff',
   color:['#AD94F5'],
   grid:{
     top:20,
     bottom:80,
     left:40,
     right:20,
   },
   tooltip: {
     trigger: 'axis'
   },
   dataZoom: [
     {
       type: 'inside',
       start: 0,
       end: 100
     },
     {
       height:15,
     bottom:10,

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
      axisTick:{show:false},
      axisLine:{show:true,lineStyle:{color:'#ccc'}} ,
      splitLine: {
       show: true,
       lineStyle: { color: '#eaeef1',},
     },
   },
   series: [
   {
       name:'总量',
       type:'line',
       stack: '总量',
       showSymbol: false,
       data:generateData()
   }]
 };

 var Echaroption4 = {
    color:['#00FF00','#FF0000'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 80,
        top: 50,
        bottom: 10,
        data: [{name: '正常',icon:'rect'},{name:'故障',icon:'rect'}],
    },
    series : [
        {
            name: '姓名',
            type: 'pie',
            radius : '60%',
            center: ['35%', '50%'],
            // label: {
            //   normal: {
            //       show: false,
            //   },
            // },
            // labelLine: {
            //     normal: {
            //         show: false
            //     }
            // },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: [{
                name: '正常',
                value: 27,
            },{
              name: '故障',
              value: 3,
            }],
        }
    ]
};



export {
  Echaroption1,
  Echaroption2,
  Echaroption3,
  Echaroption4,
}
