var allData = {
  "citys": [
    {
      "name": "柏林",
      "value": [
        13.25, 52.3, 4
      ],
      "symbolSize": 12,
      "itemStyle": {
        "normal": {
          "color": "#ff2a00"
        }
      }
    }, {
      "name": "波兰",
      "value": [
        19.08, 51.55, 4
      ],
      "symbolSize": 8,
      "itemStyle": {
        "normal": {
          "color": "#e86b18"
        }
      }
    }, {
      "name": "青海",
      "value": [
        110.49, 36.34, 4
      ],
      "symbolSize": 15,
      "itemStyle": {
        "normal": {
          "color": "#e86b18"
        }
      }
    }, {
      "name": "India",
      "value": [
        77, 28, 4
      ],
      "symbolSize": 13,
      "itemStyle": {
        "normal": {
          "color": "#ff2a00"
        }
      }
    }, {
      "name": "Romania",
      "value": [
        25, 44, 4
      ],
      "symbolSize": 10,
      "itemStyle": {
        "normal": {
          "color": "#e86b18"
        }
      }
    }, {
      "name": "Rusia",
      "value": [
        100, 65, 4
      ],
      "symbolSize": 15,
      "itemStyle": {
        "normal": {
          "color": "rgba(251,197,45,0.8)"
        }
      }
    }, {
      "name": "Rusia",
      "value": [
        30, 31, 4
      ],
      "symbolSize": 12,
      "itemStyle": {
        "normal": {
          "color": "rgba(251,197,45,0.8)"
        }
      }
    }, {
      "name": "South Afr ",
      "value": [
        24, -27, 4
      ],
      "symbolSize": 10,
      "itemStyle": {
        "normal": {
          "color": "#rgba(251,197,45,0.8)"
        }
      }
    }
  ]
};

const worldmap = {
  geo: {
    map: 'world',
    top: 50,
    aspectScale: 0.8,
    zoom: 1.1,
    silent: true,
    scaleLimit: {
      min: 1.1,
      max: 1.1
    },
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: "red",
        opacity: 0,
        borderWidth: 0,
        color: {}
      },
      emphasis: {
        areaColor: '#394ca1'
      }
    }

  },

  series: [
    {
      name: '地点',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        brushType: 'fill',
        period: 1,
        scale: 4
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
          color: '#e86b18'
        }
      },
      //data: allData.citys
      data: []
    }
  ]
}

export {
  worldmap
}
