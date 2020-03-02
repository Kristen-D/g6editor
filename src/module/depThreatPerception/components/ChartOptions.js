const echartOption1 = {
  title: [
    {
      	text: '81',
    x: '38%',
    y: '32%',
    textStyle: {
      fontWeight: 700,
      fontSize: 38,
      fontFamily:'ElementalEnd',
      color:'#23ffff'
    }
  },
  {
      text:'威胁评估总分',
      x:'26%',
      bottom:'20',
        textStyle: {
        fontSize:'16',
        fontWeight: 100,
        color:'#23ffff'
      }
  }
  ],
  series: [
      {
      type: 'pie',
      hoverAnimation:false,
      data:[],
      center:['50%','42%'],
      radius: ['50%', '56%'],
      itemStyle: {
        normal: {
          color: '#15686d',
          borderColor: '#060b17'
        }
      },
      label: {
        normal: {
          show:false,
          position: 'inside'
        }
      }
     },
     {
      type: 'pie',
      center:['50%','42%'],
      radius: ['36%', '44%'],
      label:{normal:{show:false}},
      data:[
        {name:'11',value:[],itemStyle:{normal:{color:'#23ffff'}}},
        {name:'22',value:[]}
      ],
     },
     {
      type: 'pie',
      center:['50%','42%'],
      radius: ['36.5%', '41.5%'],
      label:{normal:{show:false}},
      data:[
        {name:'33',value:50},
        {name:'44',value:50,itemStyle:{normal:{color:'#15686d'}}}
      ],
    }]
 };

const echartOption2 = {
  backgroundColor: '#07111f',
  title:{
			text: ['{a|共检测}' + '{b|12254}' + '{c|次}'],
			textStyle: {
				rich: {
					a: {
						color: 'rgba(35,255,255,0.7)',
						fontSize: 14,
						fontWeight:500,
					},
					b: {
						color: '#23ffff',
						fontSize: 24,
						fontFamily:'ElementalEnd',
						padding: [0, 10, 0, 10],

					},
					c: {
						color: 'rgba(35,255,255,0.7)',
						fontSize: 14,
						fontWeight:500,

					},
				}
			},
			left: 'center',
			top: '6%'
		},
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      top:'30%',
      right: 20,
      itemGap:15,
      itemWidth:10,
      itemHeight:10,
      data: [
        {name: '高风险',icon: 'diamond'},
        {name: '中风险',icon: 'diamond'},
        {name: '低风险',icon: 'diamond'},
        {name: '信息性',icon: 'diamond'}
      ],
      textStyle: {
        color:'#fff',
        fontSize:12
      },
    },
  series: [
    {
      type: 'pie',
      hoverAnimation: false,
      data: [],
      center:['30%','55%'],
      radius: ['36%', '50%'],
      itemStyle: {
        normal: {
          color: 'rgba(255,255,255,1)',
          borderColor: '#07111f',
          borderWidth: 2,
          opacity: 1
        }
      },
      label: {normal: {show: false}}
    },
    {
      name: '风险检测',
      type: 'pie',
      hoverAnimation: true,
      zlevel: 2,
      center:['30%','55%'],
      radius: ['36%', '50%'],
      label: {
        normal: {
          show: false,
          position: 'inner',
          textStyle: {color: '#fff',fontSize: 14}
        }
      },
      labelLine: {normal: {show: false}},
      data: [
        {
          value: [],
          name: '高风险',
          itemStyle: {
            normal: {color: [],opacity: 0.7}
          },
          tooltip: {show:true},
        },
        {
          value: [],
          name: '中风险',
          itemStyle: {
            normal: {color: [],opacity: 0.7,}
          },
          tooltip: {show:true},
        },
        {
          value: [],
          name: '低风险',
          itemStyle: {
            normal: {color: [],opacity: 0.7,}
          },
          tooltip: {show:true},
        },
        {
          value: [],
          name: '信息性',
          itemStyle: {
            normal: {color: [],opacity: 0.7,}
          },
          tooltip: {show:true},
        }]
    },
    {
      type: 'pie',//内圈
      center:['30%','55%'],
      radius: ['28%', '30%'],
      hoverAnimation: false,
      label:{normal:{show:false}},
      data:[
        {
          name:'',
          value:1,
          itemStyle:{normal:{color:'#14202b'}},
          tooltip: {show:false}
        }],
    },
    {
      type: 'pie',//外圈
      center:['30%','55%'],
      radius: ['58%', '60%'],
      hoverAnimation: false,
      label:{normal:{show:false}},
      data:[{name:'',value:1,itemStyle:{normal:{color:'#14202b'}},tooltip: {show:false}}],
    }]

};

const echartOption3 = {
  title:{
    top:'center',
    left:'center',
    text:[],
    textStyle:{
      fontSize:16,
      fontFamily:'ElementalEnd',
      color:'#2bede6'
    },
    subtext:'告警数',
    subtextStyle:{
      fontSize:12,
      color:'#2bede6'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  series: [
    {
    name: '告警分部协议TOP',
    type: 'pie',
    center:['50%','50%'],
    radius: ['76%', '86%'],
    avoidLabelOverlap: false,
    label: {
      normal: {show: false,position: 'center'},
      emphasis: {show: false}
    },
    labelLine: {normal: {show: false}},
    data: [{
      value: [],
      name: [],
      itemStyle:{
        normal:{
          color:'#028bff'
        }
      }
    }, {
      value: [],
      name: [],
      itemStyle:{
        normal:{
          color:'#12cbf6'
        }
      }
    }, {
      value: [],
      name: [],
      itemStyle:{
        normal:{
          color:'#f9b607'
        }
      }
    }, {
      value: [],
      name: [],
      itemStyle:{
        normal:{
          color:'#9fe060'
        }
      }
    }, {
      value: [],
      name: [],
      itemStyle:{
        normal:{
          color:'#2bede6'
        }
      }
    }]
  },
    {
    name: '',
    type: 'pie',
    center:['50%','50%'],
    radius: ['60%', '65%'],
    avoidLabelOverlap: false,  //是否启用防止标签重叠策略，默认开启
    hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
    itemStyle: {
      normal: {color: '#198287'}
    },
    label: {
      normal: {show: false}
    },
    data: [{
      name: '',
      value: 1,
      tooltip:{show:false}
    }],

  }]

};




export {
  echartOption1,
  echartOption2,
  echartOption3
}
