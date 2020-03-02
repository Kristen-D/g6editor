<template>
  <div>
    <!--    <div id="top-date-div" style="height: 40px;margin-top:-40px;position: relative;padding:0 15px">-->
    <!--      <div style="float:right;width: 40%;padding-right: 3%;">-->
    <!--        <div style="float: left;margin-top:4px;    width: 38%;">-->
    <!--          <div style="border:solid 1px #E1E3E4;width: 100%;height: 30px;padding: 0 8%">-->
    <!--            <div style="float: left;height: 30px;padding: 0 4%;width: 25%;text-align: center">-->
    <!--              <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"-->
    <!--                         type="text">-->
    <!--                今天-->
    <!--              </el-button>-->
    <!--            </div>-->
    <!--            <div style="float: left;height: 30px;padding: 0 4%;width: 25%;text-align: center">-->
    <!--              <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"-->
    <!--                         type="text">-->
    <!--                7天-->
    <!--              </el-button>-->
    <!--            </div>-->
    <!--            <div style="float: left;height: 30px;padding: 0 4%;width: 25%;text-align: center">-->
    <!--              <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"-->
    <!--                         type="text">-->
    <!--                本月-->
    <!--              </el-button>-->
    <!--            </div>-->
    <!--            <div style="float: left;height: 30px;padding:0 4%;width: 25%;text-align: center">-->
    <!--              <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"-->
    <!--                         type="text">-->
    <!--                全年-->
    <!--              </el-button>-->
    <!--            </div>-->

    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="float: right;width: 58%;margin-top:4px">-->
    <!--          <div style="width: 100%;height: 30px" id="ai-date-range">-->
    <!--            <el-date-picker-->
    <!--              v-model="dateRange"-->
    <!--              type="daterange"-->
    <!--              size="mini"-->
    <!--              start-placeholder="开始日期"-->
    <!--              end-placeholder="结束日期">-->
    <!--            </el-date-picker>-->
    <!--          </div>-->
    <!--        </div>-->


    <!--      </div>-->
    <!--    </div>-->

    <div class="el-panel-body">
      <el-row :gutter="20">
        <el-col :span="6" class="item-div">
          <div id="totalCPULoadRate" style="width: 100%;height: 250px;"></div>
        </el-col>
        <el-col :span="6" class="item-div">
          <div id="totalMemoryLoadRate" style="width: 100%;height: 250px;"></div>
        </el-col>
        <el-col :span="6" class="item-div">
          <div id="totalNetworkIOPS" style="width: 100%;height: 250px;"></div>
        </el-col>
        <el-col :span="6" class="item-div">
          <div id="totalDiskIOPS" style="width: 100%;height: 250px;"></div>
        </el-col>
      </el-row>
      <div class="el-panel"></div>
      <el-row :gutter="20">
        <el-col :span="6" class="item-div">
          <div id="vmInstance" style="width: 100%;height: 250px;"></div>
        </el-col>
        <el-col :span="6" class="item-div">
          <div id="cpu" style="width: 100%;height: 250px;"></div>
        </el-col>
        <el-col :span="6" class="item-div">
          <div id="memory" style="width: 100%;height: 250px;"></div>
        </el-col>
        <el-col :span="6" class="item-div">
          <div id="storage" style="width: 100%;height: 250px;"></div>
        </el-col>
      </el-row>

      <div class="el-panel"></div>
      <el-row :gutter="20">
        <el-col :span="6" class="item-div">
          <div id="host" style="width: 100%;height: 250px;"></div>
        </el-col>

        <el-col :span="6" class="item-div" style="position: relative">
          <div id="eip" style="width: 100%;height: 250px;"></div>
<!--          <div style="width: 90px; height: 26px;position: absolute;top:6%;right:5%">-->
<!--            <div style="width: 50%;height: 100%;float:left;text-align: center">-->
<!--              <div-->
<!--                style="padding: 0;font-size:12px;color:rgba(62, 73, 86, 0.6);height: 100%;line-height: 26px;margin:0;width:100%;border:0;cursor: pointer"-->
<!--                :class="{'ipvX-selected':eip.toLowerCase()=='ipv4'}" @click="eipIpvXClick"-->
<!--                type="button">-->
<!--                <span>IPv4</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div style="width: 50%;height: 100%;float:right;text-align: center;border-left: 1px solid #e5e2e5;">-->
<!--              <div-->
<!--                style=" padding: 0 ;font-size:12px;color:rgba(62, 73, 86, 0.6);height: 100%;line-height: 26px;margin:0;width:100%;border:0;cursor: pointer"-->
<!--                :class="{'ipvX-selected':eip.toLowerCase()=='ipv6'}" @click="eipIpvXClick"-->
<!--                type="button">-->
<!--                <span>IPv6</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </el-col>
        <el-col :span="6" class="item-div" style="position: relative">
          <div id="privateIP" style="width: 100%;height: 250px;"></div>
<!--          <div style="width: 90px; height: 26px;position: absolute;top:6%;right:5%">-->
<!--            <div style="width: 50%;height: 100%;float:left;text-align: center">-->
<!--              <div-->
<!--                style="padding: 0;font-size:12px;color:rgba(62, 73, 86, 0.6);height: 100%;line-height: 26px;margin:0;width:100%;border:0;cursor: pointer"-->
<!--                :class="{'ipvX-selected':privateIP.toLowerCase()=='ipv4'}" @click="privateIPIpvXClick"-->
<!--                type="button">-->
<!--                <span>IPv4</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div style="width: 50%;height: 100%;float:right;text-align: center;border-left: 1px solid #e5e2e5;">-->
<!--              <div-->
<!--                style=" padding: 0 ;font-size:12px;color:rgba(62, 73, 86, 0.6);height: 100%;line-height: 26px;margin:0;width:100%;border:0;cursor: pointer"-->
<!--                :class="{'ipvX-selected':privateIP.toLowerCase()=='ipv6'}" @click="privateIPIpvXClick"-->
<!--                type="button">-->
<!--                <span>IPv6</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </el-col>
        <el-col :span="6" class="item-div">
          <div id="imageServerStorage" style="width: 100%;height: 250px;"></div>
        </el-col>
      </el-row>


    </div>
  </div>
</template>

<script>
  import {
    singleIndexLineChart,
    multipleIndexLineChart,
    doughnutChart,
    formatDate,
    unitProcess
  } from 'static/sdsec/js/sdsec/sdsec-echart-utils'

  export default {
    data() {
      return {
        privateIP: "IPV4",
        eip: "IPV4",
        timer: ''
        // dateRange: ''
      }
    },
    methods: {
      smoothedLineChartTotalCPULoadRate: function () {
        var option = this.getSingleSmoothedLineOption(['#3e89dc'], "总物理机CPU负载率", "", [], []);
        var myChart = echarts.init(document.getElementById('totalCPULoadRate'));
        myChart.setOption(option);
      },
      smoothedLineChartTotalMemoryLoadRate: function () {
        var option = this.getSingleSmoothedLineOption(['rgba(50, 197, 255, 1)'], "总物理机内存负载率", "", [], []);
        var myChart = echarts.init(document.getElementById('totalMemoryLoadRate'));
        myChart.setOption(option);
      },
      updateSmoothedLineChartTotalLoadRate: function (domId, indexName) {
        let currentTime = new Date();
        let startTime = formatDate(currentTime).substr(0, 10) + "T00:00";
        singleIndexLineChart(this.refreshSmoothedLineChartTotalLoadRateData, domId, '/sdsec/web/overview/visualization/coordinateInfo', 'GlobalResourcePool', indexName, '总物理机CPU负载率', startTime);
      },
      refreshSmoothedLineChartTotalLoadRateData: function (chartData, domId, indexName) {
        let myChart = echarts.getInstanceById(document.getElementById(domId).getAttribute('_echarts_instance_'));
        let option = myChart.getOption();
        let rate = (chartData && chartData.data[0][indexName]) ? chartData.data[0][indexName].slice(-1) * 100 + "%" : "";
        let xAxisData = chartData ? chartData.xAxis.bottom : [];
        xAxisData.forEach(function (item, i) {
          xAxisData[i] = item.substr(11)
        });
        var series1Data = chartData ? chartData.data[0][indexName] : [];
        option.title[0].subtext = rate;
        option.xAxis = {data: xAxisData};
        option.series[0].data = series1Data;
        myChart.setOption(option);
      },
      getSingleSmoothedLineOption: function (color, name, rate, xAxisData, series1Data) {
        let option = {
          color: color,
          title: {
            text: name,
            top: '5%',
            left: '6%',
            textStyle: {
              fontSize: 13,
              color: 'rgba(62, 73, 86, 0.6)',
              lineHeight: 16,
              fontWeight: 'normal',
              fontFamily: 'Microsoft YaHei'
            },
            subtext: rate,
            subtextStyle: {
              fontSize: 30,
              color: 'rgba(62,73,86,1)',
              lineHeight: 38,
              fontWeight: 'bold'
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].name + "<br/>" + params[0].marker + '负载率: &nbsp;&nbsp;&nbsp;&nbsp;' + (params[0].data * 100).toFixed(2) + " %"
            },
            textStyle: {
              color: 'rgba(62, 73, 86, 1)'
            },
            backgroundColor: '#fff',
            padding: [5, 10],
            axisPointer: {
              textStyle: {//默认值，
                fontFamily: 'Arial, Verdana, sans...',//默认值，
                fontSize: 12,//默认值，
                fontStyle: 'normal',//默认值，
                fontWeight: 'normal',//默认值，
              },
            }
          },
          grid: {
            top: '30%',
            left: 0,
            right: 0
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 12,
              color: 'rgba(62, 73, 86, 0.6)'
            }
          },
          yAxis: {
            type: 'value',
            show: false
          },
          series: [{
            name: name,
            data: series1Data,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(53, 162, 255, 0.2)'
              }, {
                offset: 1,
                color: 'rgba(53, 162, 255, 0)'
              }])
            },
            symbol: 'none'
          }]
        };
        return option;
      },
      smoothedLineChartTotalNetworkIOPS: function () {
        // multipleIndexLineChart('totalNetworkIOPS','/sdsec/web/overview/visualization/coordinateInfo','GlobalResourcePool', ['networkInputKps','networkOutputKps'], '总物理机网络吞吐量');
        var colors = ['rgba(50, 197, 255, 1)', 'rgba(109, 212, 0, 1)'];
        let areaColorArr = [['rgba(50, 197, 255, 0.2)', 'rgba(50, 197, 255, 0)'], ['rgba(109, 212, 0, 0.2)', 'rgba(109, 212, 0, 0)']];
        let option = this.getDoubleSmoothedLineOption(colors, areaColorArr, ["发送", "接收"], ["", ""], "总物理机网络吞吐量", [], [[], []]);
        var myChart = echarts.init(document.getElementById('totalNetworkIOPS'));
        myChart.setOption(option);
      },
      smoothedLineChartTotalDiskIOPS: function () {
        var colors = ['rgba(81, 119, 233, 1)', 'rgba(65, 209, 229, 1)'];
        var writeRate = '8.31 KB/s';
        var readRate = '0 B/s';
        let areaColorArr = [['rgba(81, 119, 233, 0.2)', 'rgba(81, 119, 233, 0)'], ['rgba(65, 209, 229, 0.2)', 'rgba(65, 209, 229, 0)']];
        let option = this.getDoubleSmoothedLineOption(colors, areaColorArr, ["写入", "读取"], ["", ""], "总物理机磁盘IO", [], [[], []]);
        var myChart = echarts.init(document.getElementById('totalDiskIOPS'));
        myChart.setOption(option);
      },
      updateDoubleSmoothedLineChartTotalLoadRate: function (domId, indexName) {
        let currentTime = new Date();
        let startTime = formatDate(currentTime).substr(0, 10) + "T00:00";
        multipleIndexLineChart(this.refreshDoubleSmoothedLineChartTotalLoadRateData, domId, '/sdsec/web/overview/visualization/coordinateInfo', 'GlobalResourcePool', indexName, '总物理机CPU负载率', startTime);
      },
      refreshDoubleSmoothedLineChartTotalLoadRateData: function (chartData, domId, indexNameArr) {
        let myChart = echarts.getInstanceById(document.getElementById(domId).getAttribute('_echarts_instance_'));
        let option = myChart.getOption();
        let xAxisData = chartData ? chartData.xAxis.bottom : [];
        xAxisData.forEach(function (item, i) {
          xAxisData[i] = item.substr(11)
        });

        option.graphic = {
          elements: [
            {
              type: 'group',
              left: '7%',  //参考echarts容器的定位
              top: '18%',
              children: [
                {
                  type: 'text',
                  style: {
                    text: "",
                    font: 'bold 18px "MicrosoftYaHeiUI"  ',
                    fill: "rgba(62, 73, 86, 1)"
                  }
                },
                {
                  type: 'text',
                  left: 115,
                  style: {
                    text: "",
                    font: 'bold 18px "MicrosoftYaHeiUI"  ',
                    fill: "rgba(62, 73, 86, 1)"
                  }

                }
              ]
            }

          ]
        };

        indexNameArr.forEach(function (item, index) {
          option.series[index].data = chartData.data[index][item];
          // option.graphic.elements[0].children[index].style.text = option.series[index].data.slice(-1) + " KB/s";
          option.graphic.elements[0].children[index].style.text = unitProcess(option.series[index].data.slice(-1)+"".replace(",",""));
        });
        option.xAxis = {data: xAxisData};

        myChart.setOption(option);
      },

      getDoubleSmoothedLineOption: function (colors, areaColorArr, legendArr, rateArr, name, xAxisData, seriesDataArr) {
        let option = {
          color: colors,
          title: {
            text: name,
            left: '6%',
            top: '5%',
            textStyle: {
              fontSize: 13,
              color: 'rgba(62, 73, 86, 0.6)',
              lineHeight: 16,
              fontWeight: 'normal',
              fontFamily: 'Microsoft YaHei'
            },
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].name + "<br/>" + params[0].marker + legendArr[0] + ":&nbsp;&nbsp;&nbsp;&nbsp;" + unitProcess(params[0].data+"".replace(",","")) + "</br>" + params[1].marker + legendArr[1] + ":&nbsp;&nbsp;&nbsp;&nbsp;" + unitProcess(params[1].data+"".replace(",",""))
            },
            textStyle: {
              color: 'rgba(62, 73, 86, 1)'
            },
            backgroundColor: '#fff',
            padding: [5, 10]
            // axisPointer: {
            //   type: 'cross'
            // }
          },
          grid: {
            top: '30%',
            left: 0,
            right: 0
          },
          legend: {
            data: legendArr,
            left: '6%',
            top: '25%',
            itemHeight: 3,
            itemWidth: 20,
            itemGap: 68,
            icon: 'rect'
          },
          graphic: {
            elements: [
              {
                type: 'group',
                left: '7%',  //参考echarts容器的定位
                top: '18%',
                children: [
                  {
                    id: legendArr[0],
                    type: 'text',
                    style: {
                      text: rateArr[0],
                      font: 'bold 18px "MicrosoftYaHeiUI"  ',
                      fill: "rgba(62, 73, 86, 1)"
                    }
                  },
                  {
                    id: legendArr[1],
                    type: 'text',
                    left: 115,
                    style: {
                      text: rateArr[1],
                      font: 'bold 18px "MicrosoftYaHeiUI"  ',
                      fill: "rgba(62, 73, 86, 1)"
                    }

                  }
                ]
              }

            ]
          },
          xAxis: [
            {
              type: 'category',
              // axisTick: {
              //   alignWithLabel: true
              // },
              // axisLine: {
              //   onZero: false,
              // },
              // axisPointer: {
              //   label: {
              //     formatter: function (params) {
              //       return '写速率  ' + params.value
              //         + (params.seriesData.length ? ' - ' + params.seriesData[0].data : '') + "KB/S";
              //     }
              //   }
              // },
              data: xAxisData,
              axisTick: {
                alignWithLabel: true,
                show: false
              },
              axisLine: {
                onZero: false,
                show: false
              },
              axisLabel: {
                fontSize: 12,
                color: 'rgba(62, 73, 86, 0.6)'
              },
            },
            // {
            //   type: 'category',
            //   axisTick: {
            //     alignWithLabel: true
            //   },
            //   axisLine: {
            //     onZero: false,
            //   },
            //   axisPointer: {
            //     label: {
            //       formatter: function (params) {
            //         return '读速率  ' + params.value
            //           + (params.seriesData.length ? ' - ' + params.seriesData[0].data : '') + "KB/S";
            //       }
            //     }
            //   },
            //   data: ['2：00', '4：00', '6：00', '8：00', '10：00'],
            //   axisTick: {
            //     alignWithLabel: true,
            //     show: false
            //   },
            //   axisLine: {
            //     onZero: false,
            //     show: false
            //   },
            //   axisLabel: {
            //     fontSize: 12,
            //     color: 'rgba(62, 73, 86, 0.6)'
            //   },
            // }
          ],
          yAxis: [
            {
              type: 'value',
              show: false,
            }
          ],
          series: [
            {
              name: legendArr[0],
              type: 'line',
              // xAxisIndex: 1,
              smooth: true,
              data: seriesDataArr[0],
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: areaColorArr[0][0]
                }, {
                  offset: 1,
                  color: areaColorArr[0][1]
                }])
              },
              symbol: 'none'
            },
            {
              name: legendArr[1],
              type: 'line',
              smooth: true,
              data: seriesDataArr[1],
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: areaColorArr[1][0]
                }, {
                  offset: 1,
                  color: areaColorArr[1][0]
                }])
              },
              symbol: 'none'
            }
          ]
        };
        return option;
      },
      doughnutChartVMInstance: function () {
        var width = $('#cpu').width();
        var running = 0;
        var hasStop = 0;
        var total = running + hasStop;
        var color = this.getPieChartColor("0");
        var graphicData = this.getGraphic(total + " 台", color, [{text: "总数", value: total}, {
          text: "运行中",
          value: running
        }, {text: "已停止", value: hasStop}], width)
        let option = this.getDoughnutChartOption(color, "云主机", "云主机使用情况", [], graphicData);
        var myChart = echarts.init(document.getElementById('vmInstance'));
        myChart.setOption(option);
      },
      doughnutChartCPU: function () {
        // doughnutChart('cpu','/sdsec/web/overview/visualization/portionInfo','GlobalResourcePool', ['cpuUsed','cpuUnused'], 'CPU使用情况');
        var width = $('#cpu').width();
        var hasUse = 0;
        var realTotal = 0;
        var overUse = 0;
        var color = this.getPieChartColor("0%");
        var graphicData = this.getGraphic("0%", color, [{text: "已用", value: hasUse}, {
          text: "实际总量",
          value: realTotal
        }, {text: "超分总量", value: overUse}], width)
        let option = this.getDoughnutChartOption(color, "CPU", "CPU使用情况", [], graphicData);
        var myChart = echarts.init(document.getElementById('cpu'));
        myChart.setOption(option);
      },
      doughnutChartMemory: function () {
        var width = $('#memory').width();
        var hasUse = '0 GB';
        var realTotal = '0 GB';
        var overUse = '0 GB';
        var color = this.getPieChartColor("0%");
        var graphicData = this.getGraphic("0%", color, [{text: "已用", value: hasUse}, {
          text: "实际总量",
          value: realTotal
        }, {text: "超分总量", value: overUse}], width)
        let option = this.getDoughnutChartOption(color, "内存", "内存使用情况", [], graphicData);

        var myChart = echarts.init(document.getElementById('memory'));
        myChart.setOption(option);
      },
      doughnutChartStorage: function () {
        var width = $('#storage').width();
        var hasUse = '0 GB';
        var realTotal = '0 GB';
        var overUse = '0 GB';
        var color = this.getPieChartColor("0%");
        var graphicData = this.getGraphic("0%", color, [{text: "已用", value: hasUse}, {
          text: "实际总量",
          value: realTotal
        }, {text: "超分总量", value: overUse}], width)
        let option = this.getDoughnutChartOption(color, "主存储容量", "主存储容量使用情况", [], graphicData);

        var myChart = echarts.init(document.getElementById('storage'));
        myChart.setOption(option);
      },
      doughnutChartHost: function () {
        var width = $('#host').width();
        var connected = 0;
        var unConnected = 0;
        var total = connected + unConnected;
        var color = this.getPieChartColor("0");
        var graphicData = this.getGraphic(total + " 台", color, [{text: "总数", value: total}, {
          text: "已连接",
          value: connected
        }, {text: "已失联", value: unConnected}], width)
        let option = this.getDoughnutChartOption(color, "物理机", "物理机使用情况", [], graphicData);
        var myChart = echarts.init(document.getElementById('host'));
        myChart.setOption(option);
      },
      doughnutChartEip: function () {
        var width = $('#eip').width();
        var hasUse = '0';
        var realTotal = '0';
        // var overUse = '62.35 GB';
        var color = this.getPieChartColor("0%");
        var graphicData = this.getGraphic("0%", color, [{text: "已用", value: hasUse}, {
          text: "总量",
          value: realTotal
        }], width);
        let option = this.getDoughnutChartOption(color, "公有网络IP", "公有网络IP使用情况", [], graphicData);
        var myChart = echarts.init(document.getElementById('eip'));
        myChart.setOption(option);
      },
      doughnutChartPrivateIP: function () {
        var width = $('#privateIP').width();
        var hasUse = '';
        var realTotal = '';
        // var overUse = '62.35 GB';
        var color = this.getPieChartColor("0%");
        var graphicData = this.getGraphic("0%", color, [{text: "已用", value: hasUse}, {
          text: "总量",
          value: realTotal
        }], width);
        let option = this.getDoughnutChartOption(color, "私有网络IP", "私有网络IP使用情况", [], graphicData);
        var myChart = echarts.init(document.getElementById('privateIP'));
        myChart.setOption(option);
      },
      doughnutChartImageServerStorage: function () {
        var width = $('#imageServerStorage').width();
        var hasUse = '';
        var realTotal = '';
        var color = this.getPieChartColor("0");
        var graphicData = this.getGraphic("0", color, [{text: "已用", value: hasUse}, {
          text: "总量",
          value: realTotal
        }], width);
        let option = this.getDoughnutChartOption(color, "镜像服务器容量", "镜像服务器容量使用情况", [], graphicData)
        var myChart = echarts.init(document.getElementById('imageServerStorage'));
        myChart.setOption(option);
      },
      updateDoughnutChart: function (domId, indexKeyArr, graphicsDataParamArr, seriesDataParamArr,centerValueParam) {
        let currentTime = new Date();
        let startTime = formatDate(currentTime).substr(0, 10) + "T00:00";
        doughnutChart(this.refreshDoughnutChartData, domId, '/sdsec/web/overview/visualization/portionInfo', 'GlobalResourcePool', indexKeyArr, graphicsDataParamArr, seriesDataParamArr,centerValueParam);
      },
      refreshDoughnutChartData: function (chartData, domId, indexKeyArr, graphicsDataParamArr, seriesDataParamArr, centerValueParam) {
        let myChart = echarts.getInstanceById(document.getElementById(domId).getAttribute('_echarts_instance_'));
        let option = myChart.getOption();
        let queryData = {}
        let chartSeriesData = []
        chartData.data.forEach(function (item) {
          queryData[item.name] = item.value.replace(",","")
        });
        seriesDataParamArr.forEach((item, index) => {
          chartSeriesData[index] = {name: item.text, value: queryData[item.key]}
        });
        let centerValue = this.getCenterValue(centerValueParam, queryData);

        let graphicParamArr = [];
        graphicsDataParamArr.forEach(function (item, index) {
          graphicParamArr[index] = {text: item.text, value: queryData[item.key]+(item.unit?item.unit:"")}
        });

        var width = $('#' + domId).width();
        var color = this.getPieChartColor(centerValue);
        var graphicData = this.getGraphic(centerValue, color, graphicParamArr, width);

        option.graphic = graphicData;
        option.color = [color, 'rgba(0, 123, 232, 0.1)'];
        option.series[0].data = chartSeriesData;

        myChart.setOption(option);
      },
      getDoughnutChartOption: function (color, title, seriesName, seriesData, graphicData) {
        var option = {
          title: {
            text: title,
            textStyle: {
              fontSize: 14,
              color: 'rgba(62, 73, 86, 1)',
              lineHeight: 18,
              fontWeight: 'bold',
              fontFamily: 'Microsoft YaHei'
            },
            // subtext: '\n\n\n\n\n\n\n\n已用   54.73GB\n\n总量  3.61TB',
            // subtextStyle: {
            //   color: '#000000',
            //   fontSize: 12,
            //   fontWeight: 'bold',
            // },
            top: '5%',
            left: '6%'
          },
          color: [color, 'rgba(0, 123, 232, 0.1)'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
            textStyle: {
              color: 'rgba(62, 73, 86, 1)'
            },
            backgroundColor: '#fff',
            padding: [5, 10],
            axisPointer: {
              textStyle: {//默认值，
                fontFamily: 'Arial, Verdana, sans...',//默认值，
                fontSize: 12,//默认值，
                fontStyle: 'normal',//默认值，
                fontWeight: 'normal',//默认值，
              },
            }
          },
          legend: {
            orient: 'vertical',
            data: ['已使用', '未使用'],
            top: '10%',
            right: '10%',
            show: false
          },
          graphic: graphicData,
          series: [
            {
              name: seriesName,
              type: 'pie',
              radius: ['49%', '55%'],
              avoidLabelOverlap: false,
              center: ['30%', 'center'],
              label: {
                normal: {
                  show: false,
                  position: 'outside'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: seriesData
            }
          ]
        };
        return option;
      },
      getGraphic: function (centerValue, centerColor, array, width) {


        var centerValueOffset = width * 0.3 - centerValue.replace("\.", "").length * 8;
        var textWidth = width * 0.4;

        var graphic = {
          elements: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: centerValueOffset,
            top: 'middle',
            style: {
              text: centerValue,
              textAlign: 'center',
              textVerticalAlign: 'middle',
              fill: centerColor,　　　　　　　　//文字的颜色
              font: 'bold 21px "MicrosoftYaHeiUI"  ',
              // width: 30,
              // height: 30,
              // fontSize: 21,
              // color: "#4d4f5c",
              // fontFamily: "Microsoft YaHei"
            }
          }, {
            type: 'group',
            left: '55%',
            top: '30%',
            width: textWidth,
            children: [
              {
                type: 'text',
                left: 0,
                style: {
                  text: array[0].text,
                  textAlign: 'left',
                  font: '14px "MicrosoftYaHeiUI"  ',
                  fill: "rgba(62, 73, 86, 0.6)"
                }
              }, {
                type: 'text',
                right: 0,
                style: {
                  text: array[0].value,
                  textAlign: 'right',
                  font: '14px "MicrosoftYaHeiUI"  ',
                  fill: "rgba(62, 73, 86, 1)"
                }
              }, {
                type: 'line',
                // top: 10,
                top: 18,

                // height: 2,
                shape: {
                  x1: 0,
                  y1: 0,
                  x2: textWidth,
                  y2: 0

                },
                style: {
                  fill: 'rgba(225, 226, 227, 1)',
                  lineWidth: 1,
                  stroke: 'rgba(225, 226, 227, 1)'
                }
              }
            ]
          }
          ]
        };
        for (let i = 1; i < array.length; i++) {
          var group = {
            type: 'group',
            left: '55%',
            top: (42 + (i - 1) * 10) + '%',
            width: textWidth,
            children: [
              {
                type: 'text',
                left: 0,
                style: {
                  text: array[i].text,
                  textAlign: 'left',
                  font: '12px "MicrosoftYaHeiUI"  ',
                  fill: "rgba(62, 73, 86, 0.6)"
                }
              }, {
                type: 'text',
                right: 0,
                style: {
                  text: array[i].value,
                  textAlign: 'right',
                  font: '12px "MicrosoftYaHeiUI"  ',
                  fill: "rgba(62, 73, 86, 1)"
                }
              }
            ]
          };
          graphic.elements.push(group);
        }
        return graphic;
      },
      getPieChartColor: function (proportion) {
        var color = ""
        if (proportion.match("^\\d+([\\.]\\d+)?%$") != null && Number(proportion.substr(0, proportion.length - 1)) == 100) {
          color = "rgba(236, 89, 96, 1)"
        } else if (proportion.match("^\\d+([\\.]\\d+)?$") != null && Number(proportion) == 100) {
          color = "rgba(236, 89, 96, 1)"
        } else {
          color = "rgba(0, 123, 232, 1)"
        }
        return color;
      },
      eipIpvXClick: function () {
        if (this.eip.toLowerCase() == "ipv4") {
          this.eip = "IPv6"
        } else {
          this.eip = "IPv4"
        }
        let myChart = echarts.getInstanceById(document.getElementById('eip').getAttribute('_echarts_instance_'));
        let option = myChart.getOption();
        var width = $('#eip').width();
        var hasUse = '7';
        var realTotal = '10';
        // var overUse = '62.35 GB';
        var color = this.getPieChartColor("70%");
        var graphicData = this.getGraphic("70%", color, [{text: "已用", value: hasUse}, {
          text: "总量",
          value: realTotal
        }], width);
        option.graphic = graphicData;
        option.color = [color, 'rgba(0, 123, 232, 0.1)'];
        option.series[0].data = [
          {value: 7, name: '已使用'},
          {value: 3, name: '未使用'},
        ];
        myChart.setOption(option);

      },
      privateIPIpvXClick: function () {
        if (this.privateIP.toLowerCase() == "ipv4") {
          this.privateIP = "IPv6"
        } else {
          this.privateIP = "IPv4"
        }

        let myChart = echarts.getInstanceById(document.getElementById('privateIP').getAttribute('_echarts_instance_'));
        let option = myChart.getOption();
        var width = $('#privateIP').width();
        var hasUse = '6';
        var realTotal = '10';
        // var overUse = '62.35 GB';
        var color = this.getPieChartColor("60%");
        var graphicData = this.getGraphic("60%", color, [{text: "已用", value: hasUse}, {
          text: "总量",
          value: realTotal
        }], width);
        option.graphic = graphicData;
        option.color = [color, 'rgba(0, 123, 232, 0.1)'];
        option.series[0].data = [
          {value: 6, name: '已使用'},
          {value: 4, name: '未使用'},
        ];
        myChart.setOption(option);

      },
      getCenterValue:function (centerValueParam, queryData) {
        let centerValue = "";
        switch (centerValueParam.type) {
          case "percent":
            let param = centerValueParam.value.split("/");
            centerValue = (queryData[param[0]]*100/queryData[param[1]]).toFixed(2)+"%";
            break;
          case "value":
            centerValue = queryData[centerValueParam.value]+(centerValueParam.unit?centerValueParam.unit:"");
            break;
          default:
            break
        }
        return centerValue;

      },
      refreshData: function () {

        this.updateSmoothedLineChartTotalLoadRate("totalCPULoadRate", "cpuLoadRate");

        this.updateSmoothedLineChartTotalLoadRate("totalMemoryLoadRate", "memoryLoadRate");

        this.updateDoubleSmoothedLineChartTotalLoadRate("totalNetworkIOPS", ["networkInputKps", "networkOutputKps"]);
        this.updateDoubleSmoothedLineChartTotalLoadRate("totalDiskIOPS", ["diskReadKps", "diskWriteKps"]);

        this.updateDoughnutChart("vmInstance", ["vmserverTotal","vmserverRunningCount","vmserverStopedCount"], [{key:"vmserverTotal",text:"总数"}, {key:"vmserverRunningCount",text:"运行中"}, {key:"vmserverStopedCount",text:"已停止"}], [{key:"vmserverRunningCount",text:"运行中"},{key:"vmserverStopedCount",text:"已停止"}],{type:"value", value:"vmserverRunningCount",unit:" 台"});

        this.updateDoughnutChart("cpu", ["cpuUsed","cpuTotal","cpuVirtualTotal", "cpuUnused" ], [{key:"cpuUsed",text:"已用"}, {key:"cpuTotal",text:"总量"}, {key:"cpuVirtualTotal",text:"超分总量"}], [{key:"cpuUsed",text:"已使用"},{key:"cpuUnused",text:"未使用"}], {type:"percent", value:"cpuUsed/cpuTotal"});

        this.updateDoughnutChart("memory", ["memoryTotal","memoryUsed","memoryVirtualTotal","memoryUnused"], [{key:"memoryUsed",text:"已用",unit:" GB"}, {key:"memoryTotal",text:"总量",unit:" GB"}, {key:"memoryVirtualTotal",text:"超分总量",unit:" GB"}], [{key:"memoryUsed",text:"已使用"},{key:"memoryUnused",text:"未使用"}], {type:"percent", value:"memoryUsed/memoryTotal"});

        this.updateDoughnutChart("storage", ["masterStorageUsed","masterStorageTotal","masterStorageVirtualTotal","masterStorageUnused"], [{key:"masterStorageUsed",text:"已用",unit:" GB"}, {key:"masterStorageTotal",text:"总量",unit:" GB"}, {key:"masterStorageVirtualTotal",text:"超分总量",unit:" GB"}], [{key:"masterStorageUsed",text:"已使用"},{key:"masterStorageUnused",text:"未使用"}], {type:"percent", value:"masterStorageUsed/masterStorageTotal"});

        this.updateDoughnutChart("host", ["hostTotal","hostConnectCount","hostDisconnectCount"], [{key:"hostTotal",text:"总数"}, {key:"hostConnectCount",text:"已连接"}, {key:"hostDisconnectCount",text:"已失联"}], [{key:"hostConnectCount",text:"已连接"},{key:"hostDisconnectCount",text:"已失联"}],{type:"value", value:"hostTotal",unit:" 台"});

        this.updateDoughnutChart("eip", ["eipUsed","eipTotal","eipUnused"],  [{key:"eipUsed",text:"已用"}, {key:"eipTotal",text:"总量"}], [{key:"eipUsed",text:"已使用"},{key:"eipUnused",text:"未使用"}], {type:"percent", value:"eipUsed/eipTotal"});

        this.updateDoughnutChart("privateIP", ["privateIpUsed","privateIp","privateIpUnused"], [{key:"privateIpUsed",text:"已用"}, {key:"privateIp",text:"总量"}], [{key:"privateIpUsed",text:"已使用"},{key:"privateIpUnused",text:"未使用"}], {type:"percent", value:"privateIpUsed/privateIp"});

        this.updateDoughnutChart("imageServerStorage", ["imageStorageUsed","imageStorageTotal" ,"imageStorageUnused"], [{key:"imageStorageUsed",text:"已用",unit:" GB"}, {key:"imageStorageTotal",text:"总量",unit:" GB"}], [{key:"imageStorageUsed",text:"已使用"},{key:"imageStorageUnused",text:"未使用"}], {type:"percent", value:"imageStorageUsed/imageStorageTotal"});

      }

    },
    mounted: function () {
      this.smoothedLineChartTotalCPULoadRate();
      // this.updateSmoothedLineChartTotalLoadRate("totalCPULoadRate", "cpuLoadRate");

      this.smoothedLineChartTotalMemoryLoadRate();
      // this.updateSmoothedLineChartTotalLoadRate("totalMemoryLoadRate", "memoryLoadRate");

      this.smoothedLineChartTotalNetworkIOPS();
      // this.updateDoubleSmoothedLineChartTotalLoadRate("totalNetworkIOPS", ["networkInputKps", "networkOutputKps"])
      this.smoothedLineChartTotalDiskIOPS();
      // this.updateDoubleSmoothedLineChartTotalLoadRate("totalDiskIOPS", ["diskReadKps", "diskWriteKps"])

      this.doughnutChartVMInstance();
      // this.updateDoughnutChart("vmInstance", ["vmserverTotal","vmserverRunningCount","vmserverStopedCount"], [{key:"vmserverTotal",text:"总数"}, {key:"vmserverRunningCount",text:"运行中"}, {key:"vmserverStopedCount",text:"已停止"}], [{key:"vmserverRunningCount",text:"运行中"},{key:"vmserverStopedCount",text:"已停止"}],{type:"value", value:"vmserverRunningCount",unit:" 台"});

      this.doughnutChartCPU();
      // this.updateDoughnutChart("cpu", ["cpuUsed","cpuTotal","cpuVirtualTotal", "cpuUnused" ], [{key:"cpuUsed",text:"已用"}, {key:"cpuTotal",text:"总量"}, {key:"cpuVirtualTotal",text:"超分总量"}], [{key:"cpuUsed",text:"已使用"},{key:"cpuUnused",text:"未使用"}], {type:"percent", value:"cpuUsed/cpuTotal"});

      this.doughnutChartMemory();
      // this.updateDoughnutChart("memory", ["memoryTotal","memoryUsed","memoryVirtualTotal","memoryUnused"], [{key:"memoryUsed",text:"已用",unit:" GB"}, {key:"memoryTotal",text:"总量",unit:" GB"}, {key:"memoryVirtualTotal",text:"超分总量",unit:" GB"}], [{key:"memoryUsed",text:"已使用"},{key:"memoryUnused",text:"未使用"}], {type:"percent", value:"memoryUsed/memoryTotal"});

      this.doughnutChartStorage();
      // this.updateDoughnutChart("storage", ["masterStorageUsed","masterStorageTotal","masterStorageVirtualTotal","masterStorageUnused"], [{key:"masterStorageUsed",text:"已用",unit:" GB"}, {key:"masterStorageTotal",text:"总量",unit:" GB"}, {key:"masterStorageVirtualTotal",text:"超分总量",unit:" GB"}], [{key:"masterStorageUsed",text:"已使用"},{key:"masterStorageUnused",text:"未使用"}], {type:"percent", value:"masterStorageUsed/masterStorageTotal"});

      this.doughnutChartHost();
      // this.updateDoughnutChart("host", ["hostTotal","hostConnectCount","hostDisconnectCount"], [{key:"hostTotal",text:"总数"}, {key:"hostConnectCount",text:"已连接"}, {key:"hostDisconnectCount",text:"已失联"}], [{key:"hostConnectCount",text:"已连接"},{key:"hostDisconnectCount",text:"已失联"}],{type:"value", value:"hostTotal",unit:" 台"});

      this.doughnutChartEip();
      // this.updateDoughnutChart("eip", ["eipUsed","eipTotal","eipUnused"],  [{key:"eipUsed",text:"已用"}, {key:"eipTotal",text:"总量"}], [{key:"eipUsed",text:"已使用"},{key:"eipUnused",text:"未使用"}], {type:"percent", value:"eipUsed/eipTotal"});

      this.doughnutChartPrivateIP();
      // this.updateDoughnutChart("privateIP", ["privateIpUsed","privateIp","privateIpUnused"], [{key:"privateIpUsed",text:"已用"}, {key:"privateIp",text:"总量"}], [{key:"privateIpUsed",text:"已使用"},{key:"privateIpUnused",text:"未使用"}], {type:"percent", value:"privateIpUsed/privateIp"});

      this.doughnutChartImageServerStorage();
      // this.updateDoughnutChart("imageServerStorage", ["imageStorageUsed","imageStorageTotal" ,"imageStorageUnused"], [{key:"imageStorageUsed",text:"已用"}, {key:"imageStorageTotal",text:"总量"}], [{key:"imageStorageUsed",text:"已使用"},{key:"imageStorageUnused",text:"未使用"}], {type:"percent", value:"imageStorageUsed/imageStorageTotal"});

      this.refreshData();

      // // 为了显示头部日期控件 取消掉 父级元素 class="el-tabs__content" 的overflow hidden 属性
      // $("#top-date-div").parent().parent().parent().css("overflow", "visible");
      this.timer = setInterval(this.refreshData, 10000);
    },
    created: async function () {
    },
    beforeDestroy:function () {
      clearInterval(this.timer);
    }
  }
</script>

<style>

  #ai-date-range {
    border: 0;
  }

  #ai-date-range .el-date-editor--daterange {
    margin-top: 0;
    width: 100%;
    height: 100%;
  }

  #ai-date-range .el-range__close-icon {
    width: 20px;
  }

  .item-div {
    padding: 0 16px 16px 16px;
  }

  .item-div > div {
    border: 1px solid #e5e2e5;
  }

  .ipvX-selected {
    background-color: rgba(0, 123, 232, 1);
  }

  .ipvX-selected > span {
    color: #fff
  }
</style>
