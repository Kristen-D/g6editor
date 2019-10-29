import pie from './chartType/pie.js'
import line from './chartType/line.js'


export default {
  dataConvert(chartType, options, chartData) {
    var opt = {};

    // console.log(JSON.stringify(options));
    var iopt = options;
    var iData =chartData;
    switch (chartType) {
      case 'line':
        opt = this.createLine(chartType, iopt, iData);
        break;
      case 'bar':
        opt = this.createLine(chartType, iopt, iData);
        break;
      case 'pie':
        options = this.createPie(chartType, iopt, iData);
        break;
    }


    return opt;
  },

  createLine(chartType, options, chartData) {
    var opt = {};
    opt =JSON.parse(JSON.stringify(line));
    for (var key in options) {
      opt[key] = options[key]
    }
    if (chartData.legend != "null") {
      opt.legend.data = chartData.legend;
    }
    opt.xAxis.data = chartData.xAxis;
    for (var i = 0; i < chartData.series.length; i++) {
      var obj = {};
      if (chartData.legend != "null") {
        obj.name = opt.legend.data[i];
      }
      //是否堆叠
      if (chartData.isAreaStyle) {
        obj.areaStyle = {
          normal: {}
        };
      }
      obj.type = chartType;
      obj.data = chartData.series[i];

      opt.series.push(obj);
    }

    return opt;

  },

  createPie(charType, options, chartData) {

  }





}
