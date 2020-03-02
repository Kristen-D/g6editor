<template>
  <div>
    <!--<div id="top-date-div">
      <el-row type="flex" align="middle" justify="center">
        <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                   @click="todayClick"
                   type="text">
          今天
        </el-button>
        <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                   @click="weekClick"
                   type="text">
          7天
        </el-button>
        <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                   @click="monthClick"
                   type="text">
          本月
        </el-button>
        <el-button style=" padding: 0 ;line-height: 30px;font-size:12px;color:rgba(62, 73, 86, 0.6)"
                   @click="yearClick"
                   type="text">
          全年
        </el-button>
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
    </div>-->
    <div class="el-panel-body">
      <el-row type="flex" class="user-service-infos" align="middle">
        <el-col :span="13">
          <el-row type="flex" align="middle">
            <el-col :span="4"><img src="/static/sdsec/image/user1-solid.png" /></el-col>
            <el-col :span="20">
              <el-row type="flex" align="middle" class="secu-user-info">
                <el-col>
                  <p class="secu-user-info-grid">您好，{{loginUser.realname}}，祝你开心每一天！</p>
                </el-col>
                <el-col>
                  <p class="secu-user-info-grid-subtext">亚信云安全管理平台，灵活自如的为您提供一站式安全服务保障！</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="index==2?3:4" v-for="(o, index) in buyedServiceNums" :key="o">
          <el-row type="flex" align="middle" class="secu-user-info">
            <el-col>
              <p>{{o.serviceName}}}</p>
            </el-col>
            <el-col>
              <p v-if="!o.total"><span class="user-num">{{o.num}}</span></p>
              <p v-if="o.total"><span class="user-num">{{o.num}}</span>/{{o.total}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="secu-separator">
        <hr>
      </el-row>
      <el-row type="flex" class="secu-service-section2">
        <el-col>
          <el-row type="flex" class="head-title" justify="space-between">
            <div class="el-panel-title2">已购安全服务<span>(统计每个已购买的安全服务数量及安全当前正在使用的安全服务数量)</span></div>
            <div class="right-item"><el-row type="flex" align="middle"><i class="fa fa-bars"></i><span>全部项目</span></el-row></div>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" class="secu-buyedservices" justify="center">
            <el-col :span="4" v-for="(o, index) in buyedServices" :key="o">
              <el-row type="flex" class="buyservice-item flex-direction-column" align="middle">
                <div>
                  <img :src="o.productIcon" />
                </div>
                <span class="s1">{{o.name}}</span>
                <span class="s2">{{o.num}}/{{o.total}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="secu-separator">
        <hr>
      </el-row>
      <el-row type="flex" class="secu-service-section3">
        <el-col :span="12">
          <el-row type="flex" class="secu-service-section3-1">
            <el-col>
              <div class="el-panel-title2">账户余额概览</div>
            </el-col>
            <el-col>
              <el-row type="flex" class="secu-balance flex-direction-column">
                <el-col>
                  <el-row type="flex" justify="space-between" align="middle">
                    <el-col :span="23">
                      <el-row type="flex" align="middle">
                        <img src="/static/sdsec/image/balance1.png" class="img1"/><span class="curr-balance">当前可用余额</span>
                      </el-row>
                    </el-col>
                    <el-col :span="1"><i class="fa fa-2x fa-info-circle"></i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row type="flex" justify="center" align="middle">
                    <el-col :span="12">
                      <el-row type="flex" class="flex-direction-column" align="middle">
                        <span class="balance">{{balance}}</span>
                        <el-button class="charge-btn">充值</el-button>
                      </el-row>
                    </el-col>
                    <el-col :span="1"><hr class="hr-vertical"></el-col>
                    <el-col :span="11">
                      <el-row type="flex" class="cashs flex-direction-column">
                        <span class="s-item">现金</span>
                        <span class="s-num">{{cash}}</span>
                        <span class="s-item">赠送金</span>
                        <span class="s-num">{{giftMoney}}</span>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" class="secu-service-section3-2">
            <el-col>
              <div class="el-panel-title2">帮助文档</div>
            </el-col>
            <el-col>
              <el-row type="flex" class="help-doc">
                <el-col :span="8" v-for="(o, index) in helpDocs" :key="o">
                  <el-row type="flex" class="doc-item" align="middle"><i :class="'fa '+o.docIcon"></i><span>{{o.docName}}</span></el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="secu-separator">
        <hr>
      </el-row>
      <el-row type="flex" class="secu-service-section4">
        <el-col>
          <el-row type="flex" class="head-title" justify="space-between">
            <div class="el-panel-title2">消息中心<span>({{msgNum?msgNum:0}})</span></div>
            <div class="right-item" @click="getMessageTable"><el-row type="flex" align="middle"><i class="fa fa-bars"></i><span>全部消息</span></el-row></div>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" class="msg-center flex-direction-column" >
            <template v-for="(o, index) in msgInfos">
              <el-col>
                <el-row class="secu-separator" v-if="index!=0">
                  <hr>
                </el-row>
                <el-row type="flex" align="middle">
                  <i :class="'fa '+o.msgIcon"></i><span>{{o.title}}</span>
                </el-row>
                <el-row>
                  <p>{{o.msg}}</p>
                </el-row>
              </el-col>
            </template>
          </el-row>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
    import {formatDate} from 'static/sdsec/js/sdsec/sdsec-echart-utils';

    export default {
        data() {
            return {
                loginUser: {realname:''},
                // dateRange: '',
                // weekStartMonday: 1,
                buyedServiceNums: [
                    {serviceName: '已购安全服务数量', num: '', total: ''},
                    {serviceName: '有效安全服务数量', num: '', total: ''},
                    {serviceName: '有效服务链数量', num: '', total: ''}
                ],
                buyedServices: [
                    {productIcon: '/static/sdsec/image/WAF2.png', name: '下一代防护墙服务', num: '', total: ''},
                    {productIcon: '/static/sdsec/image/webx.png', name: 'Web应用防火墙服务', num: '', total: ''},
                    {productIcon: '/static/sdsec/image/area-invade.png', name: '入侵防护服务', num: '', total: ''},
                    {productIcon: '/static/sdsec/image/VPNgateway.png', name: '防病毒网关', num: '', total: ''},
                    {productIcon: '/static/sdsec/image/host-security1.png', name: '主机安全防护', num: '', total: ''}
                ],
                balance: '¥0',
                cash: 0,
                giftMoney: 0,
                helpDocs: [
                    {docName: '运营手册', docIcon: 'fa-book'},
                    {docName: '产品主打PPT', docIcon: 'fa-file-powerpoint-o'},
                    {docName: '平台运营流程规范平台运营流程规范', docIcon: 'fa-check-square'},
                    {docName: '租户侧用户手册', docIcon: 'fa-files-o'},
                    {docName: '运营手册', docIcon: 'fa-book'},
                    {docName: '产品主打PPT', docIcon: 'fa-file-powerpoint-o'},
                    {docName: '平台运营流程规范平台运营流程规范', docIcon: 'fa-check-square'},
                    {docName: '租户侧用户手册', docIcon: 'fa-files-o'},
                    {docName: '运营手册', docIcon: 'fa-book'},
                    {docName: '产品主打PPT', docIcon: 'fa-file-powerpoint-o'},
                    {docName: '平台运营流程规范平台运营流程规范', docIcon: 'fa-check-square'},
                    {docName: '租户侧用户手册', docIcon: 'fa-files-o'},
                    {docName: '运营手册', docIcon: 'fa-book'},
                    {docName: '产品主打PPT', docIcon: 'fa-file-powerpoint-o'},
                    {docName: '平台运营流程规范平台运营流程规范', docIcon: 'fa-check-square'},
                    {docName: '租户侧用户手册', docIcon: 'fa-files-o'}
                ],
                msgNum: 10,
                msgInfos: [
                    {title: 'SQL注入漏洞XXX', msgIcon: 'fa-exclamation-triangle', msg: '一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介.一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介.'},
                    {title: '版本升级通知', msgIcon: 'fa-files-o', msg: '一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介.一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介.'},
                    {title: '版本维护预告', msgIcon: 'fa-bars', msg: '一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介.一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介。一段假想的简介，这是一段比较长的简介.'}
                ]
            }
        },
        methods: {
            async getLoginUser(){
                await this.utils.reqObjBackState("/ssa/main/getLoginUser.do").then(currentLoginUser => {
                    this.loginUser = currentLoginUser.data;
                });
            },
            /*getTodayDate: function () {
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
            todayClick: function () {
                let date = this.getTodayDate();
                this.dateRange = [date, date];
                this.dateChange();
            },
            weekClick: function () {
                this.dateRange = this.getWeekStartAndEnd(new Date());
                this.dateChange();
            },
            monthClick: function () {
                let date = new Date(), y = date.getFullYear(), m = date.getMonth();
                let firstDay = new Date(y, m, 1);
                let lastDay = new Date(y, m + 1, 0);
                this.dateRange = [formatDate(firstDay), formatDate(lastDay)];
                this.dateChange();
            },
            yearClick: function () {
                //获取本年开始-当前时间
                let now = new Date();
                let currentYear = now.getFullYear();//获得当前年份4位年
                let currentYearFirstDate = new Date(currentYear, 0, 1); //本年第一天
                let startTime = formatDate(currentYearFirstDate);
                this.dateRange = [startTime, formatDate(now)];
                this.dateChange();
            },
            dateChange: function () {
                console.log(this.dateRange);
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
            },*/
            async getBuyedSecServiceNum1() {
                // 已购安全服务数量
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"GlobalSecurityService",
                    "indexes":["total"],
                    "filters": {"tenantId":-1}
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
                if (jsonData) {
                    this.buyedServiceNums[0].num = jsonData.data[0].value;
                }
            },
            async getBuyedSecServiceNum2() {
                // 有效安全服务数量
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"GlobalSecurityService",
                    "indexes":["total","inuse"],
                    "filters": {"tenantId":-1}
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
                if (jsonData) {
                    this.buyedServiceNums[1].num = jsonData.data[1].value;
                    this.buyedServiceNums[1].total = jsonData.data[0].value;
                }
            },
            async getBuyedSecServiceNum3() {
                // 有效服务链数量
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"GlobalServiceChain",
                    "indexes":["total","inuse"],
                    "filters": {"tenantId":-1}
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
                if (jsonData) {
                    this.buyedServiceNums[2].num = jsonData.data[1].value;
                    this.buyedServiceNums[2].total = jsonData.data[0].value;
                }
            },
            async getFirewall() {
                // 下一代防护墙服务
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"SingleSecurityService",
                    "indexes":["total","inuse"],
                    "filters": {"productType":"FIREWALL","tenantId":-1}
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
                if (jsonData) {
                    this.buyedServices[0].num = jsonData.data[1].value;
                    this.buyedServices[0].total = jsonData.data[0].value;
                }
            },
            async getWaf() {
                // Web应用防火墙服务
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"SingleSecurityService",
                    "indexes":["total","inuse"],
                    "filters": {"productType":"WAF","tenantId":-1}
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
                if (jsonData) {
                    this.buyedServices[1].num = jsonData.data[1].value;
                    this.buyedServices[1].total = jsonData.data[0].value;
                }
            },
            async getIps() {
                // 入侵防护服务
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"SingleSecurityService",
                    "indexes":["total","inuse"],
                    "filters": {"productType":"IPS","tenantId":-1}
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
                if (jsonData) {
                    this.buyedServices[2].num = jsonData.data[1].value;
                    this.buyedServices[2].total = jsonData.data[0].value;
                }
            },
            async getAntivirus() {
                // 防病毒网关
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"SingleSecurityService",
                    "indexes":["total","inuse"],
                    "filters": {"productType":"ANTIVIRUS","tenantId":-1}
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
                if (jsonData) {
                    this.buyedServices[3].num = jsonData.data[1].value;
                    this.buyedServices[3].total = jsonData.data[0].value;
                }
            },
            async getScan() {
                // 主机安全防护
                var url = '/sdsec/web/overview/visualization/portionInfo';
                var reqParam = {
                    "justCurrentData":1,
                    "subjectType":"SingleSecurityService",
                    "indexes":["total","inuse"],
                    "filters": {"productType":"SCAN","tenantId":-1}
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
                if (jsonData) {
                    this.buyedServices[4].num = jsonData.data[1].value;
                    this.buyedServices[4].total = jsonData.data[0].value;
                }
            },
            getMessageTable: function () {
              let params = {loginUser:'tenant'};
              this.$router.push({name: "MessageContext",params: params});
            }
        },
        mounted: function () {
          this.getBuyedSecServiceNum1();
          this.getBuyedSecServiceNum2();
          this.getBuyedSecServiceNum3();

          this.getFirewall();
          this.getWaf();
          this.getIps();
          this.getAntivirus();
          this.getScan();
        },
        created: async function () {
          this.getLoginUser();
        }
    }
</script>

<style>
  .el-tabs__content {
   overflow: visible;
  }
  .user-service-infos {
    height: 90px;
  }
  .user-service-infos > div {
    height: 100%;
  }
  .user-service-infos img {
    height: 90px;
    width: 90px;
  }
  .secu-user-info {
    flex-direction: column;
    margin-left: 26px;
    height: 100%;
    justify-content: center;
  }
  .secu-user-info p {
    font-size:12px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(62,73,86,0.6);
    line-height:15px;
    margin-bottom: 6px;
  }
  .secu-user-info .secu-user-info-grid {
    font-size:18px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(62,73,86,1);
    line-height:23px;
    margin-bottom: 6px;
  }
  .secu-user-info .secu-user-info-grid-subtext {
    font-size:14px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(62,73,86,0.6);
    line-height:18px;
  }
  .secu-user-info p.secu-user-info-num-p {
    font-size:18px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(62,73,86,0.6);
    line-height:23px;
  }
  .secu-user-info .user-num {
    font-size:30px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(62,73,86,1);
    line-height:38px;
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
  .secu-service-section2, .secu-service-section3-1, .secu-service-section3-2, .secu-service-section4 {
    flex-direction: column;
  }
  .secu-service-section2 .head-title i {
    height: 12px;
    color: rgba(0,123,232,1);
  }

  .secu-service-section4 .head-title i {
    height: 12px;
    color: rgba(0,123,232,1);
  }

  .secu-service-section2 .head-title span {
    font-size:12px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(62,73,86,0.6);
    margin-left: 6px;
  }
  .secu-service-section2 .head-title .right-item span {
    font-size:12px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(0,123,232,1);
  }
  .secu-service-section4 .head-title span {
    margin-left: 6px;
  }

  .secu-service-section4 .head-title .right-item span {
    font-size:12px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(0,123,232,1);
  }

  .right-item {
    cursor: pointer;
  }

  .secu-buyedservices {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .flex-direction-column {
    flex-direction: column;
  }
  .secu-buyedservices .buyservice-item span.s1 {
    font-size:13px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(62,73,86,1);
    margin-top: 16px;
    margin-bottom: 6px;
  }
  .secu-buyedservices .buyservice-item span.s2 {
    font-size:16px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(62,73,86,0.6);
  }
  .secu-buyedservices img {
    height: 120px;
  }

  .secu-balance {
    padding: 20px 17px;
    margin: 20px 29px 0px 7px;
    height: 183px;
    background-image: url("/static/sdsec/image/security-bg2.png");
    background-size: cover;
    border-radius: 5px;
  }
  .secu-balance .hr-vertical {
    height: 130px;
    border: none;
    border-left: 1px solid #FFE9C7;
  }
  .secu-balance .img1 {
    margin-right: 6px;
    height: 20px;
    width: 20px;
  }
  .secu-balance i {
    color: #938a92;
  }
  .secu-balance .curr-balance {
    font-size:13px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(62,73,86,1);
  }
  .secu-balance .balance {
    font-size:40px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(254,156,1,1);
    margin-bottom: 19px;
  }
  .secu-balance .charge-btn {
    width:190px;
    background:rgba(254,156,1,1);
    border-radius:2px;
  }
  .secu-balance .charge-btn span {
    font-size:14px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(255,255,255,1);
    letter-spacing:1px;
  }
  .secu-balance .s-item {
    height:15px;
    font-size:12px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(0,0,0,0.4);
    line-height:15px;
  }
  .secu-balance .s-num {
    height:25px;
    font-size:20px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(250,100,0,0.6);
    line-height:25px;
    letter-spacing:1px;
  }
  .secu-balance .cashs {
    background-image: url("/static/sdsec/image/security-bg1.png");
    background-size: cover;
    padding: 16px 9px;
    width: 90%;
    border-radius: 5px;
  }
  .help-doc {
    padding: 20px 17px;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .help-doc > div {
    height: 35px;
    margin-bottom: 1px;
    padding-right: 1px;
  }
  .help-doc .doc-item {
    height: 100%;
    background: #F8F8F8;
  }
  .help-doc i {
    width: 16px;
    margin-left: 13px;
    margin-right: 12px;
  }
  .help-doc span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }
  .msg-center {
    padding: 20px 17px;
  }
  .msg-center i {
    height: 16px;
    width: 13px;
    margin-right: 12px;
  }
  .msg-center span {
    height:16px;
    font-size:13px;
    font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
    font-weight:bold;
    color:rgba(62,73,86,1);
    line-height:16px;
    margin-bottom: 6px;
  }
  .msg-center p {
    margin-left: 25px;
    height:15px;
    font-size:12px;
    font-family:MicrosoftYaHeiUI;
    color:rgba(62,73,86,0.6);
    line-height:15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /*#top-date-div {
    height: 40px;
    position: absolute;
    padding: 0px 15px;
    margin: auto;
    right: 20px;
    z-index: 999999;
    top: -40px;
  }
  #top-date-div > div {
    height: 40px;
  }
  #top-date-div > div button {
    margin: 0 10px;
  }
  #ai-date-range .el-range-editor--mini .el-range-input {
    font-family: MicrosoftYaHeiUI!important;
    color: rgba(62,73,86,0.6);
  }*/
</style>
