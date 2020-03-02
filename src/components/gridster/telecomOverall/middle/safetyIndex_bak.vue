<template>
<div class="el-panel-white clearfloat">
    <div class="el-panel-white-heading">
      <h3 class="el-panel-white-title">安全指数</h3>
    </div>
  <div class="el-panel-white-body safeindex-p">
    <div class="clearfloat chart-nav">
      <div class="float-l">
        <span class="scan-gif"><label class="scan-num">{{safetyScore}}</label></span>
      </div>
      <!-- <div class="float-l">
        <label class="scan-font"><p>安全</p><p>指数</p></label>
      </div> -->
      <el-form :inline="true" class="float-r scan-el-form">
        <el-form-item>
          <el-select v-model="area" placeholder="全网" style="width:80px;" @change="handleAreaChange">
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
      <vchart @chartclick="chartClick" :options="option" auto-resize  ></vchart>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import vchart from 'components/vue-echarts/ECharts.vue'
import {cvemapBoxOption} from './safetyIndex.js';
export default {
  components:{vchart},
  data() {
    return {
      option: cvemapBoxOption,
      options: [],
      params: {
        areaId: '',
        appraisalCycle: '',
        status: 0
      },
      area: '',
      appraisalCycle: '',
      safetyScore: '',
      areaName: '',

    }
  },
  computed: {
    ...mapState({
      roleState: state=>state.context.RoleState,
      // activeScreen: state => state.context.activeScreen,
      // EventTypeList:state=>state.context.list.EventTypeList,
    })
  },
  watch: {
    // activeScreen: function() {
    //   if(this.activeScreen==3) {
    //     this.getInitData();
    //   }
    // }
  },
  methods: {
    handleAreaChange(item) {
      // console.log(value);
      // console.log(this.params);
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
    chartClick (params) {
      let mapcolorlist = ['#ba1f00', '#ff2a00', '#ff8400', '#ffdd3f'];
      let divvalue = [3.5, 2.5, 1.5];
      if (param.data.name == "中国") {
      } else {
        for (let i = 0; i < this.option.series[0].data.length; i++) {
          if (param.data.name == this.option.series[0].data[i].name) {
            this.option.series[0].data[i].selected = true;
            /*点击后areaColor与borderColor取原来pieces中配置的颜色*/
            if (param.data.value > divvalue[0]) {
              this.option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[0];
              this.option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[0];
            } else if ((param.data.value <= divvalue[0]) && (param.data.value > divvalue[1])) {
              this.option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[1];
              this.option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[1];
            } else if ((param.data.value <= divvalue[1]) && (param.data.value > divvalue[2])) {
              this.option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[2];
              this.option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[2];
            } else {
              this.option.series[0].itemStyle.emphasis.areaColor = mapcolorlist[3];
              this.option.series[0].itemStyle.emphasis.borderColor = mapcolorlist[3];
            }

          } else {
            this.option.series[0].data[i].selected = false;
          }
        };
      }
      if(!self.roleState) {
        return;
      }
      if(!param.data.areaId) {
        return;
      }
      let parameters = { areaId: param.data.areaId, appraisalCycle: self.common.formatDate(self.appraisalCycle, 'yyyyMM'), title: '安全指数' };
      self.$store.commit('openDrillDialogTable_sz', parameters);
      self.$store.dispatch('loadDrillTableData_sz', {});
    },
    loadMapChart(data) {
      //let myChart = echarts.init(document.getElementById('cvemapbox'));
      let cvedata = data.list;
      let mapcolorlist = ['#ba1f00', '#ff2a00', '#ff8400', '#ffdd3f'];
      let divvalue = [3.5, 2.5, 1.5];
      let pieces=[{gt: divvalue[0],  color: mapcolorlist[0],label: '紧急'},
                  {gt: divvalue[1],  lte: divvalue[0],  color: mapcolorlist[1],  label: '高危'},
                  {gt: divvalue[2],  lte: divvalue[1],  color: mapcolorlist[2],label: '中危'},
                  {lte: divvalue[2],  color: mapcolorlist[3],label: '低危'}];
      this.option.visualMap.pieces = pieces;
      this.option.series.data = cvedata;
      // myChart.setOption(option);
      // window.onresize = myChart.resize;
      let self = this;

      // myChart.dispatchAction({
      //   type: 'mapSelect',
      //   // 可选，系列 index，可以是一个数组指定多个系列
      //   // seriesIndex?: number|Array,
      //   // 可选，系列名称，可以是一个数组指定多个系列
      //   // seriesName: string|Array,
      //   // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
      //   // dataIndex?: number,
      //   // 可选，数据名称，在有 dataIndex 的时候忽略
      //   name: self.areaName
      // })

    },
  },
  mounted: async function() {
    this.$nextTick(() => {
      this.getInitData();
      });
    this.appraisalCycle = new Date();
    this.params.areaId = '';
    let areas = await this.common.req('/ssa/overall/getSysAreas.do', {}, this);
    let newAreas = [{
      label: '全网',
      value: ''
    }].concat(areas);
    this.options = newAreas;
  }
}
</script>

<style scoped>
.el-panel-white-body{
  padding-top: 50px;
  position: relative;
}
  .chart-nav {
    height:50px;
    width: 90%;
    position: absolute;
    left: 20px;top:15px;
  }
</style>
