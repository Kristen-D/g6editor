<!-- 运营-租户概览 -->
<template>
  <div>
    <div id="top-date-div-tenant">
      <el-row type="flex" align="middle" justify="center">
        <div style="border: 1px solid #E1E3E4;height:30px;margin-right: 15px">
          <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                     @click="todayClick" id="todayBtn"
                     type="text">
            今天
          </el-button>
          <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                     @click="weekClick" id="weekBtn"
                     type="text">
            7天
          </el-button>
          <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                     @click="monthClick" id="monthBtn"
                     type="text">
            本月
          </el-button>
          <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                     @click="yearClick" id="yearBtn"
                     type="text">
            全年
          </el-button>
        </div>

        <div id="ai-date-range">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            size="mini"
            @change="dateChange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-row>
    </div>
    <div class="el-panel-body">
      <el-row type="flex" class="row-div-sup flex-direction-column">
        <el-col>
          <el-row type="flex" class="head-title" justify="space-between">
            <div class="el-panel-title2">租户信息统计</div>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" class="row-div" justify="space-between">
            <el-col :span="8">
              <!-- 新增&存量用户占比统计图 -->
              <div class="echart-div-l" id="increaseAndStockUserRate"></div>
            </el-col>
            <el-col :span="16">
              <!-- 每日新增租户数量统计图 -->
              <div class="echart-div" id="dailyIncreaseTenantNum"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="secu-separator">
        <hr>
      </el-row>
      <el-row type="flex" class="row-div-sup flex-direction-column">
        <el-col>
          <el-row type="flex" class="head-title" justify="space-between">
            <div class="el-panel-title2">租户购买服务信息统计</div>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" class="row-div" justify="space-between">
            <el-col :span="8">
              <!-- 安全服务购买排行TOP3 -->
              <div class="echart-div-l" id="secServiceBuyTop3">
                <el-row class="top3-title">安全服务购买排行TOP3</el-row>
                <template v-for="(item, index) in secServiceBuyTop3">
                  <el-row v-if="index != 0" class="secu-separator">
                    <hr>
                  </el-row>
                  <el-row type="flex" justify="start" align="middle">
                    <template v-if="index == 0">
                      <img src="/static/sdsec/image/top1.png"/>
                    </template>
                    <template v-if="index == 1">
                      <img src="/static/sdsec/image/top2.png"/>
                    </template>
                    <template v-if="index == 2">
                      <img src="/static/sdsec/image/top3.png"/>
                    </template>
                    <label>{{item.name}}</label><span>{{item.value}}</span>
                  </el-row>
                </template>
              </div>
            </el-col>
            <el-col :span="16">
              <!-- 安全服务购买数量排名（全排） -->
              <div class="echart-div" id="secServiceBuyNumRank"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="secu-separator">
        <hr>
      </el-row>
      <el-row type="flex" class="row-div-sup flex-direction-column">
        <el-col>
          <el-row type="flex" class="head-title" justify="space-between">
            <div class="el-panel-title2">租户所属行业&使用频度统计</div>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" class="row-div" justify="space-between">
            <el-col :span="8">
              <!-- 租户所属行业分类统计图 -->
              <div class="echart-div-l" id="tenantBelongTradeRate"></div>
            </el-col>
            <el-col :span="16">
              <!-- 租户访问平台活跃度TOP10 -->
              <div class="echart-div" id="tenantAccessPlatformRank"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
    import {formatDate, getSecServiceProductChineseName} from 'static/sdsec/js/sdsec/sdsec-echart-utils';

    export default {
        data() {
            return {
                loginUser: {realname:''},
                dateRange: '',
                weekStartMonday: 1,
                myChart1: null,
                myChart2: null,
                myChart3: null,
                myChart4: null,
                myChart5: null,
                secServiceBuyTop3: [
                    {name: '防火墙', value: 150},
                    {name: '态势感知', value: 34},
                    {name: '终端防病毒', value: 21}
                ]
            }
        },
        methods: {
            async getLoginUser(){
                await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
                    this.loginUser = currentLoginUser.data;
                });
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
            getStartDateAdd8: function() {
                var startDate = new Date(this.dateRange[0]);
                startDate.setHours(8);
                startDate.setMinutes(0);
                startDate.setSeconds(0);
                return startDate;
            },
            todayClick: function (event,a,b) {
                let date = this.getTodayDate();
                this.dateRange = [date, date];
                $('#top-date-div-tenant button').removeClass('btn-curr');
                $('#todayBtn').addClass('btn-curr');
                this.dateChange();
            },
            weekClick: function () {
                this.dateRange = this.getWeekStartAndEnd(new Date());
                $('#top-date-div-tenant button').removeClass('btn-curr');
                $('#weekBtn').addClass('btn-curr');
                this.dateChange();
            },
            monthClick: function () {
                let date = new Date(), y = date.getFullYear(), m = date.getMonth();
                let firstDay = new Date(y, m, 1);
                let lastDay = new Date(y, m + 1, 0);
                this.dateRange = [formatDate(firstDay), formatDate(lastDay)];
                $('#top-date-div-tenant button').removeClass('btn-curr');
                $('#monthBtn').addClass('btn-curr');
                this.dateChange();
            },
            yearClick: function () {
                //获取本年开始-当前时间
                let now = new Date();
                let currentYear = now.getFullYear();//获得当前年份4位年
                let currentYearFirstDate = new Date(currentYear, 0, 1); //本年第一天
                let startTime = formatDate(currentYearFirstDate);
                this.dateRange = [startTime, formatDate(now)];
                $('#top-date-div-tenant button').removeClass('btn-curr');
                $('#yearBtn').addClass('btn-curr');
                this.dateChange();
            },
            dateChange: function () {
                this.queryIncreaseAndStockUserRate();
                this.queryDailyIncreaseTenantNum();
                this.querySecServiceBuyNumRank();
                this.queryTenantBelongTradeRate();
                this.queryTenantAccessPlatformRank();
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
                return [weekStart, weekEnd]
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
            async queryIncreaseAndStockUserRate() {
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"GlobalTenant",
                    "indexes":[
                        "userTotal","userAdded","userStock"
                    ]
                };
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
                if (!jsonData) {
                    return;
                }
                var legendData = ['新增', '存量'];
                var seriesName = '新增&存量用户占比';
                var seriesData = [
                    {value: jsonData.data[1].value, name: '新增'},
                    {value: jsonData.data[2].value, name: '存量'}
                ];
                var option = {
                    title: {
                        text: '新增&存量用户占比统计图',
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'MicrosoftYaHeiUI',
                            color:'#3E4956'
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    color: ['#007BE8','#3CB670'],
                    legend: {
                        orient: 'vertical',
                        icon: "circle",
                        left: '55%',
                        top: 'center',
                        data: legendData,
                        formatter: function(name){
                            var total = 0;
                            option.series[0].data.forEach(function(item,index){
                                total += parseInt(item.value);
                            });
                            var result = '';
                            option.series[0].data.forEach(function(item,index){
                                var n = item.name;
                                var v = item.value;
                                var r = v * 100 / total;
                                if (name == n) {
                                    result =  '{name|' + n + v + '}' + r.toFixed(2) + '%';
                                }
                            });
                            return result;
                        },
                        textStyle: {
                            rich: {
                                name: {width:80}
                            }
                        }
                    },
                    series: [
                        {
                            name: seriesName,
                            type: 'pie',
                            center: ['25%', '50%'],
                            radius: ['45%', '58%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '36',
                                        fontWeight: 'bold',
                                        color: '#000'
                                    },
                                    formatter: function(a,b){
                                        var total = 0;
                                        option.series[0].data.forEach(function(item,index){
                                            total += parseInt(item.value);
                                        });
                                        return total;
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
                this.myChart1 = echarts.init(document.getElementById('increaseAndStockUserRate'));
                this.myChart1.setOption(option);
            },
            async queryDailyIncreaseTenantNum() {
                var startDate = this.getStartDateAdd8();
                var url = '/sdsec/web/overview/visualization/coordinateInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"GlobalTenant",
                    "startTime": startDate.toISOString().substring(0, 19),
                    "indexes":["todayAddedTenant"]
                };
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
                if (!jsonData) {
                    return;
                }
                var xAxisData = [];
                for (var i=0; i < jsonData.xAxis.bottom.length; i++) {
                    xAxisData.push(jsonData.xAxis.bottom[i].substring(0, 10));
                }
                var seriesData = [];
                for (var j = 0; j < jsonData.data[0].todayAddedTenant.length; j++) {
                    seriesData.push(jsonData.data[0].todayAddedTenant[j] ? jsonData.data[0].todayAddedTenant[j] : 0);
                }
                var option = {
                    title: {
                        text: '每日新增租户数量统计图',
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'MicrosoftYaHeiUI',
                            color:'#3E4956'
                        }
                    },
                    color: ['#3CB670'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(data){
                            var item = data[0];
                            return item.name + '<br/>' + item.marker+ item.seriesName + ' : ' + item.value;
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '每日新增租户数量',
                            type: 'pictorialBar',
                            //位置偏移
                            barCategoryGap: '-10%',
                            //图形形状
                            symbol: 'path://M150 50 L130 130 L170 130 Z',
                            barWidth: '50%',
                            data: seriesData
                        },
                        {
                            name: '每日新增租户数量',
                            type: 'line',
                            itemStyle: {
                                opacity: 0
                            },
                            data: seriesData
                        }
                    ]
                };
                this.myChart2 = echarts.init(document.getElementById('dailyIncreaseTenantNum'));
                this.myChart2.setOption(option);
            },
            async querySecServiceBuyNumRank() {
                var startDate = this.getStartDateAdd8();
                var url = '/sdsec/web/overview/visualization/automatedAnalyzeInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType": "SingleSecurityService",
                    "startTime": startDate.toISOString().substring(0, 19),
                    "groupBy":"productType",
                    "indexes":["todayInuse"]
                };
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
                if (!jsonData) {
                    return;
                }

                var xAxisData = [];
                var seriesDataBuyed = [];
                var seriesDataTotal = [];
                for (var i = 0; i < jsonData.data.length; i++) {
                    xAxisData.push(getSecServiceProductChineseName(jsonData.data[i].name));
                    seriesDataBuyed.push(getSecServiceProductChineseName(jsonData.data[i].value));
                    seriesDataTotal.push(100);  // TODO 后台暂时没有返回总量, 先设置为100
                }
                var seriesDataBalanced = [];
                for (var i = 0; i < seriesDataBuyed.length; i++) {
                    seriesDataBalanced.push(seriesDataTotal[i] - seriesDataBuyed[i]);
                }
                var seriesNameBuyed = '已配额';
                var seriesNameBalanced = '总配额';  //实际是剩余,当作总配额使用
                var seriesNameTotal = '总配额';
                var option = {
                    legend: {
                        data: [seriesNameBuyed,seriesNameBalanced],
                        right: 30,
                        icon: "circle"
                    },
                    title: {
                        text: '安全服务购买数量排名（全排）',
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'MicrosoftYaHeiUI',
                            color:'#3E4956'
                        }
                    },
                    color: ['#F7B500','#596A7D','#596A7D'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(params) {
                            var result = '';
                            var item = params[0];
                            var item2 = params[2];
                            if (item) {
                                result += item.name + '<br/>'
                                result += item.marker + item.seriesName + ' : ' + item.value + '<br/>';
                            }
                            if (item2) {
                                result += item2.marker + item2.seriesName + ' : ' + item2.value;
                            }
                            return result;
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: seriesNameBuyed,
                            type: 'bar',
                            stack: '总量',
                            //位置偏移
                            barCategoryGap: '-10%',
                            barWidth: '30%',
                            itemStyle: {
                                borderColor: '#F7B500'
                            },
                            label: {
                                show: true
                            },
                            data: seriesDataBuyed
                        },
                        {
                            name: seriesNameBalanced,
                            type: 'bar',
                            stack: '总量',
                            //位置偏移
                            barCategoryGap: '-10%',
                            barWidth: '30%',
                            data: seriesDataBalanced
                        },
                        {
                            name: seriesNameTotal,
                            type: 'line',
                            lineStyle:{
                                opacity : 0,
                            },
                            itemStyle: {
                                opacity: 0
                            },
                            data: seriesDataTotal
                        }
                    ]
                };
                this.myChart3 = echarts.init(document.getElementById('secServiceBuyNumRank'));
                this.myChart3.setOption(option);
            },
            async queryTenantBelongTradeRate() {
                var startDate = this.getStartDateAdd8();
                var url = '/sdsec/web/overview/visualization/automatedAnalyzeInfo';
                var reqParam = {
                    "subjectType": "SingleTenant",
                    "startTime": startDate.toISOString().substring(0, 19),
                    "groupBy":"industry"
                };
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
                if (!jsonData) {
                    return;
                }
                var legendData = [];
                for (var i = 0; i < jsonData.data.length; i++) {
                    legendData.push(jsonData.data[i].name);
                }
                var seriesData = jsonData.data;
                var option = {
                    title: {
                        text: '租户所属行业分类统计图',
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'MicrosoftYaHeiUI',
                            color:'#3E4956'
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    color: ['#4777F5','#45AFF0', '#43DBF7'],
                    legend: {
                        orient: 'vertical',
                        icon: "circle",
                        left: '55%',
                        top: 'center',
                        data: legendData,
                        formatter: function(name){
                            var total = 0;
                            option.series[0].data.forEach(function(item,index){
                                total += parseInt(item.value);
                            });
                            var result = '';
                            option.series[0].data.forEach(function(item,index){
                                var n = item.name;
                                var v = item.value;
                                var r = v * 100 / total;
                                if (name == n) {
                                    result =  '{name|' + n + v + '}' + r.toFixed(2) + '%';
                                }
                            });
                            return result;
                        },
                        textStyle: {
                            rich: {
                                name: {width:80}
                            }
                        }
                    },
                    series: [
                        {
                            name: '租户所属行业分类',
                            type: 'pie',
                            center: ['25%', '50%'],
                            radius: ['45%', '58%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '36',
                                        fontWeight: 'bold',
                                        color: '#000'
                                    },
                                    formatter: function(){
                                        var total = 0;
                                        option.series[0].data.forEach(function(item,index){
                                            total += parseInt(item.value);
                                        });
                                        return total;
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
                this.myChart4 = echarts.init(document.getElementById('tenantBelongTradeRate'));
                this.myChart4.setOption(option);
            },
            async queryTenantAccessPlatformRank() {
                var startDate = this.getStartDateAdd8();
                var url = '/sdsec/web/overview/visualization/automatedAnalyzeInfo';
                var reqParam = {
                    "subjectType": "SingleTenant",
                    "startTime": startDate.toISOString().substring(0, 19),
                    "topValue": 10,
                    "groupBy":"name",
                    "indexes":["todayActivity"]
                };
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
                if (!jsonData) {
                    return;
                }
                var xAxisData = [];
                var seriesData = [];
                for (var i = 0; i < jsonData.data.length; i++) {
                    xAxisData.push(jsonData.data[i].name);
                    seriesData.push(jsonData.data[i].value);
                }
                var option = {
                    title: {
                        text: '租户访问平台活跃度TOP10',
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'MicrosoftYaHeiUI',
                            color:'#3E4956'
                        }
                    },
                    color: ['#007BE8'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '租户访问平台活跃度',
                            type: 'bar',
                            //位置偏移
                            barCategoryGap: '-10%',
                            barWidth: '50%',
                            data: seriesData
                        }
                    ]
                };
                this.myChart5 = echarts.init(document.getElementById('tenantAccessPlatformRank'));
                this.myChart5.setOption(option);
            }
        },
        mounted: function () {
          var This = this;
          window.onresize = function () {
              This.myChart1 && This.myChart1.resize();
              This.myChart2 && This.myChart2.resize();
              This.myChart3 && This.myChart3.resize();
              This.myChart4 && This.myChart4.resize();
              This.myChart5 && This.myChart5.resize();
          }
          // 默认查询"7天"
          this.weekClick();
        },
        created: async function () {
            // this.getLoginUser();
        }
    }
</script>

<style>
  .el-tabs__content {
    overflow: visible;
  }
  .head-title {
    margin-bottom: 20px;
  }
  .secu-separator {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .secu-separator hr {
    height: 1px;
    border: none;
    border-top: 1px solid #E1E2E3;
  }
  .row-div > div {
    height: 280px;
  }
  .row-div .echart-div, .row-div .echart-div-l {
    height: 100%;
    border: 1px solid #E1E2E3;
  }
  .row-div .echart-div-l {
    /*margin-right: 16px;*/
  }
  .row-div #secServiceBuyTop3 {
    background: url("/static/sdsec/image/Artboard 1.png") no-repeat;
    background-size: contain;
  }
  .row-div #secServiceBuyTop3 .top3-title {
    font-size:12px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(62,73,86,1);
    font-weight: bold;
    margin-left: 5px;
    margin-bottom: 30px;
  }
  .row-div #secServiceBuyTop3 label {
    font-size:14px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(62,73,86,1);
    width: 120px;
    margin-right: 45%;
  }
  .row-div #secServiceBuyTop3 img{
    height: 50px;
    width: 50px;
    margin-right: 10px;
    margin-left: 30px;
  }
  .row-div #secServiceBuyTop3 span {
    width: 50px;
  }
  .row-div #secServiceBuyTop3 .secu-separator {
    margin: 10px 20px;
  }

  #top-date-div-tenant {
    height: 40px;
    position: absolute;
    padding: 0px 15px;
    margin: auto;
    right: 20px;
    z-index: 999999;
    top: -40px;
  }
  #top-date-div-tenant > div {
    height: 40px;
  }
  #top-date-div-tenant > div button {
    margin: 0 10px;
  }
  #top-date-div-tenant .btn-curr {
    color: #3a8ee6!important;
  }
  #ai-date-range .el-range-editor--mini .el-range-input {
    font-family: MicrosoftYaHeiUI!important;
    color: rgba(62,73,86,0.6);
  }
</style>

