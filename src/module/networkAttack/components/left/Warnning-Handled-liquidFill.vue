<template>
<e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { liquidFillCategory } from "../../ChartsOption.js"

export default {
  components: {
    ECharts,
  },

  data() {
    return {
      option: liquidFillCategory
    }
  },
	methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackWarningPie.do', {}, this).then((data) => {
        let handled = data.handled;
        let total = data.total;
        let unhandled = total-handled;
        let processed = 0;
        let unprocessed = 0;
        if(total !== 0 ){
          processed = (handled / total);
          unprocessed = (unhandled / total);
        }
        this.option.series[0].data =  [processed];
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
