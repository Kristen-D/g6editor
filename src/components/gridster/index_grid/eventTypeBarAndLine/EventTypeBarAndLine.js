const pieOption = {
  tooltip: {
   trigger: 'item',
   formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [{
   name: '威胁类型',
   type: 'pie',
   center:['50%','50%'],
   radius: ['35%', '48%'],
   roseType : 'radius',//南丁格尔玫瑰图
   label: {
     normal: {
       textStyle:{
         fontSize:12,
         color:'#9ea3b4',
       }

     },
     emphasis: {
       show: true,
       textStyle: {
         color:'#fff',
         fontSize: '18',
         formatter: "{b} <br/>{a}: {c} ({d}%)"
         //  fontWeight: 'bold'
       }
     }
},
   data:[{value:0, name:''}]
 }]
};
const lineOption = {
color: ['#1B55A5', '#00B8FF', '#FDB502','#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
   legend: {
     top: '18',
    left: '10',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 25,
    textStyle: {
      color: '#3E4956',
      fontSize: 12,
    },
     data: [],
        },
   tooltip : {
      trigger: 'axis',
       textStyle:{
        fontSize:14,
        color:"#fff",
        }
    },
   grid: {
    left: '10%',
      right:'10%',
    top: '20%',
    bottom: '10%',
    containLabel: true,
  },
  calculable : true,
  xAxis : [
    {
                  type: "category",
      boundaryGap: true, //坐标轴两边留白策略（类目轴）
      splitLine: { //坐标轴在 grid 区域中的分隔线。
          show: false,
          lineStyle: {
            color: '#E1E3E4'
          }
        },
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
      axisTick:{ //坐标轴刻度相关设置。
          show:false,
        },
      data :[]
    }
  ],
  yAxis : [
    {
      type: "value",
    min: 0,
    splitNumber: 4,
    splitLine: { //坐标轴在 grid 区域中的分隔线。
        show: true,
        lineStyle: {
          color: '#E1E3E4'
        }
      },
    axisLine: { //坐标轴轴线相关设置。数学上的y轴
        show: false,
        lineStyle: {
          color: '#E1E3E4'
        },
      },
    axisLabel: {
        textStyle: {
          color: '#3E4956'
        },
      },
    axisTick:{ //坐标轴刻度相关设置。
        show:false,
      },
    }
  ],
  series : []
};

export {
  pieOption,lineOption
}
