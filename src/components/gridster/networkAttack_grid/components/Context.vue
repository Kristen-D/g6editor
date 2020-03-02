<template>
<div>



</div>
</template>
<script>
import AttackPhase from "./right/Attack-Phase.vue";
import AttackType from "./right/Attack-Type-bar.vue";
import AttackedAsset from "./right/Attacked-Asset-pie.vue";

import AttackCountry from "./left/big/Attack-Country-bar.vue";
import AttackMapbar from "./left/big/Attack-mapbar.vue";
import EChinaweb from "./left/big/Echarts-China-map.vue";
import EWorldweb from "./left/big/Echarts-World-map.vue";
import AttackTrend from "./left/big/Attack-Trend-line.vue";
import AttackGrade from "./left/big/Attack-Grade-pie.vue";

// import WarningHandled from "./left/Warnning-Handled-pie.vue";
import WarningHandled from "./left/Warnning-Handled-liquidFill.vue";
import WarningTable from "./left/Warning-Table.vue";

export default {
  name: "context",
  components: {
    AttackPhase,
    AttackType,
    AttackedAsset,

    AttackCountry,
    AttackMapbar,
    EChinaweb,
    EWorldweb,
    AttackTrend,
    AttackGrade,

    WarningHandled,
    WarningTable
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
