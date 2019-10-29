let mapoption = {
  legend: {
    left: 'center',
    bottom: '5%',
    itemWidth: 15,
    itemHeight: 15,
    itemGap: 20,
    textStyle: {
      color: '#fff',
      fontSize: 16
    },
    data: ['普通攻击', '已阻断']
    // ['高频攻击', '普通攻击', '已阻断']
  },

  geo: {
    map: 'world',
    label: {
      emphasis: {
        show: false
      }
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#e9ebf2',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }

  },

  series: [{
      name: '地点',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke',
        period: 7,
        scale: 5
      },
      label: {
        emphasis: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: 10,
      showEffectOn: 'render',
      itemStyle: {
        normal: {
          color: '#46bee9'
        }
      },
      data: []
      // cnData.citys
    },
    {
      name: '普通攻击',
      // '高频攻击',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 3,
      large: true,
      effect: {
        show: true,
        constantSpeed: 30,
        symbol: 'arrow',
        symbolSize: 5,
        trailLength: 0.3,
      },
      lineStyle: {
        normal: {
          color: '#ff2a00',
          width: 2,
          opacity: 0.4,
          curveness: 0.1
        }
      },
      data: []
      // cnData.moveLines1
    },
    // {
    // 	name: '普通攻击',
    // 	type: 'lines',
    // 	coordinateSystem: 'geo',
    // 	zlevel: 3,
    // 	large: true,
    // 	effect: {
    // 		show: true,
    // 		constantSpeed: 30,
    // 		symbol: 'arrow',
    // 		symbolSize: 5,
    // 		trailLength: 0.3,
    // 	},
    // 	lineStyle: {
    // 		normal: {
    // 			color: '#2196f3',
    // 			width: 2,
    // 			opacity: 0.4,
    // 			curveness: 0.1
    // 		}
    // 	},
    // 	data: cnData.moveLines2
    // },
    {
      name: '已阻断',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 3,
      large: true,
      effect: {
        show: true,
        constantSpeed: 30,
        symbol: 'arrow',
        symbolSize: 5,
        trailLength: 0.3,
      },
      lineStyle: {
        normal: {
          color: '#80c269',
          width: 2,
          opacity: 0.4,
          curveness: 0.1
        }
      },
      data: []
      // cnData.moveLines3
    }
  ]
};


export default mapoption;
