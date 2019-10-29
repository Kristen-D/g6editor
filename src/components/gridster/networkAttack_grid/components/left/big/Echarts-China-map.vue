<template>
<e-charts :options="option" auto-resize></e-charts>
</template>

<script type="text/javascript">
import ECharts from 'components/vue-echarts/ECharts.vue'
import { ChinaOption } from "../../../ChartsOption-China.js"
import {geoChinaMap, geoWorldMap} from "static/static_web/js/echarts/longladata.js"
export default {
  components: {
    ECharts,
  },

  data() {
    return {
      option: ChinaOption
    }
  },
  methods: {
    getInitData() {
      this.common.req('/ssa/netattack/getNetAttackMap.do', {range: 'china'}, this).then((data) => {
        let pointData = [];
        let lineData = [];
        for(let du of data) {
          let locationArra = du.location.split(/[\s\n]/);
          du.name = locationArra[1];
          let pointArra = geoChinaMap[du.name];
          pointArra.push(du.value);
          let point = {
              "name": du.name,
              "value": pointArra,
              // "symbolSize": du.value/100,
              // "itemStyle": {
              //     "normal": {
              //         "color": "#ef4836"
              //     }
              // }
          };

          let line = {
              "fromName": du.name,
              "toName": "北京市",
              "coords": [geoChinaMap[du.name], geoChinaMap['北京市']]
          };
          pointData.push(point);
          lineData.push(line);
        }
        this.option.series[0].data = lineData;
        this.option.series[1].data = pointData;
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
