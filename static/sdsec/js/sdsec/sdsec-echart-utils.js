/**
 * author: chenchen
 * description: the echart util,this function will let you chart automated rendered.
 * params : domId(String) - the chart dom element id.
 * params : url(String) - the action url about data source.
 * params : subjectType(String) - the entity type value of ['GlobalResourcePool','GlobalProductSpecificaton'].
 * params : index(String) - the field name about entity , such as ['cpuTotal', 'cpuUsed'].
 * params : title(String) - the title about chart.
 * */
async function singleIndexLineChart(refreshChartsFunc, domId, url, subjectType, index, title, startTime) {

    //1.将UTC时间加8小时，减3分.默认查近10分钟的。
    var currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 8);
    currentTime.setMinutes(currentTime.getMinutes() - 10)

    //2.拼装请求内容
    var reqParam = {
        "subjectType": subjectType,
        "startTime": startTime,
        "indexes": [index],
    };

    //3.请求后台数据，转换成为JSON对象
    var response;
    await $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(reqParam),
        contentType: "application/json",
        success: function (result) {
            response = result.data
        },
        error: function () {
            return;
        }
    });
    var jsonData = JSON.parse(response);
    refreshChartsFunc(jsonData, domId, index);
    // return jsonData;

    // //4.将后台数据渲染至图标


    // var currentValue = jsonData.data[0][index][jsonData.data[0][index].length - 1];
    // var currentValuePercent = Number(currentValue * 100).toFixed(2) + "%";
    // var option = {
    //   color: ['#3e89dc'],
    //   title: {text: title + " " + currentValuePercent, left: '10%'},
    //   xAxis: {
    //     type: 'category',
    //     data: jsonData.xAxis.bottom,
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [{
    //     data: jsonData.data[0][index],
    //     type: 'line',
    //     smooth: true
    //   }]
    // };
    // var myChart = echarts.init(document.getElementById(domId));
    // myChart.setOption(option);
}

async function singleIndexSimpleNumValue(refreshNumFunc, url, subjectType, index) {

  //1.将UTC时间加8小时，减3分.默认查近10分钟的。
  // var currentTime = new Date();
  // currentTime.setHours(currentTime.getHours() + 8);
  // currentTime.setMinutes(currentTime.getMinutes() - 10)

  //2.拼装请求内容
  var reqParam = {
    "justCurrentData":1,
    "subjectType":subjectType,
    "indexes":[index]
  };

  //3.请求后台数据，转换成为JSON对象
  var response;
  await $.ajax({
    type: "post",
    url: url,
    data: JSON.stringify(reqParam),
    contentType: "application/json",
    success: function (result) {
      response = result.data
    },
    error: function () {
      return;
    }
  });
  var jsonData = JSON.parse(response);
  refreshNumFunc(jsonData);
  // return jsonData;

}

async function multipleIndexFilterChart(refreshChartsFunc, domId, url, subjectType, indexes, title, startTime, filters) {

  //1.将UTC时间加8小时，减3分.默认查近10分钟的。
  var currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 8);
  currentTime.setMinutes(currentTime.getMinutes() - 10)

  //2.拼装请求内容
  var reqParam = {
    "subjectType": subjectType,
    "startTime": startTime,
    "indexes": indexes,
    "filters": {
      "productType":filters
    },
    "sumIndexes":1
  };

  //3.请求后台数据，转换成为JSON对象
  var response;
  await $.ajax({
    type: "post",
    url: url,
    data: JSON.stringify(reqParam),
    contentType: "application/json",
    success: function (result) {
      response = result.data
    },
    error: function () {
      return;
    }
  });
  var jsonData = JSON.parse(response);
  refreshChartsFunc(jsonData, domId, indexes);
  // return jsonData;

  // //4.将后台数据渲染至图标


  // var currentValue = jsonData.data[0][index][jsonData.data[0][index].length - 1];
  // var currentValuePercent = Number(currentValue * 100).toFixed(2) + "%";
  // var option = {
  //   color: ['#3e89dc'],
  //   title: {text: title + " " + currentValuePercent, left: '10%'},
  //   xAxis: {
  //     type: 'category',
  //     data: jsonData.xAxis.bottom,
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   series: [{
  //     data: jsonData.data[0][index],
  //     type: 'line',
  //     smooth: true
  //   }]
  // };
  // var myChart = echarts.init(document.getElementById(domId));
  // myChart.setOption(option);
}

/**
 * author: chenchen
 * description: the echart util,this function will let you chart automated rendered.
 * params : domId(String) - the chart dom element id.
 * params : url(String) - the action url about data source.
 * params : subjectType(String) - the entity type value of ['GlobalResourcePool','GlobalProductSpecificaton'].
 * params : indexes(array) - the field name about entity , such as ['cpuTotal', 'cpuUsed'].
 * params : title(String) - the title about chart.
 * */
async function multipleIndexLineChart(refreshChartsFunc, domId, url, subjectType, indexes, title, startTime) {

    //1.将UTC时间加8小时，减3分.默认查近10分钟的。
    var currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 8);
    currentTime.setMinutes(currentTime.getMinutes() - 10)

    //2.拼装请求内容
    var reqParam = {
        "subjectType": subjectType,
        "startTime": startTime,
        "indexes": indexes,
    };

    //3.请求后台数据，转换成为JSON对象
    var response;
    await $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(reqParam),
        contentType: "application/json",
        success: function (result) {
            response = result.data
        },
        error: function () {
            return;
        }
    })
    var jsonData = JSON.parse(response);

    refreshChartsFunc(jsonData, domId, indexes);

    //4.拼凑图标所需数据
    // var colors = ['#3e89dc', '#95e0f9'];
    // var xAxises = [];
    // xAxises.push({
    //     type: 'category',
    //     axisLine: {
    //         onZero: false,
    //     },
    //     data: jsonData.xAxis.bottom
    // });
    // xAxises.push({
    //     type: 'category',
    //     axisLine: {
    //         onZero: false,
    //     },
    //     data: jsonData.xAxis.top
    // });
    // var dataset = [];
    // for (var item in indexes) {
    //     dataset.push({
    //         name: indexes[item],
    //         type: 'line',
    //         smooth: true,
    //         data: jsonData.data[item][indexes[item]]
    //     });
    // }
    //
    // //5.定义图表对象
    // var option = {};
    // option["color"] = colors;
    // option["title"] = {
    //     text: title,
    //     left: '10%',
    //     textStyle: {
    //         // fontSize:15
    //     }
    // };
    // option["legend"] = {
    //     data: indexes,
    //     right: 0,
    // };
    // option["grid"] = {
    //     top: 50,
    //     bottom: 50
    // };
    // option["xAxis"] = xAxises;
    // option["yAxis"] = [{type: 'value'}];
    // option["series"] = dataset;
    // var myChart = echarts.init(document.getElementById(domId));
    // myChart.setOption(option);
}

/**
 * author: chenchen
 * description: the echart util,this function will let you chart automated rendered.
 * params : domId(String) - the chart dom element id.
 * params : url(String) - the action url about data source.
 * params : subjectType(String) - the entity type value of ['GlobalResourcePool','GlobalProductSpecificaton'].
 * params : indexes(array) - the field name about entity , such as ['cpuTotal', 'cpuUsed'].
 * params : title(String) - the title about chart.
 * */
async function doughnutChart(refreshChartsFunc, domId, url, subjectType, indexes ,graphicsDataParamArr, seriesDataParamArr,centerValueParam) {

    //1.拼装请求内容
    var reqParam = {
        "justCurrentData": 1,
        "subjectType": subjectType,
        "indexes": indexes,
    };

    //3.请求后台数据，转换成为JSON对象
    var response;
    await $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(reqParam),
        contentType: "application/json",
        success: function (result) {
            response = result.data
        },
        error: function () {
            return;
        }
    })
    var jsonData = JSON.parse(response);
    refreshChartsFunc(jsonData, domId, indexes,graphicsDataParamArr, seriesDataParamArr,centerValueParam);
    // //4.拼凑图标所需数据
    // var option = {
    //     title: {
    //         text: title,
    //         subtext: '',
    //         subtextStyle: {
    //             color: '#000000',
    //             fontSize: 12,
    //             fontWeight: 'bold',
    //         },
    //         top: '10%',
    //         left: '10%',
    //     },
    //     color: ['#3f91e6', '#eff3f7'],
    //     tooltip: {
    //         axisPointer: {
    //             textStyle: {//默认值，
    //                 fontFamily: 'Arial, Verdana, sans...',//默认值，
    //                 fontSize: 12,//默认值，
    //                 fontStyle: 'normal',//默认值，
    //                 fontWeight: 'normal',//默认值，
    //             },
    //         }
    //     },
    //     legend: {
    //         orient: 'vertical',
    //         data: indexes,
    //         top: '10%',
    //         right: "10%",
    //     },
    //     series: [
    //         {
    //             name: title,
    //             type: 'pie',
    //             radius: ['60%', '70%'],
    //             avoidLabelOverlap: false,
    //             label: {
    //                 normal: {
    //                     show: false,
    //                     position: 'outside'
    //                 },
    //                 emphasis: {
    //                     show: true,
    //                     textStyle: {
    //                         fontSize: '20',
    //                         fontWeight: 'bold'
    //                     }
    //                 }
    //             },
    //             labelLine: {
    //                 normal: {
    //                     show: false
    //                 }
    //             }
    //         }
    //     ]
    // };
    // var dataSet = [];
    // for (var item in indexes) {
    //     dataSet.push(jsonData.data[item]);
    // }
    // option.series[0].data = dataSet;
    // var myChart = echarts.init(document.getElementById(domId));
    // myChart.setOption(option);
}

function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return myyear + "-" + mymonth + "-" + myweekday
}
function unitProcess(val){
  // 单位运算 KB/s -> MB/s -> GB/s
  let unit = ['KB/s','MB/s', 'GB/s','TB/s'];
  let tmp = val;
  let n = 0;
  let result = val+" "+unit[n];
  while (tmp>1024 ){
    tmp = (tmp/1024).toFixed(2);
    if(n==unit.length-1){
      break
    }
    result = tmp + " " +unit[++n]

  }
  return result
}
function getSecServiceProductChineseName(englishName) {
  var nameMap = {
    "SCAN":'漏洞扫描系统',
    "FIREWALL":'防火墙',
    "ANTIVIRUS":'主机杀毒系统',
    "WAF":'web应用防火墙',
    "IPS":'入侵防护系统'
  };
  return nameMap[englishName] ? nameMap[englishName] : englishName;
}
export {singleIndexLineChart, multipleIndexLineChart, multipleIndexFilterChart, singleIndexSimpleNumValue, doughnutChart, formatDate,unitProcess
  , getSecServiceProductChineseName
}
