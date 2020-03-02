<template>
<div class="echartsmapbox1" id="instspreadmap"></div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      if (this.activeScreen === 5) {
        this.loadMapChart();
      }
    }
  },
  methods: {
    loadMapChart() {
      let myChart = echarts.init(document.getElementById('instspreadmap'));　
      let geoCoordMap = {
        '尖草坪区': [112.487122, 37.939893],
        '万柏林区': [112.522258, 37.862653],
        '迎泽区': [112.558851, 37.855804],
        '小店区': [112.564273, 37.817974],
        '杏花岭区': [112.560743, 37.879291],
        '晋源区': [112.477849, 37.715619],
        '清徐县': [112.357961, 37.60729],
        '古交市': [112.174353, 37.908534],
        '娄烦县': [111.793798, 38.066035],
        '阳曲县': [112.673818, 38.058797],
        '太原汾河站': [112.546712, 37.954773],
        '太原长沟植物园': [112.59328, 37.945667],
        '太原北站': [112.573733, 37.925176],
        '森林公园': [112.539813, 37.915156],
        '龙潭公园': [112.559935, 37.889189],
        '太原西站': [112.500718, 37.885088],
        '山西医科大学': [112.558785, 37.85683],
        '山西大学': [112.595579, 37.806213],
        '太原南站': [112.615126, 37.798002],
        '山西工商学院': [112.586956, 37.773818],
        '太原皇后园站': [112.578332, 37.976791],
        '太原向阳店站': [112.513941, 37.999543],
        '阳曲镇': [112.585231, 37.995903],
        '青龙镇': [112.626625, 38.027745],
        '五七农场': [112.65652, 38.018649],
        '中北大学': [112.453, 38.020923],
        '马头水乡': [112.432303, 37.961316],
        '太原武宿国际机场': [112.640423, 37.761667],
        '太原学院': [112.612827, 37.700478],
        '泥屯镇': [112.550736, 38.095476],
        '东黄水镇': [112.780702, 38.078663],
        '柏井站': [112.731259, 38.11819],
        '阳曲西站': [112.654796, 38.079117],
        '米峪镇': [111.690662, 37.950391],
        '社交曲镇': [111.945925, 38.050481],
        '庙湾乡': [111.905106, 38.099111],
        '岔口乡': [111.901656, 37.85381],
        '马兰镇': [112.035037, 37.856545],
        '大岭河站': [112.110926, 37.84834],
        '常安乡': [112.04941, 37.810034],
        '孟封镇': [112.412756, 37.499945],
        '东于镇': [112.292024, 37.601566],
        '杨兴乡': [112.899135, 38.263677]
      };
      let data1 = [{
          name: "古交市",
          value: 313
        },
        {
          name: "娄烦县",
          value: 366
        },
        {
          name: "阳曲县",
          value: 402
        },
        {
          name: "清徐县",
          value: 458
        },
        {
          name: "小店区",
          value: 511
        },
        {
          name: "晋源区",
          value: 569,
        },
        {
          name: "尖草坪区",
          value: 615
        },
        {
          name: "万柏林区",
          value: 663
        },
        {
          name: "杏花岭区",
          value: 735
        },
        {
          name: "迎泽区",
          value: 777
        }
      ];
      let data2 = [{
          name: "太原汾河站",
          value: 2
        },
        {
          name: "太原长沟植物园",
          value: 1
        },
        {
          name: "太原北站",
          value: 20
        },
        {
          name: "森林公园",
          value: 13
        },
        {
          name: "龙潭公园",
          value: 19
        },
        {
          name: "太原西站",
          value: 2
        },
        {
          name: "山西医科大学",
          value: 3
        },
        {
          name: "山西大学",
          value: 17
        },
        {
          name: "太原南站",
          value: 2
        },
        {
          name: "山西工商学院",
          value: 13
        },
        {
          name: "太原皇后园站",
          value: 1
        },
        {
          name: "太原向阳店站",
          value: 12
        },
        {
          name: "阳曲镇",
          value: 13
        },
        {
          name: "青龙镇",
          value: 18
        },
        {
          name: "五七农场",
          value: 2
        },
        {
          name: "中北大学",
          value: 3
        },
        {
          name: "马头水乡",
          value: 11
        },
        {
          name: "太原武宿国际机场",
          value: 11
        },
        {
          name: "太原学院",
          value: 18
        },
        {
          name: "泥屯镇",
          value: 2
        },
        {
          name: "东黄水镇",
          value: 13
        },
        {
          name: "柏井站",
          value: 2
        },
        {
          name: "阳曲西站",
          value: 11
        },
        {
          name: "米峪镇",
          value: 12
        },
        {
          name: "社交曲镇",
          value: 13
        },
        {
          name: "庙湾乡",
          value: 19
        },
        {
          name: "岔口乡",
          value: 20
        },
        {
          name: "马兰镇",
          value: 13
        },
        {
          name: "大岭河站",
          value: 16
        },
        {
          name: "常安乡",
          value: 12
        },
        {
          name: "孟封镇",
          value: 9
        },
        {
          name: "东于镇",
          value: 12
        },
        {
          name: "杨兴乡",
          value: 11
        }
      ];

      let convertData = function(data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      let option = {
        //	color:['#ff4e00','#1286fd'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: '10',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 25,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
          },
          data: ['重要单位', '普通单位'],
        },
        geo: {
          map: 'taiyuan',
          roam: true,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff',
                fontWeight: 500
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff',
                fontWeight: 500
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#bbbec2',
              borderColor: 'rgba(0,0,0,0.3)',
              borderWidth: 2,
            },
            emphasis: {
              areaColor: 'rgba(235,203,30,0.8)'
            }
          }
        },
        series: [{
          name: '重要单位',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(data1),
          symbolSize: 12,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#ff4e00'
            }
          }
        }, {
          name: '普通单位',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(data2),
          symbolSize: 12,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#1286fd'
            }
          }
        }]

      };

      myChart.setOption(option);
      window.onresize = myChart.resize;
    }
  },
  mounted: function() {
    // this.loadMapChart();
  }
}
</script>

<style lang="css">
</style>
