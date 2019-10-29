//word-map
//var chart = echarts.init(document.getElementById('WorldMapA'));
//var wdchart = echarts.init(document.getElementById('WorldMapA'));

var allData = {
  "citys": [{
    "name": "柏林",
    "value": [13.25, 52.3, 4],
    "symbolSize": 12,
    "itemStyle": {
      "normal": {
        "color": "#25d6f5"
      }
    }
  }, {
    "name": "波兰",
    "value": [19.08, 51.55, 4],
    "symbolSize": 8,
    "itemStyle": {
      "normal": {
        "color": "#25d6f5"
      }
    }
  }, {
    "name": "青海",
    "value": [110.49, 36.34, 4],
    "symbolSize": 15,
    "itemStyle": {
      "normal": {
        "color": "#f72e00"
      }
    }
  }, {
    "name": "India",
    "value": [77, 28, 4],
    "symbolSize": 13,
    "itemStyle": {
      "normal": {
        "color": "#25d6f5"
      }
    }
  }, {
    "name": "Romania",
    "value": [25, 44, 4],
    "symbolSize": 10,
    "itemStyle": {
      "normal": {
        "color": "#25d6f5"
      }
    }
  }, {
    "name": "Rusia",
    "value": [100, 65, 4],
    "symbolSize": 15,
    "itemStyle": {
      "normal": {
        "color": "#25d6f5"
      }
    }
  }, {
    "name": "Rusia",
    "value": [30, 31, 4],
    "symbolSize": 12,
    "itemStyle": {
      "normal": {
        "color": "#25d6f5"
      }
    }
  }, {
    "name": "South Afr ",
    "value": [24, -27, 4],
    "symbolSize": 10,
    "itemStyle": {
      "normal": {
        "color": "#25d6f5"
      }
    }
  }],


  "moveLines": [{
    "fromName": "青海",
    "toName": "柏林",
    "coords": [
      [110.49, 36.34],
      [13.25, 52.3]
    ]
  }, {
    "fromName": "青海",
    "toName": "SA",
    "coords": [
      [110.49, 36.34],
      [24, -27]
    ]
  }, {
    "fromName": "青海",
    "toName": "Egyp",
    "coords": [
      [110.49, 36.34],
      [30, 31]
    ]
  }, {
    "fromName": "青海",
    "toName": "India",
    "coords": [
      [110.49, 36.34],
      [77, 28]
    ]
  }, {
    "fromName": "青海",
    "toName": "波兰",
    "coords": [
      [110.49, 36.34],
      [19.08, 51.55]
    ]
  }, {
    "fromName": "青海",
    "toName": "Romania",
    "coords": [
      [110.49, 36.34],
      [25, 44]
    ]
  }, {
    "fromName": "青海",
    "toName": "Russia",
    "coords": [
      [110.49, 36.34],
      [100, 65]
    ]
  }]
};

//  chart.setOption({
var wdoption = {
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
        areaColor: '#e1e3e4',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#71a9c0'
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
    data: allData.citys
  }, {
    name: '线路',
    type: 'lines',
    coordinateSystem: 'geo',
    zlevel: 3,
    large: true,
    effect: {
      show: true,
      constantSpeed: 30,
      symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      symbolSize: 10,
      trailLength: 0.3,
    },
    lineStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'blue'
        }, {
          offset: 1,
          color: '#25d6f5'
        }], false),
        width: 3,
        opacity: 0.6,
        curveness: 0.1
      }
    },
    data: allData.moveLines
  }]
};
//  myChart.setOption(option);
//wdchart.setOption(wdoption);
