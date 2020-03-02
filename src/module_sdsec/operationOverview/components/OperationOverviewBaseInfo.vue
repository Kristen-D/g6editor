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
      <h2 class="title-left-border">安全服务开通情况趋势图</h2>
      <div style="width: 100%;display: flex;height: 220px;">
        <div id="safeProductDredgeTendency" style="width: 70%;height:100%;"></div>
        <div id="safeManagementMsg" v-if="showSafeManagementMsg">
          <div style="padding: 20px 25px;">
            <div style="color:#3E4956;font-family: Microsoft Yahei UI Bold;font-weight:bold;font-size: 16px">安全管理</div>
            <div style="width:60%;color: rgba(62,73,86,0.6);font-size: 12px;margin-top: 5px">
              <span>当你的伙伴需要伸出一只手时，不妨把肩膀给他</span>
            </div>
            <div class="title-bottom-border"></div>
          </div>
          <div style="color: #007BE8;font-size: 12px;padding-right: 10px;padding-top: 10px;cursor: pointer" @click="closeManagementMsg">
            关闭
          </div>
        </div>
      </div>

      <div class="el-panel"></div>

      <h2 class="title-left-border">安全服务分类统计图</h2>
      <div id="sec-scroll-hidden-div" style="overflow: hidden;margin-top: 1%;margin-bottom: 1%;">
        <div style="padding-left: 12px;white-space: nowrap;overflow-x: scroll">
          <div id="firewall" class="sec-service-item"
               style="width: 18%;height: 220px;float: left;display: inline-block;margin: 0 1% 0 0">
          </div>
          <div id="waf" class="sec-service-item"
               style="width: 18%;height: 220px;float: left;display: inline-block;margin: 0 1%">
          </div>
          <div id="ips" class="sec-service-item"
               style="width: 18%;height: 220px;float: left;display: inline-block;margin: 0 1%">
          </div>
          <div id="scan" class="sec-service-item"
               style="width: 18%;height: 220px;float: left;display: inline-block; margin: 0 1%">
          </div>
          <div id="antivirus" class="sec-service-item"
               style="width: 18%;height: 220px;display: inline-block;margin: 0 0 0 1% ">
          </div>
        </div>
      </div>

      <div class="el-panel"></div>

      <div style="">
        <div style="width:50%;margin-top: 1%;float:left;margin-bottom: 1%;display: inline-block;">
          <h2 class="title-left-border">服务链信息统计</h2>

          <div style="padding-left: 12px;float:left;width: 100%;margin-top: 2%;padding-right: 2%">
            <div id="respool"
                 style="width: 48%;height: 150px;margin:0 2% 0 0;float: left;display: inline-block;background-color: #3CB670">
              <div style="display: flex">
                <img style="height: 50px;margin: 12px 12px" src="/static/sdsec/image/safe-shield.png"/>
                <div style="margin-top: 12px">
                  <span class="service-chain-label" align="center">安全资源池数量</span>
                  <h1 class="service-chain-num">{{respoolNum}}</h1>
                </div>
              </div>
            </div>
            <div id="servicechain"
                 style="width: 48%;height: 150px;margin:0 2% 0 0;float: left;display: inline-block;background-color: #007BE8">
              <div>
                <div style="display: flex">
                  <img style="height: 50px;margin: 12px 12px" src="/static/sdsec/image/safe-machine.png"/>
                  <div style="margin-top: 12px">
                    <span class="service-chain-label">服务链数量</span>
                    <h1 class="service-chain-num">{{chainNum}}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="width:50%;height: 100%;margin-top: 1%; margin-bottom: 1%;display: inline-block;padding-right:1%">
          <h2 class="title-left-border">帮助文档</h2>
          <div
            style="width:100%;height: 220px;display: inline-block;padding-left: 12px;margin-top: 1%;overflow:hidden">
            <div style="text-align: left;float: left;width: 20%" class="help-doc-item">
              <div>
                <span style="color: #5a5a5a;overflow:hidden"><i class="fa fa-book "
                                                                aria-hidden="true"/>&nbsp;&nbsp;运营手册</span>
              </div>
            </div>
            <div style="text-align: left;float: left;width: 20%" class="help-doc-item">
              <div>
                <span style="color: #5a5a5a;overflow:hidden"><i class="fa fa-files-o " aria-hidden="true"/>&nbsp;&nbsp;租户侧用户手册</span>
              </div>
            </div>
            <div style="text-align: left;float: left;width: 20%" class="help-doc-item">
              <div>
                <span style="color: #5a5a5a;overflow:hidden"><i class="fa fa-file-powerpoint-o " aria-hidden="true"/>&nbsp;&nbsp;产品主打PPT</span>
              </div>
            </div>
            <div style="text-align: left;float: left;width: 20%" class="help-doc-item">
              <div>
                <span style="color: #5a5a5a;"><i class="fa fa-connectdevelop "
                                                 aria-hidden="true"/>&nbsp;&nbsp;平台运营流程规范</span>
              </div>
            </div> <div style="text-align: left;float: left;width: 20%" class="help-doc-item">
              <div>
                <span style="color: #5a5a5a;"><i class="fa fa-connectdevelop "
                                                 aria-hidden="true"/>&nbsp;&nbsp;平台运营流程规范</span>
              </div>
            </div> <div style="text-align: left;float: left;width: 20%" class="help-doc-item">
              <div>
                <span style="color: #5a5a5a;"><i class="fa fa-connectdevelop "
                                                 aria-hidden="true"/>&nbsp;&nbsp;平台运营流程规范</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="el-panel"></div>

      <div style="width:100%;margin-top: 1%;margin-bottom: 1%;padding-right: 2%">
        <h2 class="title-left-border">消息中心&nbsp;&nbsp;({{msgNum}})</h2>

        <el-button style="float: right; padding: 0 ;" type="text" @click="messageTable">
          <i class="fa fa-bars" aria-hidden="true"/>&nbsp;全部消息
        </el-button>
        <div style="padding-top: 1%;padding-left: 12px">
          <div v-for="(msg,index) in msgItems"
               :style="{width:'100%','text-align': 'left','margin-top': '1%',overflow:'hidden','border-bottom': index<msgItems.length-1?'solid 1px #E1E2E3':'','padding-bottom': '17px'}">
            <div style="float: left;width: 2%;margin-right: 1%;line-height: 20px">
              <!--                <i class="fa fa-exclamation-triangle fa-x" aria-hidden="true"></i>-->
              <svg height="16px" width="16px" v-if="msg.hasRead">
                <path
                  d="M12.7626328,13.4956874 L1.22461539,13.4956874 L2.66839698,11.568606 L3.15169677,11.568606 L3.15169677,6.7478437 C3.15109305,4.45986256 4.75882077,2.48662598 6.99974181,2.02496487 L6.99974181,0 L8.92070547,0 L8.92070547,2.02496487 C11.1616265,2.48662598 12.7693542,4.45986256 12.7687505,6.7478437 L12.7687505,11.568606 L13.2520503,11.568606 L14.6958319,13.4956874 L12.7626328,13.4956874 L12.7626328,13.4956874 Z M9.31223947,13.9789872 C9.36888359,14.133825 9.39787392,14.2974133 9.39788753,14.4622869 C9.43290723,14.9994145 9.16622229,15.5114249 8.70601858,15.7906112 C8.24581486,16.0697975 7.6685147,16.0697975 7.20831099,15.7906112 C6.74810727,15.5114249 6.48142233,14.9994145 6.51644203,14.4622869 C6.51645564,14.2974133 6.54544598,14.133825 6.60209009,13.9789872 L9.31223947,13.9789872 L9.31223947,13.9789872 Z"
                  id="形状" fill="#CCCCCC"/>
              </svg>
              <svg height="16px" width="16px" v-else>
                <path
                  d="M12.7626328,13.4956874 L1.22461539,13.4956874 L2.66839698,11.568606 L3.15169677,11.568606 L3.15169677,6.7478437 C3.15109305,4.45986256 4.75882077,2.48662598 6.99974181,2.02496487 L6.99974181,0 L8.92070547,0 L8.92070547,2.02496487 C11.1616265,2.48662598 12.7693542,4.45986256 12.7687505,6.7478437 L12.7687505,11.568606 L13.2520503,11.568606 L14.6958319,13.4956874 L12.7626328,13.4956874 L12.7626328,13.4956874 Z M9.31223947,13.9789872 C9.36888359,14.133825 9.39787392,14.2974133 9.39788753,14.4622869 C9.43290723,14.9994145 9.16622229,15.5114249 8.70601858,15.7906112 C8.24581486,16.0697975 7.6685147,16.0697975 7.20831099,15.7906112 C6.74810727,15.5114249 6.48142233,14.9994145 6.51644203,14.4622869 C6.51645564,14.2974133 6.54544598,14.133825 6.60209009,13.9789872 L9.31223947,13.9789872 L9.31223947,13.9789872 Z"
                  id="形状" fill="#007BE8"/>
              </svg>
            </div>
            <div style="float: left; width: 97%">
              <span
                style="color: #5a5a5a;font-size: 16px; line-height: 20px">{{msg.title}}</span>
              <p
                style="color: #999999;font-size: 12px;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
                {{msg.content}}</p>
            </div>
            <div style="clear:both"></div>
          </div>
          <!--          <div style="width:100%;text-align: left;margin-top: 1%">-->
          <!--            <i class="fa fa-exclamation-circle fa-x" aria-hidden="true"></i><span-->
          <!--            style="color: #5a5a5a;font-size: 16px;">版本升级通知</span>-->
          <!--            <p style="color: #999999;font-size: 15px">系统升级通知2020/2/4，尊敬的用户您好，关于本平台V1.0.2的更新升级通知...</p>-->
          <!--          </div>-->
          <!--          <div style="width:100%;text-align: left;margin-top: 1%">-->
          <!--            <i class="fa fa-exclamation-circle fa-x" aria-hidden="true"></i><span-->
          <!--            style="color: #5a5a5a;font-size: 16px;">版本维护预告</span>-->
          <!--            <p style="color: #999999;font-size: 15px">为了给您提供更好的平台操作体验，SDSec平台将在2月15日进行版本更新维护，维护完成后...</p>-->
          <!--          </div>-->
          <!--          <div style="width:100%;text-align: left;margin-top: 1%">-->
          <!--            <i class="fa fa-exclamation-circle fa-x" aria-hidden="true"></i><span-->
          <!--            style="color: #5a5a5a;font-size: 16px;">SQL注入漏洞</span>-->
          <!--            <p style="color: #999999;font-size: 15px">检测到SQL注入攻击,被攻击对象IP为192.198.32.215的Mysql的3306端口...</p>-->
          <!--          </div>-->
          <!--          <div style="width:100%;text-align: left;margin-top: 1%">-->
          <!--            <i class="fa fa-exclamation-circle fa-x" aria-hidden="true"></i><span-->
          <!--            style="color: #5a5a5a;font-size: 16px;">代办事项</span>-->
          <!--            <p style="color: #999999;font-size: 15px">你好，您有一个订单待处理，请及时处理...</p>-->
          <!--          </div>-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    multipleIndexLineChart,
    multipleIndexFilterChart,
    singleIndexSimpleNumValue,
    formatDate,
  } from 'static/sdsec/js/sdsec/sdsec-echart-utils'

  export default {
    data() {
      return {
        msgNum: 10,
        msgItems: [],
        dateRange: '',
        respoolNum: '23',
        chainNum: '11',
        weekStartMonday: 1,
        showSafeManagementMsg: true
      }
    },
    methods: {
      safeProductDredgeTendency: function () {
        var myChart = echarts.init(document.getElementById('safeProductDredgeTendency'));
        var option = {
          color: ['#0776B8', '#3BB76F'],
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
          legend: {
            data: ['开通', '已过期'],
            icon: 'circle',
            itemWidth: 10
          },
          grid: {
            left: 12,
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['2020.1.29', '2020.1.30', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.2.6']
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
              name: '开通',
              type: 'bar',
              barGap: 0,
              data: [2, 2, 2, 5, 10, 15, 20, 22, 17]
            },
            {
              name: '已过期',
              type: 'bar',
              data: [5, 8, 10, 5, 3, 2, 1, 15, 5, 7]
            }
          ]
        };
        myChart.setOption(option);
      },
      updatesafeProductDredgeTendency: function (domId, indexName) {
        let startTime = this.dateRange[0]+"T00:00";
        multipleIndexLineChart(this.refreshsafeProductDredgeTendency, domId, '/sdsec/web/overview/visualization/coordinateInfo', 'GlobalSecurityService', indexName, '安全服务开通情况趋势图',startTime);
      },
      refreshsafeProductDredgeTendency: function(chartData, domId, indexNameArr){
        let myChart = echarts.getInstanceById(document.getElementById(domId).getAttribute('_echarts_instance_'));
        let option = myChart.getOption();
        let xAxisData = chartData ? chartData.xAxis.bottom : [];
        xAxisData.forEach(function (item, i) {
          xAxisData[i] = item.substr(0,10).replace(/\-/g,".");
        });

        indexNameArr.forEach(function (item, index) {
          option.series[index].data = chartData.data[index][item];
        });
        option.xAxis = {data: xAxisData};

        myChart.setOption(option);
      },

      getOption: function (color, title, subtext, xAxisData, data, official, test) {
        var option = {
          color: [color],
          title: {
            subtext: subtext,
            subtextStyle: {
              color: '#3E4956',
              fontSize: 30,
              fontWeight: 'bold',
            },
            top: '5%',
            left: '6%'
          },
          legend: {
            data: [title],
            icon: 'circle',
            itemWidth: 10,
            left: '3%',
            textStyle: {
              color: '#3E4956',
              fontSize: 13,
              fontWeight: 'bold',
            }
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
          toolbox: {
            show: true,
            feature: {
              myShowDetail: {
                show: true,
                title: title,
                icon: 'path://M8,16 C3.5890625,16 0,12.4115625 0,8 C0,3.58910938 3.5890625,0 8,0 C12.4115312,0 16,3.58846875 16,8 C16,12.4115625 12.4115312,16 8,16 Z M8,1.1479375 C4.22157813,1.1479375 1.14792187,4.22157812 1.14792187,8.00001563 C1.14792187,11.7779063 4.22157813,14.8520781 7.99998438,14.8520781 C11.7778906,14.8520781 14.8520781,11.7784219 14.8520781,8.00001563 C14.8520781,4.22157813 11.7778906,1.1479375 7.99998437,1.1479375 L8,1.1479375 Z M7.1390625,4.26921875 C7.1390625,4.04379688 7.23182812,3.81978125 7.39121875,3.66045313 C7.550625,3.50107813 7.7745625,3.40821875 7.99998437,3.40821875 C8.2254375,3.40821875 8.44935938,3.5010625 8.60878125,3.66045313 C8.76815625,3.81978125 8.86092187,4.04379688 8.86092187,4.26921875 C8.86092187,4.49457813 8.76817187,4.71859375 8.60878125,4.87801563 C8.449375,5.03739063 8.2254375,5.13015625 7.99998437,5.13015625 C7.7745625,5.13015625 7.550625,5.03740625 7.39123437,4.87801563 C7.23182812,4.71859375 7.1390625,4.49457813 7.1390625,4.26921875 L7.1390625,4.26921875 Z M8,12.5917969 C7.683125,12.5917969 7.426,12.3351719 7.426,12.0177813 L7.426,6.85209375 C7.426,6.53521875 7.68314063,6.27807813 7.99998438,6.27807813 C8.31685937,6.27807813 8.574,6.53521875 8.574,6.85209375 L8.574,12.0177812 C8.574,12.3351719 8.31685937,12.5917969 7.99998437,12.5917969 L8,12.5917969 Z',
                onclick: function () {
                  alert('myToolHandler2')
                }
              }
            },
            iconStyle: {
              color: '#919395',
              borderWidth: 0
            },
            emphasis: {
              iconStyle: {
                color: '#919395',
                borderWidth: 0,
                textPosition: 'left',
                textAlign: 'right'
              }
            }
          },
          grid: {
            left: 'left',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: [
            {
              show: false,
              type: 'category',
              axisLabel: {
                fontSize: 1,
                lineHeight: 1,
                height: 1

              },
              data: xAxisData
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: title,
              type: 'bar',
              barCategoryGap: '2%',
              data: data
            }
          ],
          graphic: {
            elements: [
              {
                type: 'group',
                left: '7%',  //参考echarts容器的定位
                bottom: '5%',
                children: [
                  {
                    type: 'text',
                    style: {
                      text: '有效:',
                      font: '12px "MicrosoftYaHeiUI" ',
                      fill: "rgba(62,73,86,0.6)"
                    }
                  },
                  {
                    type: 'text',
                    left: 30,
                    style: {
                      text: official,
                      font: '12px "MicrosoftYaHeiUI"  ',
                      fill: "rgba(62,73,86,1)"
                    }

                  }
                ]
              }, {
                type: 'group',
                bottom: '5%',
                right: '4%',
                children: [
                  {
                    type: 'text',
                    right: (test + "").length,
                    style: {
                      text: "过期:",
                      font: '12px "MicrosoftYaHeiUI"  ',
                      fill: "rgba(62,73,86,0.6)"

                    }
                  },
                  {
                    type: 'text',
                    style: {
                      text: test,
                      font: '12px "MicrosoftYaHeiUI"  ',
                      fill: "rgba(62,73,86,1)"

                    }
                  }
                ]
              }

            ]
          }
        };
        return option;
      },

      getLineOption: function (color, title, subtext, xAxisData, data) {
        var option = {
          color: [color],
          title: {
            // text: title,
            // textStyle:{
            //   color:'#3E4956',
            //   fontSize: 13,
            // },
            subtext: subtext,
            subtextStyle: {
              color: '#3E4956',
              fontSize: 30,
              fontWeight: 'bold',
            },
            top: '5%',
            left: '6%'
          },
          legend: {
            data: [title],
            icon: 'circle',
            itemWidth: 10,
            left: '3%',
            textStyle: {
              color: '#3E4956',
              fontSize: 13,
              fontWeight: 'bold',
            }
          },
          toolbox: {
            show: true,
            feature: {
              myShowDetail: {
                show: true,
                title: title,
                icon: 'path://M8,16 C3.5890625,16 0,12.4115625 0,8 C0,3.58910938 3.5890625,0 8,0 C12.4115312,0 16,3.58846875 16,8 C16,12.4115625 12.4115312,16 8,16 Z M8,1.1479375 C4.22157813,1.1479375 1.14792187,4.22157812 1.14792187,8.00001563 C1.14792187,11.7779063 4.22157813,14.8520781 7.99998438,14.8520781 C11.7778906,14.8520781 14.8520781,11.7784219 14.8520781,8.00001563 C14.8520781,4.22157813 11.7778906,1.1479375 7.99998437,1.1479375 L8,1.1479375 Z M7.1390625,4.26921875 C7.1390625,4.04379688 7.23182812,3.81978125 7.39121875,3.66045313 C7.550625,3.50107813 7.7745625,3.40821875 7.99998437,3.40821875 C8.2254375,3.40821875 8.44935938,3.5010625 8.60878125,3.66045313 C8.76815625,3.81978125 8.86092187,4.04379688 8.86092187,4.26921875 C8.86092187,4.49457813 8.76817187,4.71859375 8.60878125,4.87801563 C8.449375,5.03739063 8.2254375,5.13015625 7.99998437,5.13015625 C7.7745625,5.13015625 7.550625,5.03740625 7.39123437,4.87801563 C7.23182812,4.71859375 7.1390625,4.49457813 7.1390625,4.26921875 L7.1390625,4.26921875 Z M8,12.5917969 C7.683125,12.5917969 7.426,12.3351719 7.426,12.0177813 L7.426,6.85209375 C7.426,6.53521875 7.68314063,6.27807813 7.99998438,6.27807813 C8.31685937,6.27807813 8.574,6.53521875 8.574,6.85209375 L8.574,12.0177812 C8.574,12.3351719 8.31685937,12.5917969 7.99998437,12.5917969 L8,12.5917969 Z',
                onclick: function () {
                  alert('myToolHandler2')
                }
              }
            },
            iconStyle: {
              color: '#919395',
              borderWidth: 0
            },
            emphasis: {
              iconStyle: {
                color: '#919395',
                borderWidth: 0,
                textPosition: 'left',
                textAlign: 'right'
              }
            }

          },
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
            left: 'left',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: [
            {
              show: false,
              type: 'category',
              data: xAxisData
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: title,
              type: 'line',
              smooth: true,
              symbol: 'circle',
              data: data,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: color
                }, {
                  offset: 1,
                  color: '#ffe'
                }])
              },
            }
          ],
          // graphic: {
          //   elements: [
          //     {
          //       type: 'group',
          //       left: '7%',  //参考echarts容器的定位
          //       bottom: '5%',
          //       children: [
          //         {
          //           type: 'text',
          //           style: {
          //             text: '已开通安全产品数量:',
          //             font: '12px "MicrosoftYaHeiUI" ',
          //             fill: "rgba(62,73,86,0.6)"
          //           }
          //         },
          //         {
          //           type: 'text',
          //           left: 115,
          //           style: {
          //             text: 12,
          //             font: '12px "MicrosoftYaHeiUI"  ',
          //             fill: "rgba(62,73,86,1)"
          //           }
          //
          //         }
          //       ]
          //     }
          //
          //   ]
          // }
        };
        return option;
      },

      firewallchart: function () {
        $('#firewall').height($('#firewall').width() * 0.6);
        let xAxisData = ['2020.1.29', '2020.1.30', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.2.6']
        var myChart = echarts.init(document.getElementById('firewall'));
        var option = this.getOption("#4834D4", "下一代防火墙", "5", xAxisData, [5, 8, 10, 5, 3, 5, 3, 10, 5, 7, 10, 3, 4, 5, 8, 7, 10, 3, 4, 5, 5], 45, 5)

        myChart.setOption(option);
      },
      wafchart: function () {
        $('#waf').height($('#waf').width() * 0.6);
        let xAxisData = ['2020.1.29', '2020.1.30', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.2.6']

        var myChart = echarts.init(document.getElementById('waf'));
        var option = this.getOption("#54A0FF", "Web应用防火墙", "3", xAxisData, [5, 8, 10, 5, 3, 4, 5, 15, 5, 7, 10, 3, 4, 5, 16, 7, 10, 3, 4, 5, 3], 45, 5)
        myChart.setOption(option);
      },
      ipschart: function () {
        $('#ips').height($('#ips').width() * 0.6);
        let xAxisData = ['2020.1.29', '2020.1.30', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.2.6']

        var myChart = echarts.init(document.getElementById('ips'));
        var option = this.getOption("#5CC6D1", "入侵防御系统", "1", xAxisData, [5, 8, 10, 5, 3, 4, 5, 11, 5, 7, 10, 3, 4, 5, 10, 7, 6, 3, 4, 3, 1], 45, 15)
        myChart.setOption(option);
      },
      scanchart: function () {
        $('#scan').height($('#scan').width() * 0.6);
        let xAxisData = ['2020.1.29', '2020.1.30', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.2.6']

        var myChart = echarts.init(document.getElementById('scan'));
        var option = this.getOption("#8ACF3F", "漏洞扫描系统", "2", xAxisData, [5, 8, 10, 5, 3, 4, 5, 10, 5, 7, 6, 3, 4, 5, 10, 7, 4, 3, 4, 5, 2], 45, 5)
        myChart.setOption(option);
      },
      antiviruschart: function () {
        $('#antivirus').height($('#antivirus').width() * 0.6);
        let xAxisData = ['2020.1.29', '2020.1.30', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.1.31', '2020.2.1', '2020.2.2', '2020.2.3', '2020.2.4', '2020.2.5', '2020.2.6']

        var myChart = echarts.init(document.getElementById('antivirus'));
        var option = this.getOption("#F19050", "主机杀毒", "2", xAxisData, [5, 8, 10, 5, 3, 4, 5, 10, 5, 7, 5, 3, 4, 5, 10, 7, 8, 3, 4, 5, 2], 45, 5234)
        myChart.setOption(option);
      },

      updateColumnChart: function (domId, indexName, filters) {
        let startTime = this.dateRange[0] + "T00:00";
        multipleIndexFilterChart(this.refreshColumnChartData, domId, '/sdsec/web/overview/visualization/coordinateInfo', 'SingleSecurityService', indexName, '', startTime, filters);
      },
      refreshColumnChartData: function(chartData, domId, indexNameArr) {
        let myChart = echarts.getInstanceById(document.getElementById(domId).getAttribute('_echarts_instance_'));
        let option = myChart.getOption();
        let xAxisData = chartData ? chartData.xAxis.bottom : [];
        xAxisData.forEach(function (item, i) {
          xAxisData[i] = item.substr(0,10).replace(/\-/g,".");
        });

        option.graphic = {
          elements: [
            {
              type: 'group',
              left: '7%',  //参考echarts容器的定位
              bottom: '5%',
              children: [
                {
                  type: 'text',
                  style: {
                    text: '有效:',
                    font: '12px "MicrosoftYaHeiUI" ',
                    fill: "rgba(62,73,86,0.6)"
                  }
                },
                {
                  type: 'text',
                  left: 30,
                  style: {
                    text: "",
                    font: '12px "MicrosoftYaHeiUI"  ',
                    fill: "rgba(62,73,86,1)"
                  }

                }
              ]
            }, {
              type: 'group',
              bottom: '5%',
              right: '4%',
              children: [
                {
                  type: 'text',
                  right: (1 + "").length,
                  style: {
                    text: "过期:",
                    font: '12px "MicrosoftYaHeiUI"  ',
                    fill: "rgba(62,73,86,0.6)"

                  }
                },
                {
                  type: 'text',
                  style: {
                    text: "",
                    font: '12px "MicrosoftYaHeiUI"  ',
                    fill: "rgba(62,73,86,1)"

                  }
                }
              ]
            }

          ]
        }

        indexNameArr.forEach(function (item, index) {
          option.graphic.elements[index].children[1].style.text = chartData.sum[index][item];
          if (index == 1){
            option.graphic.elements[index].children[0].right = (chartData.sum[index][item]+"").length;
          }
          if (item == "todayInuse") {
            option.series[0].data = chartData.data[index][item];
          }
        });
        option.title[0].subtext = option.series[0].data.slice(-1);
        option.xAxis = {data: xAxisData};

        myChart.setOption(option);
      },

      updateSimpleNumValue: function(refreshSimpleNumValue, subjectType, indexName) {
        singleIndexSimpleNumValue(refreshSimpleNumValue, '/sdsec/web/overview/visualization/portionInfo', subjectType, indexName);
      },
      refreshRespoolNum:function(data) {
        this.respoolNum = data.data[0]["value"];
      },
      refreshChainNum:function(data) {
        this.chainNum = data.data[0]["value"];
      },

      closeManagementMsg: function() {
        this.showSafeManagementMsg = false;
        $("#safeProductDredgeTendency").css("width","100%");
        let myChart = echarts.getInstanceById(document.getElementById("safeProductDredgeTendency").getAttribute('_echarts_instance_'));
        setTimeout(function(){
          myChart.resize();
        }, 100);
      },

      getMsgData: function () {
        this.msgNum = 10;
        this.msgItems = [
          {
            title: "SQL注入漏洞",
            content: "检测到SQL注入攻击,被攻击对象IP为192.198.33.215的MariaDB的3306端口,检测到SQL注入攻击,被攻击对象IP为192.198.33.215的MariaDB的3306端口检测到SQL注入攻击,被攻击对象IP为192.198.33.215的MariaDB的3306端口",
            hasRead: false

          }, {
            title: "版本升级通知",
            content: "系统升级通知2020/2/4，尊敬的用户您好，关于本平台V1.0.2的更新升级通知...",
            hasRead: false
          }, {
            title: "版本维护预告",
            content: "为了给您提供更好的平台操作体验，SDSec平台将在2月15日进行版本更新维护，维护完成后...",
            hasRead: false
          }, {
            title: "代办事项",
            content: "你好，您有一个订单待处理，请及时处理...",
            hasRead: true
          },
        ]
      },
      getTodayDate: function () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return year + seperator1 + month + seperator1 + strDate;
      },
      getInitStartDate: function () {
        var date = new Date();
        date.setDate(date.getDate()-9);
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
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
        $('#top-date-div button').removeClass('btn-curr');
        $('#todayBtn').addClass('btn-curr');
        let date = this.getTodayDate();
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

        this.updatesafeProductDredgeTendency("safeProductDredgeTendency",["todayTotal","todayOverdue"]);

        this.updateColumnChart("firewall",["todayInuse","todayOverdue"],"FIREWALL");

        this.updateColumnChart("waf",["todayInuse","todayOverdue"],"WAF");

        this.updateColumnChart("ips",["todayInuse","todayOverdue"],"IPS");

        this.updateColumnChart("scan",["todayInuse","todayOverdue"],"SCAN");

        this.updateColumnChart("antivirus",["todayInuse","todayOverdue"],"ANTIVIRUS");
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

      messageTable: function () {
        this.$router.push({
          name: 'MessageTableContext'
        })
      },

      refreshData: function () {
        this.updatesafeProductDredgeTendency("safeProductDredgeTendency",["todayTotal","todayOverdue"]);

        this.updateColumnChart("firewall",["todayInuse","todayOverdue"],"FIREWALL");

        this.updateColumnChart("waf",["todayInuse","todayOverdue"],"WAF");

        this.updateColumnChart("ips",["todayInuse","todayOverdue"],"IPS");

        this.updateColumnChart("scan",["todayInuse","todayOverdue"],"SCAN");

        this.updateColumnChart("antivirus",["todayInuse","todayOverdue"],"ANTIVIRUS");

        this.updateSimpleNumValue(this.refreshRespoolNum,"GlobalResourcePool","respoolNum");

        this.updateSimpleNumValue(this.refreshChainNum,"GlobalServiceChain","total");
      }
    },
    mounted: function () {
      this.safeProductDredgeTendency();
      this.firewallchart();
      this.wafchart();
      this.ipschart();
      this.scanchart();
      this.antiviruschart();
      this.getMsgData();

      this.dateInit();

      this.refreshData();

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

  .sec-service-item, .service-chain-item {
    border: 1px solid #e5e2e5;
  }

  .service-chain-label {
    font-size: 13px;
    color: #fff ;
  }

  .service-chain-num {
    margin-top: 5px;
    color: #fff;
    font-size: 30px;
  }

  .title-left-border {
    border-left: solid 2px #007BE8;
    padding-left: 12px;
    font-size: 14px;
    color: #3E4956;
    line-height: 18px;
    font-weight: normal;
  }

  .title-bottom-border {
    border-bottom: solid 3px #007BE8;
    line-height: 18px;
    width: 30px;
    margin-top: 5px;
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

  #safeManagementMsg {
    width: 28%;
    height: 100%;
    background-image: url("/static/sdsec/image/operation-bg2.png");
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }
</style>
