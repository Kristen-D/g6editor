<template>
<div style="height: 350px;">
  <e-charts :options="option" auto-resize></e-charts>
</div>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { mapbar } from "../../../ChartsOption.js"
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      newEventTypeList: state => state.context.list.NewEventTypeList
    })
  },
  components: {
    ECharts,
  },
  data() {
    return {
      option: mapbar,
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackMapBar.do', {}, this).then((data) => {
        let series = [];
        for(let du of data) {
          let su = {
              name: this.newEventTypeList[du.id],
              type: 'bar',
              stack: '安全概况',
              data: [du.value]
            };
            series.push(su)
        }
        this.option.series = series;
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
