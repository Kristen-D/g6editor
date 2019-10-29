<template>
<div class="">
  <h5 class="el-panel-subtitle">等级分布</h5>
  <div style="height: 200px;">
    <e-charts :options="option" auto-resize></e-charts>
  </div>
</div>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { bar3Category } from "../../../ChartsOption.js"

export default {
  components: {
    ECharts,


  },

  data() {
    return {
      option: bar3Category,
      levelData: {
        '1':'低危',
        '2':'中危',
        '3':'高危'
      },
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackLevelPie.do', {}, this).then((data) => {
        let total = 0;
        data.sort((a, b) => {
          return b.id - a.id;
        })
        for(let du of data) {
          total = total + du.value;
          du.name = this.levelData[du.id];
        }
        this.option.title[0].text = total;
        this.option.series[0].data = data;
      })
    },
  },
  created() {

  },
  mounted() {
    this.getInitData();
  }
}
</script>
