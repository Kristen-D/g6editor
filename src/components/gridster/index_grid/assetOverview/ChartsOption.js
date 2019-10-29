
//饼图
var baselabels={
      show: true,
      position: 'outside',
      formatter: ['{b|{b}}','{d| ({d}%)}'].join('\n'),
      rich:{
        b:{
          color:'#3e4956',
          fontSize:12,

          lineHeight:26,
        },
        d:{
          color:'#3e4956',
          fontSize:12,
          fontFamily:"ElementalEnd"

        }
      }
  };
const pieCategory ={
    color:['#007be8','#c4f14c','#6c87ed','#ffea00',],
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },

    series : [

        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
             roseType: 'angle',
            label: {
                normal: baselabels,
                emphasis: baselabels
              },
              labelLine:{
          normal:{
            show:true,
            length:10,
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
            data:[
                // {value:335, name:'安全设备'},


            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },

    ]
};

//雷达图
const radarCategory={


  title: {
            left: 0,
            top: "4%",
            // text:['{c|}' + '{d|受攻击资产TOP}'],
            text:[],
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
        backgroundColor: '#2d3031',
        padding:10,
      },
      radar: {
          // shape: 'circle',
          center: ['50%','55%'],
          radius: '46%',
          indicator: [
             // { name: '192.21.5.9',max: 14},
             { name: '192.21.5.9',max: 14},
             { name: '192.35.15.9',max: 14},
             { name: '192.11.5.19',max: 14},
             { name: '192.21.5.7',max: 14},
             { name: '192.12.5.9',max: 14}

          ],
          splitLine:{
            lineStyle:{color:'#e1e3e4'}
          },
          splitArea: {show: false },
          axisLine:{ show:false},
          name: {
            formatter: function(value, indicator) {
                return value;
            },
            textStyle: {
                fontSize: 12,
                fontFamily:'Helvetica',
                color: '#3e4956'
            }
        },

      },
      series: {
          name: '受攻击类型',
          type: 'radar',
          symbol: 'circle',
          symbolSize:5,
          lineStyle:{
            normal:{
              color:'#e1e3e4',
              opacity:0.0
            }
          },
          itemStyle: {
                normal: {
                  // color: '#12cbf6'
                  color:''
                }
            },
          areaStyle: {
                normal: {opacity: 0.6}
            },
          data : [
              {
                  value : [12, 8, 9, 2, 6],
                  name : '',
                  label:{
                    normal:{
                      show:false,
                    }
                  }
              },
          ],
      }
};

//僵木蠕攻击源top

const assetbarCategory = {
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
};



export {
  pieCategory,
  radarCategory,
  assetbarCategory
}
