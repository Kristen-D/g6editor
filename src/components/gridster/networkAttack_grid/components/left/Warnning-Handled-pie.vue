<template>
<e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { halfPie } from "../../ChartsOption.js"
export default {
  components: {
    ECharts,
  },

  data() {
    return {
      option: halfPie
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
          processed = (handled / total * 100);
          unprocessed = (unhandled / total * 100);
        }
        this.option.tooltip = {
          formatter: '已处理:' + processed + '%(' + handled + ')<br/>待处理:' + unprocessed + '%(' + unhandled + ')',
        };
        this.option.series[0].data[0].value = handled;
        this.option.series[0].data[1].value = unhandled===0?10:total;
        this.option.series[0].data[2].value = total===0?10:total;
        this.option.series[1].detail.formatter =  processed+ '%';
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
