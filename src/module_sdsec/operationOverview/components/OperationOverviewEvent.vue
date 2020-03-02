<template>
  <div>
    <div id="top-date-div" style="height: 40px;margin-top:-40px;position: relative;padding:0 15px">
      <div style="float:right;width: 40%;padding-right: 2%;">
        <div style="float: left;margin-top:4px;    width: 38%;">
          <div style="border:solid 1px #E1E3E4;width: 100%;height: 30px;padding: 0 8%">
                        <div style="float: left;height: 30px;padding: 0 4%;width: 25%;text-align: center">
                          <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                                     @click="todayClick"
                                     type="text" id="todayBtn">
                            今天
                          </el-button>
                        </div>
            <div style="float: left;height: 30px;padding: 0 4%;width: 25%;text-align: center">
              <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                         @click="weekClick"
                         type="text" id="weekBtn">
                7天
              </el-button>
            </div>
            <div style="float: left;height: 30px;padding: 0 4%;width: 25%;text-align: center">
              <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                         @click="monthClick"
                         type="text" id="monthBtn">
                本月
              </el-button>
            </div>
            <div style="float: left;height: 30px;padding:0 4%;width: 25%;text-align: center">
              <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                         @click="yearClick"
                         type="text" id="yearBtn">
                全年
              </el-button>
            </div>

          </div>
        </div>
        <div style="float: right;width: 58%;margin-top:4px">
          <div style="width: 100%;height: 30px" id="ai-date-range">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              size="mini"
              @change="dateChange"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>


      </div>
    </div>
    <div class="el-panel-body">

      <div style="">
        <div style="width:70%;margin-top: 1%;float:left;margin-bottom: 1%;display: inline-block;">
          <h2 class="title-left-border">安全动态播报</h2>

          <div style="padding-left: 12px;float:left;width: 100%;margin-top: 15px;padding-right: 2%;height: 90px;">
            <div style="height: 100%;width: 19%;display: inline-block;padding: 10px;margin-right: 1%;" class="sec-broad-item"  v-for="(o, index) in secDynamicsBroad" :key="o">
              <p class="sec-broad-label">{{o.broadName}}</p>
              <p class="sec-broad-num">{{o.num}}<span style="font-weight: bold;font-size: 18px;color:#999999;padding-left: 3px; ">个</span></p>
            </div>
          </div>
          <div id="worldAttackDistribution" style="padding-left: 12px;float:left;width: 100%;margin-top: 15px;padding-right: 2%;height: 350px;">
          </div>
          <div style="padding-left: 12px;float:left;width: 100%;padding-top:10px;padding-right: 2%;display: flex;height:40px">
            <div style="width: 24%;margin-right: 1%;cursor: pointer">
              <div style="width:100%;background-color: #409EFF;height: 10px"></div>
              <div style="display: flex;margin-top:10px;">
                <div style="width: 10px;height: 10px;background-color: #409EFF"></div>
                <span style="line-height: 10px;font-size: 12px;padding-left: 5px">小于10</span>
              </div>
            </div>
            <div style="width: 24%;margin-right: 1%;">
              <div style="width:100%;background-color: #67C33A;height: 10px"></div>
              <div style="display: flex;margin-top:10px;">
                <div style="width: 10px;height: 10px;background-color: #67C33A"></div>
                <span style="line-height: 10px;font-size: 12px;padding-left: 5px">小于10</span>
              </div>
            </div>
            <div style="width: 24%;margin-right: 1%;">
              <div style="width:100%;background-color: #E6A23D;height: 10px"></div>
              <div style="display: flex;margin-top:10px;">
                <div style="width: 10px;height: 10px;background-color: #E6A23D"></div>
                <span style="line-height: 10px;font-size: 12px;padding-left: 5px">小于10</span>
              </div>
            </div>
            <div style="width: 24%;margin-right: 1%;">
              <div style="width:100%;background-color: #F56C6D;height: 10px"></div>
              <div style="display: flex;margin-top:10px;">
                <div style="width: 10px;height: 10px;background-color: #F56C6D"></div>
                <span style="line-height: 10px;font-size: 12px;padding-left: 5px">小于10</span>
              </div>
            </div>
          </div>

        </div>

        <div style="width:30%;height: 100%;margin-top: 1%; margin-bottom: 1%;display: inline-block;padding-right: 2%">
          <h2 class="title-left-border">安全发展趋势图</h2>
          <div class="tendencyMsg" style="padding-left: 12px;float:left;width: 100%;margin-top: 15px;padding-right: 2%;height: 90px">
              <div style="display: flex;padding-left: 2%;padding-top: 1%">
                <img src="/static/sdsec/image/notice.png" style="height: 32px;"/>
                <div style="width: 80%;padding-left: 5px">
                  <span>{{tendencyMsg}}</span>
                </div>
              </div>
            </div>

          <div id="secComprehensiveLevel" style="padding-left: 12px;float:left;width: 100%;margin-top: 15px;padding-right: 2%;height: 390px;">
          </div>

          </div>
      </div>

      <div class="el-panel"></div>

      <div style="">
        <div style="width:50%;margin-top: 1%;float:left;margin-bottom: 1%;display: inline-block;">
          <h2 class="title-left-border">安全事件数量趋势图</h2>
          <div id="secEventNumTendency" class="event-chart-item" style="margin:12px;height: 250px;"></div>
        </div>

        <div style="width:50%;height: 100%;margin-top: 1%; margin-bottom: 1%;display: inline-block;padding-right:1%;">
          <h2 class="title-left-border">安全事件类型TOP5</h2>
          <div id="secEventTypeTop5" class="event-chart-item" style="margin:12px;height: 250px;"></div>
        </div>
      </div>



      <div class="el-panel"></div>

      <div style="">
        <div style="width:50%;margin-top: 1%;float:left;margin-bottom: 1%;display: inline-block;">
          <h2 class="title-left-border">安全漏洞数量趋势图</h2>
          <div id="secHoleNumTendency" class="event-chart-item" style="margin:12px;height: 250px;"></div>
        </div>

        <div style="width:50%;height: 100%;margin-top: 1%; margin-bottom: 1%;display: inline-block;padding-right:1%;">
          <h2 class="title-left-border">安全漏洞分类占比</h2>
          <div id="secHoleTypeRatio" class="event-chart-item" style="margin:12px;height: 250px;"></div>
        </div>
      </div>


      <div class="el-panel"></div>

      <div style="width:100%;margin-top: 1%;margin-bottom: 1%;padding-right: 2%">
        <h2 class="title-left-border">近10条安全告警详情</h2>

        <OperationOverviewAlarmTable :tableId="tableId"></OperationOverviewAlarmTable>
      </div>
    </div>

  </div>
</template>

<script>
  import OperationOverviewAlarmTable from './OperationOverviewAlarmTable'
  import 'static/js/map/world'
  import {
    multipleIndexLineChart,
    multipleIndexFilterChart,
    singleIndexSimpleNumValue,
    formatDate,
  } from 'static/sdsec/js/sdsec/sdsec-echart-utils'

  export default {
    data() {
      return {
        tableId: 'alarmTable',
        tendencyMsg: '当前安全事件持续上升，请管理员给予高度重视，评估业务性能，排查异常情况',
        dateRange: '',
        weekStartMonday: 1,
        secDynamicsBroad: [
          {broadName: '安全域数量', num: '21'},
          {broadName: '业务IP/IP段', num: '3'},
          {broadName: '安全事件数量', num: '41'},
          {broadName: '安全漏洞数量', num: '3'},
          {broadName: '当前发生安全事件数', num: '52'}
        ],
      }
    },
    components:{
      OperationOverviewAlarmTable,
    },
    methods: {
      test: function () {
        let myChart = echarts.getInstanceById(document.getElementById("worldAttackDistribution").getAttribute('_echarts_instance_'));

        myChart.dispatchAction({
          type: 'selectDataRange',
          selected: {0:false},
        });

      },

      smoothedLineChartSecEventNumTendency: function () {
        let option = this.getLineOption('#3e89dc');
        let myChart = echarts.init(document.getElementById('secEventNumTendency'));
        myChart.setOption(option);
      },
      smoothedLineChartSecHoleNumTendency: function () {
        let option = this.getLineOption('#4834D4');
        let myChart = echarts.init(document.getElementById('secHoleNumTendency'));
        myChart.setOption(option);
      },
      columnChartSecEventTypeTop5: function () {
        let option = {
          color: ['#3BB76F'],
          title: {
            text: ''
          },
          tooltip: {
            textStyle: {
              color: 'rgba(62, 73, 86, 1)'
            },
            backgroundColor: '#fff',
            padding: [5, 10],
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          // legend: {
          //   data: ['开通', '已过期'],
          //   icon: 'circle',
          //   itemWidth: 10
          // },
          grid: {
            left: '4%',
            right: '6%',
            top: '10%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['钓鱼邮件', '恶意扫描', '病毒攻击', '攻击1', '攻击2']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barGap: 0,
              barWidth:50 ,
              data: [10, 15, 20, 22, 17]
            }
          ]
        };
        let myChart = echarts.init(document.getElementById('secEventTypeTop5'));
        myChart.setOption(option);
      },
      pieChartSecHoleTypeRatio: function() {
        let option = {
          color:["#8d7fec","#EC5960","#2FCC71","#0065BA","#fdb301","#f2719a"],
          legend: {
            orient: "vartical",
            x: "left",
            top: "center",
            left: "60%",
            bottom: "0%",
            data: ['类型1','类型2','类型3','类型4'],
            itemWidth: 8,
            itemHeight: 8,
            itemGap :10,
            formatter:function(name){
                var oa = option.series[0].data;
                let num = 0;
                oa.forEach(function (item,index) {
                  num = num + item.value;
                });
                for(var i = 0; i < option.series[0].data.length; i++){
                    if(name==oa[i].name){
                        return ' '+name +'  '+ + (oa[i].value/num * 100).toFixed(2) + '%';
                    }
                }
              },

          },
          series: [{
            type: 'pie',
            clockwise: false, //饼图的q扇区是否是顺时针排布
            minAngle: 2, //最小的扇区角度（0 ~ 360）
            radius: ["45%", "70%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: { //图形样式
              normal: {
                borderColor: '#ffffff',
                borderWidth: 2,
              },
            },
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{text|{b}}\n{c} ({d}%)',
                rich: {
                  text: {
                    color: "#666",
                    fontSize: 14,
                    align: 'center',
                    verticalAlign: 'middle',
                    padding: 8
                  },
                  value: {
                    color: "#8693F3",
                    fontSize: 13,
                    align: 'center',
                    verticalAlign: 'middle',
                  },
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 13,
                }
              }
            },
            data: [
              {
                name:"类型1",
                value: 11
              },
              {
                name:"类型2",
                value: 112
              },
              {
                name:"类型3",
                value: 41
              },
              {
                name:"类型4",
                value: 22
              }
            ]
          }]
        };
        let myChart = echarts.init(document.getElementById('secHoleTypeRatio'));
        myChart.setOption(option);
      },

      chartSecComprehensiveLevel:function() {
        let Green = {
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#43A4FB' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#5ADB90' // 100% 处的颜色
          }],
        };
        let dataValArray = 87;
        let option = {
          title: [
            {
              text: dataValArray,
              subtext: '平台安全等级综合水平',
              x: 'center',
              y: '35%',
              textStyle: {
                fontSize:46,
                fontWeight:'normal',
                color: ['#3e4956']
              },
              subtextStyle: {
                color: '#67828c',
                fontSize: 12,
                align: 'center',
              }
            },
            {
              text: "良好",
              x: 'center',
              y: '56%',
              textStyle: {
                fontSize:20,
                fontWeight:'normal',
                color: ['#999']
              },
            },
            {
              text: "分",
              x: '56%',
              y: '42%',
              textStyle: {
                fontSize:14,
                fontWeight:'normal',
                color: ['#3e4956']
              },
            }
          ],
          series: [{
            //渐变圆环
            name: "",
            type: "pie",
            radius: ["62%", "72%"],
            startAngle: 180,
            hoverAnimation: false,
            avoidLabelOverlap: true,
            z: 0,
            label: {
              show: false,
              normal: {show: false}
            },
            data: [{
              value: 0,
              name: "",
              itemStyle: {
                normal: {
                  color: Green
                }
              }
            }]
          },
            {
              //进度圆环
              name: 'Line 1',
              type: 'pie',
              startAngle: 90,
              clockWise: true,
              radius:['80%','81%'],
              itemStyle: {
                normal: {
                  label: {
                    show: true
                  },
                  labelLine: {
                    show: false
                  },
                }
              },
              hoverAnimation: false,

              data: [{
                value:  dataValArray ,
                itemStyle: {
                  normal: {
                    color: '#20da97'
                  }
                }
              },{//画中间的图标
                name: "",
                value: 0,
                label: {
                  position:'inside',
                  backgroundColor: {
                    image: ''
                  },
                  width: 16,
                  height: 16,
                  borderRadius: 20,
                  padding: 11
                }
              }, {
                value: 100- dataValArray ,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: 'transparent', //未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
              ]
            }
          ]
        };
        let myChart = echarts.init(document.getElementById('secComprehensiveLevel'));
        myChart.setOption(option);
      },

      mapChartworldAttackDistribution:function() {
        var geoCoordMap = {
          上海: [121.4648, 31.2891],
          尼日利亚: [-4.388361, 11.186148],
          美国洛杉矶: [-118.24311, 34.052713],
          香港邦泰: [114.195466, 22.282751],
          美国芝加哥: [-87.801833, 41.870975],
          加纳库马西: [-4.62829, 7.72415],
          英国曼彻斯特: [-1.657222, 51.886863],
          德国汉堡: [10.01959, 54.38474],
          哈萨克斯坦阿拉木图: [45.326912, 41.101891],
          俄罗斯伊尔库茨克: [89.116876, 67.757906],
          巴西: [-48.678945, -10.493623],
          埃及达米埃塔: [31.815593, 31.418032],
          西班牙巴塞罗纳: [2.175129, 41.385064],
          柬埔寨金边: [104.88659, 11.545469],
          意大利米兰: [9.189948, 45.46623],
          乌拉圭蒙得维的亚: [-56.162231, -34.901113],
          莫桑比克马普托: [32.608571, -25.893473],
          阿尔及利亚阿尔及尔: [3.054275, 36.753027],
          阿联酋迪拜: [55.269441, 25.204514],
          匈牙利布达佩斯: [17.108519, 48.179162],
          澳大利亚悉尼: [150.993137, -33.675509],
          美国加州: [-121.910642, 41.38028],
          澳大利亚墨尔本: [144.999416, -37.781726],
          墨西哥: [-99.094092, 19.365711],
          加拿大温哥华: [-123.023921, 49.311753]
        };
        var data = [
          {
            name: "尼日利亚",
            value: 12
          },
          {
            name: "美国洛杉矶",
            value: 4
          },
          {
            name: "香港邦泰",
            value: 123
          },
          {
            name: "美国芝加哥",
            value: 23
          },
          {
            name: "加纳库马西",
            value: 44
          },
          {
            name: "英国曼彻斯特",
            value: 55
          },
          {
            name: "德国汉堡",
            value: 4
          },
          {
            name: "哈萨克斯坦阿拉木图",
            value: 33
          },
          {
            name: "俄罗斯伊尔库茨克",
            value: 2341
          },
          {
            name: "巴西",
            value: 333
          },
          {
            name: "埃及达米埃塔",
            value: 22
          },
          {
            name: "西班牙巴塞罗纳",
            value: 77
          },
          {
            name: "柬埔寨金边",
            value: 88
          },
          {
            name: "意大利米兰",
            value: 1222
          },
          {
            name: "乌拉圭蒙得维的亚",
            value: 31
          },
          {
            name: "莫桑比克马普托",
            value: 99
          },
          {
            name: "阿尔及利亚阿尔及尔",
            value: 55
          },
          {
            name: "阿联酋迪拜",
            value: 35
          },
          {
            name: "匈牙利布达佩斯",
            value: 359
          },
          {
            name: "澳大利亚悉尼",
            value: 359
          },
          {
            name: "美国加州",
            value: 359
          },
          {
            name: "澳大利亚墨尔本",
            value: 35
          },
          {
            name: "墨西哥",
            value: 35
          },
          {
            name: "加拿大温哥华",
            value: 35
          }
        ];
        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
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
          // backgroundColor:"#eee",
          title: {
            text: '受攻击IP分布',
            left: 'left',
            top: 'bottom',
            textStyle: {
              fontSize:12,
              fontWeight:'bold',
              color: ['#666']
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              return params.name + ' : ' + params.value[2];
            }
          },
          visualMap: {
            show:false,
            type:'piecewise',
            pieces: [
              {lt: 10},
              {gte: 10, lt: 50 },
              {gte: 50, lt: 100},
              {gte: 100 },
            ],
            inRange:{
              color:['#409EFF','#67C33A','#E6A23D','#F56C6D',],
              symbolSize: [15, 25]
            },
            outOfRange: {
              color:["#ccc"]
            },
            left:"2%",
            textStyle: {
              color: '#666'
            },
            orient:"horizontal"
          },

          series: [{
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
          ],
          geo: {
            map: "world",
            label: {
              emphasis: {
                show: false
              }
            },
            zoom:1.2,
            roam: true, //是否允许缩放
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "180%",
            itemStyle: {
              normal: {
                areaColor: '#D9ECFF',
                borderColor: '#8CC5FF'
              },
              emphasis: {
                areaColor: '#8CC5FF'
              }
            }
          }

        };
        let myChart = echarts.init(document.getElementById('worldAttackDistribution'));
        myChart.setOption(option);
      },

      getLineOption: function(color) {
        let option = {
          color: [color],
          title: {
            // text: title,
            // textStyle:{
            //   color:'#3E4956',
            //   fontSize: 13,
            // },
          },
          // legend: {
          //   data: '',
          //   icon: 'circle',
          //   itemWidth: 10,
          //   left: '3%',
          //   textStyle: {
          //     color: '#3E4956',
          //     fontSize: 13,
          //     fontWeight: 'bold',
          //   }
          // },
          tooltip: {
            textStyle: {
              color: 'rgba(62, 73, 86, 1)'
            },
            backgroundColor: '#fff',
            padding: [5, 10],
            trigger: 'axis',
            // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            //   type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            // }
          },
          grid: {
            left: '4%',
            right: '6%',
            top: '10%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['1-21', '1-22', '1-23', '1-24', '1-25']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              data: [30.55, 20.42, 34.17, 25.77, 36.04],
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: color
                }, {
                  offset: 1,
                  color: '#fff'
                }])
              },
            }
          ]
        };
        return option;
      },

      getTodayDate: function () {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return year + seperator1 + month + seperator1 + strDate;
      },
      getInitStartDate: function () {
        let date = new Date();
        date.setDate(date.getDate()-9);
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return year + seperator1 + month + seperator1 + strDate;
      },
      dateInit:function () {
        let firstDate = this.getInitStartDate();
        let lastDate = this.getTodayDate();
        this.dateRange = [firstDate,lastDate];
      },
      todayClick: function () {
        let date = this.getTodayDate();
        $('#top-date-div button').removeClass('btn-curr');
        $('#todayBtn').addClass('btn-curr');
        this.dateRange = [date, date];
        this.dateChange();
      },
      weekClick: function () {
        $('#top-date-div button').removeClass('btn-curr');
        $('#weekBtn').addClass('btn-curr');
        this.dateRange = this.getWeekStartAndEnd(new Date());
        this.dateChange();
      },
      monthClick: function () {
        $('#top-date-div button').removeClass('btn-curr');
        $('#monthBtn').addClass('btn-curr');
        let date = new Date(), y = date.getFullYear(), m = date.getMonth();
        let firstDay = new Date(y, m, 1);
        let lastDay = new Date(y, m + 1, 0);
        this.dateRange = [formatDate(firstDay), formatDate(lastDay)];
        this.dateChange();
      },
      yearClick: function () {
        //获取本年开始-当前时间
        $('#top-date-div button').removeClass('btn-curr');
        $('#yearBtn').addClass('btn-curr');
        let now = new Date();
        let currentYear = now.getFullYear();//获得当前年份4位年
        let currentYearFirstDate = new Date(currentYear, 0, 1); //本年第一天
        let startTime = formatDate(currentYearFirstDate);
        this.dateRange = [startTime, formatDate(now)];
        this.dateChange()

      },
      dateChange: function () {

      },

      getWeekStartAndEnd(val) {
        // 获取指定日期的那一周的开始、结束日期
        let now = '';
        if (val) {
          now = new Date(val); // 日期
        } else {
          now = new Date(); // 日期
        }
        let nowDayOfWeek = now.getDay() - this.weekStartMonday; // 本周的第几天
        let nowDay = now.getDate(); // 当前日
        let nowMonth = now.getMonth(); // 当前月
        let nowYear = now.getFullYear(); // 当前年
        let weekStart = this.getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek);
        let weekEnd = this.getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek);
        this.weekFormat = weekStart + '~' + weekEnd;
        return [weekStart, weekEnd]
        // console.log(this.weekFormat)
      },
      getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
        // 获得某一周的开始日期
        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        return formatDate(weekStartDate)
      },
      getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
        // 获得某一周的结束日期
        let weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
        return formatDate(weekEndDate)
      },
      refreshData: function () {

      }
    },
    mounted: function () {
      this.smoothedLineChartSecEventNumTendency();
      this.smoothedLineChartSecHoleNumTendency();
      this.columnChartSecEventTypeTop5();
      this.pieChartSecHoleTypeRatio();
      this.chartSecComprehensiveLevel();
      this.mapChartworldAttackDistribution();

      // this.dateInit();

      // 为了显示头部日期控件 取消掉 父级元素 class="el-tabs__content" 的overflow hidden 属性
      $("#top-date-div").parent().parent().parent().css("overflow", "visible");

      /** 只有当 安全服务分类统计图 超出时才显示滚动条，否则隐藏（上层div遮蔽实现） **/
      let totalWidth = 0;
      $('.sec-service-item').each(function (index, element) {
        totalWidth += $(element).outerWidth(true)
      });
      if ($('#sec-scroll-hidden-div').outerWidth(true) >= totalWidth) {
        if ($('#sec-scroll-hidden-div').height() - $('.sec-service-item:eq(0)').height()>16) {
          $('#sec-scroll-hidden-div').height($('#sec-scroll-hidden-div').height() - 16);
        }
      }

    },
    created: async function () {
    }
  }
</script>

<style>

  .sec-broad-item, .event-chart-item {
    border: 1px solid #e5e2e5;
  }

  .sec-broad-label {
    font-size: 13px;
    font-family: MicrosoftYaHeiUI;
    color: rgba(62,73,86,0.6);
    line-height: 15px;
    margin-bottom: 6px;
  }

  .sec-broad-num {
    font-size: 30px;
    font-family: MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight: bold;
    color: rgba(62,73,86,1);
    line-height: 38px;
  }

  .title-left-border {
    border-left: solid 2px #007BE8;
    padding-left: 12px;
    font-size: 14px;
    color: #3E4956;
    line-height: 18px;
    font-weight: normal;
  }

  .help-doc-item {
    text-align: left;
    float: left;
    width: 12%;
    height: 16%;
    padding: 0 1px 1px 0;
    line-height: 35px;
    cursor: pointer;
  }

  .help-doc-item > div {
    background-color: #F8F8F8;
    padding-left: 5%;
    width: 100%;
    height: 100%;
  }

  .help-doc-item > div > span {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }

  .tendencyMsg {
    background-image: url("/static/sdsec/image/operation-bg.png");
    background-size: cover;
    padding: 16px 9px;
    width: 90%;
    border-radius: 5px;
  }

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

  .btn-curr {
    color: #3a8ee6!important;
  }
</style>
