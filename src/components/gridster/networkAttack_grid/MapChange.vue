<template>

      <div class="el-panel el-panel-body p-t-0">
        <ul class="z_box">
          <li>
            <label>监测资产总量</label>
            <span>{{statistics.asset}}</span>
          </li>
          <li>
            <label>攻击总量</label>
            <span>{{statistics.total}}</span>
          </li>
          <li>
            <label>新增攻击</label>
            <span>{{statistics.new}}</span>
          </li>
        </ul>

        <el-row :gutter="10">
          <el-col :span="3">

            <attack-mapbar></attack-mapbar>

          </el-col>
          <el-col :span="15">
            <div style="height: 340px; position: relative;display:flex;justify-content:center;align-items:center;flex-direction: column;">
              <div style="height: 280px;width:100%" v-if="advancedFlag">
                <e-worldweb></e-worldweb>
              </div>
              <div style="height: 280px;width:100%" v-if="!advancedFlag">
                <e-chinaweb></e-chinaweb>
              </div>
              <div class="btn-map-radio">
                <button class="clickStyle" @click="showAdvanced()">世界地图</button>
                <button @click="hiddenAdvanced()">中国地图</button>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
              <attack-country :attackSource="attackSource"></attack-country>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="18">
            <!-- 攻击趋势 -->
            <attack-trend></attack-trend>

          </el-col>
          <el-col :span="6">
            <!-- 攻击等级 -->
            <attack-grade></attack-grade>

          </el-col>
        </el-row>
      </div>

</template>
<script>

import AttackCountry from "./components/left/big/Attack-Country-bar.vue";
import AttackMapbar from "./components/left/big/Attack-mapbar.vue";
import EChinaweb from "./components/left/big/Echarts-China-map.vue";
import EWorldweb from "./components/left/big/Echarts-World-map.vue";
import AttackTrend from "./components/left/big/Attack-Trend-line.vue";
import AttackGrade from "./components/left/big/Attack-Grade-pie.vue";



export default {
  name: "context",
  components: {


    AttackCountry,
    AttackMapbar,
    EChinaweb,
    EWorldweb,
    AttackTrend,
    AttackGrade,

  },
  data() {
    return {
      advancedFlag: true,
      statistics: {},
      attackSource: 'world'
    };
  },
  methods: {
    showAdvanced() {
      this.advancedFlag = true;
      this.attackSource = 'world';
      $('.btn-map-radio button:first').addClass("clickStyle");
      $('.btn-map-radio button:last').removeClass("clickStyle");
    },
    hiddenAdvanced() {
      this.advancedFlag = false;
      this.attackSource = 'china';
      $('.btn-map-radio button:first').removeClass("clickStyle");
      $('.btn-map-radio button:last').addClass("clickStyle");
    }
  },
  created() {
    this.$store.dispatch('loadInfoList')
  },
  async mounted() {
    let data = await this.common.req('/ssa/netattack/getNetAttackStat.do', {}, this);
    this.statistics = data;
  }
};
</script>
<style >
.z_box {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  height: 80px;
  justify-content: space-around;
  align-items: center;
}

.z_box li {
  display: flex;
  align-items: center;
}

.z_box label {
  color: #3e4956;
  font-size: 16px;
  margin-right: 15px;
}

.z_box span {
  color: #3e4956;
  font-size: 36px;
  font-family: "Haettenschweiler";
}

.btn-map-radio {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-map-radio button {
  width: 80px;
  height: 30px;
  color: black;
  font-size: 12px;
  background: transparent;
  border: 2px solid #e1e3e4;
  margin: 0;
}

.btn-map-radio button:nth-of-type(1) {
  border-right: none;
}

.btn-map-radio button:focus {
  outline: transparent auto 0px;
}

.btn-map-radio .clickStyle {
  color: white;
  background-color: #007be8;
  border-color: #007be8;
}
</style>
