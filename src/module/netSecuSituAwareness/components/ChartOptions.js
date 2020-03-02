const eventTrend = {
      color:['#0ad6f0','#156db8','#0347b3','#106fd3'],
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
        left:'10%',
        top:'0',
        itemGap: 20,
        textStyle:{
          color:'#0d80a1',
          fontSize:16,
        },
        data:['攻击入侵','安全漏洞','钓鱼网站','域名监控']
      },
      grid: {
        left: '5%',
        right:'4%',
        top:'16%',
        bottom: '10%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          axisLabel:{
            textStyle:{
              color:'rgba(255,255,255,0.7)',
              fontSize:12,
                fontFamily:"ElementalEnd"
            }
          },
          data : []
        }
      ],
      yAxis: [{
          type: 'value',
            scale:'true',
            axisLine:{show:false,},
          axisLabel:{
            textStyle:{
              color:'rgba(255,255,255,0.7)',
              //fontSize:12,
              fontFamily:"ElementalEnd"
            }
          },
            axisTick:{show:false},
          splitLine: { //坐标轴在 grid 区域中的分隔线；
            show: true,
            lineStyle: { //分割线颜色，可设单个，也可以设置数组。
              color: '#202f41',
            },

          },
        }],
      series : [
        {
          name:'攻击入侵',
          type:'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 1,
          showSymbol: true,
          areaStyle: {normal: {}},
          data:[]
        },
        {
          name:'安全漏洞',
          type:'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 1,
          showSymbol: true,
          areaStyle: {normal: {}},
          data:[]
        },
        {
          name:'钓鱼网站',
          type:'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 1,
          showSymbol: true,
          areaStyle: {normal: {}},
          data:[]
        },
        {
          name:'域名监控',
          type:'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 1,
          showSymbol: true,
          areaStyle: {normal: {}},
          data:[]
        },
      ]
};

const harmfulProcedure = {
          color: ['#0ad6f0', '#1884df', '#50fca8', '#0254d5'],
          tooltip: {
            trigger: 'item',
            formatter: "{b}"
          },
          legend:{
              data:["恶意内容","恶意行为","信息破坏","漏洞利用"],
            },
          series: [
            {
            type: 'sankey',
            left:'20',
            right: '20',
            top:'30',
            bottom:'20',
            layout: 'none',
            nodeWidth:8, //图中每个矩形节点的宽度
            nodeGap:3,
            data: [{
                "name": "漏洞1",
                "value": "20",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞2",
                "value": "18",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞3",
                "value": "12",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞4",
                "value": "10",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞5",
                "value": "8",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞6",
                "value": "8",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞7",
                "value": "8",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞8",
                "value": "4",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞9",
                "value": "4",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞10",
                "value": "4",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞11",
                "value": "2",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "漏洞12",
                "value": "2",
                "type": "tag1",
                "itemStyle": {
                  "normal": {
                    "color": "#0254d5"
                  }
                },
                "label": {
                  "normal": {
                    "position": "left"
                  }
                }
              },
              {
                "name": "有害程序",
                "index": 0,
                "type": "source",
                "itemStyle": {
                  "normal": {
                    "color": "#0ad6f0"
                  }
                },
                "label": {
                  "normal": {
                    "position": "right"
                  }
                }
              },
              {
                "name": "网络攻击",
                "index": 1,
                "type": "source",
                "itemStyle": {
                  "normal": {
                    "color": "#1884df"
                  }
                },
                "label": {
                  "normal": {
                    "position": "right"
                  }
                }
              },
              {
                "name": "信息破坏",
                "index": 2,
                "type": "source",
                "itemStyle": {
                  "normal": {
                    "color": "#50fca8"
                  }
                },
                "label": {
                  "normal": {
                    "position": "right"
                  }
                }
              }
            ],

            links: [{
                "source": "有害程序",
                "target": "漏洞1",
                "value": "10",
                "lineStyle": {
                  "normal": {
                    "color": "#058ea9",
                    "opacity": 0.8
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞2",
                "value": "8",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞3",
                "value": "6",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞4",
                "value": "5",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞5",
                "value": "4",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞6",
                "value": "4",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞7",
                "value": "4",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞8",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞9",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "有害程序",
                "target": "漏洞10",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞1",
                "value": "7",
                "lineStyle": {
                  "normal": {
                    "color": "#0c64ad",
                    "opacity": 0.8
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞2",
                "value": "5",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞3",
                "value": "3",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞4",
                "value": "3",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞5",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞6",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞7",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞8",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞9",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞10",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞11",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "网络攻击",
                "target": "漏洞12",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞1",
                "value": "3",
                "lineStyle": {
                  "normal": {
                    "color": "#268673",
                    "opacity": 0.8
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞2",
                "value": "5",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞3",
                "value": "3",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞4",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞5",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞6",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞7",
                "value": "2",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞8",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞9",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞10",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞11",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              },
              {
                "source": "信息破坏",
                "target": "漏洞12",
                "value": "1",
                "lineStyle": {
                  "normal": {
                    "color": null,
                    "opacity": 0.5
                  }
                }
              }
            ],
            label:{
              normal:{
                show:false
              }
            },
            itemStyle: { //桑基图节点矩形的样式0
              normal: {
                borderWidth: 0,
                borderColor: '#fff'
              }
        },
            lineStyle: { //桑基图边的样式
              normal: {
                curveness: 0.5 //桑基图的曲度
              }
            }
          }]
};

const regionalIndex = {
          tooltip:{},
          grid:{
            show:false,
            top:10,
            left:20,
            right:0,
            bottom:20,
            containLabel:true,
          },
          xAxis : [
            {
              type : 'category',
              data:[],
              splitLine: {show: false},
              axisLine: {show: false},
              axisTick:{show: false},
            }
          ],
          yAxis : [
            {
              type : 'value',
              splitLine: {
                show: true,
                lineStyle:{ //分割线颜色，可设单个，也可以设置数组。
                  color:'#202f41',
                },
              },
              axisLine: {
                show: false
              },
              axisTick:{
                show: false
              },
              axisLabel:{
                textStyle:{
                  color:'rgba(255,255,255,0.7)',
                  fontFamily:"ElementalEnd"
                }
              },
            }
          ],
          series : [
            {
              name:'自定义图形',
              type:'bar',
              height:'100%',
              barWidth:'40%',
              data:[100, 91, 87, 82,  76, 70, 65, 50,45,41,36,33,30,28,80],
              itemStyle: {
                normal: {
                color: {
                   image: '',
                   repeat: 'repeat'
                 }
                }
              }
            },
          ]
};

const map = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}'
            },
            legend: {
                  orient: 'vertical',
                  y: 'top',
                  x:'left',
                  itemWidth:23,
                  itemHeight:23,
                  data:[
                {
                   name:'双流区',
                   icon:'image://../static/images/cd/shot-icon-a.gif'
                }],
                  textStyle: {
                      color: '#ff0000',
                      fontSize:14,
                      fontWeight:600,
                      padding:5
                  }
              },
            geo: {
                  map: 'chengdu',
                  selectedMode: 'single', //multiple多选single
              roam: true,
                  label: {
                      emphasis: {
                          show: false
                      }
                  },
                  itemStyle: {
                      normal: {
                //         	areaColor: 'rgba(7,17,31, .3)',
                        areaColor: 'rgba(8,20,36, .1)',
                                borderColor: '#09d8fd',
                                borderWidth:2,
                //              shadowBlur: 20,
                //              shadowColor: 'rgba(8,20,36,0.8)',
                //              shadowOffsetX:20,
                //              shadowOffsetY:20,
                //              opacity:0.5
                            },
                            emphasis: {
                                areaColor: 'yellow'
                            }
                        },
                        regions:''
                //      regions:[{name:'双流',selected:true}]
                    },
                  series: [{
                    name: '双流区',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol:'image://../static/images/cd/shot-icon-b.gif',
                    symbolSize: 20,
                        label: {
                                normal: {
                                    show: true,
                                    formatter: '{b}',
                                    offset:[0,25],
                //                  color:'rgba(255,0,0,1)',
                //                  fontWeight:600,
                                    fontSize:14
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                        itemStyle: {
                                emphasis: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }
                        },
                    data: ''
                  }
                  ]
};


export {
  eventTrend,
  harmfulProcedure,
  regionalIndex,
  map
}
