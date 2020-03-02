<template>
  <div>

    <div class="el-panel-body">
      <div id="totalCPULoadRate" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="totalMemoryLoadRate" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="totalNetworkIOPS" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="totalDiskIOPS" style="width: 25%;height: 250px;display: inline-block"></div>

      <div id="vmInstance" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="cpu" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="memory" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="storage" style="width: 25%;height: 250px;display: inline-block"></div>

      <div id="host" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="eip" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="privateIP" style="width: 25%;height: 250px;float:left;display: inline-block"></div>
      <div id="imageServerStorage" style="width: 25%;height: 250px;display: inline-block"></div>

    </div>
  </div>
</template>

<script>
  import {singleIndexLineChart, multipleIndexLineChart, doughnutChart} from 'static/sdsec/js/sdsec/sdsec-echart-utils'

  export default {
    data() {
      return {
        privateIP: "IPV4",
        eip: "IPV4"
      }
    },
    methods: {
      smoothedLineChartTotalCPULoadRate: async function () {
        singleIndexLineChart('totalCPULoadRate', '/sdsec/web/overview/visualization/coordinateInfo', 'GlobalResourcePool', 'cpuLoadRate', '总物理机CPU负载率');
      },
      smoothedLineChartTotalMemoryLoadRate: function () {
        var option = {
          color: ['#3e89dc'],
          title: {text: "总物理机内存负载率 36.04%", left: '10%'},
          xAxis: {
            type: 'category',
            data: ['2：00', '4：00', '6：00', '8：00', '10：00']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [30.55, 20.42, 34.17, 25.77, 36.04],
            type: 'line',
            smooth: true
          }]
        };
        var myChart = echarts.init(document.getElementById('totalMemoryLoadRate'));
        myChart.setOption(option);
      },
      smoothedLineChartTotalNetworkIOPS: function () {
        multipleIndexLineChart('totalNetworkIOPS','/sdsec/web/overview/visualization/coordinateInfo','GlobalResourcePool', ['networkInputKps','networkOutputKps'], '总物理机网络吞吐量');
      },
      smoothedLineChartTotalDiskIOPS: function () {
        var colors = ['#3e89dc', '#95e0f9', '#d14a61'];
        var option = {
          color: colors,
          title: {
            text: "总物理机磁盘IO",
            left: '10%',
            textStyle: {
              // fontSize:15
            }
          },
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['写入', '读取'],
            right: 0,
          },
          grid: {
            top: 50,
            bottom: 50
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '写速率  ' + params.value
                      + (params.seriesData.length ? ' - ' + params.seriesData[0].data : '') + "KB/S";
                  }
                }
              },
              data: ['2：00', '4：00', '6：00', '8：00', '10：00']
            },
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '读速率  ' + params.value
                      + (params.seriesData.length ? ' - ' + params.seriesData[0].data : '') + "KB/S";
                  }
                }
              },
              data: ['2：00', '4：00', '6：00', '8：00', '10：00']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '写入',
              type: 'line',
              // xAxisIndex: 1,
              smooth: true,
              data: [4205, 5197, 6236, 4585, 4743]
            },
            {
              name: '读取',
              type: 'line',
              smooth: true,
              data: [2050, 3137, 6177, 7897, 7421]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('totalDiskIOPS'));
        myChart.setOption(option);
      },
      doughnutChartVMInstance: function () {
        var option = {
          title: {
            text: "云主机",
            subtext: '\n\n\n\n\n\n\n\n运行中   5\n\n已停止   1',
            subtextStyle: {
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bold',
            },
            top: '10%',
            left: '10%'
          },
          color: ['#3f91e6', '#eff3f7'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
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
            show: true,
            orient: 'vertical',
            data: ['运行中', '已停止'],
            top: '10%',
            right: '10%',
          },
          graphic: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: 'center',
            top: '47%',
            style: {
              text: "6台",
              textAlign: 'center',
              fill: '#000',　　　　　　　　//文字的颜色
              width: 30,
              height: 30,
              fontSize: 18,
              color: "#4d4f5c",
              fontFamily: "Microsoft YaHei"
            }
          }],
          series: [
            {
              name: 'CPU使用情况',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
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
              data: [
                {value: 5, name: '运行中'},
                {value: 1, name: '已停止'},
              ]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('vmInstance'));
        myChart.setOption(option);
      },
      doughnutChartCPU: function () {
        doughnutChart('cpu','/sdsec/web/overview/visualization/portionInfo','GlobalResourcePool', ['cpuUsed','cpuUnused'], 'CPU使用情况');
      },
      doughnutChartMemory: function () {
        var option = {
          title: {
            text: "内存",
            subtext: '\n\n\n\n\n\n\n\n已用   16GB\n\n实际总量  62.35GB\n\n超分总量  62.35GB',
            subtextStyle: {
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bold',
            },
            top: '10%',
            left: '10%'
          },
          color: ['#3f91e6', '#eff3f7'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
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
          },
          graphic: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: 'center',
            top: '47%',
            style: {
              text: "25.7%",
              textAlign: 'center',
              fill: '#000',　　　　　　　　//文字的颜色
              width: 30,
              height: 30,
              fontSize: 18,
              color: "#4d4f5c",
              fontFamily: "Microsoft YaHei"
            }
          }],
          series: [
            {
              name: 'CPU使用情况',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
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
              data: [
                {value: 16, name: '已使用'},
                {value: 46.35, name: '未使用'},
              ]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('memory'));
        myChart.setOption(option);
      },
      doughnutChartStorage: function () {
        var option = {
          title: {
            text: "主存储容量",
            subtext: '\n\n\n\n\n\n\n\n已用   238.56GB\n\n实际总量  3.61TB\n\n超分总量  3.61TB',
            subtextStyle: {
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bold',
            },
            top: '10%',
            left: '10%'
          },
          color: ['#3f91e6', '#eff3f7'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
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
          },
          graphic: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: 'center',
            top: '47%',
            style: {
              text: "6.5%",
              textAlign: 'center',
              fill: '#000',　　　　　　　　//文字的颜色
              width: 30,
              height: 30,
              fontSize: 18,
              color: "#4d4f5c",
              fontFamily: "Microsoft YaHei"
            }
          }],
          series: [
            {
              name: 'CPU使用情况',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
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
              data: [
                {value: 238, name: '已使用'},
                {value: 3459, name: '未使用'},
              ]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('storage'));
        myChart.setOption(option);
      },
      doughnutChartHost: function () {
        var option = {
          title: {
            text: "物理机",
            subtext: '\n\n\n\n\n\n\n\n已连接   1\n\n已失联   0',
            subtextStyle: {
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bold',
            },
            top: '10%',
            left: '10%'
          },
          color: ['#3f91e6', '#eff3f7'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
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
            data: ['已连接', '已失联'],
            top: '10%',
            right: '10%',
          },
          graphic: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: 'center',
            top: '47%',
            style: {
              text: "1台",
              textAlign: 'center',
              fill: '#000',　　　　　　　　//文字的颜色
              width: 30,
              height: 30,
              fontSize: 18,
              color: "#4d4f5c",
              fontFamily: "Microsoft YaHei"
            }
          }],
          series: [
            {
              name: 'CPU使用情况',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
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
              data: [
                {value: 1, name: '已连接'},
                {value: 0, name: '已失联'},
              ]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('host'));
        myChart.setOption(option);
      },
      doughnutChartEip: function () {
        var option = {
          title: {
            text: "公有网络IP",
            subtext: '\n\n\n\n\n\n\n\n已用   2\n\n总量   2',
            subtextStyle: {
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bold',
            },
            top: '10%',
            left: '10%'
          },
          color: ['#d75455', '#eff3f7'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
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
          },
          graphic: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: 'center',
            top: '47%',
            style: {
              text: "100%",
              textAlign: 'center',
              fill: '#000',　　　　　　　　//文字的颜色
              width: 30,
              height: 30,
              fontSize: 18,
              color: "#4d4f5c",
              fontFamily: "Microsoft YaHei"
            }
          }],
          series: [
            {
              name: 'CPU使用情况',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
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
              data: [
                {value: 2, name: '已使用'},
                {value: 0, name: '未使用'},
              ]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('eip'));
        myChart.setOption(option);
      },
      doughnutChartPrivateIP: function () {
        var option = {
          title: {
            text: "私有网络IP",
            subtext: '\n\n\n\n\n\n\n\n已用   8\n\n总量   506',
            subtextStyle: {
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bold',
            },
            top: '10%',
            left: '10%'
          },
          color: ['#3f91e6', '#eff3f7'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
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
          },
          graphic: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: 'center',
            top: '47%',
            style: {
              text: "1.68%",
              textAlign: 'center',
              fill: '#000',　　　　　　　　//文字的颜色
              width: 30,
              height: 30,
              fontSize: 18,
              color: "#4d4f5c",
              fontFamily: "Microsoft YaHei"
            }
          }],
          series: [
            {
              name: 'CPU使用情况',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
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
              data: [
                {value: 8, name: '已使用'},
                {value: 498, name: '未使用'},
              ]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('privateIP'));
        myChart.setOption(option);
      },
      doughnutChartImageServerStorage: function () {
        var option = {
          title: {
            text: "镜像服务器容量",
            subtext: '\n\n\n\n\n\n\n\n已用   54.73GB\n\n总量  3.61TB',
            subtextStyle: {
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bold',
            },
            top: '10%',
            left: '10%'
          },
          color: ['#3f91e6', '#eff3f7'],
          tooltip: {
            // trigger: 'item',
            // formatter: '{a} <br/>{b}: {c} ({d}%)'
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
          },
          graphic: [{
            type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
            left: 'center',
            top: '47%',
            style: {
              text: "1.48%",
              textAlign: 'center',
              fill: '#000',　　　　　　　　//文字的颜色
              width: 30,
              height: 30,
              fontSize: 18,
              color: "#4d4f5c",
              fontFamily: "Microsoft YaHei"
            }
          }],
          series: [
            {
              name: 'CPU使用情况',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
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
              data: [
                {value: 54.73, name: '已使用'},
                {value: 3459, name: '未使用'},
              ]
            }
          ]
        };
        var myChart = echarts.init(document.getElementById('imageServerStorage'));
        myChart.setOption(option);
      },
    },
    mounted: function () {
      this.smoothedLineChartTotalCPULoadRate();
      this.smoothedLineChartTotalMemoryLoadRate();
      this.smoothedLineChartTotalNetworkIOPS();
      this.smoothedLineChartTotalDiskIOPS();
      this.doughnutChartVMInstance();
      this.doughnutChartCPU();
      this.doughnutChartMemory();
      this.doughnutChartStorage();
      this.doughnutChartHost();
      this.doughnutChartEip();
      this.doughnutChartPrivateIP();
      this.doughnutChartImageServerStorage();
    },
    created: async function () {
    }
  }
</script>

<style>
</style>
