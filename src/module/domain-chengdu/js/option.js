var Echaroption1 = {
color:['#1875f0','#4ecf69','#edf175','#50e3c2'],
  tooltip : {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
      }
  },
  legend: {
      bottom:0,
      itemGap:30,
      itemWidth:20,
      itemHeight:10,
      data: [
        {name:'深度威胁',icon:'rect'},
        {name: '漏洞检测',icon:'rect'},
        {name:'钓鱼网站',icon:'rect'},
        {name: '域名解析',icon:'rect'},
      ]
  },
  grid:{
      top:20,
      bottom:60,
  left:40,
  right:20,
  },
  xAxis : [{
    boundaryGap: false,
    axisTick:{show:false},
    axisLine:{lineStyle:{color:'#ccc'}},
    axisLabel:{color:'#333',interval:0},
    data: []
  }],
  yAxis : [
      {
    // min:0,
    // max:20,
      interval:5,
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
          name:'深度威胁',
          type:'line',
          stack: '总量',
    itemStyle: {normal: {opacity:0}},
          areaStyle: {normal: {}},
          data:[],
      },
      {
          name:'漏洞检测',
          type:'line',
          stack: '总量',
    itemStyle: {normal: {opacity:0}},
          areaStyle: {normal: {}},
    data:[],
      },
      {
          name:'钓鱼网站',
          type:'line',
          stack: '总量',
    itemStyle: {normal: {opacity:0}},
          areaStyle: {normal: {}},
    data:[],
      },
      {
          name:'域名解析',
          type:'line',
          stack: '总量',
    itemStyle: {normal: {opacity:0}},
          areaStyle: {normal: {}},
    data:[],
      },
  ]
};


var Echaroption2 = {
   color:['#ba1f00','#f53c61','#ff7348','#f3ce21'],
   tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
   },
   series: [{
    name: '等级',
    type: 'pie',
    radius: ['36%', '60%'],
    center: ['45%', '50%'],
    roseType : 'radius',
    label: {
      normal: {
        textStyle:{
          fontSize:12,
          color:'#666',
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
            color:'#3e4956'
          }
        }
      },
    data: [
    ]
  }]
};


var Echaroption3 = {
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
      {
          name:'访问来源',
          type:'pie',
          color:['#50e3c2','#0065BA','#12CBF6',  '#028BFF'],
          radius: ['38%', '58%'],
    center: ['45%', '50%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: true,
                  textStyle: { fontSize: 12, color: '#666', }
              }
          },
          labelLine:{
        normal:{ lineStyle:{color:'#e1e3e4'} },
        emphasis:{ lineStyle:{color:'#3e4956'} }
      },
        itemStyle: { //图形样式
      normal: {
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    },
    data:[]
    }
  ]
};

export {
  Echaroption2,
  Echaroption3,
  Echaroption1,
}
