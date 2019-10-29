<template>
<div class="el-panel-white">
  <div class="el-panel-white-heading">
    <h3 class="el-panel-white-title">安全指数</h3>
  </div>
  <div class="el-panel-white-body safeindex-p">
    <div class="clearfloat chart-nav">
      <div class="float-l">
        <span class="scan-gif"><label class="scan-num">{{safetyScore}}</label></span>
      </div>
      <div class="float-l">
        <label class="scan-font"><p>安全</p><p>指数</p></label>
      </div>
      <el-form :inline="true" class="float-r scan-el-form">
        <el-form-item class="scan-sel">
          <el-select v-model="area" placeholder="全网" class="" @change="handleAreaChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="appraisalCycle" type="month" placeholder="考核周期" @change="handleDateChange" format="yyyyMM"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.status" placeholder="数据类型" @change="handleAreaChange" style="width:120px;">
            <el-option label="全部数据" :value="0"></el-option>
            <el-option label="考核数据" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="chart-container">
      <vchart ref="chart" :options="option" @click="chartClick" auto-resize></vchart>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import echarts from 'echarts'
import vchart from 'components/vue-echarts/ECharts.vue'
import option from './safetyIndex.js'
export default {
  components: {
    vchart
  },
  mixins: [option],
  data() {
    return {
      params: {
        areaId: '',
        appraisalCycle: '',
        status: 0
      },
      mapcolorlist: ['#ba1f00', '#ff2a00', '#ff8400', '#ffdd3f'],
      divvalue: [3.5, 2.5, 1.5],
      area: '',
      appraisalCycle: '',
      safetyScore: '',
      areaName: '',

    }
  },
  computed: {
    ...mapState({
      roleState: state => state.context_sz.RoleState,
    })
  },
  watch: {},
  methods: {
    chartClick(param) {
      let mapcolorlist = this.mapcolorlist;
      let divvalue = this.divvalue;
      let option = this.option;
      let self = this;
      if (param.data.name != "中国") {
        for (let i = 0; i < option.series[0].data.length; i++) {
          if (param.data.name == option.series[0].data[i].name) {
            option.series[0].data[i].selected = true;
            /*点击后areaColor与borderColor取原来pieces中配置的颜色*/
            if (param.data.value > divvalue[0]) {
              option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[0];
              option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[0];
            } else if ((param.data.value <= divvalue[0]) && (param.data.value > divvalue[1])) {
              option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[1];
              option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[1];
            } else if ((param.data.value <= divvalue[1]) && (param.data.value > divvalue[2])) {
              option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[2];
              option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[2];
            } else {
              option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[3];
              option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[3];
            }

          } else {
            option.series[0].data[i].selected = false;
          }
        };
      }

      if (!self.roleState) {
        return;
      }
      if (!param.data.areaId) {
        return;
      }
      let parameters = {
        areaId: param.data.areaId,
        appraisalCycle: self.common.formatDate(self.appraisalCycle, 'yyyyMM'),
        status: self.status,
        title: '安全指数'
      };
      self.$store.commit('openDrillDialogTable', parameters);
      self.$store.dispatch('loadDrillTableData', {});
    },
    handleAreaChange(item) {
      if (item) {
        this.areaName = item.label;
        this.params.areaId = item.value;
      }

      this.$store.commit('SET_PARAMS', this.params);
      this.getInitData();
    },
    handleDateChange(value) {
      this.params.appraisalCycle = value;
      this.handleAreaChange();
    },
    getInitData() {
      this.common.req('/ssa/overall/getSafetyIndex.do', this.params, this).then((data) => {
        this.loadMapChart(data);
        this.safetyScore = data.total;
      })
    },
    getPieces() {
      let divvalue = this.divvalue;
      let mapcolorlist = this.mapcolorlist;
      let pieces = [{
        gt: divvalue[0],
        color: mapcolorlist[0],
        label: '紧急'
      }, {
        gt: divvalue[1],
        lte: divvalue[0],
        color: mapcolorlist[1],
        label: '高危'
      }, {
        gt: divvalue[2],
        lte: divvalue[1],
        color: mapcolorlist[2],
        label: '中危'
      }, {
        lte: divvalue[2],
        color: mapcolorlist[3],
        label: '低危'
      }];
      return pieces;
    },
    loadMapChart(data) {
      this.option.visualMap.pieces = this.getPieces();
      this.option.series[0].data = data.list;
      this.$refs.chart.dispatchAction({
        type: 'mapSelect',
        name: this.areaName
      })

    },
  },
  mounted: async function() {
    this.$nextTick(() => {
      this.getInitData();
    })
    this.appraisalCycle = new Date();
    this.params.areaId = '';
    this.common.req('/ssa/overall/getSysAreas.do', {}, this).then(areas => {
      let newAreas = [{
        label: '全网',
        value: ''
      }].concat(areas);
      this.options = newAreas;
    })


  }
}
</script>

<style scoped>
.el-panel-white-body {
  padding-top: 92px;
  /*position: relative;*/
}

.chart-nav {
  height: 50px;
  width: 90%;
  position: absolute;
  left: 20px;
  top: 50px;
}
</style>
