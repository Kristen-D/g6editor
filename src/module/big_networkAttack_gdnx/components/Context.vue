<template>
<div class="container-wrap">
  <drill-data-table></drill-data-table>

  <el-row :gutter="30">

    <el-col :span="7">
      <!-- 高危告警趋势  -->
      <alarm-trend :data="alarmTrendData[0]"></alarm-trend>
      <!-- 中危告警趋势 -->
      <alarm-trend :data="alarmTrendData[1]"></alarm-trend>
      <!-- 攻击趋势 -->
      <attack-trend></attack-trend>
      <!-- 受威胁趋势 -->
      <threat-trend></threat-trend>

    </el-col>

    <el-col :span="17">
      <div class="el-panel-bigscreen">
        <div class="el-panel-bigscreen-heading">
          <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>全球攻击态势</h3>
          <div class="timesearch">
            <el-form :inline="true" :model="params" class="demo-form-inline elform timesearch-form">
              <label style="margin-right:8px">近</label>
              <el-form-item label="">
                <el-input v-model="params.timeValue" placeholder="30" size="small" style="width:50px"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-select v-model="params.timeType" placeholder="" size="small" style="width:80px;">
                  <!-- <el-option label="分钟" value="0"></el-option> -->
                  <el-option label="小时" value="1"></el-option>
                  <!-- <el-option label="天" value="2"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="deepblue" size="small" @click="search">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="day_time">
            <span>今日</span>
            <span>{{currentTimeString}}</span>
          </div>
        </div>
        <div class="el-panel-bigscreen-body box">
          <span class="box-tl"></span><span class="box-br"></span>
          <div class="">
            <el-row>
              <el-col :span="16" style="">
                <div class="echartsmapbox2">
                  <e-charts class="echartsmapbox2" :options="option" @chartclick="chartClick"  auto-resize></e-charts>
                </div>
              </el-col>
              <el-col :span="8">
                <attack-country :attackSource="attackSource"></attack-country>
                <div class="btn-map">
                  <el-button type="text" @click="changeMap(activeClass[0])"><i :class="[activeClass[0]]"></i></el-button>
                  <el-button type="text" @click="changeMap(activeClass[1])"><i :class="[activeClass[1]]"></i></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <el-row :gutter="40">
        <el-col :span="12">
          <!-- 网络攻击TOP -->
          <attack-top></attack-top>
        </el-col>

        <el-col :span="12">
          <!-- 最新告警事件TOP -->
          <alarm-table-top></alarm-table-top>
        </el-col>

      </el-row>

    </el-col>

  </el-row>
</div>
</template>
<script>
import ECharts from "../../../components/vue-echarts/ECharts.vue"
import AlarmTrend from "./left/AlarmTrend.vue"
import AttackTrend from "./left/AttackTrend.vue"
import ThreatTrend from "./left/ThreatTrend.vue"

import AttackCountry from "./right/big/Attack-Country-bar.vue"
import mapoption from './right/big/echart-mapoption.js'
import {geoChinaMap, geoWorldMap, guangdongMap} from "static/static_web/js/echarts/longladata.js"

import AttackTop from "./right/AttackTop.vue"
import AlarmTableTop from "./right/AlarmTableTop.vue"

import DrillDataTable from './DrillDetail.vue'

export default {
  name: "context",
  components: {
    ECharts,

    AlarmTrend,
    AttackTrend,
    ThreatTrend,

    AttackCountry,
    AttackTop,
    AlarmTableTop,

    DrillDataTable
  },
  data() {
    return {
      alarmTrendData: [{
          name: '高危告警趋势',
          alarmGrade: '3',
          dataUrl: '',
          type: '',
          color: ['#ff2a00', '#491c1c']
        },
        {
          name: '中危告警趋势',
          alarmGrade: '2',
          dataUrl: '',
          type: '',
          color: ['#ff8400', '#4a331f']
        }
      ],
      attackSource: 'icon_wd',
      activeClass: ['icon_cn', 'icon_gd', 'icon_wd'],
      // opObj: {
      //   'icon_wd': wdoption,
      //   'icon_cn': cnoption,
      //   'icon_gd': gdmapoption
      // },
      mapData: {
        'icon_wd': geoWorldMap,
        'icon_cn': geoChinaMap,
        'icon_gd': guangdongMap
      },
      attackedArea: {
        'icon_wd': '中国',
        'icon_cn': '广东省',
        'icon_gd': '广州市'
      },
      mapType: {
        'icon_wd': 'world',
        'icon_cn': 'china',
        'icon_gd': 'guangdong'
      },
      pintColor: ['#ff2a00', '80c269'],
      params: {
        timeType: '1',
        timeValue: '12',
        trigger: false,
      },
      dateNow: new Date(),
      currentTimeString: '',
      option: {}
    }
  },
  methods: {
    async changeMap(type) {
      if(type !== undefined) {
        this.attackSource = type;
        let index = this.activeClass.findIndex((ac) => {
          return ac === type;
        })
        this.activeClass.splice(index, 1);
        this.activeClass.push(type);
      }
      let as = this.attackSource;

      let data = await this.common.req('/ssa/netattack_gdnx/getNetAttackCountryMap.do', { ...this.params, rangeType: as}, this);
      let pointData = [];
      let attckData = [];
      let sheildData = [];
      for(let du of data) {
        let pointArra = this.mapData[as][du.location];
        pointArra.push(du.value);
        let ssz = du.value> 100? 12:(du.value>40?8:(du.value>10?4:2));
        let point = {

            "id": du.id,
            "name": du.location,
            "value": pointArra,
            "symbolSize": 2,
            "itemStyle": {
                "normal": {
                    "color": this.pintColor[du.flag]
                }
            }
        };

        let line = {
            "id": du.id,
            "fromName": du.location,
            "toName": this.attackedArea[as],
            "coords": [this.mapData[as][du.location], this.mapData[as][this.attackedArea[as]]]
        };
        pointData.push(point);
        if(du.flag === 0 ){
          attckData.push(line);
        }else {
          sheildData.push(line);
        }

      }
      mapoption.geo.map = this.mapType[as];
      mapoption.series[0].data = pointData;
      mapoption.series[1].data = attckData;
      mapoption.series[2].data = sheildData;

      this.option = mapoption;
      // this.opObj[this.attackSource].series[0].data = pointData;
      // this.opObj[this.attackSource].series[1].data = attckData;
      // this.opObj[this.attackSource].series[2].data = sheildData;
      //
      // this.option = this.opObj[this.attackSource];
    },
    chartClick(params) {
      // this.attackSource==='icon_gd'?params.data.id:params.data.fromName
      let belongs = params.seriesType==='lines'?(this.attackSource==='icon_gd'?params.data.id:params.data.fromName):(params.seriesType==='effectScatter'?params.data.id:params.name)
      let ps = { ...this.params, belong: belongs, rangeType: this.attackSource }
      this.$store.commit('openDrillDialogTable', ps);
      this.$store.dispatch('loadDrillTableData');
    },
    search() {
      this.$store.commit('SET_PARAMS', this.params);
      this.changeMap();
    },
    refreshData() {
      this.getCurrentDate();
      let self = this;
      if (self && !self._isDestroyed) {
        setInterval(() => {
          if (self && !self._isDestroyed) {
            self.getCurrentDate();
            self.params.trigger = !self.params.trigger;
            self.search();
          }

        }, 60000);
      }
    },
    getCurrentDate() {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      let weekend = ['日', '一', '二', '三', '四', '五', '六'];
      let week = d.getDay();

      hour < 10 && (hour = '0' + hour);
      minutes < 10 && (minutes = '0' + minutes);

      this.currentTimeString = `${year}年 ${month}月 ${day}日   周${weekend[week]} ${hour}:${minutes}`;
    }

  },
  created() {
    this.refreshData();
    window.fetchData = [];
  },
  async mounted() {
    this.$store.commit('SET_PARAMS', this.params);
    this.changeMap();
  }
};
</script>
<style >

</style>
