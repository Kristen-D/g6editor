import {geoCoordMap} from "../../../components/gridster/screenExhibit_AttackInfo_grid/ChartOptions";
const GZCoord = [113.5107, 23.2196];
const GZName = '广州市';

export default {
  formatGCData(geoData, data, dest) {
    let tGeoDt = [];
    if (dest) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (GZName !== data[i].name && geoData[data[i].name] !== undefined) {
          tGeoDt.push({
            coords: [GZCoord, geoData[data[i].name]]
          });
        }
      }
    } else {
      for (let i = 0, len = data.length; i < len; i++) {
        if (GZName !== data[i].name && geoData[data[i].name] !== undefined) {
          tGeoDt.push({
            coords: [geoData[data[i].name], GZCoord],
            lineStyle: {normal:{color:i >= 3 ? '#2196f3':'#ff2a00'}},
            total: data[i].value,
            fromName: data[i].name,
            toName: GZName,
          });
        }
      }
    }
    return tGeoDt;
  },
  formatVData(geoData, data) {
    let tGeoDt = [];
    for (let i = 0, len = data.length; i < len; i++) {
      let tNam = data[i].name;
      if (GZName !== tNam && geoData[tNam] !== undefined) {
        tGeoDt.push({
          name: tNam,
          value: geoData[tNam],
          symbolSize: i >= 3 ? 10:15,
          fromName: tNam,
          toName: GZName,
          total: data[i].value,
          itemStyle: {normal:{color:i >= 3 ? '#2196f3':'#ff2a00'}}
        });
      }
    }
    tGeoDt.push({
      name: GZName,
      value: GZCoord,
      symbolSize: 15,
      itemStyle: {
        normal: {
          color: '#ff2a00',
          borderColor: '#fff'
        }
      }
    });
    return tGeoDt;
  },
  loadMapChartData(geoData, mapData) {
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


    return [
      this.formatGCData(geoCoordMap, myData, false),
      this.formatVData(geoCoordMap, myData)
    ]
  }
}
