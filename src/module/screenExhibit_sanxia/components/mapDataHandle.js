import {geoCoordMap} from "../../../components/gridster/screenExhibit_AttackInfo_grid/ChartOptions";
const GZCoord = [116.46, 39.92];
const GZName = '北京市';

const TOLName = [   ['北京',[116.46, 39.92]],
                    ['成都',[104.07, 30.67]],
                    ['宜昌',[111.28 , 30.70]]
                  ]

export default {

  loadMapChartData(geoData, mapData) {

    var formatGCData=function(item,geoData, data, dest) {
      let tGeoDt = [];
      if (dest) {
        for (let i = 0, len = data.length; i < len; i++) {
          if (item[0] !== data[i].name && geoData[data[i].name] !== undefined) {
            tGeoDt.push({
              coords: [item[1], geoData[data[i].name]]
            });
          }
        }
      } else {
        for (let i = 0, len = data.length; i < len; i++) {
          if (item[0] !== data[i].name && geoData[data[i].name] !== undefined) {
            tGeoDt.push({
              coords: [geoData[data[i].name], item[1]],
              lineStyle: {normal:{color:i >= 3 ? '#2196f3':'#ff2a00'}},
              total: data[i].value,
              fromName: data[i].name,
              toName: item[0],
            });
          }

        }

      }
      return tGeoDt;
    };


    
    var formatVData=function(item,geoData, data) {
      let tGeoDt = [];
      for (let i = 0, len = data.length; i < len; i++) {
        let tNam = data[i].name;
        if (item[0] !== tNam && geoData[tNam] !== undefined) {
          tGeoDt.push({
            name: tNam,
            value: geoData[tNam],
            symbolSize: i >= 3 ? 10:15,
            fromName: tNam,
            toName: item[0],
            total: data[i].value,
            itemStyle: {normal:{color:i >= 3 ? '#2196f3':'#ff2a00'}}
          });
        }
      }
      tGeoDt.push({
        name: item[0],
        value: item[1],
        symbolSize: 15,
        itemStyle: {
          normal: {
            color: '#ff2a00',
            borderColor: '#fff'
          }
        }
      });

      return tGeoDt;

    };





    for (let i = 0; i < geoData.length; i++) {
      let dataUnit = geoData[i];
      let list = [];
      let strs = dataUnit.mycode.split(","); //字符分割
      list.push(strs[0]);
      list.push(strs[1]);
      geoCoordMap[dataUnit.name] = list;
    }
    let myData = [];
    for (let i = 0; i < mapData.length; i++) {
      let dataUnit = mapData[i];
      let child = {
        name: '1', value: 0
      };
      child.name = dataUnit.ipSourceName;
      child.value = dataUnit.total;
      myData.push(child);
    }

    let series = [];
    TOLName.forEach(function(item,i){
      series.push({
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
        data:formatVData(item,geoCoordMap, myData),
        tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          // console.log(params);
          let str = "攻击来源:";
          if (params.name !== item[0]) {
            str += params.data.fromName;
            str += " ,被攻击地点:";
            str += params.data.toName;
            str += " ,攻击数量:";
            str += params.data.total;
          } else {
            str = "被攻击地点:";
            str += params.name;
          }
          return str;
        }
        },
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
            width: 1,
            opacity: 0.6,
            curveness: 0.1
          }
        },
        data: formatGCData(item,geoCoordMap, myData, false),
        tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          // console.log(params);
          let str = "攻击来源:";
          if (params.name !== item[0]) {
            str += params.data.fromName;
            str += " ,被攻击地点:";
            str += params.data.toName;
            str += " ,攻击数量:";
            str += params.data.total;
          } else {
            str = "被攻击地点:";
            str += params.name;
          }
          return str;
        }
        },

      })
    })

    return series;
  }
}
